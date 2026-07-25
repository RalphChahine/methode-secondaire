export const MAX_PORTAL_MATERIAL_FILES = 5
export const MAX_PORTAL_MATERIAL_BYTES = 2621440
export const PORTAL_MATERIAL_MIME_TYPES = new Set([
  "image/jpeg", "image/png", "image/webp", "application/pdf",
])

export function validatePortalMaterialFile(file = {}) {
  if (!PORTAL_MATERIAL_MIME_TYPES.has(String(file.type || "").toLowerCase())) {
    return { ok: false, code: "SESSION_MATERIAL_TYPE_NOT_ALLOWED" }
  }
  if (!Number.isFinite(Number(file.size)) || Number(file.size) < 1) {
    return { ok: false, code: "SESSION_MATERIAL_FILE_INVALID" }
  }
  if (Number(file.size) > MAX_PORTAL_MATERIAL_BYTES) {
    return { ok: false, code: "SESSION_MATERIAL_FILE_TOO_LARGE" }
  }
  return { ok: true }
}

export function getSessionMaterials(materials = [], sessionId = "") {
  return (Array.isArray(materials) ? materials : [])
    .filter((material) => material && material.session_id === sessionId)
    .filter((material) => material.status === "shared")
    .slice(0, MAX_PORTAL_MATERIAL_FILES)
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error || new Error("Unable to read material"))
    reader.onload = () => resolve(String(reader.result || ""))
    reader.readAsDataURL(file)
  })
}

function decodeImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onerror = () => reject(new Error("Unable to decode image"))
    image.onload = () => resolve(image)
    image.src = dataUrl
  })
}

function dataUrlPayload(dataUrl) {
  return dataUrl.slice(dataUrl.indexOf(",") + 1)
}

async function compressImage(image) {
  let width = image.naturalWidth || image.width
  let height = image.naturalHeight || image.height

  while (width > 0 && height > 0) {
    const canvas = new OffscreenCanvas(width, height)
    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Unable to create image context")
    }
    context.drawImage(image, 0, 0, width, height)

    for (let quality = 0.9; quality >= 0.1; quality -= 0.1) {
      const blob = await canvas.convertToBlob({ type: "image/jpeg", quality })
      if (blob.size <= MAX_PORTAL_MATERIAL_BYTES) {
        return blob
      }
    }

    width = Math.floor(width * 0.8)
    height = Math.floor(height * 0.8)
  }

  throw new Error("Unable to compress image")
}

export async function preparePortalMaterialUpload(file) {
  const validation = validatePortalMaterialFile(file)
  if (!validation.ok) {
    return validation
  }

  try {
    const dataUrl = await readFileAsDataUrl(file)
    if (String(file.type).toLowerCase() === "application/pdf") {
      return {
        file_name: file.name || "material.pdf",
        mime_type: "application/pdf",
        size_bytes: Number(file.size),
        data_base64: dataUrlPayload(dataUrl),
      }
    }

    const image = await decodeImage(dataUrl)
    const blob = await compressImage(image)
    const compressedDataUrl = await readFileAsDataUrl(blob)
    return {
      file_name: file.name || "material.jpg",
      mime_type: blob.type,
      size_bytes: blob.size,
      data_base64: dataUrlPayload(compressedDataUrl),
    }
  } catch {
    return { ok: false, code: "SESSION_MATERIAL_IMAGE_PROCESSING_FAILED" }
  }
}
