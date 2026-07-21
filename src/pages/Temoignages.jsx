import { CalendarDays, Phone, ShieldCheck } from "lucide-react"
import { useLocation } from "react-router-dom"

import { VerifiedReviewsSection } from "@/components/ConversionSections"
import ProgressJourney from "@/components/ProgressJourney"
import Seo from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, BOOKING_URL_EN } from "@/config/booking"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { getParentJourney } from "@/lib/parentJourney"
import { siteConfig } from "@/lib/seo"

const contentByLocale = {
  fr: {
    title: "À quoi ressemble un suivi clair avant même de commencer.",
    description:
      "Plutôt que de promettre une note, voici les repères concrets qu'un parent peut attendre d'un accompagnement bien cadré.",
    panelEyebrow: "Ce que vous pourrez suivre",
    panelTitle: "Une priorité, une action, un fil",
    panelItems: [
      "Une première priorité claire avant de multiplier les séances.",
      "Un retour compréhensible après chaque séance.",
      "Une prochaine petite action visible pour l'élève et le parent.",
    ],
    ctaTitle: "Prêt à rendre le prochain pas plus simple ?",
    ctaDescription:
      "Expliquez simplement ce qui se passe. L'équipe vous aide à choisir la suite la plus utile, sans vous pousser vers un forfait.",
    seoTitle: "Suivi parent clair | Méthode Secondaire",
    seoDescription:
      "Découvrez comment un suivi parent clair accompagne le tutorat de maths et sciences au secondaire au Québec.",
    seoKeywords:
      "suivi parent tutorat secondaire, portail parent tutorat, tutorat maths sciences québec, soutien scolaire québec",
    trustTitle: "Des repères utiles, sans promesse magique",
    callLabel: "Appeler si urgent",
    bookingLabel: "Demander une séance",
  },
  en: {
    title: "What clear follow-up looks like before you even begin.",
    description:
      "Rather than promise a grade, here are the concrete signals a parent can expect from well-structured support.",
    panelEyebrow: "What you will be able to follow",
    panelTitle: "One priority, one action, one clear thread",
    panelItems: [
      "One clear first priority before multiplying sessions.",
      "A readable update after every session.",
      "One next small action visible to both student and parent.",
    ],
    ctaTitle: "Ready to make the next step simpler?",
    ctaDescription:
      "Simply share what is happening. The team helps you choose the most useful next step without pushing you into a package.",
    seoTitle: "Clear parent follow-up | Methode Secondaire",
    seoDescription:
      "See how clear parent follow-up supports high-school math and science tutoring across Quebec.",
    seoKeywords:
      "parent tutoring follow-up, parent portal tutoring, math science tutoring quebec, quebec academic support",
    trustTitle: "Useful signals, without magic promises",
    callLabel: "Call if urgent",
    bookingLabel: "Request a session",
  },
}

export default function Temoignages() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("temoignages", locale)
  const requestUrl = locale === "en" ? BOOKING_URL_EN : BOOKING_URL
  const journey = getParentJourney(locale)
  const testimonialBadge = locale === "en" ? "The parent path" : "Le parcours parent"

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.seoTitle,
    url: siteConfig.siteUrl + path,
    description: copy.seoDescription,
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
        alternates={buildAlternates("temoignages")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-36 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-6 lg:grid-cols-[1.02fr,0.98fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm text-white/85">
              {testimonialBadge}
            </div>
            <h1 className="balanced-copy mt-6 font-display text-5xl font-semibold leading-[0.96] text-white sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{copy.description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]">
                <a href={requestUrl}>
                  <CalendarDays className="h-4 w-4" />
                  {copy.bookingLabel}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a href={"tel:" + siteConfig.phone}>
                  <Phone className="h-4 w-4" />
                  {copy.callLabel}
                </a>
              </Button>
            </div>

            <p className="mt-6 max-w-2xl border-l-2 border-[#f5c977] pl-4 text-sm leading-7 text-[#f8deb0]">{journey.text}</p>
          </div>

          <ProgressJourney
            title={copy.panelTitle}
            eyebrow={copy.panelEyebrow}
            intro={locale === "en" ? "The practical signals the parent portal keeps visible." : "Les repères concrets que le portail parent garde visibles."}
            countLabel={locale === "en" ? "steps" : "repères"}
            currentIndex={0}
            columns="grid-cols-1"
            steps={copy.panelItems.map((item) => ({ label: item }))}
          />
        </section>

        <section className="mt-8 rounded-[28px] border border-[#f5c977]/22 bg-[#f5c977]/8 p-5 text-white sm:rounded-[32px] sm:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" aria-hidden="true" />
            <div>
              <h2 className="font-display text-xl font-semibold sm:text-2xl">{copy.trustTitle}</h2>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-[#f8deb0]">
                {locale === "en"
                  ? "This page describes how the service and parent portal are designed to work. It does not use unnamed outcome claims or promise a particular grade."
                  : "Cette page décrit le fonctionnement du service et du portail parent. Elle ne s'appuie pas sur des résultats anonymes non vérifiables et ne promet aucune note précise."}
              </p>
            </div>
          </div>
        </section>

        <VerifiedReviewsSection locale={locale} className="pt-14 sm:pt-20" limit={4} showLink={false} />

        <section className="pt-14 sm:pt-20">
          <div className="action-surface rounded-[32px] p-6 text-white sm:rounded-[38px] sm:p-10">
            <div className="grid gap-7 lg:grid-cols-[1.08fr,0.92fr] lg:items-end">
              <div className="max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f5c977]">{testimonialBadge}</div>
                <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold leading-[0.96] sm:text-5xl">{copy.ctaTitle}</h2>
                <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.ctaDescription}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]">
                  <a href={requestUrl}>
                    <CalendarDays className="h-4 w-4" />
                    {copy.bookingLabel}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={"tel:" + siteConfig.phone}>
                    <Phone className="h-4 w-4" />
                    {copy.callLabel}
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
