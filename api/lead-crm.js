const MAX_BODY_BYTES = 100 * 1024

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({
      ok: false,
      code: "METHOD_NOT_ALLOWED",
      message: "Method not allowed.",
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

  const payload = normalizePayload(body)
  const webhookUrl = normalizeString(process.env.CRM_WEBHOOK_URL)

  if (!payload || !Object.keys(payload).length) {
    return res.status(400).json({
      ok: false,
      code: "EMPTY_LEAD",
      message: "Lead payload is empty.",
    })
  }

  if (!webhookUrl) {
    return res.status(200).json({
      ok: false,
      skipped: true,
      code: "MISSING_CRM_WEBHOOK_URL",
      message: "CRM webhook URL is not configured.",
    })
  }

  try {
    const upstreamResponse = await fetch(webhookUrl, {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "text/plain;charset=utf-8",
      },
    })

    const upstreamText = await upstreamResponse.text()
    const upstreamBody = parseJsonMaybe(upstreamText)

    if (!upstreamResponse.ok) {
      return res.status(502).json({
        ok: false,
        code: "CRM_WEBHOOK_FAILED",
        status: upstreamResponse.status,
        crm: upstreamBody || upstreamText,
      })
    }

    return res.status(200).json({
      ok: true,
      crm: upstreamBody || upstreamText,
    })
  } catch {
    return res.status(502).json({
      ok: false,
      code: "CRM_WEBHOOK_UNREACHABLE",
      message: "CRM webhook could not be reached.",
    })
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

function normalizePayload(body) {
  if (!body || typeof body !== "object") {
    return {}
  }

  if (body.payload && typeof body.payload === "object") {
    return body.payload
  }

  return body
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
