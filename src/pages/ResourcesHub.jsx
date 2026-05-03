import { Link, useLocation } from "react-router-dom"
import { ArrowRight, Compass, Sparkles } from "lucide-react"

import BlogGridSection from "@/components/BlogGridSection"
import KeywordIntentSection from "@/components/KeywordIntentSection"
import LocalOpportunitySection from "@/components/LocalOpportunitySection"
import MilestoneOpportunitySection from "@/components/MilestoneOpportunitySection"
import MotionCard from "@/components/MotionCard"
import OfferPathwaysSection from "@/components/OfferPathwaysSection"
import ResourceGridSection from "@/components/ResourceGridSection"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { resourceHubCopyByLocale } from "@/lib/resourceContent"
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
    title: "Ressources tutorat secondaire | Méthode Secondaire",
    description:
      "Guides utiles sur la préparation aux examens, le rattrapage scolaire et les points de blocage fréquents en maths et sciences au secondaire.",
    keywords:
      "ressources tutorat secondaire, aide aux devoirs secondaire, soutien scolaire secondaire, blog tutorat maths, blog tutorat sciences",
  },
  en: {
    title: "High school tutoring resources | Méthode Secondaire",
    description:
      "Useful guides about exam prep, catch-up tutoring and common math and science pain points for high school students in Quebec.",
    keywords:
      "high school tutoring resources, high school homework help, high school academic support, math tutoring blog, science tutoring guide",
  },
}

export default function ResourcesHub() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = resourceHubCopyByLocale[locale]
  const seo = seoByLocale[locale]
  const path = getLocalizedPath("resourcesHub", locale)

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.title,
    description: seo.description,
    url: absoluteUrl(path),
  }

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
        alternates={buildAlternates("resourcesHub")}
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
                <Link to={getLocalizedPath("home", locale)}>
                  {locale === "en" ? "Back to home" : "Retour à l'accueil"}
                </Link>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
              <Compass className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold">
              {locale === "en"
                ? "Built for searches with strong intent"
                : "Des pages faites pour les recherches à forte intention"}
            </h2>
            <div className="mt-6 space-y-4 text-sm text-white/80">
              {[
                locale === "en"
                  ? "Exam prep pages for families looking for last-mile structure."
                  : "Des pages examen pour les familles qui cherchent une vraie structure de révision.",
                locale === "en"
                  ? "Catch-up pages for situations where chapters have already piled up."
                  : "Des pages rattrapage pour les périodes où les chapitres se sont déjà accumulés.",
                locale === "en"
                  ? "Grade-specific pages for searches that are more precise than generic tutoring."
                  : "Des pages plus précises qu'une recherche générique de tutorat.",
              ].map((line) => (
                <div
                  key={line}
                  className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-[#081a38]/80 px-5 py-5 text-sm leading-7 text-white/72">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Sparkles className="h-4 w-4 text-[#f5c977]" />
                {locale === "en" ? "Why this matters" : "Pourquoi c'est utile"}
              </div>
              <p className="mt-2">
                {locale === "en"
                  ? "These pages are not generic blog posts. They are written to answer the exact situations families search for right before calling or booking a focused session."
                  : "Ces pages ne sont pas des billets de blog génériques. Elles répondent à des situations précises que les familles cherchent juste avant d'appeler ou de réserver une séance ciblée."}
              </p>
            </div>
          </MotionCard>
        </section>

        <ResourceGridSection locale={locale} className="pt-20" showHubLink={false} />

        <BlogGridSection
          locale={locale}
          className="pt-20"
          heading={{
            eyebrow: locale === "en" ? "Research-backed blog" : "Blogue fonde sur la recherche",
            title:
              locale === "en"
                ? "Articles built to reassure parents and attract stronger intent"
                : "Des articles pensés pour rassurer les parents et attirer des recherches plus fortes",
          }}
          description={
            locale === "en"
              ? "Some families want advice, but many want proof. These articles connect scientific studies to real parent situations in math, science and homework."
              : "Certaines familles veulent des conseils, mais beaucoup veulent aussi des preuves. Ces articles relient des études scientifiques à de vraies situations parentales en maths, en sciences et autour des devoirs."
          }
        />

        <KeywordIntentSection locale={locale} className="pt-20" />

        <LocalOpportunitySection locale={locale} className="pt-20" />

        <MilestoneOpportunitySection locale={locale} className="pt-20" />

        <OfferPathwaysSection
          locale={locale}
          className="pt-20"
          heading={{
            eyebrow: locale === "en" ? "Best pages to push now" : "Pages d'offre a pousser maintenant",
            title:
              locale === "en"
                ? "The two offer pages that should keep receiving internal links"
                : "Les deux pages d'offre qui meritent de recevoir le plus de liens internes",
          }}
          description={
            locale === "en"
              ? "Resource content should not stop at advice. These offer pages are the most natural conversion targets once a family recognizes its situation."
              : "Les ressources ne doivent pas s'arreter au conseil. Ces pages d'offre sont les cibles de conversion les plus naturelles une fois qu'une famille reconnait sa situation."
          }
        />
      </main>
    </div>
  )
}
