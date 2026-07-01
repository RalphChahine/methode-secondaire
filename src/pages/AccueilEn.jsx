import {
  ArrowRight,
  BrainCircuit,
  Phone,
  ShieldCheck,
  Target,
} from "lucide-react"

import { VerifiedReviewsSection } from "@/components/ConversionSections"
import Seo from "@/components/Seo"
import {
  ContactSection,
  FaqGrid,
  FeatureGrid,
  HeroShowcase,
  PricingGrid,
  StepGrid,
} from "@/components/SimpleMarketingSections"
import { BOOKING_URL } from "@/config/booking"
import { buildAlternates } from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const stats = [
  { label: "For whom", value: "Secondary 1 to 5" },
  { label: "Need", value: "Math, science or exams" },
  { label: "Next step", value: "Callback within one business day" },
]

const trustItems = [
  {
    icon: BrainCircuit,
    title: "We clarify before selling a session",
    description:
      "Grade, subject, exam pressure, stress or lost rhythm: we put simple words on the situation quickly.",
  },
  {
    icon: ShieldCheck,
    title: "Parents stay in control",
    description:
      "You know why a format is recommended, what happens next and when the student can start.",
  },
  {
    icon: Target,
    title: "Students start with a concrete framework",
    description:
      "The goal is less confusion, stronger method and progress that is easier for the family to read.",
  },
]

const steps = [
  {
    step: "1 minute",
    title: "You describe the need",
    description:
      "Grade, subject, urgency and the main concern. The form stays short so you can take action right away.",
  },
  {
    step: "Callback",
    title: "We clarify with you",
    description:
      "We confirm the urgency, the right format and the most logical rhythm so you do not have to guess alone.",
  },
  {
    step: "Start",
    title: "We launch the right match",
    description:
      "We choose the tutor, schedule the first session and the student starts with a clear plan.",
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
          title="Is your teen stuck in math or science? We guide you in 3 steps."
          description="Fill out the form, we clarify the need with you, then we organize the right tutor. Simple, reassuring and guided."
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
          stats={stats}
          leadForm={{
            id: "demande",
            locale: "en",
            pageName: "home-en-hero",
            eyebrow: "Parent request",
            title: "Tell us where it is stuck.",
            description: "A few details are enough to understand the situation and reply with a clear next step.",
            steps: [{ label: "Describe" }, { label: "Callback" }, { label: "Start" }],
            trustItems: ["No commitment", "24 h callback", "Clear plan"],
          }}
        />

        <StepGrid
          id="processus"
          eyebrow="How it works"
          title="The path is deliberately simple"
          description="Parents do not have to compare random profiles or guess the right format. We understand first, then we act."
          steps={steps}
        />

        <FeatureGrid
          eyebrow="Why it feels safer"
          title="A simple framework before the first session"
          description="We remove the blurry decisions: you explain the situation, we guide the format, then the student starts with a method."
          items={trustItems}
        />

        <PricingGrid
          id="offres"
          eyebrow="Pricing"
          title="Three formats that are easy to understand"
          description="One-time need, weekly follow-up or intensive block: the form helps us recommend the right starting point."
          plans={plans}
        />

        <VerifiedReviewsSection locale="en" className="pt-20" limit={3} showLink />

        <FaqGrid
          id="faq"
          eyebrow="FAQ"
          title="The questions a parent usually has before calling"
          description="Only the answers that genuinely help with the next step stay on the page."
          items={faqItems}
        />

        <ContactSection
          locale="en"
          eyebrow="Contact"
          title="Prefer to talk to someone first?"
          description="The form is the simplest path. If the situation is urgent or sensitive, you can also call directly."
          bullets={[
            "The form above gives us the basic context.",
            "A call is useful when an exam or concern is pressing.",
            "Either way, parents get a clear next step.",
          ]}
          pageName="home-en"
          showForm={false}
        />
      </main>
    </div>
  )
}
