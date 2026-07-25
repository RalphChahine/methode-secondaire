# Parent portal simplification and secure session materials

**Date:** 2026-07-25  
**Status:** Approved design; pending written-spec review

## Purpose

Make the parent portal feel calm and obvious at a stressful moment: a parent should immediately see what matters next, prepare a session in under a minute, and know that the assigned tutor has the right material.

The current attachment control is deliberately local-only: it retains only selected filenames in browser state and sends the written note alone. This design replaces that misleading interaction with real, private file sharing through Google Drive.

## Parent experience

### Primary navigation

The parent portal has four concise destinations:

1. **Today** is the default home. It has one prominent, context-aware action: prepare an upcoming session, confirm a proposal, complete payment, read a recap, or wait while matching is in progress.
2. **Sessions** contains booking, upcoming-session management, and completed-session recaps.
3. **Messages** contains session-linked conversations and their shared materials.
4. **Family & account** contains student profile, payment detail, plan/credit detail, feedback, request history, and other lower-frequency controls.

Existing information is preserved but no longer competes with the next action on the home screen. Contextual links may take a parent to the relevant detailed area.

### Progress board

For a booked or confirmed upcoming session, Today shows a restrained three-step progress board:

1. Prepare the session
2. Meet with the tutor
3. Read the recap

Only the current or completed state is emphasized. This is progress feedback, not a points, badge, streak, or reward system. The wording stays supportive and factual.

### Prepare the session

The session-preparation card replaces the two fake upload buttons and the local-only disclaimer with one explicit flow:

1. Parent selects or captures up to five images or PDFs for the selected upcoming session.
2. The parent can add a short note about what is difficult.
3. The parent chooses **Send to tutor**.
4. Each file displays its real upload progress, then an individual success or clear error state.
5. On success, the card lists the uploaded filename and says **Shared with your tutor**. It never claims that the tutor has opened the file.

A parent can remove an incorrectly selected file before sending. A successfully shared file can be withdrawn before the session; withdrawal removes it from Drive and the portal record.

The card does not invite a file selection until an upcoming, linked session exists. The existing text-only preparation note remains supported when no attachment is needed.

## Secure file-sharing architecture

### Boundaries

- A file belongs to exactly one session.
- Only the linked parent may upload or withdraw it; only the linked parent, assigned tutor, and operations role may see its metadata.
- The assigned tutor receives a private Drive viewer permission for the individual file. No public or anyone-with-link permission is created.
- The portal never exposes parent or tutor email addresses. It gives the tutor a session-scoped **Open material** link only after access verification.
- File bytes are not logged, stored in the CRM spreadsheet, or returned in dashboard responses.

### Storage and records

Google Drive is the file store. An Apps Script property, `PORTAL_MATERIALS_DRIVE_FOLDER_ID`, identifies the private top-level folder; it is configured outside source control. Files are organized under non-public session subfolders.

The CRM gains a `Session Materials` sheet with these authoritative fields:

- `material_id`, `session_id`, `lead_id`
- `parent_email`, `tutor_id`, `tutor_email`
- `drive_file_id`, `file_name`, `mime_type`, `size_bytes`
- `status` (`shared`, `withdrawn`, `expired`)
- `created_at`, `withdrawn_at`, `expires_at`

The dashboard returns sanitized material metadata for only the signed-in participant's linked sessions. It returns an authorized Drive-open route/link only to the assigned tutor and operations role; parents receive delivery status and filenames.

### Upload contract

The browser sends one file at a time through the existing authenticated portal proxy using a new `portal_upload_session_material` action. Each decoded file is limited to 2.5 MiB; the browser compresses supported photos before upload, and a file that remains above that limit is rejected before transfer with an actionable message. PDFs are not transformed and must already be at or below 2.5 MiB. Files upload sequentially, so the five-file limit never creates one oversized request.

Apps Script validates the portal token, parent role, session relationship, upcoming-session state, count limit, MIME type, filename, and decoded byte size. It creates the private Drive file, grants viewer access to the assigned tutor, records metadata, and creates a session-message notification listing the newly shared material. The existing tutor email-alert path then tells the tutor to open the portal; it does not expose a broadly shareable Drive URL in email.

Supported types are images and PDF only. There are no executable, archive, office-document, or public-link uploads in this release.

### Retention

Each material expires 30 days after its session's scheduled end time. The existing time-driven Apps Script automation removes expired Drive files and marks their records `expired`; withdrawn files are removed immediately. The parent-facing text states this short retention period before the first upload.

## Error handling

- If no linked, upcoming session is eligible, the upload control is unavailable and explains why.
- Invalid type, oversized file, too many files, expired session, permission failure, and Drive failure each have distinct, human-readable messages.
- A failed file does not prevent a parent from sending the note or successfully uploaded files.
- If Drive storage succeeds but notification delivery fails, the material remains shared and the tutor sees it in the portal; the response reports the notification issue without treating the upload as lost.
- Files are not shown as delivered until both Drive creation and the CRM record succeed. Partial Drive uploads are removed on a record-write failure where possible and surfaced to operations otherwise.

## Implementation boundaries

The implementation is intentionally limited to the parent portal, tutor material visibility, the authenticated portal API, and the Apps Script CRM/Drive workflow. It does not redesign operations, replace the existing messaging system, introduce public file links, or add points/rewards.

The parent dashboard component will be decomposed into small destination-oriented views rather than adding more state to the existing monolithic page. Existing session, payment, and feedback operations remain available through their new contextual destinations.

## Verification

Automated coverage will verify:

- upload actions are allowlisted and authenticated;
- a parent cannot upload to or view a different family's session;
- a tutor sees only materials for assigned sessions;
- unsupported, oversized, and over-limit files are rejected;
- a material record is returned only to authorized dashboards;
- withdrawal and expiry remove access and update the record;
- the parent home prioritizes exactly one next action and does not render the full secondary dashboard there.

Manual verification will use a non-production Drive folder and test parent/tutor accounts to confirm: upload progress, tutor portal visibility, email alert behavior, private Drive access, withdrawal, expiry cleanup, mobile camera capture, and the simplified French and English flows.
