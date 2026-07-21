import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  GraduationCap,
  Handshake,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getRouteKeyFromPath,
  getOgLocale,
} from "@/lib/i18n"
import { getRobotsDirective } from "@/lib/searchIndexStrategy"
import { siteConfig } from "@/lib/seo"

const contentByLocale = {
  fr: {
    reasons: [
      {
        icon: Handshake,
        title: "Une mission claire",
        description: "Aider des élèves du secondaire à mieux comprendre les maths et les sciences avec rigueur et calme.",
      },
      {
        icon: BrainCircuit,
        title: "Une pédagogie qui compte",
        description: "On cherche des tuteurs capables d'expliquer nettement, pas seulement des gens qui connaissent la matière.",
      },
      {
        icon: Sparkles,
        title: "Une marque déjà crédible",
        description: "Le site et le positionnement donnent un cadre sérieux pour attirer les bonnes candidatures et les bons clients.",
      },
    ],
    profiles: [
      "Mathématiques secondaire 1 à 5",
      "Sciences, physique et chimie",
      "Tuteurs capables d'expliquer simplement et de structurer une séance",
    ],
    standards: [
      "Très bonne maîtrise des contenus du secondaire au Québec",
      "Clarté pédagogique et patience réelle",
      "Ponctualité, fiabilité et communication professionnelle",
      "Capacité à créer un climat rassurant et motivant",
    ],
    processSteps: [
      {
        title: "Candidature",
        description: "Le candidat présente ses matières, son expérience, sa disponibilité et son approche pédagogique.",
      },
      {
        title: "Échange",
        description: "On valide l'adéquation avec la mission, le niveau attendu et le style de communication.",
      },
      {
        title: "Validation pédagogique",
        description: "On cherche une explication claire, structurée et humaine, pas juste une expertise brute.",
      },
      {
        title: "Intégration",
        description: "Le bon profil peut ensuite entrer dans un cadre simple, cohérent et orienté résultats.",
      },
    ],
    badge: "Recrutement • Devenir tuteur",
    heroTitle: "Rejoindre une équipe qui mise sur la clarté, l'exigence et l'impact réel auprès des élèves.",
    heroText:
      "Méthode Secondaire cherche des profils solides, pédagogues et fiables pour accompagner des élèves du secondaire en mathématiques et en sciences avec une vraie exigence de clarté.",
    heroSignals: [
      "En ligne partout au Québec",
      "Présentiel possible à Montréal et Laval selon le secteur",
      "Maths, sciences, physique et chimie",
    ],
    ctaPrimary: "Postuler maintenant",
    ctaSecondary: "Lire les témoignages",
    standardsEyebrow: "Ce qu'on veut protéger",
    standardsTitle: "Le niveau pédagogique de la marque",
    reasonsEyebrow: "Pourquoi nous rejoindre",
    reasonsTitle: "Un cadre sérieux pour enseigner avec impact",
    reasonsDescription:
      "On cherche des tuteurs capables d'expliquer clairement, de rassurer les familles et de faire progresser les élèves avec constance.",
    profilesEyebrow: "Profils recherchés",
    profilesTitle: "Le genre de tuteurs qu'on veut voir entrer",
    profilesDescription:
      "La priorité n'est pas juste la compétence académique. La priorité, c'est la combinaison entre maîtrise, clarté et fiabilité.",
    prioritiesTitle: "Domaines prioritaires",
    fitTitle: "Le bon alignement humain",
    fitText:
      "On veut des personnes capables d'expliquer proprement, de rassurer sans infantiliser et de garder un vrai niveau d'exigence. Le ton doit être sérieux, clair et respectueux.",
    fitBoxTitle: "Ce qui aide vraiment",
    fitBoxText:
      "Expérience en tutorat, aisance à structurer une séance, bonne communication écrite et capacité à créer de la confiance rapidement.",
    processEyebrow: "Processus",
    processTitle: "Un parcours de recrutement simple et sérieux",
    processDescription:
      "Le but est de protéger la qualité tout en gardant une expérience fluide pour les bons candidats.",
    searchIntentEyebrow: "Recherches fréquentes",
    searchIntentTitle: "Les recherches qui amènent souvent les bons candidats ici",
    searchIntentDescription:
      "Une seule bonne page peut couvrir plusieurs requêtes proches quand l'intention est la même. Ici, on parle surtout de devenir tuteur, de chercher un emploi de tuteur au secondaire ou de faire du tutorat en ligne au Québec.",
    searchIntents: [
      {
        title: "Devenir tuteur en ligne au Québec",
        description:
          "Pour les personnes qui veulent accompagner des élèves du secondaire en maths ou en sciences à distance, avec un cadre sérieux, clair et déjà crédible.",
      },
      {
        title: "Emploi tuteur secondaire en maths ou sciences",
        description:
          "Pour les profils qui cherchent un poste de tuteur au secondaire avec une vraie attente de pédagogie, de fiabilité et de bonnes explications.",
      },
      {
        title: "Étudiant en enseignement ou enseignant qui veut un complément",
        description:
          "Cette page parle aussi aux étudiants en enseignement, finissants, enseignants et profils scientifiques qui veulent enseigner dans un format plus souple.",
      },
      {
        title: "Tuteur Montréal, Laval ou en ligne",
        description:
          "Le besoin peut être entièrement en ligne partout au Québec, ou parfois plus local selon le secteur autour de Montréal et Laval.",
      },
    ],
    applicationEyebrow: "Candidature",
    applicationTitle: "Postuler directement depuis le site",
    applicationDescription:
      "Présentez votre profil, vos matières et votre approche pour lancer l'échange dans un cadre simple et professionnel.",
    beforeTitle: "Avant de postuler",
    beforeItems: [
      "Présentez vos matières, vos niveaux et votre expérience réelle.",
      "Décrivez brièvement votre façon d'expliquer et de faire progresser un élève.",
      "Mentionnez vos disponibilités et votre préférence en ligne ou en présentiel.",
    ],
    byEmail: "Postuler par email",
    seeTestimonials: "Voir les témoignages",
    formTitle: "Présenter son profil clairement",
    faqEyebrow: "FAQ recrutement",
    faqTitle: "Questions fréquentes pour devenir tuteur",
    faqDescription:
      "Les bons candidats veulent comprendre rapidement le cadre, les besoins et la façon de postuler. Voici les réponses les plus utiles.",
    faqItems: [
      {
        question: "Quelles matières recherchez-vous le plus ?",
        answer:
          "Les besoins les plus fréquents concernent les mathématiques du secondaire, les sciences, la physique et la chimie, avec une attente forte sur la clarté des explications.",
      },
      {
        question: "Le tutorat est-il en ligne ou en présentiel ?",
        answer:
          "Le service peut se faire en ligne partout au Québec, avec des possibilités en présentiel selon le secteur, notamment autour de Montréal et Laval.",
      },
      {
        question: "Quel profil de tuteur est recherché ?",
        answer:
          "Nous privilégions des personnes fiables, pédagogues et structurées, capables d'expliquer proprement, de rassurer les familles et de maintenir un vrai niveau d'exigence.",
      },
      {
        question: "La page convient-elle aussi à un étudiant en enseignement ou à un enseignant ?",
        answer:
          "Oui. Elle peut convenir à des étudiants en enseignement, des finissants, des enseignants ou des profils solides en maths et sciences qui veulent faire du tutorat au secondaire avec une approche claire et sérieuse.",
      },
      {
        question: "Comment puis-je postuler ?",
        answer:
          "Vous pouvez candidater directement via le formulaire de la page ou par email en présentant vos matières, votre disponibilité et votre approche pédagogique.",
      },
    ],
    finalBadge: "Rejoindre l'équipe",
    finalTitle: "Les bons tuteurs méritent une marque à la hauteur de leur pédagogie.",
    finalText:
      "Si vous aimez faire progresser les élèves avec rigueur, calme et clarté, cette page est là pour vous permettre de postuler simplement et professionnellement.",
    finalPrimary: "Postuler maintenant",
    finalSecondary: "Lire les témoignages",
    seoTitle: "Devenir tuteur | Emploi tuteur maths et sciences au Québec | Méthode Secondaire",
    seoDescription:
      "Postulez pour un emploi de tuteur en mathématiques et en sciences au secondaire avec Méthode Secondaire. Tutorat en ligne au Québec, présentiel selon le secteur, profil recherché et candidature.",
    seoKeywords:
      "devenir tuteur, devenir tuteur en ligne québec, emploi tuteur secondaire, emploi tuteur maths, emploi tuteur sciences, recrutement tuteur montréal, recrutement tuteur laval",
    schemaDescription:
      "Page de recrutement de tuteurs en mathématiques et en sciences pour le secondaire au Québec, en ligne et en présentiel selon le secteur.",
    jobPostingTitle: "Tuteur en mathématiques et sciences au secondaire",
    jobPostingDescription:
      "Méthode Secondaire recrute des tuteurs en mathématiques, sciences, physique et chimie pour accompagner des élèves du secondaire au Québec. Les candidatures sont ouvertes pour des profils pédagogues, fiables et capables d'expliquer clairement.",
    formSuccessTitle: "Candidature envoyée",
    formSuccessText:
      "Le profil a bien été transmis. L'équipe examine les matières, les disponibilités et le secteur avant de proposer un échange. L'accès tuteur est créé seulement après cette validation.",
    formSuccessButton: "Envoyer une autre candidature",
    formEmail: "Email",
    formName: "Nom complet",
    formSubjects: "Matières et niveaux",
    formAvailability: "Disponibilités",
    formFormat: "Format que vous pouvez offrir",
    formSector: "Secteur ou zone de déplacement",
    formExperience: "Expérience et approche",
    formNamePlaceholder: "Nom complet",
    formEmailPlaceholder: "adresse@email.com",
    formSubjectsPlaceholder: "Ex. maths sec 1-5, sciences sec 3-5",
    formAvailabilityPlaceholder: "Ex. soirs de semaine, samedi matin",
    formSectorPlaceholder: "Ex. en ligne partout au Québec, Montréal, Laval",
    formFormatOptions: [
      { value: "", label: "Choisir un format" },
      { value: "online", label: "En ligne" },
      { value: "in_person", label: "En personne" },
      { value: "either", label: "Les deux" },
    ],
    formExperiencePlaceholder:
      "Parlez de votre expérience, de votre façon d'expliquer et de ce qui ferait de vous un bon tuteur pour cette marque.",
    formSubmit: "Envoyer la candidature",
    formSending: "Envoi en cours...",
    formError:
      "Une erreur est survenue pendant l'envoi. Vous pouvez aussi candidater directement par email.",
    formCandidate: "Formulaire candidat",
    formConsent:
      "J'accepte que Méthode Secondaire me contacte au sujet de cette candidature. Cette demande ne crée pas encore un accès tuteur.",
  },
  en: {
    reasons: [
      {
        icon: Handshake,
        title: "A clear mission",
        description: "Help high school students understand math and science better with calm, rigor and real clarity.",
      },
      {
        icon: BrainCircuit,
        title: "Teaching matters",
        description: "We look for tutors who can explain clearly, not just people who know the subject.",
      },
      {
        icon: Sparkles,
        title: "A credible brand",
        description: "The website and positioning create a serious framework that attracts strong applicants and strong families.",
      },
    ],
    profiles: [
      "High school math, Secondary 1 to 5",
      "Science, physics and chemistry",
      "Tutors who can explain simply and structure a session well",
    ],
    standards: [
      "Strong command of Quebec high school content",
      "Clear teaching and real patience",
      "Punctuality, reliability and professional communication",
      "Ability to create a reassuring and motivating atmosphere",
    ],
    processSteps: [
      {
        title: "Application",
        description: "The candidate presents subjects, experience, availability and teaching approach.",
      },
      {
        title: "Conversation",
        description: "We confirm alignment with the mission, the expected level and the communication style.",
      },
      {
        title: "Teaching review",
        description: "We look for clear, structured and human explanations, not just raw expertise.",
      },
      {
        title: "Integration",
        description: "The right profile can then join a simple, coherent and results-oriented environment.",
      },
    ],
    badge: "Hiring • Become a tutor",
    heroTitle: "Join a team that values clarity, high standards and real impact for students.",
    heroText:
      "Méthode Secondaire is looking for strong, reliable and highly pedagogical tutors to support high school students in math and science.",
    heroSignals: [
      "Online across Quebec",
      "In person in Montreal and Laval depending on area",
      "Math, science, physics and chemistry",
    ],
    ctaPrimary: "Apply now",
    ctaSecondary: "Read testimonials",
    standardsEyebrow: "What we protect",
    standardsTitle: "The teaching standard of the brand",
    reasonsEyebrow: "Why join us",
    reasonsTitle: "A serious environment for teaching with impact",
    reasonsDescription:
      "We look for tutors who can explain clearly, reassure families and help students progress consistently.",
    profilesEyebrow: "Profiles we want",
    profilesTitle: "The kind of tutors we want to welcome",
    profilesDescription:
      "The priority is not just academic strength. It is the combination of mastery, clarity and reliability.",
    prioritiesTitle: "Priority areas",
    fitTitle: "The right human alignment",
    fitText:
      "We want people who can explain well, reassure without patronizing and maintain strong standards. The tone should be serious, clear and respectful.",
    fitBoxTitle: "What helps most",
    fitBoxText:
      "Tutoring experience, strong session structure, clear written communication and the ability to build trust quickly.",
    processEyebrow: "Process",
    processTitle: "A simple and serious hiring path",
    processDescription:
      "The goal is to protect quality while keeping the experience smooth for strong candidates.",
    searchIntentEyebrow: "Common candidate searches",
    searchIntentTitle: "The searches that often bring strong applicants here",
    searchIntentDescription:
      "One strong page can cover several close queries when the search intent is the same. Here, that intent is mostly about becoming a tutor, finding tutor jobs, or teaching high school math and science online in Quebec.",
    searchIntents: [
      {
        title: "Become an online tutor in Quebec",
        description:
          "For people who want to support high school students in math or science online, inside a serious and already credible brand.",
      },
      {
        title: "High school math and science tutor jobs",
        description:
          "For candidates looking for real tutor work with strong expectations around teaching clarity, reliability and communication.",
      },
      {
        title: "A strong fit for teachers and education students",
        description:
          "This page also speaks to education students, recent graduates, teachers and science-minded applicants who want a more flexible teaching format.",
      },
      {
        title: "Montreal, Laval or online tutoring opportunities",
        description:
          "Some opportunities are fully online across Quebec, while some may also align with local availability around Montreal and Laval.",
      },
    ],
    applicationEyebrow: "Application",
    applicationTitle: "Apply directly through the website",
    applicationDescription:
      "Present your profile, your subjects and your teaching style to start the conversation in a simple, professional way.",
    beforeTitle: "Before you apply",
    beforeItems: [
      "Share your subjects, levels and real experience.",
      "Briefly describe how you explain and help a student improve.",
      "Mention your availability and whether you prefer online or in person.",
    ],
    byEmail: "Apply by email",
    seeTestimonials: "See testimonials",
    formTitle: "Present your profile clearly",
    faqEyebrow: "Hiring FAQ",
    faqTitle: "Common questions about becoming a tutor",
    faqDescription:
      "Strong applicants usually want to understand the standards, the format and the application path quickly. Here are the clearest answers.",
    faqItems: [
      {
        question: "Which subjects are most in demand?",
        answer:
          "The strongest demand is usually for high school math, science, physics and chemistry, with a clear expectation for strong explanations and structured sessions.",
      },
      {
        question: "Is tutoring online or in person?",
        answer:
          "Tutoring can happen online across Quebec, with in-person opportunities depending on the area, especially around Montreal and Laval.",
      },
      {
        question: "What kind of tutor are you looking for?",
        answer:
          "We prioritize reliable, highly pedagogical and well-structured tutors who can explain clearly, reassure families and maintain strong academic standards.",
      },
      {
        question: "Is this a good fit for teachers or education students?",
        answer:
          "Yes. The page is relevant for education students, recent graduates, teachers and strong math or science profiles who want to tutor high school students with clarity and professionalism.",
      },
      {
        question: "How do I apply?",
        answer:
          "You can apply directly through the form on this page or by email with your subjects, availability and teaching approach.",
      },
    ],
    finalBadge: "Join the team",
    finalTitle: "Great tutors deserve a brand that matches their teaching quality.",
    finalText:
      "If you love helping students progress with rigor, calm and clarity, this page is here to let you apply simply and professionally.",
    finalPrimary: "Apply now",
    finalSecondary: "Read testimonials",
    seoTitle: "Become a tutor | Math and science tutor jobs in Quebec | Méthode Secondaire",
    seoDescription:
      "Apply for high school math and science tutor jobs with Méthode Secondaire across Quebec. Explore online tutor opportunities, hiring standards and the application process.",
    seoKeywords:
      "become a tutor quebec, math tutor jobs quebec, science tutor jobs quebec, online tutor jobs quebec, high school tutor montreal, private tutor jobs",
    schemaDescription:
      "Hiring page for high school math and science tutors across Quebec, online and in person depending on area.",
    jobPostingTitle: "High school math and science tutor",
    jobPostingDescription:
      "Méthode Secondaire is hiring high school math, science, physics and chemistry tutors across Quebec. We are looking for reliable, highly pedagogical tutors who can explain clearly and support students with calm, structure and strong standards.",
    formSuccessTitle: "Application sent",
    formSuccessText:
      "Your profile was submitted successfully. The team reviews subjects, availability and area before proposing a conversation. Tutor access is created only after that review.",
    formSuccessButton: "Send another application",
    formEmail: "Email",
    formName: "Full name",
    formSubjects: "Subjects and levels",
    formAvailability: "Availability",
    formFormat: "Formats you can offer",
    formSector: "Area or travel zone",
    formExperience: "Experience and approach",
    formNamePlaceholder: "Full name",
    formEmailPlaceholder: "name@email.com",
    formSubjectsPlaceholder: "Ex. math sec 1-5, science sec 3-5",
    formAvailabilityPlaceholder: "Ex. weekday evenings, Saturday mornings",
    formSectorPlaceholder: "Ex. online across Quebec, Montreal, Laval",
    formFormatOptions: [
      { value: "", label: "Choose a format" },
      { value: "online", label: "Online" },
      { value: "in_person", label: "In person" },
      { value: "either", label: "Both" },
    ],
    formExperiencePlaceholder:
      "Tell us about your experience, your teaching style and what would make you a strong tutor for this brand.",
    formSubmit: "Submit application",
    formSending: "Sending...",
    formError: "An error occurred while sending. You can also apply directly by email.",
    formCandidate: "Candidate form",
    formConsent:
      "I agree that Methode Secondaire may contact me about this application. This request does not create a tutor login yet.",
  },
}

const routeVariantOverrides = {
  employmentTutorSecondary: {
    fr: {
      badge: "Emploi tuteur • Secondaire",
      heroTitle: "Emploi tuteur au secondaire : rejoindre une marque claire pour enseigner les maths et les sciences",
      heroText:
        "Cette page est pensée pour les personnes qui cherchent un emploi de tuteur au secondaire au Québec, surtout en maths et en sciences, avec un cadre sérieux, une mission claire et un vrai niveau d'exigence pédagogique.",
      ctaPrimary: "Postuler pour l'emploi tuteur",
      seoTitle: "Emploi tuteur secondaire | Maths et sciences au Québec | Méthode Secondaire",
      seoDescription:
        "Emploi de tuteur au secondaire au Québec en maths et sciences. Postulez chez Méthode Secondaire pour du tutorat en ligne ou selon le secteur à Montréal et Laval.",
      seoKeywords:
        "emploi tuteur secondaire, emploi tuteur maths, emploi tuteur sciences, devenir tuteur en ligne québec, recrutement tuteur secondaire montréal, recrutement tuteur secondaire laval",
      schemaDescription:
        "Page emploi tuteur secondaire en mathématiques et en sciences au Québec, pour des candidatures en ligne et selon le secteur à Montréal et Laval.",
      jobPostingTitle: "Emploi tuteur secondaire en mathématiques et sciences",
      jobPostingDescription:
        "Méthode Secondaire recrute pour un emploi de tuteur au secondaire en mathématiques, sciences, physique et chimie au Québec. Le cadre convient aux profils pédagogues, fiables et capables d'expliquer clairement.",
    },
    en: {
      badge: "Tutor jobs • High school",
      heroTitle: "High school tutor jobs in Quebec for math and science tutors who teach clearly",
      heroText:
        "This page is built for applicants looking for high school tutor jobs in Quebec, especially in math and science, inside a serious brand with clear standards and real pedagogical expectations.",
      ctaPrimary: "Apply for tutor jobs",
      seoTitle: "High school tutor jobs in Quebec | Math and science | Méthode Secondaire",
      seoDescription:
        "Apply for high school tutor jobs in Quebec in math and science. Join Méthode Secondaire for online tutoring and, depending on the area, local opportunities around Montreal and Laval.",
      seoKeywords:
        "high school tutor jobs quebec, math tutor jobs quebec, science tutor jobs quebec, online tutor jobs quebec, montreal tutor jobs, laval tutor jobs",
      schemaDescription:
        "Hiring page for high school tutor jobs in math and science across Quebec, online and, depending on area, around Montreal and Laval.",
      jobPostingTitle: "High school math and science tutor jobs in Quebec",
      jobPostingDescription:
        "Méthode Secondaire hires for high school tutor jobs in math, science, physics and chemistry across Quebec. We look for reliable, highly pedagogical tutors who explain clearly and teach with structure.",
    },
  },
}

export default function DevenirTuteur({ forcedRouteKey }) {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const routeKey = forcedRouteKey || getRouteKeyFromPath(location.pathname) || "devenirTuteur"
  const copy = {
    ...contentByLocale[locale],
    ...(routeVariantOverrides[routeKey]?.[locale] || {}),
  }
  const path = getLocalizedPath(routeKey, locale)

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.seoTitle,
    url: `${siteConfig.siteUrl}${path}`,
    description: copy.schemaDescription,
  }

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: copy.jobPostingTitle,
    description: copy.jobPostingDescription,
    url: `${siteConfig.siteUrl}${path}`,
    directApply: true,
    inLanguage: getHtmlLang(locale),
    industry: locale === "en" ? "Education and tutoring" : "Éducation et tutorat",
    occupationalCategory: copy.jobPostingTitle,
    qualifications: copy.standards.join(" • "),
    skills: copy.profiles,
    applicantLocationRequirements: {
      "@type": "AdministrativeArea",
      name: locale === "en" ? "Quebec" : "Québec",
    },
    jobLocation: [
      {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Montréal",
          addressRegion: "QC",
          addressCountry: "CA",
        },
      },
      {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Laval",
          addressRegion: "QC",
          addressCountry: "CA",
        },
      },
    ],
    hiringOrganization: {
      "@type": "EducationalOrganization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  const hiringSchema = [pageSchema, jobPostingSchema, faqSchema]

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        keywords={copy.seoKeywords}
        jsonLd={hiringSchema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates(routeKey)}
        robots={getRobotsDirective(routeKey)}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-7 sm:px-6 sm:pt-10 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr] lg:items-start lg:gap-10">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.badge}
            </Badge>

            <h1 className="balanced-copy mt-6 font-display text-4xl font-semibold leading-[0.98] text-white sm:text-6xl">
              {copy.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{copy.heroText}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {copy.heroSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/78"
                >
                  {signal}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                className="w-full justify-center rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
              >
                <a href="#candidature">
                  {copy.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-center rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link to={getLocalizedPath("temoignages", locale)}>{copy.ctaSecondary}</Link>
              </Button>
            </div>
          </div>

          <div id="candidature" className="scroll-mt-28 lg:sticky lg:top-28">
            <MotionCard className="glass-panel rounded-[28px] border-white/10 bg-white/[0.06] p-5 text-white shadow-[0_20px_70px_rgba(3,11,31,0.24)] sm:rounded-[32px] sm:p-7">
              <div className="flex items-center justify-between gap-3 text-sm uppercase tracking-[0.2em] text-white/45">
                <span>{copy.formCandidate}</span>
                <span className="rounded-full border border-[#f5c977]/25 bg-[#f5c977]/10 px-3 py-1 text-[0.65rem] tracking-[0.16em] text-[#f5c977]">
                  {locale === "en" ? "Step 1 of 4" : "\u00C9tape 1 sur 4"}
                </span>
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold">{copy.formTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/72">{copy.applicationDescription}</p>
              <div className="mt-6">
                <TutorApplicationForm copy={copy} />
              </div>
            </MotionCard>
          </div>
        </section>

        <section className="pt-16 sm:pt-20">
            <SectionHeader
              eyebrow={copy.reasonsEyebrow}
            title={copy.reasonsTitle}
            description={copy.reasonsDescription}
          />

          <div className="mt-8 divide-y divide-white/10 border-y border-white/10 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {copy.reasons.map((reason, index) => (
              <article key={reason.title} className="min-w-0 px-0 py-6 first:pt-0 last:pb-0 lg:px-6 lg:py-0 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-center gap-3">
                  <div className="inline-flex rounded-2xl bg-[#f5c977] p-2.5 text-[#071631]">
                    <reason.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium tracking-[0.2em] text-[#f5c977]">0{index + 1}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold text-white">{reason.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{reason.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-16 sm:pt-20">
            <SectionHeader
              eyebrow={copy.profilesEyebrow}
            title={copy.profilesTitle}
            description={copy.profilesDescription}
          />

          <div className="mt-8 grid gap-8 border-y border-white/10 py-1 lg:grid-cols-[0.95fr,1.05fr]">
            <div className="py-6 lg:pr-8">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold">{copy.prioritiesTitle}</h2>
              <ul className="mt-5 divide-y divide-white/10 text-sm text-white/80">
                {copy.profiles.map((profile) => (
                  <li key={profile} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {profile}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="border-t border-white/10 py-6 lg:border-l lg:border-t-0 lg:pl-8">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold">{copy.fitTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/75">{copy.fitText}</p>
              <div className="mt-6 border-l-2 border-[#f5c977]/70 pl-4">
                <div className="text-sm uppercase tracking-[0.22em] text-white/45">{copy.fitBoxTitle}</div>
                <p className="mt-3 text-sm leading-7 text-white/75">{copy.fitBoxText}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="pt-16 sm:pt-20">
            <SectionHeader
              eyebrow={copy.processEyebrow}
            title={copy.processTitle}
            description={copy.processDescription}
          />

          <ApplicationJourney steps={copy.processSteps} locale={locale} />
        </section>

        <section className="pt-16 sm:pt-20">
          <SectionHeader
            eyebrow={copy.applicationEyebrow}
            title={copy.applicationTitle}
            description={copy.applicationDescription}
          />

          <div className="mt-8 grid gap-8 border-y border-white/10 py-1 xl:grid-cols-[0.9fr,1.1fr]">
            <div className="py-6 xl:pr-8">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold">{copy.beforeTitle}</h2>
              <ul className="mt-5 divide-y divide-white/10 text-sm text-white/80">
                {copy.beforeItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <a href={`mailto:${siteConfig.email}?subject=Candidature%20tuteur%20-%20Méthode%20Secondaire`}>
                    {copy.byEmail}
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={getLocalizedPath("temoignages", locale)}>{copy.seeTestimonials}</Link>
                </Button>
              </div>
            </div>

            <aside className="border-t border-white/10 py-6 xl:border-l xl:border-t-0 xl:pl-8">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">{copy.standardsEyebrow}</div>
              <h2 className="mt-3 font-display text-3xl font-semibold">{copy.standardsTitle}</h2>
              <ul className="mt-5 divide-y divide-white/10 text-sm text-white/80">
                {copy.standards.map((standard) => (
                  <li key={standard} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {standard}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="pt-16 sm:pt-20">
          <SectionHeader
            eyebrow={copy.faqEyebrow}
            title={copy.faqTitle}
            description={copy.faqDescription}
          />

          <div className="mt-8 border-y border-white/10">
            {copy.faqItems.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>

        <section className="pt-16 sm:pt-20">
          <MotionCard className="rounded-[28px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-6 text-white sm:rounded-[34px] sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {copy.finalBadge}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{copy.finalTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.finalText}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  className="w-full justify-center rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
                >
                  <a href="#candidature">{copy.finalPrimary}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={getLocalizedPath("temoignages", locale)}>{copy.finalSecondary}</Link>
                </Button>
              </div>
            </div>
          </MotionCard>
        </section>
      </main>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{eyebrow}</div>
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description}</p>
    </div>
  )
}

function ApplicationJourney({ steps, locale }) {
  const stepLabel = locale === "en" ? "Step" : "\u00C9tape"
  const journeyTitle = locale === "en" ? "Your application path" : "Votre parcours de candidature"
  const startingLabel = locale === "en" ? "Start here" : "Commencez ici"
  const nextLabel = locale === "en" ? "Then" : "Ensuite"
  const totalLabel = locale === "en" ? `${steps.length} steps` : `${steps.length} \u00E9tapes`

  return (
    <div className="mt-8 rounded-[28px] border border-white/10 bg-[#071a3d]/70 p-5 text-white sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-[#f5c977]">{journeyTitle}</div>
          <p className="mt-2 text-sm leading-6 text-white/65">
            {locale === "en"
              ? "A clear four-step review, so you always know what happens next."
              : "Quatre \u00E9tapes claires pour toujours savoir ce qui suit."}
          </p>
        </div>
        <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-[0.12em] text-white/70">
          {totalLabel}
        </span>
      </div>

      <div className="mt-5 h-1 rounded-full bg-white/10" aria-hidden="true">
        <span className="block h-full w-1/4 rounded-full bg-[#f5c977]" />
      </div>

      <ol className="mt-5 divide-y divide-white/10 border-y border-white/10 xl:grid xl:grid-cols-4 xl:divide-x xl:divide-y-0">
        {steps.map((step, index) => {
          const isStartingPoint = index === 0

          return (
            <li
              key={step.title}
              className="min-w-0 py-4 first:pt-0 last:pb-0 xl:px-5 xl:py-0 xl:first:pl-0 xl:last:pr-0"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                    isStartingPoint
                      ? "border-[#f5c977] bg-[#f5c977] text-[#071631]"
                      : "border-white/15 bg-white/[0.04] text-white/70"
                  }`}
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#f5c977]">
                    {isStartingPoint ? startingLabel : `${nextLabel} · ${stepLabel} ${index + 1}`}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{step.description}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function FaqItem({ question, answer }) {
  return (
    <details className="group border-b border-white/10 py-5 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-xl font-semibold text-white sm:text-2xl">
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg font-normal text-[#f5c977] transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="max-w-3xl pt-4 text-sm leading-7 text-white/72">{answer}</p>
    </details>
  )
}

function TutorApplicationForm({ copy }) {
  const [status, setStatus] = useState("idle")

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus("sending")

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/mzddpkaz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[28px] border border-white/10 bg-[#0a1d43]/80 px-6 py-10 text-center">
        <div className="inline-flex rounded-full bg-[#f5c977] p-3 text-[#071631]">
          <BadgeCheck className="h-5 w-5" />
        </div>
        <div className="mt-5 font-display text-3xl font-semibold text-white">{copy.formSuccessTitle}</div>
        <p className="mt-3 text-sm leading-7 text-white/72">{copy.formSuccessText}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={() => setStatus("idle")}
        >
          {copy.formSuccessButton}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label={copy.formName}>
        <Input
          name="nom"
          required
          className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder={copy.formNamePlaceholder}
        />
      </Field>

      <Field label={copy.formEmail}>
        <Input
          name="email"
          type="email"
          required
          className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder={copy.formEmailPlaceholder}
        />
      </Field>

      <Field label={copy.formSubjects}>
        <Input
          name="matieres"
          required
          className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder={copy.formSubjectsPlaceholder}
        />
      </Field>

      <Field label={copy.formAvailability}>
        <Input
          name="disponibilites"
          required
          className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder={copy.formAvailabilityPlaceholder}
        />
      </Field>

      <Field label={copy.formFormat}>
        <select
          name="format"
          required
          defaultValue=""
          className="h-12 w-full rounded-2xl border border-white/10 bg-[#06132f]/85 px-4 text-white outline-none transition focus:border-[#f5c977]/60"
        >
          {copy.formFormatOptions.map((option) => (
            <option key={option.value || "placeholder"} value={option.value} disabled={!option.value} className="bg-[#06132f] text-white">
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label={copy.formSector}>
        <Input
          name="secteur"
          required
          className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder={copy.formSectorPlaceholder}
        />
      </Field>

      <Field label={copy.formExperience}>
        <Textarea
          name="message"
          required
          className="min-h-[160px] rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder={copy.formExperiencePlaceholder}
        />
      </Field>

      <input type="hidden" name="_subject" value="Candidature tuteur - Méthode Secondaire" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="pipeline_type" value="tutor_application" />
      <input type="hidden" name="source_page" value="become-a-tutor" />

      <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/70">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-[#f5c977]" />
        <span>{copy.formConsent}</span>
      </label>

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[#f5c977] py-6 text-[#071631] hover:bg-[#f7d38f]"
      >
        {status === "sending" ? copy.formSending : copy.formSubmit}
      </Button>

      {status === "error" && (
        <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {copy.formError}
        </div>
      )}
    </form>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/70">{label}</span>
      {children}
    </label>
  )
}
