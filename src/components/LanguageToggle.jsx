import { Link, useLocation } from "react-router-dom"

import { getLocaleFromPath, translatePathname } from "@/lib/i18n"

export default function LanguageToggle({ className = "" }) {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)

  const frPath = `${translatePathname(location.pathname, "fr")}${location.hash || ""}`
  const enPath = `${translatePathname(location.pathname, "en")}${location.hash || ""}`

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs text-white/70 sm:p-1 sm:text-sm ${className}`.trim()}
      aria-label="Language switcher"
    >
      <Link
        to={frPath}
        className={`rounded-full px-2.5 py-1 transition sm:px-3 sm:py-1.5 ${
          locale === "fr" ? "bg-white text-[#071631]" : "hover:bg-white/10 hover:text-white"
        }`}
      >
        FR
      </Link>
      <Link
        to={enPath}
        className={`rounded-full px-2.5 py-1 transition sm:px-3 sm:py-1.5 ${
          locale === "en" ? "bg-white text-[#071631]" : "hover:bg-white/10 hover:text-white"
        }`}
      >
        EN
      </Link>
    </div>
  )
}
