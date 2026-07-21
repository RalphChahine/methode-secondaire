import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import test from "node:test"

import { createCheckoutRequest } from "../api/lib/stripe-checkout.mjs"
import createCheckoutSession from "../api/create-checkout-session.js"

test("creates a one-hour CAD Checkout Session", () => {
  const now = new Date("2026-07-21T16:00:00.000Z")
  const request = createCheckoutRequest({
    payment_id: "PAY-001",
    amount_cad: 65,
    email: "parent@example.com",
    offer: "Séance ciblée",
    success_url: "https://example.com/portail?payment=success",
    cancel_url: "https://example.com/portail?payment=cancelled",
  }, now)

  assert.equal(request.client_reference_id, "PAY-001")
  assert.equal(request.line_items.length, 1)
  assert.equal(request.line_items[0].price_data.currency, "cad")
  assert.equal(request.line_items[0].price_data.unit_amount, 6500)
  assert.equal(request.mode, "payment")
  assert.equal(request.expires_at, 1784653200)
})

test("rejects Checkout details without a payment ID", () => {
  assert.throws(
    () => createCheckoutRequest({ amount_cad: 65 }, new Date()),
    { message: "PAYMENT_CHECKOUT_DETAILS_REQUIRED" },
  )
})

test("rejects a Checkout amount below one CAD", () => {
  assert.throws(
    () => createCheckoutRequest({ payment_id: "PAY-001", amount_cad: 0.99 }, new Date()),
    { message: "PAYMENT_CHECKOUT_DETAILS_REQUIRED" },
  )
})

test("creates a Stripe Checkout Session only for an authenticated internal POST", async () => {
  const originalFetch = globalThis.fetch
  const response = makeResponse()
  const fetchCalls = []
  const originalPaymentSecret = process.env.PAYMENT_SESSION_SECRET
  const originalStripeSecret = process.env.STRIPE_SECRET_KEY

  process.env.PAYMENT_SESSION_SECRET = "internal-secret"
  process.env.STRIPE_SECRET_KEY = "sk_test_secret"
  globalThis.fetch = async (...args) => {
    fetchCalls.push(args)
    return {
      ok: true,
      json: async () => ({
        id: "cs_test_123",
        url: "https://checkout.stripe.com/c/pay/cs_test_123",
        expires_at: 1784653200,
        customer: "cus_secret",
        payment_intent: "pi_secret",
      }),
    }
  }

  try {
    await createCheckoutSession({
      method: "POST",
      body: {
        payment_session_secret: "internal-secret",
        payment_id: "PAY-001",
        amount_cad: 65,
        email: "parent@example.com",
        offer: "Séance ciblée",
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
      },
    }, response)
  } finally {
    globalThis.fetch = originalFetch
    restoreEnvironment("PAYMENT_SESSION_SECRET", originalPaymentSecret)
    restoreEnvironment("STRIPE_SECRET_KEY", originalStripeSecret)
  }

  assert.equal(fetchCalls.length, 1)
  const [stripeUrl, options] = fetchCalls[0]
  assert.equal(stripeUrl, "https://api.stripe.com/v1/checkout/sessions")
  assert.equal(options.method, "POST")
  assert.equal(options.headers.Authorization, `Basic ${Buffer.from("sk_test_secret:").toString("base64")}`)
  assert.match(options.body, /client_reference_id=PAY-001/)
  assert.match(options.body, /line_items%5B0%5D%5Bprice_data%5D%5Bunit_amount%5D=6500/)
  assert.deepEqual(response.payload, {
    ok: true,
    checkout_session_id: "cs_test_123",
    checkout_url: "https://checkout.stripe.com/c/pay/cs_test_123",
    expires_at: "2026-07-21T17:00:00.000Z",
  })
})

test("rejects unauthenticated Checkout requests without calling Stripe", async () => {
  const originalPaymentSecret = process.env.PAYMENT_SESSION_SECRET
  const originalStripeSecret = process.env.STRIPE_SECRET_KEY
  const response = makeResponse()

  process.env.PAYMENT_SESSION_SECRET = "internal-secret"
  process.env.STRIPE_SECRET_KEY = "sk_test_secret"

  try {
    await createCheckoutSession({ method: "POST", body: { payment_session_secret: "wrong" } }, response)
  } finally {
    restoreEnvironment("PAYMENT_SESSION_SECRET", originalPaymentSecret)
    restoreEnvironment("STRIPE_SECRET_KEY", originalStripeSecret)
  }

  assert.equal(response.statusCode, 401)
  assert.deepEqual(response.payload, { ok: false, code: "UNAUTHORIZED_PAYMENT_SESSION" })
})

test("keeps the Checkout boundary static contract green", () => {
  const result = spawnSync(process.execPath, ["scripts/check-meet-checkout-contract.mjs"], {
    cwd: process.cwd(),
    encoding: "utf8",
  })

  assert.equal(result.status, 0, result.stderr)
})

function makeResponse() {
  return {
    statusCode: 200,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.payload = payload
      return this
    },
    setHeader() {},
  }
}

function restoreEnvironment(name, value) {
  if (value === undefined) {
    delete process.env[name]
    return
  }

  process.env[name] = value
}
