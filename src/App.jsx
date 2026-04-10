import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import SiteLayout from "@/layouts/SiteLayout"

const Accueil = lazy(() => import("@/pages/Accueil"))
const AccueilEn = lazy(() => import("@/pages/AccueilEn"))
const DevenirTuteur = lazy(() => import("@/pages/DevenirTuteur"))
const Maths = lazy(() => import("@/pages/Maths"))
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
