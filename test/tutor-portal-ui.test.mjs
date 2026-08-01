import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { renderToStaticMarkup } from "react-dom/server"
import { createServer } from "vite"

import { getTutorTodayModel, groupTutorSessionsByStudent } from "../src/lib/tutorPortal.js"

test("tutor attention prioritizes notes before replies", () => {
  const model = getTutorTodayModel({
    now: "2026-08-01T12:00:00.000Z",
    sessions_needing_notes: [{ session_id: "S1" }],
    messages: [{ message_id: "M1", recipient_role: "tutor", message_status: "awaiting_reply" }],
    requests: [{ request_id: "R1", status: "in_review" }],
    next_session: { session_id: "S2" },
  })

  assert.deepEqual(model.attention.map(({ kind }) => kind), ["note_due", "reply_due", "request_review"])
  assert.equal(model.nextSession.session_id, "S2")
})

test("tutor today limits the week to seven days and sorts sessions", () => {
  const model = getTutorTodayModel({
    now: "2026-08-01T12:00:00.000Z",
    sessions: [
      { session_id: "LATER", start_at: "2026-08-07T15:00:00.000Z" },
      { session_id: "FIRST", start_at: "2026-08-02T15:00:00.000Z" },
      { session_id: "OUTSIDE", start_at: "2026-08-09T15:00:00.000Z" },
      { session_id: "INVALID", start_at: "not-a-date" },
    ],
  })

  assert.deepEqual(model.weekSessions.map(({ session_id }) => session_id), ["FIRST", "LATER"])
})

test("groups tutor sessions by stable student id and normalized name fallback", () => {
  const groups = groupTutorSessionsByStudent([
    { session_id: "S2", student_id: "STU-2", student_name: " Zoe " },
    { session_id: "S1", student_id: "STU-2", student_name: "Zoe" },
    { session_id: "S4", student_name: "  Élody   Martin " },
    { session_id: "S3", student_name: "élody martin" },
  ])

  assert.deepEqual(groups.map(({ key }) => key), ["STU-2", "élody martin"])
  assert.deepEqual(groups[0].sessions.map(({ session_id }) => session_id), ["S1", "S2"])
  assert.equal(groups[1].studentName, "Élody Martin")
})

test("tutor dashboard uses focused work destinations", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
  assert.match(source, /import TutorToday from "@\/components\/portal\/tutor\/TutorToday"/)
  assert.match(source, /import TutorSchedule from "@\/components\/portal\/tutor\/TutorSchedule"/)
  assert.match(source, /import TutorStudents from "@\/components\/portal\/tutor\/TutorStudents"/)
  assert.match(source, /import TutorMessages from "@\/components\/portal\/tutor\/TutorMessages"/)
  assert.match(source, /getPortalDestinations\("tutor", locale\)/)
  assert.match(source, /selectedSessionId=/)
  assert.match(source, /const \[isFormOpen, setIsFormOpen\] = useState\(false\)/)
  for (const destination of ["today", "schedule", "students", "messages"]) {
    assert.match(source, new RegExp(`activeDestination === "${destination}"`))
  }
  assert.doesNotMatch(source, /<MetricStrip metrics=\{dashboard\.metrics\} \/>/)
})

test("tutor destinations render accessible detail panels", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const { default: TutorStudents } = await vite.ssrLoadModule("/src/components/portal/tutor/TutorStudents.jsx")
    const html = renderToStaticMarkup(TutorStudents({
      copy: { students: "Students", empty: "None" },
      groups: [{ key: "STU-1", studentName: "Ari", sessions: [{ session_id: "S1" }] }],
      onSelect: () => {},
      detail: null,
    }))
    assert.match(html, /Ari/)
    assert.match(html, /focus-visible:ring-2/)
  } finally {
    await vite.close()
  }
})
