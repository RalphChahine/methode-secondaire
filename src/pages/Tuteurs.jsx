import { ClipboardList, Phone, ShieldCheck, Sparkles, Target } from "lucide-react"
import { useLocation } from "react-router-dom"

import { TutorRosterSection } from "@/components/ConversionSections"
import Seo from "@/components/Seo"
import {
  FinalCtaSection,
  HeroShowcase,
} from "@/components/SimpleMarketingSections"
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
    badge: "Tuteurs • Profils et spécialités",
    title: "Des profils pensés pour rassurer les parents et faire avancer les élèves.",
    description:
      "La page reste simple: elle montre le type d'accompagnement, la pédagogie attendue et la façon dont on choisit un bon jumelage.",
    panelEyebrow: "Ce qu'un parent veut sentir",
    panelTitle: "Un tutorat fiable et clair",
    panelItems: [
      "Un profil adapté à la matière et au niveau.",
      "Une pédagogie claire qui n'ajoute pas de confusion.",
      "Une impression de sérieux avant même la première séance.",
    ],
    cards: [
      {
        icon: Target,
        title: "Le bon profil pour le bon besoin",
        description: "On ne présente pas juste des matières. On montre des styles d'accompagnement utiles selon le besoin.",
      },
      {
        icon: ShieldCheck,
        title: "Un vrai standard pédagogique",
        description: "Clarté, fiabilité et qualité de suivi comptent autant que la maîtrise de la matière.",
      },
      {
        icon: Sparkles,
        title: "Une page qui enlève du flou",
        description: "Les parents comprennent plus vite à quoi ressemble l'accompagnement avant de contacter.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "On comprend la matière et le niveau",
        description: "On regarde d'abord le besoin scolaire réel avant de penser à un profil de tuteur.",
      },
      {
        step: "02",
        title: "On choisit un style d'accompagnement cohérent",
        description: "Le bon fit humain et pédagogique compte autant que la spécialité.",
      },
      {
        step: "03",
        title: "La famille avance avec plus de confiance",
        description: "Le choix du tuteur devient plus simple parce que le cadre est plus clair.",
      },
    ],
    ctaTitle: "Besoin d'être orienté vers le bon profil rapidement ?",
    ctaDescription:
      "Remplissez le formulaire: on valide le besoin, la disponibilité et le meilleur premier départ avant de proposer un profil.",
    seoTitle: "Tuteurs en maths et sciences au secondaire | Méthode Secondaire",
    seoDescription:
      "Découvrez nos profils de tuteurs en mathématiques et en sciences pour le secondaire au Québec, avec une approche claire et rassurante pour les familles.",
    seoKeywords: "tuteurs maths secondaire, tuteurs sciences secondaire, tutorat québec, profils tuteurs secondaire",
  },
  en: {
    badge: "Tutors • Profiles and specialties",
    title: "Profiles designed to reassure parents and move students forward.",
    description:
      "The page stays simple: it shows the support style, teaching standard and how a good match is chosen.",
    panelEyebrow: "What a parent wants to feel",
    panelTitle: "Reliable, clear tutoring",
    panelItems: [
      "A profile that fits the subject and grade level.",
      "Teaching that removes confusion instead of adding more.",
      "A sense of seriousness before the first session even starts.",
    ],
    cards: [
      {
        icon: Target,
        title: "The right profile for the right need",
        description: "We do not only present subjects. We show tutoring styles that fit different academic situations.",
      },
      {
        icon: ShieldCheck,
        title: "A real teaching standard",
        description: "Clarity, reliability and quality of follow-up matter as much as subject mastery.",
      },
      {
        icon: Sparkles,
        title: "A page that removes friction",
        description: "Parents understand the support style faster before they even reach out.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "We understand the subject and level",
        description: "We start with the real academic need before thinking about a tutor profile.",
      },
      {
        step: "02",
        title: "We choose a coherent support style",
        description: "Human fit and teaching style matter as much as specialization.",
      },
      {
        step: "03",
        title: "The family moves forward with more confidence",
        description: "Choosing a tutor feels easier because the frame is clearer.",
      },
    ],
    ctaTitle: "Need help finding the right profile quickly?",
    ctaDescription:
      "Fill out the form: we confirm the need, availability and best starting point before suggesting a profile.",
    seoTitle: "High school math and science tutors | Méthode Secondaire",
    seoDescription:
      "Explore our high school math and science tutor profiles in Quebec, with a clear and reassuring approach for families.",
    seoKeywords: "high school tutors quebec, math tutors quebec, science tutors quebec, tutoring profiles",
  },
}

export default function Tuteurs() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("tuteurs", locale)

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
        alternates={buildAlternates("tuteurs")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-[#f5c977]/12 blur-3xl" />
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
            label: locale === "en" ? "Fill out the form" : "Remplir le formulaire",
            to: `${getLocalizedPath("home", locale)}#demande`,
            icon: ClipboardList,
          }}
          panelEyebrow={copy.panelEyebrow}
          panelTitle={copy.panelTitle}
          panelItems={copy.panelItems}
          journey={getParentJourney(locale)}
        />

        <TutorRosterSection locale={locale} className="pt-20" limit={2} />

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
            label: locale === "en" ? "Fill out the request" : "Remplir la demande",
            to: `${getLocalizedPath("home", locale)}#demande`,
            icon: ClipboardList,
          }}
        />
      </main>
    </div>
  )
}
