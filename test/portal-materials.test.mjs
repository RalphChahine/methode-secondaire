import assert from "node:assert/strict"
import test from "node:test"
import {
  MAX_PORTAL_MATERIAL_BYTES,
  MAX_PORTAL_MATERIAL_FILES,
  getSessionMaterials,
  validatePortalMaterialFile,
} from "../src/lib/portalMaterials.js"

test("accepts supported material at the byte limit", () => {
  assert.deepEqual(validatePortalMaterialFile({
    name: "algebra.jpg", type: "image/jpeg", size: MAX_PORTAL_MATERIAL_BYTES,
  }), { ok: true })
  assert.deepEqual(validatePortalMaterialFile({
    name: "chapter.pdf", type: "application/pdf", size: 1024,
  }), { ok: true })
})

test("rejects unsupported and oversize material", () => {
  assert.equal(validatePortalMaterialFile({
    name: "answers.docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", size: 10,
  }).code, "SESSION_MATERIAL_TYPE_NOT_ALLOWED")
  assert.equal(validatePortalMaterialFile({
    name: "scan.pdf", type: "application/pdf", size: MAX_PORTAL_MATERIAL_BYTES + 1,
  }).code, "SESSION_MATERIAL_FILE_TOO_LARGE")
  assert.equal(MAX_PORTAL_MATERIAL_FILES, 5)
})

test("shows only active material for the requested session", () => {
  const materials = [
    { material_id: "MAT-1", session_id: "S-1", status: "shared" },
    { material_id: "MAT-2", session_id: "S-1", status: "withdrawn" },
    { material_id: "MAT-3", session_id: "S-2", status: "shared" },
  ]
  assert.deepEqual(getSessionMaterials(materials, "S-1").map((item) => item.material_id), ["MAT-1"])
})

test("limits active session material to five files", () => {
  const materials = Array.from({ length: 6 }, (_, index) => ({
    material_id: `MAT-${index + 1}`, session_id: "S-1", status: "shared",
  }))
  assert.equal(getSessionMaterials(materials, "S-1").length, MAX_PORTAL_MATERIAL_FILES)
})
