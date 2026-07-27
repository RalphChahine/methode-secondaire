# Portal Handoff Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the parent–tutor session handoff truthful and easy to understand at every confirmation, payment, and recap state.

**Architecture:** Add a pure portal-session state module that both parent decisions and session cards use. Keep the existing Apps Script data model, but enforce the same confirmation/payment invariant in its session mutation paths. The parent view groups session history and places released recaps with the completed session.

**Tech Stack:** React 19, Vite, Node test runner, Google Apps Script, existing CRM Sheets backend.

## Global Constraints

- No new role, pricing change, CRM schema change, or custom notification system.
- Only Méthode Secondaire may change schedule exceptions or payment activation.
- A stale proposal may request an adjustment but must never be confirmed or paid.
- A session payment is requested only once both participants have confirmed, except for parent self-booking which confirms both people atomically.
- Preserve the French and English portal.

---

### Task 1: Define and test the shared session presentation state

**Files:**
- Create: `src/lib/portalSessionState.js`
- Modify: `test/parent-portal.test.mjs`

**Interfaces:**
- Produces `getPortalSessionState(session, role, now)` returning `{ isExpiredProposal, isWaitingForOther, canConfirm, canRequestChange, canShowPayment }`.
- Produces `groupParentSessions(sessions, now)` returning `{ upcoming, past, cancelled }`.
- Produces `findReleasedParentRecap(notes, sessionId)` returning one released note or `null`.

- [ ] **Step 1: Write the failing tests**

Add these imports and tests to `test/parent-portal.test.mjs`:

```js
import {
  findReleasedParentRecap,
  getPortalSessionState,
  groupParentSessions,
} from "../src/lib/portalSessionState.js"

test("does not let a parent confirm a proposal after its start time", () => {
  const state = getPortalSessionState({
    session_status: "proposed",
    start_at: "2026-07-14T21:40:00.000Z",
    payment_status: "payment_requested",
    parent_confirmed_at: "2026-07-10T12:00:00.000Z",
  }, "parent", new Date("2026-07-26T12:00:00.000Z"))

  assert.equal(state.isExpiredProposal, true)
  assert.equal(state.canConfirm, false)
  assert.equal(state.canShowPayment, false)
  assert.equal(state.canRequestChange, true)
})

test("shows a waiting state instead of a second confirmation for the current participant", () => {
  const state = getPortalSessionState({
    session_status: "proposed",
    start_at: "2026-08-01T17:00:00.000Z",
    parent_confirmed_at: "2026-07-26T12:00:00.000Z",
  }, "parent", new Date("2026-07-26T12:00:00.000Z"))

  assert.equal(state.isWaitingForOther, true)
  assert.equal(state.canConfirm, false)
  assert.equal(state.canRequestChange, true)
})

test("only exposes a requested payment after both confirmations", () => {
  const session = {
    session_status: "proposed",
    start_at: "2026-08-01T17:00:00.000Z",
    payment_status: "payment_requested",
    parent_confirmed_at: "2026-07-26T12:00:00.000Z",
  }
  assert.equal(getPortalSessionState(session, "parent", new Date("2026-07-26T12:00:00.000Z")).canShowPayment, false)

  assert.equal(getPortalSessionState({
    ...session,
    session_status: "confirmed",
    tutor_confirmed_at: "2026-07-26T12:05:00.000Z",
  }, "parent", new Date("2026-07-26T12:00:00.000Z")).canShowPayment, true)
})

test("groups parent history and finds only the released recap for a completed session", () => {
  const now = new Date("2026-07-26T12:00:00.000Z")
  const groups = groupParentSessions([
    { session_id: "UP", session_status: "confirmed", start_at: "2026-08-01T17:00:00.000Z" },
    { session_id: "PAST", session_status: "completed", start_at: "2026-07-14T17:00:00.000Z" },
    { session_id: "CANCELLED", session_status: "cancelled", start_at: "2026-07-22T17:00:00.000Z" },
  ], now)

  assert.deepEqual(groups.upcoming.map((session) => session.session_id), ["UP"])
  assert.deepEqual(groups.past.map((session) => session.session_id), ["PAST"])
  assert.deepEqual(groups.cancelled.map((session) => session.session_id), ["CANCELLED"])
  assert.equal(findReleasedParentRecap([
    { session_id: "PAST", status: "draft", parent_summary: "Do not show" },
    { session_id: "PAST", status: "released", parent_summary: "Visible recap" },
  ], "PAST").parent_summary, "Visible recap")
})
```

- [ ] **Step 2: Verify the tests fail for the missing module**

Run: `node --test test/parent-portal.test.mjs`

Expected: failure that `src/lib/portalSessionState.js` cannot be found.

- [ ] **Step 3: Add the minimal pure state module**

Create `src/lib/portalSessionState.js` with these exact behaviour boundaries:

```js
const TERMINAL_STATUSES = new Set(["cancelled", "no_show", "completed"])
const PENDING_STATUSES = new Set(["requested", "proposed"])

function records(value) {
  return Array.isArray(value) ? value : []
}

function timestamp(value) {
  const parsed = new Date(value).getTime()
  return Number.isFinite(parsed) ? parsed : null
}

export function getPortalSessionState(session = {}, role = "", now = new Date()) {
  const status = String(session.session_status || "").toLowerCase()
  const startAt = timestamp(session.start_at)
  const nowAt = now instanceof Date ? now.getTime() : new Date(now).getTime()
  const isFuture = startAt !== null && Number.isFinite(nowAt) && startAt > nowAt
  const isExpiredProposal = PENDING_STATUSES.has(status) && !isFuture
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
  const canConfirm = (role === "parent" || role === "tutor") && status === "proposed" && isFuture && !ownConfirmed
  const canRequestChange = (role === "parent" || role === "tutor") && ["proposed", "confirmed", "calendar_created"].includes(status)

  return {
    isExpiredProposal,
    isWaitingForOther: status === "proposed" && isFuture && ownConfirmed && !otherConfirmed,
    canConfirm,
    canRequestChange,
    canShowPayment: Boolean(session.payment_status === "payment_requested" && bothConfirmed && !isExpiredProposal),
  }
}

export function groupParentSessions(sessions, now = new Date()) {
  const nowAt = now instanceof Date ? now.getTime() : new Date(now).getTime()
  return records(sessions).reduce((groups, session) => {
    const status = String(session.session_status || "").toLowerCase()
    if (["cancelled", "no_show"].includes(status)) {
      groups.cancelled.push(session)
      return groups
    }
    const startAt = timestamp(session.start_at)
    if (startAt !== null && Number.isFinite(nowAt) && startAt <= nowAt) {
      groups.past.push(session)
      return groups
    }
    groups.upcoming.push(session)
    return groups
  }, { upcoming: [], past: [], cancelled: [] })
}

export function findReleasedParentRecap(notes, sessionId) {
  return records(notes).find((note) => note && note.session_id === sessionId &&
    (note.status === "released" || note.parent_status === "released" || note.released_to_parent === true)) || null
}
```

- [ ] **Step 4: Verify the state tests pass**

Run: `node --test test/parent-portal.test.mjs`

Expected: all parent portal tests pass, including the four new state tests.

- [ ] **Step 5: Commit the tested state module**

```powershell
git add src/lib/portalSessionState.js test/parent-portal.test.mjs
git commit -m "feat: define truthful portal session states"
```

### Task 2: Use truthful state in parent and tutor session cards

**Files:**
- Modify: `src/pages/Portal.jsx`
- Modify: `src/lib/parentPortal.js`
- Modify: `test/parent-portal.test.mjs`

**Interfaces:**
- Consumes `getPortalSessionState`, `groupParentSessions`, and `findReleasedParentRecap` from Task 1.
- Produces cards that never present duplicate confirmation or premature payment.

- [ ] **Step 1: Write the failing integration-contract test**

Append this test to `test/parent-portal.test.mjs`:

```js
test("renders grouped parent session history and state-driven session actions", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")

  assert.match(source, /getPortalSessionState/)
  assert.match(source, /groupParentSessions/)
  assert.match(source, /findReleasedParentRecap/)
  assert.match(source, /copy\.upcomingSessions/)
  assert.match(source, /copy\.pastSessions/)
  assert.match(source, /copy\.cancelledSessions/)
  assert.match(source, /presentation\.canConfirm/)
  assert.match(source, /presentation\.isWaitingForOther/)
  assert.match(source, /presentation\.isExpiredProposal/)
  assert.match(source, /presentation\.canShowPayment/)
})
```

- [ ] **Step 2: Verify the test fails**

Run: `node --test test/parent-portal.test.mjs`

Expected: failure because `Portal.jsx` has not imported or used the new state functions.

- [ ] **Step 3: Make the minimal UI and parent-action changes**

In `src/pages/Portal.jsx`:

1. Import the three Task 1 functions.
2. In `ParentDashboard`, compute `const sessionGroups = groupParentSessions(dashboard.sessions)` and render three `RecordList` sections in the `sessions` destination, in this order: `copy.upcomingSessions`, `copy.pastSessions`, `copy.cancelledSessions`.
3. Pass `recap={findReleasedParentRecap(dashboard.notes, session.session_id)}` only to past-session `SessionRow` instances.
4. Add French/English copy keys with these values:

```js
upcomingSessions: "À venir",
pastSessions: "Passées",
cancelledSessions: "Annulées",
sessionAwaitingTutor: "Vous avez confirmé — en attente de la confirmation du tuteur.",
sessionAwaitingParent: "Le tuteur a confirmé — votre confirmation est attendue.",
sessionProposalExpired: "Cette proposition est expirée.",
sessionProposalExpiredText: "Demandez un ajustement et l'équipe vous proposera un nouveau créneau.",
sessionRecapTitle: "Bilan de la séance",
```

and their direct English equivalents.

5. In `SessionRow`, replace `canRespond` with `const presentation = getPortalSessionState(session, role)`. Render **Confirmer** only when `presentation.canConfirm`; render **Demander un ajustement** when `presentation.canRequestChange`; render an informational state when `presentation.isWaitingForOther` or `presentation.isExpiredProposal`; and render **Paiement prêt** only when `presentation.canShowPayment`.
6. Below a past parent session, render `recap.parent_summary` and `recap.homework_next` under `copy.sessionRecapTitle` only when `recap` exists.

In `src/lib/parentPortal.js`:

1. Import `getPortalSessionState`.
2. Treat only a current or future non-terminal session as satisfying the existing-session condition in `getParentNextAction`.
3. In `getParentTodaySession`, ignore a stale proposed `next_session` and return the next current/future non-terminal session instead.

- [ ] **Step 4: Verify the parent portal suite passes**

Run: `node --test test/parent-portal.test.mjs`

Expected: all tests pass, and no session action is derived directly from `session_status` in `SessionRow`.

- [ ] **Step 5: Commit the user-interface state fix**

```powershell
git add src/pages/Portal.jsx src/lib/parentPortal.js test/parent-portal.test.mjs
git commit -m "feat: clarify parent tutor session handoff"
```

### Task 3: Enforce the confirmation and payment invariant in Apps Script

**Files:**
- Modify: `ops/crm/google-apps-script/Code.gs`
- Modify: `test/parent-portal.test.mjs`

**Interfaces:**
- Consumes the existing `respondToPortalSession_`, `reschedulePortalSession_`, and `voidUnpaidSessionPayments_` backend functions.
- Produces backend behaviour that rejects stale confirmations, clears payment state for new proposals and change requests, and enables payment only after both confirmations.

- [ ] **Step 1: Write the failing backend contract test**

Append this test to `test/parent-portal.test.mjs`:

```js
test("CRM protects confirmation and payment state for proposed sessions", async () => {
  const source = await readFile(new URL("../ops/crm/google-apps-script/Code.gs", import.meta.url), "utf8")
  const responder = source.slice(
    source.indexOf("function respondToPortalSession_("),
    source.indexOf("function reschedulePortalSession_("),
  )
  const creator = source.slice(
    source.indexOf("function createPortalSession_("),
    source.indexOf("function bookPortalSession_("),
  )
  const rescheduler = source.slice(
    source.indexOf("function reschedulePortalSession_("),
    source.indexOf("function cancelPortalSession_("),
  )

  assert.match(responder, /response === "confirm" && !isUpcomingDate_\(sessionRecord\.data\.start_at\)/)
  assert.match(responder, /next\.payment_status = next\.credit_reservation_id \? "not_requested" : "payment_requested"/)
  assert.match(responder, /next\.payment_status = "not_requested"/)
  assert.match(responder, /voidUnpaidSessionPayments_\(spreadsheet, sessionId, "Schedule change requested\."\)/)
  assert.match(creator, /payment_status: "not_requested"/)
  assert.match(rescheduler, /payment_status: "not_requested"/)
  assert.match(rescheduler, /voidUnpaidSessionPayments_\(spreadsheet, sessionId, "Session rescheduled by the team\."\)/)
})
```

- [ ] **Step 2: Verify the backend contract test fails**

Run: `node --test test/parent-portal.test.mjs`

Expected: failure because the current CRM marks proposed operator sessions as `payment_requested` and accepts stale confirmation.

- [ ] **Step 3: Apply the smallest backend invariant**

In `createPortalSession_`, write `payment_status: "not_requested"` for every operator-created proposal.

In `respondToPortalSession_`:

```js
if (response === "confirm" && !isUpcomingDate_(sessionRecord.data.start_at)) {
  return { ok: false, code: "SESSION_NOT_ACTIONABLE" };
}

if (response === "confirm") {
  if (session.access.role === "parent") {
    next.parent_confirmed_at = now;
  } else {
    next.tutor_confirmed_at = now;
  }
  next.session_status = next.parent_confirmed_at && next.tutor_confirmed_at ? "confirmed" : "proposed";
  next.payment_status = next.credit_reservation_id ? "not_requested" : "payment_requested";
} else if (["request_change", "decline"].includes(response)) {
  next.session_status = "requested";
  next.parent_confirmed_at = "";
  next.tutor_confirmed_at = "";
  next.payment_status = "not_requested";
  voidUnpaidSessionPayments_(spreadsheet, sessionId, "Schedule change requested.");
}
```

In `reschedulePortalSession_`, before writing the new proposal, call:

```js
voidUnpaidSessionPayments_(spreadsheet, sessionId, "Session rescheduled by the team.");
```

and include `payment_status: "not_requested"` in `next`.

- [ ] **Step 4: Verify the backend contract test passes**

Run: `node --test test/parent-portal.test.mjs`

Expected: all tests pass and the checked source contains the stale-confirmation and payment-reset guards.

- [ ] **Step 5: Commit the backend protection**

```powershell
git add ops/crm/google-apps-script/Code.gs test/parent-portal.test.mjs
git commit -m "fix: protect portal session confirmation state"
```

### Task 4: Run the full verification and update the operating guide

**Files:**
- Modify: `ops/crm/parent-tutor-portal.md`

- [ ] **Step 1: Add the flow invariant to the guide**

Under `## Session lifecycle`, add:

```markdown
For an operator-created proposal, no payment is requested until both the parent and tutor have confirmed. A stale proposal cannot be confirmed. It remains visible as expired and can create a schedule-change request for the team; it is never treated as a payable booking.
```

- [ ] **Step 2: Run portal tests**

Run: `npm.cmd run test:portal`

Expected: 28 or more tests pass with zero failures.

- [ ] **Step 3: Run production build and contract checks**

Run: `npm.cmd run test:site`

Expected: pricing, build, Meet/Checkout contract, and static-site checks pass.

- [ ] **Step 4: Inspect whitespace and commit**

Run: `git diff --check`

Expected: no output.

```powershell
git add ops/crm/parent-tutor-portal.md
git commit -m "docs: clarify portal confirmation workflow"
```
