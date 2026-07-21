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
  expected.forEach(([code]) => {
    assert.ok(copy.offers[code].title)
    assert.ok(copy.offers[code].description)
    assert.ok(copy.offers[code].action)
    assert.ok(copy.offers[code].situationalLabel)
  })
})

;["weekly", "progression", "progression_block_10", "weekly_follow_up_10"].forEach((legacyValue) => {
  assert.equal(resolveRequestedOffer(legacyValue), "progression_block")
})
assert.equal(resolveRequestedOffer("momentum"), "momentum_block")
assert.equal(resolveRequestedOffer("targeted"), "targeted_session")
assert.equal(resolveRequestedOffer("unknown"), "targeted_session")

console.log("Pricing package contract passed.")
