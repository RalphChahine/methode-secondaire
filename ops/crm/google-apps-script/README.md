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

Ajouter l'URL dans l'environnement serveur du site:

```env
CRM_WEBHOOK_URL=https://script.google.com/macros/s/XXXXX/exec
```

Le formulaire continue d'envoyer à Formspree. La route `/api/lead-crm` relaie ensuite une copie du lead à Google Sheets. `VITE_CRM_WEBHOOK_URL` peut rester en fallback local, mais le déploiement Vercel doit privilégier `CRM_WEBHOOK_URL`.

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
