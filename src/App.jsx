import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import SiteLayout from "@/layouts/SiteLayout"
import Accueil from "@/pages/Accueil"
import Maths from "@/pages/Maths"
import Sciences from "@/pages/Sciences"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/maths" element={<Maths />} />
          <Route path="/sciences" element={<Sciences />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
