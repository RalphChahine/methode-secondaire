# Clear Tutoring Packages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the confusing weekly offer with three French-first, non-recurring tutoring packages whose price, lead request, payment, and credit records stay consistent.

**Architecture:** `src/lib/pricing.js` becomes the client-side catalogue for the three public offers and their bilingual presentation. The Google Apps Script CRM keeps the canonical operational catalogue, receives the selected public offer code, creates package payment requests, and grants credits once per verified payment. The portal consumes those records without treating cadence as a product or a subscription.

**Tech Stack:** React 18, Vite 7, React Router 7, Node ESM validation scripts, Vercel serverless proxy, Google Apps Script, Google Sheets CRM, Stripe Payment Links/webhook.

## Global Constraints

- French is the reference language; every parent-facing addition has a complete English mirror.
- Public offers are exactly `targeted_session`, `momentum_block`, and `progression_block`.
- Prices are CAD: 65 $ for one 60-minute session, 250 $ for four 60-minute sessions, and 600 $ for ten 60-minute sessions.
- A weekly or biweekly time is a cadence chosen after matching; it is never a public offer, an automatic debit, or an automatic renewal.
- The momentum block receives four credits only after its one 250 $ payment is verified.
- The progression block receives five credits after each verified 300 $ payment; the same payment must never grant credits twice.
- Existing `PLAN-PACK10-600`, `progression_block_10`, `weekly_follow_up_10`, and historical routes remain readable for compatibility. New public copy and new requests use only the three public offer codes above.
- Public first-time parent CTAs continue to use `/demande` or `/en/request`, never portal-account creation.
- Preserve all unrelated dirty-worktree changes. Stage only files belonging to the active task.

## File Structure

| File | Responsibility |
| --- | --- |
| `src/lib/pricing.js` | Catalogue, legacy-query normalization, bilingual offer copy, display helpers, and aliases needed by existing consumers. |
| `scripts/check-pricing-packages.mjs` | Node assertions for price maths, bilingual catalogue content, and legacy query normalization. |
| `package.json` | Runs the pricing-contract check before the existing static-site verification. |
| `src/components/PricingSection.jsx` | Three-card public price comparison with per-session price as the visual anchor for blocks. |
| `src/pages/FirstSessionRequest.jsx` | Resolves an offer query to an offer-specific French/English request page. |
| `src/components/FirstSessionRequestForm.jsx` | Sends the selected canonical offer code to the CRM without forcing a cadence. |
| `src/lib/assistantConfig.js`, `src/lib/leadDiagnostic.js` | Gives the assistant and diagnostic the same names and prices as the public page. |
| `src/components/GrowthProgramSection.jsx`, `src/components/OfferPathwaysSection.jsx`, `src/components/LeadDiagnosticPanel.jsx`, `src/components/StudentAssistantWidget.jsx` | Updates reusable public offer modules. |
| `src/lib/offerContent.js`, `src/lib/blogContent.js`, `src/pages/LeadThanks.jsx`, `src/pages/ResourcesHub.jsx`, `src/pages/Secondary4MathTheory.jsx` | Removes legacy product naming from current French and English content while preserving the legacy route. |
| `ops/crm/google-apps-script/Code.gs` | CRM plan seeds, lead-code normalization, payment-link codes, payment-to-credit idempotency, and package-payment actions. |
| `src/lib/portalClient.js`, `api/portal.js`, `vite.config.js` | Declares the new operator package-payment action consistently in client, production proxy, and dev proxy. |
| `src/pages/Portal.jsx` | Lets an operator create a pending package enrollment, request each package payment, and display package names/credits without hard-coded weekly copy. |
| `ops/crm/payment-links-template.csv`, `ops/crm/payments-template.csv`, `ops/crm/README.md`, `ops/crm/parent-tutor-portal.md`, `ops/crm/scheduling-and-payments.md`, `ops/crm/templates/payment-request.md`, `ops/crm/templates/weekly-follow-up-payment-request.md`, `docs/growth-playbook.md` | Makes operations, sample data, and internal references match the shipped catalogue. |

---

### Task 1: Establish the package contract in the client catalogue

**Files:**
- Create: `scripts/check-pricing-packages.mjs`
- Modify: `src/lib/pricing.js`
- Modify: `package.json`

**Interfaces:**
- Produces `pricing.offers`, keyed by `targeted_session`, `momentum_block`, and `progression_block`.
- Produces `getOffer(code)`, `resolveRequestedOffer(value)`, and `getPricingCopy(locale)` for all UI consumers.
- `resolveRequestedOffer("weekly")`, `resolveRequestedOffer("progression")`, `resolveRequestedOffer("progression_block_10")`, and `resolveRequestedOffer("weekly_follow_up_10")` return `progression_block`.

- [ ] **Step 1: Write the failing package-contract test.**

  Create `scripts/check-pricing-packages.mjs` with these assertions:

  ```js
  import assert from "node:assert/strict"
  import fs from "node:fs/promises"
  import { getOffer, getPricingCopy, pricing, resolveRequestedOffer } from "../src/lib/pricing.js"

  const expected = [
    ["targeted_session", 1, 65, 65],
    ["momentum_block", 4, 250, 62.5],
    ["progression_block", 10, 600, 60],
  ]

  assert.deepEqual(Object.keys(pricing.offers), expected.map(([code]) => code))
  expected.forEach(([code, sessionCount, totalPriceCad, perSessionPriceCad]) => {
    assert.deepEqual(getOffer(code), {
      ...pricing.offers[code],
      code,
    })
    assert.equal(pricing.offers[code].sessionCount, sessionCount)
    assert.equal(pricing.offers[code].totalPriceCad, totalPriceCad)
    assert.equal(pricing.offers[code].perSessionPriceCad, perSessionPriceCad)
    assert.equal(pricing.offers[code].durationMinutes, 60)
    assert.equal(pricing.offers[code].autoRenewal, false)
  })

  ;["fr", "en"].forEach((locale) => {
    const copy = getPricingCopy(locale)
    assert.equal(Object.keys(copy.offers).length, 3)
    expected.forEach(([code]) => {
      assert.ok(copy.offers[code].title)
      assert.ok(copy.offers[code].description)
      assert.ok(copy.offers[code].action)
      assert.ok(copy.offers[code].situationalLabel)
    })
  })

  ;["weekly", "progression", "progression_block_10", "weekly_follow_up_10"].forEach((legacyValue) => {
    assert.equal(resolveRequestedOffer(legacyValue), "progression_block")
  })
  assert.equal(resolveRequestedOffer("momentum"), "momentum_block")
  assert.equal(resolveRequestedOffer("targeted"), "targeted_session")
  assert.equal(resolveRequestedOffer("unknown"), "targeted_session")

  console.log("Pricing package contract passed.")
  ```

- [ ] **Step 2: Run the check to verify it fails.**

  Run: `node scripts/check-pricing-packages.mjs`

  Expected: a module-export error because `getOffer` and `resolveRequestedOffer` do not exist yet, or an assertion failure because `pricing.offers` does not exist.

- [ ] **Step 3: Replace the two-offer catalogue with the three-offer contract.**

  In `src/lib/pricing.js`, define the immutable offer records below and make them the authoritative public catalogue:

  ```js
  const publicOffers = Object.freeze({
    targeted_session: Object.freeze({
      sessionCount: 1,
      totalPriceCad: 65,
      perSessionPriceCad: 65,
      durationMinutes: 60,
      installmentCount: 1,
      installmentPriceCad: 65,
      autoRenewal: false,
    }),
    momentum_block: Object.freeze({
      sessionCount: 4,
      totalPriceCad: 250,
      perSessionPriceCad: 62.5,
      durationMinutes: 60,
      installmentCount: 1,
      installmentPriceCad: 250,
      autoRenewal: false,
    }),
    progression_block: Object.freeze({
      sessionCount: 10,
      totalPriceCad: 600,
      perSessionPriceCad: 60,
      durationMinutes: 60,
      installmentCount: 2,
      installmentPriceCad: 300,
      autoRenewal: false,
    }),
  })

  export const pricing = Object.freeze({
    currency: "CAD",
    offers: publicOffers,
    cancellation: Object.freeze({ noticeHours: 72 }),
    firstSession: publicOffers.targeted_session,
    targetedSession: publicOffers.targeted_session,
    aLaCarteSession: publicOffers.targeted_session,
    momentumBlock: publicOffers.momentum_block,
    weeklyFollowUp: publicOffers.progression_block,
    progressionProgram: publicOffers.progression_block,
  })

  export function getOffer(code) {
    const offer = publicOffers[resolveRequestedOffer(code)]
    return { ...offer, code: resolveRequestedOffer(code) }
  }

  export function resolveRequestedOffer(value) {
    const aliases = Object.freeze({
      targeted: "targeted_session",
      first_session_declic: "targeted_session",
      momentum: "momentum_block",
      weekly: "progression_block",
      progression: "progression_block",
      progression_block_10: "progression_block",
      weekly_follow_up_10: "progression_block",
    })
    const normalized = typeof value === "string" ? value.trim() : ""
    return publicOffers[normalized] ? normalized : (aliases[normalized] || "targeted_session")
  }
  ```

  Replace the French and English `pricingCopyByLocale.offers` entries with records keyed by the same three codes. Use these non-negotiable labels and price hierarchy:

  ```js
  // French titles and anchors
  targeted_session: { title: "Séance ciblée", situationalLabel: "Une priorité claire", action: "Demander ce format" }
  momentum_block: { title: "Bloc d'élan", situationalLabel: "Pour reprendre le fil pendant environ un mois", action: "Demander ce format" }
  progression_block: { title: "Bloc de progression", situationalLabel: "Pour une difficulté qui revient", action: "Demander ce format" }

  // English titles and anchors
  targeted_session: { title: "Targeted session", situationalLabel: "One clear priority", action: "Request this format" }
  momentum_block: { title: "Momentum block", situationalLabel: "To regain momentum over about a month", action: "Request this format" }
  progression_block: { title: "Progress block", situationalLabel: "For a difficulty that keeps returning", action: "Request this format" }
  ```

  The shared French introduction must say `Plus le bloc est long, moins chaque séance coûte cher.` The English mirror must say `The longer the block, the lower the session price.` Keep the 72-hour rescheduling policy unchanged.

- [ ] **Step 4: Wire the new check into the existing suite.**

  In `package.json`, add:

  ```json
  "check:pricing": "node scripts/check-pricing-packages.mjs"
  ```

  Change `test:site` to:

  ```json
  "test:site": "npm run check:pricing && npm run build && npm run check:site"
  ```

- [ ] **Step 5: Run the contract and site checks.**

  Run: `npm.cmd run check:pricing`

  Expected: `Pricing package contract passed.`

  Run: `npm.cmd run test:site`

  Expected: `Pricing package contract passed.` followed by the existing static-site success message.

- [ ] **Step 6: Commit the catalogue contract.**

  ```powershell
  git add -- src/lib/pricing.js scripts/check-pricing-packages.mjs package.json
  git commit -m "feat: define clear tutoring package catalogue"
  ```

### Task 2: Make the public pricing and request flow offer-aware

**Files:**
- Modify: `src/components/PricingSection.jsx`
- Modify: `src/pages/FirstSessionRequest.jsx`
- Modify: `src/components/FirstSessionRequestForm.jsx`
- Test: `scripts/check-pricing-packages.mjs`

**Interfaces:**
- `PricingSection` passes `?offer=targeted_session`, `?offer=momentum_block`, or `?offer=progression_block` to the existing request route.
- `FirstSessionRequest` resolves its query with `resolveRequestedOffer` and passes the canonical code to `FirstSessionRequestForm`.
- `FirstSessionRequestForm` sends that exact canonical code as `offer_recommended`.
- The browser emits `methode:pricing-offers-view`, `methode:pricing-offer-selected`, and `methode:first-session-request-submit` with an offer code only; none of these events contains student details.

- [ ] **Step 1: Extend the contract test with request-flow assertions.**

  Append this source check to `scripts/check-pricing-packages.mjs`:

  ```js
  const [pricingSection, requestPage, requestForm] = await Promise.all([
    fs.readFile(new URL("../src/components/PricingSection.jsx", import.meta.url), "utf8"),
    fs.readFile(new URL("../src/pages/FirstSessionRequest.jsx", import.meta.url), "utf8"),
    fs.readFile(new URL("../src/components/FirstSessionRequestForm.jsx", import.meta.url), "utf8"),
  ])

  ;["targeted_session", "momentum_block", "progression_block"].forEach((code) => {
    assert.match(pricingSection, new RegExp(code))
  })
  assert.match(pricingSection, /\?offer=\$\{code\}/)
  assert.match(requestPage, /resolveRequestedOffer/)
  assert.match(requestForm, /offer_recommended: offer/)
  assert.match(pricingSection, /methode:pricing-offers-view/)
  assert.match(pricingSection, /methode:pricing-offer-selected/)
  assert.match(requestForm, /methode:first-session-request-submit/)
  assert.doesNotMatch(pricingSection, /Séance Déclic/)
  ```

- [ ] **Step 2: Run the check to verify it fails.**

  Run: `npm.cmd run check:pricing`

  Expected: an assertion error for the missing `momentum_block` URL or legacy `Séance Déclic` text.

- [ ] **Step 3: Render three transparent cards rather than a two-product comparison.**

  In `src/components/PricingSection.jsx`:

  ```jsx
  const offers = [
    { code: "targeted_session", icon: CalendarCheck },
    { code: "momentum_block", icon: LineChart },
    { code: "progression_block", icon: ShieldCheck },
  ].map(({ code, icon }) => ({
    ...getOffer(code),
    copy: copy.offers[code],
    href: `${requestUrl}?offer=${code}`,
    icon,
  }))
  ```

  Use `md:grid-cols-3`, retain one visually emphasized progression card, and display block prices in this order:

  ```jsx
  <div className="font-display text-4xl font-semibold">{formatCad(offer.perSessionPriceCad, locale)}</div>
  <div className="mb-1 text-sm text-white/58">{copy.perSession}</div>
  <p className="mt-1 text-sm text-white/68">
    {offer.sessionCount} × {copy.perHour} · {formatCad(offer.totalPriceCad, locale)} {copy.total}
  </p>
  ```

  For the targeted session, keep `65 $` and `60 min` together; do not present a fictional discount. For the progression block, retain the visible `2 × 300 $` payment explanation. For the momentum block, say that it is one 250 $ payment.

  On first render, emit:

  ```js
  window.dispatchEvent(new CustomEvent("methode:pricing-offers-view", {
    detail: { locale, offers: ["targeted_session", "momentum_block", "progression_block"] },
  }))
  ```

  Add an `onClick` handler to each CTA that emits `methode:pricing-offer-selected` with `{ locale, offer: offer.code }` before navigation.

- [ ] **Step 4: Resolve all current and legacy request queries in one place.**

  In `src/pages/FirstSessionRequest.jsx`, replace the boolean progression check with:

  ```jsx
  const requestedOffer = resolveRequestedOffer(new URLSearchParams(location.search).get("offer"))
  const requestCopy = { ...copy, ...copy.offers[requestedOffer] }
  ```

  Define `copyByLocale.fr.offers` and `copyByLocale.en.offers` for all three canonical codes. Each entry supplies `seoTitle`, `seoDescription`, `badge`, `title`, `description`, `price`, `formEyebrow`, `formTitle`, `formDescription`, and three next-step strings. The progression entry states `60 $ par séance · 600 $ au total · 2 paiements de 300 $`; the English mirror states `$60 per session · $600 total · 2 $300 payments`.

  Pass the canonical offer to the form:

  ```jsx
  <FirstSessionRequestForm locale={locale} pageName="first-session-request" offer={requestedOffer} onSuccess={handleSuccess} />
  ```

- [ ] **Step 5: Keep the request form neutral about cadence.**

  In `src/components/FirstSessionRequestForm.jsx`, replace the progression-only checks with `const requestedOffer = resolveRequestedOffer(offer)`. Use offer-specific form labels and request-message copy, but do not set `need: "weekly"` merely because a parent selected either block. Preserve the parent's selected learning need and send:

  ```js
  offer_recommended: requestedOffer,
  ```

  Retain the existing consent, CRM submission, and successful-request redirect behavior.

  When the CRM request succeeds, emit `methode:first-session-request-submit` with `{ locale, offer: requestedOffer }` alongside the existing lead event. Do not include the parent's form values in either event.

- [ ] **Step 6: Run focused and full checks.**

  Run: `npm.cmd run check:pricing`

  Expected: `Pricing package contract passed.`

  Run: `npm.cmd run test:site`

  Expected: build succeeds and static checks report all routes passing.

- [ ] **Step 7: Commit the public request flow.**

  ```powershell
  git add -- src/components/PricingSection.jsx src/pages/FirstSessionRequest.jsx src/components/FirstSessionRequestForm.jsx scripts/check-pricing-packages.mjs
  git commit -m "feat: present three clear tutoring package choices"
  ```

### Task 3: Synchronize all public, diagnostic, and assistant copy

**Files:**
- Modify: `src/lib/assistantConfig.js`
- Modify: `src/lib/leadDiagnostic.js`
- Modify: `src/components/GrowthProgramSection.jsx`
- Modify: `src/components/OfferPathwaysSection.jsx`
- Modify: `src/components/LeadDiagnosticPanel.jsx`
- Modify: `src/components/StudentAssistantWidget.jsx`
- Modify: `src/lib/offerContent.js`
- Modify: `src/lib/blogContent.js`
- Modify: `src/pages/LeadThanks.jsx`
- Modify: `src/pages/ResourcesHub.jsx`
- Modify: `src/pages/Secondary4MathTheory.jsx`
- Modify: `src/App.jsx`
- Modify: `src/lib/routes.js`
- Test: `scripts/check-pricing-packages.mjs`

**Interfaces:**
- `pricing` and `getOffer` are the only client-side price source; no component copies 65, 250, 600, 62.5, or 60 as an offer price literal.
- The historical `/suivi-hebdomadaire` and `/en/weekly-follow-up` routes resolve, but their visible titles describe the progress block.

- [ ] **Step 1: Add a failing source audit for forbidden offer names.**

  Add this to `scripts/check-pricing-packages.mjs`:

  ```js
  const copyFiles = [
    "src/lib/assistantConfig.js",
    "src/lib/leadDiagnostic.js",
    "src/components/GrowthProgramSection.jsx",
    "src/components/OfferPathwaysSection.jsx",
    "src/components/LeadDiagnosticPanel.jsx",
    "src/components/StudentAssistantWidget.jsx",
    "src/pages/LeadThanks.jsx",
    "src/pages/ResourcesHub.jsx",
  ]
  const sources = await Promise.all(copyFiles.map((file) => fs.readFile(new URL(`../${file}`, import.meta.url), "utf8")))
  sources.forEach((source, index) => {
    assert.doesNotMatch(source, /Séance Déclic|Déclic \/ one-off session|weekly follow-up package/i, copyFiles[index])
  })
  ```

- [ ] **Step 2: Run the check to verify it fails.**

  Run: `npm.cmd run check:pricing`

  Expected: a source-audit assertion naming at least `src/lib/assistantConfig.js` or `src/pages/LeadThanks.jsx`.

- [ ] **Step 3: Update shared content from the catalogue, not duplicated literals.**

  Use `getOffer("targeted_session")`, `getOffer("momentum_block")`, and `getOffer("progression_block")` in assistant and diagnostic responses. Describe the formats as `Séance ciblée`, `Bloc d'élan`, and `Bloc de progression` in French; use `Targeted session`, `Momentum block`, and `Progress block` in English. State that the cadence is chosen after matching and that no format renews automatically.

  In `offerContent.js`, replace public `weeklyFollowUp` headings and calls to action with the progress-block names while leaving its route key in place. In `App.jsx` and `routes.js`, retain the legacy paths exactly as-is; do not introduce a second SEO route for the same offer.

- [ ] **Step 4: Update every reusable pathway and editorial call to action.**

  Replace the former two-offer decision language with the three situations below in both locales:

  ```text
  Séance ciblée / Targeted session: one concrete priority.
  Bloc d'élan / Momentum block: regain momentum over roughly one month.
  Bloc de progression / Progress block: a recurring difficulty or lasting academic structure.
  ```

  Preserve blog articles' educational content; only replace obsolete offer names, prices, and CTA labels. In `LeadThanks.jsx`, explain that the team confirms the appropriate one of the three formats after matching. In `Secondary4MathTheory.jsx` and `ResourcesHub.jsx`, label the legacy link as the progress block, never as a weekly package.

- [ ] **Step 5: Run the copy audit and static suite.**

  Run: `npm.cmd run check:pricing`

  Expected: `Pricing package contract passed.`

  Run: `npm.cmd run test:site`

  Expected: all French and English pages build and pass static validation.

- [ ] **Step 6: Commit the bilingual content migration.**

  ```powershell
  git add -- src/lib/assistantConfig.js src/lib/leadDiagnostic.js src/components/GrowthProgramSection.jsx src/components/OfferPathwaysSection.jsx src/components/LeadDiagnosticPanel.jsx src/components/StudentAssistantWidget.jsx src/lib/offerContent.js src/lib/blogContent.js src/pages/LeadThanks.jsx src/pages/ResourcesHub.jsx src/pages/Secondary4MathTheory.jsx src/App.jsx src/lib/routes.js scripts/check-pricing-packages.mjs
  git commit -m "feat: align bilingual offer copy with package catalogue"
  ```

### Task 4: Seed the CRM catalogue and normalize lead selection codes

**Files:**
- Modify: `ops/crm/google-apps-script/Code.gs`
- Modify: `ops/crm/payment-links-template.csv`
- Modify: `ops/crm/payments-template.csv`
- Modify: `ops/crm/README.md`
- Modify: `docs/growth-playbook.md`

**Interfaces:**
- CRM canonical lead codes: `targeted_session`, `momentum_block`, `progression_block`.
- Plan IDs: retain `PLAN-FIRST-60` and `PLAN-PACK10-600`; create `PLAN-PACK4-250`.
- Canonical payment-link codes: `momentum_block_payment_1`, `progression_block_payment_1`, and `progression_block_payment_2`.

- [ ] **Step 1: Add the constants before modifying seeded rows.**

  In `Code.gs`, replace the current progression-only constants with:

  ```js
  const PUBLIC_OFFER_CODES = ["targeted_session", "momentum_block", "progression_block"];
  const LEGACY_PUBLIC_OFFER_CODES = {
    first_session_declic: "targeted_session",
    weekly: "progression_block",
    progression: "progression_block",
    progression_block_10: "progression_block",
    weekly_follow_up_10: "progression_block",
  };
  const PACKAGE_PAYMENT_OFFER_CODES = [
    "momentum_block_payment_1",
    "progression_block_payment_1",
    "progression_block_payment_2",
  ];
  const LEGACY_PACKAGE_PAYMENT_OFFER_CODES = [
    "progression_block_10_installment_1",
    "progression_block_10_installment_2",
    "weekly_follow_up_installment_1",
    "weekly_follow_up_installment_2",
  ];
  ```

  Make `normalizePublicOfferCode_` return a canonical public code for any known legacy value and return `""` for an unknown value. Do not normalize session type `weekly_follow_up`: it remains an internal session-type value.

- [ ] **Step 2: Update the default plan seeds without touching live enrollments.**

  In `seedDefaultPlans_`, keep `PLAN-FIRST-60` but rename it to `Seance ciblee` with one 65 $ credit-free session. Add this active pack:

  ```js
  {
    plan_id: "PLAN-PACK4-250",
    plan_type: "pack",
    name: "Bloc d'elan - 4 seances",
    description: "Quatre seances de 60 minutes pour reprendre le fil pendant environ un mois; la cadence est choisie apres le jumelage.",
    status: "active",
    session_count: "4",
    price_cad: "250",
    unit_price_cad: "62.5",
    cadence: "one_time",
    cancellation_notice_hours: String(PLAN_MODIFICATION_NOTICE_HOURS),
    validity_days: "120",
    eligible_session_types: "weekly_follow_up",
    billing_mode: "future_stripe",
    notes: "Un paiement de 250 $. Apres paiement verifie, quatre credits sont accordes une seule fois. Aucun renouvellement automatique.",
  }
  ```

  Keep `PLAN-PACK10-600`, update its name to `Bloc de progression - 10 seances`, set `billing_mode` to `future_stripe`, and preserve its 600 $, 60 $ per session, 180-day validity, and two groups of five credits. Retain the existing archive-only weekly and targeted legacy plan rows. Add a compatibility migration only for untouched built-in rows, exactly as the current seed function does; never rewrite a custom plan or a live enrollment.

- [ ] **Step 3: Update operational templates and sample rows.**

  Add one 250 $ payment-link row for `momentum_block_payment_1` and rename the two existing 300 $ progression rows to the canonical progression payment codes. Add matching payment sample rows with empty `session_id`, the canonical offer code, and a note specifying four credits or five credits after verified payment. Update `ops/crm/README.md` and `docs/growth-playbook.md` with the 65/250/600 ladder and the rule that cadence is not a product.

- [ ] **Step 4: Perform a compatibility smoke test in a copy of the CRM spreadsheet.**

  Deploy `Code.gs` to a non-production Apps Script deployment connected to a copied spreadsheet, run `setupCrm`, and verify:

  1. `Plans` contains active `PLAN-FIRST-60`, `PLAN-PACK4-250`, and `PLAN-PACK10-600` rows;
  2. no active plan has `plan_type = weekly`;
  3. an existing enrollment referencing `PLAN-PACK10-600` remains untouched;
  4. a lead with `offer_recommended = weekly_follow_up_10` is stored as `progression_block`;
  5. a lead with `offer_recommended = momentum_block` is stored unchanged.

- [ ] **Step 5: Commit the CRM catalogue migration.**

  ```powershell
  git add -- ops/crm/google-apps-script/Code.gs ops/crm/payment-links-template.csv ops/crm/payments-template.csv ops/crm/README.md docs/growth-playbook.md
  git commit -m "feat: add momentum block to CRM catalogue"
  ```

### Task 5: Make verified package payments grant credits exactly once

**Files:**
- Modify: `ops/crm/google-apps-script/Code.gs`
- Modify: `src/lib/portalClient.js`
- Modify: `api/portal.js`
- Modify: `vite.config.js`
- Modify: `src/pages/Portal.jsx`
- Test: `scripts/check-static-site.mjs`

**Interfaces:**
- New operator action: `portal_create_plan_payment_request`.
- Request payload: `{ token, enrollment_id, payment_stage }`, where `payment_stage` is `momentum_initial`, `progression_initial`, or `progression_midpoint`.
- Payment row fields: `plan_enrollment_id` and `credit_grant_count`.
- Credit ledger field: `source_payment_id`; a grant with the same source payment is idempotent.

- [ ] **Step 1: Add persistent linkage fields without moving legacy spreadsheet data.**

  In `Code.gs`, append `plan_enrollment_id` and `credit_grant_count` to the **end** of `PAYMENT_COLUMNS`. Append `source_payment_id` to the **end** of `CREDIT_LEDGER_COLUMNS`. Do not insert either field between existing columns: `setupStructuredSheet_`, `getSheetRecordsFromSheet_`, and `writeRecord_` currently map these sheets by column position.

  Extend `sanitizeCreditLedgerForPortal_` with `source_payment_id` and ensure `appendCreditLedgerEntry_` writes it. The existing headers and values stay in their exact positions; `setupStructuredSheet_` only appends the new header cells. Do not change or delete pre-existing payment or ledger rows.

- [ ] **Step 2: Define the one authoritative payment-stage resolver.**

  Add this pure Apps Script helper:

  ```js
  function getPlanPaymentStage_(planId, paymentStage) {
    const stages = {
      "PLAN-PACK4-250": {
        momentum_initial: { offer: "momentum_block_payment_1", amount_cad: "250", credit_grant_count: 4 },
      },
      "PLAN-PACK10-600": {
        progression_initial: { offer: "progression_block_payment_1", amount_cad: "300", credit_grant_count: 5 },
        progression_midpoint: { offer: "progression_block_payment_2", amount_cad: "300", credit_grant_count: 5 },
      },
    };
    return stages[normalizeValue_(planId)]?.[normalizeValue_(paymentStage)] || null;
  }
  ```

  Add `createPortalPlanPaymentRequest_`. It must verify an operator session, load the enrollment and plan, resolve the stage, find the active configured payment link, and use a script lock. Under the lock, return the existing non-waived payment if that enrollment and offer already have one; otherwise append a payment row with the enrollment ID, exact credit grant count, parent information, payment URL, `payment_requested`, and no `session_id`. Update the enrollment to `billing_status: "payment_pending"`, email the payment request, and return the sanitized payment.

  The midpoint stage is allowed only for `PLAN-PACK10-600` after the first five credits have been reserved or consumed. The helper must otherwise return `PLAN_PAYMENT_STAGE_NOT_READY`.

- [ ] **Step 3: Grant credits from the verified payment, not from a checkbox.**

  Add `grantCreditsForPaidPlanPayment_` and call it from `markPortalPaymentPaidFromWebhook_` after the payment row is updated. The helper must:

  ```js
  function grantCreditsForPaidPlanPayment_(spreadsheet, payment) {
    const enrollmentId = normalizeValue_(payment.plan_enrollment_id);
    const creditCount = normalizeCreditAmount_(payment.credit_grant_count);
    if (!enrollmentId || creditCount <= 0) return { granted: false, skipped: true };

    const enrollment = findSheetRecordById_(
      getOrCreateSheet_(spreadsheet, CRM_PLAN_ENROLLMENT_SHEET_NAME),
      PLAN_ENROLLMENT_COLUMNS,
      "enrollment_id",
      enrollmentId,
    );
    if (!enrollment) return { granted: false, code: "PLAN_PAYMENT_ENROLLMENT_NOT_FOUND" };

    const alreadyGranted = getSheetRecords_(spreadsheet, CRM_CREDIT_LEDGER_SHEET_NAME, CREDIT_LEDGER_COLUMNS)
      .some((entry) => normalizeValue_(entry.source_payment_id) === normalizeValue_(payment.payment_id));
    if (alreadyGranted) return { granted: false, already_granted: true };

    const ledger = appendCreditLedgerEntry_(spreadsheet, {
      enrollment_id: enrollment.data.enrollment_id,
      plan_id: enrollment.data.plan_id,
      parent_email: enrollment.data.parent_email,
      student_id: enrollment.data.student_id,
      source_payment_id: payment.payment_id,
      entry_type: "grant",
      available_delta: creditCount,
      reason: `Credits granted after verified payment ${payment.payment_id}.`,
      expires_at: enrollment.data.expires_at,
    });
    return { granted: true, ledger };
  }
  ```

  Execute the payment update and this helper inside one script lock. A retry for an already-paid Stripe Checkout session must still call the helper, allowing recovery if the original process stopped after payment status changed but before ledger insertion. After a successful grant, set the enrollment `status` to `active` and `billing_status` to `credited`.

- [ ] **Step 4: Expose the operator action through every client boundary.**

  In `src/lib/portalClient.js`, export:

  ```js
  export async function createPortalPlanPaymentRequest({ token, enrollmentId, paymentStage }) {
    return portalRequest({
      action: "portal_create_plan_payment_request",
      token,
      enrollment_id: enrollmentId,
      payment_stage: paymentStage,
    })
  }
  ```

  Add the exact action string to the allowlists in `api/portal.js` and `vite.config.js`, and add the matching `case` in the Apps Script action router. The static check's production/development parity test must continue to pass.

- [ ] **Step 5: Replace manual payment-credit activation in the operator panel.**

  In `PlanEnrollmentPanel` in `src/pages/Portal.jsx`:

  1. create the package enrollment with `status: "pending"`, no `initial_credits`, and no `payment_verified` flag;
  2. call `createPortalPlanPaymentRequest` with `momentum_initial` or `progression_initial` immediately after a successful enrollment;
  3. display the returned payment request and tell the operator that Stripe verification activates credits automatically;
  4. replace the old second-credit adjustment wording with a `progression_midpoint` payment-request button available only when the dashboard reports that the first five credits are fully reserved or used;
  5. retain `adjustPortalPlanCredits` only as an explicitly labelled exceptional manual correction requiring a non-empty reason.

  Update all French and English panel text. The panel must say `Bloc d'élan` / `Momentum block` and `Bloc de progression` / `Progress block`; it must not call a package a weekly plan.

- [ ] **Step 6: Verify the payment lifecycle in the copied CRM environment.**

  In the copied spreadsheet and test Stripe mode, verify:

  1. a momentum enrollment produces one 250 $ payment request and no credit before payment;
  2. one completed checkout grants exactly four credits and activates the enrollment;
  3. replaying the same webhook leaves the balance at four credits;
  4. a progression enrollment produces an initial 300 $ payment, grants five credits after checkout, and permits the midpoint request only after all first credits are reserved or consumed;
  5. the midpoint checkout grants exactly five more credits, and a replay does not duplicate them;
  6. a session covered by a package credit does not create a per-session payment row.

- [ ] **Step 7: Run the complete local suite.**

  Run: `npm.cmd run test:site`

  Expected: the pricing check, Vite build, route validation, and production/development portal-action parity all pass.

- [ ] **Step 8: Commit the idempotent payment lifecycle.**

  ```powershell
  git add -- ops/crm/google-apps-script/Code.gs src/lib/portalClient.js api/portal.js vite.config.js src/pages/Portal.jsx
  git commit -m "feat: grant package credits from verified payments"
  ```

### Task 6: Align the parent portal and payment-link setup with the package catalogue

**Files:**
- Modify: `src/pages/Portal.jsx`
- Modify: `src/lib/pricing.js`
- Modify: `ops/crm/google-apps-script/Code.gs`
- Test: `scripts/check-pricing-packages.mjs`

**Interfaces:**
- Parent views derive the plan name, total, per-session price, and credit count from the enrolled `plan_id`, not from `weeklyFollowUp` aliases.
- Operator payment-link setup lists only current session links and canonical package payment-link codes.

- [ ] **Step 1: Add a failing portal-source assertion.**

  Add this to `scripts/check-pricing-packages.mjs`:

  ```js
  const portalSource = await fs.readFile(new URL("../src/pages/Portal.jsx", import.meta.url), "utf8")
  assert.doesNotMatch(portalSource, /Séance Déclic|Déclic \/ one-off session/)
  assert.match(portalSource, /momentum_block_payment_1/)
  assert.match(portalSource, /progression_block_payment_2/)
  ```

- [ ] **Step 2: Run the check to verify it fails.**

  Run: `npm.cmd run check:pricing`

  Expected: an assertion error because the portal still uses the old offer names and payment-link list.

- [ ] **Step 3: Centralize portal display metadata.**

  Add a `planId` field to the relevant `pricing.offers` records:

  ```js
  targeted_session: {
    planId: "PLAN-FIRST-60",
    sessionCount: 1,
    totalPriceCad: 65,
    perSessionPriceCad: 65,
    durationMinutes: 60,
    installmentCount: 1,
    installmentPriceCad: 65,
    autoRenewal: false,
  }
  momentum_block: {
    planId: "PLAN-PACK4-250",
    sessionCount: 4,
    totalPriceCad: 250,
    perSessionPriceCad: 62.5,
    durationMinutes: 60,
    installmentCount: 1,
    installmentPriceCad: 250,
    autoRenewal: false,
  }
  progression_block: {
    planId: "PLAN-PACK10-600",
    sessionCount: 10,
    totalPriceCad: 600,
    perSessionPriceCad: 60,
    durationMinutes: 60,
    installmentCount: 2,
    installmentPriceCad: 300,
    autoRenewal: false,
  }
  ```

  Add this helper, then use it in `Portal.jsx` for the parent rhythm/program cards, `getDefaultSessionPriceCad`, and the payment-link form. The 10-session aliases remain only as compatibility fallbacks when the CRM dashboard has historical data without a known plan ID.

  ```js
  export function getOfferByPlanId(planId) {
    const matchedCode = Object.entries(publicOffers)
      .find(([, offer]) => offer.planId === planId)?.[0]
    return matchedCode ? getOffer(matchedCode) : null
  }
  ```

- [ ] **Step 4: Update package and payment presentation.**

  Make `PaymentLinkForm` offer these package link codes in addition to ordinary session types:

  ```js
  [
    "first_session",
    "weekly_follow_up",
    "exam_sprint",
    "catch_up",
    "one_time",
    "momentum_block_payment_1",
    "progression_block_payment_1",
    "progression_block_payment_2",
  ]
  ```

  Render their default amounts from `pricing`, not hand-written numbers. In parent payment rows, display the localized offer label and whether payment unlocks four credits, the first five progression credits, or the final five progression credits. Do not expose operational payment-code strings to parents.

- [ ] **Step 5: Run checks and perform a visual portal pass.**

  Run: `npm.cmd run test:site`

  Expected: all automated checks pass.

  Then start the local app with `npm.cmd run dev`, open `/portail`, and inspect French and English views at desktop and mobile widths. Confirm that the parent sees the actual purchased block and remaining credits, while an operator can set up all three package payment paths without a weekly subscription label.

- [ ] **Step 6: Commit the portal catalogue alignment.**

  ```powershell
  git add -- src/pages/Portal.jsx src/lib/pricing.js ops/crm/google-apps-script/Code.gs scripts/check-pricing-packages.mjs
  git commit -m "feat: align portal with tutoring package catalogue"
  ```

### Task 7: Complete operational documentation and release verification

**Files:**
- Modify: `ops/crm/parent-tutor-portal.md`
- Modify: `ops/crm/scheduling-and-payments.md`
- Modify: `ops/crm/templates/payment-request.md`
- Modify: `ops/crm/templates/weekly-follow-up-payment-request.md`
- Modify: `ops/crm/templates/callback-script.md`
- Modify: `ops/crm/templates/no-response-follow-up.md`
- Modify: `ops/paperclip/templates/community-reply-en.md`
- Modify: `docs/growth-playbook.md`

**Interfaces:**
- Operations staff can identify which payment link to send, when credits are granted, and how a family can choose a weekly time without joining a subscription.

- [ ] **Step 1: Replace legacy operating instructions.**

  Document this exact operating sequence in French and English where the document has a mirror:

  1. Match the tutor and confirm a realistic time.
  2. Record the selected offer: targeted session, momentum block, or progress block.
  3. For a package, create the pending enrollment and payment request in the operator portal.
  4. Let Stripe or the verified payment workflow grant the associated credits automatically.
  5. Offer a weekly or biweekly time only as a scheduling preference after matching.
  6. Never describe the package as an auto-renewing subscription or grant credits before verified payment.

  Replace the weekly payment-request template with a progression-block template but keep the filename as a compatibility alias if external processes reference it.

- [ ] **Step 2: Run repository-wide pricing audit.**

  Run:

  ```powershell
  rg -n 'Séance Déclic|Déclic / one-off session|weekly follow-up package|weekly_follow_up_10' src ops docs
  ```

  Expected: only explicitly documented historical aliases, route compatibility, or code comments remain. Every remaining occurrence must be labelled as legacy/internal; no current parent-facing copy may remain.

- [ ] **Step 3: Run release checks.**

  Run: `git diff --check`

  Expected: no whitespace errors.

  Run: `npm.cmd run test:site`

  Expected: pricing contract, production build, and static checks all pass.

- [ ] **Step 4: Verify production-safe CRM deployment preparation.**

  Before deploying the Apps Script change, compare the live `Plans`, `Plan Enrollments`, `Payments`, and `Credit Ledger` sheets with their copied test-sheet headers. Confirm that the new columns are added by the setup migration and that no row values were reordered or removed. Only then deploy the Apps Script version and configure the three Stripe Payment Links.

- [ ] **Step 5: Commit the operations handoff.**

  ```powershell
  git add -- ops/crm/parent-tutor-portal.md ops/crm/scheduling-and-payments.md ops/crm/templates/payment-request.md ops/crm/templates/weekly-follow-up-payment-request.md ops/crm/templates/callback-script.md ops/crm/templates/no-response-follow-up.md ops/paperclip/templates/community-reply-en.md docs/growth-playbook.md
  git commit -m "docs: update package payment operations"
  ```
