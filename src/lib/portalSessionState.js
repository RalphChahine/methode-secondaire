const TERMINAL_STATUSES = new Set(["cancelled", "no_show", "completed"])
const PENDING_STATUSES = new Set(["requested", "proposed"])

function records(value) {
  return Array.isArray(value) ? value : []
}

function timestamp(value) {
  const parsed = new Date(value).getTime()
  return Number.isFinite(parsed) ? parsed : null
}

function nowTimestamp(now) {
  const parsed = now instanceof Date ? now.getTime() : new Date(now).getTime()
  return Number.isFinite(parsed) ? parsed : Date.now()
}

export function isPortalSessionCurrentOrFuture(session = {}, now = new Date()) {
  const status = String(session.session_status || "").toLowerCase()
  if (TERMINAL_STATUSES.has(status)) {
    return false
  }

  const startAt = timestamp(session.start_at)
  const endAt = timestamp(session.end_at)
  const activeUntil = endAt ?? startAt
  return activeUntil !== null && activeUntil > nowTimestamp(now)
}

export function getPortalSessionState(session = {}, role = "", now = new Date()) {
  const status = String(session.session_status || "").toLowerCase()
  const startAt = timestamp(session.start_at)
  const nowAt = nowTimestamp(now)
  const isFuture = startAt !== null && startAt > nowAt
  const isExpiredProposal = PENDING_STATUSES.has(status) && !isFuture
  const ownConfirmed = role === "parent"
    ? Boolean(session.parent_confirmed_at)
    : role === "tutor"
      ? Boolean(session.tutor_confirmed_at)
      : false
  const otherConfirmed = role === "parent"
    ? Boolean(session.tutor_confirmed_at)
    : role === "tutor"
      ? Boolean(session.parent_confirmed_at)
      : false
  const bothConfirmed = Boolean(session.parent_confirmed_at && session.tutor_confirmed_at)
  const isParticipant = role === "parent" || role === "tutor"

  return {
    isExpiredProposal,
    isWaitingForOther: status === "proposed" && isFuture && ownConfirmed && !otherConfirmed,
    canConfirm: isParticipant && status === "proposed" && isFuture && !ownConfirmed,
    canRequestChange: isParticipant && ["proposed", "confirmed"].includes(status),
    canShowPayment: Boolean(
      ["confirmed", "calendar_created", "completed"].includes(status) &&
      session.payment_status === "payment_requested" &&
      bothConfirmed,
    ),
  }
}

export function groupParentSessions(sessions, now = new Date()) {
  const nowAt = nowTimestamp(now)
  return records(sessions).reduce((groups, session) => {
    const status = String(session.session_status || "").toLowerCase()
    if (["cancelled", "no_show"].includes(status)) {
      groups.cancelled.push(session)
      return groups
    }

    const startAt = timestamp(session.start_at)
    if (startAt !== null && startAt <= nowAt) {
      groups.past.push(session)
      return groups
    }

    groups.upcoming.push(session)
    return groups
  }, { upcoming: [], past: [], cancelled: [] })
}

export function findReleasedParentRecap(notes, sessionId) {
  return records(notes).find((note) => note && note.session_id === sessionId &&
    (note.status === "released" || note.parent_status === "released" || note.released_to_parent === true)) || null
}
