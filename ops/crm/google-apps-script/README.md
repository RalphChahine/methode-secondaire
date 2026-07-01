# Google Sheets CRM webhook

Ce dossier contient le script qui transforme une Google Sheet en mini CRM.

## Déploiement

1. Créer une nouvelle Google Sheet.
2. Aller dans `Extensions > Apps Script`.
3. Coller le contenu de `Code.gs`.
4. Sauvegarder.
5. Lancer manuellement `setupCrm` une fois et accepter les permissions Sheets + Calendar.
6. Cliquer `Deploy > New deployment`.
7. Choisir `Web app`.
8. Exécuter en tant que `Me`.
9. Accès: `Anyone`.
10. Copier l'URL du Web App.

## Brancher le site

Ajouter l'URL dans l'environnement du site:

```env
VITE_CRM_WEBHOOK_URL=https://script.google.com/macros/s/XXXXX/exec
```

Le formulaire continue d'envoyer à Formspree. Si cette variable existe, une copie du lead est aussi envoyée à Google Sheets.

## Onglets créés

- `Parent Leads`: base complète.
- `A rappeler aujourd'hui`: vue des demandes à rappeler.
- `Premieres seances`: vue des premières séances planifiées.
- `Suivis actifs`: vue des suivis actifs.
- `Matching Queue`: demandes prêtes à être jumelées.
- `Tutor Roster`: capacité et profil des tuteurs.
- `Tutor Availability`: disponibilités tuteurs.
- `Sessions`: horaire des séances.
- `Schedule Queue`: séances à confirmer ou synchroniser.
- `Payments`: paiements parents et payouts tuteurs.
- `Payment Links`: liens Stripe/Interac par offre.
- `Payment Queue`: paiements à régler.
- `Ops Dashboard`: compteurs de pilotage.
- `Config`: listes de statuts.

## Fonctions utiles

- `setupCrm`: crée ou remet en forme tous les onglets.
- `syncConfirmedSessionsToCalendar`: crée les événements Google Calendar pour les lignes `Sessions` où `session_status = confirmed`.
- `createPaymentRowsForScheduledSessions`: crée les lignes `Payments` pour les séances confirmées ou créées au calendrier.
