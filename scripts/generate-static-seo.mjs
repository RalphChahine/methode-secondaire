import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { buildAlternates, getAlternateOgLocale, getHtmlLang, getOgLocale } from "../src/lib/i18n.js"
import { getPrerenderPageEntries } from "../src/lib/prerenderSeoData.js"
import { absoluteUrl, siteConfig } from "../src/lib/seo.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..")
const distDir = path.join(projectRoot, "dist")
const distIndexPath = path.join(distDir, "index.html")
const publicSitemapPath = path.join(projectRoot, "public", "sitemap.xml")
const buildDate = new Date().toISOString().slice(0, 10)

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function setTitle(html, value) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(value)}</title>`)
}

function setHtmlLang(html, value) {
  return html.replace(/<html lang="[^"]+">/i, `<html lang="${escapeHtml(value)}">`)
}

function setMetaByName(html, name, value) {
  const pattern = new RegExp(`<meta[^>]+name="${name}"[^>]+content="[^"]*"[^>]*>`, "i")
  return html.replace(pattern, `<meta name="${name}" content="${escapeHtml(value)}" />`)
}

function setMetaByProperty(html, property, value) {
  const pattern = new RegExp(`<meta[^>]+property="${property}"[^>]+content="[^"]*"[^>]*>`, "i")
  return html.replace(pattern, `<meta property="${property}" content="${escapeHtml(value)}" />`)
}

function setCanonicalAndAlternates(html, page) {
  const canonical = `    <link rel="canonical" href="${escapeHtml(absoluteUrl(page.path))}" />`
  const alternates = buildAlternates(page.routeKey)
    .map((item) => `    <link rel="alternate" hreflang="${escapeHtml(item.hrefLang)}" href="${escapeHtml(item.href)}" />`)
    .join("\n")

  let output = html
  output = output.replace(/\s*<link rel="canonical"[^>]*>/gi, "")
  output = output.replace(/\s*<link rel="alternate" hreflang="[^"]+"[^>]*>/gi, "")

  return output.replace(
    /(\s*<link rel="preconnect" href="https:\/\/fonts.googleapis.com" \/>)/i,
    `\n${canonical}\n${alternates}\n$1`,
  )
}

function buildJsonLd(page) {
  const schema = {
    "@context": "https://schema.org",
    "@type": page.schemaType || "WebPage",
    name: page.name,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: getHtmlLang(page.locale),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  }

  return JSON.stringify(schema, null, 2).replace(/</g, "\\u003c")
}

function setJsonLd(html, page) {
  return html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `    <script type="application/ld+json">\n${buildJsonLd(page)
      .split("\n")
      .map((line) => `      ${line}`)
      .join("\n")}\n    </script>`,
  )
}

function setNoscriptContent(html, page) {
  let output = html.replace(
    /(<noscript>[\s\S]*?<h1[^>]*>)[\s\S]*?(<\/h1>)/i,
    `$1${escapeHtml(page.name)}$2`,
  )

  output = output.replace(
    /(<noscript>[\s\S]*?<p[^>]*>)[\s\S]*?(<\/p>)/i,
    `$1${escapeHtml(page.description)}$2`,
  )

  return output
}

function personalizeHtml(baseHtml, page) {
  let html = baseHtml

  html = setHtmlLang(html, getHtmlLang(page.locale))
  html = setTitle(html, page.title)
  html = setMetaByName(html, "description", page.description)
  html = setMetaByName(html, "keywords", page.keywords)
  html = setMetaByName(html, "robots", page.robots)
  html = setMetaByProperty(html, "og:type", page.ogType || "website")
  html = setMetaByProperty(html, "og:title", page.title)
  html = setMetaByProperty(html, "og:description", page.description)
  html = setMetaByProperty(html, "og:url", absoluteUrl(page.path))
  html = setMetaByProperty(html, "og:locale", getOgLocale(page.locale))
  html = setMetaByName(html, "twitter:title", page.title)
  html = setMetaByName(html, "twitter:description", page.description)
  html = setCanonicalAndAlternates(html, page)
  html = setJsonLd(html, page)
  html = setNoscriptContent(html, page)

  const alternateLocale = getAlternateOgLocale(page.locale)
  if (html.includes('property="og:locale:alternate"')) {
    html = setMetaByProperty(html, "og:locale:alternate", alternateLocale)
  } else {
    html = html.replace(
      /(<meta property="og:locale"[^>]*>\s*)/i,
      `$1<meta property="og:locale:alternate" content="${escapeHtml(alternateLocale)}" />\n    `,
    )
  }

  return html
}

async function writePageHtml(page, baseHtml) {
  const personalizedHtml = personalizeHtml(baseHtml, page)
  const targetPath =
    page.path === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, page.path.replace(/^\//, ""), "index.html")

  await fs.mkdir(path.dirname(targetPath), { recursive: true })
  await fs.writeFile(targetPath, personalizedHtml, "utf8")
}

function buildSitemap(pages) {
  const urls = pages
    .filter((page) => page.includeInSitemap !== false)
    .map(
      (page) => `  <url>
    <loc>${escapeHtml(absoluteUrl(page.path))}</loc>
    <lastmod>${buildDate}</lastmod>
  </url>`,
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

async function main() {
  const baseHtml = await fs.readFile(distIndexPath, "utf8")
  const pages = getPrerenderPageEntries()
  const sitemapXml = buildSitemap(pages)

  for (const page of pages) {
    await writePageHtml(page, baseHtml)
  }

  await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8")
  await fs.writeFile(publicSitemapPath, sitemapXml, "utf8")
}

await main()
