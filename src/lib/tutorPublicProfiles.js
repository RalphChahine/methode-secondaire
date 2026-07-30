function records(value) {
  return Array.isArray(value) ? value : []
}

function text(value) {
  return typeof value === "string" ? value.trim() : ""
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
