import { ArrowRight, CalendarDays } from "lucide-react"

import Seo from "@/components/Seo"
import { OperationalPromisesSection } from "@/components/ConversionSections"
import PricingSection from "@/components/PricingSection"
import {
  FaqGrid,
  HeroShowcase,
  ParentStartingPointsSection,
} from "@/components/SimpleMarketingSections"
import { DECLIC_REQUEST_URL_EN } from "@/config/booking"
import { buildAlternates, getLocalizedPath } from "@/lib/i18n"
import { formatCadAmount, getOffer } from "@/lib/pricing"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const targetedSessionOffer = getOffer("targeted_session")
const progressionBlockOffer = getOffer("progression_block")
const targetedSessionPrice = formatCadAmount(targetedSessionOffer.totalPriceCad, "en")
const progressionSessionPrice = formatCadAmount(progressionBlockOffer.perSessionPriceCad, "en")

const parentStartingPoints = [
  {
    eyebrow: "An exam is coming up",
    title: "We put revision back in order.",
    description: "We identify priority chapters and give your teen a clear first study plan.",
    intent: "exam",
    actionLabel: "Request a first session",
    actionHref: DECLIC_REQUEST_URL_EN,
    to: getLocalizedPath("examSprint", "en"),
    linkLabel: "See the exam sprint",
  },
  {
    eyebrow: "Homework stretches through the evening",
    title: "We find where it is getting stuck, without doing it for them.",
    description: "We work on the concept or method that blocks progress so your teen can use it again.",
    intent: "homework",
    actionLabel: "Request a first session",
    actionHref: DECLIC_REQUEST_URL_EN,
    to: getLocalizedPath("homeworkHelpSecondary", "en"),
    linkLabel: "See homework help",
  },
  {
    eyebrow: "The same difficulties keep returning",
    title: "We build continuity so progress does not reset.",
    description: "We first confirm the right tutor and priority, then suggest a progress block when the situation needs continuity. A weekly rhythm remains an option after matching.",
    intent: "ongoing",
    actionLabel: "Request the right starting point",
    actionHref: `${DECLIC_REQUEST_URL_EN}?offer=progression`,
    to: getLocalizedPath("academicSupportSecondary", "en"),
    linkLabel: "See academic support",
  },
]

const faqItems = [
  {
    question: "Why choose Methode Secondaire instead of a tutor directory?",
    answer:
      "You do not compare random profiles alone. The team clarifies the need, confirms the right tutor, and keeps the next step readable for the parent.",
  },
  {
    question: "Do I need to create an account before requesting a session?",
    answer:
      "No. You first send a short request. The team confirms the tutor and time; the portal is then invited for active-client follow-up.",
  },
  {
    question: "What if I do not know the right format yet?",
    answer:
      "Use the 2-minute mini-assessment. It is optional and suggests one first action; it does not trigger a call automatically.",
  },
  {
    question: `Why is the progress block ${progressionSessionPrice} per session while the targeted session is ${targetedSessionPrice}?`,
    answer:
      `The ${progressionSessionPrice} rate applies to the ${progressionBlockOffer.sessionCount}-session block, not a required cadence. After matching, a weekly time can be suggested when it helps; the block never renews automatically.`,
  },
  {
    question: "Is this only for struggling students?",
    answer:
      "No. It also works for exam preparation, consolidation, academic stability, and building independence.",
  },
]

const homeSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    logo: absoluteUrl("/Methode_Secondaire.png"),
    image: absoluteUrl("/og-image.png"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description: "Private high school math and science tutoring across Quebec.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  },
]

export default function AccueilEn() {
  function openMiniAssessment() {
    if (typeof window === "undefined") {
      return
    }

    window.dispatchEvent(new CustomEvent("methode:open-diagnostic"))
  }

  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Methode Secondaire | High school math and science tutoring"
        description="Private high school math and science tutoring across Quebec. Request a first session without creating an account, then keep parent follow-up clear."
        path="/en"
        keywords="high school math tutor quebec, high school science tutor quebec, tutoring quebec, exam prep tutoring"
        jsonLd={homeSchemas}
        lang="en-CA"
        locale="en_CA"
        alternateLocale="fr_CA"
        alternates={buildAlternates("home")}
      />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28 lg:pt-8">
        <HeroShowcase
          badge="Math and science | Secondary 1 to 5"
          title="When school starts feeling heavy at home, you do not have to solve it alone."
          description={`An exam is coming, homework keeps stretching, or marks are worrying you: request a ${targetedSessionOffer.durationMinutes}-minute first session for ${targetedSessionPrice}. We confirm the right tutor and time before inviting you to the portal.`}
          primaryAction={{
            label: `Request a first session · ${targetedSessionPrice} / ${targetedSessionOffer.durationMinutes} min`,
            href: DECLIC_REQUEST_URL_EN,
            icon: CalendarDays,
          }}
          secondaryAction={{
            label: "Not sure of the right format? Mini-assessment \u00b7 2 min",
            onClick: openMiniAssessment,
            icon: ArrowRight,
          }}
          actionHint={
            <>
              Urgent situation?{" "}
              <a href={`tel:${siteConfig.phone}`} className="font-semibold text-[#f5c977] transition hover:text-white">
                Call now
              </a>
              .
            </>
          }
          panelEyebrow="Here is how it works"
          panelTitle="A short request. No account to create before you begin."
          panelItems={[
            "You simply describe the grade, subject, and what is getting stuck.",
            "The team confirms the tutor, format, and time before any payment.",
            "The portal is then used for sessions, summaries, and payments by active clients.",
          ]}
          panelNote="The Targeted session is real tutoring, not a sales call or a disguised trial."
        />

        <ParentStartingPointsSection
          eyebrow="This may sound familiar"
          title="You do not need a perfect plan to begin."
          description="Choose the situation that feels closest. The short request gives the team context without asking you to choose a package blindly."
          items={parentStartingPoints}
        />

        <OperationalPromisesSection locale="en" className="pt-20" />

        <PricingSection id="offers" locale="en" />

        <FaqGrid
          id="faq"
          eyebrow="FAQ"
          title="Quick questions"
          description="Only what helps with the next step."
          items={faqItems.slice(0, 4)}
        />
      </main>
    </div>
  )
}
