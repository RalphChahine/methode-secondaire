import { Link, useLocation } from "react-router-dom"
import { ArrowRight, BookOpenText, CalendarDays, Compass, LineChart, MessageCircle, Target } from "lucide-react"

import BlogGridSection from "@/components/BlogGridSection"
import MotionCard from "@/components/MotionCard"
import ParentJourneyNote from "@/components/ParentJourneyNote"
import ResourceGridSection from "@/components/ResourceGridSection"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, BOOKING_URL_EN } from "@/config/booking"
import { resourceHubCopyByLocale } from "@/lib/resourceContent"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { absoluteUrl } from "@/lib/seo"

const seoByLocale = {
  fr: {
    title: "Ressources tutorat secondaire | Méthode Secondaire",
    description:
      "Guides utiles sur la préparation aux examens, le rattrapage scolaire et les points de blocage fréquents en maths et sciences au secondaire.",
    keywords:
      "ressources tutorat secondaire, aide aux devoirs secondaire, soutien scolaire secondaire, blog tutorat maths, blog tutorat sciences",
  },
  en: {
    title: "High school tutoring resources | Méthode Secondaire",
    description:
      "Useful guides about exam prep, catch-up tutoring and common math and science pain points for high school students in Quebec.",
    keywords:
      "high school tutoring resources, high school homework help, high school academic support, math tutoring blog, science tutoring guide",
  },
}

export default function ResourcesHub() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = resourceHubCopyByLocale[locale]
  const seo = seoByLocale[locale]
  const path = getLocalizedPath("resourcesHub", locale)
  const requestUrl = locale === "en" ? BOOKING_URL_EN : BOOKING_URL

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.title,
    description: seo.description,
    url: absoluteUrl(path),
  }

  const quickPaths =
    locale === "en"
      ? [
          {
            href: "#guides",
            icon: BookOpenText,
            label: "Find a practical guide",
            description: "Prepare, catch up or get organized.",
          },
          {
            href: "#articles",
            icon: Compass,
            label: "Understand the situation",
            description: "Read a clear answer before choosing a next step.",
          },
          {
            href: "#support",
            icon: MessageCircle,
            label: "Get personal support",
            description: "Choose a focused session or a steadier follow-up.",
          },
        ]
      : [
          {
            href: "#guides",
            icon: BookOpenText,
            label: "Trouver un guide pratique",
            description: "Préparer, rattraper ou remettre de l'ordre.",
          },
          {
            href: "#articles",
            icon: Compass,
            label: "Mieux comprendre la situation",
            description: "Lire une réponse claire avant de choisir la suite.",
          },
          {
            href: "#support",
            icon: MessageCircle,
            label: "Être accompagné",
            description: "Choisir une séance ciblée ou un suivi régulier.",
          },
        ]

  const supportPaths =
    locale === "en"
      ? [
          {
            icon: Target,
            routeKey: "request",
            badge: "One concrete priority",
            title: "Targeted session",
            description: "For one concrete priority.",
            details: [
              "A focused plan for what matters most right now.",
              "A useful format before tests or ministerial exams.",
              "Talk it through first if you are not sure which format fits.",
            ],
            cta: "Request a Targeted session",
          },
          {
            icon: LineChart,
            routeKey: "request",
            badge: "Regain momentum",
            title: "Momentum block",
            description: "To regain momentum over roughly one month.",
            details: [
              "A clear structure to consolidate what keeps returning.",
              "Especially helpful in Secondary 4 and 5.",
              "The short request helps confirm the right starting point and cadence.",
            ],
            cta: "Request the Momentum block",
          },
          {
            icon: LineChart,
            routeKey: "weeklyFollowUp",
            badge: "A recurring difficulty",
            title: "Progress block",
            description: "For a recurring difficulty or lasting academic structure.",
            details: ["Continuity to consolidate what keeps returning.", "Cadence is confirmed after matching.", "No automatic renewal."],
            cta: "Request the Progress block",
          },
        ]
      : [
          {
            icon: Target,
            routeKey: "request",
            badge: "Une priorité concrète",
            title: "Séance ciblée",
            description: "Pour une priorité concrète.",
            details: [
              "Un plan ciblé pour ce qui compte le plus maintenant.",
              "Un format utile avant une évaluation ou un examen ministériel.",
              "On peut en parler d'abord si vous hésitez entre les formats.",
            ],
            cta: "Demander une séance ciblée",
          },
          {
            icon: LineChart,
            routeKey: "request",
            badge: "Reprendre l'élan",
            title: "Bloc d'élan",
            description: "Pour reprendre l'élan pendant environ un mois.",
            details: [
              "Une structure claire pour consolider ce qui revient.",
              "Particulièrement utile en secondaire 4 et 5.",
              "La courte demande aide à confirmer le bon point de départ et la cadence.",
            ],
            cta: "Demander le Bloc d'élan",
          },
          {
            icon: LineChart,
            routeKey: "weeklyFollowUp",
            badge: "Une difficulté qui revient",
            title: "Bloc de progression",
            description: "Pour une difficulté récurrente ou une structure scolaire durable.",
            details: ["Une continuité pour consolider ce qui revient.", "La cadence est confirmée après le jumelage.", "Aucun renouvellement automatique."],
            cta: "Demander le Bloc de progression",
          },
        ]

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={seo.title}
        description={seo.description}
        path={path}
        keywords={seo.keywords}
        jsonLd={schema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("resourcesHub")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-9 sm:px-6 sm:pt-12 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:gap-8">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.eyebrow}
            </Badge>
            <h1 className="balanced-copy mt-6 font-display text-[2.65rem] font-semibold leading-[0.98] text-white sm:mt-7 sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:mt-6 sm:text-lg sm:leading-8">
              {copy.description}
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:flex sm:flex-wrap">
              <Button
                asChild
                className="w-full justify-center rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
              >
                <a href="#guides">
                  {locale === "en" ? "Explore the guides" : "Explorer les guides"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-center rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <a href={requestUrl}>
                  {locale === "en" ? "Request a focused session" : "Demander une séance ciblée"}
                </a>
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/72">
              <Link
                to={getLocalizedPath("teenMathScienceSlide", locale)}
                className="inline-flex items-center gap-1 transition hover:text-white"
              >
                {locale === "en" ? "Read the parent guide" : "Voir le guide parents"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to={getLocalizedPath("home", locale)}
                className="inline-flex items-center gap-1 transition hover:text-white"
              >
                {locale === "en" ? "Back to home" : "Retour à l'accueil"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ParentJourneyNote locale={locale} className="mt-6 max-w-2xl" />
          </div>

          <MotionCard className="glass-panel rounded-[28px] border-white/10 bg-white/[0.05] p-5 text-white sm:rounded-[32px] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <Compass className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/65">
                {locale === "en" ? "Three easy ways in" : "Trois façons de commencer"}
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {locale === "en" ? "What would make this week easier?" : "Qu'est-ce qui aiderait le plus cette semaine?"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
              {locale === "en"
                ? "Start with the situation you recognize. You do not need to read everything."
                : "Partez de la situation qui vous ressemble. Vous n'avez pas besoin de tout lire."}
            </p>

            <nav
              aria-label={locale === "en" ? "Resource choices" : "Choix de ressources"}
              className="mt-6 grid gap-2"
            >
              {quickPaths.map(({ href, icon: Icon, label, description }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] p-3.5 transition hover:border-[#f5c977]/45 hover:bg-white/[0.08]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5c977]/12 text-[#f5c977]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-white">{label}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-white/60">{description}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/35 transition group-hover:translate-x-0.5 group-hover:text-[#f5c977]" />
                </a>
              ))}
            </nav>

            <div className="mt-5 flex items-start gap-3 rounded-[20px] border border-[#f5c977]/15 bg-[#081a38]/55 px-4 py-3.5 text-sm leading-6 text-white/70">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
              <p>
                {locale === "en"
                  ? "A short, useful next step is enough. Come back whenever another question appears."
                  : "Une petite prochaine étape utile suffit. Revenez dès qu'une autre question se présente."}
              </p>
            </div>
          </MotionCard>
        </section>

        <div id="guides" className="scroll-mt-28">
          <ResourceGridSection
            locale={locale}
            className="pt-16 sm:pt-20"
            showHubLink={false}
            heading={{
              eyebrow: locale === "en" ? "Start with your need" : "Partir de votre besoin",
              title:
                locale === "en"
                  ? "Choose the guide that feels closest to your situation"
                  : "Choisissez le guide qui ressemble le plus à votre situation",
            }}
            description={
              locale === "en"
                ? "A few clear starting points for the moments families most often need to sort out."
                : "Quelques points de départ clairs pour les moments que les familles cherchent le plus souvent à démêler."
            }
          />
        </div>

        <div id="articles" className="scroll-mt-28">
          <BlogGridSection
            locale={locale}
            className="pt-16 sm:pt-20"
            heading={{
              eyebrow: locale === "en" ? "For a little more clarity" : "Pour y voir un peu plus clair",
              title:
                locale === "en"
                  ? "Clear answers for the questions behind the question"
                  : "Des réponses claires aux questions derrière la question",
            }}
            description={
              locale === "en"
                ? "Read at your own pace, then keep only the idea that helps you decide what to do next."
                : "Lisez à votre rythme, puis gardez seulement l'idée qui vous aide à choisir la suite."
            }
          />
        </div>

        <section id="support" className="scroll-mt-28 pt-16 sm:pt-20">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
              {locale === "en" ? "When you want support" : "Quand vous souhaitez être accompagné"}
            </div>
            <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
              {locale === "en" ? "Choose the rhythm that fits the moment" : "Choisissez le rythme qui convient au moment"}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
              {locale === "en"
                ? "A focused boost for a near deadline, or a regular rhythm to make progress feel steadier."
                : "Un coup de pouce ciblé avant une échéance, ou un rythme régulier pour avancer avec plus de stabilité."}
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {supportPaths.map(({ icon: Icon, routeKey, badge, title, description, details, cta }) => (
              <MotionCard
                key={routeKey}
                className="glass-panel rounded-[28px] border-white/10 bg-white/[0.04] p-5 text-white sm:rounded-[32px] sm:p-7"
              >
                <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-sm uppercase tracking-[0.2em] text-white/45">{badge}</div>
                <h3 className="mt-3 font-display text-3xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{description}</p>

                <ul className="mt-6 grid gap-2">
                  {details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm leading-6 text-white/75"
                    >
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant="outline"
                  className="mt-6 w-full justify-center rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={getLocalizedPath(routeKey, locale)}>
                    {cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </MotionCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
