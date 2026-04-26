import { Link } from "react-router-dom"
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  LineChart,
  Phone,
  Target,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { getLocalizedPath } from "@/lib/i18n"
import { siteConfig } from "@/lib/seo"

const iconMap = {
  sprint: Target,
  weekly: CalendarDays,
  reset: LineChart,
  first: Phone,
  early: Clock3,
  visible: LineChart,
}

const copyByLocale = {
  fr: {
    offers: {
      eyebrow: "Offres par besoin",
      title: "Des accompagnements pensés par situation, pas seulement par heure",
      description:
        "Les meilleurs sites de tutorat vendent d'abord une direction claire. Ici, l'idée est de montrer aux familles le bon format selon leur urgence et leur niveau de clarté.",
      cards: [
        {
          icon: "sprint",
          title: "Sprint examen",
          subtitle: "Quand une date approche et qu'il faut remettre les priorit\u00E9s en ordre vite.",
          routeKey: "examSprint",
          cta: "Voir le Sprint examen",
          bullets: [
            "Bon pour les examens proches",
            "Appel d'abord si la situation est encore floue",
            "Peut mener \u00E0 un petit bloc intensif",
          ],
        },
        {
          icon: "weekly",
          title: "Suivi hebdomadaire",
          subtitle: "Quand le vrai besoin est de stabiliser la m\u00E9thode et d'\u00E9viter les rechutes.",
          routeKey: "weeklyFollowUp",
          cta: "Voir le Suivi hebdomadaire",
          bullets: [
            "Le meilleur format pour la progression durable",
            "Appel d'abord pour cadrer un vrai suivi r\u00E9gulier",
            "Id\u00E9al si les notions s'accumulent",
            "Tr\u00E8s bon choix pour secondaire 4 et 5",
          ],
        },
        {
          icon: "reset",
          title: "Remise \u00E0 niveau cibl\u00E9e",
          subtitle: "Quand il faut reprendre une mati\u00E8re ou un chapitre avant que le retard se fige.",
          action: "book",
          cta: "R\u00E9server une s\u00E9ance cibl\u00E9e",
          bullets: [
            "Bon pour un rattrapage propre",
            "Permet de retrouver un cap clair",
            "Peut basculer ensuite vers un suivi simple",
          ],
        },
      ],
    },
    value: {
      eyebrow: "Valeur visible",
      title: "Ce qu'un parent doit sentir rapidement si l'accompagnement est bon",
      description:
        "La vraie valeur ne se r\u00E9sume pas \u00E0 une heure de plus. Elle se voit dans la clart\u00E9, le calme et la direction retrouv\u00E9e.",
      milestones: [
        {
          icon: "first",
          title: "Apr\u00E8s le premier \u00E9change",
          items: [
            "Le besoin est enfin nomm\u00E9 clairement",
            "Le bon prochain pas devient plus simple",
            "Le parent sait s'il faut appeler, r\u00E9server ou suivre de plus pr\u00E8s",
          ],
        },
        {
          icon: "early",
          title: "Apr\u00E8s 1 \u00E0 2 s\u00E9ances",
          items: [
            "Les priorit\u00E9s de r\u00E9vision sont plus nettes",
            "L'\u00E9l\u00E8ve commence \u00E0 voir une m\u00E9thode",
            "Le stress baisse parce que tout semble moins brouill\u00E9",
          ],
        },
        {
          icon: "visible",
          title: "Apr\u00E8s 2 \u00E0 4 semaines",
          items: [
            "La progression devient plus lisible \u00E0 la maison",
            "Les erreurs reviennent moins souvent",
            "La famille sent mieux o\u00F9 l'on va et pourquoi",
          ],
        },
      ],
      primary: "Lancer le diagnostic",
      secondary: "Voir les t\u00E9moignages",
    },
  },
  en: {
    offers: {
      eyebrow: "Offers by need",
      title: "Support paths shaped around the situation, not just around an hourly rate",
      description:
        "The strongest tutoring sites sell clarity first. The goal here is to help families recognize which format fits the urgency and level of confusion.",
      cards: [
        {
          icon: "sprint",
          title: "Exam sprint",
          subtitle: "For moments when a deadline is close and priorities need to be reordered fast.",
          routeKey: "examSprint",
          cta: "See the exam sprint",
          bullets: [
            "Best for upcoming exams",
            "Call first if the situation is still unclear",
            "Can lead into a short intensive block",
          ],
        },
        {
          icon: "weekly",
          title: "Weekly follow-up",
          subtitle: "For students who need a steadier method and more durable academic momentum.",
          routeKey: "weeklyFollowUp",
          cta: "See weekly follow-up",
          bullets: [
            "Best fit for long-term progress",
            "Call first to frame a real recurring follow-up",
            "Ideal when the material is starting to pile up",
            "Especially strong for Secondary 4 and 5",
          ],
        },
        {
          icon: "reset",
          title: "Targeted catch-up reset",
          subtitle: "For families who need to rebuild one subject or chapter before the gap hardens.",
          action: "book",
          cta: "Book a focused session",
          bullets: [
            "Good for clean catch-up work",
            "Helps recover a clearer direction",
            "Can later transition into lighter weekly support",
          ],
        },
      ],
    },
    value: {
      eyebrow: "Visible value",
      title: "What a parent should be able to feel quickly when the support is working",
      description:
        "The real value is not one more hour. It shows up in clarity, lower stress, and a stronger sense of direction.",
      milestones: [
        {
          icon: "first",
          title: "After the first conversation",
          items: [
            "The real need is finally named clearly",
            "The next step becomes easier to choose",
            "The parent knows whether to call, book, or monitor more closely",
          ],
        },
        {
          icon: "early",
          title: "After 1 to 2 sessions",
          items: [
            "Review priorities feel clearer",
            "The student starts seeing a usable method",
            "Stress drops because the subject feels less blurry",
          ],
        },
        {
          icon: "visible",
          title: "After 2 to 4 weeks",
          items: [
            "Progress feels easier to read at home",
            "Recurring mistakes show up less often",
            "The family feels where things are going and why",
          ],
        },
      ],
      primary: "Start the diagnostic",
      secondary: "See testimonials",
    },
  },
}

export default function GrowthProgramSection({ locale = "fr", className = "pt-20" }) {
  const copy = copyByLocale[locale] || copyByLocale.fr

  function openDiagnostic() {
    if (typeof window === "undefined") {
      return
    }

    window.dispatchEvent(new CustomEvent("methode:open-diagnostic"))
  }

  return (
    <section className={className}>
      <div className="max-w-3xl">
        <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.offers.eyebrow}</div>
        <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          {copy.offers.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{copy.offers.description}</p>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {copy.offers.cards.map((card) => {
          const Icon = iconMap[card.icon]

          return (
            <MotionCard
              key={card.title}
              className="rounded-[30px] border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(8,26,56,0.88))] p-7 text-white"
            >
              <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{card.subtitle}</p>

              <div className="mt-6 space-y-3 text-sm text-white/80">
                {card.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {bullet}
                  </div>
                ))}
              </div>

              {card.routeKey ? (
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath(card.routeKey, locale)}>
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : card.action === "phone" ? (
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    {card.cta}
                    <Phone className="h-4 w-4" />
                  </a>
                </Button>
              ) : card.action === "book" ? (
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    {card.cta}
                    <CalendarDays className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </MotionCard>
          )
        })}
      </div>

      <div className="mt-16 max-w-3xl">
        <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.value.eyebrow}</div>
        <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          {copy.value.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{copy.value.description}</p>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {copy.value.milestones.map((milestone) => {
          const Icon = iconMap[milestone.icon]

          return (
            <MotionCard key={milestone.title} className="glass-panel rounded-[30px] border-white/10 bg-white/[0.04] p-7 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">{milestone.title}</h3>
              <div className="mt-5 space-y-3 text-sm text-white/78">
                {milestone.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {item}
                  </div>
                ))}
              </div>
            </MotionCard>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          type="button"
          className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
          onClick={openDiagnostic}
        >
          {copy.value.primary}
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        >
          <Link to={getLocalizedPath("temoignages", locale)}>
            {copy.value.secondary}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        >
          <a href={`tel:${siteConfig.phone}`}>
            <Phone className="h-4 w-4" />
            {locale === "en" ? "Call for weekly follow-up" : "Appeler pour un suivi"}
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        >
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">
            <CalendarDays className="h-4 w-4" />
            {locale === "en" ? "Book a one-time session" : "R\u00E9server une s\u00E9ance ponctuelle"}
          </a>
        </Button>
      </div>
    </section>
  )
}
