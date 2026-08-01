import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("shared buttons expose tactile Living Notebook states", async () => {
  const button = await readFile(new URL("../src/components/ui/button.jsx", import.meta.url), "utf8")
  const marketing = await readFile(new URL("../src/components/SimpleMarketingSections.jsx", import.meta.url), "utf8")

  assert.match(button, /active:translate-y|active:scale/)
  assert.match(button, /focus-visible:ring/)
  assert.match(button, /disabled:pointer-events-none/)
  assert.match(marketing, /data-primary-action/)
  assert.match(marketing, /notebook-button-primary/)
})
