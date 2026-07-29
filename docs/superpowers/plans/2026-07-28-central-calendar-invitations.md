# Central Calendar Invitations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the site-managed tutor availability the sole scheduling source, while a central Méthode Secondaire Google Calendar creates and owns every event, Meet link, invitation, update, and cancellation.

**Architecture:** A booking keeps the assigned tutor's email only as an attendee. Apps Script resolves a configured central calendar through the `METHODE_SECONDAIRE_CALENDAR_ID` Script Property, falling back to the deployed owner's default calendar so the system works immediately. Both online and in-person events are created and deleted through that same resolver. Online events wait to send invitations until Google returns a working Meet URL; then the parent and tutor receive the normal Google Calendar invitation.

**Tech Stack:** Google Apps Script, Google Calendar advanced service, Google Meet, Node built-in test runner.

## Global Constraints

- Tutor availability remains manually maintained in the Méthode Secondaire portal; no tutor Google Calendar access or sharing is required.
- Never use a tutor's `calendar_email` or `calendar_id` as the calendar owner for a booking; the email is an event attendee only.
- Keep existing Meet failure, payment-expiry, and Calendar cleanup safeguards intact.
- Do not expose personal data, Script Properties, or secrets in browser code, docs, logs, or commits.

### Task 1: Lock the central-calendar contract with tests

**Files:**
- Modify: `test/parent-portal.test.mjs`
- Modify: `scripts/check-meet-checkout-contract.mjs`

- [x] Add a failing source contract proving that online creation, pending Meet polling, and deletion resolve the managed calendar rather than a tutor calendar.
- [x] Prove the contract fails before implementation with `npm.cmd run test:portal` and `npm.cmd run test:payments`.

### Task 2: Route all booking Calendar work through the managed calendar

**Files:**
- Modify: `ops/crm/google-apps-script/Code.gs`
- Modify: `src/pages/Portal.jsx`
- Modify: `src/lib/portalClient.js`

- [x] Add a single managed-calendar resolver using `METHODE_SECONDAIRE_CALENDAR_ID`, with the deployed owner's default calendar as the safe zero-configuration fallback.
- [x] Persist the exact calendar ID on every new session and use a legacy candidate fallback for sessions created before this cutover.
- [x] Create online Meet events in that calendar and retain both parent and tutor as attendees.
- [x] Keep invitations deferred until the Meet URL is ready, then send the finalized invitation to both attendees.
- [x] Route in-person creation and every cancellation/cleanup path to the same managed calendar, with explicit guest cancellation updates.
- [x] Update operational error wording so it describes the central calendar, not a tutor calendar.
- [x] Remove per-tutor Google Calendar fields from the operator portal; a tutor profile needs an email and site availability only.
- [x] Re-run focused portal and payment tests.

### Task 3: Document, publish, and prove the real flow

**Files:**
- Modify: `ops/crm/google-apps-script/README.md`
- Modify: `ops/crm/parent-tutor-portal.md`
- Modify: `README.md`

- [x] Document the one optional Script Property and the no-sharing tutor workflow.
- [x] Run `npm.cmd run test:portal`, `npm.cmd run test:payments`, and `npm.cmd run build`.
- [x] Push the reviewed source directly to `main` as explicitly authorized by Chahine.
- [x] Deploy the Apps Script version serving the production CRM URL.
- [x] Book one future test availability and verify that the central calendar produces a Meet event and sends the parent/tutor invitation without a tutor calendar setup.
