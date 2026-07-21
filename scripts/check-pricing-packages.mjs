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
assert.doesNotMatch(pricingSection, /SÃ©ance DÃ©clic/)

console.log("Pricing package contract passed.")
