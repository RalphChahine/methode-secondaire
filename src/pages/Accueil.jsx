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
import { buildAlternates, getAlternateOgLocale, getHtmlLang, getOgLocale } from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const stats = [
  { label: "Pour qui", value: "Secondaire 1 à 5" },
  { label: "Besoin", value: "Maths, sciences ou examens" },
  { label: "Suite", value: "Rappel sous 24 h ouvrables" },
]

const trustItems = [
  {
    icon: BrainCircuit,
    title: "On clarifie avant de vendre une séance",
    description:
      "Niveau, matière, examen, stress ou perte de rythme: on met vite des mots simples sur la situation.",
  },
  {
    icon: ShieldCheck,
    title: "Le parent reste en contrôle",
    description:
      "Vous savez pourquoi on recommande un format, ce qui se passe ensuite et quand l'élève commence.",
  },
  {
    icon: Target,
    title: "L'élève part avec un cadre concret",
    description:
      "Le but est de réduire le flou, installer une méthode et rendre la progression plus visible.",
  },
]

const steps = [
  {
    step: "1 minute",
    title: "Vous décrivez le besoin",
    description:
      "Niveau, matière, urgence et ce qui inquiète le plus. Le formulaire reste court pour que vous puissiez agir tout de suite.",
  },
  {
    step: "Rappel",
    title: "On clarifie avec vous",
    description:
      "On valide l'urgence, le bon format et le rythme logique. Vous n'avez pas à deviner seul quel tutorat choisir.",
  },
  {
    step: "Départ",
    title: "On lance le bon jumelage",
    description:
      "On choisit le tuteur, on fixe la première rencontre et l'élève commence avec un plan clair.",
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
          title="Votre ado bloque en maths ou sciences ? On vous guide en 3 étapes."
          description="Remplissez le formulaire, on clarifie avec vous, puis on organise le bon tuteur. Simple, rassurant, sans choisir au hasard."
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
          stats={stats}
          leadForm={{
            id: "demande",
            locale: "fr",
            pageName: "home-fr-hero",
            eyebrow: "Demande parent",
            title: "Dites-nous où ça bloque.",
            description: "Quelques infos suffisent pour comprendre la situation et vous rappeler avec un prochain pas clair.",
            steps: [{ label: "Décrire" }, { label: "Rappel" }, { label: "Démarrer" }],
            trustItems: ["Sans engagement", "Rappel sous 24 h", "Plan clair"],
          }}
        />

        <StepGrid
          id="processus"
          eyebrow="Comment ça marche"
          title="Le parcours est volontairement simple"
          description="Le parent n'a pas à comparer dix profils ni à deviner le bon format. On commence par comprendre, puis on agit."
          steps={steps}
        />

        <FeatureGrid
          eyebrow="Pourquoi c'est rassurant"
          title="Un cadre simple avant même la première séance"
          description="On enlève les décisions floues: vous expliquez la situation, on vous oriente, puis l'élève commence avec une méthode."
          items={trustItems}
        />

        <PricingGrid
          id="offres"
          eyebrow="Tarifs"
          title="Trois formats faciles à comprendre"
          description="Urgence ponctuelle, suivi hebdomadaire ou bloc intensif: le formulaire nous aide à recommander le bon départ."
          plans={plans}
        />

        <VerifiedReviewsSection locale="fr" className="pt-20" limit={3} showLink />

        <FaqGrid
          id="faq"
          eyebrow="FAQ"
          title="Les questions qu'un parent se pose avant d'appeler"
          description="On garde seulement les réponses qui aident vraiment à décider du prochain pas."
          items={faqItems}
        />

        <ContactSection
          locale="fr"
          eyebrow="Contact"
          title="Vous préférez parler à quelqu'un d'abord ?"
          description="Le formulaire est le chemin le plus simple. Si la situation est urgente ou sensible, vous pouvez aussi appeler directement."
          bullets={[
            "Le formulaire en haut nous donne le contexte de base.",
            "L'appel sert à cadrer vite quand un examen ou une inquiétude presse.",
            "Dans les deux cas, le parent garde un prochain pas clair.",
          ]}
          pageName="home-fr"
          showForm={false}
        />
      </main>
    </div>
  )
}
