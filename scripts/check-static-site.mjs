import fs from "node:fs/promises"
import path from "node:path"
import vm from "node:vm"
import { fileURLToPath } from "node:url"

import { buildAlternates, getHtmlLang } from "../src/lib/i18n.js"
import { BOOKING_URL } from "../src/config/booking.js"
import { getPrerenderPageEntries } from "../src/lib/prerenderSeoData.js"
import { absoluteUrl } from "../src/lib/seo.js"

await import("./check-meet-checkout-contract.mjs")

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..")
const distDir = path.join(projectRoot, "dist")
const maxInitialJavaScriptBytes = 540 * 1024
const maxInitialCssBytes = 90 * 1024
const failures = []

function expect(condition, message) {
  if (!condition) {
    failures.push(message)
  }
}

function pageFilePath(page) {
  return page.path === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, page.path.replace(/^\//, ""), "index.html")
}

function readMeta(html, name) {
  const expression = new RegExp(`<meta[^>]+name="${name}"[^>]+content="([^"]*)"[^>]*>`, "i")
  return html.match(expression)?.[1] || ""
}

function readCanonical(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] || ""
}

function assetPath(html, expression) {
  return html.match(expression)?.[1] || ""
}

async function getAssetSize(asset) {
  const relativeAsset = asset.replace(/^\//, "")
  const assetPath = path.join(distDir, relativeAsset)
  const stats = await fs.stat(assetPath)
  return stats.size
}

async function verifyPages(pages) {
  for (const page of pages) {
    const html = await fs.readFile(pageFilePath(page), "utf8")
    const label = page.path || "/"

    expect(
      html.includes(`<html lang="${getHtmlLang(page.locale)}">`),
      `${label}: html lang is missing or incorrect`,
    )
    expect(html.includes("<title>") && html.includes("</title>"), `${label}: title is missing`)
    expect(Boolean(readMeta(html, "description")), `${label}: description is missing`)
    expect(readMeta(html, "robots") === page.robots, `${label}: robots directive is incorrect`)
    expect(readCanonical(html) === absoluteUrl(page.path), `${label}: canonical is incorrect`)
    expect(html.includes('type="application/ld+json"'), `${label}: JSON-LD is missing`)
    expect(html.includes('"@graph"'), `${label}: static schema graph is missing`)
    expect(html.includes('"EducationalOrganization"'), `${label}: organization schema is missing`)

    if (page.path !== (page.locale === "en" ? "/en" : "/")) {
      expect(html.includes('"BreadcrumbList"'), `${label}: breadcrumb schema is missing`)
    }

    buildAlternates(page.routeKey).forEach((alternate) => {
      expect(
        html.includes(`hreflang="${alternate.hrefLang}" href="${alternate.href}"`),
        `${label}: alternate ${alternate.hrefLang} is missing`,
      )
    })

    if (page.includeInSitemap !== false) {
      expect(html.includes('id="root" data-prerendered="true"'), `${label}: public route is not prerendered`)
      expect(/<main\b/i.test(html), `${label}: rendered main content is missing`)
      expect(/<h1\b/i.test(html), `${label}: rendered H1 is missing`)
    } else {
      expect(!html.includes('data-prerendered="true"'), `${label}: noindex route should not be prerendered`)
    }
  }
}

async function verifySitemap(pages) {
  const sitemap = await fs.readFile(path.join(distDir, "sitemap.xml"), "utf8")

  expect(
    !sitemap.includes("<lastmod>"),
    "sitemap: do not declare generated build dates as page modification dates",
  )

  pages.forEach((page) => {
    const url = absoluteUrl(page.path)
    const included = sitemap.includes(`<loc>${url}</loc>`)

    expect(
      included === (page.includeInSitemap !== false),
      `${page.path || "/"}: sitemap inclusion is incorrect`,
    )
  })
}

async function verifyPerformanceBudget() {
  const homeHtml = await fs.readFile(path.join(distDir, "index.html"), "utf8")
  const mainScript = assetPath(homeHtml, /<script type="module"[^>]+src="([^"]+index-[^"]+\.js)"/i)
  const mainStylesheet = assetPath(homeHtml, /<link rel="stylesheet"[^>]+href="([^"]+index-[^"]+\.css)"/i)

  expect(Boolean(mainScript), "home: initial JavaScript asset was not found")
  expect(Boolean(mainStylesheet), "home: initial stylesheet asset was not found")

  if (mainScript) {
    const size = await getAssetSize(mainScript)
    expect(
      size <= maxInitialJavaScriptBytes,
      `home: initial JavaScript is ${(size / 1024).toFixed(1)} KB, above ${(maxInitialJavaScriptBytes / 1024).toFixed(0)} KB`,
    )
  }

  if (mainStylesheet) {
    const size = await getAssetSize(mainStylesheet)
    expect(
      size <= maxInitialCssBytes,
      `home: initial CSS is ${(size / 1024).toFixed(1)} KB, above ${(maxInitialCssBytes / 1024).toFixed(0)} KB`,
    )
  }
}

async function verifyParentEntryPoint() {
  const homeHtml = await fs.readFile(path.join(distDir, "index.html"), "utf8")

  expect(
    homeHtml.includes(`href="${BOOKING_URL}"`),
    "home: primary parent CTA must open the public request flow",
  )
  expect(
    !homeHtml.includes('href="/portail?mode=create"'),
    "home: public CTA must not send a first-time parent to portal account creation",
  )
}

function extractPortalActions(source) {
  return new Set([...source.matchAll(/"(portal_[a-z_]+)"/g)].map((match) => match[1]))
}

async function verifyPortalActionParity() {
  const [productionSource, developmentSource] = await Promise.all([
    fs.readFile(path.join(projectRoot, "api", "portal.js"), "utf8"),
    fs.readFile(path.join(projectRoot, "vite.config.js"), "utf8"),
  ])
  const productionActions = extractPortalActions(productionSource)
  const developmentActions = extractPortalActions(developmentSource)

  productionActions.forEach((action) => {
    expect(developmentActions.has(action), `dev portal API is missing action ${action}`)
  })
}

function makeStructuredSheet(header) {
  const values = [...header]
  const writes = []
  return {
    values,
    writes,
    getName: () => "Test Sheet",
    getLastRow: () => values.length ? 1 : 0,
    getLastColumn: () => values.length,
    appendRow(row) {
      writes.push({ type: "appendRow", row: [...row] })
      values.splice(0, values.length, ...row)
    },
    getRange(_row, column, _rowCount, columnCount) {
      return {
        getValues: () => [values.slice(column - 1, column - 1 + columnCount)],
        setValues(rows) {
          writes.push({ type: "setValues", column, rows })
          rows[0].forEach((value, index) => { values[column - 1 + index] = value })
          return this
        },
        setFontWeight() { return this },
        setBackground() { return this },
        setFontColor() { return this },
        createFilter() { return this },
      }
    },
    setFrozenRows() {},
    getFilter: () => ({ existing: true }),
    getMaxRows: () => 2,
    autoResizeColumns() {},
  }
}

async function verifyFinalReviewSafetyContracts() {
  const normalizeSource = (source) => source.replace(/\r\n/g, "\n")
  const [appsScriptSource, portalSource, productionProxySource, devProxySource] = (await Promise.all([
    fs.readFile(path.join(projectRoot, "ops", "crm", "google-apps-script", "Code.gs"), "utf8"),
    fs.readFile(path.join(projectRoot, "src", "pages", "Portal.jsx"), "utf8"),
    fs.readFile(path.join(projectRoot, "api", "portal.js"), "utf8"),
    fs.readFile(path.join(projectRoot, "vite.config.js"), "utf8"),
  ])).map(normalizeSource)
  const doPostSource = appsScriptSource.match(/function doPost\([\s\S]+?\n}\n/)?.[0] || ""
  const enrollmentEligibilitySource = appsScriptSource.match(/function validatePlanEnrollmentMatchAndSchedule_\([\s\S]+?\n}\n/)?.[0] || ""
  const enrollmentSource = appsScriptSource.match(/function createPortalPlanEnrollment_\([\s\S]+?\n}\n\nfunction getPlanPaymentStage_/)?.[0] || ""
  const paymentRequestSource = appsScriptSource.match(/function createPortalPlanPaymentRequest_\([\s\S]+?\n}\n\nfunction updatePortalPlanEnrollment_/)?.[0] || ""
  const parentPaymentSanitizer = appsScriptSource.match(/function sanitizePaymentForParent_\([\s\S]+?\n}\n/)?.[0] || ""
  const parentLedgerSanitizer = appsScriptSource.match(/function sanitizeCreditLedgerForParent_\([\s\S]+?\n}\n/)?.[0] || ""
  const operatorLedgerSanitizer = appsScriptSource.match(/function sanitizeCreditLedgerForOperator_\([\s\S]+?\n}\n/)?.[0] || ""

  expect(
    doPostSource.indexOf("hasValidPortalProxySecret_") >= 0 && doPostSource.indexOf("hasValidPortalProxySecret_") < doPostSource.indexOf("ensureCrmReady_"),
    "Apps Script: portal proxy secret must be validated before CRM setup or portal routing",
  )
  expect(appsScriptSource.includes('const CRM_PORTAL_SECRET_PROPERTY = "CRM_PORTAL_SECRET"'), "Apps Script: CRM_PORTAL_SECRET script property is not declared")
  expect(appsScriptSource.includes("function constantTimeStringEquals_"), "Apps Script: portal proxy secret comparison is not constant-time")
  expect(
    appsScriptSource.includes('"portal_mark_payment_paid_webhook"') && appsScriptSource.includes('"portal_mark_payment_expired_webhook"'),
    "Apps Script: Stripe webhook actions must retain their separate secret path",
  )
  expect(productionProxySource.includes("MISSING_CRM_PORTAL_SECRET"), "production portal proxy: missing CRM_PORTAL_SECRET is not rejected")
  expect(devProxySource.includes("MISSING_CRM_PORTAL_SECRET"), "development portal proxy: missing CRM_PORTAL_SECRET is not rejected")

  const portalAccessColumns = appsScriptSource.match(/const PORTAL_ACCESS_COLUMNS = \[([\s\S]*?)\n\];/)?.[1] || ""
  expect(/"failed_code_attempts",\s*"code_locked_until",\s*"last_code_requested_at",\s*$/.test(portalAccessColumns), "Apps Script: OTP attempt/cooldown fields must be append-only Portal Access columns")
  expect(appsScriptSource.includes("PORTAL_CODE_MAX_FAILED_ATTEMPTS"), "Apps Script: OTP failed-attempt limit is missing")
  expect(appsScriptSource.includes("PORTAL_CODE_FAILURE_COOLDOWN_MINUTES"), "Apps Script: OTP failure cooldown is missing")
  expect(appsScriptSource.includes("PORTAL_CODE_REQUEST_COOLDOWN_SECONDS"), "Apps Script: OTP request cooldown is missing")

  expect(!portalSource.includes("assignedTutorId || tutors[0]?.tutor_id"), "operator portal: package setup must not fall back to the first active tutor")
  expect(enrollmentEligibilitySource.includes("PLAN_ENROLLMENT_MATCH_REQUIRED") && enrollmentSource.includes("validatePlanEnrollmentMatchAndSchedule_"), "Apps Script: package enrollment does not require a recorded student/tutor match")
  expect(enrollmentEligibilitySource.includes("PLAN_ENROLLMENT_SCHEDULE_REQUIRED") && enrollmentSource.includes("validatePlanEnrollmentMatchAndSchedule_"), "Apps Script: package enrollment does not require confirmed scheduling context")
  expect(enrollmentEligibilitySource.includes("hasRecordedSchedule") && enrollmentEligibilitySource.includes('"calendar_created"'), "Apps Script: historical matched enrollments cannot use an existing confirmed session as scheduling context")
  expect(paymentRequestSource.includes("validatePlanEnrollmentMatchAndSchedule_"), "Apps Script: package payment request does not revalidate match and schedule")
  expect(paymentRequestSource.indexOf("already_requested: true") < paymentRequestSource.indexOf("const enrollmentEligibility"), "Apps Script: idempotent payment retries must return existing requests before new-creation validation")

  expect(!/\boffer\s*:/.test(parentPaymentSanitizer), "parent payments: raw operational offer code is exposed")
  expect(!/\bpayment_id\s*:|\binvoice_id\s*:|\bplan_enrollment_id\s*:/.test(parentPaymentSanitizer), "parent payments: raw payment identity fields are exposed")
  expect(parentPaymentSanitizer.includes("display_name_fr") && parentPaymentSanitizer.includes("display_name_en"), "parent payments: safe localized presentation fields are missing")
  expect(!parentLedgerSanitizer.includes("source_payment_id"), "parent credit ledger: source_payment_id is exposed")
  expect(operatorLedgerSanitizer.includes("source_payment_id"), "operator credit ledger: source_payment_id must remain available")
  expect(!portalSource.includes("getParentPaymentPresentation(payment.offer"), "parent portal: payment rendering still depends on a raw offer code")

  const sandbox = {}
  vm.createContext(sandbox)
  vm.runInContext(`${appsScriptSource}\n;globalThis.__finalReview = {
    setupStructuredSheet_,
    hasValidPortalProxySecret_,
    getPortalCodeSecurityState_,
    nextPortalCodeFailure_,
  }`, sandbox)
  const helpers = sandbox.__finalReview

  const migrated = makeStructuredSheet(["legacy_a", "legacy_b"])
  helpers.setupStructuredSheet_(migrated, ["legacy_a", "legacy_b", "new_tail"], "#000")
  expect(
    migrated.writes.length === 1 && migrated.writes[0].type === "setValues" && migrated.writes[0].column === 3 && migrated.values.join(",") === "legacy_a,legacy_b,new_tail",
    "CRM schema migration: only missing tail header cells may be appended",
  )
  const unchanged = makeStructuredSheet(["legacy_a", "legacy_b"])
  helpers.setupStructuredSheet_(unchanged, ["legacy_a", "legacy_b"], "#000")
  expect(unchanged.writes.length === 0, "CRM schema migration: a compatible complete header must not be rewritten")
  const incompatible = makeStructuredSheet(["legacy_a", "wrong_header"])
  let incompatibleRejected = false
  try {
    helpers.setupStructuredSheet_(incompatible, ["legacy_a", "legacy_b", "new_tail"], "#000")
  } catch (error) {
    incompatibleRejected = String(error).includes("CRM_SCHEMA_HEADER_MISMATCH")
  }
  expect(incompatibleRejected && incompatible.writes.length === 0, "CRM schema migration: incompatible headers must abort without writes")

  sandbox.PropertiesService = {
    getScriptProperties: () => ({ getProperty: (name) => name === "CRM_PORTAL_SECRET" ? "proxy-secret" : "webhook-secret" }),
  }
  expect(helpers.hasValidPortalProxySecret_("portal_request_code", "proxy-secret") === true, "portal proxy secret: matching secret is rejected")
  expect(helpers.hasValidPortalProxySecret_("portal_request_code", "wrong") === false, "portal proxy secret: wrong secret is accepted")
  expect(helpers.hasValidPortalProxySecret_("portal_request_code", "") === false, "portal proxy secret: empty secret is accepted")
  expect(helpers.hasValidPortalProxySecret_("portal_mark_payment_paid_webhook", "") === true, "Stripe webhook: separate webhook-secret route was blocked by portal proxy secret")
  expect(helpers.hasValidPortalProxySecret_("portal_mark_payment_expired_webhook", "") === true, "Stripe expiration webhook: separate webhook-secret route was blocked by portal proxy secret")

  const nowMs = Date.parse("2026-07-21T12:00:00.000Z")
  const locked = helpers.getPortalCodeSecurityState_({ code_locked_until: "2026-07-21T12:10:00.000Z" }, nowMs)
  expect(locked.is_locked === true && locked.retry_after_seconds === 600, "OTP security: active per-identity lockout is not enforced")
  const fourth = helpers.nextPortalCodeFailure_({ failed_code_attempts: "3" }, nowMs)
  const fifth = helpers.nextPortalCodeFailure_({ failed_code_attempts: "4" }, nowMs)
  expect(fourth.failed_code_attempts === 4 && !fourth.code_locked_until, "OTP security: failed attempts are not counted per identity")
  expect(fifth.failed_code_attempts === 5 && Boolean(fifth.code_locked_until), "OTP security: maximum failed attempts do not start cooldown")
}

async function verifyPlanPaymentLifecycleSources() {
  const normalizeSource = (source) => source.replace(/\r\n/g, "\n")
  const [appsScriptSource, clientSource, portalSource] = (await Promise.all([
    fs.readFile(path.join(projectRoot, "ops", "crm", "google-apps-script", "Code.gs"), "utf8"),
    fs.readFile(path.join(projectRoot, "src", "lib", "portalClient.js"), "utf8"),
    fs.readFile(path.join(projectRoot, "src", "pages", "Portal.jsx"), "utf8"),
  ])).map(normalizeSource)

  const paymentColumns = appsScriptSource.match(/const PAYMENT_COLUMNS = \[([\s\S]*?)\n\];/)?.[1] || ""
  const creditLedgerColumns = appsScriptSource.match(/const CREDIT_LEDGER_COLUMNS = \[([\s\S]*?)\n\];/)?.[1] || ""
  const paymentRequestFunction = appsScriptSource.match(/function createPortalPlanPaymentRequest_\([\s\S]*?\n}\n\nfunction updatePortalPlanEnrollment_/)?.[0] || ""
  const paymentWebhookFunction = appsScriptSource.match(/function markPortalPaymentPaidFromWebhook_\([\s\S]*?\n}\n\n(?=function )/)?.[0] || ""

  expect(
    /"created_at",\s*"updated_at",\s*"plan_enrollment_id",\s*"credit_grant_count",\s*"stripe_checkout_session_id",\s*"checkout_expires_at",\s*"checkout_url",\s*$/.test(paymentColumns),
    "CRM payments: Checkout fields must be appended after every legacy and plan-linkage column",
  )
  expect(
    /"created_at",\s*"source_payment_id",\s*$/.test(creditLedgerColumns),
    "CRM credit ledger: source_payment_id must be appended after every legacy column",
  )
  expect(
    appsScriptSource.includes('case "portal_create_plan_payment_request":'),
    "Apps Script: plan payment request action is not routed",
  )
  expect(
    appsScriptSource.includes("function getPlanPaymentStage_(planId, paymentStage)"),
    "Apps Script: authoritative plan payment-stage resolver is missing",
  )
  expect(
    appsScriptSource.includes("function grantCreditsForPaidPlanPayment_(spreadsheet, payment)"),
    "Apps Script: paid plan payment credit grant helper is missing",
  )
  expect(
    appsScriptSource.includes("source_payment_id: payment.payment_id"),
    "Apps Script: verified grants are not linked to their source payment",
  )
  expect(
    clientSource.includes('action: "portal_create_plan_payment_request"'),
    "portal client: plan payment request action is missing",
  )
  expect(
    portalSource.includes("createPortalPlanPaymentRequest"),
    "operator portal: package payment requests are not wired",
  )
  expect(
    portalSource.includes('paymentStage: "progression_midpoint"'),
    "operator portal: progression midpoint payment request is missing",
  )
  expect(
    portalSource.includes('result.ok || (isPack && result.code === "PLAN_ENROLLMENT_EXISTS"'),
    "operator portal: an existing pending enrollment cannot retry its initial payment request",
  )
  expect(
    paymentRequestFunction.indexOf("const existing =") < paymentRequestFunction.indexOf("PAYMENT_LINK_NOT_CONFIGURED"),
    "Apps Script: existing package payment requests must be returned before requiring current link configuration",
  )
  expect(
    paymentRequestFunction.indexOf("PLAN_PAYMENT_STAGE_NOT_READY") < paymentRequestFunction.indexOf("PAYMENT_LINK_NOT_CONFIGURED"),
    "Apps Script: midpoint readiness must be checked before payment-link configuration",
  )
  expect(
    paymentRequestFunction.includes('["cancelled", "completed", "expired"].includes'),
    "Apps Script: package payment requests must reject terminal enrollments",
  )
  expect(
    paymentWebhookFunction.includes('["cancelled", "completed", "expired"].includes'),
    "Apps Script: verified package payments must not reactivate terminal enrollments",
  )

  const sandbox = {}
  vm.createContext(sandbox)
  vm.runInContext(`${appsScriptSource}\n;globalThis.__planPayments = {
    getPlanPaymentStage_,
    grantCreditsForPaidPlanPayment_,
    replaceDependencies(dependencies) {
      getOrCreateSheet_ = dependencies.getOrCreateSheet
      findSheetRecordById_ = dependencies.findSheetRecordById
      getSheetRecords_ = dependencies.getSheetRecords
      appendCreditLedgerEntry_ = dependencies.appendCreditLedgerEntry
    },
  }`, sandbox)

  const lifecycle = sandbox.__planPayments
  const momentum = lifecycle.getPlanPaymentStage_("PLAN-PACK4-250", "momentum_initial")
  const midpoint = lifecycle.getPlanPaymentStage_("PLAN-PACK10-600", "progression_midpoint")
  expect(
    momentum?.offer === "momentum_block_payment_1" && momentum?.amount_cad === "250" && momentum?.credit_grant_count === 4,
    "Apps Script: momentum payment stage does not resolve to one $250/four-credit grant",
  )
  expect(
    midpoint?.offer === "progression_block_payment_2" && midpoint?.amount_cad === "300" && midpoint?.credit_grant_count === 5,
    "Apps Script: progression midpoint does not resolve to one $300/five-credit grant",
  )

  const ledgerEntries = []
  let enrollmentStatus = "active"
  lifecycle.replaceDependencies({
    getOrCreateSheet: (_spreadsheet, sheetName) => sheetName,
    findSheetRecordById: (_sheet, _columns, _idColumn, enrollmentId) => enrollmentId === "ENROLL-1"
      ? { data: { enrollment_id: "ENROLL-1", plan_id: "PLAN-PACK4-250", parent_email: "parent@example.com", student_id: "STUDENT-1", status: enrollmentStatus, expires_at: "2026-12-31" } }
      : null,
    getSheetRecords: () => ledgerEntries,
    appendCreditLedgerEntry: (_spreadsheet, entry) => {
      const stored = { credit_ledger_id: `CREDIT-${ledgerEntries.length + 1}`, ...entry }
      ledgerEntries.push(stored)
      return stored
    },
  })
  const paidPackage = { payment_id: "PAY-1", plan_enrollment_id: "ENROLL-1", credit_grant_count: 4 }
  const firstGrant = lifecycle.grantCreditsForPaidPlanPayment_(null, paidPackage)
  const replayGrant = lifecycle.grantCreditsForPaidPlanPayment_(null, paidPackage)
  expect(
    firstGrant.granted === true && replayGrant.already_granted === true && ledgerEntries.length === 1 && ledgerEntries[0].source_payment_id === "PAY-1",
    "Apps Script: replaying one verified package payment must leave exactly one source-linked credit grant",
  )
  enrollmentStatus = "cancelled"
  const terminalGrant = lifecycle.grantCreditsForPaidPlanPayment_(null, { ...paidPackage, payment_id: "PAY-2" })
  expect(
    terminalGrant.code === "PLAN_ENROLLMENT_NOT_ACTIONABLE" && ledgerEntries.length === 1,
    "Apps Script: direct credit recovery must not grant to a terminal enrollment",
  )
}

async function main() {
  const pages = getPrerenderPageEntries()

  await verifyPages(pages)
  await verifySitemap(pages)
  await verifyPerformanceBudget()
  await verifyParentEntryPoint()
  await verifyPortalActionParity()
  await verifyFinalReviewSafetyContracts()
  await verifyPlanPaymentLifecycleSources()

  if (failures.length > 0) {
    console.error("Static site checks failed:\n")
    failures.forEach((failure) => console.error(`- ${failure}`))
    process.exitCode = 1
    return
  }

  const indexableCount = pages.filter((page) => page.includeInSitemap !== false).length
  console.log(`Static site checks passed for ${pages.length} routes (${indexableCount} prerendered).`)
}

await main()
