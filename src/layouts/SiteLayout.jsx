import { useEffect } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { CalendarDays, Mail, MapPin, Menu, Phone } from "lucide-react"

import LanguageToggle from "@/components/LanguageToggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BOOKING_URL } from "@/config/booking"
import { getLocaleFromPath, getLocalizedPath } from "@/lib/i18n"

export default function SiteLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const locale = getLocaleFromPath(location.pathname)
  const isEnglish = locale === "en"

  const copy = isEnglish
    ? {
        sections: [
          { id: "methode", label: "Method" },
          { id: "tarifs", label: "Pricing" },
          { id: "faq", label: "FAQ" },
          { id: "contact", label: "Contact" },
        ],
        pages: [
          { to: getLocalizedPath("home", locale), label: "Home" },
          { to: getLocalizedPath("maths", locale), label: "Math tutoring" },
          { to: getLocalizedPath("sciences", locale), label: "Science tutoring" },
          { to: getLocalizedPath("temoignages", locale), label: "Testimonials" },
          { to: getLocalizedPath("tuteurs", locale), label: "Tutors" },
        ],
        brandTag: "High school tutoring across Quebec",
        book: "Book now",
        bookSession: "Book a session",
        menuTitle: "Navigation",
        joinTutor: "Become a tutor",
        quickLinks: "Quick links",
        about:
          "Private tutoring in math and science for high school students across Quebec. A clear, structured and reassuring approach to help students understand better, practice better and perform better.",
        math: "Math tutoring",
        science: "Science tutoring",
        testimonials: "Testimonials",
        tutors: "Tutors",
        contact: "Contact",
        bookingLine: "Online booking",
        cityLine: "Online, Montreal and Laval",
        rights: "All rights reserved.",
      }
    : {
        sections: [
          { id: "methode", label: "Méthode" },
          { id: "tarifs", label: "Tarifs" },
          { id: "faq", label: "FAQ" },
          { id: "contact", label: "Contact" },
        ],
        pages: [
          { to: getLocalizedPath("home", locale), label: "Accueil" },
          { to: getLocalizedPath("maths", locale), label: "Maths" },
          { to: getLocalizedPath("sciences", locale), label: "Sciences" },
          { to: getLocalizedPath("temoignages", locale), label: "Témoignages" },
          { to: getLocalizedPath("tuteurs", locale), label: "Tuteurs" },
        ],
        brandTag: "Tutorat secondaire au Québec",
        book: "Réserver",
        bookSession: "Réserver une séance",
        menuTitle: "Navigation",
        joinTutor: "Devenir tuteur",
        quickLinks: "Accès rapide",
        about:
          "Tutorat privé en mathématiques et en sciences pour les élèves du secondaire au Québec. Une approche claire, structurée et rassurante pour mieux comprendre, mieux pratiquer et mieux performer.",
        math: "Tutorat maths",
        science: "Tutorat sciences",
        testimonials: "Témoignages",
        tutors: "Tuteurs",
        contact: "Contact",
        bookingLine: "Réservation en ligne",
        cityLine: "En ligne, Montréal et Laval",
        rights: "Tous droits réservés.",
      }

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = location.hash.replace("#", "")
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 60)

    return () => window.clearTimeout(timer)
  }, [location.hash, location.pathname])

  const navLinkClass = ({ isActive }) =>
    `text-sm transition ${isActive ? "text-white" : "text-white/70 hover:text-white"}`

  function goToSection(id) {
    const homePath = getLocalizedPath("home", locale)

    if (location.pathname === homePath) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }

    navigate({ pathname: homePath, hash: id })
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071631]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <Link to={getLocalizedPath("home", locale)} className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-[18px] border border-white/15 bg-white/10 text-white shadow-lg shadow-black/10">
              <span className="font-display text-lg font-bold tracking-[-0.08em]">MS</span>
            </div>

            <div className="leading-tight">
              <div className="font-display text-lg font-semibold text-white">Méthode Secondaire</div>
              <div className="text-xs uppercase tracking-[0.22em] text-white/55">{copy.brandTag}</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {copy.pages.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageToggle />

            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link to={getLocalizedPath("devenirTuteur", locale)}>{copy.joinTutor}</Link>
            </Button>

            <Button
              asChild
              className="rounded-full bg-[#f5c977] px-5 text-[#071631] shadow-[0_12px_30px_rgba(245,201,119,0.28)] hover:bg-[#f7d38f]"
            >
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                {copy.book}
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  aria-label={isEnglish ? "Open menu" : "Ouvrir le menu"}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="border-white/10 bg-[#071631] text-white">
                <SheetHeader>
                  <SheetTitle className="font-display text-xl text-white">{copy.menuTitle}</SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-2">
                  {copy.pages.map((link) => (
                    <SheetClose asChild key={link.to}>
                      <NavLink to={link.to} className="rounded-2xl px-4 py-3 text-white/85 transition hover:bg-white/10">
                        {link.label}
                      </NavLink>
                    </SheetClose>
                  ))}

                  <SheetClose asChild>
                    <NavLink
                      to={getLocalizedPath("devenirTuteur", locale)}
                      className="rounded-2xl px-4 py-3 text-white/85 transition hover:bg-white/10"
                    >
                      {copy.joinTutor}
                    </NavLink>
                  </SheetClose>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    {copy.sections.map((section) => (
                      <SheetClose asChild key={section.id}>
                        <button
                          type="button"
                          onClick={() => goToSection(section.id)}
                          className="mb-2 w-full rounded-2xl px-4 py-3 text-left text-white/85 transition hover:bg-white/10"
                        >
                          {section.label}
                        </button>
                      </SheetClose>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <SheetClose asChild>
                      <Button
                        asChild
                        className="w-full rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                      >
                        <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                          {copy.bookSession}
                        </a>
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

      <footer className="border-t border-white/10 bg-[#04112b]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr,0.8fr,0.8fr] lg:px-8">
          <div className="max-w-xl">
            <div className="font-display text-2xl font-semibold text-white">Méthode Secondaire</div>
            <p className="mt-4 text-sm leading-7 text-white/70">{copy.about}</p>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
              {copy.quickLinks}
            </div>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <Link to={getLocalizedPath("home", locale)} className="transition hover:text-white">
                {copy.pages[0].label}
              </Link>
              <Link to={getLocalizedPath("maths", locale)} className="transition hover:text-white">
                {copy.math}
              </Link>
              <Link to={getLocalizedPath("sciences", locale)} className="transition hover:text-white">
                {copy.science}
              </Link>
              <Link to={getLocalizedPath("temoignages", locale)} className="transition hover:text-white">
                {copy.testimonials}
              </Link>
              <Link to={getLocalizedPath("tuteurs", locale)} className="transition hover:text-white">
                {copy.tutors}
              </Link>
              <Link to={getLocalizedPath("devenirTuteur", locale)} className="transition hover:text-white">
                {copy.joinTutor}
              </Link>
              {copy.sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => goToSection(section.id)}
                  className="text-left transition hover:text-white"
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
              {copy.contact}
            </div>
            <div className="mt-5 space-y-3 text-sm text-white/70">
              <a className="flex items-center gap-3 transition hover:text-white" href="tel:+15149520709">
                <Phone className="h-4 w-4 text-[#f5c977]" />
                +1 (514) 952-0709
              </a>
              <a className="flex items-center gap-3 transition hover:text-white" href="mailto:chahineralph@gmail.com">
                <Mail className="h-4 w-4 text-[#f5c977]" />
                chahineralph@gmail.com
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#f5c977]" />
                {copy.cityLine}
              </div>
              <a
                className="flex items-center gap-3 transition hover:text-white"
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
              >
                <CalendarDays className="h-4 w-4 text-[#f5c977]" />
                {copy.bookingLine}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Méthode Secondaire. {copy.rights}
        </div>
      </footer>
    </div>
  )
}
