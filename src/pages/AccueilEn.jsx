import {
  ArrowRight,
  BrainCircuit,
  Calculator,
  CalendarDays,
  FlaskConical,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react"
import { Link } from "react-router-dom"

import { VerifiedReviewsSection } from "@/components/ConversionSections"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import {
  ComparisonSplit,
  ContactSection,
  FaqGrid,
  FeatureGrid,
  FinalCtaSection,
  HeroShowcase,
  PricingGrid,
  StepGrid,
} from "@/components/SimpleMarketingSections"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { buildAlternates, getLocalizedPath } from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const stats = [
  { label: "Grades", value: "Secondary 1 to 5" },
  { label: "Formats", value: "Math, science, follow-up and exams" },
  { label: "Reply", value: "Within one business day" },
]

const trustItems = [
  {
    icon: BrainCircuit,
    title: "We clarify what is really blocking progress",
    description:
      "Chapter, method, stress, exam pressure or lost rhythm: we define the real need before suggesting the next step.",
  },
  {
    icon: ShieldCheck,
    title: "Parents know what to expect",
    description:
      "Recommended format, pace, priority subject and next move: the framework stays readable from the start.",
  },
  {
    icon: Target,
    title: "Students move forward more consistently",
    description:
      "The goal is less confusion, stronger method and progress a family can actually feel from one week to the next.",
  },
]

const steps = [
  {
    step: "01",
    title: "You fill out the student form",
    description:
      "You share the grade, subject, biggest challenges, goals and any useful context about the student so we can understand the situation quickly.",
  },
  {
    step: "02",
    title: "We call you back to frame the need",
    description:
      "We confirm the urgency, the right format, the best rhythm and the most useful support plan before anything starts.",
  },
  {
    step: "03",
    title: "We match the student and launch the first session",
    description:
      "We choose the right tutor, schedule the first session and start with a clearer framework, stronger method and a real plan.",
  },
]

const offerCards = [
  {
    icon: Calculator,
    title: "High school math",
    description:
      "Algebra, functions, geometry, trigonometry and exam preparation with a method the student can actually reuse.",
    bullets: ["Algebra, functions and geometry", "Secondary 1 to 5", "When math starts feeling heavy"],
    action: {
      label: "Explore the math page",
      to: getLocalizedPath("maths", "en"),
      trailing: true,
    },
  },
  {
    icon: FlaskConical,
    title: "High school science",
    description:
      "Physics, chemistry, labs and long-form answers explained with more logic and less overload.",
    bullets: ["Physics, chemistry and labs", "Logic and long answers", "Useful before exams or catch-up periods"],
    action: {
      label: "Explore the science page",
      to: getLocalizedPath("sciences", "en"),
      trailing: true,
    },
  },
  {
    icon: Sparkles,
    title: "Exam sprint",
    description:
      "The right format when time is tight and a student needs to regain control before an exam arrives too fast.",
    bullets: ["Targeted review", "Clear priorities", "For fast-approaching deadlines"],
    action: {
      label: "See the exam sprint",
      to: getLocalizedPath("examSprint", "en"),
      trailing: true,
    },
  },
]

const plans = [
  {
    title: "One-time session",
    price: "$75 / h",
    description: "Best for an urgent need, one specific chapter or a tightly scoped review.",
    bullets: ["Direct booking", "Math or science", "Online or in person"],
    action: {
      label: "Book now",
      href: BOOKING_URL,
      external: true,
    },
  },
  {
    title: "Weekly follow-up",
    price: "$70 / h",
    description: "The strongest format when the goal is calmer, more durable progress across the school year.",
    bullets: ["Call first", "Recurring time slot", "Excellent in-year support"],
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
    description: "For a compressed catch-up period, a reset or a heavy exam window.",
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

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
        <HeroShowcase
          badge="Quebec • Secondary 1 to 5"
          title="Private tutoring that brings back calm, method and momentum."
          description="Math, science, exam preparation and weekly follow-up for high school students across Quebec. We help families understand the need, choose the right format and move forward with more confidence."
          primaryAction={{
            label: "Call to clarify the need",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          secondaryAction={{
            label: "Book a first session",
            href: BOOKING_URL,
            external: true,
            icon: CalendarDays,
          }}
          stats={stats}
          panelEyebrow="When families usually reach out"
          panelTitle="The situations where we help most"
          panelItems={[
            "When concepts have piled up and the student no longer knows where to restart.",
            "When an exam is close and revision still feels messy.",
            "When weekly support is needed to rebuild rhythm and confidence.",
          ]}
          panelNote="The first role of Méthode Secondaire is to frame the situation quickly, then recommend the right next step: focused session, exam sprint or weekly follow-up."
        />

        <FeatureGrid
          eyebrow="Why families choose this framework"
          title="A clearer experience from the first call to the first real progress"
          description="No generic funnel, no blurry choice between random profiles. We guide the family toward the right subject, format and rhythm."
          items={trustItems}
        />

        <ComparisonSplit
          eyebrow="Why it matters"
          title="Well-framed support works better than improvised tutoring"
          description="When the need is defined clearly from the beginning, parents lose less time and students move forward more steadily."
          leftTitle="Generic tutoring"
          leftPoints={[
            "A session gets booked without knowing whether the format is the right one.",
            "Follow-through depends mostly on the parent pushing the process.",
            "The student may understand in the moment without rebuilding a real method.",
          ]}
          rightTitle="Méthode Secondaire"
          rightPoints={[
            "We clarify the subject, urgency and type of block first.",
            "We recommend a focused session or weekly follow-up based on the real need.",
            "Progress stays easier to read for the family from one session to the next.",
          ]}
        />

        <StepGrid
          id="processus"
          eyebrow="How it works"
          title="A simple 3-step onboarding"
          description="No complicated process: you fill out the form, we call you back, then we match the student and launch the first session."
          steps={steps}
        />

        <section id="offres" className="pt-20">
          <div className="section-shell noise-overlay px-6 py-7 sm:px-8 sm:py-8">
            <div className="grid gap-8 lg:grid-cols-[1.02fr,0.98fr]">
              <div className="relative z-10">
                <div className="rule-label text-[0.68rem]">Main format</div>
                <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold leading-[0.95] text-white sm:text-5xl">
                  Weekly follow-up when the goal is to build something stable.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                  When the same problem comes back every week, a one-off session is not always enough. Regular
                  follow-up is often the best format for rebuilding subject knowledge, method and rhythm.
                </p>

                <div className="panel-gold mt-8 rounded-[32px] px-6 py-6 text-white sm:px-7 sm:py-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="rule-label text-[0.68rem]">Recommended support</div>
                      <h3 className="mt-3 font-display text-3xl font-semibold">Weekly follow-up</h3>
                    </div>
                    <div className="rounded-full bg-[#f5c977] px-4 py-1.5 text-sm font-semibold text-[#071631]">
                      $70 / h
                    </div>
                  </div>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82">
                    The right format when the goal is to create stability, lower weekly friction and rebuild
                    academic structure over time.
                  </p>

                  <ul className="mt-5 space-y-3 text-sm text-white/84">
                    {[
                      "We often start with a short call to understand the level, priority subject and right pace.",
                      "This works especially well for students who need durable structure, not only a quick boost.",
                      "Families can see more clearly what is improving from one week to the next.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#071631]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild className="rounded-full bg-[#071631] px-6 py-6 text-base text-white hover:bg-[#0b2048]">
                      <a href={`tel:${siteConfig.phone}`}>
                        <Phone className="h-4 w-4" />
                        Call to discuss it
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-[#071631]/15 bg-white/70 px-6 py-6 text-base text-[#071631] hover:bg-white"
                    >
                      <Link to={getLocalizedPath("weeklyFollowUp", "en")}>
                        See the dedicated page
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="rule-label text-[0.68rem]">Other formats</div>
                <h3 className="balanced-copy mt-4 font-display text-3xl font-semibold text-white">
                  Simple entry points depending on the situation
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                  If the need is more specific, families can also start with a subject page or a more urgent format.
                </p>

                <div className="mt-6 grid gap-4">
                  {offerCards.map((item, index) => (
                    <MotionCard
                      key={item.title}
                      className={`rounded-[30px] p-6 text-white sm:p-7 ${
                        index === 1 ? "panel-gold" : "panel-soft"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="text-xs uppercase tracking-[0.24em] text-white/42">{`0${index + 1}`}</div>
                      </div>

                      <h4 className="balanced-copy mt-5 font-display text-2xl font-semibold">{item.title}</h4>
                      <p className="mt-3 text-sm leading-7 text-white/74">{item.description}</p>

                      <ul className="mt-5 space-y-3 text-sm text-white/82">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        >
                          <Link to={item.action.to}>
                            {item.action.label}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </MotionCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <PricingGrid
          eyebrow="Pricing"
          title="Pricing that is simple to understand"
          description="Parents can quickly see which format matches the situation without decoding a complicated offer."
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
          title="Describe the need in one minute"
          description="Tell us the subject, grade level and biggest concern. You fill out the form, we call you back, then we organize the right tutor match."
          bullets={[
            "Mention the subject, grade level and what feels most blocked.",
            "If an exam is close, say it right away.",
            "For weekly follow-up, a short call is often the strongest first move.",
          ]}
          pageName="home-en"
        />

        <FinalCtaSection
          badge="Math • Science • Follow-up • Quebec"
          title="The right first step depends on what the student needs now."
          description="If the situation is clear, a focused session may be enough. If the same issue keeps coming back each week, we can frame more durable support now."
          primaryAction={{
            label: "Call now",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          secondaryAction={{
            label: "Book a session",
            href: BOOKING_URL,
            external: true,
            icon: CalendarDays,
          }}
        />
      </main>
    </div>
  )
}
