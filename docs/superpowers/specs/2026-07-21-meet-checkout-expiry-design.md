# Google Meet et paiement à échéance — conception

## Objectif

Permettre à un parent de réserver un créneau disponible, de recevoir un lien Google Meet dont le tuteur est l'hôte, puis de payer avec un Checkout Stripe unique qui expire une heure après sa création. Une réservation non payée doit libérer le créneau sans intervention humaine.

## Périmètre

Cette évolution couvre les séances en ligne réservées dans le portail parent et les demandes de paiement de forfaits créées dans le portail. Elle ne couvre pas le dépôt de documents, les remboursements automatiques ni les séances en personne.

## Décisions validées

- Le tuteur assigné est l'hôte de la séance Google Meet.
- Un Checkout Stripe hébergé et unique remplace les liens Stripe réutilisables pour les paiements créés par le portail.
- L'échéance de paiement est d'une heure après la création du Checkout.
- Une séance en ligne impayée à l'échéance est annulée et son créneau est libéré.
- Les forfaits impayés deviennent `overdue` à l'échéance; ils ne créent pas ou ne réservent pas de séance à annuler.

## Architecture

### Google Meet

Le CRM Apps Script remplace la création d'événement via le service Calendar simple par l'API Calendar avancée pour les séances au format `online`.

1. Le CRM écrit la séance confirmée et verrouille le créneau comme aujourd'hui.
2. Il crée l'événement dans le calendrier du tuteur assigné, avec parent et tuteur comme participants, mais sans envoyer l'invitation avant que le Meet soit prêt.
3. La requête inclut une `conferenceData.createRequest` unique et `conferenceDataVersion: 1`.
4. Le CRM vérifie l'état de la conférence. Lorsqu'elle est prête, il conserve l'identifiant Calendar et l'URL vidéo Meet dans la séance, puis envoie l'invitation aux deux participants.
5. Si le calendrier du tuteur n'est pas accessible ou ne permet pas Google Meet, la réservation échoue avant d'être annoncée au parent et le CRM crée une alerte opérationnelle exploitable par l'équipe.

L'équipe doit configurer chaque calendrier de tuteur afin que le compte qui exécute Apps Script puisse créer des événements et des conférences Google Meet dans ce calendrier. Une vérification de prévol empêche une séance en ligne confirmée sans lien de rencontre.

### Checkout Stripe

Un nouvel endpoint Vercel authentifié par un secret dédié crée une Checkout Session Stripe côté serveur. Le CRM Apps Script lui transmet seulement l'identifiant de paiement, le montant CAD, l'adresse courriel, le libellé et les URLs de retour.

La Checkout Session utilise :

- un montant figé à partir de la demande de paiement CRM;
- `client_reference_id` égal à l'identifiant de paiement CRM;
- une URL de succès vers le portail et une URL d'annulation vers la demande de paiement;
- `expires_at` fixé à une heure après sa création;
- aucun secret Stripe dans le navigateur.

Le CRM enregistre l'ID Checkout, son URL et `due_date`. Le portail affiche le montant, l'échéance et l'état; un parent peut demander une nouvelle session de paiement lorsque l'ancienne est expirée.

### Webhooks et échéance

Le webhook Stripe vérifie toujours la signature Stripe avant de transmettre les données au CRM.

- `checkout.session.completed` et `checkout.session.async_payment_succeeded` marquent le paiement comme `paid` une seule fois, accordent les crédits prévus et confirment le reçu.
- `checkout.session.expired` marque le paiement comme `overdue`.
- Pour une séance liée à ce paiement, le CRM annule la séance, supprime l'événement Calendar et libère la réservation de crédit éventuelle.
- Un paiement déjà `paid`, annulé, expiré ou incohérent n'est jamais recrédité automatiquement. Il est envoyé à l'équipe pour révision si Stripe et le CRM divergent.

Une tâche planifiée CRM vérifie aussi les échéances dépassées afin de couvrir un webhook en retard; elle applique la même transition idempotente.

## Données

La feuille `Sessions` ajoute les colonnes suivantes :

- `google_meet_url`
- `calendar_conference_status`
- `payment_due_at`
- `stripe_checkout_session_id`

La feuille `Payments` ajoute les colonnes suivantes :

- `stripe_checkout_session_id`
- `checkout_expires_at`
- `checkout_url`

Les valeurs existantes sont conservées. Les anciennes séances avec un lien de paiement ne sont pas modifiées rétroactivement.

## Expérience parent et tuteur

- Après réservation, le parent voit « créneau réservé jusqu'à [heure] » et peut ouvrir le paiement Stripe.
- Le parent et le tuteur voient « lien Meet en préparation » jusqu'à la création réussie, puis un bouton d'accès au Meet.
- Après l'échéance impayée, les deux voient que le créneau a été libéré; le parent peut en sélectionner un nouveau.
- Les séances en personne n'affichent aucun lien Meet.
- Toutes les nouvelles chaînes sont fournies en français puis en anglais.

## Sécurité et configuration

- Vercel Production doit contenir `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `PAYMENT_WEBHOOK_SECRET`, `PAYMENT_SESSION_SECRET` et `CRM_WEBHOOK_URL`.
- Stripe Live doit envoyer au webhook Production les événements de succès et d'expiration de Checkout.
- L'API Calendar avancée doit être activée dans le projet Apps Script et les autorisations Calendar doivent être renouvelées.
- Aucun secret, lien de paiement d'un autre parent ou lien Meet d'une autre séance ne peut être renvoyé par le portail.

## Critères d'acceptation

1. Une séance en ligne réservée reçoit un événement Calendar, un lien Meet unique et des invitations au parent et au tuteur.
2. Une séance en personne ne déclenche pas de création Meet.
3. Une réservation payante crée un Checkout Stripe unique, avec échéance à une heure.
4. Un succès Stripe met le paiement et les crédits à jour exactement une fois.
5. Une expiration Stripe libère la séance liée, annule l'événement Calendar et rend son créneau disponible.
6. Une expiration de forfait marque le paiement en retard sans annuler de séance non liée.
7. Le portail parent et le portail tuteur n'exposent le lien Meet que pour la séance autorisée.
8. Les tests couvrent le succès, l'expiration, l'idempotence, le refus de calendrier non prêt et les libellés français/anglais.

