import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
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
  getRouteKeyFromPath,
} from "@/lib/i18n"
import { getResourcePageContent, resourceRouteKeys } from "@/lib/resourceContent"
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
    home: "Retour a l'accueil",
    relatedEyebrow: "Guides lies",
    relatedTitle: "Continuer avec les pages les plus proches du besoin",
    relatedDescription:
      "Ces autres ressources couvrent les situations qui reviennent souvent juste avant qu'une famille appelle ou reserve.",
    unavailable: "Ressource indisponible",
    unavailableText:
      "Cette ressource n'est pas disponible pour le moment, mais vous pouvez continuer vers les pages matieres ou reserver un appel.",
    backHome: "Retour a l'accueil",
    quickSignals: "Ce que cette page aide a clarifier",
    planEyebrow: "Plan concret",
    planTitle: "Une facon plus claire d'avancer",
    mistakesEyebrow: "Erreurs frequentes",
    tutoringEyebrow: "Quand le tutorat aide le plus",
    faqEyebrow: "Questions frequentes",
    faqTitle: "Les questions qui reviennent souvent",
    faqDescription:
      "Des reponses courtes et utiles pour savoir quand agir, quoi prioriser et comment sortir plus vite du flou.",
    ctaCall: "Appeler maintenant",
    ctaBook: "Reserver une seance",
    ctaHub: "Voir toutes les ressources",
  },
  en: {
    maths: "See the math page",
    sciences: "See the science page",
    home: "Back to home",
    relatedEyebrow: "Related guides",
    relatedTitle: "Keep going with the pages closest to the current need",
    relatedDescription:
      "These resources cover the situations families often search right before they call or book.",
    unavailable: "Resource unavailable",
    unavailableText:
      "This resource is not available right now, but you can keep going through the subject pages or book a quick call.",
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
    ctaCall: "Call now",
    ctaBook: "Book a session",
    ctaHub: "See all resources",
  },
}

export default function ResourceArticle() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = getRouteKeyFromPath(location.pathname)
  const copy = getResourcePageContent(routeKey, locale)
  const ui = uiByLocale[locale]

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
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
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
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.eyebrow}
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
                <a href={`tel:${siteConfig.phone}`}>
                  <PhoneCall className="h-4 w-4" />
                  {ui.ctaCall}
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  {ui.ctaBook}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              {serviceRouteKey && (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath(serviceRouteKey, locale)}>{ui[serviceRouteKey]}</Link>
                </Button>
              )}
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">{ui.quickSignals}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold">{copy.quickSignalsTitle}</h2>

            <ul className="mt-6 space-y-4">
              {copy.quickSignals.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                >
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  <span className="text-sm leading-7 text-white/78">{item}</span>
                </li>
              ))}
            </ul>
          </MotionCard>
        </section>

        <section className="pt-20">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{ui.planEyebrow}</div>
            <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
              {copy.planTitle || ui.planTitle}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {copy.planSteps.map((step, index) => (
              <MotionCard key={step.title} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
                <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
                  {locale === "en" ? `Step 0${index + 1}` : `Etape 0${index + 1}`}
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{step.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <div className="grid gap-4 lg:grid-cols-2">
            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.04] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{ui.mistakesEyebrow}</div>
              <h2 className="mt-4 font-display text-3xl font-semibold">{copy.mistakesTitle}</h2>
              <ul className="mt-6 space-y-4">
                {copy.mistakes.map((mistake) => (
                  <li
                    key={mistake}
                    className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    <span className="text-sm leading-7 text-white/78">{mistake}</span>
                  </li>
                ))}
              </ul>
            </MotionCard>

            <MotionCard className="rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-7 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">{ui.tutoringEyebrow}</div>
              <h2 className="mt-3 font-display text-3xl font-semibold">{copy.tutoringTitle}</h2>
              <ul className="mt-6 space-y-4">
                {copy.tutoringPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    <span className="text-sm leading-7 text-white/78">{point}</span>
                  </li>
                ))}
              </ul>
            </MotionCard>
          </div>
        </section>

        <section className="pt-20">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{ui.faqEyebrow}</div>
            <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
              {ui.faqTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{ui.faqDescription}</p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {copy.faq.map((item) => (
              <MotionCard
                key={item.question}
                className="glass-panel rounded-[28px] border-white/10 bg-white/[0.05] p-6 text-white"
              >
                <h3 className="font-display text-2xl font-semibold">{item.question}</h3>
                <p className="mt-4 text-sm leading-7 text-white/72">{item.answer}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(122,180,255,0.16),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {copy.eyebrow}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{copy.ctaTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.ctaText}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={`tel:${siteConfig.phone}`}>{ui.ctaCall}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    {ui.ctaBook}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath("resourcesHub", locale)}>{ui.ctaHub}</Link>
                </Button>
              </div>
            </div>
          </MotionCard>
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
