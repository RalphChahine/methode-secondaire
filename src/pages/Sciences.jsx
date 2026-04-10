import { Link } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  FlaskConical,
  Gauge,
  NotebookPen,
  Zap,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { siteConfig } from "@/lib/seo"

const modules = [
  {
    icon: FlaskConical,
    title: "Chimie et réactions",
    description: "Comprendre la matière, les transformations et les calculs sans rester dans le par coeur flou.",
  },
  {
    icon: Gauge,
    title: "Physique et mouvement",
    description: "Relier les formules aux situations concrètes pour que les problèmes deviennent beaucoup plus lisibles.",
  },
  {
    icon: Zap,
    title: "Électricité et énergie",
    description: "Mettre de l'ordre dans les concepts pour mieux suivre les circuits, les grandeurs et les relations.",
  },
  {
    icon: NotebookPen,
    title: "Labos et questions à développement",
    description: "Structurer l'analyse, justifier clairement et éviter les pertes de points sur la rédaction.",
  },
]

const gains = [
  "Voir la logique derrière les formules au lieu de les subir.",
  "Relier les concepts aux schémas, unités et situations concrètes.",
  "Répondre plus clairement aux questions d'examen et de labo.",
]

const approach = [
  {
    title: "Visualiser les concepts",
    description: "On simplifie les phénomènes avec des schémas, des comparaisons et des repères faciles à retenir.",
  },
  {
    title: "Relier les notions",
    description: "On montre comment les concepts, les unités et les formules se tiennent entre eux.",
  },
  {
    title: "Appliquer avec précision",
    description: "On pratique sur les bons formats de questions pour rendre la résolution plus naturelle.",
  },
]

const sciencesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tutorat de sciences au secondaire",
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
  serviceType: "Tutorat privé de sciences pour le secondaire 1 à 5",
}

export default function Sciences() {
  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Tutorat de sciences au secondaire | Méthode Secondaire"
        description="Tutorat de sciences au secondaire 1 à 5 au Québec. Physique, chimie, électricité, labos et préparation d'examens avec une méthode claire."
        path="/sciences"
        keywords="tutorat sciences secondaire, cours privés sciences Québec, aide physique secondaire, aide chimie secondaire, préparation examen sciences"
        jsonLd={sciencesSchema}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-14 top-16 h-72 w-72 rounded-full bg-[#73d6ff]/16 blur-3xl" />
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              Sciences • Secondaire 1 à 5
            </Badge>

            <h1 className="balanced-copy mt-7 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
              La science devient plus simple
              <span className="text-shine"> quand elle devient visuelle, logique et concrète.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              L'objectif n'est pas de mémoriser un bloc de notions sans lien. L'objectif, c'est de faire
              apparaître la logique derrière les phénomènes, les formules et les réponses attendues.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Réserver un cours de sciences
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
            <div className="text-sm uppercase tracking-[0.24em] text-white/45">Ce que le suivi change</div>
            <div className="mt-3 font-display text-3xl font-semibold">Moins de mémorisation brute, plus de compréhension</div>

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
            title="Les blocs où les sciences demandent souvent un vrai accompagnement"
            description="On travaille les chapitres qui se transforment vite en surcharge quand les concepts, les unités et les questions s'empilent."
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
            title="Trois réflexes qui rendent les sciences beaucoup plus lisibles"
            description="On part toujours du même principe: si l'élève voit mieux, relie mieux et applique mieux, la matière devient beaucoup moins lourde."
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
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(115,214,255,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                Pour révision, suivi ou examen
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">
                Quand la logique apparaît, les sciences deviennent beaucoup moins intimidantes.
              </h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">
                Que le besoin soit en chimie, en physique ou en préparation d'évaluation, on peut remettre
                les concepts à leur place rapidement.
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
