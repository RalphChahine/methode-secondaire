import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

test("subject pages use distinct reference-led visual systems", async () => {
  const [maths, sciences, hero] = await Promise.all([
    readFile(new URL("../src/pages/Maths.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/Sciences.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/marketing/SubjectHero.jsx", import.meta.url), "utf8"),
  ])

  assert.match(maths, /SubjectHero/)
  assert.match(sciences, /SubjectHero/)
  assert.match(hero, /AnimatedMathGraph/)
  assert.match(hero, /ScientificDiagram/)
  assert.match(hero, /pathLength/)
  assert.match(hero, /prefers-reduced-motion|useReducedMotion/)
  assert.match(hero, /grid|axis|vector/i)
})

test("maths and science keep the existing conversion destinations", async () => {
  const [maths, sciences] = await Promise.all([
    readFile(new URL("../src/pages/Maths.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/Sciences.jsx", import.meta.url), "utf8"),
  ])

  assert.match(maths, /subject=math/)
  assert.match(sciences, /subject=science/)
  assert.match(maths, /tel:\$\{siteConfig\.phone\}/)
  assert.match(sciences, /tel:\$\{siteConfig\.phone\}/)
})
