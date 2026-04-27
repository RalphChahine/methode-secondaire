import { BadgeCheck, BrainCircuit, Clock3, LineChart, ShieldCheck, Sparkles, Target, Users } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Badge } from "@/components/ui/badge"

const iconMap = {
  spark: Sparkles,
  target: Target,
  method: BrainCircuit,
  trust: ShieldCheck,
  progress: LineChart,
  parent: Users,
  time: Clock3,
}

const copyByLocale = {
  fr: {
    premiumEyebrow: "Mini études de cas",
    premiumTitle: "Des cas premium qui montrent ce qu'un parent paie vraiment",
    premiumDescription:
      "Quand une famille accepte de payer davantage, ce n'est pas pour acheter une heure plus jolie. C'est pour réduire le flou plus vite, éviter les mauvais détours et installer une progression plus lisible.",
    studies: [
      {
        badge: "Secondaire 4 • Maths SN",
        title: "Avant: l'élève travaille, mais n'assemble jamais la bonne démarche au complet.",
        situation:
          "Le parent voit un adolescent sérieux, mais qui mélange les étapes dès qu'un problème demande lecture, équation et vérification dans le même exercice.",
        blockage:
          "Le vrai blocage n'est pas seulement une notion manquée. C'est l'absence d'une structure mentale stable quand la question devient moins directe.",
        intervention:
          "On recentre le travail sur la méthode: comment entrer dans la question, quoi isoler d'abord, quoi vérifier ensuite et comment éviter de repartir à zéro à chaque tentative.",
        result:
          "Le parent sent rapidement que l'élève hésite moins, recommence moins à l'aveugle et récupère une forme de contrôle qui manquait depuis des semaines.",
        format: "Format recommandé: Suivi hebdomadaire si la confusion revient chaque semaine, sinon remise à niveau ciblée.",
      },
      {
        badge: "Urgence • Sciences",
        title: "Avant: la famille révise partout à la fois parce que l'examen approche.",
        situation:
          "Le parent arrive avec une date, plusieurs chapitres ouverts en même temps et une vraie peur de perdre du temps dans la mauvaise direction.",
        blockage:
          "Le vrai danger ici, ce n'est pas le manque de bonne volonté. C'est une révision trop large qui consomme l'énergie sans augmenter la clarté.",
        intervention:
          "On utilise le Sprint examen pour faire le tri: notions qui peuvent encore bouger vite, erreurs les plus coûteuses, formats de questions à prioriser et éléments à laisser de côté pour sauver l'essentiel.",
        result:
          "La famille repart avec un plan crédible, plus de calme et une impression nette que les prochains jours ont enfin une logique.",
        format: "Format recommandé: Sprint examen avec appel rapide d'abord si l'urgence est élevée mais encore floue.",
      },
      {
        badge: "Progression durable • Secondaire 2 à 5",
        title: "Avant: les difficultés reviennent sans cesse, même après quelques bonnes séances isolées.",
        situation:
          "Le parent n'est pas face à un crash spectaculaire, mais à une fatigue répétée: devoirs plus lents, notions qui ne restent pas et stress qui revient avant chaque évaluation.",
        blockage:
          "Ce qui coûte cher ici, c'est de traiter chaque semaine comme une urgence séparée au lieu d'installer une continuité.",
        intervention:
          "On cadre un suivi régulier où la matière prioritaire, le rythme et les attentes sont clarifiés d'avance. Le parent ne paie plus pour improviser; il paie pour arrêter d'improviser.",
        result:
          "Le changement visible est une maison plus calme, une progression plus lisible et des décisions plus simples parce que le travail n'est plus morcelé.",
        format: "Format recommandé: Suivi hebdomadaire avec appel de cadrage avant toute réservation.",
      },
    ],
    whyEyebrow: "Pourquoi payer plus",
    whyTitle: "Ce qui distingue Méthode Secondaire des sites plus larges au Québec",
    whyDescription:
      "Beaucoup de services mettent surtout en avant le volume: tous niveaux, toutes matières, grand nombre de tuteurs, jumelage rapide. Ici, l'angle est plus resserré et plus stratégique pour les familles du secondaire.",
    differentiators: [
      {
        icon: "target",
        title: "Secondaire d'abord, pas marché généraliste",
        description:
          "Le site parle au parent du secondaire 1 à 5 avec des pages, des offres et des cas qui collent au vrai moment vécu: examen, retard, stabilité, SN4, chimie, physique.",
      },
      {
        icon: "method",
        title: "On vend une méthode claire avant de vendre des heures",
        description:
          "Le diagnostic, la distinction appel vs réservation et les offres par besoin montrent une direction. Le parent sent plus vite quel format est logique pour son enfant.",
      },
      {
        icon: "parent",
        title: "La valeur est rendue visible pour le parent",
        description:
          "Le site ne parle pas seulement à l'élève. Il aide aussi le parent à comprendre ce qui bloque, comment on avance et quand un suivi régulier devient plus intelligent qu'une séance isolée.",
      },
      {
        icon: "trust",
        title: "Moins de promesses vagues, plus de repères concrets",
        description:
          "Cas types, témoignages, offres nommées, pages locales, pages matière: l'ensemble donne une impression de précision plutôt qu'un simple formulaire de prise de contact.",
      },
    ],
    compareTitle: "Pourquoi certains parents accepteraient de payer plus ici",
    compareRows: [
      {
        left: "Ils veulent éviter de perdre 2 ou 3 semaines dans le mauvais format.",
        right: "Méthode Secondaire rend le choix plus clair: appel d'abord pour un vrai suivi, réservation directe pour un besoin ciblé ou urgent.",
      },
      {
        left: "Ils veulent une matière qui devient lisible, pas seulement de l'aide aux devoirs.",
        right: "Le positionnement insiste sur la logique, la méthode et la préparation réelle, surtout en maths et en sciences.",
      },
      {
        left: "Ils veulent sentir un encadrement plus précis que “on va trouver un tuteur”.",
        right: "Le site met de l'avant la situation exacte, le bon format et le chemin attendu avant même la première séance.",
      },
      {
        left: "Ils paient pour plus de calme à la maison.",
        right: "Quand les priorités sont claires et la progression plus lisible, le service paraît plus premium que du tutorat large et interchangeable.",
      },
    ],
  },
  en: {
    premiumEyebrow: "Mini case studies",
    premiumTitle: "Premium cases that show what a parent is really paying for",
    premiumDescription:
      "When a family agrees to pay more, it is not for a prettier tutoring hour. It is for faster clarity, fewer wrong turns and progress that feels easier to read.",
    studies: [
      {
        badge: "Secondary 4 • Math SN",
        title: "Before: the student works hard, but never assembles the full method correctly.",
        situation:
          "The parent sees a serious teenager who unravels as soon as a problem requires reading, setup and verification inside the same exercise.",
        blockage:
          "The real block is not only a missing concept. It is the lack of a stable mental structure once the question becomes less direct.",
        intervention:
          "We recenter the work on method: how to enter the question, what to isolate first, what to verify next and how to stop restarting from zero on every attempt.",
        result:
          "The parent quickly feels that hesitation drops, blind retries decrease and the student regains a form of control that had been missing for weeks.",
        format: "Recommended format: Weekly follow-up if the confusion keeps returning, otherwise a targeted catch-up reset.",
      },
      {
        badge: "Urgent • Science",
        title: "Before: the family is revising everything at once because the exam is close.",
        situation:
          "The parent arrives with a date, multiple open chapters and a real fear of spending the remaining time in the wrong direction.",
        blockage:
          "The real danger here is not lack of effort. It is a revision plan that is too broad and burns energy without increasing clarity.",
        intervention:
          "We use the Exam sprint to sort what still matters: chapters that can still move quickly, the costliest recurring mistakes, the question types to prioritize and what to let go.",
        result:
          "The family leaves with a credible plan, less panic and a strong feeling that the remaining days finally have structure.",
        format: "Recommended format: Exam sprint, with a short call first when the urgency is high but still fuzzy.",
      },
      {
        badge: "Long-term progress • Secondary 2 to 5",
        title: "Before: the same difficulties keep returning, even after a few good isolated sessions.",
        situation:
          "The parent is not facing a dramatic collapse, but repeated academic fatigue: slower homework, weak retention and stress returning before each evaluation.",
        blockage:
          "What becomes expensive here is treating every week like a separate emergency instead of building continuity.",
        intervention:
          "We frame recurring support where the priority subject, rhythm and expectations are clarified in advance. The family stops paying for improvisation and starts paying to end improvisation.",
        result:
          "The visible shift is a calmer home, progress that is easier to read and simpler decisions because the work is no longer fragmented.",
        format: "Recommended format: Weekly follow-up, with a framing call before any booking.",
      },
    ],
    whyEyebrow: "Why pay more",
    whyTitle: "What makes Méthode Secondaire different from broader tutoring sites in Quebec",
    whyDescription:
      "Many services lead with scale: all levels, all subjects, large tutor pools, fast matching. This positioning is narrower and more strategic for high-school families.",
    differentiators: [
      {
        icon: "target",
        title: "High-school-first, not a general marketplace",
        description:
          "The site speaks directly to Secondary 1 to 5 families with pages and offers tied to real moments: exams, backlog, stability, SN4, chemistry and physics.",
      },
      {
        icon: "method",
        title: "A clear method is sold before tutoring hours are sold",
        description:
          "The diagnostic, the call-vs-booking distinction and the need-based offers create direction. Parents feel more quickly which format actually makes sense.",
      },
      {
        icon: "parent",
        title: "The value is made visible to the parent",
        description:
          "The site does not only speak to the student. It helps the parent understand the block, the path forward and when recurring support is smarter than a one-off session.",
      },
      {
        icon: "trust",
        title: "Fewer vague promises, more concrete signals",
        description:
          "Case studies, testimonials, named offers, local pages and subject pages together feel more precise than a generic lead form and broad service list.",
      },
    ],
    compareTitle: "Why some parents would willingly pay more here",
    compareRows: [
      {
        left: "They want to avoid losing two or three weeks in the wrong support format.",
        right: "Méthode Secondaire clarifies the route faster: call first for true recurring support, direct booking for a targeted or urgent need.",
      },
      {
        left: "They want the subject to become readable, not just extra homework help.",
        right: "The positioning keeps emphasizing logic, method and real exam readiness, especially in math and science.",
      },
      {
        left: "They want something more precise than “we'll find you a tutor.”",
        right: "The site leads with the exact situation, the right format and the expected path before the first session even happens.",
      },
      {
        left: "They are paying for more calm at home.",
        right: "When priorities become clearer and progress becomes easier to read, the service feels more premium than broad interchangeable tutoring.",
      },
    ],
  },
}

export default function CaseStudiesPremiumSection({ locale = "fr", className = "pt-20" }) {
  const copy = copyByLocale[locale] || copyByLocale.fr

  return (
    <section className={className}>
      <SectionHeader eyebrow={copy.premiumEyebrow} title={copy.premiumTitle} description={copy.premiumDescription} />

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {copy.studies.map((study) => (
          <MotionCard key={study.title} className="rounded-[32px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-white/85 hover:bg-white/10">
              {study.badge}
            </Badge>
            <h3 className="mt-5 font-display text-3xl font-semibold">{study.title}</h3>

            <div className="mt-6 space-y-4 text-sm text-white/78">
              <PremiumLine icon="spark" label={locale === "en" ? "Situation" : "Situation"} text={study.situation} />
              <PremiumLine icon="target" label={locale === "en" ? "Blockage" : "Blocage"} text={study.blockage} />
              <PremiumLine icon="method" label={locale === "en" ? "Intervention" : "Intervention"} text={study.intervention} />
              <PremiumLine icon="progress" label={locale === "en" ? "Result" : "Résultat"} text={study.result} />
            </div>

            <div className="mt-6 rounded-[24px] border border-[#f5c977]/25 bg-[#f5c977]/10 px-5 py-5 text-sm leading-7 text-[#f8deb0]">
              <div className="font-semibold text-white">
                {locale === "en" ? "Best format" : "Bon format recommandé"}
              </div>
              <p className="mt-2">{study.format}</p>
            </div>
          </MotionCard>
        ))}
      </div>

      <SectionHeader eyebrow={copy.whyEyebrow} title={copy.whyTitle} description={copy.whyDescription} className="pt-20" />

      <div className="mt-8 grid gap-4 xl:grid-cols-4">
        {copy.differentiators.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <MotionCard key={item.title} className="glass-panel rounded-[30px] border-white/10 bg-white/[0.04] p-6 text-white">
              <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{item.description}</p>
            </MotionCard>
          )
        })}
      </div>

      <div className="mt-8 rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.12),rgba(255,255,255,0.05))] p-7 text-white">
        <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.compareTitle}</div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {copy.compareRows.map((row) => (
            <div key={row.left} className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-5">
              <div className="flex items-start gap-3 text-sm text-white/82">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                <span>{row.left}</span>
              </div>
              <div className="mt-4 rounded-[20px] border border-white/10 bg-[#081a38]/80 px-4 py-4 text-sm leading-7 text-white/72">
                {row.right}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, description, className = "" }) {
  return (
    <div className={`max-w-3xl ${className}`.trim()}>
      <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{eyebrow}</div>
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description}</p>
    </div>
  )
}

function PremiumLine({ icon, label, text }) {
  const Icon = iconMap[icon]

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white/10 p-2.5 text-[#f5c977]">
          <Icon className="h-4 w-4" />
        </div>
        <div className="text-xs uppercase tracking-[0.22em] text-white/45">{label}</div>
      </div>
      <p className="mt-3 text-sm leading-7 text-white/78">{text}</p>
    </div>
  )
}
