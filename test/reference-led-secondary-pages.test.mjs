import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

const pageFiles = [
  "NotreApproche.jsx",
  "Tuteurs.jsx",
  "ParentTrust.jsx",
  "Temoignages.jsx",
  "LocalLanding.jsx",
  "OfferLanding.jsx",
  "ResourcesHub.jsx",
  "ResourceArticle.jsx",
  "BlogHub.jsx",
  "BlogArticle.jsx",
  "CaseStudies.jsx",
  "DevenirTuteur.jsx",
  "FirstSessionRequest.jsx",
  "LeadThanks.jsx",
  "Secondary4MathConcept.jsx",
  "Secondary4MathTheory.jsx",
]

test("priority secondary pages opt into the reference-led visual frame", async () => {
  const sources = await Promise.all(pageFiles.map((file) => readFile(new URL(`../src/pages/${file}`, import.meta.url), "utf8")))
  for (const source of sources) {
    assert.match(source, /reference-page/)
  }
})

test("the shared secondary-page buttons use the blue action hierarchy", async () => {
  const source = await readFile(new URL("../src/index.css", import.meta.url), "utf8")
  assert.match(source, /reference-page[\s\S]*notebook-button-primary/)
  assert.match(source, /brand-blue-600/)
  assert.match(source, /prefers-reduced-motion/) 
})
