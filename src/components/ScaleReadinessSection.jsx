import { Link } from "react-router-dom"
import { ArrowRight, BadgeCheck, ClipboardList, Clock3, Users } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { getLocalizedPath } from "@/lib/i18n"

const copyByLocale = {
  fr: {
    eyebrow: "Capacité actuelle",
    title: "Petite équipe, démarrage mieux cadré.",
    description:
      "Avec deux tuteurs actifs, le site doit filtrer les bonnes demandes et rassurer vite. On préfère accepter les familles qu'on peut vraiment aider.",
    capacityLabel: "2 tuteurs actifs",
    capacityTitle: "Places suivies avec attention",
    capacityText:
      "On garde une capacité volontairement limitée pour préserver la qualité du jumelage, la clarté des suivis et la stabilité des créneaux.",
    sessionLabel: "Après la première séance",
    sessionTitle: "Le parent reçoit une direction claire",
    sessionText:
      "La première séance ne sert pas seulement à faire des exercices. Elle sert à nommer le blocage, choisir la priorité et rendre la suite lisible.",
    bullets: [
      "Blocage observé: matière, méthode, stress ou organisation.",
      "Prochaine priorité: ce qu'il faut travailler en premier.",
      "Format recommandé: séance ciblée, suivi hebdo ou bloc intensif.",
    ],
    cta: "Remplir la demande parent",
    callout: "Simple à scaler: chaque nouveau lead arrive avec assez de contexte pour décider vite.",
  },
  en: {
    eyebrow: "Current capacity",
    title: "Small team, better-framed start.",
    description:
      "With two active tutors, the site should filter the right requests and reassure quickly. We prioritize families we can genuinely help.",
    capacityLabel: "2 active tutors",
    capacityTitle: "Spots handled carefully",
    capacityText:
      "Capacity is intentionally limited so matching quality, follow-up clarity and stable time slots stay strong.",
    sessionLabel: "After the first session",
    sessionTitle: "Parents get clearer direction",
    sessionText:
      "The first session is not just exercise time. It names the block, chooses the priority and makes the next step easier to understand.",
    bullets: [
      "Observed block: content, method, stress or organization.",
      "Next priority: what should be worked on first.",
      "Recommended format: focused session, weekly follow-up or intensive block.",
    ],
    cta: "Fill out the parent request",
    callout: "Easy to scale: each lead arrives with enough context to make a faster decision.",
  },
}

export default function ScaleReadinessSection({ locale = "fr" }) {
  const copy = copyByLocale[locale] || copyByLocale.fr

  return (
    <section className="pt-16">
      <div className="grid gap-6 lg:grid-cols-[0.84fr,1.16fr] lg:items-stretch">
        <MotionCard className="panel-gold rounded-[32px] p-7 text-white sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-1.5 text-sm text-white/86">
            <Users className="h-4 w-4 text-[#f5c977]" />
            {copy.capacityLabel}
          </div>
          <div className="mt-5 text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.eyebrow}</div>
          <h2 className="balanced-copy mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/76 sm:text-base">{copy.description}</p>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 px-5 py-5">
            <div className="flex items-center gap-3 font-semibold text-white">
              <Clock3 className="h-4 w-4 text-[#f5c977]" />
              {copy.capacityTitle}
            </div>
            <p className="mt-3 text-sm leading-7 text-white/74">{copy.capacityText}</p>
          </div>
        </MotionCard>

        <MotionCard className="section-shell noise-overlay rounded-[32px] p-7 text-white sm:p-8">
          <div className="relative z-10 grid gap-6 md:grid-cols-[0.92fr,1.08fr] md:items-center">
            <div>
              <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div className="mt-5 text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.sessionLabel}</div>
              <h3 className="balanced-copy mt-3 font-display text-3xl font-semibold">{copy.sessionTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-white/74">{copy.sessionText}</p>
              <div className="mt-6">
                <Button asChild className="rounded-full bg-[#f5c977] px-6 py-6 text-[#071631] hover:bg-[#f7d38f]">
                  <Link to={`${getLocalizedPath("home", locale)}#demande`}>
                    {copy.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {copy.bullets.map((bullet) => (
                <div key={bullet} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                  <div className="flex items-start gap-3 text-sm leading-7 text-white/80">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    <span>{bullet}</span>
                  </div>
                </div>
              ))}
              <div className="rounded-[22px] border border-[#f5c977]/25 bg-[#f5c977]/10 px-4 py-4 text-sm leading-7 text-[#f8deb0]">
                {copy.callout}
              </div>
            </div>
          </div>
        </MotionCard>
      </div>
    </section>
  )
}
