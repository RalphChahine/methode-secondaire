import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react"

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

const contentByLocale = {
  fr: {
    signals: [
      {
        icon: TrendingUp,
        title: "Progression visible",
        description: "Les familles parlent de notes qui remontent, mais surtout d'une vraie stabilité dans la méthode.",
      },
      {
        icon: HeartHandshake,
        title: "Année sauvée",
        description: "Quand la matière semblait perdue, plusieurs retours parlent d'un véritable tournant dans l'année scolaire.",
      },
      {
        icon: ShieldCheck,
        title: "Confiance retrouvée",
        description: "Le changement le plus fréquent: moins de panique, plus de calme et plus de contrôle avant les évaluations.",
      },
    ],
    testimonials: [
      {
        quote:
          "Mon fils est passé d'un échec à 92 % en maths. On a senti un vrai déclic, mais surtout une méthode qui est restée.",
        author: "Parent d'un élève de secondaire 4",
        tag: "Mathématiques",
      },
      {
        quote:
          "Honnêtement, vous avez sauvé son année. On ne parlait plus seulement de tutorat, on parlait d'un retour complet de confiance.",
        author: "Parent d'un élève de secondaire 5",
        tag: "Suivi régulier",
      },
      {
        quote:
          "Pour la première fois, ma fille est sortie d'un examen en disant qu'elle savait ce qu'elle faisait du début à la fin.",
        author: "Parent d'une élève de secondaire 3",
        tag: "Préparation d'examen",
      },
      {
        quote:
          "On voyait enfin une vraie structure: comprendre, pratiquer, corriger. La différence s'est ressentie très vite.",
        author: "Parent d'un élève de secondaire 2",
        tag: "Méthode",
      },
      {
        quote:
          "Avant, les sciences étaient juste du par coeur stressant. Maintenant, il comprend ce qu'il fait et ses résultats suivent.",
        author: "Parent d'un élève de secondaire 5",
        tag: "Sciences",
      },
      {
        quote:
          "Le plus grand changement n'a pas été seulement la note. C'était la confiance retrouvée et le calme à la maison.",
        author: "Parent d'un élève du secondaire",
        tag: "Impact global",
      },
    ],
    themes: [
      "Des notes qui remontent après une période difficile",
      "Une méthode plus claire et plus stable",
      "Des examens abordés avec beaucoup moins de stress",
      "Une relation plus saine avec les maths et les sciences",
    ],
    badge: "Témoignages • Parents et élèves",
    heroTitle:
      "Des retours qui donnent envie d'avancer, et qui donnent confiance avant même la première séance.",
    heroText:
      "Témoignages anonymisés et reformulés pour protéger la confidentialité des familles, tout en reflétant fidèlement le type de retours que reçoit Méthode Secondaire.",
    ctaPrimary: "Réserver une séance",
    ctaSecondary: "Retour à l'accueil",
    asideEyebrow: "Ce qui revient le plus souvent",
    asideTitle: "Des familles qui sentent une vraie différence",
    sectionOneEyebrow: "Paroles de familles",
    sectionOneTitle: "Des témoignages qui parlent de résultats, mais aussi de sérénité",
    sectionOneDescription:
      "Quand une famille prend le temps d'écrire après une belle progression, ce sont souvent ces mots-là qui reviennent.",
    sectionTwoEyebrow: "Impact ressenti",
    sectionTwoTitle: "Ce que ces messages disent au fond",
    sectionTwoDescription:
      "Au-delà des notes, les retours parlent surtout d'un élève qui recommence à croire qu'il est capable.",
    themesTitle: "Thèmes récurrents",
    finalTitle: "Une page qui rassure avant même le premier contact",
    finalText:
      "Quand un parent lit des retours comme ceux-ci, il comprend tout de suite que l'objectif n'est pas seulement d'aider pour un devoir, mais de produire une vraie progression durable.",
    finalPrimary: "Réserver maintenant",
    finalSecondary: "Voir la page devenir tuteur",
    seoTitle: "Témoignages | Méthode Secondaire",
    seoDescription:
      "Découvrez des témoignages anonymisés de parents et d'élèves en maths et sciences au secondaire: progression, confiance et résultats.",
    seoKeywords:
      "témoignages tutorat secondaire, avis tutorat maths, avis tutorat sciences, progression scolaire Québec",
    schemaName: "Témoignages",
  },
  en: {
    signals: [
      {
        icon: TrendingUp,
        title: "Visible progress",
        description: "Families talk about marks going up, but even more about a method that finally feels stable.",
      },
      {
        icon: HeartHandshake,
        title: "A school year turned around",
        description: "When the subject felt lost, several messages describe a real turning point in the school year.",
      },
      {
        icon: ShieldCheck,
        title: "Confidence restored",
        description: "The most common shift is less panic, more calm and far more control before evaluations.",
      },
    ],
    testimonials: [
      {
        quote:
          "My son went from failing to 92% in math. We felt a real breakthrough, but most of all a method that stayed with him.",
        author: "Parent of a Secondary 4 student",
        tag: "Mathematics",
      },
      {
        quote:
          "Honestly, you saved the year. It stopped feeling like tutoring and started feeling like confidence coming back.",
        author: "Parent of a Secondary 5 student",
        tag: "Weekly support",
      },
      {
        quote:
          "For the first time, my daughter came out of an exam saying she knew exactly what she was doing from start to finish.",
        author: "Parent of a Secondary 3 student",
        tag: "Exam preparation",
      },
      {
        quote:
          "We could finally see a real structure: understand, practice, correct. The difference showed up very quickly.",
        author: "Parent of a Secondary 2 student",
        tag: "Method",
      },
      {
        quote:
          "Science used to feel like stressful memorization. Now he understands what he is doing and the results are following.",
        author: "Parent of a Secondary 5 student",
        tag: "Science",
      },
      {
        quote:
          "The biggest change was not just the grade. It was the confidence that came back, and the calm at home.",
        author: "Parent of a high school student",
        tag: "Overall impact",
      },
    ],
    themes: [
      "Marks rising after a difficult stretch",
      "A clearer and more stable method",
      "Exams approached with much less stress",
      "A healthier relationship with math and science",
    ],
    badge: "Testimonials • Parents and students",
    heroTitle:
      "The kind of feedback that builds trust before the very first session.",
    heroText:
      "These testimonials are anonymized and lightly reformulated to protect family privacy while staying true to the kind of feedback Méthode Secondaire receives.",
    ctaPrimary: "Book a session",
    ctaSecondary: "Back to home",
    asideEyebrow: "What comes back most often",
    asideTitle: "Families who feel a real difference",
    sectionOneEyebrow: "From families",
    sectionOneTitle: "Testimonials about results, but also about peace of mind",
    sectionOneDescription:
      "When families take the time to write after real progress, these are the kinds of words that keep coming back.",
    sectionTwoEyebrow: "What it really means",
    sectionTwoTitle: "What these messages say underneath the marks",
    sectionTwoDescription:
      "Beyond grades, the feedback usually points to a student who starts believing again that success is possible.",
    themesTitle: "Recurring themes",
    finalTitle: "A page that reassures families before the first conversation",
    finalText:
      "When a parent reads feedback like this, they immediately understand that the goal is not just homework help, but real long-term progress.",
    finalPrimary: "Book now",
    finalSecondary: "See the tutor page",
    seoTitle: "Testimonials | Méthode Secondaire",
    seoDescription:
      "Read anonymized parent and student testimonials about high school math and science tutoring: progress, confidence and results.",
    seoKeywords:
      "high school tutoring testimonials, math tutor reviews, science tutor reviews, quebec academic progress",
    schemaName: "Testimonials",
  },
}

export default function Temoignages() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("temoignages", locale)

  const testimonialsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.schemaName,
    url: `${siteConfig.siteUrl}${path}`,
    description: copy.seoDescription,
    publisher: {
      "@type": "EducationalOrganization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  }

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        keywords={copy.seoKeywords}
        jsonLd={testimonialsSchema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("temoignages")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.badge}
            </Badge>

            <h1 className="balanced-copy mt-7 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
              {copy.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{copy.heroText}</p>

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
                <Link to={getLocalizedPath("home", locale)}>{copy.ctaSecondary}</Link>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-white/45">{copy.asideEyebrow}</div>
            <div className="mt-3 font-display text-3xl font-semibold">{copy.asideTitle}</div>

            <div className="mt-6 space-y-4">
              {copy.signals.map((signal) => (
                <div key={signal.title} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-[#f5c977] p-2.5 text-[#071631]">
                      <signal.icon className="h-4 w-4" />
                    </div>
                    <div className="font-semibold text-white">{signal.title}</div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/72">{signal.description}</p>
                </div>
              ))}
            </div>
          </MotionCard>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={copy.sectionOneEyebrow}
            title={copy.sectionOneTitle}
            description={copy.sectionOneDescription}
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {copy.testimonials.map((testimonial) => (
              <MotionCard key={testimonial.quote} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                    <Quote className="h-5 w-5" />
                  </div>
                  <Badge className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-white/85 hover:bg-white/10">
                    {testimonial.tag}
                  </Badge>
                </div>

                <div className="mt-5 flex gap-1 text-[#f5c977]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <blockquote className="mt-5 text-lg leading-8 text-white/90">
                  “{testimonial.quote}”
                </blockquote>

                <div className="mt-6 text-sm text-white/60">{testimonial.author}</div>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={copy.sectionTwoEyebrow}
            title={copy.sectionTwoTitle}
            description={copy.sectionTwoDescription}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">{copy.themesTitle}</div>
              <ul className="mt-6 space-y-4 text-sm text-white/80">
                {copy.themes.map((theme) => (
                  <li key={theme} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {theme}
                  </li>
                ))}
              </ul>
            </MotionCard>

            <MotionCard className="rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-7 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold">{copy.finalTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/75">{copy.finalText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    {copy.finalPrimary}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath("devenirTuteur", locale)}>{copy.finalSecondary}</Link>
                </Button>
              </div>
            </MotionCard>
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
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description}</p>
    </div>
  )
}
