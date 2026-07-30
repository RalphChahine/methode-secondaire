# Profils publics des tuteurs et recrutement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Offrir des profils de tuteurs bilingues et sûrs, administrés depuis le CRM, visibles dans la vitrine puis uniquement aux familles déjà jumelées, tout en rendant le recrutement transparent.

**Architecture:** Une feuille `Tutor Public Profiles` est séparée du roster interne et liée par `tutor_id`. Apps Script contrôle la publication, retourne une collection publique assainie et joint seulement les profils autorisés au tableau parent. Des composants React réutilisables affichent cartes, portraits de repli, vitrine et résumé parent; le calendrier et le jumelage existants ne changent pas.

**Tech Stack:** React 18, Vite 7, React Router, Node `node:test`, Vercel API proxy, Google Apps Script et Google Sheets.

## Global Constraints

- Le parent ne sélectionne jamais librement un tuteur ou un créneau dans la vitrine; le jumelage reste une décision d'équipe.
- Les coordonnées, calendriers, tarifs, capacités, notes et identifiants internes ne quittent jamais le `Tutor Roster`.
- Seul un tuteur `active` avec consentement de publication et contenu complet FR/EN peut devenir `published`.
- Une photo est facultative : en son absence ou après une erreur de chargement, montrer un avatar temporaire explicite, jamais un faux portrait.
- Le formulaire `Devenir tuteur` ne crée jamais automatiquement de profil public et ne demande aucune photo.
- Ne pas modifier les attributions tuteur–matières, le verrou des disponibilités, les crédits, les paiements ou les règles de réservation.
- Ajouter tous les textes parent/opérateur en français et en anglais, sans dépendance supplémentaire.
- Préserver les modifications locales préexistantes à la fonctionnalité : `ops/paperclip/state/urgent-alert-state.md`, `package-lock.json` et `.superpowers/`.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `src/lib/tutorPublicProfiles.js` | Recherche de profil et validation d'URL de photo côté affichage. |
| `src/components/tutors/TutorProfilePortrait.jsx` | Photo sécurisée ou avatar temporaire accessible. |
| `src/components/tutors/TutorProfileCard.jsx` | Carte publique détaillée et variante compacte parent. |
| `src/components/tutors/TutorProfileRoster.jsx` | Grille, panneau de détails, chargement et repli de vitrine. |
| `src/pages/Tuteurs.jsx` | Charge les profils publiés sans rendre de réservation directe. |
| `src/pages/DevenirTuteur.jsx` | Ajoute le quatrième jalon de profil public facultatif. |
| `src/lib/portalClient.js` | Appels de lecture publique et de mutation opérateur. |
| `src/pages/Portal.jsx` | Éditeur opérateur et présentation du tuteur déjà attribué. |
| `api/portal.js`, `vite.config.js` | Parité de proxy pour les deux nouvelles actions. |
| `ops/crm/google-apps-script/Code.gs` | Schéma, validation, assainissement et filtrage des profils. |
| `test/tutor-public-profiles.test.mjs` | Comportement pur et rendu accessible. |
| `test/parent-portal.test.mjs`, `test/portal-api.test.mjs` | Contrats CRM, cloisonnement parent et actions proxy. |
| `scripts/check-static-site.mjs`, `package.json` | Vérification statique et entrée de test complète. |

## Task 1: Build safe tutor-profile presentation primitives

**Files:**
- Create: `src/lib/tutorPublicProfiles.js`
- Create: `src/components/tutors/TutorProfilePortrait.jsx`
- Create: `src/components/tutors/TutorProfileCard.jsx`
- Create: `src/components/tutors/TutorProfileRoster.jsx`
- Create: `test/tutor-public-profiles.test.mjs`

**Interfaces:**
- `findTutorPublicProfile(profiles, tutorId)` returns one profile or `null`.
- `getTutorPhotoUrl(profile)` returns an HTTPS URL or `""`.
- `TutorProfileCard({ profile, locale, variant })` accepts `"public"` and `"compact"`; it renders no booking control.
- `TutorProfileRoster({ copy, profiles, status })` accepts `"loading"`, `"ready"`, and `"error"`.

- [ ] **Step 1: Write the failing helper and SSR tests**

Create `test/tutor-public-profiles.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { renderToStaticMarkup } from "react-dom/server"
import { createServer } from "vite"
import { findTutorPublicProfile, getTutorPhotoUrl } from "../src/lib/tutorPublicProfiles.js"

const david = {
  tutor_id: "TUTOR-DAVID", display_name: "David", photo_url: "https://cdn.example.test/david.jpg",
  photo_alt_fr: "Portrait de David", headline_fr: "Mathématiques et sciences",
  bio_fr: "David aide les élèves à raisonner étape par étape.", teaching_style_fr: "Structuré et calme",
  subjects: "Mathématiques, Sciences", levels: "Secondaire 4, Secondaire 5", languages: "fr", formats: "online", zones: "Québec",
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
    const empty = renderToStaticMarkup(TutorProfileRoster({
      copy: { emptyTitle: "Les profils arrivent bientôt", emptyText: "L'équipe confirme toujours le jumelage.", details: "Voir le profil" },
      profiles: [], status: "ready",
    }))
    assert.match(card, /David/)
    assert.match(card, /Mathématiques et sciences/)
    assert.match(card, /Voir le profil/)
    assert.doesNotMatch(card, /Réserver|Book/)
    assert.match(empty, /Les profils arrivent bientôt/)
  } finally { await vite.close() }
})
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test test/tutor-public-profiles.test.mjs`

Expected: FAIL because the helper and components do not exist.

- [ ] **Step 3: Implement the minimal helper and components**

Create `src/lib/tutorPublicProfiles.js`:

```js
function records(value) { return Array.isArray(value) ? value : [] }
function text(value) { return typeof value === "string" ? value.trim() : "" }

export function findTutorPublicProfile(profiles, tutorId) {
  const id = text(tutorId)
  return id ? records(profiles).find((profile) => text(profile?.tutor_id) === id) || null : null
}

export function getTutorPhotoUrl(profile) {
  const url = text(profile?.photo_url)
  return /^https:\/\/[^\s]+$/i.test(url) ? url : ""
}

export function tutorInitials(profile) {
  return text(profile?.display_name).split(/\s+/).filter(Boolean).map((word) => word[0]).join("").slice(0, 2).toUpperCase() || "MS"
}
```

In `TutorProfilePortrait.jsx`, use local error state and render `<img>` only for `getTutorPhotoUrl(profile)` until `onError` fires. Otherwise render initials with the localized `portraitFallback` label. In `TutorProfileCard.jsx`, use a `details/summary` disclosure for the public variant and simple noninteractive rows for the compact variant. In `TutorProfileRoster.jsx`, use the supplied `copy` for all loading, empty and error states; never substitute the old generic profiles.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --test test/tutor-public-profiles.test.mjs`

Expected: PASS with 2 tests.

- [ ] **Step 5: Commit the presentation primitives**

```powershell
git add src/lib/tutorPublicProfiles.js src/components/tutors/TutorProfilePortrait.jsx src/components/tutors/TutorProfileCard.jsx src/components/tutors/TutorProfileRoster.jsx test/tutor-public-profiles.test.mjs
git commit -m "feat: add safe tutor profile cards"
```

## Task 2: Add CRM profile authority and parent scoping

**Files:**
- Modify: `ops/crm/google-apps-script/Code.gs`
- Modify: `test/parent-portal.test.mjs`

**Interfaces:**
- Creates `Tutor Public Profiles`, one profile per `tutor_id`.
- `portal_get_public_tutor_profiles` has no portal token and returns only safe published profiles.
- `portal_upsert_tutor_public_profile` requires `operator` access.
- Parent dashboard receives `assigned_tutor_profiles`; operator dashboard receives `tutor_public_profiles` including drafts/hidden records.

- [ ] **Step 1: Write the failing CRM contract test**

Append to `test/parent-portal.test.mjs`:

```js
test("CRM publishes only consented active tutor profiles and scopes them to assigned parents", async () => {
  const source = await readFile(new URL("../ops/crm/google-apps-script/Code.gs", import.meta.url), "utf8")
  const parentDashboard = source.slice(source.indexOf("function buildParentPortalDashboard_("), source.indexOf("function buildTutorPortalDashboard_("))
  const publicSanitizer = source.slice(source.indexOf("function sanitizeTutorPublicProfileForPublic_("), source.indexOf("function sanitizeTutorPublicProfileForOperator_("))
  assert.match(source, /const CRM_TUTOR_PUBLIC_PROFILE_SHEET_NAME = "Tutor Public Profiles"/)
  assert.match(source, /const TUTOR_PUBLIC_PROFILE_COLUMNS = \[/)
  assert.match(source, /function getPublicTutorProfiles_\(/)
  assert.match(source, /function upsertPortalTutorPublicProfile_\(/)
  assert.match(source, /publication_consent_at/)
  assert.match(parentDashboard, /assigned_tutor_profiles:/)
  assert.match(parentDashboard, /eligibleTutorIds/)
  assert.doesNotMatch(publicSanitizer, /calendar_email|hourly_rate_cad|payment_terms|notes/)
})
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test test/parent-portal.test.mjs`

Expected: FAIL because the public-profile schema and sanitizers are absent.

- [ ] **Step 3: Implement the schema, sanitizers, actions, and dashboard scope**

Near `CRM_TUTOR_SHEET_NAME`, add:

```js
const CRM_TUTOR_PUBLIC_PROFILE_SHEET_NAME = "Tutor Public Profiles";
const TUTOR_PUBLIC_PROFILE_COLUMNS = [
  "profile_id", "tutor_id", "slug", "display_name", "photo_url", "photo_alt_fr", "photo_alt_en",
  "headline_fr", "headline_en", "bio_fr", "bio_en", "teaching_style_fr", "teaching_style_en",
  "subjects", "levels", "languages", "formats", "zones", "visibility", "publication_consent_at",
  "published_at", "created_at", "updated_at",
];
const TUTOR_PUBLIC_PROFILE_VISIBILITY_OPTIONS = ["draft", "published", "hidden"];
```

Add the sheet to `CRM_REQUIRED_SHEET_NAMES`; initialize it in `setupCrm()`; and add:

```js
function setupTutorPublicProfilesSheet_(sheet) {
  setupStructuredSheet_(sheet, TUTOR_PUBLIC_PROFILE_COLUMNS, "#1f4662");
  applyStructuredValidation_(sheet, TUTOR_PUBLIC_PROFILE_COLUMNS, "visibility", TUTOR_PUBLIC_PROFILE_VISIBILITY_OPTIONS);
}
```

Implement these public-only helpers beside the tutor helpers:

```js
function normalizeTutorPublicPhotoUrl_(value) {
  const url = normalizeValue_(value).slice(0, 2000);
  return !url || /^https:\/\/[^\s]+$/i.test(url) ? url : "";
}

function sanitizeTutorPublicProfileForPublic_(record) {
  return {
    tutor_id: normalizeValue_(record.tutor_id), slug: normalizeValue_(record.slug), display_name: normalizeValue_(record.display_name),
    photo_url: normalizeTutorPublicPhotoUrl_(record.photo_url), photo_alt_fr: normalizeValue_(record.photo_alt_fr), photo_alt_en: normalizeValue_(record.photo_alt_en),
    headline_fr: normalizeValue_(record.headline_fr), headline_en: normalizeValue_(record.headline_en), bio_fr: normalizeValue_(record.bio_fr), bio_en: normalizeValue_(record.bio_en),
    teaching_style_fr: normalizeValue_(record.teaching_style_fr), teaching_style_en: normalizeValue_(record.teaching_style_en),
    subjects: normalizeValue_(record.subjects), levels: normalizeValue_(record.levels), languages: normalizeValue_(record.languages), formats: normalizeValue_(record.formats), zones: normalizeValue_(record.zones),
  };
}

function hasCompleteTutorPublicProfileContent_(record) {
  return ["display_name", "headline_fr", "headline_en", "bio_fr", "bio_en", "teaching_style_fr", "teaching_style_en", "subjects", "levels"]
    .every((field) => Boolean(normalizeValue_(record[field])));
}

function getPublishedTutorPublicProfiles_(spreadsheet, allowedTutorIds) {
  const allowed = allowedTutorIds ? new Set([...allowedTutorIds].map(normalizeValue_).filter(Boolean)) : null;
  return getSheetRecords_(spreadsheet, CRM_TUTOR_PUBLIC_PROFILE_SHEET_NAME, TUTOR_PUBLIC_PROFILE_COLUMNS)
    .filter((record) => normalizeValue_(record.visibility) === "published")
    .filter((record) => Boolean(normalizeValue_(record.publication_consent_at)))
    .filter(hasCompleteTutorPublicProfileContent_)
    .filter((record) => !allowed || allowed.has(normalizeValue_(record.tutor_id)))
    .filter((record) => Boolean(findActiveTutorById_(spreadsheet, record.tutor_id)))
    .map(sanitizeTutorPublicProfileForPublic_)
    .sort((left, right) => String(left.display_name).localeCompare(String(right.display_name)));
}

function getPublicTutorProfiles_(spreadsheet) {
  return { ok: true, tutor_profiles: getPublishedTutorPublicProfiles_(spreadsheet) };
}
```

Implement `sanitizeTutorPublicProfileForOperator_` from `TUTOR_PUBLIC_PROFILE_COLUMNS` only. Implement `createTutorPublicProfileSlug_(displayName, tutorId)` as `normalizeValue_(displayName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) + "-" + normalizeValue_(tutorId).toLowerCase()` and save it on every upsert. Implement `upsertPortalTutorPublicProfile_` to: verify `operator`; require an active tutor; permit only one profile per tutor; preserve `created_at`; reject another tutor's `profile_id` with `TUTOR_PUBLIC_PROFILE_NOT_AVAILABLE`; reject invalid non-empty photo URL with `TUTOR_PUBLIC_PROFILE_PHOTO_INVALID`; and reject `published` unless `payload.publication_consent === true` and `hasCompleteTutorPublicProfileContent_(nextRecord)` are both true, with `TUTOR_PUBLIC_PROFILE_PUBLICATION_REQUIRED`.

Add to `handlePortalAction_`:

```js
case "portal_get_public_tutor_profiles": return getPublicTutorProfiles_(spreadsheet);
case "portal_upsert_tutor_public_profile": return upsertPortalTutorPublicProfile_(spreadsheet, payload);
```

In `buildParentPortalDashboard_`, add `const assignedTutorProfiles = getPublishedTutorPublicProfiles_(spreadsheet, eligibleTutorIds);` immediately after `eligibleTutorIds`, and return `assigned_tutor_profiles: assignedTutorProfiles`. In `buildOperatorPortalDashboard_`, return `tutor_public_profiles` using the operator sanitizer.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --test test/parent-portal.test.mjs`

Expected: PASS, including safe-public-field and parent-scope contracts.

- [ ] **Step 5: Commit the CRM authority**

```powershell
git add ops/crm/google-apps-script/Code.gs test/parent-portal.test.mjs
git commit -m "feat: manage published tutor profiles in crm"
```

## Task 3: Expose the collection publicly and update the two marketing pages

**Files:**
- Modify: `api/portal.js`
- Modify: `vite.config.js`
- Modify: `src/lib/portalClient.js`
- Modify: `src/pages/Tuteurs.jsx`
- Modify: `src/pages/DevenirTuteur.jsx`
- Modify: `test/portal-api.test.mjs`
- Modify: `test/tutor-public-profiles.test.mjs`

**Interfaces:**
- `getPublicTutorProfiles()` sends `portal_get_public_tutor_profiles` without a portal session.
- `upsertPortalTutorPublicProfile({ token, values })` sends the operator mutation.
- `Tuteurs` supplies `loading`, `ready`, or `error` and CRM profiles to `TutorProfileRoster`.
- `DevenirTuteur` states the optional profile step without changing its Formspree fields.

- [ ] **Step 1: Write failing proxy and marketing-page tests**

Append to `test/portal-api.test.mjs`:

```js
test("allowlists safe public tutor profile reads and operator profile writes", () => {
  assert.equal(PORTAL_ACTIONS.has("portal_get_public_tutor_profiles"), true)
  assert.equal(PORTAL_ACTIONS.has("portal_upsert_tutor_public_profile"), true)
})
```

Append to `test/tutor-public-profiles.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `node --test test/portal-api.test.mjs test/tutor-public-profiles.test.mjs`

Expected: FAIL because proxy action parity and the public CRM fetch do not yet exist.

- [ ] **Step 3: Add the proxy actions, client wrappers, and page behavior**

Add these two lines to the `PORTAL_ACTIONS` sets in both `api/portal.js` and `vite.config.js`:

```js
"portal_get_public_tutor_profiles",
"portal_upsert_tutor_public_profile",
```

Add to `src/lib/portalClient.js` before `portalRequest`:

```js
export async function getPublicTutorProfiles() {
  return portalRequest({ action: "portal_get_public_tutor_profiles" })
}

export async function upsertPortalTutorPublicProfile({ token, values }) {
  return portalRequest({
    action: "portal_upsert_tutor_public_profile",
    token,
    ...values,
  })
}
```

In `src/pages/Tuteurs.jsx`, remove the `TutorRosterSection` import, add `useEffect`/`useState`, `getPublicTutorProfiles`, and `TutorProfileRoster`, then use this exact loading flow:

```jsx
const [profiles, setProfiles] = useState([])
const [profileStatus, setProfileStatus] = useState("loading")

useEffect(() => {
  let active = true
  getPublicTutorProfiles().then((result) => {
    if (!active) return
    setProfiles(result.ok && Array.isArray(result.tutor_profiles) ? result.tutor_profiles : [])
    setProfileStatus(result.ok ? "ready" : "error")
  })
  return () => { active = false }
}, [])
```

Add bilingual `profileRoster` content for `loadingTitle`, `loadingText`, `emptyTitle`, `emptyText`, `errorTitle`, `errorText`, `details`, `portraitFallback`, `subjects`, `levels`, and `style`. Render exactly one `<TutorProfileRoster copy={copy.profileRoster} profiles={profiles} status={profileStatus} />` between the hero and final CTA. The only actions remain request/call actions for a jumelage.

In `DevenirTuteur.jsx`, replace the recruitment journey copy with four steps. The fourth must read:

```js
{
  title: locale === "en" ? "Optional public profile" : "Profil public facultatif",
  description: locale === "en"
    ? "Only after roster approval and your explicit consent can the team prepare a public profile and portrait."
    : "Seulement après l'ajout au roster et votre consentement explicite, l'équipe peut préparer un profil et un portrait publics.",
}
```

Add the same rule to a FAQ answer. Do not add `photo_url`, a photo file input, or a publication-consent field to `TutorApplicationForm`.

- [ ] **Step 4: Run the focused tests to verify they pass**

Run: `node --test test/portal-api.test.mjs test/tutor-public-profiles.test.mjs`

Expected: PASS, including action parity, loading source, no direct booking source, and the explicit recruitment consent copy.

- [ ] **Step 5: Commit the public/recruitment experience**

```powershell
git add api/portal.js vite.config.js src/lib/portalClient.js src/pages/Tuteurs.jsx src/pages/DevenirTuteur.jsx test/portal-api.test.mjs test/tutor-public-profiles.test.mjs
git commit -m "feat: publish tutor profiles and clarify recruitment"
```

## Task 4: Add operator editing and matched-parent presentation

**Files:**
- Modify: `src/pages/Portal.jsx`
- Modify: `test/parent-portal.test.mjs`
- Modify: `test/tutor-public-profiles.test.mjs`

**Interfaces:**
- `TutorPublicProfileEditor({ copy, tutor, profile, token, onSaved })` is nested in the operator-only tutor management panel.
- `BookingPanel` maps `dashboard.assigned_tutor_profiles` to the selected assignment through `findTutorPublicProfile`.
- A missing/hidden profile does not disable booking and cannot cause a public-roster lookup.

- [ ] **Step 1: Write failing operator/parent UI-contract tests**

Append to `test/parent-portal.test.mjs`:

```js
test("operator edits public tutor profiles while parents see only an assigned tutor profile", async () => {
  const source = await readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
  const booking = source.slice(source.indexOf("function BookingPanel("), source.indexOf("function BookableSlotCalendar("))
  assert.match(source, /function TutorPublicProfileEditor\(/)
  assert.match(source, /upsertPortalTutorPublicProfile/)
  assert.match(source, /tutor_public_profiles/)
  assert.match(booking, /assigned_tutor_profiles/)
  assert.match(booking, /findTutorPublicProfile/)
  assert.match(booking, /TutorProfileCard/)
  assert.doesNotMatch(booking, /getPublicTutorProfiles/)
})
```

In the existing card SSR test, add:

```js
const compact = renderToStaticMarkup(TutorProfileCard({ profile: david, locale: "fr", variant: "compact" }))
assert.match(compact, /David/)
assert.match(compact, /Mathématiques, Sciences/)
assert.doesNotMatch(compact, /calendar_email|hourly_rate_cad/)
```

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `node --test test/parent-portal.test.mjs test/tutor-public-profiles.test.mjs`

Expected: FAIL because the portal has no profile editor and receives no profile card data.

- [ ] **Step 3: Implement the operator editor and parent card**

In `Portal.jsx`, import `TutorProfileCard`, `findTutorPublicProfile`, and `upsertPortalTutorPublicProfile`. Add FR/EN copy for public profile title, intro, visibility, consent, save-success, photo URL/alt text, FR/EN title/bio/style fields, and these exact messages:

```js
tutorPublicProfileTitle: "Profil public du tuteur",
tutorPublicProfileIntro: "Visible seulement après validation de l'équipe et consentement du tuteur.",
tutorPublicProfileConsent: "Le tuteur a consenti à la publication de ce profil et de sa photo.",
tutorPublicProfilePublicationRequired: "Pour publier, ajoutez le contenu français et anglais requis et confirmez le consentement.",
```

Add the English equivalents and map `TUTOR_PUBLIC_PROFILE_NOT_AVAILABLE`, `TUTOR_PUBLIC_PROFILE_PHOTO_INVALID`, and `TUTOR_PUBLIC_PROFILE_PUBLICATION_REQUIRED` in `getPortalErrorMessage`.

Create `TutorPublicProfileEditor` immediately before `TutorAccessPanel`. Its edit state starts from the selected profile or a draft populated from safe roster fields (`subjects`, `levels`, `languages`, `formats`, `zones`). The form exposes display name, HTTPS photo URL, both alt texts, both headlines, both bios, both teaching styles, visibility, and the consent checkbox. On submit, send:

```js
upsertPortalTutorPublicProfile({ token, values: { ...values, tutor_id: tutor.tutor_id } })
```

Pass `safeDashboard.tutor_public_profiles || []` from `OperatorDashboard` into `TutorAccessPanel`; select the current profile by `tutor_id`; render the editor only below the selected operator tutor. Do not render calendar email, rate, capacity or notes inside this editor or its preview.

In `BookingPanel`, after deriving `selectedAssignment`, add:

```js
const selectedTutorProfile = findTutorPublicProfile(
  dashboard.assigned_tutor_profiles,
  selectedAssignment?.tutor_id,
)
```

Immediately after the existing selected tutor-and-subjects summary, render `<TutorProfileCard profile={selectedTutorProfile} locale={locale} variant="compact" />` only when `selectedTutorProfile` is truthy. Keep every existing slot, plan, payment, and submission expression unchanged.

Pass `tutorProfiles={dashboard.assigned_tutor_profiles || []}` to the parent `FamilyStudentsPanel`. Extend its prop signature with `tutorProfiles = []`; for each dedicated student assignment, call `findTutorPublicProfile(tutorProfiles, assignment.tutor_id)` and render the compact card only when that call returns a profile. Keep the existing text-only tuteur/matières repli when it returns `null`.

- [ ] **Step 4: Run the focused tests to verify they pass**

Run: `node --test test/parent-portal.test.mjs test/tutor-public-profiles.test.mjs`

Expected: PASS, showing operator-only mutation, parent-scoped data, compact presentation, and no public profile fetch inside booking.

- [ ] **Step 5: Commit the operator and parent experience**

```powershell
git add src/pages/Portal.jsx test/parent-portal.test.mjs test/tutor-public-profiles.test.mjs
git commit -m "feat: show matched tutor profiles in portal"
```

## Task 5: Lock the publication contract and verify the full site

**Files:**
- Modify: `scripts/check-static-site.mjs`
- Modify: `package.json`
- Modify: `test/parent-portal.test.mjs`

**Interfaces:**
- `npm.cmd run test:portal` includes `test/tutor-public-profiles.test.mjs`.
- Static verification fails if consent, safe sanitization, parent scoping, or direct-booking separation is removed.

- [ ] **Step 1: Write the failing static contract and test script change**

In `scripts/check-static-site.mjs`, inside `verifyFinalReviewSafetyContracts` after the existing `portalSource` safety assertions, add:

```js
const publicProfileSource = appsScriptSource.slice(
  appsScriptSource.indexOf("function sanitizeTutorPublicProfileForPublic_("),
  appsScriptSource.indexOf("function buildParentPortalDashboard_("),
)
expect(appsScriptSource.includes('const CRM_TUTOR_PUBLIC_PROFILE_SHEET_NAME = "Tutor Public Profiles"'), "Apps Script: public tutor profile sheet is missing")
expect(appsScriptSource.includes("function getPublishedTutorPublicProfiles_"), "Apps Script: published tutor profile filter is missing")
expect(publicProfileSource.includes("publication_consent_at"), "Apps Script: tutor profile publication consent is missing")
expect(!/calendar_email|hourly_rate_cad|payment_terms|notes/.test(publicProfileSource), "Apps Script: public tutor profile exposes private roster data")
expect(portalSource.includes("assigned_tutor_profiles"), "Parent portal: assigned tutor profiles are not rendered from the scoped dashboard")
expect(!portalSource.includes("bookPortalSession({ token, values: { tutor_id"), "Parent portal: tutor profile must not become a direct booking selector")
```

Replace only this `package.json` value:

```json
"test:portal": "node --test test/portal-api.test.mjs test/portal-materials.test.mjs test/parent-portal.test.mjs test/student-tutor-assignments.test.mjs test/tutor-public-profiles.test.mjs"
```

- [ ] **Step 2: Run the complete portal suite to verify it fails**

Run: `npm.cmd run test:portal`

Expected: FAIL until the public-profile test has been included and the safety checks exist.

- [ ] **Step 3: Implement the static contract exactly as written**

Insert the six assertions without weakening existing static contracts, and update only the `test:portal` script shown above.

- [ ] **Step 4: Run all verification commands**

Run:

```powershell
npm.cmd run test:portal
npm.cmd run test:payments
npm.cmd run test:site
git diff --check
```

Expected: every command exits `0`; the portal suite includes public profile coverage and the site suite completes Vite build, SEO generation and static checks.

- [ ] **Step 5: Commit the verification contract**

```powershell
git add scripts/check-static-site.mjs package.json test/parent-portal.test.mjs
git commit -m "test: verify tutor profile publication safeguards"
```

## Final Verification

- [ ] Read the final `Tuteurs` page and confirm the only calls to action are request/call matching actions; it must have no slots, price, or direct booking control.
- [ ] Read `sanitizeTutorPublicProfileForPublic_` and confirm it returns no `calendar_email`, `hourly_rate_cad`, `payment_terms`, or `notes` field.
- [ ] Read `buildParentPortalDashboard_` and confirm `assigned_tutor_profiles` is filtered from the parent's eligible tutor IDs, never from the full public roster.
- [ ] Read `TutorApplicationForm` and confirm neither a photo input nor a public-profile consent field was added.
- [ ] Run `npm.cmd run test:portal`, `npm.cmd run test:payments`, `npm.cmd run test:site`, and `git diff --check` after the final commit.
- [ ] Confirm `git status --short` contains only the known pre-existing local edits in Global Constraints.
