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
import { getOfferPageConfig } from "@/lib/offerContent"
import { getParentJourney } from "@/lib/parentJourney"
import { getRobotsDirective } from "@/lib/searchIndexStrategy"
import { absoluteUrl, siteConfig } from "@/lib/seo"

export default function OfferLanding({ forcedRouteKey }) {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = forcedRouteKey || getRouteKeyFromPath(location.pathname)
  const page = getOfferPageConfig(routeKey, locale)
  const path = getLocalizedPath(routeKey, locale)

  if (!page) {
    return (
      <div className="relative overflow-hidden">
        <main className="mx-auto w-full max-w-5xl px-5 pb-20 pt-16 sm:px-6 lg:px-8">
          <MotionCard className="rounded-[32px] border-white/10 bg-white/[0.05] p-8 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
              {locale === "en" ? "Offer unavailable" : "Offre indisponible"}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold">
              {locale === "en"
                ? "This offer page is not available right now."
                : "Cette page d'offre n'est pas disponible pour le moment."}
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

  const showBookingButton = page.showBookingButton !== false
  const primaryLabel = page.callLabel || (locale === "en" ? "Call first" : "Appeler d'abord")
  const secondaryLabel =
    page.bookingLabel || (locale === "en" ? "Book a focused session" : "Réserver une séance ciblée")

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.seoTitle,
      url: absoluteUrl(path),
      description: page.seoDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.heroTitle,
      serviceType: page.serviceType || (locale === "en" ? "Tutoring support" : "Accompagnement scolaire"),
      provider: {
        "@type": "EducationalOrganization",
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        telephone: siteConfig.phone,
        email: siteConfig.email,
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Quebec" },
        { "@type": "City", name: "Montreal" },
        { "@type": "City", name: "Laval" },
      ],
    },
  ]

  const fitItems = page.fitCards.map((card) => ({
    title: card.title,
    description: card.description,
  }))

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

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <HeroShowcase
          badge={page.eyebrow}
          title={page.heroTitle}
          description={page.heroText}
          primaryAction={{
            label: primaryLabel,
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          secondaryAction={
            showBookingButton
              ? {
                  label: secondaryLabel,
                  href: BOOKING_URL,
                  external: true,
                  icon: CalendarDays,
                }
              : null
          }
          panelEyebrow={locale === "en" ? "Best fit" : "Bon fit"}
          panelTitle={page.fitTitle}
          panelItems={page.highlights}
          panelNote={page.fitDescription}
          journey={getParentJourney(locale)}
        />

        <FeatureGrid
          eyebrow={page.fitEyebrow}
          title={
            locale === "en"
              ? "Who this offer is really for"
              : "Pour qui cette offre est vraiment utile"
          }
          description={page.fitDescription}
          items={fitItems}
        />

        <ContactSection
          locale={locale}
          eyebrow={locale === "en" ? "Contact" : "Contact"}
          title={page.formTitle}
          description={page.formText}
          bullets={[
            locale === "en"
              ? "Mention the chapter, exam date or main concern if you know them."
              : "Mentionnez le chapitre, la date d'examen ou le point le plus urgent si vous les connaissez.",
            locale === "en"
              ? "If the need is still unclear, calling first usually saves time."
              : "Si le besoin reste flou, appeler d'abord fait souvent gagner du temps.",
            locale === "en"
              ? "If the need is urgent and already clear, booking can be the fastest route."
              : "Si le besoin est urgent et déjà clair, la réservation peut être la voie la plus rapide.",
          ]}
          pageName={`${routeKey}-${locale}`}
        />

        <FaqGrid
          eyebrow={locale === "en" ? "FAQ" : "FAQ"}
          title={
            locale === "en"
              ? "What families usually ask before moving forward"
              : "Ce que les familles demandent souvent avant d'avancer"
          }
          description={
            locale === "en"
              ? "Short answers so the decision feels easier."
              : "Des réponses courtes pour que la décision soit plus simple."
          }
          items={page.faq}
          columns="lg:grid-cols-3"
        />
      </main>
    </div>
  )
}
