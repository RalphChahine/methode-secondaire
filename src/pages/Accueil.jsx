import Seo from "@/components/Seo"
import ReferenceHomeSections from "@/components/marketing/ReferenceHomeSections"
import { DECLIC_REQUEST_URL } from "@/config/booking"
import { buildAlternates, getAlternateOgLocale, getHtmlLang, getLocalizedPath, getOgLocale } from "@/lib/i18n"
import { formatCadAmount, getOffer } from "@/lib/pricing"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const targetedSessionOffer = getOffer("targeted_session")
const momentumBlockOffer = getOffer("momentum_block")
const progressionBlockOffer = getOffer("progression_block")
const targetedSessionPrice = formatCadAmount(targetedSessionOffer.totalPriceCad, "fr")
const momentumBlockPrice = formatCadAmount(momentumBlockOffer.totalPriceCad, "fr")
const progressionBlockPrice = formatCadAmount(progressionBlockOffer.totalPriceCad, "fr")

const faqItems = [
  {
    question: "Pourquoi choisir Méthode Secondaire plutôt qu'une simple liste de tuteurs ?",
    answer: "Vous ne comparez pas des profils au hasard : l'équipe clarifie le besoin, confirme le bon tuteur et rend la suite lisible pour le parent.",
  },
  {
    question: "Dois-je créer un compte avant de demander une séance ?",
    answer: "Non. Vous envoyez d'abord une courte demande. L'équipe confirme le tuteur et le créneau; le portail est invité ensuite pour le suivi des clients actifs.",
  },
  {
    question: "Et si je ne sais pas encore quel format il faut ?",
    answer: "Utilisez le mini-bilan de 2 minutes. Il est facultatif et propose un premier geste; il ne déclenche pas d'appel automatiquement.",
  },
  {
    question: `Pourquoi le bloc de progression coûte ${progressionBlockPrice} au total ?`,
    answer: `Ce prix correspond au bloc de ${progressionBlockOffer.sessionCount} séances; il ne se renouvelle jamais automatiquement.`,
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
    areaServed: [{ "@type": "AdministrativeArea", name: "Québec" }, { "@type": "City", name: "Montréal" }, { "@type": "City", name: "Laval" }],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })),
  },
]

export default function Accueil() {
  function openMiniAssessment() {
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("methode:open-diagnostic"))
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
      <ReferenceHomeSections
          locale="fr"
          requestUrl={DECLIC_REQUEST_URL}
          portalPath={getLocalizedPath("portal", "fr")}
          targetedSessionOffer={targetedSessionOffer}
          targetedSessionPrice={targetedSessionPrice}
          momentumBlockOffer={momentumBlockOffer}
          momentumBlockPrice={momentumBlockPrice}
          progressionBlockOffer={progressionBlockOffer}
          progressionBlockPrice={progressionBlockPrice}
          openMiniAssessment={openMiniAssessment}
          phone={siteConfig.phone}
          faqItems={faqItems}
      />
    </div>
  )
}
