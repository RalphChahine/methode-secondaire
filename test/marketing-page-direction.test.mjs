import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("subject pages select distinct notebook artwork variants", async () => {
  const maths = await readFile(new URL("../src/pages/Maths.jsx", import.meta.url), "utf8")
  const sciences = await readFile(new URL("../src/pages/Sciences.jsx", import.meta.url), "utf8")

  assert.match(maths, /artVariant=["']math["']/)
  assert.match(sciences, /artVariant=["']science["']/)
})

test("focused public journeys use the notebook surfaces", async () => {
  const request = await readFile(new URL("../src/pages/FirstSessionRequest.jsx", import.meta.url), "utf8")
  const recruitment = await readFile(new URL("../src/pages/DevenirTuteur.jsx", import.meta.url), "utf8")
  const parentJourney = await readFile(new URL("../src/pages/Temoignages.jsx", import.meta.url), "utf8")

  assert.match(request, /notebook-paper/)
  assert.match(request, /notebook-ink/)
  assert.match(recruitment, /NotebookIllustration/)
  assert.match(recruitment, /notebook-paper/)
  assert.match(parentJourney, /notebook-paper/)
})
