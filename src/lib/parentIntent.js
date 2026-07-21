const PARENT_INTENT_KEY = "methode:parent-intent"

export const parentIntents = {
  exam: "exam",
  homework: "homework",
  ongoing: "ongoing",
}

function getSessionStorage() {
  if (typeof window === "undefined") {
    return null
  }

  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function rememberParentIntent(intent) {
  if (!Object.values(parentIntents).includes(intent)) {
    return
  }

  const storage = getSessionStorage()
  if (!storage) {
    return
  }

  try {
    storage.setItem(PARENT_INTENT_KEY, intent)
  } catch {
    // Browser storage can be disabled in private or restricted contexts.
  }
}

export function getRememberedParentIntent() {
  const storage = getSessionStorage()
  if (!storage) {
    return ""
  }

  try {
    const intent = storage.getItem(PARENT_INTENT_KEY) || ""
    return Object.values(parentIntents).includes(intent) ? intent : ""
  } catch {
    return ""
  }
}

export function clearRememberedParentIntent() {
  const storage = getSessionStorage()
  if (!storage) {
    return
  }

  try {
    storage.removeItem(PARENT_INTENT_KEY)
  } catch {
    // A successful submission must not depend on browser storage access.
  }
}
