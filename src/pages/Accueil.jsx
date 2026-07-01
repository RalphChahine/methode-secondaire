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
import { BOOKING_URL } from "@/config/booking"
import { buildAlternates, getAlternateOgLocale, getHtmlLang, getOgLocale } from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const steps = [
  {
    title: "Décrivez le besoin",
    mobileLabel: "Décrire",
    description:
      "Niveau, matière et ce qui inquiète le plus.",
  },
  {
    title: "On vous rappelle",
    mobileLabel: "Rappel",
    description:
      "On clarifie le bon format et l'urgence.",
  },
  {
    title: "On démarre",
    mobileLabel: "Démarrer",
    description:
      "On choisit le tuteur et la première séance.",
  },
]

const plans = [
  {
    title: "Séance ponctuelle",
    price: "75 $ / h",
    description: "Pour un chapitre précis, une question urgente ou une révision avant un contrôle.",
    bullets: ["Simple et rapide", "Maths ou sciences", "Bon quand le besoin est clair"],
    action: {
      label: "Réserver maintenant",
      href: BOOKING_URL,
      external: true,
    },
  },
  {
    title: "Suivi hebdomadaire",
    price: "70 $ / h",
    description: "Pour remettre du rythme, de la méthode et de la confiance semaine après semaine.",
    bullets: ["Cadrage recommandé", "Créneau régulier", "Le plus rassurant pour l'année"],
    highlight: true,
    highlightLabel: "Le cœur de l'offre",
    action: {
      label: "Appeler pour cadrer",
      href: `tel:${siteConfig.phone}`,
      icon: Phone,
    },
  },
  {
    title: "Bloc intensif",
    price: "Sur demande",
    description: "Pour reprendre vite avant un examen, une étape lourde ou une période de rattrapage.",
    bullets: ["Plan court", "Priorités claires", "Format adaptable"],
    action: {
      label: "Réserver une première séance",
      href: BOOKING_URL,
      external: true,
    },
  },
]

const faqItems = [
  {
    question: "Pourquoi choisir Méthode Secondaire plutôt qu'une simple liste de tuteurs ?",
    answer:
      "Le cadre est plus guidé. Le parent n'a pas à comparer dix profils au hasard: on clarifie le besoin, le bon format et la suite la plus logique beaucoup plus vite.",
  },
  {
    question: "Dois-je appeler ou réserver directement ?",
    answer:
      "Règle simple: besoin ponctuel et déjà clair = réservation possible. Besoin plus flou ou suivi régulier = l'appel est souvent le meilleur premier pas.",
  },
  {
    question: "Est-ce seulement pour les élèves en difficulté ?",
    answer:
      "Non. Le service fonctionne aussi très bien pour la préparation d'examens, la consolidation d'une bonne base ou la montée en autonomie.",
  },
  {
    question: "Offrez-vous le service partout au Québec ?",
    answer: "Oui, en ligne partout au Québec. Le présentiel dépend du secteur et des disponibilités.",
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
    description: "Tutorat privé en mathématiques et en sciences pour les élèves du secondaire au Québec.",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Québec" },
      { "@type": "City", name: "Montréal" },
      { "@type": "City", name: "Laval" },
    ],
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

export default function Accueil() {
  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Méthode Secondaire | Tutorat premium en maths et sciences au secondaire"
        description="Tutorat privé en mathématiques et en sciences pour le secondaire 1 à 5 au Québec. Un cadre clair, des formats simples et un vrai suivi pour les familles."
        path="/"
        keywords="tutorat maths secondaire, tutorat sciences secondaire, tuteur premium québec, soutien scolaire secondaire, préparation examens secondaire"
        jsonLd={homeSchemas}
        lang={getHtmlLang("fr")}
        locale={getOgLocale("fr")}
        alternateLocale={getAlternateOgLocale("fr")}
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
          badge="Québec • Secondaire 1 à 5"
          title="1-2-3. On démarre simplement."
          description="Maths, sciences ou examens: le parent remplit le formulaire, on rappelle, puis on lance le bon accompagnement."
          primaryAction={{
            label: "Commencer le formulaire",
            href: "#demande",
            icon: ArrowRight,
          }}
          secondaryAction={{
            label: "Appeler si urgent",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
            hideOnMobile: true,
          }}
          leadForm={{
            id: "demande",
            locale: "fr",
            pageName: "home-fr-hero",
            eyebrow: "Demande parent",
            title: "On commence ici.",
            description: "Formulaire court. On vous revient avec le prochain pas clair.",
            processEyebrow: "Comment ça marche",
            steps,
            trustItems: ["Sans engagement", "Rappel sous 24 h", "Plan clair"],
          }}
        />

        <PricingGrid
          id="offres"
          eyebrow="Tarifs"
          title="Trois formats faciles à comprendre"
          description="Urgence ponctuelle, suivi hebdomadaire ou bloc intensif: le formulaire nous aide à recommander le bon départ."
          plans={plans}
        />

        <FaqGrid
          id="faq"
          eyebrow="FAQ"
          title="Questions rapides"
          description="Juste ce qu'il faut pour décider du prochain pas."
          items={faqItems.slice(0, 3)}
        />
      </main>
    </div>
  )
}
