# Complete Website UX Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the public site and all three portal roles into calm, task-centered experiences while preserving the current business rules, bilingual routes, CRM, scheduling, payment, and secure-material behavior.

**Architecture:** Keep the existing React/Vite frontend and Apps Script CRM. First repair conversion defects, then introduce a shared role-aware portal shell and extract parent, tutor, and operator views from `Portal.jsx`. Recompose public pages from fewer reusable sections, remove generic motion overhead, and split the operator payload only after the new navigation is stable.

**Tech Stack:** React 18, React Router 7, Vite 7, Tailwind CSS, Radix UI, Lucide, Node built-in test runner, Vercel Functions, Google Apps Script, Stripe Checkout.

## Global Constraints

- Preserve all existing confirmation, payment, plan-credit, tutor-assignment, material-sharing, cancellation, rescheduling, and authentication rules.
- Do not migrate the CRM or replace Google Apps Script in this initiative.
- Keep French and English behavior equivalent; every new user-facing string requires both locales.
- Do not expose operator routes in public navigation or allow parent/tutor sessions to open operator data.
- Keep 44 × 44 px minimum touch targets, visible keyboard focus, reduced-motion behavior, and no color-only state.
- Use one dominant action per viewport and never show a global request action on request, thank-you, or portal routes.
- Do not publish invented testimonials, results, tutor profiles, compensation, or service guarantees. Recruitment compensation must use the existing 28 CAD/hour base policy and its existing adjustment language.
- Keep unrelated user changes in `ops/paperclip/state/urgent-alert-state.md`, `package-lock.json`, and `.superpowers/` out of commits unless a task explicitly requires one of those files.
- Each task ends in a separately testable commit and can be released independently.

---

### Task 1: Repair broken and redundant conversion actions

**Files:**
- Create: `test/conversion-links.test.mjs`
- Modify: `src/layouts/SiteLayout.jsx`
- Modify: `src/pages/Tuteurs.jsx`
- Modify: `src/pages/CaseStudies.jsx`
- Modify: `package.json`

**Interfaces:**
- Consumes: `getRouteKeyFromPath`, `getLocalizedPath("request", locale)`.
- Produces: working localized request links and a route-aware global mobile action.

- [ ] **Step 1: Write the failing conversion-link contract**

Create `test/conversion-links.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("all conversion links use the localized request route", async () => {
  for (const file of ["../src/pages/Tuteurs.jsx", "../src/pages/CaseStudies.jsx"]) {
    const source = await readFile(new URL(file, import.meta.url), "utf8")
    assert.doesNotMatch(source, /#demande/)
    assert.match(source, /getLocalizedPath\("request", locale\)/)
  }
})

test("the global mobile request action is absent on focused routes", async () => {
  const source = await readFile(new URL("../src/layouts/SiteLayout.jsx", import.meta.url), "utf8")
  assert.match(source, /const suppressMobileAction = \["request", "thankYou", "portal"\]\.includes\(routeKey\)/)
  assert.match(source, /!suppressMobileAction \? <div className="fixed inset-x-0 bottom-0/)
})
```

- [ ] **Step 2: Run the test to verify red**

Run: `node --test test/conversion-links.test.mjs`  
Expected: FAIL because `Tuteurs.jsx` and `CaseStudies.jsx` contain `#demande` and the layout only checks the portal pathname.

- [ ] **Step 3: Replace stale anchors with localized request routes**

In `Tuteurs.jsx` and `CaseStudies.jsx`, replace every home-plus-`#demande` destination with:

```js
getLocalizedPath("request", locale)
```

Keep the existing labels and React Router `Link` components.

- [ ] **Step 4: Suppress the global action on focused routes**

In `SiteLayout.jsx`, use the existing `routeKey`:

```js
const suppressMobileAction = ["request", "thankYou", "portal"].includes(routeKey)
```

Render the fixed mobile action only when `!suppressMobileAction`. Use the same boolean for the non-portal bottom padding so the request and thank-you pages do not retain empty space.

- [ ] **Step 5: Register and verify the test**

Add `node --test test/conversion-links.test.mjs &&` to the start of `test:site` in `package.json`.

Run: `node --test test/conversion-links.test.mjs`  
Expected: 2 passing tests.

Run: `npm.cmd run test:site`  
Expected: existing site tests, pricing checks, build, and static-site checks pass.

- [ ] **Step 6: Commit**

```powershell
git add test/conversion-links.test.mjs src/layouts/SiteLayout.jsx src/pages/Tuteurs.jsx src/pages/CaseStudies.jsx package.json
git commit -m "fix: remove broken and redundant request actions"
```

### Task 2: Create the shared portal navigation and code boundaries

**Files:**
- Create: `src/lib/portalCopy.js`
- Create: `src/lib/portalNavigation.js`
- Create: `src/components/portal/shared/PortalShell.jsx`
- Create: `src/components/portal/shared/PortalPageHeader.jsx`
- Create: `test/portal-shell.test.mjs`
- Modify: `src/pages/Portal.jsx`
- Modify: `package.json`

**Interfaces:**
- Consumes: authenticated role, active destination key, localized copy, logout and refresh actions.
- Produces: `getPortalDestinations(role, locale)` and a persistent desktop/sidebar plus mobile/bottom-navigation shell.

- [ ] **Step 1: Write the navigation model test**

```js
import assert from "node:assert/strict"
import test from "node:test"
import { getPortalDestinations } from "../src/lib/portalNavigation.js"

test("returns task-centered destinations for each role", () => {
  assert.deepEqual(getPortalDestinations("parent", "fr").map(({ key }) => key),
    ["home", "sessions", "messages", "more"])
  assert.deepEqual(getPortalDestinations("tutor", "fr").map(({ key }) => key),
    ["today", "schedule", "students", "messages"])
  assert.deepEqual(getPortalDestinations("operator", "fr").map(({ key }) => key),
    ["today", "families", "calendar", "inbox", "more"])
})

test("keeps English and French keys identical", () => {
  for (const role of ["parent", "tutor", "operator"]) {
    assert.deepEqual(
      getPortalDestinations(role, "fr").map(({ key }) => key),
      getPortalDestinations(role, "en").map(({ key }) => key),
    )
  }
})
```

- [ ] **Step 2: Run the test to verify red**

Run: `node --test test/portal-shell.test.mjs`  
Expected: FAIL because `portalNavigation.js` does not exist.

- [ ] **Step 3: Implement the destination contract**

Export this interface from `portalNavigation.js`:

```js
export function getPortalDestinations(role, locale = "fr") {
  // returns Array<{ key: string, label: string, icon: LucideIcon }>
}

export function getDefaultPortalDestination(role) {
  return role === "parent" ? "home" : "today"
}
```

Use these labels:

- Parent FR: Accueil, Séances, Messages, Plus; EN: Home, Sessions, Messages, More.
- Tutor FR: Aujourd’hui, Horaire, Élèves, Messages; EN: Today, Schedule, Students, Messages.
- Operator FR: Aujourd’hui, Familles, Calendrier, Boîte, Plus; EN: Today, Families, Calendar, Inbox, More.

- [ ] **Step 4: Extract portal copy without changing text**

Move the complete localized copy object from `Portal.jsx` into `portalCopy.js` and export:

```js
export function getPortalCopy(locale = "fr") {
  return portalCopyByLocale[locale] || portalCopyByLocale.fr
}
```

Do not rewrite copy in this mechanical step. Update `Portal.jsx` to call `getPortalCopy(locale)`.

- [ ] **Step 5: Implement `PortalShell`**

Use this contract:

```jsx
<PortalShell
  role={session.role}
  locale={locale}
  destinations={destinations}
  active={activeDestination}
  onChange={setActiveDestination}
  profileName={dashboard.profile?.name || session.email}
  isRefreshing={isLoading}
  onRefresh={() => refreshDashboard()}
  onLogout={handleLogout}
>
  {roleView}
</PortalShell>
```

Desktop at `lg` and above uses a 240 px sidebar. Parent and tutor mobile use four equal bottom destinations. Operator mobile uses five compact destinations, with Tutors, Payments, and Settings reached from More. The shell must use `aria-current="page"`, keep navigation outside transitioning content, reserve safe-area bottom padding, and never overlap focused form controls.

`destinations` is an explicit array. When it is empty, the shell renders the authenticated identity/header and content without role navigation; this is the compatibility state used until that role's focused views are implemented.

- [ ] **Step 6: Render existing dashboards inside the compatibility shell**

Replace the current authenticated hero plus role dashboard wrapper with `PortalShell`, pass `destinations={[]}`, and keep existing dashboard components and active behavior for now. This step changes the authenticated framing without creating dead navigation controls. Tasks 4, 5, and 6 pass the real destination arrays only when their corresponding focused views exist.

- [ ] **Step 7: Verify and commit**

Run: `node --test test/portal-shell.test.mjs test/parent-portal.test.mjs`  
Expected: navigation model tests and existing parent behavior tests pass.

Run: `npm.cmd run build`  
Expected: successful Vite and static SEO build.

```powershell
git add src/lib/portalCopy.js src/lib/portalNavigation.js src/components/portal/shared/PortalShell.jsx src/components/portal/shared/PortalPageHeader.jsx src/pages/Portal.jsx test/portal-shell.test.mjs package.json
git commit -m "refactor: add task-centered portal shell"
```

### Task 3: Make client sign-in progressive and separate team access

**Files:**
- Modify: `src/lib/routes.js`
- Modify: `src/lib/searchIndexStrategy.js`
- Modify: `src/App.jsx`
- Modify: `src/layouts/SiteLayout.jsx`
- Modify: `src/pages/Portal.jsx`
- Modify: `src/lib/portalCopy.js`
- Create: `test/portal-sign-in.test.mjs`

**Interfaces:**
- Consumes: existing `requestPortalCode` and `verifyPortalCode` role/email/code contracts.
- Produces: `/portail` and `/en/portal` for parent/tutor access; `/equipe` and `/en/team` for operator access.

- [ ] **Step 1: Write the failing route and progressive-flow tests**

The source-level test must require:

```js
assert.match(routes, /team: \{ fr: "\/equipe", en: "\/en\/team" \}/)
assert.match(app, /<Portal entryRole="operator"/)
assert.match(searchIndex, /"team"/)
assert.match(layout, /\["portal", "team"\]\.includes\(routeKey\)/)
assert.match(portal, /useState\("request_code"\)/)
assert.match(portal, /authStep === "verify_code"/)
assert.doesNotMatch(clientLoginSlice, /copy\.operator/)
```

Also render the client role chooser and assert it contains exactly Parent and Tutor; render the team entry and assert it contains no role chooser.

- [ ] **Step 2: Run the test to verify red**

Run: `node --test test/portal-sign-in.test.mjs`  
Expected: FAIL because the team route and auth-step state do not exist.

- [ ] **Step 3: Add the unlisted team routes**

Add `team: { fr: "/equipe", en: "/en/team" }` to `routeCatalog`. Add both routes in `App.jsx` using `<Portal entryRole="operator" />`. Add `team` to the no-index route set in `searchIndexStrategy.js`. Keep team out of `SiteLayout` navigation, footer, sitemap, prerender page data, and public calls to action. In `SiteLayout`, define the focused application state with `const isPortalRoute = ["portal", "team"].includes(routeKey)` and add `team` to `suppressMobileAction`. When `isPortalRoute` is true, render the compact header and `TrackingManager`, but do not render the public footer, public assistant, sticky request action, or public bottom padding.

In `Portal.jsx`, choose the SEO path and alternates from `entryRole`: client uses the existing `portal` route key and team uses `team`. Both use `getRobotsDirective` and remain `noindex, follow`.

- [ ] **Step 4: Implement two-step sign-in**

Use:

```js
const [authStep, setAuthStep] = useState("request_code")
```

Client route behavior:

1. Show Parent/Tutor choice, email, and **Recevoir un code**.
2. After a successful request, set `authStep` to `verify_code` and show the masked email, code field, **Se connecter**, and **Changer d’adresse**.
3. Do not show an empty code field before the code request succeeds.

Team route behavior:

1. Force role `operator`.
2. Show **Accès équipe** copy, email, and the same progressive code step.
3. Never render parent account creation or tutor access-request copy.

Reset `authStep` to `request_code` on role/email change and logout. Keep all API payloads unchanged.

- [ ] **Step 5: Verify and commit**

Run: `node --test test/portal-sign-in.test.mjs test/portal-api.test.mjs`  
Expected: progressive UI tests and portal API tests pass.

Run: `npm.cmd run test:site`  
Expected: complete site suite passes.

```powershell
git add src/lib/routes.js src/lib/searchIndexStrategy.js src/App.jsx src/layouts/SiteLayout.jsx src/pages/Portal.jsx src/lib/portalCopy.js test/portal-sign-in.test.mjs
git commit -m "feat: simplify client and team sign-in"
```

### Task 4: Recompose the parent portal around next action and drill-down

**Files:**
- Create: `src/components/portal/parent/ParentHome.jsx`
- Create: `src/components/portal/parent/ParentSessions.jsx`
- Create: `src/components/portal/parent/ParentMessages.jsx`
- Create: `src/components/portal/parent/ParentMore.jsx`
- Create: `src/components/portal/parent/ParentSessionDetail.jsx`
- Create: `src/components/portal/parent/ParentMoreDetail.jsx`
- Create: `src/components/portal/shared/PortalDetailPanel.jsx`
- Modify: `src/lib/parentPortal.js`
- Modify: `src/pages/Portal.jsx`
- Modify: `test/parent-portal.test.mjs`

**Interfaces:**
- Consumes: current parent dashboard, `getParentNextAction`, `getParentTodaySession`, `groupParentSessions`, current portal actions.
- Produces: `getParentHomeModel(dashboard)` and four focused parent destinations.

- [ ] **Step 1: Add failing pure-model tests**

Add:

```js
test("parent home exposes only action, next session, and latest released recap", () => {
  const model = getParentHomeModel(parentFixture)
  assert.deepEqual(Object.keys(model).sort(), ["action", "latestRecap", "nextSession"])
})

test("parent more uses focused rows instead of dashboard panels", () => {
  assert.deepEqual(getParentMoreItems("fr").map(({ key }) => key),
    ["student_tutor", "plan", "billing", "family", "help"])
})
```

Use a fixture with an upcoming confirmed session and a released recap. Assert that draft notes never become `latestRecap`.

- [ ] **Step 2: Run the tests to verify red**

Run: `node --test test/parent-portal.test.mjs`  
Expected: FAIL because the new selectors do not exist.

- [ ] **Step 3: Implement the parent view model**

Export from `parentPortal.js`:

```js
export function getParentHomeModel(dashboard = {}) {
  return {
    action: getParentNextAction(dashboard),
    nextSession: getParentTodaySession(dashboard, getParentNextAction(dashboard)),
    latestRecap: findLatestReleasedParentRecap(dashboard.notes, dashboard.sessions),
  }
}

export function getParentMoreItems(locale = "fr") {
  // exactly student_tutor, plan, billing, family, help
}
```

`findLatestReleasedParentRecap` must choose the newest completed session with a released parent summary and return `null` when none exists.

- [ ] **Step 4: Build `ParentHome`**

Render only:

1. one attention/ready card derived from `action` and `nextSession`;
2. one primary action that opens the relevant destination or `ParentSessionDetail`;
3. the latest released recap preview when present.

Do not render `MetricStrip`, calendar, history lists, payments, profile forms, feedback, requests, activity timeline, or full material controls on Home. Preparation opens `ParentSessionDetail`, where `SessionMaterialsPanel` remains unchanged.

- [ ] **Step 5: Build `ParentSessions` and detail**

Use an `upcoming`/`past` segment. Upcoming contains proposed, confirmed, and follow-up sessions; Past contains completed, cancelled, and no-show items grouped under labelled subsections. Each compact row shows date/time, student, tutor, status text, and one contextual action. Selecting a row opens `ParentSessionDetail` with current `SessionRow` actions, materials, recap, Meet URL, and change request.

Booking stays at the top of Upcoming. Payments leave this destination except for a direct session-linked payment action.

- [ ] **Step 6: Build `ParentMessages`**

Group messages by `session_id`, then place non-session requests in a Team thread. Sort threads by newest message and show reply-needed first. Remove the separate full `ActivityTimeline` from the destination. System events remain inside the related session detail.

- [ ] **Step 7: Build `ParentMore` and focused details**

Render exactly five compact rows: Student and tutor, Plan and sessions remaining, Billing, Family details, Help and feedback. Selecting a row opens `ParentMoreDetail`, which renders the existing relevant panel(s). Forms begin in read mode and expose an explicit Edit action. Parent copy uses **séances restantes**; ledger internals may continue to use `credits_*` fields.

- [ ] **Step 8: Integrate and delete the old page dump**

Switch `Portal.jsx` parent routing to `home`, `sessions`, `messages`, and `more`. Remove the old `ParentPortalNavigation` import and delete the component after no tests reference it. Keep all server action calls and error mapping.

- [ ] **Step 9: Verify and commit**

Run: `node --test test/parent-portal.test.mjs test/portal-material-ui.test.mjs test/progression-payment-state.test.mjs`  
Expected: all parent workflow, material, and payment tests pass.

Run: `npm.cmd run build`  
Expected: successful build.

Manually verify at 390 × 844 that the next action and session are visible before scrolling, bottom navigation does not cover content, and every current parent operation is reachable.

```powershell
git add src/components/portal/parent src/components/portal/shared/PortalDetailPanel.jsx src/lib/parentPortal.js src/pages/Portal.jsx test/parent-portal.test.mjs src/components/portal/ParentPortalNavigation.jsx
git commit -m "feat: focus the parent portal on the next action"
```

### Task 5: Recompose the tutor portal around session work

**Files:**
- Create: `src/lib/tutorPortal.js`
- Create: `src/components/portal/tutor/TutorToday.jsx`
- Create: `src/components/portal/tutor/TutorSchedule.jsx`
- Create: `src/components/portal/tutor/TutorStudents.jsx`
- Create: `src/components/portal/tutor/TutorMessages.jsx`
- Create: `src/components/portal/tutor/TutorSessionDetail.jsx`
- Create: `test/tutor-portal-ui.test.mjs`
- Modify: `src/pages/Portal.jsx`

**Interfaces:**
- Consumes: tutor dashboard `next_session`, `sessions_needing_notes`, `sessions`, `session_materials`, `availability`, `messages`, `notes`, and current actions.
- Produces: `getTutorTodayModel`, `groupTutorSessionsByStudent`, and four tutor destinations.

- [ ] **Step 1: Write failing selector tests**

```js
test("tutor attention prioritizes notes before replies", () => {
  const model = getTutorTodayModel({
    sessions_needing_notes: [{ session_id: "S1" }],
    messages: [{ message_id: "M1", recipient_role: "tutor", message_status: "awaiting_reply" }],
    next_session: { session_id: "S2" },
  })
  assert.deepEqual(model.attention.map(({ kind }) => kind), ["note_due", "reply_due"])
  assert.equal(model.nextSession.session_id, "S2")
})
```

Also assert that student grouping uses stable student ID when present and normalized student name as the fallback.

- [ ] **Step 2: Implement pure tutor selectors**

Export:

```js
export function getTutorTodayModel(dashboard = {}) {
  return { attention: [], nextSession: dashboard.next_session || null, weekSessions: [] }
}

export function groupTutorSessionsByStudent(sessions = []) {
  // returns Array<{ key, studentName, sessions }>
}
```

Attention order is missing note, reply-needed message, then request in review. `weekSessions` contains the next seven days, sorted ascending.

- [ ] **Step 3: Build `TutorToday` and session detail**

Show no general metric strip. Render at most two compact attention chips, then the next session. The session card moves through Prepare, Join, and Write recap using existing session state and time. Parent materials render inside `TutorSessionDetail`. A missing note opens `TutorNoteForm` with the exact session preselected.

- [ ] **Step 4: Build Schedule, Students, and Messages**

- Schedule: calendar first; availability rows second; **Ajouter une disponibilité** opens the existing form in `PortalDetailPanel`.
- Students: grouped active student list; detail includes upcoming session, materials, and the tutor's prior notes.
- Messages: session-grouped threads sorted reply-needed then newest.

Do not render parent feedback, full note history, request history, or the general request form on Today.

- [ ] **Step 5: Integrate and verify**

Use `today`, `schedule`, `students`, and `messages` as the tutor destinations in `Portal.jsx`.

Run: `node --test test/tutor-portal-ui.test.mjs test/portal-material-ui.test.mjs test/portal-api.test.mjs`  
Expected: selectors, secure material rendering, and API tests pass.

Manually verify at 390 × 844: due note and next session appear without scrolling, materials open from the correct session, and availability creation is collapsed by default.

- [ ] **Step 6: Commit**

```powershell
git add src/lib/tutorPortal.js src/components/portal/tutor test/tutor-portal-ui.test.mjs src/pages/Portal.jsx
git commit -m "feat: organize tutor work by session"
```

### Task 6: Recompose the team console into operations destinations

**Files:**
- Create: `src/lib/operatorPortal.js`
- Create: `src/components/portal/operator/OperatorToday.jsx`
- Create: `src/components/portal/operator/OperatorFamilies.jsx`
- Create: `src/components/portal/operator/OperatorTutors.jsx`
- Create: `src/components/portal/operator/OperatorCalendar.jsx`
- Create: `src/components/portal/operator/OperatorPayments.jsx`
- Create: `src/components/portal/operator/OperatorInbox.jsx`
- Create: `src/components/portal/operator/OperatorSettings.jsx`
- Create: `src/components/portal/operator/OperatorMore.jsx`
- Create: `test/operator-portal-ui.test.mjs`
- Modify: `src/pages/Portal.jsx`

**Interfaces:**
- Consumes: current normalized operator dashboard and all current operator actions.
- Produces: one deduplicated priority queue, searchable collections, and separate operations/admin destinations.

- [ ] **Step 1: Write failing queue tests**

Use fixtures where one session appears in Today confirmations and the confirmation queue. Require one result:

```js
const result = buildOperatorPriorityQueue(fixture)
assert.equal(result.filter((item) => item.entityKey === "session:S1").length, 1)
assert.deepEqual(result.map(({ priority }) => priority), [...result.map(({ priority }) => priority)].sort((a, b) => a - b))
```

Require priority ranks: 0 blocking/session within 2 hours; 1 callbacks/matching; 2 confirmation/calendar; 3 overdue note/message; 4 payment.

- [ ] **Step 2: Implement queue and search selectors**

Export:

```js
export function buildOperatorPriorityQueue(dashboard = {}, now = new Date()) {}
export function searchOperatorFamilies(families = [], query = "") {}
export function searchOperatorTutors(tutors = [], query = "") {}
```

Normalize accents and case for search. Family search covers parent, student, email, and phone; tutor search covers name, subject, level, email, and zone.

- [ ] **Step 3: Build `OperatorToday`**

Replace `TodayBoard` plus `TeamPriorityBoard` with one queue and one compact day schedule. Each queue row shows priority label, deadline/time, parent/student or tutor, concise reason, status, and **Ouvrir**. Automation cadence and payment-mode text do not render here.

- [ ] **Step 4: Build operational destinations**

- Families: searchable list, Add parent action, focused family detail containing students, tutor assignment, plan, billing summary, and history.
- Tutors: searchable roster, capacity/status filters, Add tutor action, focused access/rate/availability/public-profile detail.
- Calendar: schedule action, confirmation queue, chronological sessions with state filters.
- Payments: due first, then paid history; plan enrollment and credit ledger in focused details.
- Inbox: reply-needed messages and requests first, then resolved history.
- More: links to Tutors, Payments, and Settings on mobile; desktop sidebar links directly to all three.
- Settings: portal access, automation status, and test-data cleanup. Destructive cleanup stays here only.

Creation and editing forms open on request; none are permanently expanded in destination lists.

- [ ] **Step 5: Integrate without changing the operator API**

Initially use the existing dashboard payload. This keeps the UI release independent of backend pagination. Remove old operator dashboard composition from `Portal.jsx` after every current operation is reachable through the new views.

- [ ] **Step 6: Verify and commit**

Run: `node --test test/operator-portal-ui.test.mjs test/portal-api.test.mjs test/student-tutor-assignments.test.mjs test/tutor-public-profiles.test.mjs`  
Expected: queue, search, access, assignment, and profile tests pass.

Manually verify desktop: find a family, assign a tutor, schedule a session, open a payment, reply to a message, and reach test cleanup without returning to a stacked dashboard.

```powershell
git add src/lib/operatorPortal.js src/components/portal/operator test/operator-portal-ui.test.mjs src/pages/Portal.jsx
git commit -m "feat: split team operations into focused views"
```

### Task 7: Split and paginate the operator data API

**Files:**
- Modify: `ops/crm/google-apps-script/Code.gs`
- Modify: `api/portal.js`
- Modify: `vite.config.js`
- Modify: `src/lib/portalClient.js`
- Modify: `src/components/portal/operator/OperatorFamilies.jsx`
- Modify: `src/components/portal/operator/OperatorTutors.jsx`
- Modify: `src/components/portal/operator/OperatorCalendar.jsx`
- Modify: `src/components/portal/operator/OperatorPayments.jsx`
- Modify: `src/components/portal/operator/OperatorInbox.jsx`
- Modify: `test/portal-api.test.mjs`
- Create: `test/operator-collection-contract.test.mjs`

**Interfaces:**
- Consumes: operator portal token, collection, query, cursor, page size.
- Produces: `{ ok, items, next_cursor, total }` with at most 50 sanitized records.

- [ ] **Step 1: Add failing allowlist and contract tests**

Require `portal_get_operator_collection` in both proxies. Test these accepted collections only:

```js
const OPERATOR_COLLECTIONS = new Set([
  "families", "tutors", "sessions", "payments", "messages", "requests",
])
```

Require `page_size` to clamp to 1–50, default 25, and invalid collection to return `OPERATOR_COLLECTION_INVALID`.

- [ ] **Step 2: Implement the Apps Script action**

Dispatch `portal_get_operator_collection`, verify an operator session, normalize `query`, parse numeric offset cursor, select and sanitize the requested collection, filter it with the same fields as the frontend search selectors, then return:

```js
{
  ok: true,
  items: filtered.slice(offset, offset + pageSize),
  next_cursor: offset + pageSize < filtered.length ? String(offset + pageSize) : "",
  total: filtered.length,
}
```

Never return Drive IDs, secrets, file bytes, raw access codes, or records from another unsupported sheet.

- [ ] **Step 3: Reduce the initial operator dashboard**

Keep profile, metrics, Today summary, work queues, and automation in `portal_get_dashboard`. Remove broad operator collections from that response after each destination loads its collection endpoint. Parent and tutor dashboards remain unchanged.

- [ ] **Step 4: Add the client wrapper and destination loading states**

```js
export function getPortalOperatorCollection({ token, collection, query = "", cursor = "", pageSize = 25 }) {
  return portalRequest({
    action: "portal_get_operator_collection",
    token,
    collection,
    query,
    cursor,
    page_size: pageSize,
  })
}
```

Each operator destination loads on first open, resets on query change, appends on **Afficher plus**, and displays errors inside that destination without clearing other cached destinations.

- [ ] **Step 5: Verify and commit**

Run: `node --test test/operator-collection-contract.test.mjs test/portal-api.test.mjs`  
Expected: operator authorization, allowlist, page size, cursor, and response-shape tests pass.

Run: `npm.cmd run test:portal`  
Expected: full portal suite passes.

```powershell
git add ops/crm/google-apps-script/Code.gs api/portal.js vite.config.js src/lib/portalClient.js src/components/portal/operator test/portal-api.test.mjs test/operator-collection-contract.test.mjs
git commit -m "perf: paginate operator portal collections"
```

### Task 8: Simplify the home, request, math, and science journeys

**Files:**
- Create: `src/components/marketing/HomeProofStrip.jsx`
- Create: `src/components/marketing/HowItWorksSection.jsx`
- Create: `test/public-page-density.test.mjs`
- Modify: `src/layouts/SiteLayout.jsx`
- Modify: `src/pages/Accueil.jsx`
- Modify: `src/pages/AccueilEn.jsx`
- Modify: `src/pages/FirstSessionRequest.jsx`
- Modify: `src/components/FirstSessionRequestForm.jsx`
- Modify: `src/pages/Maths.jsx`
- Modify: `src/pages/Sciences.jsx`
- Modify: `src/components/SimpleMarketingSections.jsx`

**Interfaces:**
- Consumes: current pricing, request route, subject query, tracking, localized copy.
- Produces: compact conversion templates and subject-prefilled requests.

- [ ] **Step 1: Write structural density tests**

Require:

- Home renders no `ParentStartingPointsSection` and no floating assistant.
- Home has one primary request action before Pricing.
- Request route suppresses the global sticky action through Task 1.
- Math and Science do not render `LeadForm` or `FirstSessionRequestForm`.
- Subject calls to action use `?subject=math` or `?subject=science`.
- `FirstSessionRequestForm` accepts `initialSubject` and maps only `math`, `science`, `physics`, `chemistry`, or empty.

- [ ] **Step 2: Simplify shared navigation**

Desktop primary links are Maths, Sciences, Comment ça marche/How it works, and Tarifs/Pricing. Render portal as a quiet utility action and request as the gold primary action. Move Parent journey and Become a tutor to the mobile menu and footer. Keep Resources in the mobile menu/footer. Verify comfortable layout at 1280 px.

- [ ] **Step 3: Recompose home**

Render in this order:

1. one-column hero with one request button and one urgent-only phone text link;
2. `HomeProofStrip` with response under 24 business hours, matched tutor, and three-point recap;
3. `HowItWorksSection` with the current three steps;
4. `PricingSection`;
5. one parent-proof/what-you-receive section;
6. four-item FAQ and final request action.

Remove the large hero-side process panel and `ParentStartingPointsSection`. Do not create claims beyond existing copy.

- [ ] **Step 4: Compact the request page**

On mobile, render badge, H1, one description, and price, followed immediately by the form. Move the three-step explanation below the form inside a collapsed details element labelled **Ce qui se passe ensuite** / **What happens next**. Keep the existing desktop two-column option at `lg`, but do not make the explanatory column sticky taller than the initial form fields.

Read the `subject` query parameter, normalize it through an allowlist, and pass `initialSubject` to the form. Do not change the CRM submission field names.

- [ ] **Step 5: Simplify subject pages**

Use exactly five sections: hero, problems covered, session method, levels/topics, proof/FAQ plus final action. Remove embedded lead forms and send actions to the localized request route with the subject query. Keep unique SEO title, description, H1, topic content, canonical route, and structured data.

- [ ] **Step 6: Verify density and commit**

Run: `node --test test/public-page-density.test.mjs test/conversion-links.test.mjs`  
Expected: structural contracts pass.

Run: `npm.cmd run test:site`  
Expected: build and static checks pass.

At 390 × 844 verify: first request input is visible in the first viewport; home is no more than about 5,100 px; Math and Science are no more than about 5,900 px; no viewport contains three identical request actions.

```powershell
git add src/components/marketing src/layouts/SiteLayout.jsx src/pages/Accueil.jsx src/pages/AccueilEn.jsx src/pages/FirstSessionRequest.jsx src/components/FirstSessionRequestForm.jsx src/pages/Maths.jsx src/pages/Sciences.jsx src/components/SimpleMarketingSections.jsx test/public-page-density.test.mjs
git commit -m "feat: simplify parent conversion journeys"
```

### Task 9: Simplify tutor trust and recruitment

**Files:**
- Modify: `src/pages/Tuteurs.jsx`
- Modify: `src/pages/DevenirTuteur.jsx`
- Modify: `src/lib/tutorPublicProfiles.js`
- Create: `test/tutor-marketing-pages.test.mjs`

**Interfaces:**
- Consumes: consented public tutor profiles, existing application submission, 28 CAD/hour base policy, localized request route.
- Produces: stable tutor-profile fallback and a concise practical recruitment journey.

- [ ] **Step 1: Write failing structural tests**

Require the tutor-profile fallback to link to `getLocalizedPath("request", locale)`. Require recruitment source to contain the localized 28 CAD/hour base statement, one candidate form, no generic global request CTA, and these section keys in order: `facts`, `work`, `requirements`, `process`, `application`, `faq`.

- [ ] **Step 2: Make tutor-profile failure useful**

When profiles are empty or unavailable, show matching criteria, explain that the team proposes a profile after reviewing the need, and provide one localized request action. Keep phone as an urgent-only text link. Remove self-referential copy about what a good website should say.

- [ ] **Step 3: Recompose recruitment**

Use exactly:

1. Hero and practical facts.
2. What the tutor does before/during/after a session.
3. Requirements.
4. Four-step selection process.
5. Existing candidate form.
6. Focused FAQ.

State the existing policy as **À partir de 28 $ CA/h, ajusté selon l’expérience et le rôle** and its equivalent English copy. Keep online Quebec and optional Montreal/Laval in-person facts. Remove duplicate application CTAs, brand self-praise, the second application pitch, and repeated clarity/rigour paragraphs.

- [ ] **Step 4: Verify and commit**

Run: `node --test test/tutor-marketing-pages.test.mjs test/tutor-public-profiles.test.mjs`  
Expected: marketing structure and consent/profile tests pass.

At 390 × 844 verify the recruitment page is no more than about 5,100 px and the practical facts appear before the application form.

```powershell
git add src/pages/Tuteurs.jsx src/pages/DevenirTuteur.jsx src/lib/tutorPublicProfiles.js test/tutor-marketing-pages.test.mjs
git commit -m "feat: simplify tutor trust and recruitment"
```

### Task 10: Apply the restrained visual and motion system

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/MotionCard.jsx`
- Modify: `src/layouts/SiteLayout.jsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `test/motion-system.test.mjs`

**Interfaces:**
- Consumes: CSS state attributes, Radix transitions, `prefers-reduced-motion`.
- Produces: shared motion tokens, CSS-only generic card interaction, route-aware sticky-action reveal.

- [ ] **Step 1: Write failing motion tests**

Require CSS variables `--motion-instant`, `--motion-quick`, `--motion-standard`, `--ease-out-product`, and the reduced-motion media query. Require `MotionCard.jsx` not to import `framer-motion`. Require non-interactive cards not to have transform classes.

- [ ] **Step 2: Add exact motion tokens**

```css
:root {
  --motion-instant: 120ms;
  --motion-quick: 180ms;
  --motion-standard: 240ms;
  --motion-emphasis: 300ms;
  --ease-out-product: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-product: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Interactive cards use a 2 px hover translation at 120 ms only under hover-capable pointers. Tabs/drawers use 180–240 ms. Success state uses one 300 ms highlight. Errors receive focus and do not continuously shake.

- [ ] **Step 3: Remove generic Framer overhead**

Change `MotionCard` to a normal wrapper plus `Card`; apply hover/press classes only when `interactive` is true. Remove `framer-motion` from dependencies after confirming no imports remain with `rg "framer-motion" src`.

- [ ] **Step 4: Make the sticky action contextual**

Use `IntersectionObserver` on the page's first primary action. The mobile sticky action remains hidden until that action leaves the viewport, then transitions 12 px upward over 180 ms. It stays completely absent on request, thank-you, portal, and team routes. Under reduced motion, it appears without translation.

- [ ] **Step 5: Simplify surfaces**

Limit generic surface radii to 16, 20, and 24 px. Remove hover motion from non-interactive sections. Increase essential small metadata from white/35–45 to at least white/65 pending contrast verification. Keep gold for one dominant action or current state per component group.

- [ ] **Step 6: Verify and commit**

Run: `node --test test/motion-system.test.mjs`  
Expected: tokens, no Framer import, and reduced-motion contract pass.

Run: `npm.cmd install`  
Expected: lockfile removes Framer Motion cleanly.

Run: `npm.cmd run test:site`  
Expected: build and site suite pass.

```powershell
git add src/index.css src/components/MotionCard.jsx src/layouts/SiteLayout.jsx package.json package-lock.json test/motion-system.test.mjs
git commit -m "perf: make visual motion restrained and lightweight"
```

### Task 11: Add task analytics, accessibility QA, and final rollout checks

**Files:**
- Modify: `src/lib/tracking.js`
- Modify: `src/pages/FirstSessionRequest.jsx`
- Modify: `src/pages/Portal.jsx`
- Modify: role view components created in Tasks 4–6
- Create: `test/task-tracking.test.mjs`
- Create: `docs/ux/website-simplification-acceptance.md`

**Interfaces:**
- Consumes: existing optional analytics configuration and portal action state.
- Produces: no-PII task events and a repeatable acceptance record.

- [ ] **Step 1: Define and test the event allowlist**

Export these event names only:

```js
export const TASK_EVENTS = new Set([
  "request_started", "request_submitted", "request_succeeded",
  "portal_code_requested", "portal_signed_in",
  "parent_next_action_opened", "parent_next_action_completed",
  "tutor_note_opened", "tutor_note_submitted",
  "operator_priority_opened", "operator_priority_resolved",
])
```

The test must reject payload keys matching `email`, `phone`, `name`, `message`, `notes`, `token`, or `student` and allow only role, locale, action kind, route key, status, and timing bucket.

- [ ] **Step 2: Instrument task boundaries**

Emit request start on first form interaction, submitted before transport, and succeeded only after CRM success. Emit portal code/sign-in events on confirmed API success. Emit role events when a focused action opens and when its API result succeeds. Never send free text, personal identifiers, session IDs, or payment URLs.

- [ ] **Step 3: Write the acceptance matrix**

Create `docs/ux/website-simplification-acceptance.md` with dated result columns for:

- 390 × 844, 768 × 1024, 1280 × 800, and 1440 × 900;
- French and English;
- keyboard-only and 200% zoom;
- reduced motion;
- parent: sign in, next action, prepare, confirm, pay, recap, message, family/billing;
- tutor: sign in, next session, material, note, availability, student, message;
- team: sign in, priority, family search, tutor search, scheduling, payment, inbox, settings;
- public: home, request, thank-you, math, science, tutors, recruitment;
- empty, loading, error, and populated states.

- [ ] **Step 4: Run the complete automated suite**

Run separately:

```powershell
npm.cmd run test:payments
npm.cmd run test:portal
npm.cmd run test:site
git diff --check
git status --short
```

Expected: all commands pass; diff check has no output; only intentional task files plus pre-existing user changes appear.

- [ ] **Step 5: Run the manual role matrix and record results**

Use non-production parent, tutor, operator, session, payment, and material records. Record Pass/Fail, date, browser size, locale, and concise evidence in the acceptance document. Do not use production student work or expose credentials/screenshots containing personal data.

- [ ] **Step 6: Compare final budgets**

Record in the acceptance document:

- mobile page heights for Home, Request, Math, Science, Tutors, and Recruitment;
- initial and portal JavaScript asset sizes from `dist/assets`;
- operator dashboard response size before and after pagination;
- number of visible actions above the fold for each role.

Acceptance requires the targets from the design spec and no regression in secure portal actions.

- [ ] **Step 7: Commit**

```powershell
git add src/lib/tracking.js src/pages/FirstSessionRequest.jsx src/pages/Portal.jsx src/components/portal test/task-tracking.test.mjs docs/ux/website-simplification-acceptance.md
git commit -m "test: verify simplified task journeys"
```

## Plan self-review

- **Spec coverage:** Task 1 covers broken/redundant actions; Tasks 2–7 cover shared shell, sign-in, parent, tutor, team, and operator scale; Tasks 8–9 cover public conversion, trust, and recruitment; Task 10 covers visual/motion/performance; Task 11 covers analytics, accessibility, and rollout.
- **Scope:** Backend migration is excluded. Operator pagination is isolated after the client-side team redesign, so it cannot block parent or tutor releases.
- **Type consistency:** Destination keys are fixed by role; `portal_get_operator_collection` uses collection/query/cursor/page_size and returns items/next_cursor/total; parent home model exposes action/nextSession/latestRecap; tutor model exposes attention/nextSession/weekSessions.
- **Placeholder scan:** The plan contains no deferred decisions. Labels, route paths, allowed collections, page limits, motion values, ordering, file paths, commands, and acceptance thresholds are explicit.

## Recommended execution order for a cheaper agent

Execute Tasks 1–5 first and release them. Then execute Task 6 and validate team workflows before Task 7 changes the operator payload. Execute Tasks 8–10 as a separate public-site release. Finish with Task 11 and keep the acceptance record with the repository.

Do not attempt all eleven tasks in one unreviewed change. Each task is a review and rollback boundary.
