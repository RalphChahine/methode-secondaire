import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  CircleCheck,
  HeartHandshake,
  LineChart,
  Phone,
  Sparkles,
  Target,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import CaseStudiesPremiumSection from "@/components/CaseStudiesPremiumSection"
import ParentJourneyNote from "@/components/ParentJourneyNote"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import { getRobotsDirective } from "@/lib/searchIndexStrategy"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const contentByLocale = {
  fr: {
    badge: "Cas types • Situations représentatives",
    heroTitle: "Des histoires dans lesquelles un parent peut se reconnaître avant même le premier appel.",
    heroText:
      "Cette page présente des cas types inspirés de situations fréquentes vues en tutorat. Ils sont là pour aider une famille à se projeter clairement, sans exposer de vrai dossier scolaire ni inventer de faux avis signés.",
    noteTitle: "Important à savoir",
    noteText:
      "Ces portraits sont volontairement composites et anonymisés. Ils ne remplacent pas de vrais témoignages; ils montrent plutôt à quoi ressemblent les situations qu'un parent nous décrit le plus souvent.",
    sectionEyebrow: "Cas typiques",
    sectionTitle: "Cinq scénarios qui parlent aux parents tout de suite",
    sectionDescription:
      "Chaque cas raconte le point de départ, le vrai blocage, le type d'accompagnement utile et le changement qu'un parent veut sentir rapidement.",
    metricsTitle: "Ce que les parents veulent sentir vite",
    metrics: [
      "Un besoin enfin nommé clairement",
      "Des priorités moins floues d'une semaine à l'autre",
      "Un élève qui panique moins devant la matière",
      "Une progression plus lisible à la maison",
    ],
    cases: [
      {
        tag: "Secondaire 4 • Maths",
        title: "Le parent voit un enfant capable, mais qui gèle dès que l'exercice se complique.",
        profile:
          "Élève de secondaire 4, plutôt sérieux, mais qui perd ses moyens dès qu'il y a plusieurs étapes dans une équation, un problème ou une mise en situation.",
        before:
          "À la maison, le parent entend souvent: « je comprends en classe... jusqu'au moment où je dois le refaire seul ». Les devoirs prennent trop de temps et finissent souvent en blocage.",
        shift:
          "Le travail utile consiste moins à refaire tout le chapitre qu'à remettre la démarche dans le bon ordre, à faire baisser l'hésitation et à ancrer une méthode simple de lecture et de vérification.",
        outcome:
          "Le premier vrai gain n'est pas une note spectaculaire tout de suite. C'est un élève qui recommence à savoir par où partir, qui efface moins, qui bloque moins et qui récupère de la confiance rapidement.",
        parentLine:
          "Ce type de parent cherche surtout à entendre: « enfin, il a une façon de faire au lieu d'improviser à chaque question ».",
      },
      {
        tag: "Sprint examen • Sciences",
        title: "L'examen approche, mais la révision est encore trop large et trop stressante.",
        profile:
          "Famille qui arrive avec une date d'évaluation proche, plusieurs chapitres encore flous et la sensation que l'élève révise beaucoup sans vraiment avancer.",
        before:
          "Le parent ne sait plus s'il faut reprendre les bases, pratiquer des questions type examen ou simplement essayer de sauver les points les plus accessibles.",
        shift:
          "Le Sprint examen sert ici à trier vite: quels chapitres comptent le plus, quelles erreurs reviennent, quelles questions méritent encore de l'énergie cette semaine.",
        outcome:
          "Le changement visible est souvent un calme retrouvé. La famille sent enfin qu'il y a un plan réaliste pour les jours qui restent au lieu d'une révision panique dans toutes les directions.",
        parentLine:
          "Le vrai soulagement vient quand le parent se dit: « on sait enfin quoi travailler maintenant, et quoi laisser de côté ».",
      },
      {
        tag: "Bloc de progression — 10 séances • Continuité",
        title: "Les notions s'accumulent depuis des semaines et un simple rendez-vous ponctuel ne suffit plus.",
        profile:
          "Élève de secondaire 2 ou 3 qui n'est pas nécessairement en échec, mais qui voit les mêmes difficultés revenir dans les devoirs, d'une évaluation à l'autre.",
        before:
          "Le parent sent que le problème n'est plus un chapitre isolé. C'est le rythme global, l'organisation et la stabilité de la méthode qui commencent à manquer.",
        shift:
          "Le bloc de progression devient utile quand on veut arrêter de repartir à zéro: on cadre la matière prioritaire, on installe une continuité et on suit mieux ce qui revient. Après le jumelage, un rythme hebdomadaire peut être proposé s'il aide vraiment.",
        outcome:
          "Le progrès ressenti est souvent plus durable: moins de stress le dimanche soir, moins d'improvisation, plus d'autonomie et des évaluations mieux abordées parce que le travail est moins morcelé.",
        parentLine:
          "Le parent cherche surtout à sentir: « cette fois, on n'est pas juste en train d'éteindre un feu ».",
      },
      {
        tag: "Secondaire 5 • Chimie ou physique",
        title: "La matière semble apprise par cœur, mais la logique ne tient pas quand il faut appliquer.",
        profile:
          "Élève qui connaît des morceaux de théorie, parfois même les formules, mais qui hésite dès qu'il faut relier les données, choisir l'approche ou justifier une réponse.",
        before:
          "À la maison, tout donne l'impression d'être « presque compris », sauf que les points ne suivent pas parce que la matière reste trop mécanique et trop fragile.",
        shift:
          "L'accompagnement utile consiste à rendre la matière plus visuelle, plus reliée, plus concrète. On ne travaille pas seulement la bonne réponse; on travaille la logique qui permet de la retrouver.",
        outcome:
          "Très souvent, le parent remarque que l'élève explique mieux ce qu'il fait à voix haute. C'est un signe fort: quand la logique devient racontable, elle devient généralement plus solide.",
        parentLine:
          "Le déclic recherché, c'est: « il ne mémorise plus à vide, il comprend enfin pourquoi ça marche ».",
      },
      {
        tag: "Remise à niveau ciblée",
        title: "Après une période plus chaotique, la famille veut repartir proprement sans dramatiser.",
        profile:
          "Retour d'absence, changement d'école, baisse de rythme ou passage difficile qui a laissé un retard réel, mais encore rattrapable si on agit avec méthode.",
        before:
          "Le parent ne veut pas entendre un grand discours abstrait. Il veut savoir ce qu'on reprend d'abord, ce qui peut attendre, et comment éviter que le retard prenne toute la place dans l'année.",
        shift:
          "La remise à niveau ciblée sert à reprendre une partie du programme avec ordre, sans faire semblant de tout reconstruire d'un coup. On choisit le noyau utile et on remet l'élève en mouvement.",
        outcome:
          "Le bénéfice visible est souvent un retour d'élan. L'élève recommence à se sentir prenable, et le parent voit que le retard n'est plus une masse confuse mais un plan de travail gérable.",
        parentLine:
          "Ce type de famille veut surtout sentir: « on a enfin un chemin réaliste au lieu d'un retard qui fait peur ».",
      },
    ],
    finalTitle: "Un parent n'achète pas juste une heure. Il achète une direction claire.",
    finalText:
      "Ces cas types servent à montrer qu'il existe plusieurs bons points d'entrée: appel, mini-bilan, séance ciblée ou suivi régulier. L'important est surtout de choisir le bon format selon la vraie situation.",
    primary: "Voir les témoignages",
    secondary: "Appeler pour en parler",
    tertiary: "Remplir le formulaire",
    seoTitle: "Réussites et cas types | Méthode Secondaire",
    seoDescription:
      "Découvrez des cas types inspirés de situations fréquentes en tutorat secondaire: maths, sciences, Sprint examen, bloc de progression de 10 séances et remise à niveau ciblée.",
    seoKeywords:
      "cas type tutorat secondaire, réussite maths secondaire, réussite sciences secondaire, sprint examen, bloc de progression, tutorat québec",
  },
  en: {
    badge: "Case studies • Representative situations",
    heroTitle: "Stories that help parents recognize their own situation before the first call.",
    heroText:
      "This page presents representative case studies inspired by situations that come up often in tutoring. They are here to help families picture the right next step clearly, without exposing a real academic file or presenting invented signed reviews as fact.",
    noteTitle: "Important note",
    noteText:
      "These profiles are deliberately composite and anonymized. They do not replace real testimonials; they show the kinds of situations families describe most often before starting.",
    sectionEyebrow: "Typical cases",
    sectionTitle: "Five scenarios that speak to parents quickly",
    sectionDescription:
      "Each case shows the starting point, the real block, the type of support that helps most, and the kind of shift a parent wants to feel early.",
    metricsTitle: "What parents want to feel quickly",
    metrics: [
      "The real need is finally named clearly",
      "Weekly priorities feel less blurry",
      "A student who panics less in front of the subject",
      "Progress that feels easier to read at home",
    ],
    cases: [
      {
        tag: "Secondary 4 • Math",
        title: "The parent sees a capable student who freezes as soon as the exercise becomes multi-step.",
        profile:
          "A serious Secondary 4 student who starts strong but loses confidence as soon as equations, word problems or longer steps appear.",
        before:
          "At home, the family often hears: “I understand it in class... until I have to do it alone.” Homework takes too long and often ends in a wall.",
        shift:
          "The useful work is not to redo every chapter. It is to rebuild the order of the method, reduce hesitation and anchor a repeatable way to read, solve and check.",
        outcome:
          "The first visible gain is not an instant dramatic mark. It is a student who knows where to start again, erases less, freezes less and regains confidence quickly.",
        parentLine:
          "What this parent wants to feel is: “finally, there is a method instead of improvisation every time.”",
      },
      {
        tag: "Exam sprint • Science",
        title: "The exam is close, but the review plan is still too broad and too stressful.",
        profile:
          "A family arrives with an upcoming evaluation, several weak chapters and the feeling that the student is revising a lot without truly moving forward.",
        before:
          "The parent no longer knows whether to restart the basics, practice exam-style questions or just try to save the most accessible marks.",
        shift:
          "The Exam sprint is useful here because it sorts quickly: which chapters matter most, which errors keep coming back and which question types still deserve energy this week.",
        outcome:
          "The visible change is often calmer decision-making. The family finally feels there is a realistic plan for the remaining days instead of panic-driven revision in every direction.",
        parentLine:
          "The real relief comes when the parent can say: “we finally know what to work on now, and what not to chase.”",
      },
      {
        tag: "10-session progress block • Continuity",
        title: "The material has been piling up for weeks, and one isolated session is no longer enough.",
        profile:
          "A Secondary 2 or 3 student who is not necessarily failing, but keeps seeing the same difficulties return from homework to homework and from one test cycle to the next.",
        before:
          "The parent feels the issue is no longer one chapter. It is the overall rhythm, the organization and the steadiness of the learning method that are starting to slip.",
        shift:
          "A 10-session progress block becomes useful when the goal is to stop starting from zero: frame the priority subject, build continuity and track what keeps recurring. After matching, a weekly rhythm can be suggested if it genuinely helps.",
        outcome:
          "The progress feels more durable: less Sunday-night stress, less improvisation, more autonomy and better-shaped evaluations because the work is no longer fragmented.",
        parentLine:
          "What this parent really wants is to feel: “this time, we are not just putting out one more fire.”",
      },
      {
        tag: "Secondary 5 • Chemistry or physics",
        title: "The content sounds memorized, but the logic breaks when it is time to apply it.",
        profile:
          "A student who knows fragments of theory and sometimes even formulas, but hesitates as soon as they must connect data, choose an approach or justify an answer.",
        before:
          "At home, everything feels “almost understood,” except that marks do not follow because the subject remains too mechanical and too fragile.",
        shift:
          "The useful support makes the subject more visual, more connected and more concrete. The goal is not only the correct answer; it is the reasoning that lets the student find it again.",
        outcome:
          "A strong sign often appears early: the student starts explaining their reasoning out loud more clearly. When the logic becomes explainable, it usually becomes more stable too.",
        parentLine:
          "The breakthrough the family wants is: “he is no longer memorizing blindly; he finally understands why it works.”",
      },
      {
        tag: "Targeted catch-up reset",
        title: "After a messier period, the family wants a clean restart without turning everything into a crisis.",
        profile:
          "A return from absence, a school change, a drop in rhythm or a rough stretch that created a real gap, but one that is still recoverable with method.",
        before:
          "The parent does not want vague encouragement. They want to know what gets rebuilt first, what can wait and how to keep the gap from dominating the whole year.",
        shift:
          "The targeted catch-up reset helps rebuild one meaningful part of the program with order, without pretending everything must be fixed at once. The core comes first.",
        outcome:
          "The visible gain is often momentum returning. The student stops feeling swallowed by the gap, and the parent sees a manageable plan instead of a frightening blur.",
        parentLine:
          "What this family wants most is to feel: “there is finally a realistic path instead of a delay that scares everyone.”",
      },
    ],
    finalTitle: "A parent is not buying one hour. A parent is buying clearer direction.",
    finalText:
      "These case studies show that there are different strong entry points: a call, the mini-assessment, a focused session or recurring support. What matters most is choosing the right format for the real situation.",
    primary: "See testimonials",
    secondary: "Call to discuss",
    tertiary: "Fill out the form",
    seoTitle: "Success stories and case studies | Methode Secondaire",
    seoDescription:
      "Explore representative case studies inspired by common high school tutoring situations in math, science, exam sprint support, a 10-session progress block and catch-up tutoring.",
    seoKeywords:
      "high school tutoring case studies, math tutoring success story, science tutoring success story, exam sprint tutoring, 10-session progress block",
  },
}

function getJourneyCopy(locale) {
  const english = locale === "en"

  return {
    nextEyebrow: english ? "Your next move" : "Votre prochaine action",
    nextTitle: english
      ? "Start with the situation that feels most familiar."
      : "Commence par la situation qui vous ressemble le plus.",
    nextText: english
      ? "You do not need to decide on a full plan before reaching out. Name the subject, the moment that feels urgent and what is happening at home; we can help clarify the useful format."
      : "Vous n'avez pas \u00e0 d\u00e9cider d'un plan complet avant de nous parler. Nommez la mati\u00e8re, le moment qui presse et ce qui se passe \u00e0 la maison; nous aiderons \u00e0 clarifier le format utile.",
    nextSteps: english
      ? ["Choose the closest situation below.", "Tell us the subject and the moment that feels hardest.", "Start with a call or a focused request."]
      : [
          "Rep\u00e9rez le portrait le plus proche de votre situation.",
          "Dites-nous la mati\u00e8re et le moment qui bloque le plus.",
          "Commencez par un appel ou une demande cibl\u00e9e.",
        ],
    actionButton: english ? "Share the situation" : "Partager la situation",
    storyLabel: english ? "Clear path markers" : "Rep\u00e8res de parcours",
    situation: english ? "Situation" : "Situation",
    whatItFeelsLike: english ? "What the family feels" : "Ce que la famille vit",
    lever: english ? "What changes the approach" : "Le vrai levier",
    progress: english ? "Progress the parent can feel" : "Le progr\u00e8s ressenti",
    parentVoice: english ? "What resonates with the parent" : "La phrase qui parle au parent",
    matches: english ? "Does this sound familiar?" : "Cette situation vous ressemble ?",
    matchesAction: english ? "See the next simple action" : "Voir la prochaine action simple",
    premiumEyebrow: english ? "Go further, only if useful" : "Aller plus loin, seulement si utile",
    premiumTitle: english
      ? "Explore the support formats and the value behind the follow-up."
      : "Explorer les formats d'accompagnement et la valeur du suivi.",
    premiumText: english
      ? "This additional guide is there when a family wants more detail before choosing a format."
      : "Ce guide compl\u00e9mentaire est l\u00e0 lorsqu'une famille veut plus de d\u00e9tails avant de choisir un format.",
  }
}

export default function CaseStudies() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = contentByLocale[locale]
  const journey = getJourneyCopy(locale)
  const path = getLocalizedPath("reussites", locale)

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.seoTitle,
      description: copy.seoDescription,
      url: absoluteUrl(path),
      publisher: {
        "@type": "EducationalOrganization",
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "en" ? "Home" : "Accueil",
          item: absoluteUrl(getLocalizedPath("home", locale)),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "en" ? "Success stories" : "Réussites",
          item: absoluteUrl(path),
        },
      ],
    },
  ]

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        keywords={copy.seoKeywords}
        jsonLd={schemas}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("reussites")}
        robots={getRobotsDirective("reussites")}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#f5c977]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/55">
              <Link to={getLocalizedPath("home", locale)} className="transition hover:text-white">
                {locale === "en" ? "Home" : "Accueil"}
              </Link>
              <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
              <span className="text-white/75">{locale === "en" ? "Success stories" : "Réussites"}</span>
            </div>

            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.badge}
            </Badge>

            <h1 className="balanced-copy mt-6 font-display text-4xl font-semibold leading-[0.98] text-white sm:mt-7 sm:text-6xl">
              {copy.heroTitle}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:mt-6 sm:text-lg sm:leading-8">{copy.heroText}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link to={getLocalizedPath("temoignages", locale)}>
                  {copy.primary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="w-full rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  {copy.secondary}
                </a>
              </Button>
            </div>

            <ParentJourneyNote locale={locale} className="mt-6 max-w-2xl" />
          </div>

          <MotionCard className="glass-panel rounded-[28px] border-white/10 bg-white/[0.05] p-5 text-white sm:rounded-[32px] sm:p-7">
            <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold">{copy.noteTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-white/72">{copy.noteText}</p>

            <div className="mt-6 rounded-[24px] border border-[#f5c977]/25 bg-[#f5c977]/10 px-5 py-5 text-sm leading-7 text-[#f8deb0]">
              {locale === "en"
                ? "This kind of page reassures parents because it answers the question behind the question: “what does support look like when it is actually helping?”"
                : "Ce type de page rassure les parents parce qu'il répond à la question derrière la question: « à quoi ressemble un accompagnement quand il aide vraiment? »"}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f5c977]">{journey.nextEyebrow}</div>
              <h3 className="mt-2 font-display text-2xl font-semibold">{journey.nextTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{journey.nextText}</p>
              <ol className="mt-4 space-y-2">
                {journey.nextSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm leading-6 text-white/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f5c977]/35 text-xs font-semibold text-[#f5c977]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <Button
                asChild
                className="mt-5 w-full rounded-full bg-[#f5c977] px-5 py-5 text-sm text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
              >
                <Link to={`${getLocalizedPath("home", locale)}#demande`}>
                  {journey.actionButton}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45">{copy.metricsTitle}</div>
              <div className="mt-3 divide-y divide-white/10 text-sm text-white/80">
                {copy.metrics.map((item) => (
                  <div key={item} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </MotionCard>
        </section>

        <section className="pt-14 sm:pt-16">
          <details className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] text-white">
            <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-5 transition hover:bg-white/[0.045] [&::-webkit-details-marker]:hidden sm:px-7 sm:py-6">
              <span className="inline-flex shrink-0 rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-[0.22em] text-[#f5c977]">{journey.premiumEyebrow}</span>
                <span className="mt-2 block font-display text-2xl font-semibold leading-tight sm:text-3xl">{journey.premiumTitle}</span>
                <span className="mt-3 block max-w-3xl text-sm leading-7 text-white/68">{journey.premiumText}</span>
              </span>
              <ChevronDown className="mt-2 h-5 w-5 shrink-0 text-white/48 transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-white/10 px-5 pb-2 sm:px-7">
              <CaseStudiesPremiumSection locale={locale} className="py-8 sm:py-10" />
            </div>
          </details>
        </section>

        <section className="pt-20">
          <SectionHeader eyebrow={copy.sectionEyebrow} title={copy.sectionTitle} description={copy.sectionDescription} />

          <ol className="mt-8 max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#091a3a]/64">
            {copy.cases.map((entry, index) => (
              <li key={entry.title} className="border-b border-white/10 last:border-b-0">
                <details className="group" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-start gap-3 px-5 py-5 transition hover:bg-white/[0.045] [&::-webkit-details-marker]:hidden sm:gap-5 sm:px-7 sm:py-6">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                  <Badge className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-white/85 hover:bg-white/10">
                    {entry.tag}
                  </Badge>
                        <span className="text-xs font-semibold tracking-[0.18em] text-[#f5c977]">0{index + 1}</span>
                      </div>

                      <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">{entry.title}</h2>
                      <span className="mt-3 block text-xs uppercase tracking-[0.2em] text-white/42">{journey.storyLabel}</span>
                    </div>
                    <ChevronDown className="mt-2 h-5 w-5 shrink-0 text-white/48 transition-transform group-open:rotate-180" />
                  </summary>

                  <div className="border-t border-white/10 bg-black/[0.08] px-5 py-5 sm:px-7 sm:py-7">
                <div className="grid gap-0 divide-y divide-white/10 border-y border-white/10 text-sm text-white/78 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
                  <StoryBlock
                    icon={Sparkles}
                    label={journey.situation}
                    text={entry.profile}
                  />
                  <StoryBlock
                    icon={Target}
                    label={journey.whatItFeelsLike}
                    text={entry.before}
                  />
                  <StoryBlock
                    icon={LineChart}
                    label={journey.lever}
                    text={entry.shift}
                  />
                  <StoryBlock
                    icon={BadgeCheck}
                    label={journey.progress}
                    text={entry.outcome}
                  />
                </div>

                <div className="mt-6 rounded-[24px] border border-[#f5c977]/25 bg-[#f5c977]/10 px-5 py-5 text-sm leading-7 text-[#f8deb0]">
                  <div className="font-semibold text-white">
                    {locale === "en" ? "The line that resonates most" : "La phrase qui parle le plus au parent"}
                  </div>
                  <p className="mt-2">{entry.parentLine}</p>
                </div>
                <a
                  href="#prochaine-action"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#f5c977] transition hover:text-[#f7d38f]"
                >
                  <CircleCheck className="h-4 w-4" />
                  {journey.matches}
                  <span className="text-white/48">{journey.matchesAction}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </section>

        <section id="prochaine-action" className="scroll-mt-28 pt-16 sm:pt-20">
          <MotionCard className="rounded-[30px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-6 text-white sm:rounded-[34px] sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {journey.nextEyebrow}
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold sm:text-5xl">{copy.finalTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.finalText}</p>
              <ol className="mt-6 grid gap-2 border-y border-white/10 py-4 text-sm text-white/82 sm:grid-cols-3 sm:gap-4">
                {journey.nextSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 leading-6">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f5c977]/35 text-xs font-semibold text-[#f5c977]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  className="w-full rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="h-4 w-4" />
                    {copy.secondary}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={`${getLocalizedPath("home", locale)}#demande`}>
                    {copy.tertiary}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={getLocalizedPath("temoignages", locale)}>{copy.primary}</Link>
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

function StoryBlock({ icon: Icon, label, text }) {
  return (
    <div className="min-w-0 px-0 py-5 first:pt-5 md:px-5 md:py-6">
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-[#f5c977]/30 bg-[#f5c977]/10 p-2 text-[#f5c977]">
          <Icon className="h-4 w-4" />
        </div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/52">{label}</div>
      </div>
      <p className="mt-3 text-sm leading-7 text-white/78 md:pr-2">{text}</p>
    </div>
  )
}
