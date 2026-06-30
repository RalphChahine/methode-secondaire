import {
  ArrowRight,
  BrainCircuit,
  Calculator,
  CalendarDays,
  FlaskConical,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react"
import { Link } from "react-router-dom"

import { VerifiedReviewsSection } from "@/components/ConversionSections"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import {
  ComparisonSplit,
  ContactSection,
  FaqGrid,
  FeatureGrid,
  FinalCtaSection,
  HeroShowcase,
  PricingGrid,
  StepGrid,
} from "@/components/SimpleMarketingSections"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { buildAlternates, getAlternateOgLocale, getHtmlLang, getOgLocale, getLocalizedPath } from "@/lib/i18n"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const stats = [
  { label: "Niveaux", value: "Secondaire 1 à 5" },
  { label: "Formats", value: "Maths, sciences, suivi et examens" },
  { label: "Réponse", value: "Sous 24 h ouvrables" },
]

const trustItems = [
  {
    icon: BrainCircuit,
    title: "On clarifie vite ce qui bloque vraiment",
    description:
      "Chapitre, méthode, stress, examen ou perte de rythme: on met un nom précis sur le besoin avant de proposer une suite.",
  },
  {
    icon: ShieldCheck,
    title: "Le parent sait à quoi s'attendre",
    description:
      "Format recommandé, cadence, matière prioritaire et prochain pas: le cadre reste lisible dès le départ.",
  },
  {
    icon: Target,
    title: "L'élève avance avec plus de constance",
    description:
      "On vise moins de flou, plus de méthode et une progression qu'on peut réellement sentir d'une semaine à l'autre.",
  },
]

const steps = [
  {
    step: "01",
    title: "Vous nous dites où ça bloque",
    description:
      "Matière, niveau, examen, retard, perte de confiance ou besoin hebdomadaire: on part de la situation réelle, pas d'un formulaire abstrait.",
  },
  {
    step: "02",
    title: "On recommande le bon format",
    description:
      "Séance ciblée, sprint avant examen ou suivi hebdomadaire: on oriente vers le cadre le plus utile avant de faire perdre du temps à la famille.",
  },
  {
    step: "03",
    title: "L'élève repart avec un plan plus clair",
    description:
      "On remet la matière en ordre, on travaille ce qui compte et la famille voit enfin une direction simple, crédible et rassurante.",
  },
]

const offerCards = [
  {
    icon: Calculator,
    title: "Maths secondaires",
    description:
      "Algèbre, fonctions, géométrie, trigonométrie et préparation d'examens avec une méthode simple à réutiliser.",
    bullets: ["Algèbre, fonctions et géométrie", "Secondaire 1 à 5", "Quand la matière commence à peser lourd"],
    action: {
      label: "Explorer la page maths",
      to: getLocalizedPath("maths", "fr"),
      trailing: true,
    },
  },
  {
    icon: FlaskConical,
    title: "Sciences secondaires",
    description:
      "Physique, chimie, laboratoires et réponses longues expliqués avec plus de logique et beaucoup moins de confusion.",
    bullets: ["Physique, chimie et labos", "Logique et réponses longues", "Utile avant examens ou retards"],
    action: {
      label: "Explorer la page sciences",
      to: getLocalizedPath("sciences", "fr"),
      trailing: true,
    },
  },
  {
    icon: Sparkles,
    title: "Sprint examen",
    description:
      "Le bon format quand le temps manque et qu'il faut reprendre le contrôle avant qu'un examen arrive trop vite.",
    bullets: ["Révision ciblée", "Priorités claires", "Quand l'échéance approche vite"],
    action: {
      label: "Voir le sprint examen",
      to: getLocalizedPath("examSprint", "fr"),
      trailing: true,
    },
  },
]

const plans = [
  {
    title: "Séance ponctuelle",
    price: "75 $ / h",
    description: "Le bon choix pour un besoin urgent, un chapitre précis ou une révision ciblée.",
    bullets: ["Réservation directe", "Maths ou sciences", "En ligne ou présentiel"],
    action: {
      label: "Réserver maintenant",
      href: BOOKING_URL,
      external: true,
    },
  },
  {
    title: "Suivi hebdomadaire",
    price: "70 $ / h",
    description: "Le format le plus fort quand il faut bâtir de la stabilité et de la progression semaine après semaine.",
    bullets: ["Appel recommandé d'abord", "Créneau régulier", "Excellent pour l'année scolaire"],
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
    description: "Pour un rattrapage serré, une reprise ciblée ou une période lourde avant examens.",
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

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
        <HeroShowcase
          badge="Québec • Secondaire 1 à 5"
          title="Le tutorat privé qui remet du calme, de la méthode et de l'élan dans la semaine."
          description="Maths, sciences, préparation d'examens et suivi hebdomadaire pour les élèves du secondaire au Québec. On aide la famille à comprendre le besoin, choisir le bon format et avancer avec plus de confiance."
          primaryAction={{
            label: "Appeler pour clarifier le besoin",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          secondaryAction={{
            label: "Réserver une première séance",
            href: BOOKING_URL,
            external: true,
            icon: CalendarDays,
          }}
          stats={stats}
          panelEyebrow="Quand les parents nous appellent"
          panelTitle="Les situations où l'on aide le plus"
          panelItems={[
            "Quand les notions s'accumulent et que l'élève ne sait plus par où reprendre.",
            "Quand un examen approche et que la révision manque de structure.",
            "Quand il faut un suivi régulier pour retrouver du rythme et de la confiance.",
          ]}
          panelNote="Le premier rôle de Méthode Secondaire est de cadrer la situation rapidement, puis de recommander la bonne suite: séance ciblée, sprint examen ou suivi hebdomadaire."
        />

        <FeatureGrid
          eyebrow="Pourquoi les familles choisissent ce cadre"
          title="Un accompagnement plus clair du premier appel au premier vrai progrès"
          description="Pas de parcours générique, pas de choix flou entre dix profils. On guide la famille vers la bonne matière, le bon format et le bon rythme."
          items={trustItems}
        />

        <ComparisonSplit
          eyebrow="Pourquoi ça change tout"
          title="Un accompagnement cadré vaut mieux qu'un tutorat improvisé"
          description="Quand le besoin est bien défini dès le départ, le parent perd moins de temps et l'élève avance avec plus de constance."
          leftTitle="Tutorat générique"
          leftPoints={[
            "On réserve sans vraiment savoir si le format est le bon.",
            "Le suivi dépend surtout de l'initiative du parent.",
            "L'élève peut comprendre sur le moment sans retrouver une vraie méthode.",
          ]}
          rightTitle="Méthode Secondaire"
          rightPoints={[
            "On clarifie d'abord la matière, l'urgence et le type de blocage.",
            "On recommande une séance ciblée ou un suivi selon le besoin réel.",
            "La progression reste plus lisible pour la famille d'une rencontre à l'autre.",
          ]}
        />

        <StepGrid
          id="processus"
          eyebrow="Comment ça marche"
          title="Un parcours simple en 3 étapes"
          description="Le parent a besoin d'aller vite, et l'élève a besoin d'un cadre utile dès le départ."
          steps={steps}
        />

        <section id="offres" className="pt-20">
          <div className="section-shell noise-overlay px-6 py-7 sm:px-8 sm:py-8">
            <div className="grid gap-8 lg:grid-cols-[1.02fr,0.98fr]">
              <div className="relative z-10">
                <div className="rule-label text-[0.68rem]">Format principal</div>
                <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold leading-[0.95] text-white sm:text-5xl">
                  Le suivi hebdomadaire quand il faut bâtir quelque chose de stable.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                  Quand le problème revient chaque semaine, le bon réflexe n'est pas toujours une séance isolée.
                  Le suivi régulier est souvent le meilleur cadre pour remettre la matière, la méthode et le rythme
                  en ordre.
                </p>

                <div className="panel-gold mt-8 rounded-[32px] px-6 py-6 text-white sm:px-7 sm:py-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="rule-label text-[0.68rem]">Suivi recommandé</div>
                      <h3 className="mt-3 font-display text-3xl font-semibold">Suivi hebdomadaire</h3>
                    </div>
                    <div className="rounded-full bg-[#f5c977] px-4 py-1.5 text-sm font-semibold text-[#071631]">
                      70 $ / h
                    </div>
                  </div>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82">
                    Le bon format quand il faut bâtir une progression durable, calmer les semaines plus lourdes et
                    remettre de la structure dans la matière.
                  </p>

                  <ul className="mt-5 space-y-3 text-sm text-white/84">
                    {[
                      "On commence souvent par un court appel pour comprendre le niveau, la matière prioritaire et le bon rythme.",
                      "Le suivi convient bien aux élèves qui ont besoin de structure durable, pas seulement d'un coup de pouce ponctuel.",
                      "La famille voit plus clairement ce qui s'améliore d'une semaine à l'autre.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#071631]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild className="rounded-full bg-[#071631] px-6 py-6 text-base text-white hover:bg-[#0b2048]">
                      <a href={`tel:${siteConfig.phone}`}>
                        <Phone className="h-4 w-4" />
                        Appeler pour en parler
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-[#071631]/15 bg-white/70 px-6 py-6 text-base text-[#071631] hover:bg-white"
                    >
                      <Link to={getLocalizedPath("weeklyFollowUp", "fr")}>
                        Voir la page dédiée
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="rule-label text-[0.68rem]">Autres formats</div>
                <h3 className="balanced-copy mt-4 font-display text-3xl font-semibold text-white">
                  Des portes d'entrée simples selon la situation
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                  Si le besoin est plus ciblé, la famille peut aussi commencer par une page matière ou par un format
                  plus urgent.
                </p>

                <div className="mt-6 grid gap-4">
                  {offerCards.map((item, index) => (
                    <MotionCard
                      key={item.title}
                      className={`rounded-[30px] p-6 text-white sm:p-7 ${
                        index === 1 ? "panel-gold" : "panel-soft"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="text-xs uppercase tracking-[0.24em] text-white/42">{`0${index + 1}`}</div>
                      </div>

                      <h4 className="balanced-copy mt-5 font-display text-2xl font-semibold">{item.title}</h4>
                      <p className="mt-3 text-sm leading-7 text-white/74">{item.description}</p>

                      <ul className="mt-5 space-y-3 text-sm text-white/82">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        >
                          <Link to={item.action.to}>
                            {item.action.label}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </MotionCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <PricingGrid
          eyebrow="Tarifs"
          title="Des tarifs simples à comprendre"
          description="Le parent voit vite quel format correspond à la situation, sans avoir à décoder une offre compliquée."
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
          title="Décrivez le besoin en une minute"
          description="Dites-nous la matière, le niveau et ce qui inquiète le plus. On vous orientera vers le format le plus utile sans compliquer la démarche."
          bullets={[
            "Mentionnez la matière, le niveau et ce qui bloque le plus.",
            "Si un examen approche, dites-le dès le départ.",
            "Pour un suivi hebdomadaire, l'appel reste souvent le meilleur premier réflexe.",
          ]}
          pageName="home-fr"
        />

        <FinalCtaSection
          badge="Maths • Sciences • Suivi • Québec"
          title="Le bon premier pas dépend surtout du besoin d'aujourd'hui."
          description="Si la situation est claire, une séance ciblée peut suffire. Si tout revient chaque semaine, on peut cadrer un suivi plus durable dès maintenant."
          primaryAction={{
            label: "Appeler maintenant",
            href: `tel:${siteConfig.phone}`,
            icon: Phone,
          }}
          secondaryAction={{
            label: "Réserver une séance",
            href: BOOKING_URL,
            external: true,
            icon: CalendarDays,
          }}
        />
      </main>
    </div>
  )
}
