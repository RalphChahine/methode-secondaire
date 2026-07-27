# Production Stripe Test and Portal Guardrails Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Run a deliberate Stripe Test-mode Checkout on the production portal without a real charge, accurately surface unavailable Checkout setup, and block adjustments to past sessions.

**Architecture:** The Vercel Checkout endpoint derives the safe mode label (\`test\` or \`live\`) from its server-only key. Apps Script sends that label only with a fresh Checkout response. A small portal helper classifies booking results, while shared session state remains the only authority for schedule-change eligibility.

**Tech Stack:** Vite/React, Node Vercel API routes, Google Apps Script CRM, Stripe Checkout, Node built-in test runner.

## Global Constraints

- During pre-client validation, use only \`sk_test_...\` and a Stripe Test-mode webhook. No real card or bank account is charged.
- Never commit, display, or return Stripe/webhook/shared secrets; never use a \`VITE_*\` variable for a secret.
- A booking remains durable when Checkout setup fails but cannot be described as simulated, paid, or ready.
- Only current/future \`proposed\` or \`confirmed\` sessions can request an adjustment.
- Do not change prices, subscriptions, automatic charges, payout settings, or credit rules.

---

## File Structure

| Path | Responsibility |
| --- | --- |
| \`api/create-checkout-session.js\` | Return the safe Checkout mode without returning credentials. |
| \`ops/crm/google-apps-script/Code.gs\` | Return the fresh Checkout mode through a booking response. |
| \`src/lib/portalBookingOutcome.js\` | Classify plan-credit, Checkout-ready, and Checkout-unavailable results. |
| \`src/lib/portalSessionState.js\` | Deny adjustments to ended sessions. |
| \`src/pages/Portal.jsx\` | Render truthful French/English booking feedback. |
| \`test/stripe-checkout.test.mjs\` | Test API mode and setup documentation. |
| \`test/parent-portal.test.mjs\` | Test booking outcomes, past session boundary, and CRM contract. |

### Task 1: Return a safe mode from the Checkout API

**Files:**
- Modify: \`api/create-checkout-session.js\`
- Modify: \`test/stripe-checkout.test.mjs\`

**Interfaces:**
- Produces: \`{ ok, checkout_session_id, checkout_url, expires_at, stripe_mode: "test" | "live" }\`.
- Does not return a Stripe key, secret, customer, or PaymentIntent ID.

- [ ] **Step 1: Write failing tests**

Extend the existing successful \`sk_test_secret\` response expectation:

\`\`\`js
assert.deepEqual(response.payload, {
  ok: true,
  checkout_session_id: "cs_test_123",
  checkout_url: "https://checkout.stripe.com/c/pay/cs_test_123",
  expires_at: "2026-07-21T17:00:00.000Z",
  stripe_mode: "test",
})
\`\`\`

Add a second successful request with \`process.env.STRIPE_SECRET_KEY = "sk_live_secret"\` and assert:

\`\`\`js
assert.equal(response.payload.stripe_mode, "live")
\`\`\`

- [ ] **Step 2: Prove failure**

Run:

\`\`\`powershell
node --test test/stripe-checkout.test.mjs
\`\`\`

Expected: successful Checkout expectation fails because \`stripe_mode\` is absent.

- [ ] **Step 3: Implement the minimal change**

In \`api/create-checkout-session.js\`, add:

\`\`\`js
function getStripeMode(stripeSecretKey) {
  return stripeSecretKey.startsWith("sk_test_") ? "test" : "live"
}
\`\`\`

Add to the existing success JSON only:

\`\`\`js
stripe_mode: getStripeMode(stripeSecretKey),
\`\`\`

- [ ] **Step 4: Verify and commit**

\`\`\`powershell
node --test test/stripe-checkout.test.mjs
npm.cmd run test:payments
git add api/create-checkout-session.js test/stripe-checkout.test.mjs
git commit -m "feat: expose safe Stripe checkout mode"
\`\`\`

Expected: all payment tests pass.

### Task 2: Make booking and schedule-change outcomes truthful

**Files:**
- Create: \`src/lib/portalBookingOutcome.js\`
- Modify: \`src/lib/portalSessionState.js\`
- Modify: \`src/pages/Portal.jsx\`
- Modify: \`test/parent-portal.test.mjs\`

**Interfaces:**
- \`getPortalBookingOutcome(result)\` returns \`{ kind: "plan_credit" | "checkout_ready" | "checkout_unavailable", checkoutUrl, stripeMode }\`.
- \`getPortalSessionState(session, role, now).canRequestChange\` is false after a session ends.

- [ ] **Step 1: Write failing state tests**

Import \`getPortalBookingOutcome\` and add:

\`\`\`js
test("does not offer an adjustment after a session has ended", () => {
  const state = getPortalSessionState({
    session_status: "confirmed",
    start_at: "2026-07-14T17:00:00.000Z",
    end_at: "2026-07-14T18:00:00.000Z",
  }, "parent", new Date("2026-07-26T12:00:00.000Z"))

  assert.equal(state.canRequestChange, false)
})

test("classifies a missing Checkout without calling it simulated", () => {
  assert.deepEqual(getPortalBookingOutcome({ payment_mode: "plan_credit" }), {
    kind: "plan_credit", checkoutUrl: "", stripeMode: "",
  })
  assert.deepEqual(getPortalBookingOutcome({
    payment_mode: "stripe_checkout",
    checkout_url: "https://checkout.stripe.com/c/pay/cs_test_123",
    stripe_mode: "test",
  }), {
    kind: "checkout_ready",
    checkoutUrl: "https://checkout.stripe.com/c/pay/cs_test_123",
    stripeMode: "test",
  })
  assert.deepEqual(getPortalBookingOutcome({ payment_mode: "stripe_checkout" }), {
    kind: "checkout_unavailable", checkoutUrl: "", stripeMode: "",
  })
})
\`\`\`

Update the existing stale-proposal expectation to \`false\`.

- [ ] **Step 2: Prove failure**

\`\`\`powershell
node --test test/parent-portal.test.mjs
\`\`\`

Expected: helper import fails and old stale/past adjustment state fails.

- [ ] **Step 3: Add the booking-result helper**

Create \`src/lib/portalBookingOutcome.js\`:

\`\`\`js
export function getSafeHostedCheckoutUrl(value) {
  try {
    const url = new URL(String(value || ""))
    return url.protocol === "https:" &&
      url.hostname === "checkout.stripe.com" &&
      url.pathname.startsWith("/c/")
      ? url.toString()
      : ""
  } catch {
    return ""
  }
}

export function getPortalBookingOutcome(result = {}) {
  if (result.payment_mode === "plan_credit") {
    return { kind: "plan_credit", checkoutUrl: "", stripeMode: "" }
  }

  const checkoutUrl = getSafeHostedCheckoutUrl(result.checkout_url || result.payment_url)
  if (!checkoutUrl) {
    return { kind: "checkout_unavailable", checkoutUrl: "", stripeMode: "" }
  }

  return {
    kind: "checkout_ready",
    checkoutUrl,
    stripeMode: result.stripe_mode === "test" ? "test" : "live",
  }
}
\`\`\`

In \`src/lib/portalSessionState.js\`, set:

\`\`\`js
canRequestChange: isParticipant &&
  ["proposed", "confirmed"].includes(status) &&
  isPortalSessionCurrentOrFuture(session, now),
\`\`\`

- [ ] **Step 4: Wire outcome-specific portal copy**

In \`src/pages/Portal.jsx\`, import both helper exports and remove the local \`getSafeHostedCheckoutUrl\`. Replace \`bookingSuccess\` with these French keys:

\`\`\`js
bookingCheckoutReady: "Séance réservée. Votre paiement Stripe sécurisé est prêt.",
bookingTestCheckoutReady: "Séance réservée. Votre Checkout Stripe de test est prêt; aucune carte réelle ne sera débitée.",
bookingPaymentSetupRequired: "Séance réservée, mais le Checkout Stripe n’est pas encore configuré. Aucun paiement n’a été effectué; l’équipe doit finaliser la configuration.",
\`\`\`

Add matching English copy:

\`\`\`js
bookingCheckoutReady: "Session booked. Your secure Stripe payment is ready.",
bookingTestCheckoutReady: "Session booked. Your Stripe test Checkout is ready; no real card will be charged.",
bookingPaymentSetupRequired: "Session booked, but Stripe Checkout is not configured yet. No payment was taken; the team must finish setup.",
\`\`\`

In \`BookingForm.handleSubmit\`, replace direct URL/copy selection:

\`\`\`js
const outcome = getPortalBookingOutcome(result)
setPaymentUrl(outcome.checkoutUrl)
setPaymentAmount(result.amount_cad || "")
setPaymentDeadline(result.checkout_expires_at || result.due_date || "")
setStatus(
  outcome.kind === "plan_credit"
    ? copy.bookingCreditSuccess
    : outcome.kind === "checkout_unavailable"
      ? copy.bookingPaymentSetupRequired
      : outcome.stripeMode === "test"
        ? copy.bookingTestCheckoutReady
        : copy.bookingCheckoutReady,
)
\`\`\`

Retain the existing \`paymentUrl ?\` link rendering so a missing URL never opens a payment page.

- [ ] **Step 5: Verify and commit**

\`\`\`powershell
npm.cmd run test:portal
npm.cmd run test:site
git diff --check
git add src/lib/portalBookingOutcome.js src/lib/portalSessionState.js src/pages/Portal.jsx test/parent-portal.test.mjs
git commit -m "fix: clarify portal checkout and adjustment state"
\`\`\`

Expected: portal suite and production build pass.

### Task 3: Propagate a fresh Checkout mode through Apps Script

**Files:**
- Modify: \`ops/crm/google-apps-script/Code.gs\`
- Modify: \`test/parent-portal.test.mjs\`

**Interfaces:**
- Consumes Vercel field \`stripe_mode\`.
- Produces booking field \`stripe_mode: "test" | "live" | ""\`.
- Keeps payment rows and secrets unchanged.

- [ ] **Step 1: Write a failing CRM source-contract test**

Extract source slices for \`createPaymentRowsForScheduledSessions\`, \`issueCheckoutForPayment_\`, and \`bookPortalSession_\`. Assert:

\`\`\`js
assert.match(paymentCreator, /checkout_results/)
assert.match(checkoutIssuer, /stripe_mode/)
assert.match(booker, /finalization\.payments\.checkout_results/)
assert.match(booker, /stripe_mode:/)
\`\`\`

- [ ] **Step 2: Prove failure**

\`\`\`powershell
node --test test/parent-portal.test.mjs
\`\`\`

Expected: the mode-propagation contract fails.

- [ ] **Step 3: Implement ephemeral propagation only**

In \`createPaymentRowsForScheduledSessions\`, add \`const checkoutResults = {};\` beside \`let created = 0\`. After a successful new issue:

\`\`\`js
checkoutResults[payment.payment_id] = {
  checkout_url: issued.payment_url,
  stripe_mode: normalizeAllowed_(issued.stripe_mode, ["test", "live"], ""),
};
\`\`\`

Return:

\`\`\`js
return { ok: true, created, checkout_results: checkoutResults };
\`\`\`

In \`issueCheckoutForPayment_\`, add to its existing successful return:

\`\`\`js
stripe_mode: normalizeAllowed_(checkout.stripe_mode, ["test", "live"], ""),
\`\`\`

In \`bookPortalSession_\`, retain the finalizer result and derive the one response field:

\`\`\`js
const finalization = finalizeConfirmedPortalSession_(spreadsheet);
const checkoutResult = payment && finalization.payments && finalization.payments.checkout_results
  ? finalization.payments.checkout_results[payment.payment_id] || {}
  : {};
\`\`\`

Add:

\`\`\`js
stripe_mode: normalizeAllowed_(checkoutResult.stripe_mode, ["test", "live"], ""),
\`\`\`

- [ ] **Step 4: Verify and commit**

\`\`\`powershell
npm.cmd run test:payments
npm.cmd run test:portal
git add ops/crm/google-apps-script/Code.gs test/parent-portal.test.mjs
git commit -m "feat: report Stripe mode for portal checkout"
\`\`\`

Expected: all tests pass and only the safe mode string is propagated.

### Task 4: Document and run production Test mode

**Files:**
- Modify: \`.env.example\`
- Modify: \`ops/crm/stripe-webhook.md\`
- Modify: \`test/stripe-checkout.test.mjs\`

- [ ] **Step 1: Write a failing documentation contract**

Read \`.env.example\` and \`ops/crm/stripe-webhook.md\` in \`test/stripe-checkout.test.mjs\`; assert each required literal appears:

\`\`\`js
assert.match(environmentTemplate, /STRIPE_SECRET_KEY/)
assert.match(environmentTemplate, /PAYMENT_SESSION_SECRET/)
assert.match(runbook, /sk_test_/)
assert.match(runbook, /4242 4242 4242 4242/)
assert.match(runbook, /checkout\.session\.completed/)
assert.match(runbook, /https:\/\/methode-secondaire\.vercel\.app\/api\/stripe-webhook/)
\`\`\`

- [ ] **Step 2: Prove failure**

\`\`\`powershell
node --test test/stripe-checkout.test.mjs
\`\`\`

Expected: the environment-template assertions fail.

- [ ] **Step 3: Complete the owner runbook**

Append to \`.env.example\`:

\`\`\`dotenv
# Server-only Stripe Checkout credentials. Never use VITE_ for these values.
STRIPE_SECRET_KEY=
PAYMENT_SESSION_SECRET=
\`\`\`

Add \`## Temporary production Test mode\` to \`ops/crm/stripe-webhook.md\` with this exact sequence:

1. In Stripe Dashboard Test mode, create the production webhook endpoint with the documented three events.
2. In Vercel Production set \`STRIPE_SECRET_KEY=sk_test_...\` and the Test-mode \`STRIPE_WEBHOOK_SECRET=whsec_...\`; retain the shared secrets.
3. Confirm Apps Script properties \`PAYMENT_SESSION_SECRET\` and \`PAYMENT_WEBHOOK_SECRET\` match their Vercel server-only values.
4. Redeploy production, reserve one test session, and pay with \`4242 4242 4242 4242\`, a future expiry, and any CVC.
5. Confirm one successful Stripe Test-mode webhook delivery and one CRM \`paid\` transition.
6. **Rollback to live payments:** before real parents pay, restore live Stripe values, create the live webhook, redeploy, and complete the existing restricted live verification.

- [ ] **Step 4: Verify and commit**

\`\`\`powershell
npm.cmd run test:payments
npm.cmd run test:portal
npm.cmd run test:site
git diff --check
git add .env.example ops/crm/stripe-webhook.md test/stripe-checkout.test.mjs
git commit -m "docs: add production Stripe test mode runbook"
\`\`\`

Expected: all checks pass; no secret-like value is committed.

### Task 5: Publish and perform one owner acceptance payment

**Files:**
- No repository changes expected.

- [ ] **Step 1: Verify no secret is tracked**

\`\`\`powershell
git grep -n -E 'sk_(test|live)_[A-Za-z0-9]|whsec_[A-Za-z0-9]'
\`\`\`

Expected: no output. Stop if a key-like value appears.

- [ ] **Step 2: Merge and push verified work**

From the main checkout only after Tasks 1–4 pass:

\`\`\`powershell
git merge --ff-only codex/managed-tutoring-agency
git push origin main
\`\`\`

Expected: main fast-forwards while unrelated local modifications remain untouched.

- [ ] **Step 3: Set Production Test mode outside Git**

In Stripe Dashboard Test mode and Vercel Production, complete Task 4 Step 3 without pasting secrets into Codex. Redeploy production.

- [ ] **Step 4: Run exactly one acceptance payment**

From a test portal record, use:

\`\`\`text
Card: 4242 4242 4242 4242
Expiry: any future date
CVC: any value
\`\`\`

Expected: Stripe Test mode succeeds, webhook delivery succeeds, exactly one matching CRM payment becomes \`paid\`, and no real card/bank account is charged.

- [ ] **Step 5: Record aggregate evidence only**

Update the weekly tracker with either \`Stripe Test-mode Checkout + webhook + one CRM paid transition verified on YYYY-MM-DD\` or the exact configuration boundary that failed. Do not record personal, card, email, or secret information.
