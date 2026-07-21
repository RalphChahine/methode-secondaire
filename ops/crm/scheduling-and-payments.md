# Horaire, prix et paiements

Objectif : confirmer le bon tuteur et un créneau réaliste avant toute demande de paiement, puis utiliser les crédits uniquement après un paiement vérifié.

## Catalogue actif

| Offre | Prix CAD | Paiement | Crédits après paiement vérifié |
| --- | ---: | --- | --- |
| Séance ciblée | 65 $ / 60 min | 1 paiement de 65 $ | Aucun crédit : la séance est réglée directement. |
| Bloc d'élan | 4 × 60 min / 250 $ | 1 paiement de 250 $ | 4 crédits, seulement après paiement vérifié. |
| Bloc de progression | 10 × 60 min / 600 $ | 2 paiements de 300 $ | 5 crédits après chaque paiement vérifié. |

Une cadence hebdomadaire ou aux deux semaines est un choix d'horaire convenu **après le jumelage**. Ce n'est ni une offre, ni un abonnement, ni un renouvellement automatique.

## Séquence obligatoire

1. Jumeler le tuteur et confirmer un créneau réaliste avec la famille.
2. Enregistrer l'offre choisie : `targeted_session`, `momentum_block` ou `progression_block`.
3. Pour un bloc, créer l'inscription `pending` et la demande de paiement dans le portail opérateur.
4. Laisser Stripe ou le processus de paiement vérifié accorder automatiquement les crédits associés.
5. Seulement après le jumelage, proposer une cadence hebdomadaire ou aux deux semaines si elle convient à la famille.
6. Ne jamais présenter un bloc comme un abonnement à renouvellement automatique ni accorder de crédits avant la vérification du paiement.

## Quel lien envoyer

| Offre | Lien Stripe canonique | Demande de paiement | Moment d'envoi |
| --- | --- | --- | --- |
| Séance ciblée | `first_session` à 65 $ | `templates/payment-request.md` | Après la confirmation de la séance. |
| Bloc d'élan | `momentum_block_payment_1` à 250 $ | `templates/payment-request.md` | Après le jumelage et la création de l'inscription `PLAN-PACK4-250` en attente. |
| Bloc de progression — premier paiement | `progression_block_payment_1` à 300 $ | `templates/weekly-follow-up-payment-request.md` | Après le jumelage et la création de l'inscription `PLAN-PACK10-600` en attente. |
| Bloc de progression — deuxième paiement | `progression_block_payment_2` à 300 $ | `templates/weekly-follow-up-payment-request.md` | À mi-parcours, après utilisation ou réservation des cinq premiers crédits. |

Le nom `weekly-follow-up-payment-request.md` est un alias de compatibilité pour les processus externes. Son contenu est le modèle du **Bloc de progression**, jamais celui d'un forfait hebdomadaire.

## Onglets CRM concernés

- `Plans` : catalogue, prix, modalités de paiement et crédits.
- `Plan Enrollments` : inscription en attente ou active, liée au parent, à l'élève et au tuteur.
- `Payments` : demande et confirmation de paiement; ne pas marquer `paid` sans preuve vérifiée.
- `Credit Ledger` : journal des crédits accordés, réservés, libérés et consommés; ne jamais modifier un solde sans trace.
- `Sessions` : créneaux explicitement confirmés; une cadence ne remplace jamais la confirmation d'une séance.

## Règles de crédits et d'horaire

- Un paiement Stripe confirmé par webhook signé ou un paiement Interac vérifié est requis avant tout crédit.
- Après le paiement du Bloc d'élan, le système accorde 4 crédits.
- Après chaque paiement du Bloc de progression, le système accorde 5 crédits.
- Une réservation admissible réserve un crédit; une séance complétée le consomme. Si la réservation échoue, le crédit est libéré.
- Ne pas créer de lien par séance pour une séance déjà couverte par le crédit d'un bloc.
- Après la dernière séance d'un bloc, ne créer ni nouveau bloc, ni débit, ni renouvellement : la famille choisit librement la suite.

## Report et suivi

Un avis d'au moins 72 h garantit le report. Sous ce délai, enregistrer la demande pour revue de l'équipe : ne promettre ni remboursement ni perte automatique de crédit. Les paiements, crédits et invitations calendrier restent inchangés jusqu'à la décision documentée de l'équipe.

## Préparation production requise

Ne pas déployer le script Apps Script, ne pas configurer les liens Stripe et ne pas tester un portail authentifié avant cette validation manuelle :

1. Comparer les en-têtes des feuilles de production `Plans`, `Plan Enrollments`, `Payments` et `Credit Ledger` à ceux de la copie de test.
2. Confirmer que la migration de configuration ajoute les nouvelles colonnes sans réordonner ni retirer de valeurs de ligne.
3. Exécuter la migration dans l'environnement autorisé et vérifier les quatre en-têtes après migration.
4. Déployer ensuite la version Apps Script approuvée.
5. En **mode test Stripe**, créer et vérifier les **quatre** liens opérationnels : `first_session` à 65 $, `momentum_block_payment_1` à 250 $, `progression_block_payment_1` à 300 $ et `progression_block_payment_2` à 300 $. Chaque lien doit être un paiement unique en CAD, sans prix récurrent ni renouvellement automatique.
6. En mode test et contre une copie autorisée du CRM, valider le cycle complet : chaque lien ouvre le bon montant; la fin de paiement de test déclenche une réception webhook signée qui marque une seule ligne `Payments` correspondante; la séance ciblée n'accorde aucun crédit; le Bloc d'élan accorde 4 crédits; les étapes initiale et de mi-parcours du Bloc de progression accordent chacune 5 crédits. Vérifier les écritures `Credit Ledger`, l'absence de double attribution et la réservation d'une séance couverte par crédit.
7. Après la validation de test, créer les quatre liens Stripe de production avec les mêmes montants et identifiants opérationnels, puis réaliser un parcours authentifié de production contrôlé : inscription en attente, paiement vérifié, attribution de crédits et réservation de séance pour chaque bloc.

Les étapes ci-dessus restent un prérequis externe : elles ne sont pas réalisées depuis ce dépôt.
