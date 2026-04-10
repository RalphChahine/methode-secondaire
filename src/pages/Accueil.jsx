import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Calculator,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  FlaskConical,
  GraduationCap,
  LineChart,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import BookingEmbed from "@/components/BookingEmbed"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BOOKING_URL } from "@/config/booking"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

const heroStats = [
  { label: "Niveaux couverts", value: "Secondaire 1 à 5" },
  { label: "Formats", value: "En ligne ou présentiel" },
  { label: "Objectif", value: "Comprendre, pratiquer, réussir" },
]

const trustSignals = [
  {
    icon: Target,
    title: "Diagnostic pédagogique clair",
    description:
      "Le besoin est cadré selon la matière, le niveau, l'urgence et le vrai point de blocage, pas au hasard.",
  },
  {
    icon: Users,
    title: "Jumelage pensé pour le bon fit",
    description:
      "On met l'accent sur la pédagogie, le ton et le type d'accompagnement attendu, pas seulement sur la prochaine disponibilité.",
  },
  {
    icon: ShieldCheck,
    title: "Progression plus lisible",
    description:
      "L'objectif est que le parent comprenne où l'élève progresse, ce qu'on travaille et pourquoi ça va dans la bonne direction.",
  },
]

const pillars = [
  {
    icon: BrainCircuit,
    title: "Clarté immédiate",
    description:
      "On simplifie la matière sans la vider de son sens. L'élève comprend ce qu'il fait et pourquoi il le fait.",
  },
  {
    icon: Target,
    title: "Méthode réutilisable",
    description:
      "On construit une vraie façon de résoudre, de relire et de s'organiser pour que les progrès restent après la séance.",
  },
  {
    icon: TrendingUp,
    title: "Progression visible",
    description:
      "On cible les blocages importants, on pratique ce qui compte, et on avance avec un cap beaucoup plus net.",
  },
]

const subjectCards = [
  {
    title: "Mathématiques",
    icon: Calculator,
    to: "/maths",
    description:
      "Algèbre, fonctions, géométrie, trigonométrie et préparation aux examens avec une méthode simple à appliquer.",
    bullets: ["Résolution d'équations", "Lecture des problèmes", "Examens ministériels"],
  },
  {
    title: "Sciences",
    icon: FlaskConical,
    to: "/sciences",
    description:
      "Physique, chimie, électricité et analyse de laboratoire pour transformer la matière en logique claire.",
    bullets: ["Concepts et formules", "Questions à développement", "Labos et révision ciblée"],
  },
]

const workflow = [
  {
    step: "01",
    title: "Diagnostiquer vite",
    description:
      "On repère ce qui bloque vraiment: notions floues, erreurs de méthode, manque de confiance ou préparation d'examen.",
  },
  {
    step: "02",
    title: "Expliquer avec précision",
    description:
      "On remet les concepts dans le bon ordre avec des exemples courts, visuels et mémorables.",
  },
  {
    step: "03",
    title: "Pratiquer de façon ciblée",
    description:
      "On choisit les exercices qui font progresser, pas juste ceux qui remplissent le temps.",
  },
  {
    step: "04",
    title: "Consolider pour la semaine",
    description:
      "Chaque séance laisse un plan clair pour continuer sans repartir à zéro au prochain cours.",
  },
]

const situations = [
  {
    icon: GraduationCap,
    title: "Avant un examen important",
    description: "Quand il faut remettre les idées en place rapidement et retrouver une vraie confiance.",
  },
  {
    icon: NotebookPen,
    title: "Quand la matière s'accumule",
    description: "Pour reprendre les bases, clarifier les notions et éviter que les retards deviennent lourds.",
  },
  {
    icon: ShieldCheck,
    title: "Quand l'élève comprend mal en classe",
    description: "On reformule, on recadre et on trouve l'explication qui finit par cliquer.",
  },
  {
    icon: Sparkles,
    title: "Quand on veut passer un cap",
    description: "Pour gagner en autonomie, viser plus haut et rendre les devoirs beaucoup moins stressants.",
  },
]

const representativeStories = [
  {
    title: "D'un échec à 92 % en maths",
    description:
      "Un type de retour qu'on entend souvent: la note remonte fort, mais la vraie différence vient de la méthode qui reste après la séance.",
    points: ["Déclic rapide", "Méthode durable", "Confiance retrouvée"],
    icon: LineChart,
  },
  {
    title: "Vous avez sauvé son année",
    description:
      "Quand la matière semblait trop loin, certaines familles parlent d'un vrai tournant dans l'année scolaire et dans l'attitude de l'élève.",
    points: ["Retard rattrapé", "Cap plus clair", "Stress qui baisse nettement"],
    icon: FlaskConical,
  },
  {
    title: "Enfin de la confiance avant les examens",
    description:
      "Le changement le plus marquant n'est pas toujours la note: c'est souvent le calme retrouvé, la logique qui clique et l'autonomie qui revient.",
    points: ["Examen mieux abordé", "Compréhension plus nette", "Maison plus sereine"],
    icon: BrainCircuit,
  },
]

const hiringHighlights = [
  {
    icon: Users,
    title: "Profils solides et humains",
    description: "La page présente clairement le type de tuteurs recherchés: solides, pédagogues et fiables.",
  },
  {
    icon: GraduationCap,
    title: "Standard pédagogique clair",
    description: "Les attentes sont formulées avec sérieux: clarté d'explication, professionnalisme et qualité de suivi.",
  },
  {
    icon: Sparkles,
    title: "Candidature simple et pro",
    description: "Le parcours de recrutement est visible, rassurant et prêt à soutenir une vraie croissance de l'équipe.",
  },
]

const pricing = [
  {
    title: "Séance flexible",
    price: "75 $ / h",
    accent: "Idéal pour une révision ponctuelle ou un besoin précis.",
    bullets: ["Réservation au besoin", "Maths ou sciences", "En ligne ou présentiel"],
  },
  {
    title: "Suivi hebdomadaire",
    price: "70 $ / h",
    accent: "La formule la plus efficace pour bâtir une progression durable.",
    bullets: ["Créneau régulier", "Suivi clair", "Excellente option pendant l'année"],
    highlight: true,
  },
  {
    title: "Bloc intensif",
    price: "Sur demande",
    accent: "Pour une période courte avant examens, reprise de matière ou remise à niveau.",
    bullets: ["Plan serré", "Priorités bien ciblées", "Format adaptable"],
  },
]

const faqItems = [
  {
    question: "Le tutorat est-il seulement pour les élèves en difficulté ?",
    answer:
      "Non. Le suivi aide autant à débloquer une matière difficile qu'à consolider une bonne base, préparer un examen ou viser un meilleur rendement.",
  },
  {
    question: "Travaillez-vous seulement en ligne ?",
    answer:
      "Les deux formats sont possibles. Le service est offert en ligne partout au Québec, avec disponibilité en présentiel selon le secteur.",
  },
  {
    question: "Faites-vous des suivis avant les examens ministériels ?",
    answer:
      "Oui. On peut monter un plan de révision ciblé, revoir les notions prioritaires, faire des exercices type examen et travailler la gestion du temps.",
  },
  {
    question: "Quels niveaux sont couverts ?",
    answer:
      "Le tutorat couvre le secondaire 1 à 5 en mathématiques et en sciences, avec une approche alignée sur le programme du Québec.",
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
    description:
      "Tutorat privé en mathématiques et en sciences pour les élèves du secondaire au Québec.",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Québec" },
      { "@type": "City", name: "Montréal" },
      { "@type": "City", name: "Laval" },
    ],
    sameAs: [BOOKING_URL],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tutorat secondaire en mathématiques et sciences",
    serviceType: "Tutorat privé pour élèves du secondaire",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Québec" },
      { "@type": "City", name: "Montréal" },
      { "@type": "City", name: "Laval" },
    ],
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      telephone: siteConfig.phone,
      email: siteConfig.email,
    },
    offers: pricing.map((plan) => ({
      "@type": "Offer",
      name: plan.title,
      priceCurrency: "CAD",
      description: plan.accent,
      ...(plan.price.includes("$") ? { price: plan.price.replace(/[^0-9]/g, "") } : {}),
    })),
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
        title="Méthode Secondaire | Tutorat en maths et sciences au secondaire"
        description="Tutorat privé en mathématiques et en sciences pour le secondaire 1 à 5 au Québec. Révision claire, méthode structurée, réservation simple."
        path="/"
        keywords="tutorat maths secondaire, tutorat sciences secondaire, cours privés mathématiques Québec, soutien scolaire secondaire Montréal, préparation examens ministériels"
        jsonLd={homeSchemas}
        lang={getHtmlLang("fr")}
        locale={getOgLocale("fr")}
        alternateLocale={getAlternateOgLocale("fr")}
        alternates={buildAlternates("home")}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="mesh-background absolute inset-0 opacity-[0.12]" />
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#7ab4ff]/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#f5c977]/14 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-[#4a8bff]/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
        <section className="scroll-mt-32">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]"
          >
            <div className="max-w-3xl">
              <motion.div variants={item} className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
                  Québec • Secondaire 1 à 5
                </Badge>
                <span className="text-sm text-white/65">Maths, sciences et préparation d'examens</span>
              </motion.div>

              <motion.h1
                variants={item}
                className="balanced-copy mt-7 max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl"
              >
                Le tutorat qui remet les idées en place,
                <span className="text-shine"> la méthode en marche</span>
                <span className="block text-white/80">et la confiance du bon côté.</span>
              </motion.h1>

              <motion.p
                variants={item}
                className="balanced-copy mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl"
              >
                Méthode Secondaire aide les élèves du secondaire à mieux comprendre les maths et les
                sciences, à pratiquer intelligemment et à arriver prêts aux évaluations, sans rester
                bloqués dans le flou ou le stress.
              </motion.p>

              <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] shadow-[0_18px_45px_rgba(245,201,119,0.28)] hover:bg-[#f7d38f]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Réserver une première séance
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                  onClick={() => document.getElementById("methode")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Voir la méthode
                </Button>
              </motion.div>

              <motion.div variants={item} className="mt-10 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="glass-panel rounded-[24px] px-4 py-4 text-left">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/45">{stat.label}</div>
                    <div className="mt-2 text-sm font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={item} className="relative">
              <div className="glass-panel section-frame relative overflow-hidden rounded-[34px] p-6 sm:p-8">
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm uppercase tracking-[0.24em] text-white/45">Une séance type</div>
                    <div className="mt-2 font-display text-3xl font-semibold text-white">
                      Clair, ciblé, rassurant
                    </div>
                  </div>
                  <div className="rounded-full border border-[#f5c977]/30 bg-[#f5c977]/12 px-4 py-2 text-sm text-[#f8deb0]">
                    Réponse rapide
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    "On identifie les notions floues et les erreurs qui reviennent.",
                    "On réexplique avec une logique simple et mémorable.",
                    "On pratique avec des exercices vraiment utiles.",
                    "On termine avec un plan clair pour la suite.",
                  ].map((step) => (
                    <div
                      key={step}
                      className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                    >
                      <div className="mt-1 rounded-full bg-[#f5c977] p-1.5 text-[#071631]">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-sm leading-7 text-white/78">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-[#0b214d]/80 p-5">
                    <div className="flex items-center gap-2 text-sm text-white/55">
                      <CalendarDays className="h-4 w-4 text-[#f5c977]" />
                      Réservation simple
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white">Calendrier en ligne</div>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      Choix rapide du créneau, sans allers-retours compliqués.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-sm text-white/55">
                      <MapPin className="h-4 w-4 text-[#f5c977]" />
                      Format flexible
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white">En ligne ou en présentiel</div>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      Partout au Québec en ligne, avec présence possible selon le secteur.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          className="scroll-mt-32 pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="Confiance dès le départ"
            title="Un cadre sérieux avant même la première séance"
            description="Les familles ont besoin de sentir rapidement comment le besoin est cadré, comment le bon fit est trouvé et comment la progression va être rendue lisible."
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.05fr,0.95fr]">
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
              {trustSignals.map((signal) => (
                <MotionCard key={signal.title} className="glass-panel rounded-[28px] border-white/10 bg-white/[0.04] p-6 text-white">
                  <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                    <signal.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">{signal.description}</p>
                </MotionCard>
              ))}
            </div>

            <MotionCard className="rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">Premier échange</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">Ce qu'un parent veut savoir tout de suite</h3>
              <div className="mt-6 space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  Quelle matière doit être reprise en priorité
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  Si le besoin est ponctuel, hebdomadaire ou orienté examen
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  Quel type d'accompagnement aidera le plus vite et le plus durablement
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Réserver un premier échange
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath("tuteurs", "fr")}>Voir les critères de matching</Link>
                </Button>
              </div>
            </MotionCard>
          </div>
        </motion.section>

        <motion.section
          id="methode"
          className="scroll-mt-32 pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="Pourquoi ça fonctionne"
            title="Une méthode pensée pour faire baisser le stress et monter la maîtrise"
            description="Le but n'est pas seulement de passer au travers d'un exercice. Le but, c'est que l'élève sache quoi faire quand il sera seul devant la prochaine question."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <MotionCard
                key={pillar.title}
                className="glass-panel rounded-[30px] border-white/10 bg-white/[0.04] p-7 text-white"
              >
                <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{pillar.description}</p>
              </MotionCard>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="scroll-mt-32 pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="Par matière"
            title="Deux expertises principales pour orienter les familles rapidement"
            description="Maths et sciences ont maintenant leur propre vitrine pour rendre le parcours plus clair dès la première visite."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {subjectCards.map((subject) => (
              <MotionCard key={subject.title} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
                <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                  <subject.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold">{subject.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{subject.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  {subject.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="mt-8 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={subject.to}>
                    Voir la page
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </MotionCard>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="scroll-mt-32 pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="Parcours de séance"
            title="Une progression simple à suivre, même quand la matière semble dense"
            description="Chaque étape sert à réduire la confusion et à remettre l'élève en position de réussite."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {workflow.map((step) => (
              <MotionCard
                key={step.step}
                className="rounded-[28px] border-white/10 bg-[#0a1d43]/75 p-6 text-white"
              >
                <div className="text-sm uppercase tracking-[0.26em] text-[#f5c977]">Étape {step.step}</div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{step.description}</p>
              </MotionCard>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="scroll-mt-32 pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="Témoignages"
            title="Des parents qui parlent de déclic, de confiance retrouvée et parfois même d'une année sauvée"
            description="Quelques retours présentés de façon anonymisée pour montrer ce que les familles ressentent quand les résultats commencent vraiment à changer."
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {representativeStories.map((story) => (
              <MotionCard key={story.title} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
                <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                  <story.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{story.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/72">{story.description}</p>

                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  {story.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </MotionCard>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/temoignages">
                Voir tous les témoignages
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.section>

        <motion.section
          className="scroll-mt-32 pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="Tuteurs et matching"
            title="Une vitrine plus claire pour montrer le calibre d'accompagnement proposé"
            description="Les familles peuvent maintenant voir plus facilement le type de profils, de standards et de matching derrière la marque."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="grid gap-4">
              {hiringHighlights.map((highlight) => (
                <MotionCard key={highlight.title} className="glass-panel rounded-[28px] border-white/10 bg-white/[0.04] p-6 text-white">
                  <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                    <highlight.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{highlight.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">{highlight.description}</p>
                </MotionCard>
              ))}
            </div>

            <MotionCard className="rounded-[32px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">Nouvelle page</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">Tuteurs et spécialités</h3>
              <p className="mt-3 text-sm leading-7 text-white/75">
                Une page dédiée présente maintenant le type de profils, de spécialités et de matching que
                Méthode Secondaire veut offrir aux familles.
              </p>

              <div className="mt-6 space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  Spécialités par niveau et par besoin
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  Standards pédagogiques clairement visibles
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  Lien direct avec les témoignages et la réservation
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                >
                  <Link to={getLocalizedPath("tuteurs", "fr")}>
                    Découvrir la page tuteurs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath("devenirTuteur", "fr")}>Devenir tuteur</Link>
                </Button>
              </div>
            </MotionCard>
          </div>
        </motion.section>

        <motion.section
          id="tarifs"
          className="scroll-mt-32 pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="Tarifs"
            title="Des formules simples pour avancer au bon rythme"
            description="Le suivi hebdomadaire est généralement la meilleure option pour garder une progression régulière et beaucoup moins de stress entre les séances."
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {pricing.map((plan) => (
              <MotionCard
                key={plan.title}
                className={`rounded-[32px] p-7 text-white ${
                  plan.highlight
                    ? "border-[#f5c977]/35 bg-[linear-gradient(180deg,rgba(245,201,119,0.18),rgba(255,255,255,0.08))]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-display text-2xl font-semibold">{plan.title}</div>
                  {plan.highlight && (
                    <Badge className="rounded-full border-0 bg-[#f5c977] px-3 py-1 text-[#071631] hover:bg-[#f5c977]">
                      Recommandé
                    </Badge>
                  )}
                </div>

                <div className="mt-5 font-display text-5xl font-semibold">{plan.price}</div>
                <p className="mt-4 text-sm leading-7 text-white/72">{plan.accent}</p>

                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`mt-8 w-full rounded-full py-6 ${
                    plan.highlight
                      ? "bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                      : "bg-white/8 text-white hover:bg-white/12"
                  }`}
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Choisir cette formule
                  </a>
                </Button>
              </MotionCard>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="faq"
          className="scroll-mt-32 pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="FAQ"
            title="Les questions qu'on se pose souvent avant de réserver"
            description="Tout est pensé pour rendre la prise de contact simple, rapide et rassurante."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faqItems.map((faq) => (
              <details
                key={faq.question}
                className="glass-panel rounded-[28px] border border-white/10 px-6 py-5 text-white"
              >
                <summary className="cursor-pointer list-none font-display text-xl font-semibold">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-white/72">{faq.answer}</p>
              </details>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="scroll-mt-32 pt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeader
            eyebrow="Contact et réservation"
            title="Réserver doit être la partie la plus simple du processus"
            description="Par téléphone, par email, via le formulaire ou directement avec le calendrier en ligne."
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-[0.95fr,1.05fr]">
            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">Prendre contact</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">Rapide, simple, sans friction</h3>

              <div className="mt-7 space-y-4">
                <ContactLine icon={Phone} href="tel:+15149520709" label="+1 (514) 952-0709" />
                <ContactLine
                  icon={Mail}
                  href="mailto:chahineralph@gmail.com"
                  label="chahineralph@gmail.com"
                />
                <ContactLine icon={MapPin} label="En ligne partout au Québec, présentiel selon le secteur" />
                <ContactLine icon={Clock3} label="Réponse rapide et réservation facile" />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] py-6 text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Réserver
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 py-6 text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="tel:+15149520709">Appeler</a>
                </Button>
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-[#0b214d]/80 p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-white/45">Bon à savoir</div>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  Le suivi hebdomadaire donne souvent les meilleurs résultats: moins d'accumulation,
                  plus de structure et beaucoup moins de panique avant les évaluations.
                </p>
              </div>
            </MotionCard>

            <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
              <div className="text-sm uppercase tracking-[0.24em] text-white/45">Formulaire</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">Décrire le besoin en une minute</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Indiquez le niveau, la matière et le contexte. Une réponse rapide suit.
              </p>

              <div className="mt-6">
                <ContactForm />
              </div>
            </MotionCard>
          </div>

          <div className="mt-6">
            <BookingEmbed title="Réserver une séance avec Méthode Secondaire" />
          </div>
        </motion.section>
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

function ContactLine({ icon: Icon, href, label }) {
  const content = (
    <>
      <div className="rounded-2xl bg-white/10 p-3 text-[#f5c977]">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm text-white/80">{label}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 transition hover:bg-white/10"
      >
        {content}
      </a>
    )
  }

  return (
    <div className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
      {content}
    </div>
  )
}

function ContactForm() {
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
          <Check className="h-5 w-5" />
        </div>
        <div className="mt-5 font-display text-3xl font-semibold text-white">Message envoyé</div>
        <p className="mt-3 text-sm leading-7 text-white/72">
          La demande a bien été transmise. Une réponse rapide suit.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={() => setStatus("idle")}
        >
          Envoyer un autre message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Nom">
        <Input
          name="nom"
          required
          className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder="Nom de l'élève ou du parent"
        />
      </Field>

      <Field label="Email">
        <Input
          name="email"
          type="email"
          required
          className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder="adresse@email.com"
        />
      </Field>

      <Field label="Niveau et matière">
        <Input
          name="sujet"
          required
          className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder="Ex. secondaire 4 maths ou secondaire 5 sciences"
        />
      </Field>

      <Field label="Message">
        <Textarea
          name="message"
          required
          className="min-h-[140px] rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder="Décrivez brièvement la situation ou l'objectif."
        />
      </Field>

      <input type="hidden" name="_subject" value="Nouvelle demande - Méthode Secondaire" />
      <input type="hidden" name="_template" value="table" />

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[#f5c977] py-6 text-[#071631] hover:bg-[#f7d38f]"
      >
        {status === "sending" ? "Envoi en cours..." : "Envoyer la demande"}
      </Button>

      {status === "error" && (
        <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Une erreur est survenue pendant l'envoi. Vous pouvez réessayer ou contacter directement par
          téléphone ou par email.
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
