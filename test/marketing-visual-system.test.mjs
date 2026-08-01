import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("shared marketing hero uses notebook compositions and artwork", async () => {
  const shared = await readFile(new URL("../src/components/SimpleMarketingSections.jsx", import.meta.url), "utf8")
  const home = await readFile(new URL("../src/pages/Accueil.jsx", import.meta.url), "utf8")

  assert.match(shared, /EditorialHero/)
  assert.match(shared, /FormHero/)
  assert.match(shared, /JourneyHero/)
  assert.match(shared, /NotebookIllustration/)
  assert.match(shared, /notebook-paper/)
  assert.match(home, /artVariant=["']clarity["']/)
})
