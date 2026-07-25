# Parent Portal Simplification and Secure Uploads Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Give parents a calm, next-action-focused portal and let them privately share session photos and PDFs with the assigned tutor through Google Drive.

**Architecture:** The existing Vercel portal proxy remains the only browser-to-CRM path. A new authenticated JSON action uploads one 2.5 MiB-or-smaller file at a time to Apps Script, which stores it in a non-public Drive session folder, grants the assigned tutor viewer access, and stores only metadata in a new CRM sheet. The parent portal switches among four concise destinations while preserving existing session, payment, profile, and feedback controls.

**Tech Stack:** React 18, Vite 7, Tailwind, Node built-in test runner, Vercel Node functions, Google Apps Script, Google Sheets, Google Drive.

## Global Constraints

- Accept images and PDFs only; allow no more than five active materials per linked upcoming session.
- Each decoded file is at most 2.5 MiB (2621440 bytes). Images are compressed before transfer, PDFs are not transformed.
- Upload one file per request. Production and local portal proxies accept at most 4 MiB JSON.
- Never create public Drive links, expose participant emails, put bytes in Sheets/dashboard responses/logs/emails, or email an attachment.
- Only the assigned tutor is granted Drive viewer access. Parent can withdraw before the session; automation removes files 30 days after session end.
- The Today screen contains exactly one primary action and factual Prepare, Session, Recap stages—no points, badges, streaks, or rewards.
- Preserve unrelated working-tree changes and do not re-enable any Paperclip automation.

---

## File Structure

| File | Responsibility |
| --- | --- |
| src/lib/portalMaterials.js | Material validation, image compression, Base64 encoding, session-material selector. |
| src/lib/parentPortal.js | Pure one-action and three-stage parent-home selectors. |
| src/components/portal/ParentPortalNavigation.jsx | Accessible Today/Sessions/Messages/Family navigation. |
| src/components/portal/SessionMaterialsPanel.jsx | Parent selection, sequential upload, withdrawal, and truthful feedback. |
| src/components/portal/TutorSessionMaterialsPanel.jsx | Tutor-only session material links. |
| src/lib/portalClient.js | Upload and withdrawal request wrappers. |
| api/portal.js and vite.config.js | Matching action allowlists and 4 MiB proxy limits. |
| ops/crm/google-apps-script/Code.gs | Schema, Drive permissions, lifecycle, authorization, dashboard data, cleanup. |
| test/portal-api.test.mjs | Proxy allowlist, secret forwarding, and body-limit tests. |
| test/portal-materials.test.mjs | Material validation and session selector tests. |
| test/parent-portal.test.mjs | One-action and factual-progress tests. |
| src/pages/Portal.jsx | Localized composition root for parent and tutor UI. |
| package.json, README.md, ops/crm/parent-tutor-portal.md | Test command, rollout configuration, retention, and manual acceptance guide. |

## Task 1: Define testable material and parent-home contracts

**Files:**
- Create: src/lib/portalMaterials.js
- Create: src/lib/parentPortal.js
- Create: test/portal-materials.test.mjs
- Create: test/parent-portal.test.mjs
- Modify: package.json

**Interfaces:**
- Produces MAX_PORTAL_MATERIAL_FILES, MAX_PORTAL_MATERIAL_BYTES, validatePortalMaterialFile(file), preparePortalMaterialUpload(file), and getSessionMaterials(materials, sessionId).
- Produces getParentNextAction(dashboard) and getParentSessionProgress(session, materials, notes).

- [ ] **Step 1: Write failing material tests**

Create test/portal-materials.test.mjs:

~~~js
import assert from "node:assert/strict"
import test from "node:test"
import {
  MAX_PORTAL_MATERIAL_BYTES,
  MAX_PORTAL_MATERIAL_FILES,
  getSessionMaterials,
  validatePortalMaterialFile,
} from "../src/lib/portalMaterials.js"

test("accepts supported material at the byte limit", () => {
  assert.deepEqual(validatePortalMaterialFile({
    name: "algebra.jpg", type: "image/jpeg", size: MAX_PORTAL_MATERIAL_BYTES,
  }), { ok: true })
  assert.deepEqual(validatePortalMaterialFile({
    name: "chapter.pdf", type: "application/pdf", size: 1024,
  }), { ok: true })
})

test("rejects unsupported and oversize material", () => {
  assert.equal(validatePortalMaterialFile({
    name: "answers.docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", size: 10,
  }).code, "SESSION_MATERIAL_TYPE_NOT_ALLOWED")
  assert.equal(validatePortalMaterialFile({
    name: "scan.pdf", type: "application/pdf", size: MAX_PORTAL_MATERIAL_BYTES + 1,
  }).code, "SESSION_MATERIAL_FILE_TOO_LARGE")
  assert.equal(MAX_PORTAL_MATERIAL_FILES, 5)
})

test("shows only active material for the requested session", () => {
  const materials = [
    { material_id: "MAT-1", session_id: "S-1", status: "shared" },
    { material_id: "MAT-2", session_id: "S-1", status: "withdrawn" },
    { material_id: "MAT-3", session_id: "S-2", status: "shared" },
  ]
  assert.deepEqual(getSessionMaterials(materials, "S-1").map((item) => item.material_id), ["MAT-1"])
})
~~~

Create test/parent-portal.test.mjs:

~~~js
import assert from "node:assert/strict"
import test from "node:test"
import { getParentNextAction, getParentSessionProgress } from "../src/lib/parentPortal.js"

test("returns one prepare action for an upcoming confirmed session", () => {
  const action = getParentNextAction({
    profile: { name: "Parent" }, matching: { tutor_id: "T-1" },
    sessions: [{ session_id: "S-1", session_status: "confirmed", start_at: "2099-01-01T15:00:00.000Z" }],
    metrics: { payments_due: 0, messages_waiting: 0 }, session_materials: [],
  })
  assert.deepEqual(action, { key: "prepare", destination: "today", sessionId: "S-1" })
})

test("uses the fixed next-action priority", () => {
  assert.equal(getParentNextAction({ profile: {}, sessions: [] }).key, "profile")
  assert.equal(getParentNextAction({ profile: { name: "P" }, matching: {}, sessions: [] }).key, "matching")
  assert.equal(getParentNextAction({ profile: { name: "P" }, matching: { tutor_id: "T" }, sessions: [], metrics: {} }).key, "booking")
  assert.equal(getParentNextAction({ profile: { name: "P" }, matching: { tutor_id: "T" }, sessions: [{ session_status: "confirmed" }], metrics: { payments_due: 1 } }).key, "payment")
})

test("keeps recap current until a released note exists", () => {
  assert.deepEqual(getParentSessionProgress(
    { session_id: "S-1", session_status: "completed", end_at: "2000-01-01T15:00:00.000Z" },
    [], [],
  ), ["done", "done", "current"])
})
~~~

- [ ] **Step 2: Run the tests to verify they fail**

Run: node --test test/portal-materials.test.mjs test/parent-portal.test.mjs

Expected: ERR_MODULE_NOT_FOUND for the two new library modules.

- [ ] **Step 3: Implement the pure contracts**

Create src/lib/portalMaterials.js with:

~~~js
export const MAX_PORTAL_MATERIAL_FILES = 5
export const MAX_PORTAL_MATERIAL_BYTES = 2621440
export const PORTAL_MATERIAL_MIME_TYPES = new Set([
  "image/jpeg", "image/png", "image/webp", "application/pdf",
])

export function validatePortalMaterialFile(file = {}) {
  if (!PORTAL_MATERIAL_MIME_TYPES.has(String(file.type || "").toLowerCase())) {
    return { ok: false, code: "SESSION_MATERIAL_TYPE_NOT_ALLOWED" }
  }
  if (!Number.isFinite(Number(file.size)) || Number(file.size) < 1) {
    return { ok: false, code: "SESSION_MATERIAL_FILE_INVALID" }
  }
  if (Number(file.size) > MAX_PORTAL_MATERIAL_BYTES) {
    return { ok: false, code: "SESSION_MATERIAL_FILE_TOO_LARGE" }
  }
  return { ok: true }
}

export function getSessionMaterials(materials = [], sessionId = "") {
  return (Array.isArray(materials) ? materials : [])
    .filter((material) => material && material.session_id === sessionId)
    .filter((material) => material.status === "shared")
}
~~~

Also implement preparePortalMaterialUpload(file). For JPEG/PNG/WebP, use an offscreen canvas and decreasing JPEG quality to create a blob no larger than MAX_PORTAL_MATERIAL_BYTES; fail with SESSION_MATERIAL_IMAGE_PROCESSING_FAILED if decoding/compression fails. PDFs remain unchanged. Use FileReader.readAsDataURL and return { file_name, mime_type, size_bytes, data_base64 } after stripping the prefix.

Create src/lib/parentPortal.js. getParentNextAction returns one object in this order: profile, matching, booking, payment, message, prepare, all_set. Its destinations are account, sessions, sessions, sessions, messages, today, today. getParentSessionProgress returns exactly three statuses in Prepare/Session/Recap order using session state, material/note presence, time, and released parent note.

Add this package script:

~~~json
"test:portal": "node --test test/portal-api.test.mjs test/portal-materials.test.mjs test/parent-portal.test.mjs"
~~~

- [ ] **Step 4: Run the pure-contract tests**

Run: node --test test/portal-materials.test.mjs test/parent-portal.test.mjs

Expected: all six tests pass.

- [ ] **Step 5: Commit**

~~~powershell
git add package.json src/lib/portalMaterials.js src/lib/parentPortal.js test/portal-materials.test.mjs test/parent-portal.test.mjs
git commit -m "test: define parent portal material contracts"
~~~

## Task 2: Harden local and production proxies

**Files:**
- Modify: api/portal.js
- Modify: vite.config.js
- Create: test/portal-api.test.mjs

**Interfaces:**
- Produces exported PORTAL_ACTIONS and MAX_PORTAL_BODY_BYTES.
- Adds portal_upload_session_material and portal_withdraw_session_material to both proxy allowlists.

- [ ] **Step 1: Write failing API tests**

Create test/portal-api.test.mjs using the Readable request and response-helper style already used by test/stripe-checkout.test.mjs:

~~~js
import assert from "node:assert/strict"
import { Readable } from "node:stream"
import test from "node:test"
import portalHandler, { MAX_PORTAL_BODY_BYTES, PORTAL_ACTIONS } from "../api/portal.js"

test("allowlists the material actions at the bounded upload limit", () => {
  assert.equal(PORTAL_ACTIONS.has("portal_upload_session_material"), true)
  assert.equal(PORTAL_ACTIONS.has("portal_withdraw_session_material"), true)
  assert.equal(MAX_PORTAL_BODY_BYTES, 4 * 1024 * 1024)
})

test("forwards material action with the server-only secret", async () => {
  const originalFetch = globalThis.fetch
  const originalUrl = process.env.CRM_WEBHOOK_URL
  const originalSecret = process.env.CRM_PORTAL_SECRET
  const calls = []
  process.env.CRM_WEBHOOK_URL = "https://crm.example.test"
  process.env.CRM_PORTAL_SECRET = "shared-secret"
  globalThis.fetch = async (_url, options) => {
    calls.push(JSON.parse(options.body))
    return new Response(JSON.stringify({ ok: true, material: { material_id: "MAT-1" } }), {
      status: 200, headers: { "content-type": "application/json" },
    })
  }
  const response = makeResponse()
  try {
    await portalHandler({
      method: "POST",
      body: { action: "portal_upload_session_material", token: "parent-token", session_id: "S-1", file_name: "math.jpg", mime_type: "image/jpeg", size_bytes: 12, data_base64: "AA==" },
      headers: {}, socket: {},
    }, response)
  } finally {
    globalThis.fetch = originalFetch
    restoreEnvironment("CRM_WEBHOOK_URL", originalUrl)
    restoreEnvironment("CRM_PORTAL_SECRET", originalSecret)
  }
  assert.equal(response.statusCode, 200)
  assert.equal(calls[0].portal_secret, "shared-secret")
  assert.equal(response.payload.portal_secret, undefined)
})

test("rejects an oversized streamed material payload", async () => {
  const request = Readable.from(["x".repeat(MAX_PORTAL_BODY_BYTES + 1)])
  request.method = "POST"
  request.headers = {}
  request.socket = {}
  const response = makeResponse()
  await portalHandler(request, response)
  assert.equal(response.statusCode, 400)
  assert.equal(response.payload.code, "INVALID_JSON")
})
~~~

Copy the existing makeResponse and restoreEnvironment helpers into this test file.

- [ ] **Step 2: Run the API test to verify failure**

Run: node --test test/portal-api.test.mjs

Expected: named exports fail and the actions are not allowlisted.

- [ ] **Step 3: Implement matching proxies**

In api/portal.js, replace the private action set and 120 KiB limit with:

~~~js
export const MAX_PORTAL_BODY_BYTES = 4 * 1024 * 1024
export const PORTAL_ACTIONS = new Set([
  "portal_create_account", "portal_request_code", "portal_verify_code", "portal_get_dashboard",
  "portal_create_session", "portal_respond_to_session", "portal_submit_session_note",
  "portal_book_session", "portal_submit_parent_feedback", "portal_update_parent_profile",
  "portal_upsert_student", "portal_assign_student_tutor", "portal_delete_test_record",
  "portal_delete_test_records", "portal_create_parent", "portal_upsert_parent",
  "portal_update_lead_follow_up", "portal_set_parent_access", "portal_delete_parent",
  "portal_assign_tutor", "portal_create_tutor", "portal_update_tutor_calendar",
  "portal_delete_tutor", "portal_invite_tutor", "portal_send_session_message",
  "portal_cancel_session", "portal_reschedule_session", "portal_upsert_tutor_availability",
  "portal_reissue_payment_checkout", "portal_update_request_status", "portal_create_request",
  "portal_upsert_plan", "portal_create_plan_enrollment", "portal_create_plan_payment_request",
  "portal_update_plan_enrollment", "portal_pause_plan_enrollment", "portal_resume_plan_enrollment",
  "portal_adjust_plan_credits", "portal_get_plan_change_deadline",
  "portal_upload_session_material",
  "portal_withdraw_session_material",
])
~~~

Replace existing ALLOWED_ACTIONS references with PORTAL_ACTIONS. Retain the current rate limit, CRM secret injection, timeout, and generic 400 INVALID_JSON body-limit failure.

In vite.config.js, set MAX_PORTAL_BODY_BYTES to 4 * 1024 * 1024 and add the exact same action names to PORTAL_ACTIONS. Do not create local-only upload behavior.

- [ ] **Step 4: Verify proxy behavior**

Run: npm.cmd run test:portal

Expected: portal API, material, and parent-home tests pass.

Run: npm.cmd run build

Expected: Vite build and static SEO generation succeed.

- [ ] **Step 5: Commit**

~~~powershell
git add api/portal.js vite.config.js test/portal-api.test.mjs
git commit -m "feat: allow bounded secure material uploads"
~~~

## Task 3: Store private material in Drive with an auditable lifecycle

**Files:**
- Modify: ops/crm/google-apps-script/Code.gs
- Modify: ops/crm/parent-tutor-portal.md

**Interfaces:**
- Consumes portal_upload_session_material with token, session_id, file_name, mime_type, size_bytes, data_base64.
- Consumes portal_withdraw_session_material with token and material_id.
- Produces dashboard.session_materials. Parent records contain metadata; tutor records additionally contain drive_url.

- [ ] **Step 1: Add schema, setup, and dispatch**

At the Code.gs constant section, add:

~~~js
const CRM_SESSION_MATERIAL_SHEET_NAME = "Session Materials";
const PORTAL_MATERIALS_DRIVE_FOLDER_PROPERTY = "PORTAL_MATERIALS_DRIVE_FOLDER_ID";
const PORTAL_MATERIAL_MAX_BYTES = 2621440;
const PORTAL_MATERIAL_MAX_FILES_PER_SESSION = 5;
const PORTAL_MATERIAL_RETENTION_DAYS = 30;
const PORTAL_MATERIAL_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const SESSION_MATERIAL_COLUMNS = [
  "material_id", "session_id", "lead_id", "parent_email", "tutor_id", "tutor_email",
  "drive_file_id", "file_name", "mime_type", "size_bytes", "status",
  "created_at", "withdrawn_at", "expires_at",
];
~~~

Add the sheet to CRM_REQUIRED_SHEET_NAMES, call setupSessionMaterialsSheet_ from setupCrm, and use setupStructuredSheet_ plus a shared/withdrawn/expired status validation list. Add these cases to handlePortalAction_:

~~~js
case "portal_upload_session_material":
  return uploadPortalSessionMaterial_(spreadsheet, payload);
case "portal_withdraw_session_material":
  return withdrawPortalSessionMaterial_(spreadsheet, payload);
~~~

- [ ] **Step 2: Implement verified upload and withdrawal**

Use this flow in uploadPortalSessionMaterial_:

~~~js
const portalSession = verifyPortalSession_(spreadsheet, payload.token, "parent");
if (!portalSession.ok) return portalSession;
const sessionRecord = findSessionForPortalAccess_(spreadsheet, portalSession.access, payload.session_id);
if (!sessionRecord || !isUpcomingDate_(sessionRecord.data.start_at)) {
  return { ok: false, code: "SESSION_MATERIAL_NOT_AVAILABLE" };
}
const validated = validatePortalMaterialPayload_(payload);
if (!validated.ok) return validated;
const active = getSessionMaterialRecords_(spreadsheet, sessionRecord.data.session_id)
  .filter((record) => normalizeValue_(record.data.status) === "shared");
if (active.length >= PORTAL_MATERIAL_MAX_FILES_PER_SESSION) {
  return { ok: false, code: "SESSION_MATERIAL_LIMIT_REACHED" };
}
const folder = getPortalSessionMaterialsFolder_(sessionRecord.data.session_id);
const file = folder.createFile(Utilities.newBlob(
  Utilities.base64Decode(validated.data_base64), validated.mime_type, validated.file_name,
));
file.addViewer(sessionRecord.data.tutor_calendar_email);
const material = createSessionMaterialRecord_(spreadsheet, sessionRecord.data, file, validated);
appendSessionMaterialNotification_(spreadsheet, sessionRecord.data, portalSession.access, material);
return { ok: true, material: sanitizeSessionMaterialForParent_(material) };
~~~

validatePortalMaterialPayload_ must reject data-URL prefixes, blank/invalid Base64, unsafe or over-180-character names, unsupported MIME, mismatched declared/decoded sizes, and bytes above PORTAL_MATERIAL_MAX_BYTES. Return only SESSION_MATERIAL_FILE_INVALID, SESSION_MATERIAL_TYPE_NOT_ALLOWED, or SESSION_MATERIAL_FILE_TOO_LARGE for these checks.

getPortalSessionMaterialsFolder_ reads Script Property PORTAL_MATERIALS_DRIVE_FOLDER_ID, returns SESSION_MATERIAL_STORAGE_NOT_CONFIGURED when missing, and finds/creates a session-ID subfolder. It must never make a folder or file public. If sharing with the tutor fails, trash the new file and return SESSION_MATERIAL_SHARE_FAILED.

withdrawPortalSessionMaterial_ verifies a parent session, matching parent_email, shared status, and an upcoming session. It trashes the Drive file (a missing prior file is still successful cleanup), then writes status withdrawn and withdrawn_at.

- [ ] **Step 3: Add dashboard filtering, notifications, and expiry**

Add buildSessionMaterialsForAccess_(spreadsheet, access, sessions). It uses only role-owned session IDs, excludes withdrawn/expired rows, and serializes:

~~~js
function sanitizeSessionMaterialForParent_(record) {
  return {
    material_id: record.material_id,
    session_id: record.session_id,
    file_name: record.file_name,
    mime_type: record.mime_type,
    size_bytes: Number(record.size_bytes) || 0,
    status: record.status,
    created_at: record.created_at,
    expires_at: record.expires_at,
  };
}

function sanitizeSessionMaterialForTutor_(record) {
  return { ...sanitizeSessionMaterialForParent_(record), drive_url: DriveApp.getFileById(record.drive_file_id).getUrl() };
}
~~~

Attach session_materials to buildParentPortalDashboard_ and buildTutorPortalDashboard_. Add informational material notifications to Portal Messages with message_status info; extend validation to support info and keep info rows out of the 24-hour reply SLA. Notify through the existing email path, whose email contains the portal URL only.

Add expireSessionMaterials_(spreadsheet) to runPortalAutomation. It trashes shared Drive files after expires_at and sets status expired. createSessionMaterialRecord_ sets expires_at to session end plus 30 days. Add record/Drive cleanup to existing parent and explicit-test-record cascade deletion paths.

- [ ] **Step 4: Add exact manual CRM acceptance notes**

Add this to ops/crm/parent-tutor-portal.md:

~~~markdown
1. Configure a non-production PORTAL_MATERIALS_DRIVE_FOLDER_ID and run setupCrm once to grant Drive scope.
2. A linked test parent uploads a sub-2.5 MiB JPEG to a future session: one material row, a non-public Drive file, and no bytes in Sheets.
3. Assigned tutor sees and opens it; unrelated tutor sees neither metadata nor URL.
4. DOCX, 2.5 MiB-plus-one-byte PDF, and sixth material are rejected without a row or Drive file.
5. Parent withdrawal trashes the file and removes it from both portal views.
6. A past-due material expires when runPortalAutomation runs and is marked expired.
~~~

- [ ] **Step 5: Run non-production acceptance and commit**

Run the six cases using test accounts, test session, and a test Drive folder. Record date, file type/size, and outcome in the same document.

~~~powershell
git add ops/crm/google-apps-script/Code.gs ops/crm/parent-tutor-portal.md
git commit -m "feat: store private session materials in Drive"
~~~

## Task 4: Build truthful parent upload and tutor-view UI

**Files:**
- Modify: src/lib/portalClient.js
- Create: src/components/portal/SessionMaterialsPanel.jsx
- Create: src/components/portal/TutorSessionMaterialsPanel.jsx
- Modify: src/pages/Portal.jsx

**Interfaces:**
- Consumes portal material client wrappers and dashboard.session_materials.
- Produces parent states ready/uploading/shared/failed and tutor links only when drive_url is returned.

- [ ] **Step 1: Add client wrappers**

In src/lib/portalClient.js:

~~~js
export async function uploadPortalSessionMaterial({ token, sessionId, material }) {
  return portalRequest({
    action: "portal_upload_session_material",
    token,
    session_id: sessionId,
    ...material,
  })
}

export async function withdrawPortalSessionMaterial({ token, materialId }) {
  return portalRequest({
    action: "portal_withdraw_session_material",
    token,
    material_id: materialId,
  })
}
~~~

- [ ] **Step 2: Implement SessionMaterialsPanel**

Create the component with props copy, session, materials, token, onSaved, formatDateTime, getErrorMessage. Keep staged entries shaped as { id, file, name, state, error }. State is ready, uploading, shared, or failed.

The one Send to tutor button sequentially processes ready entries with for...of: preparePortalMaterialUpload(file), uploadPortalSessionMaterial, then updates that row before processing the next. A failure remains retryable and does not prevent later files. Enforce the five-file limit while staging.

Show shared CRM data via getSessionMaterials(materials, session.session_id), label each successful item Shared with your tutor, and show withdrawal only for an upcoming session. Preserve the existing text preparation note by sending it after upload via sendPortalSessionMessage. Do not state or imply that the tutor opened a file.

- [ ] **Step 3: Implement TutorSessionMaterialsPanel**

Create the component with props copy, sessions, materials. Group active materials by session. Render no panel when empty. Link only a returned tutor material URL:

~~~jsx
<a href={material.drive_url} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]">
  <FileText className="h-4 w-4" />
  <span className="truncate">{material.file_name}</span>
  <ExternalLink className="h-4 w-4" />
</a>
~~~

Never construct a Drive URL in the browser.

- [ ] **Step 4: Replace fake local staging and verify**

In Portal.jsx, remove the current localFiles-only SessionPreparationCard and all copy that says files remain on the device. Import SessionMaterialsPanel in its place and TutorSessionMaterialsPanel below the tutor next-session card. Add complete French/English copy for file type, 2.5 MiB limit, five-file cap, processing failure, Send to tutor, Shared with your tutor, Withdraw, retention, and Open material. Map each CRM error code through getPortalErrorMessage.

Run: npm.cmd run build

Expected: successful build with no unresolved imports.

Use npm.cmd run dev:full with test parent/tutor accounts on mobile and desktop. Confirm camera selection, sequential progress, no premature shared claim, tutor visibility, and withdrawal refresh.

- [ ] **Step 5: Commit**

~~~powershell
git add src/lib/portalClient.js src/components/portal/SessionMaterialsPanel.jsx src/components/portal/TutorSessionMaterialsPanel.jsx src/pages/Portal.jsx
git commit -m "feat: let parents share session materials with tutors"
~~~

## Task 5: Simplify the parent journey into four destinations

**Files:**
- Create: src/components/portal/ParentPortalNavigation.jsx
- Modify: src/lib/parentPortal.js
- Modify: src/pages/Portal.jsx
- Modify: test/parent-portal.test.mjs

**Interfaces:**
- Consumes getParentNextAction and getParentSessionProgress.
- Produces today, sessions, messages, account destination state without changing existing session/payment/profile server actions.

- [ ] **Step 1: Add failing destination tests**

Append:

~~~js
test("routes each primary action to its focused destination", () => {
  assert.equal(getParentNextAction({ profile: {}, sessions: [] }).destination, "account")
  assert.equal(getParentNextAction({
    profile: { name: "P" }, matching: { tutor_id: "T" }, sessions: [], metrics: {},
  }).destination, "sessions")
  assert.equal(getParentNextAction({
    profile: { name: "P" }, matching: { tutor_id: "T" },
    sessions: [{ session_id: "S", session_status: "confirmed", start_at: "2099-01-01T15:00:00.000Z" }],
    metrics: { messages_waiting: 1 }, session_materials: [{ session_id: "S", status: "shared" }],
  }).destination, "messages")
})
~~~

Run: node --test test/parent-portal.test.mjs

Expected: destination assertion fails until selector/UI mapping is complete.

- [ ] **Step 2: Add accessible navigation**

Create src/components/portal/ParentPortalNavigation.jsx:

~~~jsx
export default function ParentPortalNavigation({ active, items, onChange, ariaLabel }) {
  return (
    <nav aria-label={ariaLabel} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map(({ key, label, icon: Icon }) => (
        <button key={key} type="button" onClick={() => onChange(key)}
          aria-current={active === key ? "page" : undefined}
          className={active === key
            ? "flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#f5c977] px-3 py-2 text-sm font-semibold text-[#071631] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            : "flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"}>
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </nav>
  )
}
~~~

Use the actual existing Tailwind button treatments: high-contrast active gold surface, subdued inactive white/5 surface, min-height 44px, visible focus styles, and no color-only selected state.

- [ ] **Step 3: Recompose ParentDashboard**

In Portal.jsx, add destination state defaulting to today and render ParentPortalNavigation. Use getParentNextAction(dashboard) to render only one primary action with an openDestination callback.

Destination contents:
- Today: primary action, next session, SessionMaterialsPanel, three factual progress stages, compact status only.
- Sessions: calendar, BookingPanel, session rows, payments.
- Messages: SessionMessagePanel and ActivityTimeline.
- Family & account: students, profile, rhythm/program detail, notes, feedback, request history, follow-up request.

Delete PortalQuickNav and no-longer-used fake upload/hash behavior. Existing controls remain intact in their new destination. Today must not render bookings, payments, profile, full activity, feedback, requests, or plan details before the parent selects another destination.

Add exact FR/EN labels: Aujourd’hui/Today, Séances/Sessions, Messages/Messages, Famille et compte/Family & account, Préparer la séance/Prepare the session, Séance avec le tuteur/Meet with the tutor, Lire le bilan/Read the recap.

- [ ] **Step 4: Verify and commit**

Run:

~~~powershell
node --test test/parent-portal.test.mjs
npm.cmd run test:site
~~~

Expected: selector tests, pricing check, build, static SEO generation, and static-site check all pass.

Manually verify keyboard navigation, mobile layout, default Today view, one primary action, and no secondary content before navigation.

~~~powershell
git add src/components/portal/ParentPortalNavigation.jsx src/lib/parentPortal.js src/pages/Portal.jsx test/parent-portal.test.mjs
git commit -m "feat: simplify the parent portal journey"
~~~

## Task 6: Document rollout and complete verification

**Files:**
- Modify: README.md
- Modify: ops/crm/parent-tutor-portal.md

**Interfaces:**
- Documents the Apps Script-only PORTAL_MATERIALS_DRIVE_FOLDER_ID property and reversible deployment procedure.

- [ ] **Step 1: Document setup and rollback**

Add a Secure session materials section to README.md:

~~~markdown
1. Create a non-public Drive folder owned by the Apps Script account.
2. Set its ID in Apps Script property PORTAL_MATERIALS_DRIVE_FOLDER_ID; never set VITE_*, Vercel, or repository values for it.
3. Redeploy the Apps Script web app after authorizing Drive, then deploy the Vercel frontend/API.
4. Verify using a test parent, tutor, session, and Drive folder before public use.
5. Roll back by disabling the two material actions in both proxies and removing the upload UI. Existing files remain private and can be cleaned from Session Materials.
~~~

Document the 2.5 MiB file cap, five-file cap, image/PDF-only policy, tutor-only share, no email attachments/public links, parent withdrawal, and 30-day expiry in ops/crm/parent-tutor-portal.md.

- [ ] **Step 2: Run all automated checks**

Run each command separately:

~~~powershell
npm.cmd run test:payments
npm.cmd run test:portal
npm.cmd run test:site
git diff --check
git status --short
~~~

Expected: all test/build commands pass and diff check has no output. Do not stage pre-existing changes to ops/paperclip/state/urgent-alert-state.md or .superpowers/.

- [ ] **Step 3: Run the manual security matrix**

| Case | Expected |
| --- | --- |
| Linked parent uploads valid JPEG/PDF | Tutor gets a portal alert; material appears only after CRM confirms it. |
| Parent uses unrelated session ID | No Drive file; authorization failure. |
| Sixth, unsupported, or oversized file | Specific error; no row/file. |
| Unrelated tutor | No metadata or URL. |
| Assigned tutor | Private Drive link opens. |
| Parent withdrawal | Item disappears and Drive file is trashed. |
| Expiry automation | Item becomes expired and Drive file is trashed. |
| Parent home | One primary action and three factual stages only. |

- [ ] **Step 4: Commit documentation**

~~~powershell
git add README.md ops/crm/parent-tutor-portal.md
git commit -m "docs: document secure session material rollout"
~~~

## Self-Review

- Spec coverage: Tasks 1/5 cover simple parent navigation and progress; Tasks 2/3/4 cover real private transfer, tutor visibility, security, withdrawal, and retention; Task 6 covers rollout and verification.
- Placeholder scan: action names, limits, records, statuses, test files, commands, retention, and manual results are explicit.
- Type consistency: upload action is portal_upload_session_material; withdrawal action is portal_withdraw_session_material; collection is session_materials; identity is material_id; states are shared, withdrawn, expired; browser/file ceiling is 2621440 bytes and proxy ceiling is 4194304 bytes.
