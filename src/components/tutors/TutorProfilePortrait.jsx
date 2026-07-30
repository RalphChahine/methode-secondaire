import { useState } from "react"

import { getTutorPhotoUrl, tutorInitials } from "@/lib/tutorPublicProfiles"

const fallbackLabelByLocale = {
  fr: "Avatar temporaire du tuteur",
  en: "Tutor placeholder avatar",
}

export default function TutorProfilePortrait({ profile, locale = "fr", fallbackLabel, className = "" }) {
  const [hasImageError, setHasImageError] = useState(false)
  const photoUrl = getTutorPhotoUrl(profile)
  const alt = profile?.[`photo_alt_${locale}`]?.trim() || profile?.display_name?.trim() || fallbackLabelByLocale[locale]

  if (photoUrl && !hasImageError) {
    return (
      <img
        src={photoUrl}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        onError={() => setHasImageError(true)}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={fallbackLabel || fallbackLabelByLocale[locale] || fallbackLabelByLocale.fr}
      className={`grid h-full w-full place-items-center bg-[#dce9ff] font-display text-lg font-semibold text-[#15315a] ${className}`}
    >
      {tutorInitials(profile)}
    </div>
  )
}
