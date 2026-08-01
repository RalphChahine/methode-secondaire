import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

import { TASK_EVENTS, sanitizeTaskEventPayload } from "../src/lib/tracking.js"

const expectedEvents = [
  "request_started",
  "request_submitted",
  "request_succeeded",
  "portal_code_requested",
  "portal_signed_in",
  "parent_next_action_opened",
  "parent_next_action_completed",
  "tutor_note_opened",
  "tutor_note_submitted",
  "operator_priority_opened",
  "operator_priority_resolved",
]

test("task tracking exposes exactly the privacy-safe event contract", () => {
  assert.deepEqual([...TASK_EVENTS], expectedEvents)
})

test("task tracking drops identifiers and free text while keeping bounded buckets", () => {
  assert.deepEqual(
    sanitizeTaskEventPayload({
      role: "parent",
      locale: "fr",
      action_kind: "opened",
      route_key: "sessions",
      status: "success",
      timing_bucket: "standard",
      email: "parent@example.com",
      phone: "5145551234",
      name: "Parent Name",
      message: "Private details",
      notes: "Private notes",
      token: "session-secret",
      student: "Student Name",
    }),
    {
      role: "parent",
      locale: "fr",
      action_kind: "opened",
      route_key: "sessions",
      status: "success",
      timing_bucket: "standard",
    },
  )
})

test("task boundaries are instrumented without embedding contact or session fields", async () => {
  const sources = await Promise.all([
    readFile(new URL("../src/components/FirstSessionRequestForm.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8"),
  ])
  const source = sources.join("\n")

  for (const eventName of expectedEvents) {
    assert.match(source, new RegExp(`emitTaskEvent\\(\\"${eventName}\\"`))
  }

  assert.doesNotMatch(source, /emitTaskEvent\([\s\S]{0,260}(email|phone|name|message|notes|token|student)\s*:/i)
})
