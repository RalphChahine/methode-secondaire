import assert from "node:assert/strict"
import test from "node:test"
import { getParentNextAction, getParentSessionProgress } from "../src/lib/parentPortal.js"

test("returns one prepare action for an upcoming confirmed session", () => {
  const action = getParentNextAction({
    profile: { name: "Parent" }, matching: { tutor_id: "T-1" },
    sessions: [{ session_id: "S-1", session_status: "confirmed", start_at: "2099-01-01T15:00:00.000Z" }],
    metrics: { payments_due: 0, messages_waiting: 0 }, session_materials: [],
  })
  assert.deepEqual(action, { key: "prepare", destination: "today", sessionId: "S-1" })
})

test("does not repeat prepare once the upcoming session has shared material", () => {
  assert.deepEqual(getParentNextAction({
    profile: { name: "Parent" }, matching: { tutor_id: "T-1" },
    sessions: [{ session_id: "S-1", session_status: "confirmed", start_at: "2099-01-01T15:00:00.000Z" }],
    metrics: { payments_due: 0, messages_waiting: 0 },
    session_materials: [{ session_id: "S-1", status: "shared" }],
  }), { key: "all_set", destination: "today" })
})

test("uses the fixed next-action priority", () => {
  assert.equal(getParentNextAction({ profile: {}, sessions: [] }).key, "profile")
  assert.equal(getParentNextAction({ profile: { name: "P" }, matching: {}, sessions: [] }).key, "matching")
  assert.equal(getParentNextAction({ profile: { name: "P" }, matching: { tutor_id: "T" }, sessions: [], metrics: {} }).key, "booking")
  assert.equal(getParentNextAction({ profile: { name: "P" }, matching: { tutor_id: "T" }, sessions: [{ session_status: "confirmed" }], metrics: { payments_due: 1 } }).key, "payment")
})

test("keeps recap current until a released note exists", () => {
  assert.deepEqual(getParentSessionProgress(
    { session_id: "S-1", session_status: "completed", end_at: "2000-01-01T15:00:00.000Z" },
    [], [],
  ), ["done", "done", "current"])
})

test("uses session time and released parent notes for progress", () => {
  assert.deepEqual(getParentSessionProgress(
    { session_id: "S-1", session_status: "confirmed", start_at: "2000-01-01T15:00:00.000Z", end_at: "2099-01-01T16:00:00.000Z" },
    [], [],
  ), ["done", "current", "upcoming"])
  assert.deepEqual(getParentSessionProgress(
    { session_id: "S-1", session_status: "completed" },
    [], [{ session_id: "S-1", status: "released" }],
  ), ["done", "done", "done"])
})
