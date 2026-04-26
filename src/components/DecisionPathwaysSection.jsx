import { Link } from "react-router-dom"
import { ArrowRight, CalendarDays, Phone } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { getLocalizedPath } from "@/lib/i18n"
import { siteConfig } from "@/lib/seo"

const copyByLocale = {
  fr: {
    eyebrow: "Le bon prochain pas",
    title: "Parents, voici le chemin le plus simple selon votre situation",
    description:
      "Le site ne force pas un seul parcours. Il vous aide \u00E0 choisir l'\u00E9tape la plus logique pour avancer vite et sereinement.",
    cards: [
      {
        badge: "Besoin urgent",
        title: "Un examen approche ou la situation est pressante",
        description:
          "Quand le temps compte, le plus simple est souvent d'appeler pour cadrer la mati\u00E8re, l'urgence et la meilleure suite. Si le besoin ponctuel est d\u00E9j\u00E0 tr\u00E8s clair, la r\u00E9servation directe reste possible juste apr\u00E8s.",
        bullets: ["Priorit\u00E9s cibl\u00E9es rapidement", "Bloc intensif possible", "Premier cadrage imm\u00E9diat"],
        action: "phone",
        cta: "Appeler maintenant",
      },
      {
        badge: "Suivi durable",
        title: "Vous voulez une progression stable semaine apr\u00E8s semaine",
        description:
          "Si l'objectif est de consolider la m\u00E9thode et de garder un cap clair pendant l'ann\u00E9e, le mieux est d'appeler d'abord pour cadrer le vrai rythme et le bon format.",
        bullets: ["Cr\u00E9neau r\u00E9gulier", "Suivi plus stable", "Id\u00E9al pendant l'ann\u00E9e"],
        action: "phone",
        cta: "Appeler pour discuter",
      },
      {
        badge: "Situation \u00E0 clarifier",
        title: "Vous h\u00E9sitez encore entre le niveau, la mati\u00E8re ou le format",
        description:
          "Quand tout n'est pas encore clair, le meilleur r\u00E9flexe est d'envoyer la situation pour \u00EAtre orient\u00E9 vers le bon accompagnement.",
        bullets: ["Maths ou sciences", "En ligne ou pr\u00E9sentiel", "Bon profil plus vite"],
        action: "contact",
        cta: "D\u00E9crire la situation",
      },
    ],
  },
  en: {
    eyebrow: "Choose the next step",
    title: "Parents, here is the simplest path based on your situation",
    description:
      "The site does not force one single route. It helps you pick the most logical next step so you can move forward quickly and calmly.",
    cards: [
      {
        badge: "Urgent need",
        title: "An exam is close or the situation feels time-sensitive",
        description:
          "When timing matters, the simplest move is often a call to frame the subject, urgency and the best next step right away. If the one-time need is already very clear, direct booking can still happen right after.",
        bullets: ["Fast priority setting", "Intensive support possible", "Immediate first framing"],
        action: "phone",
        cta: "Call now",
      },
      {
        badge: "Steady progress",
        title: "You want stable progress from week to week",
        description:
          "If the goal is to build method and keep a clear direction through the school year, calling first is the better move so the right rhythm and format can be discussed.",
        bullets: ["Recurring time slot", "More stable follow-up", "Ideal during the school year"],
        action: "phone",
        cta: "Call to discuss",
      },
      {
        badge: "Need guidance",
        title: "You are still unsure about the subject, level or format",
        description:
          "When things are not fully clear yet, the best move is to send the situation so the right support can be recommended quickly.",
        bullets: ["Math or science", "Online or in person", "Better match faster"],
        action: "contact",
        cta: "Describe the situation",
      },
    ],
  },
}

export default function DecisionPathwaysSection({ locale = "fr", className = "pt-20" }) {
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

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {copy.cards.map((card) => (
          <MotionCard
            key={card.title}
            className="rounded-[30px] border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(8,26,56,0.88))] p-7 text-white"
          >
            <div className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm text-white/85">
              {card.badge}
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/72">{card.description}</p>

            <ul className="mt-6 space-y-3 text-sm text-white/78">
              {card.bullets.map((bullet) => (
                <li key={bullet} className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3">
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8">{renderAction(card, locale)}</div>
          </MotionCard>
        ))}
      </div>
    </section>
  )
}

function renderAction(card, locale) {
  if (card.action === "phone") {
    return (
      <Button asChild className="w-full rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
        <a href={`tel:${siteConfig.phone}`}>
          <Phone className="h-4 w-4" />
          {card.cta}
        </a>
      </Button>
    )
  }

  if (card.action === "book") {
    return (
      <Button
        asChild
        variant="outline"
        className="w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
      >
        <a href={BOOKING_URL} target="_blank" rel="noreferrer">
          <CalendarDays className="h-4 w-4" />
          {card.cta}
        </a>
      </Button>
    )
  }

  return (
    <Button
      asChild
      variant="outline"
      className="w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
    >
      <Link to={`${getLocalizedPath("home", locale)}#contact`}>
        {card.cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  )
}
