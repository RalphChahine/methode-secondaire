function records(value) {
  return Array.isArray(value) ? value : []
}

function text(value) {
  return typeof value === "string" ? value.trim() : ""
}

function activeAssignmentsForStudent(assignments, studentId) {
  return records(assignments)
    .filter((assignment) => text(assignment?.student_id) === text(studentId))
    .filter((assignment) => text(assignment?.status || "active") === "active")
    .filter((assignment) => text(assignment?.assignment_id) && text(assignment?.tutor_id))
    .map((assignment) => ({
      assignment_id: text(assignment.assignment_id),
      tutor_id: text(assignment.tutor_id),
      tutor_name: text(assignment.tutor_name),
      subjects: text(assignment.subjects),
      is_legacy: false,
    }))
    .sort((left, right) => (
      left.tutor_name.localeCompare(right.tutor_name) || left.assignment_id.localeCompare(right.assignment_id)
    ))
}

export function getStudentBookingAssignments({ student = {}, assignments = [], matching = {} } = {}) {
  const explicit = activeAssignmentsForStudent(assignments, student.student_id)
  if (explicit.length) return explicit

  const tutorId = text(student.assigned_tutor_id) || text(matching.tutor_id)
  if (!tutorId) return []

  return [{
    assignment_id: "",
    tutor_id: tutorId,
    tutor_name: text(student.assigned_tutor_name) || text(matching.tutor_name),
    subjects: text(student.student_level_subject),
    is_legacy: true,
  }]
}

export function filterBookableSlotsForAssignment(slots, assignment) {
  const tutorId = text(assignment?.tutor_id)
  return tutorId ? records(slots).filter((slot) => text(slot?.tutor_id) === tutorId) : []
}
