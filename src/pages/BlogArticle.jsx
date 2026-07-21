import { Link, useLocation } from "react-router-dom"
import { ArrowRight, BadgeCheck, ExternalLink, Microscope, PhoneCall, Sparkles } from "lucide-react"

import BlogGridSection from "@/components/BlogGridSection"
import MotionCard from "@/components/MotionCard"
import ParentJourneyNote from "@/components/ParentJourneyNote"
import ProgressJourney from "@/components/ProgressJourney"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, BOOKING_URL_EN } from "@/config/booking"
import { getBlogPageContent } from "@/lib/blogContent"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
  getRouteKeyFromPath,
} from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

export default function BlogArticle() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = getRouteKeyFromPath(location.pathname)
  const copy = getBlogPageContent(routeKey, locale)
  const requestUrl = locale === "en" ? BOOKING_URL_EN : BOOKING_URL

  if (!copy) {
    return (
      <div className="relative overflow-hidden">
        <main className="mx-auto w-full max-w-5xl px-5 pb-20 pt-16 sm:px-6 lg:px-8">
          <MotionCard className="rounded-[32px] border-white/10 bg-white/[0.05] p-8 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
              {locale === "en" ? "Article unavailable" : "Article indisponible"}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold">
              {locale === "en"
                ? "This blog article is not available right now."
                : "Cet article de blogue n'est pas disponible pour le moment."}
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                <Link to={getLocalizedPath("blogHub", locale)}>
                  {locale === "en" ? "Back to blog" : "Retour au blogue"}
                </Link>
              </Button>
            </div>
          </MotionCard>
        </main>
      </div>
    )
  }

  const path = getLocalizedPath(routeKey, locale)

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

  const relatedBlogKeys = (copy.relatedRouteKeys || []).filter((key) => key.startsWith("blog"))
  const readingUi = locale === "en"
    ? {
        eyebrow: "Your reading path",
        title: "A few calm landmarks",
        intro: "Start with the idea that matters most, then use the practical steps when you are ready.",
        chapterCount: "sections",
        articleEyebrow: "The essentials, in order",
        thisWeek: "This week",
        support: "When support helps most",
      }
    : {
        eyebrow: "Votre parcours de lecture",
        title: "Quelques repères, sans surcharge",
        intro: "Commencez par l'idée la plus utile, puis gardez les gestes concrets pour le bon moment.",
        chapterCount: "repères",
        articleEyebrow: "L'essentiel, dans l'ordre",
        thisWeek: "Cette semaine",
        support: "Quand l'accompagnement aide le plus",
      }
  const readingSteps = copy.sections.map((section) => ({ label: section.title }))

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        keywords={copy.keywords}
        jsonLd={articleSchema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates(routeKey)}
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
                  {locale === "en" ? "Call to discuss" : "Appeler pour en parler"}
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <a href={requestUrl}>
                  {locale === "en" ? "Request a focused session" : "Demander une séance ciblée"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <ParentJourneyNote locale={locale} className="mt-6 max-w-2xl" />
          </div>

          <aside className="action-surface rounded-[32px] p-6 text-white sm:p-7">
            <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
              <Microscope className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold">
              {locale === "en" ? "What the studies say at a glance" : "Ce que les études disent en bref"}
            </h2>
            <div className="mt-5 divide-y divide-white/10">
              {copy.studyHighlights.map((item) => (
                <div key={`${item.value}-${item.title}`} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-3">
                    <div className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#f5c977]">{item.value}</div>
                    <div className="font-display text-xl font-semibold text-white sm:text-2xl">{item.title}</div>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.description}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <ProgressJourney
          className="mt-12 sm:mt-16"
          eyebrow={readingUi.eyebrow}
          title={readingUi.title}
          intro={readingUi.intro}
          steps={readingSteps}
          currentIndex={0}
          countLabel={readingUi.chapterCount}
          columns="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          compact
        />

        <section className="pt-12 sm:pt-16">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{readingUi.articleEyebrow}</div>
          </div>
          <div className="mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045]">
            {copy.sections.map((section, index) => (
              <article
                key={section.title}
                className="px-5 py-7 text-white sm:px-7 sm:py-8 [&+article]:border-t [&+article]:border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f5c977]/35 bg-[#f5c977]/10 text-xs font-semibold text-[#f5c977]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{section.title}</h2>
                </div>
                <div className="mt-4 space-y-4 text-sm leading-7 text-white/76">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm text-white/80">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 py-3">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="pt-12 sm:pt-16">
          <div className="grid gap-4 lg:grid-cols-2">
            <aside className="action-surface rounded-[32px] p-6 text-white sm:p-7">
              <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
                {readingUi.thisWeek}
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold">{copy.parentActionsTitle}</h2>
              <ol className="mt-5 divide-y divide-white/10 border-y border-white/10 text-sm text-white/80">
                {copy.parentActions.map((action, index) => (
                  <li key={action} className="flex gap-3 py-4">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#f5c977]/40 text-[0.65rem] font-semibold text-[#f5c977]">
                      {index + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </aside>

            <aside className="panel-soft rounded-[32px] p-6 text-white sm:p-7">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">
                {readingUi.support}
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold">{copy.tutoringTitle}</h2>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10 text-sm text-white/80">
                {copy.tutoringPoints.map((point) => (
                  <li key={point} className="flex gap-3 py-4">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="pt-12 sm:pt-16">
          <div className="glass-panel rounded-[32px] border-white/10 bg-white/[0.04] p-6 text-white sm:p-7">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
              {locale === "en" ? "Scientific sources" : "Sources scientifiques"}
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold">
              {locale === "en"
                ? "The studies behind this article"
                : "Les études derrière cet article"}
            </h2>
            <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {copy.sources.map((source) => (
                <a
                  key={source.label}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block py-5 transition hover:bg-white/[0.035] sm:px-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-white">{source.label}</div>
                      <p className="mt-2 text-sm leading-7 text-white/72">{source.note}</p>
                    </div>
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-[#f5c977]" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {relatedBlogKeys.length ? (
          <BlogGridSection
            locale={locale}
            className="pt-20"
            routeKeys={relatedBlogKeys}
            heading={{
              eyebrow: locale === "en" ? "Keep reading" : "Continuer la lecture",
              title:
                locale === "en"
                  ? "Other research-backed articles parents often find useful"
                  : "D'autres articles fondés sur la recherche que les parents trouvent souvent utiles",
            }}
            description={
              locale === "en"
                ? "These articles keep the same standard: real parent questions, stronger evidence, and clear next steps."
                : "Ces articles gardent le même standard: vraies questions de parents, meilleure evidence et prochaines étapes concrètes."
            }
          />
        ) : null}

        <section className="pt-12 sm:pt-16">
          <div className="action-surface rounded-[34px] p-7 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                <Sparkles className="mr-2 h-4 w-4" />
                {locale === "en" ? "From clarity to action" : "De la clarté à l'action"}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{copy.ctaTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.ctaText}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  className="w-full rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    {locale === "en" ? "Call now" : "Appeler maintenant"}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <a href={requestUrl}>
                    {locale === "en" ? "Request a focused session" : "Demander une séance ciblée"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
