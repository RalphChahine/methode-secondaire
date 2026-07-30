# Paiement à mi-parcours et réservation des crédits — Design

**Date :** 2026-07-29
**Statut :** approuvé pour implémentation

## Objectif

Rendre le Bloc de progression (10 séances, 2 × 300 $) autonome et compréhensible pour le parent : chaque paiement vérifié débloque cinq crédits, les réservations consomment ces crédits de façon atomique, et le deuxième paiement devient proactivement accessible à la quatrième réservation.

## Règles métier

1. Le premier paiement de 300 $ ne débloque les cinq premiers crédits qu’après confirmation Stripe (ou le flux de paiement vérifié équivalent). Un paiement demandé, expiré ou échoué ne donne aucun crédit.
2. Une réservation liée à un bloc actif réserve immédiatement un crédit dans `Credit Ledger`, dans le même verrou que la vérification du créneau. Si l’écriture de la séance échoue, la réservation est libérée.
3. Une séance complétée consomme son crédit réservé. Une annulation ou un report admissible le libère selon la politique des 72 h déjà en vigueur. Aucun crédit ne disparaît automatiquement pour une demande tardive.
4. À partir de quatre crédits réservés ou consommés parmi les cinq premiers, le parent peut demander son second Checkout Stripe de 300 $. Cette demande est idempotente : un Checkout déjà créé est réutilisé au lieu d’en créer un second.
5. Après cinq crédits réservés ou consommés, un sixième créneau est refusé tant que le deuxième paiement n’est pas vérifié. Le backend reste l’autorité : une interface périmée ne peut pas contourner ce contrôle.
6. La confirmation du deuxième paiement crédite exactement cinq crédits supplémentaires, une seule fois, avec le paiement source conservé dans `Credit Ledger`.
7. Il n’y a ni débit automatique, ni renouvellement automatique, ni données de carte conservées dans le portail.

## Expérience parent

Le bloc affiche déjà le solde de crédits. Pour un Bloc de progression actif :

- après quatre réservations/utilisations, une carte explicite apparaît dans le compte parent : « Il reste X crédit(s). Réglez le deuxième paiement de 300 $ avant de réserver une 6e séance. » ;
- le bouton crée ou réutilise le Checkout Stripe du deuxième versement et ouvre l’URL sécurisée ;
- après cinq réservations/utilisations sans deuxième paiement vérifié, la même carte indique que la prochaine réservation est bloquée jusqu’au paiement ;
- le panneau de réservation n’affiche plus un faux prix à la séance : il explique la raison du blocage et renvoie vers le règlement du bloc.

Les parents peuvent seulement ouvrir leur propre Checkout. L’opérateur conserve la même capacité pour assister une famille, et le paiement est toujours vérifié côté serveur avant l’attribution des crédits.

## Implémentation

- `ops/crm/google-apps-script/Code.gs` autorise le rôle `parent` ou `operator` pour une demande de paiement de forfait, puis vérifie l’accès du parent à l’inscription ciblée avant toute lecture ou écriture. La condition `progression_midpoint` passe de cinq à quatre crédits réservés/utilisés.
- `src/pages/Portal.jsx` ajoute une carte de paiement de mi-parcours au `ProgramProgressCard`. Elle n’est rendue que pour `PLAN-PACK10-600`, après quatre réservations/utilisations, et appelle le client existant `createPortalPlanPaymentRequest`.
- Le panneau de réservation reçoit un état explicite de blocage au lieu d’essayer une réservation payante à la séance lorsque le Bloc de progression est à zéro crédit avant le deuxième paiement.
- Les textes français et anglais de la nouvelle carte parent sont dérivés de `pricing.offers.progression_block.installmentPriceCad`; aucun montant 300 $ n’y est codé en dur.
- `scripts/check-static-site.mjs` vérifie les contrats source essentiels : seuil de quatre crédits, accès parent limité à sa propre inscription, appel parent au paiement de mi-parcours, et garde de réservation lorsque le solde est épuisé.

## Hors périmètre

- Débit automatique, carte enregistrée, renouvellement automatique.
- Modification des montants, des crédits accordés, ou de la politique d’annulation de 72 h.
- Envoi d’un courriel proactif : le rappel est dans le portail; l’automatisation courriel pourra être ajoutée séparément avec un modèle et une cadence validés.

## Critères d’acceptation

1. Un parent ayant réservé ou utilisé quatre des cinq premiers crédits voit et peut ouvrir le Checkout du deuxième 300 $.
2. Ce parent ne peut jamais ouvrir le Checkout d’une autre famille.
3. Une demande répétée retourne le Checkout existant plutôt que de créer un second paiement.
4. Après cinq crédits réservés/utilisés et avant la confirmation du second paiement, la sixième réservation est bloquée côté Apps Script; l’interface explique pourquoi.
5. Une confirmation de paiement accorde exactement cinq crédits une seule fois et la réservation suivante utilise un crédit, sans paiement par séance.
6. Les tests de contrat, les tests du portail et le build restent verts.
