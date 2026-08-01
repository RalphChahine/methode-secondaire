# Living Notebook Art Direction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-art-direct the public Méthode Secondaire website as “The Living Notebook”: warm editorial surfaces, deep ink, expressive academic graphics, tactile buttons, and purposeful motion while preserving routes, content, bilingual behavior, business rules, accessibility, and portal functionality.

**Architecture:** Keep the existing React/Vite route structure and shared marketing components. Establish the visual system centrally in `src/index.css`, expose reusable button and art-direction primitives, then apply page-specific compositions without replacing the existing data or conversion contracts. The authenticated portal receives only shared token/focus/button improvements; its information architecture and business logic remain unchanged.

**Tech Stack:** React 18, Vite, Tailwind CSS, Radix UI primitives, Lucide React, Node’s built-in test runner, CSS/SVG/IntersectionObserver for motion, browser visual verification at desktop and mobile sizes.

## Global Constraints

- Preserve all existing public routes, localized paths, SEO metadata, form behavior, pricing, tracking, and portal APIs.
- Do not add a large animation dependency; use CSS, SVG stroke animation, transforms, opacity, and existing IntersectionObserver patterns.
- Keep `prefers-reduced-motion` complete and visually intentional.
- No stock photography, invented testimonials, autoplay video, scroll hijacking, custom cursor, or perpetual particle animation.
- Maintain WCAG AA contrast, visible keyboard focus, and minimum 44px touch targets.
- Keep mobile request actions suppressed on focused request/thank-you routes as current tests require.
- All production code changes must be preceded by a failing test or source-level contract test.

---

### Task 1: Establish the Living Notebook visual tokens

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`
- Test: `test/visual-system.test.mjs`

**Interfaces:**
- Produces CSS variables for ink, paper, cobalt, sun, coral, mint, display/body/editorial fonts, motion timings, and easing curves.
- Keeps existing utility names (`section-shell`, `panel-ink`, `panel-soft`, `panel-gold`, `motion-card-interactive`) as compatibility aliases while changing their visual treatment.

- [ ] **Step 1: Write the failing token contract test**

Create `test/visual-system.test.mjs` that reads `src/index.css` and asserts the new palette and typography tokens exist, the old all-dark background is no longer the only body treatment, and reduced-motion rules remain present.

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("Living Notebook palette and typography tokens are defined centrally", async () => {
  const source = await readFile(new URL("../src/index.css", import.meta.url), "utf8")
  for (const token of ["--color-ink", "--color-paper", "--color-cobalt", "--color-sun", "--color-coral", "--color-mint", "--font-display", "--font-sans"]) {
    assert.match(source, new RegExp(token.replaceAll("-", "\\-")))
  }
  assert.match(source, /Bricolage Grotesque/)
  assert.match(source, /prefers-reduced-motion: reduce/)
})
```

- [ ] **Step 2: Run the test and verify it fails for the missing tokens**

Run: `node --test test/visual-system.test.mjs`

Expected: FAIL because the new Living Notebook tokens and Bricolage Grotesque are not yet defined.

- [ ] **Step 3: Implement the central token system**

Replace the current `:root` font and colour definitions in `src/index.css` with the Living Notebook values: `#071A33` ink, `#F6F1E7` paper, `#315CFF` cobalt, `#FFD166` sun, `#FF6B57` coral, `#BFEFD2` mint, and a neutral cloud blue. Set the body to a paper-first canvas with dark ink sections available through explicit utility classes. Import Bricolage Grotesque, Manrope, and Instrument Serif. Keep the existing motion variables and add `--motion-signature: 900ms` plus `--ease-notebook: cubic-bezier(0.22, 1, 0.36, 1)`.

Add utilities for `.notebook-paper`, `.notebook-ink`, `.notebook-grid`, `.annotation-line`, `.editorial-label`, and `.notebook-reveal`. Change glass surfaces from stacked translucent blue cards to flatter paper/ink panels with borders and restrained shadows. Keep the reduced-motion block and make `.notebook-reveal` visible immediately when motion is reduced.

Extend `tailwind.config.js` with named colours mapped to the CSS variables so page classes do not duplicate hex values.

- [ ] **Step 4: Run the focused test and the existing motion contract**

Run: `node --test test/visual-system.test.mjs test/motion-system.test.mjs`

Expected: PASS with no failures.

- [ ] **Step 5: Commit the foundation**

```bash
git add src/index.css tailwind.config.js test/visual-system.test.mjs
git commit -m "feat: establish living notebook visual tokens"
```

### Task 2: Build tactile buttons and shared interaction states

**Files:**
- Modify: `src/components/ui/button.jsx`
- Modify: `src/components/SimpleMarketingSections.jsx`
- Modify: `src/layouts/SiteLayout.jsx`
- Test: `test/button-system.test.mjs`

**Interfaces:**
- `Button` retains its current props (`variant`, `size`, `asChild`, `className`) and adds only style variants, not new business behavior.
- `ActionButton` continues to emit `data-primary-action` for the sticky mobile action observer.

- [ ] **Step 1: Write the failing button contract test**

Create a source contract test that asserts the shared button variants include primary, outline, link, focus, pressed, and disabled states, and that the marketing action helper still marks only the primary action.

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("shared buttons expose tactile Living Notebook states", async () => {
  const button = await readFile(new URL("../src/components/ui/button.jsx", import.meta.url), "utf8")
  const marketing = await readFile(new URL("../src/components/SimpleMarketingSections.jsx", import.meta.url), "utf8")
  assert.match(button, /active:translate-y|active:scale/)
  assert.match(button, /focus-visible:ring/)
  assert.match(button, /disabled:pointer-events-none/)
  assert.match(marketing, /data-primary-action/)
  assert.match(marketing, /notebook-button-primary/)
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test test/button-system.test.mjs`

Expected: FAIL because the new shared classes are not present.

- [ ] **Step 3: Implement the button variants**

In `button.jsx`, keep the existing CVA API but replace generic `transition-colors` styling with named classes for `notebook-button-primary`, `notebook-button-secondary`, `notebook-button-ghost`, and icon sizing. Add explicit `active` and `focus-visible` states. In `SimpleMarketingSections.jsx`, make `ActionButton` use the primary class for default actions and the secondary class for outlines; add a trailing arrow wrapper when `action.trailing` is true.

In `SiteLayout.jsx`, update the header request button, mobile request icon, language toggle, sheet links, and sticky action to use the shared visual classes. Preserve route URLs and the existing `suppressMobileAction` logic.

- [ ] **Step 4: Run focused tests and existing layout tests**

Run: `node --test test/button-system.test.mjs test/site-layout.test.mjs test/conversion-links.test.mjs`

Expected: PASS with no failures.

- [ ] **Step 5: Commit the button system**

```bash
git add src/components/ui/button.jsx src/components/SimpleMarketingSections.jsx src/layouts/SiteLayout.jsx test/button-system.test.mjs
git commit -m "feat: add tactile shared button states"
```

### Task 3: Add reusable notebook artwork and motion primitives

**Files:**
- Create: `src/components/art/NotebookIllustration.jsx`
- Create: `src/components/art/NotebookReveal.jsx`
- Modify: `src/index.css`
- Test: `test/notebook-art.test.mjs`

**Interfaces:**
- `NotebookIllustration({ variant = "clarity", className = "", reducedLabel })` returns decorative SVG with `aria-hidden="true"` unless an accessible label is passed.
- `NotebookReveal({ children, className = "" })` wraps a block with the `.notebook-reveal` class and uses IntersectionObserver only when available.

- [ ] **Step 1: Write failing primitive contract tests**

Assert both files exist, the illustration contains the three supported variants (`clarity`, `math`, `science`), and the reveal primitive contains the reduced-motion fallback.

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("notebook art primitives expose bounded variants and reduced-motion fallback", async () => {
  const illustration = await readFile(new URL("../src/components/art/NotebookIllustration.jsx", import.meta.url), "utf8")
  const reveal = await readFile(new URL("../src/components/art/NotebookReveal.jsx", import.meta.url), "utf8")
  assert.match(illustration, /clarity/)
  assert.match(illustration, /math/)
  assert.match(illustration, /science/)
  assert.match(reveal, /IntersectionObserver/)
  assert.match(reveal, /notebook-reveal/)
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test test/notebook-art.test.mjs`

Expected: FAIL because the primitives do not exist.

- [ ] **Step 3: Implement the SVG and reveal primitives**

Build one compact inline SVG with graph lines, a loose path, highlighted marks, and a resolved route. Use variant-specific colour classes rather than separate duplicated SVGs. Keep it decorative and dependency-free. Implement `NotebookReveal` with a single observer per mounted block, a one-time `is-visible` class, and immediate visibility if `prefers-reduced-motion` is active or IntersectionObserver is unavailable.

- [ ] **Step 4: Run focused tests and motion tests**

Run: `node --test test/notebook-art.test.mjs test/motion-system.test.mjs`

Expected: PASS with no failures.

- [ ] **Step 5: Commit the art primitives**

```bash
git add src/components/art src/index.css test/notebook-art.test.mjs
git commit -m "feat: add notebook illustration and reveal primitives"
```

### Task 4: Recompose the shared marketing hero and navigation

**Files:**
- Modify: `src/components/SimpleMarketingSections.jsx`
- Modify: `src/layouts/SiteLayout.jsx`
- Modify: `src/pages/Accueil.jsx`
- Test: `test/marketing-visual-system.test.mjs`

**Interfaces:**
- `HeroShowcase` keeps its current props and route consumers; the visual composition changes internally.
- `SiteLayout` keeps the same navigation destinations, language switch, portal link, recruitment link, and sticky-action behavior.

- [ ] **Step 1: Write failing marketing composition tests**

Assert the shared hero uses notebook primitives, no longer requires `section-shell noise-overlay` as its only presentation, and the homepage consumes a `NotebookIllustration` variant.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test test/marketing-visual-system.test.mjs`

Expected: FAIL because the current hero is still the repeated glass-panel layout.

- [ ] **Step 3: Implement the compositions**

Refactor `HeroShowcase` into three internal compositions: `EditorialHero`, `FormHero`, and `JourneyHero`, selected by the existing props. `EditorialHero` uses an asymmetric paper canvas, a dark ink illustration block, a maximum of two actions, and a visible annotation line. `FormHero` keeps the form contract but brings the first field higher on mobile and removes nested glass-on-glass treatment. `JourneyHero` uses a vertical path and one featured proof artifact.

Update `SiteLayout` to use a quieter ink header, better spacing, and a full-height mobile sheet with annotation-line link treatment. Keep the same route links; only adjust visual grouping and hierarchy.

Update `Accueil.jsx` to pass the `clarity` illustration and use the flagship editorial hero. Keep existing pricing, proof, FAQ, and tracking data.

- [ ] **Step 4: Run route/link/layout tests**

Run: `node --test test/marketing-visual-system.test.mjs test/conversion-links.test.mjs test/site-layout.test.mjs`

Expected: PASS with no failures.

- [ ] **Step 5: Commit the shared composition**

```bash
git add src/components/SimpleMarketingSections.jsx src/layouts/SiteLayout.jsx src/pages/Accueil.jsx test/marketing-visual-system.test.mjs
git commit -m "feat: recompose marketing hero and navigation"
```

### Task 5: Apply page-specific art direction to public journeys

**Files:**
- Modify: `src/pages/Maths.jsx`
- Modify: `src/pages/Sciences.jsx`
- Modify: `src/pages/NotreApproche.jsx`
- Modify: `src/pages/Temoignages.jsx`
- Modify: `src/pages/FirstSessionRequest.jsx`
- Modify: `src/pages/DevenirTuteur.jsx`
- Test: `test/marketing-page-direction.test.mjs`

**Interfaces:**
- All existing route components, localized copy objects, forms, schemas, and links remain intact.
- Subject pages select `math` or `science` illustration variants and send the same localized subject-prefilled request URLs.

- [ ] **Step 1: Write failing page-direction tests**

Assert maths and sciences select different illustration variants, the request page uses a focused form composition, and recruitment exposes the new editorial classes without removing its application anchor.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test test/marketing-page-direction.test.mjs`

Expected: FAIL because pages still use repeated dark glass compositions.

- [ ] **Step 3: Implement page variants**

Use cobalt/grid artwork for Maths, coral/orbital artwork for Sciences, a vertical editorial manifesto for Notre Approche, a portal-recap story for Temoignages, a paper-focused form for FirstSessionRequest, and a coral-accented practical recruitment layout for DevenirTuteur. Remove only duplicate decorative panels; do not remove content needed by SEO or form behavior.

Ensure the first request input appears within the first mobile viewport and keep the current page-level sticky-action suppression.

- [ ] **Step 4: Run focused tests and public-page density tests**

Run: `node --test test/marketing-page-direction.test.mjs test/public-page-density.test.mjs test/conversion-links.test.mjs`

Expected: PASS with no failures.

- [ ] **Step 5: Commit the page variants**

```bash
git add src/pages/Maths.jsx src/pages/Sciences.jsx src/pages/NotreApproche.jsx src/pages/Temoignages.jsx src/pages/FirstSessionRequest.jsx src/pages/DevenirTuteur.jsx test/marketing-page-direction.test.mjs
git commit -m "feat: apply notebook direction to public journeys"
```

### Task 6: Verify responsive visuals, accessibility, build, and regression contracts

**Files:**
- Modify: any implementation files required by verification findings only
- Test: existing `test:site` suite plus `test/visual-system.test.mjs`, `test/button-system.test.mjs`, `test/notebook-art.test.mjs`, `test/marketing-visual-system.test.mjs`, `test/marketing-page-direction.test.mjs`

**Interfaces:**
- No new public APIs. This task is verification and small corrective patches only.

- [ ] **Step 1: Run the complete automated suite**

Run: `npm.cmd run test:site`

Expected: all conversion, density, layout, pricing, build, and static-site checks pass.

- [ ] **Step 2: Run the full portal and motion regression suite**

Run: `npm.cmd run test:portal` and `node --test test/motion-system.test.mjs test/visual-system.test.mjs test/button-system.test.mjs test/notebook-art.test.mjs test/marketing-visual-system.test.mjs test/marketing-page-direction.test.mjs`

Expected: zero failures.

- [ ] **Step 3: Perform browser visual QA**

Start the app with `npm.cmd run dev -- --host 127.0.0.1 --port 4173`. Inspect `/`, `/maths`, `/sciences`, `/notre-approche`, `/temoignages`, `/demande`, and `/devenir-tuteur` at 1440×1000 and 390×844. Verify no horizontal overflow, no clipped sticky action, visible first request field, correct subject accent, keyboard focus, and reduced-motion behavior.

- [ ] **Step 4: Review the diff against the approved direction**

Run: `git diff main...HEAD --stat` and `git diff main...HEAD --check`

Expected: only the planned visual-system, marketing-composition, page-variant, test, and plan files are changed; whitespace check is clean.

- [ ] **Step 5: Commit verification fixes and report evidence**

```bash
git add <verified-files>
git commit -m "chore: verify living notebook visual system"
```

Report the exact test commands and results, the worktree branch, and any remaining visual limitation without claiming success from unverified assumptions.

## Self-review checklist

- [ ] Every approved direction requirement maps to a task.
- [ ] No task removes route, SEO, pricing, tracking, bilingual, form, or portal behavior.
- [ ] Every production change has a failing source/contract test before implementation.
- [ ] Motion remains CSS/SVG/IntersectionObserver-only and reduced-motion safe.
- [ ] The plan contains no placeholders or unspecified “make it better” work.
- [ ] Responsive browser QA covers the requested public journeys at desktop and mobile sizes.
