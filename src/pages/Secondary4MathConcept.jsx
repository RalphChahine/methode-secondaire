import { Link, useLocation } from "react-router-dom"
import { ArrowRight, BadgeCheck, PhoneCall } from "lucide-react"

import MotionCard from "@/components/MotionCard"
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
import { getSecondary4MathConceptPage } from "@/lib/secondary4MathTheoryContent"
import { absoluteUrl, siteConfig } from "@/lib/seo"

export default function Secondary4MathConcept() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = getRouteKeyFromPath(location.pathname)
  const copy = getSecondary4MathConceptPage(routeKey, locale)

  if (!copy) {
    return null
  }

  const path = getLocalizedPath(routeKey, locale)

  const schema = {
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
    },
  }

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        keywords={copy.seoKeywords}
        jsonLd={schema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates(routeKey)}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-8 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[#f5c977]/14 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.02fr,0.98fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.heroEyebrow}
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
                  {copy.reserveButton}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("secondary4MathTheory", locale)}>
                  {locale === "en" ? "Back to Secondary 4 theory" : "Retour à la théorie secondaire 4"}
                </Link>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.sequenceLabel}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold">{copy.sequenceTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {locale === "en"
                ? "This page is meant to help students recognize the concept faster, avoid the usual confusion and know when a focused session becomes the smarter shortcut."
                : "Cette page sert à reconnaître la notion plus vite, à éviter la confusion habituelle et à savoir quand une séance ciblée devient le meilleur raccourci."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs text-white/86">
                {locale === "en" ? "Detailed theory" : "Théorie détaillée"}
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs text-white/86">
                {locale === "en" ? "Frequent traps" : "Pièges fréquents"}
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs text-white/86">
                {locale === "en" ? "Exam-oriented" : "Orienté examen"}
              </span>
            </div>
          </MotionCard>
        </section>

        <section className="pt-20 grid gap-6 lg:grid-cols-2">
          <MotionCard className="rounded-[30px] border-white/10 bg-[#091a3a]/88 p-7 text-white">
            <div className="text-sm uppercase tracking-[0.22em] text-[#f5c977]">{copy.understandTitle}</div>
            <ul className="mt-5 space-y-4">
              {copy.essentials.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  <span className="text-sm leading-7 text-white/78">{item}</span>
                </li>
              ))}
            </ul>
          </MotionCard>

          <MotionCard className="rounded-[30px] border-white/10 bg-[#091a3a]/88 p-7 text-white">
            <div className="text-sm uppercase tracking-[0.22em] text-white/45">{copy.trapTitle}</div>
            <ul className="mt-5 space-y-4">
              {copy.pitfalls.map((item) => (
                <li key={item} className="text-sm leading-7 text-white/72">
                  • {item}
                </li>
              ))}
            </ul>
          </MotionCard>
        </section>

        <section className="pt-20">
          <MotionCard className="glass-panel rounded-[30px] border-white/10 bg-white/[0.05] p-8 text-white">
            <div className="text-sm uppercase tracking-[0.22em] text-[#f5c977]">{copy.useItTitle}</div>
            <div className="mt-5 flex flex-wrap gap-3">
              {copy.useItPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/78"
                >
                  {item}
                </div>
              ))}
            </div>
          </MotionCard>
        </section>

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {copy.reserveTitle}
              </div>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.reserveText}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    {copy.reserveButton}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    <PhoneCall className="h-4 w-4" />
                    {locale === "en" ? "Call to discuss" : "Appeler pour en parler"}
                  </a>
                </Button>
              </div>
            </div>
          </MotionCard>
        </section>

        {copy.relatedRouteKeys.length > 0 && (
          <section className="pt-20">
            <div className="max-w-3xl">
              <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
                {locale === "en" ? "Related concepts" : "Concepts liés"}
              </div>
              <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
                {locale === "en"
                  ? "Keep going with the next concepts students usually confuse together"
                  : "Continuer avec les notions que les élèves mélangent souvent ensemble"}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.relatedRouteKeys.map((relatedKey) => {
                const related = getSecondary4MathConceptPage(relatedKey, locale)

                if (!related) {
                  return null
                }

                return (
                  <MotionCard
                    key={relatedKey}
                    className="rounded-[28px] border-white/10 bg-[#091a3a]/88 p-6 text-white"
                  >
                    <div className="text-sm uppercase tracking-[0.22em] text-[#f5c977]">{related.sequenceLabel}</div>
                    <h3 className="mt-3 font-display text-2xl font-semibold">{related.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/72">{related.lead}</p>
                    <div className="mt-6">
                      <Link
                        to={getLocalizedPath(relatedKey, locale)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                      >
                        {locale === "en" ? "Open the theory page" : "Ouvrir la page théorie"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </MotionCard>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
