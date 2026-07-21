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

## Stripe payment webhook

The website exposes `POST /api/stripe-webhook`. It verifies Stripe's raw webhook signature and sends only a verified payment update to Apps Script.

Configure the same random secret in both locations:

1. Vercel environment variables:
   - `STRIPE_WEBHOOK_SECRET`: the `whsec_...` secret from the Stripe webhook endpoint;
   - `PAYMENT_WEBHOOK_SECRET`: a long random secret used only between Vercel and Apps Script.
2. Apps Script project settings > Script properties:
   - `PAYMENT_WEBHOOK_SECRET`: the exact same random value.

In Stripe, create a webhook endpoint for:

```text
https://methode-secondaire.vercel.app/api/stripe-webhook
```

Select `checkout.session.completed` and `checkout.session.async_payment_succeeded`.

The portal appends a non-sensitive payment ID as Stripe's `client_reference_id`. Stripe returns that reference in the completed Checkout Session, allowing the webhook to mark only the matching CRM payment and session as `paid`.

Le formulaire confirme la demande uniquement après que la route `/api/lead-crm` a relayé le lead vers Google Sheets. Formspree reçoit ensuite une copie secondaire. Configurez seulement `CRM_WEBHOOK_URL` côté serveur Vercel.

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
- `Session Notes`: notes après séance et résumés parent.
- `Session Notes Queue`: notes à envoyer ou à traiter.
- `Payments`: paiements parents et payouts tuteurs.
- `Payment Links`: schéma historique de compatibilité, conservé en lecture seule. Ne pas y créer, coller ou gérer une URL de paiement; les paiements actifs utilisent le code d'offre canonique et un Stripe Checkout hébergé unique émis par le serveur.
- `Payment Queue`: paiements à régler.
- `Plans`: catalogue des offres actives et politique de 72 h.
- `Plan Enrollments`: Séance ciblée et blocs parent/élève; pour un bloc, le jumelage et un créneau réaliste doivent être confirmés avant la demande de paiement.
- `Credit Ledger`: crédits accordés, réservés, libérés, consommés ou ajustés pour le Bloc d'élan (4 après paiement vérifié) et le Bloc de progression (5 après chaque versement vérifié).
- `Ops Dashboard`: compteurs de pilotage.
- `Config`: listes de statuts.

## Fonctions utiles

- `sendDailyTeamDigest`: envoie maintenant le point equipe avec les rappels, matching, seances, paiements, messages et feedback a traiter.
- `installPortalAutomation`: garde les automatisations de 15 minutes et ajoute le point equipe quotidien vers 7 h 30 (heure de Toronto).

- `setupCrm`: crée ou remet en forme tous les onglets.
- `syncConfirmedSessionsToCalendar`: crée les événements Google Calendar pour les lignes `Sessions` où `session_status = confirmed`.
- `createPaymentRowsForScheduledSessions`: crée les lignes `Payments` pour les séances confirmées ou créées au calendrier.

`setupCrm` initialise aussi le catalogue premium : une séance ciblée à 65 $ pour 60 min, un Bloc d'élan de 4 séances à 250 $ en un paiement, et un Bloc de progression de 10 séances à 600 $ en deux paiements de 300 $. Après paiement vérifié, le workflow accorde respectivement 4 crédits pour le Bloc d'élan, ou 5 crédits après chaque versement du Bloc de progression dans `Credit Ledger`; aucun débit ni renouvellement automatique n'est créé. Le rythme hebdomadaire ou aux deux semaines est choisi après le jumelage, ce n'est pas un forfait distinct. Avec 72 h de préavis ou plus, le report est garanti et aucun crédit n'est perdu automatiquement.

Les nouvelles demandes du site envoient `progression_block` pour ce bloc. Les valeurs `progression_block_10` et `weekly_follow_up_10` sont uniquement des alias historiques acceptés puis normalisés dans `Parent Leads`; les identifiants de plan et de séance existants restent inchangés.

Pour activer les paiements, utiliser les montants canoniques des offres et le [runbook Stripe Checkout](../stripe-webhook.md). `Payment Links` reste un onglet de lecture seule pour les lignes historiques; aucun nouveau paiement ne lit une URL de cet onglet.

`setupCrm` vérifie le préfixe exact des en-têtes structurés et ajoute seulement les colonnes manquantes à droite. En cas d'en-tête incompatible, la migration s'arrête avec `CRM_SCHEMA_HEADER_MISMATCH` sans réécrire la ligne existante.

Dans les propriétés du script, configurez `CRM_PORTAL_SECRET` avec la même valeur longue et aléatoire que dans Vercel. Toutes les actions `portal_*` provenant du proxy la vérifient avant tout accès au CRM. Le webhook Stripe reste séparé et continue d'utiliser uniquement `PAYMENT_WEBHOOK_SECRET`.
