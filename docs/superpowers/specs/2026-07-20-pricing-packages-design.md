# Forfaits de tutorat clairs et progressifs

**Statut :** conception approuvée
**Priorité :** rendre le choix d'un accompagnement immédiatement compréhensible pour les parents, sans transformer le tutorat en abonnement

## Décision produit

Le rythme hebdomadaire n'est plus une offre ni un prix. Il est une cadence possible, choisie après le jumelage avec le tuteur et adaptable aux besoins de la famille.

Le site présente trois formats, du besoin ponctuel à la continuité. La réduction par séance est visible et augmente avec l'engagement : 65 $, puis 62,50 $, puis 60 $. Aucun format ne se renouvelle automatiquement.

| Identifiant | Libellé français | Libellé anglais | Contenu | Prix CAD |
| --- | --- | --- | --- | --- |
| `targeted_session` | Séance ciblée | Targeted session | 1 séance de 60 min | 65 $ |
| `momentum_block` | Bloc d'élan | Momentum block | 4 séances de 60 min | 250 $ · 62,50 $/séance |
| `progression_block` | Bloc de progression | Progress block | 10 séances de 60 min | 600 $ · 60 $/séance |

Le nom « Séance Déclic » disparaît des offres, formulaires, réponses de l'assistant et du portail. Il pourra rester employé occasionnellement comme verbe ou bénéfice (« débloquer une notion »), jamais comme nom de produit.

## Expérience publique

La section prix est française par défaut et son contenu anglais est un miroir complet. Chaque carte répond d'abord à une situation concrète, puis affiche un prix compréhensible :

1. **Séance ciblée — 65 $** : « Une priorité claire : devoir, chapitre ou examen. » Le prix affiché est 65 $ pour 60 minutes.
2. **Bloc d'élan — 62,50 $ par séance** : « Pour reprendre le fil pendant environ un mois. » Le total de 250 $ pour 4 séances apparaît juste sous le prix unitaire.
3. **Bloc de progression — 60 $ par séance** : « Pour une difficulté qui revient ou une progression à installer. » Le total de 600 $ pour 10 séances et les deux paiements de 300 $ apparaissent sous le prix unitaire.

Un court repère précède les cartes : « Plus le bloc est long, moins chaque séance coûte cher. » Les libellés anglais suivent la même hiérarchie : *The longer the block, the lower the session price.*

Le bouton de chaque format dit « Demander ce format » / « Request this format ». Il ouvre la demande existante avec le format souhaité prérempli. Le choix reste une indication pour l'équipe : aucun compte, paiement ou engagement ne se produit avant la confirmation du tuteur et du créneau.

Les textes ne promettent jamais une séance chaque semaine. Ils expliquent qu'un créneau hebdomadaire peut être convenu après le jumelage lorsque cela aide l'élève et convient à la famille.

## Paiement, crédits et parcours parent

Après le jumelage et la confirmation du créneau, l'équipe applique le format choisi :

- la séance ciblée conserve le paiement d'une seule séance à 65 $;
- le bloc d'élan est un paiement unique de 250 $, qui rend 4 crédits disponibles après vérification du paiement;
- le bloc de progression conserve ses deux paiements de 300 $. Les 5 premiers crédits sont activés après le premier paiement, puis les 5 suivants après le second.

Le portail affiche le nom, le prix total, le prix par séance et les crédits correspondant au bloc réellement acheté. Il ne désigne plus un plan comme « hebdomadaire » et ne propose pas de renouvellement automatique.

La réservation instantanée avec tuteur jumelé reste indépendante du choix commercial : elle ne peut employer qu'un crédit disponible ou une séance dont le paiement est confirmé. Une cadence hebdomadaire reste une préférence de planification, jamais une facturation récurrente.

## Structure technique

`src/lib/pricing.js` demeure la source unique des prix, durées, nombres de crédits et modalités de paiement. Il expose les trois identifiants de format ci-dessus et des informations de présentation par langue. Les noms historiques peuvent rester comme alias temporaires seulement là où ils évitent une rupture de données ou de route; aucun nouveau texte ni nouveau flux ne les utilise.

Les composants de prix, les pages de demande, l'assistant, les pages d'offres, les messages de confirmation et le portail lisent cette source plutôt que de recopier des montants. Le CRM reçoit le nouvel identifiant de format, le montant attendu, le nombre de crédits et l'échéancier de paiement. Les inscriptions existantes au bloc de 10 séances restent valides et gardent leurs crédits déjà attribués.

La route historique `/suivi-hebdomadaire` reste accessible afin de ne pas casser les liens et le référencement, mais son contenu et son titre présentent le **Bloc de progression**. Sa route anglaise conserve la même compatibilité.

## États et erreurs

| Situation | Comportement attendu |
| --- | --- |
| Parent choisit un format | La demande conserve son identifiant et son texte bilingue; aucune facturation n'est déclenchée. |
| Paiement du bloc d'élan vérifié | Exactement 4 crédits sont disponibles. |
| Premier ou second paiement du bloc de progression vérifié | Exactement 5 crédits supplémentaires sont ajoutés, une seule fois par paiement. |
| Crédit épuisé ou paiement requis | Le portail l'indique clairement et n'autorise pas une réservation non couverte. |
| Ancienne inscription de 10 séances | Les crédits, paiements et affichages existants restent utilisables; aucune migration silencieuse ne modifie son historique. |
| Cadence modifiée ou mise sur pause | Seuls les créneaux futurs changent; le prix et le nombre de crédits du bloc ne changent pas. |

## Mesure et vérification

La livraison mesure l'affichage de chaque carte, la sélection d'un format et l'envoi de la demande, sans données scolaires supplémentaires. Elle vérifie au minimum :

1. les trois formats affichent les montants, réductions et durées exacts en français et en anglais;
2. le prix par séance est plus visible que le total pour les deux blocs, tout en gardant le total et les paiements transparents;
3. aucun parcours public ne présente « hebdomadaire » comme un abonnement ou un produit;
4. les demandes, paiements et crédits conservent le bon identifiant de format;
5. le bloc d'élan ajoute 4 crédits une seule fois après paiement confirmé;
6. le bloc de progression ajoute deux groupes distincts de 5 crédits sans doublon;
7. les anciennes données du bloc de 10 séances restent consultables et réservables selon leurs règles actuelles;
8. les routes historiques continuent de fonctionner;
9. `npm.cmd run test:site` réussit, avec des tests ciblés pour les prix, les crédits et les états de paiement.

## Hors périmètre

Cette décision ne crée ni abonnement mensuel, ni débit automatique, ni tarif distinct pour une séance hebdomadaire, ni réduction rétroactive pour les clients existants. Elle ne change pas le modèle de jumelage ni les règles de réservation instantanée définies séparément.
