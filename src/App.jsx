import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import SiteLayout from "@/layouts/SiteLayout"

const Accueil = lazy(() => import("@/pages/Accueil"))
const AccueilEn = lazy(() => import("@/pages/AccueilEn"))
const DevenirTuteur = lazy(() => import("@/pages/DevenirTuteur"))
const LocalLanding = lazy(() => import("@/pages/LocalLanding"))
const Maths = lazy(() => import("@/pages/Maths"))
const ResourceArticle = lazy(() => import("@/pages/ResourceArticle"))
const ResourcesHub = lazy(() => import("@/pages/ResourcesHub"))
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
            <Route path="/tuteurs" element={<Tuteurs />} />
            <Route path="/en/tutors" element={<Tuteurs />} />
            <Route path="/tutorat-montreal" element={<LocalLanding forcedRouteKey="montreal" />} />
            <Route path="/en/montreal-tutoring" element={<LocalLanding forcedRouteKey="montreal" />} />
            <Route path="/tutorat-laval" element={<LocalLanding forcedRouteKey="laval" />} />
            <Route path="/en/laval-tutoring" element={<LocalLanding forcedRouteKey="laval" />} />
            <Route path="/tutorat-en-ligne-quebec" element={<LocalLanding forcedRouteKey="quebecOnline" />} />
            <Route path="/en/quebec-online-tutoring" element={<LocalLanding forcedRouteKey="quebecOnline" />} />
            <Route path="/ressources" element={<ResourcesHub />} />
            <Route path="/en/resources" element={<ResourcesHub />} />
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
            <Route path="/reussites" element={<Navigate to="/temoignages" replace />} />
            <Route path="/en/success-stories" element={<Navigate to="/en/testimonials" replace />} />
            <Route path="/devenir-tuteur" element={<DevenirTuteur />} />
            <Route path="/en/become-a-tutor" element={<DevenirTuteur />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
