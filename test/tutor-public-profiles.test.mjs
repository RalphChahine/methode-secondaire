import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { renderToStaticMarkup } from "react-dom/server"
import { createServer } from "vite"

import { findTutorPublicProfile, getTutorPhotoUrl } from "../src/lib/tutorPublicProfiles.js"

const david = {
  tutor_id: "TUTOR-DAVID",
  display_name: "David",
  photo_url: "https://cdn.example.test/david.jpg",
  photo_alt_fr: "Portrait de David",
  headline_fr: "Mathématiques et sciences",
  bio_fr: "David aide les élèves à raisonner étape par étape.",
  teaching_style_fr: "Structuré et calme",
  subjects: "Mathématiques, Sciences",
  levels: "Secondaire 4, Secondaire 5",
  languages: "fr",
  formats: "online",
  zones: "Québec",
}

test("keeps profile lookup and portrait URLs safe", () => {
  assert.equal(findTutorPublicProfile([david], "TUTOR-DAVID"), david)
  assert.equal(findTutorPublicProfile([david], "TUTOR-OTHER"), null)
  assert.equal(getTutorPhotoUrl(david), "https://cdn.example.test/david.jpg")
  assert.equal(getTutorPhotoUrl({ ...david, photo_url: "javascript:alert(1)" }), "")
})

test("renders public details, a truthful fallback, and no direct booking", async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" })

  try {
    const { default: TutorProfileCard } = await vite.ssrLoadModule("/src/components/tutors/TutorProfileCard.jsx")
    const { default: TutorProfileRoster } = await vite.ssrLoadModule("/src/components/tutors/TutorProfileRoster.jsx")
    const card = renderToStaticMarkup(TutorProfileCard({ profile: david, locale: "fr", variant: "public" }))
    const compact = renderToStaticMarkup(TutorProfileCard({ profile: david, locale: "fr", variant: "compact" }))
    const empty = renderToStaticMarkup(TutorProfileRoster({
      copy: {
        emptyTitle: "Les profils arrivent bientôt",
        emptyText: "L'équipe confirme toujours le jumelage.",
        details: "Voir le profil",
      },
      profiles: [],
      status: "ready",
    }))

    assert.match(card, /David/)
    assert.match(card, /Mathématiques et sciences/)
    assert.match(card, /Voir le profil/)
    assert.doesNotMatch(card, /Réserver|Book/)
    assert.match(compact, /David/)
    assert.match(compact, /Mathématiques, Sciences/)
    assert.doesNotMatch(compact, /calendar_email|hourly_rate_cad/)
    assert.match(empty, /Les profils arrivent bientôt/)
  } finally {
    await vite.close()
  }
})

test("public tutor page loads CRM profiles without turning profiles into booking controls", async () => {
  const source = await readFile(new URL("../src/pages/Tuteurs.jsx", import.meta.url), "utf8")
  const recruitment = await readFile(new URL("../src/pages/DevenirTuteur.jsx", import.meta.url), "utf8")

  assert.match(source, /getPublicTutorProfiles/)
  assert.match(source, /TutorProfileRoster/)
  assert.match(source, /status=\{profileStatus\}/)
  assert.doesNotMatch(source, /bookPortalSession|BookableSlotCalendar/)
  assert.match(recruitment, /profil public facultatif|optional public profile/i)
  assert.match(recruitment, /consentement|consent/i)
})
