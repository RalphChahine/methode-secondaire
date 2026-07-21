import { Link, useLocation } from "react-router-dom"

import { getLocaleFromPath, translatePathname } from "@/lib/i18n"

export default function LanguageToggle({ className = "", compact = false }) {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)

  const pathSuffix = `${location.search || ""}${location.hash || ""}`
  const frPath = `${translatePathname(location.pathname, "fr")}${pathSuffix}`
  const enPath = `${translatePathname(location.pathname, "en")}${pathSuffix}`

  return (
    <div
      className={`inline-flex shrink-0 items-center rounded-full border border-white/15 bg-white/5 text-white/70 ${
        compact ? "p-0 text-[0.7rem] sm:p-0.5 sm:text-xs" : "p-0.5 text-xs sm:p-1 sm:text-sm"
      } ${className}`.trim()}
      aria-label="Language switcher"
    >
      <Link
        to={frPath}
        className={`rounded-full transition ${compact ? "px-2 py-1 sm:px-2.5 sm:py-1" : "px-2.5 py-1 sm:px-3 sm:py-1.5"} ${
          locale === "fr" ? "bg-white text-[#071631]" : "hover:bg-white/10 hover:text-white"
        }`}
      >
        FR
      </Link>
      <Link
        to={enPath}
        className={`rounded-full transition ${compact ? "px-2 py-1 sm:px-2.5 sm:py-1" : "px-2.5 py-1 sm:px-3 sm:py-1.5"} ${
          locale === "en" ? "bg-white text-[#071631]" : "hover:bg-white/10 hover:text-white"
        }`}
      >
        EN
      </Link>
    </div>
  )
}
