import crypto from "node:crypto"

const MAX_BODY_BYTES = 8 * 1024
const STRIPE_CHECKOUT_URL = "https://api.stripe.com/v1/checkout/sessions"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ ok: false, code: "METHOD_NOT_ALLOWED" })
  }

  const paymentSessionSecret = normalizeString(process.env.PAYMENT_SESSION_SECRET)
  const stripeSecretKey = normalizeString(process.env.STRIPE_SECRET_KEY)
  if (!paymentSessionSecret || !stripeSecretKey) {
    return res.status(503).json({ ok: false, code: "PAYMENT_CHECKOUT_NOT_CONFIGURED" })
  }

  let input
  try {
    input = await readJsonBody(req)
  } catch {
    return res.status(400).json({ ok: false, code: "INVALID_JSON" })
  }

  if (!safeEqual(normalizeString(input?.payment_session_secret), paymentSessionSecret)) {
    return res.status(401).json({ ok: false, code: "UNAUTHORIZED_PAYMENT_SESSION" })
  }

  const checkoutSessionId = normalizeString(input?.checkout_session_id)
  if (!isCheckoutSessionId(checkoutSessionId)) {
    return res.status(400).json({ ok: false, code: "PAYMENT_CHECKOUT_EXPIRY_DETAILS_REQUIRED" })
  }

  const stripeAuthorization = `Basic ${Buffer.from(`${stripeSecretKey}:`, "utf8").toString("base64")}`
  const stripeSessionUrl = `${STRIPE_CHECKOUT_URL}/${encodeURIComponent(checkoutSessionId)}`
  let expireResponse
  try {
    expireResponse = await fetch(`${stripeSessionUrl}/expire`, {
      method: "POST",
      headers: {
        Authorization: stripeAuthorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams().toString(),
    })
  } catch {
    return res.status(502).json({ ok: false, code: "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED" })
  }

  if (expireResponse.ok) {
    const expiredSession = await readStripeJson(expireResponse)
    if (isMatchingExpiredSession(expiredSession, checkoutSessionId)) {
      return res.status(200).json({
        ok: true,
        checkout_session_id: checkoutSessionId,
        status: "expired",
        already_expired: false,
      })
    }
    return res.status(502).json({ ok: false, code: "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED" })
  }

  let currentSession
  try {
    const retrieveResponse = await fetch(stripeSessionUrl, {
      method: "GET",
      headers: { Authorization: stripeAuthorization },
    })
    if (!retrieveResponse.ok) {
      return res.status(502).json({ ok: false, code: "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED" })
    }
    currentSession = await readStripeJson(retrieveResponse)
  } catch {
    return res.status(502).json({ ok: false, code: "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED" })
  }

  if (isMatchingExpiredSession(currentSession, checkoutSessionId)) {
    return res.status(200).json({
      ok: true,
      checkout_session_id: checkoutSessionId,
      status: "expired",
      already_expired: true,
    })
  }

  if (normalizeString(currentSession?.id) === checkoutSessionId && normalizeString(currentSession?.status) === "complete") {
    return res.status(409).json({
      ok: false,
      code: "STRIPE_CHECKOUT_ALREADY_COMPLETED",
      checkout_session_id: checkoutSessionId,
      checkout_status: "complete",
      payment_status: normalizeString(currentSession?.payment_status),
    })
  }

  return res.status(502).json({ ok: false, code: "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED" })
}

function safeEqual(value, expected) {
  const left = crypto.createHash("sha256").update(value, "utf8").digest()
  const right = crypto.createHash("sha256").update(expected, "utf8").digest()
  return crypto.timingSafeEqual(left, right)
}

function isCheckoutSessionId(value) {
  return /^cs_[A-Za-z0-9_]+$/.test(value) && value.length <= 255
}

function isMatchingExpiredSession(session, checkoutSessionId) {
  return normalizeString(session?.id) === checkoutSessionId && normalizeString(session?.status) === "expired"
}

async function readStripeJson(response) {
  try {
    return await response.json()
  } catch {
    return null
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

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : ""
}
