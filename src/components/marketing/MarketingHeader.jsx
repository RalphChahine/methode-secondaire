import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CalendarDays, Menu, Phone } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

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
import { siteConfig } from "@/lib/seo"

export default function MarketingHeader({
  locale,
  isEnglish,
  isPortalRoute,
  copy,
  requestUrl,
  homePath,
  goToSection,
}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-[0.72rem] font-semibold tracking-[-0.01em] transition-colors ${
      isActive ? "bg-white/10 text-white" : "text-white/68 hover:bg-white/8 hover:text-white"
    }`

  return (
    <motion.header
      initial={false}
      animate={{ backgroundColor: isScrolled ? "rgba(3, 21, 44, 0.94)" : "rgba(3, 21, 44, 1)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl ${isScrolled ? "shadow-[0_8px_30px_rgba(3,21,44,0.16)]" : ""}`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 transition-[min-height,padding] duration-200 sm:px-6 lg:px-10 ${
          isPortalRoute ? "min-h-16 gap-2 py-2" : isScrolled ? "min-h-[4.25rem] gap-3 py-2" : "min-h-[4.75rem] gap-3 py-3"
        }`}
      >
        <Link to={homePath} className="flex min-w-0 items-center gap-3" aria-label="Méthode Secondaire">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] border border-white/15 bg-white/[0.07] sm:h-11 sm:w-11">
            <img src="/logo-methode-secondaire-mark-white.svg" alt="" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
          </div>
          <div className="hidden min-w-0 min-[360px]:block">
            <div className="truncate font-display text-[0.96rem] font-extrabold tracking-[-0.03em] text-white sm:text-[1.05rem]">
              <span className="sm:hidden">Méthode</span>
              <span className="hidden sm:inline">Méthode Secondaire</span>
            </div>
            <div className="hidden text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/45 xl:block">
              {copy.brandTag}
            </div>
          </div>
        </Link>

        <nav aria-label={copy.menuTitle} className="hidden items-center gap-0.5 xl:flex">
          {copy.nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageToggle />
          <Link
            to={getLocalizedPortalPath(locale)}
            className={`${isPortalRoute ? "hidden" : ""} rounded-full border border-white/15 px-3 py-2 text-[0.72rem] font-semibold text-white/78 transition hover:border-white/30 hover:text-white`}
          >
            {copy.portalAction}
          </Link>
          <Button asChild className={`${isPortalRoute ? "hidden" : ""} min-h-10 rounded-full bg-[var(--brand-blue-600)] px-4 text-[0.75rem] font-bold text-white shadow-none hover:bg-[var(--brand-blue-500)]`}>
            <a href={requestUrl} data-primary-action>
              <CalendarDays className="h-4 w-4" />
              {copy.book}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LanguageToggle compact={isPortalRoute} className="shrink-0" />
          <Button asChild className={`${isPortalRoute ? "hidden" : ""} h-10 w-10 rounded-full bg-[var(--brand-blue-600)] p-0 text-white shadow-none hover:bg-[var(--brand-blue-500)]`}>
            <a href={requestUrl} aria-label={copy.book}>
              <CalendarDays className="h-4 w-4" />
            </a>
          </Button>

          <div className={isPortalRoute ? "hidden" : ""}>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 w-10 rounded-full border-white/15 bg-white/[0.04] p-0 text-white hover:bg-white/10 hover:text-white"
                  aria-label={isEnglish ? "Open menu" : "Ouvrir le menu"}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="flex h-[100dvh] max-h-[100dvh] flex-col gap-0 overflow-hidden border-white/10 bg-[var(--brand-navy-950)] text-white">
                <SheetHeader className="shrink-0 pr-10">
                  <SheetTitle className="font-display text-xl text-white">{copy.menuTitle}</SheetTitle>
                </SheetHeader>

                <div className="mt-8 min-h-0 flex-1 overflow-y-auto pb-[calc(1rem+env(safe-area-inset-bottom))] pr-1">
                  <div className="flex flex-col gap-2">
                    {copy.nav.map((item) => (
                      <SheetClose asChild key={item.to}>
                        <NavLink to={item.to} className="rounded-2xl px-4 py-3 text-white/85 transition hover:bg-white/10">
                          {item.label}
                        </NavLink>
                      </SheetClose>
                    ))}

                    <div className="mt-4 border-t border-white/10 pt-4">
                      {copy.sections.map((section) => (
                        <SheetClose asChild key={section.id}>
                          <button type="button" onClick={() => goToSection(section.id)} className="mb-2 w-full rounded-2xl px-4 py-3 text-left text-white/85 transition hover:bg-white/10">
                            {section.label}
                          </button>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="mt-4 rounded-[var(--radius-large)] border border-white/10 bg-white/[0.05] px-4 py-4 text-sm leading-7 text-white/72">
                      {copy.callPrompt}
                    </div>

                    <SheetClose asChild>
                      <Button asChild className="mt-3 min-h-12 w-full rounded-full bg-[var(--brand-blue-600)] text-white shadow-none hover:bg-[var(--brand-blue-500)]">
                        <a href={requestUrl}>
                          <CalendarDays className="h-4 w-4" />
                          {copy.book}
                        </a>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="mt-2 min-h-12 w-full rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white">
                        <a href={`tel:${siteConfig.phone}`}>
                          <Phone className="h-4 w-4" />
                          {copy.call}
                        </a>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

function getLocalizedPortalPath(locale) {
  return locale === "en" ? "/en/portal" : "/portail"
}
