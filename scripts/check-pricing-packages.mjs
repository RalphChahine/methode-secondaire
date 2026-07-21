import assert from "node:assert/strict"
import fs from "node:fs/promises"
import {
  formatCadAmount,
  getOffer,
  getOfferByPlanId,
  getParentPaymentPresentation,
  getPaymentLinkDefaultAmountCad,
  getPaymentLinkOfferLabel,
  getPricingCopy,
  normalizePaymentLinkOfferCode,
  paymentLinkOfferCodes,
  pricing,
  resolveRequestedOffer,
} from "../src/lib/pricing.js"

const expected = [
  ["targeted_session", "PLAN-FIRST-60", 1, 65, 65, 1, 65],
  ["momentum_block", "PLAN-PACK4-250", 4, 250, 62.5, 1, 250],
  ["progression_block", "PLAN-PACK10-600", 10, 600, 60, 2, 300],
]

assert.deepEqual(Object.keys(pricing.offers), expected.map(([code]) => code))
expected.forEach(([code, planId, sessionCount, totalPriceCad, perSessionPriceCad, installmentCount, installmentPriceCad]) => {
  assert.deepEqual(getOffer(code), {
    ...pricing.offers[code],
    code,
  })
  assert.equal(pricing.offers[code].planId, planId)
  assert.deepEqual(getOfferByPlanId(planId), getOffer(code))
  assert.equal(pricing.offers[code].sessionCount, sessionCount)
  assert.equal(pricing.offers[code].totalPriceCad, totalPriceCad)
  assert.equal(pricing.offers[code].perSessionPriceCad, perSessionPriceCad)
  assert.equal(pricing.offers[code].installmentCount, installmentCount)
  assert.equal(pricing.offers[code].installmentPriceCad, installmentPriceCad)
  assert.equal(pricing.offers[code].durationMinutes, 60)
  assert.equal(pricing.offers[code].autoRenewal, false)
})
assert.equal(getOfferByPlanId("PLAN-UNKNOWN"), null)

const expectedPaymentLinkOfferCodes = [
  "first_session",
  "weekly_follow_up",
  "exam_sprint",
  "catch_up",
  "one_time",
  "momentum_block_payment_1",
  "progression_block_payment_1",
  "progression_block_payment_2",
]
assert.deepEqual(paymentLinkOfferCodes, expectedPaymentLinkOfferCodes)
assert.equal(Object.isFrozen(paymentLinkOfferCodes), true)
;["first_session", "weekly_follow_up", "exam_sprint", "catch_up", "one_time"].forEach((code) => {
  assert.equal(getPaymentLinkDefaultAmountCad(code), 65)
})
assert.equal(getPaymentLinkDefaultAmountCad("momentum_block_payment_1"), 250)
assert.equal(getPaymentLinkDefaultAmountCad("progression_block_payment_1"), 300)
assert.equal(getPaymentLinkDefaultAmountCad("progression_block_payment_2"), 300)

assert.equal(normalizePaymentLinkOfferCode("progression_block_10_installment_1"), "progression_block_payment_1")
assert.equal(normalizePaymentLinkOfferCode("weekly_follow_up_installment_2"), "progression_block_payment_2")
assert.equal(normalizePaymentLinkOfferCode("momentum_block_payment_1"), "momentum_block_payment_1")
assert.equal(formatCadAmount(300, "fr"), "300 $")
assert.equal(formatCadAmount(300, "en"), "$300")
assert.equal(getPaymentLinkOfferLabel("momentum_block_payment_1", "fr"), "Bloc d'élan — paiement unique")
assert.equal(getPaymentLinkOfferLabel("momentum_block_payment_1", "en"), "Momentum block — single payment")
assert.deepEqual(getParentPaymentPresentation("momentum_block_payment_1", "fr"), {
  label: "Bloc d'élan — paiement unique",
  creditText: "Débloque les 4 crédits",
})
assert.deepEqual(getParentPaymentPresentation("progression_block_payment_1", "en"), {
  label: "Progress block — first payment",
  creditText: "Unlocks the first 5 credits",
})
assert.deepEqual(getParentPaymentPresentation("weekly_follow_up_installment_2", "fr"), {
  label: "Bloc de progression — deuxième paiement",
  creditText: "Débloque les 5 derniers crédits",
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
assert.match(requestPage, /getOffer\(requestedOffer\)/)
assert.match(requestPage, /formatCadAmount/)
const duplicatedPriceLiteral = /(?:\$(?:65|250|300|600|62[.,]50)|(?:65|250|300|600|62[.,]50)\s*\$)/
assert.doesNotMatch(requestPage, duplicatedPriceLiteral, "FirstSessionRequest must derive displayed catalogue prices")
assert.doesNotMatch(pricingSection, duplicatedPriceLiteral, "PricingSection must derive displayed catalogue prices")
assert.doesNotMatch(pricingSection, /Séance Déclic/)

const copyFiles = [
  "src/pages/Accueil.jsx",
  "src/pages/AccueilEn.jsx",
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
const forbiddenPublicOfferName = /D(?:é|\\u00e9|\\u00E9|Ã©|ÃƒÂ©|ÃƒÆ’Ã‚Â©)clic|[Ww]eekly follow-up package/
sources.forEach((source, index) => {
  assert.doesNotMatch(
    source,
    forbiddenPublicOfferName,
    copyFiles[index],
  )
})

async function collectFrontendSources(directoryUrl) {
  const entries = await fs.readdir(directoryUrl, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directoryUrl)
    if (entry.isDirectory()) return collectFrontendSources(entryUrl)
    return /\.(?:js|jsx)$/.test(entry.name) ? [entryUrl] : []
  }))
  return nested.flat()
}

const frontendSourceUrls = await collectFrontendSources(new URL("../src/", import.meta.url))
for (const sourceUrl of frontendSourceUrls) {
  const source = await fs.readFile(sourceUrl, "utf8")
  assert.doesNotMatch(source, forbiddenPublicOfferName, sourceUrl.pathname)
}

const publicPackagePriceLiteral = /(?:\$(?:65|250|300|600|62[.,]50)|(?:65|250|300|600|62[.,]50)\s*\$)/
const homeSources = sources.slice(0, 2)
homeSources.forEach((source, index) => {
  assert.match(source, /getOffer\(/, `${copyFiles[index]} must read offer prices from pricing`)
  assert.match(source, /formatCadAmount\(/, `${copyFiles[index]} must localize catalogue prices`)
  assert.doesNotMatch(source, publicPackagePriceLiteral, `${copyFiles[index]} must not duplicate package price literals`)
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

const portalSource = await fs.readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
assert.doesNotMatch(portalSource, /SÃ©ance DÃ©clic|DÃ©clic \/ one-off session/)
assert.doesNotMatch(portalSource, /Séance Déclic|Déclic \/ one-off session/)
assert.doesNotMatch(portalSource, /pricing\.weeklyFollowUp/)
assert.match(portalSource, /paymentLinkOfferCodes\.map/)
assert.match(portalSource, /getPaymentLinkDefaultAmountCad/)
assert.match(portalSource, /formatCadAmount\(payment\.amount_cad, locale\)/)
assert.match(portalSource, /normalizePaymentLinkOfferCode\(link\.offer\) === offer/)
assert.match(portalSource, /pricing\.offers\.progression_block\.installmentPriceCad/)
assert.doesNotMatch(portalSource, /(?:\$300|300\s*\$)/, "Portal midpoint copy must derive the installment price")

const crmSource = await fs.readFile(new URL("../ops/crm/google-apps-script/Code.gs", import.meta.url), "utf8")
const extractStringArray = (source, constantName) => {
  const body = source.match(new RegExp(`const ${constantName} = \\[([\\s\\S]+?)\\];`))?.[1] || ""
  return [...body.matchAll(/"([^"]+)"/g)].map((match) => match[1])
}
const crmSessionOfferCodes = extractStringArray(crmSource, "SESSION_TYPE_OPTIONS")
const crmPackageOfferCodes = extractStringArray(crmSource, "PACKAGE_PAYMENT_OFFER_CODES")
assert.deepEqual([...crmSessionOfferCodes, ...crmPackageOfferCodes], expectedPaymentLinkOfferCodes)
assert.match(crmSource, /const PAYMENT_LINK_OFFER_OPTIONS = \[\s*\.\.\.SESSION_TYPE_OPTIONS,\s*\.\.\.PACKAGE_PAYMENT_OFFER_CODES,\s*\];/)
const parentActivitySource = crmSource.match(/function buildParentActivityTimeline_\([\s\S]+?\n}\n/)?.[0] || ""
assert.doesNotMatch(parentActivitySource, /payment\.offer/)

console.log("Pricing package contract passed.")
