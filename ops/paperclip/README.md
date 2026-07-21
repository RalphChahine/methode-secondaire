# Paperclip: amelioration continue

Paperclip est le systeme leger pour ameliorer Methode Secondaire sans construire une grosse plateforme trop tot.

Decision actuelle: ne pas commencer par un portail parent avec creation de compte. On construit d'abord un portail-lite operationnel: CRM, tuteurs, notes apres seance, relances parent et revue hebdomadaire. Quand ce processus tourne bien, le vrai portail devient facile a specifier.

## Sources

- Charte d'autonomie: `autonomy.md`
- Contexte operationnel: `context.md`
- Employes IA: `employees.md`
- Acquisition clients: `client-engine.md`
- Notifications: `notifications.md`
- PC 24/7: `pc-runbook.md`
- CRM live: https://docs.google.com/spreadsheets/d/1u61ysIzly2HHqz2VfyReeLZA9tS5f0Ie1rnD1OV1i60/edit

## Routines Codex actives

- `Paperclip daily business dashboard`: point quotidien sur les leads, seances, notes et paiements.
- `Paperclip tutor pipeline review`: revue capacite tuteurs et risques de matching.
- `Paperclip client scout`: recherche des opportunites publiques et remplit le radar growth.
- `Paperclip content/outreach queue`: prepare les posts et reponses a approuver.
- `Paperclip weekly growth report`: bilan acquisition, angles gagnants et experiences de la semaine suivante.
- `Paperclip parent concierge`: prepare les reponses parents dans Gmail sans envoyer.
- `Paperclip executive progress digest`: notification quotidienne des avancements.
- `Paperclip urgent ops alert`: alerte si un vrai blocage demande action rapide.
- `Paperclip weekly ops review`: revue hebdomadaire des blocages et priorites.
- `Paperclip weekly build sprint`: une petite amelioration autonome, locale et validee quand le risque est faible.
- `Paperclip monthly portal gate`: decision mensuelle sur portail-lite vs vrai portail parent.

## Priorite des 30 prochains jours

1. Remplir le roster tuteurs.
2. Faire passer chaque demande parent dans le CRM.
3. Creer une ligne `Sessions` pour chaque seance proposee ou confirmee.
4. Exiger une ligne `Session Notes` apres chaque seance terminee.
5. Envoyer un message parent quand `parent_update_status = ready_to_send`.
6. Revoir chaque semaine les blocages, les eleves a risque et la capacite tuteur.

## Boucle quotidienne

- Ouvrir `Ops Dashboard`.
- Traiter `Leads to call`.
- Traiter `Ready to match`.
- Verifier `Sessions to confirm`.
- Verifier `Session notes ready`.
- Fermer chaque item avec une prochaine action.

Regle: aucun lead, aucune seance et aucun parent ne doivent rester sans prochain geste clair.

## Boucle apres seance

1. Le tuteur remplit `templates/tutor-session-note.md`.
2. La note est copiee dans `Session Notes`.
3. Si le resume est bon, mettre `parent_update_status = ready_to_send`.
4. Envoyer `templates/parent-session-update.md`.
5. Mettre `parent_update_status = sent`.
6. Si `risk_level = watch` ou `high`, ajouter une action dans `follow_up_owner` et `follow_up_due`.

## Boucle hebdomadaire

Chaque vendredi:

- regarder les eleves `watch` et `high`;
- verifier les tuteurs avec `available_slots = 0`;
- identifier les demandes qui reviennent souvent;
- choisir une seule amelioration site ou ops pour la semaine suivante;
- noter la decision dans ce dossier ou dans le CRM.

## Quand construire le vrai portail parent

Pas avant d'avoir ces signaux:

- 15 a 25 familles actives;
- notes apres seance envoyees regulierement;
- au moins 3 tuteurs actifs;
- questions parent repetitives et previsibles;
- besoin clair de login, historique, paiement ou documents.

Avant ca, le portail risque de ralentir l'entreprise. Le bon premier portail est invisible: une experience parent claire, rapide et suivie.

## Backlog Paperclip

- Page publique qui explique le suivi apres seance.
- Formulaire tuteur pour envoyer la note de seance.
- Automatisation email quand une note est `ready_to_send`.
- Mini tableau parent sans login avec lien prive.
- Portail parent/tuteur avec login email, paiements par lien et notes tuteur: premiere version creee dans `/portail`.
- Vrai portail parent avance avec comptes, Stripe Checkout API et permissions fines apres validation du workflow.
