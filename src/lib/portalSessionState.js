const TERMINAL_STATUSES = new Set(["cancelled", "no_show", "completed"])

function records(value) {
  return Array.isArray(value) ? value : []
}

function timestamp(value) {
  if (value === null || value === undefined || (typeof value === "string" && !value.trim())) {
    return null
  }

  const parsed = new Date(value).getTime()
  return Number.isFinite(parsed) ? parsed : null
}

function byMostRecentStart(left, right) {
  const leftAt = timestamp(left?.start_at)
  const rightAt = timestamp(right?.start_at)

  if (leftAt === null && rightAt === null) return 0
  if (leftAt === null) return 1
  if (rightAt === null) return -1
  return rightAt - leftAt
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
  const isExpiredProposal = status === "proposed" && startAt !== null && !isFuture
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
    canRequestChange: isParticipant && (
      (status === "proposed" && startAt !== null) ||
      (status === "confirmed" && isPortalSessionCurrentOrFuture(session, now))
    ),
    canShowPayment: Boolean(
      ["confirmed", "calendar_created", "completed"].includes(status) &&
      session.payment_status === "payment_requested" &&
      bothConfirmed,
    ),
  }
}

export function groupParentSessions(sessions, now = new Date()) {
  const nowAt = nowTimestamp(now)
  const groups = records(sessions).reduce((groups, session) => {
    const status = String(session.session_status || "").toLowerCase()
    if (["cancelled", "no_show"].includes(status)) {
      groups.cancelled.push(session)
      return groups
    }

    const startAt = timestamp(session.start_at)
    if (startAt === null) {
      groups.upcoming.push(session)
      return groups
    }

    if (status === "completed") {
      groups.past.push(session)
      return groups
    }

    if (startAt <= nowAt) {
      groups.followUp.push(session)
      return groups
    }

    groups.upcoming.push(session)
    return groups
  }, { upcoming: [], followUp: [], past: [], cancelled: [] })

  return {
    upcoming: groups.upcoming,
    followUp: groups.followUp.sort(byMostRecentStart),
    past: groups.past.sort(byMostRecentStart),
    cancelled: groups.cancelled.sort(byMostRecentStart),
  }
}

export function findReleasedParentRecap(notes, sessionId) {
  return records(notes).find((note) => note && note.session_id === sessionId &&
    (note.status === "released" || note.parent_status === "released" || note.released_to_parent === true)) || null
}
