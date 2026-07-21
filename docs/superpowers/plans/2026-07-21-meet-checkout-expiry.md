# Google Meet et Checkout Stripe à échéance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Créer un lien Google Meet unique pour chaque séance en ligne, puis faire expirer chaque paiement Stripe non réglé après une heure en libérant automatiquement le créneau concerné.

**Architecture:** Apps Script devient le propriétaire du cycle de vie CRM : il demande un Checkout Stripe à Vercel et crée l'événement Google Calendar dans le calendrier du tuteur. Vercel est le seul composant qui possède la clé Stripe Live et il transmet les webhooks vérifiés au CRM; le CRM applique les transitions idempotentes, supprime un événement expiré et expose seulement les données autorisées dans le portail.

**Tech Stack:** React 18/Vite, Vercel Serverless Functions, Stripe Checkout API et webhooks, Google Apps Script V8, Google Calendar API avancée, Google Sheets CRM, Node node:test.

## Global Constraints

- Le français demeure la langue principale; toute nouvelle chaîne a un équivalent anglais.
- Le tuteur assigné est l'hôte de tout Meet créé pour une séance online.
- Une Checkout Session est hébergée par Stripe, unique par paiement, en CAD et expire exactement 3 600 secondes après sa création.
- Une séance in_person n'a jamais de lien Meet.
- checkout.session.completed, checkout.session.async_payment_succeeded et checkout.session.expired sont idempotents.
- Aucun secret Stripe, secret de signature, URL CRM privée ou données d'un autre parent ne passe au navigateur.
- Les anciennes lignes CRM restent lisibles; les nouvelles colonnes sont ajoutées à la fin des tableaux de colonnes existants.
- Ne pas déployer de clé Live, ni déclencher de vraie transaction, sans la configuration Stripe et l'autorisation explicite du propriétaire.

---

## File structure

| Fichier | Responsabilité |
|---|---|
| api/lib/stripe-checkout.mjs | Validation et construction des paramètres Checkout testables. |
| api/create-checkout-session.js | Endpoint interne Apps Script → Stripe. |
| api/stripe-webhook.js | Signature Stripe, succès et expiration. |
| test/stripe-checkout.test.mjs | Tests Node de Checkout et des webhooks. |
| scripts/check-meet-checkout-contract.mjs | Contrat statique CRM/UI exécuté par test:site. |
| ops/crm/google-apps-script/appsscript.json | Service Calendar API avancé. |
| ops/crm/google-apps-script/Code.gs | CRM, Meet, échéance, annulation et données de portail. |
| api/portal.js | Autorisation de réémission de Checkout. |
| src/lib/portalClient.js | Client de réémission de Checkout. |
| src/pages/Portal.jsx | États Meet/paiement français et anglais. |
| ops/crm/stripe-webhook.md | Configuration Live et test contrôlé. |

## Task 1: Checkout Stripe interne et testable

**Files:**
- Create: api/lib/stripe-checkout.mjs
- Create: api/create-checkout-session.js
- Create: test/stripe-checkout.test.mjs
- Modify: package.json
- Modify: scripts/check-static-site.mjs

**Interfaces:**
- Consumes: PAYMENT_SESSION_SECRET, STRIPE_SECRET_KEY, et { payment_id, amount_cad, email, offer, success_url, cancel_url }.
- Produces: POST /api/create-checkout-session → { ok: true, checkout_session_id, checkout_url, expires_at }.
- Produces: createCheckoutRequest(input, now).

- [ ] **Step 1: Write the failing test**

Create test/stripe-checkout.test.mjs:

    import test from "node:test"
    import assert from "node:assert/strict"
    import { createCheckoutRequest } from "../api/lib/stripe-checkout.mjs"

    test("creates a one-hour CAD Checkout Session", () => {
      const now = new Date("2026-07-21T16:00:00.000Z")
      const request = createCheckoutRequest({
        payment_id: "PAY-001", amount_cad: 65, email: "parent@example.com",
        offer: "Séance ciblée", success_url: "https://example.com/portail?payment=success",
        cancel_url: "https://example.com/portail?payment=cancelled",
      }, now)
      assert.equal(request.client_reference_id, "PAY-001")
      assert.equal(request.line_items[0].price_data.currency, "cad")
      assert.equal(request.line_items[0].price_data.unit_amount, 6500)
      assert.equal(request.mode, "payment")
      assert.equal(request.expires_at, 1784649600 + 3600)
    })

Add tests that missing payment_id and amounts below 1 CAD throw PAYMENT_CHECKOUT_DETAILS_REQUIRED.

- [ ] **Step 2: Run test to verify RED**

Run: node --test test/stripe-checkout.test.mjs

Expected: FAIL because api/lib/stripe-checkout.mjs does not exist.

- [ ] **Step 3: Implement the builder**

Create api/lib/stripe-checkout.mjs with CHECKOUT_EXPIRY_SECONDS = 60 * 60, validateCheckoutInput(input), and createCheckoutRequest(input, now). The Checkout request must be:

    {
      mode: "payment",
      client_reference_id: paymentId,
      customer_email: email,
      success_url: successUrl,
      cancel_url: cancelUrl,
      expires_at: Math.floor(now.getTime() / 1000) + CHECKOUT_EXPIRY_SECONDS,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "cad",
          unit_amount: amountCents,
          product_data: { name: offer },
        },
      }],
      metadata: { payment_id: paymentId },
    }

Amounts use Math.round(Number(amount_cad) * 100), must be integers from 100 to 1 000 000 cents, and reject a supplied amount that is not an exact CAD-cent value before it reaches Stripe.

- [ ] **Step 4: Implement the protected endpoint**

Create api/create-checkout-session.js. It accepts only POST, returns 503 when a server secret is missing, and returns 401 when payment_session_secret is not a timing-safe match with PAYMENT_SESSION_SECRET. It posts the builder payload to https://api.stripe.com/v1/checkout/sessions using application/x-www-form-urlencoded and Basic auth with STRIPE_SECRET_KEY. It returns only session ID, hosted URL and ISO expiry.

- [ ] **Step 5: Verify GREEN**

Run: node --test test/stripe-checkout.test.mjs

Expected: PASS.

- [ ] **Step 6: Wire the test command and source contract**

Add this package script:

    "test:payments": "node --test test/stripe-checkout.test.mjs"

Create scripts/check-meet-checkout-contract.mjs. In Task 1 it exits nonzero unless source contains create-checkout-session.js, PAYMENT_SESSION_SECRET, the payment-test command, and the Checkout issuance contract. Tasks 2, 3 and 5 extend it respectively with webhook-expiry, Calendar/Meet, and French/English UI contracts. Invoke it from scripts/check-static-site.mjs.

- [ ] **Step 7: Commit**

    git add api/lib/stripe-checkout.mjs api/create-checkout-session.js test/stripe-checkout.test.mjs package.json scripts/check-static-site.mjs scripts/check-meet-checkout-contract.mjs
    git commit -m "feat: create expiring Stripe checkout sessions"

## Task 2: Webhook Stripe pour succès et expiration

**Files:**
- Modify: api/stripe-webhook.js
- Modify: api/lib/stripe-checkout.mjs
- Modify: test/stripe-checkout.test.mjs
- Modify: ops/crm/google-apps-script/Code.gs

**Interfaces:**
- Consumes: événement Stripe signé et PAYMENT_WEBHOOK_SECRET.
- Produces: portal_mark_payment_paid_webhook ou portal_mark_payment_expired_webhook.

- [ ] **Step 1: Write failing event tests**

Add tests for classifyStripeCheckoutEvent(event):
- checkout.session.completed with payment_status paid returns { kind: "paid", payment_id: "PAY-001" }.
- checkout.session.expired with status expired returns { kind: "expired", payment_id: "PAY-001" }.
- an unrelated event returns { kind: "ignored" }.

- [ ] **Step 2: Verify RED**

Run: node --test test/stripe-checkout.test.mjs

Expected: FAIL because classifyStripeCheckoutEvent is absent.

- [ ] **Step 3: Implement signed webhook delivery**

Add classifyStripeCheckoutEvent(event) to api/lib/stripe-checkout.mjs, then keep raw-body Stripe signature verification in api/stripe-webhook.js and import the classifier. For a recognised expiration, post this exact CRM payload:

    {
      action: "portal_mark_payment_expired_webhook",
      webhook_secret: paymentWebhookSecret,
      payment_id: paymentId,
      stripe_session_id: normalizeString(checkout.id),
      expired_at: checkout.expires_at
        ? new Date(Number(checkout.expires_at) * 1000).toISOString()
        : new Date().toISOString(),
    }

Paid payloads retain amount_cad, currency and paid_at. Valid unrelated Stripe events return HTTP 200 with ignored true.

- [ ] **Step 4: Extend CRM payment schema and action router**

Append stripe_checkout_session_id, checkout_expires_at, and checkout_url to PAYMENT_COLUMNS. Add portal_mark_payment_expired_webhook beside portal_mark_payment_paid_webhook. The handler authenticates with PAYMENT_WEBHOOK_SECRET, rejects a mismatched stored Stripe session ID, returns already_paid without mutation for paid rows, and otherwise transitions payment_requested or overdue to overdue exactly once. It calls the shared linked-session expiry helper only when session_id is not empty.

- [ ] **Step 5: Verify GREEN and commit**

Run: node --test test/stripe-checkout.test.mjs

Expected: PASS.

    git add api/lib/stripe-checkout.mjs api/stripe-webhook.js test/stripe-checkout.test.mjs ops/crm/google-apps-script/Code.gs
    git commit -m "feat: reconcile Stripe checkout expiry"

## Task 3: Meet créé dans le calendrier du tuteur

**Files:**
- Modify: ops/crm/google-apps-script/appsscript.json
- Modify: ops/crm/google-apps-script/Code.gs
- Modify: ops/crm/sessions-template.csv
- Modify: scripts/check-meet-checkout-contract.mjs

**Interfaces:**
- Consumes: session confirmée avec tuteur, parent, horaire et format.
- Produces: google_calendar_event_id, google_meet_url, calendar_conference_status, calendar_invites_sent_at.
- Produces: createOrFinalizeSessionConference_(spreadsheet, sessionRecord) et processPendingSessionConferences().

- [ ] **Step 1: Write failing Calendar contract test**

Extend scripts/check-meet-checkout-contract.mjs so it requires Calendar.Events.insert, conferenceDataVersion: 1, hangoutsMeet, sendUpdates: "none", sendUpdates: "all", google_meet_url and processPendingSessionConferences.

Run: node scripts/check-meet-checkout-contract.mjs

Expected: FAIL listing the missing Calendar contracts.

- [ ] **Step 2: Add schema and advanced service**

Append google_meet_url, calendar_conference_status, payment_due_at, and stripe_checkout_session_id to SESSION_COLUMNS and append empty fields to ops/crm/sessions-template.csv. Add the advanced service declaration in appsscript.json:

    "dependencies": {
      "enabledAdvancedServices": [{
        "userSymbol": "Calendar",
        "serviceId": "calendar",
        "version": "v3"
      }]
    }

- [ ] **Step 3: Create conferences**

In finalizeConfirmedPortalSession_, use Calendar.Events.insert for a confirmed online session with no calendar event. Create in the tutor calendar, add both attendees, set sendUpdates to none, and include:

    conferenceData: {
      createRequest: {
        requestId: "meet-" + sessionId,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    }

Pass conferenceDataVersion: 1. Save event ID with calendar_conference_status pending. For in_person, retain a normal Calendar event, set calendar_conference_status not_required, and send its invitation normally.

- [ ] **Step 4: Finalize asynchronous Meet and invite**

Implement processPendingSessionConferences(). It reads pending event data using Calendar.Events.get(calendarId, eventId, { conferenceDataVersion: 1 }). When a video entry point exists, persist google_meet_url, mark ready, and patch the event using sendUpdates all. On missing calendar access, unsupported Meet, or terminal conference failure, mark failed, cancel the session with the shared expiry/cancellation helper, delete any partial event, and append an operator request naming the tutor and calendar issue. No invitation is sent before a Meet URL exists.

- [ ] **Step 5: Verify GREEN and commit**

Run: node scripts/check-meet-checkout-contract.mjs

Expected: PASS.

Deploy Apps Script to its test deployment, make one online test booking, and verify the tutor calendar owns the event, each participant receives one invitation, and a second pending-conference pass does not create a duplicate invite.

    git add ops/crm/google-apps-script/appsscript.json ops/crm/google-apps-script/Code.gs ops/crm/sessions-template.csv scripts/check-meet-checkout-contract.mjs
    git commit -m "feat: create tutor-hosted Meet links"

## Task 4: CRM Checkout lifecycle and one-hour slot release

**Files:**
- Modify: ops/crm/google-apps-script/Code.gs
- Modify: api/portal.js
- Modify: src/lib/portalClient.js
- Modify: scripts/check-meet-checkout-contract.mjs

**Interfaces:**
- Consumes: persisted Payment row and PAYMENT_SESSION_SECRET.
- Produces: issueCheckoutForPayment_(spreadsheet, paymentRecord), expireLinkedSessionForPayment_(spreadsheet, payment, reason), and expireUnpaidCheckoutSessions().
- Produces: portal_reissue_payment_checkout → { ok, payment_id, payment_url, due_date }.

- [ ] **Step 1: Write failing lifecycle contract test**

Extend scripts/check-meet-checkout-contract.mjs to require portal_reissue_payment_checkout, issueCheckoutForPayment_, expireUnpaidCheckoutSessions, PAYMENT_SESSION_SECRET, and the path that deletes the Calendar event before marking an expired linked session cancelled.

Run: node scripts/check-meet-checkout-contract.mjs

Expected: FAIL with those missing lifecycle contracts.

- [ ] **Step 2: Issue Checkout after every portal payment request**

Implement issueCheckoutForPayment_. It calls the Vercel endpoint with UrlFetchApp.fetch, the dedicated secret, the persisted payment ID, exact CAD amount, parent email, localized offer label, and portal success/cancel URLs. It stores stripe_checkout_session_id, checkout_expires_at, checkout_url and due_date. It is called after new payment rows in createPaymentRowsForScheduledSessions() and createPortalPlanPaymentRequest_(). Existing open checkouts are reused; overdue rows require explicit reissue. Portal payment creation no longer requires a preconfigured reusable Payment Links row.

- [ ] **Step 3: Release only an unpaid linked session**

Implement expireLinkedSessionForPayment_. Under a ScriptLock, it reloads payment and session records. It returns without mutation when payment is paid or session is cancelled, completed, or no_show. Otherwise it deletes the Calendar event, releases a credit reservation using releasePlanCreditReservationForSession_, marks the session cancelled, clears google_meet_url and calendar_invites_sent_at, and sends the parent/tutor cancellation notification. An empty session_id, as used for a package payment, never cancels a session.

Implement expireUnpaidCheckoutSessions() for payment_requested records where due_date is at or before now. It marks overdue then calls the same helper. Configure a five-minute time trigger; the webhook and trigger use these same functions.

- [ ] **Step 4: Implement authorised checkout reissue**

Add portal_reissue_payment_checkout to api/portal.js, the Apps Script router, and src/lib/portalClient.js. Verify the token's parent owns the payment, that its status is overdue, and that one reissue call creates one new Checkout Session. The new Checkout replaces the stored URL and deadline; a tutor never receives this action.

- [ ] **Step 5: Verify GREEN and commit**

Run: node scripts/check-meet-checkout-contract.mjs; node --test test/stripe-checkout.test.mjs

Expected: both commands exit 0.

In Stripe test mode, expire an unpaid Checkout and forward its signed checkout.session.expired event. Verify exactly once: payment overdue, session cancelled, Calendar event deleted, credit released, and same slot visible through buildBookableSlots_.

    git add ops/crm/google-apps-script/Code.gs api/portal.js src/lib/portalClient.js scripts/check-meet-checkout-contract.mjs
    git commit -m "feat: release unpaid bookings after one hour"

## Task 5: Portail bilingue, documentation et déploiement contrôlé

**Files:**
- Modify: src/pages/Portal.jsx
- Modify: ops/crm/stripe-webhook.md
- Modify: ops/crm/parent-tutor-portal.md
- Modify: README.md
- Modify: scripts/check-meet-checkout-contract.mjs

**Interfaces:**
- Consumes: google_meet_url, calendar_conference_status, checkout_url, checkout_expires_at, payment_status.
- Produces: UI bilingue pour Meet, échéance, expiration et réémission.

- [ ] **Step 1: Write failing UI contract test**

Extend scripts/check-meet-checkout-contract.mjs to require paired French/English strings for: payment due in one hour, payment link expired, request a new payment link, Meet link preparing, join Google Meet, and released booking explanation.

Run: node scripts/check-meet-checkout-contract.mjs

Expected: FAIL with the missing Portal UI copy contract.

- [ ] **Step 2: Implement portal states**

In Portal.jsx, show parent amount and localized due time for payment_requested. A checkout_url is the only payment CTA. An overdue parent payment gets a reissue CTA wired to reissuePortalPaymentCheckout. Parent and tutor session cards render a Google Meet CTA only when format is online and google_meet_url exists; when conference status is pending they render only the localized pending state. No Meet CTA appears for in_person.

- [ ] **Step 3: Document configuration**

Update ops/crm/stripe-webhook.md with Vercel variable names, the production webhook URL https://methode-secondaire.vercel.app/api/stripe-webhook, subscribed success/expiration events, and the restricted live test sequence. Update ops/crm/parent-tutor-portal.md with tutor-calendar sharing and Meet failure recovery. Update README.md with this setup order: Calendar advanced service, Apps Script authorization, Vercel variables, Stripe endpoint, test booking, production deploy.

- [ ] **Step 4: Verify GREEN**

Run: npm run test:payments; npm run test:site

Expected: all Node tests, Vite build, SEO generation, pricing and static-site checks exit 0.

Run two end-to-end Stripe test-mode cases:
1. Parent booking → tutor-hosted Meet visible in both portals → Checkout succeeds → one CRM paid transition and receipt.
2. Parent booking → Checkout expiration → one CRM overdue transition, calendar deletion and slot release.

- [ ] **Step 5: Configure Production and publish**

With the owner, add STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, PAYMENT_WEBHOOK_SECRET, and PAYMENT_SESSION_SECRET to Vercel Production. Register the production Stripe webhook, enable Calendar advanced service in Apps Script, and run a restricted authorised live payment. Confirm the Stripe event, Vercel 200, CRM paid row, receipt, Meet invitation and parent portal state before enabling public payments.

    git add src/pages/Portal.jsx ops/crm/stripe-webhook.md ops/crm/parent-tutor-portal.md README.md scripts/check-meet-checkout-contract.mjs
    git commit -m "feat: show Meet and expiring checkout status"
    git push origin main

## Plan self-review

| Spécification | Tâche |
|---|---|
| Meet unique et calendrier du tuteur | Task 3 |
| Checkout unique, CAD et une heure | Task 1 et Task 4 |
| Succès, expiration et idempotence | Task 2 et Task 4 |
| Annulation et libération automatique | Task 4 |
| Réémission parent autorisée | Task 4 et Task 5 |
| Portails bilingues | Task 5 |
| Secrets, déploiement et test contrôlé | Task 5 |
