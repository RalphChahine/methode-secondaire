# Extension des matières du secondaire et SEO — Design

**Date :** 2026-07-30
**Statut :** approuvé pour la spécification

## Objectif

Étendre Méthode Secondaire au français, à l’anglais et à l’histoire et univers social, tout en gardant les mathématiques et les sciences existantes. La famille doit pouvoir exprimer précisément sa matière dès la demande; l’équipe ne propose ensuite un tuteur et un créneau que si la matière est couverte et qu’une disponibilité réelle existe.

L’extension doit créer de vraies portes d’entrée utiles pour la recherche organique, sans fabriquer des dizaines de pages semblables par niveau, ville ou école.

## Périmètre du lancement

Le lancement ajoute trois matières de service :

- français;
- anglais;
- histoire et univers social.

Les matières déjà offertes restent inchangées : mathématiques, sciences, physique et chimie. L’aide aux devoirs, le rattrapage et la préparation d’examens restent des besoins transversaux, et non de nouvelles matières à faire correspondre.

La culture et citoyenneté québécoise ainsi que l’éducation financière ne sont pas offertes ni indexées à ce stade. Elles pourront être ajoutées seulement lorsqu’un tuteur actif possède la matière et des disponibilités exploitables.

## Expérience publique

### Hub « Matières du secondaire »

Ajouter une page bilingue dédiée :

- français : `/matieres-secondaire`;
- anglais : `/en/high-school-subjects`.

Cette page présente les matières actuellement couvertes sous forme de cartes : mathématiques, sciences, physique, chimie, français, anglais et histoire et univers social. Chaque carte décrit brièvement le besoin auquel elle répond et dirige vers la page de matière appropriée ou vers la demande de jumelage.

Le menu principal reste volontairement compact. Le hub sera accessible depuis les sections pertinentes de l’accueil, le footer, les pages de ressources et les pages de matières, plutôt que d’ajouter un lien de premier niveau qui surchargerait la navigation mobile.

### Pages de matière

Créer trois pages de service bilingues, appuyées sur le modèle de pages d’offres déjà utilisé :

| Clé interne | Route française | Route anglaise |
| --- | --- | --- |
| `frenchTutoringSecondary` | `/tutorat-francais-secondaire` | `/en/high-school-french-tutoring-quebec` |
| `englishTutoringSecondary` | `/tutorat-anglais-secondaire` | `/en/high-school-english-tutoring-quebec` |
| `historySocialStudiesSecondary` | `/tutorat-histoire-univers-social-secondaire` | `/en/high-school-history-social-studies-tutoring-quebec` |

Chaque page possède un texte propre à la matière : difficultés fréquentes, déroulement d’une première séance, résultats pédagogiques réalistes, questions fréquentes et liens vers des ressources pertinentes. Les contenus ne seront pas des variantes mécaniques d’une même page.

Les appels à l’action disent « Demander une séance » ou « Demander un jumelage ». Ils précisent que l’équipe confirme la matière, le tuteur et le créneau après analyse de la demande; aucune page ne promet un tuteur ou une disponibilité instantanée.

## Demande, jumelage et disponibilité

Le formulaire public ajoute les valeurs canoniques suivantes au champ matière :

- `french` — Français;
- `english` — Anglais;
- `history-social-studies` — Histoire et univers social.

Les options actuelles demeurent compatibles. La normalisation des paramètres d’URL et des préremplissages acceptera les synonymes usuels en français et en anglais, puis les convertira vers ces valeurs canoniques avant l’envoi.

Le CRM, le matching et la réservation conservent leur fonctionnement multi-tuteur et multi-matière : un même tuteur peut être assigné à plusieurs matières pour un élève, ou plusieurs tuteurs peuvent couvrir différentes matières du même élève. Une demande nouvellement élargie ne devient réservable que si une affectation compatible existe; le verrouillage des créneaux déjà réservé reste la seule source de vérité pour la disponibilité.

Si aucun tuteur compatible n’est encore disponible, l’équipe reçoit la demande comme piste de recrutement ou de suivi, sans montrer de créneau, de profil ni de promesse au parent.

## Architecture de contenu

Ajouter un module de contenu de matières, indépendant des composants visuels, qui définit pour chaque matière :

- le libellé bilingue, le résumé, les thèmes et les besoins couverts;
- le lien vers sa page de service quand elle existe;
- les liens connexes vers les ressources et les pages existantes;
- l’ordre d’affichage sur le hub;
- les métadonnées de partage et de référencement du hub.

Le catalogue de routes reste la source unique des chemins français et anglais. Les trois nouvelles pages de matière sont ajoutées à la configuration d’offres existante afin de réutiliser le composant `OfferLanding`, sa structure accessible, ses métadonnées et son appel à l’action. Le hub reçoit son propre composant léger et sa propre route; il lit le module de contenu plutôt que de dupliquer ses cartes dans plusieurs pages.

Les listes de matières du formulaire, de l’assistant et des textes généraux liront les mêmes valeurs canoniques. Cela évite de présenter une matière au parent qui ne peut ensuite être transmise ou comprise par le matching.

## SEO et liens internes

Chaque nouvelle route reçoit un titre, une description, une URL canonique et une traduction réciproque. Le mécanisme de pré-rendu existant doit produire le HTML statique des nouvelles pages et du hub, puis les inclure dans le sitemap.

Le maillage interne suit ce chemin :

1. les pages d’accueil, le footer et le hub de ressources mènent vers le hub de matières;
2. le hub mène vers chaque page de matière;
3. chaque page de matière mène vers le hub, les ressources utiles et la demande;
4. les pages de tuteurs et de recrutement restent liées comme preuves de l’approche humaine, sans servir de substitut à une disponibilité en temps réel.

Le balisage structuré représentera les pages comme des services réels et reprendra uniquement les informations visibles dans la page. Les questions fréquentes resteront utiles à la lecture, mais le projet ne dépendra pas des résultats enrichis FAQ pour obtenir du trafic.

Les pages ne seront pas déclinées automatiquement par ville, année scolaire ou école. Une page supplémentaire sera créée seulement lorsqu’elle possède une intention de recherche distincte, une valeur propre pour un parent et une capacité de tutorat correspondante.

## Textes transversaux et assistant

Les mentions globales du service passent de « maths et sciences » à une formulation exacte telle que « les matières principales du secondaire », avec l’énumération appropriée selon le contexte. Les pages spécialisées existantes en maths et sciences gardent leur positionnement ciblé.

L’assistant inclut les trois nouvelles matières dans ses faits de service, ses règles de réponse et la détection des demandes. Il continue de ne jamais inventer une disponibilité, une qualification ou une affectation de tuteur.

## États limites

| Situation | Comportement attendu |
| --- | --- |
| La matière est choisie, mais aucun tuteur n’est encore assigné | La demande est reçue; le parent ne voit pas de créneau ni de promesse de disponibilité. |
| Un préremplissage utilise « histoire », « univers social », « French » ou « English » | Le formulaire convertit la valeur vers la matière canonique correspondante. |
| Une ancienne valeur de matière est reçue | Elle reste supportée; aucune demande existante ne devient invalide. |
| Un lien de page de matière n’a pas de contenu configuré | La route est absente du hub et n’est pas ajoutée au sitemap. |
| Le tuteur perd sa disponibilité après l’affectation | Les règles de réservation existantes bloquent le créneau; le contenu public ne contourne jamais ce verrou. |

## Vérification

La livraison doit couvrir au minimum :

1. les nouvelles routes françaises et anglaises, avec les bons titres, liens canoniques et alternatives de langue;
2. le rendu du hub et de ses cartes, y compris les liens vers les matières existantes et nouvelles;
3. les trois nouvelles configurations d’offres et leur contenu bilingue distinct;
4. les nouvelles options et la normalisation du formulaire, sans régression des matières existantes;
5. les réponses factuelles de l’assistant pour le français, l’anglais et l’histoire et univers social;
6. le pré-rendu, le sitemap et les vérifications statiques existantes;
7. le build de production et les tests ciblés du projet.

## Hors périmètre

- créer une page par ville, niveau, école ou examen pour chaque matière;
- annoncer une matière sans capacité de matching à moyen terme;
- modifier les règles d’autorisation, de paiement, de crédit ou de verrouillage de créneaux;
- afficher publiquement les calendriers ou disponibilités des tuteurs;
- introduire un CMS ou une nouvelle dépendance uniquement pour ces pages de contenu.
