function cleanEnvValue(value = "") {
  return String(value || "").trim()
}

export const trackingConfig = {
  googleTagId: cleanEnvValue(import.meta.env.VITE_GOOGLE_TAG_ID),
  gaMeasurementId: cleanEnvValue(import.meta.env.VITE_GA_MEASUREMENT_ID),
  googleAdsId: cleanEnvValue(import.meta.env.VITE_GOOGLE_ADS_ID),
  googleAdsLeadLabel: cleanEnvValue(import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL),
  googleAdsBookingLabel: cleanEnvValue(import.meta.env.VITE_GOOGLE_ADS_BOOKING_LABEL),
  googleAdsCallLabel: cleanEnvValue(import.meta.env.VITE_GOOGLE_ADS_CALL_LABEL),
}

export const configuredTagIds = Array.from(
  new Set(
    [
      trackingConfig.googleTagId,
      trackingConfig.gaMeasurementId,
      trackingConfig.googleAdsId,
    ].filter(Boolean),
  ),
)

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

function hasGtag() {
  return isBrowser() && typeof window.gtag === "function"
}

function pushToDataLayer(...args) {
  if (!isBrowser()) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

function ensureGtag() {
  if (!isBrowser() || hasGtag()) {
    return
  }

  window.gtag = function gtag() {
    pushToDataLayer(...arguments)
  }
}

export function hasTracking() {
  return configuredTagIds.length > 0
}

export function initTracking() {
  if (!isBrowser() || !hasTracking() || window.__methodeTrackingInitialized) {
    return
  }

  ensureGtag()

  const primaryTagId = configuredTagIds[0]
  const scriptId = "methode-google-tag"

  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script")
    script.id = scriptId
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryTagId)}`
    document.head.appendChild(script)
  }

  window.gtag("js", new Date())
  configuredTagIds.forEach((tagId) => {
    window.gtag("config", tagId, { send_page_view: false })
  })

  window.__methodeTrackingInitialized = true
}

export function trackEvent(name, params = {}) {
  if (!hasGtag()) {
    return
  }

  window.gtag("event", name, params)
}

export function trackPageView(pathname = "/", search = "") {
  if (!hasGtag()) {
    return
  }

  const pagePath = `${pathname}${search || ""}`
  trackEvent("page_view", {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
    page_title: document.title,
  })
}

function trackAdsConversion(label, extra = {}) {
  if (!label || !trackingConfig.googleAdsId || !hasGtag()) {
    return
  }

  window.gtag("event", "conversion", {
    send_to: `${trackingConfig.googleAdsId}/${label}`,
    ...extra,
  })
}

export function trackLeadSubmission(detail = {}) {
  trackEvent("generate_lead", {
    event_category: "lead",
    lead_source: detail.source_page || "website",
    lead_locale: detail.locale || "",
    lead_priority: detail.priority || "",
    lead_format: detail.format || "",
    value: 1,
    currency: "CAD",
  })

  trackAdsConversion(trackingConfig.googleAdsLeadLabel, {
    value: 1,
    currency: "CAD",
  })
}

export function trackBookingClick(detail = {}) {
  trackEvent("book_appointment", {
    event_category: "booking",
    booking_source: detail.source || "site-link",
    booking_path: detail.path || "",
    value: 1,
    currency: "CAD",
  })

  trackAdsConversion(trackingConfig.googleAdsBookingLabel, {
    value: 1,
    currency: "CAD",
  })
}

export function trackCallClick(detail = {}) {
  trackEvent("contact", {
    event_category: "phone",
    contact_method: "phone",
    contact_path: detail.path || "",
  })

  trackAdsConversion(trackingConfig.googleAdsCallLabel, {
    value: 1,
    currency: "CAD",
  })
}
