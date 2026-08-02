import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("home uses the reference-led proof, process, and pricing sections instead of a starting-point grid", async () => {
  const [fr, en] = await Promise.all([
    readFile(new URL("../src/pages/Accueil.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/AccueilEn.jsx", import.meta.url), "utf8"),
  ])
  for (const source of [fr, en]) {
    assert.doesNotMatch(source, /ParentStartingPointsSection/)
    assert.match(source, /ReferenceHomeSections/)
    assert.match(source, /targetedSessionOffer/)
    assert.match(source, /progressionBlockOffer/)
    assert.match(source, /data-primary-action|requestUrl/)
  }
})

test("subject pages send one clear subject-prefilled request action", async () => {
  const [maths, sciences] = await Promise.all([
    readFile(new URL("../src/pages/Maths.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/Sciences.jsx", import.meta.url), "utf8"),
  ])
  assert.doesNotMatch(maths, /LeadForm|FirstSessionRequestForm/)
  assert.doesNotMatch(sciences, /LeadForm|FirstSessionRequestForm/)
  assert.match(maths, /subject=math/)
  assert.match(sciences, /subject=science/)
})

test("request form accepts only the supported subject prefill values", async () => {
  const source = await readFile(new URL("../src/components/FirstSessionRequestForm.jsx", import.meta.url), "utf8")
  assert.match(source, /initialSubject/)
  assert.match(source, /math.*science.*physics.*chemistry/)
})
