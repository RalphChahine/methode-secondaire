function toDate(value) {
  if (!value) return null
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function normalizeStudentName(value) {
  return String(value || "").trim().replace(/\s+/g, " ")
}

function getStudentKey(session) {
  const studentId = String(session?.student_id || "").trim()
  if (studentId) return studentId

  const name = normalizeStudentName(session?.student_name)
  if (name) return name.toLocaleLowerCase()

  return String(session?.session_id || "unknown")
}

function sortByStart(left, right) {
  const leftTime = toDate(left?.start_at)?.getTime() ?? Number.MAX_SAFE_INTEGER
  const rightTime = toDate(right?.start_at)?.getTime() ?? Number.MAX_SAFE_INTEGER
  if (leftTime !== rightTime) return leftTime - rightTime
  return String(left?.session_id || "").localeCompare(String(right?.session_id || ""))
}

export function getTutorTodayModel(dashboard = {}) {
  const sessionsNeedingNotes = Array.isArray(dashboard.sessions_needing_notes)
    ? dashboard.sessions_needing_notes
    : []
  const messages = Array.isArray(dashboard.messages) ? dashboard.messages : []
  const requests = Array.isArray(dashboard.requests) ? dashboard.requests : []
  const attention = [
    ...sessionsNeedingNotes.map((session) => ({ kind: "note_due", session })),
    ...messages
      .filter((message) => (
        message?.recipient_role === "tutor"
        && ["awaiting_reply", "needs_reply", "reply_needed"].includes(message?.message_status)
      ))
      .map((message) => ({ kind: "reply_due", message })),
    ...requests
      .filter((request) => ["in_review", "review"].includes(request?.status))
      .map((request) => ({ kind: "request_review", request })),
  ]

  const now = toDate(dashboard.now) || new Date()
  const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const weekSessions = (Array.isArray(dashboard.sessions) ? dashboard.sessions : [])
    .filter((session) => {
      const start = toDate(session?.start_at)
      return start && start.getTime() >= now.getTime() && start.getTime() < weekEnd.getTime()
    })
    .sort(sortByStart)

  return {
    attention,
    nextSession: dashboard.next_session || null,
    weekSessions,
  }
}

export function groupTutorSessionsByStudent(sessions = []) {
  const grouped = new Map()

  for (const session of Array.isArray(sessions) ? sessions : []) {
    const key = getStudentKey(session)
    const existing = grouped.get(key)
    if (existing) {
      existing.sessions.push(session)
      continue
    }

    const displayName = normalizeStudentName(session?.student_name)
      || String(session?.student_id || "").trim()
      || "Student"
    grouped.set(key, { key, studentName: displayName, sessions: [session] })
  }

  return [...grouped.values()]
    .map((group) => ({ ...group, sessions: [...group.sessions].sort(sortByStart) }))
    .sort((left, right) => {
      const leftIsId = Boolean(String(left.sessions[0]?.student_id || "").trim())
      const rightIsId = Boolean(String(right.sessions[0]?.student_id || "").trim())
      if (leftIsId !== rightIsId) return leftIsId ? -1 : 1
      return String(left.key).localeCompare(String(right.key), "en", { sensitivity: "base" })
    })
}
