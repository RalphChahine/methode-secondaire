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
    lead_timeline: detail.timeline || "",
    lead_format: detail.format || "",
    lead_contact_preference: detail.contact_preference || "",
    lead_parent_intent: detail.parent_intent || "",
    value: 1,
    currency: "CAD",
  })

  trackAdsConversion(trackingConfig.googleAdsLeadLabel, {
    value: 1,
    currency: "CAD",
  })
}

// This is the public-funnel completion event. It deliberately carries no
// contact details or free-text message: those remain in the CRM only.
export function trackFirstSessionRequestCreated(detail = {}) {
  trackEvent("first_session_request_created", {
    event_category: "lead",
    request_source: detail.source || "public-request",
    request_locale: detail.locale || "",
    request_priority: detail.priority || "",
    request_timeline: detail.timeline || "",
    requested_offer: detail.offer || "targeted_session",
  })
}

export function trackBookingClick(detail = {}) {
  trackEvent("book_appointment", {
    event_category: "booking",
    booking_source: detail.source || "site-link",
    booking_path: detail.path || "",
    booking_offer: detail.offer || "",
    value: 1,
    currency: "CAD",
  })

  trackAdsConversion(trackingConfig.googleAdsBookingLabel, {
    value: 1,
    currency: "CAD",
  })
}

export function trackSessionRequestCreated(detail = {}) {
  trackEvent("session_request_created", {
    event_category: "booking",
    request_source: detail.source || "portal",
    request_locale: detail.locale || "",
    request_status: detail.status || "created",
  })
}

export function trackSessionConfirmed(detail = {}) {
  trackEvent("session_confirmed", {
    event_category: "booking",
    booking_source: detail.source || "portal",
    booking_locale: detail.locale || "",
    session_type: detail.session_type || "",
    payment_mode: detail.payment_mode || "",
  })
}

export function trackPlanEnrollmentCreated(detail = {}) {
  trackEvent("plan_enrollment_created", {
    event_category: "plan",
    enrollment_source: detail.source || "portal",
    enrollment_locale: detail.locale || "",
    plan_type: detail.plan_type || "",
    plan_cadence: detail.cadence || "",
    enrollment_status: detail.status || "",
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

export function trackDiagnosticComplete(detail = {}) {
  trackEvent("qualify_lead", {
    event_category: "diagnostic",
    diagnostic_locale: detail.locale || "",
    diagnostic_level: detail.level || "",
    diagnostic_subject: detail.subject || "",
    diagnostic_goal: detail.goal || "",
    diagnostic_timing: detail.timing || "",
    diagnostic_format: detail.format || "",
    diagnostic_recommendation: detail.recommended_action || "",
    diagnostic_service: detail.recommended_service || "",
    diagnostic_limited_mode: detail.limited_mode ? "true" : "false",
  })
}

export function trackDiagnosticStarted(detail = {}) {
  trackEvent("diagnostic_started", {
    event_category: "diagnostic",
    diagnostic_locale: detail.locale || "",
  })
}

export function trackDiagnosticProgress(detail = {}) {
  trackEvent("diagnostic_progress", {
    event_category: "diagnostic",
    diagnostic_locale: detail.locale || "",
    diagnostic_step: detail.step || 0,
    diagnostic_next_step: detail.next_step || 0,
    diagnostic_field: detail.field || "",
  })
}

export function trackDiagnosticResultCta(detail = {}) {
  trackEvent("diagnostic_result_cta", {
    event_category: "diagnostic",
    diagnostic_locale: detail.locale || "",
    diagnostic_result_action: detail.action || "",
  })
}
