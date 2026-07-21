import { CalendarDays, Phone } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import {
  ContactSection,
  FaqGrid,
  FeatureGrid,
  HeroShowcase,
} from "@/components/SimpleMarketingSections"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, BOOKING_URL_EN } from "@/config/booking"
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
import { getParentJourney } from "@/lib/parentJourney"
import { getRobotsDirective } from "@/lib/searchIndexStrategy"
import { siteConfig } from "@/lib/seo"

export default function LocalLanding({ forcedRouteKey }) {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = forcedRouteKey || getRouteKeyFromPath(location.pathname)
  const page = localPageConfigs[routeKey]?.[locale]
  const path = getLocalizedPath(routeKey, locale)
  const requestUrl = locale === "en" ? BOOKING_URL_EN : BOOKING_URL

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
                ? "This page is not available right now."
                : "Cette page n'est pas disponible pour le moment."}
            </h1>
            <div className="mt-8">
              <Button asChild className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                <Link to={getLocalizedPath("home", locale)}>
                  {locale === "en" ? "Back to home" : "Retour à l'accueil"}
                </Link>
              </Button>
            </div>
          </MotionCard>
        </main>
      </div>
    )
  }

  const locationCards = page.highlights.map((entry, index) => ({
    title:
      locale === "en"
        ? ["Clarity first", "Right format", "Serious support"][index] || `Reason ${index + 1}`
        : ["Clarté d'abord", "Bon format", "Accompagnement sérieux"][index] || `Point ${index + 1}`,
    description: entry,
  }))

  const schema = [
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
    },
  ]

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={page.seoTitle}
        description={page.seoDescription}
        path={path}
        keywords={page.keywords}
        jsonLd={schema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates(routeKey)}
        robots={getRobotsDirective(routeKey)}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <HeroShowcase
          badge={page.eyebrow}
          title={page.heroTitle}
          description={page.heroText}
          primaryAction={{
            label: locale === "en" ? "Request the right starting point" : "Demander le bon point de départ",
            href: requestUrl,
            icon: CalendarDays,
          }}
          secondaryAction={{
            label: locale === "en" ? "Call if urgent" : "Appeler si c'est urgent",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          panelEyebrow={locale === "en" ? "Local reassurance" : "Repères locaux"}
          panelTitle={
            locale === "en"
              ? `A clearer experience for families in ${page.city}`
              : `Une expérience plus claire pour les familles de ${page.city}`
          }
          panelItems={page.highlights}
          panelNote={
            locale === "en"
              ? "The goal is to make the next step feel easier, more serious and more structured."
              : "Le but est de rendre le prochain pas plus simple, plus sérieux et plus structuré."
          }
          journey={getParentJourney(locale)}
        />

        <FeatureGrid
          eyebrow={locale === "en" ? "Why families choose this page" : "Pourquoi cette page aide"}
          title={
            locale === "en"
              ? `What families in ${page.city} usually want clarified`
              : `Ce que les familles de ${page.city} veulent clarifier rapidement`
          }
          description={
            locale === "en"
              ? "The strongest local pages are the ones that make the decision easier, not heavier."
              : "Les meilleures pages locales sont celles qui rendent la décision plus simple, pas plus lourde."
          }
          items={locationCards}
        />

        <ContactSection
          locale={locale}
          eyebrow={locale === "en" ? "Contact" : "Contact"}
          title={
            locale === "en"
              ? `Tell us what is happening in ${page.city}`
              : `Parlez-nous de la situation à ${page.city}`
          }
          description={
            locale === "en"
              ? "Send a short request whether the need is one-time or likely to need a 10-session progress block. The optional mini-assessment can help if the format is still unclear."
              : "Envoyez une courte demande, que le besoin soit ponctuel ou qu'un bloc de progression de 10 séances semble utile. Le mini-bilan facultatif peut aider si le format reste flou."
          }
          bullets={[
            locale === "en"
              ? "Mention the subject, grade level and whether the need is one-time or likely to continue; you can also say if a weekly time would help."
              : "Mentionnez la matière, le niveau et si le besoin est ponctuel ou appelé à se poursuivre; vous pouvez aussi dire si un créneau hebdomadaire aiderait.",
            locale === "en"
              ? "If online support is acceptable, say it right away."
              : "Si le format en ligne vous convient, dites-le dès le départ.",
            locale === "en"
              ? "If an exam is coming, include the date."
              : "Si un examen approche, indiquez la date.",
          ]}
          pageName={`${routeKey}-${locale}`}
        />

        <FaqGrid
          eyebrow={locale === "en" ? "Local FAQ" : "FAQ locale"}
          title={
            locale === "en"
              ? `Common local questions about tutoring in ${page.city}`
              : `Questions locales fréquentes sur le tutorat à ${page.city}`
          }
          description={
            locale === "en"
              ? "Short practical answers before requesting a session."
              : "Des réponses pratiques et courtes avant de demander une séance."
          }
          items={page.faq}
          columns="lg:grid-cols-3"
        />
      </main>
    </div>
  )
}
