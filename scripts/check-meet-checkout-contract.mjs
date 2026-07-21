import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..")
const failures = []

async function readSource(relativePath) {
  try {
    return await fs.readFile(path.join(projectRoot, relativePath), "utf8")
  } catch {
    failures.push(`${relativePath} is missing`)
    return ""
  }
}

function expect(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

async function main() {
  const [checkoutEndpoint, checkoutBuilder, checkoutTest, packageJson] = await Promise.all([
    readSource("api/create-checkout-session.js"),
    readSource("api/lib/stripe-checkout.mjs"),
    readSource("test/stripe-checkout.test.mjs"),
    readSource("package.json"),
  ])

  expect(checkoutEndpoint.includes("PAYMENT_SESSION_SECRET"), "Checkout endpoint: PAYMENT_SESSION_SECRET is missing")
  expect(checkoutEndpoint.includes("crypto.timingSafeEqual"), "Checkout endpoint: internal secret comparison is not timing-safe")
  expect(checkoutEndpoint.includes('crypto.createHash("sha256")'), "Checkout endpoint: secret lengths are not normalized before comparison")
  expect(checkoutEndpoint.includes("application/x-www-form-urlencoded"), "Checkout endpoint: Stripe form encoding is missing")
  expect(checkoutBuilder.includes("CHECKOUT_EXPIRY_SECONDS = 60 * 60"), "Checkout builder: one-hour expiry is missing")
  expect(checkoutBuilder.includes('currency: "cad"'), "Checkout builder: CAD currency is missing")
  expect(checkoutTest.includes("createCheckoutRequest"), "Checkout test: request builder coverage is missing")
  expect(packageJson.includes('"test:payments": "node --test test/stripe-checkout.test.mjs"'), "package.json: test:payments command is missing")

  if (failures.length > 0) {
    console.error("Meet Checkout contract checks failed:\n")
    failures.forEach((failure) => console.error(`- ${failure}`))
    process.exitCode = 1
    return
  }

  console.log("Meet Checkout contract checks passed.")
}

await main()
