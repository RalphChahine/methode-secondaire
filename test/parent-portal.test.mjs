import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { renderToStaticMarkup } from "react-dom/server"
import { createServer } from "vite"
import {
  getParentNextAction,
  getParentSessionProgress,
  getParentTodaySession,
} from "../src/lib/parentPortal.js"
import {
  findReleasedParentRecap,
  getPortalSessionState,
  groupParentSessions,
  isPortalSessionCurrentOrFuture,
} from "../src/lib/portalSessionState.js"
import { getPortalBookingOutcome } from "../src/lib/portalBookingOutcome.js"

test("does not let a parent confirm a proposal after its start time", () => {
  const state = getPortalSessionState({
    session_status: "proposed",
    start_at: "2026-07-14T21:40:00.000Z",
    payment_status: "payment_requested",
    parent_confirmed_at: "2026-07-10T12:00:00.000Z",
  }, "parent", new Date("2026-07-26T12:00:00.000Z"))

  assert.equal(state.isExpiredProposal, true)
  assert.equal(state.canConfirm, false)
  assert.equal(state.canShowPayment, false)
  assert.equal(state.canRequestChange, false)
})

test("does not offer an adjustment after a confirmed session has ended", () => {
  const state = getPortalSessionState({
    session_status: "confirmed",
    start_at: "2026-07-14T17:00:00.000Z",
    end_at: "2026-07-14T18:00:00.000Z",
  }, "parent", new Date("2026-07-26T12:00:00.000Z"))

  assert.equal(state.canRequestChange, false)
})

test("classifies a missing Checkout without calling it simulated", () => {
  assert.deepEqual(getPortalBookingOutcome({ payment_mode: "plan_credit" }), {
    kind: "plan_credit", checkoutUrl: "", stripeMode: "",
  })
  assert.deepEqual(getPortalBookingOutcome({ payment_mode: "waived" }), {
    kind: "waived", checkoutUrl: "", stripeMode: "",
  })
  assert.deepEqual(getPortalBookingOutcome({
    payment_mode: "stripe_checkout",
    checkout_url: "https://checkout.stripe.com/c/pay/cs_test_123",
    stripe_mode: "test",
  }), {
    kind: "checkout_ready",
    checkoutUrl: "https://checkout.stripe.com/c/pay/cs_test_123",
    stripeMode: "test",
  })
  assert.deepEqual(getPortalBookingOutcome({ payment_mode: "stripe_checkout" }), {
    kind: "checkout_unavailable", checkoutUrl: "", stripeMode: "",
  })
})

test("shows a waiting state instead of a second confirmation for the current participant", () => {
  const state = getPortalSessionState({
    session_status: "proposed",
    start_at: "2026-08-01T17:00:00.000Z",
    parent_confirmed_at: "2026-07-26T12:00:00.000Z",
  }, "parent", new Date("2026-07-26T12:00:00.000Z"))

  assert.equal(state.isWaitingForOther, true)
  assert.equal(state.canConfirm, false)
  assert.equal(state.canRequestChange, true)
})

test("does not offer a schedule-change action after a calendar event exists", () => {
  const state = getPortalSessionState({
    session_status: "calendar_created",
    start_at: "2026-08-01T17:00:00.000Z",
    parent_confirmed_at: "2026-07-26T12:00:00.000Z",
    tutor_confirmed_at: "2026-07-26T12:05:00.000Z",
  }, "parent", new Date("2026-07-26T12:00:00.000Z"))

  assert.equal(state.canRequestChange, false)
})

test("only exposes a requested payment after both confirmations", () => {
  const session = {
    session_status: "proposed",
    start_at: "2026-08-01T17:00:00.000Z",
    payment_status: "payment_requested",
    parent_confirmed_at: "2026-07-26T12:00:00.000Z",
  }
  assert.equal(getPortalSessionState(session, "parent", new Date("2026-07-26T12:00:00.000Z")).canShowPayment, false)

  assert.equal(getPortalSessionState({
    ...session,
    session_status: "confirmed",
    tutor_confirmed_at: "2026-07-26T12:05:00.000Z",
  }, "parent", new Date("2026-07-26T12:00:00.000Z")).canShowPayment, true)
})

test("groups parent history and finds only the released recap for a completed session", () => {
  const now = new Date("2026-07-26T12:00:00.000Z")
  const groups = groupParentSessions([
    { session_id: "UP", session_status: "confirmed", start_at: "2026-08-01T17:00:00.000Z" },
    { session_id: "PAST-OLD", session_status: "completed", start_at: "2026-07-14T17:00:00.000Z" },
    { session_id: "CANCELLED-OLD", session_status: "cancelled", start_at: "2026-07-18T17:00:00.000Z" },
    { session_id: "PAST-NEW", session_status: "completed", start_at: "2026-07-24T17:00:00.000Z" },
    { session_id: "CANCELLED-NEW", session_status: "cancelled", start_at: "2026-07-22T17:00:00.000Z" },
    { session_id: "CANCELLED-UNDATED", session_status: "cancelled", start_at: "not-a-date" },
  ], now)

  assert.deepEqual(groups.upcoming.map((session) => session.session_id), ["UP"])
  assert.deepEqual(groups.past.map((session) => session.session_id), ["PAST-NEW", "PAST-OLD"])
  assert.deepEqual(groups.cancelled.map((session) => session.session_id), ["CANCELLED-NEW", "CANCELLED-OLD", "CANCELLED-UNDATED"])
  assert.equal(findReleasedParentRecap([
    { session_id: "PAST", status: "draft", parent_summary: "Do not show" },
    { session_id: "PAST", status: "released", parent_summary: "Visible recap" },
  ], "PAST").parent_summary, "Visible recap")
})

test("keeps only current or future non-terminal sessions in the parent action path", () => {
  const now = new Date("2026-07-26T12:00:00.000Z")

  assert.equal(isPortalSessionCurrentOrFuture({
    session_status: "proposed",
    start_at: "2026-07-14T17:00:00.000Z",
  }, now), false)
  assert.equal(isPortalSessionCurrentOrFuture({
    session_status: "confirmed",
    start_at: "2026-08-01T17:00:00.000Z",
  }, now), true)
  assert.equal(isPortalSessionCurrentOrFuture({
    session_status: "cancelled",
    start_at: "2026-08-01T17:00:00.000Z",
  }, now), false)
})

test("does not let a stale proposal block a parent from booking a real next session", () => {
  const action = getParentNextAction({
    profile: { name: "Parent" },
    matching: { tutor_id: "T-1" },
    sessions: [{
      session_status: "proposed",
      start_at: "2026-07-14T17:00:00.000Z",
    }],
    metrics: {},
  })

  assert.equal(action.key, "booking")
  assert.equal(action.destination, "sessions")
})

test("does not show a stale proposal as the parent next session", () => {
  const nextSession = getParentTodaySession({
    next_session: {
      session_id: "STALE",
      session_status: "proposed",
      start_at: "2026-07-14T17:00:00.000Z",
    },
    sessions: [{
      session_id: "FUTURE",
      session_status: "confirmed",
      start_at: "2099-01-01T17:00:00.000Z",
    }],
  })

  assert.equal(nextSession.session_id, "FUTURE")
})

test("returns one prepare action for an upcoming confirmed session", () => {
  const action = getParentNextAction({
    profile: { name: "Parent" }, matching: { tutor_id: "T-1" },
    sessions: [{ session_id: "S-1", session_status: "confirmed", start_at: "2099-01-01T15:00:00.000Z" }],
    metrics: { payments_due: 0, messages_waiting: 0 }, session_materials: [],
  })
  assert.deepEqual(action, { key: "prepare", destination: "today", sessionId: "S-1" })
})

test("does not repeat prepare once the upcoming session has shared material", () => {
  assert.deepEqual(getParentNextAction({
    profile: { name: "Parent" }, matching: { tutor_id: "T-1" },
    sessions: [{ session_id: "S-1", session_status: "confirmed", start_at: "2099-01-01T15:00:00.000Z" }],
    metrics: { payments_due: 0, messages_waiting: 0 },
    session_materials: [{ session_id: "S-1", status: "shared" }],
  }), { key: "all_set", destination: "today" })
})

test("does not prepare a confirmed session without a valid future start time", () => {
  for (const start_at of [undefined, "not-a-date"]) {
    const action = getParentNextAction({
      profile: { name: "Parent" }, matching: { tutor_id: "T-1" },
      sessions: [{ session_id: "S-1", session_status: "confirmed", start_at }],
      metrics: { payments_due: 0, messages_waiting: 0 }, session_materials: [],
    })
    assert.notEqual(action.key, "prepare")
  }
})

test("uses the fixed next-action priority", () => {
  assert.equal(getParentNextAction({ profile: {}, sessions: [] }).key, "profile")
  assert.equal(getParentNextAction({ profile: { name: "P" }, matching: {}, sessions: [] }).key, "matching")
  assert.equal(getParentNextAction({ profile: { name: "P" }, matching: { tutor_id: "T" }, sessions: [], metrics: {} }).key, "booking")
  assert.equal(getParentNextAction({ profile: { name: "P" }, matching: { tutor_id: "T" }, sessions: [{ session_status: "confirmed" }], metrics: { payments_due: 1 } }).key, "payment")
})

test("routes each primary action to its focused destination", () => {
  assert.equal(getParentNextAction({ profile: {}, sessions: [] }).destination, "account")
  assert.equal(getParentNextAction({
    profile: { name: "P" }, matching: { tutor_id: "T" }, sessions: [], metrics: {},
  }).destination, "sessions")
  assert.equal(getParentNextAction({
    profile: { name: "P" }, matching: { tutor_id: "T" },
    sessions: [{ session_id: "S", session_status: "confirmed", start_at: "2099-01-01T15:00:00.000Z" }],
    metrics: { messages_waiting: 1 }, session_materials: [{ session_id: "S", status: "shared" }],
  }).destination, "messages")
})

test("treats a student's assigned tutor as completed matching", () => {
  const action = getParentNextAction({
    profile: { name: "Parent" },
    students: [{ assigned_tutor_id: "T-1" }],
    matching: {},
    sessions: [],
    metrics: {},
  })

  assert.equal(action.key, "booking")
  assert.equal(action.destination, "sessions")
})

test("keeps the legacy message counter in the next-action priority", () => {
  const action = getParentNextAction({
    profile: { name: "Parent" },
    matching: { tutor_id: "T-1" },
    sessions: [{ session_status: "confirmed" }],
    metrics: { messages_to_reply: 1 },
  })

  assert.equal(action.key, "message")
  assert.equal(action.destination, "messages")
})

test("renders four accessible parent destinations with a non-colour active state", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const { default: ParentPortalNavigation } = await vite.ssrLoadModule(
      "/src/components/portal/ParentPortalNavigation.jsx",
    )
    const items = [
      ["today", "Today"],
      ["sessions", "Sessions"],
      ["messages", "Messages"],
      ["account", "Family & account"],
    ].map(([key, label]) => ({ key, label, icon: () => null }))
    const html = renderToStaticMarkup(ParentPortalNavigation({
      active: "messages",
      items,
      onChange: () => {},
      ariaLabel: "Parent destinations",
    }))

    assert.equal((html.match(/<button/g) || []).length, 4)
    assert.equal((html.match(/aria-current="page"/g) || []).length, 1)
    assert.match(html, /<nav aria-label="Parent destinations"/)
    assert.match(html, /type="button"/)
    assert.match(html, /min-h-11/)
    assert.match(html, /focus-visible:ring-2/)
    assert.match(html, /Family &amp; account/)
  } finally {
    await vite.close()
  }
})

test("parent dashboard defaults to Today and gates secondary destinations", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")

  assert.match(source, /import ParentPortalNavigation from "@\/components\/portal\/ParentPortalNavigation"/)
  assert.match(source, /getParentNextAction/)
  assert.match(source, /getParentSessionProgress/)
  assert.match(source, /useState\("today"\)/)
  for (const destination of ["today", "sessions", "messages", "account"]) {
    assert.match(source, new RegExp(`activeDestination === "${destination}"`))
  }
  assert.doesNotMatch(source, /function PortalQuickNav/)
  for (const label of [
    "Aujourd’hui",
    "Séances",
    "Famille et compte",
    "Préparer la séance",
    "Séance avec le tuteur",
    "Lire le bilan",
    "Today",
    "Sessions",
    "Family & account",
    "Prepare the session",
    "Meet with the tutor",
    "Read the recap",
  ]) {
    assert.match(source, new RegExp(label))
  }
})

test("renders grouped parent session history and state-driven session actions", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")

  assert.match(source, /getPortalSessionState/)
  assert.match(source, /groupParentSessions/)
  assert.match(source, /findReleasedParentRecap/)
  assert.match(source, /copy\.upcomingSessions/)
  assert.match(source, /copy\.pastSessions/)
  assert.match(source, /copy\.cancelledSessions/)
  assert.match(source, /presentation\.canConfirm/)
  assert.match(source, /presentation\.isWaitingForOther/)
  assert.match(source, /presentation\.isExpiredProposal/)
  assert.match(source, /presentation\.canShowPayment/)
})

test("CRM protects confirmation and payment state for proposed sessions", async () => {
  const source = await readFile(new URL("../ops/crm/google-apps-script/Code.gs", import.meta.url), "utf8")
  const responder = source.slice(
    source.indexOf("function respondToPortalSession_("),
    source.indexOf("function reschedulePortalSession_("),
  )
  const creator = source.slice(
    source.indexOf("function createPortalSession_("),
    source.indexOf("function bookPortalSession_("),
  )
  const rescheduler = source.slice(
    source.indexOf("function reschedulePortalSession_("),
    source.indexOf("function cancelPortalSession_("),
  )

  assert.match(responder, /response === "confirm" && !isUpcomingDate_\(sessionRecord\.data\.start_at\)/)
  assert.match(responder, /already_confirmed: true/)
  assert.match(responder, /const paymentDetails = resolveSessionPaymentDetails_\(next\)/)
  assert.match(responder, /Number\(paymentDetails\.amount_cad\) > 0 \? "payment_requested" : "waived"/)
  assert.match(responder, /next\.payment_status = "not_requested"/)
  assert.match(responder, /voidUnpaidSessionPayments_\(spreadsheet, sessionId, "Schedule change requested\."\)/)
  assert.match(creator, /payment_status: "not_requested"/)
  assert.match(rescheduler, /payment_status: "not_requested"/)
  assert.match(rescheduler, /voidUnpaidSessionPayments_\(spreadsheet, sessionId, "Session rescheduled by the team\."\)/)
})

test("CRM returns only the safe Stripe mode for a newly issued portal Checkout", async () => {
  const source = await readFile(new URL("../ops/crm/google-apps-script/Code.gs", import.meta.url), "utf8")
  const paymentCreator = source.slice(
    source.indexOf("function createPaymentRowsForScheduledSessions()"),
    source.indexOf("function ensureCrmReady_("),
  )
  const checkoutIssuer = source.slice(
    source.indexOf("function issueCheckoutForPayment_("),
    source.indexOf("function sendParentSessionSummary_("),
  )
  const booker = source.slice(
    source.indexOf("function bookPortalSession_("),
    source.indexOf("function submitParentFeedback_("),
  )

  assert.match(paymentCreator, /checkout_results/)
  assert.match(checkoutIssuer, /stripe_mode/)
  assert.match(booker, /finalization\.payments\.checkout_results/)
  assert.match(booker, /stripe_mode:/)
})

test("CRM waives a zero-dollar session and retains only safe Checkout diagnostics", async () => {
  const source = await readFile(new URL("../ops/crm/google-apps-script/Code.gs", import.meta.url), "utf8")
  const paymentCreator = source.slice(
    source.indexOf("function createPaymentRowsForScheduledSessions()"),
    source.indexOf("function ensureCrmReady_("),
  )
  const checkoutIssuer = source.slice(
    source.indexOf("function issueCheckoutForPayment_("),
    source.indexOf("function sendParentSessionSummary_("),
  )

  assert.match(paymentCreator, /payment_method: Number\(paymentDetails\.amount_cad\) > 0 \? "stripe_checkout" : "waived"/)
  assert.match(paymentCreator, /payment_status: Number\(paymentDetails\.amount_cad\) > 0 \? "payment_requested" : "waived"/)
  assert.match(paymentCreator, /recordPaymentCheckoutFailure_\(spreadsheet, existingPayment\.data, issued\)/)
  assert.match(checkoutIssuer, /resolveCheckoutFailureCode_\(checkout\.code\)/)
})

test("CRM creates, follows, and removes bookings from the central Méthode Secondaire calendar", async () => {
  const source = await readFile(new URL("../ops/crm/google-apps-script/Code.gs", import.meta.url), "utf8")
  const creator = source.slice(
    source.indexOf("function createCalendarEventForConfirmedSession_("),
    source.indexOf("function withMeetConferenceState_("),
  )
  const pendingMeet = source.slice(
    source.indexOf("function processPendingSessionConference_("),
    source.indexOf("function reconcilePendingMeetFailure_("),
  )
  const advancedDeletion = source.slice(
    source.indexOf("function deleteAdvancedCalendarEvent_("),
    source.indexOf("function deleteLegacyCalendarEvent_("),
  )
  const legacyDeletion = source.slice(
    source.indexOf("function deleteLegacyCalendarEvent_("),
    source.indexOf("function isCalendarNotFoundError_("),
  )

  assert.match(source, /const METHODE_SECONDAIRE_CALENDAR_ID_PROPERTY = "METHODE_SECONDAIRE_CALENDAR_ID"/)
  assert.match(source, /"calendar_owner_id"/)
  assert.match(source, /function resolveManagedCalendarId_\(\)/)
  assert.match(source, /function resolveCalendarCandidateIds_\(/)
  assert.match(creator, /calendarId = resolveManagedCalendarId_\(\)/)
  assert.match(creator, /calendar_owner_id: calendarId/)
  assert.match(creator, /Calendar\.Events\.insert\(buildManagedCalendarEvent_\(session\), calendarId, \{\s*sendUpdates: "all"/)
  assert.doesNotMatch(creator, /resolveTutorCalendarId_/)
  assert.match(pendingMeet, /getAdvancedCalendarEventForSession_\(spreadsheet, session, eventId\)/)
  assert.doesNotMatch(pendingMeet, /resolveTutorCalendarId_/)
  assert.match(advancedDeletion, /resolveCalendarCandidateIds_\(spreadsheet, session\)/)
  assert.match(advancedDeletion, /sendUpdates: shouldNotifyGuests \? "all" : "none"/)
  assert.doesNotMatch(advancedDeletion, /resolveTutorCalendarId_/)
  assert.match(legacyDeletion, /resolveCalendarCandidateIds_\(spreadsheet, session\)/)
  assert.doesNotMatch(legacyDeletion, /resolveCalendarForTutor_/)
  assert.doesNotMatch(source, /portal_update_tutor_calendar/)
})

test("operator tutor setup asks for email and portal availability, not a personal calendar", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
  const tutorPanel = source.slice(
    source.indexOf("function TutorAccessPanel("),
    source.indexOf("function SessionMessagePanel("),
  )

  assert.doesNotMatch(tutorPanel, /calendar_id/)
  assert.doesNotMatch(tutorPanel, /updatePortalTutorCalendar/)
  assert.doesNotMatch(tutorPanel, /calendarIdHelp/)
})

test("the parent portal calls a zero-dollar payment free", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
  const paymentRow = source.slice(
    source.indexOf("function PaymentRow("),
    source.indexOf("function NoteRow("),
  )

  assert.match(paymentRow, /const isWaived = currentPayment\.payment_status === "waived"/)
  assert.match(paymentRow, /const paymentAmount = isWaived \? copy\.freeSession/)
})

test("the prepare action focuses the material panel already rendered on Today", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")

  assert.match(source, /function openParentDestination\(destination, actionKey\)/)
  assert.match(source, /actionKey !== "prepare"/)
  assert.match(source, /getElementById\("portal-preparation-focus-target"\)/)
  assert.match(source, /scrollIntoView/)
  assert.match(source, /preparation\?\.focus/)
  assert.match(source, /id="portal-preparation-focus-target"/)
  assert.match(source, /tabIndex=\{-1\}/)
})

test("uses an unprepared canonical next session before an earlier array session", () => {
  const dashboard = {
    profile: { name: "Parent" },
    matching: { tutor_id: "T-1" },
    next_session: {
      session_id: "S-CANONICAL",
      session_status: "confirmed",
      start_at: "2099-01-08T15:00:00.000Z",
    },
    sessions: [
      {
        session_id: "S-EARLIER",
        session_status: "confirmed",
        start_at: "2099-01-01T15:00:00.000Z",
      },
      {
        session_id: "S-CANONICAL",
        session_status: "confirmed",
        start_at: "2099-01-08T15:00:00.000Z",
      },
    ],
    metrics: {},
  }
  const action = getParentNextAction(dashboard)
  const todaySession = getParentTodaySession(dashboard, action)

  assert.equal(action.sessionId, "S-CANONICAL")
  assert.equal(todaySession?.session_id, action.sessionId)
  assert.equal(todaySession, dashboard.next_session)
})

test("moves Today to the earliest unprepared session when the canonical next session already has material", async () => {
  const dashboard = {
    profile: { name: "Parent" },
    matching: { tutor_id: "T-1" },
    next_session: {
      session_id: "S-NEXT",
      session_status: "confirmed",
      start_at: "2099-01-01T15:00:00.000Z",
    },
    sessions: [
      {
        session_id: "S-NEXT",
        session_status: "confirmed",
        start_at: "2099-01-01T15:00:00.000Z",
      },
      {
        session_id: "S-NEEDS-LATER",
        session_status: "confirmed",
        start_at: "2099-01-08T15:00:00.000Z",
      },
      {
        session_id: "S-NEEDS-EARLIER",
        session_status: "confirmed",
        start_at: "2099-01-03T15:00:00.000Z",
      },
    ],
    session_materials: [{ session_id: "S-NEXT", status: "shared" }],
    metrics: {},
  }
  const action = getParentNextAction(dashboard)

  assert.equal(action.sessionId, "S-NEEDS-EARLIER")
  assert.equal(getParentTodaySession(dashboard, action)?.session_id, action.sessionId)

  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
  assert.equal((source.match(/session=\{todaySession\}/g) || []).length, 3)
})

test("keeps recap current until a released note exists", () => {
  assert.deepEqual(getParentSessionProgress(
    { session_id: "S-1", session_status: "completed", end_at: "2000-01-01T15:00:00.000Z" },
    [], [],
  ), ["done", "done", "current"])
})

test("uses session time and released parent notes for progress", () => {
  assert.deepEqual(getParentSessionProgress(
    { session_id: "S-1", session_status: "confirmed", start_at: "2000-01-01T15:00:00.000Z", end_at: "2099-01-01T16:00:00.000Z" },
    [], [],
  ), ["done", "current", "upcoming"])
  assert.deepEqual(getParentSessionProgress(
    { session_id: "S-1", session_status: "completed" },
    [], [{ session_id: "S-1", status: "released" }],
  ), ["done", "done", "done"])
})
