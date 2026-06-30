import { Calculator, CalendarDays, LineChart, Phone, Sigma, Target, Triangle } from "lucide-react"
import { useLocation } from "react-router-dom"

import { VerifiedReviewsSection } from "@/components/ConversionSections"
import Seo from "@/components/Seo"
import {
  ContactSection,
  FaqGrid,
  FeatureGrid,
  FinalCtaSection,
  HeroShowcase,
  StepGrid,
} from "@/components/SimpleMarketingSections"
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
    badge: "Maths • Secondaire 1 à 5",
    title: "Des maths plus claires, plus calmes et plus structurées.",
    description:
      "Le but n'est pas d'empiler des exercices. Le but est que l'élève comprenne enfin quoi faire devant un problème, une équation ou un examen.",
    primary: "Appeler pour un diagnostic maths",
    secondary: "Réserver une séance de maths",
    panelEyebrow: "Bon fit",
    panelTitle: "Quand cette page aide le plus",
    panelItems: [
      "Quand les notions s'accumulent et que l'élève ne sait plus par où reprendre.",
      "Quand les problèmes écrits ou les équations deviennent stressants.",
      "Quand un examen approche et qu'il faut remettre la matière en ordre rapidement.",
    ],
    panelNote: "On simplifie les maths sans les rendre floues: logique, méthode, pratique utile.",
    skillsEyebrow: "Ce qu'on travaille",
    skillsTitle: "Les zones où les maths bloquent le plus souvent",
    skillsDescription: "On vise les chapitres qui créent le plus d'hésitation et le plus de perte de confiance.",
    skills: [
      {
        icon: Sigma,
        title: "Algèbre et équations",
        description: "Pour remettre les manipulations, les priorités et la logique de résolution au bon endroit.",
      },
      {
        icon: LineChart,
        title: "Fonctions et graphiques",
        description: "Pour lire, interpréter et relier les représentations sans se perdre dans les détails.",
      },
      {
        icon: Triangle,
        title: "Géométrie et trigonométrie",
        description: "Pour mieux voir les relations, les figures et le sens des formules.",
      },
      {
        icon: Target,
        title: "Préparation d'examens",
        description: "Pour cibler les bons chapitres, pratiquer les bons formats et réviser plus intelligemment.",
      },
    ],
    stepsEyebrow: "Étapes",
    stepsTitle: "Une séance de maths utile en 3 étapes",
    stepsDescription: "Chaque séance sert à clarifier, pratiquer et laisser une suite plus simple à suivre.",
    steps: [
      {
        step: "01",
        title: "On isole le vrai blocage",
        description: "On repère si le problème vient de la notion, de la méthode ou de la lecture des questions.",
      },
      {
        step: "02",
        title: "On réexplique avec une logique simple",
        description: "On remet les étapes dans le bon ordre pour que l'élève sache quoi faire et pourquoi.",
      },
      {
        step: "03",
        title: "On pratique ce qui compte",
        description: "On choisit des exercices utiles pour transformer la compréhension en réflexes plus stables.",
      },
    ],
    faq: [
      {
        question: "Le service est-il adapté aux maths de secondaire 4 et 5 ?",
        answer:
          "Oui. C'est même souvent là que la demande est la plus forte, surtout quand les fonctions, l'algèbre ou la préparation d'examens deviennent lourdes.",
      },
      {
        question: "Faut-il déjà savoir quel chapitre bloque ?",
        answer:
          "Non. On peut aider à clarifier le vrai problème avant même la première séance complète.",
      },
      {
        question: "Est-ce utile avant un examen seulement ?",
        answer:
          "Oui avant un examen, mais aussi en suivi régulier quand il faut remettre de la stabilité dans la matière.",
      },
    ],
    contactTitle: "Parlez-nous du besoin en maths",
    contactDescription:
      "Expliquez le niveau, le chapitre ou le type de difficulté. On pourra orienter vers la séance ou le suivi le plus utile.",
    contactBullets: [
      "Mentionnez le niveau et les notions les plus floues.",
      "Si un examen approche, indiquez la date.",
      "Le suivi hebdomadaire se discute mieux par téléphone d'abord.",
    ],
    ctaBadge: "Maths • Québec",
    ctaTitle: "Quand les maths redeviennent lisibles, tout avance mieux.",
    ctaDescription:
      "Si vous êtes prêt, on peut cadrer la situation dès maintenant et choisir le bon premier pas.",
    seoTitle: "Tutorat en maths au secondaire | Méthode Secondaire",
    seoDescription:
      "Tutorat en mathématiques au secondaire 1 à 5 au Québec. Algèbre, fonctions, géométrie, trigonométrie et préparation d'examens avec une méthode claire.",
    seoKeywords:
      "tuteur maths secondaire, tutorat math secondaire, aide maths secondaire 4, soutien maths secondaire 5, préparation examen maths québec",
    schemaName: "Tutorat de mathématiques au secondaire",
  },
  en: {
    badge: "Math • Secondary 1 to 5",
    title: "Clearer, calmer and more structured math support.",
    description:
      "The goal is not to pile up worksheets. The goal is for the student to finally know what to do in front of a problem, equation or exam.",
    primary: "Call for a math diagnostic",
    secondary: "Book a math session",
    panelEyebrow: "Best fit",
    panelTitle: "When this page helps most",
    panelItems: [
      "When concepts have piled up and the student no longer knows where to restart.",
      "When word problems or equations start feeling stressful.",
      "When an exam is close and the material needs to be reorganized fast.",
    ],
    panelNote: "We simplify math without making it vague: logic, method and useful practice.",
    skillsEyebrow: "What we cover",
    skillsTitle: "The areas where math usually starts to slide",
    skillsDescription: "We focus on the chapters that create the most hesitation and lost confidence.",
    skills: [
      {
        icon: Sigma,
        title: "Algebra and equations",
        description: "Restore the right manipulations, order of operations and problem-solving logic.",
      },
      {
        icon: LineChart,
        title: "Functions and graphs",
        description: "Read, interpret and connect representations without getting lost in the details.",
      },
      {
        icon: Triangle,
        title: "Geometry and trigonometry",
        description: "Make the relationships, figures and formulas easier to see and use.",
      },
      {
        icon: Target,
        title: "Exam preparation",
        description: "Target the right chapters, practice the right formats and revise more strategically.",
      },
    ],
    stepsEyebrow: "Steps",
    stepsTitle: "A useful math session in 3 steps",
    stepsDescription: "Each session is built to clarify, practice and leave a simpler plan to follow.",
    steps: [
      {
        step: "01",
        title: "We isolate the real block",
        description: "We figure out whether the issue is the concept itself, the method or question reading.",
      },
      {
        step: "02",
        title: "We re-explain with simple logic",
        description: "We put the steps back in the right order so the student knows what to do and why.",
      },
      {
        step: "03",
        title: "We practice what matters",
        description: "We choose the exercises that turn understanding into more stable habits.",
      },
    ],
    faq: [
      {
        question: "Is this well suited for Secondary 4 and 5 math?",
        answer:
          "Yes. That is often where demand is highest, especially around functions, algebra and exam preparation.",
      },
      {
        question: "Do we need to know the exact chapter first?",
        answer:
          "No. We can help clarify the real problem before the first full session.",
      },
      {
        question: "Is this only useful right before an exam?",
        answer:
          "It helps before exams, but also works very well as weekly support when the goal is rebuilding stability.",
      },
    ],
    contactTitle: "Tell us about the math need",
    contactDescription:
      "Share the grade level, chapter or type of difficulty and we can guide you toward the most useful session format.",
    contactBullets: [
      "Mention the grade level and the concepts that feel weakest.",
      "If an exam is close, include the date.",
      "Weekly follow-up is usually best discussed by phone first.",
    ],
    ctaBadge: "Math • Quebec",
    ctaTitle: "When math becomes readable again, everything moves more smoothly.",
    ctaDescription:
      "If you are ready, we can frame the situation now and choose the right first step.",
    seoTitle: "High school math tutoring in Quebec | Méthode Secondaire",
    seoDescription:
      "High school math tutoring across Quebec. Algebra, functions, geometry, trigonometry and exam preparation with a clear, structured method.",
    seoKeywords:
      "high school math tutor quebec, math tutoring secondary school, algebra tutor quebec, exam prep math high school",
    schemaName: "High school math tutoring",
  },
}

export default function Maths() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("maths", locale)

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.schemaName,
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      telephone: siteConfig.phone,
      email: siteConfig.email,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Quebec" },
      { "@type": "City", name: "Montreal" },
      { "@type": "City", name: "Laval" },
    ],
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
        alternates={buildAlternates("maths")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-14 top-16 h-72 w-72 rounded-full bg-[#73d6ff]/16 blur-3xl" />
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <HeroShowcase
          badge={copy.badge}
          title={copy.title}
          description={copy.description}
          primaryAction={{
            label: copy.primary,
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          secondaryAction={{
            label: copy.secondary,
            href: BOOKING_URL,
            external: true,
            icon: CalendarDays,
          }}
          panelEyebrow={copy.panelEyebrow}
          panelTitle={copy.panelTitle}
          panelItems={copy.panelItems}
          panelNote={copy.panelNote}
        />

        <FeatureGrid
          eyebrow={copy.skillsEyebrow}
          title={copy.skillsTitle}
          description={copy.skillsDescription}
          items={copy.skills}
          columns="md:grid-cols-2"
        />

        <StepGrid
          eyebrow={copy.stepsEyebrow}
          title={copy.stepsTitle}
          description={copy.stepsDescription}
          steps={copy.steps}
        />

        <VerifiedReviewsSection locale={locale} className="pt-20" limit={3} showLink />

        <FaqGrid
          eyebrow="FAQ"
          title={locale === "en" ? "Quick answers before booking" : "Réponses rapides avant de réserver"}
          description={
            locale === "en"
              ? "A few short points to help a parent move forward with more confidence."
              : "Quelques repères simples pour aider un parent à avancer avec plus de confiance."
          }
          items={copy.faq}
        />

        <ContactSection
          locale={locale}
          eyebrow={locale === "en" ? "Contact" : "Contact"}
          title={copy.contactTitle}
          description={copy.contactDescription}
          bullets={copy.contactBullets}
          pageName={`maths-${locale}`}
        />

        <FinalCtaSection
          badge={copy.ctaBadge}
          title={copy.ctaTitle}
          description={copy.ctaDescription}
          primaryAction={{
            label: locale === "en" ? "Call now" : "Appeler maintenant",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          secondaryAction={{
            label: locale === "en" ? "Book a session" : "Réserver une séance",
            href: BOOKING_URL,
            external: true,
            icon: Calculator,
          }}
        />
      </main>
    </div>
  )
}
