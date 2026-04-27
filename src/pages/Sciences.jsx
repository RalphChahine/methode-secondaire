import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  FlaskConical,
  Gauge,
  NotebookPen,
  Zap,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import KeywordIntentSection from "@/components/KeywordIntentSection"
import LocalOpportunitySection from "@/components/LocalOpportunitySection"
import MilestoneOpportunitySection from "@/components/MilestoneOpportunitySection"
import OfferPathwaysSection from "@/components/OfferPathwaysSection"
import ResourceGridSection from "@/components/ResourceGridSection"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { siteConfig } from "@/lib/seo"

const contentByLocale = {
  fr: {
    modules: [
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
    ],
    gains: [
      "Voir la logique derrière les formules au lieu de les subir.",
      "Relier les concepts aux schémas, unités et situations concrètes.",
      "Répondre plus clairement aux questions d'examen et de labo.",
    ],
    approach: [
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
    ],
    badge: "Sciences • Secondaire 1 à 5",
    heroTitle: "La science devient plus simple quand elle devient visuelle, logique et concrète.",
    heroText:
      "L'objectif n'est pas de mémoriser un bloc de notions sans lien. L'objectif, c'est de faire apparaître la logique derrière les phénomènes, les formules et les réponses attendues.",
    ctaPrimary: "Réserver une séance ciblée",
    ctaSecondary: "Poser une question",
    asideEyebrow: "Ce que le suivi change",
    asideTitle: "Moins de mémorisation brute, plus de compréhension",
    modulesEyebrow: "Contenu couvert",
    modulesTitle: "Les blocs où les sciences demandent souvent un vrai accompagnement",
    modulesDescription:
      "On travaille les chapitres qui se transforment vite en surcharge quand les concepts, les unités et les questions s'empilent.",
    approachEyebrow: "Approche",
    approachTitle: "Trois réflexes qui rendent les sciences beaucoup plus lisibles",
    approachDescription:
      "On part toujours du même principe: si l'élève voit mieux, relie mieux et applique mieux, la matière devient beaucoup moins lourde.",
    finalBadge: "Pour révision, suivi ou examen",
    finalTitle: "Quand la logique apparaît, les sciences deviennent beaucoup moins intimidantes.",
    finalText:
      "Que le besoin soit en chimie, en physique ou en préparation d'évaluation, on peut remettre les concepts à leur place rapidement.",
    finalPrimary: "Réserver une séance ciblée",
    finalSecondary: "Retour à l'accueil",
    seoTitle: "Tuteur de sciences au secondaire | Méthode Secondaire",
    seoDescription:
      "Tuteur de sciences au secondaire 1 à 5 au Québec. Tutorat en sciences, physique, chimie, aide aux devoirs, labos et préparation d'examens avec une méthode claire.",
    seoKeywords:
      "tuteur sciences secondaire, tutorat sciences secondaire, aide aux devoirs sciences, aide physique secondaire, aide chimie secondaire",
    schemaName: "Tutorat de sciences au secondaire",
    schemaType: "Tutorat privé de sciences pour le secondaire 1 à 5",
  },
  en: {
    modules: [
      {
        icon: FlaskConical,
        title: "Chemistry and reactions",
        description: "Understand matter, transformations and calculations without getting stuck in vague memorization.",
      },
      {
        icon: Gauge,
        title: "Physics and motion",
        description: "Connect formulas to real situations so problems become far easier to read.",
      },
      {
        icon: Zap,
        title: "Electricity and energy",
        description: "Bring order to the concepts so circuits, quantities and relationships finally make sense.",
      },
      {
        icon: NotebookPen,
        title: "Labs and long-form questions",
        description: "Structure the analysis, justify clearly and avoid losing marks on written responses.",
      },
    ],
    gains: [
      "See the logic behind formulas instead of just surviving them.",
      "Connect concepts to diagrams, units and real situations.",
      "Answer exam and lab questions more clearly.",
    ],
    approach: [
      {
        title: "Visualize the concepts",
        description: "We simplify phenomena with diagrams, comparisons and memorable mental anchors.",
      },
      {
        title: "Connect the ideas",
        description: "We show how concepts, units and formulas hold together.",
      },
      {
        title: "Apply with precision",
        description: "We practice the right question formats so solving feels more natural.",
      },
    ],
    badge: "Science tutoring • Secondary 1 to 5",
    heroTitle: "Science becomes easier when it becomes visual, logical and concrete.",
    heroText:
      "The goal is not to memorize a disconnected block of content. The goal is to reveal the logic behind phenomena, formulas and the answers teachers expect.",
    ctaPrimary: "Book a focused science session",
    ctaSecondary: "Ask a question",
    asideEyebrow: "What tutoring changes",
    asideTitle: "Less raw memorization, more understanding",
    modulesEyebrow: "What we cover",
    modulesTitle: "The areas where science often needs real support",
    modulesDescription:
      "We work on the chapters that quickly become overwhelming when concepts, units and written questions start piling up.",
    approachEyebrow: "Approach",
    approachTitle: "Three habits that make science far easier to read",
    approachDescription:
      "The principle stays the same: if a student sees better, connects better and applies better, the subject becomes much lighter.",
    finalBadge: "For review, follow-up or exams",
    finalTitle: "When the logic becomes visible, science feels far less intimidating.",
    finalText:
      "Whether the need is chemistry, physics or exam preparation, we can put the concepts back in place quickly.",
    finalPrimary: "Book a focused session",
    finalSecondary: "Back to home",
    seoTitle: "High school science tutor in Quebec | Méthode Secondaire",
    seoDescription:
      "High school science tutoring across Quebec. Science tutor support, physics, chemistry, homework help, labs and exam preparation with a clear method.",
    seoKeywords:
      "high school science tutor quebec, high school science tutoring, science homework help, physics help high school, chemistry help high school",
    schemaName: "High school science tutoring",
    schemaType: "Private high school science tutoring",
  },
}

export default function Sciences() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("sciences", locale)

  const sciencesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.schemaName,
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
    serviceType: copy.schemaType,
  }

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        keywords={copy.seoKeywords}
        jsonLd={sciencesSchema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("sciences")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-14 top-16 h-72 w-72 rounded-full bg-[#73d6ff]/16 blur-3xl" />
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.badge}
            </Badge>

            <h1 className="balanced-copy mt-7 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
              {copy.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{copy.heroText}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  {copy.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={`${getLocalizedPath("home", locale)}#contact`}>{copy.ctaSecondary}</Link>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-white/45">{copy.asideEyebrow}</div>
            <div className="mt-3 font-display text-3xl font-semibold">{copy.asideTitle}</div>

            <ul className="mt-6 space-y-4">
              {copy.gains.map((gain) => (
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
            eyebrow={copy.modulesEyebrow}
            title={copy.modulesTitle}
            description={copy.modulesDescription}
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.modules.map((module) => (
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
            eyebrow={copy.approachEyebrow}
            title={copy.approachTitle}
            description={copy.approachDescription}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {copy.approach.map((step, index) => (
              <MotionCard key={step.title} className="glass-panel rounded-[30px] border-white/10 bg-white/[0.04] p-7 text-white">
                <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
                  {locale === "en" ? `Step 0${index + 1}` : `Étape 0${index + 1}`}
                </div>
                <h2 className="mt-4 font-display text-3xl font-semibold">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{step.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <ResourceGridSection
          locale={locale}
          className="pt-20"
          routeKeys={["scienceExamPrep", "physicsHelp", "chemistrySec5", "catchUp"]}
          heading={{
            eyebrow: locale === "en" ? "Useful reading" : "Lectures utiles",
            title:
              locale === "en"
                ? "Science guides for exam pressure and overload moments"
                : "Des guides sciences pour les moments de pression et de surcharge",
          }}
          description={
            locale === "en"
              ? "These pages focus on science exam prep, physics, chemistry and catch-up periods where structure matters more than generic practice."
        : "Ces pages visent la révision de sciences, la physique, la chimie et les périodes de rattrapage où la structure compte plus qu'une pratique diffuse."
          }
        />

        <OfferPathwaysSection
          locale={locale}
          className="pt-20"
          heading={{
            eyebrow: locale === "en" ? "Best next offer pages" : "Offres a pousser ensuite",
            title:
              locale === "en"
                ? "From science tutoring, the strongest next pages are Exam sprint and Weekly follow-up"
                : "Depuis la page sciences, les suites les plus fortes sont Sprint examen et Suivi hebdomadaire",
          }}
          description={
            locale === "en"
              ? "These two pages help families move from subject interest into the right support format, which makes them useful both for indexing and for leads."
              : "Ces deux pages font le pont entre l'interet pour la matiere et le bon format d'accompagnement, ce qui les rend utiles a la fois pour l'indexation et pour les leads."
          }
        />

        <KeywordIntentSection locale={locale} className="pt-20" />

        <LocalOpportunitySection locale={locale} className="pt-20" />

        <MilestoneOpportunitySection locale={locale} className="pt-20" />

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(115,214,255,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {copy.finalBadge}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{copy.finalTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.finalText}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    {copy.finalPrimary}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath("home", locale)}>{copy.finalSecondary}</Link>
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
