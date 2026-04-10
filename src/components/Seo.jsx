import { useEffect } from "react"

import { absoluteUrl, siteConfig } from "@/lib/seo"

function upsertMeta(attribute, key, content) {
  if (!content) {
    return
  }

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute("content", content)
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement("link")
    element.setAttribute("rel", rel)
    document.head.appendChild(element)
  }

  element.setAttribute("href", href)
}

export default function Seo({
  title,
  description,
  path = "/",
  keywords = "",
  image = siteConfig.defaultImage,
  type = "website",
  jsonLd,
}) {
  const canonicalUrl = absoluteUrl(path)
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image)

  useEffect(() => {
    document.documentElement.setAttribute("lang", "fr-CA")
    document.title = title

    upsertMeta("name", "description", description)
    upsertMeta("name", "keywords", keywords)
    upsertMeta("name", "author", siteConfig.siteName)
    upsertMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    )
    upsertMeta("name", "theme-color", "#071631")

    upsertMeta("property", "og:locale", siteConfig.locale)
    upsertMeta("property", "og:type", type)
    upsertMeta("property", "og:site_name", siteConfig.siteName)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:url", canonicalUrl)
    upsertMeta("property", "og:image", imageUrl)
    upsertMeta("property", "og:image:alt", "Identité visuelle de Méthode Secondaire")

    upsertMeta("name", "twitter:card", "summary_large_image")
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "twitter:image", imageUrl)

    upsertLink("canonical", canonicalUrl)

    document.head
      .querySelectorAll('script[data-seo-managed="true"]')
      .forEach((element) => element.remove())

    const entries = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []

    entries.forEach((entry) => {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.dataset.seoManaged = "true"
      script.textContent = JSON.stringify(entry)
      document.head.appendChild(script)
    })
  }, [canonicalUrl, description, imageUrl, jsonLd, keywords, title, type])

  return null
}
