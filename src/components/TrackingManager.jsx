import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { BOOKING_URL, BOOKING_URL_EN } from "@/config/booking"
import {
  hasTracking,
  initTracking,
  trackBookingClick,
  trackCallClick,
  trackDiagnosticComplete,
  trackDiagnosticProgress,
  trackDiagnosticResultCta,
  trackDiagnosticStarted,
  trackFirstSessionRequestCreated,
  trackLeadSubmission,
  trackPlanEnrollmentCreated,
  trackPageView,
  trackSessionConfirmed,
  trackSessionRequestCreated,
} from "@/lib/tracking"

function getAnchorFromEvent(event) {
  if (!event.target || typeof event.target.closest !== "function") {
    return null
  }

  return event.target.closest("a[href]")
}

export default function TrackingManager() {
  const location = useLocation()

  useEffect(() => {
    initTracking()
  }, [])

  useEffect(() => {
    if (!hasTracking()) {
      return
    }

    trackPageView(location.pathname, location.search)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!hasTracking()) {
      return undefined
    }

    function handleDocumentClick(event) {
      const anchor = getAnchorFromEvent(event)

      if (!anchor) {
        return
      }

      const rawHref = anchor.getAttribute("href") || ""
      const absoluteHref = anchor.href || rawHref

      if (rawHref.startsWith("tel:")) {
        trackCallClick({ path: window.location.pathname })
        return
      }

      const destination = new URL(absoluteHref, window.location.origin)
      const isBookingLink = [BOOKING_URL, BOOKING_URL_EN].some(
        (bookingUrl) => destination.pathname === new URL(bookingUrl, window.location.origin).pathname,
      )

      if (isBookingLink) {
        trackBookingClick({
          source: "booking-link",
          path: window.location.pathname,
          offer: destination.searchParams.get("offer") || "targeted_session",
        })
      }
    }

    function handleLeadSubmit(event) {
      trackLeadSubmission(event.detail || {})
    }

    function handleFirstSessionRequestCreated(event) {
      trackFirstSessionRequestCreated(event.detail || {})
    }

    function handleDiagnosticComplete(event) {
      trackDiagnosticComplete(event.detail || {})
    }

    function handleDiagnosticStarted(event) {
      trackDiagnosticStarted(event.detail || {})
    }

    function handleDiagnosticProgress(event) {
      trackDiagnosticProgress(event.detail || {})
    }

    function handleDiagnosticResultCta(event) {
      trackDiagnosticResultCta(event.detail || {})
    }

    function handleSessionRequestCreated(event) {
      trackSessionRequestCreated(event.detail || {})
    }

    function handleSessionConfirmed(event) {
      trackSessionConfirmed(event.detail || {})
    }

    function handlePlanEnrollmentCreated(event) {
      trackPlanEnrollmentCreated(event.detail || {})
    }

    document.addEventListener("click", handleDocumentClick, true)
    window.addEventListener("methode:lead-submit", handleLeadSubmit)
    window.addEventListener("methode:first-session-request-created", handleFirstSessionRequestCreated)
    window.addEventListener("methode:diagnostic-complete", handleDiagnosticComplete)
    window.addEventListener("methode:diagnostic-start", handleDiagnosticStarted)
    window.addEventListener("methode:diagnostic-progress", handleDiagnosticProgress)
    window.addEventListener("methode:diagnostic-result-cta", handleDiagnosticResultCta)
    window.addEventListener("methode:session-request-created", handleSessionRequestCreated)
    window.addEventListener("methode:session-confirmed", handleSessionConfirmed)
    window.addEventListener("methode:plan-enrollment-created", handlePlanEnrollmentCreated)

    return () => {
      document.removeEventListener("click", handleDocumentClick, true)
      window.removeEventListener("methode:lead-submit", handleLeadSubmit)
      window.removeEventListener("methode:first-session-request-created", handleFirstSessionRequestCreated)
      window.removeEventListener("methode:diagnostic-complete", handleDiagnosticComplete)
      window.removeEventListener("methode:diagnostic-start", handleDiagnosticStarted)
      window.removeEventListener("methode:diagnostic-progress", handleDiagnosticProgress)
      window.removeEventListener("methode:diagnostic-result-cta", handleDiagnosticResultCta)
      window.removeEventListener("methode:session-request-created", handleSessionRequestCreated)
      window.removeEventListener("methode:session-confirmed", handleSessionConfirmed)
      window.removeEventListener("methode:plan-enrollment-created", handlePlanEnrollmentCreated)
    }
  }, [])

  return null
}
