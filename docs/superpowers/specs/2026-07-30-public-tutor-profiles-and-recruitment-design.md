# Profils publics des tuteurs et recrutement — Design

**Date :** 2026-07-30  
**Statut :** approuvé pour la spécification

## Objectif

Présenter les tuteurs avec des profils publics crédibles et bilingues, incluant une photo lorsqu'elle est fournie, sans transformer le service en annuaire de réservation libre. Faire évoluer la page `Devenir tuteur` pour rendre le recrutement et la publication de profil transparents.

## Principes

- Le jumelage reste décidé par l'équipe; le site public ne permet pas à un parent de réserver directement un tuteur.
- Aucun profil, portrait ni renseignement personnel n'est publié sans consentement explicite du tuteur et validation de l'équipe.
- Les données de publication sont séparées du roster interne afin de ne jamais exposer courriel, calendrier, tarif, capacité, notes ou autres détails opérationnels.
- Les contenus des profils sont fournis en français et en anglais.
- Une photo manquante emploie un avatar temporaire identifié comme tel, jamais un faux portrait.

## Modèle de données

Créer la feuille CRM `Tutor Public Profiles`, avec un enregistrement par `tutor_id` du `Tutor Roster` :

- identifiants : `profile_id`, `tutor_id`, `slug`;
- publication : `visibility` (`draft`, `published`, `hidden`), `publication_consent_at`, `published_at`, `updated_at`;
- média : `photo_url`, `photo_alt_fr`, `photo_alt_en`;
- profil : `display_name`, `headline_fr`, `headline_en`, `bio_fr`, `bio_en`, `teaching_style_fr`, `teaching_style_en`;
- spécialités : `subjects`, `levels`, `languages`, `formats`, `zones`.

L'opérateur peut créer, modifier, publier, masquer ou retirer une fiche. Le CRM refuse une publication si :

1. le tuteur n'existe pas ou n'est pas actif;
2. le consentement de publication n'est pas enregistré;
3. le nom affiché, le titre, la bio, au moins une spécialité ou les deux variantes de contenu requises manquent;
4. l'URL de photo présente n'est pas une URL HTTPS valide.

Masquer un profil le retire immédiatement de la réponse publique sans modifier son dossier interne ni ses séances existantes.

## Accès aux données

Une action publique bornée renvoie uniquement les profils actifs et `published`, dans une forme assainie. Elle ne nécessite pas de session portail mais reste relayée par le proxy applicatif; elle ne retourne aucun champ interne.

Le tableau parent reçoit seulement les profils assainis liés aux tuteurs déjà attribués à ses élèves. Il ne reçoit ni l'annuaire complet ni les profils masqués. Les profils ne modifient jamais les règles d'autorisation des attributions ou des créneaux.

## Page publique `Tuteurs`

La page devient une vitrine de profils :

1. introduction expliquant que l'équipe confirme le bon jumelage;
2. grille responsive de cartes présentant photo/avatar, nom affiché, spécialités, niveaux et style pédagogique;
3. panneau de détail accessible pour lire titre, bio, langues, formats et secteurs;
4. appels à l'action vers la demande de jumelage, jamais vers une réservation directe;
5. état éditorial propre s'il n'existe aucun profil publié ou si le chargement ne répond pas.

Les cartes utilisent les données CRM; les anciens profils génériques ne sont pas présentés comme de vraies personnes.

## Portail parent et matching

Une fois une attribution confirmée par l'équipe, le parent voit la carte sécurisée du tuteur correspondant : photo, nom, titre/bio courte et matières réellement assignées à son élève. La même information accompagne le choix de tuteur dans la réservation.

Le parent ne voit pas de photo, bio ni annuaire avant le jumelage. Si un profil devient masqué ou indisponible, le nom et les matières de l'attribution restent suffisants pour réserver; les disponibilités et le verrou anti-conflit restent inchangés.

## Page `Devenir tuteur`

Conserver le formulaire de candidature existant et renforcer la page avec un parcours explicite :

1. candidature;
2. échange et validation pédagogique;
3. ajout au roster et définition des disponibilités;
4. création facultative d'un profil public après consentement.

Le formulaire de candidature ne collecte pas de photo et ne crée aucun profil public automatiquement. Cette séparation protège les candidats et laisse à l'équipe le contrôle éditorial.

## États d'erreur et repli

| Situation | Comportement |
| --- | --- |
| Aucun profil publié | La page conserve son contenu éditorial et invite à demander un jumelage. |
| Image indisponible | Afficher l'avatar temporaire et le nom du tuteur. |
| Réponse publique indisponible | Ne pas empêcher la navigation; afficher l'état de repli sans profils. |
| Profil masqué après une attribution | Le portail conserve la réservation et montre nom + matières sans informations de présentation. |
| Tentative de publication non conforme | Le CRM retourne un code explicite à l'opérateur et n'écrit pas de profil publié. |

## Vérification

La livraison devra tester au minimum :

1. les champs privés du `Tutor Roster` n'apparaissent jamais dans la réponse publique;
2. seul un tuteur actif avec consentement et fiche complète peut être publié;
3. la page publique rend les profils publiés et un repli accessible;
4. le parent ne reçoit que les profils de tuteurs attribués à sa famille;
5. masquer une fiche ne casse ni le jumelage ni la réservation;
6. les textes français et anglais sont complets;
7. le build et les vérifications statiques existantes passent.

## Hors périmètre

- sélection ou réservation directe d'un tuteur depuis la vitrine;
- affichage public de prix, calendriers, courriels ou zones privées;
- import automatique de photos de candidats;
- génération de faux portraits ou affirmations de qualifications non vérifiées;
- modification des disponibilités, des crédits, des paiements ou du verrouillage de réservation.
