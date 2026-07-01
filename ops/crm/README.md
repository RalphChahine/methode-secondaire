# CRM parent leads

Base simple pour suivre les demandes parent sans construire une plateforme trop tôt.

## Setup rapide

1. Créer une Google Sheet.
2. Installer le script dans `google-apps-script/Code.gs`.
3. Lancer `setupCrm`.
4. Déployer le script en Web App.
5. Mettre l'URL dans `VITE_CRM_WEBHOOK_URL`.
6. Garder une seule vue principale au quotidien: `A rappeler aujourd'hui`.
7. Remplir `Tutor Roster` avant de matcher un parent.

Le script crée aussi:

- `Matching Queue`: demandes prêtes à recevoir un tuteur.
- `Ops Dashboard`: compteurs rapides pour savoir quoi traiter maintenant.
- `Tutor Roster`: capacité, matières, formats et statut des tuteurs.

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

## SLA simple

- Urgence `high`: rappeler le jour même si possible.
- Urgence `medium`: rappeler sous 24 h ouvrables.
- Urgence `normal`: rappeler sous 48 h ouvrables.
- `needs_clarification`: rappeler avec un script court pour clarifier.

## Workflow appel

1. Ouvrir le lead dans `Parent Leads`.
2. Appeler le parent.
3. Remplir `callback_notes` pendant ou juste après l'appel.
4. Choisir `offer_recommended`.
5. Si le besoin est clair, mettre `lead_status = ready_to_match`.
6. Choisir `assigned_tutor` ou laisser `unassigned`.
7. Mettre `crm_stage = callback_done`.
8. Mettre `next_action`.
9. Mettre `next_action_due`.

## Workflow matching

1. Ouvrir `Matching Queue`.
2. Vérifier matière, niveau, format, urgence et préférence de contact.
3. Ouvrir `Tutor Roster`.
4. Choisir un tuteur `active` avec `available_slots > 0`.
5. Mettre son nom dans `assigned_tutor`.
6. Mettre `crm_stage = matched`.
7. Mettre `next_action = book_first_session`.
8. Proposer deux créneaux au parent.

## Roster tuteurs

Champs essentiels:

- `status`: `active`, `paused`, `backup`, `inactive`.
- `subjects`: exemple `math, physics`.
- `levels`: exemple `sec3, sec4, sec5`.
- `formats`: `online`, `in_person`, `either`.
- `weekly_capacity`: nombre d'élèves ou blocs hebdo possibles.
- `active_students`: charge actuelle.
- `available_slots`: calculé automatiquement.

Règle simple: ne jamais promettre un jumelage avant d'avoir vérifié `available_slots`.

## Prochaine action par situation

- Parent prêt: `book_first_session`.
- Besoin clair mais créneau à confirmer: `assign_tutor`.
- Parent hésite: `send_follow_up`.
- Première séance faite: `send_session_summary`.
- Mauvais fit: `close_lead`.

## Règle simple

Chaque lead doit toujours avoir un prochain geste clair:

- appeler le parent;
- proposer un créneau;
- assigner un tuteur;
- envoyer le résumé de première séance;
- fermer avec une raison.

## Templates

Les messages prêts à copier sont dans `templates/`.
