# Réservation instantanée avec tuteur jumelé

**Statut :** conception approuvée
**Priorité :** améliorer l'opération parent-tuteur avant les autres chantiers du site

## Décision produit

Méthode Secondaire n'est pas une place de marché de tuteurs. Après le jumelage, le parent réserve instantanément un créneau réellement disponible auprès du tuteur attribué à son élève. Le parent ne parcourt pas un annuaire de profils ni ne choisit un tuteur par prix.

Le service conserve une voie explicite de demande de nouveau jumelage. Cette demande est traitée par l'équipe; elle ne modifie jamais silencieusement le tuteur d'un élève ni une séance confirmée.

Le français est la langue de référence. Chaque libellé, état, message d'erreur et notification ajouté à ce flux existe aussi en anglais, avec les routes françaises comme expérience par défaut.

## Expérience parent

1. Dans le portail, le parent sélectionne l'élève concerné lorsqu'il en a plus d'un.
2. Le portail affiche une carte « Votre tuteur » : nom, matières/niveaux pertinents et format offert. Il ne révèle ni les coordonnées privées ni les autres tuteurs.
3. Le parent voit uniquement les créneaux ouverts du tuteur jumelé, sur un calendrier lisible et mobile, avec la durée, le format et le type de séance déjà choisis.
4. Après avoir choisi un créneau, le parent voit un résumé clair, puis un seul bouton de confirmation.
5. Une confirmation réussie affiche immédiatement la séance, le prochain geste de paiement applicable et la confirmation envoyée au parent et au tuteur.
6. Sans tuteur jumelé, sans créneau, ou si le parent souhaite changer de tuteur, le portail explique la situation et propose « Demander un nouveau jumelage ».

## Règles et données

Le CRM et Apps Script restent la source de vérité. Le navigateur n'accepte jamais un créneau sur la base d'une liste mise en cache.

À la confirmation, l'action existante `portal_book_session` vérifie, dans une opération protégée contre les conflits simultanés :

- que le parent, l'élève et le tuteur sont bien liés et que le tuteur est actif;
- que le créneau demandé appartient toujours à une disponibilité active du tuteur;
- qu'il ne chevauche aucune séance déjà réservée ni aucun conflit calendrier connu;
- que le type, la durée et le plan de l'élève autorisent la séance;
- qu'une même demande de confirmation ne peut créer qu'une seule séance.

Si une vérification échoue, aucune séance ni paiement ne sont créés. L'API renvoie un état précis; le portail recharge les créneaux disponibles et garde les informations déjà saisies par le parent.

Après l'écriture réussie, l'automatisation crée ou met à jour l'événement calendrier et envoie les confirmations. Les liens de paiement ordinaires suivent le flux de paiement existant; une séance couverte par un bloc de progression applique ses règles de crédits existantes.

## Interface et structure technique

La vue de réservation du portail est découpée en unités distinctes :

- une carte de tuteur jumelé;
- un sélecteur de créneau accessible au clavier;
- un résumé de réservation avec état de confirmation;
- un état vide/action de nouveau jumelage;
- une couche de traduction française de référence et son miroir anglais.

La page de portail continue de composer ces unités et de rafraîchir le tableau de bord après une mutation. Le client conserve `portalClient.js` comme unique transport vers `/api/portal`; la fonction Vercel reste un proxy borné vers le CRM et ne contient aucune règle métier de réservation.

## États et erreurs

| Situation | Réponse du portail |
| --- | --- |
| Créneau réservé | Confirmation immédiate, tableau de bord rafraîchi et notifications indiquées. |
| Créneau devenu indisponible | Aucun doublon; créneaux rechargés avec un message clair. |
| Pas de tuteur jumelé | État explicatif et demande de nouveau jumelage. |
| Pas de créneau ouvert | État explicatif et demande de disponibilités/nouveau jumelage. |
| Session expirée | Déconnexion contrôlée et retour à la connexion par code. |
| CRM indisponible ou délai dépassé | Aucun état optimiste; message de réessai sans perdre le contexte du parent. |

## Mesure et vérification

Les événements de suivi distinguent l'affichage d'un créneau, le choix d'un créneau, la confirmation réussie, un conflit de créneau et une demande de nouveau jumelage. Ils permettent de mesurer la friction sans collecter de données scolaires supplémentaires.

La livraison vérifie au minimum :

1. le parent ne voit que le tuteur associé à son élève;
2. une réservation valide crée une seule séance confirmée;
3. deux tentatives simultanées pour le même créneau n'en créent qu'une;
4. un créneau périmé ou en conflit est refusé sans modifier les paiements/crédits;
5. les états parent sans jumelage, sans disponibilité et de demande de nouveau jumelage sont utilisables;
6. les textes français et anglais existent pour chaque nouvel état;
7. `npm.cmd run test:site` réussit, avec des tests ciblés du comportement de réservation ajouté.

## Hors périmètre

Ce chantier ne crée pas d'annuaire public de tuteurs, de sélection de tuteur par prix, de paiement récurrent, de téléversement de documents ou de nouvelle application mobile. Ces sujets restent séparés afin que la réservation instantanée soit fiable avant d'élargir le portail.
