import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("notebook art primitives expose bounded variants and reduced-motion fallback", async () => {
  const illustration = await readFile(new URL("../src/components/art/NotebookIllustration.jsx", import.meta.url), "utf8")
  const reveal = await readFile(new URL("../src/components/art/NotebookReveal.jsx", import.meta.url), "utf8")

  assert.match(illustration, /clarity/)
  assert.match(illustration, /math/)
  assert.match(illustration, /science/)
  assert.match(illustration, /aria-hidden/)
  assert.match(reveal, /IntersectionObserver/)
  assert.match(reveal, /notebook-reveal/)
  assert.match(reveal, /prefers-reduced-motion/)
})
