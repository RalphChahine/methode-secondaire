import { absoluteUrl } from "@/lib/seo"

export const routeCatalog = {
  home: { fr: "/", en: "/en" },
  maths: { fr: "/maths", en: "/en/math-tutoring" },
  sciences: { fr: "/sciences", en: "/en/science-tutoring" },
  temoignages: { fr: "/temoignages", en: "/en/testimonials" },
  tuteurs: { fr: "/tuteurs", en: "/en/tutors" },
  devenirTuteur: { fr: "/devenir-tuteur", en: "/en/become-a-tutor" },
  montreal: { fr: "/tutorat-montreal", en: "/en/montreal-tutoring" },
  laval: { fr: "/tutorat-laval", en: "/en/laval-tutoring" },
  quebecOnline: { fr: "/tutorat-en-ligne-quebec", en: "/en/quebec-online-tutoring" },
}

const routeEntries = Object.entries(routeCatalog)

function normalizePath(pathname = "/") {
  if (!pathname || pathname === "/") {
    return "/"
  }

  return pathname.replace(/\/+$/, "") || "/"
}

export function getLocaleFromPath(pathname = "/") {
  const normalized = normalizePath(pathname)
  return normalized === "/en" || normalized.startsWith("/en/") ? "en" : "fr"
}

export function getLocalizedPath(routeKey, locale = "fr") {
  return routeCatalog[routeKey]?.[locale] || routeCatalog.home[locale]
}

export function getRouteKeyFromPath(pathname = "/") {
  const normalized = normalizePath(pathname)

  const match = routeEntries.find(([, paths]) => paths.fr === normalized || paths.en === normalized)
  return match?.[0] || "home"
}

export function translatePathname(pathname = "/", targetLocale = "fr") {
  const routeKey = getRouteKeyFromPath(pathname)
  return getLocalizedPath(routeKey, targetLocale)
}

export function getHtmlLang(locale = "fr") {
  return locale === "en" ? "en-CA" : "fr-CA"
}

export function getOgLocale(locale = "fr") {
  return locale === "en" ? "en_CA" : "fr_CA"
}

export function getAlternateOgLocale(locale = "fr") {
  return locale === "en" ? "fr_CA" : "en_CA"
}

export function buildAlternates(routeKey) {
  const paths = routeCatalog[routeKey]

  if (!paths) {
    return []
  }

  return [
    { hrefLang: "fr-CA", href: absoluteUrl(paths.fr) },
    { hrefLang: "en-CA", href: absoluteUrl(paths.en) },
    { hrefLang: "x-default", href: absoluteUrl(paths.fr) },
  ]
}
