import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("keeps the responsive navigation reachable and links tutor recruitment in both locales", async () => {
  const source = await readFile(new URL("../src/layouts/SiteLayout.jsx", import.meta.url), "utf8")
  const englishNavigation = source.slice(
    source.indexOf('brandTag: "High school tutoring across Quebec"'),
    source.indexOf("sections:", source.indexOf('brandTag: "High school tutoring across Quebec"')),
  )
  const frenchNavigation = source.slice(
    source.indexOf('brandTag: "Tutorat secondaire au Québec"'),
    source.indexOf("sections:", source.indexOf('brandTag: "Tutorat secondaire au Québec"')),
  )

  assert.match(frenchNavigation, /label: "Devenir tuteur", to: getLocalizedPath\("devenirTuteur", locale\)/)
  assert.match(englishNavigation, /label: "Become a tutor", to: getLocalizedPath\("devenirTuteur", locale\)/)
  assert.match(source, /h-\[100dvh\].*max-h-\[100dvh\].*flex-col.*overflow-hidden/)
  assert.match(source, /min-h-0 flex-1 overflow-y-auto.*safe-area-inset-bottom/)
  assert.match(source, /fixed inset-x-0 bottom-0 z-40/)
})
