# Demande de paiement — Bloc de progression

Ce fichier conserve son nom historique pour la compatibilité de processus externes. Il sert uniquement au **Bloc de progression** : 10 séances de 60 minutes à 600 $, en deux paiements de 300 $. Il ne décrit pas une offre hebdomadaire ni un abonnement.

Utiliser ce message après le jumelage du tuteur et la création de l'inscription `PLAN-PACK10-600` en attente. Envoyer **un seul** versement à la fois.

Bonjour [NOM_PARENT],

Nous avons confirmé le tuteur et un créneau réaliste pour le Bloc de progression de [PRENOM_ELEVE]. Voici le lien sécurisé pour le [VERSEMENT 1 DE 2 — DÉBUT / VERSEMENT 2 DE 2 — MI-PARCOURS] :

[LIEN_PAIEMENT]

- Bloc : **10 séances de 60 minutes · 600 $ CAD au total**
- Montant de ce versement : **300 $ CAD**
- Renouvellement automatique : **aucun**

Après vérification du [PREMIER / DEUXIÈME] paiement, le suivi accorde [LES 5 PREMIERS / LES 5 DERNIERS] crédits du bloc. Un rythme hebdomadaire ou aux deux semaines peut être choisi ensuite avec le tuteur; c'est seulement une préférence d'horaire.

Pour modifier ou reporter une séance, prévenez-nous au moins 72 h à l'avance : le report est garanti. Sous ce délai, écrivez-nous; l'équipe cherchera une solution selon les disponibilités, sans perte automatique de crédit.

Merci,

Méthode Secondaire

## Vérification interne avant envoi

- Le tuteur et le créneau sont réalistes et confirmés; l'offre est `progression_block`.
- L'inscription `PLAN-PACK10-600` est `pending` avant le premier paiement.
- Utiliser `progression_block_payment_1` à 300 $ au début ou `progression_block_payment_2` à 300 $ à mi-parcours.
- La demande `Payments` correspond au bon versement; aucun crédit n'est accordé avant son paiement vérifié.
- Après vérification, le système accorde 5 crédits avec une raison traçable. Ne jamais créer de débit ni de renouvellement automatique après la 10e séance.
