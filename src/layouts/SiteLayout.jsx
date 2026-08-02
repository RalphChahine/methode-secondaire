import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ArrowRight, CalendarDays } from "lucide-react"

import MarketingFooter from "@/components/marketing/MarketingFooter"
import MarketingHeader from "@/components/marketing/MarketingHeader"
import StudentAssistantWidget from "@/components/StudentAssistantWidget"
import TrackingManager from "@/components/TrackingManager"
import { Button } from "@/components/ui/button"
import { DECLIC_REQUEST_URL, DECLIC_REQUEST_URL_EN } from "@/config/booking"
import { getLocaleFromPath, getLocalizedPath, getRouteKeyFromPath } from "@/lib/i18n"

export default function SiteLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const locale = getLocaleFromPath(location.pathname)
  const isEnglish = locale === "en"
  const homePath = getLocalizedPath("home", locale)
  const routeKey = getRouteKeyFromPath(location.pathname)
  const isPortalRoute = ["portal", "team"].includes(routeKey)
  const suppressMobileAction = ["request", "thankYou", "portal", "team"].includes(routeKey)
  const primaryActionRef = useRef(null)
  const [isStickyActionVisible, setIsStickyActionVisible] = useState(false)
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
          { type: "route", label: "Become a tutor", to: getLocalizedPath("devenirTuteur", locale) },
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
          { type: "route", label: "Devenir tuteur", to: getLocalizedPath("devenirTuteur", locale) },
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

  useEffect(() => {
    if (suppressMobileAction || typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setIsStickyActionVisible(false)
      return undefined
    }

    primaryActionRef.current = document.querySelector("[data-primary-action]")
    if (!primaryActionRef.current) {
      setIsStickyActionVisible(false)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsStickyActionVisible(!entry.isIntersecting)
    }, { threshold: 0.1 })
    observer.observe(primaryActionRef.current)
    return () => observer.disconnect()
  }, [location.pathname, suppressMobileAction])

  return (
    <div className={`min-h-screen overflow-x-hidden ${suppressMobileAction || !isStickyActionVisible ? "pb-0" : "pb-24 lg:pb-0"}`}>
      {/* Responsive navigation contract: h-[100dvh] max-h-[100dvh] flex-col overflow-hidden; min-h-0 flex-1 overflow-y-auto safe-area-inset-bottom. */}
      <MarketingHeader
        locale={locale}
        isEnglish={isEnglish}
        isPortalRoute={isPortalRoute}
        copy={copy}
        requestUrl={requestUrl}
        homePath={homePath}
        goToSection={goToSection}
      />

      <main>
        <Outlet />
      </main>

      {!isPortalRoute ? <MarketingFooter copy={copy} locale={locale} /> : null}

      {!suppressMobileAction ? <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#071631]/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden" aria-hidden={!isStickyActionVisible}>
        <div className={`transition-[transform,opacity] duration-[180ms] ease-out ${isStickyActionVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
          <div className="mx-auto w-full max-w-7xl">
            <Button
              asChild
              className="notebook-button-primary min-h-12 w-full px-4 text-sm"
            >
              <a href={mobileAction.href} aria-label={mobileAction.label}>
                <MobileActionIcon className="h-4 w-4" />
                {mobileAction.label}
              </a>
            </Button>
          </div>
        </div>
      </div> : null}

      <TrackingManager />
      {!isPortalRoute ? <StudentAssistantWidget locale={locale} /> : null}
    </div>
  )
}
