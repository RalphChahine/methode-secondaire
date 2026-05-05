import { secondary4MathConceptPages } from "./secondary4MathTheoryContent.js"

const secondary4MathConceptRouteCatalog = Object.fromEntries(
  secondary4MathConceptPages.map((page) => [
    page.routeKey,
    {
      fr: page.frPath,
      en: page.enPath,
    },
  ]),
)

export const routeCatalog = {
  home: { fr: "/", en: "/en" },
  maths: { fr: "/maths", en: "/en/math-tutoring" },
  sciences: { fr: "/sciences", en: "/en/science-tutoring" },
  temoignages: { fr: "/temoignages", en: "/en/testimonials" },
  reussites: { fr: "/reussites", en: "/en/success-stories" },
  tuteurs: { fr: "/tuteurs", en: "/en/tutors" },
  devenirTuteur: { fr: "/devenir-tuteur", en: "/en/become-a-tutor" },
  montreal: { fr: "/tutorat-montreal", en: "/en/montreal-tutoring" },
  laval: { fr: "/tutorat-laval", en: "/en/laval-tutoring" },
  quebecOnline: { fr: "/tutorat-en-ligne-quebec", en: "/en/quebec-online-tutoring" },
  examSprint: { fr: "/sprint-examen", en: "/en/exam-sprint" },
  weeklyFollowUp: { fr: "/suivi-hebdomadaire", en: "/en/weekly-follow-up" },
  mathTutoringSecondary: {
    fr: "/tutorat-en-mathematiques-secondaire",
    en: "/en/high-school-math-tutoring-quebec",
  },
  scienceTutorSecondary: {
    fr: "/tuteur-sciences-secondaire",
    en: "/en/high-school-science-tutor-quebec",
  },
  homeworkHelpSecondary: {
    fr: "/aide-aux-devoirs-secondaire",
    en: "/en/high-school-homework-help",
  },
  academicSupportSecondary: {
    fr: "/soutien-scolaire-secondaire",
    en: "/en/high-school-academic-support",
  },
  mathTutorMontreal: {
    fr: "/tuteur-maths-montreal",
    en: "/en/montreal-math-tutor",
  },
  homeworkHelpMontreal: {
    fr: "/aide-aux-devoirs-montreal",
    en: "/en/montreal-homework-help",
  },
  scienceTutorLaval: {
    fr: "/tuteur-sciences-laval",
    en: "/en/laval-science-tutor",
  },
  academicSupportMontreal: {
    fr: "/soutien-scolaire-montreal",
    en: "/en/montreal-academic-support",
  },
  physicsTutorMontreal: {
    fr: "/tuteur-physique-montreal",
    en: "/en/montreal-physics-tutor",
  },
  chemistryHelpLaval: {
    fr: "/aide-chimie-laval",
    en: "/en/laval-chemistry-help",
  },
  summerSupportSecondary: {
    fr: "/cours-ete-secondaire",
    en: "/en/high-school-summer-support",
  },
  secondary4MathTheory: {
    fr: "/theorie-maths-secondaire-4",
    en: "/en/secondary-4-math-theory",
  },
  ministerialExamSec4: {
    fr: "/preparation-examen-ministere-secondaire-4",
    en: "/en/secondary-4-ministerial-exam-prep",
  },
  entryToSecondary: {
    fr: "/entree-au-secondaire",
    en: "/en/high-school-transition-support",
  },
  employmentTutorSecondary: {
    fr: "/emploi-tuteur-secondaire",
    en: "/en/high-school-tutor-jobs-quebec",
  },
  resourcesHub: { fr: "/ressources", en: "/en/resources" },
  blogHub: { fr: "/blogue", en: "/en/blog" },
  blogMathAnxiety: {
    fr: "/blogue/anxiete-maths-secondaire-recherche",
    en: "/en/blog/math-anxiety-high-school-research",
  },
  blogTutoringEvidence: {
    fr: "/blogue/recherche-tutorat-prive-secondaire",
    en: "/en/blog/tutoring-research-high-school",
  },
  blogHomeworkResearch: {
    fr: "/blogue/aide-aux-devoirs-recherche",
    en: "/en/blog/homework-help-research",
  },
  blogSpacingMath: {
    fr: "/blogue/revision-maths-pratique-espacee",
    en: "/en/blog/spaced-practice-math-revision",
  },
  blogScienceWriting: {
    fr: "/blogue/ecrire-pour-mieux-apprendre-en-sciences",
    en: "/en/blog/writing-to-learn-science",
  },
  blogParentSupport: {
    fr: "/blogue/parents-aider-sans-mettre-de-pression",
    en: "/en/blog/parent-support-without-pressure",
  },
  mathExamPrep: {
    fr: "/ressources/preparation-examen-maths-secondaire",
    en: "/en/resources/high-school-math-exam-prep",
  },
  scienceExamPrep: {
    fr: "/ressources/preparation-examen-sciences-secondaire",
    en: "/en/resources/high-school-science-exam-prep",
  },
  sec4Math: {
    fr: "/ressources/aide-maths-secondaire-4",
    en: "/en/resources/secondary-4-math-help",
  },
  catchUp: {
    fr: "/ressources/rattrapage-scolaire-secondaire",
    en: "/en/resources/high-school-catch-up-tutoring",
  },
  mathMinisterial: {
    fr: "/ressources/preparation-examen-ministeriel-maths",
    en: "/en/resources/math-ministerial-exam-prep",
  },
  physicsHelp: {
    fr: "/ressources/tuteur-physique-secondaire",
    en: "/en/resources/high-school-physics-tutoring",
  },
  chemistrySec5: {
    fr: "/ressources/aide-chimie-secondaire-5",
    en: "/en/resources/secondary-5-chemistry-help",
  },
  montrealSec4Math: {
    fr: "/ressources/tuteur-maths-montreal-secondaire-4",
    en: "/en/resources/montreal-secondary-4-math-tutor",
  },
  ...secondary4MathConceptRouteCatalog,
}
