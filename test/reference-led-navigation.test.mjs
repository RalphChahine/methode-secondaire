import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("shared layout delegates navigation and footer to reference-led marketing primitives", async () => {
  const layout = await readFile(new URL("../src/layouts/SiteLayout.jsx", import.meta.url), "utf8")
  const header = await readFile(new URL("../src/components/marketing/MarketingHeader.jsx", import.meta.url), "utf8")
  const footer = await readFile(new URL("../src/components/marketing/MarketingFooter.jsx", import.meta.url), "utf8")

  assert.match(layout, /MarketingHeader/)
  assert.match(layout, /MarketingFooter/)
  assert.match(header, /aria-label/)
  assert.match(header, /SheetTrigger/)
  assert.match(header, /LanguageToggle/)
  assert.match(header, /framer-motion|motion\./)
  assert.match(header, /requestUrl/)
  assert.match(footer, /siteConfig\.phone/)
  assert.match(footer, /siteConfig\.email/)
  assert.match(footer, /footerLinks/)
})

test("portal routes keep the public marketing frame suppressed", async () => {
  const layout = await readFile(new URL("../src/layouts/SiteLayout.jsx", import.meta.url), "utf8")
  assert.match(layout, /isPortalRoute/)
  assert.match(layout, /!isPortalRoute \? <MarketingFooter/)
})
