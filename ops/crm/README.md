# CRM parent leads

Base simple pour suivre les demandes parent sans construire une plateforme trop tôt.

## Setup rapide

1. Créer une Google Sheet.
2. Installer le script dans `google-apps-script/Code.gs`.
3. Lancer `setupCrm`.
4. Déployer le script en Web App.
5. Mettre l'URL dans `CRM_WEBHOOK_URL` sur Vercel. Ne pas exposer l'URL dans une variable `VITE_*`.
6. Garder une seule vue principale au quotidien: `A rappeler aujourd'hui`.
7. Remplir `Tutor Roster` avant de matcher un parent.

Le script crée aussi:

- `Matching Queue`: demandes prêtes à recevoir un tuteur.
- `Ops Dashboard`: compteurs rapides pour savoir quoi traiter maintenant.
- `Tutor Roster`: capacité, matières, formats et statut des tuteurs; rémunération de base à 28 $ CAD/h, ajustable selon l'expérience et le rôle.
- `Sessions`: séances proposées, confirmées et synchronisées au calendrier.
- `Session Notes`: notes tuteur après séance, résumé parent et niveau de risque.
- `Payments`: paiements parents et paiements tuteurs.
- `Plans`: catalogue 65/250/600 : Séance ciblée à 65 $ pour 60 min, Bloc d’élan de 4 séances à 250 $ (62,50 $ par séance), puis Bloc de progression de 10 séances à 600 $ (60 $ par séance), en deux versements de 300 $.
- `Plan Enrollments`: bloc associé à un parent, un élève et un tuteur; le rythme hebdomadaire ou aux deux semaines est choisi après le jumelage. La cadence n'est pas un produit, un abonnement ni un débit automatique.
- `Credit Ledger`: journal des crédits des blocs, accordés seulement après vérification du paiement : 4 crédits en une fois pour le Bloc d’élan; 5 crédits au début, puis 5 à mi-parcours pour le Bloc de progression. La Séance ciblée ne crée ni ne consomme de crédit.

Le workflow horaire, prix, paiement et crédits est détaillé dans `scheduling-and-payments.md`.

Pour les nouvelles demandes, les codes d'offre CRM sont `targeted_session`, `momentum_block` et `progression_block`. Les codes historiques connus, dont `progression_block_10` et `weekly_follow_up_10`, restent acceptés et sont normalisés vers le code public correspondant; `weekly_follow_up` reste un type de séance interne et n'est pas un produit.

Avant toute mise en production du catalogue, lancer `setupCrm` dans une copie du classeur et vérifier que `Plans` contient exactement trois plans actifs : `PLAN-FIRST-60`, `PLAN-PACK4-250` et `PLAN-PACK10-600`. Les paiements actifs utilisent les codes d'offre canoniques, le montant de la séance ou de l'offre, puis un Stripe Checkout hébergé unique émis par le serveur; suivre le [runbook Stripe Checkout](stripe-webhook.md). L'onglet `Payment Links` et son modèle sont seulement des données de compatibilité historiques, en lecture seule : ne pas y ajouter, modifier ou réutiliser une URL de paiement.

## Branchement site

Le formulaire ecrit d'abord dans `/api/lead-crm`, puis envoie une copie non bloquante a Formspree. Le parent ne voit la confirmation que lorsque le CRM a confirme la reception.

Cette route Vercel relaie le lead vers Google Apps Script cote serveur. C'est plus fiable qu'un envoi direct navigateur vers Apps Script, parce que les redirections Google et les restrictions navigateur ne peuvent plus bloquer silencieusement la copie CRM.

Variables:

- `CRM_WEBHOOK_URL`: URL Apps Script du Web App, cote serveur Vercel.

## Stages

- `new_request`: demande reçue, pas encore traitée.
- `callback_needed`: parent à rappeler.
- `callback_done`: rappel fait, besoin compris.
- `matched`: tuteur ou format recommandé.
- `first_session_booked`: première séance planifiée.
- `active_follow_up`: élève en suivi.
- `closed`: demande fermée ou non pertinente.

## Routine quotidienne

- Vers 7 h 30: lire le courriel `Point equipe`, puis ouvrir le portail seulement pour les actions listees.

- Matin: filtrer `lead_status = callback_needed`.
- Après chaque appel: remplir `callback_notes`, `offer_recommended`, `assigned_tutor`, `next_action`.
- Après première séance: remplir `first_session_summary`.
- Après chaque séance terminée: remplir `Session Notes`, envoyer le résumé parent si `parent_update_status = ready_to_send`.
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

## Workflow après séance

1. Le tuteur remplit `templates/tutor-session-note.md` dans les 12 h.
2. Copier les points utiles dans `Session Notes`.
3. Choisir `risk_level`: `green`, `watch` ou `high`.
4. Choisir `next_recommendation`.
5. Mettre `parent_update_status = ready_to_send` si le message parent est prêt.
6. Envoyer `templates/parent-session-update.md`.
7. Mettre `parent_update_status = sent`.
8. Si le risque est `watch` ou `high`, remplir `follow_up_owner` et `follow_up_due`.

## Roster tuteurs

Champs essentiels:

- `status`: `active`, `paused`, `backup`, `inactive`.
- `subjects`: exemple `math, physics`.
- `levels`: exemple `sec3, sec4, sec5`.
- `formats`: `online`, `in_person`, `either`.
- `weekly_capacity`: nombre d'élèves ou de créneaux récurrents possibles.
- `active_students`: charge actuelle.
- `available_slots`: calculé automatiquement.

Règle simple: ne jamais promettre un jumelage avant d'avoir vérifié `available_slots`.

Avant de donner un premier élève à un tuteur, utiliser `templates/tutor-onboarding-checklist.md`.

## Prochaine action par situation

- Parent prêt: `book_first_session`.
- Besoin clair mais créneau à confirmer: `assign_tutor`.
- Parent hésite: `send_follow_up`.
- Première séance faite: `send_session_summary`.
- Séance terminée: `collect_session_note`, puis envoyer le résumé parent.
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
