import assert from "node:assert/strict"
import fs from "node:fs/promises"
import { getOffer, getPricingCopy, pricing, resolveRequestedOffer } from "../src/lib/pricing.js"

const expected = [
  ["targeted_session", 1, 65, 65],
  ["momentum_block", 4, 250, 62.5],
  ["progression_block", 10, 600, 60],
]

assert.deepEqual(Object.keys(pricing.offers), expected.map(([code]) => code))
expected.forEach(([code, sessionCount, totalPriceCad, perSessionPriceCad]) => {
  assert.deepEqual(getOffer(code), {
    ...pricing.offers[code],
    code,
  })
  assert.equal(pricing.offers[code].sessionCount, sessionCount)
  assert.equal(pricing.offers[code].totalPriceCad, totalPriceCad)
  assert.equal(pricing.offers[code].perSessionPriceCad, perSessionPriceCad)
  assert.equal(pricing.offers[code].durationMinutes, 60)
  assert.equal(pricing.offers[code].autoRenewal, false)
})

;["fr", "en"].forEach((locale) => {
  const copy = getPricingCopy(locale)
  assert.equal(Object.keys(copy.offers).length, 3)
  assert.strictEqual(copy.offers.aLaCarte, copy.offers.targeted_session)
  assert.strictEqual(copy.offers.weekly, copy.offers.progression_block)
  assert.equal(Object.prototype.propertyIsEnumerable.call(copy.offers, "aLaCarte"), false)
  assert.equal(Object.prototype.propertyIsEnumerable.call(copy.offers, "weekly"), false)
  expected.forEach(([code]) => {
    assert.ok(copy.offers[code].title)
    assert.ok(copy.offers[code].description)
    assert.ok(copy.offers[code].action)
    assert.ok(copy.offers[code].situationalLabel)
  })
})

;["weekly", "progression", "progression_block_10", "weekly_follow_up_10", "PLAN-PACK10-600"].forEach((legacyValue) => {
  assert.equal(resolveRequestedOffer(legacyValue), "progression_block")
})
assert.equal(resolveRequestedOffer("momentum"), "momentum_block")
assert.equal(resolveRequestedOffer("targeted"), "targeted_session")
assert.equal(resolveRequestedOffer("unknown"), "targeted_session")

const [pricingSection, requestPage, requestForm] = await Promise.all([
  fs.readFile(new URL("../src/components/PricingSection.jsx", import.meta.url), "utf8"),
  fs.readFile(new URL("../src/pages/FirstSessionRequest.jsx", import.meta.url), "utf8"),
  fs.readFile(new URL("../src/components/FirstSessionRequestForm.jsx", import.meta.url), "utf8"),
])

;["targeted_session", "momentum_block", "progression_block"].forEach((code) => {
  assert.match(pricingSection, new RegExp(code))
})
assert.match(pricingSection, /\?offer=\$\{code\}/)
assert.match(requestPage, /resolveRequestedOffer/)
assert.match(requestForm, /offer_recommended: offer/)
assert.match(pricingSection, /methode:pricing-offers-view/)
assert.match(pricingSection, /methode:pricing-offer-selected/)
assert.match(requestForm, /methode:first-session-request-submit/)
assert.doesNotMatch(pricingSection, /Séance Déclic/)

const copyFiles = [
  "src/lib/assistantConfig.js",
  "src/lib/leadDiagnostic.js",
  "src/components/GrowthProgramSection.jsx",
  "src/components/OfferPathwaysSection.jsx",
  "src/components/LeadDiagnosticPanel.jsx",
  "src/components/StudentAssistantWidget.jsx",
  "src/pages/LeadThanks.jsx",
  "src/pages/ResourcesHub.jsx",
]
const sources = await Promise.all(copyFiles.map((file) => fs.readFile(new URL(`../${file}`, import.meta.url), "utf8")))
sources.forEach((source, index) => {
  assert.doesNotMatch(source, /S(?:é|\\u00e9)ance D(?:é|\\u00e9)clic|D(?:é|\\u00e9)clic \/ one-off session|weekly follow-up package/i, copyFiles[index])
})

const [diagnostic, diagnosticPanel, assistantWidget, offerPathways, growthProgram, resourcesHub] = await Promise.all([
  fs.readFile(new URL("../src/lib/leadDiagnostic.js", import.meta.url), "utf8"),
  fs.readFile(new URL("../src/components/LeadDiagnosticPanel.jsx", import.meta.url), "utf8"),
  fs.readFile(new URL("../src/components/StudentAssistantWidget.jsx", import.meta.url), "utf8"),
  fs.readFile(new URL("../src/components/OfferPathwaysSection.jsx", import.meta.url), "utf8"),
  fs.readFile(new URL("../src/components/GrowthProgramSection.jsx", import.meta.url), "utf8"),
  fs.readFile(new URL("../src/pages/ResourcesHub.jsx", import.meta.url), "utf8"),
])
assert.doesNotMatch(diagnostic, /progression_block_10|first_session_declic/)
assert.match(diagnostic, /requestedOffer: isProgressionBlock \? "progression_block" : "targeted_session"/)
;[diagnosticPanel, assistantWidget].forEach((source) => {
  assert.doesNotMatch(source, /progression_block_10|weekly_follow_up_10|\?offer=progression/)
  assert.match(source, /\?offer=\$\{requestedOffer\}/)
})
;[offerPathways, growthProgram, resourcesHub].forEach((source) => {
  assert.match(source, /S(?:é|Ã©)ance ciblée|Targeted session/)
  assert.match(source, /Bloc d['’](?:é|Ã©)lan|Momentum block/)
  assert.match(source, /Bloc de progression|Progress block/)
  assert.doesNotMatch(source, /Sprint examen|exam sprint/i)
})
assert.match(growthProgram, /offerCode: "momentum_block"/)
assert.match(growthProgram, /offerCode: "progression_block"/)
assert.match(growthProgram, /getOffer\(offerCode\)/)
assert.match(growthProgram, /offer\.sessionCount.*offer\.totalPriceCad/)
assert.match(growthProgram, /offer\.perSessionPriceCad/)
assert.match(growthProgram, /\?offer=\$\{card.offerCode\}/)
;["targeted_session", "momentum_block", "progression_block"].forEach((code) => {
  assert.match(resourcesHub, new RegExp(`offerCode: "${code}"`))
})
assert.match(resourcesHub, /key=\{offerCode\}/)
assert.match(resourcesHub, /\?offer=\$\{offerCode\}/)

console.log("Pricing package contract passed.")
