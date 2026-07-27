export function getSafeHostedCheckoutUrl(value) {
  try {
    const url = new URL(String(value || ""))
    return url.protocol === "https:" &&
      url.hostname === "checkout.stripe.com" &&
      url.pathname.startsWith("/c/")
      ? url.toString()
      : ""
  } catch {
    return ""
  }
}

export function getPortalBookingOutcome(result = {}) {
  if (result.payment_mode === "plan_credit") {
    return { kind: "plan_credit", checkoutUrl: "", stripeMode: "" }
  }

  const checkoutUrl = getSafeHostedCheckoutUrl(result.checkout_url || result.payment_url)
  if (!checkoutUrl) {
    return { kind: "checkout_unavailable", checkoutUrl: "", stripeMode: "" }
  }

  return {
    kind: "checkout_ready",
    checkoutUrl,
    stripeMode: result.stripe_mode === "test" ? "test" : "live",
  }
}
