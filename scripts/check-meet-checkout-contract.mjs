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
  const [checkoutEndpoint, checkoutExpiryEndpoint, checkoutBuilder, checkoutTest, packageJson, stripeWebhook, crmCode, portalEndpoint, portalClient, portalSource, parentTutorRunbook] = await Promise.all([
    readSource("api/create-checkout-session.js"),
    readSource("api/expire-checkout-session.js"),
    readSource("api/lib/stripe-checkout.mjs"),
    readSource("test/stripe-checkout.test.mjs"),
    readSource("package.json"),
    readSource("api/stripe-webhook.js"),
    readSource("ops/crm/google-apps-script/Code.gs"),
    readSource("api/portal.js"),
    readSource("src/lib/portalClient.js"),
    readSource("src/pages/Portal.jsx"),
    readSource("ops/crm/parent-tutor-portal.md"),
  ])

  expect(checkoutEndpoint.includes("PAYMENT_SESSION_SECRET"), "Checkout endpoint: PAYMENT_SESSION_SECRET is missing")
  expect(checkoutEndpoint.includes("crypto.timingSafeEqual"), "Checkout endpoint: internal secret comparison is not timing-safe")
  expect(checkoutEndpoint.includes('crypto.createHash("sha256")'), "Checkout endpoint: secret lengths are not normalized before comparison")
  expect(checkoutEndpoint.includes("application/x-www-form-urlencoded"), "Checkout endpoint: Stripe form encoding is missing")
  expect(checkoutExpiryEndpoint.includes("PAYMENT_SESSION_SECRET"), "Checkout expiry endpoint: PAYMENT_SESSION_SECRET is missing")
  expect(checkoutExpiryEndpoint.includes("crypto.timingSafeEqual"), "Checkout expiry endpoint: internal secret comparison is not timing-safe")
  expect(checkoutExpiryEndpoint.includes("/expire"), "Checkout expiry endpoint: Stripe expire route is missing")
  expect(checkoutExpiryEndpoint.includes("STRIPE_CHECKOUT_ALREADY_COMPLETED"), "Checkout expiry endpoint: completed Checkout reconciliation state is missing")
  expect(checkoutExpiryEndpoint.includes("STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED"), "Checkout expiry endpoint: uncertain Stripe expiry is not blocked")
  expect(checkoutBuilder.includes("CHECKOUT_EXPIRY_SECONDS = 60 * 60"), "Checkout builder: one-hour expiry is missing")
  expect(checkoutBuilder.includes('currency: "cad"'), "Checkout builder: CAD currency is missing")
  expect(checkoutTest.includes("createCheckoutRequest"), "Checkout test: request builder coverage is missing")
  expect(checkoutTest.includes("expires an open Checkout Session only for an authenticated internal POST"), "Checkout test: hosted Checkout expiry coverage is missing")
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
  expect(crmCode.includes("deleteCalendarEventForSession_"), "CRM: Calendar deletion is not centralized")
  expect(crmCode.includes("Calendar.Events.remove"), "CRM: Advanced Calendar events are not removed through Calendar API")
  expect(crmCode.includes("isCalendarNotFoundError_"), "CRM: Calendar 404 removal handling is missing")
  expect(crmCode.includes("errorCode === 404"), "CRM: only explicit Calendar API 404s may count as already deleted")
  expect(crmCode.includes('code: "CALENDAR_EVENT_NOT_FOUND"'), "CRM: unknown legacy Calendar events must block lifecycle changes")
  expect(crmCode.includes("cancelSessionForMeetFailure_"), "CRM: terminal Meet failures do not cancel unusable sessions")
  expect(crmCode.includes("isSessionPaymentEligible_"), "CRM: failed Meet sessions are not blocked from Checkout issuance")
  expect(crmCode.includes("failed_cleanup_pending"), "CRM: terminal Meet cleanup failures are not retryable while blocking payment")
  expect(crmCode.includes("failed_payment_cleanup_pending"), "CRM: uncertain Checkout expiry is not queued for retry")
  expect(crmCode.includes("PAYMENT_CHECKOUT_EXPIRE_ENDPOINT"), "CRM: Checkout expiry endpoint is not configured privately")
  expect(crmCode.includes("expireSessionCheckoutBeforeMeetCancellation_"), "CRM: terminal Meet failures do not expire persisted Checkout Sessions")
  expect(crmCode.includes("STRIPE_CHECKOUT_ALREADY_COMPLETED"), "CRM: completed Checkout reconciliation is not protected")
  expect(crmCode.includes("STRIPE_CHECKOUT_EXPIRY_UNCONFIRMED"), "CRM: unknown Checkout expiry does not block cancellation")
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
  const checkoutUrlFunction = crmCode.slice(
    crmCode.indexOf("function getCheckoutPaymentUrl_("),
    crmCode.indexOf("function issueCheckoutForPayment_("),
  )
  const calendarNotFoundFunction = crmCode.slice(
    crmCode.indexOf("function isCalendarNotFoundError_("),
    crmCode.indexOf("function appendCalendarDeletionFailureRequest_("),
  )
  const paidWebhookFunction = crmCode.slice(
    crmCode.indexOf("function markPortalPaymentPaidFromWebhook_("),
    crmCode.indexOf("function markPortalPaymentExpiredFromWebhook_("),
  )
  const expiredWebhookFunction = crmCode.slice(
    crmCode.indexOf("function markPortalPaymentExpiredFromWebhook_("),
    crmCode.indexOf("function expireLinkedSessionForPaymentIfAvailable_("),
  )
  const meetFailureCheckoutFunction = crmCode.slice(
    crmCode.indexOf("function expireSessionCheckoutBeforeMeetCancellation_("),
    crmCode.indexOf("function expirePersistedCheckoutSession_("),
  )
  const parentSessionSanitizer = crmCode.slice(
    crmCode.indexOf("function sanitizeSessionForParent_("),
    crmCode.indexOf("function sanitizeSessionForTutor_("),
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
    crmCode.includes("isPlanEnrollmentEligibleForPaymentReissue_") &&
    reissueFunction.includes("PAYMENT_REISSUE_NOT_AVAILABLE"),
  "CRM: only eligible package payments may be reissued by a parent")
  expect(crmCode.includes("Paiement Stripe recu apres une inscription de forfait non admissible") &&
    crmCode.includes("requires_reconciliation: true"),
  "CRM: paid terminal package enrollments must create a reconciliation record")
  expect(calendarNotFoundFunction.includes("return errorCode === 404;") &&
    !calendarNotFoundFunction.includes("errorText"),
  "CRM: only an explicit numeric Calendar API 404 may count as already deleted")
  expect(paidWebhookFunction.includes("PAYMENT_WEBHOOK_SESSION_MISMATCH") &&
    paidWebhookFunction.includes("storedStripeSessionId") &&
    paidWebhookFunction.indexOf("PAYMENT_WEBHOOK_SESSION_MISMATCH") < paidWebhookFunction.indexOf("const alreadyPaid"),
  "CRM: a paid webhook must reject a mismatched stored Stripe Checkout Session before mutation")
  expect(meetFailureCheckoutFunction.includes('paymentStatus === "paid"') &&
    meetFailureCheckoutFunction.includes("holdCompletedCheckoutForMeetFailure_"),
  "CRM: an already-paid session must be held and reconciled before Meet-failure cancellation")
  expect(expiredWebhookFunction.includes('paymentStatus === "waived"') &&
    expiredWebhookFunction.includes("already_expired: true"),
  "CRM: a matching waived Checkout-expiry webhook must be acknowledged idempotently")
  expect(portalEndpoint.includes("portal_reissue_payment_checkout"), "Portal API: Checkout reissue route is missing")
  expect(portalClient.includes("reissuePortalPaymentCheckout"), "Portal client: Checkout reissue helper is missing")
  expect(!portalEndpoint.includes("portal_complete_demo_payment") &&
    !crmCode.includes('case "portal_complete_demo_payment":') &&
    !crmCode.includes("function completePortalDemoPayment_("),
  "Payment security: a public demo-payment mutation route remains enabled")
  expect(checkoutUrlFunction.includes("const checkoutUrl = normalizeValue_(payment && payment.checkout_url);") &&
    checkoutUrlFunction.includes("/^https:\\/\\/checkout\\.stripe\\.com\\/c\\//.test(checkoutUrl)") &&
    !checkoutUrlFunction.includes("payment_link"),
  "Payment security: Checkout URL lookup falls back to a legacy Payment Link")
  expect(!parentSessionSanitizer.includes("payment_link"),
  "Payment security: a legacy Payment Link is exposed in the parent session payload")
  expect(portalSource.includes('paymentDueOneHour: "Paiement à effectuer dans l’heure"') &&
    portalSource.includes('paymentDueOneHour: "Payment due within one hour"'),
  "Portal UI: one-hour payment status must have French and English copy")
  expect(portalSource.includes('paymentLinkExpired: "Ce lien de paiement a expiré."') &&
    portalSource.includes('paymentLinkExpired: "This payment link has expired."'),
  "Portal UI: expired payment status must have French and English copy")
  expect(portalSource.includes('requestNewPaymentLink: "Demander un nouveau lien de paiement"') &&
    portalSource.includes('requestNewPaymentLink: "Request a new payment link"'),
  "Portal UI: payment reissue action must have French and English copy")
  expect(portalSource.includes('meetPreparing: "Lien Google Meet en préparation"') &&
    portalSource.includes('meetPreparing: "Google Meet link is being prepared"'),
  "Portal UI: pending Meet status must have French and English copy")
  expect(portalSource.includes('joinGoogleMeet: "Rejoindre Google Meet"') &&
    portalSource.includes('joinGoogleMeet: "Join Google Meet"'),
  "Portal UI: Meet action must have French and English copy")
  expect(portalSource.includes('bookingReleased: "La réservation a été libérée. Choisissez un nouveau créneau avant de payer."') &&
    portalSource.includes('bookingReleased: "This booking was released. Choose a new time before paying."'),
  "Portal UI: released booking state must have French and English copy")
  expect(portalSource.includes("currentPayment.checkout_url") && portalSource.includes("currentPayment.can_reissue") &&
    portalSource.includes("reissuePortalPaymentCheckout"),
  "Portal UI: parent Checkout reissue is not connected to owner-scoped payment data")
  expect(portalSource.includes('session.format === "online"') && portalSource.includes("session.google_meet_url") &&
    portalSource.includes('session.calendar_conference_status === "pending"'),
  "Portal UI: Google Meet visibility conditions are missing")
  expect(!portalSource.includes("completePortalDemoPayment") &&
    !portalSource.includes('payment_mode === "demo"') &&
    !portalSource.includes("setPaymentUrl(result.payment_link)"),
  "Portal UI: demo or arbitrary booking payment-link flow remains enabled")
  expect(portalSource.includes("getSafeHostedCheckoutUrl(result.checkout_url || result.payment_url)") &&
    portalSource.includes('url.hostname === "checkout.stripe.com"') && portalSource.includes('url.pathname.startsWith("/c/")') &&
    !portalSource.includes("paymentResult.payment?.payment_link") &&
    !portalSource.includes("result.payment?.payment_link"),
  "Portal UI: payment CTAs must use only a validated hosted Checkout URL")
  expect(parentTutorRunbook.includes("[Stripe Checkout webhook runbook](stripe-webhook.md)") &&
    ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "PAYMENT_WEBHOOK_SECRET", "PAYMENT_SESSION_SECRET",
      "checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.expired"].every((token) => parentTutorRunbook.includes(token)),
  "Portal runbook: Checkout activation configuration is incomplete or not linked to the canonical Stripe runbook")

  if (failures.length > 0) {
    console.error("Meet Checkout contract checks failed:\n")
    failures.forEach((failure) => console.error(`- ${failure}`))
    process.exitCode = 1
    return
  }

  console.log("Meet Checkout contract checks passed.")
}

await main()
