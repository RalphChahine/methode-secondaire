# Stripe payment reconciliation

The portal uses Stripe Payment Links, not card handling on the website. Each payment button adds the internal payment ID as Stripe's `client_reference_id`; it contains no student or parent data.

## One-time configuration

1. In Stripe, add a webhook endpoint:

   ```text
   https://methode-secondaire.vercel.app/api/stripe-webhook
   ```

2. Subscribe to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`

3. Copy the endpoint secret (`whsec_...`) to Vercel as `STRIPE_WEBHOOK_SECRET`.
4. Generate a long random value and save it as `PAYMENT_WEBHOOK_SECRET` in both Vercel and Apps Script project properties.

## What happens after payment

1. Stripe validates the Payment Link checkout.
2. Vercel verifies the Stripe signature against the raw request body.
3. Vercel passes the payment reference, amount, currency and Stripe Checkout ID to Apps Script using the separate shared secret.
4. Apps Script checks the matching payment ID, exact CAD amount and currency.
5. Only then does it mark `Payments.payment_status` and `Sessions.payment_status` as `paid`.

The update is idempotent: a retry from Stripe will not create a second payment.

## Policy implemented in the portal

- With at least 72 hours' notice, rescheduling is guaranteed. Inside that window, the request is routed to the team; no payment or plan credit is forfeited automatically.
- A paid cancellation remains visible for team review; the system does not promise an automatic refund.
- Parent/tutor messages expect a response within 24 hours. The automation alerts the owner once when a reply is overdue.
