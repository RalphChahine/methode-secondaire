# Responsive Navigation and Tutor Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the marketing-site navigation fully usable on short mobile screens and expose the existing tutor recruitment route in both desktop and mobile navigation.

**Architecture:** `SiteLayout.jsx` is the shared source for desktop links and the mobile Sheet. Add the localized recruitment route to its `copy.nav` arrays once so both surfaces stay synchronized. Bound the Sheet to the dynamic viewport, make only its content area scroll, and move the independently fixed booking bar beneath the Sheet z-layer.

**Tech Stack:** React 18, React Router, Tailwind CSS utilities, Radix Sheet, Node built-in test runner, Vite.

## Global Constraints

- Preserve current links, booking actions, Sheet focus behavior, and French/English routing.
- Do not alter the shared `src/components/ui/sheet.jsx`; scope the responsive layout change to the marketing SiteLayout instance.
- Use `100dvh` and `env(safe-area-inset-bottom)` so short Android/iOS viewports retain access to every action.
- Keep unrelated user worktree changes out of commits.

---

### Task 1: Lock the responsive navigation contract with a regression test

**Files:**
- Create: `test/site-layout.test.mjs`
- Modify: `package.json:5-14`

**Interfaces:**
- Consumes: `src/layouts/SiteLayout.jsx` source.
- Produces: `npm run test:site` coverage for the shared marketing navigation contract.

- [ ] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("keeps the responsive navigation reachable and links tutor recruitment in both locales", async () => {
  const source = await readFile(new URL("../src/layouts/SiteLayout.jsx", import.meta.url), "utf8")

  assert.match(source, /label: "Devenir tuteur", to: getLocalizedPath\("devenirTuteur", locale\)/)
  assert.match(source, /label: "Become a tutor", to: getLocalizedPath\("devenirTuteur", locale\)/)
  assert.match(source, /h-\[100dvh\].*max-h-\[100dvh\].*flex-col.*overflow-hidden/)
  assert.match(source, /min-h-0 flex-1 overflow-y-auto.*safe-area-inset-bottom/)
  assert.match(source, /fixed inset-x-0 bottom-0 z-40/)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test test/site-layout.test.mjs`

Expected: FAIL because the shared navigation lacks both recruitment labels and the sheet is not a dynamic-viewport scroll region.

- [ ] **Step 3: Register the test in the site check command**

Update the `test:site` script in `package.json` to start with `node --test test/site-layout.test.mjs &&`, preserving the existing pricing, build, and static-site checks.

- [ ] **Step 4: Commit the red test and its command registration**

```bash
git add test/site-layout.test.mjs package.json
git commit -m "test: cover responsive site navigation"
```

### Task 2: Make the shared navigation responsive and expose recruitment

**Files:**
- Modify: `src/layouts/SiteLayout.jsx:34-341`
- Test: `test/site-layout.test.mjs`

**Interfaces:**
- Consumes: `copy.nav`, `SheetContent`, `SheetHeader`, `SheetClose`, `mobileAction`.
- Produces: a single localized route list rendered by both desktop `<nav>` and the mobile Sheet, plus a scrollable Sheet body.

- [ ] **Step 1: Add the shared route labels**

Add `{ type: "route", label: "Devenir tuteur", to: getLocalizedPath("devenirTuteur", locale) }` to the French `copy.nav` array and `{ type: "route", label: "Become a tutor", to: getLocalizedPath("devenirTuteur", locale) }` to the English array. Do not duplicate the route in either render loop.

- [ ] **Step 2: Bound the mobile Sheet and isolate its scroll area**

Use the SiteLayout `SheetContent` class to set `flex h-[100dvh] max-h-[100dvh] flex-col gap-0 overflow-hidden`. Make the `SheetHeader` shrink-resistant with right padding for the close control. Change the following menu wrapper into `mt-8 min-h-0 flex-1 overflow-y-auto` and give it bottom padding that includes `env(safe-area-inset-bottom)`. Keep all existing links and action buttons inside that scrollable wrapper.

- [ ] **Step 3: Put the booking bar below Sheet/overlay layers**

Change only the fixed mobile booking bar from `z-50` to `z-40`. Keep the header and Radix Sheet layers unchanged so the open Sheet and its overlay take priority.

- [ ] **Step 4: Run the targeted test to verify green**

Run: `node --test test/site-layout.test.mjs`

Expected: PASS with one passing navigation regression test.

- [ ] **Step 5: Commit the responsive fix**

```bash
git add src/layouts/SiteLayout.jsx test/site-layout.test.mjs package.json
git commit -m "fix: keep navigation usable on mobile"
```

### Task 3: Verify the production-ready marketing site

**Files:**
- Verify: `src/layouts/SiteLayout.jsx`, `test/site-layout.test.mjs`

**Interfaces:**
- Consumes: the new Node navigation contract and the Vite static-site generator.
- Produces: buildable static output and a manually inspected short mobile viewport with a reachable final action.

- [ ] **Step 1: Run the complete site check**

Run: `npm.cmd run test:site`

Expected: exit code 0; the new layout test, pricing contract, Vite build, and static-site checks pass.

- [ ] **Step 2: Check the visual behavior at a short mobile viewport**

Open the site at a 390 px-wide, 720 px-high viewport, open the hamburger menu, scroll the sheet to its end, and verify the booking and phone actions can be reached and activated. Confirm the persistent booking bar is not visible above the Sheet.

- [ ] **Step 3: Check desktop navigation**

Open the site at a 1440 px-wide viewport and confirm that `Devenir tuteur` appears in the main horizontal navigation and links to `/devenir-tuteur`.

- [ ] **Step 4: Inspect the change scope**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only the intended navigation/test files and pre-existing user changes are present.
