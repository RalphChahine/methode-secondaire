import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Calculator,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  FlaskConical,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import BookingEmbed from "@/components/BookingEmbed"
import {
  GuaranteeSection,
  LocalSeoSection,
  OperationalPromisesSection,
  VerifiedReviewsSection,
} from "@/components/ConversionSections"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BOOKING_URL } from "@/config/booking"
import { buildAlternates, getLocalizedPath } from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const heroStats = [
  { label: "Levels covered", value: "Secondary 1 to 5" },
  { label: "Formats", value: "Online or in person" },
  { label: "Outcome", value: "Understand, practice, succeed" },
]

const trustSignals = [
  {
    icon: Target,
    title: "A clear academic diagnosis",
    description:
      "The need is framed around the subject, grade level, urgency and the real block instead of guessing.",
  },
  {
    icon: Users,
    title: "Support chosen with care",
    description:
      "The process focuses on teaching style, student needs and the kind of support that will help most, not just the next open slot.",
  },
  {
    icon: ShieldCheck,
    title: "Progress that feels easier to read",
    description:
      "Parents want to understand what is being worked on, where the student is moving forward and why it is helping.",
  },
]

const pillars = [
  {
    icon: BrainCircuit,
    title: "Immediate clarity",
    description: "We simplify the subject without removing its meaning so students finally understand what they are doing.",
  },
  {
    icon: Target,
    title: "A reusable method",
    description: "Students leave with a process they can apply again the next time they work alone.",
  },
  {
    icon: TrendingUp,
    title: "Visible progress",
    description: "We target the true academic blocks, practice what matters and move forward with a clear direction.",
  },
]

const subjectCards = [
  {
    title: "Math tutoring",
    icon: Calculator,
    to: "/en/math-tutoring",
    description: "Algebra, functions, geometry, trigonometry and exam preparation with a clear method.",
    bullets: ["Equation solving", "Word problems", "Exam preparation"],
  },
  {
    title: "Science tutoring",
    icon: FlaskConical,
    to: "/en/science-tutoring",
    description: "Physics, chemistry, electricity and labs explained through logic instead of confusion.",
    bullets: ["Concepts and formulas", "Long-form answers", "Labs and targeted review"],
  },
]

const stories = [
  {
    title: "From failing to 92% in math",
    description: "The kind of feedback that combines stronger marks with a method that actually stays.",
    points: ["Fast breakthrough", "A method that lasts", "Confidence restored"],
  },
  {
    title: "You saved the year",
    description: "Some families describe tutoring as the moment the school year finally turned around.",
    points: ["Ground regained", "Clearer direction", "Stress drops"],
  },
]

const pricing = [
  {
    title: "Flexible session",
    price: "$75 / h",
    accent: "Ideal for a targeted review or a specific short-term need.",
    bullets: ["Book as needed", "Math or science", "Online or in person"],
  },
  {
    title: "Weekly follow-up",
    price: "$70 / h",
    accent: "The most effective format for building lasting progress.",
    bullets: ["Recurring time slot", "Clear follow-up", "Strong in-school-year option"],
    highlight: true,
  },
  {
    title: "Intensive block",
    price: "On request",
    accent: "For exam season, catch-up work or a short, focused reset.",
    bullets: ["Tight plan", "Clear priorities", "Flexible format"],
  },
]

const faqItems = [
  {
    question: "Is tutoring only for students who are struggling?",
    answer:
      "No. It helps just as much with a difficult subject as it does with stronger exam prep, higher performance or a more stable method.",
  },
  {
    question: "Do you only work online?",
    answer:
      "Both formats are possible. The service is available online across Quebec, with in-person availability depending on the area.",
  },
  {
    question: "Do you help before major exams?",
    answer:
      "Yes. We can build a targeted review plan, focus on the priority concepts and practice exam-style exercises.",
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
    description: "Private high school math and science tutoring for students across Quebec.",
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
        title="Méthode Secondaire | High school math and science tutoring"
        description="Private high school math and science tutoring across Quebec. Clear teaching, structured follow-up and simple booking."
        path="/en"
        keywords="high school math tutoring, high school science tutoring, private tutor quebec, exam preparation"
        jsonLd={homeSchemas}
        lang="en-CA"
        locale="en_CA"
        alternateLocale="fr_CA"
        alternates={buildAlternates("home")}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="mesh-background absolute inset-0 opacity-[0.12]" />
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#7ab4ff]/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#f5c977]/14 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
        <section>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
                  Quebec • Secondary 1 to 5
                </Badge>
                <span className="text-sm text-white/65">Math, science and exam preparation</span>
              </div>

              <h1 className="balanced-copy mt-7 max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Tutoring that restores clarity, strengthens method and brings confidence back.
              </h1>

              <p className="balanced-copy mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Méthode Secondaire helps high school students understand math and science better, practice intelligently and show up ready for evaluations.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]">
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="h-4 w-4" />
                    Call for a diagnostic
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    <CalendarDays className="h-4 w-4" />
                    Book a session
                  </a>
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/68">
                <span>The best first step is often a quick 15-minute call to talk through the situation.</span>
                <button
                  type="button"
                  className="text-white transition hover:text-[#f5c977]"
                  onClick={() => document.getElementById("methode")?.scrollIntoView({ behavior: "smooth" })}
                >
                  See the method
                </button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="glass-panel rounded-[24px] px-4 py-4 text-left">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/45">{stat.label}</div>
                    <div className="mt-2 text-sm font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel section-frame relative overflow-hidden rounded-[34px] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm uppercase tracking-[0.24em] text-white/45">A typical session</div>
                  <div className="mt-2 font-display text-3xl font-semibold text-white">Clear, targeted, reassuring</div>
                </div>
                <div className="rounded-full border border-[#f5c977]/30 bg-[#f5c977]/12 px-4 py-2 text-sm text-[#f8deb0]">
                  Fast response
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  "We identify the unclear concepts and repeated mistakes.",
                  "We re-explain using simple and memorable logic.",
                  "We practice with the exercises that really matter.",
                  "We finish with a clear next-step plan.",
                ].map((step) => (
                  <div key={step} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                    <div className="mt-1 rounded-full bg-[#f5c977] p-1.5 text-[#071631]">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-7 text-white/78">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="methode" className="scroll-mt-32 pt-20">
          <SectionHeader
            eyebrow="Trust from the start"
            title="A serious framework before the first session even begins"
            description="Families want to feel quickly how the need will be clarified, how the support will be chosen and how progress will stay visible."
          />
          <div className="mt-8 grid gap-4 xl:grid-cols-[1.05fr,0.95fr]">
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
              {trustSignals.map((signal) => (
                <MotionCard key={signal.title} className="glass-panel rounded-[28px] border-white/10 bg-white/[0.04] p-6 text-white">
                  <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                    <signal.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">{signal.description}</p>
                </MotionCard>
              ))}
            </div>

            <MotionCard className="rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">First conversation</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">What a parent wants to understand right away</h3>
              <div className="mt-6 space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  Which subject needs priority first
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  Whether the need is short-term, weekly or exam-focused
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  What kind of support will help the student fastest and most sustainably
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="h-4 w-4" />
                    Call to talk it through
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    <CalendarDays className="h-4 w-4" />
                    Book a session
                  </a>
                </Button>
              </div>
            </MotionCard>
          </div>
        </section>

        <GuaranteeSection locale="en" className="pt-20" />

        <section className="pt-20">
          <SectionHeader
            eyebrow="Why it works"
            title="A method designed to lower stress and raise mastery"
            description="The goal is not just to get through one exercise. The goal is to give students something they can reuse on their own."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <MotionCard key={pillar.title} className="glass-panel rounded-[30px] border-white/10 bg-white/[0.04] p-7 text-white">
                <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{pillar.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow="By subject"
            title="Two core disciplines, one promise: make the subject easier to read"
            description="Families can move quickly to the subject they need, while the brand stays clear and focused."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {subjectCards.map((subject) => (
              <MotionCard key={subject.title} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
                <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                  <subject.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold">{subject.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{subject.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  {subject.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="mt-8 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link to={subject.to}>
                    Explore
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow="Testimonials"
            title="Parents talk about breakthroughs, confidence restored and sometimes even a school year saved"
            description="A few anonymized feedback examples help families feel the tone and the level of impact."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {stories.map((story) => (
              <MotionCard key={story.title} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
                <h3 className="font-display text-2xl font-semibold">{story.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{story.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  {story.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </MotionCard>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link to="/en/testimonials">
                See all testimonials
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <VerifiedReviewsSection locale="en" className="pt-20" limit={4} />

        <section className="pt-20">
          <SectionHeader
            eyebrow="Our team"
            title="Clear tutor profiles that help families choose with confidence"
            description="Families can better understand the support style, subject strengths and level of care they can expect."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="grid gap-4">
              {[
                {
                  icon: Users,
                  title: "Strong and reassuring profiles",
                  description: "Families can quickly understand the kind of tutor who may support their child.",
                },
                {
                  icon: ShieldCheck,
                  title: "Clear teaching standards",
                  description: "Families can see what quality means before they even book the first session.",
                },
                {
                  icon: Sparkles,
                  title: "Confidence before the first session",
                  description: "A clearer presentation makes the next step feel easier and more natural.",
                },
              ].map((entry) => (
                <MotionCard key={entry.title} className="glass-panel rounded-[28px] border-white/10 bg-white/[0.04] p-6 text-white">
                  <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                    <entry.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">{entry.description}</p>
                </MotionCard>
              ))}
            </div>

            <MotionCard className="rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">Meet the team</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">Tutors and specialties</h3>
              <p className="mt-3 text-sm leading-7 text-white/75">
                Explore tutor profiles, specialties and teaching styles to understand which type of support feels most appropriate.
              </p>
              <div className="mt-8">
                <Button asChild className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                  <Link to={getLocalizedPath("tuteurs", "en")}>
                    Meet our tutors
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </MotionCard>
          </div>
        </section>

        <OperationalPromisesSection locale="en" className="pt-20" />
        <LocalSeoSection locale="en" className="pt-20" />

        <section id="tarifs" className="scroll-mt-32 pt-20">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple options to move forward at the right pace"
            description="Weekly follow-up is usually the strongest option for lasting progress and much less stress between sessions."
          />
          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {pricing.map((plan) => (
              <MotionCard
                key={plan.title}
                className={`rounded-[32px] p-7 text-white ${
                  plan.highlight
                    ? "border-[#f5c977]/35 bg-[linear-gradient(180deg,rgba(245,201,119,0.18),rgba(255,255,255,0.08))]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-display text-2xl font-semibold">{plan.title}</div>
                  {plan.highlight && (
                    <Badge className="rounded-full border-0 bg-[#f5c977] px-3 py-1 text-[#071631] hover:bg-[#f5c977]">
                      Recommended
                    </Badge>
                  )}
                </div>
                <div className="mt-5 font-display text-5xl font-semibold">{plan.price}</div>
                <p className="mt-4 text-sm leading-7 text-white/72">{plan.accent}</p>
                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8 w-full rounded-full py-6 bg-white/8 text-white hover:bg-white/12">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Choose this option
                  </a>
                </Button>
              </MotionCard>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-32 pt-20">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions families often ask before booking"
            description="Everything is designed to make the first contact simple, fast and reassuring."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faqItems.map((faq) => (
              <details key={faq.question} className="glass-panel rounded-[28px] border border-white/10 px-6 py-5 text-white">
                <summary className="cursor-pointer list-none font-display text-xl font-semibold">{faq.question}</summary>
                <p className="mt-4 text-sm leading-7 text-white/72">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-32 pt-20">
          <SectionHeader
            eyebrow="Contact and booking"
            title="Talking first is often the easiest way to start"
            description="A short phone call usually clarifies the need faster, and the booking calendar stays available right after if you want to move ahead immediately."
          />
          <div className="mt-8 grid gap-4 xl:grid-cols-[0.95fr,1.05fr]">
            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">Recommended first step</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">Talk first, book right after if you want</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">
                The call is there to clarify the subject, grade level, urgency and best format before opening the calendar.
              </p>
              <div className="mt-7 space-y-4">
                <ContactLine icon={Phone} href={`tel:${siteConfig.phone}`} label={siteConfig.phoneDisplay} />
                <ContactLine icon={Mail} href="mailto:chahineralph@gmail.com" label="chahineralph@gmail.com" />
                <ContactLine icon={MapPin} label="Online across Quebec, in person depending on area" />
                <ContactLine icon={Clock3} label="Short diagnostic call, fast replies and simple booking afterwards" />
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button asChild className="rounded-full bg-[#f5c977] py-6 text-[#071631] hover:bg-[#f7d38f]">
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="h-4 w-4" />
                    Call now
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-white/15 bg-white/5 py-6 text-white hover:bg-white/10 hover:text-white">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    <CalendarDays className="h-4 w-4" />
                    Book a session
                  </a>
                </Button>
              </div>
            </MotionCard>

            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">Form</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">Describe the need in one minute</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">Share the level, subject and context. A quick reply follows.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </MotionCard>
          </div>
          <div className="mt-6">
            <BookingEmbed title="Book a session with Méthode Secondaire" />
          </div>
        </section>
      </main>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{eyebrow}</div>
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description}</p>
    </div>
  )
}

function ContactLine({ icon: Icon, href, label }) {
  const content = (
    <>
      <div className="rounded-2xl bg-white/10 p-3 text-[#f5c977]">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm text-white/80">{label}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 transition hover:bg-white/10">
        {content}
      </a>
    )
  }

  return <div className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">{content}</div>
}

function ContactForm() {
  const [status, setStatus] = useState("idle")

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus("sending")

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/mzddpkaz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[28px] border border-white/10 bg-[#0a1d43]/80 px-6 py-10 text-center">
        <div className="inline-flex rounded-full bg-[#f5c977] p-3 text-[#071631]">
          <Check className="h-5 w-5" />
        </div>
        <div className="mt-5 font-display text-3xl font-semibold text-white">Message sent</div>
        <p className="mt-3 text-sm leading-7 text-white/72">Your request was sent successfully. A quick reply will follow.</p>
        <Button type="button" variant="outline" className="mt-6 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Name">
        <Input name="nom" required className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35" placeholder="Student or parent name" />
      </Field>
      <Field label="Email">
        <Input name="email" type="email" required className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35" placeholder="name@email.com" />
      </Field>
      <Field label="Level and subject">
        <Input name="sujet" required className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35" placeholder="Ex. Secondary 4 math or Secondary 5 science" />
      </Field>
      <Field label="Message">
        <Textarea name="message" required className="min-h-[140px] rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35" placeholder="Briefly describe the situation or goal." />
      </Field>
      <input type="hidden" name="_subject" value="New tutoring request - Méthode Secondaire" />
      <input type="hidden" name="_template" value="table" />
      <Button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-[#f5c977] py-6 text-[#071631] hover:bg-[#f7d38f]">
        {status === "sending" ? "Sending..." : "Send request"}
      </Button>
      {status === "error" && (
        <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          An error occurred while sending. You can try again or contact directly by phone or email.
        </div>
      )}
    </form>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/70">{label}</span>
      {children}
    </label>
  )
}
