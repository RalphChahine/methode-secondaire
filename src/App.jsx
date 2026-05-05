import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import SiteLayout from "@/layouts/SiteLayout"
import { secondary4MathConceptPages } from "@/lib/secondary4MathTheoryContent"

const Accueil = lazy(() => import("@/pages/Accueil"))
const AccueilEn = lazy(() => import("@/pages/AccueilEn"))
const BlogArticle = lazy(() => import("@/pages/BlogArticle"))
const BlogHub = lazy(() => import("@/pages/BlogHub"))
const CaseStudies = lazy(() => import("@/pages/CaseStudies"))
const DevenirTuteur = lazy(() => import("@/pages/DevenirTuteur"))
const LocalLanding = lazy(() => import("@/pages/LocalLanding"))
const Maths = lazy(() => import("@/pages/Maths"))
const OfferLanding = lazy(() => import("@/pages/OfferLanding"))
const ResourceArticle = lazy(() => import("@/pages/ResourceArticle"))
const ResourcesHub = lazy(() => import("@/pages/ResourcesHub"))
const Secondary4MathTheory = lazy(() => import("@/pages/Secondary4MathTheory"))
const Secondary4MathConcept = lazy(() => import("@/pages/Secondary4MathConcept"))
const Sciences = lazy(() => import("@/pages/Sciences"))
const Temoignages = lazy(() => import("@/pages/Temoignages"))
const Tuteurs = lazy(() => import("@/pages/Tuteurs"))

function PageLoader() {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-7xl items-center justify-center px-5 py-16 text-sm text-white/70">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Accueil />} />
            <Route path="/en" element={<AccueilEn />} />
            <Route path="/maths" element={<Maths />} />
            <Route path="/en/math-tutoring" element={<Maths />} />
            <Route path="/sciences" element={<Sciences />} />
            <Route path="/en/science-tutoring" element={<Sciences />} />
            <Route path="/temoignages" element={<Temoignages />} />
            <Route path="/en/testimonials" element={<Temoignages />} />
            <Route path="/reussites" element={<CaseStudies />} />
            <Route path="/en/success-stories" element={<CaseStudies />} />
            <Route path="/tuteurs" element={<Tuteurs />} />
            <Route path="/en/tutors" element={<Tuteurs />} />
            <Route path="/tutorat-montreal" element={<LocalLanding forcedRouteKey="montreal" />} />
            <Route path="/en/montreal-tutoring" element={<LocalLanding forcedRouteKey="montreal" />} />
            <Route path="/tutorat-laval" element={<LocalLanding forcedRouteKey="laval" />} />
            <Route path="/en/laval-tutoring" element={<LocalLanding forcedRouteKey="laval" />} />
            <Route path="/tutorat-en-ligne-quebec" element={<LocalLanding forcedRouteKey="quebecOnline" />} />
            <Route path="/en/quebec-online-tutoring" element={<LocalLanding forcedRouteKey="quebecOnline" />} />
            <Route path="/sprint-examen" element={<OfferLanding forcedRouteKey="examSprint" />} />
            <Route path="/en/exam-sprint" element={<OfferLanding forcedRouteKey="examSprint" />} />
            <Route path="/suivi-hebdomadaire" element={<OfferLanding forcedRouteKey="weeklyFollowUp" />} />
            <Route path="/en/weekly-follow-up" element={<OfferLanding forcedRouteKey="weeklyFollowUp" />} />
            <Route
              path="/tutorat-en-mathematiques-secondaire"
              element={<OfferLanding forcedRouteKey="mathTutoringSecondary" />}
            />
            <Route
              path="/en/high-school-math-tutoring-quebec"
              element={<OfferLanding forcedRouteKey="mathTutoringSecondary" />}
            />
            <Route
              path="/tuteur-sciences-secondaire"
              element={<OfferLanding forcedRouteKey="scienceTutorSecondary" />}
            />
            <Route
              path="/en/high-school-science-tutor-quebec"
              element={<OfferLanding forcedRouteKey="scienceTutorSecondary" />}
            />
            <Route
              path="/aide-aux-devoirs-secondaire"
              element={<OfferLanding forcedRouteKey="homeworkHelpSecondary" />}
            />
            <Route
              path="/en/high-school-homework-help"
              element={<OfferLanding forcedRouteKey="homeworkHelpSecondary" />}
            />
            <Route
              path="/soutien-scolaire-secondaire"
              element={<OfferLanding forcedRouteKey="academicSupportSecondary" />}
            />
            <Route
              path="/en/high-school-academic-support"
              element={<OfferLanding forcedRouteKey="academicSupportSecondary" />}
            />
            <Route path="/tuteur-maths-montreal" element={<OfferLanding forcedRouteKey="mathTutorMontreal" />} />
            <Route path="/en/montreal-math-tutor" element={<OfferLanding forcedRouteKey="mathTutorMontreal" />} />
            <Route
              path="/aide-aux-devoirs-montreal"
              element={<OfferLanding forcedRouteKey="homeworkHelpMontreal" />}
            />
            <Route
              path="/en/montreal-homework-help"
              element={<OfferLanding forcedRouteKey="homeworkHelpMontreal" />}
            />
            <Route path="/tuteur-sciences-laval" element={<OfferLanding forcedRouteKey="scienceTutorLaval" />} />
            <Route path="/en/laval-science-tutor" element={<OfferLanding forcedRouteKey="scienceTutorLaval" />} />
            <Route
              path="/soutien-scolaire-montreal"
              element={<OfferLanding forcedRouteKey="academicSupportMontreal" />}
            />
            <Route
              path="/en/montreal-academic-support"
              element={<OfferLanding forcedRouteKey="academicSupportMontreal" />}
            />
            <Route
              path="/tuteur-physique-montreal"
              element={<OfferLanding forcedRouteKey="physicsTutorMontreal" />}
            />
            <Route
              path="/en/montreal-physics-tutor"
              element={<OfferLanding forcedRouteKey="physicsTutorMontreal" />}
            />
            <Route
              path="/aide-chimie-laval"
              element={<OfferLanding forcedRouteKey="chemistryHelpLaval" />}
            />
            <Route
              path="/en/laval-chemistry-help"
              element={<OfferLanding forcedRouteKey="chemistryHelpLaval" />}
            />
            <Route
              path="/cours-ete-secondaire"
              element={<OfferLanding forcedRouteKey="summerSupportSecondary" />}
            />
            <Route
              path="/en/high-school-summer-support"
              element={<OfferLanding forcedRouteKey="summerSupportSecondary" />}
            />
            <Route path="/theorie-maths-secondaire-4" element={<Secondary4MathTheory />} />
            <Route path="/en/secondary-4-math-theory" element={<Secondary4MathTheory />} />
            {secondary4MathConceptPages.map((page) => (
              <Route key={page.routeKey} path={page.frPath} element={<Secondary4MathConcept />} />
            ))}
            {secondary4MathConceptPages.map((page) => (
              <Route key={`${page.routeKey}-en`} path={page.enPath} element={<Secondary4MathConcept />} />
            ))}
            <Route
              path="/preparation-examen-ministere-secondaire-4"
              element={<OfferLanding forcedRouteKey="ministerialExamSec4" />}
            />
            <Route
              path="/en/secondary-4-ministerial-exam-prep"
              element={<OfferLanding forcedRouteKey="ministerialExamSec4" />}
            />
            <Route
              path="/entree-au-secondaire"
              element={<OfferLanding forcedRouteKey="entryToSecondary" />}
            />
            <Route
              path="/en/high-school-transition-support"
              element={<OfferLanding forcedRouteKey="entryToSecondary" />}
            />
            <Route path="/ressources" element={<ResourcesHub />} />
            <Route path="/en/resources" element={<ResourcesHub />} />
            <Route path="/blogue" element={<BlogHub />} />
            <Route path="/en/blog" element={<BlogHub />} />
            <Route path="/blogue/anxiete-maths-secondaire-recherche" element={<BlogArticle />} />
            <Route path="/en/blog/math-anxiety-high-school-research" element={<BlogArticle />} />
            <Route path="/blogue/recherche-tutorat-prive-secondaire" element={<BlogArticle />} />
            <Route path="/en/blog/tutoring-research-high-school" element={<BlogArticle />} />
            <Route path="/blogue/aide-aux-devoirs-recherche" element={<BlogArticle />} />
            <Route path="/en/blog/homework-help-research" element={<BlogArticle />} />
            <Route path="/blogue/revision-maths-pratique-espacee" element={<BlogArticle />} />
            <Route path="/en/blog/spaced-practice-math-revision" element={<BlogArticle />} />
            <Route path="/blogue/ecrire-pour-mieux-apprendre-en-sciences" element={<BlogArticle />} />
            <Route path="/en/blog/writing-to-learn-science" element={<BlogArticle />} />
            <Route path="/blogue/parents-aider-sans-mettre-de-pression" element={<BlogArticle />} />
            <Route path="/en/blog/parent-support-without-pressure" element={<BlogArticle />} />
            <Route path="/ressources/preparation-examen-maths-secondaire" element={<ResourceArticle />} />
            <Route path="/en/resources/high-school-math-exam-prep" element={<ResourceArticle />} />
            <Route path="/ressources/preparation-examen-sciences-secondaire" element={<ResourceArticle />} />
            <Route path="/en/resources/high-school-science-exam-prep" element={<ResourceArticle />} />
            <Route path="/ressources/aide-maths-secondaire-4" element={<ResourceArticle />} />
            <Route path="/en/resources/secondary-4-math-help" element={<ResourceArticle />} />
            <Route path="/ressources/rattrapage-scolaire-secondaire" element={<ResourceArticle />} />
            <Route path="/en/resources/high-school-catch-up-tutoring" element={<ResourceArticle />} />
            <Route path="/ressources/preparation-examen-ministeriel-maths" element={<ResourceArticle />} />
            <Route path="/en/resources/math-ministerial-exam-prep" element={<ResourceArticle />} />
            <Route path="/ressources/tuteur-physique-secondaire" element={<ResourceArticle />} />
            <Route path="/en/resources/high-school-physics-tutoring" element={<ResourceArticle />} />
            <Route path="/ressources/aide-chimie-secondaire-5" element={<ResourceArticle />} />
            <Route path="/en/resources/secondary-5-chemistry-help" element={<ResourceArticle />} />
            <Route path="/ressources/tuteur-maths-montreal-secondaire-4" element={<ResourceArticle />} />
            <Route path="/en/resources/montreal-secondary-4-math-tutor" element={<ResourceArticle />} />
            <Route path="/devenir-tuteur" element={<DevenirTuteur />} />
            <Route path="/en/become-a-tutor" element={<DevenirTuteur />} />
            <Route
              path="/emploi-tuteur-secondaire"
              element={<DevenirTuteur forcedRouteKey="employmentTutorSecondary" />}
            />
            <Route
              path="/en/high-school-tutor-jobs-quebec"
              element={<DevenirTuteur forcedRouteKey="employmentTutorSecondary" />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
