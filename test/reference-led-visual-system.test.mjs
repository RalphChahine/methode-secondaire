import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("reference-led visual tokens define the supplied direction without removing legacy tokens", async () => {
  const source = await readFile(new URL("../src/index.css", import.meta.url), "utf8")

  for (const [token, value] of [
    ["--brand-navy-950", "#03152c"],
    ["--brand-navy-900", "#061d3c"],
    ["--brand-navy-800", "#0a2a55"],
    ["--brand-blue-700", "#164fc9"],
    ["--brand-blue-600", "#2463e8"],
    ["--brand-blue-500", "#3d78f2"],
    ["--brand-blue-100", "#e9f1ff"],
    ["--brand-blue-50", "#f5f8ff"],
    ["--brand-gold-500", "#f3a712"],
    ["--brand-green-500", "#22a06b"],
    ["--surface-white", "#ffffff"],
    ["--surface-soft", "#f7f9fc"],
    ["--surface-blue", "#f0f5ff"],
    ["--text-dark", "#081427"],
    ["--text-body", "#465267"],
    ["--text-muted", "#718096"],
    ["--border-soft", "#e2e8f0"],
  ]) {
    assert.match(source, new RegExp(`${token.replaceAll("-", "\\-")}\\s*:\\s*${value}`, "i"))
  }

  assert.match(source, /--radius-card\s*:\s*14px/)
  assert.match(source, /--radius-large\s*:\s*24px/)
  assert.match(source, /--radius-panel\s*:\s*30px/)
  assert.match(source, /--radius-pill\s*:\s*999px/)
  assert.match(source, /--shadow-card\s*:\s*0 8px 24px rgba\(3, 21, 44, 0\.06\)/)
  assert.match(source, /--shadow-floating\s*:\s*0 20px 60px rgba\(3, 21, 44, 0\.18\)/)
  assert.match(source, /--shadow-portal\s*:\s*0 28px 80px rgba\(3, 21, 44, 0\.22\)/)
  assert.match(source, /Manrope/)
  assert.match(source, /Inter/)
  assert.match(source, /prefers-reduced-motion:\s*reduce/)
})

test("reference-led system declares Framer Motion for the planned motion layer", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"))
  assert.ok(packageJson.dependencies?.["framer-motion"] || packageJson.devDependencies?.["framer-motion"])
})
