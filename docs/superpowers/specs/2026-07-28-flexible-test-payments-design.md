# Flexible Test Payments Design

## Goal

Allow the team to set a session price, test Stripe safely in production Test mode for positive amounts, and issue a clear no-Stripe free payment for a $0 session.

## Rules

- The session's `amount_cad` is the source of truth and may be changed by the team before payment is issued.
- `amount_cad = 0` creates a `waived` payment with method `waived`; it never creates a Stripe Checkout Session.
- `amount_cad >= 1` creates a hosted Stripe Checkout Session. In Test mode, Stripe's test card completes it without a real debit.
- The parent sees `Gratuit` for a waived session and a hosted Checkout only for a valid Stripe URL.
- A Stripe issuance failure stays internal: the payment remains requested, no invalid URL is shown, and the CRM stores a safe error code for the team.
- Apps Script must have the URL Fetch OAuth scope and must preserve the safe HTTP/API code returned by Vercel.

## Data Flow

1. Team enters or edits `amount_cad` on the session record before the payment is issued.
2. CRM creates/reuses its payment row.
3. A zero amount becomes `waived`; a positive amount calls Vercel's Checkout endpoint.
4. Vercel creates Stripe Checkout only after server-side authentication.
5. Stripe's webhook marks a positive payment paid; waived payments are already complete without a Stripe event.

## Verification

- Unit tests cover zero-price classification, valid positive Checkout issuance, and safe propagation of a Vercel failure code.
- Production Test verification books one test session, opens `checkout.stripe.com`, and completes it with Stripe's test card.
