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
    formSuccessText: "Le profil a bien été transmis. La prochaine étape pourra se faire par retour de message.",
    formSuccessButton: "Envoyer une autre candidature",
    formEmail: "Email",
    formName: "Nom complet",
    formSubjects: "Matières et niveaux",
    formAvailability: "Disponibilités",
    formExperience: "Expérience et approche",
    formNamePlaceholder: "Nom complet",
    formEmailPlaceholder: "adresse@email.com",
    formSubjectsPlaceholder: "Ex. maths sec 1-5, sciences sec 3-5",
    formAvailabilityPlaceholder: "Ex. soirs de semaine, samedi matin",
    formExperiencePlaceholder:
      "Parlez de votre expérience, de votre façon d'expliquer et de ce qui ferait de vous un bon tuteur pour cette marque.",
    formSubmit: "Envoyer la candidature",
    formSending: "Envoi en cours...",
    formError:
      "Une erreur est survenue pendant l'envoi. Vous pouvez aussi candidater directement par email.",
    formCandidate: "Formulaire candidat",
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
    formSuccessText: "Your profile was submitted successfully. The next step can happen by message or email.",
    formSuccessButton: "Send another application",
    formEmail: "Email",
    formName: "Full name",
    formSubjects: "Subjects and levels",
    formAvailability: "Availability",
    formExperience: "Experience and approach",
    formNamePlaceholder: "Full name",
    formEmailPlaceholder: "name@email.com",
    formSubjectsPlaceholder: "Ex. math sec 1-5, science sec 3-5",
    formAvailabilityPlaceholder: "Ex. weekday evenings, Saturday mornings",
    formExperiencePlaceholder:
      "Tell us about your experience, your teaching style and what would make you a strong tutor for this brand.",
    formSubmit: "Submit application",
    formSending: "Sending...",
    formError: "An error occurred while sending. You can also apply directly by email.",
    formCandidate: "Candidate form",
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

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.badge}
            </Badge>

            <h1 className="balanced-copy mt-7 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
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

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
              >
                <a href="#candidature">
                  {copy.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("temoignages", locale)}>{copy.ctaSecondary}</Link>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-white/45">{copy.standardsEyebrow}</div>
            <div className="mt-3 font-display text-3xl font-semibold">{copy.standardsTitle}</div>

            <ul className="mt-6 space-y-4 text-sm text-white/80">
              {copy.standards.map((standard) => (
                <li key={standard} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {standard}
                </li>
              ))}
            </ul>
          </MotionCard>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={copy.reasonsEyebrow}
            title={copy.reasonsTitle}
            description={copy.reasonsDescription}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {copy.reasons.map((reason) => (
              <MotionCard key={reason.title} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
                <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                  <reason.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold">{reason.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{reason.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={copy.profilesEyebrow}
            title={copy.profilesTitle}
            description={copy.profilesDescription}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr,1.05fr]">
            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold">{copy.prioritiesTitle}</h2>
              <ul className="mt-6 space-y-4 text-sm text-white/80">
                {copy.profiles.map((profile) => (
                  <li key={profile} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {profile}
                  </li>
                ))}
              </ul>
            </MotionCard>

            <MotionCard className="rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-7 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold">{copy.fitTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/75">{copy.fitText}</p>
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-white/45">{copy.fitBoxTitle}</div>
                <p className="mt-3 text-sm leading-7 text-white/75">{copy.fitBoxText}</p>
              </div>
            </MotionCard>
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={copy.processEyebrow}
            title={copy.processTitle}
            description={copy.processDescription}
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-4">
            {copy.processSteps.map((step, index) => (
              <MotionCard key={step.title} className="rounded-[28px] border-white/10 bg-[#0a1d43]/75 p-6 text-white">
                <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
                  {locale === "en" ? `Step 0${index + 1}` : `Étape 0${index + 1}`}
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{step.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={copy.searchIntentEyebrow}
            title={copy.searchIntentTitle}
            description={copy.searchIntentDescription}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {copy.searchIntents.map((item) => (
              <MotionCard key={item.title} className="rounded-[28px] border-white/10 bg-[#0a1d43]/75 p-6 text-white">
                <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
                  {locale === "en" ? "Search intent" : "Intention de recherche"}
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{item.description}</p>
              </MotionCard>
            ))}
          </div>
        </section>

        <section id="candidature" className="scroll-mt-32 pt-20">
          <SectionHeader
            eyebrow={copy.applicationEyebrow}
            title={copy.applicationTitle}
            description={copy.applicationDescription}
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-[0.9fr,1.1fr]">
            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold">{copy.beforeTitle}</h2>
              <ul className="mt-6 space-y-4 text-sm text-white/80">
                {copy.beforeItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={`mailto:${siteConfig.email}?subject=Candidature%20tuteur%20-%20Méthode%20Secondaire`}>
                    {copy.byEmail}
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath("temoignages", locale)}>{copy.seeTestimonials}</Link>
                </Button>
              </div>
            </MotionCard>

            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">{copy.formCandidate}</div>
              <h2 className="mt-3 font-display text-3xl font-semibold">{copy.formTitle}</h2>
              <div className="mt-6">
                <TutorApplicationForm copy={copy} />
              </div>
            </MotionCard>
          </div>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={copy.faqEyebrow}
            title={copy.faqTitle}
            description={copy.faqDescription}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {copy.faqItems.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {copy.finalBadge}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{copy.finalTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.finalText}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href="#candidature">{copy.finalPrimary}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
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

function FaqItem({ question, answer }) {
  return (
    <MotionCard className="glass-panel rounded-[28px] border-white/10 bg-white/[0.05] p-6 text-white">
      <h2 className="font-display text-2xl font-semibold">{question}</h2>
      <p className="mt-4 text-sm leading-7 text-white/72">{answer}</p>
    </MotionCard>
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
