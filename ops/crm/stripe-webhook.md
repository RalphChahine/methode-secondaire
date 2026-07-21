# Stripe Checkout payment reconciliation

The portal uses one hosted Stripe Checkout Session per payment request; it does not handle card data on the website. Checkout Sessions are in CAD and expire one hour after issuance. Each session carries only the internal payment ID as Stripe's `client_reference_id`.

## One-time configuration

1. In Stripe, add a webhook endpoint:

   ```text
   https://methode-secondaire.vercel.app/api/stripe-webhook
   ```

2. Subscribe to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.expired`

3. Add these Vercel variables:

   ```text
   STRIPE_SECRET_KEY=sk_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   PAYMENT_WEBHOOK_SECRET=<long random shared value>
   PAYMENT_SESSION_SECRET=<different long random value>
   ```

4. Add the exact same `PAYMENT_WEBHOOK_SECRET` and `PAYMENT_SESSION_SECRET` to Apps Script project properties. `PAYMENT_SESSION_SECRET` authenticates Apps Script when it asks Vercel to create a Checkout Session; it is not a browser secret.

Never commit any of these values or put them in a `VITE_*` variable, frontend code, browser payload, or documentation screenshot.

## Test-mode validation before production

1. Create the endpoint in Stripe **test mode** and use its test-mode `whsec_...` value in Vercel.
2. Use a Stripe test card to complete one Checkout Session and confirm that the matching payment is marked `paid` exactly once.
3. Let a separate test Checkout Session expire and confirm that it becomes `overdue`; a linked session must be released, while a package payment remains eligible for a parent-only reissue when its enrollment is still eligible.
4. Inspect Stripe's webhook delivery log and Apps Script execution log before touching live mode.

## Restricted live verification

Only the owner may switch the four variables to live Stripe values, create the live webhook endpoint, and make a deliberately authorized low-value live verification payment. Confirm the payment and receipt from both Stripe and the CRM, then stop. Do not send a public payment link until that owner-controlled verification has succeeded.

## What happens after payment

1. Stripe validates the hosted Checkout Session.
2. Vercel verifies the Stripe signature against the raw request body.
3. Vercel passes the payment reference, amount, currency and Stripe Checkout ID to Apps Script using the separate shared secret.
4. Apps Script checks the matching payment ID, exact CAD amount and currency.
5. Only then does it mark `Payments.payment_status` and `Sessions.payment_status` as `paid`.

The update is idempotent: a retry from Stripe will not create a second payment, credit grant, release, or Calendar deletion.

## Policy implemented in the portal

- With at least 72 hours' notice, rescheduling is guaranteed. Inside that window, the request is routed to the team; no payment or plan credit is forfeited automatically.
- A paid cancellation remains visible for team review; the system does not promise an automatic refund.
- Parent/tutor messages expect a response within 24 hours. The automation alerts the owner once when a reply is overdue.
