import crypto from "node:crypto"

import { createCheckoutRequest } from "./lib/stripe-checkout.mjs"

const MAX_BODY_BYTES = 32 * 1024
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

  let checkoutRequest
  let checkoutReference
  try {
    checkoutRequest = createCheckoutRequest(input, new Date())
    checkoutReference = getCheckoutReference(input?.checkout_reference, checkoutRequest.client_reference_id)
  } catch (error) {
    return res.status(400).json({ ok: false, code: error?.message || "PAYMENT_CHECKOUT_DETAILS_REQUIRED" })
  }

  let stripeSession
  try {
    const stripeResponse = await fetch(STRIPE_CHECKOUT_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${stripeSecretKey}:`, "utf8").toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": checkoutReference,
      },
      body: flattenFormParameters(checkoutRequest).toString(),
    })

    if (!stripeResponse.ok) {
      return res.status(502).json({ ok: false, code: "STRIPE_CHECKOUT_FAILED" })
    }

    stripeSession = await stripeResponse.json()
  } catch {
    return res.status(502).json({ ok: false, code: "STRIPE_CHECKOUT_FAILED" })
  }

  const checkoutSessionId = normalizeString(stripeSession?.id)
  const checkoutUrl = normalizeString(stripeSession?.url)
  const expirySeconds = Number(stripeSession?.expires_at)
  if (!checkoutSessionId || !checkoutUrl || !Number.isFinite(expirySeconds)) {
    return res.status(502).json({ ok: false, code: "STRIPE_CHECKOUT_FAILED" })
  }

  return res.status(200).json({
    ok: true,
    checkout_session_id: checkoutSessionId,
    checkout_url: checkoutUrl,
    expires_at: new Date(expirySeconds * 1000).toISOString(),
  })
}

function safeEqual(value, expected) {
  const left = crypto.createHash("sha256").update(value, "utf8").digest()
  const right = crypto.createHash("sha256").update(expected, "utf8").digest()
  return crypto.timingSafeEqual(left, right)
}

function getCheckoutReference(value, paymentId) {
  if (value === undefined || value === null) {
    return paymentId
  }

  const checkoutReference = normalizeString(value)
  if (!checkoutReference || checkoutReference.length > 255 || /[\u0000-\u001F\u007F]/.test(checkoutReference)) {
    throw new Error("PAYMENT_CHECKOUT_DETAILS_REQUIRED")
  }

  return checkoutReference
}

function flattenFormParameters(input) {
  const parameters = new URLSearchParams()

  const append = (value, path) => {
    if (Array.isArray(value)) {
      value.forEach((entry, index) => append(entry, `${path}[${index}]`))
      return
    }

    if (value && typeof value === "object") {
      Object.entries(value).forEach(([key, entry]) => append(entry, path ? `${path}[${key}]` : key))
      return
    }

    parameters.append(path, String(value))
  }

  Object.entries(input).forEach(([key, value]) => append(value, key))
  return parameters
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
