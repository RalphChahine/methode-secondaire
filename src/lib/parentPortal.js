function records(value) {
  return Array.isArray(value) ? value : []
}

function isScheduled(session) {
  return session && !["cancelled", "no_show"].includes(session.session_status)
}

function isUpcomingConfirmedSession(session) {
  if (!session || !["confirmed", "calendar_created"].includes(session.session_status)) {
    return false
  }
  const startAt = new Date(session.start_at).getTime()
  return !Number.isFinite(startAt) || startAt > Date.now()
}

export function getParentNextAction(dashboard = {}) {
  const profile = dashboard.profile || {}
  const matching = dashboard.matching || {}
  const sessions = records(dashboard.sessions)
  const metrics = dashboard.metrics || {}

  if (!profile.name) return { key: "profile", destination: "account" }
  if (!matching.tutor_id) return { key: "matching", destination: "sessions" }
  if (!sessions.some(isScheduled)) return { key: "booking", destination: "sessions" }
  if (Number(metrics.payments_due) > 0) return { key: "payment", destination: "sessions" }
  if (Number(metrics.messages_waiting) > 0) return { key: "message", destination: "messages" }

  const session = sessions.find((candidate) => (
    isUpcomingConfirmedSession(candidate) &&
    !hasSharedMaterial(dashboard.session_materials, candidate.session_id)
  ))
  if (session) return { key: "prepare", destination: "today", sessionId: session.session_id }

  return { key: "all_set", destination: "today" }
}

function hasSharedMaterial(materials, sessionId) {
  return records(materials).some((material) => (
    material && material.session_id === sessionId && material.status === "shared"
  ))
}

function hasReleasedParentNote(notes, sessionId) {
  return records(notes).some((note) => (
    note && note.session_id === sessionId &&
    (note.status === "released" || note.parent_status === "released" || note.released_to_parent === true)
  ))
}

export function getParentSessionProgress(session = {}, materials = [], notes = []) {
  const now = Date.now()
  const startAt = new Date(session.start_at).getTime()
  const endAt = new Date(session.end_at).getTime()
  const completed = session.session_status === "completed" || (Number.isFinite(endAt) && endAt <= now)
  const active = !completed && (
    ["in_progress", "started"].includes(session.session_status) ||
    (Number.isFinite(startAt) && startAt <= now)
  )
  const hasMaterial = hasSharedMaterial(materials, session.session_id)
  const hasNote = hasReleasedParentNote(notes, session.session_id)

  if (completed) {
    return ["done", "done", hasNote ? "done" : "current"]
  }
  if (active) {
    return ["done", "current", "upcoming"]
  }
  return [hasMaterial ? "done" : "current", "upcoming", "upcoming"]
}
