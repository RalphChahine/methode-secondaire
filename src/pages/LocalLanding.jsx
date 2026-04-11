import { Link, useLocation } from "react-router-dom"
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react"

import {
  GuaranteeSection,
  OperationalPromisesSection,
  VerifiedReviewsSection,
} from "@/components/ConversionSections"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { localPageConfigs } from "@/lib/conversionContent"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocalizedPath,
  getLocaleFromPath,
  getOgLocale,
  getRouteKeyFromPath,
} from "@/lib/i18n"
import { siteConfig } from "@/lib/seo"

export default function LocalLanding({ forcedRouteKey }) {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = forcedRouteKey || getRouteKeyFromPath(location.pathname)
  const page = localPageConfigs[routeKey]?.[locale]
  const path = getLocalizedPath(routeKey, locale)

  if (!page) {
    return (
      <div className="relative overflow-hidden">
        <main className="mx-auto w-full max-w-5xl px-5 pb-20 pt-16 sm:px-6 lg:px-8">
          <MotionCard className="rounded-[32px] border-white/10 bg-white/[0.05] p-8 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
              {locale === "en" ? "Page unavailable" : "Page indisponible"}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold">
              {locale === "en"
                ? "This page is temporarily unavailable."
                : "Cette page est momentanément indisponible."}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/72">
              {locale === "en"
                ? "You can continue with the main tutoring pages or explore the tutor profiles while we guide you to the best next step."
                : "Vous pouvez continuer avec les pages principales ou consulter les profils tuteurs pendant que nous vous guidons vers la meilleure suite."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                <Link to={getLocalizedPath("home", locale)}>
                  {locale === "en" ? "Back to home" : "Retour à l'accueil"}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("tuteurs", locale)}>
                  {locale === "en" ? "See tutors" : "Voir les tuteurs"}
                </Link>
              </Button>
            </div>
          </MotionCard>
        </main>
      </div>
    )
  }

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.seoTitle,
      url: `${siteConfig.siteUrl}${path}`,
      description: page.seoDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.heroTitle,
      serviceType: locale === "en" ? "High school tutoring" : "Tutorat secondaire",
      areaServed: [
        { "@type": "AdministrativeArea", name: locale === "en" ? "Quebec" : "Québec" },
        { "@type": "City", name: page.city },
      ],
      provider: {
        "@type": "EducationalOrganization",
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        telephone: siteConfig.phone,
        email: siteConfig.email,
      },
      offers: {
        "@type": "Offer",
        url: BOOKING_URL,
        priceCurrency: "CAD",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.answer,
        },
      })),
    },
  ]

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={page.seoTitle}
        description={page.seoDescription}
        path={path}
        keywords={page.keywords}
        jsonLd={schemas}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates(routeKey)}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {page.eyebrow}
            </Badge>

            <h1 className="balanced-copy mt-7 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
              {page.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{page.heroText}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  {locale === "en" ? "Call for a diagnostic" : "Appeler pour un diagnostic"}
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  <ArrowRight className="h-4 w-4" />
                  {locale === "en" ? "Book a session" : "Réserver une séance"}
                </a>
              </Button>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/68">
              {locale === "en"
                ? "A short phone call is often the easiest way to explain the situation before booking."
                : "Un court appel est souvent la façon la plus simple d'expliquer la situation avant de réserver."}
            </p>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-white/45">
              {locale === "en" ? "What families appreciate" : "Ce que les familles apprécient"}
            </div>
            <div className="mt-3 font-display text-3xl font-semibold">
              {locale === "en"
                ? `A clear, reassuring experience for families in ${page.city}`
                : `Un accompagnement clair et rassurant pour les familles de ${page.city}`}
            </div>

            <ul className="mt-6 space-y-4 text-sm text-white/80">
              {page.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-[#081a38]/80 px-5 py-5 text-sm leading-7 text-white/72">
              {locale === "en"
                ? "Families want to understand quickly whether the support will feel serious, clear and well organized. That is exactly what this page is here to show."
                : "Les familles veulent comprendre rapidement si l'accompagnement sera sérieux, clair et bien organisé. C'est exactement ce que cette page montre."}
            </div>
          </MotionCard>
        </section>

        <GuaranteeSection locale={locale} className="pt-20" />
        <OperationalPromisesSection locale={locale} className="pt-20" />
        <VerifiedReviewsSection locale={locale} className="pt-20" limit={2} showLink />

        <section className="pt-20">
          <SectionHeader
            eyebrow={locale === "en" ? "Local FAQ" : "FAQ locale"}
            title={
              locale === "en"
                ? `Common questions about tutoring in ${page.city}`
                : `Questions fréquentes sur le tutorat à ${page.city}`
            }
            description={
              locale === "en"
                ? "These questions answer the practical concerns families often have before booking locally."
                : "Ces réponses couvrent les questions pratiques que les familles se posent souvent avant de réserver localement."
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {page.faq.map((entry) => (
              <MotionCard key={entry.question} className="glass-panel rounded-[28px] border-white/10 bg-white/[0.04] p-6 text-white">
                <h2 className="font-display text-2xl font-semibold">{entry.question}</h2>
                <p className="mt-4 text-sm leading-7 text-white/72">{entry.answer}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                <MapPin className="mr-2 h-4 w-4" />
                {page.city}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">
                {locale === "en"
                  ? "Ready to move forward with a clearer tutoring plan?"
                  : "Prêt à avancer avec un plan de tutorat plus clair?"}
              </h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">
                {locale === "en"
                  ? "Book a first conversation, explore the subject pages or compare the tutor profiles before making the next step."
                  : "Réservez un premier échange, consultez les pages matières ou comparez les profils tuteurs avant la prochaine étape."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    {locale === "en" ? "Call now" : "Appeler maintenant"}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    {locale === "en" ? "Book a session" : "Réserver une séance"}
                  </a>
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
