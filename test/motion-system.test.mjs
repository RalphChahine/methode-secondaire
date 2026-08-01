import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("motion tokens and reduced-motion rules are defined centrally", async () => {
  const source = await readFile(new URL("../src/index.css", import.meta.url), "utf8")
  for (const token of ["--motion-instant", "--motion-quick", "--motion-standard", "--ease-out-product"]) {
    assert.match(source, new RegExp(token.replaceAll("-", "\\-")))
  }
  assert.match(source, /prefers-reduced-motion: reduce/)
})

test("MotionCard is a CSS-only wrapper and only interactive cards move", async () => {
  const source = await readFile(new URL("../src/components/MotionCard.jsx", import.meta.url), "utf8")
  assert.doesNotMatch(source, /framer-motion|motion\./)
  assert.match(source, /interactive/)
  assert.doesNotMatch(source, /transform-gpu/)
})

test("site sticky action observes the first primary action and respects focused routes", async () => {
  const source = await readFile(new URL("../src/layouts/SiteLayout.jsx", import.meta.url), "utf8")
  assert.match(source, /IntersectionObserver/)
  assert.match(source, /suppressMobileAction/)
  assert.match(source, /primaryActionRef/)
  assert.match(source, /translate-y-3/)
})
