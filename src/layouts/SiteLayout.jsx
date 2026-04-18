import { useEffect } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { CalendarDays, Mail, MapPin, Menu, Phone } from "lucide-react"

import LanguageToggle from "@/components/LanguageToggle"
import StudentAssistantWidget from "@/components/StudentAssistantWidget"
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
import { siteConfig } from "@/lib/seo"

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
        call: "Call first",
        callDiagnostic: "Call for a diagnostic",
        callPrompt: "Talk first, then book if it feels right.",
        menuTitle: "Navigation",
        joinTutor: "Become a tutor",
        locations: "Areas served",
        quickLinks: "Quick links",
        about:
          "Private tutoring in math and science for high school students across Quebec. A clear, structured and reassuring approach to help students understand better, practice better and perform better.",
        math: "Math tutoring",
        science: "Science tutoring",
        testimonials: "Testimonials",
        tutors: "Tutors",
        montreal: "Montreal tutoring",
        laval: "Laval tutoring",
        onlineQuebec: "Online tutoring in Quebec",
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
        call: "Appeler d'abord",
        callDiagnostic: "Appeler pour un diagnostic",
        callPrompt: "Le mieux est souvent d'en parler d'abord, puis de réserver.",
        menuTitle: "Navigation",
        joinTutor: "Devenir tuteur",
        locations: "Zones desservies",
        quickLinks: "Accès rapide",
        about:
          "Tutorat privé en mathématiques et en sciences pour les élèves du secondaire au Québec. Une approche claire, structurée et rassurante pour mieux comprendre, mieux pratiquer et mieux performer.",
        math: "Tutorat maths",
        science: "Tutorat sciences",
        testimonials: "Témoignages",
        tutors: "Tuteurs",
        montreal: "Tutorat Montréal",
        laval: "Tutorat Laval",
        onlineQuebec: "Tutorat en ligne Québec",
        contact: "Contact",
        bookingLine: "Réservation en ligne",
        cityLine: "En ligne, Montréal et Laval",
        rights: "Tous droits réservés.",
      }

  const footerHighlights = isEnglish
    ? ["15-minute diagnostic call", "Online across Quebec", "Math, science, exam prep"]
    : ["Appel diagnostic 15 min", "En ligne partout au Qu\u00E9bec", "Maths, sciences, pr\u00E9paration d'examens"]

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
    <div className="min-h-screen pb-24 lg:pb-0">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071631]/75 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[4.75rem] w-full max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:h-20 sm:gap-4 sm:px-6 sm:py-0 lg:px-8">
          <Link to={getLocalizedPath("home", locale)} className="flex min-w-0 flex-1 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[18px] border border-white/15 bg-white/10 text-white shadow-lg shadow-black/10 sm:h-12 sm:w-12">
              <img
                src="/logo-methode-secondaire-mark-white.svg"
                alt=""
                className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-base font-semibold text-white sm:text-lg">Méthode Secondaire</div>
              <div className="hidden text-xs uppercase tracking-[0.22em] text-white/55 sm:block">{copy.brandTag}</div>
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
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4" />
                {copy.call}
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                {copy.book}
              </a>
            </Button>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <LanguageToggle className="shrink-0" />

            <Button
              asChild
              className="h-11 rounded-full bg-[#f5c977] px-4 text-[#071631] shadow-[0_12px_30px_rgba(245,201,119,0.28)] hover:bg-[#f7d38f]"
            >
              <a href={`tel:${siteConfig.phone}`} aria-label={copy.callDiagnostic}>
                <Phone className="h-4 w-4" />
              </a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 w-11 rounded-full border-white/15 bg-white/5 p-0 text-white hover:bg-white/10 hover:text-white"
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
                    <div className="mb-2 px-4 text-xs text-white/60">
                      {copy.callPrompt}
                    </div>
                    <SheetClose asChild>
                      <Button
                        asChild
                        className="mb-3 w-full rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                      >
                        <a href={`tel:${siteConfig.phone}`}>
                          <Phone className="h-4 w-4" />
                          {copy.callDiagnostic}
                        </a>
                      </Button>
                    </SheetClose>
                  </div>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                      {copy.locations}
                    </div>
                    <SheetClose asChild>
                      <NavLink
                        to={getLocalizedPath("montreal", locale)}
                        className="mb-2 block rounded-2xl px-4 py-3 text-white/85 transition hover:bg-white/10"
                      >
                        {copy.montreal}
                      </NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <NavLink
                        to={getLocalizedPath("laval", locale)}
                        className="mb-2 block rounded-2xl px-4 py-3 text-white/85 transition hover:bg-white/10"
                      >
                        {copy.laval}
                      </NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <NavLink
                        to={getLocalizedPath("quebecOnline", locale)}
                        className="rounded-2xl px-4 py-3 text-white/85 transition hover:bg-white/10"
                      >
                        {copy.onlineQuebec}
                      </NavLink>
                    </SheetClose>
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
            <img
              src="/logo-methode-secondaire-business-card-white.svg"
              alt="Methode Secondaire"
              className="mb-4 h-auto w-full max-w-[22rem]"
            />
            <p className="mt-4 text-sm leading-7 text-white/70">{copy.about}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {footerHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
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
              <Link to={getLocalizedPath("montreal", locale)} className="transition hover:text-white">
                {copy.montreal}
              </Link>
              <Link to={getLocalizedPath("laval", locale)} className="transition hover:text-white">
                {copy.laval}
              </Link>
              <Link to={getLocalizedPath("quebecOnline", locale)} className="transition hover:text-white">
                {copy.onlineQuebec}
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
              <a className="flex items-center gap-3 transition hover:text-white" href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4 text-[#f5c977]" />
                {siteConfig.phoneDisplay}
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

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#071631]/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex w-full max-w-7xl gap-3">
          <Button asChild className="flex-1 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" />
              {copy.call}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">
              <CalendarDays className="h-4 w-4" />
              {copy.bookSession}
            </a>
          </Button>
        </div>
      </div>

      <StudentAssistantWidget locale={locale} />
    </div>
  )
}
