import assert from "node:assert/strict"
import test from "node:test"

import { getPortalDestinations } from "../src/lib/portalNavigation.js"

test("returns task-centered destinations for each role", () => {
  assert.deepEqual(
    getPortalDestinations("parent", "fr").map(({ key }) => key),
    ["home", "sessions", "messages", "more"],
  )
  assert.deepEqual(
    getPortalDestinations("tutor", "fr").map(({ key }) => key),
    ["today", "schedule", "students", "messages"],
  )
  assert.deepEqual(
    getPortalDestinations("operator", "fr").map(({ key }) => key),
    ["today", "families", "calendar", "inbox", "more"],
  )
})

test("keeps English and French keys identical", () => {
  for (const role of ["parent", "tutor", "operator"]) {
    assert.deepEqual(
      getPortalDestinations(role, "fr").map(({ key }) => key),
      getPortalDestinations(role, "en").map(({ key }) => key),
    )
  }
})
