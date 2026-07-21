import { Link } from "react-router-dom"
import { ArrowRight, CalendarDays, LineChart, Target } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { getLocalizedPath } from "@/lib/i18n"

const iconMap = { targeted: Target, momentum: CalendarDays, progression: LineChart }
const copyByLocale = {
  fr: {
    eyebrow: "Parcours selon votre situation",
    title: "Trois formats pour le bon prochain pas",
    description: "Choisissez selon la situation; l'équipe confirme la cadence après le jumelage et aucun format ne se renouvelle automatiquement.",
    cards: [
      { icon: "targeted", offerCode: "targeted_session", badge: "Une priorité concrète", title: "Séance ciblée", description: "Pour travailler une priorité concrète.", bullets: ["Un seul chapitre, devoir ou blocage", "Un départ clair sans engagement récurrent"], cta: "Demander une séance ciblée" },
      { icon: "momentum", offerCode: "momentum_block", badge: "Reprendre l'élan", title: "Bloc d'élan", description: "Pour reprendre l'élan pendant environ un mois.", bullets: ["Un rythme court pour retrouver confiance", "La cadence est confirmée après le jumelage"], cta: "Demander le bloc d'élan" },
      { icon: "progression", offerCode: "progression_block", badge: "Une difficulté qui revient", title: "Bloc de progression", description: "Pour une difficulté récurrente ou une structure scolaire durable.", bullets: ["Une continuité pour consolider ce qui revient", "Aucun renouvellement automatique"], cta: "Demander le bloc de progression" },
    ],
  },
  en: {
    eyebrow: "Paths by situation",
    title: "Three formats for the right next step",
    description: "Choose by situation; the team confirms cadence after matching and no format renews automatically.",
    cards: [
      { icon: "targeted", offerCode: "targeted_session", badge: "One concrete priority", title: "Targeted session", description: "For one concrete priority.", bullets: ["One chapter, assignment, or blocker", "A clear start with no recurring commitment"], cta: "Request a Targeted session" },
      { icon: "momentum", offerCode: "momentum_block", badge: "Regain momentum", title: "Momentum block", description: "To regain momentum over roughly one month.", bullets: ["A short rhythm to rebuild confidence", "Cadence is confirmed after matching"], cta: "Request the Momentum block" },
      { icon: "progression", offerCode: "progression_block", badge: "A recurring difficulty", title: "Progress block", description: "For a recurring difficulty or lasting academic structure.", bullets: ["Continuity to consolidate what keeps returning", "No automatic renewal"], cta: "Request the Progress block" },
    ],
  },
}

export default function OfferPathwaysSection({ locale = "fr", className = "pt-20", heading, description }) {
  const copy = copyByLocale[locale] || copyByLocale.fr
  return <section className={className}>
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{heading?.eyebrow || copy.eyebrow}</div>
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">{heading?.title || copy.title}</h2>
      <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description || copy.description}</p>
    </div>
    <div className="mt-8 grid gap-4 lg:grid-cols-3">
      {copy.cards.map((card) => {
        const Icon = iconMap[card.icon]
        return <MotionCard key={card.offerCode} className="glass-panel rounded-[32px] border-white/10 bg-white/[0.04] p-7 text-white">
          <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]"><Icon className="h-5 w-5" /></div>
          <div className="mt-5 text-sm uppercase tracking-[0.22em] text-white/45">{card.badge}</div>
          <h3 className="mt-3 font-display text-3xl font-semibold">{card.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/72">{card.description}</p>
          <div className="mt-6 space-y-3 text-sm text-white/80">{card.bullets.map((bullet) => <div key={bullet} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />{bullet}</div>)}</div>
          <Button asChild variant="outline" className="mt-8 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"><Link to={`${getLocalizedPath("request", locale)}?offer=${card.offerCode}`}>{card.cta}<ArrowRight className="h-4 w-4" /></Link></Button>
        </MotionCard>
      })}
    </div>
  </section>
}
