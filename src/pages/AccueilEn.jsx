import Seo from "@/components/Seo"
import ReferenceHomeSections from "@/components/marketing/ReferenceHomeSections"
import { DECLIC_REQUEST_URL_EN } from "@/config/booking"
import { buildAlternates, getLocalizedPath } from "@/lib/i18n"
import { formatCadAmount, getOffer } from "@/lib/pricing"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const targetedSessionOffer = getOffer("targeted_session")
const momentumBlockOffer = getOffer("momentum_block")
const progressionBlockOffer = getOffer("progression_block")
const targetedSessionPrice = formatCadAmount(targetedSessionOffer.totalPriceCad, "en")
const momentumBlockPrice = formatCadAmount(momentumBlockOffer.totalPriceCad, "en")
const progressionBlockPrice = formatCadAmount(progressionBlockOffer.totalPriceCad, "en")

const faqItems = [
  {
    question: "Why choose Methode Secondaire instead of a tutor directory?",
    answer: "You do not compare random profiles alone. The team clarifies the need, confirms the right tutor, and keeps the next step readable for the parent.",
  },
  {
    question: "Do I need to create an account before requesting a session?",
    answer: "No. You first send a short request. The team confirms the tutor and time; the portal is then invited for active-client follow-up.",
  },
  {
    question: "What if I do not know the right format yet?",
    answer: "Use the 2-minute mini-assessment. It is optional and suggests one first action; it does not trigger a call automatically.",
  },
  {
    question: `Why does the progression block cost ${progressionBlockPrice} total?`,
    answer: `That price covers the ${progressionBlockOffer.sessionCount}-session block; it never renews automatically.`,
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
    description: "Private high school math and science tutoring across Quebec.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })),
  },
]

export default function AccueilEn() {
  function openMiniAssessment() {
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("methode:open-diagnostic"))
  }

  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Methode Secondaire | High school math and science tutoring"
        description="Private high school math and science tutoring across Quebec. Request a first session without creating an account, then keep parent follow-up clear."
        path="/en"
        keywords="high school math tutor quebec, high school science tutor quebec, tutoring quebec, exam prep tutoring"
        jsonLd={homeSchemas}
        lang="en-CA"
        locale="en_CA"
        alternateLocale="fr_CA"
        alternates={buildAlternates("home")}
      />
      <ReferenceHomeSections
          locale="en"
          requestUrl={DECLIC_REQUEST_URL_EN}
          portalPath={getLocalizedPath("portal", "en")}
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
