export function getParentJourney(locale = "fr") {
  const isEnglish = locale === "en"

  return {
    eyebrow: isEnglish ? "Same simple start" : "Même premier pas",
    text: isEnglish
      ? "Describe the need, we call back, then we launch the right match."
      : "Décrivez le besoin, on vous rappelle, puis on lance le bon jumelage.",
    action: null,
  }
}
