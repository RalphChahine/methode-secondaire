import { BrowserRouter, Routes, Route } from "react-router-dom"

import SiteLayout from "@/layouts/SiteLayout"
import Accueil from "@/pages/Accueil"
import Maths from "@/pages/Maths"
import Sciences from "@/pages/Sciences"


// Temporary placeholder (until we build Sciences)
function Placeholder({ title }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<SiteLayout />}>
          {/* Home */}
          <Route path="/" element={<Accueil />} />

          {/* Pages */}
          <Route path="/maths" element={<Maths />} />
          <Route path="/sciences" element={<Sciences />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
