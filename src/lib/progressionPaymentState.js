export const PROGRESSION_MIDPOINT_PAYMENT_RULE = Object.freeze({
  planId: "PLAN-PACK10-600",
  firstInstallmentCredits: 5,
  paymentReadyAtCredits: 4,
  paymentStage: "progression_midpoint",
})

const nonNegativeInteger = (value) => Math.max(0, Math.round(Number(value) || 0))

export function getProgressionPaymentState(summary = {}) {
  const isProgression = String(summary.planId || "") === PROGRESSION_MIDPOINT_PAYMENT_RULE.planId
  const creditsGranted = nonNegativeInteger(summary.creditsGranted)
  const creditsEngaged = nonNegativeInteger(summary.creditsReserved) + nonNegativeInteger(summary.creditsUsed)
  const canRequestMidpointPayment = isProgression &&
    creditsGranted === PROGRESSION_MIDPOINT_PAYMENT_RULE.firstInstallmentCredits &&
    creditsEngaged >= PROGRESSION_MIDPOINT_PAYMENT_RULE.paymentReadyAtCredits
  return {
    canRequestMidpointPayment,
    bookingBlocked: canRequestMidpointPayment && nonNegativeInteger(summary.creditsRemaining) < 1,
    creditsEngaged,
  }
}
