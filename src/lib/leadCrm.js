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
  return {
    pipeline_type: "parent_lead",
    crm_stage: "new_request",
    lead_status: "callback_needed",
    lead_owner: "unassigned",
    next_action: "call_parent",
    urgency_score: getUrgencyScore(values.timeline),
    recommended_track: getRecommendedTrack(values.priorite),
    site_locale: locale,
    source_page: pageName,
    received_at: new Date().toISOString(),
  }
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
