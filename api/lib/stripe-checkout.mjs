export const CHECKOUT_EXPIRY_SECONDS = 60 * 60

const MIN_AMOUNT_CENTS = 100
const MAX_AMOUNT_CENTS = 1000000

export function validateCheckoutInput(input) {
  const paymentId = normalizeString(input?.payment_id)
  const email = normalizeString(input?.email)
  const offer = normalizeString(input?.offer)
  const successUrl = normalizeString(input?.success_url)
  const cancelUrl = normalizeString(input?.cancel_url)
  const amountCad = Number(input?.amount_cad)
  const exactAmountCents = amountCad * 100
  const amountCents = Math.round(exactAmountCents)
  const hasFractionalCent = !Number.isFinite(exactAmountCents) || Math.abs(exactAmountCents - amountCents) > 1e-8

  if (!paymentId || !email || !offer || !successUrl || !cancelUrl ||
      hasFractionalCent || !Number.isInteger(amountCents) || amountCents < MIN_AMOUNT_CENTS || amountCents > MAX_AMOUNT_CENTS) {
    throw new Error("PAYMENT_CHECKOUT_DETAILS_REQUIRED")
  }

  return { paymentId, email, offer, successUrl, cancelUrl, amountCents }
}

export function createCheckoutRequest(input, now) {
  const { paymentId, email, offer, successUrl, cancelUrl, amountCents } = validateCheckoutInput(input)
  const issuedAt = now instanceof Date ? now.getTime() : Number.NaN

  if (!Number.isFinite(issuedAt)) {
    throw new Error("PAYMENT_CHECKOUT_DETAILS_REQUIRED")
  }

  return {
    mode: "payment",
    client_reference_id: paymentId,
    customer_email: email,
    success_url: successUrl,
    cancel_url: cancelUrl,
    expires_at: Math.floor(issuedAt / 1000) + CHECKOUT_EXPIRY_SECONDS,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "cad",
        unit_amount: amountCents,
        product_data: { name: offer },
      },
    }],
    metadata: { payment_id: paymentId },
  }
}

export function classifyStripeCheckoutEvent(event) {
  const checkout = event?.data?.object || {}
  const paymentId = normalizeString(checkout.client_reference_id)

  if (!paymentId) {
    return { kind: "ignored" }
  }

  if (["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event?.type) &&
      checkout.payment_status === "paid") {
    return { kind: "paid", payment_id: paymentId }
  }

  if (event?.type === "checkout.session.expired" && checkout.status === "expired") {
    return { kind: "expired", payment_id: paymentId }
  }

  return { kind: "ignored" }
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : ""
}
