# Editorial Service Studio Redesign — Design Specification

**Status:** Approved for implementation planning

**Date:** 2026-08-01

**Primary audience:** Quebec parents looking for secondary-school math or science tutoring

**Reference skill:** [Uncodixfy SKILL.md](https://github.com/cyxzdev/Uncodixfy/blob/main/SKILL.md)
**Implementation constraint:** This document defines design and behavior only. It does not authorize changes to the portal, APIs, billing, CRM, SEO routes, or lead-processing contracts.

## 1. Objective

Replace the current “Living Notebook” marketing presentation with a polished, restrained editorial service website that feels deliberately designed, trustworthy, and easy to use on a phone.

The redesign must make the parent’s next action obvious within the first mobile viewport, provide verifiable proof before decorative storytelling, and remove the repeated visual patterns that make the current site feel generated or amateur.

The finished site should communicate four things within seconds:

1. Methode Secondaire provides math and science tutoring for Quebec secondary students.
2. A parent can explain the situation without creating an account or choosing a package.
3. The team selects a suitable tutor and confirms a first 60-minute session at CA$65.
4. The parent receives a clear follow-up path after the session.

## 2. Current-state audit

The supplied 390 px mobile screenshot exposes the main redesign problems:

- The header uses four visually heavy rounded controls before the content begins.
- The logo mark, language control, calendar button, and menu button compete equally for attention.
- The hero headline consumes most of the viewport and wraps into too many lines.
- The primary action appears below the initial viewport.
- The paper grid is repeated as a large theme instead of supporting the content.
- Large border radii are repeated across the hero, logo container, buttons, menus, and panels.
- The blue/yellow combination reads as a generic education template rather than a specific service brand.
- The hero explains the emotional problem at length before showing the service process or evidence.
- The design relies on nested panels and illustration-like graphics where plain information would be more credible.

The new direction must remove these causes, not restyle them.

## 3. Product priorities

### 3.1 Primary journey

The homepage is designed first for a parent who is worried, short on time, and trying to decide whether to ask for help.

The primary conversion remains the localized session-request flow. The site must preserve:

- localized French and English routes;
- the session request URLs and subject-prefill behavior;
- the displayed CA$65 / 60-minute first-session offer;
- lead-form submissions and confirmation routes;
- phone links;
- tracking hooks and `data-primary-action` behavior;
- static SEO generation, structured data, canonical URLs, alternates, and prerendering.

### 3.2 Secondary journeys

- Understand the tutoring approach.
- Compare math and science support.
- Review parent follow-up and verified testimonials.
- Apply to become a tutor.
- Sign in to an existing portal account.

Secondary journeys must never visually compete with the session-request action on the homepage.

## 4. Scope

### 4.1 Full redesign scope

- Global marketing header, mobile navigation, sticky mobile action, and footer.
- Homepage in French and English.
- Math and science subject pages.
- Our Approach page.
- Parent journey / testimonials page.
- First-session request page and form framing.
- Tutor recruitment page.

### 4.2 System adoption only

Blog, resource, local SEO, trust, tutor roster, and long-form content pages adopt the shared typography, color, navigation, buttons, spacing, page-intro, and footer system. Their information architecture is not rewritten in the first implementation phase.

### 4.3 Explicit non-goals

- Parent, tutor, operator, and student portal redesign.
- API, database, authentication, CRM, payments, booking, or pricing changes.
- New testimonials, success metrics, tutor identities, portraits, or claims.
- New animation libraries.
- Replacing React, Vite, React Router, Tailwind, Radix, or Lucide.
- Generating decorative photography or fake product screenshots.
- Rewriting every long-form article.

## 5. Design direction: Editorial Service Studio

The site should feel like a modern, small, expert service business: composed, direct, warm, and operationally credible.

The design must not imitate a SaaS dashboard or an agency-template landing page. It uses clear type, thin rules, generous but controlled whitespace, and full-width editorial sections instead of floating card collections.

### 5.1 Visual tokens

| Role | Value | Usage |
| --- | --- | --- |
| Canvas | `#F6F3EE` | Default page background |
| Surface | `#FFFEFB` | Form controls and occasional content surfaces |
| Ink | `#171918` | Headings, body copy, dark bands |
| Muted ink | `#6B6A63` | Supporting copy and metadata |
| Action | `#D95F43` | Primary button and essential active states |
| Action hover | `#BC4932` | Primary button hover |
| Moss | `#5F735C` | Secondary subject cue and verified-success accents |
| Rule | `#D8D1C6` | Borders, dividers, field outlines |
| Utility dark | `#191B1A` | Footer and final conversion band |
| Focus | `#315CF5` | Keyboard focus ring only |

No component may introduce an unrelated color. Status and validation colors may use existing semantic tokens where functionally required.

### 5.2 Typography

- Use Manrope as the single marketing type family because it already exists in the project.
- Do not mix serif and sans-serif families.
- Do not use uppercase letter-spaced eyebrow labels as decoration.
- Use sentence case for navigation, buttons, section labels, and headings.
- Desktop H1: `clamp(3rem, 5.5vw, 4.5rem)`, maximum line length 13–16 characters per intentional line when manually balanced.
- Mobile H1: `clamp(2.25rem, 10vw, 2.75rem)`, maximum four rendered lines at 390 px.
- Section H2: 32–48 px desktop and 28–36 px mobile.
- Body: 16–18 px with 1.5–1.65 line height.
- Metadata: 13–14 px, never below 12 px.
- Reading width: 55–68 characters.

### 5.3 Spacing and layout

- Use an 8 px base spacing system with 4 px only for fine alignment.
- Marketing container: 1180–1240 px maximum.
- Horizontal gutter: 16 px at 320–479 px, 24 px at 480–1023 px, 32 px at 1024 px and above.
- Default section spacing: 56 px mobile, 88 px desktop.
- Compact related sections may use 40 px mobile and 64 px desktop.
- Controls use 8 px radius; content surfaces use 0–12 px radius.
- Thin 1 px dividers replace most card boundaries.
- Shadows are absent by default; the maximum permitted shadow is `0 2px 8px rgba(0,0,0,.08)` for menus and focused overlays.

## 6. Mandatory Uncodixfy quality gate

Every implementation agent must read the upstream Uncodixfy skill before editing marketing UI. The skill is a rejection checklist, not a source of ready-made components.

The marketing redesign must reject:

- 20–36 px border radii;
- pill buttons and decorative chips;
- floating or nested card shells;
- glassmorphism and decorative backdrop blur;
- gradients used to simulate visual polish;
- dramatic or colored shadows;
- decorative glows, blobs, haze, and conic effects;
- fake charts, counters, percentages, and metrics;
- eyebrow labels and ornamental uppercase copy;
- generic startup copy;
- hover translation, bounce, scale, and spring motion;
- repeated explanatory mini-notes;
- mixed alignment systems;
- a mobile layout that merely stacks large desktop panels;
- decorative icon backgrounds;
- style changes made only because they are easy to generate.

Functional exceptions must be documented in the implementing commit and reviewed before merge.

## 7. Global navigation

### 7.1 Desktop header

- Sticky height: 64 px.
- Background: canvas at 96–100% opacity.
- Bottom border: 1 px rule color.
- Left: full wordmark, not a logo mark inside a decorative rounded square.
- Center/right navigation: Home, Math, Science, Our Approach, Parent Journey.
- Utility links: portal sign-in and tutor recruitment may move into a simple secondary menu if space requires it.
- Language control: plain FR and EN text with an underline or weight change for the active locale.
- One primary button: Request a session.
- No backdrop blur unless readability testing proves it necessary; any accepted use must be limited to the sticky header.

### 7.2 Mobile header

- Height: 60 px.
- Left: compact wordmark.
- Right: a short labeled primary action such as “Une séance” / “A session”, followed by a menu button.
- Do not use an icon-only calendar as the primary conversion action.
- Menu button is a plain 44 px control with an 8 px radius.
- The primary action, language switcher, and menu must not have equal visual weight.

### 7.3 Mobile menu

- Uses a solid canvas or ink background.
- Contains simple text rows separated by spacing or rules.
- Includes the locale switch, portal sign-in, tutor recruitment, phone action, and primary request action.
- Opens with opacity and visibility changes only.
- Moves focus to the menu title or first link and returns focus to the trigger when closed.
- Locks background scroll while open.

### 7.4 Sticky mobile action

- May remain after the first hero CTA leaves the viewport.
- Contains a full text label and price context, not only an icon.
- Height stays between 56 and 64 px plus safe-area inset.
- Does not appear on request, thank-you, portal, or team routes.

## 8. Homepage composition

### 8.1 Hero copy

Recommended French copy:

- Context line: “Tutorat secondaire · Maths et sciences · Québec”
- H1: “Le bon tuteur, au bon moment.”
- Description: “Expliquez le niveau, la matière et ce qui bloque. Nous vous rappelons, choisissons le tuteur et fixons la première séance de 60 min à 65 $.”
- Primary action: “Demander une séance”
- Secondary action: “Voir comment ça fonctionne”
- Trust line: “Réponse humaine · Aucun abonnement requis · Portail parent après la première séance”

Recommended English copy:

- Context line: “Quebec high-school tutoring · Math and science”
- H1: “The right tutor, at the right time.”
- Description: “Tell us the grade, subject, and what is getting in the way. We call you back, choose the tutor, and confirm a first 60-minute session for CA$65.”
- Primary action: “Request a session”
- Secondary action: “See how it works”
- Trust line: “A real reply · No subscription required · Parent portal after the first session”

### 8.2 Hero layout

- Desktop: 58/42 two-column grid with aligned top and bottom edges.
- Mobile: content first, service brief immediately after the primary and secondary actions.
- The primary CTA must appear within the first 844 px at 390 px viewport width.
- The H1 must render in four lines or fewer at 390 px.
- Remove the notebook grid, oversized paper shell, dark floating illustration panel, fake progress graph, decorative label, and 24+ px radii.

### 8.3 Service brief

The supporting column is functional information arranged with rules:

1. “Décrivez le besoin” / “Describe the need”
2. “Nous choisissons le bon tuteur” / “We choose the right tutor”
3. “La première séance confirme le jumelage” / “The first session confirms the match”

Display CA$65, 60 minutes, and expected follow-up behavior as plain facts. Do not render them as pills or fake dashboard metrics.

### 8.4 Proof strip

- Uses verified project content only.
- May include served region, supported subjects, named review source, and no-subscription process.
- Does not invent review counts, average grades, improvement percentages, or response-time guarantees.
- Desktop uses a horizontal row separated by vertical rules.
- Mobile uses compact rows separated by horizontal rules.

### 8.5 Process section

- Three numbered steps.
- Each step contains one short heading and no more than two body lines.
- Numbers are plain type, not circular icon badges.
- Desktop uses three columns; mobile uses a compact vertical list.

### 8.6 Subject rows

- Math and science are two large editorial links, not identical rounded cards.
- Each row includes a parent situation, tutoring outcome, and text link.
- Math may use the action color as a thin rule; science may use moss.
- Avoid decorative equations, graphs, lab icons, and generic stock imagery.

### 8.7 Parent timeline

Show the real service sequence:

1. Request received.
2. Need clarified.
3. Tutor selected.
4. First session completed.
5. Parent update and next action recorded.

Use a semantic ordered list with rules. Do not use a fake progress widget.

### 8.8 Reviews

- One primary verified quote and two compact supporting excerpts.
- Use existing review content and attribution rules.
- Do not generate portraits, names, ratings, outcomes, or quotation text.
- Reviews use typography and dividers rather than repeated cards.

### 8.9 FAQ and final conversion

- FAQ uses accessible details/summary or existing Radix primitives.
- Final conversion is a full-width utility-dark band with one concise heading, the CA$65 / 60-minute fact, and one primary action.
- Do not add a secondary card, badge cluster, illustration, or gradient.

## 9. Page-specific compositions

### 9.1 Math and science

- Share a subject-page shell but retain subject-specific copy and request prefill.
- Use a short subject intro, common parent situations, tutoring approach, first-session expectations, verified proof, FAQ, and request action.
- Remove fake progress charts and decorative diagram panels.
- Subject differentiation comes from content, rule color, and examples—not a separate visual theme.

### 9.2 Our Approach

- Present the method in four phases using a numbered editorial sequence.
- Make responsibilities explicit for the team, tutor, student, and parent.
- Use real operational statements and avoid philosophy-only copy.

### 9.3 Parent Journey / Testimonials

- Lead with verified evidence and explain what the parent can actually follow.
- Show the parent timeline and a restrained portal preview using real labels already present in portal copy.
- Do not recreate the portal as a fake dashboard illustration.

### 9.4 First-session request

- One centered form column, 680–760 px maximum.
- Plain summary above the form: session price, duration, what happens after submission.
- Clear field groups with labels above inputs.
- Preserve subject query prefill, offer data, validation, privacy consent, success navigation, and CRM behavior.
- Avoid a competing left marketing column on desktop.

### 9.5 Tutor recruitment

- Keep the same visual system but use role-specific content.
- Order: role summary, requirements, service region, compensation, process, application.
- Show compensation as text with context, not as a promotional badge.
- Preserve the candidature anchor and submission behavior.

## 10. Component architecture

`SimpleMarketingSections.jsx` is currently too broad. The migration creates focused components under `src/components/marketing/` and uses adapters where required until all call sites move.

Target components:

- `MarketingHero.jsx`
- `ServiceBrief.jsx`
- `TrustStrip.jsx`
- `ProcessSteps.jsx`
- `SubjectRows.jsx`
- `ParentTimeline.jsx`
- `VerifiedReviews.jsx`
- `MarketingFaq.jsx`
- `FinalConversionBand.jsx`
- `SubjectHero.jsx`
- `PageIntro.jsx`
- `Reveal.jsx`
- `MarketingHeader.jsx`
- `MobileNavigation.jsx`
- `MarketingFooter.jsx`

Each component must have one clear responsibility, accept data through explicit props, and avoid route-specific copy unless it is a route wrapper.

Migration rule: move one composition at a time, update its callers, run focused tests, then remove the obsolete implementation. Do not rewrite `SimpleMarketingSections.jsx` and every caller in one unreviewable commit.

## 11. Motion system

- Do not add Framer Motion or another animation dependency.
- Standard UI transition: 140 ms ease-out.
- Reveal transition: 180 ms ease-out, opacity only.
- Navigation/menu transition: 160 ms opacity/visibility.
- Button and link states: color, background, border-color, and text-decoration only.
- FAQ may animate measured height and opacity for 180 ms.
- Reveal plays once when 15% of the element enters the viewport.
- Content remains visible when IntersectionObserver is unavailable.
- `prefers-reduced-motion: reduce` disables reveal and non-essential transitions.
- No parallax, marquee, bouncing, spring motion, scale, hover translation, cursor trails, animated gradients, counters, or scroll-jacking.

## 12. Accessibility, responsive behavior, and performance

### 12.1 Accessibility

- WCAG AA contrast for text and controls.
- Visible 2 px focus ring using the focus token.
- Touch targets at least 44 × 44 px.
- Correct heading order and landmarks.
- Descriptive link labels; no repeated “Learn more” without context.
- Menu focus trap, Escape close, and focus return.
- Form errors linked to inputs with `aria-describedby`.
- Decorative icons use `aria-hidden`.
- Motion honors reduced-motion preferences.

### 12.2 Responsive acceptance viewports

- 320 × 568
- 390 × 844
- 412 × 915
- 768 × 1024
- 1024 × 768
- 1440 × 900

No viewport may produce horizontal page scrolling. Mobile sections require intentional recomposition; agents must not rely on stacking desktop cards unchanged.

### 12.3 Performance budget

- Lighthouse mobile targets: Performance 90+, Accessibility 95+, SEO 95+.
- CLS below 0.1.
- No new animation library.
- New client-side animation code below approximately 8 KiB gzip.
- Preserve route-level lazy loading and static generation.
- Any future photography must use AVIF/WebP, responsive dimensions, explicit width/height, and lazy loading below the fold.

## 13. Testing strategy

Add focused contract tests:

- `test/uncodixfy-marketing.test.mjs`: scans marketing files for prohibited visual classes and dependencies while excluding portal code.
- `test/marketing-layout-contract.test.mjs`: verifies homepage hero, primary action, service brief, proof strip, process, and final conversion.
- `test/marketing-navigation.test.mjs`: verifies localized links, labeled mobile CTA, menu semantics, and focused-route suppression.
- `test/marketing-motion.test.mjs`: verifies reduced-motion fallback and absence of prohibited animation dependencies/patterns.
- `test/marketing-conversion.test.mjs`: verifies prices, request URLs, subject prefill, form contracts, and CTA data attributes.

Preserve and run:

- `npm.cmd run test:site`
- pricing contract checks;
- static site checks for all generated routes;
- production build;
- existing portal tests when shared primitives or global CSS change.

Visual QA routes:

- `/`
- `/en`
- `/maths`
- `/sciences`
- `/notre-approche`
- `/temoignages`
- `/demande`
- `/devenir-tuteur`

At each responsive acceptance viewport, verify navigation, first-viewport CTA visibility, type wrapping, content order, form usability, focus states, absence of horizontal overflow, and reduced-motion behavior.

## 14. Agent execution model

The implementation plan will be optimized for lower-cost agents with narrow context windows.

Every task must include:

- exact files to read and modify;
- exact interfaces it consumes and produces;
- a failing test first;
- the expected failure;
- the smallest implementation step;
- the exact verification command and expected result;
- a visual QA checklist when UI changes;
- a commit message;
- explicit files and areas that must not be modified.

Recommended agent domains:

1. Design tokens and Uncodixfy guard tests.
2. Header, mobile navigation, sticky action, and footer.
3. Homepage parent-first composition.
4. Math, science, and approach pages.
5. Parent journey, request, and recruitment pages.
6. Shared-system adoption for long-form marketing pages.
7. Visual, accessibility, performance, and regression audit.

An orchestrator reviews each task before the next agent starts. Agents that modify shared files such as `src/index.css`, `SiteLayout.jsx`, or `SimpleMarketingSections.jsx` must run sequentially. Page-domain agents may run in parallel only after shared contracts are committed and when their file sets do not overlap.

## 15. Acceptance criteria

The redesign is complete only when all of the following are true:

- The homepage primary CTA is fully visible within the first viewport at 390 × 844.
- The mobile hero headline renders in four lines or fewer.
- Marketing pages no longer use the notebook grid, floating graph illustration, 20–36 px repeated radii, glass panels, decorative gradients, or dramatic shadows.
- Navigation presents one clear primary action.
- Math and science pages retain correct localized subject-prefill behavior.
- The request form preserves its submission, validation, CRM, consent, and success-route contracts.
- All public routes build and pass static checks.
- Shared CSS changes do not regress portal routes.
- Reduced-motion users receive all content without animation delay.
- Keyboard navigation, focus states, and menu behavior pass manual QA.
- The required automated tests pass.
- Visual QA passes at all required viewports and routes.
- No invented reviews, statistics, outcomes, tutor identities, portraits, or guarantees appear in the final UI.
