import { Link } from "react-router-dom"
import { ArrowRight, CalendarDays, LineChart, Target } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { getLocalizedPath } from "@/lib/i18n"

const iconMap = {
  sprint: Target,
  weekly: LineChart,
}

const copyByLocale = {
  fr: {
    eyebrow: "Parcours selon votre situation",
    title: "Deux repères pour choisir le bon prochain pas",
    description:
      "Ces deux parcours aident une famille à distinguer une urgence d'examen d'un besoin qui se répète et mérite un accompagnement plus continu.",
    cards: [
      {
        icon: "sprint",
        routeKey: "examSprint",
        badge: "Besoin ponctuel ou urgent",
        title: "Sprint examen",
        description:
          "A pousser quand un examen approche, que la revision manque d'ordre et qu'il faut clarifier vite les priorites.",
        bullets: [
          "Tres pertinent avant evaluation ou ministeriel",
          "Compatible avec une demande de séance si le besoin est déjà clair",
          "Bon pont entre les pages ressources et un vrai lead rapide",
        ],
        cta: "Voir le Sprint examen",
      },
      {
        icon: "weekly",
        routeKey: "weeklyFollowUp",
        badge: "Une priorité qui revient",
        title: "Bloc de progression — 10 séances",
        description:
          "À envisager quand les notions s'accumulent ou que le stress revient. Après le jumelage, un rythme hebdomadaire peut être proposé s'il aide vraiment.",
        bullets: [
          "10 séances de 60 minutes pour consolider la priorité",
          "Un rythme hebdomadaire reste une option, pas un forfait distinct",
          "La courte demande permet de confirmer le tuteur et le bon départ",
        ],
        cta: "Voir le bloc de progression",
      },
    ],
  },
  en: {
    eyebrow: "Paths by situation",
    title: "Two guides to the right next step",
    description:
      "These two paths help a family distinguish an urgent exam need from a recurring need that could benefit from more continuous support.",
    cards: [
      {
        icon: "sprint",
        routeKey: "examSprint",
        badge: "One-time or urgent need",
        title: "Exam sprint",
        description:
          "Push this page when an exam is close, the review plan feels messy and the family needs fast clarity on what matters most.",
        bullets: [
          "Strong before tests or ministerial exams",
          "Fits a session request when the need is already clear",
          "A good bridge from resource content into a fast lead",
        ],
        cta: "See the exam sprint",
      },
      {
        icon: "weekly",
        routeKey: "weeklyFollowUp",
        badge: "A priority that keeps returning",
        title: "Progress block",
        description:
          "Consider it when material piles up or stress keeps returning. After matching, a weekly rhythm can be suggested if it genuinely helps.",
        bullets: [
          "10 60-minute sessions to consolidate the priority",
          "A weekly rhythm is an option, not a separate product",
          "The short request lets the team confirm the tutor and right start",
        ],
        cta: "See the progress block",
      },
    ],
  },
}

export default function OfferPathwaysSection({ locale = "fr", className = "pt-20", heading, description }) {
  const copy = copyByLocale[locale] || copyByLocale.fr

  return (
    <section className={className}>
      <div className="max-w-3xl">
        <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
          {heading?.eyebrow || copy.eyebrow}
        </div>
        <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          {heading?.title || copy.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
          {description || copy.description}
        </p>
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
              <div className="mt-5 text-sm uppercase tracking-[0.22em] text-white/45">
                {card.badge}
              </div>
              <h3 className="mt-3 font-display text-3xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{card.description}</p>

              <div className="mt-6 space-y-3 text-sm text-white/80">
                {card.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {bullet}
                  </div>
                ))}
              </div>

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
