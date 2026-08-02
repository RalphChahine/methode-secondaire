# Editorial Service Studio Marketing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Living Notebook marketing presentation with a polished, parent-first Editorial Service Studio interface while preserving every conversion, localization, SEO, form, pricing, and portal contract.

**Architecture:** Introduce a restrained visual-token layer and small marketing components, migrate the global marketing layout first, then migrate route groups behind explicit source-level and visual contracts. Keep portal UI and business logic untouched. Remove Notebook-only components and styles only after every marketing caller has moved.

**Tech Stack:** React 18, React Router 7, Vite 7, Tailwind CSS 3.4, Radix UI, Lucide React, Node test runner, existing static SEO generator, in-app Browser for responsive QA.

## Global Constraints

- Read `docs/superpowers/specs/2026-08-01-editorial-service-studio-redesign-design.md` before changing files.
- Read the current [Uncodixfy SKILL.md](https://github.com/cyxzdev/Uncodixfy/blob/main/SKILL.md) before changing marketing UI.
- Preserve React, Vite, React Router, Tailwind, Radix, and Lucide; add no frontend dependency.
- Preserve localized routes, booking URLs, `data-primary-action`, subject-prefill query behavior, price formatting, CRM submission, consent, success navigation, schemas, canonical URLs, alternates, and prerendering.
- Do not change parent, tutor, operator, student, API, authentication, billing, or payment behavior.
- Use Manrope as the only marketing font family.
- Use only the approved canvas, surface, ink, muted, action, moss, rule, utility-dark, and focus colors.
- Use 0–12 px radii; buttons and inputs use 8 px.
- Use no pills except a functional segmented locale control if plain links fail usability review.
- Use no gradients, glassmorphism, decorative blur, glows, floating cards, fake charts, fake metrics, dramatic shadows, parallax, marquee, bounce, scale, hover translation, or spring motion.
- Marketing motion uses CSS and IntersectionObserver only; standard transitions are 140 ms and reveals are 180 ms opacity-only.
- Honor `prefers-reduced-motion: reduce` and show content immediately when IntersectionObserver is unavailable.
- Use verified existing content only; invent no reviews, tutor identities, portraits, outcomes, statistics, ratings, or guarantees.
- Mobile CTA must be fully visible in the first 390 × 844 viewport; mobile H1 must render in four lines or fewer.
- No accepted route may scroll horizontally at 320 px or wider.
- Every task follows red-green-refactor, ends with focused verification, and receives review before the next shared-file task begins.

---

## Execution Topology

### Required branch isolation

Run from the repository root:

```powershell
git status --short
git check-ignore .worktrees
git worktree add .worktrees/editorial-service-studio -b codex/editorial-service-studio
Set-Location .worktrees\editorial-service-studio
npm.cmd install
```

Expected:

- The main checkout remains unchanged.
- The new worktree is on `codex/editorial-service-studio`.
- `.worktrees` is ignored.
- Dependency installation exits with code 0.

If the Uncodixfy skill is not already installed in the worker environment, run:

```powershell
npx.cmd skills add cyxzdev/Uncodixfy
```

Then read these documents in order:

```text
1. docs/superpowers/specs/2026-08-01-editorial-service-studio-redesign-design.md
2. docs/superpowers/plans/2026-08-01-editorial-service-studio-redesign.md
3. docs/agents/editorial-service-studio-agent-handoff.md
4. Uncodixfy/SKILL.md from the installed skill or upstream repository
```

### Baseline gate

Run before edits:

```powershell
npm.cmd run test:site
node --test test\visual-system.test.mjs test\button-system.test.mjs test\marketing-visual-system.test.mjs test\marketing-page-direction.test.mjs test\notebook-art.test.mjs
```

Expected:

- Existing site suite passes.
- Existing Notebook-era focused tests pass before they are replaced.
- Record existing Browserslist or Tailwind warnings; do not confuse warnings with failures.

### File ownership and concurrency

| Phase | Files with exclusive ownership | Concurrency rule |
| --- | --- | --- |
| Task 1 | `src/index.css`, `tailwind.config.js`, `src/components/ui/button.jsx` | Sequential only |
| Task 2 | New marketing primitives | Sequential before consumers |
| Task 3 | `SiteLayout.jsx`, header/footer/navigation components | Sequential only |
| Task 4 | Homepage files and homepage components | One agent |
| Task 5 | `Maths.jsx`, `Sciences.jsx`, `NotreApproche.jsx` | May split by page after `SubjectHero` is committed |
| Task 6 | `Temoignages.jsx`, `ParentTrust.jsx` | One agent |
| Task 7 | `FirstSessionRequest.jsx`, `DevenirTuteur.jsx` | May run in parallel if no shared file changes |
| Task 8 | Long-form marketing routes and content-grid components | Split by non-overlapping route group |
| Task 9 | `SimpleMarketingSections.jsx`, Notebook files, final CSS cleanup | Sequential only |
| Task 10 | Tests and visual QA only unless a reviewed defect requires a fix | One QA owner |

Agents must never edit the same shared file concurrently.

---

### Task 1: Establish Editorial Service Studio tokens and control states

**Files:**

- Modify: `src/index.css:1-230`
- Modify: `tailwind.config.js:1-45`
- Modify: `src/components/ui/button.jsx:1-55`
- Modify: `test/visual-system.test.mjs`
- Modify: `test/button-system.test.mjs`
- Create: `test/uncodixfy-marketing.test.mjs`

**Interfaces:**

- Produces CSS variables: `--marketing-canvas`, `--marketing-surface`, `--marketing-ink`, `--marketing-muted`, `--marketing-action`, `--marketing-action-hover`, `--marketing-moss`, `--marketing-rule`, `--marketing-dark`, `--marketing-focus`, `--motion-ui`, `--motion-reveal`.
- Produces Tailwind colors: `canvas`, `surface`, `ink`, `muted`, `action`, `actionHover`, `moss`, `rule`, `utilityDark`, `focus`.
- Produces Button variants with unchanged public API: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`; sizes remain `default`, `sm`, `lg`, `icon`.
- Consumers: every later marketing component and `SiteLayout.jsx`.

- [ ] **Step 1: Replace Notebook expectations with a failing visual-token contract**

Replace `test/visual-system.test.mjs` with:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("Editorial Service Studio tokens are defined centrally", async () => {
  const css = await readFile(new URL("../src/index.css", import.meta.url), "utf8")
  const tailwind = await readFile(new URL("../tailwind.config.js", import.meta.url), "utf8")

  for (const token of [
    "--marketing-canvas",
    "--marketing-surface",
    "--marketing-ink",
    "--marketing-muted",
    "--marketing-action",
    "--marketing-action-hover",
    "--marketing-moss",
    "--marketing-rule",
    "--marketing-dark",
    "--marketing-focus",
    "--motion-ui",
    "--motion-reveal",
  ]) {
    assert.match(css, new RegExp(token.replaceAll("-", "\\-")))
  }

  assert.match(css, /Manrope/)
  assert.match(css, /prefers-reduced-motion: reduce/)
  assert.match(tailwind, /canvas:.*var\(--marketing-canvas\)/s)
  assert.match(tailwind, /action:.*var\(--marketing-action\)/s)
})
```

- [ ] **Step 2: Replace tactile-button expectations with a failing restrained-control contract**

Replace `test/button-system.test.mjs` with:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("shared buttons use restrained Uncodixfy states", async () => {
  const source = await readFile(new URL("../src/components/ui/button.jsx", import.meta.url), "utf8")

  assert.match(source, /rounded-lg/)
  assert.match(source, /focus-visible:ring-2/)
  assert.match(source, /focus-visible:ring-focus/)
  assert.match(source, /disabled:pointer-events-none/)
  assert.doesNotMatch(source, /active:(?:translate|scale)/)
  assert.doesNotMatch(source, /notebook-button/)
  assert.doesNotMatch(source, /rounded-full/)
})
```

- [ ] **Step 3: Add the first failing Uncodixfy source guard**

Create `test/uncodixfy-marketing.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const initialFiles = ["../src/components/ui/button.jsx"]

test("new marketing foundation excludes banned AI UI primitives", async () => {
  const source = (await Promise.all(
    initialFiles.map((file) => readFile(new URL(file, import.meta.url), "utf8")),
  )).join("\n")

  assert.doesNotMatch(source, /active:(?:translate|scale)/)
  assert.doesNotMatch(source, /linear-gradient|radial-gradient|conic-gradient/)
  assert.doesNotMatch(source, /shadow-\[0_24px|shadow-\[0_32px/)
  assert.doesNotMatch(source, /notebook-button-primary|notebook-button-secondary|notebook-button-ghost/)
})
```

- [ ] **Step 4: Run the three tests and confirm the red state**

Run:

```powershell
node --test test\visual-system.test.mjs test\button-system.test.mjs test\uncodixfy-marketing.test.mjs
```

Expected: failures mention missing `--marketing-canvas`, Notebook button classes, and active transform states.

- [ ] **Step 5: Add the approved tokens without deleting legacy callers yet**

At the top of the existing `@layer base` token block in `src/index.css`, add exactly:

```css
--marketing-canvas: #f6f3ee;
--marketing-surface: #fffefb;
--marketing-ink: #171918;
--marketing-muted: #6b6a63;
--marketing-action: #d95f43;
--marketing-action-hover: #bc4932;
--marketing-moss: #5f735c;
--marketing-rule: #d8d1c6;
--marketing-dark: #191b1a;
--marketing-focus: #315cf5;
--motion-ui: 140ms;
--motion-reveal: 180ms;
```

Keep temporary legacy surface and Notebook button rules required by unmigrated pages. New shared Button rendering must not depend on them. Task 9 removes the legacy declarations after every direct caller has migrated.

- [ ] **Step 6: Merge approved colors into Tailwind without dropping compatibility keys**

In `tailwind.config.js`, merge these entries into the existing `theme.extend.colors` object. Do not replace the whole object: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `destructive`, `border`, `input`, `ring`, `chart`, and the temporary legacy colors must remain until their callers are proven absent. Preserve `muted.foreground` because shared form primitives use `text-muted-foreground`:

```js
extend: {
  colors: {
    canvas: "var(--marketing-canvas)",
    surface: "var(--marketing-surface)",
    ink: "var(--marketing-ink)",
    muted: {
      DEFAULT: "var(--marketing-muted)",
      foreground: "hsl(var(--muted-foreground))",
    },
    action: "var(--marketing-action)",
    actionHover: "var(--marketing-action-hover)",
    moss: "var(--marketing-moss)",
    rule: "var(--marketing-rule)",
    utilityDark: "var(--marketing-dark)",
    focus: "var(--marketing-focus)",
  },
  fontFamily: {
    display: ["Manrope", "sans-serif"],
    sans: ["Manrope", "sans-serif"],
  },
},
```

- [ ] **Step 7: Replace Button visual variants while preserving its API**

Use this base and variant contract in `src/components/ui/button.jsx`:

```js
const buttonVariants = cva(
  "inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-transparent px-4 py-2 text-center text-sm font-semibold leading-tight transition-[background-color,border-color,color,opacity] duration-[var(--motion-ui)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-action text-white hover:bg-actionHover",
        destructive: "bg-red-700 text-white hover:bg-red-800",
        outline: "border-rule bg-transparent text-ink hover:border-ink hover:bg-surface",
        secondary: "border-rule bg-surface text-ink hover:border-ink",
        ghost: "bg-transparent text-ink hover:bg-black/5",
        link: "min-h-0 border-0 bg-transparent px-0 py-0 text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 px-4 py-2.5",
        sm: "min-h-10 px-3 py-2 text-xs",
        lg: "min-h-12 px-6 py-3 text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)
```

- [ ] **Step 8: Run focused tests and build**

Run:

```powershell
node --test test\visual-system.test.mjs test\button-system.test.mjs test\uncodixfy-marketing.test.mjs
npm.cmd run test:portal
npm.cmd run build
```

Expected: all three focused tests, the portal regression suite, and the production build pass. Visually broken legacy marketing pages are acceptable only until their scheduled migration; runtime errors and portal regressions are not.

- [ ] **Step 9: Commit Task 1**

```powershell
git add src\index.css tailwind.config.js src\components\ui\button.jsx test\visual-system.test.mjs test\button-system.test.mjs test\uncodixfy-marketing.test.mjs
git commit -m "feat: establish editorial marketing visual contracts"
```

**Review gate:** Reviewer compares every token to the approved spec, confirms Button API compatibility, and rejects new gradients, large radii, or transform states.

---

### Task 2: Build the small editorial marketing primitives

**Files:**

- Create: `src/components/marketing/Reveal.jsx`
- Create: `src/components/marketing/PageIntro.jsx`
- Create: `src/components/marketing/ServiceBrief.jsx`
- Create: `src/components/marketing/TrustStrip.jsx`
- Create: `src/components/marketing/ProcessSteps.jsx`
- Modify: `src/index.css`
- Create: `test/editorial-marketing-primitives.test.mjs`
- Create: `test/marketing-motion.test.mjs`

**Interfaces:**

- `Reveal({ as?: ElementType, children: ReactNode, className?: string })` renders one semantic wrapper and reveals once.
- `PageIntro({ context?: string, title: string, description?: string, actions?: ReactNode, className?: string })` renders a semantic intro with no decorative label shell.
- `ServiceBrief({ title: string, steps: Array<{ title: string, description?: string }>, facts: Array<{ label: string, value: string }> })` renders rules, ordered steps, and plain facts.
- `TrustStrip({ ariaLabel: string, items: Array<{ label: string, detail?: string }> })` renders a list, not cards.
- `ProcessSteps({ id?: string, title: string, description?: string, steps: Array<{ title: string, description: string }> })` renders a numbered ordered list.
- Consumers: homepage and subject/page compositions in Tasks 4–7.

- [ ] **Step 1: Write failing primitive contracts**

Create `test/editorial-marketing-primitives.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const files = [
  "Reveal.jsx",
  "PageIntro.jsx",
  "ServiceBrief.jsx",
  "TrustStrip.jsx",
  "ProcessSteps.jsx",
]

test("editorial marketing primitives expose focused semantic contracts", async () => {
  const sources = await Promise.all(files.map((file) =>
    readFile(new URL(`../src/components/marketing/${file}`, import.meta.url), "utf8"),
  ))
  const [reveal, intro, brief, trust, process] = sources

  assert.match(reveal, /export default function Reveal/)
  assert.match(reveal, /IntersectionObserver/)
  assert.match(intro, /export default function PageIntro/)
  assert.match(intro, /<h1|<h2/)
  assert.match(brief, /<ol/)
  assert.match(trust, /<ul/)
  assert.match(process, /<ol/)

  for (const source of sources) {
    assert.doesNotMatch(source, /rounded-full|backdrop-blur|gradient|shadow-\[/)
  }
})
```

- [ ] **Step 2: Write the failing motion contract**

Create `test/marketing-motion.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("marketing reveal is restrained and reduced-motion safe", async () => {
  const component = await readFile(new URL("../src/components/marketing/Reveal.jsx", import.meta.url), "utf8")
  const css = await readFile(new URL("../src/index.css", import.meta.url), "utf8")
  const pkg = await readFile(new URL("../package.json", import.meta.url), "utf8")

  assert.match(component, /threshold:\s*0\.15/)
  assert.match(component, /observer\.disconnect\(\)/)
  assert.match(component, /prefers-reduced-motion: reduce/)
  assert.match(css, /transition:\s*opacity var\(--motion-reveal\)/)
  assert.doesNotMatch(css, /marketing-reveal[^}]*transform:/s)
  assert.doesNotMatch(pkg, /framer-motion|gsap|motion\/react/)
})
```

- [ ] **Step 3: Run tests and confirm missing-file failures**

```powershell
node --test test\editorial-marketing-primitives.test.mjs test\marketing-motion.test.mjs
```

Expected: failures report missing `Reveal.jsx` and the other primitive files.

- [ ] **Step 4: Implement `Reveal.jsx` with a single safe behavior**

Use this implementation contract:

```jsx
import { useEffect, useRef, useState } from "react"

export default function Reveal({ as: Tag = "div", children, className = "" }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof window === "undefined") return undefined

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { threshold: 0.15 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <Tag ref={ref} className={`marketing-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}>{children}</Tag>
}
```

Add to `src/index.css`:

```css
.marketing-reveal {
  opacity: 0;
  transition: opacity var(--motion-reveal) ease-out;
}

.marketing-reveal.is-visible {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .marketing-reveal,
  .marketing-reveal.is-visible {
    opacity: 1;
    transition: none;
  }
}
```

- [ ] **Step 5: Implement the four semantic content primitives**

Use ordinary sections, ordered lists, unordered lists, paragraphs, and 1 px borders. Apply these exact layout rules:

```text
PageIntro: max width 760 px; context is plain 14 px text; heading follows context without a chip; description max width 65ch.
ServiceBrief: border-top and border-bottom; ordered rows use grid columns `2.5rem 1fr`; facts use a definition list.
TrustStrip: desktop four columns divided by left rules; mobile one column divided by top rules.
ProcessSteps: mobile ordered rows; use three desktop columns for three steps and four desktop columns for four steps; numbers use plain `01`, `02`, `03` text without circles. Select the complete class from `{ 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" }[steps.length] || "lg:grid-cols-3"`; never interpolate a Tailwind fragment.
```

Required class palette:

```text
bg-canvas, bg-surface, text-ink, text-muted, border-rule, text-action, text-moss
```

Do not use any legacy `panel-*`, `journey-*`, `notebook-*`, `action-surface`, or `glass-panel` class.

- [ ] **Step 6: Run focused tests and a build**

```powershell
node --test test\editorial-marketing-primitives.test.mjs test\marketing-motion.test.mjs test\uncodixfy-marketing.test.mjs
npm.cmd run build
```

Expected: all focused tests pass; build exits with code 0.

- [ ] **Step 7: Commit Task 2**

```powershell
git add src\components\marketing\Reveal.jsx src\components\marketing\PageIntro.jsx src\components\marketing\ServiceBrief.jsx src\components\marketing\TrustStrip.jsx src\components\marketing\ProcessSteps.jsx src\index.css test\editorial-marketing-primitives.test.mjs test\marketing-motion.test.mjs
git commit -m "feat: add restrained editorial marketing primitives"
```

**Review gate:** Reviewer checks semantic elements, reduced-motion fallback, fallback visibility, prop names, and absence of visual exceptions.

---

### Task 3: Rebuild marketing navigation and footer

**Files:**

- Create: `src/components/marketing/MarketingHeader.jsx`
- Create: `src/components/marketing/MobileNavigation.jsx`
- Create: `src/components/marketing/MarketingFooter.jsx`
- Modify: `src/layouts/SiteLayout.jsx:1-390`
- Modify: `src/components/LanguageToggle.jsx:1-40`
- Modify: `test/site-layout.test.mjs`
- Create: `test/marketing-navigation.test.mjs`
- Verify unchanged: `test/conversion-links.test.mjs`

**Interfaces:**

- `MarketingHeader({ locale, homePath, navItems, sections, requestUrl, requestLabel, shortRequestLabel, phoneHref, callLabel, mobilePrompt, isPortalRoute, onSectionNavigate })` renders desktop and mobile header controls.
- `MobileNavigation({ locale, navItems, sections, requestUrl, requestLabel, phoneHref, callLabel, prompt, onSectionNavigate })` owns the Radix Sheet markup.
- `MarketingFooter({ locale, blurb, links, phoneHref, phoneLabel, emailHref, emailLabel })` renders the marketing footer.
- `SiteLayout` continues to own route detection, sticky-action observation, localized copy, and `<Outlet />`.

- [ ] **Step 1: Replace the navigation source contract with the approved hierarchy**

Update `test/site-layout.test.mjs` so it verifies:

```js
assert.match(source, /<MarketingHeader/)
assert.match(source, /<MarketingFooter/)
assert.match(source, /label: "Devenir tuteur"/)
assert.match(source, /label: "Become a tutor"/)
assert.match(source, /suppressMobileAction = \["request", "thankYou", "portal", "team"\]/)
assert.doesNotMatch(source, /backdrop-blur-xl/)
```

Keep the existing route and recruitment assertions.

- [ ] **Step 2: Add a failing detailed navigation test**

Create `test/marketing-navigation.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("marketing navigation has one labeled primary mobile action", async () => {
  const header = await readFile(new URL("../src/components/marketing/MarketingHeader.jsx", import.meta.url), "utf8")
  const mobile = await readFile(new URL("../src/components/marketing/MobileNavigation.jsx", import.meta.url), "utf8")
  const layout = await readFile(new URL("../src/layouts/SiteLayout.jsx", import.meta.url), "utf8")

  assert.match(header, /requestLabel/)
  assert.match(header, /MarketingHeader/)
  assert.match(mobile, /SheetTitle/)
  assert.match(mobile, /safe-area-inset-bottom/)
  assert.match(mobile, /phoneHref/)
  assert.match(layout, /data-primary-action/)
  assert.doesNotMatch(header, /CalendarDays[^\n]*aria-label/)
  assert.doesNotMatch(header + mobile, /rounded-full|backdrop-blur|active:translate|active:scale/)
})
```

- [ ] **Step 3: Run navigation tests and confirm the red state**

```powershell
node --test test\site-layout.test.mjs test\marketing-navigation.test.mjs test\conversion-links.test.mjs
```

Expected: failures report missing marketing navigation components and legacy backdrop blur.

- [ ] **Step 4: Extract navigation components without moving route logic**

Keep localized copy and `goToSection` in `SiteLayout.jsx`. Pass explicit props to the new components. The header structure must be:

```jsx
const navLinkClass = ({ isActive }) =>
  `text-sm transition-colors duration-[var(--motion-ui)] ${
    isActive
      ? "font-semibold text-ink underline underline-offset-4"
      : "text-muted hover:text-ink"
  }`

<header className="sticky top-0 z-50 border-b border-rule bg-canvas text-ink">
  <div className="mx-auto flex min-h-16 max-w-[1240px] items-center gap-4 px-4 sm:px-6 lg:px-8">
    <Link to={homePath} className="mr-auto shrink-0" aria-label={locale === "en" ? "Methode Secondaire home" : "Accueil Méthode Secondaire"}>
      <img src="/Methode_Secondaire.png" alt="Méthode Secondaire" className="h-9 w-auto max-w-[150px] object-contain" />
    </Link>
    <nav className="hidden items-center gap-6 xl:flex" aria-label={locale === "en" ? "Main navigation" : "Navigation principale"}>
      {navItems.slice(0, 5).map((item) => <NavLink key={item.to} to={item.to} className={navLinkClass}>{item.label}</NavLink>)}
    </nav>
    <div className="hidden items-center gap-4 xl:flex">
      <LanguageToggle />
      {!isPortalRoute ? <Button asChild><a href={requestUrl}>{requestLabel}</a></Button> : null}
    </div>
    <div className="flex items-center gap-2 xl:hidden">
      {!isPortalRoute ? <Button asChild size="sm"><a href={requestUrl}>{shortRequestLabel}</a></Button> : null}
      <MobileNavigation
        locale={locale}
        navItems={navItems}
        sections={sections}
        requestUrl={requestUrl}
        requestLabel={requestLabel}
        phoneHref={phoneHref}
        callLabel={callLabel}
        prompt={mobilePrompt}
        onSectionNavigate={onSectionNavigate}
      />
    </div>
  </div>
</header>
```

Use the existing `/Methode_Secondaire.png` wordmark asset shown in the exact JSX above, without placing it inside a rounded decorative container. On mobile, render the wordmark at a width that leaves at least 148 px for the short request action and menu control at 390 px.

Update `LanguageToggle.jsx` without changing its props or localized path behavior. Render two plain text links separated by a 1 px rule. The active locale uses `font-semibold text-ink underline underline-offset-4`; the inactive locale uses `text-muted hover:text-ink`. Remove the rounded container and active white pill.

- [ ] **Step 5: Preserve menu accessibility**

`MobileNavigation.jsx` must retain Radix Sheet focus handling and include:

```text
SheetTitle with localized menu title.
Scrollable content with `min-h-0 flex-1 overflow-y-auto`.
Safe-area bottom padding.
Localized route links.
Home section links.
Plain FR/EN language control.
Portal sign-in and tutor recruitment.
Phone action and full request action.
```

Use solid `bg-canvas text-ink`; allow only the Radix overlay backdrop. Do not add a decorative blur.

Neutralize the existing Sheet slide animation on this marketing menu with `!animate-none`, `!duration-[var(--motion-ui)]`, `transition-opacity`, `data-[state=open]:opacity-100`, and `data-[state=closed]:opacity-0` on `SheetContent`. Do not modify `src/components/ui/sheet.jsx`, because portal callers may depend on its default behavior.

- [ ] **Step 6: Extract the footer**

`MarketingFooter.jsx` uses `bg-utilityDark text-white`, 1 px rules, the existing wordmark, simple headings, and link lists. It has no promotional card and no oversized brand block.

- [ ] **Step 7: Restyle the sticky mobile action**

Keep the existing IntersectionObserver and route suppression in `SiteLayout.jsx`. The fixed action must include:

```jsx
<a href={mobileAction.href}>
  <span>{mobileAction.label}</span>
  <span>65 $ · 60 min</span>
</a>
```

For tutor routes, keep the application label and omit price context. Use no transform transition; switch opacity and visibility only.

- [ ] **Step 8: Run focused tests and build**

```powershell
node --test test\site-layout.test.mjs test\marketing-navigation.test.mjs test\conversion-links.test.mjs
npm.cmd run build
```

Expected: navigation tests pass and build exits with code 0.

- [ ] **Step 9: Perform header-only visual QA**

Inspect `/`, `/en`, `/demande`, `/devenir-tuteur`, and `/portail` at 390 × 844 and 1440 × 900.

Pass conditions:

- no header overflow;
- wordmark remains readable;
- labeled request action is present on marketing routes;
- fixed action is absent on focused routes;
- portal header remains usable;
- menu opens, traps focus, closes with Escape, and returns focus;
- no equal-weight row of four rounded controls.

- [ ] **Step 10: Commit Task 3**

```powershell
git add src\components\marketing\MarketingHeader.jsx src\components\marketing\MobileNavigation.jsx src\components\marketing\MarketingFooter.jsx src\components\LanguageToggle.jsx src\layouts\SiteLayout.jsx test\site-layout.test.mjs test\marketing-navigation.test.mjs
git commit -m "feat: rebuild restrained marketing navigation"
```

**Review gate:** Reviewer checks both locales, focused-route suppression, portal isolation, safe-area behavior, and one-primary-action hierarchy.

---

### Task 4: Recompose the French and English homepages parent-first

**Files:**

- Create: `src/components/marketing/MarketingHero.jsx`
- Create: `src/components/marketing/SubjectRows.jsx`
- Create: `src/components/marketing/ParentTimeline.jsx`
- Create: `src/components/marketing/VerifiedReviews.jsx`
- Create: `src/components/marketing/MarketingFaq.jsx`
- Create: `src/components/marketing/FinalConversionBand.jsx`
- Modify: `src/pages/Accueil.jsx:1-195`
- Modify: `src/pages/AccueilEn.jsx:1-183`
- Modify: `test/marketing-visual-system.test.mjs`
- Modify: `test/public-page-density.test.mjs`
- Create: `test/marketing-layout-contract.test.mjs`
- Verify unchanged: `src/components/PricingSection.jsx`

**Interfaces:**

- `MarketingHero({ context, title, description, primaryAction, secondaryAction, trustItems, serviceTitle, serviceSteps, facts })` composes `ServiceBrief` and marks the primary action with `data-primary-action`.
- `SubjectRows({ title, description, items: Array<{ title, situation, outcome, href, linkLabel, accent: "action" | "moss" }> })` renders two editorial links.
- `ParentTimeline({ title, description, steps: Array<{ title, description }> })` renders the five-step real service sequence.
- `VerifiedReviews({ title, description, note, reviews, moreHref, moreLabel })` consumes `verifiedReviewsByLocale[locale]` and renders one primary plus two supporting entries.
- `MarketingFaq({ id, title, description, items })` renders the accessible FAQ.
- `FinalConversionBand({ title, description, fact, action })` renders one primary action.
- Consumers: `Accueil.jsx` and `AccueilEn.jsx`; later pages may reuse `VerifiedReviews`, `MarketingFaq`, and `FinalConversionBand`.

- [ ] **Step 1: Replace Notebook hero expectations with a failing homepage contract**

Replace `test/marketing-visual-system.test.mjs` with:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("homepages use the parent-first editorial composition", async () => {
  const shared = await readFile(new URL("../src/components/marketing/MarketingHero.jsx", import.meta.url), "utf8")
  const fr = await readFile(new URL("../src/pages/Accueil.jsx", import.meta.url), "utf8")
  const en = await readFile(new URL("../src/pages/AccueilEn.jsx", import.meta.url), "utf8")

  assert.match(shared, /ServiceBrief/)
  assert.match(shared, /data-primary-action/)
  assert.match(fr, /Le bon tuteur, au bon moment\./)
  assert.match(en, /The right tutor, at the right time\./)
  assert.match(fr, /<SubjectRows/)
  assert.match(fr, /<ParentTimeline/)
  assert.match(fr, /<VerifiedReviews/)
  assert.match(fr, /<FinalConversionBand/)
  assert.doesNotMatch(fr + en + shared, /HeroShowcase|NotebookIllustration|notebook-|artVariant/)
})
```

- [ ] **Step 2: Add the failing structural layout contract**

Create `test/marketing-layout-contract.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("homepage contains every required conversion section in order", async () => {
  const fr = await readFile(new URL("../src/pages/Accueil.jsx", import.meta.url), "utf8")
  const names = [
    "MarketingHero",
    "TrustStrip",
    "ProcessSteps",
    "SubjectRows",
    "ParentTimeline",
    "VerifiedReviews",
    "PricingSection",
    "MarketingFaq",
    "FinalConversionBand",
  ]

  const positions = names.map((name) => fr.indexOf(`<${name}`))
  positions.forEach((position, index) => assert.ok(position >= 0, `${names[index]} missing`))
  for (let index = 1; index < positions.length; index += 1) {
    assert.ok(positions[index] > positions[index - 1], `${names[index]} is out of order`)
  }
})
```

- [ ] **Step 3: Run homepage tests and confirm the red state**

```powershell
node --test test\marketing-visual-system.test.mjs test\marketing-layout-contract.test.mjs test\public-page-density.test.mjs
```

Expected: missing `MarketingHero.jsx`, missing composition components, and old Notebook hero assertions fail.

- [ ] **Step 4: Implement `MarketingHero` with the approved copy limits**

Required composition:

```jsx
<section className="border-b border-rule bg-canvas">
  <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.16fr_0.84fr] lg:px-8 lg:py-20">
    <div className="max-w-[720px]">
      <p className="text-sm text-muted">{context}</p>
      <h1 className="mt-4 max-w-[15ch] font-display text-[clamp(2.25rem,10vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink lg:text-[clamp(3rem,5.5vw,4.5rem)]">{title}</h1>
      <p className="mt-5 max-w-[62ch] text-base leading-7 text-muted sm:text-lg">{description}</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg"><a data-primary-action href={primaryAction.href}>{primaryAction.label}</a></Button>
        {secondaryAction.href
          ? <Button asChild size="lg" variant="outline"><a href={secondaryAction.href}>{secondaryAction.label}</a></Button>
          : <Button size="lg" variant="outline" type="button" onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>}
      </div>
      <ul className="mt-6 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:flex-wrap">
        {trustItems.map((item) => <li key={item} className="border-t border-rule pt-2 first:border-t-0 first:pt-0 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0 sm:first:border-l-0 sm:first:pl-0">{item}</li>)}
      </ul>
    </div>
    <ServiceBrief title={serviceTitle} steps={serviceSteps} facts={facts} />
  </div>
</section>
```

The primary action receives `data-primary-action`. The secondary action scrolls to `#processus` or dispatches the existing diagnostic event only when its page copy explicitly requests the mini-assessment.

- [ ] **Step 5: Implement the remaining homepage components**

Use the approved interfaces and these markup rules:

```text
SubjectRows: two `article` rows with border-top; each row has a text link covering the heading and a separate visible action label.
ParentTimeline: ordered list of five rows; desktop may use a two-column title/content layout; no progressbar role.
VerifiedReviews: first review uses a blockquote; two support entries use smaller blockquotes separated by rules; note remains visible.
MarketingFaq: section + heading + details elements; summary has a 44 px minimum target and visible focus.
FinalConversionBand: utility-dark section; one heading, one paragraph, one plain fact, one Button.
```

- [ ] **Step 6: Recompose `Accueil.jsx` with exact French hero content**

Use:

```jsx
<MarketingHero
  context="Tutorat secondaire · Maths et sciences · Québec"
  title="Le bon tuteur, au bon moment."
  description={`Expliquez le niveau, la matière et ce qui bloque. Nous vous rappelons, choisissons le tuteur et fixons la première séance de ${targetedSessionOffer.durationMinutes} min à ${targetedSessionPrice}.`}
  primaryAction={{ label: "Demander une séance", href: DECLIC_REQUEST_URL }}
  secondaryAction={{ label: "Voir comment ça fonctionne", href: "#processus" }}
  trustItems={["Réponse humaine", "Aucun abonnement requis", "Portail parent après la première séance"]}
  serviceTitle="Votre première séance"
  serviceSteps={[
    { title: "Décrivez le besoin" },
    { title: "Nous choisissons le bon tuteur" },
    { title: "La première séance confirme le jumelage" },
  ]}
  facts={[
    { label: "Prix", value: targetedSessionPrice },
    { label: "Durée", value: `${targetedSessionOffer.durationMinutes} min` },
    { label: "Compte", value: "Non requis pour commencer" },
  ]}
/>
```

Then render components in the exact order asserted by `marketing-layout-contract.test.mjs`. Use `verifiedReviewsByLocale.fr` rather than creating new review copy.

- [ ] **Step 7: Recompose `AccueilEn.jsx` with exact English hero content**

Use:

```jsx
<MarketingHero
  context="Quebec high-school tutoring · Math and science"
  title="The right tutor, at the right time."
  description={`Tell us the grade, subject, and what is getting in the way. We call you back, choose the tutor, and confirm a first ${targetedSessionOffer.durationMinutes}-minute session for ${targetedSessionPrice}.`}
  primaryAction={{ label: "Request a session", href: DECLIC_REQUEST_URL_EN }}
  secondaryAction={{ label: "See how it works", href: "#processus" }}
  trustItems={["A real reply", "No subscription required", "Parent portal after the first session"]}
  serviceTitle="Your first session"
  serviceSteps={[
    { title: "Describe the need" },
    { title: "We choose the right tutor" },
    { title: "The first session confirms the match" },
  ]}
  facts={[
    { label: "Price", value: targetedSessionPrice },
    { label: "Length", value: `${targetedSessionOffer.durationMinutes} minutes` },
    { label: "Account", value: "Not required to begin" },
  ]}
/>
```

Use `verifiedReviewsByLocale.en` for proof content.

- [ ] **Step 8: Preserve existing page contracts**

Keep in both page files:

```text
Seo metadata and JSON-LD.
Localized canonical and alternate values.
PricingSection with existing IDs `offres` and `offers`.
The mini-assessment event handler if still linked from a later section.
Existing price calculation through `getOffer` and `formatCadAmount`.
```

Remove unused imports, `parentStartingPoints` data that is no longer rendered, and Notebook hero props.

- [ ] **Step 9: Run focused and conversion tests**

```powershell
node --test test\marketing-visual-system.test.mjs test\marketing-layout-contract.test.mjs test\public-page-density.test.mjs test\conversion-links.test.mjs
npm.cmd run build
```

Expected: all tests pass and build exits with code 0.

- [ ] **Step 10: Perform homepage visual QA**

Inspect `/` and `/en` at 320 × 568, 390 × 844, 412 × 915, 768 × 1024, and 1440 × 900.

Pass conditions:

- primary CTA fully visible at 390 × 844;
- H1 four lines or fewer at 390 px;
- no horizontal overflow;
- service brief follows actions on mobile;
- section order is unmistakable;
- reviews are visibly attributed as path signals, not customer claims;
- no Notebook grid, giant paper shell, fake chart, gradient, floating card, or radius above 12 px;
- focus and reduced-motion behavior work.

- [ ] **Step 11: Commit Task 4**

```powershell
git add src\components\marketing\MarketingHero.jsx src\components\marketing\SubjectRows.jsx src\components\marketing\ParentTimeline.jsx src\components\marketing\VerifiedReviews.jsx src\components\marketing\MarketingFaq.jsx src\components\marketing\FinalConversionBand.jsx src\pages\Accueil.jsx src\pages\AccueilEn.jsx test\marketing-visual-system.test.mjs test\marketing-layout-contract.test.mjs test\public-page-density.test.mjs
git commit -m "feat: recompose parent-first marketing homepages"
```

**Review gate:** Reviewer uses the supplied mobile screenshot as the before-state and rejects any hero that hides the CTA, restores a large shell, or substitutes decoration for proof.

---

### Task 5: Migrate Math, Science, and Our Approach

**Files:**

- Create: `src/components/marketing/SubjectHero.jsx`
- Modify: `src/pages/Maths.jsx:218-320`
- Modify: `src/pages/Sciences.jsx:222-324`
- Modify: `src/pages/NotreApproche.jsx:236-324`
- Modify: `test/marketing-page-direction.test.mjs`
- Modify: `test/public-page-density.test.mjs`
- Verify unchanged: `src/config/booking.js`
- Verify unchanged: `src/lib/i18n.js`

**Interfaces:**

- `SubjectHero({ context, title, description, primaryAction, secondaryAction, situations, note, accent: "action" | "moss" })` renders a short intro and functional situation list.
- Reuses `PageIntro`, `ProcessSteps`, `MarketingFaq`, `FinalConversionBand`, and Button.
- Subject pages preserve existing localized `requestUrl` with `?subject=math` and `?subject=science` behavior.

- [ ] **Step 1: Replace Notebook page-direction tests with failing editorial contracts**

Replace `test/marketing-page-direction.test.mjs` with:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("subject pages use one editorial shell and preserve subject prefill", async () => {
  const maths = await readFile(new URL("../src/pages/Maths.jsx", import.meta.url), "utf8")
  const sciences = await readFile(new URL("../src/pages/Sciences.jsx", import.meta.url), "utf8")

  assert.match(maths, /<SubjectHero/)
  assert.match(sciences, /<SubjectHero/)
  assert.match(maths, /subject=math/)
  assert.match(sciences, /subject=science/)
  assert.match(maths, /accent="action"/)
  assert.match(sciences, /accent="moss"/)
  assert.doesNotMatch(maths + sciences, /HeroShowcase|NotebookIllustration|artVariant|notebook-/)
})

test("approach page presents a four-phase method without fake progress UI", async () => {
  const source = await readFile(new URL("../src/pages/NotreApproche.jsx", import.meta.url), "utf8")
  assert.match(source, /<ProcessSteps/)
  assert.match(source, /steps=\{copy\.methodSteps\}/)
  assert.doesNotMatch(source, /HeroShowcase|ProgressJourney|journey-track|notebook-/)
})
```

- [ ] **Step 2: Run tests and confirm the red state**

```powershell
node --test test\marketing-page-direction.test.mjs test\public-page-density.test.mjs
```

Expected: tests fail on `HeroShowcase`, art variants, and missing `SubjectHero`.

- [ ] **Step 3: Implement `SubjectHero.jsx`**

Use a two-column desktop grid and single mobile flow. The secondary column is an unordered list of real situations separated by rules. Do not render a chart, progress line, illustration panel, or rounded card.

Exact prop handling:

```jsx
export default function SubjectHero({ context, title, description, primaryAction, secondaryAction, situations, note, accent = "action" })
```

Map accent to `border-action` or `border-moss` through an explicit object:

```js
const accentClass = { action: "border-action", moss: "border-moss" }[accent] || "border-rule"
```

Do not construct Tailwind classes dynamically.

- [ ] **Step 4: Migrate Math**

Preserve page SEO, schema, locale resolution, request prefill, pricing references, FAQ data, and conversion actions. Replace only the top composition and obsolete Notebook-specific props/classes. Use:

```jsx
<SubjectHero
  context={locale === "en" ? "High-school math tutoring" : "Tutorat en mathématiques au secondaire"}
  title={copy.title}
  description={copy.description}
  primaryAction={{
    label: copy.secondary,
    href: requestUrl,
    icon: CalendarDays,
  }}
  secondaryAction={{
    label: copy.primary,
    href: `tel:${siteConfig.phone}`,
    icon: Phone,
  }}
  situations={copy.panelItems}
  note={copy.panelNote}
  accent="action"
/>
```

Use existing copy fields; do not create performance claims. This intentionally makes the session-request link the visually primary action and keeps the phone link as the secondary action. Do not rename `copy.primary` or `copy.secondary`; those legacy keys describe their former visual order, not the new button hierarchy.

- [ ] **Step 5: Migrate Science**

Use the same prop contract and preserve science request prefill. Set `accent="moss"`. Use existing science copy and FAQ content:

```jsx
<SubjectHero
  context={locale === "en" ? "High-school science tutoring" : "Tutorat en sciences au secondaire"}
  title={copy.title}
  description={copy.description}
  primaryAction={{
    label: copy.secondary,
    href: requestUrl,
    icon: CalendarDays,
  }}
  secondaryAction={{
    label: copy.primary,
    href: `tel:${siteConfig.phone}`,
    icon: Phone,
  }}
  situations={copy.panelItems}
  note={copy.panelNote}
  accent="moss"
/>
```

- [ ] **Step 6: Reshape Our Approach into four explicit phases**

Add an explicit `methodSteps` array to each locale content object. Use these exact, claim-safe phases:

```js
// French
methodSteps: [
  { title: "Clarifier le besoin", description: "On précise la matière, le niveau, l'urgence et le format qui peut réellement aider." },
  { title: "Proposer le tuteur", description: "L'équipe choisit un profil selon le besoin scolaire et la manière d'accompagner l'élève." },
  { title: "Confirmer la première séance", description: "Le parent voit le créneau, le format et les détails utiles avant de commencer." },
  { title: "Rendre la suite lisible", description: "Le bilan indique ce qui a été travaillé, ce qui bloque encore et la prochaine action." },
]

// English
methodSteps: [
  { title: "Clarify the need", description: "We confirm the subject, grade level, urgency, and format that can genuinely help." },
  { title: "Propose the tutor", description: "The team chooses a profile based on the academic need and the way the student learns." },
  { title: "Confirm the first session", description: "Parents see the time, format, and useful details before support begins." },
  { title: "Keep the next step readable", description: "The summary shows what was covered, what is still blocking progress, and the next action." },
]
```

Render `PageIntro`, `ProcessSteps`, the existing `features` responsibility content in plain rule-separated sections, `MarketingFaq`, and `FinalConversionBand`.

- [ ] **Step 7: Run focused tests and build**

```powershell
node --test test\marketing-page-direction.test.mjs test\public-page-density.test.mjs test\conversion-links.test.mjs
npm.cmd run build
```

Expected: tests pass; build exits with code 0.

- [ ] **Step 8: Visual QA three routes**

Inspect `/maths`, `/sciences`, and `/notre-approche` at 390 × 844 and 1440 × 900.

Pass conditions:

- subject differentiation is content-led;
- correct request URL appears in the primary action;
- no fake charts or graph artwork;
- section titles are concise and not decorative labels;
- mobile CTA and top content are visible without excessive scroll;
- no horizontal overflow.

- [ ] **Step 9: Commit Task 5**

```powershell
git add src\components\marketing\SubjectHero.jsx src\pages\Maths.jsx src\pages\Sciences.jsx src\pages\NotreApproche.jsx test\marketing-page-direction.test.mjs test\public-page-density.test.mjs
git commit -m "feat: migrate subject and approach pages to editorial layouts"
```

**Review gate:** Reviewer verifies subject-prefill links manually and rejects subject themes built from unrelated colors or illustrations.

---

### Task 6: Rebuild Parent Journey and trust evidence

**Files:**

- Modify: `src/pages/Temoignages.jsx:69-190`
- Modify: `src/pages/ParentTrust.jsx`
- Modify: `src/components/ConversionSections.jsx:117-204`
- Modify: `test/marketing-page-direction.test.mjs`
- Create: `test/marketing-evidence-contract.test.mjs`
- Verify unchanged: `src/lib/conversionContent.js:60-197`
- Verify unchanged: `src/lib/parentJourney.js`

**Interfaces:**

- Reuses `PageIntro`, `ParentTimeline`, `VerifiedReviews`, `TrustStrip`, `MarketingFaq`, and `FinalConversionBand`.
- Evidence continues to come from `operationalPromisesByLocale` and `verifiedReviewsByLocale`.
- `VerifiedReviewsSection` may remain as a compatibility wrapper that renders the new `VerifiedReviews` component until callers migrate.

- [ ] **Step 1: Add a failing evidence-source contract**

Create `test/marketing-evidence-contract.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("parent evidence pages use verified project content without invented claims", async () => {
  const journey = await readFile(new URL("../src/pages/Temoignages.jsx", import.meta.url), "utf8")
  const trust = await readFile(new URL("../src/pages/ParentTrust.jsx", import.meta.url), "utf8")
  const conversions = await readFile(new URL("../src/components/ConversionSections.jsx", import.meta.url), "utf8")

  assert.match(journey, /verifiedReviewsByLocale/)
  assert.match(journey, /<ParentTimeline/)
  assert.match(trust + conversions, /operationalPromisesByLocale/)
  assert.doesNotMatch(journey + trust + conversions, /ProgressJourney|journey-track|action-surface|notebook-/)
  assert.doesNotMatch(journey + trust, /\b\d{2,3}%\b|average grade|note moyenne/i)
})
```

- [ ] **Step 2: Run evidence tests and confirm the red state**

```powershell
node --test test\marketing-evidence-contract.test.mjs test\marketing-page-direction.test.mjs
```

Expected: failures report `ProgressJourney`, Notebook classes, or missing new components.

- [ ] **Step 3: Recompose `Temoignages.jsx`**

Required order:

```text
PageIntro
TrustStrip
ParentTimeline
VerifiedReviews
plain trust disclaimer
FinalConversionBand
```

Import `verifiedReviewsByLocale` directly from `@/lib/conversionContent`. Use `getParentJourney(locale)` only for real path copy. Remove decorative absolute blobs, `ProgressJourney`, large paper shell, dark card cluster, and duplicate CTA panel.

- [ ] **Step 4: Adopt the same evidence grammar in `ParentTrust.jsx`**

Use operational promises as rule-separated rows. Preserve SEO, localized routes, guarantees, and conversion links. Do not create scores, customer counts, or outcome statistics.

- [ ] **Step 5: Convert compatibility sections**

In `ConversionSections.jsx`:

```text
OperationalPromisesSection renders an ordinary section and list with borders.
VerifiedReviewsSection delegates to the new VerifiedReviews component.
GuaranteeSection retains its content but adopts 0–12 px radii and no gradient/panel classes.
TutorRosterSection and LocalSeoSection remain functionally unchanged until Task 8, but must compile with the new Button styles.
```

- [ ] **Step 6: Run focused tests and build**

```powershell
node --test test\marketing-evidence-contract.test.mjs test\marketing-page-direction.test.mjs test\conversion-links.test.mjs
npm.cmd run build
```

Expected: tests pass and build exits with code 0.

- [ ] **Step 7: Visual QA parent evidence**

Inspect `/temoignages`, `/en/testimonials`, and the localized parent-trust route at 390 × 844 and 1440 × 900.

Pass conditions:

- evidence source is explicit;
- timeline is readable without a fake progress widget;
- disclaimers remain visible;
- no invented social proof;
- CTA hierarchy is clear;
- no horizontal overflow.

- [ ] **Step 8: Commit Task 6**

```powershell
git add src\pages\Temoignages.jsx src\pages\ParentTrust.jsx src\components\ConversionSections.jsx test\marketing-page-direction.test.mjs test\marketing-evidence-contract.test.mjs
git commit -m "feat: rebuild parent evidence journeys"
```

**Review gate:** Reviewer compares every rendered quote and claim with `conversionContent.js` and rejects unsupported proof.

---

### Task 7: Simplify request and tutor-recruitment conversion pages

**Files:**

- Modify: `src/pages/FirstSessionRequest.jsx:51-86`
- Modify: `src/pages/DevenirTuteur.jsx:491-760`
- Verify unchanged: `src/components/FirstSessionRequestForm.jsx`
- Verify unchanged: recruitment form submission helpers in `src/pages/DevenirTuteur.jsx`
- Create: `test/editorial-request-page.test.mjs`
- Create: `test/editorial-recruitment-page.test.mjs`
- Verify unchanged: `test/conversion-links.test.mjs`
- Verify unchanged: `test/tutor-marketing-pages.test.mjs`

**Interfaces:**

- Request page renders `PageIntro`, a plain session summary, and the unchanged `FirstSessionRequestForm` in one centered column.
- Recruitment page renders `PageIntro`, rule-separated requirements/facts/process, and the unchanged candidature form/anchor.
- Both reuse Button and `FinalConversionBand` where relevant.

- [ ] **Step 1: Add two independent failing conversion-page layout tests**

Create `test/editorial-request-page.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("session request is one focused form journey", async () => {
  const source = await readFile(new URL("../src/pages/FirstSessionRequest.jsx", import.meta.url), "utf8")
  assert.match(source, /max-w-\[(?:680|720|760)px\]/)
  assert.match(source, /<FirstSessionRequestForm/)
  assert.match(source, /initialSubject=\{initialSubject\}/)
  assert.match(source, /offer=\{requestedOffer\}/)
  assert.match(source, /onSuccess=\{\(\) => navigate/)
  assert.doesNotMatch(source, /lg:grid-cols-\[0\.78fr,1\.1fr\]|notebook-paper|notebook-ink|action-surface/)
})
```

Create `test/editorial-recruitment-page.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("tutor recruitment keeps facts and candidature without Notebook art", async () => {
  const source = await readFile(new URL("../src/pages/DevenirTuteur.jsx", import.meta.url), "utf8")
  assert.match(source, /id="candidature"/)
  assert.match(source, /copy\.compensation/)
  assert.match(source, /<ProcessSteps/)
  assert.doesNotMatch(source, /NotebookIllustration|notebook-|rounded-(?:2xl|3xl|full)|rounded-\[(?:2\d|3\d)px\]/)
})
```

- [ ] **Step 2: Run tests and confirm the red state**

```powershell
node --test test\editorial-request-page.test.mjs test\editorial-recruitment-page.test.mjs test\conversion-links.test.mjs test\tutor-marketing-pages.test.mjs
```

Expected: failures report the current two-column request composition and Notebook recruitment art.

- [ ] **Step 3: Recompose `FirstSessionRequest.jsx` around the existing form**

Required hierarchy:

```jsx
<main className="bg-canvas px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
  <div className="mx-auto max-w-[720px]">
    <PageIntro
      context={requestCopy.badge}
      title={requestCopy.title}
      description={requestCopy.description}
      actions={<Button asChild variant="outline"><a href={`tel:${siteConfig.phone}`}><Phone aria-hidden="true" />{requestCopy.call}</a></Button>}
    />
    <dl className="mt-8 grid border-y border-rule sm:grid-cols-3">
      {[
        { label: locale === "en" ? "Offer" : "Offre", value: requestCopy.badge },
        { label: locale === "en" ? "Price and length" : "Prix et durée", value: requestCopy.price },
        { label: locale === "en" ? "Account" : "Compte", value: locale === "en" ? "Not required to begin" : "Non requis pour commencer" },
      ].map((fact) => <div key={fact.label} className="border-t border-rule py-4 first:border-t-0 sm:border-l sm:border-t-0 sm:px-4 sm:first:border-l-0 sm:first:pl-0"><dt className="text-sm text-muted">{fact.label}</dt><dd className="mt-1 font-semibold text-ink">{fact.value}</dd></div>)}
    </dl>
    <section className="mt-10 border-t border-rule pt-8" aria-labelledby="request-form-title">
      <h2 id="request-form-title" className="text-2xl font-semibold text-ink">{requestCopy.formTitle}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{requestCopy.formDescription}</p>
      <FirstSessionRequestForm
        className="mt-6"
        locale={locale}
        pageName={locale === "en" ? "first-session-request-en" : "first-session-request"}
        offer={requestedOffer}
        initialSubject={initialSubject}
        onSuccess={() => navigate(getLocalizedPath("thankYou", locale))}
      />
    </section>
    <details className="mt-8 border-t border-rule pt-5">
      <summary className="min-h-11 cursor-pointer py-2 font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">{requestCopy.stepsTitle}</summary>
      <ol className="mt-4 space-y-4">{requestCopy.steps.map((step, index) => <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-2 text-sm leading-6 text-muted"><span className="font-semibold text-action">0{index + 1}</span><span>{step}</span></li>)}</ol>
    </details>
  </div>
</main>
```

Preserve `requestedOffer`, `initialSubject`, localized page name, submit success route, phone action, schema, robots directive, and alternates.

- [ ] **Step 4: Recompose `DevenirTuteur.jsx` without altering candidature behavior**

Required order:

```text
PageIntro with apply action
plain role facts definition list
requirements list
ProcessSteps for recruitment stages
compensation and service-region text
testimonials link
existing candidature form with id="candidature"
```

Remove Notebook illustration, grid, oversized rounded panels, promotional compensation badge, and transform states. Preserve all field names, validation, submission, success, tracking, and locale behavior.

- [ ] **Step 5: Run focused tests, form contracts, and build**

```powershell
node --test test\editorial-request-page.test.mjs test\editorial-recruitment-page.test.mjs test\conversion-links.test.mjs test\tutor-marketing-pages.test.mjs
npm.cmd run test:site
```

Expected: all tests pass, including production build and static route checks.

- [ ] **Step 6: Manually exercise request and recruitment forms without sending production submissions**

Use local development or preview. Verify:

```text
Math and science query parameters preselect the correct subject.
Required-field messages are linked to their fields.
Consent remains required.
Keyboard order follows visual order.
The request submit action is not triggered during QA.
The recruitment submit action is not triggered during QA.
```

- [ ] **Step 7: Visual QA conversion pages**

Inspect `/demande?subject=math`, `/demande?subject=science`, and `/devenir-tuteur` at 390 × 844 and 1440 × 900.

Pass conditions:

- one obvious form flow;
- no competing marketing rail;
- price and duration visible before fields;
- inputs and buttons have 44 px targets;
- no horizontal overflow;
- candidature anchor lands correctly.

- [ ] **Step 8: Commit each independently owned Task 7 half**

```powershell
git add src\pages\FirstSessionRequest.jsx test\editorial-request-page.test.mjs
git commit -m "feat: simplify session request page"

git add src\pages\DevenirTuteur.jsx test\editorial-recruitment-page.test.mjs
git commit -m "feat: simplify tutor recruitment page"
```

When one agent executes the whole task, it still creates these two focused commits in this order. When Workers 7A and 7B run concurrently, each owns one page and one test file, so no shared-file merge is required.

**Review gate:** Reviewer diffs form props and submission handlers against the previous commit before approving visual changes.

---

### Task 8: Apply the system to long-form public marketing routes

**Files:**

- Modify: `src/pages/Tuteurs.jsx`
- Modify: `src/pages/CaseStudies.jsx`
- Modify: `src/pages/BlogHub.jsx`
- Modify: `src/pages/BlogArticle.jsx`
- Modify: `src/pages/ResourcesHub.jsx`
- Modify: `src/pages/ResourceArticle.jsx`
- Modify: `src/pages/LocalLanding.jsx`
- Modify: `src/pages/OfferLanding.jsx`
- Modify: `src/components/BlogGridSection.jsx`
- Modify: `src/components/ResourceGridSection.jsx`
- Modify: `src/components/PricingSection.jsx`
- Modify: `src/components/KeywordIntentSection.jsx`
- Modify: `src/components/LocalOpportunitySection.jsx`
- Modify: `src/components/OfferPathwaysSection.jsx`
- Modify: `src/components/DecisionPathwaysSection.jsx`
- Create: `test/editorial-content-routes.test.mjs`
- Create: `test/editorial-service-routes.test.mjs`
- Verify unchanged: route data under `src/lib/blogContent.js`, `src/lib/resourceContent.js`, `src/lib/offerContent.js`, and `src/lib/routes.js`

**Interfaces:**

- Long-form pages adopt `PageIntro`, Button, canvas/surface/ink/muted/rule tokens, and `FinalConversionBand` where they already contain a final CTA.
- Content-grid components keep existing props, routing, data, and semantic headings.
- This task changes presentation and composition only.

- [ ] **Step 1: Add two independently owned failing long-form adoption contracts**

Create `test/editorial-content-routes.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const files = [
  "BlogHub.jsx",
  "BlogArticle.jsx",
  "ResourcesHub.jsx",
  "ResourceArticle.jsx",
]

test("content hubs and articles adopt the editorial system", async () => {
  for (const file of files) {
    const source = await readFile(new URL(`../src/pages/${file}`, import.meta.url), "utf8")
    assert.match(source, /bg-canvas|<PageIntro/)
    assert.doesNotMatch(source, /notebook-|action-surface|glass-panel|rounded-(?:2xl|3xl|full)|rounded-\[(?:2\d|3\d)px\]|backdrop-blur/)
  }
})
```

Create `test/editorial-service-routes.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const files = [
  "Tuteurs.jsx",
  "CaseStudies.jsx",
  "LocalLanding.jsx",
  "OfferLanding.jsx",
]

test("service, local, and offer routes adopt the editorial system", async () => {
  for (const file of files) {
    const source = await readFile(new URL(`../src/pages/${file}`, import.meta.url), "utf8")
    assert.match(source, /bg-canvas|<PageIntro/)
    assert.doesNotMatch(source, /notebook-|action-surface|glass-panel|rounded-(?:2xl|3xl|full)|rounded-\[(?:2\d|3\d)px\]|backdrop-blur/)
  }
})
```

- [ ] **Step 2: Run the test and record exact failing routes**

```powershell
node --test test\editorial-content-routes.test.mjs test\editorial-service-routes.test.mjs
```

Expected: failures identify each route still using legacy presentation classes.

- [ ] **Step 3: Migrate content hubs**

Update `BlogHub.jsx`, `ResourcesHub.jsx`, `BlogGridSection.jsx`, and `ResourceGridSection.jsx`:

```text
Use PageIntro for page headings.
Use 1 px rules between entries.
Use 8–12 px radii only for functional thumbnail clipping.
Keep all links, filters, pagination behavior, article metadata, and SEO.
Use sentence-case metadata without chip backgrounds.
```

- [ ] **Step 4: Migrate article templates**

Update `BlogArticle.jsx` and `ResourceArticle.jsx`:

```text
Use canvas background and ink type.
Keep article max width between 680 and 760 px.
Keep structured data, breadcrumbs, related links, and content rendering.
Replace decorative cards with bordered sections.
Keep callouts only when they carry content meaning.
```

- [ ] **Step 5: Migrate tutor, case-study, local, and offer routes**

Update `Tuteurs.jsx`, `CaseStudies.jsx`, `LocalLanding.jsx`, and `OfferLanding.jsx` plus their shared pathway/opportunity components:

```text
Preserve localized request links and SEO intent.
Use PageIntro and rule-separated content.
Keep tutor data and case-study wording unchanged.
Remove decorative chips, glows, large radii, gradient surfaces, and duplicate CTA panels.
Use FinalConversionBand once per route.
```

- [ ] **Step 6: Migrate pricing presentation without changing pricing data**

Update `PricingSection.jsx` only at the presentation layer:

```text
Use existing getOffer/formatting data unchanged.
Render plans as bordered columns or rows with 8 px radius maximum.
Do not mark a plan with glow, scale, colored shadow, or oversized badge.
Preserve offer IDs, amounts, session counts, links, and localized wording.
```

- [ ] **Step 7: Run long-form, pricing, and route checks**

```powershell
node --test test\editorial-content-routes.test.mjs test\editorial-service-routes.test.mjs test\conversion-links.test.mjs test\public-page-density.test.mjs
npm.cmd run check:pricing
npm.cmd run build
npm.cmd run check:site
```

Expected: tests pass, pricing contract passes, build passes, and all static routes pass.

- [ ] **Step 8: Sample visual QA**

Inspect one route from every template at 390 × 844 and 1440 × 900:

```text
/tuteurs
/etudes-de-cas or the configured case-study route
/blogue
one blog article
/ressources
one resource article
one Montreal or Laval local route
one offer route
```

Pass conditions: template consistency, readable article measure, no broken links, no legacy dark-card island, and no horizontal overflow.

- [ ] **Step 9: Commit each independently owned Task 8 route group**

```powershell
git add src\pages\BlogHub.jsx src\pages\BlogArticle.jsx src\pages\ResourcesHub.jsx src\pages\ResourceArticle.jsx src\components\BlogGridSection.jsx src\components\ResourceGridSection.jsx test\editorial-content-routes.test.mjs
git commit -m "feat: adopt editorial system for content routes"

git add src\pages\Tuteurs.jsx src\pages\CaseStudies.jsx src\pages\LocalLanding.jsx src\pages\OfferLanding.jsx src\components\PricingSection.jsx src\components\KeywordIntentSection.jsx src\components\LocalOpportunitySection.jsx src\components\OfferPathwaysSection.jsx src\components\DecisionPathwaysSection.jsx test\editorial-service-routes.test.mjs
git commit -m "feat: adopt editorial system for service routes"
```

When one agent executes the whole task, it still creates these two focused commits in this order. Workers 8A and 8B own disjoint page, component, and test files.

**Review gate:** Reviewer verifies that content data and route behavior are unchanged and that this task did not expand into article-copy rewriting.

---

### Task 9: Remove Living Notebook implementation and strengthen the quality gate

**Files:**

- Modify: `src/components/SimpleMarketingSections.jsx`
- Delete: `src/components/art/NotebookIllustration.jsx`
- Delete: `src/components/art/NotebookReveal.jsx`
- Modify: `src/index.css`
- Modify: `tailwind.config.js`
- Delete: `test/notebook-art.test.mjs`
- Modify: `test/uncodixfy-marketing.test.mjs`
- Modify: `test/marketing-visual-system.test.mjs`
- Modify: `test/marketing-page-direction.test.mjs`

**Interfaces:**

- `SimpleMarketingSections.jsx` retains only legacy exports still required by verified callers. `HeroShowcase` and Notebook-specific compositions are removed after `rg` proves there are no callers.
- New components under `src/components/marketing/` are the supported marketing surface API.
- Final Uncodixfy test scans migrated marketing files and explicitly excludes portal folders.

- [ ] **Step 1: Inventory remaining legacy references**

Run:

```powershell
rg -n "NotebookIllustration|NotebookReveal|notebook-|HeroShowcase|EditorialHero|JourneyHero|FormHero|panel-|journey-|action-surface|glass-panel|rounded-(2xl|3xl|full)|rounded-\[(2[0-9]|3[0-9])px\]|backdrop-blur|gradient" src --glob "!src/components/portal/**" --glob "!src/pages/Portal.jsx"
```

Expected: only known compatibility code remains. Any page output is migrated before deletion.

- [ ] **Step 2: Expand the failing Uncodixfy test to all migrated marketing files**

Replace the initial file list with:

```js
const marketingFiles = [
  "../src/components/marketing/MarketingHero.jsx",
  "../src/components/marketing/ServiceBrief.jsx",
  "../src/components/marketing/TrustStrip.jsx",
  "../src/components/marketing/ProcessSteps.jsx",
  "../src/components/marketing/SubjectRows.jsx",
  "../src/components/marketing/ParentTimeline.jsx",
  "../src/components/marketing/VerifiedReviews.jsx",
  "../src/components/marketing/MarketingFaq.jsx",
  "../src/components/marketing/FinalConversionBand.jsx",
  "../src/components/marketing/SubjectHero.jsx",
  "../src/components/marketing/PageIntro.jsx",
  "../src/components/marketing/MarketingHeader.jsx",
  "../src/components/marketing/MobileNavigation.jsx",
  "../src/components/marketing/MarketingFooter.jsx",
  "../src/components/LanguageToggle.jsx",
  "../src/layouts/SiteLayout.jsx",
  "../src/pages/Accueil.jsx",
  "../src/pages/AccueilEn.jsx",
  "../src/pages/Maths.jsx",
  "../src/pages/Sciences.jsx",
  "../src/pages/NotreApproche.jsx",
  "../src/pages/Temoignages.jsx",
  "../src/pages/ParentTrust.jsx",
  "../src/pages/FirstSessionRequest.jsx",
  "../src/pages/DevenirTuteur.jsx",
]
```

Apply these assertions to the joined source:

```js
assert.doesNotMatch(source, /notebook-|NotebookIllustration|NotebookReveal/)
assert.doesNotMatch(source, /rounded-(?:2xl|3xl|full)|rounded-\[(?:2\d|3\d)px\]/)
assert.doesNotMatch(source, /backdrop-blur|linear-gradient|radial-gradient|conic-gradient/)
assert.doesNotMatch(source, /shadow-\[0_(?:2[4-9]|[3-9]\d)px/)
assert.doesNotMatch(source, /active:(?:translate|scale)|hover:(?:translate|scale)/)
assert.doesNotMatch(source, /framer-motion|gsap|motion\/react/)
```

Allow `rounded-full` only in a documented avatar component outside this scan. Marketing controls use `rounded-lg`.

- [ ] **Step 3: Run the expanded test and migrate every reported source**

```powershell
node --test test\uncodixfy-marketing.test.mjs
```

Expected: red until all scanned files comply. Fix only the reported marketing presentation source; do not change portal code.

- [ ] **Step 4: Remove obsolete components and CSS**

After `rg` confirms zero imports:

```powershell
git rm src\components\art\NotebookIllustration.jsx
git rm src\components\art\NotebookReveal.jsx
git rm test\notebook-art.test.mjs
```

Remove from `src/index.css`:

```text
Notebook paper, ink, grid, label, annotation, reveal, and button classes.
Panel ink/soft/gold classes no longer referenced by public marketing files.
Journey surface, track, step, count, and eyebrow classes no longer referenced.
Action-surface and decorative gradient rules.
Legacy display-font references no longer required by portal code.
```

Before removing any CSS selector, run `rg` for its class name and preserve selectors still used by portal code.

- [ ] **Step 5: Shrink `SimpleMarketingSections.jsx` safely**

Run:

```powershell
rg -n "from \"@/components/SimpleMarketingSections\"" src
```

For every remaining export, keep the export or migrate its caller in the same commit. Remove `HeroShowcase`, `EditorialHero`, `JourneyHero`, `FormHero`, and their dead helpers when no callers remain. Do not delete unrelated exports still used by offer/local templates.

- [ ] **Step 6: Run all focused marketing tests and build**

```powershell
node --test test\visual-system.test.mjs test\button-system.test.mjs test\uncodixfy-marketing.test.mjs test\editorial-marketing-primitives.test.mjs test\marketing-motion.test.mjs test\marketing-navigation.test.mjs test\marketing-visual-system.test.mjs test\marketing-layout-contract.test.mjs test\marketing-page-direction.test.mjs test\marketing-evidence-contract.test.mjs test\editorial-request-page.test.mjs test\editorial-recruitment-page.test.mjs test\editorial-content-routes.test.mjs test\editorial-service-routes.test.mjs
npm.cmd run build
```

Expected: every focused test passes and build exits with code 0.

- [ ] **Step 7: Commit Task 9**

```powershell
git add -A src\components\SimpleMarketingSections.jsx src\components\art src\index.css tailwind.config.js test
git commit -m "refactor: remove living notebook marketing system"
```

**Review gate:** Reviewer confirms `git diff --stat` contains only expected deletions/migrations, no portal file edits, and no required export was removed without a caller migration.

---

### Task 10: Complete responsive, accessibility, performance, and regression verification

**Files:**

- Modify only when verification identifies a reviewed defect.
- Create: `docs/qa/editorial-service-studio-visual-audit.md`
- Modify: `docs/superpowers/plans/2026-08-01-editorial-service-studio-redesign.md` checkbox state during execution.

**Interfaces:**

- Produces a written QA matrix with route, viewport, result, defect link or fix commit, and reviewer sign-off.
- Produces final evidence required by `superpowers:verification-before-completion`.

- [ ] **Step 1: Run the complete site and portal regression suites**

```powershell
npm.cmd run test:site
npm.cmd run test:portal
npm.cmd run test:payments
```

Expected:

- Site tests, pricing contract, production build, and static route checks pass.
- Portal tests pass because shared CSS and Button changed.
- Payment tests pass because pricing and request presentation changed but contracts did not.

- [ ] **Step 2: Run all new focused tests together**

```powershell
node --test test\uncodixfy-marketing.test.mjs test\editorial-marketing-primitives.test.mjs test\marketing-motion.test.mjs test\marketing-navigation.test.mjs test\marketing-visual-system.test.mjs test\marketing-layout-contract.test.mjs test\marketing-page-direction.test.mjs test\marketing-evidence-contract.test.mjs test\editorial-request-page.test.mjs test\editorial-recruitment-page.test.mjs test\editorial-content-routes.test.mjs test\editorial-service-routes.test.mjs
```

Expected: zero failures.

- [ ] **Step 3: Start a local production preview**

```powershell
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4175
```

Expected: preview responds at `http://127.0.0.1:4175`.

- [ ] **Step 4: Create the visual audit document before inspection**

Create `docs/qa/editorial-service-studio-visual-audit.md` with this exact matrix header:

```markdown
# Editorial Service Studio Visual Audit

| Route | 320×568 | 390×844 | 412×915 | 768×1024 | 1024×768 | 1440×900 | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | | | | | | | |
| `/en` | | | | | | | |
| `/maths` | | | | | | | |
| `/sciences` | | | | | | | |
| `/notre-approche` | | | | | | | |
| `/temoignages` | | | | | | | |
| `/demande?subject=math` | | | | | | | |
| `/demande?subject=science` | | | | | | | |
| `/devenir-tuteur` | | | | | | | |
| `/blogue` | | | | | | | |
| `/ressources` | | | | | | | |
| `/portail` | | | | | | | |
```

- [ ] **Step 5: Inspect every matrix cell using the in-app Browser**

For each route and viewport, record Pass or the exact defect. Check:

```text
No horizontal overflow.
Header controls fit without collision.
Primary CTA visible in first 390×844 homepage viewport.
Homepage H1 uses four lines or fewer at 390 px.
Text measure remains readable.
Section order matches the contract.
Menu focus and Escape behavior work.
Sticky action appears and is suppressed on correct routes.
Math/science subject prefill is visible in request form.
Forms are keyboard usable without submitting.
Reduced-motion mode shows all content.
No Notebook grid, fake chart, giant radius, gradient, glow, or floating card remains.
Portal remains usable.
```

- [ ] **Step 6: Run automated accessibility and performance checks available in the environment**

Use Lighthouse or the available browser audit surface against the local production preview for `/` and `/demande`.

Targets:

```text
Performance: 90 or higher.
Accessibility: 95 or higher.
SEO: 95 or higher.
CLS: below 0.1.
```

If a target misses, record the exact audit and fix only the measured cause. Re-run the affected focused test, build, route screenshot, and audit.

- [ ] **Step 7: Verify repository integrity**

```powershell
git diff --check
git status --short
git log --oneline --decorate -12
```

Expected:

- No whitespace errors.
- Only the visual audit document or intentionally reviewed final fixes are uncommitted.
- Task commits appear in plan order.

- [ ] **Step 8: Commit QA evidence**

```powershell
git add docs\qa\editorial-service-studio-visual-audit.md docs\superpowers\plans\2026-08-01-editorial-service-studio-redesign.md
git commit -m "docs: record editorial redesign visual audit"
```

- [ ] **Step 9: Invoke completion skills**

Use `superpowers:requesting-code-review`, then `superpowers:verification-before-completion`, then `superpowers:finishing-a-development-branch`.

Do not merge, push, open a pull request, or deploy until the user selects the completion option. If deployment is later approved, deploy the verified commit and confirm the public production URL returns HTTP 200.

**Final review gate:** Completion requires green tests, completed visual matrix, accessibility/performance evidence, clean task branch, and explicit user integration choice.

---

## Specification Coverage Matrix

| Design specification section | Implemented and verified by |
| --- | --- |
| Objective and current-state correction | Tasks 4 and 10 |
| Parent-first product priority and preserved contracts | Tasks 3–8; full regression in Task 10 |
| Scope and non-goals | Global constraints, file ownership table, every task review gate |
| Visual tokens, typography, spacing, radii, shadows | Task 1; cleanup and scan in Task 9 |
| Uncodixfy quality gate | Tasks 1, 2, 4–9; final scan in Task 9 |
| Desktop/mobile navigation, menu, footer, sticky action | Task 3; responsive matrix in Task 10 |
| Homepage hero, proof, process, subjects, timeline, reviews, FAQ, CTA | Task 4 |
| Math, Science, and Our Approach compositions | Task 5 |
| Parent Journey and trust evidence | Task 6 |
| First-session request and tutor recruitment | Task 7 |
| Long-form system adoption | Task 8 |
| Component boundaries and legacy migration | Tasks 2–9 |
| Motion system and reduced motion | Task 2; menu behavior in Task 3; full scan in Task 9 |
| Accessibility and responsive behavior | Per-task visual gates; complete matrix in Task 10 |
| Performance budget | No dependency rules throughout; measured in Task 10 |
| Automated and visual testing strategy | Tests introduced in Tasks 1–9; aggregated in Task 10 |
| Agent execution model | Execution topology and `docs/agents/editorial-service-studio-agent-handoff.md` |
| Final acceptance criteria | Task 10 final review gate |

---

## Agent Review Checklist Used After Every Task

The orchestrator asks these questions before accepting a task:

1. Did the agent modify only the listed files or explain every necessary exception?
2. Did the failing test fail for the intended missing behavior before implementation?
3. Do the produced prop names and exports exactly match downstream consumers?
4. Are all conversion, localization, SEO, price, and form contracts preserved?
5. Does the UI comply with the Uncodixfy rejection list?
6. Does mobile receive an intentional composition rather than stacked desktop panels?
7. Are focus states, semantic elements, and reduced motion covered?
8. Did focused tests and build commands pass with captured output?
9. Did the agent perform the route/viewport checks required by the task?
10. Is the commit focused enough to revert independently?

Reject the task when any answer is no.

## Recommended Agent Sequence

```text
Orchestrator preflight
  → Agent 1: Task 1 tokens and controls
  → Review
  → Agent 2: Task 2 primitives
  → Review
  → Agent 3: Task 3 navigation
  → Review
  → Agent 4: Task 4 homepages
  → Review
  → Agent 5: Task 5 subject and approach routes
  → Review
  → Agent 6: Task 6 parent evidence
  → Review
  → Agents 7A and 7B: Task 7 request and recruitment, separate file ownership
  → Review and integration
  → Agents 8A and 8B: Task 8 content hubs/articles and local/offer routes, separate file ownership
  → Review and integration
  → Agent 9: Task 9 cleanup
  → Review
  → Agent 10: Task 10 QA
  → Independent final code review
  → Verification
  → User integration decision
```

Tasks 1–6 and 9–10 remain sequential. Only the explicitly separated page groups in Tasks 7 and 8 may run concurrently.
