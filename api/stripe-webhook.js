import crypto from "node:crypto"

const MAX_BODY_BYTES = 256 * 1024
const SIGNATURE_TOLERANCE_SECONDS = 5 * 60

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ ok: false, code: "METHOD_NOT_ALLOWED" })
  }

  const stripeWebhookSecret = normalizeString(process.env.STRIPE_WEBHOOK_SECRET)
  const paymentWebhookSecret = normalizeString(process.env.PAYMENT_WEBHOOK_SECRET)
  const crmWebhookUrl = normalizeString(process.env.CRM_WEBHOOK_URL)
  if (!stripeWebhookSecret || !paymentWebhookSecret || !crmWebhookUrl) {
    return res.status(503).json({ ok: false, code: "STRIPE_WEBHOOK_NOT_CONFIGURED" })
  }

  let rawBody
  try {
    rawBody = await readRawBody(req)
  } catch {
    return res.status(400).json({ ok: false, code: "INVALID_WEBHOOK_BODY" })
  }

  if (!verifyStripeSignature(rawBody, req.headers["stripe-signature"], stripeWebhookSecret)) {
    return res.status(400).json({ ok: false, code: "INVALID_STRIPE_SIGNATURE" })
  }

  let event
  try {
    event = JSON.parse(rawBody)
  } catch {
    return res.status(400).json({ ok: false, code: "INVALID_STRIPE_EVENT" })
  }

  if (![
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
  ].includes(event?.type)) {
    return res.status(200).json({ ok: true, ignored: true })
  }

  const checkout = event?.data?.object || {}
  const paymentId = normalizeString(checkout.client_reference_id)
  if (!paymentId || checkout.payment_status !== "paid") {
    return res.status(200).json({ ok: true, ignored: true })
  }

  try {
    const crmResponse = await fetch(crmWebhookUrl, {
      method: "POST",
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "portal_mark_payment_paid_webhook",
        webhook_secret: paymentWebhookSecret,
        payment_id: paymentId,
        stripe_session_id: normalizeString(checkout.id),
        amount_cad: Number(checkout.amount_total || 0) / 100,
        currency: normalizeString(checkout.currency),
        paid_at: checkout.created ? new Date(Number(checkout.created) * 1000).toISOString() : new Date().toISOString(),
      }),
    })
    const crmText = await crmResponse.text()
    const crmBody = parseJsonMaybe(crmText)
    if (!crmResponse.ok || !crmBody?.ok) {
      return res.status(502).json({ ok: false, code: "CRM_PAYMENT_UPDATE_FAILED" })
    }
  } catch {
    return res.status(502).json({ ok: false, code: "CRM_PAYMENT_UPDATE_FAILED" })
  }

  return res.status(200).json({ ok: true, payment_id: paymentId })
}

function verifyStripeSignature(rawBody, signatureHeader, secret) {
  if (typeof signatureHeader !== "string" || !signatureHeader) {
    return false
  }

  const parts = signatureHeader.split(",")
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2)
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3))
  const timestampNumber = Number(timestamp)
  if (!timestamp || !Number.isFinite(timestampNumber) ||
      Math.abs(Math.floor(Date.now() / 1000) - timestampNumber) > SIGNATURE_TOLERANCE_SECONDS) {
    return false
  }

  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}.${rawBody}`, "utf8").digest("hex")
  return signatures.some((signature) => safeEqual(signature, expected))
}

function safeEqual(value, expected) {
  const left = Buffer.from(String(value), "utf8")
  const right = Buffer.from(String(expected), "utf8")
  return left.length === right.length && crypto.timingSafeEqual(left, right)
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on("data", (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Webhook body too large."))
        return
      }
      chunks.push(Buffer.from(chunk))
    })
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    req.on("error", reject)
  })
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : ""
}

function parseJsonMaybe(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}
