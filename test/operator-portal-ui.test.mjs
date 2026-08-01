import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

import {
  buildOperatorPriorityQueue,
  searchOperatorFamilies,
  searchOperatorTutors,
} from "../src/lib/operatorPortal.js"

test("operator priority queue deduplicates sessions and ranks urgent work", () => {
  const result = buildOperatorPriorityQueue({
    today: {
      confirmations: [{ session_id: "S1", parent_name: "Ada", start_at: "2026-08-01T13:00:00.000Z" }],
      sessions_today: [{ session_id: "S2", parent_name: "Bea", start_at: "2026-08-01T13:30:00.000Z" }],
    },
    work_queues: {
      callbacks: [{ lead_id: "L1", title: "Callback" }],
      matching: [{ lead_id: "L2", title: "Match" }],
      confirmations: [{ session_id: "S1", title: "Confirm S1" }],
      notes: [{ session_id: "S3", title: "Overdue note" }],
      payments: [{ payment_id: "P1", title: "Payment" }],
    },
  }, new Date("2026-08-01T12:00:00.000Z"))

  assert.equal(result.filter((item) => item.entityKey === "session:S1").length, 1)
  assert.deepEqual(result.map(({ priority }) => priority), [...result.map(({ priority }) => priority)].sort((a, b) => a - b))
  assert.equal(result.find((item) => item.entityKey === "session:S2")?.priority, 0)
  assert.equal(result.find((item) => item.entityKey === "lead:L1")?.priority, 1)
  assert.equal(result.find((item) => item.entityKey === "session:S1")?.priority, 2)
  assert.equal(result.find((item) => item.entityKey === "session:S3")?.priority, 3)
  assert.equal(result.find((item) => item.entityKey === "payment:P1")?.priority, 4)
})

test("operator family search covers parent, student, email, and phone with accent normalization", () => {
  const families = [
    { parent_name: "Élodie Gagnon", student_name: "Zoé", email: "elodie@example.com", phone: "514-555-0101" },
    { parent_name: "Marc Tremblay", student_name: "Noah", email: "marc@example.com", phone: "418-555-0102" },
  ]

  assert.equal(searchOperatorFamilies(families, "elodie").length, 1)
  assert.equal(searchOperatorFamilies(families, "zoe").length, 1)
  assert.equal(searchOperatorFamilies(families, "555-0101").length, 1)
})

test("operator tutor search covers name, subject, level, email, and zone", () => {
  const tutors = [
    { name: "Élodie Gagnon", subjects: "Mathématiques", levels: "Secondaire 4", email: "elodie@example.com", zone: "Laval" },
    { name: "Marc Tremblay", subjects: "Sciences", levels: "Secondaire 5", email: "marc@example.com", zone: "Montréal" },
  ]

  assert.equal(searchOperatorTutors(tutors, "mathématiques").length, 1)
  assert.equal(searchOperatorTutors(tutors, "secondaire 4").length, 1)
  assert.equal(searchOperatorTutors(tutors, "montreal").length, 1)
})

test("operator portal renders focused operations destinations instead of the stacked dashboard", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
  assert.match(source, /import OperatorToday from "@\/components\/portal\/operator\/OperatorToday"/)
  assert.match(source, /import OperatorFamilies from "@\/components\/portal\/operator\/OperatorFamilies"/)
  assert.match(source, /import OperatorTutors from "@\/components\/portal\/operator\/OperatorTutors"/)
  assert.match(source, /import OperatorCalendar from "@\/components\/portal\/operator\/OperatorCalendar"/)
  assert.match(source, /import OperatorPayments from "@\/components\/portal\/operator\/OperatorPayments"/)
  assert.match(source, /import OperatorInbox from "@\/components\/portal\/operator\/OperatorInbox"/)
  assert.match(source, /import OperatorSettings from "@\/components\/portal\/operator\/OperatorSettings"/)
  assert.match(source, /import OperatorMore from "@\/components\/portal\/operator\/OperatorMore"/)
  assert.match(source, /getPortalDestinations\("operator", locale\)/)
  for (const destination of ["today", "families", "tutors", "calendar", "payments", "inbox", "settings", "more"]) {
    assert.match(source, new RegExp(`activeDestination === "${destination}"`))
  }
  assert.doesNotMatch(source, /<TodayBoard/)
  assert.doesNotMatch(source, /<TeamPriorityBoard/)
})
