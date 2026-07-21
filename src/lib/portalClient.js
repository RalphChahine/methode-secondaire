const PORTAL_STORAGE_KEY = "methode-secondaire-portal-session"
const PORTAL_REQUEST_TIMEOUT_MS = 25000

export function loadPortalSession() {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const raw = window.localStorage.getItem(PORTAL_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function savePortalSession(session) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(PORTAL_STORAGE_KEY, JSON.stringify(session))
}

export function clearPortalSession() {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.removeItem(PORTAL_STORAGE_KEY)
}

export async function requestPortalCode({ role, email }) {
  return portalRequest({
    action: "portal_request_code",
    role,
    email,
  })
}

export async function createPortalAccount({ role, values }) {
  return portalRequest({
    action: "portal_create_account",
    role,
    ...values,
  })
}

export async function verifyPortalCode({ role, email, code }) {
  return portalRequest({
    action: "portal_verify_code",
    role,
    email,
    code,
  })
}

export async function getPortalDashboard({ role, token }) {
  return portalRequest({
    action: "portal_get_dashboard",
    role,
    token,
  })
}

export async function createPortalSession({ token, values }) {
  return portalRequest({
    action: "portal_create_session",
    token,
    ...values,
  })
}

export async function upsertPortalPaymentLink({ token, values }) {
  return portalRequest({
    action: "portal_upsert_payment_link",
    token,
    ...values,
  })
}

export async function respondToPortalSession({ role, token, sessionId, response, message }) {
  return portalRequest({
    action: "portal_respond_to_session",
    role,
    token,
    session_id: sessionId,
    response,
    message,
  })
}

export async function submitPortalSessionNote({ token, values }) {
  return portalRequest({
    action: "portal_submit_session_note",
    token,
    ...values,
  })
}

export async function bookPortalSession({ token, values }) {
  return portalRequest({
    action: "portal_book_session",
    token,
    ...values,
  })
}

export async function submitParentFeedback({ token, values }) {
  return portalRequest({
    action: "portal_submit_parent_feedback",
    token,
    ...values,
  })
}

export async function updatePortalParentProfile({ token, values }) {
  return portalRequest({
    action: "portal_update_parent_profile",
    token,
    ...values,
  })
}

export async function upsertPortalStudent({ token, role, values }) {
  return portalRequest({
    action: "portal_upsert_student",
    token,
    role,
    ...values,
  })
}

export async function assignPortalStudentTutor({ token, studentId, tutorId }) {
  return portalRequest({
    action: "portal_assign_student_tutor",
    token,
    student_id: studentId,
    tutor_id: tutorId,
  })
}

export async function deletePortalTestRecord({ token, recordType, recordId }) {
  return portalRequest({
    action: "portal_delete_test_record",
    token,
    record_type: recordType,
    record_id: recordId,
  })
}

export async function deletePortalTestRecords({ token, records }) {
  return portalRequest({
    action: "portal_delete_test_records",
    token,
    confirmation: "DELETE_TEST_DATA",
    records: Array.isArray(records)
      ? records.map(({ record_type, record_id }) => ({ record_type, record_id }))
      : [],
  })
}

export async function upsertPortalParent({ token, values }) {
  return portalRequest({
    action: "portal_upsert_parent",
    token,
    ...values,
  })
}

export async function createPortalParent({ token, values }) {
  return portalRequest({
    action: "portal_create_parent",
    token,
    ...values,
  })
}

export async function updatePortalLeadFollowUp({ token, leadId, leadStatus, callbackNotes }) {
  return portalRequest({
    action: "portal_update_lead_follow_up",
    token,
    lead_id: leadId,
    lead_status: leadStatus,
    callback_notes: callbackNotes,
  })
}

export async function setPortalParentAccess({ token, leadId, accessStatus }) {
  return portalRequest({
    action: "portal_set_parent_access",
    token,
    lead_id: leadId,
    access_status: accessStatus,
  })
}

export async function deletePortalParent({ token, leadId, confirmationEmail }) {
  return portalRequest({
    action: "portal_delete_parent",
    token,
    lead_id: leadId,
    confirmation_email: confirmationEmail,
  })
}

export async function assignPortalTutor({ token, leadId, tutorId }) {
  return portalRequest({
    action: "portal_assign_tutor",
    token,
    lead_id: leadId,
    tutor_id: tutorId,
  })
}

export async function createPortalTutor({ token, values }) {
  return portalRequest({
    action: "portal_create_tutor",
    token,
    ...values,
  })
}

export async function updatePortalTutorCalendar({ token, tutorId, calendarId }) {
  return portalRequest({
    action: "portal_update_tutor_calendar",
    token,
    tutor_id: tutorId,
    calendar_id: calendarId,
  })
}

export async function deletePortalTutor({ token, tutorId, confirmationEmail }) {
  return portalRequest({
    action: "portal_delete_tutor",
    token,
    tutor_id: tutorId,
    confirmation_email: confirmationEmail,
  })
}

export async function invitePortalTutor({ token, tutorId }) {
  return portalRequest({
    action: "portal_invite_tutor",
    token,
    tutor_id: tutorId,
  })
}

export async function sendPortalSessionMessage({ token, sessionId, message }) {
  return portalRequest({
    action: "portal_send_session_message",
    token,
    session_id: sessionId,
    message,
  })
}

export async function cancelPortalSession({ role, token, sessionId, reason }) {
  return portalRequest({
    action: "portal_cancel_session",
    role,
    token,
    session_id: sessionId,
    reason,
  })
}

export async function reschedulePortalSession({ token, sessionId, startAt, durationMinutes }) {
  return portalRequest({
    action: "portal_reschedule_session",
    token,
    session_id: sessionId,
    start_at: startAt,
    duration_minutes: durationMinutes,
  })
}

export async function upsertPortalTutorAvailability({ token, values }) {
  return portalRequest({
    action: "portal_upsert_tutor_availability",
    token,
    ...values,
  })
}

export async function completePortalDemoPayment({ token, sessionId }) {
  return portalRequest({
    action: "portal_complete_demo_payment",
    token,
    session_id: sessionId,
  })
}

export async function reissuePortalPaymentCheckout({ token, paymentId }) {
  return portalRequest({
    action: "portal_reissue_payment_checkout",
    token,
    payment_id: paymentId,
  })
}

export async function updatePortalRequestStatus({ token, requestId, status }) {
  return portalRequest({
    action: "portal_update_request_status",
    token,
    request_id: requestId,
    status,
  })
}

export async function createPortalRequest({ role, token, values }) {
  return portalRequest({
    action: "portal_create_request",
    role,
    token,
    ...values,
  })
}

export async function upsertPortalPlan({ token, values }) {
  return portalRequest({
    action: "portal_upsert_plan",
    token,
    ...values,
  })
}

export async function createPortalPlanEnrollment({ token, values }) {
  return portalRequest({
    action: "portal_create_plan_enrollment",
    token,
    ...values,
  })
}

export async function createPortalPlanPaymentRequest({ token, enrollmentId, paymentStage }) {
  return portalRequest({
    action: "portal_create_plan_payment_request",
    token,
    enrollment_id: enrollmentId,
    payment_stage: paymentStage,
  })
}

export async function updatePortalPlanEnrollment({ token, enrollmentId, values }) {
  return portalRequest({
    action: "portal_update_plan_enrollment",
    token,
    enrollment_id: enrollmentId,
    ...values,
  })
}

export async function pausePortalPlanEnrollment({ token, enrollmentId, pauseFromAt }) {
  return portalRequest({
    action: "portal_pause_plan_enrollment",
    token,
    enrollment_id: enrollmentId,
    ...(pauseFromAt ? { pause_from_at: pauseFromAt } : {}),
  })
}

export async function resumePortalPlanEnrollment({ token, enrollmentId }) {
  return portalRequest({
    action: "portal_resume_plan_enrollment",
    token,
    enrollment_id: enrollmentId,
  })
}

export async function adjustPortalPlanCredits({ token, enrollmentId, values }) {
  return portalRequest({
    action: "portal_adjust_plan_credits",
    token,
    enrollment_id: enrollmentId,
    ...values,
  })
}

export async function getPortalPlanChangeDeadline({ token, enrollmentId }) {
  return portalRequest({
    action: "portal_get_plan_change_deadline",
    token,
    enrollment_id: enrollmentId,
  })
}

async function portalRequest(payload) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), PORTAL_REQUEST_TIMEOUT_MS)
  let response

  try {
    response = await fetch("/api/portal", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })
  } catch (error) {
    return {
      ok: false,
      code: error?.name === "AbortError" ? "PORTAL_REQUEST_TIMEOUT" : "PORTAL_API_UNAVAILABLE",
      message: "Portal request could not be completed.",
    }
  } finally {
    clearTimeout(timeoutId)
  }

  const contentType = response.headers.get("content-type") || ""
  const body = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : null

  if (!body) {
    return {
      ok: false,
      code: "PORTAL_API_UNAVAILABLE",
      message: "Portal API did not return JSON.",
    }
  }

  if (!response.ok) {
    return {
      ok: false,
      code: body?.code || "PORTAL_REQUEST_FAILED",
      message: body?.message || "Portal request failed.",
    }
  }

  return body || { ok: false, code: "PORTAL_EMPTY_RESPONSE" }
}
