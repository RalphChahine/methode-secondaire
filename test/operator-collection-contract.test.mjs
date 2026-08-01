import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const expectedCollections = ["families", "tutors", "sessions", "payments", "messages", "requests"]

test("operator collection action is allowlisted by both portal proxies", async () => {
  const [apiSource, viteSource, appsScriptSource] = await Promise.all([
    readFile(new URL("../api/portal.js", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.js", import.meta.url), "utf8"),
    readFile(new URL("../ops/crm/google-apps-script/Code.gs", import.meta.url), "utf8"),
  ])

  assert.match(apiSource, /"portal_get_operator_collection"/)
  assert.match(viteSource, /"portal_get_operator_collection"/)
  assert.match(appsScriptSource, /case "portal_get_operator_collection"/)
})

test("operator collection contract exposes only the six supported collections", async () => {
  const { OPERATOR_COLLECTIONS } = await import("../src/lib/operatorCollection.js")
  assert.deepEqual([...OPERATOR_COLLECTIONS], expectedCollections)
})

test("operator collection request defaults to 25 and clamps page size to 1 through 50", async () => {
  const { normalizeOperatorCollectionRequest } = await import("../src/lib/operatorCollection.js")
  assert.equal(normalizeOperatorCollectionRequest({ collection: "families" }).pageSize, 25)
  assert.equal(normalizeOperatorCollectionRequest({ collection: "families", pageSize: 0 }).pageSize, 1)
  assert.equal(normalizeOperatorCollectionRequest({ collection: "families", pageSize: 99 }).pageSize, 50)
  assert.equal(normalizeOperatorCollectionRequest({ collection: "families", pageSize: "12" }).pageSize, 12)
})

test("invalid operator collections fail with a stable contract error", async () => {
  const { normalizeOperatorCollectionRequest } = await import("../src/lib/operatorCollection.js")
  assert.throws(
    () => normalizeOperatorCollectionRequest({ collection: "secrets" }),
    (error) => error?.code === "OPERATOR_COLLECTION_INVALID",
  )
})

test("client wrapper sends collection pagination fields", async () => {
  const source = await readFile(new URL("../src/lib/portalClient.js", import.meta.url), "utf8")
  assert.match(source, /portal_get_operator_collection/)
  assert.match(source, /collection,\s*query,\s*cursor/)
  assert.match(source, /page_size: pageSize/)
})
