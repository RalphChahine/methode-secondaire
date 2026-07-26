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

test("keeps the prepare action and Today session aligned with unsorted sessions", () => {
  const dashboard = {
    profile: { name: "Parent" },
    matching: { tutor_id: "T-1" },
    next_session: {
      session_id: "S-SOON",
      session_status: "confirmed",
      start_at: "2099-01-01T15:00:00.000Z",
    },
    sessions: [
      {
        session_id: "S-LATER",
        session_status: "confirmed",
        start_at: "2099-01-08T15:00:00.000Z",
      },
      {
        session_id: "S-SOON",
        session_status: "confirmed",
        start_at: "2099-01-01T15:00:00.000Z",
      },
    ],
    metrics: {},
  }
  const action = getParentNextAction(dashboard)

  assert.equal(action.sessionId, "S-LATER")
  assert.equal(getParentTodaySession(dashboard, action)?.session_id, action.sessionId)
})

test("moves Today to the unprepared session when the canonical next session already has material", async () => {
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
        session_id: "S-NEEDS-MATERIAL",
        session_status: "confirmed",
        start_at: "2099-01-08T15:00:00.000Z",
      },
    ],
    session_materials: [{ session_id: "S-NEXT", status: "shared" }],
    metrics: {},
  }
  const action = getParentNextAction(dashboard)

  assert.equal(action.sessionId, "S-NEEDS-MATERIAL")
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
