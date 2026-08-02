import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

test("parent portal shell adopts the reference-led navy and blue hierarchy", async () => {
  const [shell, home, portal] = await Promise.all([
    readFile(new URL("../src/components/portal/shared/PortalShell.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/portal/parent/ParentHome.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8"),
  ])

  assert.match(shell, /brand-navy-950|brand-blue-600|portal-reference/)
  assert.match(home, /brand-blue-600|brand-blue-500|brand-gold-500/)
  assert.match(portal, /portal-reference/)
  assert.doesNotMatch(shell, /bg-\[#f5c977\] text-\[#071631\]/)
})

test("student access is not inferred from the existing parent portal role", async () => {
  const portal = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
  const roleOptions = portal.match(/clientRoleOptions\s*=\s*\[[\s\S]*?\]\s*\n/)
  assert.ok(roleOptions)
  assert.doesNotMatch(roleOptions[0], /student/)
  assert.match(portal, /value: "parent"/)
  assert.match(portal, /value: "tutor"/)
})
