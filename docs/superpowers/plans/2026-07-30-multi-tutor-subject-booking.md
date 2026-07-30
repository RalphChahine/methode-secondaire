# Réservation par tuteur et matières attribuées Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow a parent to choose one of a student's assigned tutors and see that tutor's assigned subjects before booking a slot, while keeping a tutor's availability globally conflict-free.

**Architecture:** Apps Script owns the new `Student Tutor Assignments` relation, validates it under the existing booking lock, and persists its snapshot on the session. A small frontend helper derives safe booking options from the dashboard; a focused picker component and the existing booking panel display and submit the selected assignment. Existing single-tutor fields remain an explicit legacy fallback.

**Tech Stack:** React 18, Vite 7, Node `node:test`, Vercel API proxy, Google Apps Script, Google Sheets.

## Global Constraints

- `Student Tutor Assignments` is the source of truth for active per-student tutor/subject assignments; `Students.assigned_tutor_id` and `assigned_tutor_name` remain a fallback only for historical records with no dedicated assignment.
- A tutor is active only when `Tutor Roster.status` is `active`; only an operator may create, edit, or deactivate an assignment.
- A dedicated assignment has one active row per student/tutor and a non-empty, normalized comma-separated `subjects` list.
- The parent sees only assignments for their own students and never receives a tutor's private contact details.
- A tutor's availability is global: every booking for that tutor, regardless of subject or student, blocks overlapping slots.
- `portal_book_session` must re-check the active assignment and rebuild the slot list while holding `LockService.getScriptLock()`; a failed check creates neither a session nor a credit reservation.
- Add all new parent-facing copy in French and English. Do not add dependencies, a public tutor directory, subject-specific availability, automatic charges, or a data migration.
- Preserve the existing package-credit binding, reservation, payment, cancellation, and calendar flows.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `src/lib/studentTutorAssignments.js` | Pure normalization, legacy fallback, and slot filtering used by the parent booking flow. |
| `src/components/portal/TutorAssignmentPicker.jsx` | Accessible presentation of one or many safe tutor/subject booking choices. |
| `src/lib/parentPortal.js` | Recognizes a dedicated assignment as a completed match for the next parent action. |
| `src/lib/portalClient.js` | Sends bounded operator assignment mutations through the portal proxy. |
| `src/pages/Portal.jsx` | Supplies bilingual copy, renders the operator assignment editor, and requires a selected assignment before showing parent slots. |
| `api/portal.js`, `vite.config.js` | Allowlist the two new assignment-management actions in production and development proxies. |
| `ops/crm/google-apps-script/Code.gs` | Creates/migrates the sheet, authorizes assignment mutations, returns owner-filtered assignments, and protects booking availability. |
| `test/student-tutor-assignments.test.mjs` | Exercises pure booking-option and accessible picker behavior. |
| `test/parent-portal.test.mjs`, `test/portal-api.test.mjs` | Locks down parent next-action, UI/CRM contracts, and proxy action coverage. |

## Task 1: Derive safe client booking options

**Files:**
- Create: `src/lib/studentTutorAssignments.js`
- Create: `test/student-tutor-assignments.test.mjs`
- Modify: `src/lib/parentPortal.js`
- Modify: `test/parent-portal.test.mjs`

**Interfaces:**
- Produces `getStudentBookingAssignments({ student, assignments, matching })`, returning `{ assignment_id, tutor_id, tutor_name, subjects, is_legacy }[]`.
- Produces `filterBookableSlotsForAssignment(slots, assignment)`, returning slots belonging only to `assignment.tutor_id`.
- Consumes parent dashboard field `student_tutor_assignments`, whose records contain `student_id`, `assignment_id`, `tutor_id`, `tutor_name`, `subjects`, and `status`.

- [ ] **Step 1: Write the failing pure-function and next-action tests**

Create `test/student-tutor-assignments.test.mjs`:

```js
import assert from "node:assert/strict"
import test from "node:test"

import {
  filterBookableSlotsForAssignment,
  getStudentBookingAssignments,
} from "../src/lib/studentTutorAssignments.js"

const student = {
  student_id: "STUDENT-1",
  assigned_tutor_id: "LEGACY",
  assigned_tutor_name: "Legacy tutor",
  student_level_subject: "Secondary 4",
}

test("uses one explicit assignment when David covers mathematics and science", () => {
  const assignments = getStudentBookingAssignments({
    student,
    matching: {},
    assignments: [{
      assignment_id: "ASSIGN-DAVID",
      student_id: "STUDENT-1",
      tutor_id: "TUTOR-DAVID",
      tutor_name: "David",
      subjects: "Mathematics, Science",
      status: "active",
    }],
  })

  assert.deepEqual(assignments, [{
    assignment_id: "ASSIGN-DAVID",
    tutor_id: "TUTOR-DAVID",
    tutor_name: "David",
    subjects: "Mathematics, Science",
    is_legacy: false,
  }])
})

test("keeps David mathematics and Joanie science separate and filters their slots", () => {
  const assignments = getStudentBookingAssignments({
    student,
    matching: {},
    assignments: [
      { assignment_id: "ASSIGN-JOANIE", student_id: "STUDENT-1", tutor_id: "TUTOR-JOANIE", tutor_name: "Joanie", subjects: "Science", status: "active" },
      { assignment_id: "ASSIGN-DAVID", student_id: "STUDENT-1", tutor_id: "TUTOR-DAVID", tutor_name: "David", subjects: "Mathematics", status: "active" },
    ],
  })

  assert.deepEqual(assignments.map(({ tutor_name, subjects }) => [tutor_name, subjects]), [
    ["David", "Mathematics"],
    ["Joanie", "Science"],
  ])
  assert.deepEqual(filterBookableSlotsForAssignment([
    { slot_id: "DAVID-1", tutor_id: "TUTOR-DAVID" },
    { slot_id: "JOANIE-1", tutor_id: "TUTOR-JOANIE" },
  ], assignments[1]), [{ slot_id: "JOANIE-1", tutor_id: "TUTOR-JOANIE" }])
})

test("falls back to the historical student assignment only when no dedicated assignment exists", () => {
  assert.deepEqual(getStudentBookingAssignments({ student, assignments: [], matching: {} }), [{
    assignment_id: "",
    tutor_id: "LEGACY",
    tutor_name: "Legacy tutor",
    subjects: "Secondary 4",
    is_legacy: true,
  }])
})
```

Append this test to `test/parent-portal.test.mjs`:

```js
test("treats a dedicated student tutor assignment as completed matching", () => {
  const action = getParentNextAction({
    profile: { name: "Parent" },
    students: [{ student_id: "STUDENT-1" }],
    student_tutor_assignments: [{
      assignment_id: "ASSIGN-DAVID",
      student_id: "STUDENT-1",
      tutor_id: "TUTOR-DAVID",
      status: "active",
    }],
    matching: {},
    sessions: [],
    metrics: {},
  })

  assert.deepEqual(action, { key: "booking", destination: "sessions" })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/student-tutor-assignments.test.mjs test/parent-portal.test.mjs`

Expected: FAIL because `src/lib/studentTutorAssignments.js` does not exist and the parent next-action does not inspect `student_tutor_assignments`.

- [ ] **Step 3: Add the minimal pure helper and next-action support**

Create `src/lib/studentTutorAssignments.js`:

```js
function records(value) {
  return Array.isArray(value) ? value : []
}

function text(value) {
  return typeof value === "string" ? value.trim() : ""
}

function activeAssignmentsForStudent(assignments, studentId) {
  return records(assignments)
    .filter((assignment) => text(assignment?.student_id) === text(studentId))
    .filter((assignment) => text(assignment?.status || "active") === "active")
    .filter((assignment) => text(assignment?.assignment_id) && text(assignment?.tutor_id))
    .map((assignment) => ({
      assignment_id: text(assignment.assignment_id),
      tutor_id: text(assignment.tutor_id),
      tutor_name: text(assignment.tutor_name),
      subjects: text(assignment.subjects),
      is_legacy: false,
    }))
    .sort((left, right) => (
      left.tutor_name.localeCompare(right.tutor_name) || left.assignment_id.localeCompare(right.assignment_id)
    ))
}

export function getStudentBookingAssignments({ student = {}, assignments = [], matching = {} } = {}) {
  const explicit = activeAssignmentsForStudent(assignments, student.student_id)
  if (explicit.length) return explicit

  const tutorId = text(student.assigned_tutor_id) || text(matching.tutor_id)
  if (!tutorId) return []

  return [{
    assignment_id: "",
    tutor_id: tutorId,
    tutor_name: text(student.assigned_tutor_name) || text(matching.tutor_name),
    subjects: text(student.student_level_subject),
    is_legacy: true,
  }]
}

export function filterBookableSlotsForAssignment(slots, assignment) {
  const tutorId = text(assignment?.tutor_id)
  return tutorId ? records(slots).filter((slot) => text(slot?.tutor_id) === tutorId) : []
}
```

In `src/lib/parentPortal.js`, extend `hasTutor` exactly as follows:

```js
  const hasTutor = Boolean(
    matching.tutor_id ||
    records(dashboard.student_tutor_assignments).some((assignment) => (
      assignment && assignment.status === "active" && assignment.tutor_id
    )) ||
    records(dashboard.students).some((student) => student && student.assigned_tutor_id),
  )
```

- [ ] **Step 4: Run the focused tests to verify they pass**

Run: `node --test test/student-tutor-assignments.test.mjs test/parent-portal.test.mjs`

Expected: PASS with no failures.

- [ ] **Step 5: Commit the tested helper behavior**

```powershell
git add src/lib/studentTutorAssignments.js src/lib/parentPortal.js test/student-tutor-assignments.test.mjs test/parent-portal.test.mjs
git commit -m "feat: derive per-student tutor booking options"
```

## Task 2: Persist and authorize student tutor assignments in the CRM

**Files:**
- Modify: `ops/crm/google-apps-script/Code.gs`
- Modify: `api/portal.js`
- Modify: `vite.config.js`
- Modify: `test/portal-api.test.mjs`
- Modify: `test/parent-portal.test.mjs`

**Interfaces:**
- Produces parent dashboard `student_tutor_assignments` records with `assignment_id`, `student_id`, `tutor_id`, `tutor_name`, `subjects`, and `status`.
- Produces `portal_upsert_student_tutor_assignment` and `portal_deactivate_student_tutor_assignment`, operator-only mutations.
- Consumes booking payload field `student_tutor_assignment_id`; absent input is accepted only by the historical single-tutor fallback.

- [ ] **Step 1: Write the failing CRM and proxy contract tests**

Append this test to `test/portal-api.test.mjs`:

```js
test("allowlists the two operator-only student tutor assignment actions", () => {
  assert.equal(PORTAL_ACTIONS.has("portal_upsert_student_tutor_assignment"), true)
  assert.equal(PORTAL_ACTIONS.has("portal_deactivate_student_tutor_assignment"), true)
})
```

Append this test to `test/parent-portal.test.mjs`:

```js
test("CRM stores owner-filtered assignments and revalidates them inside the booking lock", async () => {
  const source = await readFile(new URL("../ops/crm/google-apps-script/Code.gs", import.meta.url), "utf8")
  const booker = source.slice(
    source.indexOf("function bookPortalSession_("),
    source.indexOf("function submitParentFeedback_("),
  )

  assert.match(source, /const CRM_STUDENT_TUTOR_ASSIGNMENT_SHEET_NAME = "Student Tutor Assignments"/)
  assert.match(source, /const STUDENT_TUTOR_ASSIGNMENT_COLUMNS = \[/)
  assert.match(source, /function upsertPortalStudentTutorAssignment_\(/)
  assert.match(source, /function deactivatePortalStudentTutorAssignment_\(/)
  assert.match(source, /student_tutor_assignments: studentTutorAssignments/)
  assert.match(booker, /student_tutor_assignment_id/)
  assert.match(booker, /resolveStudentTutorAssignmentForBooking_\(spreadsheet, \{/)
  assert.match(booker, /const bookingLock = LockService\.getScriptLock\(\)/)
  assert.match(booker, /buildBookableSlots_\(spreadsheet, 21\)/)
  assert.match(booker, /hasTutorSessionConflict_\(spreadsheet, record\.tutor_id/)
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/portal-api.test.mjs test/parent-portal.test.mjs`

Expected: FAIL because neither proxy allowlist includes the assignment actions and Apps Script has no assignment sheet or booking resolver.

- [ ] **Step 3: Add the schema, mutation handlers, owner-filtered dashboard data, and booking validation**

In `ops/crm/google-apps-script/Code.gs`, append two values to `SESSION_COLUMNS` after `calendar_owner_id`, add this schema near `STUDENT_COLUMNS`, add the new sheet to `CRM_REQUIRED_SHEET_NAMES`, and initialize it in `setupCrm()`:

```js
const CRM_STUDENT_TUTOR_ASSIGNMENT_SHEET_NAME = "Student Tutor Assignments";
const STUDENT_TUTOR_ASSIGNMENT_COLUMNS = [
  "assignment_id",
  "lead_id",
  "parent_email",
  "student_id",
  "student_name",
  "tutor_id",
  "tutor_name",
  "subjects",
  "status",
  "created_at",
  "updated_at",
];
const STUDENT_TUTOR_ASSIGNMENT_STATUS_OPTIONS = ["active", "inactive"];

// Append to SESSION_COLUMNS so existing Sheets receive a non-breaking tail migration.
"student_tutor_assignment_id",
"assigned_tutor_subjects",
```

Add the sheet setup function beside `setupStudentsSheet_`:

```js
function setupStudentTutorAssignmentsSheet_(sheet) {
  setupStructuredSheet_(sheet, STUDENT_TUTOR_ASSIGNMENT_COLUMNS, "#1f4662");
  applyStructuredValidation_(sheet, STUDENT_TUTOR_ASSIGNMENT_COLUMNS, "status", STUDENT_TUTOR_ASSIGNMENT_STATUS_OPTIONS);
}
```

Add the following helpers beside the student functions:

```js
function normalizeStudentTutorAssignmentSubjects_(value) {
  return [...new Set(normalizeValue_(value)
    .split(/[;,\n]+/)
    .map((subject) => subject.trim())
    .filter(Boolean))]
    .join(", ")
    .slice(0, 500);
}

function sanitizeStudentTutorAssignmentForPortal_(record) {
  return {
    assignment_id: normalizeValue_(record.assignment_id),
    student_id: normalizeValue_(record.student_id),
    tutor_id: normalizeValue_(record.tutor_id),
    tutor_name: normalizeValue_(record.tutor_name),
    subjects: normalizeValue_(record.subjects),
    status: normalizeValue_(record.status),
  };
}

function getActiveStudentTutorAssignmentsForParent_(spreadsheet, parentEmail, studentId) {
  return getSheetRecords_(spreadsheet, CRM_STUDENT_TUTOR_ASSIGNMENT_SHEET_NAME, STUDENT_TUTOR_ASSIGNMENT_COLUMNS)
    .filter((assignment) => normalizeEmail_(assignment.parent_email) === normalizeEmail_(parentEmail))
    .filter((assignment) => !studentId || normalizeValue_(assignment.student_id) === normalizeValue_(studentId))
    .filter((assignment) => normalizeValue_(assignment.status) === "active")
    .map(sanitizeStudentTutorAssignmentForPortal_)
    .sort((left, right) => String(left.tutor_name).localeCompare(String(right.tutor_name)) ||
      String(left.assignment_id).localeCompare(String(right.assignment_id)));
}

function resolveStudentTutorAssignmentForBooking_(spreadsheet, params) {
  const assignments = getActiveStudentTutorAssignmentsForParent_(spreadsheet, params.parent_email, params.student.student_id);
  const assignmentId = normalizeValue_(params.assignment_id);
  if (assignments.length) {
    const assignment = assignments.find((candidate) => candidate.assignment_id === assignmentId);
    return assignment
      ? { ok: true, assignment }
      : { ok: false, code: assignmentId ? "STUDENT_TUTOR_ASSIGNMENT_NOT_AVAILABLE" : "STUDENT_TUTOR_ASSIGNMENT_REQUIRED" };
  }

  const tutorId = assignedTutorIdForStudent_(params.student) || assignedTutorIdForLead_(params.parent);
  if (!tutorId) return { ok: false, code: "MATCHING_PENDING" };
  const tutor = findActiveTutorById_(spreadsheet, tutorId);
  return tutor
    ? { ok: true, assignment: {
      assignment_id: "",
      student_id: params.student.student_id,
      tutor_id: tutor.tutor_id,
      tutor_name: tutor.tutor_name,
      subjects: normalizeValue_(params.student.student_level_subject),
      status: "active",
    } }
    : { ok: false, code: "MATCHING_PENDING" };
}

function upsertPortalStudentTutorAssignment_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) return portalSession;

  const assignmentId = normalizeValue_(payload.assignment_id);
  const studentSheet = getOrCreateSheet_(spreadsheet, CRM_STUDENT_SHEET_NAME);
  const studentRecord = findSheetRecordById_(studentSheet, STUDENT_COLUMNS, "student_id", normalizeValue_(payload.student_id));
  const tutor = findActiveTutorById_(spreadsheet, payload.tutor_id);
  const subjects = normalizeStudentTutorAssignmentSubjects_(payload.subjects);
  if (!studentRecord || normalizeValue_(studentRecord.data.status) !== "active" || !tutor || !subjects) {
    return { ok: false, code: "STUDENT_TUTOR_ASSIGNMENT_DETAILS_REQUIRED" };
  }

  const sheet = getOrCreateSheet_(spreadsheet, CRM_STUDENT_TUTOR_ASSIGNMENT_SHEET_NAME);
  setupStudentTutorAssignmentsSheet_(sheet);
  const existing = assignmentId
    ? findSheetRecordById_(sheet, STUDENT_TUTOR_ASSIGNMENT_COLUMNS, "assignment_id", assignmentId)
    : null;
  if (assignmentId && (!existing || normalizeValue_(existing.data.student_id) !== normalizeValue_(studentRecord.data.student_id))) {
    return { ok: false, code: "STUDENT_TUTOR_ASSIGNMENT_NOT_AVAILABLE" };
  }
  const duplicate = getSheetRecordsFromSheet_(sheet, STUDENT_TUTOR_ASSIGNMENT_COLUMNS)
    .find((record) => normalizeValue_(record.data.status) === "active" &&
      normalizeValue_(record.data.student_id) === normalizeValue_(studentRecord.data.student_id) &&
      normalizeValue_(record.data.tutor_id) === normalizeValue_(tutor.tutor_id) &&
      normalizeValue_(record.data.assignment_id) !== assignmentId);
  if (duplicate) return { ok: false, code: "STUDENT_TUTOR_ASSIGNMENT_EXISTS" };

  const now = new Date().toISOString();
  const assignment = {
    assignment_id: existing ? existing.data.assignment_id : createRecordId_("ASSIGN"),
    lead_id: studentRecord.data.lead_id,
    parent_email: normalizeEmail_(studentRecord.data.parent_email),
    student_id: studentRecord.data.student_id,
    student_name: studentRecord.data.student_name,
    tutor_id: tutor.tutor_id,
    tutor_name: tutor.tutor_name,
    subjects,
    status: "active",
    created_at: existing ? existing.data.created_at : now,
    updated_at: now,
  };
  writeRecord_(sheet, STUDENT_TUTOR_ASSIGNMENT_COLUMNS, existing ? existing.rowNumber : null, assignment);
  return { ok: true, assignment: sanitizeStudentTutorAssignmentForPortal_(assignment) };
}

function deactivatePortalStudentTutorAssignment_(spreadsheet, payload) {
  const portalSession = verifyPortalSession_(spreadsheet, payload.token, "operator");
  if (!portalSession.ok) return portalSession;

  const sheet = getOrCreateSheet_(spreadsheet, CRM_STUDENT_TUTOR_ASSIGNMENT_SHEET_NAME);
  const record = findSheetRecordById_(sheet, STUDENT_TUTOR_ASSIGNMENT_COLUMNS, "assignment_id", normalizeValue_(payload.assignment_id));
  if (!record || normalizeValue_(record.data.status) !== "active") {
    return { ok: false, code: "STUDENT_TUTOR_ASSIGNMENT_NOT_AVAILABLE" };
  }
  const next = { ...record.data, status: "inactive", updated_at: new Date().toISOString() };
  writeRecord_(sheet, STUDENT_TUTOR_ASSIGNMENT_COLUMNS, record.rowNumber, next);
  return { ok: true, assignment_id: next.assignment_id };
}
```

Add both actions to `handlePortalAction_`. In `buildParentPortalDashboard_`, build `studentTutorAssignments` with `getActiveStudentTutorAssignmentsForParent_(spreadsheet, email)`, include it as `student_tutor_assignments`, and add its tutor IDs to `eligibleTutorIds`. In `buildOperatorPortalDashboard_`, read the assignment sheet once and add a parent-filtered, sanitized `student_tutor_assignments` list to every `parentCandidates` item.

Replace everything from the current `const assignedTutorId = ...` through its matching `finally { bookingLock.releaseLock(); }` in `bookPortalSession_` with this complete booking section. The existing finalization and response statements immediately after this block remain in place.

```js
  const paymentDetails = resolveSessionPaymentDetails_({ session_type: sessionType });
  const amountCad = paymentDetails.amount_cad || defaultSessionAmountCad_(sessionType);
  let record = null;
  let paymentMode = Number(amountCad) > 0 ? "stripe_checkout" : "waived";

  const bookingLock = LockService.getScriptLock();
  if (!bookingLock.tryLock(5000)) return { ok: false, code: "BOOKING_SLOT_UNAVAILABLE" };

  try {
    const assignmentResult = resolveStudentTutorAssignmentForBooking_(spreadsheet, {
      parent_email: portalSession.access.email,
      parent,
      student,
      assignment_id: payload.student_tutor_assignment_id,
    });
    if (!assignmentResult.ok) return assignmentResult;
    const assignment = assignmentResult.assignment;
    const slot = buildBookableSlots_(spreadsheet, 21)
      .find((candidate) => candidate.slot_id === selectedSlotId && candidate.tutor_id === assignment.tutor_id);
    if (!slot) {
      return { ok: false, code: "BOOKING_SLOT_UNAVAILABLE" };
    }
    if (hasTutorSessionConflict_(spreadsheet, assignment.tutor_id, new Date(slot.start_at), new Date(slot.end_at))) {
      return { ok: false, code: "BOOKING_SLOT_UNAVAILABLE" };
    }

    const planBindingParams = {
      plan_enrollment_id: payload.plan_enrollment_id,
      parent_email: portalSession.access.email,
      student_id: student.student_id,
      tutor_id: assignment.tutor_id,
      session_type: sessionType,
      allow_package_credit_fallback: true,
    };
    const planBinding = resolvePlanSessionBinding_(spreadsheet, planBindingParams);
    if (!planBinding.ok) return planBinding;
    paymentMode = planBinding.requires_credit
      ? "plan_credit"
      : Number(amountCad) > 0 ? "stripe_checkout" : "waived";
    const now = new Date().toISOString();
    record = {
      session_id: createRecordId_("SESSION"),
      lead_id: parent.lead_id,
      parent_name: parent.parent_name || portalSession.access.display_name || portalSession.access.email,
      student_name: studentName,
      student_level_subject: normalizeValue_(student.student_level_subject || payload.student_level_subject).slice(0, 300) || parent.student_level_subject,
      student_tutor_assignment_id: assignment.assignment_id,
      assigned_tutor_subjects: assignment.subjects,
      tutor_id: assignment.tutor_id,
      tutor_name: assignment.tutor_name,
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
      payment_status: planBinding.requires_credit ? "not_requested" : Number(amountCad) > 0 ? "payment_requested" : "waived",
      payment_link: "",
      amount_cad: planBinding.requires_credit ? "" : amountCad,
      notes: ["Booked by parent in portal.", planBinding.requires_credit ? "Pack credit reserved for this session." : ""].filter(Boolean).join(" | "),
      created_at: now,
      updated_at: now,
      parent_confirmed_at: now,
      tutor_confirmed_at: now,
      calendar_invites_sent_at: "",
      recurrence_weeks: "1",
      recurring_from_session_id: "",
      student_id: student.student_id,
      plan_enrollment_id: planBinding.enrollment ? planBinding.enrollment.enrollment_id : "",
      modification_deadline_at: planBinding.enrollment ? planModificationDeadlineForSession_(slot.start_at, planBinding.cancellation_notice_hours) : "",
      cancellation_notice_hours: String(planBinding.enrollment ? planBinding.cancellation_notice_hours : SESSION_CANCELLATION_NOTICE_HOURS),
      credit_reservation_id: "",
    };
    const reservation = reservePlanCreditForSession_(spreadsheet, planBinding, record);
    if (reservation && !reservation.ok) return reservation;
    if (reservation?.reservation) record.credit_reservation_id = reservation.reservation.credit_ledger_id;
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
    if (assignment.assignment_id ||
      (student.assigned_tutor_id && normalizeValue_(student.assigned_tutor_id) !== normalizeValue_(assignedTutorIdForLead_(parent)))) {
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
```

In `api/portal.js` and `vite.config.js`, add both exact action strings to their `PORTAL_ACTIONS` sets:

```js
  "portal_upsert_student_tutor_assignment",
  "portal_deactivate_student_tutor_assignment",
```

- [ ] **Step 4: Run the CRM and proxy contract tests to verify they pass**

Run: `node --test test/portal-api.test.mjs test/parent-portal.test.mjs`

Expected: PASS with the new proxy actions allowlisted and the CRM contract proving owner-filtered assignment lookup, lock-held slot reconstruction, and conflict detection.

- [ ] **Step 5: Commit the CRM security boundary**

```powershell
git add ops/crm/google-apps-script/Code.gs api/portal.js vite.config.js test/portal-api.test.mjs test/parent-portal.test.mjs
git commit -m "feat: authorize student tutor assignments"
```

## Task 3: Render accessible tutor and subject selection during parent booking

**Files:**
- Create: `src/components/portal/TutorAssignmentPicker.jsx`
- Modify: `test/student-tutor-assignments.test.mjs`
- Modify: `src/pages/Portal.jsx`
- Modify: `src/lib/portalClient.js`
- Modify: `test/parent-portal.test.mjs`

**Interfaces:**
- `TutorAssignmentPicker({ copy, assignments, selectedAssignmentId, onSelect })` renders only the provided safe assignment records.
- `BookingPanel` submits `student_tutor_assignment_id` for a dedicated assignment, and an empty field only for a legacy fallback.
- `upsertPortalStudentTutorAssignment({ token, values })` and `deactivatePortalStudentTutorAssignment({ token, assignmentId })` are operator-only client wrappers.

- [ ] **Step 1: Write the failing picker, payload, and UI contract tests**

Append this test to `test/student-tutor-assignments.test.mjs`:

```js
import { renderToStaticMarkup } from "react-dom/server"
import { createServer } from "vite"

test("renders every assigned tutor with their subjects before slot selection", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const { default: TutorAssignmentPicker } = await vite.ssrLoadModule("/src/components/portal/TutorAssignmentPicker.jsx")
    const html = renderToStaticMarkup(TutorAssignmentPicker({
      copy: { bookingTutorAndSubjects: "Tutor and subjects", bookingTutorAssignmentRequired: "Choose a tutor first" },
      assignments: [
        { assignment_id: "ASSIGN-DAVID", tutor_name: "David", subjects: "Mathematics, Science" },
        { assignment_id: "ASSIGN-JOANIE", tutor_name: "Joanie", subjects: "Science" },
      ],
      selectedAssignmentId: "ASSIGN-DAVID",
      onSelect: () => {},
    }))
    assert.match(html, /Tutor and subjects/)
    assert.match(html, /David/)
    assert.match(html, /Mathematics, Science/)
    assert.match(html, /Joanie/)
    assert.match(html, /aria-pressed="true"/)
  } finally {
    await vite.close()
  }
})
```

Append this test to `test/parent-portal.test.mjs`:

```js
test("parent booking requires an explicit assignment and repeats its tutor subjects", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
  const bookingPanel = source.slice(
    source.indexOf("function BookingPanel("),
    source.indexOf("function BookableSlotCalendar("),
  )

  assert.match(source, /import TutorAssignmentPicker from "@\/components\/portal\/TutorAssignmentPicker"/)
  assert.match(bookingPanel, /getStudentBookingAssignments/)
  assert.match(bookingPanel, /filterBookableSlotsForAssignment/)
  assert.match(bookingPanel, /student_tutor_assignment_id/)
  assert.match(bookingPanel, /copy\.bookingTutorAssignmentSummary/)
  assert.match(bookingPanel, /<TutorAssignmentPicker/)
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/student-tutor-assignments.test.mjs test/parent-portal.test.mjs`

Expected: FAIL because the picker module and assignment payload/UI references do not exist.

- [ ] **Step 3: Implement the picker, parent booking flow, and operator controls**

Create `src/components/portal/TutorAssignmentPicker.jsx`:

```jsx
export default function TutorAssignmentPicker({
  copy,
  assignments = [],
  selectedAssignmentId = "",
  onSelect,
}) {
  if (!assignments.length) return null

  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-semibold text-white/84">{copy.bookingTutorAndSubjects}</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {assignments.map((assignment) => {
          const selected = assignment.assignment_id === selectedAssignmentId
          const label = [assignment.tutor_name, assignment.subjects].filter(Boolean).join(" — ")
          return (
            <button
              key={assignment.assignment_id || `legacy-${assignment.tutor_id}`}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect?.(assignment.assignment_id)}
              className={selected
                ? "rounded-[18px] border border-[#f5c977]/60 bg-[#f5c977]/12 p-4 text-left text-white"
                : "rounded-[18px] border border-white/15 bg-white/5 p-4 text-left text-white transition hover:bg-white/10"}
            >
              <span className="block font-semibold">{assignment.tutor_name || copy.bookingTutorAssignmentRequired}</span>
              <span className="mt-1 block text-sm leading-6 text-white/65">{assignment.subjects || copy.bookingTutorAssignmentRequired}</span>
              <span className="sr-only">{label}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
```

In `src/lib/portalClient.js`, add these wrappers immediately after `assignPortalStudentTutor`:

```js
export async function upsertPortalStudentTutorAssignment({ token, values }) {
  return portalRequest({
    action: "portal_upsert_student_tutor_assignment",
    token,
    ...values,
  })
}

export async function deactivatePortalStudentTutorAssignment({ token, assignmentId }) {
  return portalRequest({
    action: "portal_deactivate_student_tutor_assignment",
    token,
    assignment_id: assignmentId,
  })
}
```

In `src/pages/Portal.jsx`, import the helper functions, picker, and wrappers. Add these exact `copyByLocale` keys:

```js
// fr
bookingTutorAndSubjects: "Tuteur et matières",
bookingTutorAssignmentRequired: "Choisissez d’abord le tuteur qui accompagnera cette séance.",
bookingTutorAssignmentSummary: "Tuteur choisi : {tutor} — Matières assignées : {subjects}",
childTutorAssignments: "Tuteurs et matières assignées",
childTutorAssignmentSubjects: "Matières attribuées",
childTutorAssignmentAdd: "Ajouter cette attribution",
childTutorAssignmentSave: "Enregistrer l’attribution",
childTutorAssignmentDeactivate: "Retirer cette attribution",
childTutorAssignmentSaved: "Attribution tuteur et matières enregistrée.",
childTutorAssignmentDeactivated: "Attribution retirée.",
studentTutorAssignmentDetailsRequired: "Choisissez un tuteur actif et indiquez au moins une matière.",
studentTutorAssignmentRequired: "Choisissez le tuteur et les matières avant de sélectionner un créneau.",
studentTutorAssignmentNotAvailable: "Cette attribution n’est plus disponible. Actualisez le portail et choisissez de nouveau.",
studentTutorAssignmentExists: "Ce tuteur est déjà attribué à cet élève. Modifiez ses matières dans l’attribution existante.",

// en
bookingTutorAndSubjects: "Tutor and subjects",
bookingTutorAssignmentRequired: "Choose the tutor for this session first.",
bookingTutorAssignmentSummary: "Selected tutor: {tutor} — Assigned subjects: {subjects}",
childTutorAssignments: "Assigned tutors and subjects",
childTutorAssignmentSubjects: "Assigned subjects",
childTutorAssignmentAdd: "Add this assignment",
childTutorAssignmentSave: "Save assignment",
childTutorAssignmentDeactivate: "Remove this assignment",
childTutorAssignmentSaved: "Tutor and subject assignment saved.",
childTutorAssignmentDeactivated: "Assignment removed.",
studentTutorAssignmentDetailsRequired: "Choose an active tutor and enter at least one subject.",
studentTutorAssignmentRequired: "Choose the tutor and subjects before selecting a time.",
studentTutorAssignmentNotAvailable: "This assignment is no longer available. Refresh the portal and choose again.",
studentTutorAssignmentExists: "This tutor is already assigned to this student. Edit the existing assignment subjects.",
```

Extend `getPortalErrorMessage(copy, code)` with these exact mappings before its generic fallback:

```js
  if (code === "STUDENT_TUTOR_ASSIGNMENT_DETAILS_REQUIRED") return copy.studentTutorAssignmentDetailsRequired
  if (code === "STUDENT_TUTOR_ASSIGNMENT_REQUIRED") return copy.studentTutorAssignmentRequired
  if (code === "STUDENT_TUTOR_ASSIGNMENT_NOT_AVAILABLE") return copy.studentTutorAssignmentNotAvailable
  if (code === "STUDENT_TUTOR_ASSIGNMENT_EXISTS") return copy.studentTutorAssignmentExists
```

Replace the single-tutor derivation at the start of `BookingPanel` with the following state and derived values:

```jsx
  const bookingAssignments = getStudentBookingAssignments({
    student: selectedStudent || {},
    assignments: dashboard.student_tutor_assignments,
    matching,
  })
  const [selectedAssignmentId, setSelectedAssignmentId] = useState("")
  const selectedAssignment = bookingAssignments.find((assignment) => assignment.assignment_id === selectedAssignmentId) || null
  const visibleSlots = filterBookableSlotsForAssignment(slots, selectedAssignment)
```

Add an effect that resets `selectedAssignmentId` and `slotId` whenever the student changes; auto-select the only assignment only when `bookingAssignments.length === 1`. Render `<TutorAssignmentPicker>` before `<BookableSlotCalendar>`. Do not render the calendar, price, or submit button until `selectedAssignment` exists. Submit:

```js
        student_tutor_assignment_id: selectedAssignment?.is_legacy ? "" : selectedAssignment?.assignment_id || "",
```

Render the summary with:

```jsx
{selectedAssignment ? (
  <p className="mt-3 text-sm leading-6 text-white/68">
    {copy.bookingTutorAssignmentSummary
      .replace("{tutor}", selectedAssignment.tutor_name || "-")
      .replace("{subjects}", selectedAssignment.subjects || "-")}
  </p>
) : null}
```

Add this `StudentTutorAssignmentEditor` immediately before `FamilyStudentsPanel`:

```jsx
function StudentTutorAssignmentEditor({ copy, student, assignments = [], tutors = [], token, onSaved }) {
  const [values, setValues] = useState({ assignment_id: "", tutor_id: "", subjects: "" })
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  function startEditing(assignment) {
    setValues({
      assignment_id: assignment.assignment_id,
      tutor_id: assignment.tutor_id,
      subjects: assignment.subjects,
    })
    setStatus("")
  }

  async function saveAssignment(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await upsertPortalStudentTutorAssignment({
      token,
      values: { ...values, student_id: student.student_id },
    })
    setIsSaving(false)
    if (!result.ok) {
      setStatus(getPortalErrorMessage(copy, result.code))
      return
    }
    setValues({ assignment_id: "", tutor_id: "", subjects: "" })
    setStatus(copy.childTutorAssignmentSaved)
    onSaved?.()
  }

  async function deactivateAssignment(assignmentId) {
    setIsSaving(true)
    setStatus("")
    const result = await deactivatePortalStudentTutorAssignment({ token, assignmentId })
    setIsSaving(false)
    if (!result.ok) {
      setStatus(getPortalErrorMessage(copy, result.code))
      return
    }
    if (values.assignment_id === assignmentId) setValues({ assignment_id: "", tutor_id: "", subjects: "" })
    setStatus(copy.childTutorAssignmentDeactivated)
    onSaved?.()
  }

  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <div className="text-sm font-semibold text-white/84">{copy.childTutorAssignments}</div>
      <div className="mt-3 space-y-2">
        {assignments.map((assignment) => (
          <div key={assignment.assignment_id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <button type="button" onClick={() => startEditing(assignment)} className="text-left text-sm text-white/82 hover:text-[#f5c977]">
              {assignment.tutor_name} — {assignment.subjects}
            </button>
            <Button type="button" variant="outline" disabled={isSaving} onClick={() => deactivateAssignment(assignment.assignment_id)} className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              {copy.childTutorAssignmentDeactivate}
            </Button>
          </div>
        ))}
      </div>
      <form onSubmit={saveAssignment} className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        <select value={values.tutor_id} onChange={(event) => setValues((current) => ({ ...current, tutor_id: event.target.value }))} required className="h-11 rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
          <option value="">{copy.chooseTutor}</option>
          {tutors.map((tutor) => <option key={tutor.tutor_id} value={tutor.tutor_id}>{tutor.tutor_name}</option>)}
        </select>
        <Input value={values.subjects} onChange={(event) => setValues((current) => ({ ...current, subjects: event.target.value }))} required placeholder={copy.childTutorAssignmentSubjects} className="h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
        <Button type="submit" disabled={isSaving} className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
          <UserPlus className="h-4 w-4" />
          {values.assignment_id ? copy.childTutorAssignmentSave : copy.childTutorAssignmentAdd}
        </Button>
      </form>
      {status ? <p className="mt-3 text-sm leading-6 text-white/68">{status}</p> : null}
    </div>
  )
}
```

Change `FamilyStudentsPanel` to accept `tutorAssignments = []`. Inside its student map, derive `const studentTutorAssignments = tutorAssignments.filter((assignment) => assignment.student_id === student.student_id)`. In the operator branch, replace the existing one-tutor `<select>` and `assignTutor` button with:

```jsx
<StudentTutorAssignmentEditor
  copy={copy}
  student={student}
  assignments={studentTutorAssignments}
  tutors={tutors}
  token={token}
  onSaved={onSaved}
/>
```

In the parent branch, render the same assignment rows as non-interactive text. Pass `tutorAssignments={dashboard.student_tutor_assignments}` from `ParentDashboard` and `tutorAssignments={selectedParent.student_tutor_assignments || []}` from `ParentManagementPanel` into their `FamilyStudentsPanel` calls.

- [ ] **Step 4: Run the focused UI and client tests to verify they pass**

Run: `node --test test/student-tutor-assignments.test.mjs test/parent-portal.test.mjs`

Expected: PASS; static markup contains both tutor names, their subjects, and the selected accessible state, while the booking source requires the assignment payload and summary.

- [ ] **Step 5: Commit the parent and operator experience**

```powershell
git add src/components/portal/TutorAssignmentPicker.jsx src/lib/portalClient.js src/pages/Portal.jsx test/student-tutor-assignments.test.mjs test/parent-portal.test.mjs
git commit -m "feat: choose assigned tutor subjects when booking"
```

## Task 4: Verify the complete availability and portal contract

**Files:**
- Modify: `scripts/check-static-site.mjs`
- Modify: `test/parent-portal.test.mjs`
- Modify: `package.json`

**Interfaces:**
- `npm.cmd run test:portal` includes `test/student-tutor-assignments.test.mjs`.
- `npm.cmd run test:site` verifies the proxy action parity, production build, and static portal contract after the new UI is bundled.

- [ ] **Step 1: Write the failing static-site contract**

In `scripts/check-static-site.mjs`, add this assertion near the existing portal security assertions in `verifyFinalReviewSafetyContracts`:

```js
  const bookingSource = appsScriptSource.slice(
    appsScriptSource.indexOf("function bookPortalSession_("),
    appsScriptSource.indexOf("function submitParentFeedback_("),
  )
  expect(appsScriptSource.includes("CRM_STUDENT_TUTOR_ASSIGNMENT_SHEET_NAME"), "Apps Script: student tutor assignment sheet is missing")
  expect(bookingSource.includes("resolveStudentTutorAssignmentForBooking_"), "Apps Script: booking does not authorize the selected student tutor assignment")
  expect(bookingSource.indexOf("const bookingLock = LockService.getScriptLock()") < bookingSource.indexOf("buildBookableSlots_(spreadsheet, 21)"), "Apps Script: booking must rebuild tutor slots after it holds the scheduling lock")
  expect(bookingSource.includes("hasTutorSessionConflict_(spreadsheet, record.tutor_id"), "Apps Script: tutor availability conflict guard is missing")
  expect(portalSource.includes("student_tutor_assignment_id"), "Parent portal: selected tutor assignment is not sent with the booking")
```

Update `package.json`:

```json
"test:portal": "node --test test/portal-api.test.mjs test/portal-materials.test.mjs test/parent-portal.test.mjs test/student-tutor-assignments.test.mjs"
```

- [ ] **Step 2: Run the complete portal suite to verify it fails**

Run: `npm.cmd run test:portal`

Expected: FAIL until the source contains the lock-held assignment and availability contract, and until the package script includes the new test file.

- [ ] **Step 3: Implement the static contract and test entrypoint exactly as shown**

Add the displayed `bookingSource` and `expect` statements in `verifyFinalReviewSafetyContracts`, keeping the existing assertions unchanged. Replace only the `test:portal` value in `package.json` with the displayed command.

- [ ] **Step 4: Run all required verification commands**

Run:

```powershell
npm.cmd run test:portal
npm.cmd run test:payments
npm.cmd run test:site
```

Expected: Every command exits `0`; `test:site` completes the Vite build, static SEO generation, and static site checks.

- [ ] **Step 5: Commit the verification contract**

```powershell
git add scripts/check-static-site.mjs package.json test/parent-portal.test.mjs
git commit -m "test: verify multi-tutor booking availability"
```

## Final Verification

- [ ] Run `git diff --check` and confirm no whitespace errors.
- [ ] Run `git status --short` and confirm only intentional feature files are staged or committed; preserve the pre-existing edits to `ops/paperclip/state/urgent-alert-state.md`, `package-lock.json`, and `.superpowers/`.
- [ ] Run `npm.cmd run test:portal`, `npm.cmd run test:payments`, and `npm.cmd run test:site` after the final commit.
- [ ] Inspect the final `BookingPanel` source to confirm a parent cannot see slots before choosing one of multiple assignments and that the summary repeats the selected tutor and subjects.
- [ ] Inspect `bookPortalSession_` to confirm assignment authorization, slot reconstruction, conflict detection, session write, and any credit reservation occur in the scheduling-lock path.
