const PRIORITY_LABELS = {
  0: "Blocking",
  1: "Follow up",
  2: "Confirm",
  3: "Overdue",
  4: "Payment",
}

function normalizeSearch(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim()
}

function asArray(value) {
  return Array.isArray(value) ? value : []
}

function getEntityKey(record, source, index) {
  if (record?.entityKey || record?.entity_key) return record.entityKey || record.entity_key
  const candidates = [
    ["session", record?.session_id],
    ["lead", record?.lead_id],
    ["family", record?.parent_id || record?.family_id],
    ["tutor", record?.tutor_id],
    ["payment", record?.payment_id],
    ["message", record?.message_id],
    ["request", record?.request_id],
  ]
  const match = candidates.find(([, value]) => String(value || "").trim())
  return match ? `${match[0]}:${match[1]}` : `${source}:${index}`
}

function deadlineValue(record) {
  return record?.deadline || record?.due_at || record?.start_at || record?.created_at || ""
}

function isWithinTwoHours(record, now) {
  const start = new Date(record?.start_at || "")
  if (Number.isNaN(start.getTime())) return false
  const delta = start.getTime() - now.getTime()
  return delta >= 0 && delta <= 2 * 60 * 60 * 1000
}

export function buildOperatorPriorityQueue(dashboard = {}, now = new Date()) {
  const source = dashboard && typeof dashboard === "object" ? dashboard : {}
  const today = source.today && typeof source.today === "object" ? source.today : {}
  const queues = source.work_queues && typeof source.work_queues === "object" ? source.work_queues : {}
  const items = new Map()
  let sequence = 0

  function add(priority, record, sourceKey) {
    if (!record || typeof record !== "object") return
    const entityKey = getEntityKey(record, sourceKey, sequence)
    const item = {
      ...record,
      entityKey,
      priority,
      priorityLabel: PRIORITY_LABELS[priority],
      reason: record.reason || record.detail || record.title || sourceKey,
      deadline: deadlineValue(record),
      _sequence: sequence,
    }
    sequence += 1
    const existing = items.get(entityKey)
    if (!existing || item.priority < existing.priority || (item.priority === existing.priority && item._sequence < existing._sequence)) {
      items.set(entityKey, item)
    }
  }

  asArray(today.sessions_today).forEach((record) => add(isWithinTwoHours(record, now) ? 0 : 2, record, "sessions_today"))
  asArray(today.confirmations).forEach((record) => add(2, record, "confirmations"))
  asArray(today.calls).forEach((record) => add(1, record, "callbacks"))
  asArray(today.reminders).forEach((record) => add(3, record, "reminders"))

  asArray(queues.callbacks).forEach((record) => add(1, record, "callbacks"))
  asArray(queues.matching).forEach((record) => add(1, record, "matching"))
  asArray(queues.confirmations).forEach((record) => add(2, record, "confirmations"))
  asArray(queues.calendar).forEach((record) => add(2, record, "calendar"))
  asArray(queues.notes).forEach((record) => add(3, record, "notes"))
  asArray(queues.messages).forEach((record) => add(3, record, "messages"))
  asArray(queues.payments).forEach((record) => add(4, record, "payments"))

  return [...items.values()]
    .sort((left, right) => {
      if (left.priority !== right.priority) return left.priority - right.priority
      const leftTime = new Date(left.deadline || "").getTime()
      const rightTime = new Date(right.deadline || "").getTime()
      const leftComparable = Number.isNaN(leftTime) ? Number.MAX_SAFE_INTEGER : leftTime
      const rightComparable = Number.isNaN(rightTime) ? Number.MAX_SAFE_INTEGER : rightTime
      return leftComparable - rightComparable || left._sequence - right._sequence
    })
    .map(({ _sequence, ...item }) => item)
}

function searchCollection(records, query, fields) {
  const normalizedQuery = normalizeSearch(query)
  if (!normalizedQuery) return asArray(records)
  return asArray(records).filter((record) => {
    const haystack = fields
      .flatMap((field) => Array.isArray(record?.[field]) ? record[field] : [record?.[field]])
      .map(normalizeSearch)
      .filter(Boolean)
      .join(" ")
    return haystack.includes(normalizedQuery)
  })
}

export function searchOperatorFamilies(families = [], query = "") {
  return searchCollection(families, query, ["parent_name", "student_name", "email", "phone"])
}

export function searchOperatorTutors(tutors = [], query = "") {
  return searchCollection(tutors, query, ["name", "tutor_name", "subjects", "subject", "levels", "level", "email", "zone", "location"])
}
