import { Link, useLocation } from "react-router-dom"
import { ArrowRight, BadgeCheck, ClipboardList, Clock3, Phone } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Button } from "@/components/ui/button"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { siteConfig } from "@/lib/seo"

const copyByLocale = {
  fr: {
    seoTitle: "Demande reçue | Méthode Secondaire",
    seoDescription:
      "Votre demande parent a été reçue. Méthode Secondaire vous rappelle avec une suite claire pour le tutorat en maths ou sciences.",
    badge: "Demande reçue",
    title: "Merci. La suite est simple.",
    description:
      "On a reçu votre demande parent. Le prochain objectif est de comprendre le besoin, confirmer l'urgence et choisir le bon départ sans vous faire comparer dix options.",
    nextEyebrow: "Ce qui arrive maintenant",
    steps: [
      {
        title: "On lit la situation",
        description:
          "Niveau, matière, urgence, chapitre bloquant et type de soutien demandé.",
      },
      {
        title: "On vous rappelle",
        description:
          "Sous 24 h ouvrables, ou plus vite si le besoin semble urgent.",
      },
      {
        title: "On propose le bon départ",
        description:
          "Séance ciblée, suivi hebdomadaire, bloc intensif ou autre prochain pas clair.",
      },
    ],
    prepTitle: "À préparer si vous l'avez",
    prepItems: [
      "Le niveau exact et la matière.",
      "Le prochain examen ou la date importante.",
      "Une photo du chapitre, devoir ou résultat qui inquiète.",
    ],
    reassurance:
      "Aucune obligation après le formulaire. Le premier retour sert surtout à éviter le mauvais format et à rendre la suite plus claire.",
    call: "Appeler si urgent",
    home: "Retour à l'accueil",
    resources: "Voir les ressources parents",
  },
  en: {
    seoTitle: "Request received | Méthode Secondaire",
    seoDescription:
      "Your parent request was received. Méthode Secondaire will call back with a clear next step for math or science tutoring.",
    badge: "Request received",
    title: "Thank you. The next step is simple.",
    description:
      "We received your parent request. The next goal is to understand the need, confirm urgency and choose the right starting point without making you compare random options.",
    nextEyebrow: "What happens now",
    steps: [
      {
        title: "We read the situation",
        description:
          "Grade, subject, urgency, blocked chapter and type of support requested.",
      },
      {
        title: "We call you back",
        description:
          "Within one business day, or sooner if the situation seems urgent.",
      },
      {
        title: "We suggest the right start",
        description:
          "Focused session, weekly follow-up, intensive block or another clear next step.",
      },
    ],
    prepTitle: "Useful to prepare",
    prepItems: [
      "The exact grade and subject.",
      "The next test or important date.",
      "A photo of the chapter, homework or result that worries you.",
    ],
    reassurance:
      "No commitment after the form. The first reply is mainly there to avoid the wrong format and make the next step clearer.",
    call: "Call if urgent",
    home: "Back to home",
    resources: "See parent resources",
  },
}

export default function LeadThanks() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = copyByLocale[locale] || copyByLocale.fr
  const path = getLocalizedPath("thankYou", locale)

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.seoTitle,
    description: copy.seoDescription,
    url: `${siteConfig.siteUrl}${path}`,
  }

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        jsonLd={schema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("thankYou")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <MotionCard className="section-shell noise-overlay rounded-[36px] p-7 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                <ClipboardList className="h-4 w-4 text-[#f5c977]" />
                {copy.badge}
              </div>
              <h1 className="balanced-copy mt-6 font-display text-5xl font-semibold leading-[0.95] sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">{copy.description}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-[#f5c977] px-6 py-6 text-[#071631] hover:bg-[#f7d38f]">
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="h-4 w-4" />
                    {copy.call}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath("home", locale)}>{copy.home}</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.nextEyebrow}</div>
              {copy.steps.map((step, index) => (
                <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-5">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f5c977] font-display text-lg font-semibold text-[#071631]">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-semibold">{step.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-white/72">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionCard>

        <section className="grid gap-6 pt-8 lg:grid-cols-[1fr,0.9fr]">
          <MotionCard className="panel-soft rounded-[30px] p-7 text-white">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-[#f5c977]" />
              <h2 className="font-display text-3xl font-semibold">{copy.prepTitle}</h2>
            </div>
            <div className="mt-6 space-y-3">
              {copy.prepItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/78">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {item}
                </div>
              ))}
            </div>
          </MotionCard>

          <MotionCard className="panel-gold rounded-[30px] p-7 text-white">
            <p className="text-sm leading-7 text-white/80">{copy.reassurance}</p>
            <div className="mt-6">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("resourcesHub", locale)}>
                  {copy.resources}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionCard>
        </section>
      </main>
    </div>
  )
}
