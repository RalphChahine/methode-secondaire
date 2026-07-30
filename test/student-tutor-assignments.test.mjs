import assert from "node:assert/strict"
import test from "node:test"
import { renderToStaticMarkup } from "react-dom/server"
import { createServer } from "vite"

import {
  filterBookableSlotsForAssignment,
  getStudentBookingAssignments,
} from "../src/lib/studentTutorAssignments.js"

const student = {
  student_id: "STUDENT-1",
  assigned_tutor_id: "LEGACY",
  assigned_tutor_name: "Legacy tutor",
  student_level_subject: "Secondary 4",
}

test("uses one explicit assignment when David covers mathematics and science", () => {
  const assignments = getStudentBookingAssignments({
    student,
    matching: {},
    assignments: [{
      assignment_id: "ASSIGN-DAVID",
      student_id: "STUDENT-1",
      tutor_id: "TUTOR-DAVID",
      tutor_name: "David",
      subjects: "Mathematics, Science",
      status: "active",
    }],
  })

  assert.deepEqual(assignments, [{
    assignment_id: "ASSIGN-DAVID",
    tutor_id: "TUTOR-DAVID",
    tutor_name: "David",
    subjects: "Mathematics, Science",
    is_legacy: false,
  }])
})

test("keeps David mathematics and Joanie science separate and filters their slots", () => {
  const assignments = getStudentBookingAssignments({
    student,
    matching: {},
    assignments: [
      { assignment_id: "ASSIGN-JOANIE", student_id: "STUDENT-1", tutor_id: "TUTOR-JOANIE", tutor_name: "Joanie", subjects: "Science", status: "active" },
      { assignment_id: "ASSIGN-DAVID", student_id: "STUDENT-1", tutor_id: "TUTOR-DAVID", tutor_name: "David", subjects: "Mathematics", status: "active" },
    ],
  })

  assert.deepEqual(assignments.map(({ tutor_name, subjects }) => [tutor_name, subjects]), [
    ["David", "Mathematics"],
    ["Joanie", "Science"],
  ])
  assert.deepEqual(filterBookableSlotsForAssignment([
    { slot_id: "DAVID-1", tutor_id: "TUTOR-DAVID" },
    { slot_id: "JOANIE-1", tutor_id: "TUTOR-JOANIE" },
  ], assignments[1]), [{ slot_id: "JOANIE-1", tutor_id: "TUTOR-JOANIE" }])
})

test("falls back to the historical student assignment only when no dedicated assignment exists", () => {
  assert.deepEqual(getStudentBookingAssignments({ student, assignments: [], matching: {} }), [{
    assignment_id: "",
    tutor_id: "LEGACY",
    tutor_name: "Legacy tutor",
    subjects: "Secondary 4",
    is_legacy: true,
  }])
})

test("renders every assigned tutor with their subjects before slot selection", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const { default: TutorAssignmentPicker } = await vite.ssrLoadModule("/src/components/portal/TutorAssignmentPicker.jsx")
    const html = renderToStaticMarkup(TutorAssignmentPicker({
      copy: { bookingTutorAndSubjects: "Tutor and subjects", bookingTutorAssignmentRequired: "Choose a tutor first" },
      assignments: [
        { assignment_id: "ASSIGN-DAVID", tutor_name: "David", subjects: "Mathematics, Science" },
        { assignment_id: "ASSIGN-JOANIE", tutor_name: "Joanie", subjects: "Science" },
      ],
      selectedAssignmentId: "ASSIGN-DAVID",
      onSelect: () => {},
    }))
    assert.match(html, /Tutor and subjects/)
    assert.match(html, /David/)
    assert.match(html, /Mathematics, Science/)
    assert.match(html, /Joanie/)
    assert.match(html, /aria-pressed="true"/)
  } finally {
    await vite.close()
  }
})
