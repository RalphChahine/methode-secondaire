# Reference-Led Méthode Secondaire Brand Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Keep each task small, test it before moving on, and pause at the portal product/privacy gate.

**Goal:** Reposition the existing Méthode Secondaire product around the supplied reference direction while preserving every working route, conversion flow, portal contract, and truthful data boundary.

**Architecture:** Add a layered reference-led marketing system on top of the current React/Vite application. New visual primitives will use dedicated brand tokens and Framer Motion, while legacy notebook styles remain available until each route is migrated. Marketing pages are migrated in a measured order; the parent/tutor/operator portal remains functionally unchanged and receives a visual shell migration only after the public home is validated. A student portal is specified as an invite-only, privacy-gated product slice rather than inferred from parent records.

**Tech Stack:** React 18, Vite, React Router, Tailwind CSS, Radix/shadcn primitives, Framer Motion, Vitest/Node contract tests, Playwright/browser screenshots, existing Apps Script/Stripe/Google Calendar integrations.

## Handoff checkpoint — 2026-08-02

- Reference-led tokens, marketing frame, home, Maths, Sciences, secondary public routes, and parent portal entry shell are implemented on `codex/reference-led-redesign`.
- The public UI uses only project-backed pricing/content; the supplied mockup's fictional tutors, reviews, grades, prices, savings, and student data were not copied.
- QA captures are committed under `qa/*-activated.png` for 1440 px and 390 px. Captures scroll through each page first so one-time reveal animations are visible.
- Automated evidence: 13 focused reference tests, site/pricing/build/static checks, 166 routes checked and 136 prerendered, no horizontal overflow or missing images in the capture sweep.
- The student portal is intentionally not implemented yet. Luna must first obtain an owner decision on identity, parent consent, retention, visible fields, one-time-code/parent-mediated access, and audit logging; no student role or personal data is invented in this checkpoint.

## Global Constraints

- The supplied image is a visual reference, not a source of facts. Never copy its tutor names, photos, ratings, review counts, universities, testimonials, grades, savings, prices, times, or student names.
- Only use data already exposed by the project. Missing production data stays absent or is represented by a code-level placeholder that cannot render as a fake public fact.
- Canonical pricing remains the values in `src/lib/pricing.js`: 65 CAD single session, 250 CAD four-session block, 600 CAD ten-session block; 72-hour cancellation notice.
- Preserve all existing routes, forms, payment/webhook contracts, role authorization, material upload rules, and language switching.
- Keep `src/Portal.jsx`, `src/lib/portalClient.js`, `api/portal.js`, and Apps Script contracts behaviorally stable while visual work is in progress.
- Use Manrope Variable for display text and Inter Variable for body text in new surfaces. Keep legacy font variables/classes until their callers are migrated.
- New motion must use opacity/transform, be subtle, and honor `prefers-reduced-motion: reduce`. No video backgrounds and no permanent mobile floating animation.
- Validate at 360, 390, 768, 1024, and 1440 CSS pixels. Reject horizontal overflow and unreadably small text.
- Every visual task must have a failing contract test first, then implementation, then focused and regression tests.
- Do not commit or reset unrelated work from the main checkout. Work only in `.worktrees/reference-led-redesign` on branch `codex/reference-led-redesign`.

---

## Task 1: Establish the reference-led design-system contract

**Files:** `src/index.css`, `tailwind.config.js`, `package.json`, `package-lock.json`, `test/reference-led-visual-system.test.mjs`

- [ ] Add a contract test that asserts the navy/blue/gold/green/surface/text tokens, card/panel/pill radii, diffused blue shadows, Manrope/Inter declarations, and reduced-motion rule.
- [ ] Run the contract test and verify it fails for the current notebook-only tokens.
- [ ] Add the new `--brand-*`, `--surface-*`, `--text-*`, `--border-soft`, `--radius-*`, and `--shadow-*` tokens without deleting legacy tokens.
- [ ] Add Manrope Variable and Inter Variable declarations/imports for the new system.
- [ ] Declare the already-installed `framer-motion` dependency explicitly and update the lockfile.
- [ ] Extend Tailwind aliases only where they point at CSS variables; avoid changing generated utility semantics.
- [ ] Run the contract test, `npm.cmd run test:site`, and a production build; commit the isolated task.

## Task 2: Replace the shared marketing frame and navigation

**Files:** `src/components/marketing/MarketingHeader.jsx`, `src/components/marketing/MarketingFooter.jsx`, `src/layouts/SiteLayout.jsx`, `src/index.css`, `test/reference-led-navigation.test.mjs`

- [ ] Write tests for desktop navigation labels/links, sign-in and request-session actions, fixed-on-scroll behavior, mobile menu semantics, FR/EN preservation, and portal route protection.
- [ ] Implement a dark navy integrated header with a compact blue CTA, bordered sign-in action, semantic mobile disclosure, and a reduced-height blurred scrolled state.
- [ ] Keep `LanguageToggle`, analytics/conversion links, portal detection, and assistant widget behavior intact.
- [ ] Implement the matching navy footer with real contact/legal links only and no invented social proof.
- [ ] Verify keyboard focus, Escape-to-close, active link state, and no layout shift at 390 px.

## Task 3: Build and validate the reference-led home page

**Files:** `src/components/marketing/MarketingHero.jsx`, `src/components/marketing/BenefitStrip.jsx`, `src/components/marketing/TutorCard.jsx`, `src/components/marketing/PricingPanel.jsx`, `src/components/marketing/MethodSteps.jsx`, `src/components/marketing/TestimonialPanel.jsx`, `src/components/marketing/SafePortalPreview.jsx`, `src/pages/Accueil.jsx`, `src/pages/AccueilEn.jsx`, `test/reference-led-home.test.mjs`

- [ ] Add a failing test that protects the reference composition: dark hero, blue emphasis line, three truthful arguments, two CTAs, benefit strip, tutor/method/pricing/testimonial/portal sections, and absence of unverified facts.
- [ ] Replace only the home marketing composition first; keep existing conversion and data helpers as the source of truth.
- [ ] Use a real CRM tutor profile only when `tutorPublicProfiles.js` returns active/published/consented data; otherwise render an honest request CTA or neutral placeholder.
- [ ] Render canonical prices from `pricing.js`; do not copy mockup pricing, savings, rating, or review counts.
- [ ] Use Framer Motion stagger for hero text, one-time section reveals, restrained desktop floating cards, and reduced-motion fallbacks.
- [ ] Keep portal preview data synthetic and explicitly labeled as a preview; never expose personal data.
- [ ] Run focused tests and capture 1440/390 screenshots for visual comparison before migrating more routes.

## Task 4: Give Maths and Sciences distinct subject identities

**Files:** `src/components/marketing/SubjectHero.jsx`, `src/components/marketing/AnimatedGraph.jsx`, `src/components/marketing/ScientificDiagram.jsx`, `src/pages/Maths.jsx`, `src/pages/Sciences.jsx`, `test/reference-led-subjects.test.mjs`

- [ ] Add tests proving Maths and Sciences do not share the same hero visual, preserve real curriculum/content links, and respect reduced motion.
- [ ] Implement a Maths hero with grid/axes/equation styling and SVG path drawing.
- [ ] Implement a Sciences hero with circuit/diagram/vector styling and SVG path drawing.
- [ ] Reuse the brand primitives without flattening both subjects into one template.
- [ ] Verify mobile composition at 390 px and test that graphs do not overflow.

## Task 5: Migrate secondary marketing families without route regressions

**Files:** `src/pages/NotreApproche.jsx`, `src/pages/ParentTrust.jsx`, `src/pages/Temoignages.jsx`, `src/pages/CaseStudies.jsx`, `src/pages/Tuteurs.jsx`, `src/pages/LocalLanding.jsx`, `src/pages/OfferLanding.jsx`, `src/pages/ResourcesHub.jsx`, `src/pages/ResourceArticle.jsx`, `src/pages/BlogHub.jsx`, `src/pages/BlogArticle.jsx`, `src/pages/Secondary4MathTheory.jsx`, `src/pages/Secondary4MathConcept.jsx`, `test/reference-led-secondary-routes.test.mjs`

- [ ] Snapshot route/link coverage before visual edits and write regression assertions for language variants, resource/blog/article links, local landing forms, and canonical offers.
- [ ] Migrate each family to the tokens and card hierarchy in small batches, keeping content data modules untouched.
- [ ] Ensure composite/anonymized case studies are labeled as such and never presented as verified testimonials or grade guarantees.
- [ ] Preserve SEO metadata, structured data, canonical URLs, and request-session conversion tracking.
- [ ] Run the full site suite after each batch.

## Task 6: Restyle the parent portal shell while protecting behavior

**Files:** `src/components/portal/PortalShell.jsx`, `src/components/portal/parent/*`, `src/components/portal/shared/*`, `src/Portal.jsx`, `test/reference-led-parent-portal.test.mjs`

- [ ] Add contract tests around role selection, email-code auth, session booking/rescheduling, messaging, material upload constraints, release notes, and logout.
- [ ] Keep API payloads, storage keys, authorization checks, and error codes unchanged.
- [ ] Apply the visual system to a desktop navy sidebar/white workspace and a mobile bottom navigation, with clear loading/error/empty states.
- [ ] Keep student names, schedules, grades, notes, and files bound to authenticated responses only; use skeletons rather than invented demo records.
- [ ] Run `npm.cmd run test:portal`, the material UI regression suite, and keyboard/mobile smoke tests. Treat any baseline failure as a separately documented issue.

## Task 7: Decide and implement an invite-only student portal (gated product work)

**Files:** `src/StudentPortal.jsx`, `src/components/portal/student/*`, `src/lib/portalNavigation.js`, `src/lib/portalClient.js`, `api/portal.js`, Apps Script API, `test/student-portal-contract.test.mjs`, privacy/PIA documentation

- [ ] Before coding auth or storage, document an owner decision on student identity, parent consent, retention, messaging visibility, and whether the student uses a one-time code or parent-mediated access.
- [ ] Add failing tests for invite-only access, server-side role authorization, sanitized DTOs, no billing/parent/internal-note leakage, and audit logging.
- [ ] Implement only after that decision: Today, Sessions, My Plan, Help; show assigned work and released feedback, never private parent/tutor/operator notes.
- [ ] Make every student-facing message and file action traceable to the authenticated student/parent relationship.
- [ ] Verify Quebec privacy obligations before production launch; document the result and rollback plan.

## Task 8: Bring tutor/operator views into visual alignment

**Files:** `src/components/portal/tutor/*`, `src/components/portal/operator/*`, shared portal primitives, focused tests

- [ ] Preserve tutor schedule, student roster, notes, messaging, operator calendar/inbox/payment workflows.
- [ ] Apply tokens, contrast, focus states, density, and responsive navigation without changing business rules.
- [ ] Run portal, operator, and collection-contract suites together.

## Task 9: Performance, accessibility, SEO, and final visual QA

**Files:** relevant image assets, `src/index.html`/metadata helpers, `scripts/*`, QA docs

- [ ] Convert approved imagery to WebP/AVIF with intrinsic dimensions, lazy-load below-fold assets, and avoid video backgrounds.
- [ ] Run accessibility checks (keyboard, landmarks, labels, contrast, reduced motion), production build, and route/link/static checks.
- [ ] Capture 1440 and 390 screenshots for home, Maths, Sciences, parent portal, and—if approved—student portal; compare beside the supplied reference.
- [ ] Record remaining deviations, regression risks, bundle metrics, and rollback instructions.
- [ ] Use `superpowers:verification-before-completion` before claiming completion; use `superpowers:finishing-a-development-branch` to present merge/PR options.

## Verification Commands

Run from `methode-secondaire` (or the isolated worktree):

```powershell
npm.cmd run test:site
npm.cmd run test:payments
npm.cmd run test:portal
npm.cmd run build
npm.cmd run lint
```

For new focused contracts, run the exact Node/Vitest file first, then the related suite. Do not treat a green focused test as evidence that unrelated portal or route behavior is intact.
