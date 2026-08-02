import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("home uses the reference-led composition and truthful data sources", async () => {
  const home = await readFile(new URL("../src/pages/Accueil.jsx", import.meta.url), "utf8")
  const sections = await readFile(new URL("../src/components/marketing/ReferenceHomeSections.jsx", import.meta.url), "utf8")

  assert.match(home, /ReferenceHomeSections/)
  assert.match(sections, /brand-navy-950/)
  assert.match(sections, /data-primary-action/)
  assert.match(sections, /pricing\.js|targetedSessionOffer|progressionBlockOffer/)
  assert.match(sections, /Aperçu sans données personnelles|Preview without personal data/)
  assert.doesNotMatch(sections, /4\.9\s*\/\s*5|350\+|Alexandre|Camille|Émile|Alex|Camille|Emile/)
  assert.match(sections, /prefers-reduced-motion|useReducedMotion/)
})

test("home keeps English and French copy in the same component", async () => {
  const sections = await readFile(new URL("../src/components/marketing/ReferenceHomeSections.jsx", import.meta.url), "utf8")
  assert.match(sections, /locale === "en"/)
  assert.match(sections, /Demander une premi|Request a first session/)
  assert.match(sections, /Comprendre|Understand/)
  assert.match(sections, /Planifier|Plan/)
  assert.match(sections, /Progresser|Progress/)
})
