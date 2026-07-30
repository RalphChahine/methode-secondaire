import assert from "node:assert/strict"
import test from "node:test"
import * as progressionState from "../src/lib/progressionPaymentState.js"

const { getProgressionPaymentState } = progressionState

const base = { planId: "PLAN-PACK10-600", creditsGranted: 5, creditsReserved: 0, creditsUsed: 0, creditsRemaining: 5 }

test("opens the second Progress payment at the fourth engaged credit", () => {
  assert.equal(getProgressionPaymentState({ ...base, creditsReserved: 3, creditsRemaining: 2 }).canRequestMidpointPayment, false)
  assert.equal(getProgressionPaymentState({ ...base, creditsReserved: 4, creditsRemaining: 1 }).canRequestMidpointPayment, true)
  assert.equal(getProgressionPaymentState({ ...base, creditsUsed: 4, creditsRemaining: 1 }).canRequestMidpointPayment, true)
})

test("blocks the next booking after all first-half credits are engaged", () => {
  const state = getProgressionPaymentState({ ...base, creditsReserved: 5, creditsRemaining: 0 })
  assert.equal(state.canRequestMidpointPayment, true)
  assert.equal(state.bookingBlocked, true)
})

test("does not prompt after the second payment has granted the remaining five credits", () => {
  assert.equal(getProgressionPaymentState({ ...base, creditsGranted: 10, creditsReserved: 5, creditsRemaining: 5 }).canRequestMidpointPayment, false)
})

test("treats a missing linked enrollment as a safe non-blocked state", () => {
  assert.deepEqual(progressionState.getProgressionEnrollmentPaymentState(null), {
    canRequestMidpointPayment: false,
    bookingBlocked: false,
    creditsEngaged: 0,
  })
})

test("selects a ready Progression enrollment even when another child's Momentum pack appears first", () => {
  assert.equal(typeof progressionState.selectReadyProgressionEnrollment, "function")

  const momentum = {
    enrollment_id: "ENR-MOMENTUM",
    plan_id: "PLAN-PACK4-250",
    plan_type: "pack",
    status: "active",
    student_id: "STU-MOMENTUM",
    tutor_id: "TUT-MOMENTUM",
    credits_total: 4,
    credits_remaining: 4,
    credits_reserved: 0,
    credits_used: 0,
  }
  const progression = {
    enrollment_id: "ENR-PROGRESSION",
    plan_id: "PLAN-PACK10-600",
    plan_type: "pack",
    status: "active",
    student_id: "STU-PROGRESSION",
    tutor_id: "TUT-PROGRESSION",
    credits_total: 5,
    credits_remaining: 1,
    credits_reserved: 3,
    credits_used: 1,
  }

  assert.equal(
    progressionState.selectReadyProgressionEnrollment?.([momentum, progression])?.enrollment_id,
    "ENR-PROGRESSION",
  )
})

test("selects the matching blocked Progression enrollment ahead of an exhausted Momentum pack", () => {
  assert.equal(typeof progressionState.selectBlockedProgressionEnrollmentForBooking, "function")
  assert.equal(typeof progressionState.getProgressionEnrollmentPaymentState, "function")

  const eligibleSessionTypes = "weekly_follow_up,catch_up"
  const matchingMomentum = {
    enrollment_id: "ENR-MOMENTUM",
    plan_id: "PLAN-PACK4-250",
    plan_type: "pack",
    status: "active",
    student_id: "STU-ONE",
    tutor_id: "TUT-ONE",
    credits_total: 4,
    credits_remaining: 0,
    credits_reserved: 4,
    credits_used: 0,
    eligible_session_types: eligibleSessionTypes,
  }
  const otherChildProgression = {
    enrollment_id: "ENR-PROGRESSION-OTHER",
    plan_id: "PLAN-PACK10-600",
    plan_type: "pack",
    status: "active",
    student_id: "STU-TWO",
    tutor_id: "TUT-TWO",
    credits_total: 5,
    credits_remaining: 0,
    credits_reserved: 5,
    credits_used: 0,
    eligible_session_types: eligibleSessionTypes,
  }
  const matchingProgression = {
    ...otherChildProgression,
    enrollment_id: "ENR-PROGRESSION-MATCH",
    student_id: "STU-ONE",
    tutor_id: "TUT-ONE",
  }

  const selected = progressionState.selectBlockedProgressionEnrollmentForBooking?.(
    [matchingMomentum, otherChildProgression, matchingProgression],
    {
      studentId: "STU-ONE",
      tutorId: "TUT-ONE",
      sessionType: "weekly_follow_up",
    },
  )

  assert.equal(selected?.enrollment_id, "ENR-PROGRESSION-MATCH")
  assert.equal(progressionState.getProgressionEnrollmentPaymentState?.(selected).bookingBlocked, true)
})
