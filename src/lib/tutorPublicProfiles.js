import { getLocalizedPath } from "./i18n.js"

function records(value) {
  return Array.isArray(value) ? value : []
}

function text(value) {
  return typeof value === "string" ? value.trim() : ""
}

export function getTutorProfileFallback(locale = "fr") {
  const english = locale === "en"
  return {
    title: english ? "Profiles are reviewed for the need first" : "Les profils sont d'abord choisis selon le besoin",
    description: english
      ? "We confirm the subject, level and availability, then propose a tutor profile after reviewing the family's request."
      : "Nous confirmons la matière, le niveau et les disponibilités, puis nous proposons un profil après avoir lu la demande de la famille.",
    requestLabel: english ? "Tell us what would help" : "Parler du besoin",
    requestPath: getLocalizedPath("request", locale),
  }
}

export function findTutorPublicProfile(profiles, tutorId) {
  const id = text(tutorId)
  return id ? records(profiles).find((profile) => text(profile?.tutor_id) === id) || null : null
}

export function getTutorPhotoUrl(profile) {
  const url = text(profile?.photo_url)
  return /^https:\/\/[^\s]+$/i.test(url) ? url : ""
}

export function tutorInitials(profile) {
  return text(profile?.display_name)
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "MS"
}
