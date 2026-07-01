export const leadCrmStages = [
  "new_request",
  "callback_needed",
  "callback_done",
  "matched",
  "first_session_booked",
  "active_follow_up",
  "closed",
]

export function buildLeadCrmMetadata({ locale = "fr", pageName = "website", values = {} }) {
  const receivedAt = new Date().toISOString()

  return {
    lead_id: createLeadId(receivedAt),
    pipeline_type: "parent_lead",
    crm_stage: "new_request",
    lead_status: "callback_needed",
    lead_owner: "unassigned",
    next_action: "call_parent",
    urgency_score: getUrgencyScore(values.timeline),
    recommended_track: getRecommendedTrack(values.priorite),
    site_locale: locale,
    source_page: pageName,
    received_at: receivedAt,
  }
}

export function buildLeadCrmPayload({ locale = "fr", pageName = "website", values = {}, metadata }) {
  const crm = metadata || buildLeadCrmMetadata({ locale, pageName, values })

  return {
    ...crm,
    parent_name: values.nom || "",
    phone: values.telephone || "",
    email: values.email || "",
    student_level_subject: values.sujet || "",
    main_concern: values.priorite || "",
    timeline: values.timeline || "",
    format: values.format || "",
    contact_preference: values.contactPreference || "",
    message: values.message || "",
    assigned_tutor: "",
    offer_recommended: "",
    callback_notes: "",
    first_session_date: "",
    first_session_summary: "",
    last_contacted_at: "",
    close_reason: "",
  }
}

export async function sendLeadToCrmWebhook(payload, webhookUrl) {
  if (!webhookUrl) {
    return { skipped: true }
  }

  const body = JSON.stringify(payload)

  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "text/plain;charset=UTF-8" })
      const queued = navigator.sendBeacon(webhookUrl, blob)

      if (queued) {
        return { queued: true }
      }
    }

    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      body,
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
    })

    return { sent: true }
  } catch {
    return { error: true }
  }
}

function createLeadId(receivedAt) {
  const randomPart =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10)

  return `LEAD-${receivedAt.slice(0, 10).replaceAll("-", "")}-${randomPart}`.toUpperCase()
}

function getUrgencyScore(timeline) {
  if (timeline === "this-week") {
    return "high"
  }

  if (timeline === "two-weeks") {
    return "medium"
  }

  if (timeline === "this-month") {
    return "normal"
  }

  return "needs_clarification"
}

function getRecommendedTrack(priority) {
  if (priority === "exam-prep") {
    return "exam_sprint"
  }

  if (priority === "weekly") {
    return "weekly_follow_up"
  }

  if (priority === "catch-up") {
    return "catch_up"
  }

  return "diagnostic_call"
}
