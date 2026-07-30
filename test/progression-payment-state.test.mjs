import assert from "node:assert/strict"
import test from "node:test"
import { getProgressionPaymentState } from "../src/lib/progressionPaymentState.js"

const base = { planId: "PLAN-PACK10-600", creditsGranted: 5, creditsReserved: 0, creditsUsed: 0, creditsRemaining: 5 }

test("opens the second Progress payment at the fourth engaged credit", () => {
  assert.equal(getProgressionPaymentState({ ...base, creditsReserved: 3, creditsRemaining: 2 }).canRequestMidpointPayment, false)
  assert.equal(getProgressionPaymentState({ ...base, creditsReserved: 4, creditsRemaining: 1 }).canRequestMidpointPayment, true)
})

test("blocks the next booking after all first-half credits are engaged", () => {
  const state = getProgressionPaymentState({ ...base, creditsReserved: 5, creditsRemaining: 0 })
  assert.equal(state.canRequestMidpointPayment, true)
  assert.equal(state.bookingBlocked, true)
})

test("does not prompt after the second payment has granted the remaining five credits", () => {
  assert.equal(getProgressionPaymentState({ ...base, creditsGranted: 10, creditsReserved: 5, creditsRemaining: 5 }).canRequestMidpointPayment, false)
})
