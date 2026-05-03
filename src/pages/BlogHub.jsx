import { Link, useLocation } from "react-router-dom"
import { ArrowRight, Microscope, Sparkles } from "lucide-react"

import BlogGridSection from "@/components/BlogGridSection"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { blogHubCopyByLocale } from "@/lib/blogContent"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { absoluteUrl } from "@/lib/seo"

const seoByLocale = {
  fr: {
    title: "Blogue tutorat secondaire fonde sur la recherche | Methode Secondaire",
    description:
      "Des articles fondes sur des etudes scientifiques pour aider les parents du secondaire a mieux comprendre l'anxiete en maths, les devoirs, le tutorat et la revision.",
    keywords:
      "blogue tutorat secondaire, recherches education secondaire, anxiete maths secondaire, aide aux devoirs recherche, tutorat scientifique",
  },
  en: {
    title: "Research-backed high school tutoring blog | Methode Secondaire",
    description:
      "Evidence-based articles for high school families about math anxiety, homework, tutoring, science learning and exam revision.",
    keywords:
      "high school tutoring blog, education research for parents, math anxiety blog, homework help research, tutoring evidence",
  },
}

export default function BlogHub() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = blogHubCopyByLocale[locale]
  const seo = seoByLocale[locale]
  const path = getLocalizedPath("blogHub", locale)

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.title,
    description: seo.description,
    url: absoluteUrl(path),
  }

  const panelItems =
    locale === "en"
      ? [
          "Articles written around real parent questions, not generic school advice.",
          "Scientific sources linked directly so the credibility does not depend on vague claims.",
          "Clear takeaways about what to do this week, when to call and when tutoring truly helps.",
        ]
      : [
          "Des articles construits autour de vraies questions de parents, pas de conseils scolaires génériques.",
          "Des sources scientifiques reliées directement pour que la crédibilité ne repose pas sur des affirmations vagues.",
          "Des conclusions concrètes sur quoi faire cette semaine, quand appeler et quand le tutorat aide vraiment.",
        ]

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={seo.title}
        description={seo.description}
        path={path}
        keywords={seo.keywords}
        jsonLd={schema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("blogHub")}
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
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{copy.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  {locale === "en" ? "Book a focused session" : "Réserver une séance ciblée"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("resourcesHub", locale)}>
                  {locale === "en" ? "See practical guides" : "Voir les guides pratiques"}
                </Link>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
              <Microscope className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold">
              {locale === "en"
                ? "A blog that should feel more trustworthy than generic school content"
                : "Un blogue qui doit inspirer plus de confiance que du contenu scolaire générique"}
            </h2>
            <div className="mt-6 space-y-4 text-sm text-white/80">
              {panelItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-[#081a38]/80 px-5 py-5 text-sm leading-7 text-white/72">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Sparkles className="h-4 w-4 text-[#f5c977]" />
                {locale === "en" ? "Why it can attract parents" : "Pourquoi ça peut attirer des parents"}
              </div>
              <p className="mt-2">
                {locale === "en"
                  ? "Parents often search when they are confused, worried or comparing options. Research-backed articles give them clarity first, which makes trust much easier to win."
                  : "Les parents cherchent souvent quand ils sont inquiets, confus ou en train de comparer des options. Des articles fondés sur la recherche leur donnent d'abord de la clarté, ce qui rend la confiance plus facile à gagner."}
              </p>
            </div>
          </MotionCard>
        </section>

        <BlogGridSection locale={locale} className="pt-20" showHubLink={false} />
      </main>
    </div>
  )
}
