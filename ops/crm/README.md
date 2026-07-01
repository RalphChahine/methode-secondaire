# CRM parent leads

Base simple pour suivre les demandes parent sans construire une plateforme trop tôt.

## Setup rapide

1. Importer `parent-leads-template.csv` dans Google Sheets ou Airtable.
2. Connecter Formspree vers la feuille avec Zapier, Make ou export CSV manuel au début.
3. Garder une seule vue principale: `À rappeler aujourd'hui`.

## Stages

- `new_request`: demande reçue, pas encore traitée.
- `callback_needed`: parent à rappeler.
- `callback_done`: rappel fait, besoin compris.
- `matched`: tuteur ou format recommandé.
- `first_session_booked`: première séance planifiée.
- `active_follow_up`: élève en suivi.
- `closed`: demande fermée ou non pertinente.

## Routine quotidienne

- Matin: filtrer `lead_status = callback_needed`.
- Après chaque appel: remplir `callback_notes`, `offer_recommended`, `assigned_tutor`, `next_action`.
- Après première séance: remplir `first_session_summary`.
- Chaque vendredi: regarder les leads sans `next_action_due`.

## Règle simple

Chaque lead doit toujours avoir un prochain geste clair:

- appeler le parent;
- proposer un créneau;
- assigner un tuteur;
- envoyer le résumé de première séance;
- fermer avec une raison.
