import { ArrowRight, CalendarDays } from "lucide-react"

import Seo from "@/components/Seo"
import { OperationalPromisesSection } from "@/components/ConversionSections"
import PricingSection from "@/components/PricingSection"
import {
  FaqGrid,
  HeroShowcase,
  ParentStartingPointsSection,
} from "@/components/SimpleMarketingSections"
import { DECLIC_REQUEST_URL } from "@/config/booking"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { formatCadAmount, getOffer } from "@/lib/pricing"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const targetedSessionOffer = getOffer("targeted_session")
const progressionBlockOffer = getOffer("progression_block")
const targetedSessionPrice = formatCadAmount(targetedSessionOffer.totalPriceCad, "fr")
const progressionSessionPrice = formatCadAmount(progressionBlockOffer.perSessionPriceCad, "fr")

const parentStartingPoints = [
  {
    eyebrow: "Un examen approche",
    title: "On remet la r\u00e9vision en ordre.",
    description: "On cible les chapitres prioritaires et on donne \u00e0 votre jeune un premier plan de travail clair.",
    intent: "exam",
    actionLabel: "Demander une premi\u00e8re s\u00e9ance",
    actionHref: DECLIC_REQUEST_URL,
    to: getLocalizedPath("examSprint", "fr"),
    linkLabel: "Voir le Sprint examen",
  },
  {
    eyebrow: "Les devoirs s'\u00e9tirent le soir",
    title: "On trouve o\u00f9 \u00e7a coince, sans tout faire \u00e0 sa place.",
    description: "On travaille la notion ou la m\u00e9thode qui bloque pour que votre jeune puisse la r\u00e9utiliser.",
    intent: "homework",
    actionLabel: "Demander une premi\u00e8re s\u00e9ance",
    actionHref: DECLIC_REQUEST_URL,
    to: getLocalizedPath("homeworkHelpSecondary", "fr"),
    linkLabel: "Voir l'aide aux devoirs",
  },
  {
    eyebrow: "Les m\u00eames difficult\u00e9s reviennent",
    title: "On installe une continuit\u00e9 qui \u00e9vite de repartir \u00e0 z\u00e9ro.",
    description: "On confirme d'abord le bon tuteur et la bonne priorit\u00e9, puis on propose un bloc de progression si la situation demande de la continuit\u00e9. Un rythme hebdomadaire reste une option apr\u00e8s le jumelage.",
    intent: "ongoing",
    actionLabel: "Demander le bon point de d\u00e9part",
    actionHref: `${DECLIC_REQUEST_URL}?offer=progression`,
    to: getLocalizedPath("academicSupportSecondary", "fr"),
    linkLabel: "Voir le soutien scolaire",
  },
]

const faqItems = [
  {
    question: "Pourquoi choisir M\u00e9thode Secondaire plut\u00f4t qu'une simple liste de tuteurs ?",
    answer:
      "Vous ne comparez pas des profils au hasard : l'\u00e9quipe clarifie le besoin, confirme le bon tuteur et rend la suite lisible pour le parent.",
  },
  {
    question: "Dois-je cr\u00e9er un compte avant de demander une s\u00e9ance ?",
    answer:
      "Non. Vous envoyez d'abord une courte demande. L'\u00e9quipe confirme le tuteur et le cr\u00e9neau; le portail est invit\u00e9 ensuite pour le suivi des clients actifs.",
  },
  {
    question: "Et si je ne sais pas encore quel format il faut ?",
    answer:
      "Utilisez le mini-bilan de 2 minutes. Il est facultatif et vous propose un seul premier geste; il ne d\u00e9clenche pas d'appel automatiquement.",
  },
  {
    question: `Pourquoi le bloc de progression revient à ${progressionSessionPrice} par séance, alors que la séance ciblée est à ${targetedSessionPrice} ?`,
    answer:
      `Le tarif de ${progressionSessionPrice} s'applique au bloc de ${progressionBlockOffer.sessionCount} séances, pas à une cadence obligatoire. Après le jumelage, un créneau hebdomadaire peut être proposé si c'est utile; le bloc ne se renouvelle jamais automatiquement.`,
  },
  {
    question: "Est-ce seulement pour les \u00e9l\u00e8ves en difficult\u00e9 ?",
    answer:
      "Non. Le service convient aussi \u00e0 la pr\u00e9paration d'examens, \u00e0 la consolidation et au d\u00e9veloppement de l'autonomie.",
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
    description: "Tutorat priv\u00e9 en math\u00e9matiques et en sciences pour les \u00e9l\u00e8ves du secondaire au Qu\u00e9bec.",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Qu\u00e9bec" },
      { "@type": "City", name: "Montr\u00e9al" },
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
  function openMiniAssessment() {
    if (typeof window === "undefined") {
      return
    }

    window.dispatchEvent(new CustomEvent("methode:open-diagnostic"))
  }

  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Méthode Secondaire | Tutorat en maths et sciences au secondaire"
        description="Tutorat privé en maths et sciences pour le secondaire 1 à 5 au Québec. Demandez une première séance sans créer de compte, puis gardez le suivi clair."
        path="/"
        keywords="tutorat maths secondaire, tutorat sciences secondaire, tuteur québec, soutien scolaire secondaire, préparation examens secondaire"
        jsonLd={homeSchemas}
        lang={getHtmlLang("fr")}
        locale={getOgLocale("fr")}
        alternateLocale={getAlternateOgLocale("fr")}
        alternates={buildAlternates("home")}
      />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28 lg:pt-8">
        <HeroShowcase
          badge="Mathématiques et sciences | Secondaire 1 à 5"
          title="Quand l'école devient lourde à la maison, vous n'avez pas à trouver la solution seul."
          description={`Examen qui approche, devoirs qui s'étirent ou notes qui inquiètent : demandez une première séance de ${targetedSessionOffer.durationMinutes} min à ${targetedSessionPrice}. On confirme le bon tuteur et le créneau avant de vous inviter au portail.`}
          primaryAction={{
            label: `Demander une première séance · ${targetedSessionPrice} / ${targetedSessionOffer.durationMinutes} min`,
            href: DECLIC_REQUEST_URL,
            icon: CalendarDays,
          }}
          secondaryAction={{
            label: "Pas certain du bon format ? Mini-bilan \u00b7 2 min",
            onClick: openMiniAssessment,
            icon: ArrowRight,
          }}
          actionHint={
            <>
              Situation urgente ?{" "}
              <a href={`tel:${siteConfig.phone}`} className="font-semibold text-[#f5c977] transition hover:text-white">
                Appeler maintenant
              </a>
              .
            </>
          }
          panelEyebrow="Voici comment ça se passe"
          panelTitle="Une demande courte. Aucun compte à créer pour commencer."
          panelItems={[
            "Vous d\u00e9crivez simplement le niveau, la mati\u00e8re et ce qui bloque.",
            "L'\u00e9quipe confirme le bon tuteur, le format et le cr\u00e9neau avant tout paiement.",
            "Le portail sert ensuite au suivi des s\u00e9ances, des r\u00e9sum\u00e9s et des paiements.",
          ]}
          panelNote="La séance ciblée est une vraie séance de tutorat, pas un appel de vente ni un essai déguisé."
        />

        <ParentStartingPointsSection
          eyebrow="Peut-être que ça ressemble à chez vous"
          title="Vous n'avez pas besoin d'un plan parfait pour commencer."
          description="Choisissez la situation qui vous ressemble. La demande courte donne le contexte à l'équipe sans vous faire choisir un forfait à l'aveugle."
          items={parentStartingPoints}
        />

        <OperationalPromisesSection locale="fr" className="pt-20" />

        <PricingSection id="offres" locale="fr" />

        <FaqGrid
          id="faq"
          eyebrow="FAQ"
          title="Questions rapides"
          description="Juste ce qu'il faut pour décider du prochain pas."
          items={faqItems.slice(0, 4)}
        />
      </main>
    </div>
  )
}
