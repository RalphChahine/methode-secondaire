import { Link, useLocation } from "react-router-dom"
import { ArrowRight, BookOpenText, CircleCheck, Microscope } from "lucide-react"

import BlogGridSection from "@/components/BlogGridSection"
import MotionCard from "@/components/MotionCard"
import ParentJourneyNote from "@/components/ParentJourneyNote"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, BOOKING_URL_EN } from "@/config/booking"
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
    title: "Blogue tutorat secondaire fondé sur la recherche | Méthode Secondaire",
    description:
      "Des articles fondés sur des études scientifiques pour aider les parents du secondaire à mieux comprendre l'anxiété en maths, les devoirs, le tutorat et la révision.",
    keywords:
      "blogue tutorat secondaire, recherches education secondaire, anxiete maths secondaire, aide aux devoirs recherche, tutorat scientifique",
  },
  en: {
    title: "Research-backed high school tutoring blog | Méthode Secondaire",
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
  const requestUrl = locale === "en" ? BOOKING_URL_EN : BOOKING_URL

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.title,
    description: seo.description,
    url: absoluteUrl(path),
  }

  const readingSteps =
    locale === "en"
      ? [
          {
            label: "Find the question that feels familiar",
            description: "Math anxiety, homework, revision or the right kind of help.",
          },
          {
            label: "Keep one useful idea",
            description: "Every article is meant to make the next conversation or decision easier.",
          },
          {
            label: "Choose a calm next step",
            description: "Read another guide, talk it through with us, or simply come back later.",
          },
        ]
      : [
          {
            label: "Repérez la question qui vous ressemble",
            description: "Anxiété en maths, devoirs, révision ou le bon type d'aide.",
          },
          {
            label: "Gardez une idée vraiment utile",
            description: "Chaque article doit rendre la prochaine discussion ou décision plus simple.",
          },
          {
            label: "Choisissez une suite sereine",
            description: "Lire un autre guide, en parler avec nous ou revenir plus tard.",
          },
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

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-9 sm:px-6 sm:pt-12 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:gap-8">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.eyebrow}
            </Badge>
            <h1 className="balanced-copy mt-6 font-display text-[2.65rem] font-semibold leading-[0.98] text-white sm:mt-7 sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:mt-6 sm:text-lg sm:leading-8">
              {copy.description}
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:flex sm:flex-wrap">
              <Button
                asChild
                className="w-full justify-center rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
              >
                <a href="#articles">
                  {locale === "en" ? "Browse the articles" : "Parcourir les articles"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-center rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <a href={requestUrl}>
                  {locale === "en" ? "Request a focused session" : "Demander une séance ciblée"}
                </a>
              </Button>
            </div>

            <Link
              to={getLocalizedPath("resourcesHub", locale)}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/72 transition hover:text-white"
            >
              <BookOpenText className="h-4 w-4 text-[#f5c977]" />
              {locale === "en" ? "See practical guides instead" : "Préférer les guides pratiques"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <ParentJourneyNote locale={locale} className="mt-6 max-w-2xl" />
          </div>

          <MotionCard className="glass-panel rounded-[28px] border-white/10 bg-white/[0.05] p-5 text-white sm:rounded-[32px] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <Microscope className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/65">
                {locale === "en" ? "Read at your pace" : "Lire à votre rythme"}
              </span>
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {locale === "en" ? "Start with the question on your mind" : "Commencez par la question qui vous habite"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
              {locale === "en"
                ? "No pressure to become an expert. A little clarity can be enough to make the week feel lighter."
                : "Pas besoin de devenir spécialiste. Un peu de clarté peut suffire à alléger la semaine."}
            </p>

            <ol className="mt-6 grid gap-2">
              {readingSteps.map((step, index) => (
                <li
                  key={step.label}
                  className="flex gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] p-3.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f5c977]/55 text-xs font-semibold text-[#f5c977]">
                    0{index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">{step.label}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-white/60">{step.description}</span>
                  </span>
                </li>
              ))}
            </ol>

            <a
              href="#articles"
              className="mt-5 flex items-center justify-between gap-3 rounded-[20px] border border-[#f5c977]/20 bg-[#081a38]/55 px-4 py-3.5 text-sm font-semibold text-white transition hover:border-[#f5c977]/45"
            >
              <span className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-[#f5c977]" />
                {locale === "en" ? "Choose an article to begin" : "Choisir un article pour commencer"}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#f5c977]" />
            </a>
          </MotionCard>
        </section>

        <div id="articles" className="scroll-mt-28">
          <BlogGridSection
            locale={locale}
            className="pt-16 sm:pt-20"
            showHubLink={false}
            heading={{
              eyebrow: locale === "en" ? "Choose your question" : "Choisissez votre question",
              title:
                locale === "en"
                  ? "Practical reading for the moments that feel uncertain"
                  : "Des lectures utiles pour les moments où tout semble moins clair",
            }}
            description={
              locale === "en"
                ? "Each article connects a real family question to grounded, usable ideas."
                : "Chaque article relie une vraie question de famille à des idées solides et faciles à utiliser."
            }
          />
        </div>
      </main>
    </div>
  )
}
