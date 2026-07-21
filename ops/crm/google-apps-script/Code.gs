const CRM_SHEET_NAME = "Parent Leads";
const CRM_CONFIG_SHEET_NAME = "Config";
const CRM_DAILY_VIEW_NAME = "A rappeler aujourd'hui";
const CRM_FIRST_SESSION_VIEW_NAME = "Premieres seances";
const CRM_ACTIVE_VIEW_NAME = "Suivis actifs";
const CRM_MATCHING_VIEW_NAME = "Matching Queue";
const CRM_SCHEDULE_VIEW_NAME = "Schedule Queue";
const CRM_PAYMENT_VIEW_NAME = "Payment Queue";
const CRM_TUTOR_SHEET_NAME = "Tutor Roster";
const CRM_TUTOR_AVAILABILITY_SHEET_NAME = "Tutor Availability";
const CRM_SESSION_SHEET_NAME = "Sessions";
const CRM_PAYMENT_SHEET_NAME = "Payments";
const CRM_PAYMENT_LINK_SHEET_NAME = "Payment Links";
const CRM_PLAN_SHEET_NAME = "Plans";
const CRM_DASHBOARD_SHEET_NAME = "Ops Dashboard";

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

const AVAILABILITY_STATUS_OPTIONS = ["open", "limited", "full", "paused"];
const WEEKDAY_OPTIONS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const SESSION_STATUS_OPTIONS = ["requested", "proposed", "confirmed", "calendar_created", "completed", "cancelled", "no_show"];
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
const LEGACY_PACKAGE_PAYMENT_OFFER_CODES = [
  "progression_block_10_installment_1",
  "progression_block_10_installment_2",
  "weekly_follow_up_installment_1",
  "weekly_follow_up_installment_2",
];
// Payment-link setup also accepts legacy installment codes. The stable
// internal session types remain valid for ordinary per-session links.
const PAYMENT_LINK_OFFER_OPTIONS = [
  ...SESSION_TYPE_OPTIONS,
  ...PACKAGE_PAYMENT_OFFER_CODES,
  ...LEGACY_PACKAGE_PAYMENT_OFFER_CODES,
];
const PAYMENT_STATUS_OPTIONS = ["not_requested", "payment_requested", "paid", "overdue", "refunded", "waived"];
const PAYMENT_METHOD_OPTIONS = ["stripe_payment_link", "interac", "cash", "other"];
const PAYOUT_STATUS_OPTIONS = ["not_due", "pending", "paid", "held"];
const PAYMENT_LINK_STATUS_OPTIONS = ["active", "draft", "paused"];
const PLAN_TYPE_OPTIONS = ["one_time", "weekly", "pack"];
const PLAN_STATUS_OPTIONS = ["draft", "active", "paused", "archived"];
const PLAN_CADENCE_OPTIONS = ["one_time", "weekly", "biweekly"];
const PLAN_BILLING_MODE_OPTIONS = ["manual_tracking", "future_stripe"];
const PLAN_MODIFICATION_NOTICE_HOURS = 72;

function setupCrm() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  setupLeadSheet_(sheet);
  setupTutorRosterSheet_(getOrCreateSheet_(spreadsheet, CRM_TUTOR_SHEET_NAME));
  setupTutorAvailabilitySheet_(getOrCreateSheet_(spreadsheet, CRM_TUTOR_AVAILABILITY_SHEET_NAME));
  setupSessionsSheet_(getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME));
  setupPaymentSheet_(getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME));
  setupPaymentLinksSheet_(getOrCreateSheet_(spreadsheet, CRM_PAYMENT_LINK_SHEET_NAME));
  setupPlansSheet_(getOrCreateSheet_(spreadsheet, CRM_PLAN_SHEET_NAME));
  seedDefaultPlans_(spreadsheet);
  setupViews_(spreadsheet);
  setupDashboard_(spreadsheet);
  setupConfigSheet_(spreadsheet);
}

function doGet() {
  return jsonResponse_({
    ok: true,
    service: "methode-secondaire-parent-crm",
    spreadsheet_id: SpreadsheetApp.getActiveSpreadsheet().getId(),
  });
}

function doPost(event) {
  try {
    const payload = parsePayload_(event);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    ensureCrmReady_(spreadsheet);

    const sheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
    const row = CRM_COLUMNS.map((column) => normalizeValue_(payload[column]));
    sheet.appendRow(row);

    return jsonResponse_({ ok: true, lead_id: payload.lead_id || "" });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function syncConfirmedSessionsToCalendar() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ensureCrmReady_(spreadsheet);

  const sheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  const columns = indexColumns_(SESSION_COLUMNS);
  let created = 0;
  const errors = [];

  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    const status = normalizeValue_(row[columns.session_status]);
    const existingEventId = normalizeValue_(row[columns.google_calendar_event_id]);

    if (status !== "confirmed" || existingEventId) {
      continue;
    }

    const startAt = coerceDate_(row[columns.start_at]);
    const endAt = coerceDate_(row[columns.end_at]);

    if (!startAt || !endAt) {
      errors.push(`Row ${rowIndex + 1}: missing start_at or end_at`);
      continue;
    }

    const title = buildCalendarTitle_(row, columns);
    const options = {
      description: buildCalendarDescription_(row, columns),
      location: normalizeValue_(row[columns.location]),
      sendInvites: true,
    };

    const guests = [row[columns.tutor_calendar_email], row[columns.parent_email]]
      .map(normalizeValue_)
      .filter(Boolean)
      .join(",");

    if (guests) {
      options.guests = guests;
    }

    try {
      const event = CalendarApp.getDefaultCalendar().createEvent(title, startAt, endAt, options);
      sheet.getRange(rowIndex + 1, columns.google_calendar_event_id + 1).setValue(event.getId());
      sheet.getRange(rowIndex + 1, columns.session_status + 1).setValue("calendar_created");
      sheet.getRange(rowIndex + 1, columns.updated_at + 1).setValue(new Date().toISOString());
      created += 1;
    } catch (error) {
      errors.push(`Row ${rowIndex + 1}: ${String(error)}`);
    }
  }

  return { ok: errors.length === 0, created, errors };
}

function createPaymentRowsForScheduledSessions() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ensureCrmReady_(spreadsheet);

  const sessionSheet = getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME);
  const paymentSheet = getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME);
  const sessionValues = sessionSheet.getDataRange().getValues();
  const paymentValues = paymentSheet.getDataRange().getValues();
  const sessionColumns = indexColumns_(SESSION_COLUMNS);
  const paymentColumns = indexColumns_(PAYMENT_COLUMNS);
  const existingSessionPayments = new Set(
    paymentValues.slice(1).map((row) => normalizeValue_(row[paymentColumns.session_id])).filter(Boolean)
  );
  const now = new Date().toISOString();
  let created = 0;

  for (let rowIndex = 1; rowIndex < sessionValues.length; rowIndex += 1) {
    const row = sessionValues[rowIndex];
    const sessionId = normalizeValue_(row[sessionColumns.session_id]);
    const sessionStatus = normalizeValue_(row[sessionColumns.session_status]);

    if (!sessionId || existingSessionPayments.has(sessionId)) {
      continue;
    }

    if (!["confirmed", "calendar_created", "completed"].includes(sessionStatus)) {
      continue;
    }

    const paymentRow = PAYMENT_COLUMNS.map((column) => {
      switch (column) {
        case "payment_id":
          return createRecordId_("PAY");
        case "session_id":
          return sessionId;
        case "lead_id":
          return row[sessionColumns.lead_id];
        case "parent_name":
          return row[sessionColumns.parent_name];
        case "email":
          return row[sessionColumns.parent_email];
        case "offer":
          return row[sessionColumns.session_type];
        case "amount_cad":
          return row[sessionColumns.amount_cad];
        case "payment_method":
          return "stripe_payment_link";
        case "payment_status":
          return "not_requested";
        case "payment_link":
          return row[sessionColumns.payment_link];
        case "payout_status":
          return "not_due";
        case "created_at":
        case "updated_at":
          return now;
        default:
          return "";
      }
    });

    paymentSheet.appendRow(paymentRow);
    existingSessionPayments.add(sessionId);
    created += 1;
  }

  return { ok: true, created };
}

function ensureCrmReady_(spreadsheet) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  setupLeadSheet_(sheet);
  setupTutorRosterSheet_(getOrCreateSheet_(spreadsheet, CRM_TUTOR_SHEET_NAME));
  setupTutorAvailabilitySheet_(getOrCreateSheet_(spreadsheet, CRM_TUTOR_AVAILABILITY_SHEET_NAME));
  setupSessionsSheet_(getOrCreateSheet_(spreadsheet, CRM_SESSION_SHEET_NAME));
  setupPaymentSheet_(getOrCreateSheet_(spreadsheet, CRM_PAYMENT_SHEET_NAME));
  setupPaymentLinksSheet_(getOrCreateSheet_(spreadsheet, CRM_PAYMENT_LINK_SHEET_NAME));

  const missingView = [
    CRM_DAILY_VIEW_NAME,
    CRM_FIRST_SESSION_VIEW_NAME,
    CRM_ACTIVE_VIEW_NAME,
    CRM_MATCHING_VIEW_NAME,
    CRM_SCHEDULE_VIEW_NAME,
    CRM_PAYMENT_VIEW_NAME,
  ].some((sheetName) => !spreadsheet.getSheetByName(sheetName));

  if (missingView) {
    setupViews_(spreadsheet);
  }

  if (!spreadsheet.getSheetByName(CRM_DASHBOARD_SHEET_NAME)) {
    setupDashboard_(spreadsheet);
  }

  if (!spreadsheet.getSheetByName(CRM_CONFIG_SHEET_NAME)) {
    setupConfigSheet_(spreadsheet);
  }
}

function parsePayload_(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error("Missing POST body");
  }

  const raw = event.postData.contents;
  const parsed = JSON.parse(raw);

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
    offer_recommended: normalizePublicOfferCode_(parsed.offer_recommended),
    callback_notes: parsed.callback_notes || "",
    first_session_date: parsed.first_session_date || "",
    first_session_summary: parsed.first_session_summary || "",
    last_contacted_at: parsed.last_contacted_at || "",
    close_reason: parsed.close_reason || "",
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

function setupPlansSheet_(sheet) {
  setupStructuredSheet_(sheet, PLAN_COLUMNS, "#3a315f");
  applyStructuredValidation_(sheet, PLAN_COLUMNS, "plan_type", PLAN_TYPE_OPTIONS);
  applyStructuredValidation_(sheet, PLAN_COLUMNS, "status", PLAN_STATUS_OPTIONS);
  applyStructuredValidation_(sheet, PLAN_COLUMNS, "cadence", PLAN_CADENCE_OPTIONS);
  applyStructuredValidation_(sheet, PLAN_COLUMNS, "billing_mode", PLAN_BILLING_MODE_OPTIONS);
}

function getSheetRecordsFromSheet_(sheet, columns) {
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return [];
  }

  return values
    .slice(1)
    .map((row, index) => ({
      rowNumber: index + 2,
      data: columns.reduce((record, column, position) => {
        record[column] = normalizeValue_(row[position]);
        return record;
      }, {}),
    }))
    .filter((record) => Object.values(record.data).some((value) => value !== ""));
}

function writeRecord_(sheet, columns, rowNumber, record) {
  const row = columns.map((column) => record[column] || "");
  if (rowNumber) {
    sheet.getRange(rowNumber, 1, 1, columns.length).setValues([row]);
    return;
  }

  sheet.appendRow(row);
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
    name: "Seance Declic / a la carte",
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
  sheet.getRange(2, 1, 12, 3).setValues([
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
    [
      "Payments to request",
      '=COUNTIF(Payments!I:I,"not_requested")+COUNTIF(Payments!I:I,"payment_requested")',
      "Send Stripe/Interac instructions",
    ],
    ["Unpaid confirmed sessions", '=COUNTIFS(Sessions!J:J,"calendar_created",Sessions!R:R,"<>paid")', "Collect before repeat sessions"],
    ["Tutor payouts pending", '=COUNTIF(Payments!O:O,"pending")', "Pay tutors after parent payment clears"],
  ]);

  sheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#071631").setFontColor("#ffffff");
  sheet.getRange(2, 1, 12, 1).setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 3);
}

function setupConfigSheet_(spreadsheet) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_CONFIG_SHEET_NAME);
  sheet.clear();
  sheet.getRange(1, 1, 1, 2).setValues([["Key", "Values"]]);
  sheet.getRange(2, 1, 15, 2).setValues([
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
    ["payment_status", PAYMENT_STATUS_OPTIONS.join(", ")],
    ["payment_method", PAYMENT_METHOD_OPTIONS.join(", ")],
    ["payout_status", PAYOUT_STATUS_OPTIONS.join(", ")],
    ["payment_link_status", PAYMENT_LINK_STATUS_OPTIONS.join(", ")],
    ["calendar_sync_function", "syncConfirmedSessionsToCalendar"],
  ]);
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
  }

  const headerRange = sheet.getRange(1, 1, 1, columns.length);
  headerRange.setValues([columns]);
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

function buildCalendarTitle_(row, columns) {
  const subject = normalizeValue_(row[columns.student_level_subject]) || "Tutorat";
  const tutorName = normalizeValue_(row[columns.tutor_name]) || "tuteur";

  return `Méthode Secondaire - ${subject} - ${tutorName}`;
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
