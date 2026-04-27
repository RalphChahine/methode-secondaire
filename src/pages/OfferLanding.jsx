import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Phone,
  Sparkles,
  Target,
} from "lucide-react"

import AiDiagnosticSection from "@/components/AiDiagnosticSection"
import { GuaranteeSection, VerifiedReviewsSection } from "@/components/ConversionSections"
import LeadForm from "@/components/LeadForm"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocalizedPath,
  getLocaleFromPath,
  getOgLocale,
  getRouteKeyFromPath,
} from "@/lib/i18n"
import { getOfferPageConfig } from "@/lib/offerContent"
import { absoluteUrl, siteConfig } from "@/lib/seo"

export default function OfferLanding({ forcedRouteKey }) {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = forcedRouteKey || getRouteKeyFromPath(location.pathname)
  const page = getOfferPageConfig(routeKey, locale)
  const path = getLocalizedPath(routeKey, locale)
  const showBookingButton = page?.showBookingButton !== false
  const callLabel = page?.callLabel || (locale === "en" ? "Call first" : "Appeler d'abord")
  const bookingLabel = page?.bookingLabel || (locale === "en" ? "Book a focused session" : "Réserver une séance ciblée")
  const heroNote =
    page?.heroNote ||
    (locale === "en"
      ? "When the situation is urgent but still fuzzy, the diagnostic or a short call is usually the fastest first move. Weekly follow-up is still better discussed by phone first."
      : "Quand la situation est urgente mais encore floue, le diagnostic ou un court appel reste souvent le premier pas le plus rapide. Un suivi hebdomadaire se discute quand même mieux d'abord par téléphone.")
  const breadcrumbLabel = locale === "en" ? "Home" : "Accueil"
  const heroPanelTitle =
    page?.heroPanelTitle ||
    (locale === "en"
      ? "A clearer entry point when the need is already real"
      : "Une porte d'entree plus claire quand le besoin est deja reel")
  const heroPanelText =
    page?.heroPanelText ||
    (locale === "en"
      ? "The goal is not to add random tutoring hours. The goal is to create more clarity, better decisions and the right next move for the family."
      : "Le but n'est pas d'ajouter des heures au hasard. Le but est de creer plus de clarte, de meilleures decisions et la bonne prochaine etape pour la famille.")
  const relatedDescription =
    page?.relatedDescription ||
    (locale === "en"
      ? "These pages are the most natural next steps when a family is comparing one focused need with broader tutoring support."
      : "Ces pages sont les suites les plus naturelles quand une famille compare un besoin cible avec un accompagnement plus large.")

  function openDiagnostic() {
    if (typeof window === "undefined") {
      return
    }

    window.dispatchEvent(new CustomEvent("methode:open-diagnostic"))
  }

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
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/72">
              {locale === "en"
                ? "You can continue with the main subject pages or use the diagnostic to reach the best next step."
                : "Vous pouvez continuer avec les pages matières principales ou utiliser le diagnostic pour trouver la meilleure suite."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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

  const schemas = [
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
      serviceType: page.serviceType || (locale === "en" ? "Exam prep tutoring" : "Tutorat preparation examens"),
      provider: {
        "@type": "EducationalOrganization",
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        telephone: siteConfig.phone,
        email: siteConfig.email,
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: locale === "en" ? "Quebec" : "Quebec" },
        { "@type": "City", name: "Montreal" },
        { "@type": "City", name: "Laval" },
      ],
      offers: {
        "@type": "Offer",
        url: showBookingButton ? BOOKING_URL : absoluteUrl(path),
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: breadcrumbLabel,
          item: absoluteUrl(getLocalizedPath("home", locale)),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.eyebrow,
          item: absoluteUrl(path),
        },
      ],
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

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-[#f5c977]/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-[#4a8bff]/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/55">
              <Link to={getLocalizedPath("home", locale)} className="transition hover:text-white">
                {breadcrumbLabel}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white/75">{page.eyebrow}</span>
            </div>
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {page.eyebrow}
            </Badge>

            <h1 className="balanced-copy mt-7 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
              {page.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{page.heroText}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                type="button"
                className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                onClick={openDiagnostic}
              >
                <Sparkles className="h-4 w-4" />
                {locale === "en" ? "Start the diagnostic" : "Lancer le diagnostic"}
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  {callLabel}
                </a>
              </Button>

              {showBookingButton ? (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    <CalendarDays className="h-4 w-4" />
                    {bookingLabel}
                  </a>
                </Button>
              ) : null}
              </div>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
              {heroNote}
            </p>
          </div>

          <MotionCard className="glass-panel rounded-[34px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-white/45">
              {locale === "en" ? "Best fit" : "Format ideal"}
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              {locale === "en"
                ? "A strong fit when the exam window is already real"
                : "Un bon format quand la fenêtre d'examen est déjà concrète"}
            </h2>

            <div className="mt-6 space-y-4 text-sm text-white/80">
              {page.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                >
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {highlight}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-[#081a38]/80 px-5 py-5 text-sm leading-7 text-white/72">
              {locale === "en"
                ? "The goal is not to flood the student with more work. The goal is to restore order, confidence and better decisions before the test."
                : "Le but n'est pas d'inonder l'élève avec plus de travail. Le but est de remettre de l'ordre, de la confiance et de meilleures priorités avant l'évaluation."}
            </div>
          </MotionCard>
        </section>

        <section className="pt-20">
          <SectionHeader eyebrow={page.fitEyebrow} title={page.fitTitle} description={page.fitDescription} />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {page.fitCards.map((card) => (
              <MotionCard key={card.title} className="glass-panel rounded-[30px] border-white/10 bg-white/[0.04] p-7 text-white">
                <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{card.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader eyebrow={page.processEyebrow} title={page.processTitle} />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {page.processSteps.map((step) => (
              <MotionCard key={step.step} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
                <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{step.step}</div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{step.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader eyebrow={page.includedEyebrow} title={page.includedTitle} />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {page.includedItems.map((item, index) => (
              <MotionCard
                key={item}
                className="glass-panel rounded-[28px] border-white/10 bg-white/[0.04] p-6 text-white"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                    {index % 2 === 0 ? <Clock3 className="h-5 w-5" /> : <Check className="h-5 w-5" />}
                  </div>
                  <p className="text-sm leading-7 text-white/78">{item}</p>
                </div>
              </MotionCard>
            ))}
          </div>
        </section>

        <VerifiedReviewsSection locale={locale} className="pt-20" limit={3} showLink />
        <GuaranteeSection locale={locale} className="pt-20" />
        <AiDiagnosticSection locale={locale} className="pt-20" />

        <section className="pt-20">
          <SectionHeader
            eyebrow={locale === "en" ? "Helpful next pages" : "Pages utiles ensuite"}
            title={locale === "en" ? "Keep moving with the most relevant pages" : "Continuer avec les pages les plus utiles"}
            description={
              locale === "en"
                ? "These pages are the most natural follow-up when a family is comparing an exam sprint with broader tutoring support."
                : "Ces pages sont les suites les plus naturelles quand une famille compare un Sprint examen avec un accompagnement plus large."
            }
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {page.relatedLinks.map((entry) => (
              <Button
                key={entry.routeKey}
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath(entry.routeKey, locale)}>
                  {entry.label}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={locale === "en" ? "FAQ" : "Questions frequentes"}
            title={locale === "en" ? "What families often ask before booking" : "Ce que les familles demandent souvent avant de réserver"}
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
                <Sparkles className="mr-2 h-4 w-4" />
                {page.eyebrow}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{page.ctaTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{page.ctaText}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  type="button"
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                  onClick={openDiagnostic}
                >
                  {locale === "en" ? "Start the diagnostic" : "Lancer le diagnostic"}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    {callLabel}
                  </a>
                </Button>
                {showBookingButton ? (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                  >
                    <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                      {bookingLabel}
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </MotionCard>
        </section>

        <section id="contact" className="pt-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.04] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
                {locale === "en" ? "Before you send" : "Avant d'envoyer"}
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold">{page.formTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-white/72">{page.formText}</p>
              <div className="mt-6 space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {locale === "en"
                    ? "Mention the subject, chapter and exam date if you know them."
                    : "Mentionnez la matière, le chapitre et la date de l'examen si vous les connaissez."}
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {locale === "en"
                    ? "If the need is urgent, calling remains the fastest route."
                    : "Si le besoin est urgent, l'appel reste le chemin le plus rapide."}
                </div>
              </div>
            </MotionCard>

            <LeadForm locale={locale} />
          </div>
        </section>
      </main>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{eyebrow}</div> : null}
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description}</p> : null}
    </div>
  )
}
