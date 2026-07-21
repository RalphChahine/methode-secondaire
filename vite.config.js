import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

const DEFAULT_CRM_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzx2pzUigC7eI4wgg9CgomGWZRA7tbUG-4pHLhjbO1YYS6FRQ4NpPrW7d05LwERGdQ4Ow/exec"
const MAX_PORTAL_BODY_BYTES = 120 * 1024
const CRM_REQUEST_TIMEOUT_MS = 22000
const PORTAL_ACTIONS = new Set([
  "portal_create_account",
  "portal_request_code",
  "portal_verify_code",
  "portal_get_dashboard",
  "portal_create_session",
  "portal_upsert_payment_link",
  "portal_respond_to_session",
  "portal_submit_session_note",
  "portal_book_session",
  "portal_submit_parent_feedback",
  "portal_update_parent_profile",
  "portal_upsert_student",
  "portal_assign_student_tutor",
  "portal_delete_test_record",
  "portal_delete_test_records",
  "portal_create_parent",
  "portal_upsert_parent",
  "portal_update_lead_follow_up",
  "portal_set_parent_access",
  "portal_delete_parent",
  "portal_assign_tutor",
  "portal_create_tutor",
  "portal_update_tutor_calendar",
  "portal_delete_tutor",
  "portal_invite_tutor",
  "portal_send_session_message",
  "portal_cancel_session",
  "portal_reschedule_session",
  "portal_upsert_tutor_availability",
  "portal_complete_demo_payment",
  "portal_update_request_status",
  "portal_create_request",
  "portal_upsert_plan",
  "portal_create_plan_enrollment",
  "portal_create_plan_payment_request",
  "portal_update_plan_enrollment",
  "portal_pause_plan_enrollment",
  "portal_resume_plan_enrollment",
  "portal_adjust_plan_credits",
  "portal_get_plan_change_deadline",
])

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const portalWebhookUrl = env.CRM_WEBHOOK_URL || env.VITE_CRM_WEBHOOK_URL || DEFAULT_CRM_WEBHOOK_URL

  return {
    plugins: [
      react(),
      portalDevApiPlugin({
        portalWebhookUrl,
        portalSecret: env.CRM_PORTAL_SECRET || "",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
})

function portalDevApiPlugin({ portalWebhookUrl, portalSecret }) {
  return {
    name: "methode-secondaire-portal-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/portal", async (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, {
            ok: false,
            code: "METHOD_NOT_ALLOWED",
            message: "Method not allowed.",
          })
          return
        }

        if (!portalWebhookUrl) {
          sendJson(res, 200, {
            ok: false,
            code: "MISSING_CRM_WEBHOOK_URL",
            message: "Portal CRM webhook is not configured.",
          })
          return
        }

        let body

        try {
          body = JSON.parse(await readRequestBody(req))
        } catch {
          sendJson(res, 400, {
            ok: false,
            code: "INVALID_JSON",
            message: "Invalid JSON payload.",
          })
          return
        }

        const action = typeof body?.action === "string" ? body.action.trim() : ""
        if (!PORTAL_ACTIONS.has(action)) {
          sendJson(res, 400, {
            ok: false,
            code: "UNKNOWN_PORTAL_ACTION",
            message: "Unknown portal action.",
          })
          return
        }

        if (!portalSecret) {
          sendJson(res, 200, {
            ok: false,
            code: "MISSING_CRM_PORTAL_SECRET",
            message: "Portal proxy authentication is not configured.",
          })
          return
        }

        try {
          const upstreamResponse = await fetchCrmWebhook(portalWebhookUrl, {
            ...body,
            action,
            portal_secret: portalSecret,
          })

          const upstreamText = await upstreamResponse.text()
          const upstreamBody = parseJsonMaybe(upstreamText)

          if (!upstreamResponse.ok) {
            sendJson(res, 502, {
              ok: false,
              code: "PORTAL_CRM_FAILED",
              status: upstreamResponse.status,
              crm: upstreamBody || upstreamText,
            })
            return
          }

          sendJson(res, 200, upstreamBody || { ok: false, code: "PORTAL_EMPTY_RESPONSE" })
        } catch (error) {
          sendJson(res, 502, {
            ok: false,
            code: error?.name === "AbortError" ? "PORTAL_CRM_TIMEOUT" : "PORTAL_CRM_UNREACHABLE",
            message: "Portal CRM could not be reached in time.",
          })
        }
      })
    },
  }
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = ""
    let finished = false

    req.on("data", (chunk) => {
      if (finished) {
        return
      }

      body += chunk

      if (Buffer.byteLength(body) > MAX_PORTAL_BODY_BYTES) {
        finished = true
        reject(new Error("Request body too large."))
      }
    })

    req.on("end", () => {
      if (!finished) {
        resolve(body || "{}")
      }
    })
    req.on("error", reject)
  })
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.end(JSON.stringify(payload))
}

function parseJsonMaybe(text) {
  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

async function fetchCrmWebhook(webhookUrl, payload) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), CRM_REQUEST_TIMEOUT_MS)

  try {
    return await fetch(webhookUrl, {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "text/plain;charset=utf-8",
      },
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeoutId)
  }
}
