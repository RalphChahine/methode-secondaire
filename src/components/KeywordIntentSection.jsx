import { Link } from "react-router-dom"
import { ArrowRight, Calculator, FlaskConical, NotebookPen, ShieldCheck } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { getLocalizedPath } from "@/lib/i18n"

const iconMap = {
  math: Calculator,
  science: FlaskConical,
  homework: NotebookPen,
  support: ShieldCheck,
}

const copyByLocale = {
  fr: {
    eyebrow: "Recherches fréquentes",
    title: "Des pages pensées pour les mots-clés que les parents tapent vraiment",
    description:
      "Au Québec, les recherches ne sont pas toujours “Méthode Secondaire”. Elles ressemblent souvent à tutorat en mathématiques, tuteur sciences, aide aux devoirs ou soutien scolaire. Ces pages servent à capter ces intentions plus directement.",
    cards: [
      {
        icon: "math",
        routeKey: "mathTutoringSecondary",
        badge: "Mathématiques",
        title: "Tutorat en mathématiques au secondaire",
        description:
          "Une porte d'entrée plus directe pour les parents qui cherchent un tuteur de maths, un soutien ciblé ou une aide claire avant les examens.",
        cta: "Voir la page tutorat maths",
      },
      {
        icon: "science",
        routeKey: "scienceTutorSecondary",
        badge: "Sciences",
        title: "Tuteur de sciences au secondaire",
        description:
          "Une page plus frontale pour les recherches autour du tutorat en sciences, de la physique, de la chimie et des explications étape par étape.",
        cta: "Voir la page tuteur sciences",
      },
      {
        icon: "homework",
        routeKey: "homeworkHelpSecondary",
        badge: "Aide aux devoirs",
        title: "Aide aux devoirs au secondaire",
        description:
          "Pour les familles qui cherchent moins un “cours privé” qu'un cadre utile pour les devoirs, la compréhension et l'organisation de la semaine.",
        cta: "Voir la page aide aux devoirs",
      },
      {
        icon: "support",
        routeKey: "academicSupportSecondary",
        badge: "Soutien scolaire",
        title: "Soutien scolaire au secondaire",
        description:
          "Quand le besoin dépasse un seul chapitre et demande une vue plus large: rattrapage, priorités, rythme, méthode et progression.",
        cta: "Voir la page soutien scolaire",
      },
      {
        icon: "math",
        routeKey: "mathTutorMontreal",
        badge: "Montréal",
        title: "Tuteur maths Montréal",
        description:
          "Une porte d'entrée locale plus directe pour les parents qui cherchent un tuteur de maths à Montréal pour le secondaire.",
        cta: "Voir la page tuteur maths Montréal",
      },
      {
        icon: "homework",
        routeKey: "homeworkHelpMontreal",
        badge: "Montréal",
        title: "Aide aux devoirs Montréal",
        description:
          "Pour les familles de Montréal qui cherchent une aide aux devoirs plus structurée au secondaire, surtout quand les soirées deviennent lourdes.",
        cta: "Voir la page aide aux devoirs Montréal",
      },
      {
        icon: "science",
        routeKey: "scienceTutorLaval",
        badge: "Laval",
        title: "Tuteur sciences Laval",
        description:
          "Une page plus locale pour les recherches autour d'un tuteur de sciences, de physique ou de chimie à Laval.",
        cta: "Voir la page tuteur sciences Laval",
      },
    ],
  },
  en: {
    eyebrow: "Common search intent",
    title: "Pages built around the keywords families actually search",
    description:
      "In Quebec, searches are not always brand-based. Families often look for high school math tutoring, a science tutor, homework help or broader academic support. These pages are meant to capture that intent more directly.",
    cards: [
      {
        icon: "math",
        routeKey: "mathTutoringSecondary",
        badge: "Math",
        title: "High school math tutoring",
        description:
          "A more direct entry point for families looking for a math tutor, focused support or clearer help before evaluations.",
        cta: "See the math tutoring page",
      },
      {
        icon: "science",
        routeKey: "scienceTutorSecondary",
        badge: "Science",
        title: "High school science tutor",
        description:
          "A clearer page for searches around science tutoring, physics, chemistry and step-by-step explanation work.",
        cta: "See the science tutor page",
      },
      {
        icon: "homework",
        routeKey: "homeworkHelpSecondary",
        badge: "Homework help",
        title: "High school homework help",
        description:
          "For families who are not really searching for “private lessons” but for useful structure around homework, understanding and weekly organization.",
        cta: "See the homework help page",
      },
      {
        icon: "support",
        routeKey: "academicSupportSecondary",
        badge: "Academic support",
        title: "High school academic support",
        description:
          "When the need goes beyond one chapter and calls for a wider view: catch-up work, priorities, rhythm, method and visible progress.",
        cta: "See the academic support page",
      },
      {
        icon: "math",
        routeKey: "mathTutorMontreal",
        badge: "Montreal",
        title: "Montreal math tutor",
        description:
          "A more local entry point for families searching directly for a Montreal math tutor at the high school level.",
        cta: "See the Montreal math tutor page",
      },
      {
        icon: "homework",
        routeKey: "homeworkHelpMontreal",
        badge: "Montreal",
        title: "Montreal homework help",
        description:
          "For Montreal families looking for more structured homework help when the evenings feel heavy and unclear.",
        cta: "See the Montreal homework help page",
      },
      {
        icon: "science",
        routeKey: "scienceTutorLaval",
        badge: "Laval",
        title: "Laval science tutor",
        description:
          "A more local page for searches around a Laval science tutor, including physics and chemistry support.",
        cta: "See the Laval science tutor page",
      },
    ],
  },
}

export default function KeywordIntentSection({ locale = "fr", className = "pt-20" }) {
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

      <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
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
