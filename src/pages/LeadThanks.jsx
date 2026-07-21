import { Link, useLocation } from "react-router-dom"
import { ArrowRight, BadgeCheck, CalendarCheck, ClipboardList, Clock3, CreditCard, FileText, Phone } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import ProgressJourney from "@/components/ProgressJourney"
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
      "Votre demande a été reçue. Méthode Secondaire vous rappelle avec une suite claire pour le tutorat en maths ou sciences.",
    badge: "Demande reçue",
    title: "Merci. La suite est simple.",
    description:
      "On a reçu votre demande. Le prochain objectif est de comprendre le besoin, confirmer l'urgence et choisir le bon départ sans vous faire comparer dix options.",
    nextEyebrow: "Ce qui arrive maintenant",
    steps: [
      {
        title: "On lit la situation",
        description:
          "Niveau, matière, urgence, chapitre bloquant et type de soutien demandé.",
      },
      {
        title: "On vous répond",
        description:
          "Sous 24 h ouvrables, ou plus vite si le besoin semble urgent.",
      },
      {
        title: "On propose le bon départ",
        description:
          "L'équipe confirme la Séance ciblée, le Bloc d'élan ou le Bloc de progression approprié après le jumelage.",
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
    handoffTitle: "Horaire et paiement",
    handoffItems: [
      {
        icon: CalendarCheck,
        title: "Créneau confirmé après validation",
        description: "On confirme le tuteur, l'heure et le format avant d'envoyer l'invitation calendrier.",
      },
      {
        icon: CreditCard,
        title: "Paiement seulement quand la séance est claire",
        description: "Le paiement se fait après confirmation. L'équipe confirme la Séance ciblée, le Bloc d'élan ou le Bloc de progression approprié après le jumelage; aucun format ne se renouvelle automatiquement.",
      },
    ],
    followUpTitle: "Après la première séance",
    followUpItems: [
      "Le tuteur note ce qui a été travaillé, ce qui bloque encore et la priorité suivante.",
      "Vous recevez un résumé court pour savoir quoi faire avant la prochaine séance.",
      "Si un point demande une action rapide, on ajuste le plan au lieu d'attendre que le problème grossisse.",
    ],
    call: "Appeler si urgent",
    home: "Retour à l'accueil",
    resources: "Voir les ressources parents",
  },
  en: {
    seoTitle: "Request received | Méthode Secondaire",
    seoDescription:
      "Your request was received. Méthode Secondaire will call back with a clear next step for math or science tutoring.",
    badge: "Request received",
    title: "Thank you. The next step is simple.",
    description:
      "We received your request. The next goal is to understand the need, confirm urgency and choose the right starting point without making you compare random options.",
    nextEyebrow: "What happens now",
    steps: [
      {
        title: "We read the situation",
        description:
          "Grade, subject, urgency, blocked chapter and type of support requested.",
      },
      {
        title: "We get back to you",
        description:
          "Within one business day, or sooner if the situation seems urgent.",
      },
      {
        title: "We suggest the right start",
        description:
          "The team confirms the appropriate Targeted session, Momentum block, or Progress block after matching.",
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
    handoffTitle: "Schedule and payment",
    handoffItems: [
      {
        icon: CalendarCheck,
        title: "Slot confirmed after validation",
        description: "We confirm the tutor, time and format before sending the calendar invitation.",
      },
      {
        icon: CreditCard,
        title: "Payment only once the session is clear",
        description: "Payment happens after confirmation. The team confirms the appropriate Targeted session, Momentum block, or Progress block after matching; no format renews automatically.",
      },
    ],
    followUpTitle: "After the first session",
    followUpItems: [
      "The tutor notes what was covered, what is still blocking progress and the next priority.",
      "You receive a short summary so you know what to do before the next session.",
      "If something needs quick action, we adjust the plan instead of waiting for the problem to grow.",
    ],
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
        <MotionCard className="action-surface noise-overlay rounded-[32px] p-6 text-white sm:rounded-[38px] sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
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

            <ProgressJourney
              className="min-w-0"
              eyebrow={copy.nextEyebrow}
              intro={locale === "en" ? "One clear update at a time." : "Une mise à jour claire à la fois."}
              steps={copy.steps.map((step) => ({
                label: step.title,
                description: step.description,
              }))}
              currentIndex={0}
              columns="grid-cols-1"
              compact
            />
          </div>
        </MotionCard>

        <section className="grid gap-4 pt-8 sm:gap-5 lg:grid-cols-[1fr,0.9fr]">
          <article className="panel-soft rounded-[28px] p-6 text-white sm:rounded-[32px] sm:p-8">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-[#f5c977]" />
              <h2 className="font-display text-3xl font-semibold">{copy.prepTitle}</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-white/64">
              {locale === "en" ? "Only if it is handy. Nothing needs to be perfect before the call." : "Seulement si vous les avez sous la main. Rien n'a besoin d'être parfait avant l'appel."}
            </p>
            <ol className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {copy.prepItems.map((item, index) => (
                <li key={item} className="flex items-start gap-3 py-4 first:pt-4 last:pb-4">
                  <span className="mt-0.5 font-display text-sm font-semibold text-[#f5c977]">0{index + 1}</span>
                  <span className="text-sm leading-7 text-white/78">{item}</span>
                  <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-white/42" aria-hidden="true" />
                </li>
              ))}
            </ol>
          </article>

          <aside className="action-surface rounded-[28px] p-6 text-white sm:rounded-[32px] sm:p-8">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" aria-hidden="true" />
              <p className="text-sm leading-7 text-white/82">{copy.reassurance}</p>
            </div>
            <div className="mt-6 border-t border-white/12 pt-6">
              <h2 className="font-display text-2xl font-semibold">{copy.handoffTitle}</h2>
              <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {copy.handoffItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="flex items-start gap-3 py-4">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" />
                      <div>
                        <div className="text-sm font-semibold text-white">{item.title}</div>
                        <p className="mt-1 text-sm leading-6 text-white/70">{item.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
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
          </aside>
        </section>

        <section className="panel-soft mt-5 rounded-[28px] p-6 text-white sm:mt-6 sm:rounded-[32px] sm:p-8">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#f5c977]" />
            <h2 className="font-display text-3xl font-semibold">{copy.followUpTitle}</h2>
          </div>
          <ol className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {copy.followUpItems.map((item, index) => (
              <li key={item} className="grid gap-3 py-4 sm:grid-cols-[2.75rem,minmax(0,1fr)] sm:gap-4">
                <span className="font-display text-xl font-semibold text-[#f5c977]">0{index + 1}</span>
                <span className="text-sm leading-7 text-white/76">{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  )
}
