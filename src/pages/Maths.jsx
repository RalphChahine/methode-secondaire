import { Link } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  NotebookPen,
  Target,
  TrendingUp,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { siteConfig } from "@/lib/seo"

const modules = [
  {
    icon: Calculator,
    title: "Algèbre et équations",
    description: "Retrouver une méthode fiable pour isoler, vérifier et résoudre sans se perdre en route.",
  },
  {
    icon: TrendingUp,
    title: "Fonctions et graphes",
    description: "Lire, relier et interpréter les représentations pour rendre les exercices beaucoup plus clairs.",
  },
  {
    icon: Target,
    title: "Géométrie et trigonométrie",
    description: "Comprendre les relations, les formules et la logique qui relie les figures aux calculs.",
  },
  {
    icon: NotebookPen,
    title: "Préparation d'examens",
    description: "Révision structurée, exercices ciblés et stratégie de résolution pour les évaluations importantes.",
  },
]

const gains = [
  "Lire la question avec beaucoup moins d'hésitation.",
  "Choisir la bonne démarche avant de se lancer.",
  "Éviter les erreurs récurrentes qui coûtent des points.",
]

const approach = [
  {
    title: "Clarifier la logique",
    description: "On remet les notions en ordre pour que les symboles aient enfin du sens.",
  },
  {
    title: "S'entraîner sur l'essentiel",
    description: "On pratique sur des formats d'exercices qui reviennent vraiment en devoir et en examen.",
  },
  {
    title: "Ancrer une méthode",
    description: "L'élève repart avec une procédure qu'il peut réutiliser seul la prochaine fois.",
  },
]

const mathsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tutorat de mathématiques au secondaire",
  provider: {
    "@type": "EducationalOrganization",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Québec" },
    { "@type": "City", name: "Montréal" },
    { "@type": "City", name: "Laval" },
  ],
  serviceType: "Tutorat privé de mathématiques pour le secondaire 1 à 5",
}

export default function Maths() {
  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Tutorat de maths au secondaire | Méthode Secondaire"
        description="Tutorat de mathématiques au secondaire 1 à 5 au Québec. Algèbre, fonctions, géométrie, trigonométrie et examens avec une méthode claire."
        path="/maths"
        keywords="tutorat maths secondaire, cours privés maths Québec, aide devoirs maths secondaire, préparation examen maths secondaire"
        jsonLd={mathsSchema}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[#f5c977]/14 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              Mathématiques • Secondaire 1 à 5
            </Badge>

            <h1 className="balanced-copy mt-7 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
              Les maths peuvent redevenir nettes,
              <span className="text-shine"> même quand elles semblent déjà perdues.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Ici, on ne saute pas directement à la réponse. On reconstruit la logique, on pratique
              la bonne démarche et on fait baisser le stress qui vient avec les questions de maths.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Réserver un cours de maths
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/#contact">Poser une question</Link>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-white/45">Ce qu'on travaille vite</div>
            <div className="mt-3 font-display text-3xl font-semibold">Plus de méthode, moins de panique</div>

            <ul className="mt-6 space-y-4">
              {gains.map((gain) => (
                <li key={gain} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  <span className="text-sm leading-7 text-white/78">{gain}</span>
                </li>
              ))}
            </ul>
          </MotionCard>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow="Contenu couvert"
            title="Les grands blocs où un accompagnement fait une vraie différence"
            description="Le suivi est pensé pour aider autant sur les bases que sur les chapitres qui deviennent plus abstraits en montant au secondaire."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((module) => (
              <MotionCard key={module.title} className="rounded-[28px] border-white/10 bg-[#091a3a]/85 p-6 text-white">
                <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                  <module.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold">{module.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{module.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow="Approche"
            title="Trois étapes pour remettre les maths à leur place"
            description="On cherche toujours à rendre la matière plus lisible, plus logique et plus réutilisable d'une séance à l'autre."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {approach.map((step, index) => (
              <MotionCard key={step.title} className="glass-panel rounded-[30px] border-white/10 bg-white/[0.04] p-7 text-white">
                <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">Étape 0{index + 1}</div>
                <h2 className="mt-4 font-display text-3xl font-semibold">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{step.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                Suivi ponctuel ou hebdomadaire
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">
                Quand les maths deviennent plus simples à lire, elles deviennent aussi plus simples à réussir.
              </h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">
                Si la matière a commencé à s'accumuler ou qu'un examen approche, on peut repartir avec une
                stratégie claire très vite.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Réserver maintenant
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/">Retour à l'accueil</Link>
                </Button>
              </div>
            </div>
          </MotionCard>
        </section>
      </main>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{eyebrow}</div>
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description}</p>
    </div>
  )
}
