# Parent–Tutor Handoff Clarity Design

## Goal

Make every session state unambiguous for a parent and tutor without changing the existing CRM, matching, payment, or access model.

## Chosen approach

Strengthen the current portal with a small, shared session-state presentation layer. This is preferable to a visual-only copy change (which would leave invalid actions available) and to a backend workflow rewrite (which is unnecessary before the fall launch).

## Parent experience

The parent portal keeps its four destinations: **Aujourd'hui**, **Séances**, **Messages**, and **Famille et compte**.

On `Séances`:

1. Show upcoming sessions first, then past sessions, then cancelled sessions.
2. A future proposed session shows **Confirmer** and **Demander un ajustement** only until the current participant has responded.
3. Once the parent has confirmed, replace the primary action with the clear read-only state: **Vous avez confirmé — en attente du tuteur.** The parent can still request an adjustment.
4. Once both participants have confirmed, show the session as confirmed. Display a payment call-to-action only if the payment is actually actionable after both confirmations.
5. A proposed or partially confirmed session whose start time has passed cannot be confirmed or paid. It shows an expired state and directs the parent to request an adjustment from the team.
6. Each completed session can show its released tutor recap directly in the past-session row. The existing account-area history remains available as a secondary record.

## Tutor experience

Tutors continue to use their existing dashboard for availability, materials, session notes, and messages. They see the same truthful session states:

- a future proposal they have not answered can be confirmed or adjusted;
- a proposal they have already confirmed becomes read-only while awaiting the parent;
- an expired proposal cannot be acted upon;
- completed sessions continue to be the source for tutor notes and the parent recap.

## Boundaries

- Méthode Secondaire continues to own schedule exceptions, payment activation, and replacements.
- No new user role, pricing change, CRM schema change, or custom notification system is introduced.
- The change remains safe for current test data: inconsistent historical test records are presented as expired rather than actionable.

## Testing

Add behaviour tests before production changes for:

1. A past proposed session is not actionable.
2. A participant who already confirmed receives a waiting state, not a second confirmation button.
3. Payment is actionable only after both confirmations.
4. Parent session records are grouped into upcoming, past, and cancelled.
5. A released recap is attached only to its completed session.

Run the portal test suite and production site checks after the change.
