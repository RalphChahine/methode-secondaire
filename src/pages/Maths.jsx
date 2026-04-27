import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  NotebookPen,
  Target,
  TrendingUp,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import KeywordIntentSection from "@/components/KeywordIntentSection"
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
        icon: Calculator,
        title: "Algèbre et équations",
        description: "Retrouver une méthode fiable pour isoler, vérifier et résoudre sans se perdre en route.",
      },
      {
        icon: TrendingUp,
        title: "Fonctions et graphes",
        description: "Lire, relier et interpréter les représentations pour rendre les exercices beaucoup plus clairs.",
      },
      {
        icon: Target,
        title: "Géométrie et trigonométrie",
        description: "Comprendre les relations, les formules et la logique qui relie les figures aux calculs.",
      },
      {
        icon: NotebookPen,
        title: "Préparation d'examens",
        description: "Révision structurée, exercices ciblés et stratégie de résolution pour les évaluations importantes.",
      },
    ],
    gains: [
      "Lire la question avec beaucoup moins d'hésitation.",
      "Choisir la bonne démarche avant de se lancer.",
      "Éviter les erreurs récurrentes qui coûtent des points.",
    ],
    approach: [
      {
        title: "Clarifier la logique",
        description: "On remet les notions en ordre pour que les symboles aient enfin du sens.",
      },
      {
        title: "S'entraîner sur l'essentiel",
        description: "On pratique sur des formats d'exercices qui reviennent vraiment en devoir et en examen.",
      },
      {
        title: "Ancrer une méthode",
        description: "L'élève repart avec une procédure qu'il peut réutiliser seul la prochaine fois.",
      },
    ],
    badge: "Mathématiques • Secondaire 1 à 5",
    heroTitle: "Les maths peuvent redevenir nettes, même quand elles semblent déjà perdues.",
    heroText:
      "Ici, on ne saute pas directement à la réponse. On reconstruit la logique, on pratique la bonne démarche et on fait baisser le stress qui vient avec les questions de maths.",
    ctaPrimary: "Réserver une séance ciblée",
    ctaSecondary: "Poser une question",
    asideEyebrow: "Ce qu'on travaille vite",
    asideTitle: "Plus de méthode, moins de panique",
    modulesEyebrow: "Contenu couvert",
    modulesTitle: "Les grands blocs où un accompagnement fait une vraie différence",
    modulesDescription:
      "Le suivi est pensé pour aider autant sur les bases que sur les chapitres qui deviennent plus abstraits en montant au secondaire.",
    approachEyebrow: "Approche",
    approachTitle: "Trois étapes pour remettre les maths à leur place",
    approachDescription:
      "On cherche toujours à rendre la matière plus lisible, plus logique et plus réutilisable d'une séance à l'autre.",
    finalBadge: "Suivi ponctuel ou hebdomadaire",
    finalTitle: "Quand les maths deviennent plus simples à lire, elles deviennent aussi plus simples à réussir.",
    finalText:
      "Si la matière a commencé à s'accumuler ou qu'un examen approche, on peut repartir avec une stratégie claire très vite.",
    finalPrimary: "Réserver une séance ciblée",
    finalSecondary: "Retour à l'accueil",
    seoTitle: "Tutorat en mathématiques au secondaire | Méthode Secondaire",
    seoDescription:
      "Tutorat en mathématiques au secondaire 1 à 5 au Québec. Tuteur de maths, aide aux devoirs, algèbre, fonctions, géométrie, trigonométrie et examens avec une méthode claire.",
    seoKeywords:
      "tutorat en mathématiques secondaire, tuteur maths secondaire, aide aux devoirs maths secondaire, soutien scolaire maths, préparation examen maths secondaire",
    schemaName: "Tutorat de mathématiques au secondaire",
    schemaType: "Tutorat privé de mathématiques pour le secondaire 1 à 5",
  },
  en: {
    modules: [
      {
        icon: Calculator,
        title: "Algebra and equations",
        description: "Build a reliable method for isolating, checking and solving without getting lost halfway through.",
      },
      {
        icon: TrendingUp,
        title: "Functions and graphs",
        description: "Read, connect and interpret visual representations so exercises feel much clearer.",
      },
      {
        icon: Target,
        title: "Geometry and trigonometry",
        description: "Understand the relationships, formulas and logic that connect figures to calculations.",
      },
      {
        icon: NotebookPen,
        title: "Exam preparation",
        description: "Structured review, targeted practice and solving strategy for important assessments.",
      },
    ],
    gains: [
      "Read the question with far less hesitation.",
      "Choose the right method before starting.",
      "Avoid recurring mistakes that cost marks.",
    ],
    approach: [
      {
        title: "Clarify the logic",
        description: "We reorder the concepts so the symbols finally make sense.",
      },
      {
        title: "Practice what matters",
        description: "We work on the exercise formats that actually come back in homework and exams.",
      },
      {
        title: "Lock in a method",
        description: "Students leave with a process they can reuse the next time they work alone.",
      },
    ],
    badge: "Math tutoring • Secondary 1 to 5",
    heroTitle: "Math can feel clear again, even when it already seems out of reach.",
    heroText:
      "We do not jump straight to the answer. We rebuild the logic, practice the right approach and reduce the stress that often comes with math questions.",
    ctaPrimary: "Book a focused math session",
    ctaSecondary: "Ask a question",
    asideEyebrow: "What we improve quickly",
    asideTitle: "More method, less panic",
    modulesEyebrow: "What we cover",
    modulesTitle: "The big areas where strong support changes everything",
    modulesDescription:
      "Support is designed to help both with the basics and with the chapters that become more abstract later in high school.",
    approachEyebrow: "Approach",
    approachTitle: "Three steps to put math back in its place",
    approachDescription:
      "The goal is always to make the subject clearer, more logical and easier to reuse from one session to the next.",
    finalBadge: "One-time help or weekly follow-up",
    finalTitle: "When math becomes easier to read, it also becomes easier to succeed in.",
    finalText:
      "If the subject has started piling up or an exam is approaching, we can rebuild a clear strategy quickly.",
    finalPrimary: "Book a focused session",
    finalSecondary: "Back to home",
    seoTitle: "High school math tutoring in Quebec | Méthode Secondaire",
    seoDescription:
      "High school math tutoring across Quebec. Math tutor support, homework help, algebra, functions, geometry, trigonometry and exam prep with a clear method.",
    seoKeywords:
      "high school math tutoring quebec, high school math tutor, math homework help, secondary math support, math exam preparation",
    schemaName: "High school math tutoring",
    schemaType: "Private high school math tutoring",
  },
}

export default function Maths() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("maths", locale)

  const mathsSchema = {
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
        jsonLd={mathsSchema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("maths")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[#f5c977]/14 blur-3xl" />
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
          routeKeys={["mathExamPrep", "mathMinisterial", "sec4Math", "montrealSec4Math"]}
          heading={{
            eyebrow: locale === "en" ? "Useful reading" : "Lectures utiles",
            title:
              locale === "en"
                ? "Math guides built around the moments families search most"
        : "Des guides maths centrés sur les moments où les familles cherchent vraiment",
          }}
          description={
            locale === "en"
              ? "These guides go beyond generic homework help and target exam prep, ministerial prep, Secondary 4 math friction and local Montreal search intent."
        : "Ces pages vont plus loin qu'une simple aide aux devoirs et couvrent l'examen, le ministériel, le secondaire 4 et une intention locale Montréal."
          }
        />

        <OfferPathwaysSection
          locale={locale}
          className="pt-20"
          heading={{
            eyebrow: locale === "en" ? "Best next offer pages" : "Offres a pousser ensuite",
            title:
              locale === "en"
                ? "From math tutoring, the strongest next pages are Exam sprint and Weekly follow-up"
                : "Depuis la page maths, les suites les plus fortes sont Sprint examen et Suivi hebdomadaire",
          }}
          description={
            locale === "en"
              ? "These two pages help families choose between urgent exam help and a steadier long-term rhythm, which makes them strong for both SEO and conversion."
              : "Ces deux pages aident les familles a choisir entre une urgence avant examen et un rythme plus stable a long terme, ce qui les rend fortes a la fois pour le SEO et pour la conversion."
          }
        />

        <KeywordIntentSection locale={locale} className="pt-20" />

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
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
