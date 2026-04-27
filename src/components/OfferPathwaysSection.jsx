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
    eyebrow: "Formats a choisir",
    title: "Deux pages d'offre a pousser selon le vrai besoin",
    description:
      "Ces deux parcours meritent d'etre visibles partout ou une famille hesite entre un besoin urgent et un vrai suivi semaine apres semaine.",
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
          "Compatible avec une reservation directe si le besoin est deja clair",
          "Bon pont entre les pages ressources et un vrai lead rapide",
        ],
        cta: "Voir le Sprint examen",
      },
      {
        icon: "weekly",
        routeKey: "weeklyFollowUp",
        badge: "Progression durable",
        title: "Suivi hebdomadaire",
        description:
          "A pousser quand le parent sent que les notions s'accumulent, que le stress revient chaque semaine et qu'un rythme stable devient necessaire.",
        bullets: [
          "Ideal pour un cadre plus regulier",
          "Tres bon choix pour secondaire 4 et 5",
          "Le meilleur premier pas reste l'appel avant toute reservation",
        ],
        cta: "Voir le Suivi hebdomadaire",
      },
    ],
  },
  en: {
    eyebrow: "Offer pathways",
    title: "Two offer pages worth pushing based on the real need",
    description:
      "These two paths deserve strong visibility everywhere a family is hesitating between urgent help and steady week-to-week support.",
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
          "Fits direct booking when the need is already clear",
          "A good bridge from resource content into a fast lead",
        ],
        cta: "See the exam sprint",
      },
      {
        icon: "weekly",
        routeKey: "weeklyFollowUp",
        badge: "Longer-term progress",
        title: "Weekly follow-up",
        description:
          "Push this page when the parent feels the material is piling up, stress returns each week and a stable rhythm is becoming necessary.",
        bullets: [
          "Ideal for steadier academic structure",
          "Especially strong for Secondary 4 and 5",
          "The best first move remains a phone call before any booking",
        ],
        cta: "See weekly follow-up",
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
