# Production Stripe Test and Portal Guardrails — Design

## Decision

For the current pre-client period, the public production portal will use Stripe **test-mode** Checkout temporarily. It will use only `sk_test_...` and a test-mode webhook secret. Test cards can complete Checkout, but no bank account, real card, or live Stripe balance can be charged.

This is an owner-controlled temporary mode. Before any real parent may pay, the owner must restore live Stripe credentials and run the restricted live verification in `ops/crm/stripe-webhook.md`.

## Scope

1. Make the production portal communicate Checkout truthfully.
2. Make a missing Checkout URL visible as a configuration problem after a booking, rather than describing a nonexistent simulated payment.
3. Prevent parents and tutors from requesting a schedule adjustment for a session that has already ended.
4. Document the exact production test-mode setup, verification, and rollback.

This does not add subscriptions, charge cards automatically, expose Stripe secrets, change prices, or alter a completed or paid payment record.

## Payment flow

```text
Parent books a test session
  -> Apps Script creates a payment request
  -> Vercel creates a Stripe Test-mode Checkout Session
  -> Parent uses Stripe test card
  -> Stripe Test-mode webhook reaches Vercel
  -> Verified webhook marks the matching CRM payment paid once
```

The test Checkout is legitimate Stripe Checkout, not the old CRM-only `demo_paid` label. Therefore it validates the customer-facing page, server request, webhook signature, and CRM reconciliation together.

## Production test-mode configuration

The owner sets these secure values only in Vercel Production environment variables:

- `STRIPE_SECRET_KEY`: Stripe test secret key (`sk_test_...`).
- `STRIPE_WEBHOOK_SECRET`: signing secret for a Stripe **test-mode** endpoint at `https://methode-secondaire.vercel.app/api/stripe-webhook`.
- `PAYMENT_SESSION_SECRET`, `PAYMENT_WEBHOOK_SECRET`, `CRM_WEBHOOK_URL`, and `CRM_PORTAL_SECRET`: retain their matching private integration values.

Apps Script keeps the same `PAYMENT_SESSION_SECRET` and `PAYMENT_WEBHOOK_SECRET` project properties. The Stripe Dashboard webhook endpoint must be created while Stripe Test mode is selected and subscribed to `checkout.session.completed`, `checkout.session.async_payment_succeeded`, and `checkout.session.expired`.

No secret is committed, displayed in the portal, or placed in a `VITE_*` variable.

## Portal behavior

### Booking status

- A plan-credit booking retains its existing confirmation message.
- A Stripe booking with a valid `https://checkout.stripe.com/c/...` URL states that secure Stripe Checkout is ready; in production test mode it identifies the checkout as a test payment.
- A Stripe booking without a valid Checkout URL states that the session is reserved but payment setup is unavailable. It must not claim payment was simulated, paid, or ready.

The existing `paymentDemo*` copy is not a customer-facing payment path and must not be used to describe a normal booking.

### Schedule adjustment boundary

`canRequestChange` requires both a permitted non-terminal session state and a current/future session time. A past confirmed or proposed session remains visible in history, but its adjustment action is absent. The existing expired-proposal copy remains informational only.

## Failure handling

- Stripe credentials or shared session secret missing: booking is preserved, but the parent sees payment setup unavailable and the team can resolve it from the payment request.
- Stripe refuses Checkout creation: same truthful payment-setup status; no invalid link is shown.
- Test payment webhook retries: the existing idempotent payment reconciliation protects against duplicate CRM payment or credit changes.
- Any actual parent begins using the portal: stop test mode, restore live credentials, and complete restricted live verification before issuing a real Checkout link.

## Verification

Automated coverage will prove:

1. A past session cannot request an adjustment for either parent or tutor.
2. A current/future eligible session can still request an adjustment.
3. A valid Checkout result receives the Checkout-ready copy; an empty or invalid URL receives the configuration-needed copy.
4. Existing plan-credit behavior is unchanged.

Owner acceptance in Stripe Test mode will prove:

1. A fresh test booking opens Stripe Checkout.
2. Card `4242 4242 4242 4242`, a future expiry, and any CVC completes without a real charge.
3. Stripe Test-mode webhook delivery succeeds.
4. The matching CRM payment becomes `paid` exactly once.

## Rollback

To enable live payments later, replace the two Stripe Test-mode Vercel values with their live equivalents, create the matching live webhook endpoint, redeploy, and complete the owner-only low-value live verification. Do not test live mode with real card details before that controlled verification.
