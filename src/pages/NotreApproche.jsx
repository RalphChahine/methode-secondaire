import {
  CalendarCheck,
  ClipboardCheck,
  HeartHandshake,
  MessageSquareText,
  ShieldCheck,
  UsersRound,
} from "lucide-react"
import { useLocation } from "react-router-dom"

import Seo from "@/components/Seo"
import {
  FaqGrid,
  FeatureGrid,
  FinalCtaSection,
  HeroShowcase,
  StepGrid,
} from "@/components/SimpleMarketingSections"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const contentByLocale = {
  fr: {
    badge: "Pour les parents",
    title: "Un tutorat encadr\u00e9, pas une liste de profils.",
    description:
      "Vous n'avez pas \u00e0 deviner quel tuteur choisir ni quoi suivre apr\u00e8s la s\u00e9ance. L'\u00e9quipe cadre le besoin, propose le bon d\u00e9part et garde la suite lisible pour le parent.",
    panelEyebrow: "Ce que le parent garde en main",
    panelTitle: "Une d\u00e9cision claire avant, pendant et apr\u00e8s la s\u00e9ance.",
    panelItems: [
      "Un \u00e9change humain pour cadrer le besoin.",
      "Un tuteur propos\u00e9 selon la mati\u00e8re, le niveau et le format.",
      "Un suivi simple dans le portail parent.",
    ],
    featuresEyebrow: "Des rep\u00e8res concrets",
    featuresTitle: "Ce qui rend le parcours plus rassurant.",
    featuresDescription:
      "Le service est pens\u00e9 pour que le parent sache qui intervient, ce qui est pr\u00e9vu et quelle suite est recommand\u00e9e.",
    features: [
      {
        icon: HeartHandshake,
        title: "Le matching reste humain",
        description:
          "On commence par la mati\u00e8re, le niveau, l'urgence et la fa\u00e7on dont l'\u00e9l\u00e8ve a besoin d'\u00eatre accompagn\u00e9.",
      },
      {
        icon: UsersRound,
        title: "Les tuteurs sont int\u00e9gr\u00e9s par l'\u00e9quipe",
        description:
          "Un tuteur ne s'inscrit pas librement comme parent. L'\u00e9quipe cr\u00e9e l'acc\u00e8s et le relie au parent seulement lorsqu'un accompagnement est confirm\u00e9.",
      },
      {
        icon: ClipboardCheck,
        title: "Le parent peut lire la suite",
        description:
          "Apr\u00e8s une s\u00e9ance, le portail sert \u00e0 retrouver le bilan, les points travaill\u00e9s et le prochain geste recommand\u00e9.",
      },
      {
        icon: CalendarCheck,
        title: "Le cr\u00e9neau reste clair",
        description:
          "La proposition, la confirmation et les demandes d'ajustement sont regroup\u00e9es au m\u00eame endroit pour \u00e9viter les fils de messages perdus.",
      },
    ],
    stepsEyebrow: "Un d\u00e9part en trois temps",
    stepsTitle: "Le parent n'a pas \u00e0 porter toute l'organisation.",
    stepsDescription:
      "Le but est simple: comprendre vite, proposer avec soin, puis rendre le suivi facile \u00e0 consulter.",
    steps: [
      {
        step: "Premier \u00e9change",
        title: "On comprend ce qui bloque maintenant.",
        description:
          "Vous pouvez appeler ou demander un rappel. On clarifie la mati\u00e8re, le niveau, l'urgence et le bon format avant de vous pousser vers une r\u00e9servation.",
      },
      {
        step: "Proposition",
        title: "On vous propose un d\u00e9part qui a du sens.",
        description:
          "L'\u00e9quipe relie le parent et le tuteur lorsque le match est clair, puis le cr\u00e9neau et les d\u00e9tails sont visibles avant confirmation.",
      },
      {
        step: "Suivi",
        title: "On garde les progr\u00e8s lisibles.",
        description:
          "Le tuteur compl\u00e8te un bilan normalis\u00e9. Le parent peut \u00e9crire avant une s\u00e9ance, lire le retour et signaler ce qui doit \u00eatre ajust\u00e9.",
      },
    ],
    faqEyebrow: "Questions de confiance",
    faqTitle: "Ce que vous pouvez attendre du service.",
    faqDescription: "Des r\u00e9ponses simples avant de cr\u00e9er un compte ou de confirmer une s\u00e9ance.",
    faq: [
      {
        question: "Est-ce que je dois choisir seul le tuteur?",
        answer:
          "Non. L'\u00e9quipe propose le tuteur selon le besoin discut\u00e9. Le parent voit ensuite la proposition et peut poser ses questions avant de confirmer la suite.",
      },
      {
        question: "Qu'est-ce qui est partag\u00e9 apr\u00e8s une s\u00e9ance?",
        answer:
          "Le tuteur utilise un gabarit de bilan pour rendre visibles les notions travaill\u00e9es, les blocages observ\u00e9s et la prochaine recommandation utile au parent.",
      },
      {
        question: "Puis-je \u00e9crire au tuteur avant une s\u00e9ance?",
        answer:
          "Oui. Le portail permet au parent de transmettre le contexte utile avant la s\u00e9ance afin que le tuteur puisse le consulter au bon moment.",
      },
      {
        question: "Que se passe-t-il si le cr\u00e9neau doit changer?",
        answer:
          "Le parent peut demander un ajustement dans le portail. Avec au moins 72 heures de pr\u00e9avis, le report est garanti; apr\u00e8s ce d\u00e9lai, l'\u00e9quipe examine la solution avec la famille sans retirer automatiquement un cr\u00e9dit ou un paiement.",
      },
    ],
    ctaTitle: "Parlez-nous de la situation avant de choisir.",
    ctaDescription:
      "Un court \u00e9change permet souvent de savoir si une s\u00e9ance cibl\u00e9e, un Sprint examen ou un suivi r\u00e9gulier est le bon d\u00e9part.",
    call: "Parler \u00e0 l'\u00e9quipe",
    portal: "Cr\u00e9er le profil parent",
    seoTitle: "Notre approche parent | M\u00e9thode Secondaire",
    seoDescription:
      "D\u00e9couvrez comment M\u00e9thode Secondaire cadre le besoin, propose le bon tuteur et rend le suivi de tutorat clair pour les parents.",
    seoKeywords:
      "matching tuteur parent, suivi tutorat parent, portail parent tutorat, tutorat secondaire qu\u00e9bec",
  },
  en: {
    badge: "For parents",
    title: "Structured tutoring, not a list of profiles.",
    description:
      "You do not have to guess which tutor to choose or what to track after a session. The team frames the need, proposes the right start and keeps the next steps readable for the parent.",
    panelEyebrow: "What parents keep in hand",
    panelTitle: "A clear decision before, during and after every session.",
    panelItems: [
      "A human conversation to frame the need.",
      "A tutor proposed by subject, grade level and format.",
      "Simple follow-up in the parent portal.",
    ],
    featuresEyebrow: "Practical reassurance",
    featuresTitle: "What makes the journey easier to trust.",
    featuresDescription:
      "The service is designed so parents know who is involved, what is planned and what the recommended next step is.",
    features: [
      {
        icon: HeartHandshake,
        title: "Matching stays human",
        description:
          "We start with the subject, grade level, urgency and the kind of support that will help the student most.",
      },
      {
        icon: UsersRound,
        title: "Tutors are added by the team",
        description:
          "A tutor cannot freely register like a parent. The team creates access and connects the tutor to a family only once support is confirmed.",
      },
      {
        icon: ClipboardCheck,
        title: "Parents can read the next step",
        description:
          "After a session, the portal keeps the summary, the work covered and the recommended next action easy to find.",
      },
      {
        icon: CalendarCheck,
        title: "Scheduling stays clear",
        description:
          "Proposals, confirmations and change requests live in one place instead of disappearing into message threads.",
      },
    ],
    stepsEyebrow: "A three-step start",
    stepsTitle: "Parents do not have to carry the whole process.",
    stepsDescription:
      "The goal is simple: understand quickly, propose carefully and make follow-up easy to consult.",
    steps: [
      {
        step: "First conversation",
        title: "We understand what is getting in the way now.",
        description:
          "Call or request a callback. We clarify the subject, grade level, urgency and right format before inviting a family to request a session.",
      },
      {
        step: "Proposal",
        title: "We propose a start that makes sense.",
        description:
          "The team connects the parent and tutor when the match is clear, then the time and details are visible before confirmation.",
      },
      {
        step: "Follow-up",
        title: "We keep progress readable.",
        description:
          "The tutor completes a standardized summary. Parents can write before a session, read the update and flag what needs adjusting.",
      },
    ],
    faqEyebrow: "Trust questions",
    faqTitle: "What you can expect from the service.",
    faqDescription: "Simple answers before creating an account or confirming a session.",
    faq: [
      {
        question: "Do I have to choose a tutor alone?",
        answer:
          "No. The team proposes a tutor based on the need discussed. Parents can then see the proposal and ask questions before confirming the next step.",
      },
      {
        question: "What is shared after a session?",
        answer:
          "Tutors use a standard summary so the work covered, observed blocks and useful next recommendation are visible to the parent.",
      },
      {
        question: "Can I write to the tutor before a session?",
        answer:
          "Yes. The portal lets parents share useful context before the session so the tutor can review it at the right time.",
      },
      {
        question: "What if the session time needs to change?",
        answer:
          "Parents can request an adjustment in the portal. With at least 72 hours' notice, rescheduling is guaranteed; later requests are reviewed with the family without automatically removing a credit or payment.",
      },
    ],
    ctaTitle: "Talk through the situation before choosing.",
    ctaDescription:
      "A short conversation often makes it clear whether a focused session, an Exam Sprint or regular follow-up is the right place to start.",
    call: "Talk to our team",
    portal: "Create parent profile",
    seoTitle: "Our parent approach | Methode Secondaire",
    seoDescription:
      "See how Methode Secondaire frames the need, proposes the right tutor and makes tutoring follow-up clear for parents.",
    seoKeywords:
      "parent tutor matching, tutoring follow-up for parents, parent tutoring portal, quebec high school tutoring",
  },
}

export default function NotreApproche() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const path = getLocalizedPath("approche", locale)
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: copy.seoTitle,
    url: absoluteUrl(path),
    description: copy.seoDescription,
    about: {
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
        jsonLd={schema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("approche")}
      />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28 lg:pt-8">
        <HeroShowcase
          badge={copy.badge}
          title={copy.title}
          description={copy.description}
          primaryAction={{
            label: copy.call,
            href: `tel:${siteConfig.phone}`,
            icon: MessageSquareText,
          }}
          secondaryAction={{
            label: copy.portal,
            href: getLocalizedPath("portal", locale),
            icon: ShieldCheck,
          }}
          panelEyebrow={copy.panelEyebrow}
          panelTitle={copy.panelTitle}
          panelItems={copy.panelItems}
        />

        <StepGrid
          id="parcours"
          eyebrow={copy.stepsEyebrow}
          title={copy.stepsTitle}
          description={copy.stepsDescription}
          steps={copy.steps}
        />

        <FeatureGrid
          eyebrow={copy.featuresEyebrow}
          title={copy.featuresTitle}
          description={copy.featuresDescription}
          items={copy.features}
          columns="grid-cols-1 lg:grid-cols-2"
        />

        <FaqGrid
          eyebrow={copy.faqEyebrow}
          title={copy.faqTitle}
          description={copy.faqDescription}
          items={copy.faq}
        />

        <FinalCtaSection
          badge={copy.badge}
          title={copy.ctaTitle}
          description={copy.ctaDescription}
          primaryAction={{
            label: copy.call,
            href: `tel:${siteConfig.phone}`,
            icon: MessageSquareText,
          }}
          secondaryAction={{
            label: copy.portal,
            href: getLocalizedPath("portal", locale),
            icon: ShieldCheck,
          }}
        />
      </main>
    </div>
  )
}
