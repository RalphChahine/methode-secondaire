import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("all conversion links use the localized request route", async () => {
  for (const file of ["../src/pages/Tuteurs.jsx", "../src/pages/CaseStudies.jsx"]) {
    const source = await readFile(new URL(file, import.meta.url), "utf8")
    assert.doesNotMatch(source, /#demande/)
    assert.match(source, /getLocalizedPath\("request", locale\)/)
  }
})

test("the global mobile request action is absent on focused routes", async () => {
  const source = await readFile(new URL("../src/layouts/SiteLayout.jsx", import.meta.url), "utf8")
  assert.match(source, /const suppressMobileAction = \["request", "thankYou", "portal"\]\.includes\(routeKey\)/)
  assert.match(source, /!suppressMobileAction \? <div className="fixed inset-x-0 bottom-0/)
})
