const CRM_SHEET_NAME = "Parent Leads";
const CRM_CONFIG_SHEET_NAME = "Config";
const CRM_DAILY_VIEW_NAME = "A rappeler aujourd'hui";
const CRM_FIRST_SESSION_VIEW_NAME = "Premieres seances";
const CRM_ACTIVE_VIEW_NAME = "Suivis actifs";

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

function setupCrm() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  setupLeadSheet_(sheet);
  setupViews_(spreadsheet);
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

function ensureCrmReady_(spreadsheet) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_SHEET_NAME);
  setupLeadSheet_(sheet);

  const missingView = [CRM_DAILY_VIEW_NAME, CRM_FIRST_SESSION_VIEW_NAME, CRM_ACTIVE_VIEW_NAME].some(
    (sheetName) => !spreadsheet.getSheetByName(sheetName)
  );

  if (missingView) {
    setupViews_(spreadsheet);
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
    offer_recommended: parsed.offer_recommended || "",
    callback_notes: parsed.callback_notes || "",
    first_session_date: parsed.first_session_date || "",
    first_session_summary: parsed.first_session_summary || "",
    last_contacted_at: parsed.last_contacted_at || "",
    close_reason: parsed.close_reason || "",
  };
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
  ];

  views.forEach((view) => {
    const sheet = getOrCreateSheet_(spreadsheet, view.name);
    sheet.clear();
    sheet.getRange(1, 1).setFormula(view.formula);
    sheet.setFrozenRows(1);
  });
}

function setupConfigSheet_(spreadsheet) {
  const sheet = getOrCreateSheet_(spreadsheet, CRM_CONFIG_SHEET_NAME);
  sheet.clear();
  sheet.getRange(1, 1, 1, 2).setValues([["Key", "Values"]]);
  sheet.getRange(2, 1, 3, 2).setValues([
    ["crm_stage", CRM_STAGE_OPTIONS.join(", ")],
    ["lead_status", LEAD_STATUS_OPTIONS.join(", ")],
    ["next_action", NEXT_ACTION_OPTIONS.join(", ")],
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
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd");
  const random = Math.random().toString(36).slice(2, 10).toUpperCase();

  return `LEAD-${today}-${random}`;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
