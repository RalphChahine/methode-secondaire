import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  Sparkles,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import ParentJourneyNote from "@/components/ParentJourneyNote"
import ProgressJourney from "@/components/ProgressJourney"
import ResourceGridSection from "@/components/ResourceGridSection"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, BOOKING_URL_EN } from "@/config/booking"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
  getRouteKeyFromPath,
} from "@/lib/i18n"
import { getResourcePageContent, resourceRouteKeys } from "@/lib/resourceContent"
import { getRobotsDirective } from "@/lib/searchIndexStrategy"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const serviceRouteByResource = {
  mathExamPrep: "maths",
  scienceExamPrep: "sciences",
  sec4Math: "maths",
  catchUp: "home",
}

const uiByLocale = {
  fr: {
    maths: "Voir la page maths",
    sciences: "Voir la page sciences",
    home: "Retour à l'accueil",
    relatedEyebrow: "Guides liés",
    relatedTitle: "Continuer avec les pages les plus proches du besoin",
    relatedDescription:
      "Ces autres ressources couvrent les situations qui reviennent souvent juste avant qu'une famille appelle ou demande une séance.",
    unavailable: "Ressource indisponible",
    unavailableText:
      "Cette ressource n'est pas disponible pour le moment, mais vous pouvez continuer vers les pages matières, appeler ou demander une séance ciblée.",
    backHome: "Retour à l'accueil",
    quickSignals: "Ce que cette page aide à clarifier",
    planEyebrow: "Plan concret",
    planTitle: "Une façon plus claire d'avancer",
    mistakesEyebrow: "Erreurs fréquentes",
    tutoringEyebrow: "Quand le tutorat aide le plus",
    faqEyebrow: "Questions fréquentes",
    faqTitle: "Les questions qui reviennent souvent",
    faqDescription:
      "Des réponses courtes et utiles pour savoir quand agir, quoi prioriser et comment sortir plus vite du flou.",
    readingPathEyebrow: "Votre parcours de lecture",
    readingPathIntro: "Un plan court pour passer du signal observé à une prochaine action réaliste.",
    planCount: "étapes",
    ctaCall: "Appeler maintenant",
    ctaBook: "Demander une séance ciblée",
    ctaHub: "Voir toutes les ressources",
  },
  en: {
    maths: "See the math page",
    sciences: "See the science page",
    home: "Back to home",
    relatedEyebrow: "Related guides",
    relatedTitle: "Keep going with the pages closest to the current need",
    relatedDescription:
      "These resources cover the situations families often search right before they call or request a session.",
    unavailable: "Resource unavailable",
    unavailableText:
      "This resource is not available right now, but you can keep going through the subject pages, call or request a focused session.",
    backHome: "Back to home",
    quickSignals: "What this page helps clarify",
    planEyebrow: "Concrete plan",
    planTitle: "A clearer way to move forward",
    mistakesEyebrow: "Common mistakes",
    tutoringEyebrow: "When tutoring helps most",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "Questions families often ask",
    faqDescription:
      "Short answers about when to act, what to prioritize and how to get out of the confusion faster.",
    readingPathEyebrow: "Your reading path",
    readingPathIntro: "A short plan to move from the signal you notice to one realistic next action.",
    planCount: "steps",
    ctaCall: "Call now",
    ctaBook: "Request a focused session",
    ctaHub: "See all resources",
  },
}

export default function ResourceArticle() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = getRouteKeyFromPath(location.pathname)
  const copy = getResourcePageContent(routeKey, locale)
  const ui = uiByLocale[locale]
  const requestUrl = locale === "en" ? BOOKING_URL_EN : BOOKING_URL

  if (!copy || !resourceRouteKeys.includes(routeKey)) {
    return (
      <div className="relative overflow-hidden">
        <main className="mx-auto w-full max-w-5xl px-5 pb-20 pt-16 sm:px-6 lg:px-8">
          <MotionCard className="rounded-[32px] border-white/10 bg-white/[0.05] p-8 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{ui.unavailable}</div>
            <h1 className="mt-4 font-display text-4xl font-semibold">{ui.unavailable}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/72">{ui.unavailableText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                <Link to={getLocalizedPath("home", locale)}>{ui.backHome}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <a href={requestUrl}>
                  {ui.ctaBook}
                </a>
              </Button>
            </div>
          </MotionCard>
        </main>
      </div>
    )
  }

  const path = getLocalizedPath(routeKey, locale)
  const serviceRouteKey = serviceRouteByResource[routeKey]
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: copy.heroTitle,
    description: copy.seoDescription,
    mainEntityOfPage: absoluteUrl(path),
    url: absoluteUrl(path),
    inLanguage: getHtmlLang(locale),
    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/Methode_Secondaire.png"),
      },
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        keywords={copy.keywords}
        jsonLd={[articleSchema, faqSchema]}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates(routeKey)}
        robots={getRobotsDirective(routeKey)}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:gap-8">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.eyebrow}
            </Badge>

            <h1 className="balanced-copy mt-6 font-display text-4xl font-semibold leading-[0.98] text-white sm:mt-7 sm:text-6xl">
              {copy.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{copy.heroText}</p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                className="w-full rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <PhoneCall className="h-4 w-4" />
                  {ui.ctaCall}
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <a href={requestUrl}>
                  {ui.ctaBook}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              {serviceRouteKey && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={getLocalizedPath(serviceRouteKey, locale)}>{ui[serviceRouteKey]}</Link>
                </Button>
              )}
            </div>

            <ParentJourneyNote locale={locale} className="mt-6 max-w-2xl" />
          </div>

          <aside className="action-surface rounded-[32px] p-6 text-white sm:p-7">
            <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">{ui.quickSignals}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold">{copy.quickSignalsTitle}</h2>

            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {copy.quickSignals.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-4"
                >
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  <span className="text-sm leading-7 text-white/78">{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <ProgressJourney
          className="mt-12 sm:mt-16"
          eyebrow={ui.readingPathEyebrow}
          title={copy.planTitle || ui.planTitle}
          intro={ui.readingPathIntro}
          steps={copy.planSteps.map((step) => ({ label: step.title, description: step.description }))}
          currentIndex={0}
          countLabel={ui.planCount}
          columns="grid-cols-1 sm:grid-cols-3"
        />

        <section className="pt-12 sm:pt-16">
          <div className="grid gap-4 lg:grid-cols-2">
            <aside className="glass-panel rounded-[32px] border-white/10 bg-white/[0.04] p-6 text-white sm:p-7">
              <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{ui.mistakesEyebrow}</div>
              <h2 className="mt-4 font-display text-3xl font-semibold">{copy.mistakesTitle}</h2>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {copy.mistakes.map((mistake) => (
                  <li
                    key={mistake}
                    className="flex items-start gap-3 py-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    <span className="text-sm leading-7 text-white/78">{mistake}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <aside className="panel-soft rounded-[32px] p-6 text-white sm:p-7">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">{ui.tutoringEyebrow}</div>
              <h2 className="mt-3 font-display text-3xl font-semibold">{copy.tutoringTitle}</h2>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {copy.tutoringPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 py-4"
                  >
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    <span className="text-sm leading-7 text-white/78">{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="pt-12 sm:pt-16">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{ui.faqEyebrow}</div>
            <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
              {ui.faqTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{ui.faqDescription}</p>
          </div>

          <div className="mt-7 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045]">
            {copy.faq.map((item) => (
              <details
                key={item.question}
                className="group px-5 text-white [&+details]:border-t [&+details]:border-white/10 sm:px-7"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-xl font-semibold leading-snug marker:hidden sm:text-2xl">
                  <span>{item.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#f5c977] transition duration-200 group-open:rotate-180" />
                </summary>
                <p className="max-w-3xl pb-6 text-sm leading-7 text-white/72">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="pt-12 sm:pt-16">
          <div className="action-surface rounded-[34px] p-7 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {copy.eyebrow}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{copy.ctaTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.ctaText}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  className="w-full rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
                >
                  <a href={`tel:${siteConfig.phone}`}>{ui.ctaCall}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <a href={requestUrl}>
                    {ui.ctaBook}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={getLocalizedPath("resourcesHub", locale)}>{ui.ctaHub}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ResourceGridSection
          locale={locale}
          className="pt-20"
          routeKeys={copy.relatedRouteKeys}
          heading={{ eyebrow: ui.relatedEyebrow, title: ui.relatedTitle }}
          description={ui.relatedDescription}
          showHubLink={false}
        />
      </main>
    </div>
  )
}
