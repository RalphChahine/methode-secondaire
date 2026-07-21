const MAX_FIELD_LENGTH = 2000
const ALLOWED_EVENTS = new Set(["portal_dashboard_render"])

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ ok: false, code: "METHOD_NOT_ALLOWED" })
  }

  const body = parseBody(req.body)
  const event = normalizeText(body?.event, 80)
  const path = normalizeText(body?.path, 300)
  if (!ALLOWED_EVENTS.has(event) || !path.startsWith("/portal")) {
    return res.status(400).json({ ok: false, code: "INVALID_CLIENT_ERROR" })
  }

  const entry = {
    source: "client",
    event,
    path,
    message: normalizeText(body?.message, 400),
    component_stack: normalizeText(body?.component_stack, MAX_FIELD_LENGTH),
  }

  console.error("CLIENT_ERROR", JSON.stringify(entry))
  return res.status(204).end()
}

function parseBody(value) {
  if (typeof value !== "string") {
    return value && typeof value === "object" ? value : {}
  }

  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}

function normalizeText(value, limit) {
  return typeof value === "string"
    ? value.replace(/[\r\n\t]+/g, " ").trim().slice(0, limit)
    : ""
}
