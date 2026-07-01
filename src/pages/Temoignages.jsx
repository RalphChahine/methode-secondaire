import { CalendarDays, HeartHandshake, Phone, ShieldCheck, TrendingUp } from "lucide-react"
import { useLocation } from "react-router-dom"

import { VerifiedReviewsSection } from "@/components/ConversionSections"
import Seo from "@/components/Seo"
import {
  FinalCtaSection,
  HeroShowcase,
  QuoteGrid,
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
import { getParentJourney } from "@/lib/parentJourney"
import { siteConfig } from "@/lib/seo"

const contentByLocale = {
  fr: {
    badge: "Avis vérifiés • Parents et élèves",
    title: "Des témoignages qui donnent confiance avant même la première séance.",
    description:
      "Les familles veulent sentir si le service est sérieux, humain et réellement utile. Cette page va droit au but.",
    panelEyebrow: "Ce qui revient le plus",
    panelTitle: "Progression, calme et confiance",
    panelItems: [
      "Des notes qui remontent après une période difficile.",
      "Une méthode plus claire qui reste après la séance.",
      "Moins de stress à la maison et avant les examens.",
    ],
    signals: [
      {
        icon: TrendingUp,
        title: "Progression visible",
        description: "Les familles parlent de résultats qui remontent, mais surtout d'un cap beaucoup plus clair.",
      },
      {
        icon: HeartHandshake,
        title: "Année relancée",
        description: "Quand ça allait mal depuis un moment, plusieurs retours parlent d'un vrai tournant.",
      },
      {
        icon: ShieldCheck,
        title: "Confiance retrouvée",
        description: "Le changement le plus marquant reste souvent le calme qui revient chez l'élève et le parent.",
      },
    ],
    quotes: [
      {
        text: "Mon fils est passé d'un échec à 92 % en maths. Le plus fort n'était pas juste la note, mais la méthode qui est restée.",
        author: "Parent d'un élève de secondaire 4",
        tag: "Maths",
      },
      {
        text: "Vous avez sauvé son année. On a senti un vrai changement dans sa confiance et dans sa façon d'aborder l'école.",
        author: "Parent d'un élève de secondaire 5",
        tag: "Suivi régulier",
      },
      {
        text: "Avant, les sciences étaient juste stressantes. Maintenant, il comprend ce qu'il fait et ça paraît.",
        author: "Parent d'un élève du secondaire",
        tag: "Sciences",
      },
    ],
    ctaTitle: "Prêt à avancer avec plus de confiance ?",
    ctaDescription:
      "Si ces retours vous ressemblent, on peut déjà cadrer la situation et choisir la meilleure suite.",
    seoTitle: "Témoignages | Méthode Secondaire",
    seoDescription:
      "Découvrez des témoignages de parents et d'élèves en tutorat maths et sciences au secondaire: progression, confiance et résultats.",
    seoKeywords: "témoignages tutorat secondaire, avis tuteur maths, avis tuteur sciences, progression scolaire québec",
  },
  en: {
    badge: "Verified reviews • Parents and students",
    title: "Feedback that builds trust before the first session even starts.",
    description:
      "Families want to feel whether the service is serious, human and genuinely useful. This page keeps it direct.",
    panelEyebrow: "What comes back most",
    panelTitle: "Progress, calm and confidence",
    panelItems: [
      "Marks rising after a difficult stretch.",
      "A clearer method that stays after the session.",
      "Less stress at home and before exams.",
    ],
    signals: [
      {
        icon: TrendingUp,
        title: "Visible progress",
        description: "Families talk about marks improving, but even more about having a clearer direction.",
      },
      {
        icon: HeartHandshake,
        title: "A year turned around",
        description: "When school had been going badly for a while, several reviews describe a real turning point.",
      },
      {
        icon: ShieldCheck,
        title: "Confidence restored",
        description: "The most striking change is often the calm that comes back for both student and parent.",
      },
    ],
    quotes: [
      {
        text: "My son went from failing to 92% in math. The biggest win was not only the grade, but the method that stayed.",
        author: "Parent of a Secondary 4 student",
        tag: "Math",
      },
      {
        text: "You saved the year. We felt a real change in confidence and in how school was being approached.",
        author: "Parent of a Secondary 5 student",
        tag: "Weekly support",
      },
      {
        text: "Science used to feel stressful. Now he understands what he is doing and it shows.",
        author: "Parent of a high school student",
        tag: "Science",
      },
    ],
    ctaTitle: "Ready to move forward with more confidence?",
    ctaDescription:
      "If these stories feel familiar, we can already frame the situation and choose the strongest next step.",
    seoTitle: "Testimonials | Méthode Secondaire",
    seoDescription:
      "Read parent and student testimonials about high school math and science tutoring: progress, confidence and results.",
    seoKeywords: "tutoring testimonials, math tutor reviews, science tutor reviews, quebec tutoring results",
  },
}

export default function Temoignages() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("temoignages", locale)

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.seoTitle,
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
        alternates={buildAlternates("temoignages")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <HeroShowcase
          badge={copy.badge}
          title={copy.title}
          description={copy.description}
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
          panelEyebrow={copy.panelEyebrow}
          panelTitle={copy.panelTitle}
          panelItems={copy.panelItems}
          journey={getParentJourney(locale)}
        />

        <VerifiedReviewsSection locale={locale} className="pt-20" limit={4} showLink={false} />

        <QuoteGrid
          eyebrow={locale === "en" ? "From families" : "Paroles de familles"}
          title={
            locale === "en"
              ? "A few short stories parents immediately understand"
              : "Quelques retours courts qu'un parent comprend tout de suite"
          }
          description={
            locale === "en"
              ? "No long detour. Just the kind of feedback that helps a family trust the next step."
              : "Pas de long détour. Juste le type de retour qui aide une famille à faire confiance au prochain pas."
          }
          quotes={copy.quotes}
        />

        <FinalCtaSection
          badge={copy.badge}
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
