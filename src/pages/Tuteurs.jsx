import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Calculator,
  FlaskConical,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

import {
  GuaranteeSection,
  OperationalPromisesSection,
  TutorRosterSection,
} from "@/components/ConversionSections"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { siteConfig } from "@/lib/seo"

const profilesByLocale = {
  fr: [
    {
      icon: Calculator,
      title: "Maths secondaire 4 et 5",
      description:
        "Pour les élèves qui ont besoin d'une explication structurée, d'une méthode fiable et d'une bonne préparation d'examen.",
      bullets: ["Algèbre, fonctions, trigonométrie", "Méthode de résolution claire", "Approche calme et exigeante"],
    },
    {
      icon: FlaskConical,
      title: "Sciences, chimie et physique",
      description:
        "Pour transformer des notions abstraites en logique concrète et rendre les réponses plus nettes en labo comme en examen.",
      bullets: ["Physique et chimie", "Questions à développement", "Lien entre formules, unités et phénomènes"],
    },
    {
      icon: BrainCircuit,
      title: "Rattrapage et reprise de confiance",
      description:
        "Idéal quand plusieurs chapitres se sont accumulés et qu'il faut remettre de l'ordre sans ajouter plus de stress.",
      bullets: ["Diagnostic rapide", "Plan de reprise réaliste", "Suivi rassurant pour l'élève et le parent"],
    },
  ],
  en: [
    {
      icon: Calculator,
      title: "High school math, grades 10 and 11",
      description:
        "For students who need structured explanations, a reliable method and stronger exam preparation.",
      bullets: ["Algebra, functions and trigonometry", "Clear problem-solving method", "Calm and high-standard teaching"],
    },
    {
      icon: FlaskConical,
      title: "Science, chemistry and physics",
      description:
        "Designed to turn abstract concepts into clear logic and stronger written answers in labs and exams.",
      bullets: ["Physics and chemistry", "Long-form and lab questions", "Clear links between formulas, units and concepts"],
    },
    {
      icon: BrainCircuit,
      title: "Catch-up support and confidence rebuild",
      description:
        "Ideal when several chapters have piled up and the student needs order, clarity and momentum again.",
      bullets: ["Fast academic diagnosis", "Realistic catch-up plan", "Reassuring follow-up for students and parents"],
    },
  ],
}

const standardsByLocale = {
  fr: [
    "Clarté d'explication avant tout",
    "Fiabilité, ponctualité et professionnalisme",
    "Capacité à rassurer sans baisser le niveau",
    "Jumelage selon la matière, le niveau et le style d'accompagnement recherché",
  ],
  en: [
    "Clarity of explanation first",
    "Reliability, punctuality and professionalism",
    "Ability to reassure students without lowering standards",
    "Matching based on subject, grade level and teaching style",
  ],
}

const processByLocale = {
  fr: [
    {
      title: "Comprendre le besoin",
      description: "On regarde le niveau, la matière, l'urgence et le type d'accompagnement qui aidera le plus.",
    },
    {
      title: "Associer le bon profil",
      description: "Le jumelage se fait selon la spécialité, la pédagogie et la disponibilité la plus cohérente.",
    },
    {
      title: "Avancer avec plus de structure",
      description: "L'objectif n'est pas juste de remplir une séance: c'est de faire monter la compréhension et la confiance.",
    },
  ],
  en: [
    {
      title: "Understand the need",
      description: "We look at grade level, subject, urgency and the kind of support that will create the most progress.",
    },
    {
      title: "Match the right profile",
      description: "Matching is based on specialization, teaching style and the best availability fit.",
    },
    {
      title: "Move forward with structure",
      description: "The goal is not just to fill a session, but to increase understanding, confidence and consistency.",
    },
  ],
}

const commitmentsByLocale = {
  fr: [
    {
      icon: Target,
      title: "Besoin cadré avant tout",
      description: "On commence par comprendre où ça bloque vraiment pour éviter un accompagnement trop générique.",
    },
    {
      icon: ShieldCheck,
      title: "Le bon fit compte autant que la matière",
      description: "Le niveau d'exigence, le ton du tuteur et la pédagogie doivent vraiment correspondre au besoin.",
    },
    {
      icon: Sparkles,
      title: "Des familles qui voient mieux la progression",
      description: "Le bon accompagnement réduit le flou et rend le chemin à suivre beaucoup plus lisible pour tout le monde.",
    },
  ],
  en: [
    {
      icon: Target,
      title: "Need clarity first",
      description: "We start by understanding the real academic block so support does not become too generic.",
    },
    {
      icon: ShieldCheck,
      title: "Fit matters as much as the subject",
      description: "The level of rigor, tutor tone and teaching style need to match the need in a real way.",
    },
    {
      icon: Sparkles,
      title: "Families should feel progress more clearly",
      description: "Strong support reduces confusion and makes the path forward much easier to understand.",
    },
  ],
}

const copyByLocale = {
  fr: {
    badge: "Tuteurs • Spécialités et matching",
    title: "Des profils pédagogiques pensés pour rassurer les parents et faire avancer les élèves.",
    intro:
      "Cette page présente le calibre de profils et de spécialités que Méthode Secondaire veut associer aux familles. Le jumelage final dépend toujours du niveau, des besoins et des disponibilités.",
    ctaPrimary: "Réserver un premier échange",
    ctaSecondary: "Lire les témoignages",
    asideEyebrow: "Ce que les familles veulent sentir",
    asideTitle: "Un tutorat sérieux, humain et bien ciblé",
    asidePoints: [
      "Un tuteur qui comprend rapidement où ça bloque.",
      "Une pédagogie claire qui ne crée pas plus de confusion.",
      "Une présence rassurante avant les examens et les périodes plus lourdes.",
    ],
    profilesEyebrow: "Profils représentatifs",
    profilesTitle: "Le type d'accompagnement qui inspire confiance dès le départ",
    profilesDescription:
      "Au lieu de promettre un simple cours, on montre le type de spécialités et de qualités pédagogiques qu'un bon jumelage doit apporter.",
    standardsEyebrow: "Standard de sélection",
    standardsTitle: "Ce qui fait qu'un tuteur mérite d'être recommandé",
    standardsDescription:
      "Les familles ne cherchent pas juste une matière maîtrisée. Elles cherchent quelqu'un de clair, stable et fiable.",
    processEyebrow: "Comment le jumelage se fait",
    processTitle: "Un matching plus intelligent qu'un simple créneau libre",
    processDescription:
      "Les meilleures expériences arrivent quand le profil, la matière et le style d'accompagnement sont réellement alignés.",
    finalBadge: "Pour parents et élèves",
    finalTitle: "Besoin d'un bon match rapidement?",
    finalText:
      "Réservez un premier échange et on pourra orienter le besoin vers le bon type d'accompagnement, en maths ou en sciences.",
    finalButton: "Réserver maintenant",
    finalSecondary: "Devenir tuteur",
    seoTitle: "Tuteurs et spécialités | Méthode Secondaire",
    seoDescription:
      "Découvrez les spécialités, standards pédagogiques et principes de jumelage de Méthode Secondaire pour le tutorat au secondaire.",
    seoKeywords:
      "tuteurs maths secondaire, tuteurs sciences secondaire, tutorat québec, matching tuteur élève, soutien scolaire montréal",
  },
  en: {
    badge: "Tutors • Specialties and matching",
    title: "Teaching profiles designed to reassure parents and move students forward.",
    intro:
      "This page highlights the caliber of tutor profiles and specialties Méthode Secondaire aims to match with families. Final matching always depends on grade level, needs and availability.",
    ctaPrimary: "Book a first conversation",
    ctaSecondary: "Read testimonials",
    asideEyebrow: "What families want to feel",
    asideTitle: "Serious, human and well-matched tutoring",
    asidePoints: [
      "A tutor who understands the real academic block quickly.",
      "Clear teaching that removes confusion instead of adding more.",
      "A reassuring presence before exams and heavier school periods.",
    ],
    profilesEyebrow: "Representative profiles",
    profilesTitle: "The kind of support that inspires confidence from the start",
    profilesDescription:
      "Instead of promising a generic session, we highlight the specialties and teaching qualities a strong match should bring.",
    standardsEyebrow: "Selection standard",
    standardsTitle: "What makes a tutor worth recommending",
    standardsDescription:
      "Families are not just looking for subject knowledge. They are looking for clarity, consistency and reliability.",
    processEyebrow: "How matching works",
    processTitle: "A smarter match than simply filling an open slot",
    processDescription:
      "The best tutoring experiences happen when the profile, subject and teaching style are truly aligned.",
    finalBadge: "For parents and students",
    finalTitle: "Need the right fit quickly?",
    finalText:
      "Book a first conversation and we can guide the need toward the right kind of support, in math or science.",
    finalButton: "Book now",
    finalSecondary: "Become a tutor",
    seoTitle: "Tutors and specialties | Méthode Secondaire",
    seoDescription:
      "Explore the tutoring specialties, teaching standards and matching philosophy behind Méthode Secondaire.",
    seoKeywords:
      "math tutors high school, science tutors high school, tutoring quebec, tutor matching, montreal academic support",
  },
}

export default function Tuteurs() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = copyByLocale[locale]
  const profiles = profilesByLocale[locale]
  const standards = standardsByLocale[locale]
  const process = processByLocale[locale]
  const commitments = commitmentsByLocale[locale]
  const path = getLocalizedPath("tuteurs", locale)

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "en" ? "Tutors and specialties" : "Tuteurs et spécialités",
    url: `${siteConfig.siteUrl}${path}`,
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
        alternates={buildAlternates("tuteurs")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.badge}
            </Badge>

            <h1 className="balanced-copy mt-7 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{copy.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  {copy.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("temoignages", locale)}>{copy.ctaSecondary}</Link>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-white/45">{copy.asideEyebrow}</div>
            <div className="mt-3 font-display text-3xl font-semibold">{copy.asideTitle}</div>

            <ul className="mt-6 space-y-4 text-sm text-white/80">
              {copy.asidePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {point}
                </li>
              ))}
            </ul>
          </MotionCard>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={copy.profilesEyebrow}
            title={copy.profilesTitle}
            description={copy.profilesDescription}
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {profiles.map((profile) => (
              <MotionCard key={profile.title} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
                <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                  <profile.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold">{profile.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{profile.description}</p>

                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  {profile.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </MotionCard>
            ))}
          </div>
        </section>

        <TutorRosterSection locale={locale} className="pt-20" />
        <GuaranteeSection locale={locale} className="pt-20" />

        <section className="pt-20">
          <SectionHeader
            eyebrow={copy.standardsEyebrow}
            title={copy.standardsTitle}
            description={copy.standardsDescription}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr,1.05fr]">
            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <ul className="mt-6 space-y-4 text-sm text-white/80">
                {standards.map((standard) => (
                  <li key={standard} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {standard}
                  </li>
                ))}
              </ul>
            </MotionCard>

            <MotionCard className="rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-7 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold">{copy.processTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/75">{copy.processDescription}</p>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-white/45">
                  {copy.processEyebrow}
                </div>
                <div className="mt-4 space-y-4">
                  {process.map((step, index) => (
                    <div key={step.title} className="rounded-[20px] border border-white/10 bg-[#081a38]/80 px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.24em] text-[#f5c977]">
                        {locale === "en" ? `Step 0${index + 1}` : `Étape 0${index + 1}`}
                      </div>
                      <div className="mt-2 font-semibold text-white">{step.title}</div>
                      <p className="mt-2 text-sm leading-7 text-white/72">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </MotionCard>
          </div>
        </section>

        <OperationalPromisesSection locale={locale} className="pt-20" />

        <section className="pt-20">
          <SectionHeader
            eyebrow={locale === "en" ? "What strong matching protects" : "Ce que le bon matching protège"}
            title={locale === "en" ? "Why this part of the experience matters so much" : "Pourquoi cette étape compte autant dans l'expérience"}
            description={
              locale === "en"
                ? "The strongest tutoring experiences happen when the academic need, the human fit and the progression plan all line up."
                : "Les meilleures expériences de tutorat arrivent quand le besoin académique, le fit humain et la logique de progression sont réellement alignés."
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {commitments.map((commitment) => (
              <MotionCard key={commitment.title} className="glass-panel rounded-[28px] border-white/10 bg-white/[0.04] p-6 text-white">
                <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                  <commitment.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{commitment.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{commitment.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {copy.finalBadge}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{copy.finalTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.finalText}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    {copy.finalButton}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath("devenirTuteur", locale)}>{copy.finalSecondary}</Link>
                </Button>
              </div>
            </div>
          </MotionCard>
        </section>
      </main>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{eyebrow}</div>
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description}</p>
    </div>
  )
}
