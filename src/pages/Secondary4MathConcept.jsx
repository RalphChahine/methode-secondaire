import { Link, useLocation } from "react-router-dom"
import { ArrowRight, BadgeCheck, BookOpenCheck, Lightbulb, PhoneCall, Target, TriangleAlert } from "lucide-react"

import ParentJourneyNote from "@/components/ParentJourneyNote"
import ProgressJourney from "@/components/ProgressJourney"
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
import { getSecondary4MathConceptPage } from "@/lib/secondary4MathTheoryContent"
import { absoluteUrl, siteConfig } from "@/lib/seo"

function StudyList({ items, icon: Icon = BadgeCheck, tone = "gold" }) {
  const iconClass = tone === "muted" ? "text-white/52" : "text-[#f5c977]"

  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Icon className={"mt-0.5 h-4 w-4 shrink-0 " + iconClass} aria-hidden="true" />
          <span className="text-sm leading-7 text-white/78 sm:text-[15px]">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Secondary4MathConcept() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = getRouteKeyFromPath(location.pathname)
  const copy = getSecondary4MathConceptPage(routeKey, locale)
  const requestUrl = locale === "en" ? BOOKING_URL_EN : BOOKING_URL

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
        <section className="grid gap-7 lg:grid-cols-[1.02fr,0.98fr] lg:items-center">
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
                <a href={requestUrl}>
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

            <ParentJourneyNote locale={locale} className="mt-6 max-w-2xl" />
          </div>

          <ProgressJourney
            title={copy.sequenceTitle}
            eyebrow={copy.sequenceLabel}
            intro={
              locale === "en"
                ? "A calm reading path: see the idea, spot it in a question, then choose the right move."
                : "Un parcours de lecture calme : voir l'idée, la repérer dans une question, puis choisir le bon geste."
            }
            countLabel={locale === "en" ? "markers" : "repères"}
            currentIndex={0}
            columns="grid-cols-1 sm:grid-cols-2"
            steps={[
              {
                label: locale === "en" ? "See the core idea" : "Voir l'idée centrale",
                description: copy.definitionTitle,
              },
              {
                label: locale === "en" ? "Keep the anchors close" : "Garder les repères près",
                description: copy.formulaTitle,
              },
              {
                label: locale === "en" ? "Recognize the signal" : "Reconnaître le signal",
                description: copy.recognizeTitle,
              },
              {
                label: locale === "en" ? "Check your approach" : "Vérifier sa démarche",
                description: copy.selfCheckTitle,
              },
            ]}
          />
        </section>

        <section id="essentiel" className="grid gap-4 pt-14 sm:gap-5 sm:pt-20 lg:grid-cols-[1.08fr,0.92fr]">
          <article className="glass-panel rounded-[28px] border border-white/10 bg-white/[0.05] p-6 text-white sm:rounded-[32px] sm:p-8">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#f5c977]">
              <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
              {copy.definitionTitle}
            </div>
            <div className="mt-5 space-y-4">
              {copy.definitionParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-white/78 sm:text-[15px]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <aside className="rounded-[28px] border border-[#f5c977]/20 bg-[#091a3a]/86 p-6 text-white sm:rounded-[32px] sm:p-8">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/56">
              <Lightbulb className="h-4 w-4 text-[#f5c977]" aria-hidden="true" />
              {copy.formulaTitle}
            </div>
            <div className="mt-5">
              <StudyList items={copy.formulaBullets} />
            </div>
          </aside>
        </section>

        <section className="pt-14 sm:pt-20">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f5c977]">
              {locale === "en" ? "Before the calculation" : "Avant le calcul"}
            </div>
            <h2 className="balanced-copy mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              {locale === "en" ? "Get your bearings before choosing a formula." : "Trouver ses repères avant de choisir une formule."}
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-2">
            <article className="action-surface rounded-[28px] p-6 text-white sm:rounded-[32px] sm:p-8">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#f5c977]">
                <Target className="h-4 w-4" aria-hidden="true" />
                {copy.understandTitle}
              </div>
              <div className="mt-5">
                <StudyList items={copy.essentials} />
              </div>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-[#091a3a]/80 p-6 text-white sm:rounded-[32px] sm:p-8">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/56">
                <TriangleAlert className="h-4 w-4 text-[#f5c977]" aria-hidden="true" />
                {copy.trapTitle}
              </div>
              <div className="mt-5">
                <StudyList items={copy.pitfalls} icon={TriangleAlert} tone="muted" />
              </div>
            </article>
          </div>
        </section>

        <section className="pt-14 sm:pt-20">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 text-white sm:rounded-[36px] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f5c977]">
                  {locale === "en" ? "The move to make" : "Le geste à faire"}
                </div>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  {locale === "en" ? "Read the signal, then use a method that fits it." : "Lire le signal, puis choisir une méthode qui lui correspond."}
                </h2>
              </div>
              <a
                href="#verification"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#f5c977] transition hover:text-[#f7d38f]"
              >
                {locale === "en" ? "Go to the check" : "Aller à la vérification"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7 grid gap-7 border-t border-white/10 pt-7 lg:grid-cols-2 lg:gap-10">
              <div>
                <h3 className="text-lg font-semibold text-white">{copy.recognizeTitle}</h3>
                <ol className="mt-4 space-y-3.5">
                  {copy.recognizeBullets.map((item, index) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f5c977]/45 text-xs font-semibold text-[#f5c977]">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-7 text-white/78 sm:text-[15px]">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <h3 className="text-lg font-semibold text-white">{copy.methodTitle}</h3>
                <ol className="mt-4 space-y-3.5">
                  {copy.methodBullets.map((item, index) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/72">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-7 text-white/78 sm:text-[15px]">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="verification" className="grid gap-4 pt-14 sm:gap-5 sm:pt-20 lg:grid-cols-[1.05fr,0.95fr]">
          <article className="rounded-[30px] border border-[#f5c977]/22 bg-[linear-gradient(135deg,rgba(245,201,119,0.12),rgba(9,26,58,0.86))] p-6 text-white sm:rounded-[36px] sm:p-8">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#f5c977]">
              <Target className="h-4 w-4" aria-hidden="true" />
              {copy.masteryTitle}
            </div>
            <div className="mt-5">
              <StudyList items={copy.masteryBullets} />
            </div>

            <div className="mt-7 border-t border-white/12 pt-6">
              <h3 className="text-base font-semibold text-white">{copy.exampleTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/76 sm:text-[15px]">{copy.exampleText}</p>
            </div>
          </article>

          <aside className="glass-panel rounded-[30px] border border-white/10 bg-white/[0.05] p-6 text-white sm:rounded-[36px] sm:p-8">
            <div className="text-sm uppercase tracking-[0.2em] text-[#f5c977]">{copy.selfCheckTitle}</div>
            <p className="mt-3 text-sm leading-7 text-white/64">
              {locale === "en" ? "Use these prompts before you turn the page or hand in the exercise." : "Utilise ces questions avant de tourner la page ou de remettre l'exercice."}
            </p>
            <div className="mt-5">
              <StudyList items={copy.selfCheck} icon={BookOpenCheck} />
            </div>
          </aside>
        </section>

        <section className="grid gap-4 pt-14 sm:gap-5 sm:pt-20 lg:grid-cols-[1.08fr,0.92fr]">
          <article className="glass-panel rounded-[30px] border border-white/10 bg-white/[0.05] p-6 text-white sm:rounded-[36px] sm:p-8">
            <div className="text-sm uppercase tracking-[0.2em] text-[#f5c977]">{copy.vocabularyTitle}</div>
            <dl className="mt-5 divide-y divide-white/10">
              {copy.vocabulary.map((item) => (
                <div key={item.term} className="py-4 first:pt-0 last:pb-0">
                  <dt className="text-sm font-semibold text-white">{item.term}</dt>
                  <dd className="mt-1.5 text-sm leading-7 text-white/70">{item.text}</dd>
                </div>
              ))}
            </dl>
          </article>

          <aside className="rounded-[30px] border border-white/10 bg-[#091a3a]/84 p-6 text-white sm:rounded-[36px] sm:p-8">
            <div className="text-sm uppercase tracking-[0.2em] text-[#f5c977]">{copy.useItTitle}</div>
            <ol className="mt-5 space-y-4">
              {copy.useItPoints.map((item, index) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 text-sm font-semibold text-[#f5c977]">0{index + 1}</span>
                  <span className="text-sm leading-7 text-white/76">{item}</span>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section className="pt-14 sm:pt-20">
          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-6 text-white sm:rounded-[38px] sm:p-10">
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
                  <a href={requestUrl}>{copy.reserveButton}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={"tel:" + siteConfig.phone}>
                    <PhoneCall className="h-4 w-4" />
                    {locale === "en" ? "Call to discuss" : "Appeler pour en parler"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {copy.relatedRouteKeys.length > 0 && (
          <section className="pt-14 sm:pt-20">
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

            <div className="mt-7 grid gap-3 sm:mt-8">
              {copy.relatedRouteKeys.map((relatedKey) => {
                const related = getSecondary4MathConceptPage(relatedKey, locale)

                if (!related) {
                  return null
                }

                return (
                  <Link
                    key={relatedKey}
                    to={getLocalizedPath(relatedKey, locale)}
                    className="group block rounded-[24px] border border-white/10 bg-[#091a3a]/78 p-5 text-white transition hover:border-[#f5c977]/35 hover:bg-[#10264d] sm:rounded-[28px] sm:p-6"
                  >
                    <div className="flex min-w-0 items-start gap-4 sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5c977]">{related.sequenceLabel}</div>
                        <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">{related.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-white/68">{related.lead}</p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/5 text-[#f5c977] transition group-hover:translate-x-0.5 group-hover:bg-[#f5c977] group-hover:text-[#071631]">
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
