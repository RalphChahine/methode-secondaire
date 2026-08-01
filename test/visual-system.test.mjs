import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("Living Notebook palette and typography tokens are defined centrally", async () => {
  const source = await readFile(new URL("../src/index.css", import.meta.url), "utf8")

  for (const token of [
    "--color-ink",
    "--color-paper",
    "--color-cobalt",
    "--color-sun",
    "--color-coral",
    "--color-mint",
    "--font-display",
    "--font-sans",
  ]) {
    assert.match(source, new RegExp(token.replaceAll("-", "\\-")))
  }

  assert.match(source, /Bricolage Grotesque/)
  assert.match(source, /prefers-reduced-motion: reduce/)
})
