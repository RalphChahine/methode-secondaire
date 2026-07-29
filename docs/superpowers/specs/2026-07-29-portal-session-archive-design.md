# Portail parent — archives de séances repliables

**Date :** 2026-07-29  
**Statut :** design approuvé pour planification

## Contexte

Dans l’onglet « Séances » du portail parent, les listes « À venir », « Passées » et « Annulées » sont toutes développées. Au fil du temps, les séances terminées et surtout les annulations prennent autant de place que les éléments sur lesquels la famille doit agir.

Les familles doivent pouvoir consulter ces historiques au besoin, sans qu’ils détournent l’attention des prochaines séances.

## Décision

Conserver « À venir » ouvert et rendre « Passées » ainsi que « Annulées » repliables, fermées par défaut.

Chaque section d’archive sera un contrôle de divulgation accessible qui présente :

- l’icône existante ;
- le libellé localisé ;
- le nombre de séances dans la section ;
- un chevron qui reflète visuellement l’état ouvert ou fermé.

Les contenus d’une archive ne sont rendus que lorsque la section est ouverte. Une section dont le compteur est nul n’est pas affichée. Les lignes de séance gardent leur présentation et leurs actions actuelles : en particulier, les bilans et devoirs publiés restent disponibles dans « Passées ».

Les séances sont présentées de la plus récente à la plus ancienne à l’intérieur des sections « Passées » et « Annulées ». La liste « À venir » conserve son ordre chronologique utile.

## Approches écartées

- **Archive unique avec sous-sections :** encore plus compacte, mais demande souvent deux interactions pour atteindre une annulation ou une séance passée.
- **Page Historique distincte :** sépare complètement l’historique, mais ajoute une navigation inutile pour un besoin ponctuel.

Deux accordéons indépendants offrent le meilleur équilibre entre une page courte au chargement et un accès immédiat aux détails.

## Architecture et composants

`ParentPortal` continue de calculer les groupes avec `groupParentSessions(dashboard.sessions)`.

`RecordList` évolue pour accepter un mode d’affichage repliable, sans dupliquer le rendu de `SessionRow` :

- le mode standard est conservé pour « À venir » et « Paiements » ;
- le mode archive reçoit un état initial fermé et affiche le compteur ;
- l’état ouvert/fermé est local au portail, réinitialisé lors d’un nouveau chargement normal de la page.

Le bouton d’en-tête utilise un élément `button`, `aria-expanded` et une association explicite avec la région de contenu. Le focus clavier reste visible et le contrôle garde une cible tactile confortable.

## Flux de données et comportement

1. Le tableau `dashboard.sessions` est séparé en séances à venir, passées et annulées comme aujourd’hui.
2. Les sections passées et annulées sont triées par `start_at` décroissant avant leur rendu.
3. Au chargement, seule la liste à venir est développée ; les archives affichent leurs compteurs.
4. Quand une personne active un en-tête d’archive, la liste concernée apparaît sans modifier les données ni les actions des lignes de séance.
5. Après une annulation ou toute autre sauvegarde, le rafraîchissement du tableau de bord met naturellement à jour les compteurs et les listes.

## Cas limites

- Une archive vide disparaît entièrement : aucune carte vide ni message inutile.
- Une date manquante ou invalide utilise l’ordre déterministe existant sans casser l’affichage.
- Les libellés français et anglais incluent les compteurs avec une formulation lisible par les lecteurs d’écran.
- La fonction ne modifie ni la logique métier des statuts, ni les paiements, ni les permissions de séance.

## Vérification

- Ajouter des tests unitaires pour l’ordre décroissant de l’historique sans changer le regroupement des statuts.
- Mettre à jour le test d’interface statique du portail pour vérifier les deux sections archivées et les attributs d’accessibilité essentiels.
- Lancer la suite de tests du portail ainsi que les vérifications de build/lint existantes.
- Vérifier manuellement le portail parent en format mobile et bureau : ouverture/fermeture, compteur, navigation clavier, bilan d’une séance passée et liste avec beaucoup d’annulations.
