import { useEffect } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { ArrowRight, CalendarDays, Menu, Phone } from "lucide-react"

import LanguageToggle from "@/components/LanguageToggle"
import StudentAssistantWidget from "@/components/StudentAssistantWidget"
import TrackingManager from "@/components/TrackingManager"
import { Button } from "@/components/ui/button"
import { DECLIC_REQUEST_URL, DECLIC_REQUEST_URL_EN } from "@/config/booking"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getLocaleFromPath, getLocalizedPath, getRouteKeyFromPath } from "@/lib/i18n"
import { siteConfig } from "@/lib/seo"

export default function SiteLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const locale = getLocaleFromPath(location.pathname)
  const isEnglish = locale === "en"
  const homePath = getLocalizedPath("home", locale)
  const isPortalRoute = location.pathname === getLocalizedPath("portal", locale)
  const routeKey = getRouteKeyFromPath(location.pathname)
  const isTutorRoute = ["devenirTuteur", "employmentTutorSecondary"].includes(routeKey)
  const requestUrl = isEnglish ? DECLIC_REQUEST_URL_EN : DECLIC_REQUEST_URL

  const copy = isEnglish
    ? {
        brandTag: "High school tutoring across Quebec",
        menuTitle: "Navigation",
        nav: [
          { type: "route", label: "Home", to: getLocalizedPath("home", locale) },
          { type: "route", label: "Math", to: getLocalizedPath("maths", locale) },
          { type: "route", label: "Science", to: getLocalizedPath("sciences", locale) },
          { type: "route", label: "Our approach", to: getLocalizedPath("approche", locale) },
          { type: "route", label: "Parent path", to: getLocalizedPath("temoignages", locale) },
          { type: "route", label: "Existing client? Sign in", to: getLocalizedPath("portal", locale) },
        ],
        sections: [
          { id: "processus", label: "How it works" },
          { id: "offres", label: "Offers" },
          { id: "faq", label: "FAQ" },
        ],
        call: "Call",
        mobilePrimary: "Request a session",
        portalAction: "Existing client? Sign in",
        emailAction: "Email the team",
        book: "Request a session",
        callPrompt: "Need tutoring? Send a short request with the grade, subject and situation. Call only if the situation is urgent.",
        footerBlurb:
          "Private math and science tutoring for high school students across Quebec. A simple, structured and reassuring experience for parents.",
        footerLinks: [
          { label: "Home", to: getLocalizedPath("home", locale) },
          { label: "Math", to: getLocalizedPath("maths", locale) },
          { label: "Science", to: getLocalizedPath("sciences", locale) },
          { label: "Our approach", to: getLocalizedPath("approche", locale) },
          { label: "Parent trust", to: getLocalizedPath("trust", locale) },
          { label: "Parent path", to: getLocalizedPath("temoignages", locale) },
          { label: "Client portal (sign in)", to: getLocalizedPath("portal", locale) },
          { label: "Become a tutor", to: getLocalizedPath("devenirTuteur", locale) },
          { label: "Blog", to: getLocalizedPath("blogHub", locale) },
        ],
        rights: "All rights reserved.",
      }
    : {
        brandTag: "Tutorat secondaire au Québec",
        menuTitle: "Navigation",
        nav: [
          { type: "route", label: "Accueil", to: getLocalizedPath("home", locale) },
          { type: "route", label: "Maths", to: getLocalizedPath("maths", locale) },
          { type: "route", label: "Sciences", to: getLocalizedPath("sciences", locale) },
          { type: "route", label: "Notre approche", to: getLocalizedPath("approche", locale) },
          { type: "route", label: "Parcours parent", to: getLocalizedPath("temoignages", locale) },
          { type: "route", label: "Déjà client ? Se connecter au portail", to: getLocalizedPath("portal", locale) },
        ],
        sections: [
          { id: "processus", label: "Étapes" },
          { id: "offres", label: "Offres" },
          { id: "faq", label: "FAQ" },
        ],
        call: "Appeler",
        mobilePrimary: "Demander une séance",
        portalAction: "Déjà client ? Se connecter au portail",
        emailAction: "Écrire à l'équipe",
        book: "Demander une séance",
        callPrompt: "Besoin d'un tuteur? Envoyez une courte demande avec le niveau, la matière et la situation. Appelez seulement si c'est urgent.",
        footerBlurb:
          "Tutorat privé en maths et en sciences pour les élèves du secondaire au Québec. Une expérience simple, claire et rassurante pour les parents.",
        footerLinks: [
          { label: "Accueil", to: getLocalizedPath("home", locale) },
          { label: "Maths", to: getLocalizedPath("maths", locale) },
          { label: "Sciences", to: getLocalizedPath("sciences", locale) },
          { label: "Notre approche", to: getLocalizedPath("approche", locale) },
          { label: "Confiance parents", to: getLocalizedPath("trust", locale) },
          { label: "Parcours parent", to: getLocalizedPath("temoignages", locale) },
          { label: "Portail client (connexion)", to: getLocalizedPath("portal", locale) },
          { label: "Devenir tuteur", to: getLocalizedPath("devenirTuteur", locale) },
          { label: "Blogue", to: getLocalizedPath("blogHub", locale) },
        ],
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

  function goToSection(id) {
    if (location.pathname === homePath) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }

    navigate({ pathname: homePath, hash: id })
  }

  const navLinkClass = ({ isActive }) =>
    `text-sm transition ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
  const mobileAction = isTutorRoute
    ? {
        href: "#candidature",
        label: isEnglish ? "Apply now" : "Postuler maintenant",
        icon: ArrowRight,
      }
    : {
        href: requestUrl,
        label: copy.book,
        icon: CalendarDays,
      }
  const MobileActionIcon = mobileAction.icon

  return (
    <div className={`min-h-screen overflow-x-hidden ${isPortalRoute ? "pb-0" : "pb-24 lg:pb-0"}`}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071631]/80 backdrop-blur-xl">
        <div className={`mx-auto flex w-full max-w-7xl items-center justify-between lg:px-8 ${isPortalRoute ? "min-h-16 gap-2 px-3 py-2 sm:gap-3 sm:px-6" : "min-h-[4.75rem] gap-3 px-4 py-3 sm:px-6"}`}>
          <Link to={getLocalizedPath("home", locale)} className={`flex min-w-0 items-center gap-3 ${isPortalRoute ? "flex-1 gap-2" : ""}`}>
            <div className={`grid shrink-0 place-items-center border border-white/15 bg-white/10 ${isPortalRoute ? "h-10 w-10 rounded-[16px] sm:h-11 sm:w-11 sm:rounded-[18px]" : "h-11 w-11 rounded-[18px]"}`}>
              <img
                src="/logo-methode-secondaire-mark-white.svg"
                alt=""
                className={`${isPortalRoute ? "h-7 w-7 sm:h-8 sm:w-8" : "h-8 w-8"} object-contain`}
              />
            </div>
            <div className="hidden min-w-0 min-[360px]:block">
              <div className="truncate font-display text-lg font-semibold text-white">
                <span className="sm:hidden">Méthode</span>
                <span className="hidden sm:inline">Méthode Secondaire</span>
              </div>
              <div className="hidden text-xs uppercase tracking-[0.22em] text-white/50 xl:block">
                {copy.brandTag}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 xl:flex">
            {copy.nav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <LanguageToggle />
            <Button
              asChild
              className={`${isPortalRoute ? "hidden" : ""} rounded-full bg-[#f5c977] px-5 text-[#071631] shadow-[0_12px_30px_rgba(245,201,119,0.28)] hover:bg-[#f7d38f]`}
            >
              <a href={requestUrl}>
                <CalendarDays className="h-4 w-4" />
                {copy.book}
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageToggle compact={isPortalRoute} className="shrink-0" />

            <Button
              asChild
              className={`${isPortalRoute ? "hidden" : ""} h-10 rounded-full bg-[#f5c977] px-3 text-[#071631] shadow-[0_12px_30px_rgba(245,201,119,0.28)] hover:bg-[#f7d38f]`}
            >
              <a href={requestUrl} aria-label={copy.book}>
                <CalendarDays className="h-4 w-4" />
              </a>
            </Button>

            <div className={isPortalRoute ? "hidden" : ""}>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 w-10 rounded-full border-white/15 bg-white/5 p-0 text-white hover:bg-white/10 hover:text-white"
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
                  {copy.nav.map((item) => (
                    <SheetClose asChild key={item.to}>
                      <NavLink
                        to={item.to}
                        className="rounded-2xl px-4 py-3 text-white/85 transition hover:bg-white/10"
                      >
                        {item.label}
                      </NavLink>
                    </SheetClose>
                  ))}

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

                  <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/72">
                    {copy.callPrompt}
                  </div>

                  <SheetClose asChild>
                    <Button
                      asChild
                      className="mt-3 w-full rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                    >
                      <a href={requestUrl}>
                        <CalendarDays className="h-4 w-4" />
                        {copy.book}
                      </a>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-2 w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    >
                      <a href={`tel:${siteConfig.phone}`}>
                        <Phone className="h-4 w-4" />
                        {copy.call}
                      </a>
                    </Button>
                  </SheetClose>

                </div>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-[#04112b]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr,0.8fr,0.9fr] lg:px-8">
          <div className="max-w-xl">
            <img
              src="/logo-methode-secondaire-business-card-white.svg"
              alt="Méthode Secondaire"
              className="mb-4 h-auto w-full max-w-[20rem]"
            />
            <p className="mt-4 text-sm leading-7 text-white/70">{copy.footerBlurb}</p>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
              {isEnglish ? "Quick links" : "Liens rapides"}
            </div>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              {copy.footerLinks.map((link) => (
                <Link key={link.to} to={link.to} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
              {isEnglish ? "Contact" : "Contact"}
            </div>
            <div className="mt-5 space-y-3 text-sm text-white/70">
              <a className="block transition hover:text-white" href={`tel:${siteConfig.phone}`}>
                {siteConfig.phoneDisplay}
              </a>
              <a className="block transition hover:text-white" href={`mailto:${siteConfig.email}`}>
                {copy.emailAction}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45 sm:px-6 lg:px-8">
          {new Date().getFullYear()} Méthode Secondaire. {copy.rights}
        </div>
      </footer>

      {!isPortalRoute ? <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#071631]/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
        <div className="mx-auto w-full max-w-7xl">
          <Button
            asChild
            className="min-h-12 w-full rounded-full bg-[#f5c977] px-4 text-sm text-[#071631] hover:bg-[#f7d38f]"
          >
            <a href={mobileAction.href} aria-label={mobileAction.label}>
              <MobileActionIcon className="h-4 w-4" />
              {mobileAction.label}
            </a>
          </Button>
        </div>
      </div> : null}

      <TrackingManager />
      <StudentAssistantWidget locale={locale} />
    </div>
  )
}
