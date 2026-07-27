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

4. Add the exact same `PAYMENT_WEBHOOK_SECRET` and `PAYMENT_SESSION_SECRET` to Apps Script project properties. `PAYMENT_SESSION_SECRET` authenticates Apps Script when it asks Vercel to create or expire a Checkout Session; it is not a browser secret. The default expiry route is `/api/expire-checkout-session`; set the private Apps Script property `PAYMENT_CHECKOUT_EXPIRE_ENDPOINT` only when using a different trusted deployment URL.

Never commit any of these values or put them in a `VITE_*` variable, frontend code, browser payload, or documentation screenshot.

## Temporary Test mode on the public production portal

Use this temporary configuration only while no real parent is allowed to reserve or pay. It sends the live portal to Stripe **Test mode**: a test Checkout is still a real booking workflow, but no real card is charged.

1. In the Stripe Dashboard, switch to **Test mode**. Create the webhook endpoint `https://methode-secondaire.vercel.app/api/stripe-webhook`, subscribe to the three events above, and copy that endpoint's test signing secret.
2. In Vercel **Production** environment variables, set `STRIPE_SECRET_KEY` to the Stripe test key (`sk_test_...`) and `STRIPE_WEBHOOK_SECRET` to that test endpoint's signing secret. Keep both values server-only; do not use any `VITE_*` name.
3. Confirm Vercel and Apps Script have the same `PAYMENT_SESSION_SECRET` and `PAYMENT_WEBHOOK_SECRET`. In Apps Script, keep `PAYMENT_CHECKOUT_ENDPOINT` set to `https://methode-secondaire.vercel.app/api/create-checkout-session` unless a different trusted endpoint is intentionally used.
4. Deploy the current Apps Script `Code.gs`, then redeploy Vercel production so the new server variables are active.
5. Book a new test session in the production portal. The portal must show that a Stripe **test** Checkout is ready, then open `checkout.stripe.com`. Complete it with Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC, and any postal code.
6. Confirm the matching payment becomes `paid` once in the CRM and Stripe's test webhook delivery is successful. A session that shows setup required must not be described as paid or simulated; finish configuration first.

Only a newly issued Checkout reflects the active key. Do not use an old Checkout link as proof that Test mode is configured.

## Switch back before real parents can pay

Before allowing a real booking, the owner must replace the Vercel test key and test webhook secret with the matching live values, create/verify the live webhook endpoint and events, redeploy Vercel, and complete the restricted live verification below. Do not make this switch through the portal or by sharing a secret in chat.

## Test-mode validation before production

1. Create the endpoint in Stripe **test mode** and use its test-mode `whsec_...` value in Vercel.
2. Use a Stripe test card to complete one Checkout Session and confirm that the matching payment is marked `paid` exactly once.
3. Let a separate test Checkout Session expire and confirm that it becomes `overdue`; a linked session must be released, while a package payment remains eligible for a parent-only reissue when its enrollment is still eligible.
4. Trigger a terminal Meet failure after a Checkout is issued. Confirm the server expires an `open` Stripe Checkout before the CRM cancels/releases the session. If Stripe reports the Checkout is already complete, confirm the session stays cancelled and the payment is held for operator reconciliation instead of being treated as a usable booking.
5. Inspect Stripe's webhook delivery log and Apps Script execution log before touching live mode.

## Restricted live verification

Only the owner may switch the four variables to live Stripe values, create the live webhook endpoint, and make a deliberately authorized low-value live verification payment. Confirm the payment and receipt from both Stripe and the CRM, then stop. Do not send a public Checkout URL until that owner-controlled verification has succeeded.

## What happens after payment

1. Stripe validates the hosted Checkout Session.
2. Vercel verifies the Stripe signature against the raw request body.
3. Vercel passes the payment reference, amount, currency and Stripe Checkout ID to Apps Script using the separate shared secret.
4. Apps Script checks the matching payment ID, exact CAD amount and currency.
5. Only then does it mark `Payments.payment_status` and `Sessions.payment_status` as `paid`.

The update is idempotent: a retry from Stripe will not create a second payment, credit grant, release, or Calendar deletion.

## Legacy-payment safety

Historical `payment_link` values remain in the CRM only for record continuity. They are never sent to a portal user, returned as a payment CTA, or converted into a Checkout URL. The `Payment Links` sheet is read-only historical data: new payments use their session amount or canonical offer amount and receive a newly issued hosted Checkout Session. If a payment row lacks a valid persisted `https://checkout.stripe.com/c/...` URL, the owner must issue or repair a hosted Checkout Session before requesting payment.

## Policy implemented in the portal

- With at least 72 hours' notice, rescheduling is guaranteed. Inside that window, the request is routed to the team; no payment or plan credit is forfeited automatically.
- A paid cancellation remains visible for team review; the system does not promise an automatic refund.
- Parent/tutor messages expect a response within 24 hours. The automation alerts the owner once when a reply is overdue.
