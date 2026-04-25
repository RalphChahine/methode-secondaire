import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { BOOKING_URL } from "@/config/booking"
import {
  hasTracking,
  initTracking,
  trackBookingClick,
  trackCallClick,
  trackDiagnosticComplete,
  trackLeadSubmission,
  trackPageView,
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

      if (absoluteHref.startsWith(BOOKING_URL)) {
        trackBookingClick({ source: "booking-link", path: window.location.pathname })
      }
    }

    function handleLeadSubmit(event) {
      trackLeadSubmission(event.detail || {})
    }

    function handleDiagnosticComplete(event) {
      trackDiagnosticComplete(event.detail || {})
    }

    document.addEventListener("click", handleDocumentClick, true)
    window.addEventListener("methode:lead-submit", handleLeadSubmit)
    window.addEventListener("methode:diagnostic-complete", handleDiagnosticComplete)

    return () => {
      document.removeEventListener("click", handleDocumentClick, true)
      window.removeEventListener("methode:lead-submit", handleLeadSubmit)
      window.removeEventListener("methode:diagnostic-complete", handleDiagnosticComplete)
    }
  }, [])

  return null
}
