import { Outlet, Link, NavLink, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function SiteLayout() {
  const location = useLocation()

  const linkClass = ({ isActive }) =>
    "text-sm transition " + (isActive ? "text-white" : "text-white/70 hover:text-white")

  function goToSection(id) {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/15 grid place-items-center text-white font-bold">
              MS
            </div>
            <div className="text-white leading-tight">
              <div className="font-semibold">Méthode Secondaire</div>
              <div className="text-xs text-white/60">Secondaire 1 à 5</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/maths" className={linkClass}>Maths</NavLink>
            <NavLink to="/sciences" className={linkClass}>Sciences</NavLink>

            <button
              onClick={() => goToSection("programmes")}
              className="text-sm text-white/70 hover:text-white transition"
              type="button"
            >
              Programmes
            </button>
            <button
              onClick={() => goToSection("prix")}
              className="text-sm text-white/70 hover:text-white transition"
              type="button"
            >
              Prix
            </button>
            <button
              onClick={() => goToSection("contact")}
              className="text-sm text-white/70 hover:text-white transition"
              type="button"
            >
              Contact
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Desktop CTA */}
            <Button
              className="hidden md:inline-flex rounded-2xl bg-white text-black hover:bg-white/90"
              onClick={() => goToSection("contact")}
            >
              Réserver
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-black text-white border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-2">
                  {/* Routes */}
                  <SheetClose asChild>
                    <NavLink to="/" className="rounded-2xl px-4 py-3 hover:bg-white/10 transition">
                      Accueil
                    </NavLink>
                  </SheetClose>

                  <SheetClose asChild>
                    <NavLink to="/maths" className="rounded-2xl px-4 py-3 hover:bg-white/10 transition">
                      Maths
                    </NavLink>
                  </SheetClose>

                  <SheetClose asChild>
                    <NavLink to="/sciences" className="rounded-2xl px-4 py-3 hover:bg-white/10 transition">
                      Sciences
                    </NavLink>
                  </SheetClose>

                  {/* Sections on Accueil */}
                  <SheetClose asChild>
                    <button
                      type="button"
                      onClick={() => goToSection("programmes")}
                      className="text-left rounded-2xl px-4 py-3 hover:bg-white/10 transition"
                    >
                      Programmes
                    </button>
                  </SheetClose>

                  <SheetClose asChild>
                    <button
                      type="button"
                      onClick={() => goToSection("prix")}
                      className="text-left rounded-2xl px-4 py-3 hover:bg-white/10 transition"
                    >
                      Prix
                    </button>
                  </SheetClose>

                  <SheetClose asChild>
                    <button
                      type="button"
                      onClick={() => goToSection("contact")}
                      className="text-left rounded-2xl px-4 py-3 hover:bg-white/10 transition"
                    >
                      Contact
                    </button>
                  </SheetClose>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <SheetClose asChild>
                      <Button
                        className="w-full rounded-2xl bg-white text-black hover:bg-white/90"
                        onClick={() => goToSection("contact")}
                      >
                        Réserver
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-black text-white/60">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm">
          © {new Date().getFullYear()} Méthode Secondaire
        </div>
      </footer>
    </div>
  )
}
