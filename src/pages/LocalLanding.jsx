import { CalendarDays, MapPin, Phone } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { VerifiedReviewsSection } from "@/components/ConversionSections"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import {
  ContactSection,
  FaqGrid,
  FeatureGrid,
  FinalCtaSection,
  HeroShowcase,
  StepGrid,
} from "@/components/SimpleMarketingSections"
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
import { getRobotsDirective } from "@/lib/searchIndexStrategy"
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

  const steps =
    locale === "en"
      ? [
          {
            step: "01",
            title: "Explain the local need",
            description: `Tell us what is happening for the student in ${page.city} and whether the need is urgent, weekly or subject-specific.`,
          },
          {
            step: "02",
            title: "We choose the smartest format",
            description: "We help decide between a one-time session, steadier follow-up or online support across Quebec.",
          },
          {
            step: "03",
            title: "The family moves forward with a clearer plan",
            description: "The next step becomes easier because the path, format and priorities are more explicit.",
          },
        ]
      : [
          {
            step: "01",
            title: "Expliquez le besoin local",
            description: `Dites-nous ce qui se passe pour l'élève à ${page.city} et si le besoin est urgent, régulier ou lié à une matière précise.`,
          },
          {
            step: "02",
            title: "On choisit le format le plus intelligent",
            description: "On vous aide à trancher entre séance ponctuelle, suivi plus régulier ou soutien en ligne partout au Québec.",
          },
          {
            step: "03",
            title: "La famille avance avec un plan plus clair",
            description: "La suite devient plus simple parce que le cadre, le rythme et les priorités sont mieux définis.",
          },
        ]

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
            label: locale === "en" ? "Call first" : "Appeler d'abord",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          secondaryAction={{
            label: locale === "en" ? "Book a focused session" : "Réserver une séance ciblée",
            href: BOOKING_URL,
            external: true,
            icon: CalendarDays,
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

        <StepGrid
          eyebrow={locale === "en" ? "Steps" : "Étapes"}
          title={
            locale === "en"
              ? `A simpler path for tutoring in ${page.city}`
              : `Un parcours plus simple pour le tutorat à ${page.city}`
          }
          description={
            locale === "en"
              ? "The page now helps parents understand the next move quickly."
              : "La page aide maintenant les parents à comprendre le prochain pas rapidement."
          }
          steps={steps}
        />

        <VerifiedReviewsSection locale={locale} className="pt-20" limit={2} showLink />

        <FaqGrid
          eyebrow={locale === "en" ? "Local FAQ" : "FAQ locale"}
          title={
            locale === "en"
              ? `Common local questions about tutoring in ${page.city}`
              : `Questions locales fréquentes sur le tutorat à ${page.city}`
          }
          description={
            locale === "en"
              ? "Short practical answers before booking."
              : "Des réponses pratiques et courtes avant de réserver."
          }
          items={page.faq}
          columns="lg:grid-cols-3"
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
              ? "If the need is clear, booking works well. If the family still needs direction, calling first is often better."
              : "Si le besoin est clair, la réservation fonctionne bien. Si la famille a encore besoin d'orientation, appeler d'abord aide souvent davantage."
          }
          bullets={[
            locale === "en"
              ? "Mention the subject, grade level and whether the need is one-time or weekly."
              : "Mentionnez la matière, le niveau et si le besoin est ponctuel ou hebdomadaire.",
            locale === "en"
              ? "If online support is acceptable, say it right away."
              : "Si le format en ligne vous convient, dites-le dès le départ.",
            locale === "en"
              ? "If an exam is coming, include the date."
              : "Si un examen approche, indiquez la date.",
          ]}
          pageName={`${routeKey}-${locale}`}
        />

        <FinalCtaSection
          badge={page.city}
          title={
            locale === "en"
              ? `Ready to move forward with a clearer tutoring plan in ${page.city}?`
              : `Prêt à avancer avec un plan de tutorat plus clair à ${page.city} ?`
          }
          description={
            locale === "en"
              ? "We can help you choose the right first move now."
              : "On peut vous aider à choisir le bon premier pas dès maintenant."
          }
          primaryAction={{
            label: locale === "en" ? "Call now" : "Appeler maintenant",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          secondaryAction={{
            label: locale === "en" ? "Book a session" : "Réserver une séance",
            href: BOOKING_URL,
            external: true,
            icon: MapPin,
          }}
        />
      </main>
    </div>
  )
}
