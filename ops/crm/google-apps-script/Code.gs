const CRM_SHEET_NAME = "Parent Leads";
const CRM_CONFIG_SHEET_NAME = "Config";
const CRM_DAILY_VIEW_NAME = "A rappeler aujourd'hui";
const CRM_FIRST_SESSION_VIEW_NAME = "Premieres seances";
const CRM_ACTIVE_VIEW_NAME = "Suivis actifs";
const CRM_MATCHING_VIEW_NAME = "Matching Queue";
const CRM_SCHEDULE_VIEW_NAME = "Schedule Queue";
const CRM_PAYMENT_VIEW_NAME = "Payment Queue";
const CRM_SESSION_NOTE_VIEW_NAME = "Session Notes Queue";
const CRM_TUTOR_SHEET_NAME = "Tutor Roster";
const TUTOR_BASE_HOURLY_RATE_CAD = 28;
const CRM_TUTOR_AVAILABILITY_SHEET_NAME = "Tutor Availability";
const CRM_SESSION_SHEET_NAME = "Sessions";
const CRM_SESSION_NOTE_SHEET_NAME = "Session Notes";
const CRM_PAYMENT_SHEET_NAME = "Payments";
const CRM_PAYMENT_LINK_SHEET_NAME = "Payment Links";
const CRM_DASHBOARD_SHEET_NAME = "Ops Dashboard";
const CRM_PORTAL_ACCESS_SHEET_NAME = "Portal Access";
const CRM_PORTAL_REQUEST_SHEET_NAME = "Portal Requests";
const CRM_PARENT_FEEDBACK_SHEET_NAME = "Parent Feedback";
const CRM_PORTAL_MESSAGE_SHEET_NAME = "Portal Messages";
const CRM_STUDENT_SHEET_NAME = "Students";
const CRM_PLAN_SHEET_NAME = "Plans";
const CRM_PLAN_ENROLLMENT_SHEET_NAME = "Plan Enrollments";
const CRM_CREDIT_LEDGER_SHEET_NAME = "Credit Ledger";
const PORTAL_OPERATOR_EMAILS = ["chahineralph@gmail.com"];
const CRM_REQUIRED_SHEET_NAMES = [
  CRM_SHEET_NAME,
  CRM_CONFIG_SHEET_NAME,
  CRM_DAILY_VIEW_NAME,
  CRM_FIRST_SESSION_VIEW_NAME,
  CRM_ACTIVE_VIEW_NAME,
  CRM_MATCHING_VIEW_NAME,
  CRM_SCHEDULE_VIEW_NAME,
  CRM_PAYMENT_VIEW_NAME,
  CRM_SESSION_NOTE_VIEW_NAME,
  CRM_TUTOR_SHEET_NAME,
  CRM_TUTOR_AVAILABILITY_SHEET_NAME,
  CRM_SESSION_SHEET_NAME,
  CRM_SESSION_NOTE_SHEET_NAME,
  CRM_PAYMENT_SHEET_NAME,
  CRM_PAYMENT_LINK_SHEET_NAME,
  CRM_DASHBOARD_SHEET_NAME,
  CRM_PORTAL_ACCESS_SHEET_NAME,
  CRM_PORTAL_REQUEST_SHEET_NAME,
  CRM_PARENT_FEEDBACK_SHEET_NAME,
  CRM_PORTAL_MESSAGE_SHEET_NAME,
  CRM_STUDENT_SHEET_NAME,
  CRM_PLAN_SHEET_NAME,
  CRM_PLAN_ENROLLMENT_SHEET_NAME,
  CRM_CREDIT_LEDGER_SHEET_NAME,
];

const CRM_COLUMNS = [
  "lead_id",
  "received_at",
  "crm_stage",
  "lead_status",
  "next_action",
  "next_action_due",
  "lead_owner",
  "source_page",
  "site_locale",
  "parent_name",
  "phone",
  "email",
  "student_level_subject",
  "main_concern",
  "timeline",
  "format",
  "contact_preference",
  "recommended_track",
  "urgency_score",
  "message",
  "assigned_tutor",
  "offer_recommended",
  "callback_notes",
  "first_session_date",
  "first_session_summary",
  "last_contacted_at",
  "close_reason",
  "privacy_consent_at",
  "privacy_consent_version",
  "parent_intent",
];

const CRM_STAGE_OPTIONS = [
  "new_request",
  "callback_needed",
  "callback_done",
  "matched",
  "first_session_booked",
  "active_follow_up",
  "closed",
];

const LEAD_STATUS_OPTIONS = [
  "callback_needed",
  "waiting_parent",
  "ready_to_match",
  "matched",
  "booked",
  "active",
  "closed",
];

const NEXT_ACTION_OPTIONS = [
  "call_parent",
  "send_follow_up",
  "assign_tutor",
  "book_first_session",
  "send_session_summary",
  "collect_session_note",
  "close_lead",
];

const TUTOR_COLUMNS = [
  "tutor_id",
  "tutor_name",
  "status",
  "subjects",
  "levels",
  "formats",
  "zones",
  "languages",
  "weekly_capacity",
  "active_students",
  "available_slots",
  "new_students_this_week",
  "calendar_email",
  "calendar_id",
  "booking_page_url",
  "hourly_rate_cad",
  "payment_terms",
  "notes",
  "last_updated_at",
];

const TUTOR_STATUS_OPTIONS = ["active", "paused", "backup", "inactive"];
const TUTOR_FORMAT_OPTIONS = ["online", "in_person", "either"];
const TUTOR_LANGUAGE_OPTIONS = ["fr", "en", "bilingual"];

const AVAILABILITY_COLUMNS = [
  "availability_id",
  "tutor_id",
  "tutor_name",
  "weekday",
  "start_time",
  "end_time",
  "timezone",
  "format",
  "location",
  "calendar_id",
  "booking_page_url",
  "status",
  "notes",
  "last_updated_at",
];

const SESSION_COLUMNS = [
  "session_id",
  "lead_id",
  "parent_name",
  "student_name",
  "student_level_subject",
  "tutor_id",
  "tutor_name",
  "tutor_calendar_email",
  "parent_email",
  "session_status",
  "session_type",
  "start_at",
  "end_at",
  "timezone",
  "format",
  "location",
  "google_calendar_event_id",
  "payment_status",
  "payment_link",
  "amount_cad",
  "notes",
  "created_at",
  "updated_at",
  "parent_confirmed_at",
  "tutor_confirmed_at",
  "calendar_invites_sent_at",
  "recurrence_weeks",
  "recurring_from_session_id",
  "parent_reminder_sent_at",
  "tutor_reminder_sent_at",
  "tutor_note_reminder_sent_at",
  "team_note_escalation_sent_at",
  "parent_feedback_reminder_sent_at",
  "student_id",
  // These fields are intentionally optional. Existing one-off sessions keep
  // their current lifecycle; cancellation notice is globally enforced at 72 h.
  "plan_enrollment_id",
  "modification_deadline_at",
  "cancellation_notice_hours",
  "credit_reservation_id",
  "google_meet_url",
  "calendar_conference_status",
  "payment_due_at",
  "stripe_checkout_session_id",
];

const STUDENT_COLUMNS = [
  "student_id",
  "lead_id",
  "parent_email",
  "student_name",
  "student_level_subject",
  "learning_notes",
  "status",
  "assigned_tutor_id",
  "assigned_tutor_name",
  "created_at",
  "updated_at",
];

const SESSION_NOTE_COLUMNS = [
  "note_id",
  "session_id",
  "lead_id",
  "parent_name",
  "student_name",
  "tutor_id",
  "tutor_name",
  "session_date",
  "subject_level",
  "attendance",
  "focus_worked",
  "wins",
  "stuck_points",
  "homework_next",
  "parent_summary",
  "risk_level",
  "next_recommendation",
  "parent_update_status",
  "follow_up_owner",
  "follow_up_due",
  "created_at",
  "updated_at",
  "student_confidence",
  "next_goal",
];

const PARENT_FEEDBACK_COLUMNS = [
  "feedback_id",
  "session_id",
  "lead_id",
  "parent_email",
  "parent_name",
  "tutor_id",
  "tutor_name",
  "rating",
  "clarity_rating",
  "student_confidence",
  "follow_up_needed",
  "comment",
  "status",
  "created_at",
  "updated_at",
];

const PORTAL_MESSAGE_COLUMNS = [
  "message_id",
  "session_id",
  "lead_id",
  "sender_role",
  "sender_name",
  "parent_email",
  "tutor_id",
  "tutor_email",
  "message",
  "delivery_status",
  "created_at",
  "recipient_role",
  "message_status",
  "reply_due_at",
  "answered_at",
];

const PLAN_COLUMNS = [
  "plan_id",
  "plan_type",
  "name",
  "description",
  "status",
  "session_count",
  "price_cad",
  "unit_price_cad",
  "cadence",
  "cancellation_notice_hours",
  "validity_days",
  "eligible_session_types",
  "billing_mode",
  "notes",
  "created_at",
  "updated_at",
];

const PLAN_ENROLLMENT_COLUMNS = [
  "enrollment_id",
  "plan_id",
  "lead_id",
  "parent_email",
  "student_id",
  "student_name",
  "tutor_id",
  "tutor_name",
  "status",
  "cadence",
  "scheduled_weekday",
  "scheduled_time",
  "timezone",
  "start_at",
  "pause_from_at",
  "paused_at",
  "resumed_at",
  "cancelled_at",
  "cancellation_notice_hours",
  "billing_status",
  "expires_at",
  "notes",
  "created_at",
  "updated_at",
];

const CREDIT_LEDGER_COLUMNS = [
  "credit_ledger_id",
  "enrollment_id",
  "plan_id",
  "session_id",
  "related_credit_ledger_id",
  "parent_email",
  "student_id",
  "entry_type",
  "available_delta",
  "reserved_delta",
  "used_delta",
  "reason",
  "expires_at",
  "created_at",
  "source_payment_id",
];

const PAYMENT_COLUMNS = [
  "payment_id",
  "session_id",
  "lead_id",
  "parent_name",
  "email",
  "offer",
  "amount_cad",
  "payment_method",
  "payment_status",
  "payment_link",
  "invoice_id",
  "due_date",
  "paid_at",
  "tutor_payout_cad",
  "payout_status",
  "notes",
  "created_at",
  "updated_at",
  "plan_enrollment_id",
  "credit_grant_count",
  "stripe_checkout_session_id",
  "checkout_expires_at",
  "checkout_url",
];

const PAYMENT_LINK_COLUMNS = [
  "payment_link_id",
  "offer",
  "description",
  "amount_cad",
  "stripe_payment_link",
  "interac_email",
  "status",
  "notes",
  "last_updated_at",
];

const PORTAL_ACCESS_COLUMNS = [
  "access_id",
  "role",
  "email",
  "display_name",
  "related_id",
  "status",
  "code_hash",
  "code_expires_at",
  "session_token_hash",
  "session_expires_at",
  "last_login_at",
  "created_at",
  "updated_at",
  "failed_code_attempts",
  "code_locked_until",
  "last_code_requested_at",
];

const PORTAL_REQUEST_COLUMNS = [
  "request_id",
  "created_at",
  "role",
  "email",
  "related_id",
  "request_type",
  "subject",
  "message",
  "status",
  "owner",
  "due_at",
  "updated_at",
];

const AVAILABILITY_STATUS_OPTIONS = ["open", "limited", "full", "paused"];
const WEEKDAY_OPTIONS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const SESSION_STATUS_OPTIONS = ["requested", "proposed", "confirmed", "calendar_created", "completed", "cancelled", "no_show"];
// `weekly_follow_up` is an internal session-type value kept for existing
// session rows. It is not the name of a public product.
const SESSION_TYPE_OPTIONS = ["first_session", "weekly_follow_up", "exam_sprint", "catch_up", "one_time"];
const PUBLIC_OFFER_CODES = ["targeted_session", "momentum_block", "progression_block"];
const LEGACY_PUBLIC_OFFER_CODES = {
  first_session_declic: "targeted_session",
  weekly: "progression_block",
  progression: "progression_block",
  progression_block_10: "progression_block",
  weekly_follow_up_10: "progression_block",
};
const PACKAGE_PAYMENT_OFFER_CODES = [
  "momentum_block_payment_1",
  "progression_block_payment_1",
  "progression_block_payment_2",
];
// Payment-link setup lists current session types and canonical package paths.
// Legacy installment values are normalized below only for historical records.
const PAYMENT_LINK_OFFER_OPTIONS = [
  ...SESSION_TYPE_OPTIONS,
  ...PACKAGE_PAYMENT_OFFER_CODES,
];
const DEFAULT_SESSION_PRICE_CAD = {
  first_session: "65",
  weekly_follow_up: "65",
  exam_sprint: "65",
  catch_up: "65",
  one_time: "65",
};
const SESSION_ATTENDANCE_OPTIONS = ["present", "late", "cancelled", "no_show"];
const SESSION_RISK_OPTIONS = ["green", "watch", "high"];
const SESSION_RECOMMENDATION_OPTIONS = [
  "keep_weekly",
  "add_practice",
  "exam_sprint",
  "parent_call",
  "change_tutor",
  "pause",
  "no_change",
];
const PARENT_UPDATE_STATUS_OPTIONS = ["draft", "ready_to_send", "sent", "not_needed"];
const STUDENT_STATUS_OPTIONS = ["active", "paused", "archived"];
// Keep simulated payments separate from real revenue until Stripe is enabled.
const PAYMENT_STATUS_OPTIONS = ["not_requested", "payment_requested", "demo_paid", "paid", "overdue", "refunded", "waived"];
const PAYMENT_METHOD_OPTIONS = ["stripe_checkout", "stripe_payment_link", "demo", "interac", "cash", "other"];
const PAYOUT_STATUS_OPTIONS = ["not_due", "pending", "paid", "held"];
const PAYMENT_LINK_STATUS_OPTIONS = ["active", "draft", "paused"];
const PORTAL_ROLE_OPTIONS = ["parent", "tutor", "operator"];
const PORTAL_ACCESS_STATUS_OPTIONS = ["active", "pending", "disabled"];
const PLAN_TYPE_OPTIONS = ["one_time", "weekly", "pack"];
const PLAN_STATUS_OPTIONS = ["draft", "active", "paused", "archived"];
const PLAN_CADENCE_OPTIONS = ["one_time", "weekly", "biweekly"];
const PLAN_BILLING_MODE_OPTIONS = ["manual_tracking", "future_stripe"];
const PLAN_ENROLLMENT_STATUS_OPTIONS = ["pending", "active", "paused", "cancelled", "completed", "expired"];
const PLAN_ENROLLMENT_BILLING_STATUS_OPTIONS = ["not_configured", "manual_tracking", "payment_pending", "credited"];
const CREDIT_LEDGER_ENTRY_TYPE_OPTIONS = ["grant", "reserve", "release", "consume", "adjustment", "expiry"];
const PORTAL_REQUEST_TYPE_OPTIONS = [
  "parent_question",
  "parent_session_note",
  "schedule_change",
  "payment_question",
  "tutor_note",
  "technical_help",
  "tutor_access_request",
];
const PORTAL_REQUEST_STATUS_OPTIONS = ["new", "in_review", "done", "closed"];
const PARENT_FEEDBACK_STATUS_OPTIONS = ["new", "reviewed", "closed"];
const PORTAL_MESSAGE_DELIVERY_OPTIONS = ["portal_only", "email_notified"];
const PORTAL_MESSAGE_STATUS_OPTIONS = ["awaiting_reply", "answered", "overdue_alerted"];
const PORTAL_SESSION_DAYS = 14;
const PORTAL_CODE_MINUTES = 15;
const PORTAL_CODE_MAX_FAILED_ATTEMPTS = 5;
const PORTAL_CODE_FAILURE_COOLDOWN_MINUTES = 15;
const PORTAL_CODE_REQUEST_COOLDOWN_SECONDS = 60;
// This is enforced server-side for every parent/tutor cancellation request.
// Public copy and any future plan should describe the same 72-hour window.
const SESSION_CANCELLATION_NOTICE_HOURS = 72;
const PLAN_MODIFICATION_NOTICE_HOURS = SESSION_CANCELLATION_NOTICE_HOURS;
const PORTAL_MESSAGE_REPLY_HOURS = 24;
const PAYMENT_WEBHOOK_SECRET_PROPERTY = "PAYMENT_WEBHOOK_SECRET";
const PAYMENT_SESSION_SECRET_PROPERTY = "PAYMENT_SESSION_SECRET";
const PAYMENT_CHECKOUT_ENDPOINT_PROPERTY = "PAYMENT_CHECKOUT_ENDPOINT";
const PAYMENT_CHECKOUT_EXPIRE_ENDPOINT_PROPERTY = "PAYMENT_CHECKOUT_EXPIRE_ENDPOINT";
const PAYMENT_CHECKOUT_EXPIRY_MS = 60 * 60 * 1000;
const CRM_PORTAL_SECRET_PROPERTY = "CRM_PORTAL_SECRET";
const PORTAL_PUBLIC_URL = "https://methode-secondaire.vercel.app/portail";
const SESSION_REMINDER_LEAD_HOURS = 24;
const SESSION_REMINDER_MINIMUM_MINUTES = 45;
const POST_SESSION_REMINDER_MAX_HOURS = 72;
const TEAM_DAILY_DIGEST_HOUR = 7;
const TEAM_DAILY_DIGEST_MINUTE = 30;
const TEAM_DAILY_DIGEST_MAX_ITEMS = 8;

function setupCrm() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  setupLeadSheet_(sheet);
  setupTutorRosterSheet_(getOrCreateSheet_(spreadsheet, CRM_TUTOR_SHEET_NAME));
  setupTutorAvailabilitySheet_(getOrCreateSheet_(spreadsheet, CRM_TUTOR_AVAILABILITY_SHEET_NAME));
  setupSessionsSheet_(getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME));
  setupSessionNotesSheet_(getOrCreateSheet_(spreadsheet, CRM_SESSION_NOTE_SHEET_NAME));
  setupPaymentSheet_(getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME));
  setupPaymentLinksSheet_(getOrCreateSheet_(spreadsheet, CRM_PAYMENT_LINK_SHEET_NAME));
  setupPortalAccessSheet_(getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME));
  setupPortalRequestsSheet_(getOrCreateSheet_(spreadsheet, CRM_PORTAL_REQUEST_SHEET_NAME));
  setupParentFeedbackSheet_(getOrCreateSheet_(spreadsheet, CRM_PARENT_FEEDBACK_SHEET_NAME));
  setupPortalMessagesSheet_(getOrCreateSheet_(spreadsheet, CRM_PORTAL_MESSAGE_SHEET_NAME));
  setupStudentsSheet_(getOrCreateSheet_(spreadsheet, CRM_STUDENT_SHEET_NAME));
  setupPlansSheet_(getOrCreateSheet_(spreadsheet, CRM_PLAN_SHEET_NAME));
  setupPlanEnrollmentsSheet_(getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME));
  setupCreditLedgerSheet_(getOrCreateSheet_(spreadsheet, CRM_CREDIT_LEDGER_SHEET_NAME));
  seedDefaultPlans_(spreadsheet);
  setupViews_(spreadsheet);
  setupDashboard_(spreadsheet);
  setupConfigSheet_(spreadsheet);
  installPortalAutomation();
}

function doGet() {
  return jsonResponse_({
    ok: true,
    service: "methode-secondaire-parent-crm",
    spreadsheet_id: SpreadsheetApp.getActiveSpreadsheet().getId(),
  });
}

function doPost(event) {
  let rawPayload = {};

  try {
    rawPayload = parseRawPayload_(event);
    if (isPortalAction_(rawPayload.action) && !hasValidPortalProxySecret_(rawPayload.action, rawPayload.portal_secret)) {
      return jsonResponse_({ ok: false, code: "PORTAL_PROXY_UNAUTHORIZED" });
    }
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    ensureCrmReady_(spreadsheet);

    if (isPortalAction_(rawPayload.action)) {
      return jsonResponse_(handlePortalAction_(spreadsheet, rawPayload));
    }

    const payload = normalizeLeadPayload_(rawPayload);
    const sheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
    const row = CRM_COLUMNS.map((column) => normalizeValue_(payload[column]));
    sheet.appendRow(row);

    return jsonResponse_({ ok: true, lead_id: payload.lead_id || "" });
  } catch (error) {
    if (isPortalAction_(rawPayload.action)) {
      return jsonResponse_(portalRequestError_(error));
    }

    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function syncConfirmedSessionsToCalendar() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ensureCrmReady_(spreadsheet);

  const sheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  let created = 0;
  const errors = [];

  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    const session = rowToRecord_(row, SESSION_COLUMNS);
    const status = normalizeValue_(session.session_status);
    const existingEventId = normalizeValue_(session.google_calendar_event_id);
    const conferenceStatus = normalizeValue_(session.calendar_conference_status);

    if (status !== "confirmed" || existingEventId || conferenceStatus === "failed") {
      continue;
    }

    const result = createCalendarEventForConfirmedSession_(spreadsheet, session.session_id);
    if (result.created) {
      created += 1;
    } else if (result.error) {
      errors.push(`Row ${rowIndex + 1}: ${result.error}`);
    }
  }

  return { ok: errors.length === 0, created, errors };
}

function createCalendarEventForConfirmedSession_(spreadsheet, sessionId) {
  const result = withMeetConferenceState_(spreadsheet, sessionId, ({ sheet, record }) => {
    if (!record) return { skipped: true };
    const session = record.data;
    if (normalizeValue_(session.session_status) !== "confirmed" ||
        normalizeValue_(session.google_calendar_event_id) ||
        normalizeValue_(session.calendar_conference_status) === "failed") {
      return { skipped: true };
    }
    const startAt = coerceDate_(session.start_at);
    const endAt = coerceDate_(session.end_at);
    if (!startAt || !endAt) {
      return { error: "missing start_at or end_at" };
    }

    let calendarId = "";
    let eventId = "";
    try {
      if (normalizeValue_(session.format) === "online") {
        if (!normalizeValue_(session.tutor_id) || !normalizeEmail_(session.tutor_calendar_email) ||
            !normalizeEmail_(session.parent_email)) {
          throw new Error("les participants de la seance en ligne sont incomplets");
        }
        calendarId = resolveTutorCalendarId_(spreadsheet, session);
        if (!calendarId) {
          throw new Error("le calendrier du tuteur n'est pas configure");
        }
        const event = Calendar.Events.insert(buildTutorHostedMeetEvent_(session), calendarId, {
          conferenceDataVersion: 1,
          sendUpdates: "none",
        });
        eventId = normalizeValue_(event.id);
        if (!eventId) throw new Error("l'evenement Google Calendar n'a pas retourne d'identifiant");
        writeRecord_(sheet, SESSION_COLUMNS, record.rowNumber, {
          ...session,
          google_calendar_event_id: eventId,
          session_status: "calendar_created",
          calendar_conference_status: "pending",
          updated_at: new Date().toISOString(),
        });
        return { created: true };
      }

      const calendar = resolveCalendarForTutor_(spreadsheet, session.tutor_id);
      if (!calendar) throw new Error("le calendrier du tuteur n'est pas disponible a l'equipe");
      const options = {
        description: buildCalendarDescription_(SESSION_COLUMNS.map((column) => session[column]), indexColumns_(SESSION_COLUMNS)),
        location: normalizeValue_(session.location),
        sendInvites: true,
      };
      const guests = [session.tutor_calendar_email, session.parent_email].map(normalizeValue_).filter(Boolean).join(",");
      if (guests) options.guests = guests;
      const event = calendar.createEvent(buildSessionCalendarTitle_(session), startAt, endAt, options);
      eventId = normalizeValue_(event.getId());
      writeRecord_(sheet, SESSION_COLUMNS, record.rowNumber, {
        ...session,
        google_calendar_event_id: eventId,
        session_status: "calendar_created",
        calendar_conference_status: "not_required",
        calendar_invites_sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return { created: true };
    } catch (error) {
      return {
        error: String(error),
        session,
        sheet,
        rowNumber: record.rowNumber,
        calendarId,
        eventId,
      };
    }
  });
  if (result?.session && normalizeValue_(result.session.format) === "online") {
    return reconcileMeetCreationFailure_(spreadsheet, sessionId, result);
  }
  return result || { skipped: true };
}

function withMeetConferenceState_(spreadsheet, sessionId, callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return { error: "le verrou de creation de seance est occupe" };
  try {
    const sheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
    const record = findSheetRecordById_(sheet, SESSION_COLUMNS, "session_id", sessionId);
    return callback({ sheet, record });
  } finally {
    lock.releaseLock();
  }
}

function reconcileMeetCreationFailure_(spreadsheet, sessionId, failure) {
  return withMeetConferenceState_(spreadsheet, sessionId, ({ sheet, record }) => {
    if (!record) {
      deleteMeetEventSafely_(spreadsheet, failure.session, failure.eventId);
      return { skipped: true };
    }
    const current = record.data;
    const currentEventId = normalizeValue_(current.google_calendar_event_id);
    const partialEventId = normalizeValue_(failure.eventId);
    if (currentEventId) {
      if (partialEventId && partialEventId !== currentEventId &&
          !deleteMeetEventSafely_(spreadsheet, failure.session, partialEventId).ok) {
        appendMeetCalendarFailureRequest_(spreadsheet, current, "un evenement Calendar partiel n'a pas pu etre supprime");
        return { error: "l'evenement Calendar partiel n'a pas pu etre supprime" };
      }
      // A concurrent execution already persisted an event (or the original
      // write committed before throwing). Preserve that durable state.
      return { skipped: true };
    }
    markSessionConferenceFailed_(spreadsheet, sheet, record.rowNumber, current, failure.error, partialEventId);
    return { error: failure.error };
  }) || { skipped: true };
}

function processPendingSessionConferences() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ensureCrmReady_(spreadsheet);
  const sheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  const pendingSessions = getSheetRecordsFromSheet_(sheet, SESSION_COLUMNS)
    .filter((record) => normalizeValue_(record.data.format) === "online")
    .filter((record) => ["pending", "failed_cleanup_pending", "failed_payment_cleanup_pending"]
      .includes(normalizeValue_(record.data.calendar_conference_status)))
    .filter((record) => normalizeValue_(record.data.google_calendar_event_id))
    .filter((record) => !["cancelled", "no_show"].includes(normalizeValue_(record.data.session_status)));
  const errors = [];
  let ready = 0;

  pendingSessions.forEach((record) => {
    const result = processPendingSessionConference_(spreadsheet, record.data.session_id);
    if (result.ready) ready += 1;
    if (result.error) errors.push(`${record.data.session_id || `Row ${record.rowNumber}`}: ${result.error}`);
  });

  return { ok: errors.length === 0, ready, pending: pendingSessions.length, errors };
}

function processPendingSessionConference_(spreadsheet, sessionId) {
  const result = withMeetConferenceState_(spreadsheet, sessionId, ({ sheet, record }) => {
    if (!record) return { skipped: true };
    const session = record.data;
    const conferenceStatus = normalizeValue_(session.calendar_conference_status);
    if (normalizeValue_(session.format) !== "online" ||
        !["pending", "failed_cleanup_pending", "failed_payment_cleanup_pending"].includes(conferenceStatus) ||
        !normalizeValue_(session.google_calendar_event_id) ||
        ["cancelled", "no_show"].includes(normalizeValue_(session.session_status))) {
      return { skipped: true };
    }
    const calendarId = resolveTutorCalendarId_(spreadsheet, session);
    const eventId = normalizeValue_(session.google_calendar_event_id);
    let invitationSent = false;
    try {
      if (["failed_cleanup_pending", "failed_payment_cleanup_pending"].includes(conferenceStatus)) {
        throw new Error("nettoyage requis apres echec terminal Google Meet");
      }
      if (!calendarId) throw new Error("le calendrier du tuteur n'est pas configure");
      const event = Calendar.Events.get(calendarId, eventId, { conferenceDataVersion: 1 });
      const meetUrl = getGoogleMeetUrl_(event);
      if (!meetUrl) {
        if (isTerminalConferenceFailure_(event)) {
          throw new Error("la conference Google Meet n'a pas pu etre creee");
        }
        return { pending: true };
      }

      const privateProperties = { ...(event.extendedProperties?.private || {}) };
      const invitationState = normalizeValue_(privateProperties.meet_invitation_sent);
      invitationSent = invitationState === "sent";
      if (invitationState !== "sent") {
        Calendar.Events.patch({
          extendedProperties: { private: { ...privateProperties, meet_invitation_sent: "pending" } },
        }, calendarId, eventId, { conferenceDataVersion: 1, sendUpdates: "none" });
        Calendar.Events.patch({
          description: appendMeetUrlToCalendarDescription_(event.description, meetUrl),
          extendedProperties: { private: { ...privateProperties, meet_invitation_sent: "sent" } },
        }, calendarId, eventId, { conferenceDataVersion: 1, sendUpdates: "all" });
        invitationSent = true;
      }
      writeRecord_(sheet, SESSION_COLUMNS, record.rowNumber, {
        ...session,
        google_meet_url: meetUrl,
        calendar_conference_status: "ready",
        calendar_invites_sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return { ready: true, invitationSent };
    } catch (error) {
      if (!invitationSent && calendarId && eventId) {
        try {
          const latestEvent = Calendar.Events.get(calendarId, eventId, { conferenceDataVersion: 1 });
          invitationSent = normalizeValue_(latestEvent?.extendedProperties?.private?.meet_invitation_sent) === "sent";
        } catch (refreshError) {
          // The original Calendar failure remains the actionable error.
        }
      }
      return { error: String(error), session, sheet, rowNumber: record.rowNumber, eventId, invitationSent };
    }
  });
  if (result?.session && !result.invitationSent) {
    return reconcilePendingMeetFailure_(spreadsheet, sessionId, result);
  }
  return result || { skipped: true };
}

function reconcilePendingMeetFailure_(spreadsheet, sessionId, failure) {
  return withMeetConferenceState_(spreadsheet, sessionId, ({ sheet, record }) => {
    if (!record) {
      deleteMeetEventSafely_(spreadsheet, failure.session, failure.eventId);
      return { skipped: true };
    }
    const current = record.data;
    if (!["pending", "failed_cleanup_pending", "failed_payment_cleanup_pending"]
      .includes(normalizeValue_(current.calendar_conference_status)) ||
        normalizeValue_(current.google_calendar_event_id) !== normalizeValue_(failure.eventId)) {
      // A later pass has already made this event ready or moved the session to
      // another durable event. Never overwrite or delete that current state.
      return { skipped: true };
    }
    markSessionConferenceFailed_(spreadsheet, sheet, record.rowNumber, current, failure.error, failure.eventId);
    return { error: failure.error };
  }) || { skipped: true };
}

function createPaymentRowsForScheduledSessions() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ensureCrmReady_(spreadsheet);
  const paymentCreationLock = LockService.getScriptLock();
  if (!paymentCreationLock.tryLock(5000)) {
    return { ok: false, code: "PAYMENT_CREATION_BUSY", created: 0 };
  }

  try {
  // Read after the lock is held. This function may run from both the scheduled
  // automation and a post-booking flow, so pre-lock snapshots are unsafe.
  const sessionSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
  const sessionValues = sessionSheet.getDataRange().getValues();
  const paymentValues = paymentSheet.getDataRange().getValues();
  const sessionColumns = indexColumns_(SESSION_COLUMNS);
  const paymentColumns = indexColumns_(PAYMENT_COLUMNS);
  const existingSessionPayments = new Map(
    paymentValues.slice(1)
      .filter((row) => normalizeValue_(row[paymentColumns.session_id]))
      .map((row, index) => [normalizeValue_(row[paymentColumns.session_id]), {
        rowNumber: index + 2,
        data: PAYMENT_COLUMNS.reduce((record, column, columnIndex) => {
          record[column] = normalizeValue_(row[columnIndex]);
          return record;
        }, {}),
      }])
  );
  const now = new Date().toISOString();
  let created = 0;

  for (let rowIndex = 1; rowIndex < sessionValues.length; rowIndex += 1) {
    const row = sessionValues[rowIndex];
    const sessionId = normalizeValue_(row[sessionColumns.session_id]);
    const sessionStatus = normalizeValue_(row[sessionColumns.session_status]);
    const session = rowToRecord_(row, SESSION_COLUMNS);

    if (!sessionId) {
      continue;
    }

    const existingPayment = existingSessionPayments.get(sessionId);
    if (!isSessionPaymentEligible_(session)) {
      if (existingPayment) {
        voidUnpaidSessionPayments_(spreadsheet, sessionId, "Session not eligible for payment.");
      }
      continue;
    }
    if (existingPayment) {
      if (normalizeValue_(existingPayment.data.payment_status) === "payment_requested" &&
          normalizeValue_(existingPayment.data.payment_method) === "stripe_checkout" &&
          !getCheckoutPaymentUrl_(existingPayment.data)) {
        const issued = issueCheckoutForPayment_(spreadsheet, existingPayment.data);
        if (issued.ok && normalizeEmail_(existingPayment.data.email)) {
          try {
            sendPaymentRequestEmail_({ ...existingPayment.data, checkout_url: issued.payment_url });
          } catch (error) {
            // A later automation pass retains a safe Checkout link even if email fails.
          }
        }
      }
      continue;
    }

    if (!["confirmed", "calendar_created", "completed"].includes(sessionStatus)) {
      continue;
    }

    // A pack-linked session is covered by an explicit credit reservation. It
    // must not create a second per-session payment row or payment email.
    if (normalizeValue_(row[sessionColumns.credit_reservation_id])) {
      continue;
    }

    const paymentDetails = resolveSessionPaymentDetails_(spreadsheet, {
      session_type: normalizeValue_(row[sessionColumns.session_type]),
      payment_link: normalizeValue_(row[sessionColumns.payment_link]),
      amount_cad: normalizeValue_(row[sessionColumns.amount_cad]),
    });

    if (paymentDetails.amount_cad && !normalizeValue_(row[sessionColumns.amount_cad])) {
      sessionSheet.getRange(rowIndex + 1, sessionColumns.amount_cad + 1).setValue(paymentDetails.amount_cad);
    }

    const payment = {
      payment_id: createRecordId_("PAY"),
      session_id: sessionId,
      lead_id: row[sessionColumns.lead_id],
      parent_name: row[sessionColumns.parent_name],
      email: row[sessionColumns.parent_email],
      offer: row[sessionColumns.session_type],
      amount_cad: paymentDetails.amount_cad,
      payment_method: "stripe_checkout",
      payment_status: Number(paymentDetails.amount_cad) > 0 ? "payment_requested" : "not_requested",
      payment_link: "",
      payout_status: "not_due",
      created_at: now,
      updated_at: now,
    };

    const paymentRow = PAYMENT_COLUMNS.map((column) => {
      switch (column) {
        default:
          return payment[column] || "";
      }
    });

    paymentSheet.appendRow(paymentRow);
    const issued = payment.payment_status === "payment_requested"
      ? issueCheckoutForPayment_(spreadsheet, payment)
      : { ok: false };
    if (issued.ok) {
      payment.checkout_url = issued.payment_url;
      payment.checkout_expires_at = issued.due_date;
      payment.due_date = issued.due_date;
    }
    if (issued.ok && payment.email) {
      try {
        sendPaymentRequestEmail_(payment);
      } catch (error) {
        // The ledger remains available in the portal even if a notification is delayed.
      }
    }
    existingSessionPayments.set(sessionId, { data: payment });
    created += 1;
  }

  return { ok: true, created };
  } finally {
    paymentCreationLock.releaseLock();
  }
}

function ensureCrmReady_(spreadsheet) {
  const hasMissingSheet = CRM_REQUIRED_SHEET_NAMES.some((sheetName) => !spreadsheet.getSheetByName(sheetName));

  if (hasMissingSheet) {
    setupCrm();
  }

  // Safe on every portal call: custom plan rows are left intact; only known
  // untouched built-in defaults receive a compatibility migration.
  seedDefaultPlans_(spreadsheet);
}

function parseRawPayload_(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error("Missing POST body");
  }

  const raw = event.postData.contents;
  return JSON.parse(raw);
}

function normalizeLeadPayload_(parsed) {
  return {
    lead_id: parsed.lead_id || createLeadId_(),
    received_at: parsed.received_at || new Date().toISOString(),
    crm_stage: parsed.crm_stage || "new_request",
    lead_status: parsed.lead_status || "callback_needed",
    next_action: parsed.next_action || "call_parent",
    next_action_due: parsed.next_action_due || "",
    lead_owner: parsed.lead_owner || "unassigned",
    source_page: parsed.source_page || "",
    site_locale: parsed.site_locale || "",
    parent_name: parsed.parent_name || "",
    phone: parsed.phone || "",
    email: parsed.email || "",
    student_level_subject: parsed.student_level_subject || "",
    main_concern: parsed.main_concern || "",
    timeline: parsed.timeline || "",
    format: parsed.format || "",
    contact_preference: parsed.contact_preference || "",
    recommended_track: parsed.recommended_track || "diagnostic_call",
    urgency_score: parsed.urgency_score || "needs_clarification",
    message: parsed.message || "",
    assigned_tutor: parsed.assigned_tutor || "",
    // Store only canonical public offer codes while keeping known historical
    // form values compatible. Internal session types are intentionally not
    // public offers and therefore normalize to an empty value here.
    offer_recommended: normalizePublicOfferCode_(parsed.offer_recommended),
    callback_notes: parsed.callback_notes || "",
    first_session_date: parsed.first_session_date || "",
    first_session_summary: parsed.first_session_summary || "",
    last_contacted_at: parsed.last_contacted_at || "",
    close_reason: parsed.close_reason || "",
    privacy_consent_at: parsed.privacy_consent_at || "",
    privacy_consent_version: parsed.privacy_consent_version || "",
    parent_intent: parsed.parent_intent || "",
  };
}

function normalizePublicOfferCode_(value) {
  const normalized = normalizeValue_(value);
  if (PUBLIC_OFFER_CODES.includes(normalized)) {
    return normalized;
  }

  return Object.prototype.hasOwnProperty.call(LEGACY_PUBLIC_OFFER_CODES, normalized)
    ? LEGACY_PUBLIC_OFFER_CODES[normalized]
    : "";
}

function setupLeadSheet_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(CRM_COLUMNS);
  }

  const headerRange = sheet.getRange(1, 1, 1, CRM_COLUMNS.length);
  headerRange.setValues([CRM_COLUMNS]);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#071631");
  headerRange.setFontColor("#ffffff");
  sheet.setFrozenRows(1);

  const currentFilter = sheet.getFilter();
  if (!currentFilter) {
    sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), CRM_COLUMNS.length).createFilter();
  }

  applyValidation_(sheet, "crm_stage", CRM_STAGE_OPTIONS);
  applyValidation_(sheet, "lead_status", LEAD_STATUS_OPTIONS);
  applyValidation_(sheet, "next_action", NEXT_ACTION_OPTIONS);
  sheet.autoResizeColumns(1, CRM_COLUMNS.length);
}

function setupTutorRosterSheet_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(TUTOR_COLUMNS);
  }

  const headerRange = sheet.getRange(1, 1, 1, TUTOR_COLUMNS.length);
  headerRange.setValues([TUTOR_COLUMNS]);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#102044");
  headerRange.setFontColor("#ffffff");
  sheet.setFrozenRows(1);

  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), TUTOR_COLUMNS.length).createFilter();
  }

  applyTutorValidation_(sheet, "status", TUTOR_STATUS_OPTIONS);
  applyTutorValidation_(sheet, "formats", TUTOR_FORMAT_OPTIONS);
  applyTutorValidation_(sheet, "languages", TUTOR_LANGUAGE_OPTIONS);

  const availableSlotsColumn = TUTOR_COLUMNS.indexOf("available_slots") + 1;
  sheet
    .getRange(2, availableSlotsColumn)
    .setFormula('=ARRAYFORMULA(IF(A2:A="","",IF(I2:I-J2:J<0,0,I2:I-J2:J)))');
  sheet.autoResizeColumns(1, TUTOR_COLUMNS.length);
}

function appendTutorRosterRecord_(sheet, record) {
  const availableSlotsIndex = TUTOR_COLUMNS.indexOf("available_slots");
  const existingRows = getSheetRecordsFromSheet_(sheet, TUTOR_COLUMNS);
  const rowNumber = existingRows.length
    ? Math.max(...existingRows.map((existing) => existing.rowNumber)) + 1
    : 2;
  const leftColumns = TUTOR_COLUMNS.slice(0, availableSlotsIndex);
  const rightColumns = TUTOR_COLUMNS.slice(availableSlotsIndex + 1);

  // Keep the array formula in available_slots intact while adding a roster row.
  sheet.getRange(rowNumber, 1, 1, leftColumns.length)
    .setValues([leftColumns.map((column) => record[column] || "")]);
  sheet.getRange(rowNumber, availableSlotsIndex + 2, 1, rightColumns.length)
    .setValues([rightColumns.map((column) => record[column] || "")]);
}

function setupTutorAvailabilitySheet_(sheet) {
  setupStructuredSheet_(sheet, AVAILABILITY_COLUMNS, "#12325f");
  applyStructuredValidation_(sheet, AVAILABILITY_COLUMNS, "weekday", WEEKDAY_OPTIONS);
  applyStructuredValidation_(sheet, AVAILABILITY_COLUMNS, "format", TUTOR_FORMAT_OPTIONS);
  applyStructuredValidation_(sheet, AVAILABILITY_COLUMNS, "status", AVAILABILITY_STATUS_OPTIONS);
}

function setupSessionsSheet_(sheet) {
  setupStructuredSheet_(sheet, SESSION_COLUMNS, "#17305a");
  applyStructuredValidation_(sheet, SESSION_COLUMNS, "session_status", SESSION_STATUS_OPTIONS);
  applyStructuredValidation_(sheet, SESSION_COLUMNS, "session_type", SESSION_TYPE_OPTIONS);
  applyStructuredValidation_(sheet, SESSION_COLUMNS, "format", TUTOR_FORMAT_OPTIONS);
  applyStructuredValidation_(sheet, SESSION_COLUMNS, "payment_status", PAYMENT_STATUS_OPTIONS);
}

function setupSessionNotesSheet_(sheet) {
  setupStructuredSheet_(sheet, SESSION_NOTE_COLUMNS, "#243862");
  applyStructuredValidation_(sheet, SESSION_NOTE_COLUMNS, "attendance", SESSION_ATTENDANCE_OPTIONS);
  applyStructuredValidation_(sheet, SESSION_NOTE_COLUMNS, "risk_level", SESSION_RISK_OPTIONS);
  applyStructuredValidation_(sheet, SESSION_NOTE_COLUMNS, "next_recommendation", SESSION_RECOMMENDATION_OPTIONS);
  applyStructuredValidation_(sheet, SESSION_NOTE_COLUMNS, "parent_update_status", PARENT_UPDATE_STATUS_OPTIONS);
}

function setupPaymentSheet_(sheet) {
  setupStructuredSheet_(sheet, PAYMENT_COLUMNS, "#1b3153");
  applyStructuredValidation_(sheet, PAYMENT_COLUMNS, "payment_method", PAYMENT_METHOD_OPTIONS);
  applyStructuredValidation_(sheet, PAYMENT_COLUMNS, "payment_status", PAYMENT_STATUS_OPTIONS);
  applyStructuredValidation_(sheet, PAYMENT_COLUMNS, "payout_status", PAYOUT_STATUS_OPTIONS);
}

function setupPaymentLinksSheet_(sheet) {
  setupStructuredSheet_(sheet, PAYMENT_LINK_COLUMNS, "#26324f");
  applyStructuredValidation_(sheet, PAYMENT_LINK_COLUMNS, "status", PAYMENT_LINK_STATUS_OPTIONS);
}

function setupPortalAccessSheet_(sheet) {
  setupStructuredSheet_(sheet, PORTAL_ACCESS_COLUMNS, "#1d3b5f");
  applyStructuredValidation_(sheet, PORTAL_ACCESS_COLUMNS, "role", PORTAL_ROLE_OPTIONS);
  applyStructuredValidation_(sheet, PORTAL_ACCESS_COLUMNS, "status", PORTAL_ACCESS_STATUS_OPTIONS);
}

function setupPortalRequestsSheet_(sheet) {
  setupStructuredSheet_(sheet, PORTAL_REQUEST_COLUMNS, "#244a67");
  applyStructuredValidation_(sheet, PORTAL_REQUEST_COLUMNS, "role", PORTAL_ROLE_OPTIONS);
  applyStructuredValidation_(sheet, PORTAL_REQUEST_COLUMNS, "request_type", PORTAL_REQUEST_TYPE_OPTIONS);
  applyStructuredValidation_(sheet, PORTAL_REQUEST_COLUMNS, "status", PORTAL_REQUEST_STATUS_OPTIONS);
}

function setupParentFeedbackSheet_(sheet) {
  setupStructuredSheet_(sheet, PARENT_FEEDBACK_COLUMNS, "#2f4b65");
  applyStructuredValidation_(sheet, PARENT_FEEDBACK_COLUMNS, "status", PARENT_FEEDBACK_STATUS_OPTIONS);
}

function setupStudentsSheet_(sheet) {
  setupStructuredSheet_(sheet, STUDENT_COLUMNS, "#1f4662");
  applyStructuredValidation_(sheet, STUDENT_COLUMNS, "status", STUDENT_STATUS_OPTIONS);
}

function setupPortalMessagesSheet_(sheet) {
  setupStructuredSheet_(sheet, PORTAL_MESSAGE_COLUMNS, "#21405f");
  applyStructuredValidation_(sheet, PORTAL_MESSAGE_COLUMNS, "sender_role", ["parent", "tutor"]);
  applyStructuredValidation_(sheet, PORTAL_MESSAGE_COLUMNS, "delivery_status", PORTAL_MESSAGE_DELIVERY_OPTIONS);
  applyStructuredValidation_(sheet, PORTAL_MESSAGE_COLUMNS, "message_status", PORTAL_MESSAGE_STATUS_OPTIONS);
}

function setupPlansSheet_(sheet) {
  setupStructuredSheet_(sheet, PLAN_COLUMNS, "#3a315f");
  applyStructuredValidation_(sheet, PLAN_COLUMNS, "plan_type", PLAN_TYPE_OPTIONS);
  applyStructuredValidation_(sheet, PLAN_COLUMNS, "status", PLAN_STATUS_OPTIONS);
  applyStructuredValidation_(sheet, PLAN_COLUMNS, "cadence", PLAN_CADENCE_OPTIONS);
  applyStructuredValidation_(sheet, PLAN_COLUMNS, "billing_mode", PLAN_BILLING_MODE_OPTIONS);
}

function setupPlanEnrollmentsSheet_(sheet) {
  setupStructuredSheet_(sheet, PLAN_ENROLLMENT_COLUMNS, "#31515f");
  applyStructuredValidation_(sheet, PLAN_ENROLLMENT_COLUMNS, "status", PLAN_ENROLLMENT_STATUS_OPTIONS);
  applyStructuredValidation_(sheet, PLAN_ENROLLMENT_COLUMNS, "cadence", PLAN_CADENCE_OPTIONS);
  applyStructuredValidation_(sheet, PLAN_ENROLLMENT_COLUMNS, "scheduled_weekday", WEEKDAY_OPTIONS);
  applyStructuredValidation_(sheet, PLAN_ENROLLMENT_COLUMNS, "billing_status", PLAN_ENROLLMENT_BILLING_STATUS_OPTIONS);
}

function setupCreditLedgerSheet_(sheet) {
  setupStructuredSheet_(sheet, CREDIT_LEDGER_COLUMNS, "#4c3f26");
  applyStructuredValidation_(sheet, CREDIT_LEDGER_COLUMNS, "entry_type", CREDIT_LEDGER_ENTRY_TYPE_OPTIONS);
}

function seedDefaultPlans_(spreadsheet) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_PLAN_SHEET_NAME);
  setupPlansSheet_(sheet);
  const existingPlans = getSheetRecordsFromSheet_(sheet, PLAN_COLUMNS);
  const existingIds = new Set(existingPlans
    .map((record) => normalizeValue_(record.data.plan_id))
    .filter(Boolean));
  const now = new Date().toISOString();
  const defaults = [
    {
      // Keep this stable legacy identifier so existing plan enrollments remain valid.
      plan_id: "PLAN-FIRST-60",
      plan_type: "one_time",
      name: "Séance ciblée",
      description: "Une séance de 60 minutes pour débloquer une priorité concrète.",
      status: "active",
      session_count: "1",
      price_cad: "65",
      unit_price_cad: "65",
      cadence: "one_time",
      cancellation_notice_hours: String(PLAN_MODIFICATION_NOTICE_HOURS),
      validity_days: "",
      eligible_session_types: "first_session,one_time,catch_up,exam_sprint",
      billing_mode: "manual_tracking",
      notes: "Séance unique à 65 $. Cette séance ne crée ni ne consomme aucun crédit. Aucun forfait ni renouvellement automatique.",
    },
    {
      plan_id: "PLAN-TARGETED-65",
      plan_type: "one_time",
      name: "Séance ciblée (héritage)",
      description: "Offre conservée seulement pour terminer les inscriptions existantes; utiliser la Séance ciblée pour une nouvelle demande ponctuelle.",
      status: "archived",
      session_count: "1",
      price_cad: "65",
      unit_price_cad: "65",
      cadence: "one_time",
      cancellation_notice_hours: String(PLAN_MODIFICATION_NOTICE_HOURS),
      validity_days: "",
      eligible_session_types: "one_time,catch_up,exam_sprint",
      billing_mode: "manual_tracking",
      notes: "Offre héritée. Ne pas créer de nouvelle inscription sous ce plan.",
    },
    {
      plan_id: "PLAN-WEEKLY-65",
      plan_type: "weekly",
      name: "Rythme hebdomadaire (héritage)",
      description: "Offre conservée seulement pour terminer les inscriptions existantes; ne pas utiliser pour un nouveau suivi.",
      status: "archived",
      session_count: "",
      price_cad: "65",
      unit_price_cad: "65",
      cadence: "weekly",
      cancellation_notice_hours: String(PLAN_MODIFICATION_NOTICE_HOURS),
      validity_days: "",
      eligible_session_types: "weekly_follow_up",
      billing_mode: "manual_tracking",
      notes: "Offre héritée. Les inscriptions existantes restent à traiter séparément; aucun nouveau suivi ne doit être créé sous ce plan.",
    },
    {
      plan_id: "PLAN-PACK4-250",
      plan_type: "pack",
      name: "Bloc d’élan - 4 séances",
      description: "Quatre séances de 60 minutes pour reprendre le fil pendant environ un mois; la cadence est choisie après le jumelage.",
      status: "active",
      session_count: "4",
      price_cad: "250",
      unit_price_cad: "62.5",
      cadence: "one_time",
      cancellation_notice_hours: String(PLAN_MODIFICATION_NOTICE_HOURS),
      validity_days: "120",
      eligible_session_types: "weekly_follow_up",
      billing_mode: "future_stripe",
      notes: "Un paiement de 250 $. Après paiement vérifié, quatre crédits sont accordés une seule fois. Aucun renouvellement automatique.",
    },
    {
      plan_id: "PLAN-PACK10-600",
      plan_type: "pack",
      name: "Bloc de progression - 10 séances",
      description: "Dix séances de 60 minutes à utiliser selon le rythme convenu après le jumelage. Un rythme hebdomadaire ou aux deux semaines peut être fixé lorsqu'il convient à la famille.",
      status: "active",
      session_count: "10",
      price_cad: "600",
      unit_price_cad: "60",
      // Cadence is a post-matching choice, not a separate public product.
      cadence: "one_time",
      cancellation_notice_hours: String(PLAN_MODIFICATION_NOTICE_HOURS),
      validity_days: "180",
      eligible_session_types: "weekly_follow_up",
      billing_mode: "future_stripe",
      notes: "Deux versements manuels de 300 $ : au début puis à mi-parcours. Aucun renouvellement automatique. Après vérification de chaque versement, l'équipe accorde 5 crédits avec une raison écrite. Le rythme hebdomadaire ou aux deux semaines est choisi après le jumelage. À 72 h ou plus, le report est garanti et aucun crédit n'est perdu automatiquement.",
    },
  ];

  // Upgrade only the fully known prior built-in shape. Older rows did not
  // carry a safe marker or a complete recoverable signature, so they remain
  // untouched rather than risking an operator's custom catalogue changes.
  const legacyFirstSessionPlan = existingPlans.find((record) =>
    normalizeValue_(record.data.plan_id) === "PLAN-FIRST-60");
  const firstSessionDefault = defaults.find((plan) => plan.plan_id === "PLAN-FIRST-60");
  const priorFirstSessionDefault = {
    plan_id: "PLAN-FIRST-60",
    plan_type: "one_time",
    name: "Seance ciblee",
    description: "Une seance de tutorat de 60 minutes pour debloquer une priorite concrete : chapitre, devoir, reprise ou preparation d'examen.",
    status: "active",
    session_count: "1",
    price_cad: "65",
    unit_price_cad: "65",
    cadence: "one_time",
    cancellation_notice_hours: String(PLAN_MODIFICATION_NOTICE_HOURS),
    validity_days: "",
    eligible_session_types: "first_session,one_time,catch_up,exam_sprint",
    billing_mode: "manual_tracking",
    notes: "Seance unique a 65 $. Aucun forfait ni renouvellement automatique.",
  };
  const isPriorFirstSessionDefault = legacyFirstSessionPlan &&
    planRecordMatchesSeed_(legacyFirstSessionPlan.data, priorFirstSessionDefault);
  if (legacyFirstSessionPlan && firstSessionDefault && isPriorFirstSessionDefault) {
    const legacy = legacyFirstSessionPlan.data;
    writeRecord_(sheet, PLAN_COLUMNS, legacyFirstSessionPlan.rowNumber, {
      ...legacy,
      name: firstSessionDefault.name,
      description: firstSessionDefault.description,
      price_cad: "65",
      unit_price_cad: "65",
      eligible_session_types: firstSessionDefault.eligible_session_types,
      notes: firstSessionDefault.notes,
      updated_at: now,
    });
  }

  // The known prior 10-session built-in is likewise compared across every
  // non-timestamp plan field before any migration is allowed.
  const legacyProgressionPlan = existingPlans.find((record) =>
    normalizeValue_(record.data.plan_id) === "PLAN-PACK10-600");
  const progressionBlockDefault = defaults.find((plan) => plan.plan_id === "PLAN-PACK10-600");
  const priorProgressionBlockDefault = {
    plan_id: "PLAN-PACK10-600",
    plan_type: "pack",
    name: "Bloc de progression - 10 seances",
    description: "Dix seances de 60 minutes a utiliser selon le rythme convenu apres le jumelage. Un rythme hebdomadaire ou aux deux semaines peut etre fixe lorsqu'il convient a la famille.",
    status: "active",
    session_count: "10",
    price_cad: "600",
    unit_price_cad: "60",
    cadence: "one_time",
    cancellation_notice_hours: String(PLAN_MODIFICATION_NOTICE_HOURS),
    validity_days: "180",
    eligible_session_types: "weekly_follow_up",
    billing_mode: "manual_tracking",
    notes: "Deux versements manuels de 300 $ : au debut puis a mi-parcours. Aucun renouvellement automatique. Apres verification de chaque versement, l'equipe accorde 5 credits avec une raison ecrite. Le rythme hebdomadaire ou aux deux semaines est choisi apres le jumelage. A 72 h ou plus, le report est garanti et aucun credit n'est perdu automatiquement.",
  };
  const isPriorProgressionBlockDefault = legacyProgressionPlan &&
    planRecordMatchesSeed_(legacyProgressionPlan.data, priorProgressionBlockDefault);
  if (legacyProgressionPlan && progressionBlockDefault && isPriorProgressionBlockDefault) {
    const legacy = legacyProgressionPlan.data;
    writeRecord_(sheet, PLAN_COLUMNS, legacyProgressionPlan.rowNumber, {
      ...legacy,
      plan_type: progressionBlockDefault.plan_type,
      name: progressionBlockDefault.name,
      description: progressionBlockDefault.description,
      session_count: progressionBlockDefault.session_count,
      price_cad: progressionBlockDefault.price_cad,
      unit_price_cad: progressionBlockDefault.unit_price_cad,
      cadence: progressionBlockDefault.cadence,
      cancellation_notice_hours: progressionBlockDefault.cancellation_notice_hours,
      validity_days: progressionBlockDefault.validity_days,
      eligible_session_types: progressionBlockDefault.eligible_session_types,
      billing_mode: progressionBlockDefault.billing_mode,
      notes: progressionBlockDefault.notes,
      updated_at: now,
    });
  }

  defaults
    .filter((plan) => !existingIds.has(plan.plan_id))
    .forEach((plan) => sheet.appendRow(PLAN_COLUMNS.map((column) => plan[column] || (column === "created_at" || column === "updated_at" ? now : ""))));
}

function planRecordMatchesSeed_(record, seed) {
  return PLAN_COLUMNS
    .filter((column) => column !== "created_at" && column !== "updated_at")
    .every((column) => normalizeValue_(record[column]) === normalizeValue_(seed[column]));
}

function archiveUnusedLegacyPlan_(spreadsheet, planSheet, record, replacement, now) {
  const hasLiveEnrollment = getSheetRecords_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME, PLAN_ENROLLMENT_COLUMNS)
    .some((enrollment) => normalizeValue_(enrollment.plan_id) === normalizeValue_(record.data.plan_id) &&
      ["pending", "active", "paused"].includes(normalizeValue_(enrollment.status)));
  if (hasLiveEnrollment) {
    return;
  }
  writeRecord_(planSheet, PLAN_COLUMNS, record.rowNumber, {
    ...record.data,
    name: replacement.name,
    description: replacement.description,
    status: replacement.status,
    notes: replacement.notes,
    updated_at: now,
  });
}

function setupViews_(spreadsheet) {
  const views = [
    {
      name: CRM_DAILY_VIEW_NAME,
      formula: '=FILTER(\'Parent Leads\'!A:AA,\'Parent Leads\'!D:D="callback_needed")',
    },
    {
      name: CRM_FIRST_SESSION_VIEW_NAME,
      formula: '=FILTER(\'Parent Leads\'!A:AA,\'Parent Leads\'!C:C="first_session_booked")',
    },
    {
      name: CRM_ACTIVE_VIEW_NAME,
      formula: '=FILTER(\'Parent Leads\'!A:AA,\'Parent Leads\'!C:C="active_follow_up")',
    },
    {
      name: CRM_MATCHING_VIEW_NAME,
      formula:
        '=FILTER(\'Parent Leads\'!A:AA,((\'Parent Leads\'!D:D="ready_to_match")+(\'Parent Leads\'!E:E="assign_tutor")+(\'Parent Leads\'!C:C="callback_done"))>0)',
    },
    {
      name: CRM_SCHEDULE_VIEW_NAME,
      formula: '=FILTER(Sessions!A:W,((Sessions!J:J="requested")+(Sessions!J:J="proposed")+(Sessions!J:J="confirmed"))>0)',
    },
    {
      name: CRM_SESSION_NOTE_VIEW_NAME,
      formula:
        '=FILTER(\'Session Notes\'!A:V,ROW(\'Session Notes\'!A:A)>1,\'Session Notes\'!R:R<>"sent",\'Session Notes\'!R:R<>"not_needed")',
    },
    {
      name: CRM_PAYMENT_VIEW_NAME,
      formula: '=FILTER(Payments!A:R,ROW(Payments!A:A)>1,Payments!I:I<>"paid",Payments!I:I<>"waived")',
    },
  ];

  views.forEach((view) => {
    const sheet = getOrCreateSheet_(spreadsheet, view.name);
    sheet.clear();
    sheet.getRange(1, 1).setFormula(view.formula);
    sheet.setFrozenRows(1);
  });
}

function setupDashboard_(spreadsheet) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_DASHBOARD_SHEET_NAME);
  sheet.clear();
  sheet.getRange(1, 1, 1, 3).setValues([["Metric", "Value", "Decision"]]);
  sheet.getRange(2, 1, 15, 3).setValues([
    ["Leads to call", '=COUNTIF(\'Parent Leads\'!D:D,"callback_needed")', "Open daily before outreach"],
    [
      "Ready to match",
      '=COUNTIF(\'Parent Leads\'!D:D,"ready_to_match")+COUNTIF(\'Parent Leads\'!E:E,"assign_tutor")',
      "Choose tutor or confirm slot",
    ],
    ["First sessions booked", '=COUNTIF(\'Parent Leads\'!C:C,"first_session_booked")', "Send prep note before session"],
    ["Active follow-up", '=COUNTIF(\'Parent Leads\'!C:C,"active_follow_up")', "Check progress weekly"],
    ["High urgency leads", '=COUNTIF(\'Parent Leads\'!S:S,"high")', "Same-day callback if possible"],
    ["Active tutors", '=COUNTIF(\'Tutor Roster\'!C:C,"active")', "Keep roster current"],
    ["Open tutor slots", '=SUM(\'Tutor Roster\'!K:K)', "Only sell what can be served well"],
    [
      "Sessions to confirm",
      '=COUNTIF(Sessions!J:J,"requested")+COUNTIF(Sessions!J:J,"proposed")',
      "Confirm parent, tutor and start time",
    ],
    ["Calendar sync needed", '=COUNTIFS(Sessions!J:J,"confirmed",Sessions!Q:Q,"")', "Run syncConfirmedSessionsToCalendar"],
    ["Session notes ready", '=COUNTIF(\'Session Notes\'!R:R,"ready_to_send")', "Send parent update before next session"],
    [
      "Completed sessions missing note",
      '=MAX(0,COUNTIF(Sessions!J:J,"completed")-(COUNTA(\'Session Notes\'!B:B)-1))',
      "Ask tutor for missing note",
    ],
    [
      "Students to watch",
      '=COUNTIF(\'Session Notes\'!P:P,"watch")+COUNTIF(\'Session Notes\'!P:P,"high")',
      "Review with tutor before next session",
    ],
    [
      "Payments to request",
      '=COUNTIF(Payments!I:I,"not_requested")+COUNTIF(Payments!I:I,"payment_requested")',
      "Send Stripe/Interac instructions",
    ],
    ["Unpaid confirmed sessions", '=COUNTIFS(Sessions!J:J,"calendar_created",Sessions!R:R,"<>paid")', "Collect before repeat sessions"],
    ["Tutor payouts pending", '=COUNTIF(Payments!O:O,"pending")', "Pay tutors after parent payment clears"],
  ]);

  sheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#071631").setFontColor("#ffffff");
  sheet.getRange(2, 1, 15, 1).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 3);
}

function setupConfigSheet_(spreadsheet) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_CONFIG_SHEET_NAME);
  sheet.clear();
  sheet.getRange(1, 1, 1, 2).setValues([["Key", "Values"]]);
  const values = [
    ["crm_stage", CRM_STAGE_OPTIONS.join(", ")],
    ["lead_status", LEAD_STATUS_OPTIONS.join(", ")],
    ["next_action", NEXT_ACTION_OPTIONS.join(", ")],
    ["tutor_status", TUTOR_STATUS_OPTIONS.join(", ")],
    ["tutor_formats", TUTOR_FORMAT_OPTIONS.join(", ")],
    ["tutor_languages", TUTOR_LANGUAGE_OPTIONS.join(", ")],
    ["availability_status", AVAILABILITY_STATUS_OPTIONS.join(", ")],
    ["weekdays", WEEKDAY_OPTIONS.join(", ")],
    ["session_status", SESSION_STATUS_OPTIONS.join(", ")],
    ["session_type", SESSION_TYPE_OPTIONS.join(", ")],
    ["session_attendance", SESSION_ATTENDANCE_OPTIONS.join(", ")],
    ["session_risk", SESSION_RISK_OPTIONS.join(", ")],
    ["session_recommendations", SESSION_RECOMMENDATION_OPTIONS.join(", ")],
    ["parent_update_status", PARENT_UPDATE_STATUS_OPTIONS.join(", ")],
    ["payment_status", PAYMENT_STATUS_OPTIONS.join(", ")],
    ["payment_method", PAYMENT_METHOD_OPTIONS.join(", ")],
    ["payout_status", PAYOUT_STATUS_OPTIONS.join(", ")],
    ["payment_link_status", PAYMENT_LINK_STATUS_OPTIONS.join(", ")],
    ["calendar_sync_function", "syncConfirmedSessionsToCalendar"],
    ["student_status", STUDENT_STATUS_OPTIONS.join(", ")],
    ["plan_type", PLAN_TYPE_OPTIONS.join(", ")],
    ["plan_status", PLAN_STATUS_OPTIONS.join(", ")],
    ["plan_cadence", PLAN_CADENCE_OPTIONS.join(", ")],
    ["plan_billing_mode", PLAN_BILLING_MODE_OPTIONS.join(", ")],
    ["plan_enrollment_status", PLAN_ENROLLMENT_STATUS_OPTIONS.join(", ")],
    ["plan_enrollment_billing_status", PLAN_ENROLLMENT_BILLING_STATUS_OPTIONS.join(", ")],
    ["credit_ledger_entry_type", CREDIT_LEDGER_ENTRY_TYPE_OPTIONS.join(", ")],
    ["plan_modification_notice_hours", String(PLAN_MODIFICATION_NOTICE_HOURS)],
  ];
  sheet.getRange(2, 1, values.length, 2).setValues(values);
  sheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#071631").setFontColor("#ffffff");
  sheet.autoResizeColumns(1, 2);
}

function applyValidation_(sheet, columnName, options) {
  const columnIndex = CRM_COLUMNS.indexOf(columnName) + 1;
  if (columnIndex <= 0) {
    return;
  }

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true)
    .setAllowInvalid(false)
    .build();

  sheet.getRange(2, columnIndex, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
}

function applyTutorValidation_(sheet, columnName, options) {
  const columnIndex = TUTOR_COLUMNS.indexOf(columnName) + 1;
  if (columnIndex <= 0) {
    return;
  }

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true)
    .setAllowInvalid(false)
    .build();

  sheet.getRange(2, columnIndex, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
}

function setupStructuredSheet_(sheet, columns, headerColor) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(columns);
  } else {
    const existingWidth = sheet.getLastColumn();
    const existingHeaders = existingWidth > 0
      ? sheet.getRange(1, 1, 1, existingWidth).getValues()[0].map(normalizeValue_)
      : [];
    const firstBlankHeader = existingHeaders.findIndex((header) => !header);
    if (firstBlankHeader >= 0 || existingHeaders.length > columns.length) {
      throw new Error(`CRM_SCHEMA_HEADER_MISMATCH:${sheet.getName()}:header_width`);
    }
    existingHeaders.forEach((header, index) => {
      if (header !== columns[index]) {
        throw new Error(`CRM_SCHEMA_HEADER_MISMATCH:${sheet.getName()}:${index + 1}`);
      }
    });
    const missingTail = columns.slice(existingHeaders.length);
    if (missingTail.length) {
      sheet.getRange(1, existingHeaders.length + 1, 1, missingTail.length).setValues([missingTail]);
    }
  }

  const headerRange = sheet.getRange(1, 1, 1, columns.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground(headerColor);
  headerRange.setFontColor("#ffffff");
  sheet.setFrozenRows(1);

  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), columns.length).createFilter();
  }

  sheet.autoResizeColumns(1, columns.length);
}

function applyStructuredValidation_(sheet, columns, columnName, options) {
  const columnIndex = columns.indexOf(columnName) + 1;
  if (columnIndex <= 0) {
    return;
  }

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true)
    .setAllowInvalid(false)
    .build();

  sheet.getRange(2, columnIndex, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
}

function isPortalAction_(action) {
  return typeof action === "string" && action.indexOf("portal_") === 0;
}

function constantTimeStringEquals_(leftValue, rightValue) {
  const left = String(leftValue || "");
  const right = String(rightValue || "");
  const length = Math.max(left.length, right.length);
  let mismatch = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    const leftCode = index < left.length ? left.charCodeAt(index) : 0;
    const rightCode = index < right.length ? right.charCodeAt(index) : 0;
    mismatch |= leftCode ^ rightCode;
  }
  return mismatch === 0;
}

function hasValidPortalProxySecret_(action, suppliedSecret) {
  // Stripe reaches Apps Script through its own server-only proxy and continues
  // to authenticate with PAYMENT_WEBHOOK_SECRET inside the webhook handler.
  if (["portal_mark_payment_paid_webhook", "portal_mark_payment_expired_webhook"].includes(normalizeValue_(action))) {
    return true;
  }
  const expectedSecret = PropertiesService.getScriptProperties().getProperty(CRM_PORTAL_SECRET_PROPERTY);
  const candidate = normalizeValue_(suppliedSecret);
  return Boolean(expectedSecret && candidate) && constantTimeStringEquals_(expectedSecret, candidate);
}

function handlePortalAction_(spreadsheet, payload) {
  const action = normalizeValue_(payload.action);

  switch (action) {
    case "portal_email_status":
      return portalEmailStatus_();
    case "portal_create_account":
      return createPortalAccount_(spreadsheet, payload);
    case "portal_request_code":
      return requestPortalCode_(spreadsheet, payload);
    case "portal_verify_code":
      return verifyPortalCode_(spreadsheet, payload);
    case "portal_get_dashboard":
      return getPortalDashboard_(spreadsheet, payload);
    case "portal_create_session":
      return createPortalSession_(spreadsheet, payload);
    case "portal_upsert_payment_link":
      return upsertPortalPaymentLink_(spreadsheet, payload);
    case "portal_respond_to_session":
      return respondToPortalSession_(spreadsheet, payload);
    case "portal_submit_session_note":
      return submitPortalSessionNote_(spreadsheet, payload);
    case "portal_book_session":
      return bookPortalSession_(spreadsheet, payload);
    case "portal_submit_parent_feedback":
      return submitParentFeedback_(spreadsheet, payload);
    case "portal_update_parent_profile":
      return updatePortalParentProfile_(spreadsheet, payload);
    case "portal_upsert_student":
      return upsertPortalStudent_(spreadsheet, payload);
    case "portal_assign_student_tutor":
      return assignPortalStudentTutor_(spreadsheet, payload);
    case "portal_delete_test_record":
      return deletePortalTestRecord_(spreadsheet, payload);
    case "portal_delete_test_records":
      return deletePortalTestRecords_(spreadsheet, payload);
    case "portal_create_parent":
      return createPortalParent_(spreadsheet, payload);
    case "portal_upsert_parent":
      return upsertPortalParent_(spreadsheet, payload);
    case "portal_update_lead_follow_up":
      return updatePortalLeadFollowUp_(spreadsheet, payload);
    case "portal_set_parent_access":
      return setPortalParentAccess_(spreadsheet, payload);
    case "portal_delete_parent":
      return deletePortalParent_(spreadsheet, payload);
    case "portal_assign_tutor":
      return assignPortalTutor_(spreadsheet, payload);
    case "portal_create_tutor":
      return createPortalTutor_(spreadsheet, payload);
    case "portal_update_tutor_calendar":
      return updatePortalTutorCalendar_(spreadsheet, payload);
    case "portal_delete_tutor":
      return deletePortalTutor_(spreadsheet, payload);
    case "portal_invite_tutor":
      return invitePortalTutor_(spreadsheet, payload);
    case "portal_send_session_message":
      return sendPortalSessionMessage_(spreadsheet, payload);
    case "portal_cancel_session":
      return cancelPortalSession_(spreadsheet, payload);
    case "portal_reschedule_session":
      return reschedulePortalSession_(spreadsheet, payload);
    case "portal_upsert_tutor_availability":
      return upsertPortalTutorAvailability_(spreadsheet, payload);
    case "portal_mark_payment_paid_webhook":
      return markPortalPaymentPaidFromWebhook_(spreadsheet, payload);
    case "portal_mark_payment_expired_webhook":
      return markPortalPaymentExpiredFromWebhook_(spreadsheet, payload);
    case "portal_reissue_payment_checkout":
      return reissuePortalPaymentCheckout_(spreadsheet, payload);
    case "portal_update_request_status":
      return updatePortalRequestStatus_(spreadsheet, payload);
    case "portal_create_request":
      return createPortalRequest_(spreadsheet, payload);
    case "portal_upsert_plan":
      return upsertPortalPlan_(spreadsheet, payload);
    case "portal_create_plan_enrollment":
      return createPortalPlanEnrollment_(spreadsheet, payload);
    case "portal_create_plan_payment_request":
      return createPortalPlanPaymentRequest_(spreadsheet, payload);
    case "portal_update_plan_enrollment":
      return updatePortalPlanEnrollment_(spreadsheet, payload);
    case "portal_pause_plan_enrollment":
      return pausePortalPlanEnrollment_(spreadsheet, payload);
    case "portal_resume_plan_enrollment":
      return resumePortalPlanEnrollment_(spreadsheet, payload);
    case "portal_adjust_plan_credits":
      return adjustPortalPlanCredits_(spreadsheet, payload);
    case "portal_get_plan_change_deadline":
      return getPortalPlanChangeDeadline_(spreadsheet, payload);
    default:
      return { ok: false, code: "UNKNOWN_PORTAL_ACTION" };
  }
}

function requestPortalCode_(spreadsheet, payload) {
  const role = normalizePortalRole_(payload.role);
  const email = normalizeEmail_(payload.email);

  if (!role || !email) {
    return { ok: false, code: "PORTAL_EMAIL_REQUIRED" };
  }

  const identity = findPortalIdentity_(spreadsheet, role, email);

  // Do not reveal whether an account exists.
  if (!identity) {
    return { ok: true, sent: false, code: "PORTAL_CODE_IF_ACCOUNT_EXISTS" };
  }

  if (role === "tutor") {
    const access = findPortalAccess_(getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME), role, email);
    if (!access || normalizeValue_(access.data.status) !== "active") {
      return { ok: true, sent: false, code: "PORTAL_CODE_IF_ACCOUNT_EXISTS" };
    }
  }

  return issuePortalCode_(spreadsheet, identity);
}

function getPortalCodeSecurityState_(access, nowValue) {
  const nowMs = typeof nowValue === "number" ? nowValue : new Date(nowValue || Date.now()).getTime();
  const lockedUntil = coerceDate_(access?.code_locked_until);
  const lastRequestedAt = coerceDate_(access?.last_code_requested_at);
  const lockRemainingMs = lockedUntil ? lockedUntil.getTime() - nowMs : 0;
  const requestRemainingMs = lastRequestedAt
    ? PORTAL_CODE_REQUEST_COOLDOWN_SECONDS * 1000 - (nowMs - lastRequestedAt.getTime())
    : 0;
  return {
    is_locked: lockRemainingMs > 0,
    request_cooldown_active: requestRemainingMs > 0,
    retry_after_seconds: Math.max(0, Math.ceil(Math.max(lockRemainingMs, requestRemainingMs) / 1000)),
  };
}

function nextPortalCodeFailure_(access, nowValue) {
  const nowMs = typeof nowValue === "number" ? nowValue : new Date(nowValue || Date.now()).getTime();
  const failedAttempts = Math.max(0, Number(access?.failed_code_attempts) || 0) + 1;
  return {
    failed_code_attempts: failedAttempts,
    code_locked_until: failedAttempts >= PORTAL_CODE_MAX_FAILED_ATTEMPTS
      ? new Date(nowMs + PORTAL_CODE_FAILURE_COOLDOWN_MINUTES * 60 * 1000).toISOString()
      : "",
  };
}

function issuePortalCode_(spreadsheet, identity) {
  const role = normalizePortalRole_(identity.role);
  const email = normalizeEmail_(identity.email);

  if (!role || !email) {
    return { ok: false, code: "PORTAL_EMAIL_REQUIRED" };
  }

  const emailReadiness = getPortalEmailReadiness_();
  if (!emailReadiness.ok) {
    return emailReadiness;
  }

  const accessSheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME);
  setupPortalAccessSheet_(accessSheet);
  const codeLock = LockService.getScriptLock();
  if (!codeLock.tryLock(5000)) {
    return { ok: false, code: "PORTAL_CODE_BUSY" };
  }

  try {
    const access = findPortalAccess_(accessSheet, role, email);
    const now = new Date();
    const security = getPortalCodeSecurityState_(access?.data || {}, now.getTime());
    // Preserve account-enumeration resistance: a throttled request looks like a
    // normal accepted request, but no additional email is sent.
    if (security.is_locked || security.request_cooldown_active) {
      return { ok: true, sent: true, code: "PORTAL_CODE_SENT" };
    }

    const code = createPortalCode_();
    const expiresAt = new Date(now.getTime() + PORTAL_CODE_MINUTES * 60 * 1000);
    const rowValues = {
      access_id: access ? access.data.access_id : createRecordId_("ACCESS"),
      role,
      email,
      display_name: identity.display_name,
      related_id: identity.related_id,
      status: "active",
      code_hash: hashValue_(code),
      code_expires_at: expiresAt.toISOString(),
      session_token_hash: access ? access.data.session_token_hash : "",
      session_expires_at: access ? access.data.session_expires_at : "",
      last_login_at: access ? access.data.last_login_at : "",
      created_at: access ? access.data.created_at : now.toISOString(),
      updated_at: now.toISOString(),
      failed_code_attempts: 0,
      code_locked_until: "",
      last_code_requested_at: now.toISOString(),
    };

    writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, access ? access.rowNumber : null, rowValues);
    try {
      sendPortalCodeEmail_(identity, code);
    } catch (error) {
      writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, access ? access.rowNumber : null, {
        ...rowValues,
        code_hash: "",
        code_expires_at: "",
        updated_at: new Date().toISOString(),
      });
      return portalRequestError_(error);
    }
    return { ok: true, sent: true, code: "PORTAL_CODE_SENT" };
  } finally {
    codeLock.releaseLock();
  }
}

function createPortalAccount_(spreadsheet, payload) {
  const role = normalizePortalRole_(payload.role);
  const email = normalizeEmail_(payload.email);
  const displayName = normalizeValue_(payload.parent_name || payload.tutor_name || payload.name).slice(0, 180);

  if (!role || !email || !displayName) {
    return { ok: false, code: "PORTAL_ACCOUNT_REQUIRED" };
  }

  if (role === "operator") {
    return { ok: false, code: "PORTAL_OPERATOR_INVITE_REQUIRED" };
  }

  if (role === "parent") {
    const emailReadiness = getPortalEmailReadiness_();
    if (!emailReadiness.ok) {
      return emailReadiness;
    }
  }

  if (role === "tutor") {
    return { ok: false, code: "PORTAL_TUTOR_INVITE_REQUIRED" };
  }

  if (role === "parent" && normalizeValue_(payload.privacy_consent) !== "yes") {
    return { ok: false, code: "PRIVACY_CONSENT_REQUIRED" };
  }

  const parentIdentity = findPortalIdentity_(spreadsheet, "parent", email);

  if (parentIdentity) {
    const codeResult = issuePortalCode_(spreadsheet, parentIdentity);
    return {
      ...codeResult,
      existing_account: true,
      role: "parent",
      email,
    };
  }

  const now = new Date().toISOString();
  const lead = normalizeLeadPayload_({
    lead_id: createLeadId_(),
    received_at: now,
    crm_stage: "new_request",
    lead_status: "callback_needed",
    next_action: "call_parent",
    lead_owner: "Chahine",
    source_page: "portal-account",
    site_locale: normalizeValue_(payload.locale).slice(0, 8) || "fr",
    parent_name: displayName,
    phone: normalizeValue_(payload.phone).slice(0, 80),
    email,
    student_level_subject: normalizeValue_(payload.student_level_subject).slice(0, 500),
    main_concern: normalizeValue_(payload.main_concern).slice(0, 1200),
    timeline: normalizeValue_(payload.timeline).slice(0, 160),
    format: normalizeValue_(payload.format).slice(0, 160),
    contact_preference: "email",
    recommended_track: "diagnostic_call",
    urgency_score: "needs_clarification",
    message: normalizeValue_(payload.message || payload.main_concern).slice(0, 2500),
    privacy_consent_at: now,
    privacy_consent_version: "portal-parent-v1",
  });

  const leadSheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  setupLeadSheet_(leadSheet);
  leadSheet.appendRow(CRM_COLUMNS.map((column) => normalizeValue_(lead[column])));
  createInitialStudentIfProvided_(spreadsheet, lead, payload);

  const codeResult = issuePortalCode_(spreadsheet, {
    role: "parent",
    email,
    display_name: lead.parent_name || email,
    related_id: lead.lead_id,
  });

  return {
    ...codeResult,
    account_created: true,
    lead_id: lead.lead_id,
    role: "parent",
    email,
  };
}

function verifyPortalCode_(spreadsheet, payload) {
  const role = normalizePortalRole_(payload.role);
  const email = normalizeEmail_(payload.email);
  const code = normalizeValue_(payload.code).replace(/\s/g, "");

  if (!role || !email || !code) {
    return { ok: false, code: "PORTAL_CODE_REQUIRED" };
  }

  const accessSheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME);
  setupPortalAccessSheet_(accessSheet);
  const codeLock = LockService.getScriptLock();
  if (!codeLock.tryLock(5000)) {
    return { ok: false, code: "PORTAL_CODE_BUSY" };
  }

  try {
    const access = findPortalAccess_(accessSheet, role, email);
    if (!access || access.data.status !== "active") {
      return { ok: false, code: "PORTAL_LOGIN_FAILED" };
    }

    const now = new Date();
    const security = getPortalCodeSecurityState_(access.data, now.getTime());
    if (security.is_locked) {
      return { ok: false, code: "PORTAL_LOGIN_COOLDOWN", retry_after_seconds: security.retry_after_seconds };
    }

    const expiresAt = coerceDate_(access.data.code_expires_at);
    if (!expiresAt || expiresAt.getTime() < now.getTime()) {
      return { ok: false, code: "PORTAL_CODE_EXPIRED" };
    }

    if (!constantTimeStringEquals_(access.data.code_hash, hashValue_(code))) {
      const failure = nextPortalCodeFailure_(access.data, now.getTime());
      writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, access.rowNumber, {
        ...access.data,
        ...failure,
        code_hash: failure.code_locked_until ? "" : access.data.code_hash,
        code_expires_at: failure.code_locked_until ? "" : access.data.code_expires_at,
        updated_at: now.toISOString(),
      });
      return { ok: false, code: "PORTAL_LOGIN_FAILED" };
    }

    const token = createPortalToken_();
    const sessionExpiresAt = new Date(now.getTime() + PORTAL_SESSION_DAYS * 24 * 60 * 60 * 1000);
    writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, access.rowNumber, {
      ...access.data,
      code_hash: "",
      code_expires_at: "",
      session_token_hash: hashValue_(token),
      session_expires_at: sessionExpiresAt.toISOString(),
      last_login_at: now.toISOString(),
      updated_at: now.toISOString(),
      failed_code_attempts: 0,
      code_locked_until: "",
    });

    return {
      ok: true,
      token,
      role,
      email,
      session_expires_at: sessionExpiresAt.toISOString(),
      dashboard: buildPortalDashboard_(spreadsheet, access.data),
    };
  } finally {
    codeLock.releaseLock();
  }
}

function getPortalDashboard_(spreadsheet, payload) {
  const session = verifyPortalSession_(spreadsheet, payload.token, payload.role);

  if (!session.ok) {
    return session;
  }

  return {
    ok: true,
    role: session.access.role,
    email: session.access.email,
    dashboard: buildPortalDashboard_(spreadsheet, session.access),
  };
}

// Plans track eligibility and cadence; package payment requests reuse configured
// Stripe Payment Links and grant credits only after the webhook verifies payment.
function upsertPortalPlan_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const sheet = getOrCreateSheet_(spreadsheet, CRM_PLAN_SHEET_NAME);
  setupPlansSheet_(sheet);
  const requestedPlanId = normalizeValue_(payload.plan_id);
  const existing = requestedPlanId
    ? findSheetRecordById_(sheet, PLAN_COLUMNS, "plan_id", requestedPlanId)
    : null;
  if (requestedPlanId && !existing) {
    return { ok: false, code: "PLAN_NOT_FOUND" };
  }

  const planType = normalizeAllowed_(payload.plan_type, PLAN_TYPE_OPTIONS,
    normalizeAllowed_(existing?.data.plan_type, PLAN_TYPE_OPTIONS, ""));
  const status = normalizeAllowed_(payload.status, PLAN_STATUS_OPTIONS,
    normalizeAllowed_(existing?.data.status, PLAN_STATUS_OPTIONS, "draft"));
  const name = normalizeValue_(payload.name || existing?.data.name).slice(0, 180);
  const priceCad = normalizePlanMoney_(payload.price_cad, existing?.data.price_cad);
  const sessionCount = normalizePlanSessionCount_(payload.session_count, planType, existing?.data.session_count);
  const cadence = resolvePlanCadence_(planType, payload.cadence, existing?.data.cadence);
  const noticeHours = resolvePlanNoticeHours_(planType, payload.cancellation_notice_hours, existing?.data.cancellation_notice_hours);
  const validityDays = normalizePlanWholeNumber_(payload.validity_days, existing?.data.validity_days, 730);
  const billingMode = normalizeAllowed_(payload.billing_mode, PLAN_BILLING_MODE_OPTIONS,
    normalizeAllowed_(existing?.data.billing_mode, PLAN_BILLING_MODE_OPTIONS, "manual_tracking"));
  const unitPriceCad = normalizePlanMoney_(payload.unit_price_cad,
    planType === "pack" && priceCad && sessionCount ? String(Number(priceCad) / Number(sessionCount)) : existing?.data.unit_price_cad);

  if (!name || !planType || (status === "active" && !isPositivePlanMoney_(priceCad)) ||
      (planType === "pack" && status === "active" && !Number(sessionCount))) {
    return { ok: false, code: "PLAN_DETAILS_REQUIRED" };
  }

  const now = new Date().toISOString();
  const record = {
    plan_id: existing ? existing.data.plan_id : createRecordId_("PLAN"),
    plan_type: planType,
    name,
    description: normalizeValue_(payload.description || existing?.data.description).slice(0, 1000),
    status,
    session_count: sessionCount,
    price_cad: priceCad,
    unit_price_cad: unitPriceCad,
    cadence,
    cancellation_notice_hours: noticeHours,
    validity_days: validityDays,
    eligible_session_types: normalizePlanSessionTypes_(payload.eligible_session_types, existing?.data.eligible_session_types),
    // Metadata only for now. No action reads this value to charge a family.
    billing_mode: billingMode,
    notes: normalizeValue_(payload.notes || existing?.data.notes).slice(0, 1200),
    created_at: existing ? existing.data.created_at : now,
    updated_at: now,
  };

  writeRecord_(sheet, PLAN_COLUMNS, existing ? existing.rowNumber : null, record);
  return { ok: true, plan_id: record.plan_id, plan: sanitizePlanForPortal_(record) };
}

function validatePlanEnrollmentMatchAndSchedule_(spreadsheet, values) {
  const parent = values.parent || findParentRecordByEmail_(spreadsheet, values.parent_email);
  const student = values.student || findStudentForParent_(spreadsheet, values.parent_email, values.student_id);
  if (!parent || !student) {
    return { ok: false, code: "PLAN_ENROLLMENT_DETAILS_REQUIRED" };
  }

  // Student-level matching is authoritative. The lead-level tutor ID remains a
  // compatibility source for families matched before Students was introduced.
  const recordedTutorId = assignedTutorIdForStudent_(student) || assignedTutorIdForLead_(parent);
  const tutorId = normalizeValue_(values.tutor_id);
  if (!recordedTutorId || !tutorId || tutorId !== recordedTutorId) {
    return { ok: false, code: "PLAN_ENROLLMENT_MATCH_REQUIRED" };
  }
  const tutor = findActiveTutorById_(spreadsheet, tutorId);
  if (!tutor) {
    return { ok: false, code: "PLAN_ENROLLMENT_MATCH_REQUIRED" };
  }

  const cadence = normalizeAllowed_(values.cadence, ["weekly", "biweekly"], "");
  const scheduledWeekday = normalizeAllowed_(values.scheduled_weekday, WEEKDAY_OPTIONS, "");
  const scheduledTime = normalizeAvailabilityTime_(values.scheduled_time);
  const hasRecordedSchedule = Boolean(normalizeValue_(values.enrollment_id)) &&
    getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
      .some((session) => normalizeValue_(session.plan_enrollment_id) === normalizeValue_(values.enrollment_id) &&
        normalizeValue_(session.student_id) === normalizeValue_(student.student_id) &&
        normalizeValue_(session.tutor_id) === tutorId &&
        ["confirmed", "calendar_created", "completed"].includes(normalizeValue_(session.session_status)) &&
        Boolean(coerceDate_(session.start_at)));
  if ((!cadence || !scheduledWeekday || !scheduledTime) && !hasRecordedSchedule) {
    return { ok: false, code: "PLAN_ENROLLMENT_SCHEDULE_REQUIRED" };
  }
  return {
    ok: true,
    parent,
    student,
    tutor,
    cadence: cadence || normalizeAllowed_(values.cadence, PLAN_CADENCE_OPTIONS, "one_time"),
    scheduled_weekday: scheduledWeekday,
    scheduled_time: scheduledTime,
  };
}

function createPortalPlanEnrollment_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token);
  if (!portalSession.ok || !["parent", "operator"].includes(portalSession.access.role)) {
    return portalSession.ok ? { ok: false, code: "PLAN_ENROLLMENT_NOT_ALLOWED" } : portalSession;
  }

  const plan = findActivePlan_(spreadsheet, payload.plan_id);
  if (!plan) {
    return { ok: false, code: "PLAN_NOT_AVAILABLE" };
  }

  const isOperator = portalSession.access.role === "operator";
  const parentEmail = isOperator
    ? normalizeEmail_(payload.parent_email)
    : normalizeEmail_(portalSession.access.email);
  const parent = findParentRecordByEmail_(spreadsheet, parentEmail);
  const student = findStudentForParent_(spreadsheet, parentEmail, payload.student_id);
  if (!parent || !student) {
    return { ok: false, code: "PLAN_ENROLLMENT_DETAILS_REQUIRED" };
  }

  const assignedTutorId = assignedTutorIdForStudent_(student) || assignedTutorIdForLead_(parent);
  const tutorId = isOperator
    ? normalizeValue_(payload.tutor_id || assignedTutorId)
    : assignedTutorId;
  let tutor = tutorId ? findActiveTutorById_(spreadsheet, tutorId) : null;
  const requestedStatus = isOperator
    ? normalizeAllowed_(payload.status, PLAN_ENROLLMENT_STATUS_OPTIONS, "pending")
    : "pending";
  let cadence = resolvePlanCadence_(plan.plan_type, payload.cadence, plan.cadence);
  let scheduledWeekday = normalizeAllowed_(payload.scheduled_weekday, WEEKDAY_OPTIONS, "");
  let scheduledTime = normalizeAvailabilityTime_(payload.scheduled_time);
  const requestedStart = coerceDate_(payload.start_at);
  const startAt = requestedStart ? requestedStart.toISOString() : new Date().toISOString();
  const isRhythm = ["weekly", "biweekly"].includes(cadence);

  if (normalizeValue_(plan.plan_type) === "pack") {
    const eligibility = validatePlanEnrollmentMatchAndSchedule_(spreadsheet, {
      parent,
      student,
      parent_email: parentEmail,
      student_id: student.student_id,
      tutor_id: tutorId,
      cadence: payload.cadence,
      scheduled_weekday: payload.scheduled_weekday,
      scheduled_time: payload.scheduled_time,
    });
    if (!eligibility.ok) {
      return eligibility;
    }
    tutor = eligibility.tutor;
    cadence = eligibility.cadence;
    scheduledWeekday = eligibility.scheduled_weekday;
    scheduledTime = eligibility.scheduled_time;
  }

  if (requestedStatus === "active" && !tutor) {
    return { ok: false, code: "MATCHING_PENDING" };
  }
  if (requestedStatus === "active" && isRhythm && (!scheduledWeekday || !scheduledTime)) {
    return { ok: false, code: "PLAN_RHYTHM_DETAILS_REQUIRED" };
  }
  if (normalizeValue_(payload.scheduled_time) && !scheduledTime) {
    return { ok: false, code: "PLAN_RHYTHM_DETAILS_REQUIRED" };
  }

  const enrollmentLock = LockService.getScriptLock();
  if (!enrollmentLock.tryLock(5000)) {
    return { ok: false, code: "PLAN_ENROLLMENT_BUSY" };
  }

  try {
    const enrollmentSheet = getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME);
    setupPlanEnrollmentsSheet_(enrollmentSheet);
    const duplicate = getSheetRecordsFromSheet_(enrollmentSheet, PLAN_ENROLLMENT_COLUMNS)
      .find((record) => normalizeValue_(record.data.plan_id) === normalizeValue_(plan.plan_id) &&
        normalizeEmail_(record.data.parent_email) === parentEmail &&
        normalizeValue_(record.data.student_id) === normalizeValue_(student.student_id) &&
        ["pending", "active", "paused"].includes(normalizeValue_(record.data.status)));
    if (duplicate) {
      return { ok: false, code: "PLAN_ENROLLMENT_EXISTS", enrollment_id: duplicate.data.enrollment_id };
    }

    const now = new Date().toISOString();
    const validityDays = Number(plan.validity_days);
    const expiresAt = Number.isFinite(validityDays) && validityDays > 0
      ? new Date(new Date(startAt).getTime() + validityDays * 24 * 60 * 60 * 1000).toISOString()
      : "";
    const record = {
      enrollment_id: createRecordId_("ENROLL"),
      plan_id: plan.plan_id,
      lead_id: parent.lead_id,
      parent_email: parentEmail,
      student_id: student.student_id,
      student_name: student.student_name,
      tutor_id: tutor ? tutor.tutor_id : "",
      tutor_name: tutor ? tutor.tutor_name : "",
      status: requestedStatus,
      cadence,
      scheduled_weekday: scheduledWeekday,
      scheduled_time: scheduledTime,
      timezone: normalizeValue_(payload.timezone).slice(0, 80) || "America/Toronto",
      start_at: startAt,
      pause_from_at: "",
      paused_at: "",
      resumed_at: "",
      cancelled_at: "",
      cancellation_notice_hours: resolvePlanNoticeHours_(plan.plan_type, payload.cancellation_notice_hours, plan.cancellation_notice_hours),
      // Package credits remain unavailable until Stripe verifies the linked payment.
      billing_status: "not_configured",
      expires_at: expiresAt,
      notes: normalizeValue_(payload.notes).slice(0, 1200),
      created_at: now,
      updated_at: now,
    };
    enrollmentSheet.appendRow(PLAN_ENROLLMENT_COLUMNS.map((column) => record[column] || ""));

    return buildPlanEnrollmentResponse_(spreadsheet, portalSession.access, record);
  } finally {
    enrollmentLock.releaseLock();
  }
}

function getPlanPaymentStage_(planId, paymentStage) {
  const stages = {
    "PLAN-PACK4-250": {
      momentum_initial: { offer: "momentum_block_payment_1", amount_cad: "250", credit_grant_count: 4 },
    },
    "PLAN-PACK10-600": {
      progression_initial: { offer: "progression_block_payment_1", amount_cad: "300", credit_grant_count: 5 },
      progression_midpoint: { offer: "progression_block_payment_2", amount_cad: "300", credit_grant_count: 5 },
    },
  };
  return stages[normalizeValue_(planId)]?.[normalizeValue_(paymentStage)] || null;
}

function createPortalPlanPaymentRequest_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const enrollmentId = normalizeValue_(payload.enrollment_id);
  const enrollmentSheet = getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME);
  setupPlanEnrollmentsSheet_(enrollmentSheet);
  const enrollmentRecord = findSheetRecordById_(
    enrollmentSheet,
    PLAN_ENROLLMENT_COLUMNS,
    "enrollment_id",
    enrollmentId,
  );
  if (!enrollmentRecord) {
    return { ok: false, code: "PLAN_ENROLLMENT_NOT_FOUND" };
  }

  const plan = findPlanById_(spreadsheet, enrollmentRecord.data.plan_id);
  if (!plan) {
    return { ok: false, code: "PLAN_NOT_AVAILABLE" };
  }
  const stage = getPlanPaymentStage_(plan.plan_id, payload.payment_stage);
  if (!stage) {
    return { ok: false, code: "PLAN_PAYMENT_STAGE_INVALID" };
  }

  const paymentLock = LockService.getScriptLock();
  if (!paymentLock.tryLock(5000)) {
    return { ok: false, code: "PLAN_PAYMENT_REQUEST_BUSY" };
  }

  try {
    const currentEnrollment = findSheetRecordById_(
      enrollmentSheet,
      PLAN_ENROLLMENT_COLUMNS,
      "enrollment_id",
      enrollmentId,
    );
    if (!currentEnrollment) {
      return { ok: false, code: "PLAN_ENROLLMENT_NOT_FOUND" };
    }
    if (["cancelled", "completed", "expired"].includes(normalizeValue_(currentEnrollment.data.status))) {
      return { ok: false, code: "PLAN_ENROLLMENT_NOT_ACTIONABLE" };
    }
    const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
    setupPaymentSheet_(paymentSheet);
    const existing = getSheetRecordsFromSheet_(paymentSheet, PAYMENT_COLUMNS)
      .find((record) => normalizeValue_(record.data.plan_enrollment_id) === enrollmentId &&
        normalizeValue_(record.data.offer) === stage.offer &&
        normalizeValue_(record.data.payment_status) !== "waived");
    if (existing) {
      if (normalizeValue_(existing.data.payment_status) !== "paid" &&
          normalizeValue_(currentEnrollment.data.billing_status) !== "payment_pending") {
        writeRecord_(enrollmentSheet, PLAN_ENROLLMENT_COLUMNS, currentEnrollment.rowNumber, {
          ...currentEnrollment.data,
          billing_status: "payment_pending",
          updated_at: new Date().toISOString(),
        });
      }
      if (normalizeValue_(existing.data.payment_status) === "payment_requested" &&
          normalizeValue_(existing.data.payment_method) === "stripe_checkout" &&
          !getCheckoutPaymentUrl_(existing.data)) {
        const issued = issueCheckoutForPayment_(spreadsheet, existing.data);
        if (!issued.ok) {
          return issued;
        }
        return {
          ok: true,
          payment_id: existing.data.payment_id,
          already_requested: true,
          payment_url: issued.payment_url,
          payment: sanitizePaymentForOperator_({ ...existing.data, checkout_url: issued.payment_url, due_date: issued.due_date }),
        };
      }
      return {
        ok: true,
        payment_id: existing.data.payment_id,
        already_requested: true,
        payment_url: getCheckoutPaymentUrl_(existing.data),
        payment: sanitizePaymentForOperator_(existing.data),
      };
    }

    const enrollmentEligibility = validatePlanEnrollmentMatchAndSchedule_(spreadsheet, {
      enrollment_id: enrollmentId,
      parent_email: currentEnrollment.data.parent_email,
      student_id: currentEnrollment.data.student_id,
      tutor_id: currentEnrollment.data.tutor_id,
      cadence: currentEnrollment.data.cadence,
      scheduled_weekday: currentEnrollment.data.scheduled_weekday,
      scheduled_time: currentEnrollment.data.scheduled_time,
    });
    if (!enrollmentEligibility.ok) {
      return enrollmentEligibility;
    }

    if (normalizeValue_(payload.payment_stage) === "progression_midpoint") {
      const summary = buildEnrollmentCreditSummary_(spreadsheet, enrollmentId);
      if (summary.credits_total < 5 || summary.credits_reserved + summary.credits_used < 5) {
        return { ok: false, code: "PLAN_PAYMENT_STAGE_NOT_READY" };
      }
    }

    const parent = findParentRecordByEmail_(spreadsheet, currentEnrollment.data.parent_email);
    const now = new Date().toISOString();
    const payment = {
      payment_id: createRecordId_("PAY"),
      session_id: "",
      lead_id: currentEnrollment.data.lead_id,
      parent_name: normalizeValue_(parent?.parent_name) || normalizeValue_(currentEnrollment.data.student_name),
      email: normalizeEmail_(currentEnrollment.data.parent_email),
      offer: stage.offer,
      amount_cad: stage.amount_cad,
      payment_method: "stripe_checkout",
      payment_status: "payment_requested",
      payment_link: "",
      invoice_id: "",
      due_date: "",
      paid_at: "",
      tutor_payout_cad: "0",
      payout_status: "not_due",
      notes: `Package payment requested for enrollment ${enrollmentId}. Credits are granted only after Stripe verification.`,
      created_at: now,
      updated_at: now,
      plan_enrollment_id: enrollmentId,
      credit_grant_count: stage.credit_grant_count,
    };
    paymentSheet.appendRow(PAYMENT_COLUMNS.map((column) => payment[column] || ""));
    const issued = issueCheckoutForPayment_(spreadsheet, payment);
    if (!issued.ok) {
      return issued;
    }
    payment.checkout_url = issued.payment_url;
    payment.checkout_expires_at = issued.due_date;
    payment.due_date = issued.due_date;

    writeRecord_(enrollmentSheet, PLAN_ENROLLMENT_COLUMNS, currentEnrollment.rowNumber, {
      ...currentEnrollment.data,
      billing_status: "payment_pending",
      updated_at: now,
    });

    let emailSent = false;
    try {
      sendPaymentRequestEmail_(payment);
      emailSent = true;
    } catch (error) {
      // The persisted request remains visible to the team if email delivery is delayed.
    }

    return {
      ok: true,
      payment_id: payment.payment_id,
      email_sent: emailSent,
      payment_url: issued.payment_url,
      payment: sanitizePaymentForOperator_(payment),
    };
  } finally {
    paymentLock.releaseLock();
  }
}

function updatePortalPlanEnrollment_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token);
  if (!portalSession.ok || !["parent", "operator"].includes(portalSession.access.role)) {
    return portalSession.ok ? { ok: false, code: "PLAN_ENROLLMENT_NOT_ALLOWED" } : portalSession;
  }

  const enrollmentRecord = findPlanEnrollmentForPortalAccess_(spreadsheet, portalSession.access, payload.enrollment_id);
  if (!enrollmentRecord) {
    return { ok: false, code: "PLAN_ENROLLMENT_NOT_FOUND" };
  }
  if (["cancelled", "completed", "expired"].includes(normalizeValue_(enrollmentRecord.data.status))) {
    return { ok: false, code: "PLAN_ENROLLMENT_NOT_ACTIONABLE" };
  }

  const isOperator = portalSession.access.role === "operator";
  const plan = findPlanById_(spreadsheet, enrollmentRecord.data.plan_id);
  const current = enrollmentRecord.data;
  const changesSchedule = hasPortalField_(payload, "scheduled_weekday") || hasPortalField_(payload, "scheduled_time") ||
    hasPortalField_(payload, "timezone") || hasPortalField_(payload, "start_at");
  const currentWindow = buildPlanModificationWindow_(spreadsheet, current);
  if (!isOperator && changesSchedule && current.status === "active" &&
      currentWindow.next_occurrence_at && !currentWindow.can_modify) {
    return { ok: false, code: "PLAN_MODIFICATION_WINDOW_CLOSED", modification_window: currentWindow };
  }

  const next = { ...current, updated_at: new Date().toISOString() };
  if (hasPortalField_(payload, "scheduled_weekday")) {
    next.scheduled_weekday = normalizeAllowed_(payload.scheduled_weekday, WEEKDAY_OPTIONS, "");
  }
  if (hasPortalField_(payload, "scheduled_time")) {
    const time = normalizeAvailabilityTime_(payload.scheduled_time);
    if (normalizeValue_(payload.scheduled_time) && !time) {
      return { ok: false, code: "PLAN_RHYTHM_DETAILS_REQUIRED" };
    }
    next.scheduled_time = time;
  }
  if (hasPortalField_(payload, "timezone")) {
    next.timezone = normalizeValue_(payload.timezone).slice(0, 80) || current.timezone || "America/Toronto";
  }
  if (hasPortalField_(payload, "start_at")) {
    const startAt = coerceDate_(payload.start_at);
    if (!startAt) {
      return { ok: false, code: "PLAN_RHYTHM_DETAILS_REQUIRED" };
    }
    next.start_at = startAt.toISOString();
  }
  if (hasPortalField_(payload, "notes")) {
    next.notes = normalizeValue_(payload.notes).slice(0, 1200);
  }

  if (isOperator) {
    const nextStatus = normalizeAllowed_(payload.status, PLAN_ENROLLMENT_STATUS_OPTIONS, current.status);
    if (nextStatus === "active" && ["weekly", "biweekly"].includes(next.cadence) &&
        (!next.scheduled_weekday || !next.scheduled_time)) {
      return { ok: false, code: "PLAN_RHYTHM_DETAILS_REQUIRED" };
    }
    next.status = nextStatus;
  }

  writeRecord_(getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME), PLAN_ENROLLMENT_COLUMNS, enrollmentRecord.rowNumber, next);
  if (!isOperator && changesSchedule) {
    appendPortalRequestRecord_(spreadsheet, {
      role: "parent",
      email: portalSession.access.email,
      related_id: portalSession.access.related_id,
      request_type: "schedule_change",
      subject: "Preference de rythme modifiee",
      message: `Rythme ${next.enrollment_id}: preferences futures mises a jour dans le portail.`,
    });
  }

  return buildPlanEnrollmentResponse_(spreadsheet, portalSession.access, next, plan);
}

function pausePortalPlanEnrollment_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token);
  if (!portalSession.ok || !["parent", "operator"].includes(portalSession.access.role)) {
    return portalSession.ok ? { ok: false, code: "PLAN_ENROLLMENT_NOT_ALLOWED" } : portalSession;
  }

  const enrollmentRecord = findPlanEnrollmentForPortalAccess_(spreadsheet, portalSession.access, payload.enrollment_id);
  if (!enrollmentRecord || ["cancelled", "completed", "expired"].includes(normalizeValue_(enrollmentRecord?.data.status))) {
    return { ok: false, code: "PLAN_ENROLLMENT_NOT_ACTIONABLE" };
  }

  const now = new Date().toISOString();
  const requestedPauseAt = coerceDate_(payload.pause_from_at);
  const next = {
    ...enrollmentRecord.data,
    status: "paused",
    pause_from_at: requestedPauseAt ? requestedPauseAt.toISOString() : now,
    paused_at: now,
    updated_at: now,
  };
  writeRecord_(getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME), PLAN_ENROLLMENT_COLUMNS, enrollmentRecord.rowNumber, next);

  const currentWindow = buildPlanModificationWindow_(spreadsheet, enrollmentRecord.data);
  if (portalSession.access.role === "parent") {
    appendPortalRequestRecord_(spreadsheet, {
      role: "parent",
      email: portalSession.access.email,
      related_id: portalSession.access.related_id,
      request_type: "schedule_change",
      subject: "Rythme mis sur pause",
      message: `Rythme ${next.enrollment_id} mis sur pause. Les seances deja confirmees restent a verifier separement.`,
    });
  }

  return {
    ...buildPlanEnrollmentResponse_(spreadsheet, portalSession.access, next),
    modification_window: currentWindow,
    effective_after_current_session: Boolean(currentWindow.next_occurrence_at && !currentWindow.can_modify),
  };
}

function resumePortalPlanEnrollment_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token);
  if (!portalSession.ok || !["parent", "operator"].includes(portalSession.access.role)) {
    return portalSession.ok ? { ok: false, code: "PLAN_ENROLLMENT_NOT_ALLOWED" } : portalSession;
  }

  const enrollmentRecord = findPlanEnrollmentForPortalAccess_(spreadsheet, portalSession.access, payload.enrollment_id);
  if (!enrollmentRecord || normalizeValue_(enrollmentRecord?.data.status) !== "paused") {
    return { ok: false, code: "PLAN_ENROLLMENT_NOT_PAUSED" };
  }
  if (["weekly", "biweekly"].includes(normalizeValue_(enrollmentRecord.data.cadence)) &&
      (!normalizeValue_(enrollmentRecord.data.scheduled_weekday) || !normalizeValue_(enrollmentRecord.data.scheduled_time))) {
    return { ok: false, code: "PLAN_RHYTHM_DETAILS_REQUIRED" };
  }

  const now = new Date().toISOString();
  const next = {
    ...enrollmentRecord.data,
    status: "active",
    pause_from_at: "",
    resumed_at: now,
    updated_at: now,
  };
  writeRecord_(getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME), PLAN_ENROLLMENT_COLUMNS, enrollmentRecord.rowNumber, next);
  return buildPlanEnrollmentResponse_(spreadsheet, portalSession.access, next);
}

function adjustPortalPlanCredits_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const enrollmentRecord = findSheetRecordById_(getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME),
    PLAN_ENROLLMENT_COLUMNS, "enrollment_id", payload.enrollment_id);
  if (!enrollmentRecord) {
    return { ok: false, code: "PLAN_ENROLLMENT_NOT_FOUND" };
  }
  const plan = findPlanById_(spreadsheet, enrollmentRecord.data.plan_id);
  if (!plan || normalizeValue_(plan.plan_type) !== "pack") {
    return { ok: false, code: "PLAN_CREDIT_ADJUSTMENT_NOT_ALLOWED" };
  }
  if (normalizeValue_(enrollmentRecord.data.status) !== "active") {
    return { ok: false, code: "PLAN_ENROLLMENT_NOT_ACTIONABLE" };
  }
  const amount = normalizeCreditAmount_(payload.available_delta);
  if (!amount) {
    return { ok: false, code: "PLAN_CREDIT_ADJUSTMENT_REQUIRED" };
  }
  const reason = normalizeValue_(payload.reason).trim().slice(0, 500);
  if (!reason) {
    return { ok: false, code: "PLAN_CREDIT_ADJUSTMENT_REASON_REQUIRED" };
  }

  const currentSummary = buildEnrollmentCreditSummary_(spreadsheet, enrollmentRecord.data.enrollment_id);
  if (currentSummary.credits_remaining + amount < 0) {
    return { ok: false, code: "PLAN_CREDIT_BALANCE_INSUFFICIENT", credit_summary: currentSummary };
  }
  const ledger = appendCreditLedgerEntry_(spreadsheet, {
    enrollment_id: enrollmentRecord.data.enrollment_id,
    plan_id: enrollmentRecord.data.plan_id,
    parent_email: enrollmentRecord.data.parent_email,
    student_id: enrollmentRecord.data.student_id,
    entry_type: normalizeAllowed_(payload.entry_type, ["grant", "adjustment", "expiry"], "adjustment"),
    available_delta: amount,
    reason,
    expires_at: enrollmentRecord.data.expires_at,
  });

  return {
    ok: true,
    enrollment_id: enrollmentRecord.data.enrollment_id,
    credit_ledger_entry: sanitizeCreditLedgerForOperator_(ledger),
    credit_summary: buildEnrollmentCreditSummary_(spreadsheet, enrollmentRecord.data.enrollment_id),
  };
}

function getPortalPlanChangeDeadline_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token);
  if (!portalSession.ok || !["parent", "operator"].includes(portalSession.access.role)) {
    return portalSession.ok ? { ok: false, code: "PLAN_ENROLLMENT_NOT_ALLOWED" } : portalSession;
  }

  const enrollmentRecord = findPlanEnrollmentForPortalAccess_(spreadsheet, portalSession.access, payload.enrollment_id);
  if (!enrollmentRecord) {
    return { ok: false, code: "PLAN_ENROLLMENT_NOT_FOUND" };
  }
  return {
    ok: true,
    enrollment_id: enrollmentRecord.data.enrollment_id,
    modification_window: buildPlanModificationWindow_(spreadsheet, enrollmentRecord.data),
  };
}

function submitPortalSessionNote_(spreadsheet, payload) {
  const session = verifyPortalSession_(spreadsheet, payload.token, "tutor");

  if (!session.ok) {
    return session;
  }

  const sessionId = normalizeValue_(payload.session_id);
  if (!sessionId) {
    return { ok: false, code: "SESSION_REQUIRED" };
  }

  const sessionRecord = findSessionForTutor_(spreadsheet, session.access, sessionId);
  if (!sessionRecord) {
    return { ok: false, code: "SESSION_NOT_FOUND" };
  }

  const sessionData = sessionRecord.data;
  const sessionEnd = coerceDate_(sessionData.end_at);
  if (!sessionEnd || sessionEnd.getTime() > Date.now()) {
    return { ok: false, code: "SESSION_NOTE_NOT_READY" };
  }

  const noteSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_NOTE_SHEET_NAME);
  setupSessionNotesSheet_(noteSheet);

  const existingNote = getSheetRecordsFromSheet_(noteSheet, SESSION_NOTE_COLUMNS)
    .find((record) => normalizeValue_(record.data.session_id) === sessionId &&
      normalizeValue_(record.data.tutor_id) === normalizeValue_(session.access.related_id));
  const now = new Date().toISOString();
  const attendance = normalizeAllowed_(payload.attendance, SESSION_ATTENDANCE_OPTIONS, "present");
  const riskLevel = normalizeAllowed_(payload.risk_level, SESSION_RISK_OPTIONS, "green");
  const parentSummary = normalizeValue_(payload.parent_summary).slice(0, 2500);
  const previousParentUpdateStatus = normalizeAllowed_(existingNote?.data.parent_update_status, PARENT_UPDATE_STATUS_OPTIONS, "");
  const note = {
    note_id: existingNote ? existingNote.data.note_id : createRecordId_("NOTE"),
    session_id: sessionId,
    lead_id: sessionData.lead_id,
    parent_name: sessionData.parent_name,
    student_name: normalizeValue_(payload.student_name) || sessionData.student_name,
    tutor_id: session.access.related_id,
    tutor_name: session.access.display_name,
    session_date: normalizeValue_(payload.session_date) || serializeValue_(sessionData.start_at),
    subject_level: sessionData.student_level_subject,
    attendance,
    focus_worked: normalizeValue_(payload.focus_worked).slice(0, 2000),
    wins: normalizeValue_(payload.wins).slice(0, 2000),
    stuck_points: normalizeValue_(payload.stuck_points).slice(0, 2000),
    homework_next: normalizeValue_(payload.homework_next).slice(0, 2000),
    parent_summary: parentSummary,
    risk_level: riskLevel,
    next_recommendation: normalizeAllowed_(payload.next_recommendation, SESSION_RECOMMENDATION_OPTIONS, "keep_weekly"),
    parent_update_status: parentSummary && riskLevel !== "high"
      ? (previousParentUpdateStatus === "sent" ? "sent" : "ready_to_send")
      : "draft",
    follow_up_owner: "Chahine",
    follow_up_due: normalizeValue_(payload.follow_up_due),
    created_at: existingNote ? existingNote.data.created_at : now,
    updated_at: now,
    student_confidence: normalizeAllowed_(payload.student_confidence, ["lower", "steady", "higher"], "steady"),
    next_goal: normalizeValue_(payload.next_goal).slice(0, 1000),
  };

  writeRecord_(noteSheet, SESSION_NOTE_COLUMNS, existingNote ? existingNote.rowNumber : null, note);
  markSessionCompleted_(spreadsheet, sessionRecord);

  let parentUpdateSent = false;
  if (note.parent_update_status === "ready_to_send") {
    parentUpdateSent = sendParentSessionSummary_(sessionRecord, note);
    if (parentUpdateSent) {
      const noteRecord = findSheetRecordById_(noteSheet, SESSION_NOTE_COLUMNS, "note_id", note.note_id);
      if (noteRecord) {
        writeRecord_(noteSheet, SESSION_NOTE_COLUMNS, noteRecord.rowNumber, {
          ...noteRecord.data,
          parent_update_status: "sent",
          updated_at: new Date().toISOString(),
        });
      }
    }
  }

  const nextSession = proposeNextRecurringSession_(spreadsheet, sessionRecord, note);
  return {
    ok: true,
    note_id: note.note_id,
    updated: Boolean(existingNote),
    parent_update_sent: parentUpdateSent,
    next_session_id: nextSession ? nextSession.session_id : "",
  };
}

function createPortalSession_(spreadsheet, payload) {
  const session = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!session.ok) {
    return session;
  }

  const parentEmail = normalizeEmail_(payload.parent_email);
  const tutorId = normalizeValue_(payload.tutor_id);
  const startAt = coerceDate_(payload.start_at);
  const durationMinutes = Math.max(30, Math.min(240, Number(payload.duration_minutes) || 60));
  const sessionType = normalizeAllowed_(payload.session_type, SESSION_TYPE_OPTIONS, "first_session");

  if (!parentEmail || !tutorId || !startAt || startAt.getTime() < Date.now() - 5 * 60 * 1000) {
    return { ok: false, code: "SESSION_DETAILS_REQUIRED" };
  }

  const parent = findParentRecordByEmail_(spreadsheet, parentEmail);
  const tutor = findActiveTutorById_(spreadsheet, tutorId);
  if (!parent || !tutor) {
    return { ok: false, code: "SESSION_PARTICIPANT_NOT_FOUND" };
  }
  const requestedStudentId = normalizeValue_(payload.student_id);
  const student = requestedStudentId
    ? findStudentForParent_(spreadsheet, parentEmail, requestedStudentId)
    : null;
  if (requestedStudentId && !student) {
    return { ok: false, code: "STUDENT_NOT_FOUND" };
  }
  const planBinding = resolvePlanSessionBinding_(spreadsheet, {
    plan_enrollment_id: payload.plan_enrollment_id,
    parent_email: parentEmail,
    student_id: student?.student_id || "",
    tutor_id: tutor.tutor_id,
    session_type: sessionType,
  });
  if (!planBinding.ok) {
    return planBinding;
  }

  const endAt = new Date(startAt.getTime() + durationMinutes * 60 * 1000);
  if (hasTutorSessionConflict_(spreadsheet, tutor.tutor_id, startAt, endAt)) {
    return { ok: false, code: "SESSION_TIME_CONFLICT" };
  }

  const paymentDetails = resolveSessionPaymentDetails_(spreadsheet, { session_type: sessionType });
  const amountCad = paymentDetails.amount_cad || defaultSessionAmountCad_(sessionType);
  const now = new Date().toISOString();
  const record = {
    session_id: createRecordId_("SESSION"),
    lead_id: parent.lead_id,
    parent_name: parent.parent_name || parentEmail,
    student_name: normalizeValue_(student?.student_name || payload.student_name).slice(0, 180),
    student_level_subject: normalizeValue_(student?.student_level_subject || payload.student_level_subject).slice(0, 300) || parent.student_level_subject,
    tutor_id: tutor.tutor_id,
    tutor_name: tutor.tutor_name,
    tutor_calendar_email: tutor.calendar_email,
    parent_email: parentEmail,
    session_status: "proposed",
    session_type: sessionType,
    start_at: startAt.toISOString(),
    end_at: endAt.toISOString(),
    timezone: normalizeValue_(payload.timezone) || "America/Toronto",
    format: normalizeAllowed_(payload.format, TUTOR_FORMAT_OPTIONS, parent.format || "online"),
    location: normalizeValue_(payload.location).slice(0, 400),
    google_calendar_event_id: "",
    payment_status: planBinding.requires_credit ? "not_requested" : "payment_requested",
    payment_link: planBinding.requires_credit ? "" : paymentDetails.payment_link,
    amount_cad: planBinding.requires_credit ? "" : amountCad,
    notes: [normalizeValue_(payload.notes).slice(0, 1200), planBinding.requires_credit ? "Pack credit reserved for this session." : ""].filter(Boolean).join(" | "),
    created_at: now,
    updated_at: now,
    parent_confirmed_at: "",
    tutor_confirmed_at: "",
    calendar_invites_sent_at: "",
    recurrence_weeks: normalizeValue_(payload.recurrence_weeks) || "1",
    recurring_from_session_id: "",
    student_id: normalizeValue_(student?.student_id),
    plan_enrollment_id: planBinding.enrollment ? planBinding.enrollment.enrollment_id : "",
    modification_deadline_at: planBinding.enrollment ? planModificationDeadlineForSession_(startAt, planBinding.cancellation_notice_hours) : "",
    cancellation_notice_hours: String(planBinding.enrollment ? planBinding.cancellation_notice_hours : SESSION_CANCELLATION_NOTICE_HOURS),
    credit_reservation_id: "",
  };

  const schedulingLock = LockService.getScriptLock();
  if (!schedulingLock.tryLock(5000)) {
    return { ok: false, code: "SESSION_TIME_CONFLICT" };
  }

  try {
    if (hasTutorSessionConflict_(spreadsheet, tutor.tutor_id, startAt, endAt)) {
      return { ok: false, code: "SESSION_TIME_CONFLICT" };
    }

    const reservation = reservePlanCreditForSession_(spreadsheet, planBinding, record);
    if (reservation && !reservation.ok) {
      return reservation;
    }
    if (reservation?.reservation) {
      record.credit_reservation_id = reservation.reservation.credit_ledger_id;
    }
    const sheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
    setupSessionsSheet_(sheet);
    try {
      sheet.appendRow(SESSION_COLUMNS.map((column) => record[column] || ""));
    } catch (error) {
      if (reservation?.reservation) {
        releasePlanCreditReservationForSession_(spreadsheet, record, "Credit released because the session could not be created.");
      }
      throw error;
    }
    if (student?.assigned_tutor_id && normalizeValue_(student.assigned_tutor_id) !== normalizeValue_(assignedTutorIdForLead_(parent))) {
      markParentLeadSessionBooked_(spreadsheet, parent.lead_id, record.start_at);
    } else {
      assignTutorToParentLead_(spreadsheet, parent.lead_id, tutor, {
        crm_stage: "first_session_booked",
        lead_status: "booked",
        first_session_date: record.start_at,
      });
    }
  } finally {
    schedulingLock.releaseLock();
  }
  sendSessionProposalEmails_(record);

  return { ok: true, session_id: record.session_id, session_status: record.session_status };
}

function bookPortalSession_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "parent");
  if (!portalSession.ok) {
    return portalSession;
  }

  const sessionType = normalizeAllowed_(payload.session_type, SESSION_TYPE_OPTIONS, "first_session");
  const selectedSlotId = normalizeValue_(payload.slot_id);
  const parent = findParentRecordByEmail_(spreadsheet, portalSession.access.email);
  const requestedStudentId = normalizeValue_(payload.student_id);
  const student = requestedStudentId
    ? findStudentForParent_(spreadsheet, portalSession.access.email, requestedStudentId)
    : null;
  const studentName = normalizeValue_(student?.student_name || payload.student_name).slice(0, 180);
  if (!selectedSlotId || !parent || !studentName || (requestedStudentId && !student)) {
    return { ok: false, code: "BOOKING_DETAILS_REQUIRED" };
  }

  const assignedTutorId = assignedTutorIdForStudent_(student) || assignedTutorIdForLead_(parent);
  if (!assignedTutorId) {
    return { ok: false, code: "MATCHING_PENDING" };
  }

  const slot = buildBookableSlots_(spreadsheet, 21)
    .find((candidate) => candidate.slot_id === selectedSlotId && candidate.tutor_id === assignedTutorId);
  if (!slot) {
    return { ok: false, code: "BOOKING_SLOT_UNAVAILABLE" };
  }
  const planBinding = resolvePlanSessionBinding_(spreadsheet, {
    plan_enrollment_id: payload.plan_enrollment_id,
    parent_email: portalSession.access.email,
    student_id: student?.student_id || "",
    tutor_id: slot.tutor_id,
    session_type: sessionType,
  });
  if (!planBinding.ok) {
    return planBinding;
  }

  const paymentDetails = resolveSessionPaymentDetails_(spreadsheet, { session_type: sessionType });
  const paymentMode = planBinding.requires_credit ? "plan_credit" : "stripe_checkout";
  const amountCad = paymentDetails.amount_cad || defaultSessionAmountCad_(sessionType);

  const now = new Date().toISOString();
  const record = {
    session_id: createRecordId_("SESSION"),
    lead_id: parent.lead_id,
    parent_name: parent.parent_name || portalSession.access.display_name || portalSession.access.email,
    student_name: studentName,
    student_level_subject: normalizeValue_(student?.student_level_subject || payload.student_level_subject).slice(0, 300) || parent.student_level_subject,
    tutor_id: slot.tutor_id,
    tutor_name: slot.tutor_name,
    tutor_calendar_email: slot.tutor_calendar_email,
    parent_email: normalizeEmail_(portalSession.access.email),
    session_status: "confirmed",
    session_type: sessionType,
    start_at: slot.start_at,
    end_at: slot.end_at,
    timezone: slot.timezone || "America/Toronto",
    format: slot.format || "online",
    location: slot.location || "",
    google_calendar_event_id: "",
    payment_status: planBinding.requires_credit ? "not_requested" : "payment_requested",
    payment_link: planBinding.requires_credit ? "" : paymentDetails.payment_link,
    amount_cad: planBinding.requires_credit ? "" : amountCad,
    notes: ["Booked by parent in portal.", planBinding.requires_credit ? "Pack credit reserved for this session." : ""].filter(Boolean).join(" | "),
    created_at: now,
    updated_at: now,
    parent_confirmed_at: now,
    tutor_confirmed_at: now,
    calendar_invites_sent_at: "",
    recurrence_weeks: "1",
    recurring_from_session_id: "",
    student_id: normalizeValue_(student?.student_id),
    plan_enrollment_id: planBinding.enrollment ? planBinding.enrollment.enrollment_id : "",
    modification_deadline_at: planBinding.enrollment ? planModificationDeadlineForSession_(slot.start_at, planBinding.cancellation_notice_hours) : "",
    cancellation_notice_hours: String(planBinding.enrollment ? planBinding.cancellation_notice_hours : SESSION_CANCELLATION_NOTICE_HOURS),
    credit_reservation_id: "",
  };

  const bookingLock = LockService.getScriptLock();
  if (!bookingLock.tryLock(5000)) {
    return { ok: false, code: "BOOKING_SLOT_UNAVAILABLE" };
  }

  try {
    if (hasTutorSessionConflict_(spreadsheet, record.tutor_id, new Date(record.start_at), new Date(record.end_at))) {
      return { ok: false, code: "BOOKING_SLOT_UNAVAILABLE" };
    }

    const reservation = reservePlanCreditForSession_(spreadsheet, planBinding, record);
    if (reservation && !reservation.ok) {
      return reservation;
    }
    if (reservation?.reservation) {
      record.credit_reservation_id = reservation.reservation.credit_ledger_id;
    }
    const sheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
    setupSessionsSheet_(sheet);
    try {
      sheet.appendRow(SESSION_COLUMNS.map((column) => record[column] || ""));
    } catch (error) {
      if (reservation?.reservation) {
        releasePlanCreditReservationForSession_(spreadsheet, record, "Credit released because the session could not be booked.");
      }
      throw error;
    }
    if (student?.assigned_tutor_id && normalizeValue_(student.assigned_tutor_id) !== normalizeValue_(assignedTutorIdForLead_(parent))) {
      markParentLeadSessionBooked_(spreadsheet, parent.lead_id, record.start_at);
    } else {
      assignTutorToParentLead_(spreadsheet, parent.lead_id, {
        tutor_id: record.tutor_id,
        tutor_name: record.tutor_name,
      }, {
        crm_stage: "first_session_booked",
        lead_status: "booked",
        first_session_date: record.start_at,
      });
    }
  } finally {
    bookingLock.releaseLock();
  }
  finalizeConfirmedPortalSession_(spreadsheet);
  const payment = getSheetRecords_(spreadsheet, CRM_PAYMENT_SHEET_NAME, PAYMENT_COLUMNS)
    .find((candidate) => normalizeValue_(candidate.session_id) === record.session_id);
  const checkoutUrl = getCheckoutPaymentUrl_(payment);

  return {
    ok: true,
    session_id: record.session_id,
    payment_id: payment ? payment.payment_id : "",
    payment_mode: paymentMode,
    checkout_url: checkoutUrl,
    checkout_expires_at: payment ? payment.checkout_expires_at : "",
    amount_cad: record.amount_cad,
  };
}

function submitParentFeedback_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "parent");
  if (!portalSession.ok) {
    return portalSession;
  }

  const sessionId = normalizeValue_(payload.session_id);
  const sessionRecord = findSessionForPortalAccess_(spreadsheet, portalSession.access, sessionId);
  const rating = Number(payload.rating);
  const clarityRating = Number(payload.clarity_rating || rating);
  if (!sessionRecord || !Number.isInteger(rating) || rating < 1 || rating > 5 ||
      !Number.isInteger(clarityRating) || clarityRating < 1 || clarityRating > 5) {
    return { ok: false, code: "FEEDBACK_DETAILS_REQUIRED" };
  }

  const completedOrPast = ["calendar_created", "completed"].includes(normalizeValue_(sessionRecord.data.session_status)) ||
    Boolean(coerceDate_(sessionRecord.data.end_at) && coerceDate_(sessionRecord.data.end_at).getTime() < Date.now());
  if (!completedOrPast) {
    return { ok: false, code: "FEEDBACK_NOT_AVAILABLE" };
  }

  const sheet = getOrCreateSheet_(spreadsheet, CRM_PARENT_FEEDBACK_SHEET_NAME);
  setupParentFeedbackSheet_(sheet);
  const existing = getSheetRecordsFromSheet_(sheet, PARENT_FEEDBACK_COLUMNS)
    .find((record) => normalizeValue_(record.data.session_id) === sessionId &&
      normalizeEmail_(record.data.parent_email) === normalizeEmail_(portalSession.access.email));
  const now = new Date().toISOString();
  const record = {
    feedback_id: existing ? existing.data.feedback_id : createRecordId_("FEEDBACK"),
    session_id: sessionId,
    lead_id: sessionRecord.data.lead_id,
    parent_email: normalizeEmail_(portalSession.access.email),
    parent_name: sessionRecord.data.parent_name || portalSession.access.display_name,
    tutor_id: sessionRecord.data.tutor_id,
    tutor_name: sessionRecord.data.tutor_name,
    rating: String(rating),
    clarity_rating: String(clarityRating),
    student_confidence: normalizeAllowed_(payload.student_confidence, ["lower", "steady", "higher"], "steady"),
    follow_up_needed: normalizeAllowed_(payload.follow_up_needed, ["yes", "no"], "no"),
    comment: normalizeValue_(payload.comment).slice(0, 2500),
    status: existing ? normalizeAllowed_(existing.data.status, PARENT_FEEDBACK_STATUS_OPTIONS, "new") : "new",
    created_at: existing ? existing.data.created_at : now,
    updated_at: now,
  };

  writeRecord_(sheet, PARENT_FEEDBACK_COLUMNS, existing ? existing.rowNumber : null, record);
  return { ok: true, feedback_id: record.feedback_id };
}

function updatePortalParentProfile_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "parent");
  if (!portalSession.ok) {
    return portalSession;
  }

  const parentName = normalizeValue_(payload.parent_name).slice(0, 180);
  if (!parentName) {
    return { ok: false, code: "PARENT_PROFILE_DETAILS_REQUIRED" };
  }

  const email = normalizeEmail_(portalSession.access.email);
  const leadSheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  const leadRecord = getSheetRecordsFromSheet_(leadSheet, CRM_COLUMNS)
    .find((record) => normalizeValue_(record.data.lead_id) === normalizeValue_(portalSession.access.related_id) ||
      normalizeEmail_(record.data.email) === email);
  if (!leadRecord) {
    return { ok: false, code: "PARENT_NOT_FOUND" };
  }

  const updatedLead = {
    ...leadRecord.data,
    parent_name: parentName,
    phone: normalizeValue_(payload.phone).slice(0, 80),
    student_level_subject: normalizeValue_(payload.student_level_subject).slice(0, 500),
    main_concern: normalizeValue_(payload.main_concern).slice(0, 1200),
    timeline: normalizeValue_(payload.timeline).slice(0, 160),
    format: normalizeValue_(payload.format).slice(0, 160),
  };
  writeRecord_(leadSheet, CRM_COLUMNS, leadRecord.rowNumber, updatedLead);
  // A parent changing contact details must stay signed in. Session invalidation is
  // reserved for staff-initiated email changes, where the login identity changes.
  syncParentReferences_(spreadsheet, updatedLead.lead_id, email, updatedLead, { resetPortalSession: false });

  const accessSheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME);
  const accessRecord = findPortalAccess_(accessSheet, "parent", email);
  if (accessRecord) {
    writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, accessRecord.rowNumber, {
      ...accessRecord.data,
      display_name: parentName,
      updated_at: new Date().toISOString(),
    });
  }

  return { ok: true, lead_id: updatedLead.lead_id, parent_name: parentName };
}

function createInitialStudentIfProvided_(spreadsheet, lead, payload) {
  const studentName = normalizeValue_(payload.student_name).slice(0, 180);
  if (!studentName) {
    return null;
  }

  const now = new Date().toISOString();
  const student = {
    student_id: createRecordId_("STUDENT"),
    lead_id: normalizeValue_(lead.lead_id),
    parent_email: normalizeEmail_(lead.email),
    student_name: studentName,
    student_level_subject: normalizeValue_(payload.student_level_subject || lead.student_level_subject).slice(0, 500),
    learning_notes: normalizeValue_(payload.main_concern || lead.main_concern).slice(0, 1200),
    status: "active",
    assigned_tutor_id: "",
    assigned_tutor_name: "",
    created_at: now,
    updated_at: now,
  };
  const sheet = getOrCreateSheet_(spreadsheet, CRM_STUDENT_SHEET_NAME);
  setupStudentsSheet_(sheet);
  writeRecord_(sheet, STUDENT_COLUMNS, null, student);
  return student;
}

function findStudentForParent_(spreadsheet, parentEmail, studentId) {
  const normalizedEmail = normalizeEmail_(parentEmail);
  const normalizedId = normalizeValue_(studentId);
  if (!normalizedId) {
    return null;
  }

  return getSheetRecords_(spreadsheet, CRM_STUDENT_SHEET_NAME, STUDENT_COLUMNS)
    .find((record) => normalizeValue_(record.student_id) === normalizedId &&
      normalizeEmail_(record.parent_email) === normalizedEmail &&
      normalizeValue_(record.status) === "active") || null;
}

function upsertPortalStudent_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, payload.role);
  if (!portalSession.ok || !["parent", "operator"].includes(portalSession.access.role)) {
    return portalSession.ok ? { ok: false, code: "STUDENT_NOT_ALLOWED" } : portalSession;
  }

  const parentEmail = portalSession.access.role === "parent"
    ? normalizeEmail_(portalSession.access.email)
    : normalizeEmail_(payload.parent_email);
  const parent = findParentRecordByEmail_(spreadsheet, parentEmail);
  const studentName = normalizeValue_(payload.student_name).slice(0, 180);
  const studentId = normalizeValue_(payload.student_id);
  if (!parent || !studentName) {
    return { ok: false, code: "STUDENT_DETAILS_REQUIRED" };
  }

  const sheet = getOrCreateSheet_(spreadsheet, CRM_STUDENT_SHEET_NAME);
  setupStudentsSheet_(sheet);
  const existing = studentId ? findSheetRecordById_(sheet, STUDENT_COLUMNS, "student_id", studentId) : null;
  if (studentId && (!existing || normalizeEmail_(existing.data.parent_email) !== parentEmail)) {
    return { ok: false, code: "STUDENT_NOT_FOUND" };
  }

  const now = new Date().toISOString();
  const student = {
    student_id: existing ? existing.data.student_id : createRecordId_("STUDENT"),
    lead_id: parent.lead_id,
    parent_email: parentEmail,
    student_name: studentName,
    student_level_subject: normalizeValue_(payload.student_level_subject).slice(0, 500),
    learning_notes: normalizeValue_(payload.learning_notes).slice(0, 1200),
    status: normalizeAllowed_(payload.status, STUDENT_STATUS_OPTIONS,
      existing ? normalizeAllowed_(existing.data.status, STUDENT_STATUS_OPTIONS, "active") : "active"),
    assigned_tutor_id: existing ? normalizeValue_(existing.data.assigned_tutor_id) : "",
    assigned_tutor_name: existing ? normalizeValue_(existing.data.assigned_tutor_name) : "",
    created_at: existing ? existing.data.created_at : now,
    updated_at: now,
  };
  writeRecord_(sheet, STUDENT_COLUMNS, existing ? existing.rowNumber : null, student);
  return { ok: true, student_id: student.student_id, student };
}

function assignPortalStudentTutor_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const studentId = normalizeValue_(payload.student_id);
  const tutor = findActiveTutorById_(spreadsheet, payload.tutor_id);
  const sheet = getOrCreateSheet_(spreadsheet, CRM_STUDENT_SHEET_NAME);
  const studentRecord = findSheetRecordById_(sheet, STUDENT_COLUMNS, "student_id", studentId);
  if (!studentRecord || !tutor) {
    return { ok: false, code: "STUDENT_ASSIGNMENT_DETAILS_REQUIRED" };
  }

  const next = {
    ...studentRecord.data,
    assigned_tutor_id: tutor.tutor_id,
    assigned_tutor_name: tutor.tutor_name,
    updated_at: new Date().toISOString(),
  };
  writeRecord_(sheet, STUDENT_COLUMNS, studentRecord.rowNumber, next);
  return { ok: true, student_id: next.student_id, tutor_id: tutor.tutor_id, tutor_name: tutor.tutor_name };
}

function deletePortalTestRecord_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const recordType = normalizeAllowed_(payload.record_type, ["parent_lead", "tutor", "session", "payment", "feedback", "request"], "");
  const recordId = normalizeValue_(payload.record_id);
  if (!recordType || !recordId) {
    return { ok: false, code: "TEST_RECORD_REQUIRED" };
  }

  const result = deleteTestRecord_(spreadsheet, recordType, recordId);
  return result.ok
    ? { ok: true, deleted: result.deleted, record_type: recordType }
    : result;
}

function deletePortalTestRecords_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  if (normalizeValue_(payload.confirmation) !== "DELETE_TEST_DATA") {
    return { ok: false, code: "TEST_DELETE_CONFIRMATION_REQUIRED" };
  }

  const allowedTypes = ["parent_lead", "tutor", "session", "payment", "feedback", "request"];
  const requested = Array.isArray(payload.records) ? payload.records : [];
  const uniqueRecords = requested
    .map((record) => ({
      record_type: normalizeAllowed_(record && record.record_type, allowedTypes, ""),
      record_id: normalizeValue_(record && record.record_id),
    }))
    .filter((record) => record.record_type && record.record_id)
    .filter((record, index, records) => records.findIndex((candidate) =>
      candidate.record_type === record.record_type && candidate.record_id === record.record_id) === index)
    .slice(0, 200);

  if (!uniqueRecords.length) {
    return { ok: false, code: "TEST_RECORD_REQUIRED" };
  }

  const summary = uniqueRecords.reduce((result, record) => {
    const deletion = deleteTestRecord_(spreadsheet, record.record_type, record.record_id);
    if (deletion.ok) {
      result.deleted += Number(deletion.deleted) || 0;
    } else {
      result.skipped += 1;
    }
    return result;
  }, { deleted: 0, skipped: 0 });

  return { ok: true, ...summary };
}

function upsertPortalParent_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const leadId = normalizeValue_(payload.lead_id);
  const parentName = normalizeValue_(payload.parent_name).slice(0, 180);
  const email = normalizeEmail_(payload.email);
  if (!leadId || !parentName || !email || !email.includes("@")) {
    return { ok: false, code: "PARENT_DETAILS_REQUIRED" };
  }

  const leadSheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  const leadRecord = findSheetRecordById_(leadSheet, CRM_COLUMNS, "lead_id", leadId);
  if (!leadRecord) {
    return { ok: false, code: "PARENT_NOT_FOUND" };
  }

  const duplicate = getSheetRecordsFromSheet_(leadSheet, CRM_COLUMNS)
    .find((record) => normalizeEmail_(record.data.email) === email && normalizeValue_(record.data.lead_id) !== leadId);
  if (duplicate) {
    return { ok: false, code: "PARENT_EMAIL_IN_USE" };
  }

  const previousEmail = normalizeEmail_(leadRecord.data.email);
  const updatedLead = {
    ...leadRecord.data,
    parent_name: parentName,
    email,
    phone: normalizeValue_(payload.phone).slice(0, 80),
    student_level_subject: normalizeValue_(payload.student_level_subject).slice(0, 500),
    main_concern: normalizeValue_(payload.main_concern).slice(0, 1200),
    format: normalizeValue_(payload.format).slice(0, 160),
  };
  writeRecord_(leadSheet, CRM_COLUMNS, leadRecord.rowNumber, updatedLead);
  syncParentReferences_(spreadsheet, leadId, previousEmail, updatedLead);

  return { ok: true, lead_id: leadId, email };
}

function createPortalParent_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const parentName = normalizeValue_(payload.parent_name).slice(0, 180);
  const email = normalizeEmail_(payload.email);
  const createPortalAccess = normalizeValue_(payload.create_portal_access) === "yes";
  const privacyConsent = normalizeValue_(payload.privacy_consent) === "yes";
  if (!parentName || !email || !email.includes("@")) {
    return { ok: false, code: "PARENT_DETAILS_REQUIRED" };
  }
  if (createPortalAccess && !privacyConsent) {
    return { ok: false, code: "PRIVACY_CONSENT_REQUIRED" };
  }

  const leadSheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  setupLeadSheet_(leadSheet);
  const duplicate = getSheetRecordsFromSheet_(leadSheet, CRM_COLUMNS)
    .some((record) => normalizeEmail_(record.data.email) === email);
  if (duplicate) {
    return { ok: false, code: "PARENT_EMAIL_IN_USE" };
  }

  const now = new Date().toISOString();
  const lead = normalizeLeadPayload_({
    lead_id: createLeadId_(),
    received_at: now,
    crm_stage: "new_request",
    lead_status: "callback_needed",
    next_action: "call_parent",
    lead_owner: portalSession.access.display_name || "Equipe",
    source_page: "team-portal",
    site_locale: normalizeValue_(payload.locale).slice(0, 8) || "fr",
    parent_name: parentName,
    phone: normalizeValue_(payload.phone).slice(0, 80),
    email,
    student_level_subject: normalizeValue_(payload.student_level_subject).slice(0, 500),
    main_concern: normalizeValue_(payload.main_concern).slice(0, 1200),
    format: normalizeValue_(payload.format).slice(0, 160),
    contact_preference: "phone",
    recommended_track: "diagnostic_call",
    urgency_score: "needs_clarification",
    message: normalizeValue_(payload.main_concern).slice(0, 2500),
    privacy_consent_at: createPortalAccess ? now : "",
    privacy_consent_version: createPortalAccess ? "operator-recorded-parent-v1" : "",
  });
  leadSheet.appendRow(CRM_COLUMNS.map((column) => normalizeValue_(lead[column])));
  createInitialStudentIfProvided_(spreadsheet, lead, payload);

  if (createPortalAccess) {
    const accessSheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME);
    setupPortalAccessSheet_(accessSheet);
    writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, null, {
      access_id: createRecordId_("ACCESS"),
      role: "parent",
      email,
      display_name: lead.parent_name || email,
      related_id: lead.lead_id,
      status: "active",
      code_hash: "",
      code_expires_at: "",
      session_token_hash: "",
      session_expires_at: "",
      last_login_at: "",
      created_at: now,
      updated_at: now,
    });
  }

  return {
    ok: true,
    lead_id: lead.lead_id,
    email,
    access_status: createPortalAccess ? "active" : "not_created",
  };
}

function updatePortalLeadFollowUp_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const leadId = normalizeValue_(payload.lead_id);
  const leadStatus = normalizeAllowed_(payload.lead_status, LEAD_STATUS_OPTIONS, "");
  const leadSheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  const leadRecord = findSheetRecordById_(leadSheet, CRM_COLUMNS, "lead_id", leadId);
  if (!leadRecord) {
    return { ok: false, code: "PARENT_NOT_FOUND" };
  }
  if (!leadStatus) {
    return { ok: false, code: "LEAD_FOLLOW_UP_STATUS_REQUIRED" };
  }

  const nextActionByStatus = {
    callback_needed: "call_parent",
    waiting_parent: "send_follow_up",
    ready_to_match: "assign_tutor",
    matched: "book_first_session",
    booked: "send_session_summary",
    active: "collect_session_note",
    closed: "close_lead",
  };
  const stageByStatus = {
    callback_needed: "callback_needed",
    waiting_parent: "callback_done",
    ready_to_match: "callback_done",
    matched: "matched",
    booked: "first_session_booked",
    active: "active_follow_up",
    closed: "closed",
  };
  const now = new Date().toISOString();
  const next = {
    ...leadRecord.data,
    lead_status: leadStatus,
    crm_stage: stageByStatus[leadStatus] || leadRecord.data.crm_stage,
    next_action: nextActionByStatus[leadStatus] || leadRecord.data.next_action,
    callback_notes: normalizeValue_(payload.callback_notes).slice(0, 2500),
    last_contacted_at: leadStatus === "callback_needed" ? leadRecord.data.last_contacted_at : now,
  };
  writeRecord_(leadSheet, CRM_COLUMNS, leadRecord.rowNumber, next);

  return { ok: true, lead_id: leadId, lead_status: next.lead_status, next_action: next.next_action };
}

function setPortalParentAccess_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const leadId = normalizeValue_(payload.lead_id);
  const accessStatus = normalizeAllowed_(payload.access_status, PORTAL_ACCESS_STATUS_OPTIONS, "");
  const leadSheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  const leadRecord = findSheetRecordById_(leadSheet, CRM_COLUMNS, "lead_id", leadId);
  if (!leadRecord) {
    return { ok: false, code: "PARENT_NOT_FOUND" };
  }
  if (!accessStatus) {
    return { ok: false, code: "PARENT_ACCESS_STATUS_REQUIRED" };
  }

  const email = normalizeEmail_(leadRecord.data.email);
  const accessSheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME);
  const accessRecords = getSheetRecordsFromSheet_(accessSheet, PORTAL_ACCESS_COLUMNS)
    .filter((record) => normalizeValue_(record.data.role) === "parent" &&
      (normalizeValue_(record.data.related_id) === leadId || normalizeEmail_(record.data.email) === email));
  accessRecords.forEach((record) => {
    writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, record.rowNumber, {
      ...record.data,
      status: accessStatus,
      session_token_hash: accessStatus === "active" ? record.data.session_token_hash : "",
      session_expires_at: accessStatus === "active" ? record.data.session_expires_at : "",
      updated_at: new Date().toISOString(),
    });
  });

  if (!accessRecords.length && accessStatus === "active") {
    const now = new Date().toISOString();
    writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, null, {
      access_id: createRecordId_("ACCESS"),
      role: "parent",
      email,
      display_name: leadRecord.data.parent_name || email,
      related_id: leadId,
      status: "active",
      code_hash: "",
      code_expires_at: "",
      session_token_hash: "",
      session_expires_at: "",
      last_login_at: "",
      created_at: now,
      updated_at: now,
    });
  }

  return { ok: true, lead_id: leadId, access_status: accessStatus, access_records: accessRecords.length || (accessStatus === "active" ? 1 : 0) };
}

function deletePortalParent_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const leadId = normalizeValue_(payload.lead_id);
  const leadSheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  const leadRecord = findSheetRecordById_(leadSheet, CRM_COLUMNS, "lead_id", leadId);
  if (!leadRecord) {
    return { ok: false, code: "PARENT_NOT_FOUND" };
  }

  if (normalizeEmail_(payload.confirmation_email) !== normalizeEmail_(leadRecord.data.email)) {
    return { ok: false, code: "PARENT_DELETE_CONFIRMATION_REQUIRED" };
  }

  return deleteParentLeadCascade_(spreadsheet, leadRecord.data);
}

function deletePortalTutor_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const tutorId = normalizeValue_(payload.tutor_id);
  const tutorSheet = getOrCreateSheet_(spreadsheet, CRM_TUTOR_SHEET_NAME);
  const tutorRecord = findSheetRecordById_(tutorSheet, TUTOR_COLUMNS, "tutor_id", tutorId);
  if (!tutorRecord) {
    return { ok: false, code: "TUTOR_NOT_FOUND" };
  }

  if (normalizeEmail_(payload.confirmation_email) !== normalizeEmail_(tutorRecord.data.calendar_email)) {
    return { ok: false, code: "TUTOR_DELETE_CONFIRMATION_REQUIRED" };
  }

  return deleteTutorCascade_(spreadsheet, tutorRecord.data);
}

function assignPortalTutor_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const leadId = normalizeValue_(payload.lead_id);
  const tutorId = normalizeValue_(payload.tutor_id);
  const leadRecord = findSheetRecordById_(getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME), CRM_COLUMNS, "lead_id", leadId);
  const tutor = findActiveTutorById_(spreadsheet, tutorId);
  if (!leadRecord || !tutor) {
    return { ok: false, code: "ASSIGNMENT_DETAILS_REQUIRED" };
  }

  assignTutorToParentLead_(spreadsheet, leadId, tutor, {
    crm_stage: "matched",
    lead_status: "matched",
    next_action: "book_first_session",
  });
  return { ok: true, lead_id: leadId, tutor_id: tutorId, tutor_name: tutor.tutor_name };
}

function createPortalTutor_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const tutorName = normalizeValue_(payload.tutor_name).slice(0, 180);
  const email = normalizeEmail_(payload.email);
  const subjects = normalizeValue_(payload.subjects).slice(0, 500);
  const levels = normalizeValue_(payload.levels).slice(0, 500);
  const formats = normalizeAllowed_(payload.formats, TUTOR_FORMAT_OPTIONS, "");
  const languages = normalizeAllowed_(payload.languages, TUTOR_LANGUAGE_OPTIONS, "fr");
  const weeklyCapacity = Math.round(Number(payload.weekly_capacity));
  const hourlyRateCad = normalizeTutorHourlyRate_(payload.hourly_rate_cad);

  if (!tutorName || !email || !subjects || !levels || !formats ||
      !Number.isFinite(weeklyCapacity) || weeklyCapacity < 1 || weeklyCapacity > 40) {
    return { ok: false, code: "TUTOR_DETAILS_REQUIRED" };
  }
  if (!hourlyRateCad) {
    return { ok: false, code: "TUTOR_RATE_INVALID" };
  }

  const rosterSheet = getOrCreateSheet_(spreadsheet, CRM_TUTOR_SHEET_NAME);
  setupTutorRosterSheet_(rosterSheet);
  const hasEmail = getSheetRecordsFromSheet_(rosterSheet, TUTOR_COLUMNS)
    .some((record) => normalizeEmail_(record.data.calendar_email) === email);
  if (hasEmail) {
    return { ok: false, code: "TUTOR_EMAIL_IN_USE" };
  }

  const emailReadiness = getPortalEmailReadiness_();
  if (!emailReadiness.ok) {
    return emailReadiness;
  }

  const now = new Date().toISOString();
  const tutor = {
    tutor_id: createRecordId_("TUTOR"),
    tutor_name: tutorName,
    status: "active",
    subjects,
    levels,
    formats,
    zones: normalizeValue_(payload.zones).slice(0, 300) || (formats === "online" ? "online" : "a confirmer"),
    languages,
    weekly_capacity: String(weeklyCapacity),
    active_students: "0",
    new_students_this_week: "0",
    calendar_email: email,
    calendar_id: normalizeValue_(payload.calendar_id).slice(0, 320),
    booking_page_url: "",
    hourly_rate_cad: hourlyRateCad,
    payment_terms: "",
    notes: normalizeValue_(payload.notes).slice(0, 1200),
    last_updated_at: now,
  };
  appendTutorRosterRecord_(rosterSheet, tutor);

  const inviteResult = invitePortalTutor_(spreadsheet, {
    token: payload.token,
    tutor_id: tutor.tutor_id,
  });
  return {
    ...inviteResult,
    tutor_created: true,
    tutor_id: tutor.tutor_id,
    tutor_name: tutor.tutor_name,
  };
}

function updatePortalTutorCalendar_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const tutorId = normalizeValue_(payload.tutor_id);
  const rosterSheet = getOrCreateSheet_(spreadsheet, CRM_TUTOR_SHEET_NAME);
  const tutorRecord = findSheetRecordById_(rosterSheet, TUTOR_COLUMNS, "tutor_id", tutorId);
  if (!tutorRecord) {
    return { ok: false, code: "TUTOR_NOT_FOUND" };
  }

  const next = {
    ...tutorRecord.data,
    calendar_id: normalizeValue_(payload.calendar_id).slice(0, 320),
    last_updated_at: new Date().toISOString(),
  };
  writeRecord_(rosterSheet, TUTOR_COLUMNS, tutorRecord.rowNumber, next);
  return { ok: true, tutor_id: tutorId, calendar_id: next.calendar_id };
}

function invitePortalTutor_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const tutor = findActiveTutorById_(spreadsheet, payload.tutor_id);
  if (!tutor || !normalizeEmail_(tutor.calendar_email)) {
    return { ok: false, code: "TUTOR_INVITE_DETAILS_REQUIRED" };
  }

  const now = new Date().toISOString();
  const accessSheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME);
  const existing = findPortalAccess_(accessSheet, "tutor", tutor.calendar_email);
  writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, existing ? existing.rowNumber : null, {
    access_id: existing ? existing.data.access_id : createRecordId_("ACCESS"),
    role: "tutor",
    email: normalizeEmail_(tutor.calendar_email),
    display_name: tutor.tutor_name || tutor.calendar_email,
    related_id: tutor.tutor_id,
    status: "active",
    code_hash: "",
    code_expires_at: "",
    session_token_hash: "",
    session_expires_at: "",
    last_login_at: existing ? existing.data.last_login_at : "",
    created_at: existing ? existing.data.created_at : now,
    updated_at: now,
  });

  const inviteResult = issuePortalCode_(spreadsheet, {
    role: "tutor",
    email: normalizeEmail_(tutor.calendar_email),
    display_name: tutor.tutor_name || tutor.calendar_email,
    related_id: tutor.tutor_id,
  });
  return {
    ...inviteResult,
    tutor_id: tutor.tutor_id,
    tutor_name: tutor.tutor_name,
  };
}

function sendPortalSessionMessage_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token);
  if (!portalSession.ok) {
    return portalSession;
  }
  if (!["parent", "tutor"].includes(portalSession.access.role)) {
    return { ok: false, code: "SESSION_MESSAGE_NOT_ALLOWED" };
  }

  const sessionId = normalizeValue_(payload.session_id);
  const message = normalizeValue_(payload.message).slice(0, 2500);
  const sessionRecord = findSessionForPortalAccess_(spreadsheet, portalSession.access, sessionId);
  if (!sessionRecord) {
    return { ok: false, code: "SESSION_NOT_FOUND" };
  }
  if (!message) {
    return { ok: false, code: "SESSION_MESSAGE_REQUIRED" };
  }

  const sessionData = sessionRecord.data;
  const now = new Date();
  const recipientRole = portalSession.access.role === "parent" ? "tutor" : "parent";
  const sheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_MESSAGE_SHEET_NAME);
  setupPortalMessagesSheet_(sheet);
  getSheetRecordsFromSheet_(sheet, PORTAL_MESSAGE_COLUMNS)
    .filter((entry) => normalizeValue_(entry.data.session_id) === sessionId)
    .filter((entry) => normalizeValue_(entry.data.sender_role) === recipientRole)
    .filter((entry) => ["awaiting_reply", "overdue_alerted"].includes(normalizeValue_(entry.data.message_status)))
    .forEach((entry) => writeRecord_(sheet, PORTAL_MESSAGE_COLUMNS, entry.rowNumber, {
      ...entry.data,
      message_status: "answered",
      answered_at: now.toISOString(),
    }));

  const record = {
    message_id: createRecordId_("MESSAGE"),
    session_id: sessionId,
    lead_id: sessionData.lead_id,
    sender_role: portalSession.access.role,
    sender_name: portalSession.access.display_name || (portalSession.access.role === "parent" ? sessionData.parent_name : sessionData.tutor_name),
    parent_email: sessionData.parent_email,
    tutor_id: sessionData.tutor_id,
    tutor_email: sessionData.tutor_calendar_email,
    message,
    delivery_status: "portal_only",
    created_at: now.toISOString(),
    recipient_role: recipientRole,
    message_status: "awaiting_reply",
    reply_due_at: new Date(now.getTime() + PORTAL_MESSAGE_REPLY_HOURS * 60 * 60 * 1000).toISOString(),
    answered_at: "",
  };

  const deliveryStatus = notifyPortalMessageRecipient_(record);
  record.delivery_status = deliveryStatus;
  sheet.appendRow(PORTAL_MESSAGE_COLUMNS.map((column) => record[column] || ""));

  return { ok: true, message_id: record.message_id, delivery_status: deliveryStatus };
}

function respondToPortalSession_(spreadsheet, payload) {
  const session = verifyPortalSession_(spreadsheet, payload.token, payload.role);
  if (!session.ok || !["parent", "tutor"].includes(session.access.role)) {
    return session.ok ? { ok: false, code: "SESSION_RESPONSE_NOT_ALLOWED" } : session;
  }

  const sessionId = normalizeValue_(payload.session_id);
  const response = normalizeValue_(payload.response);
  const sessionRecord = findSessionForPortalAccess_(spreadsheet, session.access, sessionId);
  if (!sessionRecord) {
    return { ok: false, code: "SESSION_NOT_FOUND" };
  }

  const status = normalizeValue_(sessionRecord.data.session_status);
  if (!["requested", "proposed", "confirmed"].includes(status)) {
    return { ok: false, code: "SESSION_NOT_ACTIONABLE" };
  }

  const now = new Date().toISOString();
  const next = { ...sessionRecord.data, updated_at: now };

  if (response === "confirm") {
    if (session.access.role === "parent") {
      next.parent_confirmed_at = now;
    } else {
      next.tutor_confirmed_at = now;
    }

    next.session_status = next.parent_confirmed_at && next.tutor_confirmed_at ? "confirmed" : "proposed";
  } else if (["request_change", "decline"].includes(response)) {
    next.session_status = "requested";
    next.parent_confirmed_at = "";
    next.tutor_confirmed_at = "";
    appendPortalRequestRecord_(spreadsheet, {
      role: session.access.role,
      email: session.access.email,
      related_id: session.access.related_id,
      request_type: "schedule_change",
      subject: `Seance ${response === "decline" ? "refusee" : "a ajuster"}`,
      message: normalizeValue_(payload.message).slice(0, 2500) || `Seance ${sessionId}: ${response}.`,
    });
  } else {
    return { ok: false, code: "SESSION_RESPONSE_REQUIRED" };
  }

  const sheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  writeRecord_(sheet, SESSION_COLUMNS, sessionRecord.rowNumber, next);

  if (next.session_status === "confirmed") {
    finalizeConfirmedPortalSession_(spreadsheet);
  }

  return { ok: true, session_id: sessionId, session_status: next.session_status };
}

function reschedulePortalSession_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const sessionId = normalizeValue_(payload.session_id);
  const startAt = coerceDate_(payload.start_at);
  const durationMinutes = Math.max(30, Math.min(240, Number(payload.duration_minutes) || 60));
  const sessionSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  const sessionRecord = findSheetRecordById_(sessionSheet, SESSION_COLUMNS, "session_id", sessionId);
  const currentStatus = normalizeValue_(sessionRecord?.data.session_status);
  if (!sessionRecord || !startAt || startAt.getTime() <= Date.now() ||
      ["completed", "cancelled", "no_show"].includes(currentStatus)) {
    return { ok: false, code: "SESSION_RESCHEDULE_NOT_AVAILABLE" };
  }

  const endAt = new Date(startAt.getTime() + durationMinutes * 60 * 1000);
  const schedulingLock = LockService.getScriptLock();
  if (!schedulingLock.tryLock(5000)) {
    return { ok: false, code: "SESSION_TIME_CONFLICT" };
  }

  let next;
  try {
    if (hasTutorSessionConflict_(spreadsheet, sessionRecord.data.tutor_id, startAt, endAt, sessionId)) {
      return { ok: false, code: "SESSION_TIME_CONFLICT" };
    }

    const calendarDeletion = cancelCalendarEventForSession_(sessionRecord.data);
    if (!calendarDeletion.ok) {
      appendCalendarDeletionFailureRequest_(spreadsheet, sessionRecord.data, "replanification", calendarDeletion.code);
      return { ok: false, code: "SESSION_CALENDAR_DELETE_FAILED" };
    }
    next = {
      ...sessionRecord.data,
      start_at: startAt.toISOString(),
      end_at: endAt.toISOString(),
      session_status: "proposed",
      parent_confirmed_at: "",
      tutor_confirmed_at: "",
      google_calendar_event_id: "",
      calendar_invites_sent_at: "",
      modification_deadline_at: normalizeValue_(sessionRecord.data.plan_enrollment_id)
        ? planModificationDeadlineForSession_(startAt, sessionRecord.data.cancellation_notice_hours)
        : "",
      updated_at: new Date().toISOString(),
      notes: [normalizeValue_(sessionRecord.data.notes), "New time proposed by the team."].filter(Boolean).join(" | "),
    };
    writeRecord_(sessionSheet, SESSION_COLUMNS, sessionRecord.rowNumber, next);
    appendPortalRequestRecord_(spreadsheet, {
      role: "operator",
      email: portalSession.access.email,
      related_id: portalSession.access.related_id,
      request_type: "schedule_change",
      subject: "Nouveau creneau propose",
      message: `Session ${sessionId}: ${formatDateForEmail_(next.start_at)}.`,
    });
  } finally {
    schedulingLock.releaseLock();
  }

  sendSessionProposalEmails_(next);
  return { ok: true, session_id: sessionId, session_status: next.session_status };
}

function cancelPortalSession_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, payload.role);
  if (!portalSession.ok || !["parent", "tutor", "operator"].includes(portalSession.access.role)) {
    return portalSession.ok ? { ok: false, code: "SESSION_CANCELLATION_NOT_ALLOWED" } : portalSession;
  }

  const sessionId = normalizeValue_(payload.session_id);
  const sessionRecord = portalSession.access.role === "operator"
    ? findSheetRecordById_(getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME), SESSION_COLUMNS, "session_id", sessionId)
    : findSessionForPortalAccess_(spreadsheet, portalSession.access, sessionId);
  if (!sessionRecord) {
    return { ok: false, code: "SESSION_NOT_FOUND" };
  }

  const sessionData = sessionRecord.data;
  const startAt = coerceDate_(sessionData.start_at);
  const status = normalizeValue_(sessionData.session_status);
  if (!startAt || startAt.getTime() <= Date.now() || ["completed", "cancelled", "no_show"].includes(status)) {
    return { ok: false, code: "SESSION_CANCELLATION_NOT_AVAILABLE" };
  }

  const reason = normalizeValue_(payload.reason).slice(0, 1200) || "Cancellation requested in portal.";
  const noticeMillis = startAt.getTime() - Date.now();
  const noticeHours = normalizePlanNoticeHours_(sessionData.cancellation_notice_hours || SESSION_CANCELLATION_NOTICE_HOURS);
  const hasRequiredNotice = portalSession.access.role === "operator" ||
    noticeMillis >= noticeHours * 60 * 60 * 1000;
  appendPortalRequestRecord_(spreadsheet, {
    role: portalSession.access.role,
    email: portalSession.access.email,
    related_id: portalSession.access.related_id,
    request_type: "schedule_change",
    subject: hasRequiredNotice ? "Seance annulee dans le delai" : "Annulation hors delai a revoir",
    message: `Session ${sessionId}: ${reason}`,
  });

  if (!hasRequiredNotice) {
    return { ok: true, session_id: sessionId, cancellation_status: "review_required" };
  }

  const calendarDeletion = cancelCalendarEventForSession_(sessionData);
  if (!calendarDeletion.ok) {
    appendCalendarDeletionFailureRequest_(spreadsheet, sessionData, "annulation", calendarDeletion.code);
    return { ok: false, code: "SESSION_CALENDAR_DELETE_FAILED" };
  }

  const next = {
    ...sessionData,
    session_status: "cancelled",
    payment_status: normalizeValue_(sessionData.payment_status) === "paid" ? "paid" : "waived",
    updated_at: new Date().toISOString(),
  };
  writeRecord_(getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME), SESSION_COLUMNS, sessionRecord.rowNumber, next);
  voidUnpaidSessionPayments_(spreadsheet, sessionId, reason);
  releasePlanCreditReservationForSession_(spreadsheet, sessionData, reason);
  return {
    ok: true,
    session_id: sessionId,
    cancellation_status: "cancelled",
    paid_payment_review_required: normalizeValue_(sessionData.payment_status) === "paid",
  };
}

function upsertPortalTutorAvailability_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "tutor");
  if (!portalSession.ok) {
    return portalSession;
  }

  const tutorId = normalizeValue_(portalSession.access.related_id);
  const weekday = normalizeAllowed_(payload.weekday, WEEKDAY_OPTIONS, "");
  const startTime = normalizeAvailabilityTime_(payload.start_time);
  const endTime = normalizeAvailabilityTime_(payload.end_time);
  const availabilityId = normalizeValue_(payload.availability_id);
  const status = normalizeAllowed_(payload.status, ["open", "limited", "full", "paused"], "open");
  if (!tutorId || !weekday || !startTime || !endTime || startTime >= endTime) {
    return { ok: false, code: "TUTOR_AVAILABILITY_DETAILS_REQUIRED" };
  }

  const roster = findActiveTutorById_(spreadsheet, tutorId);
  if (!roster) {
    return { ok: false, code: "TUTOR_NOT_ACTIVE" };
  }

  const sheet = getOrCreateSheet_(spreadsheet, CRM_TUTOR_AVAILABILITY_SHEET_NAME);
  setupTutorAvailabilitySheet_(sheet);
  const existing = availabilityId
    ? findSheetRecordById_(sheet, AVAILABILITY_COLUMNS, "availability_id", availabilityId)
    : null;
  if (availabilityId && (!existing || normalizeValue_(existing.data.tutor_id) !== tutorId)) {
    return { ok: false, code: "TUTOR_AVAILABILITY_NOT_FOUND" };
  }

  // Sheets stores values such as "16:00" as time serials. Display values retain
  // the intended local hour and are therefore the source of truth for overlaps.
  const availabilityRecords = getSheetDisplayRecords_(spreadsheet, CRM_TUTOR_AVAILABILITY_SHEET_NAME, AVAILABILITY_COLUMNS);
  const hasDuplicate = availabilityRecords
    .some((record) => normalizeValue_(record.data.availability_id) !== availabilityId &&
      normalizeValue_(record.data.tutor_id) === tutorId &&
      normalizeValue_(record.data.weekday) === weekday &&
      normalizeAvailabilityTime_(record.data.start_time) === startTime &&
      normalizeAvailabilityTime_(record.data.end_time) === endTime);
  if (hasDuplicate) {
    return { ok: false, code: "TUTOR_AVAILABILITY_DUPLICATE" };
  }

  const hasOverlap = status !== "paused" && availabilityRecords
    .some((record) => normalizeValue_(record.data.availability_id) !== availabilityId &&
      normalizeValue_(record.data.tutor_id) === tutorId &&
      normalizeValue_(record.data.weekday) === weekday &&
      normalizeValue_(record.data.status) !== "paused" &&
      availabilityTimesOverlap_(startTime, endTime,
        normalizeAvailabilityTime_(record.data.start_time), normalizeAvailabilityTime_(record.data.end_time)));
  if (hasOverlap) {
    return { ok: false, code: "TUTOR_AVAILABILITY_OVERLAP" };
  }

  const record = {
    availability_id: existing ? existing.data.availability_id : createRecordId_("AVAILABILITY"),
    tutor_id: tutorId,
    tutor_name: roster.tutor_name || portalSession.access.display_name,
    weekday,
    start_time: startTime,
    end_time: endTime,
    timezone: normalizeValue_(existing?.data.timezone) || "America/Toronto",
    format: normalizeAllowed_(payload.format, TUTOR_FORMAT_OPTIONS,
      normalizeAllowed_(existing?.data.format, TUTOR_FORMAT_OPTIONS, "online")),
    location: normalizeValue_(payload.location).slice(0, 400),
    calendar_id: normalizeValue_(roster.calendar_id),
    booking_page_url: normalizeValue_(roster.booking_page_url),
    status,
    notes: normalizeValue_(payload.notes).slice(0, 800),
    last_updated_at: new Date().toISOString(),
  };
  writeRecord_(sheet, AVAILABILITY_COLUMNS, existing ? existing.rowNumber : null, record);

  return { ok: true, availability_id: record.availability_id, status: record.status };
}

function voidUnpaidSessionPayments_(spreadsheet, sessionId, reason) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
  getSheetRecordsFromSheet_(sheet, PAYMENT_COLUMNS)
    .filter((record) => normalizeValue_(record.data.session_id) === sessionId)
    .filter((record) => !["paid", "refunded", "waived"].includes(normalizeValue_(record.data.payment_status)))
    .filter((record) => normalizeValue_(record.data.payout_status) !== "held")
    .forEach((record) => writeRecord_(sheet, PAYMENT_COLUMNS, record.rowNumber, {
      ...record.data,
      payment_status: "waived",
      checkout_url: "",
      checkout_expires_at: "",
      due_date: "",
      notes: [normalizeValue_(record.data.notes), `Session cancelled: ${reason}`].filter(Boolean).join(" | "),
      updated_at: new Date().toISOString(),
    }));
}

function isSessionPaymentEligible_(session) {
  const status = normalizeValue_(session && session.session_status);
  const conferenceStatus = normalizeValue_(session && session.calendar_conference_status);
  return ["confirmed", "calendar_created", "completed"].includes(status) &&
    !["failed", "failed_cleanup_pending", "failed_payment_cleanup_pending"].includes(conferenceStatus);
}

function expireSessionCheckoutBeforeMeetCancellation_(spreadsheet, session) {
  const sessionId = normalizeValue_(session && session.session_id);
  if (!sessionId) return { ok: true, skipped: true, has_paid_checkout: false };

  const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
  const activeCheckouts = getSheetRecordsFromSheet_(paymentSheet, PAYMENT_COLUMNS)
    .filter((record) => normalizeValue_(record.data.session_id) === sessionId)
    .filter((record) => normalizeValue_(record.data.stripe_checkout_session_id));

  let hasPaidCheckout = false;
  let requiresReconciliation = false;
  for (const paymentRecord of activeCheckouts) {
    const paymentStatus = normalizeValue_(paymentRecord.data.payment_status);
    if (normalizeValue_(paymentRecord.data.payout_status) === "held") {
      hasPaidCheckout = hasPaidCheckout || paymentStatus === "paid";
      requiresReconciliation = requiresReconciliation || paymentStatus === "paid";
      continue;
    }
    if (["refunded", "waived"].includes(paymentStatus)) {
      continue;
    }
    if (paymentStatus === "paid") {
      const held = holdCompletedCheckoutForMeetFailure_(
        spreadsheet,
        paymentSheet,
        paymentRecord,
        session,
        { payment_status: "paid" },
      );
      hasPaidCheckout = hasPaidCheckout || held.paid;
      requiresReconciliation = true;
      continue;
    }
    const expiry = expirePersistedCheckoutSession_(paymentRecord.data);
    if (expiry.checkout_completed) {
      const held = holdCompletedCheckoutForMeetFailure_(spreadsheet, paymentSheet, paymentRecord, session, expiry);
      hasPaidCheckout = hasPaidCheckout || held.paid;
      requiresReconciliation = true;
      continue;
    }
    if (!expiry.ok) {
      return {
        ok: false,
        code: normalizeValue_(expiry.code) || "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED",
        payment_id: paymentRecord.data.payment_id,
      };
    }
  }

  return { ok: true, has_paid_checkout: hasPaidCheckout, requires_reconciliation: requiresReconciliation };
}

function expirePersistedCheckoutSession_(payment) {
  const checkoutSessionId = normalizeValue_(payment && payment.stripe_checkout_session_id);
  if (!checkoutSessionId) return { ok: true, skipped: true };

  const properties = PropertiesService.getScriptProperties();
  const paymentSessionSecret = normalizeValue_(properties.getProperty(PAYMENT_SESSION_SECRET_PROPERTY));
  const expiryEndpoint = normalizeValue_(properties.getProperty(PAYMENT_CHECKOUT_EXPIRE_ENDPOINT_PROPERTY)) ||
    "https://methode-secondaire.vercel.app/api/expire-checkout-session";
  if (!paymentSessionSecret || !/^https:\/\//i.test(expiryEndpoint)) {
    return { ok: false, code: "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED" };
  }

  let response;
  try {
    response = UrlFetchApp.fetch(expiryEndpoint, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        payment_session_secret: paymentSessionSecret,
        checkout_session_id: checkoutSessionId,
      }),
      muteHttpExceptions: true,
    });
  } catch (error) {
    return { ok: false, code: "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED" };
  }

  let outcome = {};
  try {
    outcome = JSON.parse(response.getContentText());
  } catch (error) {
    return { ok: false, code: "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED" };
  }

  if (response.getResponseCode() >= 200 && response.getResponseCode() < 300 && outcome.ok &&
      normalizeValue_(outcome.checkout_session_id) === checkoutSessionId &&
      normalizeValue_(outcome.status) === "expired") {
    return { ok: true, expired: true, already_expired: Boolean(outcome.already_expired) };
  }
  if (normalizeValue_(outcome.code) === "STRIPE_CHECKOUT_ALREADY_COMPLETED" &&
      normalizeValue_(outcome.checkout_session_id) === checkoutSessionId) {
    return {
      ok: false,
      checkout_completed: true,
      code: "STRIPE_CHECKOUT_ALREADY_COMPLETED",
      payment_status: normalizeValue_(outcome.payment_status),
    };
  }
  return { ok: false, code: "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED" };
}

function holdCompletedCheckoutForMeetFailure_(spreadsheet, paymentSheet, paymentRecord, session, outcome) {
  const payment = paymentRecord.data;
  const confirmedPaid = normalizeValue_(outcome && outcome.payment_status) === "paid";
  const reconciliationNote = "Stripe Checkout termine apres l'echec Google Meet; reconciliation equipe requise avant tout remboursement ou ajustement.";
  const hasReconciliationNote = normalizeValue_(payment.notes).includes(reconciliationNote);
  const nextPayment = {
    ...payment,
    payment_status: confirmedPaid ? "paid" : "overdue",
    payout_status: "held",
    checkout_url: "",
    checkout_expires_at: "",
    due_date: "",
    notes: hasReconciliationNote
      ? normalizeValue_(payment.notes)
      : [normalizeValue_(payment.notes), reconciliationNote].filter(Boolean).join(" | "),
    updated_at: new Date().toISOString(),
  };
  writeRecord_(paymentSheet, PAYMENT_COLUMNS, paymentRecord.rowNumber, nextPayment);
  if (!hasReconciliationNote) {
    appendPortalRequestRecord_(spreadsheet, {
      role: "operator",
      email: normalizeEmail_(payment.email),
      related_id: normalizeValue_(payment.payment_id),
      request_type: "payment_question",
      subject: "Reconciliation requise: paiement apres echec Google Meet",
      message: `${reconciliationNote} Paiement ${normalizeValue_(payment.payment_id)}, seance ${normalizeValue_(session && session.session_id)}.`,
    });
  }
  return { ok: true, paid: confirmedPaid };
}

function cancelCalendarEventForSession_(session) {
  return deleteCalendarEventForSession_(session);
}

function deleteCalendarEventForExpiredSession_(session) {
  return deleteCalendarEventForSession_(session);
}

function deleteCalendarEventForSession_(session) {
  const eventId = normalizeValue_(session && session.google_calendar_event_id);
  if (!eventId) {
    return { ok: true, already_deleted: true };
  }

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (isAdvancedCalendarEvent_(session)) {
    return deleteAdvancedCalendarEvent_(spreadsheet, session, eventId);
  }

  return deleteLegacyCalendarEvent_(spreadsheet, session, eventId);
}

function isAdvancedCalendarEvent_(session) {
  return ["pending", "ready", "failed", "failed_cleanup_pending", "failed_payment_cleanup_pending"]
    .includes(normalizeValue_(session && session.calendar_conference_status));
}

function deleteAdvancedCalendarEvent_(spreadsheet, session, eventId) {
  const calendarId = resolveTutorCalendarId_(spreadsheet, session || {});
  if (!calendarId) {
    return { ok: false, code: "CALENDAR_UNAVAILABLE" };
  }

  try {
    Calendar.Events.remove(calendarId, eventId, {
      sendUpdates: normalizeValue_(session && session.calendar_conference_status) === "ready" ? "all" : "none",
    });
    return { ok: true, deleted: true };
  } catch (error) {
    if (isCalendarNotFoundError_(error)) {
      return { ok: true, already_deleted: true };
    }
    return { ok: false, code: "CALENDAR_DELETE_FAILED" };
  }
}

function deleteLegacyCalendarEvent_(spreadsheet, session, eventId) {
  try {
    const calendar = resolveCalendarForTutor_(spreadsheet, session && session.tutor_id);
    if (!calendar) {
      return { ok: false, code: "CALENDAR_UNAVAILABLE" };
    }
    const event = calendar.getEventById(eventId);
    if (!event) {
      return { ok: false, code: "CALENDAR_EVENT_NOT_FOUND" };
    }
    event.deleteEvent();
    return { ok: true, deleted: true };
  } catch (error) {
    return { ok: false, code: "CALENDAR_DELETE_FAILED" };
  }
}

function isCalendarNotFoundError_(error) {
  const errorCode = Number(error && (error.code || error.status || error.responseCode));
  return errorCode === 404;
}

function appendCalendarDeletionFailureRequest_(spreadsheet, session, action, code) {
  appendPortalRequestRecord_(spreadsheet, {
    role: "operator",
    email: "",
    related_id: normalizeValue_(session && session.session_id),
    request_type: "technical_help",
    subject: `Calendar a verifier - ${normalizeValue_(session && session.tutor_name) || "tuteur"}`,
    message: `La ${action} de la seance ${normalizeValue_(session && session.session_id)} est bloquee: suppression Calendar ${normalizeValue_(code) || "impossible"}. Nouvelle tentative requise avant de modifier le CRM.`,
  });
}

function markPortalPaymentPaidFromWebhook_(spreadsheet, payload) {
  const expectedSecret = PropertiesService.getScriptProperties().getProperty(PAYMENT_WEBHOOK_SECRET_PROPERTY);
  if (!expectedSecret || normalizeValue_(payload.webhook_secret) !== expectedSecret) {
    return { ok: false, code: "PAYMENT_WEBHOOK_UNAUTHORIZED" };
  }

  const paymentId = normalizeValue_(payload.payment_id);
  const stripeSessionId = normalizeValue_(payload.stripe_session_id);
  const amountCad = Number(payload.amount_cad);
  const currency = normalizeValue_(payload.currency).toLowerCase();
  if (currency && currency !== "cad") {
    return { ok: false, code: "PAYMENT_WEBHOOK_CURRENCY_MISMATCH" };
  }

  const paymentLock = LockService.getScriptLock();
  if (!paymentLock.tryLock(5000)) {
    return { ok: false, code: "PAYMENT_WEBHOOK_BUSY" };
  }

  try {
    const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
    setupPaymentSheet_(paymentSheet);
    const paymentRecord = findSheetRecordById_(paymentSheet, PAYMENT_COLUMNS, "payment_id", paymentId);
    if (!paymentRecord || !stripeSessionId) {
      return { ok: false, code: "PAYMENT_WEBHOOK_PAYMENT_NOT_FOUND" };
    }

    const expectedAmount = Number(paymentRecord.data.amount_cad);
    if (!Number.isFinite(amountCad) || amountCad <= 0 ||
        (Number.isFinite(expectedAmount) && Math.abs(expectedAmount - amountCad) > 0.01)) {
      return { ok: false, code: "PAYMENT_WEBHOOK_AMOUNT_MISMATCH" };
    }

    const storedStripeSessionId = normalizeValue_(paymentRecord.data.stripe_checkout_session_id);
    if (storedStripeSessionId && storedStripeSessionId !== stripeSessionId) {
      const reconciliationNote = "Webhook Stripe refuse: la session Checkout recue ne correspond pas a la session enregistree.";
      appendPortalRequestRecord_(spreadsheet, {
        role: "operator",
        email: normalizeEmail_(paymentRecord.data.email),
        related_id: paymentId,
        request_type: "payment_question",
        subject: "Reconciliation requise: session Stripe inattendue",
        message: `${reconciliationNote} Paiement ${paymentId}, seance ${normalizeValue_(paymentRecord.data.session_id)}, session enregistree ${storedStripeSessionId}, session recue ${stripeSessionId}.`,
      });
      return { ok: false, code: "PAYMENT_WEBHOOK_SESSION_MISMATCH" };
    }

    const alreadyPaid = normalizeValue_(paymentRecord.data.payment_status) === "paid";
    if (alreadyPaid) {
      return {
        ok: true,
        payment_id: paymentId,
        session_id: paymentRecord.data.session_id,
        already_paid: true,
        receipt_sent: false,
        credit_grant: { granted: false, skipped: true },
      };
    }
    const paidAt = coerceDate_(payload.paid_at) || new Date();
    const updatedPayment = {
      ...paymentRecord.data,
      payment_method: "stripe_payment_link",
      payment_status: "paid",
      invoice_id: stripeSessionId,
      stripe_checkout_session_id: stripeSessionId,
      paid_at: paidAt.toISOString(),
      notes: [normalizeValue_(paymentRecord.data.notes), `Stripe Checkout ${stripeSessionId}`].filter(Boolean).join(" | "),
      updated_at: new Date().toISOString(),
    };
    const sessionSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
    const sessionRecord = findSheetRecordById_(sessionSheet, SESSION_COLUMNS, "session_id", paymentRecord.data.session_id);
    if (normalizeValue_(updatedPayment.session_id) && (!sessionRecord || !isSessionPaymentEligible_(sessionRecord.data))) {
      const reconciliationNote = "Paiement Stripe recu apres une seance annulee ou indisponible; reconciliation equipe requise.";
      const paymentForReconciliation = {
        ...updatedPayment,
        payout_status: "held",
        checkout_url: "",
        checkout_expires_at: "",
        due_date: "",
        notes: [normalizeValue_(updatedPayment.notes), reconciliationNote].filter(Boolean).join(" | "),
        updated_at: new Date().toISOString(),
      };
      writeRecord_(paymentSheet, PAYMENT_COLUMNS, paymentRecord.rowNumber, paymentForReconciliation);
      appendPortalRequestRecord_(spreadsheet, {
        role: "operator",
        email: normalizeEmail_(updatedPayment.email),
        related_id: paymentId,
        request_type: "payment_question",
        subject: "Reconciliation requise: paiement apres seance indisponible",
        message: `${reconciliationNote} Paiement ${paymentId}, seance ${normalizeValue_(updatedPayment.session_id)}.`,
      });
      return {
        ok: true,
        payment_id: paymentId,
        session_id: updatedPayment.session_id,
        requires_reconciliation: true,
        receipt_sent: false,
        credit_grant: { granted: false, reconciliation_required: true },
      };
    }
    writeRecord_(paymentSheet, PAYMENT_COLUMNS, paymentRecord.rowNumber, updatedPayment);

    if (normalizeValue_(updatedPayment.plan_enrollment_id)) {
      const linkedEnrollment = findSheetRecordById_(
        getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME),
        PLAN_ENROLLMENT_COLUMNS,
        "enrollment_id",
        updatedPayment.plan_enrollment_id,
      );
      if (linkedEnrollment && ["cancelled", "completed", "expired"].includes(normalizeValue_(linkedEnrollment.data.status))) {
        const reconciliationNote = "Paiement Stripe recu apres une inscription de forfait non admissible; reconciliation equipe requise.";
        const paymentForReconciliation = {
          ...updatedPayment,
          payout_status: "held",
          notes: [normalizeValue_(updatedPayment.notes), reconciliationNote].filter(Boolean).join(" | "),
          updated_at: new Date().toISOString(),
        };
        writeRecord_(paymentSheet, PAYMENT_COLUMNS, paymentRecord.rowNumber, paymentForReconciliation);
        appendPortalRequestRecord_(spreadsheet, {
          role: "operator",
          email: normalizeEmail_(updatedPayment.email),
          related_id: paymentId,
          request_type: "payment_question",
          subject: "Reconciliation requise: paiement de forfait",
          message: `${reconciliationNote} Paiement ${paymentId}, inscription ${linkedEnrollment.data.enrollment_id}.`,
        });
        return {
          ok: true,
          payment_id: paymentId,
          session_id: "",
          requires_reconciliation: true,
          receipt_sent: false,
          credit_grant: { granted: false, reconciliation_required: true },
        };
      }
    }

    const creditGrant = grantCreditsForPaidPlanPayment_(spreadsheet, updatedPayment);
    if (creditGrant.code || (normalizeValue_(updatedPayment.plan_enrollment_id) && creditGrant.skipped)) {
      return {
        ok: false,
        code: creditGrant.code || "PLAN_PAYMENT_CREDIT_GRANT_INVALID",
        payment_id: paymentId,
      };
    }
    if (creditGrant.granted || creditGrant.already_granted) {
      const enrollmentSheet = getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME);
      const enrollment = findSheetRecordById_(
        enrollmentSheet,
        PLAN_ENROLLMENT_COLUMNS,
        "enrollment_id",
        updatedPayment.plan_enrollment_id,
      );
      if (enrollment) {
        writeRecord_(enrollmentSheet, PLAN_ENROLLMENT_COLUMNS, enrollment.rowNumber, {
          ...enrollment.data,
          status: "active",
          billing_status: "credited",
          updated_at: new Date().toISOString(),
        });
      }
    }

    if (sessionRecord) {
      writeRecord_(sessionSheet, SESSION_COLUMNS, sessionRecord.rowNumber, {
        ...sessionRecord.data,
        payment_status: "paid",
        updated_at: new Date().toISOString(),
      });
    }

    const receiptSent = alreadyPaid ? false : sendPaymentReceiptEmail_(updatedPayment, sessionRecord ? sessionRecord.data : null);
    return {
      ok: true,
      payment_id: paymentId,
      session_id: paymentRecord.data.session_id,
      already_paid: alreadyPaid,
      receipt_sent: receiptSent,
      credit_grant: creditGrant,
    };
  } finally {
    paymentLock.releaseLock();
  }
}

function markPortalPaymentExpiredFromWebhook_(spreadsheet, payload) {
  const expectedSecret = PropertiesService.getScriptProperties().getProperty(PAYMENT_WEBHOOK_SECRET_PROPERTY);
  if (!expectedSecret || !constantTimeStringEquals_(payload.webhook_secret, expectedSecret)) {
    return { ok: false, code: "PAYMENT_WEBHOOK_UNAUTHORIZED" };
  }

  const paymentId = normalizeValue_(payload.payment_id);
  const stripeSessionId = normalizeValue_(payload.stripe_session_id);
  if (!paymentId || !stripeSessionId) {
    return { ok: false, code: "PAYMENT_WEBHOOK_PAYMENT_NOT_FOUND" };
  }

  const paymentLock = LockService.getScriptLock();
  if (!paymentLock.tryLock(5000)) {
    return { ok: false, code: "PAYMENT_WEBHOOK_BUSY" };
  }

  let paymentToExpire = null;
  let alreadyExpired = false;
  try {
    const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
    setupPaymentSheet_(paymentSheet);
    const paymentRecord = findSheetRecordById_(paymentSheet, PAYMENT_COLUMNS, "payment_id", paymentId);
    if (!paymentRecord) {
      return { ok: false, code: "PAYMENT_WEBHOOK_PAYMENT_NOT_FOUND" };
    }

    const storedStripeSessionId = normalizeValue_(paymentRecord.data.stripe_checkout_session_id);
    if (storedStripeSessionId && storedStripeSessionId !== stripeSessionId) {
      return { ok: false, code: "PAYMENT_WEBHOOK_SESSION_MISMATCH" };
    }

    if (normalizeValue_(paymentRecord.data.payment_status) === "paid") {
      return { ok: true, already_paid: true };
    }

    const paymentStatus = normalizeValue_(paymentRecord.data.payment_status);
    if (paymentStatus === "waived" && storedStripeSessionId === stripeSessionId) {
      return { ok: true, payment_id: paymentId, already_expired: true, already_waived: true };
    }
    if (!["payment_requested", "overdue"].includes(paymentStatus)) {
      return { ok: false, code: "PAYMENT_WEBHOOK_PAYMENT_NOT_ACTIONABLE" };
    }

    const expiredAt = coerceDate_(payload.expired_at) || new Date();
    alreadyExpired = paymentStatus === "overdue";
    paymentToExpire = {
      ...paymentRecord.data,
      payment_status: "overdue",
      stripe_checkout_session_id: storedStripeSessionId || stripeSessionId,
      checkout_expires_at: expiredAt.toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (!alreadyExpired) {
      writeRecord_(paymentSheet, PAYMENT_COLUMNS, paymentRecord.rowNumber, paymentToExpire);
    }
  } finally {
    paymentLock.releaseLock();
  }

  if (!alreadyExpired && normalizeValue_(paymentToExpire.session_id)) {
    expireLinkedSessionForPaymentIfAvailable_(spreadsheet, paymentToExpire, "stripe_checkout_expired");
  }
  return { ok: true, payment_id: paymentId, already_expired: alreadyExpired };
}

function expireLinkedSessionForPaymentIfAvailable_(spreadsheet, payment, reason) {
  if (!normalizeValue_(payment && payment.session_id)) {
    return { ok: true, skipped: true };
  }
  return expireLinkedSessionForPayment_(spreadsheet, payment, reason);
}

function expireLinkedSessionForPayment_(spreadsheet, payment, reason) {
  const paymentId = normalizeValue_(payment && payment.payment_id);
  const sessionId = normalizeValue_(payment && payment.session_id);
  if (!paymentId || !sessionId) {
    return { ok: true, skipped: true };
  }

  const expiryLock = LockService.getScriptLock();
  if (!expiryLock.tryLock(5000)) {
    return { ok: false, code: "PAYMENT_EXPIRY_BUSY" };
  }

  let cancelledSession = null;
  try {
    const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
    const currentPayment = findSheetRecordById_(paymentSheet, PAYMENT_COLUMNS, "payment_id", paymentId);
    if (!currentPayment || normalizeValue_(currentPayment.data.payment_status) === "paid") {
      return { ok: true, skipped: true };
    }

    const sessionSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
    const currentSession = findSheetRecordById_(sessionSheet, SESSION_COLUMNS, "session_id", sessionId);
    const currentStatus = normalizeValue_(currentSession && currentSession.data.session_status);
    if (!currentSession || ["cancelled", "completed", "no_show"].includes(currentStatus)) {
      return { ok: true, skipped: true };
    }

    // Preserve the calendar/session invariant: cancellation is durable only after
    // the tutor-owned Calendar event has been removed. A missing event is safe
    // (it has already been deleted); a Calendar failure must be retried later.
    const calendarDeletion = deleteCalendarEventForExpiredSession_(currentSession.data);
    if (!calendarDeletion.ok) {
      const failureNote = "Echec de suppression Calendar pendant l'expiration du paiement; nouvelle tentative automatique.";
      const hasFailureNote = normalizeValue_(currentSession.data.notes).includes(failureNote);
      if (!hasFailureNote) {
        appendCalendarDeletionFailureRequest_(spreadsheet, currentSession.data, "expiration du paiement", calendarDeletion.code);
      }
      writeRecord_(sessionSheet, SESSION_COLUMNS, currentSession.rowNumber, {
        ...currentSession.data,
        updated_at: new Date().toISOString(),
        notes: hasFailureNote
          ? normalizeValue_(currentSession.data.notes)
          : [normalizeValue_(currentSession.data.notes), failureNote].filter(Boolean).join(" | "),
      });
      return { ok: false, code: "PAYMENT_EXPIRY_CALENDAR_DELETE_FAILED" };
    }
    releasePlanCreditReservationForSession_(spreadsheet, currentSession.data, reason || "Paiement non recu avant l'echeance.");
    cancelledSession = {
      ...currentSession.data,
      session_status: "cancelled",
      google_meet_url: "",
      calendar_invites_sent_at: "",
      updated_at: new Date().toISOString(),
      notes: [normalizeValue_(currentSession.data.notes), "Seance liberee: paiement non recu avant l'echeance."].filter(Boolean).join(" | "),
    };
    writeRecord_(sessionSheet, SESSION_COLUMNS, currentSession.rowNumber, cancelledSession);
  } finally {
    expiryLock.releaseLock();
  }

  if (cancelledSession) {
    sendExpiredSessionNotifications_(payment, cancelledSession);
  }
  return { ok: true, session_id: sessionId, cancelled: Boolean(cancelledSession) };
}

function expireUnpaidCheckoutSessions() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ensureCrmReady_(spreadsheet);
  const expiryLock = LockService.getScriptLock();
  if (!expiryLock.tryLock(5000)) {
    return { ok: false, code: "PAYMENT_EXPIRY_BUSY" };
  }

  const expiredPayments = [];
  try {
    const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
    const now = Date.now();
    getSheetRecordsFromSheet_(paymentSheet, PAYMENT_COLUMNS)
      .forEach((record) => {
        const paymentStatus = normalizeValue_(record.data.payment_status);
        if (paymentStatus === "overdue") {
          if (normalizeValue_(record.data.session_id)) {
            // Retry a nonterminal linked session after a transient Calendar
            // deletion failure without applying a second payment transition.
            expiredPayments.push(record.data);
          }
          return;
        }
        if (paymentStatus !== "payment_requested") {
          return;
        }
        const dueDate = coerceDate_(record.data.due_date || record.data.checkout_expires_at);
        if (!dueDate || dueDate.getTime() > now) {
          return;
        }
        const overdue = {
          ...record.data,
          payment_status: "overdue",
          checkout_expires_at: dueDate.toISOString(),
          due_date: dueDate.toISOString(),
          updated_at: new Date().toISOString(),
        };
        writeRecord_(paymentSheet, PAYMENT_COLUMNS, record.rowNumber, overdue);
        expiredPayments.push(overdue);
      });
  } finally {
    expiryLock.releaseLock();
  }

  expiredPayments.forEach((payment) => expireLinkedSessionForPaymentIfAvailable_(spreadsheet, payment, "checkout_expired"));
  return { ok: true, expired: expiredPayments.length };
}

function installCheckoutExpiryAutomation() {
  const expiryTriggers = ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "expireUnpaidCheckoutSessions");
  expiryTriggers.slice(1).forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  if (!expiryTriggers.length) {
    ScriptApp.newTrigger("expireUnpaidCheckoutSessions").timeBased().everyMinutes(5).create();
  }
  return { ok: true, checkout_expiry_trigger_count: Math.max(expiryTriggers.length, 1) };
}

function sendExpiredSessionNotifications_(payment, session) {
  const recipients = [
    { email: normalizeEmail_(session.parent_email), greeting: session.parent_name || "Bonjour" },
    { email: normalizeEmail_(session.tutor_calendar_email), greeting: session.tutor_name || "Bonjour" },
  ];
  recipients.forEach((recipient) => {
    if (!recipient.email) {
      return;
    }
    try {
      MailApp.sendEmail(
        recipient.email,
        "Seance liberee - paiement non recu",
        `${recipient.greeting},\n\nLa seance liee au paiement ${payment.payment_id} a ete liberee, car le paiement n'a pas ete recu dans le delai d'une heure.\n\nVous pouvez consulter le portail: ${PORTAL_PUBLIC_URL}\n\nMethode Secondaire`,
      );
    } catch (error) {
      // The cancellation remains durable even if email delivery is delayed.
    }
  });
}

function reissuePortalPaymentCheckout_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "parent");
  if (!portalSession.ok) {
    return portalSession;
  }

  const paymentId = normalizeValue_(payload.payment_id);
  if (!paymentId) {
    return { ok: false, code: "PAYMENT_NOT_FOUND" };
  }
  const paymentLock = LockService.getScriptLock();
  if (!paymentLock.tryLock(5000)) {
    return { ok: false, code: "PAYMENT_REISSUE_BUSY" };
  }

  try {
    const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
    const paymentRecord = findSheetRecordById_(paymentSheet, PAYMENT_COLUMNS, "payment_id", paymentId);
    if (!paymentRecord || normalizeEmail_(paymentRecord.data.email) !== normalizeEmail_(portalSession.access.email)) {
      return { ok: false, code: "PAYMENT_NOT_FOUND" };
    }
    if (normalizeValue_(paymentRecord.data.payment_status) !== "overdue") {
      return { ok: false, code: "PAYMENT_REISSUE_NOT_AVAILABLE" };
    }
    if (normalizeValue_(paymentRecord.data.session_id)) {
      return { ok: false, code: "PAYMENT_REBOOKING_REQUIRED" };
    }
    const enrollmentId = normalizeValue_(paymentRecord.data.plan_enrollment_id);
    const enrollment = enrollmentId
      ? findSheetRecordById_(
        getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME),
        PLAN_ENROLLMENT_COLUMNS,
        "enrollment_id",
        enrollmentId,
      )
      : null;
    if (!isPlanEnrollmentEligibleForPaymentReissue_(enrollment && enrollment.data)) {
      return { ok: false, code: "PAYMENT_REISSUE_NOT_AVAILABLE" };
    }

    const issued = issueCheckoutForPayment_(spreadsheet, paymentRecord.data, { authorizedReissue: true });
    if (!issued.ok) {
      return issued;
    }
    return {
      ok: true,
      payment_id: issued.payment_id,
      payment_url: issued.payment_url,
      due_date: issued.due_date,
    };
  } finally {
    paymentLock.releaseLock();
  }
}

function isPlanEnrollmentEligibleForPaymentReissue_(enrollment) {
  if (!enrollment || !["pending", "active"].includes(normalizeValue_(enrollment.status))) {
    return false;
  }
  const expiresAt = coerceDate_(enrollment.expires_at);
  return !expiresAt || expiresAt.getTime() > Date.now();
}

function grantCreditsForPaidPlanPayment_(spreadsheet, payment) {
  const enrollmentId = normalizeValue_(payment.plan_enrollment_id);
  const creditCount = normalizeCreditAmount_(payment.credit_grant_count);
  if (!enrollmentId || creditCount <= 0) return { granted: false, skipped: true };

  const enrollment = findSheetRecordById_(
    getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME),
    PLAN_ENROLLMENT_COLUMNS,
    "enrollment_id",
    enrollmentId,
  );
  if (!enrollment) return { granted: false, code: "PLAN_PAYMENT_ENROLLMENT_NOT_FOUND" };
  if (["cancelled", "completed", "expired"].includes(normalizeValue_(enrollment.data.status))) {
    return { granted: false, code: "PLAN_ENROLLMENT_NOT_ACTIONABLE" };
  }

  const alreadyGranted = getSheetRecords_(spreadsheet, CRM_CREDIT_LEDGER_SHEET_NAME, CREDIT_LEDGER_COLUMNS)
    .some((entry) => normalizeValue_(entry.source_payment_id) === normalizeValue_(payment.payment_id));
  if (alreadyGranted) return { granted: false, already_granted: true };

  const ledger = appendCreditLedgerEntry_(spreadsheet, {
    enrollment_id: enrollment.data.enrollment_id,
    plan_id: enrollment.data.plan_id,
    parent_email: enrollment.data.parent_email,
    student_id: enrollment.data.student_id,
    source_payment_id: payment.payment_id,
    entry_type: "grant",
    available_delta: creditCount,
    reason: `Credits granted after verified payment ${payment.payment_id}.`,
    expires_at: enrollment.data.expires_at,
  });
  return { granted: true, ledger };
}

function upsertPortalPaymentLink_(spreadsheet, payload) {
  const session = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!session.ok) {
    return session;
  }

  const offer = normalizePaymentLinkOfferCode_(payload.offer);
  const paymentLink = normalizeValue_(payload.stripe_payment_link).trim();
  const amount = normalizeValue_(payload.amount_cad).trim();
  if (!PAYMENT_LINK_OFFER_OPTIONS.includes(offer) || !paymentLink || !/^https:\/\//i.test(paymentLink) || !amount) {
    return { ok: false, code: "PAYMENT_LINK_DETAILS_REQUIRED" };
  }

  const sheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_LINK_SHEET_NAME);
  setupPaymentLinksSheet_(sheet);
  const existing = getSheetRecordsFromSheet_(sheet, PAYMENT_LINK_COLUMNS)
    .find((record) => normalizePaymentLinkOfferCode_(record.data.offer) === offer);
  const now = new Date().toISOString();
  const record = {
    payment_link_id: existing ? existing.data.payment_link_id : createRecordId_("LINK"),
    offer,
    description: normalizeValue_(payload.description).slice(0, 500),
    amount_cad: amount,
    stripe_payment_link: paymentLink,
    interac_email: existing ? existing.data.interac_email : "",
    status: "active",
    notes: normalizeValue_(payload.notes).slice(0, 1000),
    last_updated_at: now,
  };

  writeRecord_(sheet, PAYMENT_LINK_COLUMNS, existing ? existing.rowNumber : null, record);
  return { ok: true, offer, payment_link_id: record.payment_link_id };
}

function normalizePaymentLinkOfferCode_(value) {
  const normalized = normalizeValue_(value);
  if (SESSION_TYPE_OPTIONS.includes(normalized) || PACKAGE_PAYMENT_OFFER_CODES.includes(normalized)) {
    return normalized;
  }
  if (["progression_block_10_installment_1", "weekly_follow_up_installment_1"].includes(normalized)) {
    return "progression_block_payment_1";
  }
  if (["progression_block_10_installment_2", "weekly_follow_up_installment_2"].includes(normalized)) {
    return "progression_block_payment_2";
  }

  return "";
}

function updatePortalRequestStatus_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) {
    return portalSession;
  }

  const requestId = normalizeValue_(payload.request_id);
  const status = normalizeAllowed_(payload.status, PORTAL_REQUEST_STATUS_OPTIONS, "");
  if (!requestId || !status) {
    return { ok: false, code: "PORTAL_REQUEST_STATUS_REQUIRED" };
  }

  const sheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_REQUEST_SHEET_NAME);
  const requestRecord = findSheetRecordById_(sheet, PORTAL_REQUEST_COLUMNS, "request_id", requestId);
  if (!requestRecord) {
    return { ok: false, code: "PORTAL_REQUEST_NOT_FOUND" };
  }

  writeRecord_(sheet, PORTAL_REQUEST_COLUMNS, requestRecord.rowNumber, {
    ...requestRecord.data,
    status,
    owner: normalizeValue_(requestRecord.data.owner) || portalSession.access.display_name || "Equipe Methode Secondaire",
    updated_at: new Date().toISOString(),
  });

  return { ok: true, request_id: requestId, status };
}

function createPortalRequest_(spreadsheet, payload) {
  const session = verifyPortalSession_(spreadsheet, payload.token, payload.role);

  if (!session.ok) {
    return session;
  }

  const message = normalizeValue_(payload.message).slice(0, 2500);
  if (!message) {
    return { ok: false, code: "MESSAGE_REQUIRED" };
  }

  const request = appendPortalRequestRecord_(spreadsheet, {
    role: session.access.role,
    email: session.access.email,
    related_id: session.access.related_id,
    request_type: payload.request_type,
    subject: payload.subject,
    message,
  });

  return { ok: true, request_id: request.request_id };
}

function appendPortalRequestRecord_(spreadsheet, params) {
  const now = new Date().toISOString();
  const requestType = normalizeAllowed_(params.request_type, PORTAL_REQUEST_TYPE_OPTIONS, "parent_question");
  const request = {
    request_id: createRecordId_("REQ"),
    created_at: now,
    role: normalizePortalRole_(params.role) || "parent",
    email: normalizeEmail_(params.email),
    related_id: normalizeValue_(params.related_id),
    request_type: requestType,
    subject: normalizeValue_(params.subject).slice(0, 180) || requestType,
    message: normalizeValue_(params.message).slice(0, 2500),
    status: "new",
    owner: "Chahine",
    due_at: "",
    updated_at: now,
  };

  const requestSheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_REQUEST_SHEET_NAME);
  setupPortalRequestsSheet_(requestSheet);
  requestSheet.appendRow(PORTAL_REQUEST_COLUMNS.map((column) => request[column] || ""));

  return request;
}

function findPlanById_(spreadsheet, planId) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_PLAN_SHEET_NAME);
  setupPlansSheet_(sheet);
  const record = findSheetRecordById_(sheet, PLAN_COLUMNS, "plan_id", planId);
  return record ? record.data : null;
}

function findActivePlan_(spreadsheet, planId) {
  const plan = findPlanById_(spreadsheet, planId);
  return plan && normalizeValue_(plan.status) === "active" ? plan : null;
}

function findPlanEnrollmentForPortalAccess_(spreadsheet, access, enrollmentId) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME);
  setupPlanEnrollmentsSheet_(sheet);
  return getSheetRecordsFromSheet_(sheet, PLAN_ENROLLMENT_COLUMNS)
    .find((record) => normalizeValue_(record.data.enrollment_id) === normalizeValue_(enrollmentId) &&
      (access.role === "operator" || normalizeEmail_(record.data.parent_email) === normalizeEmail_(access.email))) || null;
}

function buildPlanEnrollmentResponse_(spreadsheet, access, enrollment, knownPlan) {
  const plan = knownPlan || findPlanById_(spreadsheet, enrollment.plan_id);
  const creditSummary = buildEnrollmentCreditSummary_(spreadsheet, enrollment.enrollment_id);
  const modificationWindow = buildPlanModificationWindow_(spreadsheet, enrollment);
  const planEnrollment = sanitizePlanEnrollmentForPortal_(enrollment, plan, creditSummary, modificationWindow);
  const response = {
    ok: true,
    enrollment_id: enrollment.enrollment_id,
    plan_enrollment: planEnrollment,
    // This compact object lets the parent portal render one clear cadence card
    // without interpreting the underlying ledger.
    parent_plan: planEnrollment,
    credit_summary: creditSummary,
    modification_window: modificationWindow,
  };

  if (access.role === "parent") {
    response.dashboard = buildParentPortalDashboard_(spreadsheet, access);
  }
  return response;
}

function appendCreditLedgerEntry_(spreadsheet, params) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_CREDIT_LEDGER_SHEET_NAME);
  setupCreditLedgerSheet_(sheet);
  const record = {
    credit_ledger_id: normalizeValue_(params.credit_ledger_id) || createRecordId_("CREDIT"),
    enrollment_id: normalizeValue_(params.enrollment_id),
    plan_id: normalizeValue_(params.plan_id),
    session_id: normalizeValue_(params.session_id),
    related_credit_ledger_id: normalizeValue_(params.related_credit_ledger_id),
    parent_email: normalizeEmail_(params.parent_email),
    student_id: normalizeValue_(params.student_id),
    entry_type: normalizeAllowed_(params.entry_type, CREDIT_LEDGER_ENTRY_TYPE_OPTIONS, "adjustment"),
    available_delta: String(normalizeCreditAmount_(params.available_delta)),
    reserved_delta: String(normalizeCreditAmount_(params.reserved_delta)),
    used_delta: String(normalizeCreditAmount_(params.used_delta)),
    reason: normalizeValue_(params.reason).slice(0, 800),
    expires_at: normalizeValue_(params.expires_at),
    created_at: new Date().toISOString(),
    source_payment_id: normalizeValue_(params.source_payment_id),
  };
  sheet.appendRow(CREDIT_LEDGER_COLUMNS.map((column) => record[column] || ""));
  return record;
}

function buildEnrollmentCreditSummary_(spreadsheet, enrollmentId) {
  const entries = getSheetRecords_(spreadsheet, CRM_CREDIT_LEDGER_SHEET_NAME, CREDIT_LEDGER_COLUMNS)
    .filter((entry) => normalizeValue_(entry.enrollment_id) === normalizeValue_(enrollmentId));
  const totals = entries.reduce((summary, entry) => ({
    available: summary.available + normalizeCreditAmount_(entry.available_delta),
    reserved: summary.reserved + normalizeCreditAmount_(entry.reserved_delta),
    used: summary.used + normalizeCreditAmount_(entry.used_delta),
  }), { available: 0, reserved: 0, used: 0 });

  return {
    credits_total: Math.max(0, totals.available + totals.reserved + totals.used),
    credits_remaining: Math.max(0, totals.available),
    credits_reserved: Math.max(0, totals.reserved),
    credits_used: Math.max(0, totals.used),
  };
}

function resolvePlanSessionBinding_(spreadsheet, params) {
  const enrollmentId = normalizeValue_(params.plan_enrollment_id);
  if (!enrollmentId) {
    return { ok: true, enrollment: null, plan: null, requires_credit: false };
  }

  const enrollmentRecord = findSheetRecordById_(getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME),
    PLAN_ENROLLMENT_COLUMNS, "enrollment_id", enrollmentId);
  if (!enrollmentRecord || normalizeValue_(enrollmentRecord.data.status) !== "active") {
    return { ok: false, code: "PLAN_ENROLLMENT_NOT_ACTIVE" };
  }
  const enrollment = enrollmentRecord.data;
  const plan = findActivePlan_(spreadsheet, enrollment.plan_id);
  if (!plan) {
    return { ok: false, code: "PLAN_NOT_AVAILABLE" };
  }
  if (normalizeEmail_(params.parent_email) !== normalizeEmail_(enrollment.parent_email) ||
      normalizeValue_(params.student_id) !== normalizeValue_(enrollment.student_id) ||
      normalizeValue_(params.tutor_id) !== normalizeValue_(enrollment.tutor_id)) {
    return { ok: false, code: "PLAN_ENROLLMENT_PARTICIPANT_MISMATCH" };
  }

  const sessionType = normalizeAllowed_(params.session_type, SESSION_TYPE_OPTIONS, "one_time");
  const eligibleTypes = normalizePlanSessionTypes_(plan.eligible_session_types, "").split(",").filter(Boolean);
  if (eligibleTypes.length && !eligibleTypes.includes(sessionType)) {
    return { ok: false, code: "PLAN_SESSION_TYPE_NOT_ALLOWED" };
  }

  return {
    ok: true,
    enrollment,
    plan,
    requires_credit: normalizeValue_(plan.plan_type) === "pack",
    cancellation_notice_hours: normalizePlanNoticeHours_(enrollment.cancellation_notice_hours),
  };
}

function reservePlanCreditForSession_(spreadsheet, binding, session) {
  if (!binding?.requires_credit) {
    return null;
  }
  const summary = buildEnrollmentCreditSummary_(spreadsheet, binding.enrollment.enrollment_id);
  if (summary.credits_remaining < 1) {
    return { ok: false, code: "PLAN_CREDIT_BALANCE_INSUFFICIENT", credit_summary: summary };
  }
  const reservation = appendCreditLedgerEntry_(spreadsheet, {
    enrollment_id: binding.enrollment.enrollment_id,
    plan_id: binding.plan.plan_id,
    session_id: session.session_id,
    parent_email: binding.enrollment.parent_email,
    student_id: binding.enrollment.student_id,
    entry_type: "reserve",
    available_delta: -1,
    reserved_delta: 1,
    reason: "Credit reserved for a scheduled session.",
    expires_at: binding.enrollment.expires_at,
  });
  return { ok: true, reservation };
}

function releasePlanCreditReservationForSession_(spreadsheet, session, reason) {
  const reservationId = normalizeValue_(session.credit_reservation_id);
  if (!reservationId) {
    return { ok: true, released: false };
  }
  const entries = getSheetRecords_(spreadsheet, CRM_CREDIT_LEDGER_SHEET_NAME, CREDIT_LEDGER_COLUMNS);
  const reservation = entries.find((entry) => normalizeValue_(entry.credit_ledger_id) === reservationId &&
    normalizeValue_(entry.entry_type) === "reserve");
  if (!reservation) {
    return { ok: false, code: "PLAN_CREDIT_RESERVATION_NOT_FOUND" };
  }
  const settled = entries.some((entry) => normalizeValue_(entry.related_credit_ledger_id) === reservationId &&
    ["release", "consume"].includes(normalizeValue_(entry.entry_type)));
  if (settled) {
    return { ok: true, released: false, already_settled: true };
  }
  const amount = Math.abs(normalizeCreditAmount_(reservation.reserved_delta)) || 1;
  appendCreditLedgerEntry_(spreadsheet, {
    enrollment_id: reservation.enrollment_id,
    plan_id: reservation.plan_id,
    session_id: session.session_id,
    related_credit_ledger_id: reservationId,
    parent_email: reservation.parent_email,
    student_id: reservation.student_id,
    entry_type: "release",
    available_delta: amount,
    reserved_delta: -amount,
    reason: normalizeValue_(reason).slice(0, 500) || "Credit released after a timely cancellation.",
    expires_at: reservation.expires_at,
  });
  return { ok: true, released: true };
}

function consumePlanCreditReservationForSession_(spreadsheet, session) {
  const reservationId = normalizeValue_(session.credit_reservation_id);
  if (!reservationId) {
    return { ok: true, consumed: false };
  }
  const entries = getSheetRecords_(spreadsheet, CRM_CREDIT_LEDGER_SHEET_NAME, CREDIT_LEDGER_COLUMNS);
  const reservation = entries.find((entry) => normalizeValue_(entry.credit_ledger_id) === reservationId &&
    normalizeValue_(entry.entry_type) === "reserve");
  if (!reservation) {
    return { ok: false, code: "PLAN_CREDIT_RESERVATION_NOT_FOUND" };
  }
  const settled = entries.some((entry) => normalizeValue_(entry.related_credit_ledger_id) === reservationId &&
    ["release", "consume"].includes(normalizeValue_(entry.entry_type)));
  if (settled) {
    return { ok: true, consumed: false, already_settled: true };
  }
  const amount = Math.abs(normalizeCreditAmount_(reservation.reserved_delta)) || 1;
  appendCreditLedgerEntry_(spreadsheet, {
    enrollment_id: reservation.enrollment_id,
    plan_id: reservation.plan_id,
    session_id: session.session_id,
    related_credit_ledger_id: reservationId,
    parent_email: reservation.parent_email,
    student_id: reservation.student_id,
    entry_type: "consume",
    reserved_delta: -amount,
    used_delta: amount,
    reason: "Credit consumed after the completed session.",
    expires_at: reservation.expires_at,
  });
  return { ok: true, consumed: true };
}

function planModificationDeadlineForSession_(startAt, noticeHours) {
  const start = coerceDate_(startAt);
  const notice = normalizePlanNoticeHours_(noticeHours);
  return start ? new Date(start.getTime() - notice * 60 * 60 * 1000).toISOString() : "";
}

function buildPlanModificationWindow_(spreadsheet, enrollment) {
  const linkedSession = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .filter((session) => normalizeValue_(session.plan_enrollment_id) === normalizeValue_(enrollment.enrollment_id))
    .filter((session) => !["cancelled", "no_show", "completed"].includes(normalizeValue_(session.session_status)))
    .filter((session) => {
      const start = coerceDate_(session.start_at);
      return start && start.getTime() > Date.now();
    })
    .sort((a, b) => String(a.start_at).localeCompare(String(b.start_at)))[0] || null;
  const nextOccurrence = linkedSession
    ? coerceDate_(linkedSession.start_at)
    : (normalizeValue_(enrollment.status) === "active" ? findNextRhythmOccurrence_(enrollment) : null);
  const noticeHours = normalizePlanNoticeHours_(linkedSession?.cancellation_notice_hours || enrollment.cancellation_notice_hours);
  const storedDeadline = linkedSession ? coerceDate_(linkedSession.modification_deadline_at) : null;
  const deadline = storedDeadline || (nextOccurrence
    ? new Date(nextOccurrence.getTime() - noticeHours * 60 * 60 * 1000)
    : null);

  return {
    enrollment_id: enrollment.enrollment_id,
    status: normalizeValue_(enrollment.status),
    cancellation_notice_hours: noticeHours,
    next_occurrence_at: nextOccurrence ? nextOccurrence.toISOString() : "",
    next_change_deadline: deadline ? deadline.toISOString() : "",
    modification_deadline_at: deadline ? deadline.toISOString() : "",
    source: linkedSession ? "session" : (nextOccurrence ? "rhythm_estimate" : "not_scheduled"),
    can_modify: Boolean(deadline && Date.now() <= deadline.getTime()),
  };
}

function findNextRhythmOccurrence_(enrollment) {
  const cadence = normalizeAllowed_(enrollment.cadence, PLAN_CADENCE_OPTIONS, "");
  const weekday = normalizeAllowed_(enrollment.scheduled_weekday, WEEKDAY_OPTIONS, "");
  const time = normalizeAvailabilityTime_(enrollment.scheduled_time);
  const timezone = normalizeValue_(enrollment.timezone) || "America/Toronto";
  const startAt = coerceDate_(enrollment.start_at);
  if (!weekday || !time || !["weekly", "biweekly"].includes(cadence)) {
    return null;
  }

  const now = new Date();
  const lowerBound = startAt && startAt.getTime() > now.getTime() ? startAt : now;
  for (let dayOffset = 0; dayOffset <= 21; dayOffset += 1) {
    const candidateDay = new Date(lowerBound.getTime() + dayOffset * 24 * 60 * 60 * 1000);
    if (weekdayForDate_(candidateDay, timezone) !== weekday) {
      continue;
    }
    const dateKey = Utilities.formatDate(candidateDay, timezone, "yyyy-MM-dd");
    const candidate = createDateAtLocalTime_(dateKey, time, timezone);
    if (!candidate || candidate.getTime() < lowerBound.getTime()) {
      continue;
    }
    if (cadence === "biweekly" && startAt) {
      const weeksSinceStart = Math.round((candidate.getTime() - startAt.getTime()) / (7 * 24 * 60 * 60 * 1000));
      if (weeksSinceStart >= 0 && weeksSinceStart % 2 !== 0) {
        continue;
      }
    }
    return candidate;
  }

  return null;
}

function resolvePlanCadence_(planType, value, fallback) {
  const normalizedPlanType = normalizeValue_(planType);
  if (normalizedPlanType === "weekly") {
    return normalizeAllowed_(value, ["weekly", "biweekly"],
      normalizeAllowed_(fallback, ["weekly", "biweekly"], "weekly"));
  }
  if (normalizedPlanType === "pack") {
    // The 10-session progress block is a pack regardless of cadence, so its
    // credit ledger remains intact. Weekly/biweekly is selected after matching;
    // otherwise the block stays one-time.
    return normalizeAllowed_(value, ["weekly", "biweekly"],
      normalizeAllowed_(fallback, ["weekly", "biweekly"], "one_time"));
  }
  return "one_time";
}

function resolvePlanNoticeHours_(planType, value, fallback) {
  // All new plans inherit the public 72-hour policy. The legacy weekly plan
  // remains fixed to it even if an older row contains a stale value.
  if (normalizeValue_(planType) === "weekly") {
    return String(PLAN_MODIFICATION_NOTICE_HOURS);
  }
  const candidate = normalizePlanNoticeHours_(normalizeValue_(value) || normalizeValue_(fallback));
  return String(candidate);
}

function normalizePlanNoticeHours_(value) {
  const parsed = Math.round(Number(value));
  return Number.isFinite(parsed) && parsed >= PLAN_MODIFICATION_NOTICE_HOURS && parsed <= 168
    ? parsed
    : PLAN_MODIFICATION_NOTICE_HOURS;
}

function normalizePlanMoney_(value, fallback) {
  const raw = normalizeValue_(value) || normalizeValue_(fallback);
  if (!raw) {
    return "";
  }
  const parsed = Number(String(raw).replace(/\s/g, "").replace(",", ".").replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 10000) {
    return "";
  }
  return String(Math.round(parsed * 100) / 100);
}

function normalizeTutorHourlyRate_(value) {
  const raw = normalizeValue_(value);
  if (!raw) {
    return String(TUTOR_BASE_HOURLY_RATE_CAD);
  }
  const parsed = Number(String(raw).replace(/\s/g, "").replace(",", ".").replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed) || parsed < TUTOR_BASE_HOURLY_RATE_CAD) {
    return "";
  }
  return String(Math.round(parsed * 100) / 100);
}

function isPositivePlanMoney_(value) {
  return Number(value) > 0;
}

function normalizePlanWholeNumber_(value, fallback, max) {
  const raw = normalizeValue_(value) || normalizeValue_(fallback);
  if (!raw) {
    return "";
  }
  const parsed = Math.round(Number(raw));
  return Number.isFinite(parsed) && parsed > 0 && parsed <= max ? String(parsed) : "";
}

function normalizePlanSessionCount_(value, planType, fallback) {
  if (normalizeValue_(planType) !== "pack") {
    return "";
  }
  return normalizePlanWholeNumber_(value, fallback, 100);
}

function normalizePlanSessionTypes_(value, fallback) {
  const raw = normalizeValue_(value) || normalizeValue_(fallback);
  const values = raw.split(",")
    .map((entry) => normalizeValue_(entry))
    .filter((entry) => SESSION_TYPE_OPTIONS.includes(entry));
  return [...new Set(values)].join(",");
}

function normalizeCreditAmount_(value) {
  const parsed = Math.round(Number(value));
  return Number.isFinite(parsed) && Math.abs(parsed) <= 100 ? parsed : 0;
}

function hasPortalField_(payload, field) {
  return Object.prototype.hasOwnProperty.call(payload || {}, field);
}

function buildParentPlanData_(spreadsheet, email) {
  const plans = getSheetRecords_(spreadsheet, CRM_PLAN_SHEET_NAME, PLAN_COLUMNS)
    .filter((plan) => normalizeValue_(plan.status) === "active")
    .map(sanitizePlanForPortal_);
  const planById = getSheetRecords_(spreadsheet, CRM_PLAN_SHEET_NAME, PLAN_COLUMNS)
    .reduce((all, plan) => {
      all[normalizeValue_(plan.plan_id)] = plan;
      return all;
    }, {});
  const ledger = getSheetRecords_(spreadsheet, CRM_CREDIT_LEDGER_SHEET_NAME, CREDIT_LEDGER_COLUMNS)
    .filter((entry) => normalizeEmail_(entry.parent_email) === normalizeEmail_(email))
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, 60)
    .map(sanitizeCreditLedgerForParent_);
  const enrollments = getSheetRecords_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME, PLAN_ENROLLMENT_COLUMNS)
    .filter((enrollment) => normalizeEmail_(enrollment.parent_email) === normalizeEmail_(email))
    .map((enrollment) => sanitizePlanEnrollmentForPortal_(
      enrollment,
      planById[normalizeValue_(enrollment.plan_id)] || null,
      buildEnrollmentCreditSummary_(spreadsheet, enrollment.enrollment_id),
      buildPlanModificationWindow_(spreadsheet, enrollment),
    ))
    .sort(comparePlanEnrollmentForParent_);
  const selected = enrollments[0] || null;

  return {
    plans,
    plan_enrollments: enrollments,
    plan_enrollment: selected,
    parent_plan: selected ? {
      enrollment_id: selected.enrollment_id,
      plan_type: selected.plan_type,
      status: selected.status,
      accounting_mode: selected.accounting_mode,
      credits_total: selected.credits_total,
      credits_remaining: selected.credits_remaining,
      cancellation_notice_hours: selected.cancellation_notice_hours,
      next_change_deadline: selected.next_change_deadline,
      plan_enrollment: selected,
    } : null,
    credit_ledger: ledger,
  };
}

function comparePlanEnrollmentForParent_(left, right) {
  const statusRank = { active: 0, pending: 1, paused: 2, completed: 3, expired: 4, cancelled: 5 };
  const typeRank = { pack: 0, weekly: 1, one_time: 2 };
  const statusOrder = (statusRank[normalizeValue_(left.status)] ?? 9) - (statusRank[normalizeValue_(right.status)] ?? 9);
  if (statusOrder) {
    return statusOrder;
  }
  const typeOrder = (typeRank[normalizeValue_(left.plan_type)] ?? 9) - (typeRank[normalizeValue_(right.plan_type)] ?? 9);
  return typeOrder || String(right.updated_at).localeCompare(String(left.updated_at));
}

function buildPortalDashboard_(spreadsheet, access) {
  if (access.role === "operator") {
    return buildOperatorPortalDashboard_(spreadsheet, access);
  }

  return access.role === "tutor"
    ? buildTutorPortalDashboard_(spreadsheet, access)
    : buildParentPortalDashboard_(spreadsheet, access);
}

function buildParentPortalDashboard_(spreadsheet, access) {
  const email = normalizeEmail_(access.email);
  const leadRecords = getSheetRecords_(spreadsheet, CRM_SHEET_NAME, CRM_COLUMNS)
    .filter((record) => normalizeEmail_(record.email) === email);
  const leads = leadRecords.map(sanitizeLeadForPortal_);
  const primaryLead = leadRecords.find((record) => normalizeValue_(record.lead_id) === normalizeValue_(access.related_id)) || leadRecords[0] || {};
  const parentSessionRecords = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .filter((record) => normalizeEmail_(record.parent_email) === email);
  const sessions = parentSessionRecords.map(sanitizeSessionForParent_);
  const students = getSheetRecords_(spreadsheet, CRM_STUDENT_SHEET_NAME, STUDENT_COLUMNS)
    .filter((record) => normalizeEmail_(record.parent_email) === email)
    .filter((record) => normalizeValue_(record.status) === "active")
    .sort((a, b) => String(a.student_name).localeCompare(String(b.student_name)))
    .map(sanitizeStudentForPortal_);
  const enrollmentsById = new Map(
    getSheetRecords_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME, PLAN_ENROLLMENT_COLUMNS)
      .map((record) => [normalizeValue_(record.enrollment_id), record])
  );
  const payments = getSheetRecords_(spreadsheet, CRM_PAYMENT_SHEET_NAME, PAYMENT_COLUMNS)
    .filter((record) => normalizeEmail_(record.email) === email)
    .map((record) => sanitizePaymentForParent_(record, enrollmentsById.get(normalizeValue_(record.plan_enrollment_id))));
  const notes = buildParentSessionNotes_(spreadsheet, email);
  const feedback = getSheetRecords_(spreadsheet, CRM_PARENT_FEEDBACK_SHEET_NAME, PARENT_FEEDBACK_COLUMNS)
    .filter((record) => normalizeEmail_(record.parent_email) === email);
  const feedbackSessionIds = new Set(feedback.map((record) => normalizeValue_(record.session_id)).filter(Boolean));
  const feedbackEligibleSessions = parentSessionRecords
    .filter((record) => !feedbackSessionIds.has(normalizeValue_(record.session_id)))
    .filter((record) => ["calendar_created", "completed"].includes(normalizeValue_(record.session_status)) ||
      Boolean(coerceDate_(record.end_at) && coerceDate_(record.end_at).getTime() < Date.now()))
    .map(sanitizeSessionForParent_);
  const nextSession = sessions
    .filter((record) => isUpcomingDate_(record.start_at))
    .sort((a, b) => String(a.start_at).localeCompare(String(b.start_at)))[0] || null;
  const messages = buildPortalMessagesForAccess_(spreadsheet, access);
  const requests = buildPortalRequestsForAccess_(spreadsheet, access);
  const planData = buildParentPlanData_(spreadsheet, email);
  const assignedTutorId = assignedTutorIdForLead_(primaryLead);
  const assignedTutorName = normalizeValue_(primaryLead.assigned_tutor).split("|")[0].trim();
  const eligibleTutorIds = new Set([
    assignedTutorId,
    ...students.map((student) => normalizeValue_(student.assigned_tutor_id)),
  ].filter(Boolean));
  const bookableSlots = eligibleTutorIds.size
    ? buildBookableSlots_(spreadsheet, 21)
      .filter((slot) => eligibleTutorIds.has(normalizeValue_(slot.tutor_id)))
      .slice(0, 48)
    : [];

  return {
    profile: {
      role: "parent",
      email,
      name: access.display_name || primaryLead.parent_name || sessions[0]?.parent_name || "",
      related_id: access.related_id,
      phone: primaryLead.phone || "",
      student_level_subject: primaryLead.student_level_subject || "",
      main_concern: primaryLead.main_concern || "",
      timeline: primaryLead.timeline || "",
      format: primaryLead.format || "",
    },
    metrics: {
      leads: leads.length,
      sessions: sessions.length,
      notes: notes.length,
      payments_due: payments.filter((payment) => payment.payment_status !== "paid" && payment.payment_status !== "waived").length,
      messages_waiting: messages.filter((message) => message.recipient_role === "parent" && message.message_status === "awaiting_reply").length,
      requests_open: requests.filter((request) => ["new", "in_review"].includes(request.status)).length,
    },
    next_session: nextSession,
    leads,
    students,
    sessions,
    notes,
    payments,
    plans: planData.plans,
    plan_enrollments: planData.plan_enrollments,
    // Singular aliases make the first portal release easy to render while the
    // full collections remain available for a future plan-management view.
    plan_enrollment: planData.plan_enrollment,
    parent_plan: planData.parent_plan,
    credit_ledger: planData.credit_ledger,
    matching: {
      tutor_id: assignedTutorId,
      tutor_name: assignedTutorName,
    },
    bookable_slots: bookableSlots,
    feedback_eligible_sessions: feedbackEligibleSessions,
    feedback: feedback.map(sanitizeParentFeedbackForPortal_),
    messages,
    requests,
    activity: buildParentActivityTimeline_({
      email,
      sessions: parentSessionRecords,
      notes,
      payments,
      messages,
      requests,
      feedback,
    }),
  };
}

function buildTutorPortalDashboard_(spreadsheet, access) {
  const tutorId = normalizeValue_(access.related_id);
  const email = normalizeEmail_(access.email);
  const roster = getSheetRecords_(spreadsheet, CRM_TUTOR_SHEET_NAME, TUTOR_COLUMNS)
    .find((record) => normalizeValue_(record.tutor_id) === tutorId || normalizeEmail_(record.calendar_email) === email);
  const sessions = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .filter((record) => normalizeValue_(record.tutor_id) === tutorId || normalizeEmail_(record.tutor_calendar_email) === email)
    .map(sanitizeSessionForTutor_);
  const availability = getSheetDisplayRecords_(spreadsheet, CRM_TUTOR_AVAILABILITY_SHEET_NAME, AVAILABILITY_COLUMNS)
    .map((record) => record.data)
    .filter((record) => normalizeValue_(record.tutor_id) === tutorId)
    .sort((a, b) => `${a.weekday}|${a.start_time}`.localeCompare(`${b.weekday}|${b.start_time}`))
    .map(sanitizeTutorAvailabilityForPortal_);
  const notes = getSheetRecords_(spreadsheet, CRM_SESSION_NOTE_SHEET_NAME, SESSION_NOTE_COLUMNS)
    .filter((record) => normalizeValue_(record.tutor_id) === tutorId)
    .map(sanitizeSessionNoteForPortal_);
  const parentFeedback = getSheetRecords_(spreadsheet, CRM_PARENT_FEEDBACK_SHEET_NAME, PARENT_FEEDBACK_COLUMNS)
    .filter((record) => normalizeValue_(record.tutor_id) === tutorId)
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .map(sanitizeParentFeedbackForPortal_);
  const noteSessionIds = new Set(notes.map((note) => normalizeValue_(note.session_id)).filter(Boolean));
  const sessions_needing_notes = sessions.filter((record) => {
    const status = normalizeValue_(record.session_status);
    const ended = coerceDate_(record.end_at);
    return ["calendar_created", "completed"].includes(status) && ended && ended.getTime() <= Date.now() && !noteSessionIds.has(record.session_id);
  });
  const nextSession = sessions
    .filter((record) => isUpcomingDate_(record.start_at))
    .sort((a, b) => String(a.start_at).localeCompare(String(b.start_at)))[0] || null;
  const messages = buildPortalMessagesForAccess_(spreadsheet, access);
  const bookableWindows = availability.filter((record) => ["open", "limited"].includes(normalizeValue_(record.status)));
  const requests = buildPortalRequestsForAccess_(spreadsheet, access);

  return {
    profile: {
      role: "tutor",
      email,
      name: access.display_name || roster?.tutor_name || "",
      tutor_id: tutorId,
      subjects: roster?.subjects || "",
      levels: roster?.levels || "",
      available_slots: roster?.available_slots || "",
    },
    metrics: {
      sessions: sessions.length,
      notes_submitted: notes.length,
      notes_due: sessions_needing_notes.length,
      messages_waiting: messages.filter((message) => message.recipient_role === "tutor" && message.message_status === "awaiting_reply").length,
      bookable_windows: bookableWindows.length,
      requests_open: requests.filter((request) => ["new", "in_review"].includes(request.status)).length,
    },
    next_session: nextSession,
    sessions,
    sessions_needing_notes,
    notes,
    availability,
    parent_feedback: parentFeedback,
    messages,
    requests,
  };
}

function buildOperatorPortalDashboard_(spreadsheet, access) {
  const accessRecords = getSheetRecords_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME, PORTAL_ACCESS_COLUMNS);
  const leadRecords = getSheetRecords_(spreadsheet, CRM_SHEET_NAME, CRM_COLUMNS);
  const tutorSourceRecords = getSheetRecords_(spreadsheet, CRM_TUTOR_SHEET_NAME, TUTOR_COLUMNS);
  const sessionRecords = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS);
  const planSourceRecords = getSheetRecords_(spreadsheet, CRM_PLAN_SHEET_NAME, PLAN_COLUMNS);
  const planEnrollmentSourceRecords = getSheetRecords_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME, PLAN_ENROLLMENT_COLUMNS);
  const creditLedgerSourceRecords = getSheetRecords_(spreadsheet, CRM_CREDIT_LEDGER_SHEET_NAME, CREDIT_LEDGER_COLUMNS);
  const requestRecords = getSheetRecords_(spreadsheet, CRM_PORTAL_REQUEST_SHEET_NAME, PORTAL_REQUEST_COLUMNS);
  const feedbackRecords = getSheetRecords_(spreadsheet, CRM_PARENT_FEEDBACK_SHEET_NAME, PARENT_FEEDBACK_COLUMNS);
  const messageRecords = getSheetRecords_(spreadsheet, CRM_PORTAL_MESSAGE_SHEET_NAME, PORTAL_MESSAGE_COLUMNS);
  const paymentRecords = getSheetRecords_(spreadsheet, CRM_PAYMENT_SHEET_NAME, PAYMENT_COLUMNS);
  const paymentLinkRecords = getSheetRecords_(spreadsheet, CRM_PAYMENT_LINK_SHEET_NAME, PAYMENT_LINK_COLUMNS);
  const sessionNoteRecords = getSheetRecords_(spreadsheet, CRM_SESSION_NOTE_SHEET_NAME, SESSION_NOTE_COLUMNS);
  const studentSourceRecords = getSheetRecords_(spreadsheet, CRM_STUDENT_SHEET_NAME, STUDENT_COLUMNS);
  const parentAccessByLead = accessRecords
    .filter((record) => normalizeValue_(record.role) === "parent")
    .reduce((all, record) => {
      if (normalizeValue_(record.related_id)) {
        all[normalizeValue_(record.related_id)] = record;
      }
      return all;
    }, {});
  const tutorAccessById = accessRecords
    .filter((record) => normalizeValue_(record.role) === "tutor")
    .reduce((all, record) => {
      if (normalizeValue_(record.related_id)) {
        all[normalizeValue_(record.related_id)] = record;
      }
      return all;
    }, {});
  // Keep the operational CRM focused on live records. Test fixtures remain available
  // in the dedicated cleanup section below, but never inflate team priorities.
  const liveLeadRecords = leadRecords.filter((record) => !isTestRecord_(record));
  const liveTutorSourceRecords = tutorSourceRecords.filter((record) => !isTestRecord_(record));
  const liveSessionRecords = sessionRecords.filter((record) => !isTestRecord_(record));
  const liveRequestRecords = requestRecords.filter((record) => !isTestRecord_(record));
  const liveFeedbackRecords = feedbackRecords.filter((record) => !isTestRecord_(record));
  const liveMessageRecords = messageRecords.filter((record) => !isTestRecord_(record));
  const livePaymentRecords = paymentRecords.filter((record) => !isTestRecord_(record));
  const liveStudentRecords = studentSourceRecords.filter((record) => !isTestRecord_(record));
  const parentCandidates = liveLeadRecords
    .filter((record) => normalizeEmail_(record.email) || normalizeValue_(record.phone))
    .map((record) => ({
      lead_id: record.lead_id,
      parent_name: record.parent_name,
      email: normalizeEmail_(record.email),
      student_level_subject: record.student_level_subject,
      phone: record.phone,
      main_concern: record.main_concern,
      parent_intent: record.parent_intent,
      format: record.format,
      lead_status: record.lead_status,
      crm_stage: record.crm_stage,
      next_action: record.next_action,
      callback_notes: record.callback_notes,
      last_contacted_at: record.last_contacted_at,
      urgency_score: record.urgency_score,
      assigned_tutor: record.assigned_tutor,
      access_status: parentAccessByLead[normalizeValue_(record.lead_id)]?.status || "not_created",
      students: liveStudentRecords
        .filter((student) => normalizeValue_(student.lead_id) === normalizeValue_(record.lead_id) ||
          normalizeEmail_(student.parent_email) === normalizeEmail_(record.email))
        .filter((student) => normalizeValue_(student.status) === "active")
        .map(sanitizeStudentForPortal_),
      relationship_history: buildParentRelationshipHistory_(record, {
        sessions: liveSessionRecords,
        notes: sessionNoteRecords,
        payments: livePaymentRecords,
        feedback: liveFeedbackRecords,
        messages: liveMessageRecords,
        requests: liveRequestRecords,
      }),
    }))
    .reverse();
  const tutorRecords = liveTutorSourceRecords
    .map((record) => ({
      tutor_id: record.tutor_id,
      tutor_name: record.tutor_name,
      status: record.status,
      subjects: record.subjects,
      levels: record.levels,
      formats: record.formats,
      zones: record.zones,
      languages: record.languages,
      weekly_capacity: record.weekly_capacity,
      active_students: record.active_students,
      available_slots: record.available_slots,
      calendar_email: record.calendar_email,
      calendar_id: record.calendar_id,
      hourly_rate_cad: record.hourly_rate_cad,
      notes: record.notes,
      access_status: tutorAccessById[normalizeValue_(record.tutor_id)]?.status || "not_invited",
    }))
    .sort((a, b) => {
      const activeOrder = Number(normalizeValue_(b.status) === "active") - Number(normalizeValue_(a.status) === "active");
      return activeOrder || String(a.tutor_name).localeCompare(String(b.tutor_name));
    });
  const tutors = tutorRecords.filter((record) => normalizeValue_(record.status) === "active");
  const sessions = liveSessionRecords
    .sort((a, b) => String(a.start_at).localeCompare(String(b.start_at)))
    .slice(-100)
    .reverse()
    .map(sanitizeSessionForOperator_);
  const requests = liveRequestRecords
    .filter((record) => ["new", "in_review"].includes(normalizeValue_(record.status)))
    .slice(-40)
    .reverse();
  const feedback = liveFeedbackRecords
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  const ratedFeedback = feedback.filter((record) => Number(record.rating) >= 1 && Number(record.rating) <= 5);
  const messages = liveMessageRecords
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  const activePaymentLinks = paymentLinkRecords
    .filter((record) => normalizeValue_(record.status) === "active")
    .map((record) => ({
      offer: record.offer,
      amount_cad: record.amount_cad,
      stripe_payment_link: record.stripe_payment_link,
    }));
  const planById = planSourceRecords.reduce((all, plan) => {
    all[normalizeValue_(plan.plan_id)] = plan;
    return all;
  }, {});
  const plans = planSourceRecords
    .filter((plan) => normalizeValue_(plan.status) === "active")
    .map(sanitizePlanForPortal_);
  const planEnrollments = planEnrollmentSourceRecords
    .filter((record) => !isTestRecord_(record))
    .map((record) => sanitizePlanEnrollmentForPortal_(
      record,
      planById[normalizeValue_(record.plan_id)] || null,
      buildEnrollmentCreditSummary_(spreadsheet, record.enrollment_id),
      buildPlanModificationWindow_(spreadsheet, record),
    ))
    .sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));
  const creditLedger = creditLedgerSourceRecords
    .filter((record) => !isTestRecord_(record))
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, 120)
    .map(sanitizeCreditLedgerForOperator_);
  const workQueues = buildOperatorWorkQueues_({
    parentCandidates,
    sessionRecords: liveSessionRecords,
    sessionNoteRecords,
    paymentRecords: livePaymentRecords,
    messageRecords: liveMessageRecords,
  });

  return {
    profile: {
      role: "operator",
      email: access.email,
      name: access.display_name || "Equipe Methode Secondaire",
    },
    metrics: {
      parents: parentCandidates.length,
      callbacks_to_make: parentCandidates.filter((record) => normalizeValue_(record.lead_status) === "callback_needed").length,
      active_tutors: tutors.length,
      sessions_to_confirm: sessions.filter((record) => ["requested", "proposed"].includes(record.session_status)).length,
      payments_due: livePaymentRecords
        .filter((record) => ["payment_requested", "overdue"].includes(normalizeValue_(record.payment_status))).length,
      parent_feedback: feedback.length,
      messages_needing_reply: messages.filter((record) => ["awaiting_reply", "overdue_alerted"].includes(normalizeValue_(record.message_status))).length,
      average_rating: ratedFeedback.length
        ? (ratedFeedback.reduce((total, record) => total + Number(record.rating), 0) / ratedFeedback.length).toFixed(1)
        : "-",
      active_plan_enrollments: planEnrollments.filter((record) => normalizeValue_(record.status) === "active").length,
      credits_remaining: planEnrollments.reduce((total, record) => total + Number(record.credits_remaining || 0), 0),
    },
    parent_candidates: parentCandidates,
    tutors,
    tutor_records: tutorRecords,
    payment_links: activePaymentLinks,
    plans,
    plan_enrollments: planEnrollments,
    credit_ledger: creditLedger,
    work_queues: workQueues,
    today: buildOperatorToday_(parentCandidates, liveSessionRecords),
    automation: {
      reminder_cadence_minutes: 15,
      calendar_flow: "on_confirmation",
      daily_digest_hour: `${TEAM_DAILY_DIGEST_HOUR}:${String(TEAM_DAILY_DIGEST_MINUTE).padStart(2, "0")}`,
      payment_mode: activePaymentLinks.length ? "stripe_links" : "demo",
    },
    sessions,
    requests,
    parent_feedback: feedback.slice(0, 30).map(sanitizeParentFeedbackForPortal_),
    test_data: buildTestDataForOperator_({
      parent_leads: leadRecords,
      tutors: tutorSourceRecords,
      sessions: sessionRecords,
      payments: paymentRecords,
      feedback: feedbackRecords,
      requests: requestRecords,
    }),
    messages: messages
      .slice(0, 60)
      .map(sanitizePortalMessageForPortal_),
  };
}

function buildOperatorWorkQueues_(records) {
  const noteSessionIds = new Set(records.sessionNoteRecords
    .map((record) => normalizeValue_(record.session_id))
    .filter(Boolean));
  const isOperationalRecord = (record) => !isTestRecord_(record);
  const buildItem = (id, title, detail, status, href) => ({
    id: normalizeValue_(id),
    title: normalizeValue_(title) || "A confirmer",
    detail: normalizeValue_(detail),
    status: normalizeValue_(status),
    href: normalizeValue_(href),
  });

  return {
    callbacks: records.parentCandidates
      .filter(isOperationalRecord)
      .filter((record) => normalizeValue_(record.lead_status) === "callback_needed")
      .sort(compareLeadUrgency_)
      .slice(0, 12)
      .map((record) => buildItem(
        record.lead_id,
        record.parent_name || record.email,
        record.student_level_subject || record.main_concern,
        record.lead_status,
        record.phone ? `tel:${record.phone}` : "",
      )),
    matching: records.parentCandidates
      .filter(isOperationalRecord)
      .filter((record) => ["ready_to_match", "matched"].includes(normalizeValue_(record.lead_status)))
      .filter((record) => !normalizeValue_(record.assigned_tutor))
      .sort(compareLeadUrgency_)
      .slice(0, 12)
      .map((record) => buildItem(
        record.lead_id,
        record.parent_name || record.email,
        record.student_level_subject || record.main_concern,
        "ready_to_match",
        "",
      )),
    confirmations: records.sessionRecords
      .filter(isOperationalRecord)
      .filter((record) => ["requested", "proposed"].includes(normalizeValue_(record.session_status)))
      .sort((a, b) => compareDateValues_(a.start_at, b.start_at))
      .slice(0, 12)
      .map((record) => buildItem(
        record.session_id,
        record.parent_name || record.student_name,
        `${formatDateForEmail_(record.start_at)} | ${record.tutor_name || "Tuteur a confirmer"}`,
        record.session_status,
        "",
      )),
    calendar: records.sessionRecords
      .filter(isOperationalRecord)
      .filter((record) => normalizeValue_(record.session_status) === "confirmed")
      .filter((record) => !normalizeValue_(record.google_calendar_event_id))
      .sort((a, b) => compareDateValues_(a.start_at, b.start_at))
      .slice(0, 12)
      .map((record) => buildItem(
        record.session_id,
        record.parent_name || record.student_name,
        `${formatDateForEmail_(record.start_at)} | ${record.tutor_name || "Tuteur a confirmer"}`,
        "calendar_sync",
        "",
      )),
    notes: records.sessionRecords
      .filter(isOperationalRecord)
      .filter((record) => !["cancelled", "no_show"].includes(normalizeValue_(record.session_status)))
      .filter((record) => {
        const endedAt = coerceDate_(record.end_at);
        return endedAt && endedAt.getTime() <= Date.now() - 2 * 60 * 60 * 1000;
      })
      .filter((record) => !noteSessionIds.has(normalizeValue_(record.session_id)))
      .sort((a, b) => compareDateValues_(a.end_at, b.end_at))
      .slice(0, 12)
      .map((record) => buildItem(
        record.session_id,
        record.tutor_name || "Tuteur a confirmer",
        `${record.parent_name || record.student_name || "Parent a confirmer"} | ${formatDateForEmail_(record.start_at)}`,
        "note_due",
        "",
      )),
    payments: records.paymentRecords
      .filter(isOperationalRecord)
      .filter((record) => ["payment_requested", "overdue"].includes(normalizeValue_(record.payment_status)))
      .sort((a, b) => compareDateValues_(a.due_date || a.created_at, b.due_date || b.created_at))
      .slice(0, 12)
      .map((record) => buildItem(
        record.payment_id,
        record.parent_name || record.email,
        `${record.amount_cad || ""} $ | ${normalizeValue_(record.offer || "session")}`,
        record.payment_status,
        "",
      )),
    messages: records.messageRecords
      .filter(isOperationalRecord)
      .filter((record) => ["awaiting_reply", "overdue_alerted"].includes(normalizeValue_(record.message_status)))
      .sort((a, b) => compareDateValues_(a.reply_due_at || a.created_at, b.reply_due_at || b.created_at))
      .slice(0, 12)
      .map((record) => buildItem(
        record.message_id,
        record.sender_name || normalizeValue_(record.sender_role) || "Message",
        record.message,
        record.message_status,
        "",
      )),
  };
}

function buildTestDataForOperator_(recordsByType) {
  const records = [];
  const addRecords = (sourceRecords, recordType, idColumn, buildLabel) => {
    sourceRecords
      .filter(isTestRecord_)
      .forEach((record) => {
        const recordId = normalizeValue_(record[idColumn]);
        if (!recordId) {
          return;
        }

        records.push({
          record_type: recordType,
          record_id: recordId,
          label: buildLabel(record),
          created_at: record.created_at || record.received_at || record.updated_at || "",
        });
      });
  };

  addRecords(recordsByType.parent_leads, "parent_lead", "lead_id", (record) =>
    `${record.parent_name || "Parent"} | ${record.email || record.lead_id}`);
  addRecords(recordsByType.tutors, "tutor", "tutor_id", (record) =>
    `${record.tutor_name || "Tuteur"} | ${record.calendar_email || record.tutor_id}`);
  addRecords(recordsByType.sessions, "session", "session_id", (record) =>
    `${record.parent_name || "Parent"} | ${record.tutor_name || "Tuteur"} | ${record.start_at || record.session_id}`);
  addRecords(recordsByType.payments, "payment", "payment_id", (record) =>
    `${record.parent_name || "Parent"} | ${record.amount_cad || ""} $`);
  addRecords(recordsByType.feedback, "feedback", "feedback_id", (record) =>
    `${record.parent_name || "Parent"} | ${record.rating || "-"}/5`);
  addRecords(recordsByType.requests, "request", "request_id", (record) =>
    `${record.subject || record.request_type || "Demande"} | ${record.email || record.request_id}`);

  return records
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, 200);
}

function isTestRecord_(record) {
  const source = record || {};
  const explicitFlags = [
    source.is_test,
    source.test_record,
    source.test_data,
    source.environment,
    source.data_classification,
    source.tag,
    source.tags,
  ].map(normalizeValue_).join(" ").toLowerCase();
  const identityFields = [
    source.parent_name,
    source.tutor_name,
    source.student_name,
    source.sender_name,
    source.display_name,
    source.email,
    source.parent_email,
    source.tutor_email,
    source.calendar_email,
    source.subject,
    source.offer,
    source.request_type,
  ].map(normalizeValue_).join(" ").toLowerCase();
  const testMarker = /(^|[^a-z])(test|demo|example|sample|mock|fake|essai|qa)([^a-z]|$)/;
  const keyboardMarker = /(^|[^a-z])(asdasd|asdf|qwerty)([^a-z]|$)/;
  return testMarker.test(explicitFlags) ||
    testMarker.test(identityFields) ||
    keyboardMarker.test(identityFields) ||
    /@example\.(com|org|net)/.test(identityFields);
}

function deleteTestRecord_(spreadsheet, recordType, recordId) {
  const definitions = {
    parent_lead: { sheetName: CRM_SHEET_NAME, columns: CRM_COLUMNS, idColumn: "lead_id" },
    tutor: { sheetName: CRM_TUTOR_SHEET_NAME, columns: TUTOR_COLUMNS, idColumn: "tutor_id" },
    session: { sheetName: CRM_SESSION_SHEET_NAME, columns: SESSION_COLUMNS, idColumn: "session_id" },
    payment: { sheetName: CRM_PAYMENT_SHEET_NAME, columns: PAYMENT_COLUMNS, idColumn: "payment_id" },
    feedback: { sheetName: CRM_PARENT_FEEDBACK_SHEET_NAME, columns: PARENT_FEEDBACK_COLUMNS, idColumn: "feedback_id" },
    request: { sheetName: CRM_PORTAL_REQUEST_SHEET_NAME, columns: PORTAL_REQUEST_COLUMNS, idColumn: "request_id" },
  };
  const definition = definitions[recordType];
  if (!definition) {
    return { ok: false, code: "TEST_RECORD_REQUIRED" };
  }

  const sheet = getOrCreateSheet_(spreadsheet, definition.sheetName);
  const target = findSheetRecordById_(sheet, definition.columns, definition.idColumn, recordId);
  if (!target || !isTestRecord_(target.data)) {
    return { ok: false, code: "TEST_RECORD_NOT_FOUND" };
  }

  if (recordType === "parent_lead") {
    return deleteTestParentLead_(spreadsheet, target.data);
  }
  if (recordType === "tutor") {
    return deleteTestTutor_(spreadsheet, target.data);
  }
  if (recordType === "session") {
    return deleteTestSessions_(spreadsheet, new Set([normalizeValue_(target.data.session_id)]));
  }

  sheet.deleteRow(target.rowNumber);
  return { ok: true, deleted: 1 };
}

function deleteTestParentLead_(spreadsheet, lead) {
  return deleteParentLeadCascade_(spreadsheet, lead);
}

function deleteParentLeadCascade_(spreadsheet, lead) {
  const leadId = normalizeValue_(lead.lead_id);
  const email = normalizeEmail_(lead.email);
  const sessionRecords = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .filter((record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === email);
  const sessionIds = new Set(sessionRecords.map((record) => normalizeValue_(record.session_id)).filter(Boolean));
  const sessionDeletion = deleteTestSessions_(spreadsheet, sessionIds);
  if (!sessionDeletion.ok) return sessionDeletion;
  let deleted = sessionDeletion.deleted;

  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME), PAYMENT_COLUMNS, (record) =>
    normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.email) === email);
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_PARENT_FEEDBACK_SHEET_NAME), PARENT_FEEDBACK_COLUMNS, (record) =>
    normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === email);
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_PORTAL_MESSAGE_SHEET_NAME), PORTAL_MESSAGE_COLUMNS, (record) =>
    normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === email);
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_PORTAL_REQUEST_SHEET_NAME), PORTAL_REQUEST_COLUMNS, (record) =>
    normalizeValue_(record.related_id) === leadId || normalizeEmail_(record.email) === email);
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME), PORTAL_ACCESS_COLUMNS, (record) =>
    normalizeValue_(record.related_id) === leadId || normalizeEmail_(record.email) === email);
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_STUDENT_SHEET_NAME), STUDENT_COLUMNS, (record) =>
    normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === email);
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME), CRM_COLUMNS, (record) =>
    normalizeValue_(record.lead_id) === leadId);

  return { ok: true, deleted };
}

function deleteTestTutor_(spreadsheet, tutor) {
  return deleteTutorCascade_(spreadsheet, tutor);
}

function deleteTutorCascade_(spreadsheet, tutor) {
  const tutorId = normalizeValue_(tutor.tutor_id);
  const email = normalizeEmail_(tutor.calendar_email);
  const sessionRecords = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .filter((record) => normalizeValue_(record.tutor_id) === tutorId || normalizeEmail_(record.tutor_calendar_email) === email);
  const sessionIds = new Set(sessionRecords.map((record) => normalizeValue_(record.session_id)).filter(Boolean));
  const sessionDeletion = deleteTestSessions_(spreadsheet, sessionIds);
  if (!sessionDeletion.ok) return sessionDeletion;
  let deleted = sessionDeletion.deleted;

  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_TUTOR_AVAILABILITY_SHEET_NAME), AVAILABILITY_COLUMNS, (record) =>
    normalizeValue_(record.tutor_id) === tutorId);
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME), PORTAL_ACCESS_COLUMNS, (record) =>
    normalizeValue_(record.related_id) === tutorId || normalizeEmail_(record.email) === email);
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_TUTOR_SHEET_NAME), TUTOR_COLUMNS, (record) =>
    normalizeValue_(record.tutor_id) === tutorId);

  getSheetRecordsFromSheet_(getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME), CRM_COLUMNS)
    .filter((record) => assignedTutorIdForLead_(record.data) === tutorId)
    .forEach((record) => writeRecord_(getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME), CRM_COLUMNS, record.rowNumber, {
      ...record.data,
      assigned_tutor: "",
      crm_stage: "ready_to_match",
      lead_status: "ready_to_match",
      next_action: "assign_tutor",
      first_session_date: "",
    }));

  getSheetRecordsFromSheet_(getOrCreateSheet_(spreadsheet, CRM_STUDENT_SHEET_NAME), STUDENT_COLUMNS)
    .filter((record) => normalizeValue_(record.data.assigned_tutor_id) === tutorId)
    .forEach((record) => writeRecord_(getOrCreateSheet_(spreadsheet, CRM_STUDENT_SHEET_NAME), STUDENT_COLUMNS, record.rowNumber, {
      ...record.data,
      assigned_tutor_id: "",
      assigned_tutor_name: "",
      updated_at: new Date().toISOString(),
    }));

  return { ok: true, deleted };
}

function deleteTestSessions_(spreadsheet, sessionIds) {
  if (!sessionIds || !sessionIds.size) {
    return { ok: true, deleted: 0 };
  }

  const sessionRecords = getSheetRecordsFromSheet_(
    getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME),
    SESSION_COLUMNS,
  ).filter((record) => sessionIds.has(normalizeValue_(record.data.session_id)));
  const calendarDeletion = sessionRecords
    .map((record) => cancelCalendarEventForSession_(record.data))
    .find((result) => !result.ok);
  if (calendarDeletion) {
    return { ok: false, code: calendarDeletion.code || "CALENDAR_DELETE_FAILED", deleted: 0 };
  }

  let deleted = deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME), PAYMENT_COLUMNS, (record) =>
    sessionIds.has(normalizeValue_(record.session_id)));
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_SESSION_NOTE_SHEET_NAME), SESSION_NOTE_COLUMNS, (record) =>
    sessionIds.has(normalizeValue_(record.session_id)));
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_PARENT_FEEDBACK_SHEET_NAME), PARENT_FEEDBACK_COLUMNS, (record) =>
    sessionIds.has(normalizeValue_(record.session_id)));
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_PORTAL_MESSAGE_SHEET_NAME), PORTAL_MESSAGE_COLUMNS, (record) =>
    sessionIds.has(normalizeValue_(record.session_id)));
  deleted += deleteMatchingSheetRecords_(getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME), SESSION_COLUMNS, (record) =>
    sessionIds.has(normalizeValue_(record.session_id)));

  return { ok: true, deleted };
}

function deleteMatchingSheetRecords_(sheet, columns, predicate) {
  const matches = getSheetRecordsFromSheet_(sheet, columns)
    .filter((record) => predicate(record.data))
    .sort((a, b) => b.rowNumber - a.rowNumber);
  matches.forEach((record) => sheet.deleteRow(record.rowNumber));
  return matches.length;
}

function buildParentSessionNotes_(spreadsheet, parentEmail) {
  const sessions = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .filter((record) => normalizeEmail_(record.parent_email) === parentEmail);
  const allowedSessionIds = new Set(sessions.map((session) => normalizeValue_(session.session_id)).filter(Boolean));
  const allowedLeadIds = new Set(sessions.map((session) => normalizeValue_(session.lead_id)).filter(Boolean));

  return getSheetRecords_(spreadsheet, CRM_SESSION_NOTE_SHEET_NAME, SESSION_NOTE_COLUMNS)
    .filter((note) => allowedSessionIds.has(normalizeValue_(note.session_id)) || allowedLeadIds.has(normalizeValue_(note.lead_id)))
    .filter((note) => ["ready_to_send", "sent"].includes(normalizeValue_(note.parent_update_status)))
    .map(sanitizeSessionNoteForPortal_);
}

function buildPortalMessagesForAccess_(spreadsheet, access) {
  const email = normalizeEmail_(access.email);
  const tutorId = normalizeValue_(access.related_id);
  const sessions = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .filter((session) => access.role === "parent"
      ? normalizeEmail_(session.parent_email) === email
      : normalizeValue_(session.tutor_id) === tutorId || normalizeEmail_(session.tutor_calendar_email) === email);
  const sessionIds = new Set(sessions.map((session) => normalizeValue_(session.session_id)).filter(Boolean));

  return getSheetRecords_(spreadsheet, CRM_PORTAL_MESSAGE_SHEET_NAME, PORTAL_MESSAGE_COLUMNS)
    .filter((message) => sessionIds.has(normalizeValue_(message.session_id)))
    .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))
    .slice(-60)
    .map(sanitizePortalMessageForPortal_);
}

function findPortalIdentity_(spreadsheet, role, email) {
  if (role === "operator") {
    return PORTAL_OPERATOR_EMAILS.includes(email)
      ? {
          role,
          email,
          display_name: "Equipe Methode Secondaire",
          related_id: "operator",
        }
      : null;
  }

  if (role === "tutor") {
    const tutor = getSheetRecords_(spreadsheet, CRM_TUTOR_SHEET_NAME, TUTOR_COLUMNS)
      .find((record) => normalizeEmail_(record.calendar_email) === email && normalizeValue_(record.status) === "active");

    return tutor
      ? {
          role,
          email,
          display_name: normalizeValue_(tutor.tutor_name) || email,
          related_id: normalizeValue_(tutor.tutor_id),
        }
      : null;
  }

  const lead = getSheetRecords_(spreadsheet, CRM_SHEET_NAME, CRM_COLUMNS)
    .reverse()
    .find((record) => normalizeEmail_(record.email) === email);
  const session = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .reverse()
    .find((record) => normalizeEmail_(record.parent_email) === email);
  const payment = getSheetRecords_(spreadsheet, CRM_PAYMENT_SHEET_NAME, PAYMENT_COLUMNS)
    .reverse()
    .find((record) => normalizeEmail_(record.email) === email);

  const source = lead || session || payment;
  if (!source) {
    return null;
  }

  return {
    role,
    email,
    display_name: normalizeValue_(source.parent_name) || email,
    related_id: normalizeValue_(source.lead_id) || normalizeValue_(session?.lead_id) || normalizeValue_(payment?.lead_id),
  };
}

function findPortalAccess_(sheet, role, email) {
  return getSheetRecordsFromSheet_(sheet, PORTAL_ACCESS_COLUMNS)
    .find((record) => normalizeValue_(record.data.role) === role && normalizeEmail_(record.data.email) === email) || null;
}

function verifyPortalSession_(spreadsheet, token, expectedRole) {
  const rawToken = normalizeValue_(token);
  const role = expectedRole ? normalizePortalRole_(expectedRole) : "";

  if (!rawToken) {
    return { ok: false, code: "PORTAL_SESSION_REQUIRED" };
  }

  const tokenHash = hashValue_(rawToken);
  const accessSheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME);
  setupPortalAccessSheet_(accessSheet);
  const access = getSheetRecordsFromSheet_(accessSheet, PORTAL_ACCESS_COLUMNS)
    .find((record) => {
      if (role && normalizeValue_(record.data.role) !== role) {
        return false;
      }

      return normalizeValue_(record.data.session_token_hash) === tokenHash;
    });

  if (!access || access.data.status !== "active") {
    return { ok: false, code: "PORTAL_SESSION_INVALID" };
  }

  const expiresAt = coerceDate_(access.data.session_expires_at);
  if (!expiresAt || expiresAt.getTime() < Date.now()) {
    return { ok: false, code: "PORTAL_SESSION_EXPIRED" };
  }

  return { ok: true, access: access.data };
}

function findSessionForTutor_(spreadsheet, access, sessionId) {
  const tutorId = normalizeValue_(access.related_id);
  const email = normalizeEmail_(access.email);

  return getSheetRecordsFromSheet_(getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME), SESSION_COLUMNS)
    .find((record) => {
      return normalizeValue_(record.data.session_id) === sessionId &&
        (normalizeValue_(record.data.tutor_id) === tutorId || normalizeEmail_(record.data.tutor_calendar_email) === email);
    }) || null;
}

function findSessionForPortalAccess_(spreadsheet, access, sessionId) {
  const email = normalizeEmail_(access.email);
  const tutorId = normalizeValue_(access.related_id);

  return getSheetRecordsFromSheet_(getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME), SESSION_COLUMNS)
    .find((record) => {
      if (normalizeValue_(record.data.session_id) !== sessionId) {
        return false;
      }

      return access.role === "parent"
        ? normalizeEmail_(record.data.parent_email) === email
        : normalizeValue_(record.data.tutor_id) === tutorId || normalizeEmail_(record.data.tutor_calendar_email) === email;
    }) || null;
}

function findParentRecordByEmail_(spreadsheet, email) {
  const normalizedEmail = normalizeEmail_(email);
  const lead = getSheetRecords_(spreadsheet, CRM_SHEET_NAME, CRM_COLUMNS)
    .reverse()
    .find((record) => normalizeEmail_(record.email) === normalizedEmail);

  if (lead) {
    return lead;
  }

  const previousSession = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .reverse()
    .find((record) => normalizeEmail_(record.parent_email) === normalizedEmail);

  return previousSession
    ? {
        lead_id: previousSession.lead_id,
        parent_name: previousSession.parent_name,
        email: normalizedEmail,
        student_level_subject: previousSession.student_level_subject,
        format: previousSession.format,
      }
    : null;
}

function findActiveTutorById_(spreadsheet, tutorId) {
  return getSheetRecords_(spreadsheet, CRM_TUTOR_SHEET_NAME, TUTOR_COLUMNS)
    .find((record) => normalizeValue_(record.tutor_id) === normalizeValue_(tutorId) && normalizeValue_(record.status) === "active") || null;
}

function assignTutorToParentLead_(spreadsheet, leadId, tutor, options) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  const leadRecord = findSheetRecordById_(sheet, CRM_COLUMNS, "lead_id", leadId);
  if (!leadRecord || !tutor) {
    return null;
  }

  const next = {
    ...leadRecord.data,
    assigned_tutor: [normalizeValue_(tutor.tutor_name), normalizeValue_(tutor.tutor_id)].filter(Boolean).join(" | "),
    crm_stage: normalizeAllowed_(options?.crm_stage, CRM_STAGE_OPTIONS, leadRecord.data.crm_stage),
    lead_status: normalizeAllowed_(options?.lead_status, LEAD_STATUS_OPTIONS, leadRecord.data.lead_status),
    next_action: normalizeAllowed_(options?.next_action, NEXT_ACTION_OPTIONS,
      normalizeValue_(options?.crm_stage) === "matched" ? "book_first_session" : leadRecord.data.next_action),
    first_session_date: normalizeValue_(options?.first_session_date) || leadRecord.data.first_session_date,
  };
  writeRecord_(sheet, CRM_COLUMNS, leadRecord.rowNumber, next);
  return next;
}

function markParentLeadSessionBooked_(spreadsheet, leadId, firstSessionDate) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  const leadRecord = findSheetRecordById_(sheet, CRM_COLUMNS, "lead_id", leadId);
  if (!leadRecord) {
    return null;
  }

  const next = {
    ...leadRecord.data,
    crm_stage: "first_session_booked",
    lead_status: "booked",
    next_action: "send_session_summary",
    first_session_date: normalizeValue_(firstSessionDate) || leadRecord.data.first_session_date,
  };
  writeRecord_(sheet, CRM_COLUMNS, leadRecord.rowNumber, next);
  return next;
}

function assignedTutorIdForLead_(lead) {
  const assignment = normalizeValue_(lead?.assigned_tutor);
  return assignment ? assignment.split("|").pop().trim() : "";
}

function assignedTutorIdForStudent_(student) {
  return normalizeValue_(student?.assigned_tutor_id);
}

function syncParentReferences_(spreadsheet, leadId, previousEmail, lead, options) {
  const resetPortalSession = !options || options.resetPortalSession !== false;
  const nextEmail = normalizeEmail_(lead.email);
  const parentName = normalizeValue_(lead.parent_name);
  const updateRows = (sheetName, columns, predicate, transform) => {
    const sheet = getOrCreateSheet_(spreadsheet, sheetName);
    getSheetRecordsFromSheet_(sheet, columns)
      .filter((record) => predicate(record.data))
      .forEach((record) => writeRecord_(sheet, columns, record.rowNumber, transform(record.data)));
  };

  updateRows(CRM_SESSION_SHEET_NAME, SESSION_COLUMNS,
    (record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === previousEmail,
    (record) => ({ ...record, parent_name: parentName, parent_email: nextEmail, updated_at: new Date().toISOString() }));

  updateRows(CRM_STUDENT_SHEET_NAME, STUDENT_COLUMNS,
    (record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === previousEmail,
    (record) => ({ ...record, lead_id: leadId, parent_email: nextEmail, updated_at: new Date().toISOString() }));
  updateRows(CRM_PAYMENT_SHEET_NAME, PAYMENT_COLUMNS,
    (record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.email) === previousEmail,
    (record) => ({ ...record, parent_name: parentName, email: nextEmail, updated_at: new Date().toISOString() }));
  updateRows(CRM_SESSION_NOTE_SHEET_NAME, SESSION_NOTE_COLUMNS,
    (record) => normalizeValue_(record.lead_id) === leadId,
    (record) => ({ ...record, parent_name: parentName, updated_at: new Date().toISOString() }));
  updateRows(CRM_PARENT_FEEDBACK_SHEET_NAME, PARENT_FEEDBACK_COLUMNS,
    (record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === previousEmail,
    (record) => ({ ...record, parent_name: parentName, parent_email: nextEmail, updated_at: new Date().toISOString() }));
  updateRows(CRM_PORTAL_REQUEST_SHEET_NAME, PORTAL_REQUEST_COLUMNS,
    (record) => normalizeValue_(record.related_id) === leadId || normalizeEmail_(record.email) === previousEmail,
    (record) => ({ ...record, email: nextEmail, updated_at: new Date().toISOString() }));
  updateRows(CRM_PORTAL_MESSAGE_SHEET_NAME, PORTAL_MESSAGE_COLUMNS,
    (record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === previousEmail,
    (record) => ({ ...record, parent_email: nextEmail }));
  updateRows(CRM_PLAN_ENROLLMENT_SHEET_NAME, PLAN_ENROLLMENT_COLUMNS,
    (record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === previousEmail,
    (record) => ({ ...record, parent_email: nextEmail, updated_at: new Date().toISOString() }));
  updateRows(CRM_CREDIT_LEDGER_SHEET_NAME, CREDIT_LEDGER_COLUMNS,
    (record) => normalizeEmail_(record.parent_email) === previousEmail,
    (record) => ({ ...record, parent_email: nextEmail }));

  const accessSheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_ACCESS_SHEET_NAME);
  getSheetRecordsFromSheet_(accessSheet, PORTAL_ACCESS_COLUMNS)
    .filter((record) => normalizeValue_(record.data.role) === "parent" &&
      (normalizeValue_(record.data.related_id) === leadId || normalizeEmail_(record.data.email) === previousEmail))
    .forEach((record) => writeRecord_(accessSheet, PORTAL_ACCESS_COLUMNS, record.rowNumber, {
      ...record.data,
      email: nextEmail,
      display_name: parentName,
      related_id: leadId,
      code_hash: resetPortalSession ? "" : record.data.code_hash,
      code_expires_at: resetPortalSession ? "" : record.data.code_expires_at,
      session_token_hash: resetPortalSession ? "" : record.data.session_token_hash,
      session_expires_at: resetPortalSession ? "" : record.data.session_expires_at,
      updated_at: new Date().toISOString(),
    }));
}

function notifyPortalMessageRecipient_(message) {
  const isParentSender = normalizeValue_(message.sender_role) === "parent";
  const recipient = normalizeEmail_(isParentSender ? message.tutor_email : message.parent_email);
  if (!recipient) {
    return "portal_only";
  }

  try {
    MailApp.sendEmail(
      recipient,
      "Nouveau message - Methode Secondaire",
      [
        "Bonjour,",
        "",
        `${message.sender_name || "Votre contact"} vous a ecrit dans le portail Methode Secondaire.`,
        "Connectez-vous au portail pour lire et repondre.",
        PORTAL_PUBLIC_URL,
        "",
        "Methode Secondaire",
      ].join("\n"),
    );
    return "email_notified";
  } catch (error) {
    return "portal_only";
  }
}

function resolveSessionPaymentDetails_(spreadsheet, session) {
  const directLink = normalizeValue_(session.payment_link);
  const directAmount = normalizeValue_(session.amount_cad);
  const sessionType = normalizeAllowed_(session.session_type, SESSION_TYPE_OPTIONS, "one_time");
  const defaultAmount = defaultSessionAmountCad_(sessionType);
  if (directLink || directAmount) {
    return { payment_link: directLink, amount_cad: directAmount || defaultAmount };
  }

  const offer = sessionType;
  const paymentLink = getSheetRecords_(spreadsheet, CRM_PAYMENT_LINK_SHEET_NAME, PAYMENT_LINK_COLUMNS)
    .find((record) => normalizeValue_(record.status) === "active" && normalizeValue_(record.offer) === offer);

  return {
    payment_link: paymentLink ? normalizeValue_(paymentLink.stripe_payment_link) : "",
    amount_cad: paymentLink ? normalizeValue_(paymentLink.amount_cad) || defaultAmount : defaultAmount,
  };
}

function defaultSessionAmountCad_(sessionType) {
  const type = normalizeAllowed_(sessionType, SESSION_TYPE_OPTIONS, "one_time");
  return DEFAULT_SESSION_PRICE_CAD[type] || DEFAULT_SESSION_PRICE_CAD.one_time;
}

function buildBookableSlots_(spreadsheet, daysAhead) {
  const availability = getSheetDisplayRecords_(spreadsheet, CRM_TUTOR_AVAILABILITY_SHEET_NAME, AVAILABILITY_COLUMNS)
    .map((record) => record.data)
    .filter((record) => ["open", "limited"].includes(normalizeValue_(record.status)));
  const tutors = getSheetRecords_(spreadsheet, CRM_TUTOR_SHEET_NAME, TUTOR_COLUMNS)
    .filter((record) => normalizeValue_(record.status) === "active")
    .reduce((all, tutor) => {
      all[normalizeValue_(tutor.tutor_id)] = tutor;
      return all;
    }, {});
  const sessions = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .filter((record) => !["cancelled", "no_show"].includes(normalizeValue_(record.session_status)));
  const now = new Date();
  const slots = [];
  const maxDays = Math.max(1, Math.min(42, Number(daysAhead) || 21));

  availability.forEach((availabilityRecord) => {
    const tutorId = normalizeValue_(availabilityRecord.tutor_id);
    const tutor = tutors[tutorId];
    const timezone = normalizeValue_(availabilityRecord.timezone) || "America/Toronto";
    const startTime = normalizeAvailabilityTime_(availabilityRecord.start_time);
    const endTime = normalizeAvailabilityTime_(availabilityRecord.end_time);
    if (!tutor || !startTime || !endTime || !normalizeValue_(availabilityRecord.weekday)) {
      return;
    }

    for (let dayOffset = 0; dayOffset <= maxDays; dayOffset += 1) {
      const day = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      if (weekdayForDate_(day, timezone) !== normalizeValue_(availabilityRecord.weekday)) {
        continue;
      }

      const dateKey = Utilities.formatDate(day, timezone, "yyyy-MM-dd");
      let cursor = createDateAtLocalTime_(dateKey, startTime, timezone);
      const endAt = createDateAtLocalTime_(dateKey, endTime, timezone);
      if (!cursor || !endAt || cursor.getTime() >= endAt.getTime()) {
        continue;
      }

      while (cursor.getTime() + 60 * 60 * 1000 <= endAt.getTime()) {
        const slotEnd = new Date(cursor.getTime() + 60 * 60 * 1000);
        const isPastOrImmediate = cursor.getTime() < now.getTime() + 15 * 60 * 1000;
        const hasConflict = sessions.some((session) => {
          if (normalizeValue_(session.tutor_id) !== tutorId) {
            return false;
          }

          const sessionStart = coerceDate_(session.start_at);
          const sessionEnd = coerceDate_(session.end_at);
          return sessionStart && sessionEnd && cursor.getTime() < sessionEnd.getTime() && slotEnd.getTime() > sessionStart.getTime();
        });

        if (!isPastOrImmediate && !hasConflict) {
          const startAt = cursor.toISOString();
          slots.push({
            slot_id: `${tutorId}::${startAt}`,
            tutor_id: tutorId,
            tutor_name: normalizeValue_(tutor.tutor_name) || normalizeValue_(availabilityRecord.tutor_name),
            tutor_calendar_email: normalizeEmail_(tutor.calendar_email),
            start_at: startAt,
            end_at: slotEnd.toISOString(),
            timezone,
            format: normalizeAllowed_(availabilityRecord.format, TUTOR_FORMAT_OPTIONS, normalizeAllowed_(tutor.formats, TUTOR_FORMAT_OPTIONS, "online")),
            location: normalizeValue_(availabilityRecord.location),
          });
        }

        cursor = slotEnd;
      }
    }
  });

  const uniqueSlots = slots.filter((slot, index, allSlots) =>
    allSlots.findIndex((candidate) => candidate.slot_id === slot.slot_id) === index);
  return uniqueSlots.sort((a, b) => String(a.start_at).localeCompare(String(b.start_at)));
}

function hasTutorSessionConflict_(spreadsheet, tutorId, startAt, endAt, excludeSessionId) {
  const start = coerceDate_(startAt);
  const end = coerceDate_(endAt);
  if (!tutorId || !start || !end || start.getTime() >= end.getTime()) {
    return true;
  }

  return getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .filter((session) => normalizeValue_(session.tutor_id) === normalizeValue_(tutorId))
    .filter((session) => normalizeValue_(session.session_id) !== normalizeValue_(excludeSessionId))
    .filter((session) => !["cancelled", "no_show"].includes(normalizeValue_(session.session_status)))
    .some((session) => {
      const sessionStart = coerceDate_(session.start_at);
      const sessionEnd = coerceDate_(session.end_at);
      return sessionStart && sessionEnd && start.getTime() < sessionEnd.getTime() && end.getTime() > sessionStart.getTime();
    });
}

function normalizeAvailabilityTime_(value) {
  const match = normalizeValue_(value).match(/(?:^|T|\s)(\d{1,2}):(\d{2})/);
  if (!match) {
    return "";
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) {
    return "";
  }

  return `${(`0${hours}`).slice(-2)}:${(`0${minutes}`).slice(-2)}`;
}

function availabilityTimesOverlap_(startA, endA, startB, endB) {
  return Boolean(startA && endA && startB && endB && startA < endB && endA > startB);
}

function createDateAtLocalTime_(dateKey, time, timezone) {
  try {
    return Utilities.parseDate(`${dateKey} ${time}`, timezone, "yyyy-MM-dd HH:mm");
  } catch (error) {
    return null;
  }
}

function weekdayForDate_(date, timezone) {
  const weekdayIndex = Number(Utilities.formatDate(date, timezone, "u"));
  return WEEKDAY_OPTIONS[weekdayIndex - 1] || "";
}

function markSessionCompleted_(spreadsheet, sessionRecord) {
  const status = normalizeValue_(sessionRecord.data.session_status);
  if (!["calendar_created", "confirmed", "proposed"].includes(status)) {
    return;
  }

  const completedSession = {
    ...sessionRecord.data,
    session_status: "completed",
    updated_at: new Date().toISOString(),
  };
  const sheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  writeRecord_(sheet, SESSION_COLUMNS, sessionRecord.rowNumber, completedSession);
  return consumePlanCreditReservationForSession_(spreadsheet, completedSession);
}

function settleCompletedPlanCreditReservations_(spreadsheet) {
  const sessionSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  const completedSessions = getSheetRecordsFromSheet_(sessionSheet, SESSION_COLUMNS)
    .filter((record) => normalizeValue_(record.data.session_status) === "completed")
    .filter((record) => normalizeValue_(record.data.credit_reservation_id));
  const errors = [];
  let consumed = 0;
  let alreadySettled = 0;

  completedSessions.forEach((record) => {
    const result = consumePlanCreditReservationForSession_(spreadsheet, record.data);
    if (!result.ok) {
      errors.push({ session_id: record.data.session_id, code: result.code || "PLAN_CREDIT_CONSUME_FAILED" });
      return;
    }
    if (result.consumed) {
      consumed += 1;
    } else if (result.already_settled) {
      alreadySettled += 1;
    }
  });

  return {
    ok: errors.length === 0,
    checked: completedSessions.length,
    consumed,
    already_settled: alreadySettled,
    errors,
  };
}

function proposeNextRecurringSession_(spreadsheet, sourceRecord, note) {
  const source = sourceRecord.data;
  const recommendation = normalizeValue_(note.next_recommendation);
  const attendance = normalizeValue_(note.attendance);
  const recurrenceWeeks = Math.max(1, Math.min(8, Number(source.recurrence_weeks) || 1));

  if (![
    "keep_weekly",
    "add_practice",
    "exam_sprint",
  ].includes(recommendation) || !["present", "late"].includes(attendance)) {
    return null;
  }

  const sourceStart = coerceDate_(source.start_at);
  const sourceEnd = coerceDate_(source.end_at);
  if (!sourceStart || !sourceEnd) {
    return null;
  }

  const upcoming = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS)
    .find((record) => {
      const startAt = coerceDate_(record.start_at);
      return normalizeEmail_(record.parent_email) === normalizeEmail_(source.parent_email) &&
        normalizeValue_(record.tutor_id) === normalizeValue_(source.tutor_id) &&
        normalizeValue_(record.session_id) !== normalizeValue_(source.session_id) &&
        !["cancelled", "no_show"].includes(normalizeValue_(record.session_status)) &&
        startAt && startAt.getTime() > sourceStart.getTime();
    });

  if (upcoming) {
    return null;
  }

  const duration = sourceEnd.getTime() - sourceStart.getTime();
  const nextStart = new Date(sourceStart.getTime());
  const interval = recurrenceWeeks * 7 * 24 * 60 * 60 * 1000;
  while (nextStart.getTime() <= Date.now() + 60 * 60 * 1000) {
    nextStart.setTime(nextStart.getTime() + interval);
  }

  const nextSessionType = recommendation === "exam_sprint" ? "exam_sprint" : "weekly_follow_up";
  const planBinding = resolvePlanSessionBinding_(spreadsheet, {
    plan_enrollment_id: source.plan_enrollment_id,
    parent_email: source.parent_email,
    student_id: source.student_id,
    tutor_id: source.tutor_id,
    session_type: nextSessionType,
  });
  // Never silently create a recurring session after its plan was paused,
  // cancelled, made ineligible, or exhausted.
  if (!planBinding.ok) {
    return null;
  }
  const coveredByCredit = planBinding.requires_credit;
  const paymentDetails = coveredByCredit
    ? { payment_link: "", amount_cad: "" }
    : resolveSessionPaymentDetails_(spreadsheet, { session_type: nextSessionType });
  const now = new Date().toISOString();
  const next = {
    ...source,
    session_id: createRecordId_("SESSION"),
    session_status: "proposed",
    session_type: nextSessionType,
    start_at: nextStart.toISOString(),
    end_at: new Date(nextStart.getTime() + duration).toISOString(),
    google_calendar_event_id: "",
    payment_status: coveredByCredit ? "not_requested" : (paymentDetails.payment_link ? "payment_requested" : "not_requested"),
    payment_link: coveredByCredit ? "" : paymentDetails.payment_link,
    amount_cad: coveredByCredit ? "" : (paymentDetails.amount_cad || defaultSessionAmountCad_(nextSessionType)),
    parent_confirmed_at: "",
    tutor_confirmed_at: "",
    calendar_invites_sent_at: "",
    recurring_from_session_id: source.session_id,
    plan_enrollment_id: planBinding.enrollment ? planBinding.enrollment.enrollment_id : "",
    modification_deadline_at: planBinding.enrollment
      ? planModificationDeadlineForSession_(nextStart, planBinding.cancellation_notice_hours)
      : "",
    cancellation_notice_hours: String(planBinding.enrollment
      ? planBinding.cancellation_notice_hours
      : SESSION_CANCELLATION_NOTICE_HOURS),
    credit_reservation_id: "",
    created_at: now,
    updated_at: now,
  };

  const schedulingLock = LockService.getScriptLock();
  if (!schedulingLock.tryLock(5000)) {
    return null;
  }
  let reservation = null;
  try {
    if (hasTutorSessionConflict_(spreadsheet, next.tutor_id, new Date(next.start_at), new Date(next.end_at))) {
      return null;
    }
    reservation = reservePlanCreditForSession_(spreadsheet, planBinding, next);
    if (reservation && !reservation.ok) {
      return null;
    }
    if (reservation?.reservation) {
      next.credit_reservation_id = reservation.reservation.credit_ledger_id;
      next.notes = [normalizeValue_(next.notes), "Pack credit reserved for this recurring session."].filter(Boolean).join(" | ");
    }
    const sheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
    sheet.appendRow(SESSION_COLUMNS.map((column) => next[column] || ""));
  } catch (error) {
    if (reservation?.reservation) {
      releasePlanCreditReservationForSession_(spreadsheet, next, "Credit released because the recurring session could not be created.");
    }
    return null;
  } finally {
    schedulingLock.releaseLock();
  }
  sendSessionProposalEmails_(next);
  return next;
}

function sendSessionProposalEmails_(session) {
  const when = formatDateForEmail_(session.start_at);
  const details = [
    session.student_level_subject || session.session_type,
    when,
    session.format || "",
  ].filter(Boolean).join(" | ");
  const recipientGroups = [
    { email: session.parent_email, greeting: session.parent_name || "Bonjour" },
    { email: session.tutor_calendar_email, greeting: session.tutor_name || "Bonjour" },
  ];

  recipientGroups.forEach((recipient) => {
    if (!normalizeEmail_(recipient.email)) {
      return;
    }

    MailApp.sendEmail(
      recipient.email,
      "Seance a confirmer - Methode Secondaire",
      `${recipient.greeting},\n\nUne seance est proposee: ${details}.\n\nConnectez-vous au portail Methode Secondaire pour confirmer ou demander un ajustement:\n${PORTAL_PUBLIC_URL}\n\nChahine\nMethode Secondaire`,
    );
  });
}

function sendPaymentRequestEmail_(payment) {
  const paymentUrl = getCheckoutPaymentUrl_(payment);
  if (!paymentUrl) {
    throw new Error("PAYMENT_CHECKOUT_URL_MISSING");
  }
  const isPlanPayment = Boolean(normalizeValue_(payment.plan_enrollment_id));
  MailApp.sendEmail(
    payment.email,
    isPlanPayment ? "Paiement de votre bloc - Methode Secondaire" : "Paiement de seance - Methode Secondaire",
    isPlanPayment
      ? `Bonjour ${payment.parent_name || ""},\n\nVotre demande de bloc est prete. Montant: ${payment.amount_cad || "a confirmer"} $. Les ${payment.credit_grant_count || ""} credits seront actives automatiquement apres verification du paiement.\n\nPaiement securise: ${paymentUrl}\n\nMerci,\nMethode Secondaire`
      : `Bonjour ${payment.parent_name || ""},\n\nVotre seance est confirmee. Montant: ${payment.amount_cad || "a confirmer"} $.\n\nPaiement securise: ${paymentUrl}\n\nMerci,\nMethode Secondaire`,
  );
}

function sendPaymentReceiptEmail_(payment, session) {
  const email = normalizeEmail_(payment.email);
  if (!email) {
    return false;
  }

  try {
    const isPlanPayment = Boolean(normalizeValue_(payment.plan_enrollment_id));
    const sessionStart = session ? coerceDate_(session.start_at) : null;
    const sessionDate = sessionStart
      ? `\nSeance: ${Utilities.formatDate(sessionStart, session.timezone || "America/Toronto", "yyyy-MM-dd HH:mm")}.`
      : "";
    MailApp.sendEmail(
      email,
      "Paiement recu - Methode Secondaire",
      `Bonjour ${payment.parent_name || ""},\n\nNous avons bien recu votre paiement de ${payment.amount_cad || ""} $.${sessionDate}\n\n${isPlanPayment ? "Vos credits de bloc sont maintenant actifs dans votre portail." : "Vous pouvez suivre la seance et le recapitulatif dans votre portail."}\n\nMerci,\nMethode Secondaire`,
    );
    return true;
  } catch (error) {
    return false;
  }
}

function getCheckoutPaymentUrl_(payment) {
  const checkoutUrl = normalizeValue_(payment && payment.checkout_url);
  if (normalizeValue_(payment && payment.payment_status) !== "payment_requested") {
    return "";
  }
  return /^https:\/\/checkout\.stripe\.com\/c\//.test(checkoutUrl) ? checkoutUrl : "";
}

function issueCheckoutForPayment_(spreadsheet, paymentRecord, options) {
  const paymentId = normalizeValue_(paymentRecord && paymentRecord.payment_id);
  const sessionId = normalizeValue_(paymentRecord && paymentRecord.session_id);
  const email = normalizeEmail_(paymentRecord && paymentRecord.email);
  const amountCad = Number(paymentRecord && paymentRecord.amount_cad);
  const paymentStatus = normalizeValue_(paymentRecord && paymentRecord.payment_status);
  const now = new Date();
  const existingExpiry = coerceDate_(paymentRecord && paymentRecord.checkout_expires_at);
  const existingUrl = normalizeValue_(paymentRecord && paymentRecord.checkout_url);
  const authorizedReissue = Boolean(options && options.authorizedReissue);

  if (!paymentId || !email || !Number.isFinite(amountCad) || amountCad <= 0) {
    return { ok: false, code: "PAYMENT_CHECKOUT_DETAILS_REQUIRED" };
  }
  if (paymentStatus === "paid") {
    return { ok: false, code: "PAYMENT_ALREADY_PAID" };
  }
  if (paymentStatus === "overdue" && !authorizedReissue) {
    return { ok: false, code: "PAYMENT_REISSUE_AUTHORIZATION_REQUIRED" };
  }
  if (paymentStatus !== "payment_requested" && paymentStatus !== "overdue") {
    return { ok: false, code: "PAYMENT_CHECKOUT_NOT_ACTIONABLE" };
  }
  if (sessionId) {
    const sessionRecord = findSheetRecordById_(
      getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME),
      SESSION_COLUMNS,
      "session_id",
      sessionId,
    );
    if (!sessionRecord || !isSessionPaymentEligible_(sessionRecord.data)) {
      return { ok: false, code: "SESSION_PAYMENT_NOT_ACTIONABLE" };
    }
  }
  if (!authorizedReissue && existingUrl && existingExpiry && existingExpiry.getTime() > now.getTime()) {
    return {
      ok: true,
      payment_id: paymentId,
      payment_url: existingUrl,
      due_date: existingExpiry.toISOString(),
      reused: true,
    };
  }

  const properties = PropertiesService.getScriptProperties();
  const paymentSessionSecret = normalizeValue_(properties.getProperty(PAYMENT_SESSION_SECRET_PROPERTY));
  const checkoutEndpoint = normalizeValue_(properties.getProperty(PAYMENT_CHECKOUT_ENDPOINT_PROPERTY)) ||
    "https://methode-secondaire.vercel.app/api/create-checkout-session";
  if (!paymentSessionSecret || !/^https:\/\//i.test(checkoutEndpoint)) {
    return { ok: false, code: "PAYMENT_CHECKOUT_NOT_CONFIGURED" };
  }

  const checkoutReference = authorizedReissue
    ? `${paymentId}-reissue-${existingExpiry ? existingExpiry.getTime() : now.getTime()}`
    : paymentId;
  const offer = getParentPaymentDisplay_(paymentRecord.offer).fr;
  let response;
  try {
    response = UrlFetchApp.fetch(checkoutEndpoint, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        payment_session_secret: paymentSessionSecret,
        payment_id: paymentId,
        checkout_reference: checkoutReference,
        email,
        amount_cad: amountCad,
        offer: `Methode Secondaire — ${offer}`,
        success_url: `${PORTAL_PUBLIC_URL}?paiement=succes`,
        cancel_url: `${PORTAL_PUBLIC_URL}?paiement=annule`,
      }),
      muteHttpExceptions: true,
    });
  } catch (error) {
    return { ok: false, code: "PAYMENT_CHECKOUT_UNAVAILABLE" };
  }

  let checkout = {};
  try {
    checkout = JSON.parse(response.getContentText());
  } catch (error) {
    return { ok: false, code: "PAYMENT_CHECKOUT_UNAVAILABLE" };
  }
  if (response.getResponseCode() < 200 || response.getResponseCode() >= 300 || !checkout.ok ||
      !normalizeValue_(checkout.checkout_session_id) || !normalizeValue_(checkout.checkout_url) ||
      !coerceDate_(checkout.expires_at)) {
    return { ok: false, code: "PAYMENT_CHECKOUT_UNAVAILABLE" };
  }

  const dueDate = coerceDate_(checkout.expires_at).toISOString();
  const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
  const currentPayment = findSheetRecordById_(paymentSheet, PAYMENT_COLUMNS, "payment_id", paymentId);
  if (!currentPayment || normalizeValue_(currentPayment.data.payment_status) === "paid") {
    return { ok: false, code: "PAYMENT_CHECKOUT_NOT_ACTIONABLE" };
  }
  const nextPayment = {
    ...currentPayment.data,
    payment_method: "stripe_checkout",
    payment_status: "payment_requested",
    stripe_checkout_session_id: normalizeValue_(checkout.checkout_session_id),
    checkout_expires_at: dueDate,
    checkout_url: normalizeValue_(checkout.checkout_url),
    due_date: dueDate,
    updated_at: new Date().toISOString(),
  };
  writeRecord_(paymentSheet, PAYMENT_COLUMNS, currentPayment.rowNumber, nextPayment);
  return { ok: true, payment_id: paymentId, payment_url: nextPayment.checkout_url, due_date: dueDate };
}

function sendParentSessionSummary_(sessionRecord, note) {
  const session = sessionRecord.data;
  const email = normalizeEmail_(session.parent_email);
  if (!email || !note.parent_summary) {
    return false;
  }

  try {
    MailApp.sendEmail(
      email,
      "Resume de seance - Methode Secondaire",
      [
        `Bonjour ${session.parent_name || ""},`,
        "",
        `Resume: ${note.parent_summary}`,
        note.homework_next ? `Travail avant la prochaine seance: ${note.homework_next}` : "",
        "",
        "Vous retrouvez ce suivi dans votre portail parent:",
        PORTAL_PUBLIC_URL,
        "",
        "Methode Secondaire",
      ].filter(Boolean).join("\n"),
    );
    return true;
  } catch (error) {
    return false;
  }
}

function sendPendingParentUpdates_(spreadsheet) {
  const noteSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_NOTE_SHEET_NAME);
  const notes = getSheetRecordsFromSheet_(noteSheet, SESSION_NOTE_COLUMNS)
    .filter((record) => normalizeValue_(record.data.parent_update_status) === "ready_to_send");
  let sent = 0;

  notes.forEach((noteRecord) => {
    const sessionRecord = getSheetRecordsFromSheet_(getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME), SESSION_COLUMNS)
      .find((record) => normalizeValue_(record.data.session_id) === normalizeValue_(noteRecord.data.session_id));
    if (!sessionRecord || !sendParentSessionSummary_(sessionRecord, noteRecord.data)) {
      return;
    }

    writeRecord_(noteSheet, SESSION_NOTE_COLUMNS, noteRecord.rowNumber, {
      ...noteRecord.data,
      parent_update_status: "sent",
      updated_at: new Date().toISOString(),
    });
    sent += 1;
  });

  return { ok: true, sent };
}

function sendOverdueMessageSlaAlerts_(spreadsheet) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_PORTAL_MESSAGE_SHEET_NAME);
  const now = Date.now();
  const overdue = getSheetRecordsFromSheet_(sheet, PORTAL_MESSAGE_COLUMNS)
    .filter((record) => normalizeValue_(record.data.message_status) === "awaiting_reply")
    .filter((record) => {
      const dueAt = coerceDate_(record.data.reply_due_at);
      return dueAt && dueAt.getTime() < now;
    });

  if (!overdue.length) {
    return { ok: true, alerted: 0 };
  }

  try {
    const summary = overdue.map((record) =>
      `Session ${record.data.session_id}: ${record.data.sender_name || record.data.sender_role} attend une reponse.`)
      .join("\n");
    PORTAL_OPERATOR_EMAILS.forEach((email) => MailApp.sendEmail(
      email,
      "Messages portail a suivre - Methode Secondaire",
      `Bonjour,\n\nCes messages ont depasse le delai de reponse de ${PORTAL_MESSAGE_REPLY_HOURS} h:\n\n${summary}\n\nMethode Secondaire`,
    ));
    overdue.forEach((record) => writeRecord_(sheet, PORTAL_MESSAGE_COLUMNS, record.rowNumber, {
      ...record.data,
      message_status: "overdue_alerted",
    }));
    return { ok: true, alerted: overdue.length };
  } catch (error) {
    return { ok: false, alerted: 0 };
  }
}

function sendSessionJourneyReminders_(spreadsheet) {
  const sessionSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  const sessionRecords = getSheetRecordsFromSheet_(sessionSheet, SESSION_COLUMNS);
  const noteSessionIds = getSheetRecords_(spreadsheet, CRM_SESSION_NOTE_SHEET_NAME, SESSION_NOTE_COLUMNS)
    .reduce((all, note) => {
      all[normalizeValue_(note.session_id)] = true;
      return all;
    }, {});
  const feedbackSessionIds = getSheetRecords_(spreadsheet, CRM_PARENT_FEEDBACK_SHEET_NAME, PARENT_FEEDBACK_COLUMNS)
    .reduce((all, feedback) => {
      all[normalizeValue_(feedback.session_id)] = true;
      return all;
    }, {});
  const now = Date.now();
  const sent = {
    parent_before_session: 0,
    tutor_before_session: 0,
    tutor_note: 0,
    team_note_escalations: 0,
    parent_feedback: 0,
  };

  sessionRecords.forEach((record) => {
    const session = record.data;
    const status = normalizeValue_(session.session_status);
    if (["cancelled", "no_show"].includes(status)) {
      return;
    }

    const startAt = coerceDate_(session.start_at);
    const endAt = coerceDate_(session.end_at);
    if (!startAt || !endAt) {
      return;
    }

    const nowIso = new Date().toISOString();
    const minutesUntilStart = (startAt.getTime() - now) / (60 * 1000);
    const hoursSinceEnd = (now - endAt.getTime()) / (60 * 60 * 1000);
    let next = { ...session };
    let changed = false;

    if (["confirmed", "calendar_created"].includes(status) &&
        minutesUntilStart <= SESSION_REMINDER_LEAD_HOURS * 60 &&
        minutesUntilStart >= SESSION_REMINDER_MINIMUM_MINUTES) {
      if (!normalizeValue_(session.parent_reminder_sent_at) && sendUpcomingSessionReminderEmail_(session, "parent")) {
        next.parent_reminder_sent_at = nowIso;
        sent.parent_before_session += 1;
        changed = true;
      }
      if (!normalizeValue_(session.tutor_reminder_sent_at) && sendUpcomingSessionReminderEmail_(session, "tutor")) {
        next.tutor_reminder_sent_at = nowIso;
        sent.tutor_before_session += 1;
        changed = true;
      }
    }

    if (hoursSinceEnd >= 2 && hoursSinceEnd <= POST_SESSION_REMINDER_MAX_HOURS &&
        !noteSessionIds[normalizeValue_(session.session_id)] &&
        !normalizeValue_(session.tutor_note_reminder_sent_at) &&
        sendTutorSessionNoteReminderEmail_(session)) {
      next.tutor_note_reminder_sent_at = nowIso;
      sent.tutor_note += 1;
      changed = true;
    }

    if (hoursSinceEnd >= 24 && hoursSinceEnd <= POST_SESSION_REMINDER_MAX_HOURS &&
        !noteSessionIds[normalizeValue_(session.session_id)] &&
        !normalizeValue_(session.team_note_escalation_sent_at) &&
        sendTutorNoteEscalationEmail_(session)) {
      next.team_note_escalation_sent_at = nowIso;
      sent.team_note_escalations += 1;
      changed = true;
    }

    if (hoursSinceEnd >= 3 && hoursSinceEnd <= POST_SESSION_REMINDER_MAX_HOURS &&
        noteSessionIds[normalizeValue_(session.session_id)] &&
        !feedbackSessionIds[normalizeValue_(session.session_id)] &&
        !normalizeValue_(session.parent_feedback_reminder_sent_at) &&
        sendParentFeedbackReminderEmail_(session)) {
      next.parent_feedback_reminder_sent_at = nowIso;
      sent.parent_feedback += 1;
      changed = true;
    }

    if (changed) {
      writeRecord_(sessionSheet, SESSION_COLUMNS, record.rowNumber, {
        ...next,
        updated_at: nowIso,
      });
    }
  });

  return { ok: true, ...sent };
}

function sendUpcomingSessionReminderEmail_(session, recipientRole) {
  const isTutor = recipientRole === "tutor";
  const email = normalizeEmail_(isTutor ? session.tutor_calendar_email : session.parent_email);
  if (!email) {
    return false;
  }

  const name = isTutor ? session.tutor_name : session.parent_name;
  const otherPerson = isTutor
    ? (session.student_name || session.parent_name || "votre eleve")
    : (session.tutor_name || "votre tuteur");
  const details = [
    `Date et heure: ${formatDateForEmail_(session.start_at)}`,
    session.format ? `Format: ${session.format}` : "",
    session.location ? `Lieu ou lien: ${session.location}` : "",
  ].filter(Boolean).join("\n");

  try {
    MailApp.sendEmail(
      email,
      "Rappel de seance demain - Methode Secondaire",
      [
        `Bonjour ${name || ""},`,
        "",
        `Rappel: votre seance avec ${otherPerson} approche.`,
        details,
        "",
        "Vous pouvez revoir les details ou ecrire dans le portail:",
        PORTAL_PUBLIC_URL,
        "",
        "Methode Secondaire",
      ].filter(Boolean).join("\n"),
    );
    return true;
  } catch (error) {
    return false;
  }
}

function sendTutorSessionNoteReminderEmail_(session) {
  const email = normalizeEmail_(session.tutor_calendar_email);
  if (!email) {
    return false;
  }

  try {
    MailApp.sendEmail(
      email,
      "Bilan de seance a completer - Methode Secondaire",
      [
        `Bonjour ${session.tutor_name || ""},`,
        "",
        `La seance du ${formatDateForEmail_(session.start_at)} est terminee.`,
        "Merci de completer le bilan normalise: ce resume permet au parent de suivre les progres et indique a l'equipe la suite a donner.",
        "",
        PORTAL_PUBLIC_URL,
        "",
        "Methode Secondaire",
      ].filter(Boolean).join("\n"),
    );
    return true;
  } catch (error) {
    return false;
  }
}

function sendParentFeedbackReminderEmail_(session) {
  const email = normalizeEmail_(session.parent_email);
  if (!email) {
    return false;
  }

  try {
    MailApp.sendEmail(
      email,
      "Votre retour apres la seance - Methode Secondaire",
      [
        `Bonjour ${session.parent_name || ""},`,
        "",
        `Comment s'est passee la seance du ${formatDateForEmail_(session.start_at)}?`,
        "Votre retour aide le tuteur et notre equipe a ajuster la suite du suivi.",
        "",
        "Le questionnaire court est disponible dans votre portail:",
        PORTAL_PUBLIC_URL,
        "",
        "Methode Secondaire",
      ].filter(Boolean).join("\n"),
    );
    return true;
  } catch (error) {
    return false;
  }
}

function sendTutorNoteEscalationEmail_(session) {
  try {
    PORTAL_OPERATOR_EMAILS.forEach((email) => MailApp.sendEmail(
      email,
      "Bilan tuteur en attente - Methode Secondaire",
      [
        "Bonjour,",
        "",
        `Le bilan de ${session.tutor_name || "ce tuteur"} est toujours attendu pour la seance du ${formatDateForEmail_(session.start_at)}.`,
        `Eleve: ${session.student_name || session.parent_name || "a confirmer"}.`,
        "Relancez le tuteur ou prenez le relais avant le prochain suivi parent.",
        "",
        PORTAL_PUBLIC_URL,
        "",
        "Methode Secondaire",
      ].join("\n"),
    ));
    return true;
  } catch (error) {
    return false;
  }
}

function runPortalAutomation() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ensureCrmReady_(spreadsheet);
  return {
    ok: true,
    payment_simulations: normalizeDemoPaymentRecords_(spreadsheet),
    credit_settlements: settleCompletedPlanCreditReservations_(spreadsheet),
    calendar: syncConfirmedSessionsToCalendar(),
    conferences: processPendingSessionConferences(),
    payments: createPaymentRowsForScheduledSessions(),
    parent_updates: sendPendingParentUpdates_(spreadsheet),
    message_sla: sendOverdueMessageSlaAlerts_(spreadsheet),
    reminders: sendSessionJourneyReminders_(spreadsheet),
  };
}

function runDailyTeamDigest() {
  return sendDailyTeamDigest();
}

function sendDailyTeamDigest() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ensureCrmReady_(spreadsheet);
  const digest = buildDailyTeamDigest_(spreadsheet);
  const dateLabel = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const subject = `Point equipe - ${dateLabel}`;
  const body = buildDailyTeamDigestText_(digest);
  const htmlBody = buildDailyTeamDigestHtml_(digest);
  let sent = 0;

  PORTAL_OPERATOR_EMAILS.forEach((email) => {
    try {
      MailApp.sendEmail({
        to: email,
        subject,
        body,
        htmlBody,
        name: "Methode Secondaire",
      });
      sent += 1;
    } catch (error) {
      // One recipient failing must not prevent the remaining operators from receiving the brief.
    }
  });

  return {
    ok: sent === PORTAL_OPERATOR_EMAILS.length,
    sent,
    callbacks: digest.callbacks.length,
    matching: digest.matching.length,
    sessions_to_confirm: digest.sessionsToConfirm.length,
    sessions_tomorrow: digest.sessionsTomorrow.length,
    notes_due: digest.notesDue.length,
    payments_due: digest.paymentsDue.length,
    messages_due: digest.messagesDue.length,
    feedback_to_review: digest.feedbackToReview.length,
  };
}

function buildDailyTeamDigest_(spreadsheet) {
  const now = new Date();
  const nowMs = now.getTime();
  const noteWindowStart = nowMs - POST_SESSION_REMINDER_MAX_HOURS * 60 * 60 * 1000;
  const leads = getSheetRecords_(spreadsheet, CRM_SHEET_NAME, CRM_COLUMNS);
  const sessions = getSheetRecords_(spreadsheet, CRM_SESSION_SHEET_NAME, SESSION_COLUMNS);
  const notes = getSheetRecords_(spreadsheet, CRM_SESSION_NOTE_SHEET_NAME, SESSION_NOTE_COLUMNS);
  const payments = getSheetRecords_(spreadsheet, CRM_PAYMENT_SHEET_NAME, PAYMENT_COLUMNS);
  const messages = getSheetRecords_(spreadsheet, CRM_PORTAL_MESSAGE_SHEET_NAME, PORTAL_MESSAGE_COLUMNS);
  const feedback = getSheetRecords_(spreadsheet, CRM_PARENT_FEEDBACK_SHEET_NAME, PARENT_FEEDBACK_COLUMNS);
  const noteSessionIds = notes.reduce((all, note) => {
    all[normalizeValue_(note.session_id)] = true;
    return all;
  }, {});

  return {
    callbacks: leads
      .filter((lead) => normalizeValue_(lead.lead_status) === "callback_needed")
      .sort(compareLeadUrgency_)
      .map((lead) => ({
        parent_name: lead.parent_name,
        phone: lead.phone,
        student_level_subject: lead.student_level_subject,
        urgency_score: lead.urgency_score,
      })),
    matching: leads
      .filter((lead) => ["ready_to_match", "matched"].includes(normalizeValue_(lead.lead_status)))
      .filter((lead) => !normalizeValue_(lead.assigned_tutor))
      .sort(compareLeadUrgency_)
      .map((lead) => ({
        parent_name: lead.parent_name,
        student_level_subject: lead.student_level_subject,
        urgency_score: lead.urgency_score,
      })),
    sessionsToConfirm: sessions
      .filter((session) => ["requested", "proposed"].includes(normalizeValue_(session.session_status)))
      .sort((a, b) => compareDateValues_(a.start_at, b.start_at))
      .map((session) => ({
        parent_name: session.parent_name,
        tutor_name: session.tutor_name,
        start_at: session.start_at,
      })),
    sessionsTomorrow: sessions
      .filter((session) => ["confirmed", "calendar_created"].includes(normalizeValue_(session.session_status)))
      .filter((session) => isOnNextLocalDay_(session.start_at, 1))
      .sort((a, b) => compareDateValues_(a.start_at, b.start_at))
      .map((session) => ({
        parent_name: session.parent_name,
        tutor_name: session.tutor_name,
        start_at: session.start_at,
      })),
    notesDue: sessions
      .filter((session) => !["cancelled", "no_show"].includes(normalizeValue_(session.session_status)))
      .filter((session) => {
        const endAt = coerceDate_(session.end_at);
        return endAt && endAt.getTime() <= nowMs - 2 * 60 * 60 * 1000 && endAt.getTime() >= noteWindowStart;
      })
      .filter((session) => !noteSessionIds[normalizeValue_(session.session_id)])
      .sort((a, b) => compareDateValues_(a.end_at, b.end_at))
      .map((session) => ({
        parent_name: session.parent_name,
        tutor_name: session.tutor_name,
        start_at: session.start_at,
      })),
    paymentsDue: payments
      .filter((payment) => ["payment_requested", "overdue"].includes(normalizeValue_(payment.payment_status)))
      .sort((a, b) => compareDateValues_(a.due_date, b.due_date))
      .map((payment) => ({
        parent_name: payment.parent_name,
        amount_cad: payment.amount_cad,
        due_date: payment.due_date,
        payment_status: payment.payment_status,
      })),
    messagesDue: messages
      .filter((message) => ["awaiting_reply", "overdue_alerted"].includes(normalizeValue_(message.message_status)))
      .sort((a, b) => compareDateValues_(a.reply_due_at, b.reply_due_at))
      .map((message) => ({
        sender_name: message.sender_name || message.sender_role,
        session_id: message.session_id,
        reply_due_at: message.reply_due_at,
        message_status: message.message_status,
      })),
    feedbackToReview: feedback
      .filter((item) => normalizeValue_(item.status) === "new")
      .sort((a, b) => compareDateValues_(b.created_at, a.created_at))
      .map((item) => ({
        parent_name: item.parent_name,
        tutor_name: item.tutor_name,
        rating: item.rating,
        follow_up_needed: item.follow_up_needed,
      })),
  };
}

function buildDailyTeamDigestText_(digest) {
  const sections = [
    dailyDigestTextSection_("Rappels a faire", digest.callbacks, (item) =>
      `${item.parent_name || "Parent"} | ${item.student_level_subject || "Besoin a preciser"} | ${item.phone || "Telephone a confirmer"} | ${item.urgency_score || "normal"}`),
    dailyDigestTextSection_("Parents sans tuteur", digest.matching, (item) =>
      `${item.parent_name || "Parent"} | ${item.student_level_subject || "Besoin a preciser"} | ${item.urgency_score || "normal"}`),
    dailyDigestTextSection_("Seances a confirmer", digest.sessionsToConfirm, (item) =>
      `${formatDateForEmail_(item.start_at)} | ${item.parent_name || "Parent"} avec ${item.tutor_name || "tuteur a confirmer"}`),
    dailyDigestTextSection_("Seances demain", digest.sessionsTomorrow, (item) =>
      `${formatDateForEmail_(item.start_at)} | ${item.parent_name || "Parent"} avec ${item.tutor_name || "tuteur a confirmer"}`),
    dailyDigestTextSection_("Bilans tuteur attendus", digest.notesDue, (item) =>
      `${formatDateForEmail_(item.start_at)} | ${item.tutor_name || "Tuteur"} | ${item.parent_name || "Parent"}`),
    dailyDigestTextSection_("Paiements a suivre", digest.paymentsDue, (item) =>
      `${item.parent_name || "Parent"} | ${item.amount_cad || "Montant a confirmer"} $ | ${item.payment_status || "payment_requested"}${item.due_date ? ` | echeance ${formatDateForEmail_(item.due_date)}` : ""}`),
    dailyDigestTextSection_("Messages portail a repondre", digest.messagesDue, (item) =>
      `${item.sender_name || "Parent ou tuteur"}${item.session_id ? ` | seance ${item.session_id}` : ""}${item.reply_due_at ? ` | echeance ${formatDateForEmail_(item.reply_due_at)}` : ""}`),
    dailyDigestTextSection_("Feedback parent a lire", digest.feedbackToReview, (item) =>
      `${item.parent_name || "Parent"} | tuteur ${item.tutor_name || "a confirmer"} | ${item.rating || "-"}/5${normalizeValue_(item.follow_up_needed) === "yes" ? " | suivi demande" : ""}`),
  ];

  return [
    "Bonjour,",
    "",
    "Voici les actions qui demandent votre attention aujourd'hui.",
    "",
    ...sections,
    "",
    `Portail equipe: ${PORTAL_PUBLIC_URL}`,
    "",
    "Methode Secondaire",
  ].join("\n");
}

function buildDailyTeamDigestHtml_(digest) {
  const sections = [
    dailyDigestHtmlSection_("Rappels a faire", digest.callbacks, (item) =>
      `${item.parent_name || "Parent"} · ${item.student_level_subject || "Besoin a preciser"} · ${item.phone || "Telephone a confirmer"} · ${item.urgency_score || "normal"}`),
    dailyDigestHtmlSection_("Parents sans tuteur", digest.matching, (item) =>
      `${item.parent_name || "Parent"} · ${item.student_level_subject || "Besoin a preciser"} · ${item.urgency_score || "normal"}`),
    dailyDigestHtmlSection_("Seances a confirmer", digest.sessionsToConfirm, (item) =>
      `${formatDateForEmail_(item.start_at)} · ${item.parent_name || "Parent"} avec ${item.tutor_name || "tuteur a confirmer"}`),
    dailyDigestHtmlSection_("Seances demain", digest.sessionsTomorrow, (item) =>
      `${formatDateForEmail_(item.start_at)} · ${item.parent_name || "Parent"} avec ${item.tutor_name || "tuteur a confirmer"}`),
    dailyDigestHtmlSection_("Bilans tuteur attendus", digest.notesDue, (item) =>
      `${formatDateForEmail_(item.start_at)} · ${item.tutor_name || "Tuteur"} · ${item.parent_name || "Parent"}`),
    dailyDigestHtmlSection_("Paiements a suivre", digest.paymentsDue, (item) =>
      `${item.parent_name || "Parent"} · ${item.amount_cad || "Montant a confirmer"} $ · ${item.payment_status || "payment_requested"}${item.due_date ? ` · echeance ${formatDateForEmail_(item.due_date)}` : ""}`),
    dailyDigestHtmlSection_("Messages portail a repondre", digest.messagesDue, (item) =>
      `${item.sender_name || "Parent ou tuteur"}${item.session_id ? ` · seance ${item.session_id}` : ""}${item.reply_due_at ? ` · echeance ${formatDateForEmail_(item.reply_due_at)}` : ""}`),
    dailyDigestHtmlSection_("Feedback parent a lire", digest.feedbackToReview, (item) =>
      `${item.parent_name || "Parent"} · tuteur ${item.tutor_name || "a confirmer"} · ${item.rating || "-"}/5${normalizeValue_(item.follow_up_needed) === "yes" ? " · suivi demande" : ""}`),
  ].join("");

  return [
    '<div style="font-family:Arial,sans-serif;color:#14213d;line-height:1.5;max-width:680px">',
    '<h1 style="font-size:22px;margin:0 0 8px">Point equipe</h1>',
    '<p style="margin:0 0 24px">Voici les actions qui demandent votre attention aujourd\'hui.</p>',
    sections,
    `<p style="margin:24px 0 0"><a href="${PORTAL_PUBLIC_URL}" style="display:inline-block;background:#0a1d43;color:#ffffff;padding:11px 16px;text-decoration:none;border-radius:6px">Ouvrir le portail equipe</a></p>`,
    '</div>',
  ].join("");
}

function dailyDigestTextSection_(title, items, formatItem) {
  if (!items.length) {
    return `${title}: rien a traiter.`;
  }

  const visible = items.slice(0, TEAM_DAILY_DIGEST_MAX_ITEMS).map((item) => `- ${formatItem(item)}`);
  if (items.length > TEAM_DAILY_DIGEST_MAX_ITEMS) {
    visible.push(`- +${items.length - TEAM_DAILY_DIGEST_MAX_ITEMS} autres dans le portail`);
  }
  return [`${title} (${items.length})`, ...visible].join("\n");
}

function dailyDigestHtmlSection_(title, items, formatItem) {
  const body = items.length
    ? `<ul style="margin:8px 0 18px;padding-left:20px">${items.slice(0, TEAM_DAILY_DIGEST_MAX_ITEMS)
      .map((item) => `<li>${escapeHtml_(formatItem(item))}</li>`).join("")}${items.length > TEAM_DAILY_DIGEST_MAX_ITEMS
      ? `<li>+${items.length - TEAM_DAILY_DIGEST_MAX_ITEMS} autres dans le portail</li>`
      : ""}</ul>`
    : '<p style="margin:8px 0 18px;color:#536176">Rien a traiter.</p>';
  return `<section><h2 style="font-size:16px;margin:0">${escapeHtml_(title)} (${items.length})</h2>${body}</section>`;
}

function compareLeadUrgency_(left, right) {
  const rank = { high: 0, medium: 1, normal: 2, needs_clarification: 3 };
  const urgencyDifference = (rank[normalizeValue_(left.urgency_score)] ?? 4) - (rank[normalizeValue_(right.urgency_score)] ?? 4);
  return urgencyDifference || compareDateValues_(left.received_at, right.received_at);
}

function compareDateValues_(left, right) {
  const leftDate = coerceDate_(left);
  const rightDate = coerceDate_(right);
  return (leftDate ? leftDate.getTime() : Number.MAX_SAFE_INTEGER) - (rightDate ? rightDate.getTime() : Number.MAX_SAFE_INTEGER);
}

function isOnNextLocalDay_(value, daysFromToday) {
  const date = coerceDate_(value);
  if (!date) {
    return false;
  }
  const target = new Date();
  target.setDate(target.getDate() + daysFromToday);
  const timezone = Session.getScriptTimeZone();
  return Utilities.formatDate(date, timezone, "yyyy-MM-dd") === Utilities.formatDate(target, timezone, "yyyy-MM-dd");
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function finalizeConfirmedPortalSession_(spreadsheet) {
  return {
    calendar: syncConfirmedSessionsToCalendar(),
    conferences: processPendingSessionConferences(),
    payments: createPaymentRowsForScheduledSessions(),
  };
}

function normalizeDemoPaymentRecords_(spreadsheet) {
  const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
  const sessionSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  const sessionsById = getSheetRecordsFromSheet_(sessionSheet, SESSION_COLUMNS)
    .reduce((all, record) => {
      all[normalizeValue_(record.data.session_id)] = record;
      return all;
    }, {});
  let converted = 0;

  getSheetRecordsFromSheet_(paymentSheet, PAYMENT_COLUMNS)
    .filter((record) => normalizeValue_(record.data.payment_method) === "demo")
    .filter((record) => normalizeValue_(record.data.payment_status) === "paid")
    .forEach((record) => {
      const now = new Date().toISOString();
      writeRecord_(paymentSheet, PAYMENT_COLUMNS, record.rowNumber, {
        ...record.data,
        payment_status: "demo_paid",
        notes: [normalizeValue_(record.data.notes), "Reclassified as a payment simulation. No card was charged."].filter(Boolean).join(" | "),
        updated_at: now,
      });

      const session = sessionsById[normalizeValue_(record.data.session_id)];
      if (session && normalizeValue_(session.data.payment_status) === "paid") {
        writeRecord_(sessionSheet, SESSION_COLUMNS, session.rowNumber, {
          ...session.data,
          payment_status: "demo_paid",
          updated_at: now,
        });
      }
      converted += 1;
    });

  return { converted };
}

function installPortalAutomation() {
  const portalTriggers = ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "runPortalAutomation");
  const digestTriggers = ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "runDailyTeamDigest");

  portalTriggers.slice(1).forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  digestTriggers.slice(1).forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  if (!portalTriggers.length) {
    ScriptApp.newTrigger("runPortalAutomation").timeBased().everyMinutes(15).create();
  }
  if (!digestTriggers.length) {
    ScriptApp.newTrigger("runDailyTeamDigest")
      .timeBased()
      .atHour(TEAM_DAILY_DIGEST_HOUR)
      .nearMinute(TEAM_DAILY_DIGEST_MINUTE)
      .everyDays(1)
      .create();
  }
  const checkoutExpiry = installCheckoutExpiryAutomation();

  return {
    ok: true,
    portal_trigger_count: Math.max(portalTriggers.length, 1),
    daily_digest_trigger_count: Math.max(digestTriggers.length, 1),
    checkout_expiry_trigger_count: checkoutExpiry.checkout_expiry_trigger_count,
  };
}

function findSheetRecordById_(sheet, columns, idColumn, id) {
  return getSheetRecordsFromSheet_(sheet, columns)
    .find((record) => normalizeValue_(record.data[idColumn]) === normalizeValue_(id)) || null;
}

function formatDateForEmail_(value) {
  const date = coerceDate_(value);
  return date
    ? Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm")
    : normalizeValue_(value);
}

function getSheetRecords_(spreadsheet, sheetName, columns) {
  return getSheetRecordsFromSheet_(getOrCreateSheet_(spreadsheet, sheetName), columns).map((record) => record.data);
}

function getSheetDisplayRecords_(spreadsheet, sheetName, columns) {
  const sheet = getOrCreateSheet_(spreadsheet, sheetName);
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length <= 1) {
    return [];
  }

  return values.slice(1).map((row, index) => ({
    rowNumber: index + 2,
    data: columns.reduce((record, column, position) => {
      record[column] = normalizeValue_(row[position]);
      return record;
    }, {}),
  })).filter((record) => Object.values(record.data).some((value) => normalizeValue_(value) !== ""));
}

function getSheetRecordsFromSheet_(sheet, columns) {
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return [];
  }

  return values.slice(1).map((row, index) => {
    const data = columns.reduce((record, column, position) => {
      record[column] = serializeValue_(row[position]);
      return record;
    }, {});

    return {
      rowNumber: index + 2,
      data,
    };
  }).filter((record) => Object.values(record.data).some((value) => normalizeValue_(value) !== ""));
}

function writeRecord_(sheet, columns, rowNumber, record) {
  const row = columns.map((column) => record[column] || "");

  if (rowNumber) {
    sheet.getRange(rowNumber, 1, 1, columns.length).setValues([row]);
    return;
  }

  sheet.appendRow(row);
}

function sanitizeStudentForPortal_(record) {
  return {
    student_id: record.student_id,
    student_name: record.student_name,
    student_level_subject: record.student_level_subject,
    learning_notes: record.learning_notes,
    status: record.status,
    assigned_tutor_id: record.assigned_tutor_id,
    assigned_tutor_name: record.assigned_tutor_name,
    created_at: record.created_at,
    updated_at: record.updated_at,
  };
}

function sanitizePlanForPortal_(record) {
  return {
    plan_id: record.plan_id,
    plan_type: record.plan_type,
    name: record.name,
    description: record.description,
    status: record.status,
    session_count: Number(record.session_count) || 0,
    price_cad: record.price_cad,
    unit_price_cad: record.unit_price_cad,
    cadence: record.cadence,
    cancellation_notice_hours: normalizePlanNoticeHours_(record.cancellation_notice_hours),
    validity_days: Number(record.validity_days) || 0,
    eligible_session_types: record.eligible_session_types,
    billing_mode: record.billing_mode,
  };
}

function sanitizePlanEnrollmentForPortal_(record, plan, creditSummary, modificationWindow) {
  const safePlan = plan ? sanitizePlanForPortal_(plan) : null;
  const summary = creditSummary || { credits_total: 0, credits_remaining: 0, credits_reserved: 0, credits_used: 0 };
  const window = modificationWindow || { next_change_deadline: "", modification_deadline_at: "", can_modify: false };
  return {
    enrollment_id: record.enrollment_id,
    plan_id: record.plan_id,
    lead_id: record.lead_id,
    parent_email: record.parent_email,
    plan_name: safePlan?.name || "",
    plan_type: safePlan?.plan_type || "",
    status: record.status,
    cadence: record.cadence,
    student_id: record.student_id,
    student_name: record.student_name,
    tutor_id: record.tutor_id,
    tutor_name: record.tutor_name,
    scheduled_weekday: record.scheduled_weekday,
    scheduled_time: record.scheduled_time,
    timezone: record.timezone,
    start_at: record.start_at,
    pause_from_at: record.pause_from_at,
    expires_at: record.expires_at,
    billing_status: record.billing_status,
    billing_mode: safePlan?.billing_mode || "",
    // Pack sessions are tracked against the credit ledger. Other plans only
    // express a rhythm or an offer: no automatic card charge is created here.
    accounting_mode: safePlan?.plan_type === "pack" ? "credit_ledger" : "manual_payment_tracking",
    cancellation_notice_hours: normalizePlanNoticeHours_(record.cancellation_notice_hours),
    credits_total: summary.credits_total,
    credits_remaining: summary.credits_remaining,
    credits_reserved: summary.credits_reserved,
    credits_used: summary.credits_used,
    next_change_deadline: window.next_change_deadline || window.modification_deadline_at || "",
    modification_deadline_at: window.modification_deadline_at || window.next_change_deadline || "",
    next_occurrence_at: window.next_occurrence_at || "",
    can_modify: Boolean(window.can_modify),
    modification_window: window,
    plan: safePlan,
    created_at: record.created_at,
    updated_at: record.updated_at,
  };
}

function sanitizeCreditLedgerForParent_(record) {
  const entryType = normalizeValue_(record.entry_type);
  const parentReason = entryType === "grant"
    ? { fr: "Crédits ajoutés après vérification du paiement.", en: "Credits added after payment verification." }
    : entryType === "reserve"
      ? { fr: "Crédit réservé pour une séance.", en: "Credit reserved for a session." }
      : entryType === "consume"
        ? { fr: "Crédit utilisé pour une séance complétée.", en: "Credit used for a completed session." }
        : { fr: "Mise à jour du solde de crédits.", en: "Credit balance updated." };
  return {
    enrollment_id: record.enrollment_id,
    entry_type: entryType,
    available_delta: normalizeCreditAmount_(record.available_delta),
    reserved_delta: normalizeCreditAmount_(record.reserved_delta),
    used_delta: normalizeCreditAmount_(record.used_delta),
    display_reason_fr: parentReason.fr,
    display_reason_en: parentReason.en,
    expires_at: record.expires_at,
    created_at: record.created_at,
  };
}

function sanitizeCreditLedgerForOperator_(record) {
  return {
    credit_ledger_id: record.credit_ledger_id,
    enrollment_id: record.enrollment_id,
    plan_id: record.plan_id,
    session_id: record.session_id,
    related_credit_ledger_id: record.related_credit_ledger_id,
    entry_type: record.entry_type,
    available_delta: normalizeCreditAmount_(record.available_delta),
    reserved_delta: normalizeCreditAmount_(record.reserved_delta),
    used_delta: normalizeCreditAmount_(record.used_delta),
    reason: record.reason,
    expires_at: record.expires_at,
    created_at: record.created_at,
    source_payment_id: record.source_payment_id,
  };
}

function buildActivityItem_(type, timestamp, title, detail, studentName) {
  return {
    activity_id: `${type}-${normalizeValue_(timestamp)}-${normalizeValue_(title)}`.slice(0, 300),
    type,
    occurred_at: normalizeValue_(timestamp),
    title: normalizeValue_(title),
    detail: normalizeValue_(detail),
    student_name: normalizeValue_(studentName),
  };
}

function buildParentActivityTimeline_(records) {
  const activity = [];
  (records.sessions || []).forEach((session) => activity.push(buildActivityItem_(
    "session",
    session.start_at || session.created_at,
    `Seance ${normalizeValue_(session.session_status) || "planifiee"}`,
    `${normalizeValue_(session.tutor_name) || "Tuteur a confirmer"} | ${normalizeValue_(session.student_level_subject)}`,
    session.student_name,
  )));
  (records.notes || []).forEach((note) => activity.push(buildActivityItem_(
    "summary",
    note.created_at || note.session_date,
    "Bilan de seance",
    note.parent_summary || note.next_goal || note.wins,
    note.student_name,
  )));
  (records.payments || []).forEach((payment) => activity.push(buildActivityItem_(
    "payment",
    payment.paid_at || payment.created_at || payment.due_date,
    `Paiement ${normalizeValue_(payment.payment_status) || "a suivre"}`,
    `${normalizeValue_(payment.amount_cad) || ""} $`,
    "",
  )));
  (records.messages || []).forEach((message) => activity.push(buildActivityItem_(
    "message",
    message.created_at,
    `Message de ${normalizeValue_(message.sender_name) || normalizeValue_(message.sender_role) || "l'equipe"}`,
    message.message,
    "",
  )));
  (records.requests || []).forEach((request) => activity.push(buildActivityItem_(
    "request",
    request.updated_at || request.created_at,
    request.subject || "Demande de suivi",
    request.message,
    "",
  )));
  (records.feedback || []).forEach((feedback) => activity.push(buildActivityItem_(
    "feedback",
    feedback.updated_at || feedback.created_at,
    "Retour parent",
    feedback.comment || `Evaluation: ${normalizeValue_(feedback.rating)}/5`,
    "",
  )));

  return activity
    .filter((entry) => entry.occurred_at)
    .sort((a, b) => String(b.occurred_at).localeCompare(String(a.occurred_at)))
    .slice(0, 60);
}

function buildParentRelationshipHistory_(lead, records) {
  const email = normalizeEmail_(lead.email);
  const leadId = normalizeValue_(lead.lead_id);
  return buildParentActivityTimeline_({
    sessions: (records.sessions || []).filter((record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === email),
    notes: (records.notes || []).filter((record) => normalizeValue_(record.lead_id) === leadId),
    payments: (records.payments || []).filter((record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.email) === email),
    messages: (records.messages || []).filter((record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === email),
    requests: (records.requests || []).filter((record) => normalizeValue_(record.related_id) === leadId || normalizeEmail_(record.email) === email),
    feedback: (records.feedback || []).filter((record) => normalizeValue_(record.lead_id) === leadId || normalizeEmail_(record.parent_email) === email),
  });
}

function buildOperatorToday_(parents, sessions) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
  const withinNextDay = new Date(now.getTime() + 26 * 60 * 60 * 1000);
  const upcoming = (sessions || []).filter((session) => {
    const start = coerceDate_(session.start_at);
    return start && start.getTime() >= now.getTime() && start.getTime() <= withinNextDay.getTime();
  });

  return {
    calls: (parents || [])
      .filter((parent) => normalizeValue_(parent.lead_status) === "callback_needed")
      .sort(compareLeadUrgency_)
      .slice(0, 12),
    confirmations: (sessions || [])
      .filter((session) => ["requested", "proposed"].includes(normalizeValue_(session.session_status)))
      .filter((session) => isUpcomingDate_(session.start_at))
      .sort((a, b) => compareDateValues_(a.start_at, b.start_at))
      .slice(0, 12)
      .map(sanitizeSessionForOperator_),
    sessions_today: (sessions || [])
      .filter((session) => {
        const start = coerceDate_(session.start_at);
        return start && start.getTime() >= startOfToday.getTime() && start.getTime() < endOfToday.getTime();
      })
      .sort((a, b) => compareDateValues_(a.start_at, b.start_at))
      .slice(0, 12)
      .map(sanitizeSessionForOperator_),
    reminders: upcoming
      .filter((session) => !normalizeValue_(session.parent_reminder_sent_at) || !normalizeValue_(session.tutor_reminder_sent_at))
      .sort((a, b) => compareDateValues_(a.start_at, b.start_at))
      .slice(0, 12)
      .map(sanitizeSessionForOperator_),
  };
}

function sanitizeLeadForPortal_(record) {
  return {
    lead_id: record.lead_id,
    received_at: record.received_at,
    crm_stage: record.crm_stage,
    lead_status: record.lead_status,
    next_action: record.next_action,
    next_action_due: record.next_action_due,
    parent_name: record.parent_name,
    student_level_subject: record.student_level_subject,
    main_concern: record.main_concern,
    parent_intent: record.parent_intent,
    timeline: record.timeline,
    format: record.format,
    assigned_tutor: record.assigned_tutor,
    offer_recommended: record.offer_recommended,
    first_session_date: record.first_session_date,
  };
}

function sanitizeSessionForParent_(record) {
  return {
    session_id: record.session_id,
    lead_id: record.lead_id,
    parent_name: record.parent_name,
    student_name: record.student_name,
    student_level_subject: record.student_level_subject,
    tutor_name: record.tutor_name,
    session_status: record.session_status,
    session_type: record.session_type,
    start_at: record.start_at,
    end_at: record.end_at,
    timezone: record.timezone,
    format: record.format,
    location: record.location,
    payment_status: record.payment_status,
    amount_cad: record.amount_cad,
    notes: record.notes,
    parent_confirmed_at: record.parent_confirmed_at,
    tutor_confirmed_at: record.tutor_confirmed_at,
    recurrence_weeks: record.recurrence_weeks,
    recurring_from_session_id: record.recurring_from_session_id,
    student_id: record.student_id,
    google_meet_url: record.google_meet_url,
    calendar_conference_status: record.calendar_conference_status,
    calendar_invites_sent_at: record.calendar_invites_sent_at,
    parent_reminder_sent_at: record.parent_reminder_sent_at,
    tutor_reminder_sent_at: record.tutor_reminder_sent_at,
    plan_enrollment_id: record.plan_enrollment_id,
    modification_deadline_at: record.modification_deadline_at,
    cancellation_notice_hours: record.cancellation_notice_hours || String(SESSION_CANCELLATION_NOTICE_HOURS),
    credit_reservation_id: record.credit_reservation_id,
  };
}

function sanitizeSessionForTutor_(record) {
  return {
    session_id: record.session_id,
    lead_id: record.lead_id,
    parent_name: record.parent_name,
    student_name: record.student_name,
    student_level_subject: record.student_level_subject,
    session_status: record.session_status,
    session_type: record.session_type,
    start_at: record.start_at,
    end_at: record.end_at,
    timezone: record.timezone,
    format: record.format,
    location: record.location,
    payment_status: record.payment_status,
    amount_cad: record.amount_cad,
    notes: record.notes,
    parent_confirmed_at: record.parent_confirmed_at,
    tutor_confirmed_at: record.tutor_confirmed_at,
    recurrence_weeks: record.recurrence_weeks,
    recurring_from_session_id: record.recurring_from_session_id,
    student_id: record.student_id,
    google_meet_url: record.google_meet_url,
    calendar_conference_status: record.calendar_conference_status,
    calendar_invites_sent_at: record.calendar_invites_sent_at,
    parent_reminder_sent_at: record.parent_reminder_sent_at,
    tutor_reminder_sent_at: record.tutor_reminder_sent_at,
    plan_enrollment_id: record.plan_enrollment_id,
    modification_deadline_at: record.modification_deadline_at,
    cancellation_notice_hours: record.cancellation_notice_hours || String(SESSION_CANCELLATION_NOTICE_HOURS),
    credit_reservation_id: record.credit_reservation_id,
  };
}

function sanitizeSessionForOperator_(record) {
  return {
    ...sanitizeSessionForTutor_(record),
    parent_email: record.parent_email,
    tutor_calendar_email: record.tutor_calendar_email,
    google_calendar_event_id: record.google_calendar_event_id,
    payment_link: record.payment_link,
    parent_confirmed_at: record.parent_confirmed_at,
    tutor_confirmed_at: record.tutor_confirmed_at,
    recurrence_weeks: record.recurrence_weeks,
    recurring_from_session_id: record.recurring_from_session_id,
  };
}

function sanitizeTutorAvailabilityForPortal_(record) {
  return {
    availability_id: record.availability_id,
    weekday: record.weekday,
    start_time: record.start_time,
    end_time: record.end_time,
    timezone: record.timezone,
    format: record.format,
    location: record.location,
    status: record.status,
    notes: record.notes,
    last_updated_at: record.last_updated_at,
  };
}

function sanitizePaymentForParent_(record, enrollment) {
  const presentation = getParentPaymentDisplay_(record.offer);
  return {
    // This is called only after buildParentDashboard_ filters payments by the
    // authenticated parent's email. It is opaque and enables safe reissue.
    payment_id: record.payment_id,
    session_id: record.session_id,
    display_name_fr: presentation.fr,
    display_name_en: presentation.en,
    credit_unlock_count: presentation.credit_unlock_count,
    amount_cad: record.amount_cad,
    payment_status: record.payment_status,
    can_reissue: normalizeValue_(record.payment_status) === "overdue" &&
      !normalizeValue_(record.session_id) &&
      isPlanEnrollmentEligibleForPaymentReissue_(enrollment),
    payment_url: getCheckoutPaymentUrl_(record),
    due_date: record.due_date,
    paid_at: record.paid_at,
    created_at: record.created_at,
    updated_at: record.updated_at,
  };
}

function getParentPaymentDisplay_(offer) {
  const presentations = {
    momentum_block_payment_1: { fr: "Bloc d'élan — paiement unique", en: "Momentum block — single payment", credit_unlock_count: 4 },
    progression_block_payment_1: { fr: "Bloc de progression — premier paiement", en: "Progress block — first payment", credit_unlock_count: 5 },
    progression_block_payment_2: { fr: "Bloc de progression — deuxième paiement", en: "Progress block — second payment", credit_unlock_count: 5 },
  };
  return presentations[normalizePaymentLinkOfferCode_(offer)] || {
    fr: "Séance de tutorat",
    en: "Tutoring session",
    credit_unlock_count: 0,
  };
}

function sanitizePaymentForOperator_(record) {
  return {
    payment_id: record.payment_id,
    session_id: record.session_id,
    offer: record.offer,
    amount_cad: record.amount_cad,
    payment_method: record.payment_method,
    payment_status: record.payment_status,
    payment_link: record.payment_link,
    invoice_id: record.invoice_id,
    due_date: record.due_date,
    paid_at: record.paid_at,
    notes: record.notes,
    created_at: record.created_at,
    updated_at: record.updated_at,
    plan_enrollment_id: record.plan_enrollment_id,
    credit_grant_count: normalizeCreditAmount_(record.credit_grant_count),
  };
}

function sanitizeSessionNoteForPortal_(record) {
  return {
    note_id: record.note_id,
    session_id: record.session_id,
    lead_id: record.lead_id,
    student_name: record.student_name,
    tutor_name: record.tutor_name,
    session_date: record.session_date,
    subject_level: record.subject_level,
    attendance: record.attendance,
    focus_worked: record.focus_worked,
    wins: record.wins,
    stuck_points: record.stuck_points,
    homework_next: record.homework_next,
    parent_summary: record.parent_summary,
    risk_level: record.risk_level,
    next_recommendation: record.next_recommendation,
    parent_update_status: record.parent_update_status,
    follow_up_due: record.follow_up_due,
    created_at: record.created_at,
    student_confidence: record.student_confidence,
    next_goal: record.next_goal,
  };
}

function sanitizeParentFeedbackForPortal_(record) {
  return {
    feedback_id: record.feedback_id,
    session_id: record.session_id,
    parent_name: record.parent_name,
    tutor_name: record.tutor_name,
    rating: record.rating,
    clarity_rating: record.clarity_rating,
    student_confidence: record.student_confidence,
    follow_up_needed: record.follow_up_needed,
    comment: record.comment,
    status: record.status,
    created_at: record.created_at,
  };
}

function sanitizePortalMessageForPortal_(record) {
  return {
    message_id: record.message_id,
    session_id: record.session_id,
    lead_id: record.lead_id,
    sender_role: record.sender_role,
    sender_name: record.sender_name,
    message: record.message,
    delivery_status: record.delivery_status,
    created_at: record.created_at,
    recipient_role: record.recipient_role,
    message_status: record.message_status,
    reply_due_at: record.reply_due_at,
    answered_at: record.answered_at,
  };
}

function buildPortalRequestsForAccess_(spreadsheet, access) {
  const email = normalizeEmail_(access.email);
  const relatedId = normalizeValue_(access.related_id);
  const role = normalizeValue_(access.role);

  return getSheetRecords_(spreadsheet, CRM_PORTAL_REQUEST_SHEET_NAME, PORTAL_REQUEST_COLUMNS)
    .filter((record) => normalizeValue_(record.role) === role)
    .filter((record) => normalizeEmail_(record.email) === email || normalizeValue_(record.related_id) === relatedId)
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, 30)
    .map(sanitizePortalRequestForPortal_);
}

function sanitizePortalRequestForPortal_(record) {
  return {
    request_id: record.request_id,
    created_at: record.created_at,
    request_type: record.request_type,
    subject: record.subject,
    message: record.message,
    status: record.status,
    owner: record.owner,
    due_at: record.due_at,
    updated_at: record.updated_at,
  };
}

function sendPortalCodeEmail_(identity, code) {
  const subjects = {
    parent: "Votre code parent - Méthode Secondaire",
    tutor: "Votre code tuteur - Méthode Secondaire",
    operator: "Votre code équipe - Méthode Secondaire",
  };
  const subject = subjects[identity.role] || "Votre code de connexion - Méthode Secondaire";
  const greeting = identity.display_name ? `Bonjour ${identity.display_name},` : "Bonjour,";
  const body = [
    greeting,
    "",
    `Votre code de connexion Méthode Secondaire est: ${code}`,
    "",
    `Il expire dans ${PORTAL_CODE_MINUTES} minutes.`,
    "",
    "Si vous n'avez pas demandé ce code, vous pouvez ignorer ce message.",
    "",
    "Chahine",
    "Méthode Secondaire",
  ].join("\n");

  MailApp.sendEmail(identity.email, subject, body);
}

function getPortalEmailReadiness_() {
  try {
    const remaining = MailApp.getRemainingDailyQuota();
    if (remaining < 1) {
      return { ok: false, code: "PORTAL_EMAIL_QUOTA_REACHED" };
    }

    return { ok: true, remaining_email_quota: remaining };
  } catch (error) {
    return portalRequestError_(error);
  }
}

function portalEmailStatus_() {
  const readiness = getPortalEmailReadiness_();
  return readiness.ok
    ? { ok: true, code: "PORTAL_EMAIL_READY" }
    : { ok: false, code: readiness.code || "PORTAL_REQUEST_FAILED" };
}

function portalRequestError_(error) {
  const message = String(error || "");
  const normalized = message.toLowerCase();

  if (normalized.includes("authorization") || normalized.includes("permission")) {
    return { ok: false, code: "PORTAL_EMAIL_NOT_AUTHORIZED" };
  }

  if (normalized.includes("quota") || normalized.includes("too many times")) {
    return { ok: false, code: "PORTAL_EMAIL_QUOTA_REACHED" };
  }

  if (normalized.includes("mailapp") || normalized.includes("send email") || normalized.includes("sendemail")) {
    return { ok: false, code: "PORTAL_EMAIL_SEND_FAILED" };
  }

  return { ok: false, code: "PORTAL_REQUEST_FAILED" };
}

function verifyPortalEmailService() {
  return getPortalEmailReadiness_();
}

function normalizePortalRole_(role) {
  const normalized = normalizeValue_(role).toLowerCase();
  return PORTAL_ROLE_OPTIONS.includes(normalized) ? normalized : "";
}

function normalizeAllowed_(value, options, fallback) {
  const normalized = normalizeValue_(value);
  return options.includes(normalized) ? normalized : fallback;
}

function normalizeEmail_(value) {
  return normalizeValue_(value).trim().toLowerCase();
}

function createPortalCode_() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function createPortalToken_() {
  return Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
}

function hashValue_(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, normalizeValue_(value));
  return bytes.map((byte) => {
    const normalized = byte < 0 ? byte + 256 : byte;
    return (`0${normalized.toString(16)}`).slice(-2);
  }).join("");
}

function serializeValue_(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }

  return normalizeValue_(value);
}

function isUpcomingDate_(value) {
  const date = coerceDate_(value);
  return Boolean(date && date.getTime() >= Date.now() - 60 * 60 * 1000);
}

function buildCalendarTitle_(row, columns) {
  const subject = normalizeValue_(row[columns.student_level_subject]) || "Tutorat";
  const tutorName = normalizeValue_(row[columns.tutor_name]) || "tuteur";

  return `Méthode Secondaire - ${subject} - ${tutorName}`;
}

function buildSessionCalendarTitle_(session) {
  return `Méthode Secondaire - ${normalizeValue_(session.student_level_subject) || "Tutorat"} - ${normalizeValue_(session.tutor_name) || "tuteur"}`;
}

function rowToRecord_(row, columns) {
  return columns.reduce((record, column, position) => {
    record[column] = serializeValue_(row[position]);
    return record;
  }, {});
}

function resolveTutorCalendarId_(spreadsheet, session) {
  const tutor = getSheetRecords_(spreadsheet, CRM_TUTOR_SHEET_NAME, TUTOR_COLUMNS)
    .find((record) => normalizeValue_(record.tutor_id) === normalizeValue_(session.tutor_id));
  return normalizeValue_(tutor?.calendar_id) || normalizeEmail_(tutor?.calendar_email) ||
    normalizeEmail_(session.tutor_calendar_email);
}

function buildTutorHostedMeetEvent_(session) {
  const attendees = [session.tutor_calendar_email, session.parent_email]
    .map(normalizeEmail_)
    .filter(Boolean)
    .map((email) => ({ email }));
  return {
    summary: `Méthode Secondaire - ${normalizeValue_(session.student_level_subject) || "Tutorat"} - ${normalizeValue_(session.tutor_name) || "tuteur"}`,
    description: buildCalendarDescription_(SESSION_COLUMNS.map((column) => session[column]), indexColumns_(SESSION_COLUMNS)),
    location: normalizeValue_(session.location),
    start: {
      dateTime: normalizeValue_(session.start_at),
      timeZone: normalizeValue_(session.timezone) || "America/Toronto",
    },
    end: {
      dateTime: normalizeValue_(session.end_at),
      timeZone: normalizeValue_(session.timezone) || "America/Toronto",
    },
    attendees,
    conferenceData: {
      createRequest: {
        requestId: `meet-${normalizeValue_(session.session_id)}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };
}

function getGoogleMeetUrl_(event) {
  const entryPoint = (event?.conferenceData?.entryPoints || [])
    .find((entry) => normalizeValue_(entry.entryPointType) === "video" && normalizeValue_(entry.uri));
  return normalizeValue_(entryPoint?.uri) || normalizeValue_(event?.hangoutLink);
}

function isTerminalConferenceFailure_(event) {
  const statusCode = normalizeValue_(event?.conferenceData?.createRequest?.status?.statusCode).toLowerCase();
  if (["failure", "failed"].includes(statusCode)) return true;
  return Boolean(event?.conferenceData?.conferenceSolution && !getGoogleMeetUrl_(event));
}

function appendMeetUrlToCalendarDescription_(description, meetUrl) {
  const normalizedDescription = normalizeValue_(description);
  if (normalizedDescription.includes(meetUrl)) return normalizedDescription;
  return [normalizedDescription, `Google Meet: ${meetUrl}`].filter(Boolean).join("\n\n");
}

function markSessionConferenceFailed_(spreadsheet, sheet, rowNumber, session, errorMessage, eventIdOverride) {
  const alreadyFailed = ["failed", "failed_cleanup_pending", "failed_payment_cleanup_pending"]
    .includes(normalizeValue_(session.calendar_conference_status));
  const eventId = normalizeValue_(eventIdOverride) || normalizeValue_(session.google_calendar_event_id);
  const calendarDeletion = deleteMeetEventSafely_(spreadsheet, session, eventId);
  if (!calendarDeletion.ok) {
    const cleanupNote = "Nettoyage Calendar requis avant annulation de la seance.";
    const hasCleanupNote = normalizeValue_(session.notes).includes(cleanupNote);
    writeRecord_(sheet, SESSION_COLUMNS, rowNumber, {
      ...session,
      google_meet_url: "",
      calendar_conference_status: "failed_cleanup_pending",
      updated_at: new Date().toISOString(),
      notes: hasCleanupNote ? normalizeValue_(session.notes) : [normalizeValue_(session.notes), cleanupNote].filter(Boolean).join(" | "),
    });
    if (!hasCleanupNote) {
      appendCalendarDeletionFailureRequest_(spreadsheet, session, "annulation apres echec Google Meet", calendarDeletion.code);
    }
    return calendarDeletion;
  }
  const checkoutExpiry = expireSessionCheckoutBeforeMeetCancellation_(spreadsheet, session);
  if (!checkoutExpiry.ok) {
    const cleanupNote = "Expiration Stripe requise avant annulation de la seance.";
    const hasCleanupNote = normalizeValue_(session.notes).includes(cleanupNote);
    writeRecord_(sheet, SESSION_COLUMNS, rowNumber, {
      ...session,
      google_meet_url: "",
      calendar_conference_status: "failed_payment_cleanup_pending",
      updated_at: new Date().toISOString(),
      notes: hasCleanupNote ? normalizeValue_(session.notes) : [normalizeValue_(session.notes), cleanupNote].filter(Boolean).join(" | "),
    });
    if (!hasCleanupNote) {
      appendPortalRequestRecord_(spreadsheet, {
        role: "operator",
        email: "",
        related_id: normalizeValue_(session.session_id),
        request_type: "technical_help",
        subject: "Stripe a verifier avant annulation de seance",
        message: `La seance ${normalizeValue_(session.session_id)} reste bloquee: le Checkout Stripe ${normalizeValue_(checkoutExpiry.payment_id) || "associe"} n'est pas confirme expire (${normalizeValue_(checkoutExpiry.code) || "STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED"}).`,
      });
    }
    return checkoutExpiry;
  }
  const cancelled = cancelSessionForMeetFailure_(spreadsheet, sheet, rowNumber, session, errorMessage, checkoutExpiry);
  if (!alreadyFailed) {
    appendMeetCalendarFailureRequest_(spreadsheet, session, errorMessage);
  }
  return cancelled;
}

function cancelSessionForMeetFailure_(spreadsheet, sheet, rowNumber, session, errorMessage, checkoutExpiry) {
  const reason = `Seance annulee: Google Meet indisponible. ${normalizeValue_(errorMessage)}`;
  voidUnpaidSessionPayments_(spreadsheet, normalizeValue_(session.session_id), reason);
  releasePlanCreditReservationForSession_(spreadsheet, session, reason);
  writeRecord_(sheet, SESSION_COLUMNS, rowNumber, {
    ...session,
    session_status: "cancelled",
    payment_status: normalizeValue_(session.payment_status) === "paid" || Boolean(checkoutExpiry && checkoutExpiry.has_paid_checkout)
      ? "paid"
      : "waived",
    google_calendar_event_id: "",
    google_meet_url: "",
    calendar_conference_status: "failed",
    calendar_invites_sent_at: "",
    updated_at: new Date().toISOString(),
    notes: [normalizeValue_(session.notes), reason].filter(Boolean).join(" | "),
  });
  return { ok: true, cancelled: true };
}

function deleteMeetEventSafely_(spreadsheet, session, eventId) {
  if (!normalizeValue_(eventId)) return { ok: true, already_deleted: true };
  return deleteAdvancedCalendarEvent_(spreadsheet, session || {}, normalizeValue_(eventId));
}

function appendMeetCalendarFailureRequest_(spreadsheet, session, errorMessage) {
  appendPortalRequestRecord_(spreadsheet, {
    role: "operator",
    email: "",
    related_id: normalizeValue_(session.session_id),
    request_type: "technical_help",
    subject: `Google Meet a verifier - ${normalizeValue_(session.tutor_name) || "tuteur"}`,
    message: `Le calendrier du tuteur ${normalizeValue_(session.tutor_name) || normalizeValue_(session.tutor_id) || "non assigne"} a empeche la creation du lien Google Meet pour la seance ${normalizeValue_(session.session_id)}. Probleme: ${normalizeValue_(errorMessage)}`,
  });
}

function resolveCalendarForTutor_(spreadsheet, tutorId) {
  const tutor = getSheetRecords_(spreadsheet, CRM_TUTOR_SHEET_NAME, TUTOR_COLUMNS)
    .find((record) => normalizeValue_(record.tutor_id) === normalizeValue_(tutorId));
  const calendarId = normalizeValue_(tutor?.calendar_id);

  if (!calendarId) {
    return CalendarApp.getDefaultCalendar();
  }

  try {
    return CalendarApp.getCalendarById(calendarId);
  } catch (error) {
    return null;
  }
}

function buildCalendarDescription_(row, columns) {
  return [
    "Séance Méthode Secondaire",
    "",
    `Parent: ${normalizeValue_(row[columns.parent_name])}`,
    `Élève: ${normalizeValue_(row[columns.student_name]) || "à confirmer"}`,
    `Matière/niveau: ${normalizeValue_(row[columns.student_level_subject])}`,
    `Type: ${normalizeValue_(row[columns.session_type])}`,
    `Format: ${normalizeValue_(row[columns.format])}`,
    `Paiement: ${normalizeValue_(row[columns.payment_status])}`,
    "",
    normalizeValue_(row[columns.notes]),
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function indexColumns_(columns) {
  return columns.reduce((index, column, position) => {
    index[column] = position;
    return index;
  }, {});
}

function coerceDate_(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function getOrCreateSheet_(spreadsheet, sheetName) {
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function normalizeValue_(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value);
}

function createLeadId_() {
  return createRecordId_("LEAD");
}

function createRecordId_(prefix) {
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd");
  const random = Math.random().toString(36).slice(2, 10).toUpperCase();

  return `${prefix}-${today}-${random}`;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
