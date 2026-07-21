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
  const [checkoutEndpoint, checkoutBuilder, checkoutTest, packageJson, stripeWebhook, crmCode, portalEndpoint, portalClient] = await Promise.all([
    readSource("api/create-checkout-session.js"),
    readSource("api/lib/stripe-checkout.mjs"),
    readSource("test/stripe-checkout.test.mjs"),
    readSource("package.json"),
    readSource("api/stripe-webhook.js"),
    readSource("ops/crm/google-apps-script/Code.gs"),
    readSource("api/portal.js"),
    readSource("src/lib/portalClient.js"),
  ])

  expect(checkoutEndpoint.includes("PAYMENT_SESSION_SECRET"), "Checkout endpoint: PAYMENT_SESSION_SECRET is missing")
  expect(checkoutEndpoint.includes("crypto.timingSafeEqual"), "Checkout endpoint: internal secret comparison is not timing-safe")
  expect(checkoutEndpoint.includes('crypto.createHash("sha256")'), "Checkout endpoint: secret lengths are not normalized before comparison")
  expect(checkoutEndpoint.includes("application/x-www-form-urlencoded"), "Checkout endpoint: Stripe form encoding is missing")
  expect(checkoutBuilder.includes("CHECKOUT_EXPIRY_SECONDS = 60 * 60"), "Checkout builder: one-hour expiry is missing")
  expect(checkoutBuilder.includes('currency: "cad"'), "Checkout builder: CAD currency is missing")
  expect(checkoutTest.includes("createCheckoutRequest"), "Checkout test: request builder coverage is missing")
  expect(packageJson.includes('"test:payments": "node --test test/stripe-checkout.test.mjs"'), "package.json: test:payments command is missing")
  expect(checkoutBuilder.includes("checkout.session.expired") && stripeWebhook.includes("classifyStripeCheckoutEvent"), "Stripe webhook: checkout.session.expired handling is missing")
  expect(crmCode.includes("portal_mark_payment_expired_webhook"), "CRM: payment expiration webhook action is missing")
  expect(crmCode.includes("Calendar.Events.insert"), "CRM: Google Calendar event insertion is missing")
  expect(crmCode.includes("conferenceDataVersion: 1"), "CRM: Google Meet conference data version is missing")
  expect(crmCode.includes("hangoutsMeet"), "CRM: Google Meet conference request is missing")
  expect(crmCode.includes('sendUpdates: "none"'), "CRM: Meet invitations must wait for a ready link")
  expect(crmCode.includes('sendUpdates: "all"'), "CRM: Meet invitations are not sent after the link is ready")
  expect(crmCode.includes("google_meet_url"), "CRM: Google Meet URL persistence is missing")
  expect(crmCode.includes("processPendingSessionConferences"), "CRM: pending Google Meet conference processing is missing")
  expect(crmCode.includes("withMeetConferenceState_"), "CRM: Meet creation is not protected by a session lock")
  expect(crmCode.includes("reconcileMeetCreationFailure_"), "CRM: Meet creation failure is not reconciled under lock")
  expect(crmCode.includes("reconcilePendingMeetFailure_"), "CRM: pending Meet failure is not reconciled under lock")
  expect(crmCode.includes("extendedProperties"), "CRM: calendar invitation idempotency marker is missing")
  expect(crmCode.includes("meet_invitation_sent"), "CRM: calendar invitation marker is missing")
  expect(crmCode.includes("google_meet_url: record.google_meet_url"), "CRM: portal session Meet URL is not exposed")
  expect(crmCode.includes("calendar_conference_status: record.calendar_conference_status"), "CRM: portal session conference state is not exposed")
  expect(crmCode.includes("portal_reissue_payment_checkout"), "CRM: authorised Checkout reissue action is missing")
  expect(crmCode.includes("issueCheckoutForPayment_"), "CRM: protected Checkout issuance helper is missing")
  expect(crmCode.includes("expireUnpaidCheckoutSessions"), "CRM: unpaid Checkout expiry task is missing")
  expect(crmCode.includes("PAYMENT_SESSION_SECRET"), "CRM: Apps Script Checkout secret is missing")
  const expiryFunction = crmCode.slice(
    crmCode.indexOf("function expireLinkedSessionForPayment_("),
    crmCode.indexOf("function expireUnpaidCheckoutSessions("),
  )
  const scheduledPaymentFunction = crmCode.slice(
    crmCode.indexOf("function createPaymentRowsForScheduledSessions()"),
    crmCode.indexOf("function ensureCrmReady_("),
  )
  const reissueFunction = crmCode.slice(
    crmCode.indexOf("function reissuePortalPaymentCheckout_("),
    crmCode.indexOf("function grantCreditsForPaidPlanPayment_("),
  )
  expect(expiryFunction.includes("deleteCalendarEventForExpiredSession_(currentSession.data)") &&
    expiryFunction.indexOf("deleteCalendarEventForExpiredSession_(currentSession.data)") < expiryFunction.indexOf("session_status: \"cancelled\""),
  "CRM: expired session must delete its Calendar event before cancellation")
  expect(expiryFunction.includes("deleteCalendarEventForExpiredSession_(currentSession.data)") &&
    expiryFunction.includes("PAYMENT_EXPIRY_CALENDAR_DELETE_FAILED") &&
    expiryFunction.indexOf("deleteCalendarEventForExpiredSession_(currentSession.data)") < expiryFunction.indexOf("releasePlanCreditReservationForSession_"),
  "CRM: a Calendar deletion failure must block cancellation and credit release")
  expect(scheduledPaymentFunction.includes("PAYMENT_CREATION_BUSY") &&
    scheduledPaymentFunction.indexOf("paymentCreationLock.tryLock(5000)") < scheduledPaymentFunction.indexOf("getDataRange()"),
  "CRM: scheduled payment creation is not serialized")
  expect(reissueFunction.includes("PAYMENT_REBOOKING_REQUIRED") &&
    reissueFunction.indexOf("PAYMENT_REBOOKING_REQUIRED") < reissueFunction.indexOf("issueCheckoutForPayment_"),
  "CRM: expired session payments can be reissued instead of rebooked")
  expect(crmCode.includes("PAYMENT_REBOOKING_REQUIRED") &&
    crmCode.includes("can_reissue: normalizeValue_(record.payment_status) === \"overdue\" && !normalizeValue_(record.session_id)"),
  "CRM: only package payments may be reissued by a parent")
  expect(portalEndpoint.includes("portal_reissue_payment_checkout"), "Portal API: Checkout reissue route is missing")
  expect(portalClient.includes("reissuePortalPaymentCheckout"), "Portal client: Checkout reissue helper is missing")

  if (failures.length > 0) {
    console.error("Meet Checkout contract checks failed:\n")
    failures.forEach((failure) => console.error(`- ${failure}`))
    process.exitCode = 1
    return
  }

  console.log("Meet Checkout contract checks passed.")
}

await main()
