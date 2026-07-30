# Extension des matières du secondaire et SEO — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter le français, l’anglais et l’histoire et univers social aux parcours publics, à la demande de tutorat et au référencement, sans promettre une disponibilité qui n’a pas été confirmée par le matching.

**Architecture:** `src/lib/subjectContent.js` devient la source de vérité des matières canoniques, libellés, alias et cartes du hub. Les trois pages de matière réutilisent `OfferLanding` et ses métadonnées; un nouveau `SubjectsHub` lit la même configuration. Les routes alimentent les alternates, le pré-rendu et le sitemap déjà générés à partir des catalogues existants.

**Tech Stack:** React 18, React Router 7, Vite 7, Node built-in test runner, pré-rendu SSR local, Tailwind CSS.

## Global Constraints

- Conserver les valeurs existantes `math`, `science`, `physics`, `chemistry` et `other`; ajouter seulement `french`, `english` et `history-social-studies`.
- Le CRM, les affectations multi-tuteur/multi-matière et le verrouillage de créneaux existants restent la source de vérité; les nouvelles pages ne montrent aucune disponibilité ni réservation directe de tuteur.
- Garder le menu principal compact; exposer le hub depuis l’accueil, le hub de ressources et le footer, mais pas comme un nouveau lien de premier niveau.
- Toutes les pages ajoutées sont bilingues, avec canonical, `hreflang`, contenu distinct par matière et routes indexables dans le sitemap.
- Ne pas ajouter de dépendance, de CMS, de pages automatiques par ville/niveau/école ni de faux profil de tuteur.
- Les contenus des offres restent parentaux, concrets et sans garantie de résultat scolaire, de qualification ou de disponibilité.

---

## File structure

| Fichier | Responsabilité |
| --- | --- |
| `src/lib/subjectContent.js` (nouveau) | Matières canoniques, alias, options de formulaire et contenu bilingue du hub. |
| `src/pages/SubjectsHub.jsx` (nouveau) | Page publique et accessible « Matières du secondaire ». |
| `src/lib/routes.js` | Routes françaises et anglaises du hub et des trois offres. |
| `src/App.jsx` | Routes React vers le hub et `OfferLanding`. |
| `src/lib/offerContent.js` | Les trois contenus complets pour `OfferLanding`. |
| `src/lib/prerenderSeoData.js` | Métadonnées du hub et génération des pages statiques. |
| `src/components/FirstSessionRequestForm.jsx` | Options canonisées et préremplissage par alias. |
| `src/lib/leadDiagnostic.js` | Nouvelles matières du mini-bilan et instructions de réponse. |
| `src/lib/assistantConfig.js` | Faits de service et réponses d’assistant exacts. |
| `src/pages/Accueil.jsx`, `src/pages/AccueilEn.jsx`, `src/pages/ResourcesHub.jsx`, `src/layouts/SiteLayout.jsx` | Liens internes et positionnement global étendu. |
| `src/pages/LeadThanks.jsx`, `src/pages/Tuteurs.jsx`, `src/pages/DevenirTuteur.jsx` | Textes généraux, SEO et recrutement cohérents avec les matières couvertes. |
| `test/secondary-subjects.test.mjs` (nouveau), `package.json` | Contrats de contenu, routes, alias, pré-rendu et exécution dans `test:site`. |

### Task 1: Canonical subject catalogue and parent intake

**Files:**
- Create: `src/lib/subjectContent.js`
- Modify: `src/components/FirstSessionRequestForm.jsx`
- Modify: `src/lib/leadDiagnostic.js`
- Modify: `src/components/LeadForm.jsx`
- Create: `test/secondary-subjects.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces `getSubjectOptions(locale, context)`, `normalizeSubjectValue(value, { unknownSubjectValue })`, `getSubjectHubContent(locale)`, and `supportedSubjectKeys` from `src/lib/subjectContent.js`.
- Consumes the existing `FirstSessionRequestForm` submission field `subject` and diagnostic field `answers.subject`; their wire values remain strings.

- [ ] **Step 1: Write the failing catalogue and intake contract test**

```js
import assert from "node:assert/strict"
import test from "node:test"

import {
  getSubjectHubContent,
  getSubjectOptions,
  normalizeSubjectValue,
  supportedSubjectKeys,
} from "../src/lib/subjectContent.js"

test("keeps the secondary subjects canonical across labels and aliases", () => {
  assert.deepEqual(supportedSubjectKeys, [
    "math", "science", "physics", "chemistry", "french", "english", "history-social-studies",
  ])
  assert.equal(normalizeSubjectValue("Français"), "french")
  assert.equal(normalizeSubjectValue("English"), "english")
  assert.equal(normalizeSubjectValue("univers social"), "history-social-studies")
  assert.equal(normalizeSubjectValue("unsure", { unknownSubjectValue: "other" }), "other")
  assert.deepEqual(getSubjectOptions("fr", "form").map(({ value }) => value), [
    ...supportedSubjectKeys,
    "other",
  ])
  assert.equal(getSubjectHubContent("en").cards.length, supportedSubjectKeys.length)
})
```

- [ ] **Step 2: Run the new test to confirm the missing module fails**

Run: `node --test test/secondary-subjects.test.mjs`
Expected: `ERR_MODULE_NOT_FOUND` for `src/lib/subjectContent.js`.

- [ ] **Step 3: Implement the catalogue and consume it in both intake paths**

Create a data-only module whose records include `key`, `routeKey`, `aliases`, `labels.form`, `labels.diagnostic`, `card`, and a list of three curriculum-appropriate themes. Use these exact route associations:

```js
export const supportedSubjectKeys = [
  "math", "science", "physics", "chemistry", "french", "english", "history-social-studies",
]

const subjectDefinitions = {
  math: { routeKey: "maths", aliases: ["math", "maths", "mathematiques", "mathematics"] },
  science: { routeKey: "sciences", aliases: ["science", "sciences", "general science"] },
  physics: { routeKey: "sciences", aliases: ["physics", "physique"] },
  chemistry: { routeKey: "sciences", aliases: ["chemistry", "chimie"] },
  french: { routeKey: "frenchTutoringSecondary", aliases: ["french", "francais", "français"] },
  english: { routeKey: "englishTutoringSecondary", aliases: ["english", "anglais"] },
  "history-social-studies": {
    routeKey: "historySocialStudiesSecondary",
    aliases: ["history", "histoire", "social studies", "univers social", "history-social-studies"],
  },
}
```

Normalize aliases with Unicode NFD diacritic removal before lookup. `getSubjectOptions("fr", "form")` returns the seven real subjects followed by `{ value: "other", label: "Autre / à préciser" }`; the English equivalent ends with `Other / to clarify`. For the diagnostic context, return the same seven real subjects followed by `unsure`, rather than `other`.

Replace the duplicated `subjects` arrays in `FirstSessionRequestForm` with `getSubjectOptions(locale, "form")`; delegate only the `subject` branch of `normalizePrefillOption` to `normalizeSubjectValue(value, { unknownSubjectValue: "other" })`. In `leadDiagnostic`, source subject options from `getSubjectOptions(locale, "diagnostic")`, accept aliases through `normalizeSubjectValue(value, { unknownSubjectValue: "unsure" })`, and update both bilingual diagnostic instructions to enumerate French, English, and history/social studies. Update `LeadForm`’s two subject placeholders to cite a new subject (`secondaire 4 français` / `Secondary 4 English`) while leaving its free-text CRM contract intact.

- [ ] **Step 4: Run the intake contract test and the existing static test suite**

Run: `node --test test/secondary-subjects.test.mjs test/site-layout.test.mjs`
Expected: both test files pass; no legacy subject value changes.

- [ ] **Step 5: Include the new test in the site command and commit**

Change the first command in `test:site` to:

```json
"test:site": "node --test test/site-layout.test.mjs test/secondary-subjects.test.mjs && npm run check:pricing && npm run build && npm run check:site"
```

Run: `npm run test:site`
Expected: Node tests, build and static checks all pass.

```bash
git add src/lib/subjectContent.js src/components/FirstSessionRequestForm.jsx src/lib/leadDiagnostic.js src/components/LeadForm.jsx test/secondary-subjects.test.mjs package.json
git commit -m "feat: add canonical secondary subject intake"
```

### Task 2: Subject hub, localized routing, and static SEO entry

**Files:**
- Create: `src/pages/SubjectsHub.jsx`
- Modify: `src/lib/routes.js`
- Modify: `src/App.jsx`
- Modify: `src/lib/prerenderSeoData.js`
- Modify: `test/secondary-subjects.test.mjs`

**Interfaces:**
- Consumes `getSubjectHubContent(locale)` and each card’s `routeKey` from Task 1.
- Produces `subjectsHub` routes usable by `getLocalizedPath`, `buildAlternates`, static pre-rendering and the sitemap.

- [ ] **Step 1: Extend the test with route and pre-render expectations**

```js
import { getPrerenderPageEntries } from "../src/lib/prerenderSeoData.js"
import { routeCatalog } from "../src/lib/routes.js"

test("adds an indexable bilingual subject hub to the prerender catalogue", () => {
  assert.deepEqual(routeCatalog.subjectsHub, {
    fr: "/matieres-secondaire",
    en: "/en/high-school-subjects",
  })
  const pages = getPrerenderPageEntries()
  assert.ok(pages.some((page) => page.routeKey === "subjectsHub" && page.locale === "fr" && page.includeInSitemap))
  assert.ok(pages.some((page) => page.routeKey === "subjectsHub" && page.locale === "en" && page.includeInSitemap))
})
```

- [ ] **Step 2: Run the focused test and confirm the new route is absent**

Run: `node --test test/secondary-subjects.test.mjs`
Expected: FAIL because `routeCatalog.subjectsHub` is undefined.

- [ ] **Step 3: Add the hub route, page, and indexable metadata**

Add the following exact catalogue entry:

```js
subjectsHub: { fr: "/matieres-secondaire", en: "/en/high-school-subjects" },
```

Lazy-load `SubjectsHub` in `App.jsx` and register both paths. In `SubjectsHub.jsx`, follow the `ResourcesHub` visual grammar: `Seo`, localized `HeroShowcase`, then an accessible `<section aria-labelledby="subjects-heading">` containing one `<article>` per `getSubjectHubContent(locale).cards` card. Cards link with `<Link to={getLocalizedPath(card.routeKey, locale)}>` when their route is public, and include the French/English labels, summary, themes and a request CTA. The physics and chemistry cards point to the existing general science page, not the noindex city pages, and their CTA keeps matching and time confirmation with the team.

The page must call:

```jsx
<Seo
  title={copy.seoTitle}
  description={copy.seoDescription}
  path={getLocalizedPath("subjectsHub", locale)}
  keywords={copy.keywords}
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.seoTitle,
    url: absoluteUrl(getLocalizedPath("subjectsHub", locale)),
    description: copy.seoDescription,
  }}
  lang={getHtmlLang(locale)}
  locale={getOgLocale(locale)}
  alternateLocale={getAlternateOgLocale(locale)}
  alternates={buildAlternates("subjectsHub")}
/>
```

Add `subjectsHub` to `basePageSeo` with `CollectionPage` metadata. French SEO text must name `mathématiques, sciences, français, anglais et histoire`; English metadata must name `math, science, French, English and history/social studies`. Because `getPrerenderPageEntries` already iterates `basePageSeo`, this adds both paths to the HTML output and sitemap without a special generator branch.

- [ ] **Step 4: Run route tests and verify generated output**

Run: `node --test test/secondary-subjects.test.mjs && npm run build`
Expected: PASS and generated `dist/matieres-secondaire/index.html` plus `dist/en/high-school-subjects/index.html`.

- [ ] **Step 5: Commit the independently navigable hub**

```bash
git add src/pages/SubjectsHub.jsx src/lib/routes.js src/App.jsx src/lib/prerenderSeoData.js test/secondary-subjects.test.mjs
git commit -m "feat: add secondary subjects hub"
```

### Task 3: Three distinct tutoring pages and their internal links

**Files:**
- Modify: `src/lib/routes.js`
- Modify: `src/lib/offerContent.js`
- Modify: `src/App.jsx`
- Modify: `src/pages/OfferLanding.jsx`
- Modify: `test/secondary-subjects.test.mjs`

**Interfaces:**
- Consumes `OfferLanding`’s required configuration shape: `eyebrow`, `heroTitle`, `heroText`, SEO fields, `highlights`, fit section fields, `faq`, `relatedLinks`, `ctaTitle`, `ctaText`, `formTitle`, `formText`.
- Produces three keys in `offerRouteKeys`; `OfferLanding` obtains them through `getOfferPageConfig(routeKey, locale)`.

- [ ] **Step 1: Add failing assertions for all six new service routes**

```js
import { readFile } from "node:fs/promises"
import { getOfferPageConfig, offerRouteKeys } from "../src/lib/offerContent.js"

test("configures distinct bilingual tutoring pages for the new subjects", () => {
  for (const routeKey of ["frenchTutoringSecondary", "englishTutoringSecondary", "historySocialStudiesSecondary"]) {
    assert.ok(offerRouteKeys.includes(routeKey))
    for (const locale of ["fr", "en"]) {
      const page = getOfferPageConfig(routeKey, locale)
      assert.ok(page.heroTitle)
      assert.ok(page.seoDescription)
      assert.equal(page.faq.length, 3)
      assert.ok(page.relatedLinks.some((link) => link.routeKey === "subjectsHub"))
    }
  }
})

test("renders every configured related link on an offer page", async () => {
  const source = await readFile(new URL("../src/pages/OfferLanding.jsx", import.meta.url), "utf8")
  assert.match(source, /page\.relatedLinks\.map/)
  assert.match(source, /getLocalizedPath\(link\.routeKey, locale\)/)
})
```

- [ ] **Step 2: Run the focused test to verify the offer keys are missing**

Run: `node --test test/secondary-subjects.test.mjs`
Expected: FAIL because `frenchTutoringSecondary` is not in `offerRouteKeys`.

- [ ] **Step 3: Add the routes and complete, non-templated offer content**

Add these exact routes:

```js
frenchTutoringSecondary: {
  fr: "/tutorat-francais-secondaire",
  en: "/en/high-school-french-tutoring-quebec",
},
englishTutoringSecondary: {
  fr: "/tutorat-anglais-secondaire",
  en: "/en/high-school-english-tutoring-quebec",
},
historySocialStudiesSecondary: {
  fr: "/tutorat-histoire-univers-social-secondaire",
  en: "/en/high-school-history-social-studies-tutoring-quebec",
},
```

Append the three keys to `offerRouteKeys`, add the bilingual config objects to `offerPageConfigs`, and register both locale paths in `App.jsx` with `OfferLanding`. Each page must have three fit cards, three FAQ items and four related links: `subjectsHub`, `resourcesHub`, `catchUp`, and `examSprint`. Do not link a language or history page to maths or sciences merely to fill a section, and do not imply that science tutoring covers history.

Render `page.relatedLinks` in `OfferLanding` below its FAQ through a labelled navigation section. Every item uses `<Link to={getLocalizedPath(link.routeKey, locale)}>` and the configured visible label. Skip only missing/invalid links, and do not render an empty section. This turns the content configuration into real internal links in both the pre-rendered HTML and the browser view.

Use these content boundaries so each page has a distinct parent need:

| Page | Focus in hero and fit cards | FAQ coverage |
| --- | --- | --- |
| Français | compréhension de texte, écriture organisée, grammaire et préparation d’évaluation | type de texte, correction sans faire le travail, préparation d’examen |
| Anglais | compréhension, expression écrite/orale, vocabulaire en contexte et confiance | English/ELA level, speaking versus writing, work between sessions |
| Histoire et univers social | lecture de documents, repères chronologiques, concepts et réponse structurée | mémorisation versus compréhension, document-based questions, examen proche |

All English equivalents use Québec/Canadian secondary wording and refer to `history and social studies`, never to a fabricated course credential. Every CTA says that the team confirms the tutor and time after matching; none claims an available tutor.

- [ ] **Step 4: Run page configuration and static route checks**

Run: `node --test test/secondary-subjects.test.mjs && npm run build && npm run check:site`
Expected: PASS; every one of the six offer URLs has rendered HTML, a canonical tag, reciprocal `hreflang` links and a sitemap entry.

- [ ] **Step 5: Commit the new public services**

```bash
git add src/lib/routes.js src/lib/offerContent.js src/App.jsx src/pages/OfferLanding.jsx test/secondary-subjects.test.mjs
git commit -m "feat: add language and social studies tutoring pages"
```

### Task 4: Extend discovery, recruiting, and assistant copy without broadening booking authority

**Files:**
- Modify: `src/pages/Accueil.jsx`
- Modify: `src/pages/AccueilEn.jsx`
- Modify: `src/pages/ResourcesHub.jsx`
- Modify: `src/layouts/SiteLayout.jsx`
- Modify: `src/pages/LeadThanks.jsx`
- Modify: `src/pages/Tuteurs.jsx`
- Modify: `src/pages/DevenirTuteur.jsx`
- Modify: `src/lib/prerenderSeoData.js`
- Modify: `src/lib/assistantConfig.js`
- Modify: `test/secondary-subjects.test.mjs`

**Interfaces:**
- Consumes the `subjectsHub` route and canonical matter values from Tasks 1–3.
- Produces only public copy, links, metadata and assistant guidance; it does not alter CRM eligibility, tutor assignments, or calendar conflict logic.

- [ ] **Step 1: Add failing assistant and internal-link assertions**

```js
import { buildFallbackAssistantReply } from "../src/lib/assistantConfig.js"

test("describes the expanded service without inventing tutor availability", () => {
  const reply = buildFallbackAssistantReply("Offrez-vous du tutorat en histoire?", "fr")
  assert.match(reply, /histoire et univers social/i)
  assert.match(reply, /demandez une S[ée]ance|mini-bilan/i)
  assert.doesNotMatch(reply, /disponible imm[ée]diatement/i)
})

test("links the public discovery surfaces to the subject hub", async () => {
  const [layout, resources] = await Promise.all([
    readFile(new URL("../src/layouts/SiteLayout.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/ResourcesHub.jsx", import.meta.url), "utf8"),
  ])
  assert.match(layout, /getLocalizedPath\("subjectsHub", locale\)/)
  assert.match(resources, /getLocalizedPath\("subjectsHub", locale\)/)
})
```

- [ ] **Step 2: Run the focused test and verify it fails on history coverage**

Run: `node --test test/secondary-subjects.test.mjs`
Expected: FAIL because the assistant’s covered-subject response does not mention history/social studies and the discovery links are absent.

- [ ] **Step 3: Make global copy accurate and add the link graph**

Update the two home pages’ title, description, badge and `EducationalOrganization` description from math/science-only wording to “matières principales du secondaire” / “core high-school subjects”, naming the new subjects in page copy and metadata. Add a small text `Link` below the hero actions to `subjectsHub`; do not change the primary conversion CTA.

In `ResourcesHub`, add one localized inline `Link` to `subjectsHub` beside the existing parent guide and home links. In `SiteLayout`, add `Matières` / `Subjects` only to `footerLinks`, update the footer blurb, and leave `copy.nav` unchanged. Update the thank-you and tutor-directory titles/descriptions/keywords to include the expanded coverage.

Broaden `DevenirTuteur` so it explicitly welcomes qualified French, English and history/social-studies candidates alongside the existing STEM specialties: update its priority profile list, hero signals, relevant FAQs, job posting descriptions, SEO keywords, and example subject placeholder. Keep the existing review, roster, availability and explicit-public-profile-consent language intact.

Align `basePageSeo` entries for `home`, `request`, `thankYou`, `tuteurs`, `devenirTuteur`, and `employmentTutorSecondary` with the visible copy. Leave specialist city and math/science landing pages targeted; they must not be diluted into generic every-subject pages.

Update `assistantServiceInfo.subjects`, starter prompts, subject-matching regexes, fallback subject/exam/Sec-4 answers and `buildAssistantInstructions` with the seven actual subjects. A response must direct a parent to the request or mini-bilan and state that tutor/time confirmation follows matching; it must never claim a named tutor or immediate open slot.

- [ ] **Step 4: Run content tests and static checks**

Run: `node --test test/secondary-subjects.test.mjs test/site-layout.test.mjs && npm run build && npm run check:site`
Expected: PASS, including a sitemap with the subject hub and six new service pages.

- [ ] **Step 5: Commit the consistent public positioning**

```bash
git add src/pages/Accueil.jsx src/pages/AccueilEn.jsx src/pages/ResourcesHub.jsx src/layouts/SiteLayout.jsx src/pages/LeadThanks.jsx src/pages/Tuteurs.jsx src/pages/DevenirTuteur.jsx src/lib/prerenderSeoData.js src/lib/assistantConfig.js test/secondary-subjects.test.mjs
git commit -m "feat: extend tutoring discovery and recruitment subjects"
```

### Task 5: Production verification and scope audit

**Files:**
- Modify only if verification reveals a defect in files listed by Tasks 1–4.

**Interfaces:**
- Consumes the full route catalog, pre-render data and built `dist/` output.
- Produces a verified build; no runtime booking or CRM state mutation is performed.

- [ ] **Step 1: Run every relevant automated check from a clean build output**

Run:

```bash
npm run test:site
npm run test:portal
```

Expected: every Node test passes; `npm run check:site` reports static-site success; the portal regression suite remains green.

- [ ] **Step 2: Inspect the generated SEO artifacts for each new canonical path**

Run:

```powershell
$paths = @(
  'matieres-secondaire', 'en/high-school-subjects',
  'tutorat-francais-secondaire', 'en/high-school-french-tutoring-quebec',
  'tutorat-anglais-secondaire', 'en/high-school-english-tutoring-quebec',
  'tutorat-histoire-univers-social-secondaire', 'en/high-school-history-social-studies-tutoring-quebec'
)
$paths | ForEach-Object { Test-Path (Join-Path 'dist' (Join-Path $_ 'index.html')) }
```

Expected: eight `True` lines. Then verify `dist/sitemap.xml` contains each public URL and that no new page has `noindex`.

- [ ] **Step 3: Review scope and booking safety before handoff**

Confirm in the diff that no API handler, CRM assignment contract, portal authorization rule, payment rule, or calendar conflict check was changed. Confirm all new CTA copy keeps matching and availability confirmation with the team.

- [ ] **Step 4: Keep the verification handoff clean**

Do not create a verification-only commit when every check passes. If a check fails, correct the defect in its owning source file and test file, rerun that task’s focused command, and stage only those exact files. Never stage `ops/paperclip/state/urgent-alert-state.md`, `package-lock.json`, or `.superpowers/`, which are unrelated pre-existing worktree changes.
