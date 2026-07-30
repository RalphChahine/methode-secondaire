export const PROGRESSION_MIDPOINT_PAYMENT_RULE = Object.freeze({
  planId: "PLAN-PACK10-600",
  firstInstallmentCredits: 5,
  paymentReadyAtCredits: 4,
  paymentStage: "progression_midpoint",
})

const nonNegativeInteger = (value) => Math.max(0, Math.round(Number(value) || 0))
const currentEnrollmentStatuses = new Set(["active", "pending", "paused"])

const isRecord = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value)

const isCurrentEnrollment = (enrollment) => isRecord(enrollment) &&
  (!enrollment.status || currentEnrollmentStatuses.has(String(enrollment.status)))

const getEnrollmentEligibleSessionTypes = (enrollment) => {
  const plan = isRecord(enrollment?.plan) ? enrollment.plan : {}
  return String(enrollment?.eligible_session_types || plan.eligible_session_types || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
}

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

export function getProgressionEnrollmentPaymentState(enrollment = {}) {
  const record = isRecord(enrollment) ? enrollment : {}
  const plan = isRecord(record.plan) ? record.plan : {}
  return getProgressionPaymentState({
    planId: record.plan_id || plan.plan_id,
    creditsGranted: record.credits_total,
    creditsReserved: record.credits_reserved,
    creditsUsed: record.credits_used,
    creditsRemaining: record.credits_remaining,
  })
}

export function selectReadyProgressionEnrollment(enrollments = []) {
  return enrollments.find((enrollment) =>
    isCurrentEnrollment(enrollment) &&
    getProgressionEnrollmentPaymentState(enrollment).canRequestMidpointPayment
  ) || null
}

export function selectBlockedProgressionEnrollmentForBooking(
  enrollments = [],
  { studentId = "", tutorId = "", sessionType = "" } = {},
) {
  return enrollments.find((enrollment) => {
    if (!isRecord(enrollment) || enrollment.status !== "active") {
      return false
    }
    if (studentId && enrollment.student_id && enrollment.student_id !== studentId) {
      return false
    }
    if (tutorId && String(enrollment.tutor_id || "") !== String(tutorId)) {
      return false
    }
    if (!getEnrollmentEligibleSessionTypes(enrollment).includes(sessionType)) {
      return false
    }
    return getProgressionEnrollmentPaymentState(enrollment).bookingBlocked
  }) || null
}
