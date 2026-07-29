# Collapsible Session Archives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep upcoming parent sessions prominent while making past and cancelled session history compact and available on demand.

**Architecture:** Keep status grouping in `portalSessionState.js` and make its historical arrays newest-first. Extend the existing generic `RecordList` UI in `Portal.jsx` with an opt-in, accessible disclosure mode; only the two archive sections use it, so booking, upcoming sessions, payments, and operator lists retain their current layout.

**Tech Stack:** React 18, Vite, Tailwind CSS utility classes, Lucide React icons, Node's built-in test runner.

## Global Constraints

- Do not add dependencies or change the portal API, payment flow, permissions, or session status definitions.
- Keep French and English section labels from the existing `copy` object; the visible numeric count must remain part of the button’s accessible name.
- “À venir” and every non-archive `RecordList` remain expanded and retain their current empty-state behavior.
- “Passées” and “Annulées” are closed by default, are absent when empty, and render their rows only after opening.
- Past and cancelled rows must display newest valid `start_at` first. An undated cancelled row follows dated cancellations while retaining source order relative to other undated cancellations; an undated completed session retains the current `upcoming` classification.
- Use semantic `button`, `aria-expanded`, `aria-controls`, and a labelled `region`; retain a visible keyboard focus ring and at least the current `min-h-11` touch target.

---

## File Structure

- Modify: `src/lib/portalSessionState.js`
  - Keep `groupParentSessions` as the single classification boundary; add a private comparator used only for past and cancelled groups.
- Modify: `src/pages/Portal.jsx`
  - Import the disclosure icon and React `useId`; opt the two archive call sites into the reusable collapsed layout; implement that layout inside `RecordList`.
- Modify: `test/parent-portal.test.mjs`
  - Lock down historical ordering and the portal source’s archive/disclosure contract alongside the existing portal tests.

## Task 1: Sort session history at its grouping boundary

**Files:**
- Modify: `test/parent-portal.test.mjs:103-118`
- Modify: `src/lib/portalSessionState.js:4-82`

**Interfaces:**
- Consumes: `groupParentSessions(sessions, now)` where each session can provide `session_status` and `start_at`.
- Produces: `groupParentSessions(sessions, now) -> { upcoming: Session[], past: Session[], cancelled: Session[] }`, with `past` and `cancelled` sorted by decreasing valid `start_at` while an undated completed session keeps the existing `upcoming` classification.

- [ ] **Step 1: Replace the current grouping assertion with a failing order test**

  In `test/parent-portal.test.mjs`, replace the existing `groups parent history...` test’s `sessions` fixture and group assertions with this fixture and assertions; keep the existing `findReleasedParentRecap` assertions below it.

  ```js
  const groups = groupParentSessions([
    { session_id: "UP", session_status: "confirmed", start_at: "2026-08-01T17:00:00.000Z" },
    { session_id: "PAST-OLD", session_status: "completed", start_at: "2026-07-14T17:00:00.000Z" },
    { session_id: "CANCELLED-OLD", session_status: "cancelled", start_at: "2026-07-18T17:00:00.000Z" },
    { session_id: "PAST-NEW", session_status: "completed", start_at: "2026-07-24T17:00:00.000Z" },
    { session_id: "CANCELLED-NEW", session_status: "cancelled", start_at: "2026-07-22T17:00:00.000Z" },
    { session_id: "CANCELLED-UNDATED", session_status: "cancelled", start_at: "not-a-date" },
  ], now)

  assert.deepEqual(groups.upcoming.map((session) => session.session_id), ["UP"])
  assert.deepEqual(groups.past.map((session) => session.session_id), ["PAST-NEW", "PAST-OLD"])
  assert.deepEqual(groups.cancelled.map((session) => session.session_id), ["CANCELLED-NEW", "CANCELLED-OLD", "CANCELLED-UNDATED"])
  ```

- [ ] **Step 2: Run the focused test to verify it fails**

  Run: `node --test --test-name-pattern "groups parent history" test/parent-portal.test.mjs`

  Expected: FAIL because `groupParentSessions` currently preserves source order for historical groups, placing `PAST-OLD` before `PAST-NEW`.

- [ ] **Step 3: Add the private chronological comparator and sort only archive groups**

  In `src/lib/portalSessionState.js`, add this helper after `timestamp`:

  ```js
  function byMostRecentStart(left, right) {
    const leftAt = timestamp(left?.start_at)
    const rightAt = timestamp(right?.start_at)

    if (leftAt === null && rightAt === null) return 0
    if (leftAt === null) return 1
    if (rightAt === null) return -1
    return rightAt - leftAt
  }
  ```

  In `groupParentSessions`, keep the current `reduce` unchanged, but store it in `const groups`. Return the groups with only the two histories sorted:

  ```js
  const groups = records(sessions).reduce(/* existing reducer */, {
    upcoming: [], past: [], cancelled: [],
  })

  return {
    upcoming: groups.upcoming,
    past: groups.past.sort(byMostRecentStart),
    cancelled: groups.cancelled.sort(byMostRecentStart),
  }
  ```

- [ ] **Step 4: Run the focused test to verify it passes**

  Run: `node --test --test-name-pattern "groups parent history" test/parent-portal.test.mjs`

  Expected: PASS with the newest past and cancelled sessions first, and the undated cancellation last.

- [ ] **Step 5: Commit the focused data behavior**

  ```bash
  git add test/parent-portal.test.mjs src/lib/portalSessionState.js
  git commit -m "feat: sort parent session archives by date"
  ```

## Task 2: Make parent session archives accessible disclosures

**Files:**
- Modify: `test/parent-portal.test.mjs:302-315`
- Modify: `src/pages/Portal.jsx:1-28`
- Modify: `src/pages/Portal.jsx:2379-2410`
- Modify: `src/pages/Portal.jsx:5423-5435`

**Interfaces:**
- Consumes: `RecordList({ icon, title, empty, records, render, collapsible })`, `sessionGroups.past`, and `sessionGroups.cancelled`.
- Produces: An opt-in `RecordList` disclosure that starts closed when `collapsible` is true, hides empty archive sections, exposes its count in the toggle text, and leaves all existing non-collapsible lists unchanged.

- [ ] **Step 1: Add failing source-contract assertions for the archive UI**

  At the end of the existing `renders grouped parent session history and state-driven session actions` test in `test/parent-portal.test.mjs`, append:

  ```js
  assert.match(source, /<RecordList[\s\S]*records=\{sessionGroups\.past\}[\s\S]*collapsible/)
  assert.match(source, /<RecordList[\s\S]*records=\{sessionGroups\.cancelled\}[\s\S]*collapsible/)
  assert.match(source, /function RecordList\(\{[\s\S]*collapsible = false/)
  assert.match(source, /useState\(\(\) => !collapsible\)/)
  assert.match(source, /aria-expanded=\{isOpen\}/)
  assert.match(source, /aria-controls=\{contentId\}/)
  assert.match(source, /role="region"/)
  assert.match(source, /aria-labelledby=\{toggleId\}/)
  assert.match(source, /<ChevronDown/)
  assert.match(source, /collapsible && !records\.length/)
  ```

- [ ] **Step 2: Run the focused UI contract test to verify it fails**

  Run: `node --test --test-name-pattern "renders grouped parent session history" test/parent-portal.test.mjs`

  Expected: FAIL because neither parent archive call site nor `RecordList` yet has the disclosure API.

- [ ] **Step 3: Add the archive mode without changing other record lists**

  In `src/pages/Portal.jsx`:

  1. Extend the React import to include `useId` and the Lucide import to include `ChevronDown`.
  2. Add a bare `collapsible` prop to the `RecordList` calls for `sessionGroups.past` and `sessionGroups.cancelled`; do not add it to upcoming sessions, payments, or any operator list.
  3. Replace `RecordList` with this implementation, preserving the existing `render` callback and visual classes for individual rows:

  ```jsx
  function RecordList({ icon: Icon, title, empty, records = [], render, collapsible = false }) {
    const [isOpen, setIsOpen] = useState(() => !collapsible)
    const contentId = useId()
    const toggleId = useId()

    if (collapsible && !records.length) {
      return null
    }

    const content = records.length
      ? records.map(render)
      : <p className="text-sm leading-7 text-white/60">{empty}</p>

    return (
      <section className="panel-soft rounded-[24px] p-4 text-white sm:p-5">
        {collapsible ? (
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            <button
              id={toggleId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setIsOpen((current) => !current)}
              className="flex min-h-11 w-full items-center gap-3 rounded-xl text-left transition hover:text-[#f5c977] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1b3a]"
            >
              <Icon className="h-5 w-5 shrink-0 text-[#f5c977]" aria-hidden="true" />
              <span className="min-w-0 flex-1">{title}</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-sm font-semibold text-white/72">{records.length}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          </h2>
        ) : (
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-[#f5c977]" />
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
          </div>
        )}
        {collapsible ? (
          <div id={contentId} role="region" aria-labelledby={toggleId} hidden={!isOpen} className="mt-5 space-y-3">
            {isOpen ? content : null}
          </div>
        ) : (
          <div className="mt-5 space-y-3">{content}</div>
        )}
      </section>
    )
  }
  ```

- [ ] **Step 4: Run the focused UI contract test to verify it passes**

  Run: `node --test --test-name-pattern "renders grouped parent session history" test/parent-portal.test.mjs`

  Expected: PASS, confirming both archive call sites use collapse mode and the disclosure exposes the expected accessibility semantics.

- [ ] **Step 5: Commit the portal UI change**

  ```bash
  git add test/parent-portal.test.mjs src/pages/Portal.jsx
  git commit -m "feat: collapse parent session archives"
  ```

## Task 3: Verify the full portal and production build

**Files:**
- Verify only: `test/parent-portal.test.mjs`
- Verify only: `src/lib/portalSessionState.js`
- Verify only: `src/pages/Portal.jsx`

**Interfaces:**
- Consumes: The two completed tasks and existing npm scripts.
- Produces: Evidence that portal behavior, static checks, and the production build remain valid.

- [ ] **Step 1: Run all portal tests**

  Run: `npm run test:portal`

  Expected: PASS for the portal API, materials, and parent-portal test files.

- [ ] **Step 2: Run the production build and static-site validation**

  Run: `npm run build && npm run check:site`

  Expected: Vite completes its production bundle, static SEO generation completes, and the site checker reports success.

- [ ] **Step 3: Perform the targeted visual and keyboard check**

  Start the local site with `npm run dev -- --host 127.0.0.1`, open `/portail`, and sign in with portal test data. On both a narrow mobile viewport and desktop viewport:

  1. Verify « À venir » remains visible on arrival.
  2. Verify « Passées » and « Annulées » show only their title, count, and chevron before activation.
  3. Use Tab then Enter or Space to open and close each archive; verify the chevron changes direction and focus stays visible.
  4. Verify a past session still shows its released recap and homework after opening.
  5. Verify zero-record archive sections are absent and a long cancelled list does not push useful upcoming content out of the initial view.

- [ ] **Step 4: Record verification in the delivery note**

  Report the exact passing commands and the manual viewport checks in the final handoff. Do not change the API, CRM script, payment logic, or session actions during verification.

## Amendment: Separate sessions needing follow-up from completed history

**Goal:** Keep only completed sessions in the collapsed history, expose past non-terminal sessions in an open follow-up section, and restore the adjustment action promised by an expired proposal.

**Files:**
- Modify: `src/lib/portalSessionState.js`
- Modify: `src/pages/Portal.jsx`
- Modify: `test/parent-portal.test.mjs`

**Rules:**
- `groupParentSessions` returns `{ upcoming, followUp, past, cancelled }`.
- `cancelled` and `no_show` remain cancelled; a `completed` session with a valid date is the only past/history state; non-terminal sessions whose valid `start_at` is now or earlier enter `followUp`; other invalid dates keep the established upcoming behavior.
- `followUp` is rendered as an open `RecordList` only when it has entries; `past` and `cancelled` remain collapsible archives.
- A parent or tutor can request a change for an expired `proposed` session. A confirmed session whose time has ended remains non-adjustable.

### Task 4: Route expired sessions to follow-up and restore their adjustment action

**Files:**
- Modify: `test/parent-portal.test.mjs:19-40,103-123,306-328`
- Modify: `src/lib/portalSessionState.js:32-101`
- Modify: `src/pages/Portal.jsx:321-323,853-855,2363-2410`

**Interfaces:**
- Consumes: `getPortalSessionState(session, role, now)` and `groupParentSessions(sessions, now)`.
- Produces: `getPortalSessionState(...).canRequestChange === true` for an expired `proposed` session and `groupParentSessions(...) -> { upcoming, followUp, past, cancelled }` with completed sessions isolated in `past`.

- [ ] **Step 1: Write failing behavior and source-contract tests**

  In `test/parent-portal.test.mjs`:

  ```js
  assert.equal(state.isExpiredProposal, true)
  assert.equal(state.canConfirm, false)
  assert.equal(state.canRequestChange, true)
  ```

  Keep the existing test asserting that an ended `confirmed` session has `canRequestChange === false`. Extend the history fixture with:

  ```js
  { session_id: "FOLLOW-UP", session_status: "calendar_created", start_at: "2026-07-22T17:00:00.000Z" },
  ```

  Then assert:

  ```js
  assert.deepEqual(groups.followUp.map((session) => session.session_id), ["FOLLOW-UP"])
  assert.deepEqual(groups.past.map((session) => session.session_id), ["PAST-NEW", "PAST-OLD"])
  ```

  In the existing portal source-contract test, add assertions for `copy.followUpSessions` and `sessionGroups.followUp` and assert that only the past and cancelled `RecordList` calls use `collapsible`.

- [ ] **Step 2: Run the focused tests to verify they fail**

  Run: `node --test --test-name-pattern "does not let a parent confirm|groups parent history|renders grouped parent session history" test/parent-portal.test.mjs`

  Expected: FAIL because expired proposals currently hide `canRequestChange`, `followUp` does not exist, and the portal has no follow-up section.

- [ ] **Step 3: Implement the minimal state and UI changes**

  In `src/lib/portalSessionState.js`, make `isExpiredProposal` apply only to `proposed` status. Preserve confirmation rules, but expose `canRequestChange` for any parent or tutor on a `proposed` session; retain the current-date guard for a `confirmed` session:

  ```js
  const isExpiredProposal = status === "proposed" && !isFuture
  const canRequestChange = isParticipant && (
    status === "proposed" ||
    (status === "confirmed" && isPortalSessionCurrentOrFuture(session, now))
  )
  ```

  Remove `PENDING_STATUSES`, which is no longer used after narrowing the expired-proposal condition.

  Rework `groupParentSessions` so cancellation states are classified first, invalid non-cancellation dates preserve their existing upcoming classification, and the reducer initializes four arrays:

  ```js
  if (["cancelled", "no_show"].includes(status)) {
    groups.cancelled.push(session)
  } else if (startAt === null) {
    groups.upcoming.push(session)
  } else if (status === "completed") {
    groups.past.push(session)
  } else if (startAt !== null && startAt <= nowAt) {
    groups.followUp.push(session)
  } else {
    groups.upcoming.push(session)
  }
  ```

  Return `followUp` sorted with `byMostRecentStart`, alongside the existing archive sorting. In `Portal.jsx`, add localised `followUpSessions` copy (`"À régulariser"` / `"Needs follow-up"`) and conditionally render a non-collapsible `RecordList` immediately after `À venir`, using `Clock3`, `sessionGroups.followUp`, and the existing `SessionRow`. Keep recap lookup only on `past`; do not pass `collapsible` to follow-up.

- [ ] **Step 4: Run the focused tests to verify they pass**

  Run: `node --test --test-name-pattern "does not let a parent confirm|groups parent history|renders grouped parent session history" test/parent-portal.test.mjs`

  Expected: PASS; expired proposals expose an adjustment request, completed sessions are the only past records, and the portal includes the follow-up list.

- [ ] **Step 5: Run the portal suite and commit**

  Run: `npm.cmd run test:portal`

  Expected: PASS with all portal tests green.

  ```bash
  git add test/parent-portal.test.mjs src/lib/portalSessionState.js src/pages/Portal.jsx
  git commit -m "fix: surface expired sessions for follow-up"
  ```
