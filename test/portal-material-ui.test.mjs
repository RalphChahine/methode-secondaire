import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { renderToStaticMarkup } from "react-dom/server"
import { createServer } from "vite"

import * as portalClient from "../src/lib/portalClient.js"

async function capturePortalRequest(run) {
  const originalFetch = globalThis.fetch
  let payload
  globalThis.fetch = async (_url, options) => {
    payload = JSON.parse(options.body)
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }

  try {
    await run()
    return payload
  } finally {
    globalThis.fetch = originalFetch
  }
}

test("portal material client wrappers send the CRM action payloads", async () => {
  assert.equal(typeof portalClient.uploadPortalSessionMaterial, "function")
  assert.equal(typeof portalClient.withdrawPortalSessionMaterial, "function")

  assert.deepEqual(await capturePortalRequest(() => portalClient.uploadPortalSessionMaterial({
    token: "parent-token",
    sessionId: "SESSION-1",
    material: {
      file_name: "algebra.pdf",
      mime_type: "application/pdf",
      size_bytes: 123,
      data_base64: "cGRm",
    },
  })), {
    action: "portal_upload_session_material",
    token: "parent-token",
    session_id: "SESSION-1",
    file_name: "algebra.pdf",
    mime_type: "application/pdf",
    size_bytes: 123,
    data_base64: "cGRm",
  })

  assert.deepEqual(await capturePortalRequest(() => portalClient.withdrawPortalSessionMaterial({
    token: "parent-token",
    materialId: "MATERIAL-1",
  })), {
    action: "portal_withdraw_session_material",
    token: "parent-token",
    material_id: "MATERIAL-1",
  })
})

test("staging respects the five-material session cap and preserves retry state shape", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const { stagePortalMaterialFiles } = await vite.ssrLoadModule("/src/components/portal/SessionMaterialsPanel.jsx")
    const files = Array.from({ length: 5 }, (_, index) => ({
      name: `page-${index + 1}.jpg`,
      size: 100 + index,
      lastModified: index,
    }))

    const staged = stagePortalMaterialFiles([], files, 2)
    assert.equal(staged.length, 3)
    assert.deepEqual(Object.keys(staged[0]).sort(), ["error", "file", "id", "name", "state"])
    assert.equal(staged[0].state, "ready")
    assert.equal(staged[0].file, files[0])
  } finally {
    await vite.close()
  }
})

test("material uploads are sequential and a failed file does not block the next", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const { processReadyPortalMaterials } = await vite.ssrLoadModule("/src/components/portal/SessionMaterialsPanel.jsx")
    const entries = ["one.pdf", "two.pdf", "three.pdf"].map((name, index) => ({
      id: String(index + 1),
      file: { name },
      name,
      state: "ready",
      error: "",
    }))
    const events = []

    const result = await processReadyPortalMaterials({
      entries,
      token: "parent-token",
      sessionId: "SESSION-1",
      prepare: async (file) => {
        events.push(`prepare:${file.name}`)
        return file.name === "two.pdf"
          ? { ok: false, code: "SESSION_MATERIAL_IMAGE_PROCESSING_FAILED" }
          : { file_name: file.name }
      },
      upload: async ({ material }) => {
        events.push(`upload:${material.file_name}`)
        return { ok: true }
      },
      getErrorMessage: (_copy, code) => code,
      copy: {},
      onEntryChange: (id, state) => events.push(`state:${id}:${state.state}`),
    })

    assert.deepEqual(result, { shared: 2, failed: 1 })
    assert.deepEqual(events, [
      "state:1:uploading",
      "prepare:one.pdf",
      "upload:one.pdf",
      "state:1:shared",
      "state:2:uploading",
      "prepare:two.pdf",
      "state:2:failed",
      "state:3:uploading",
      "prepare:three.pdf",
      "upload:three.pdf",
      "state:3:shared",
    ])
  } finally {
    await vite.close()
  }
})

test("successful withdrawal hides the shared row before a non-fatal dashboard refresh", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const {
      getVisibleSessionMaterials,
      processPortalMaterialWithdrawal,
    } = await vite.ssrLoadModule("/src/components/portal/SessionMaterialsPanel.jsx")
    const events = []
    const withdrawnIds = new Set()

    const result = await processPortalMaterialWithdrawal({
      token: "parent-token",
      materialId: "MATERIAL-1",
      withdraw: async () => {
        events.push("withdraw")
        return { ok: true, material_id: "MATERIAL-1" }
      },
      onWithdrawn: (materialId) => {
        events.push("hide")
        withdrawnIds.add(materialId)
      },
      onSaved: async (options) => {
        events.push(`refresh:${options?.silent}`)
        throw new Error("dashboard refresh failed")
      },
    })

    assert.equal(result.ok, true)
    assert.deepEqual(events, ["withdraw", "hide", "refresh:true"])
    assert.deepEqual(getVisibleSessionMaterials([
      { material_id: "MATERIAL-1", session_id: "SESSION-1", status: "shared" },
      { material_id: "MATERIAL-2", session_id: "SESSION-1", status: "shared" },
    ], "SESSION-1", withdrawnIds).map((material) => material.material_id), ["MATERIAL-2"])
  } finally {
    await vite.close()
  }
})

test("silent dashboard reconciliation contains resolved refresh failures", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const { reconcilePortalDashboard } = await vite.ssrLoadModule("/src/pages/Portal.jsx")
    const requestDashboard = async () => ({ ok: false, code: "PORTAL_CRM_FAILED" })
    const silentEvents = []

    const silentResult = await reconcilePortalDashboard({
      currentSession: { token: "parent-token" },
      silent: true,
      requestDashboard,
      onLoadingChange: (value) => silentEvents.push(`loading:${value}`),
      onError: (value) => silentEvents.push(`error:${value}`),
      onInvalidSession: () => silentEvents.push("invalid"),
      onDashboard: () => silentEvents.push("dashboard"),
      getErrorMessage: (code) => `mapped:${code}`,
    })

    assert.equal(silentResult.ok, false)
    assert.deepEqual(silentEvents, [])

    const normalEvents = []
    await reconcilePortalDashboard({
      currentSession: { token: "parent-token" },
      requestDashboard,
      onLoadingChange: (value) => normalEvents.push(`loading:${value}`),
      onError: (value) => normalEvents.push(`error:${value}`),
      onInvalidSession: () => normalEvents.push("invalid"),
      onDashboard: () => normalEvents.push("dashboard"),
      getErrorMessage: (code) => `mapped:${code}`,
    })
    assert.deepEqual(normalEvents, [
      "loading:loadingDashboard",
      "error:",
      "loading:",
      "error:mapped:PORTAL_CRM_FAILED",
    ])
  } finally {
    await vite.close()
  }
})

test("tutor materials render only returned Drive URLs and group active items by session", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })
  try {
    const { default: TutorSessionMaterialsPanel } = await vite.ssrLoadModule("/src/components/portal/TutorSessionMaterialsPanel.jsx")
    const copy = {
      tutorMaterialsEyebrow: "Before the session",
      tutorMaterialsTitle: "Materials shared by parents",
      materialsOpen: "Open material",
      materialsOpenUnavailable: "Material temporarily unavailable",
    }
    const html = renderToStaticMarkup(TutorSessionMaterialsPanel({
      copy,
      sessions: [
        { session_id: "SESSION-1", student_name: "Alex", start_at: "2099-01-01T10:00:00.000Z" },
      ],
      materials: [
        { material_id: "MATERIAL-1", session_id: "SESSION-1", status: "shared", file_name: "chapter.pdf", drive_url: "https://drive.google.com/file/d/returned" },
        { material_id: "MATERIAL-2", session_id: "SESSION-1", status: "shared", file_name: "missing.jpg" },
        { material_id: "MATERIAL-3", session_id: "SESSION-1", status: "withdrawn", file_name: "old.pdf", drive_url: "https://drive.google.com/file/d/withdrawn" },
      ],
    }))

    assert.match(html, /Alex/)
    assert.match(html, /chapter\.pdf/)
    assert.match(html, /href="https:\/\/drive\.google\.com\/file\/d\/returned"/)
    assert.match(html, /missing\.jpg/)
    assert.doesNotMatch(html, /withdrawn/)
    assert.equal((html.match(/href=/g) || []).length, 1)
    assert.equal(renderToStaticMarkup(TutorSessionMaterialsPanel({
      copy,
      sessions: [],
      materials: [],
    })), "")
  } finally {
    await vite.close()
  }
})

test("Portal integrates the real material panels and maps every material error code", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")

  assert.match(source, /import SessionMaterialsPanel from "@\/components\/portal\/SessionMaterialsPanel"/)
  assert.match(source, /import TutorSessionMaterialsPanel from "@\/components\/portal\/TutorSessionMaterialsPanel"/)
  assert.match(source, /<SessionMaterialsPanel/)
  assert.match(source, /key=\{offerSnapshot\.nextSession\?\.session_id \|\| "no-session"\}/)
  assert.match(source, /<TutorSessionMaterialsPanel/)
  assert.match(source, /onSaved=\{\(options\) => refreshDashboard\(session, options\)\}/)
  assert.doesNotMatch(source, /function SessionPreparationCard/)
  assert.doesNotMatch(source, /materialsLocalOnly/)

  for (const code of [
    "SESSION_MATERIAL_FILE_INVALID",
    "SESSION_MATERIAL_TYPE_NOT_ALLOWED",
    "SESSION_MATERIAL_FILE_TOO_LARGE",
    "SESSION_MATERIAL_IMAGE_PROCESSING_FAILED",
    "SESSION_MATERIAL_NOT_AVAILABLE",
    "SESSION_MATERIAL_LIMIT_REACHED",
    "SESSION_MATERIAL_STORAGE_NOT_CONFIGURED",
    "SESSION_MATERIAL_STORAGE_FAILED",
    "SESSION_MATERIAL_CLEANUP_FAILED",
    "SESSION_MATERIAL_SHARE_FAILED",
    "SESSION_MATERIAL_WITHDRAW_FAILED",
  ]) {
    assert.match(source, new RegExp(code))
  }
})
