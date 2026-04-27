import { Link } from "react-router-dom"
import { ArrowRight, BadgeCheck, GraduationCap } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { getLocalizedPath } from "@/lib/i18n"

const iconMap = {
  ministerial: BadgeCheck,
  transition: GraduationCap,
}

const copyByLocale = {
  fr: {
    eyebrow: "Moments charnières",
    title: "Deux recherches très rentables quand un parent veut agir avant qu'il soit trop tard",
    description:
      "Ces recherches ne ressemblent pas à un simple besoin vague de tutorat. Elles arrivent souvent à un moment concret : un examen du ministère en secondaire 4 ou une entrée au secondaire qui inquiète déjà la famille.",
    cards: [
      {
        icon: "ministerial",
        routeKey: "ministerialExamSec4",
        badge: "Examen",
        title: "Préparation examen ministère secondaire 4",
        description:
          "Pour les familles qui cherchent surtout une révision plus stratégique, souvent en maths, avant une épreuve officielle de 4e secondaire.",
        cta: "Voir la page examen ministère",
      },
      {
        icon: "transition",
        routeKey: "entryToSecondary",
        badge: "Transition",
        title: "Entrée au secondaire",
        description:
          "Pour les parents qui veulent préparer la transition, sécuriser les bases et éviter une rentrée vite brouillée.",
        cta: "Voir la page entrée au secondaire",
      },
    ],
  },
  en: {
    eyebrow: "Milestone moments",
    title: "Two high-value searches that show up when a parent wants to act before things slip",
    description:
      "These searches are not broad tutoring intent. They usually appear around a concrete milestone: a Secondary 4 ministerial exam or a high school transition that already feels sensitive.",
    cards: [
      {
        icon: "ministerial",
        routeKey: "ministerialExamSec4",
        badge: "Exam",
        title: "Secondary 4 ministerial exam prep",
        description:
          "For families mainly looking for a more strategic review plan, often in math, before an official Secondary 4 exam.",
        cta: "See the ministerial exam page",
      },
      {
        icon: "transition",
        routeKey: "entryToSecondary",
        badge: "Transition",
        title: "High school transition support",
        description:
          "For parents who want to prepare the move into high school, secure the basics and avoid a messy first term.",
        cta: "See the transition page",
      },
    ],
  },
}

export default function MilestoneOpportunitySection({ locale = "fr", className = "pt-20" }) {
  const copy = copyByLocale[locale] || copyByLocale.fr

  return (
    <section className={className}>
      <div className="max-w-3xl">
        <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.eyebrow}</div>
        <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          {copy.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{copy.description}</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {copy.cards.map((card) => {
          const Icon = iconMap[card.icon]

          return (
            <MotionCard
              key={card.routeKey}
              className="glass-panel rounded-[32px] border-white/10 bg-white/[0.04] p-7 text-white"
            >
              <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-sm uppercase tracking-[0.22em] text-white/45">{card.badge}</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{card.description}</p>

              <Button
                asChild
                variant="outline"
                className="mt-8 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath(card.routeKey, locale)}>
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </MotionCard>
          )
        })}
      </div>
    </section>
  )
}
