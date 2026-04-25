export const siteConfig = {
  siteName: "Méthode Secondaire",
  siteUrl: (import.meta.env?.VITE_SITE_URL || "https://methode-secondaire.vercel.app").replace(/\/$/, ""),
  defaultImage: "/og-image.png",
  locale: "fr_CA",
  email: "chahineralph@gmail.com",
  phone: "+15149520709",
  phoneDisplay: "+1 (514) 952-0709",
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return new URL(normalizedPath, siteConfig.siteUrl).toString()
}
