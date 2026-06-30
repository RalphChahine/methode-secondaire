import { CalendarDays, FlaskConical, Gauge, NotebookPen, Phone, Target, Zap } from "lucide-react"
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
    badge: "Sciences • Secondaire 1 à 5",
    title: "Des sciences plus visuelles, plus logiques et moins lourdes.",
    description:
      "Le but n'est pas de mémoriser un bloc de notions stressantes. Le but est que l'élève voie enfin la logique derrière les phénomènes, les formules et les réponses attendues.",
    primary: "Appeler pour un diagnostic sciences",
    secondary: "Réserver une séance de sciences",
    panelEyebrow: "Bon fit",
    panelTitle: "Quand cette page aide le plus",
    panelItems: [
      "Quand les formules sont apprises sans vraiment être comprises.",
      "Quand la physique, la chimie ou les labos deviennent confus.",
      "Quand l'élève a besoin d'une structure claire avant une évaluation.",
    ],
    panelNote: "On remet les concepts en ordre pour que la matière devienne plus lisible et plus concrète.",
    modulesEyebrow: "Ce qu'on travaille",
    modulesTitle: "Les blocs où les sciences demandent souvent un vrai accompagnement",
    modulesDescription:
      "On vise les chapitres qui deviennent lourds quand les concepts, les unités et les questions écrites s'accumulent.",
    modules: [
      {
        icon: FlaskConical,
        title: "Chimie et réactions",
        description: "Comprendre la matière, les transformations et les calculs au lieu de seulement apprendre par cœur.",
      },
      {
        icon: Gauge,
        title: "Physique et mouvement",
        description: "Relier les formules à des situations concrètes pour résoudre plus clairement.",
      },
      {
        icon: Zap,
        title: "Électricité et énergie",
        description: "Mettre de l'ordre dans les relations entre grandeurs, circuits et concepts.",
      },
      {
        icon: NotebookPen,
        title: "Labos et réponses longues",
        description: "Structurer l'analyse et mieux justifier les réponses écrites en sciences.",
      },
    ],
    stepsEyebrow: "Étapes",
    stepsTitle: "Une séance de sciences utile en 3 étapes",
    stepsDescription:
      "On aide l'élève à voir mieux, relier mieux et répondre avec plus de précision.",
    steps: [
      {
        step: "01",
        title: "On clarifie le concept",
        description: "On simplifie le phénomène ou la notion avec des repères plus faciles à retenir.",
      },
      {
        step: "02",
        title: "On relie les idées",
        description: "On montre comment les unités, les schémas, les formules et les observations tiennent ensemble.",
      },
      {
        step: "03",
        title: "On pratique comme à l'évaluation",
        description: "On travaille les bons formats de questions pour rendre l'application beaucoup plus naturelle.",
      },
    ],
    faq: [
      {
        question: "Couvrez-vous la physique et la chimie ?",
        answer:
          "Oui. Les deux font partie du cœur du service, avec un accent sur la compréhension logique et la réponse écrite.",
      },
      {
        question: "Est-ce utile si l'élève mémorise sans comprendre ?",
        answer:
          "Oui. C'est même une des situations les plus fréquentes: l'élève connaît des morceaux, mais ne voit pas encore comment tout relier.",
      },
      {
        question: "Pouvez-vous aider avant un examen ou un labo ?",
        answer:
          "Oui. On peut cibler la matière la plus urgente et préparer une révision beaucoup plus structurée.",
      },
    ],
    contactTitle: "Parlez-nous du besoin en sciences",
    contactDescription:
      "Dites-nous la matière, le niveau et ce qui bloque le plus. On pourra orienter vers le format le plus utile.",
    contactBullets: [
      "Mentionnez si le besoin touche la physique, la chimie ou un labo.",
      "Si une évaluation approche, indiquez la date.",
      "Pour un suivi régulier, un appel reste souvent le plus efficace.",
    ],
    ctaBadge: "Sciences • Québec",
    ctaTitle: "Quand la logique apparaît, les sciences deviennent beaucoup moins intimidantes.",
    ctaDescription:
      "On peut cadrer la situation rapidement et choisir le bon premier pas dès maintenant.",
    seoTitle: "Tutorat de sciences au secondaire | Méthode Secondaire",
    seoDescription:
      "Tutorat de sciences au secondaire au Québec. Physique, chimie, laboratoires, réponses à développement et préparation d'examens avec une méthode claire.",
    seoKeywords:
      "tuteur sciences secondaire, tutorat sciences secondaire, aide physique secondaire, aide chimie secondaire, préparation examen sciences québec",
    schemaName: "Tutorat de sciences au secondaire",
  },
  en: {
    badge: "Science • Secondary 1 to 5",
    title: "Science support that feels more visual, logical and manageable.",
    description:
      "The goal is not to memorize a stressful block of content. The goal is for the student to finally see the logic behind the phenomena, formulas and expected answers.",
    primary: "Call for a science diagnostic",
    secondary: "Book a science session",
    panelEyebrow: "Best fit",
    panelTitle: "When this page helps most",
    panelItems: [
      "When formulas have been memorized without real understanding.",
      "When physics, chemistry or lab work starts feeling confusing.",
      "When the student needs clear structure before an evaluation.",
    ],
    panelNote: "We put the concepts back in order so the subject becomes easier to read and apply.",
    modulesEyebrow: "What we cover",
    modulesTitle: "The science areas that most often need real support",
    modulesDescription:
      "We focus on the chapters that become heavy when concepts, units and written questions pile up.",
    modules: [
      {
        icon: FlaskConical,
        title: "Chemistry and reactions",
        description: "Understand matter, transformations and calculations instead of relying on memorization alone.",
      },
      {
        icon: Gauge,
        title: "Physics and motion",
        description: "Connect formulas to concrete situations so solving becomes easier.",
      },
      {
        icon: Zap,
        title: "Electricity and energy",
        description: "Bring order to the relationships between quantities, circuits and concepts.",
      },
      {
        icon: NotebookPen,
        title: "Labs and long answers",
        description: "Structure analysis and improve written justification in science work.",
      },
    ],
    stepsEyebrow: "Steps",
    stepsTitle: "A useful science session in 3 steps",
    stepsDescription:
      "We help the student see better, connect better and answer with more precision.",
    steps: [
      {
        step: "01",
        title: "We clarify the concept",
        description: "We simplify the phenomenon or idea with stronger mental anchors.",
      },
      {
        step: "02",
        title: "We connect the ideas",
        description: "We show how units, diagrams, formulas and observations actually fit together.",
      },
      {
        step: "03",
        title: "We practice in evaluation format",
        description: "We work on the right question types so applying the knowledge feels more natural.",
      },
    ],
    faq: [
      {
        question: "Do you cover both physics and chemistry?",
        answer:
          "Yes. Both are core parts of the service, with strong focus on logic, understanding and written answers.",
      },
      {
        question: "Is this useful if the student memorizes but still does not understand?",
        answer:
          "Yes. That is one of the most common situations we see: the student knows pieces of the course, but not how they connect.",
      },
      {
        question: "Can you help before an exam or lab?",
        answer:
          "Yes. We can target the most urgent material and build a far more structured review.",
      },
    ],
    contactTitle: "Tell us about the science need",
    contactDescription:
      "Share the subject, level and biggest point of confusion and we can guide you toward the right format.",
    contactBullets: [
      "Mention whether the need is physics, chemistry or lab related.",
      "If an assessment is close, include the date.",
      "For weekly follow-up, a call is often the smartest first move.",
    ],
    ctaBadge: "Science • Quebec",
    ctaTitle: "When the logic becomes visible, science feels far less intimidating.",
    ctaDescription:
      "We can frame the situation quickly and choose the strongest first step now.",
    seoTitle: "High school science tutoring in Quebec | Méthode Secondaire",
    seoDescription:
      "High school science tutoring across Quebec. Physics, chemistry, labs, written answers and exam preparation with a clear method.",
    seoKeywords:
      "high school science tutor quebec, physics tutor high school, chemistry help quebec, science exam prep quebec",
    schemaName: "High school science tutoring",
  },
}

export default function Sciences() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("sciences", locale)

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
        alternates={buildAlternates("sciences")}
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
          eyebrow={copy.modulesEyebrow}
          title={copy.modulesTitle}
          description={copy.modulesDescription}
          items={copy.modules}
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
              ? "A few short answers to help a parent move forward faster."
              : "Quelques réponses courtes pour aider un parent à avancer plus vite."
          }
          items={copy.faq}
        />

        <ContactSection
          locale={locale}
          eyebrow={locale === "en" ? "Contact" : "Contact"}
          title={copy.contactTitle}
          description={copy.contactDescription}
          bullets={copy.contactBullets}
          pageName={`sciences-${locale}`}
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
            icon: CalendarDays,
          }}
        />
      </main>
    </div>
  )
}
