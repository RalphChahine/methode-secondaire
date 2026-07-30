# Réservation par tuteur et matières attribuées — Design

**Date :** 2026-07-30
**Statut :** approuvé pour la planification

## Objectif

Permettre à un élève d’avoir plusieurs tuteurs attribués, chacun avec une ou plusieurs matières précises. Pendant une réservation, le parent choisit clairement le tuteur et voit les matières que ce tuteur couvre pour cet élève avant de choisir un créneau.

Exemples pris en charge :

- David — mathématiques et sciences ;
- David — mathématiques, Joanie — sciences.

Une réservation auprès d’un tuteur bloque toujours le créneau de ce tuteur pour toutes ses matières et tous ses élèves.

## Décision de données

Ajouter une collection CRM dédiée `Student Tutor Assignments`, source de vérité des attributions actives. Chaque enregistrement contient :

- `assignment_id` ;
- `parent_email`, `lead_id`, `student_id` et le nom de l’élève ;
- `tutor_id` et un instantané du nom du tuteur ;
- `subjects`, liste explicite des matières attribuées à ce duo élève–tuteur ;
- `status` (`active` ou `inactive`) et les dates d’audit.

Un même tuteur n’a qu’une attribution active par élève, avec toutes ses matières regroupées dans `subjects`. Une même matière peut être attribuée à plus d’un tuteur seulement si l’équipe le configure explicitement.

Les colonnes historiques `assigned_tutor_id` et `assigned_tutor_name` demeurent un repli de compatibilité pour les dossiers existants. Lorsqu’aucune attribution dédiée n’existe, elles continuent de produire une seule option sans matière personnalisée. Les nouvelles attributions et toutes les modifications futures utilisent la collection dédiée.

Chaque séance créée depuis le portail stocke l’`assignment_id` et un instantané des matières attribuées. Cet historique reste lisible si une attribution est plus tard modifiée ou désactivée.

## Expérience de l’équipe

Dans `Famille et compte`, l’équipe gère les attributions depuis la fiche de chaque élève :

1. choisir un tuteur actif ;
2. saisir une ou plusieurs matières ;
3. enregistrer, modifier ou désactiver l’attribution.

Le formulaire empêche les doublons actifs pour le même élève et tuteur. Il ne permet jamais de choisir un tuteur inactif. Les tuteurs et les parents ne peuvent pas modifier ces attributions.

## Expérience parent de réservation

1. Le parent choisit l’élève concerné.
2. Si une seule attribution est possible, le portail l’affiche comme une carte informative sélectionnée. S’il y en a plusieurs, le parent choisit une carte ou un sélecteur intitulé « Tuteur et matières ».
3. Chaque option indique sans ambiguïté le nom du tuteur et ses matières pour cet élève, par exemple « David — Mathématiques, sciences ».
4. Aucun créneau ne s’affiche avant le choix du tuteur lorsque plusieurs attributions existent.
5. Après le choix, le calendrier montre uniquement les créneaux de ce tuteur. Le résumé de réservation répète le tuteur et ses matières avant la confirmation.
6. Le parent ne choisit pas un tuteur dans un annuaire et ne voit jamais les coordonnées privées du tuteur.

Les nouveaux libellés et états existent en français et en anglais.

## Autorisation et disponibilité

Le navigateur soumet l’identifiant de l’attribution choisie avec le créneau, l’élève et le type de séance. Le navigateur ne décide jamais qu’un tuteur est autorisé.

Au chargement du tableau, le CRM retourne uniquement les attributions actives appartenant au parent connecté et les créneaux des tuteurs concernés. Les matières proviennent de l’attribution, pas seulement du profil général du tuteur.

À `portal_book_session`, Apps Script prend le verrou de planification puis :

1. vérifie que l’attribution est active et appartient bien au parent et à l’élève demandés ;
2. vérifie que le tuteur de l’attribution est actif ;
3. reconstruit les créneaux à partir des disponibilités actives du tuteur ;
4. confirme que le créneau demandé appartient encore à ce tuteur et ne chevauche aucune séance non annulée de ce tuteur ;
5. crée la séance et, le cas échéant, réserve le crédit de forfait dans la même section protégée.

Les disponibilités restent attachées au tuteur, non à une matière. Ainsi, une séance de mathématiques réservée avec David empêche immédiatement une réservation de sciences avec David sur le même créneau, peu importe l’élève. Une seconde tentative concurrente ne crée aucune séance ni crédit; elle reçoit `BOOKING_SLOT_UNAVAILABLE`, puis le portail recharge les données.

## Composants et responsabilités

- **Apps Script CRM :** persiste et filtre les attributions, les expose seulement au parent propriétaire, et applique l’autorisation finale ainsi que le verrouillage de créneau.
- **Client portail :** ajoute les actions bornées nécessaires à la gestion opérateur des attributions et transmet seulement l’identifiant d’attribution sélectionné pour la réservation.
- **Parent `BookingPanel` :** sélectionne élève, attribution, puis créneau; il affiche le tuteur et ses matières dans l’option et le récapitulatif.
- **Gestion famille côté opérateur :** présente les attributions existantes et leurs opérations, sans modifier les capacités ou disponibilités du tuteur.

## États d’erreur

| Situation | Réponse du portail |
| --- | --- |
| Élève sans attribution | Explication de jumelage en attente, sans créneau. |
| Attribution désactivée ou inexistante | Le créneau est refusé; le tableau est rafraîchi. |
| Tuteur devenu inactif | Le créneau est refusé; aucun paiement ni crédit n’est créé. |
| Créneau déjà pris, y compris dans une autre matière | `BOOKING_SLOT_UNAVAILABLE`; le calendrier est rechargé. |
| Attribution non liée au parent ou à l’élève | Rejet d’autorisation sans divulguer d’autres données. |

## Vérification

La livraison ajoute des tests qui démontrent au minimum :

1. un élève peut recevoir David pour mathématiques et sciences dans une seule attribution active;
2. un élève peut recevoir David pour mathématiques et Joanie pour sciences dans deux attributions;
3. le parent ne reçoit que ses attributions et voit le nom/matières avant de choisir un créneau;
4. le calendrier est filtré par le tuteur de l’attribution sélectionnée;
5. le CRM refuse une attribution, un tuteur ou un créneau non autorisé;
6. deux réservations au même créneau pour le même tuteur, même sur des matières distinctes, n’en créent qu’une;
7. les crédits de forfait et paiements existants restent atomiques et inchangés;
8. les contrôles ciblés, le build et la vérification statique du site passent.

## Hors périmètre

- Annuaire public ou choix du tuteur par prix.
- Disponibilités distinctes par matière pour un même tuteur.
- Modification de la politique de crédits, de paiements ou d’annulation.
- Mise à jour en masse des attributions historiques; le repli de compatibilité évite de casser les dossiers existants.
