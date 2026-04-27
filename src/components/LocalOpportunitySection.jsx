import { Link } from "react-router-dom"
import { ArrowRight, FlaskConical, MapPin, ShieldCheck, SunMedium } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { getLocalizedPath } from "@/lib/i18n"

const iconMap = {
  support: ShieldCheck,
  physics: FlaskConical,
  chemistry: FlaskConical,
  summer: SunMedium,
}

const copyByLocale = {
  fr: {
    eyebrow: "Intentions locales et saisonnières",
    title: "Quatre portes d'entrée SEO plus rentables que des mots-clés jetés partout",
    description:
      "Ces pages servent des recherches plus proches du moment où un parent appelle vraiment: soutien scolaire à Montréal, physique à Montréal, chimie à Laval et besoin d'été au secondaire.",
    cards: [
      {
        icon: "support",
        routeKey: "academicSupportMontreal",
        badge: "Montréal",
        title: "Soutien scolaire Montréal",
        description:
          "Pour les familles qui cherchent une vue plus large que du simple devoir ou une seule matière.",
        cta: "Voir soutien scolaire Montréal",
      },
      {
        icon: "physics",
        routeKey: "physicsTutorMontreal",
        badge: "Montréal",
        title: "Tuteur physique Montréal",
        description:
          "Pour une intention plus précise autour des formules, des unités, des problèmes et des examens de physique.",
        cta: "Voir tuteur physique Montréal",
      },
      {
        icon: "chemistry",
        routeKey: "chemistryHelpLaval",
        badge: "Laval",
        title: "Aide chimie Laval",
        description:
          "Pour les recherches plus ciblées autour de la chimie, des calculs, des équations et du secondaire 5.",
        cta: "Voir aide chimie Laval",
      },
      {
        icon: "summer",
        routeKey: "summerSupportSecondary",
        badge: "Été",
        title: "Cours d'été secondaire",
        description:
          "Pour les familles qui veulent utiliser l'été pour remettre une matière en ordre avant la rentrée.",
        cta: "Voir la page cours d'été",
      },
    ],
  },
  en: {
    eyebrow: "Local and seasonal intent",
    title: "Four SEO entry points that are stronger than scattering more keywords around",
    description:
      "These pages target searches that sit closer to the moment a parent actually calls: academic support in Montreal, physics in Montreal, chemistry in Laval and summer support at the high school level.",
    cards: [
      {
        icon: "support",
        routeKey: "academicSupportMontreal",
        badge: "Montreal",
        title: "Montreal academic support",
        description:
          "For families who need a wider view than one assignment or one isolated subject problem.",
        cta: "See Montreal academic support",
      },
      {
        icon: "physics",
        routeKey: "physicsTutorMontreal",
        badge: "Montreal",
        title: "Montreal physics tutor",
        description:
          "For a sharper search intent around formulas, units, problem solving and physics exams.",
        cta: "See Montreal physics tutor",
      },
      {
        icon: "chemistry",
        routeKey: "chemistryHelpLaval",
        badge: "Laval",
        title: "Laval chemistry help",
        description:
          "For more targeted chemistry searches around calculations, equations and Secondary 5 support.",
        cta: "See Laval chemistry help",
      },
      {
        icon: "summer",
        routeKey: "summerSupportSecondary",
        badge: "Summer",
        title: "High school summer support",
        description:
          "For families who want to use the summer to reset one subject before September.",
        cta: "See high school summer support",
      },
    ],
  },
}

export default function LocalOpportunitySection({ locale = "fr", className = "pt-20" }) {
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

      <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
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
              <div className="mt-5 flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-white/45">
                <MapPin className="h-4 w-4 text-[#f5c977]" />
                {card.badge}
              </div>
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
