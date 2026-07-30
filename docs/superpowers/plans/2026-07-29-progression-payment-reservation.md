# Paiement de mi-parcours et réservations du Bloc de progression Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Let a parent securely open the second $300 Progress-block Checkout after the fourth reserved/used credit, and make the fifth-credit exhaustion clear before a sixth booking is attempted.

**Architecture:** The Apps Script CRM remains authoritative for ownership, payment readiness, Checkout idempotency, and credit reservations. A small pure frontend state helper turns the sanitized enrollment summary into a parent-facing payment/booking state; ProgramProgressCard presents the action and BookingPanel prevents a misleading per-session Checkout path.

**Tech Stack:** React 18, Vite, Node built-in test runner, Google Apps Script, static contract checker.

## Global Constraints

- A verified payment grants credits exactly once; never grant credits from a requested, expired, or failed Checkout.
- A plan reservation must remain atomic with slot validation and session creation.
- The parent may access only an enrollment whose parent_email matches the authenticated portal access; an operator retains cross-family access.
- Progress block: first verified $300 grants 5 credits; the second verified $300 grants 5 credits; Checkout may be requested after 4 first-half credits are reserved/used.
- Do not add automatic card charges, card storage, automatic renewal, or automatic email reminders.
- Derive displayed installment amounts from pricing.offers.progression_block.installmentPriceCad; do not hard-code 300 in React.
- Preserve the existing 72-hour cancellation/release policy.

---

### Task 1: Make progression payment readiness an explicit CRM contract

**Files:**
- Modify: scripts/check-static-site.mjs:303-414
- Modify: ops/crm/google-apps-script/Code.gs:2298-2400

**Interfaces:**
- Produces: isProgressionMidpointPaymentReady_(summary) returning true only when five first-half credits exist and at least four are reserved or used.
- Produces: createPortalPlanPaymentRequest_ usable by the authenticated enrollment owner (parent) or any operator.
- Consumes: findPlanEnrollmentForPortalAccess_(spreadsheet, access, enrollmentId) for owner-scoped retrieval.

- [ ] **Step 1: Write the failing CRM contract assertions**

In scripts/check-static-site.mjs, expose isProgressionMidpointPaymentReady_ from the existing __planPayments sandbox and add:

    expect(
      lifecycle.isProgressionMidpointPaymentReady_({ credits_total: 5, credits_reserved: 4, credits_used: 0 }) === true &&
        lifecycle.isProgressionMidpointPaymentReady_({ credits_total: 5, credits_reserved: 3, credits_used: 0 }) === false,
      "Apps Script: Progress payment must open after four, not three, reserved or used credits",
    )
    expect(paymentRequestFunction.includes('findPlanEnrollmentForPortalAccess_(spreadsheet, portalSession.access, enrollmentId)'),
      "Apps Script: parent package payment requests must be scoped to their enrollment")

- [ ] **Step 2: Run the contract checker and verify the expected RED failure**

Run: npm.cmd run check:site
Expected: FAIL stating that isProgressionMidpointPaymentReady_ is unavailable or the owner-scoped payment request is missing.

- [ ] **Step 3: Implement the minimal authorization and readiness helper**

Add beside getPlanPaymentStage_:

    const PROGRESSION_MIDPOINT_PAYMENT_READY_AFTER_CREDITS = 4;

    function isProgressionMidpointPaymentReady_(summary) {
      const creditsTotal = normalizeCreditAmount_(summary?.credits_total);
      const creditsEngaged = normalizeCreditAmount_(summary?.credits_reserved) + normalizeCreditAmount_(summary?.credits_used);
      return creditsTotal >= 5 && creditsEngaged >= PROGRESSION_MIDPOINT_PAYMENT_READY_AFTER_CREDITS;
    }

At the start of createPortalPlanPaymentRequest_, replace the operator-only session check and direct lookup:

    const portalSession = verifyPortalSession_(spreadsheet, payload.token);
    if (!portalSession.ok || !["parent", "operator"].includes(portalSession.access.role)) {
      return portalSession.ok ? { ok: false, code: "PLAN_ENROLLMENT_NOT_ALLOWED" } : portalSession;
    }
    const enrollmentRecord = findPlanEnrollmentForPortalAccess_(spreadsheet, portalSession.access, enrollmentId);

Re-read currentEnrollment with the same helper inside the lock. Replace the five-credit conditional with:

    if (normalizeValue_(payload.payment_stage) === "progression_midpoint") {
      const summary = buildEnrollmentCreditSummary_(spreadsheet, enrollmentId);
      if (!isProgressionMidpointPaymentReady_(summary)) {
        return { ok: false, code: "PLAN_PAYMENT_STAGE_NOT_READY" };
      }
    }

- [ ] **Step 4: Run the contract checker and verify GREEN**

Run: npm.cmd run check:site
Expected: Static site checks passed.

- [ ] **Step 5: Commit the CRM contract**

    git add ops/crm/google-apps-script/Code.gs scripts/check-static-site.mjs
    git commit -m "feat: unlock progress payment after fourth credit"

### Task 2: Model the parent payment and booking state as a pure function

**Files:**
- Create: src/lib/progressionPaymentState.js
- Create: test/progression-payment-state.test.mjs
- Modify: src/pages/Portal.jsx:6290-6410

**Interfaces:**
- Produces: getProgressionPaymentState(summary) with canRequestMidpointPayment, bookingBlocked, and creditsEngaged.
- Consumes: planId, creditsGranted, creditsReserved, creditsUsed, creditsRemaining from getParentOfferSnapshot.
- Used by: ProgramProgressCard and BookingPanel in Task 3.

- [ ] **Step 1: Write the failing pure-state tests**

Create test/progression-payment-state.test.mjs:

    import assert from "node:assert/strict"
    import test from "node:test"
    import { getProgressionPaymentState } from "../src/lib/progressionPaymentState.js"

    const base = { planId: "PLAN-PACK10-600", creditsGranted: 5, creditsReserved: 0, creditsUsed: 0, creditsRemaining: 5 }

    test("opens the second Progress payment at the fourth engaged credit", () => {
      assert.equal(getProgressionPaymentState({ ...base, creditsReserved: 3, creditsRemaining: 2 }).canRequestMidpointPayment, false)
      assert.equal(getProgressionPaymentState({ ...base, creditsReserved: 4, creditsRemaining: 1 }).canRequestMidpointPayment, true)
    })

    test("blocks the next booking after all first-half credits are engaged", () => {
      const state = getProgressionPaymentState({ ...base, creditsReserved: 5, creditsRemaining: 0 })
      assert.equal(state.canRequestMidpointPayment, true)
      assert.equal(state.bookingBlocked, true)
    })

    test("does not prompt after the second payment has granted the remaining five credits", () => {
      assert.equal(getProgressionPaymentState({ ...base, creditsGranted: 10, creditsReserved: 5, creditsRemaining: 5 }).canRequestMidpointPayment, false)
    })

- [ ] **Step 2: Run the test and verify RED**

Run: node --test test/progression-payment-state.test.mjs
Expected: FAIL with module-not-found for progressionPaymentState.js.

- [ ] **Step 3: Implement the pure helper and add snapshot fields**

Create src/lib/progressionPaymentState.js:

    export const PROGRESSION_MIDPOINT_PAYMENT_RULE = Object.freeze({
      planId: "PLAN-PACK10-600",
      firstInstallmentCredits: 5,
      paymentReadyAtCredits: 4,
      paymentStage: "progression_midpoint",
    })

    const nonNegativeInteger = (value) => Math.max(0, Math.round(Number(value) || 0))

    export function getProgressionPaymentState(summary = {}) {
      const isProgression = String(summary.planId || "") === PROGRESSION_MIDPOINT_PAYMENT_RULE.planId
      const creditsGranted = nonNegativeInteger(summary.creditsGranted)
      const creditsEngaged = nonNegativeInteger(summary.creditsReserved) + nonNegativeInteger(summary.creditsUsed)
      const canRequestMidpointPayment = isProgression &&
        creditsGranted === PROGRESSION_MIDPOINT_PAYMENT_RULE.firstInstallmentCredits &&
        creditsEngaged >= PROGRESSION_MIDPOINT_PAYMENT_RULE.paymentReadyAtCredits
      return {
        canRequestMidpointPayment,
        bookingBlocked: canRequestMidpointPayment && nonNegativeInteger(summary.creditsRemaining) < 1,
        creditsEngaged,
      }
    }

In getParentOfferSnapshot, retain the raw ledger grant and reservation values:

    creditsGranted: creditsReady ? Math.max(0, Math.round(recordedCreditsTotal)) : null,
    creditsReserved: creditsReady ? Math.max(0, Math.round(firstPortalNumber(plan.credits_reserved, dashboard.credits_reserved, dashboard.program_credits_reserved) || 0)) : null,

Import the helper in Portal.jsx without changing UI behavior.

- [ ] **Step 4: Run the state tests and portal tests**

Run: node --test test/progression-payment-state.test.mjs test/parent-portal.test.mjs
Expected: all tests pass.

- [ ] **Step 5: Commit the state model**

    git add src/lib/progressionPaymentState.js test/progression-payment-state.test.mjs src/pages/Portal.jsx
    git commit -m "feat: model progress block payment readiness"

### Task 3: Put the self-service Checkout and reservation guard in the parent portal

**Files:**
- Modify: test/parent-portal.test.mjs:303-360
- Modify: src/pages/Portal.jsx:2291-2500
- Modify: src/pages/Portal.jsx:2615-2695
- Modify: src/pages/Portal.jsx:4900-5050
- Modify: src/pages/Portal.jsx:380-450

**Interfaces:**
- Consumes: getProgressionPaymentState, createPortalPlanPaymentRequest, and a safe hosted Checkout URL.
- Produces: a parent-only second-payment action after four engaged credits; a disabled sixth-booking path that directs the parent to payment.

- [ ] **Step 1: Write failing parent-portal contract assertions**

Add this test to test/parent-portal.test.mjs:

    test("offers the parent a progress-block payment before credit exhaustion", async () => {
      const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
      assert.match(source, /function ProgramProgressCard([\s\S]*createPortalPlanPaymentRequest/)
      assert.match(source, /paymentStage: PROGRESSION_MIDPOINT_PAYMENT_RULE.paymentStage/)
      assert.match(source, /copy.programMidpointPaymentAction/)
      assert.match(source, /bookingBlocked/)
      assert.match(source, /copy.bookingProgramPaymentRequired/)
    })

- [ ] **Step 2: Run the test and verify RED**

Run: node --test test/parent-portal.test.mjs
Expected: FAIL because ProgramProgressCard does not yet request a parent Checkout and the new copy does not exist.

- [ ] **Step 3: Implement the checkout card, accurate copy, and booking guard**

Pass token and onSaved to ProgramProgressCard from ParentDashboard. In the card, derive the state and create/reuse Checkout only on an explicit parent click:

    const paymentState = getProgressionPaymentState(snapshot)
    const [paymentUrl, setPaymentUrl] = useState("")

    async function requestMidpointPayment() {
      setIsSaving(true)
      const result = await createPortalPlanPaymentRequest({
        token,
        enrollmentId: snapshot.enrollmentId,
        paymentStage: PROGRESSION_MIDPOINT_PAYMENT_RULE.paymentStage,
      })
      setIsSaving(false)
      if (!result.ok) {
        setStatus(getPortalErrorMessage(copy, result.code))
        return
      }
      setPaymentUrl(getSafeHostedCheckoutUrl(result.payment_url || result.checkout_url))
      onSaved?.()
    }

Render it only when paymentState.canRequestMidpointPayment. Add French and English programMidpointPayment keys and bookingProgramPaymentRequired, deriving payment amount through formatCadAmount(snapshot.offer.installmentPriceCad, locale).

Update findPlanEnrollmentForBooking to optionally retain a zero-credit matching pack. Let BookingPanel derive paymentState.bookingBlocked; in that state, do not submit a normal per-session booking and render the payment-required copy instead of a normal per-session Checkout.

- [ ] **Step 4: Run parent portal tests and the full portal suite**

Run: npm.cmd run test:portal
Expected: all portal tests pass.

- [ ] **Step 5: Commit the parent experience**

    git add src/pages/Portal.jsx test/parent-portal.test.mjs
    git commit -m "feat: let parents pay progress blocks at midpoint"

### Task 4: Align the operational documentation and run full verification

**Files:**
- Modify: ops/crm/parent-tutor-portal.md:175-211
- Create: docs/superpowers/specs/2026-07-29-progression-payment-reservation-design.md
- Create: docs/superpowers/plans/2026-07-29-progression-payment-reservation.md

- [ ] **Step 1: Update the credit-lifecycle documentation**

State that the second Checkout becomes available to the parent after four of the first five credits are reserved or used, and that the sixth booking remains unavailable until the verified second payment grants the remaining five credits.

- [ ] **Step 2: Run the complete regression suite**

Run: npm.cmd run test:site
Expected: pricing contract, production build, and static-site checks all exit 0.

Run: npm.cmd run test:portal
Expected: all portal API/material/parent tests pass.

- [ ] **Step 3: Inspect the scoped diff**

Run: git diff --check; git diff -- ops/crm/google-apps-script/Code.gs src/lib/progressionPaymentState.js src/pages/Portal.jsx test scripts ops/crm/parent-tutor-portal.md docs/superpowers
Expected: no whitespace errors; only planned payment/reservation changes plus design and plan documents.

- [ ] **Step 4: Commit documentation and final verification result**

    git add ops/crm/parent-tutor-portal.md docs/superpowers/specs/2026-07-29-progression-payment-reservation-design.md docs/superpowers/plans/2026-07-29-progression-payment-reservation.md
    git commit -m "docs: clarify progress block reservation payments"
