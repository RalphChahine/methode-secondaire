import assert from "node:assert/strict"
import { Readable } from "node:stream"
import test from "node:test"

import portalHandler, { MAX_PORTAL_BODY_BYTES, PORTAL_ACTIONS } from "../api/portal.js"

test("allowlists the material actions at the bounded upload limit", () => {
  assert.equal(PORTAL_ACTIONS.has("portal_upload_session_material"), true)
  assert.equal(PORTAL_ACTIONS.has("portal_withdraw_session_material"), true)
  assert.equal(MAX_PORTAL_BODY_BYTES, 4 * 1024 * 1024)
})

test("forwards material action with the server-only secret", async () => {
  const originalFetch = globalThis.fetch
  const originalUrl = process.env.CRM_WEBHOOK_URL
  const originalSecret = process.env.CRM_PORTAL_SECRET
  const calls = []
  process.env.CRM_WEBHOOK_URL = "https://crm.example.test"
  process.env.CRM_PORTAL_SECRET = "shared-secret"
  globalThis.fetch = async (_url, options) => {
    calls.push(JSON.parse(options.body))
    return new Response(JSON.stringify({ ok: true, material: { material_id: "MAT-1" } }), {
      status: 200, headers: { "content-type": "application/json" },
    })
  }
  const response = makeResponse()
  try {
    await portalHandler({
      method: "POST",
      body: {
        action: "portal_upload_session_material",
        token: "parent-token",
        session_id: "S-1",
        file_name: "math.jpg",
        mime_type: "image/jpeg",
        size_bytes: 12,
        data_base64: "AA==",
      },
      headers: {},
      socket: {},
    }, response)
  } finally {
    globalThis.fetch = originalFetch
    restoreEnvironment("CRM_WEBHOOK_URL", originalUrl)
    restoreEnvironment("CRM_PORTAL_SECRET", originalSecret)
  }
  assert.equal(response.statusCode, 200)
  assert.equal(calls[0].portal_secret, "shared-secret")
  assert.equal(response.payload.portal_secret, undefined)
})

test("rejects an oversized streamed material payload", async () => {
  const request = Readable.from(["x".repeat(MAX_PORTAL_BODY_BYTES + 1)])
  request.method = "POST"
  request.headers = {}
  request.socket = {}
  const response = makeResponse()
  await portalHandler(request, response)
  assert.equal(response.statusCode, 400)
  assert.equal(response.payload.code, "INVALID_JSON")
})

test("rejects an oversized pre-parsed JSON body without calling CRM", async () => {
  const originalFetch = globalThis.fetch
  const originalUrl = process.env.CRM_WEBHOOK_URL
  const originalSecret = process.env.CRM_PORTAL_SECRET
  let fetchCalled = false
  process.env.CRM_WEBHOOK_URL = "https://crm.example.test"
  process.env.CRM_PORTAL_SECRET = "shared-secret"
  globalThis.fetch = async () => {
    fetchCalled = true
    throw new Error("CRM must not be called")
  }
  const request = {
    method: "POST",
    body: JSON.stringify({
      action: "portal_upload_session_material",
      data_base64: "x".repeat(MAX_PORTAL_BODY_BYTES),
    }),
    headers: {},
    socket: {},
  }
  const response = makeResponse()

  try {
    await portalHandler(request, response)
  } finally {
    globalThis.fetch = originalFetch
    restoreEnvironment("CRM_WEBHOOK_URL", originalUrl)
    restoreEnvironment("CRM_PORTAL_SECRET", originalSecret)
  }

  assert.equal(fetchCalled, false)
  assert.equal(response.statusCode, 400)
  assert.equal(response.payload.code, "INVALID_JSON")
})

test("rejects an oversized pre-parsed object body without calling CRM", async () => {
  const originalFetch = globalThis.fetch
  const originalUrl = process.env.CRM_WEBHOOK_URL
  const originalSecret = process.env.CRM_PORTAL_SECRET
  let fetchCalled = false
  process.env.CRM_WEBHOOK_URL = "https://crm.example.test"
  process.env.CRM_PORTAL_SECRET = "shared-secret"
  globalThis.fetch = async () => {
    fetchCalled = true
    throw new Error("CRM must not be called")
  }
  const body = {
    action: "portal_upload_session_material",
    data_base64: "",
  }
  body.data_base64 = "x".repeat((MAX_PORTAL_BODY_BYTES + 60) - Buffer.byteLength(JSON.stringify(body)))
  assert.equal(Buffer.byteLength(JSON.stringify(body)), MAX_PORTAL_BODY_BYTES + 60)
  const response = makeResponse()

  try {
    await portalHandler({ method: "POST", body, headers: {}, socket: {} }, response)
  } finally {
    globalThis.fetch = originalFetch
    restoreEnvironment("CRM_WEBHOOK_URL", originalUrl)
    restoreEnvironment("CRM_PORTAL_SECRET", originalSecret)
  }

  assert.equal(fetchCalled, false)
  assert.equal(response.statusCode, 400)
  assert.equal(response.payload.code, "INVALID_JSON")
})

test("stops reading streamed chunks after the body limit", async () => {
  const request = Readable.from([
    "x".repeat(MAX_PORTAL_BODY_BYTES + 1),
    { [Symbol.toPrimitive]: () => { throw new Error("read after limit") } },
  ], { objectMode: true })
  request.method = "POST"
  request.headers = {}
  request.socket = {}
  const response = makeResponse()

  await portalHandler(request, response)

  assert.equal(response.statusCode, 400)
  assert.equal(response.payload.code, "INVALID_JSON")
})

function makeResponse() {
  return {
    headers: {},
    statusCode: 200,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.payload = payload
      return this
    },
    setHeader(name, value) {
      this.headers[name] = value
    },
  }
}

function restoreEnvironment(name, value) {
  if (value === undefined) {
    delete process.env[name]
    return
  }

  process.env[name] = value
}
