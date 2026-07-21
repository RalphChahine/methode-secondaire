# Parent and tutor portal

The portal is live in the site code at:

- `/portail`
- `/en/portal`

It uses the CRM Google Sheet as the operating database and Apps Script as the backend.

## What exists now

### Parent portal

Parents can:

- create a parent account, which creates a `Parent Leads` CRM row and sends a login code;
- request a login code by email;
- see their name after login;
- update the learning profile: parent name, phone, level/subject, main concern, timeline and preferred format;
- choose a currently open tutor time in the next 21 days, select the right session type and book it directly;
- see the current offer attached to their path: a $65 60-minute Targeted session, a $250 Momentum block (4 × 60 minutes, one payment), or a $600 Progress block (10 × 60 minutes, two $300 payments);
- pay an ordinary booked session through secure hosted Stripe Checkout (card data never reaches this site); a plan enrollment never creates an automatic off-session charge;
- see the cadence agreed after matching (weekly or biweekly), next change deadline and pause/resume state for an active Progress block; a pause does not silently cancel a session that is already confirmed;
- see the activated balance and progress of a block; the verified payment workflow grants four Momentum-block credits after its $250 payment, or five Progress-block credits after each verified $300 instalment;
- see their lead status;
- see scheduled sessions;
- request a guaranteed reschedule at least 72 hours before an upcoming session; later requests are kept for the team to review, without an automatic payment or credit forfeiture;
- see session summaries released to parents;
- see payment status and hosted Checkout URLs;
- see the amount and one-hour deadline for a hosted Checkout payment, then open only the server-issued Stripe Checkout URL;
- see an expired Checkout clearly. If the expired payment belonged to a session, the booking is released and the parent chooses a new slot; only an eligible package payment without a released session can request a new Checkout link;
- see an online session's Google Meet link only after the conference is ready;
- add a note tied to any of their sessions; it is routed to `Portal Requests` for the team;
- prepare an upcoming session directly for the assigned tutor with a written note; it creates a session message with the normal response SLA instead of an untracked email;
- see clearly that photos and PDFs are not uploaded or stored by the portal yet; selected files stay on the parent's device and only the written note is sent to the tutor;
- rate a completed session, signal whether follow-up is needed, and leave written feedback;
- exchange portal messages with the tutor attached to that same session; the recipient receives an email alert, but neither contact email is exposed in the portal;
- see that a portal message is awaiting a response or answered; overdue unanswered messages are escalated to the operations inbox after 24 hours;
- send a follow-up request into `Portal Requests`.
- see the status of every request sent to the team.
- confirm a proposed session or ask for a schedule change.

### Tutor portal

Tutors can:

- sign in only after the owner has added them as an active tutor and sent an access invite;
- request a login code by email;
- see assigned sessions;
- see an online session's Google Meet link only after the conference is ready; a pending conference is labelled as preparing and never exposes a join link;
- see the next upcoming session and messages that need a reply;
- publish, edit or pause their own recurring weekly availability and set it as open, limited, full or paused; open and limited windows become bookable parent slots;
- see which sessions need notes;
- submit or revise one post-session note after the session has ended;
- use the same structured note: attendance, focus, wins, blockers, homework, confidence, next goal, recommendation and parent summary;
- exchange portal messages with the parent for an assigned session;
- request a guaranteed reschedule at least 72 hours before an upcoming session, using the same transparent policy as the parent;
- create parent-ready summaries that land in `Session Notes`.
- send a team follow-up request and see its status.
- confirm a proposed session or ask for a schedule change.

### Operations portal

The owner account `chahineralph@gmail.com` can choose `Equipe` on the portal login screen. This opens the operations view where the owner can:

- choose a parent and an active tutor, then propose a linked session;
- manage a live parent account: edit details, enable or disable portal access, or delete the parent after retyping their email as confirmation;
- assign an active tutor before booking a session. The CRM lead is marked `matched`; creating a session advances it to `first_session_booked` and links the two people operationally;
- choose an active tutor and create their portal access. The invite sends the tutor a one-time login code.
- set the time, duration, subject, format and recurrence;
- see confirmations and open schedule-change requests;
- create a session with its selected offer; the server then issues its unique hosted Stripe Checkout.
- manage the active plan catalogue and enroll a matched parent/student in a Momentum or Progress block, selecting a cadence only after the match is confirmed;
- create the first linked session after activating a plan, so the session is explicitly attached to its block and credit ledger;
- verify each external payment, then let the verified workflow grant four Momentum-block credits after $250 or five Progress-block credits after each $300 payment; this never triggers a card charge or an automatic renewal from the portal;
- review recent parent feedback;
- move portal requests through `new`, `in_review`, `done` or `closed` without leaving the portal;
- delete records visibly marked as test/demo/example/sample/mock/fake/essai/qa. The delete action is server-checked and cascades only from a record that is explicitly identified as test data.

### Backend

Site API:

- `/api/portal`

Apps Script actions:

- `portal_create_account`
- `portal_request_code`
- `portal_verify_code`
- `portal_get_dashboard`
- `portal_create_session`
- `portal_respond_to_session`
- `portal_submit_session_note`
- `portal_book_session`
- `portal_submit_parent_feedback`
- `portal_update_parent_profile`
- `portal_delete_test_record`
- `portal_upsert_parent`
- `portal_set_parent_access`
- `portal_delete_parent`
- `portal_assign_tutor`
- `portal_invite_tutor`
- `portal_send_session_message`
- `portal_cancel_session`
- `portal_upsert_tutor_availability`
- `portal_update_request_status`
- `portal_create_request`
- `portal_upsert_plan`
- `portal_create_plan_enrollment`
- `portal_update_plan_enrollment`
- `portal_pause_plan_enrollment`
- `portal_resume_plan_enrollment`
- `portal_adjust_plan_credits`
- `portal_get_plan_change_deadline`

Stripe's signed webhook is handled separately by `/api/stripe-webhook`. It accepts only verified Stripe Checkout completion events and sends a second shared-secret request to Apps Script before a `Payments` row or session can become `paid`.

## Tutor calendar and Meet ownership

- The assigned tutor owns the Calendar event and is the Google Meet host. Before enabling online booking, share each tutor calendar with the Apps Script account that creates events and conferences.
- The system creates the event without invitations while the conference is pending. It sends parent and tutor invitations only after Google returns the ready `meet.google.com` URL.
- If conference creation fails, the automation retries safely during the recovery window and never announces an online session without a working Meet link. At terminal failure it expires any open Checkout, holds a completed payment for reconciliation, completes Calendar cleanup, then cancels the unusable session and releases its reservation where applicable.
- When an unpaid session Checkout expires, the system deletes the Calendar event, releases the slot/credit reservation where applicable, and tells the parent to choose a new slot. A parent cannot revive that released session by reissuing a Checkout link.
- Reissue is parent-only and only for the owner-filtered, overdue package payment whose enrollment is still eligible. Tutors never see payment or reissue controls.

CRM tabs:

- `Portal Access`
- `Portal Requests`
- `Parent Feedback`
- `Portal Messages`
- `Session Notes`
- `Session Notes Queue`
- `Payments`
- `Sessions`
- `Plans`
- `Plan Enrollments`
- `Credit Ledger`

## Login model

No password.

The portal sends a 6-digit code by email through Apps Script. The code expires after 15 minutes. Requests are limited to one code per identity per minute; five failed verification attempts start a 15-minute per-identity cooldown. A successful login resets the failure count and creates a 14-day session token.

New parent accounts are allowed from the portal. Creating the account:

- writes a new row in `Parent Leads` with `source_page=portal-account`;
- creates or updates `Portal Access`;
- requires a parent privacy-consent confirmation and records its timestamp and version in the CRM;
- sends the first login code to the parent's email.

Tutor accounts cannot be created or requested from the public site. The owner adds a real tutor to `Tutor Roster` with `status=active`, then uses `Équipe > Accès tuteurs` to provision the portal access and email the first one-time code. A tutor must remain both `active` in the roster and `active` in `Portal Access` to receive future codes.

Parents are recognized by email in:

- `Parent Leads`
- `Sessions`
- `Payments`

Tutors are recognized by `calendar_email` in:

- `Tutor Roster`

## Payment model

The active catalogue is deliberately simple:

| Offer | Parent price | Portal/accounting behaviour |
| --- | ---: | --- |
| Targeted session | $65 CAD / 60 min | One concrete priority: a chapter, homework, catch-up, or exam preparation. Send the confirmed-session hosted Checkout URL. |
| Momentum block | $250 CAD / 4 × 60 min | One $250 payment. The verified payment workflow grants four credits and records the trace in `Credit Ledger`. |
| Progress block | $600 CAD / 10 × 60 min | Two $300 payments: at the start and halfway through. The verified payment workflow grants five credits after each payment and records the trace in `Credit Ledger`. |

The operator sequence is mandatory:

1. Match the tutor and confirm a realistic time.
2. Record the selected offer: `targeted_session`, `momentum_block`, or `progression_block`.
3. For a block, create the pending enrollment and payment request in the operator portal.
4. Let Stripe or the verified payment workflow grant the associated credits automatically.
5. Offer a weekly or biweekly time only as a scheduling preference after matching.
6. Never describe a block as an auto-renewing subscription or grant credits before verified payment.

Stripe remains the payment processor and the portal never stores card data. A signed Stripe webhook may mark the matching `Payments` row as paid; a verified Interac workflow may do the same. Neither path creates an automatic debit or renewal. The cadence is recorded only after the tutor, time and fit are confirmed.

## Session lifecycle

1. A parent can self-book a slot that appears from an `open` or `limited` row in `Tutor Availability`; the backend recomputes and revalidates the selected slot before writing it. An ordinary selected session type resolves its matching amount and creates a hosted Stripe Checkout. A linked, active block enrollment reserves a credit instead, so it does not create a second per-session payment request.
   A tutor can maintain only their own weekly availability from their portal; they cannot alter another tutor's availability or a booked session. Overlapping active windows are refused and legacy duplicate slots are removed from the parent booking list.
2. The parent booking is immediately confirmed for both people, then the automation creates the calendar invite and, for ordinary paid sessions, the payment row.
3. In `Equipe`, assign an active tutor to a parent when the match is decided. This records the match but does not expose either person yet.
4. Create a session by selecting that parent and tutor. The session stores both identifiers and both emails. This is the operational link that lets the two portals see one another's session and exchange messages.
5. Parent and tutor each receive an operator-created proposal email and confirm in their portals.
6. Once both confirmations are present, the session becomes `confirmed`; the automation creates the Google Calendar event, invites both people, creates a payment row, and sends the payment email when a hosted Stripe Checkout has been issued.
7. When the tutor submits a post-session note, a green/watch parent summary is emailed and visible in the parent portal. High-risk notes stay as drafts for owner review.
8. For either block, the team records a weekly or biweekly cadence only after matching and after confirming a realistic day and time. When the fit remains right, it uses the same preferred time, tutor and format. Each future session is still explicitly scheduled and confirmed. After the final included session, no new block, payment or renewal is created unless the parent chooses one.

### Block credit lifecycle

1. The team verifies the payment; the verified workflow activates the enrollment and grants four credits for the Momentum block or five credits for the relevant Progress-block instalment, with a reason in `Credit Ledger`.
2. Booking an eligible session against an active block atomically reserves one credit. If the session cannot be written, that reservation is released.
3. Completing the session consumes the already reserved credit. The ledger preserves the grant, reservation and consumption trail instead of overwriting a balance.
4. For the Progress block, at or before the midpoint, the team verifies the second $300 instalment; the verified workflow grants the remaining five credits with a recorded reason.
5. A reschedule request made at least 72 hours before the session is guaranteed and releases the reservation. A late request is merely recorded for the team; the credit remains unchanged until an operator makes the decision.
6. Only the verified payment workflow may grant payment-linked credits. Only the operator may remove or otherwise adjust credits, and every adjustment needs a reason. Parents can see their balance but cannot issue credits to themselves.

### Cancellation policy

- At least 72 hours before a future session, either linked parent or tutor can request a guaranteed reschedule from the portal. A known Google Calendar event is updated or removed as needed.
- For a paid session, the session is cancelled but the payment is explicitly left for an operator's refund or credit decision.
- For a session covered by a block, a timely reschedule releases its one reserved credit back to the available balance. It does not promise a cash refund.
- Within 72 hours, the portal keeps a dated schedule-change request for the team instead of promising a reschedule. It does not automatically forfeit a payment or a credit.
- A parent may pause the agreed cadence for a progress block, but a session already confirmed inside its 72-hour window is still reviewed as its own change request.

### Communication policy

- Parent and tutor can message only through a shared session, and the portal never displays the other person's email address.
- A new message is marked `awaiting_reply` with a 24-hour response target. A response marks the preceding message as `answered`.
- The automation emails the operations inbox once for overdue conversations, so there is a human escalation path.
- A parent preparation note uses this same secured session-message path, so the tutor sees it before the session and the team can see the audit trail.
- Direct file upload is intentionally not live: photos and PDFs selected in the preparation interface are not transmitted or retained by the portal. The parent can send a written note now; the team must provide an approved secure channel before requesting an actual file.
- Requests sent to the team remain visible to their parent or tutor author with their current status. Only the operator role can change that status.

### Notes and payment confirmation

- Tutors can write one structured note per completed session. Resubmitting it updates the same note rather than creating competing parent summaries.
- A Stripe-confirmed payment marks the matching payment and session as paid, then sends the parent a payment-received email once.

## Automation

`installPortalAutomation` creates one time-driven Apps Script trigger that runs every 15 minutes. It catches manually confirmed spreadsheet rows as well as pending parent updates:

- Calendar invitations for confirmed sessions;
- payment rows and payment emails;
- settlement of any completed progress-block credit reservation;
- parent summaries marked `ready_to_send`.
- one-time overdue-message escalation alerts for conversations without a reply after 24 hours.

## Stripe Checkout production activation

Use the canonical [Stripe Checkout webhook runbook](stripe-webhook.md) for the complete owner-controlled procedure; do not duplicate or improvise its secret setup here.

Vercel needs `CRM_WEBHOOK_URL` and `CRM_PORTAL_SECRET` for the portal proxy, plus all Checkout variables: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `PAYMENT_WEBHOOK_SECRET`, and `PAYMENT_SESSION_SECRET`. Apps Script project properties need the same `CRM_PORTAL_SECRET`, `PAYMENT_WEBHOOK_SECRET`, and `PAYMENT_SESSION_SECRET` values. A terminal Google Meet failure uses the private `/api/expire-checkout-session` route with that shared secret before it cancels a session; set `PAYMENT_CHECKOUT_EXPIRE_ENDPOINT` only for a custom trusted deployment URL.

The owner must create `https://methode-secondaire.vercel.app/api/stripe-webhook` in Stripe and subscribe it to `checkout.session.completed`, `checkout.session.async_payment_succeeded`, and `checkout.session.expired`. Test mode must prove a payment is recorded once and that an expired Checkout releases its linked session; a package-payment reissue remains parent-only and subject to its enrollment eligibility. Never put any secret in the repository or frontend.

For local development, `npm run dev` includes a Vite-only `/api/portal` relay so the portal can be tested on `http://127.0.0.1:5173/portail` without `vercel dev`. Production still uses the Vercel function in `api/portal.js`.

## Apps Script authorization

The script now uses `MailApp.sendEmail`.

If login codes do not send, open Apps Script and run/authorize `setupCrm` or any portal action once from the script editor so Google grants the send-mail permission.

## Operating rules

- Parent self-serve account creation is fine because email-code login proves email control.
- Do not promise a session until `Tutor Roster` and `Tutor Availability` are current.
- Do not grant tutor access until the tutor is in `Tutor Roster` with `status=active`; use the owner invite rather than sharing a generic login.
- Do not expose a parent summary until the tuteur note is clear.
- Ask a parent to pay only through the server-issued, hosted Stripe Checkout URL; legacy Payment Links and portal demo payments are not a production payment path.
- Keep the legacy `Payment Links` sheet read-only for historical records. New sessions use their stored amount or the canonical offer amount and never read a reusable link.
- Do not grant block credits until an operator has verified the corresponding payment: four credits after the Momentum-block $250 payment, or five credits after each Progress-block $300 instalment. Do not use a credit adjustment as a substitute for payment confirmation.
- Do not describe a block as an automatic subscription or debit. Each block is closed with no automatic renewal; cadence is selected after matching.
- Treat a paid cancellation as a manual refund or credit decision; do not tell a parent it is automatically refunded.
- Treat an in-window 72-hour change as a team-review request. For a progress-block session, do not release its reserved credit until the team accepts the change; do not automatically forfeit it.
- Do not ask parents to upload schoolwork through the portal yet. A preparation note is supported; document storage and file transfer are not.
- Review message-SLA alerts promptly, especially when a parent message is due before a session.
- Use `Portal Requests` as the inbox for parent/tutor messages that arrive from the portal.

## Next upgrades

1. Add custom Stripe Checkout sessions or subscriptions only after consent, failed-payment, pause and refund behaviour are explicitly designed.
2. Add a private document-upload service only with secure storage, access control, retention rules and parent consent; until then, preparation is a text note only.
3. Add richer operations screens only after the CRM workflow is stable.
