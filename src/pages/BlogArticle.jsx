import { Link, useLocation } from "react-router-dom"
import { ArrowRight, BadgeCheck, ExternalLink, Microscope, PhoneCall, Sparkles } from "lucide-react"

import BlogGridSection from "@/components/BlogGridSection"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
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
                  {locale === "en" ? "Call to discuss" : "Appeler pour en parler"}
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  {locale === "en" ? "Book a focused session" : "Réserver une séance ciblée"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
              <Microscope className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold">
              {locale === "en" ? "What the studies say at a glance" : "Ce que les études disent en bref"}
            </h2>
            <div className="mt-6 space-y-4">
              {copy.studyHighlights.map((item) => (
                <div
                  key={`${item.value}-${item.title}`}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div className="text-sm uppercase tracking-[0.22em] text-[#f5c977]">{item.value}</div>
                  <div className="mt-2 font-display text-2xl font-semibold text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item.description}</p>
                </div>
              ))}
            </div>
          </MotionCard>
        </section>

        <section className="pt-20">
          <div className="grid gap-4 lg:grid-cols-2">
            {copy.sections.map((section) => (
              <MotionCard
                key={section.title}
                className="glass-panel rounded-[32px] border-white/10 bg-white/[0.04] p-7 text-white"
              >
                <h2 className="font-display text-3xl font-semibold">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-white/76">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <div className="mt-6 space-y-3 text-sm text-white/80">
                    {section.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <div className="grid gap-4 lg:grid-cols-2">
            <MotionCard className="rounded-[32px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
                {locale === "en" ? "This week" : "Cette semaine"}
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold">{copy.parentActionsTitle}</h2>
              <div className="mt-6 space-y-4 text-sm text-white/80">
                {copy.parentActions.map((action) => (
                  <div
                    key={action}
                    className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    {action}
                  </div>
                ))}
              </div>
            </MotionCard>

            <MotionCard className="rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-7 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">
                {locale === "en" ? "When support helps most" : "Quand l'accompagnement aide le plus"}
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold">{copy.tutoringTitle}</h2>
              <div className="mt-6 space-y-4 text-sm text-white/80">
                {copy.tutoringPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </MotionCard>
          </div>
        </section>

        <section className="pt-20">
          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.04] p-7 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
              {locale === "en" ? "Scientific sources" : "Sources scientifiques"}
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold">
              {locale === "en"
                ? "The studies behind this article"
                : "Les études derrière cet article"}
            </h2>
            <div className="mt-6 space-y-4">
              {copy.sources.map((source) => (
                <a
                  key={source.label}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[24px] border border-white/10 bg-white/5 px-5 py-5 transition hover:bg-white/10"
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
          </MotionCard>
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

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                <Sparkles className="mr-2 h-4 w-4" />
                {locale === "en" ? "From clarity to action" : "De la clarté à l'action"}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{copy.ctaTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.ctaText}</p>
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
                    {locale === "en" ? "Book a focused session" : "Réserver une séance ciblée"}
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
