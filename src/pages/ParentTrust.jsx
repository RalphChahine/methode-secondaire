import {
  CalendarCheck,
  FileText,
  LockKeyhole,
  Phone,
  ShieldCheck,
  UsersRound,
} from "lucide-react"
import { useLocation } from "react-router-dom"

import Seo from "@/components/Seo"
import ProgressJourney from "@/components/ProgressJourney"
import { Button } from "@/components/ui/button"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const contentByLocale = {
  fr: {
    badge: "Confiance parents",
    title: "Un service clair avant, pendant et après la séance.",
    intro: "Vous savez qui est impliqué, ce qui est prévu et quelle est la prochaine étape. L'équipe garde le jumelage et les décisions importantes à taille humaine.",
    titleSeo: "Confiance, confidentialité et annulation | Méthode Secondaire",
    descriptionSeo: "Comprenez le jumelage, le suivi, les rappels, la confidentialité et la politique d'annulation de Méthode Secondaire.",
    matchingTitle: "Le jumelage reste encadré",
    matchingText: "Les tuteurs ne créent pas eux-mêmes un accès public. L'équipe valide le roster, propose le tuteur selon le besoin et garde le lien avec la famille.",
    trackingTitle: "Un suivi lisible",
    trackingText: "Les séances, confirmations, paiements et résumés sont centralisés dans le portail. Le tuteur utilise un bilan structuré; le parent voit seulement les informations utiles au suivi.",
    privacyTitle: "Des renseignements utilisés pour le service",
    privacyText: "Les coordonnées, le niveau et le contexte servent à organiser le tutorat, le jumelage, les rappels et les paiements. L'accès est protégé par code envoyé par email et peut être désactivé par l'équipe.",
    cancelTitle: "Les changements ne disparaissent pas dans un message",
    cancelText: "Une demande de changement passe par le portail. Avec au moins 72 h de préavis, le report est garanti. Sous ce délai, l'équipe examine la solution possible avec la famille, sans retirer automatiquement un crédit ou un paiement.",
    remindersTitle: "Des confirmations et rappels concrets",
    remindersText: "Lorsque la séance est confirmée, les participants reçoivent une invitation calendrier. Les rappels et les demandes de bilan sont automatisés, puis visibles dans le suivi.",
    contactTitle: "Une question avant de commencer?",
    contactText: "Appelez l'équipe pour parler de la matière, du niveau, du délai ou du bon premier pas. Vous n'avez pas à choisir seul un tuteur ou une formule.",
    call: "Appeler l'équipe",
    portal: "Accéder au portail parent",
  },
  en: {
    badge: "Parent trust",
    title: "A clear service before, during and after each session.",
    intro: "You know who is involved, what is planned and what happens next. The team keeps matching and important decisions human-sized.",
    titleSeo: "Parent trust, privacy and cancellations | Methode Secondaire",
    descriptionSeo: "Understand matching, follow-up, reminders, privacy and cancellation terms at Methode Secondaire.",
    matchingTitle: "Matching stays supervised",
    matchingText: "Tutors cannot create a public account on their own. The team validates the roster, proposes the tutor based on the need and stays connected to the family.",
    trackingTitle: "Follow-up stays readable",
    trackingText: "Sessions, confirmations, payments and summaries are centralized in the portal. Tutors use a structured summary; parents see only the information useful for follow-up.",
    privacyTitle: "Information used to provide the service",
    privacyText: "Contact details, grade level and context are used to organize tutoring, matching, reminders and payments. Access is protected by an email code and can be disabled by the team.",
    cancelTitle: "Changes do not disappear in a message thread",
    cancelText: "Schedule changes go through the portal. With at least 72 hours' notice, rescheduling is guaranteed. Later requests are reviewed with the family, without automatically removing a credit or payment.",
    remindersTitle: "Concrete confirmations and reminders",
    remindersText: "Once a session is confirmed, both people receive a calendar invitation. Reminders and summary requests are automated, then visible in follow-up.",
    contactTitle: "A question before starting?",
    contactText: "Call the team to discuss subject, grade level, timing or the right first step. You do not have to choose a tutor or format alone.",
    call: "Call the team",
    portal: "Open parent portal",
  },
}

export default function ParentTrust() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("trust", locale)
  const commitments = [
    { icon: UsersRound, title: copy.matchingTitle, text: copy.matchingText },
    { icon: FileText, title: copy.trackingTitle, text: copy.trackingText },
    { icon: LockKeyhole, title: copy.privacyTitle, text: copy.privacyText },
    { icon: CalendarCheck, title: copy.cancelTitle, text: copy.cancelText },
    { icon: ShieldCheck, title: copy.remindersTitle, text: copy.remindersText },
  ]
  const experience = locale === "fr"
    ? {
        journeyEyebrow: "Un parcours accompagné",
        journeyTitle: "Toujours savoir ce qui suit",
        journeyIntro: "On avance avec vous, sans vous laisser deviner la bonne décision.",
        journeyCount: "repères clairs",
        journeySteps: [
          { label: "Partagez le besoin", description: "Matière, niveau et contexte, dans vos mots." },
          { label: "Recevez un jumelage", description: "L'équipe vous propose un tuteur adapté." },
          { label: "Confirmez la séance", description: "Horaire, invitation et rappel restent visibles." },
          { label: "Gardez le fil", description: "Les bilans et prochaines étapes vivent au même endroit." },
        ],
        commitmentsEyebrow: "Ce que vous gardez en main",
        commitmentsTitle: "Des repères utiles, pas plus de charge mentale.",
        commitmentsIntro: "Chaque partie du service est expliquée simplement pour que vous puissiez suivre, modifier ou poser une question au bon moment.",
        commitmentLabel: "Engagement",
        closingEyebrow: "On reste disponible",
      }
    : {
        journeyEyebrow: "A guided path",
        journeyTitle: "Always know what comes next",
        journeyIntro: "We move forward with you, without leaving you to guess the right decision.",
        journeyCount: "clear moments",
        journeySteps: [
          { label: "Share the need", description: "Subject, grade and context, in your own words." },
          { label: "Receive a match", description: "The team proposes a tutor suited to the need." },
          { label: "Confirm the session", description: "Schedule, invitation and reminder stay visible." },
          { label: "Keep the thread", description: "Summaries and next steps live in one place." },
        ],
        commitmentsEyebrow: "What stays in your hands",
        commitmentsTitle: "Useful clarity, not more mental load.",
        commitmentsIntro: "Every part of the service is explained simply, so you can follow, adjust or ask a question at the right time.",
        commitmentLabel: "Commitment",
        closingEyebrow: "We remain available",
      }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-12">
      <Seo
        title={copy.titleSeo}
        description={copy.descriptionSeo}
        path={path}
        keywords="confidentialité tutorat, annulation séance, portail parent, tutorat secondaire"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: copy.titleSeo,
          url: absoluteUrl(path),
          about: { "@type": "EducationalOrganization", name: siteConfig.siteName, url: siteConfig.siteUrl },
        }}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("trust")}
      />

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a1d3c] px-5 py-7 text-white shadow-[0_26px_70px_rgba(3,12,31,0.22)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#f5c977]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-[#6289c6]/10 blur-3xl" aria-hidden="true" />

        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#f5c977]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f5c977]/25 bg-[#f5c977]/10">
              <ShieldCheck className="h-4 w-4" />
            </span>
            {copy.badge}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">{copy.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="min-h-12 w-full rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f] sm:w-auto">
              <a href={`tel:${siteConfig.phone}`}><Phone className="h-4 w-4" />{copy.call}</a>
            </Button>
            <Button asChild variant="outline" className="min-h-12 w-full rounded-full border-white/15 bg-white/[0.06] px-5 text-white hover:bg-white/10 hover:text-white sm:w-auto">
              <a href={getLocalizedPath("portal", locale)}>{copy.portal}</a>
            </Button>
          </div>
        </div>

        <dl className="relative mt-9 grid border-t border-white/10 pt-5 sm:grid-cols-3 sm:divide-x sm:divide-white/10 sm:pt-6">
          {[
            { icon: UsersRound, label: copy.matchingTitle },
            { icon: LockKeyhole, label: copy.privacyTitle },
            { icon: CalendarCheck, label: copy.cancelTitle },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-3 py-3 sm:px-5 sm:first:pl-0 sm:last:pr-0">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
              <dt className="text-sm font-medium leading-5 text-white/78">{label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <ProgressJourney
        className="mt-8 lg:mt-10"
        eyebrow={experience.journeyEyebrow}
        title={experience.journeyTitle}
        intro={experience.journeyIntro}
        steps={experience.journeySteps}
        currentIndex={0}
        countLabel={experience.journeyCount}
        columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      />

      <section className="py-14 lg:py-20" aria-labelledby="trust-commitments-title">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f5c977]">{experience.commitmentsEyebrow}</p>
          <h2 id="trust-commitments-title" className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">{experience.commitmentsTitle}</h2>
          <p className="mt-4 text-base leading-7 text-white/66">{experience.commitmentsIntro}</p>
        </div>

        <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {commitments.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="grid gap-4 py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6 sm:py-7">
              <div className="flex items-center gap-3 sm:block">
                <span className="font-display text-sm font-semibold tracking-[0.12em] text-[#f5c977]">{String(index + 1).padStart(2, "0")}</span>
                <span className="hidden h-px flex-1 bg-white/15 sm:mt-4 sm:block" />
                <Icon className="h-5 w-5 text-[#f5c977] sm:mt-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-white/42">{experience.commitmentLabel}</p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-white/10 pb-2 pt-8 sm:pb-4 sm:pt-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f5c977]">{experience.closingEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">{copy.contactTitle}</h2>
            <p className="mt-3 text-base leading-7 text-white/66">{copy.contactText}</p>
          </div>
          <Button asChild className="min-h-12 w-full shrink-0 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f] sm:w-auto">
            <a href={`tel:${siteConfig.phone}`}><Phone className="h-4 w-4" />{copy.call}</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
