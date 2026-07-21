const MAX_BODY_BYTES = 120 * 1024
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 30
const CRM_REQUEST_TIMEOUT_MS = 22000
const requestLog = new Map()

const ALLOWED_ACTIONS = new Set([
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({
      ok: false,
      code: "METHOD_NOT_ALLOWED",
      message: "Method not allowed.",
    })
  }

  const clientIp = getClientIp(req)
  if (!canProceed(clientIp)) {
    return res.status(429).json({
      ok: false,
      code: "PORTAL_RATE_LIMITED",
      message: "Too many portal requests. Please wait a few minutes.",
    })
  }

  let body

  try {
    body = await readJsonBody(req)
  } catch {
    return res.status(400).json({
      ok: false,
      code: "INVALID_JSON",
      message: "Invalid JSON payload.",
    })
  }

  const action = normalizeString(body?.action)
  if (!ALLOWED_ACTIONS.has(action)) {
    return res.status(400).json({
      ok: false,
      code: "UNKNOWN_PORTAL_ACTION",
      message: "Unknown portal action.",
    })
  }

  const webhookUrl = normalizeString(process.env.CRM_WEBHOOK_URL)

  if (!webhookUrl) {
    return res.status(200).json({
      ok: false,
      code: "MISSING_CRM_WEBHOOK_URL",
      message: "Portal CRM webhook is not configured.",
    })
  }

  const portalSecret = normalizeString(process.env.CRM_PORTAL_SECRET)
  if (!portalSecret) {
    return res.status(200).json({
      ok: false,
      code: "MISSING_CRM_PORTAL_SECRET",
      message: "Portal proxy authentication is not configured.",
    })
  }

  const payload = {
    ...body,
    action,
    portal_secret: portalSecret,
  }

  try {
    const upstreamResponse = await fetchCrmWebhook(webhookUrl, payload)

    const upstreamText = await upstreamResponse.text()
    const upstreamBody = parseJsonMaybe(upstreamText)

    if (!upstreamResponse.ok) {
      return res.status(502).json({
        ok: false,
        code: "PORTAL_CRM_FAILED",
        status: upstreamResponse.status,
        crm: upstreamBody || upstreamText,
      })
    }

    return res.status(200).json(upstreamBody || { ok: false, code: "PORTAL_EMPTY_RESPONSE" })
  } catch (error) {
    return res.status(502).json({
      ok: false,
      code: error?.name === "AbortError" ? "PORTAL_CRM_TIMEOUT" : "PORTAL_CRM_UNREACHABLE",
      message: "Portal CRM could not be reached in time.",
    })
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

async function readJsonBody(req) {
  if (req.body) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body
  }

  const rawBody = await readRawBody(req)
  return rawBody ? JSON.parse(rawBody) : {}
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let body = ""

    req.on("data", (chunk) => {
      body += chunk

      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        reject(new Error("Request body too large."))
      }
    })

    req.on("end", () => resolve(body))
    req.on("error", reject)
  })
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"]

  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim()
  }

  return req.socket?.remoteAddress || "unknown"
}

function canProceed(clientIp) {
  const now = Date.now()
  const recent = (requestLog.get(clientIp) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  )

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(clientIp, recent)
    return false
  }

  recent.push(now)
  requestLog.set(clientIp, recent)
  return true
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : ""
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
