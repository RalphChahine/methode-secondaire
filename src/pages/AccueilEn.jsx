import {
  ArrowRight,
  Phone,
} from "lucide-react"

import Seo from "@/components/Seo"
import {
  FaqGrid,
  HeroShowcase,
  PricingGrid,
} from "@/components/SimpleMarketingSections"
import ScaleReadinessSection from "@/components/ScaleReadinessSection"
import { BOOKING_URL } from "@/config/booking"
import { buildAlternates } from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const steps = [
  {
    title: "Describe the need",
    mobileLabel: "Describe",
    description:
      "Grade, subject and the main concern.",
  },
  {
    title: "We call you back",
    mobileLabel: "Callback",
    description:
      "We clarify the format and urgency.",
  },
  {
    title: "We start",
    mobileLabel: "Start",
    description:
      "We match the tutor and first session.",
  },
]

const plans = [
  {
    title: "One-time session",
    price: "$75 / h",
    description: "For one chapter, an urgent question or a review before a test.",
    bullets: ["Simple and fast", "Math or science", "Best when the need is clear"],
    action: {
      label: "Book now",
      href: BOOKING_URL,
      external: true,
    },
  },
  {
    title: "Weekly follow-up",
    price: "$70 / h",
    description: "For rebuilding rhythm, method and confidence week after week.",
    bullets: ["Recommended framing call", "Recurring time slot", "Most reassuring during the year"],
    highlight: true,
    highlightLabel: "Core offer",
    action: {
      label: "Call to frame it",
      href: `tel:${siteConfig.phone}`,
      icon: Phone,
    },
  },
  {
    title: "Intensive block",
    price: "On request",
    description: "For catching up quickly before an exam, a heavy term or a reset period.",
    bullets: ["Short plan", "Clear priorities", "Flexible format"],
    action: {
      label: "Book a first session",
      href: BOOKING_URL,
      external: true,
    },
  },
]

const faqItems = [
  {
    question: "Why choose Méthode Secondaire instead of a simple tutor directory?",
    answer:
      "The framework is more guided. Parents do not have to compare random profiles on their own: the need, the right format and the next move become clear much faster.",
  },
  {
    question: "Should I call first or book directly?",
    answer:
      "Simple rule: a clear one-time need means booking can work well. A blurrier situation or weekly support usually means a short call first.",
  },
  {
    question: "Is this only for struggling students?",
    answer:
      "No. It also works very well for exam prep, stronger performance, academic stability and growing independence.",
  },
  {
    question: "Do you serve families across Quebec?",
    answer: "Yes, online across Quebec. In-person support depends on location and availability.",
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
  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Méthode Secondaire | Premium high school math and science tutoring"
        description="Private high school math and science tutoring across Quebec. Clearer framing, simpler formats and real support for families."
        path="/en"
        keywords="high school math tutor quebec, high school science tutor quebec, premium tutoring quebec, exam prep tutoring"
        jsonLd={homeSchemas}
        lang="en-CA"
        locale="en_CA"
        alternateLocale="fr_CA"
        alternates={buildAlternates("home")}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="mesh-background absolute inset-0 opacity-[0.08]" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#7ab4ff]/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#f5c977]/14 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-[#4a8bff]/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28 lg:pt-8">
        <HeroShowcase
          badge="Quebec • Secondary 1 to 5"
          title="1-2-3. We start simply."
          description="Math, science or exams: fill out the form, we call you back, then we launch the right support."
          primaryAction={{
            label: "Start the form",
            href: "#demande",
            icon: ArrowRight,
          }}
          secondaryAction={{
            label: "Call if urgent",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
            hideOnMobile: true,
          }}
          leadForm={{
            id: "demande",
            locale: "en",
            pageName: "home-en-hero",
            eyebrow: "Step 1 • Parent request",
            title: "Fill out the form.",
            description: "This is step 1: share the grade, subject and what is happening. We call back with a clear next step.",
            processEyebrow: "How it works",
            steps,
            trustItems: ["No commitment", "24 h callback", "Clear plan"],
          }}
        />

        <ScaleReadinessSection locale="en" />

        <PricingGrid
          id="offres"
          eyebrow="Pricing"
          title="Three formats that are easy to understand"
          description="One-time need, weekly follow-up or intensive block: the form helps us recommend the right starting point."
          plans={plans}
        />

        <FaqGrid
          id="faq"
          eyebrow="FAQ"
          title="Quick questions"
          description="Only what helps with the next step."
          items={faqItems.slice(0, 3)}
        />
      </main>
    </div>
  )
}
