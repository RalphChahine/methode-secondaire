# Scheduling and payments workflow

Objectif: garder le site simple, mais avoir un back-office clair pour assigner les tuteurs, confirmer les séances et suivre les paiements.

## Système choisi maintenant

- Le site collecte la demande parent.
- Le Google Sheet CRM décide quoi faire.
- Google Calendar confirme les séances.
- Stripe Payment Links ou Interac collecte le paiement.

Ce choix évite de construire une plateforme trop tôt. Le parent ne voit pas une usine à gaz; toi, tu as un système assez structuré pour scaler.

## Onglets

- `Tutor Roster`: profil, capacité, email calendrier et lien de réservation de chaque tuteur.
- `Tutor Availability`: disponibilités récurrentes ou manuelles par tuteur.
- `Matching Queue`: demandes prêtes à recevoir un tuteur.
- `Sessions`: séances proposées, confirmées, synchronisées au calendrier ou complétées.
- `Schedule Queue`: séances à confirmer ou à synchroniser.
- `Payment Links`: liens Stripe/Interac par type d'offre.
- `Payments`: ledger des paiements parents et payouts tuteurs.
- `Payment Queue`: paiements non réglés.
- `Ops Dashboard`: compteurs du matin.

## Workflow horaire

1. Remplir `Tutor Roster` avec les deux tuteurs actifs.
2. Remplir `Tutor Availability` avec leurs plages réalistes.
3. Quand un lead devient clair, le mettre dans `ready_to_match`.
4. Choisir un tuteur dans `Tutor Roster`.
5. Créer une ligne dans `Sessions`.
6. Mettre `session_status = proposed`.
7. Quand parent et tuteur confirment, mettre `session_status = confirmed`.
8. Lancer `syncConfirmedSessionsToCalendar`.
9. Le script crée l'événement Google Calendar, invite parent + tuteur, puis passe la séance à `calendar_created`.

## Workflow paiement

1. Créer les liens Stripe dans Stripe Dashboard.
2. Coller les URLs dans `Payment Links`.
3. Quand une séance est confirmée, remplir `payment_link` et `amount_cad` dans `Sessions`.
4. Lancer `createPaymentRowsForScheduledSessions`.
5. Envoyer le template `templates/payment-request.md`.
6. Quand le parent paie, mettre `payment_status = paid`.
7. Quand le tuteur est payé, mettre `payout_status = paid`.

## Règles simples

- Pas de promesse parent sans tuteur `active` et capacité disponible.
- Pas de séance récurrente sans premier paiement clair.
- Pas de payout tuteur tant que le paiement parent n'est pas clair.
- Les familles très urgentes peuvent être confirmées par appel, mais doivent quand même passer dans `Sessions`.

## Quand intégrer un vrai checkout au site

Pas maintenant pour le suivi hebdomadaire. Le parent doit d'abord être qualifié.

À intégrer plus tard:

- un lien de paiement pour séance ponctuelle claire;
- une page privée ou semi-privée de paiement après appel;
- éventuellement Stripe Checkout API si le volume justifie l'automatisation complète.

Pour maintenant, Stripe Payment Links est assez propre: page de paiement hébergée, lien partageable, pas besoin de coder le checkout.
