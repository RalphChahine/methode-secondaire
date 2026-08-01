import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("tutor directory fallback gives parents a localized request path", async () => {
  const source = await readFile(new URL("../src/pages/Tuteurs.jsx", import.meta.url), "utf8")
  assert.match(source, /getLocalizedPath\("request", locale\)/)
  assert.match(source, /matching criteria|matière.*niveau|subject.*level/i)
})

test("recruitment keeps one practical application journey", async () => {
  const source = await readFile(new URL("../src/pages/DevenirTuteur.jsx", import.meta.url), "utf8")
  assert.match(source, /28\s*\$|28 CAD|28 \$ CA\/h|28\/hour/)
  assert.match(source, /TutorApplicationForm/)
  assert.doesNotMatch(source, /getLocalizedPath\("request"/)
  const sectionKeys = ["facts", "work", "requirements", "process", "application", "faq"]
  let previous = -1
  for (const key of sectionKeys) {
    const index = source.indexOf(`key: "${key}"`)
    assert.ok(index > previous, `section ${key} should be ordered`)
    previous = index
  }
})
