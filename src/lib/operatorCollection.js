export const OPERATOR_COLLECTIONS = new Set([
  "families",
  "tutors",
  "sessions",
  "payments",
  "messages",
  "requests",
])

export function normalizeOperatorCollectionRequest({ collection, query = "", cursor = "", pageSize = 25 } = {}) {
  const normalizedCollection = String(collection || "").trim().toLowerCase()
  if (!OPERATOR_COLLECTIONS.has(normalizedCollection)) {
    const error = new Error("Unsupported operator collection.")
    error.code = "OPERATOR_COLLECTION_INVALID"
    throw error
  }

  const numericPageSize = Number(pageSize)
  const safePageSize = Number.isFinite(numericPageSize) ? Math.trunc(numericPageSize) : 25
  const numericCursor = Number(cursor)
  const offset = Number.isFinite(numericCursor) && numericCursor > 0 ? Math.trunc(numericCursor) : 0

  return {
    collection: normalizedCollection,
    query: String(query || "").trim(),
    cursor: String(offset),
    offset,
    pageSize: Math.max(1, Math.min(50, safePageSize)),
  }
}

export function normalizeOperatorSearchValue(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

export function filterOperatorCollectionItems(items = [], query = "", fields = []) {
  const normalizedQuery = normalizeOperatorSearchValue(query)
  if (!normalizedQuery) {
    return items
  }

  return items.filter((item) => fields.some((field) => normalizeOperatorSearchValue(item?.[field]).includes(normalizedQuery)))
}
