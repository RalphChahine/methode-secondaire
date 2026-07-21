# Checklist onboarding tuteur

Objectif: aucun tuteur ne prend un eleve avant d'etre clair sur la methode, l'horaire, les suivis et le paiement.

## Avant le premier eleve

- Profil ajoute dans `Tutor Roster`.
- Disponibilites ajoutees dans `Tutor Availability`.
- Matieres et niveaux confirmes.
- Capacite hebdomadaire confirmee.
- Tarif et conditions de paiement confirmes : base de 28 $ CAD/h, puis ajustement possible selon l'experience et le role.
- Email calendrier confirme.
- Format accepte: en ligne, presentiel ou les deux.
- Zones de presentiel confirmees si applicable.

## Cadre de service

- Le tuteur confirme chaque seance avant qu'elle soit promise au parent.
- Le tuteur envoie une note apres chaque seance dans les 12 h.
- Le tuteur signale vite si le fit n'est pas bon.
- Aucun changement d'horaire recurrent sans validation.
- Le paiement tuteur suit la regle dans `payments-template.csv` et `scheduling-and-payments.md`.

## Note apres seance obligatoire

Le tuteur utilise `templates/tutor-session-note.md`.

La note sert a trois choses:

- rassurer le parent;
- detecter les risques avant qu'ils deviennent des problemes;
- ameliorer le matching et les offres.

## Feu vert

Le tuteur peut recevoir un nouvel eleve quand:

- `status = active`;
- `available_slots > 0`;
- les disponibilites sont recentes;
- la checklist ci-dessus est complete.
