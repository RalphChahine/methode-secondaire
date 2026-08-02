# Editorial Service Studio — Agent Handoff

This document is the operational brief for lower-cost agents implementing the approved marketing redesign. It is documentation only and does not authorize implementation outside the referenced plan.

## Source of truth

Read in this order:

1. `docs/superpowers/specs/2026-08-01-editorial-service-studio-redesign-design.md`
2. `docs/superpowers/plans/2026-08-01-editorial-service-studio-redesign.md`
3. This handoff
4. [Uncodixfy SKILL.md](https://github.com/cyxzdev/Uncodixfy/blob/main/SKILL.md)

When documents differ, the design specification wins for requirements and the implementation plan wins for sequencing and exact files.

## Required skills

The executing agent must use:

- `superpowers:using-superpowers`
- `superpowers:subagent-driven-development` for orchestrated multi-agent execution, or `superpowers:executing-plans` for a single lower-cost agent
- `superpowers:test-driven-development`
- `superpowers:systematic-debugging` when a test or visual check fails unexpectedly
- `superpowers:verification-before-completion`
- `superpowers:requesting-code-review`
- `superpowers:finishing-a-development-branch`
- Uncodixfy from `cyxzdev/Uncodixfy`

If Uncodixfy is not installed, run:

```powershell
npx.cmd skills add cyxzdev/Uncodixfy
```

Then read its full `SKILL.md` before editing UI.

## Non-negotiable boundaries

- Work in `.worktrees/editorial-service-studio` on `codex/editorial-service-studio`.
- Do not implement in the user’s dirty main checkout.
- Do not edit portal components, API code, CRM logic, payment logic, authentication, route data, pricing data, or content datasets unless the assigned task explicitly lists the file.
- Do not invent claims, reviews, metrics, names, portraits, guarantees, prices, or service behavior.
- Do not add dependencies.
- Do not deploy or push without an explicit integration choice after final verification.
- Do not continue past a review gate until the orchestrator accepts the task.
- Do not combine tasks into a broad redesign commit.
- Do not “improve” copy outside the exact approved copy and existing content sources.

## Master prompt for one lower-cost implementation agent

Copy this prompt into a fresh agent session:

```text
Implement the approved Editorial Service Studio redesign in the repository.

You must work from these sources in order:
1. docs/superpowers/specs/2026-08-01-editorial-service-studio-redesign-design.md
2. docs/superpowers/plans/2026-08-01-editorial-service-studio-redesign.md
3. docs/agents/editorial-service-studio-agent-handoff.md
4. https://github.com/cyxzdev/Uncodixfy/blob/main/SKILL.md

Required workflow:
- Invoke superpowers:using-superpowers.
- Use superpowers:using-git-worktrees to create or validate `.worktrees/editorial-service-studio` on branch `codex/editorial-service-studio`.
- Use superpowers:executing-plans.
- Use superpowers:test-driven-development for every task.
- Complete exactly one numbered task at a time.
- Stop after each task’s tests, visual QA, commit, and review-gate summary.
- Do not begin the next task until I approve.
- Use Uncodixfy as a rejection checklist before every visual commit.
- Preserve all conversion, localization, SEO, form, pricing, and portal contracts.
- Do not add dependencies.
- Do not push, merge, open a PR, or deploy unless I explicitly select that option after final verification.

For every task, return:
1. task number and outcome;
2. files modified;
3. failing test observed before implementation;
4. verification commands and exit results;
5. routes and viewports visually inspected;
6. Uncodixfy violations checked;
7. commit hash;
8. risks or follow-up review points.

Begin with the plan’s preflight and baseline gate. Stop after reporting the baseline result.
```

## Master prompt for an orchestrator using fresh task agents

```text
Orchestrate the approved Editorial Service Studio redesign using superpowers:subagent-driven-development.

Read completely:
- docs/superpowers/specs/2026-08-01-editorial-service-studio-redesign-design.md
- docs/superpowers/plans/2026-08-01-editorial-service-studio-redesign.md
- docs/agents/editorial-service-studio-agent-handoff.md
- https://github.com/cyxzdev/Uncodixfy/blob/main/SKILL.md

Use branch `codex/editorial-service-studio` in `.worktrees/editorial-service-studio`.

Dispatch a fresh agent for each numbered plan task. Give each agent only its task text, global constraints, produced interfaces from earlier tasks, and current verification status. Review every result against the ten-item review checklist in the plan before accepting it.

Tasks 1–6 and 9–10 are sequential. In Task 7, request and recruitment may run concurrently only when the agents edit separate page and test files. In Task 8, content hubs/articles and local/offer routes may run concurrently only after component ownership is separated. No two agents may edit `src/index.css`, `SiteLayout.jsx`, `SimpleMarketingSections.jsx`, or the same test file concurrently.

Require red-green-refactor, a focused commit, responsive QA, and Uncodixfy review for each task. Integrate task branches or shared-worktree commits only after review. Run the full site, portal, and payment regressions at Task 10.

Do not push, merge, open a PR, or deploy before explicit user choice after final verification.
```

## Task dispatch cards

Each card below is safe to send to a fresh worker together with the corresponding full task section from the implementation plan.

### Worker 1 — tokens and controls

```text
Execute Task 1 only: establish Editorial Service Studio tokens and restrained Button states.

Read the global constraints and full Task 1. You own only:
- src/index.css
- tailwind.config.js
- src/components/ui/button.jsx
- test/visual-system.test.mjs
- test/button-system.test.mjs
- test/uncodixfy-marketing.test.mjs

Do not remove legacy Notebook CSS still required by unmigrated callers. The shared Button must stop emitting Notebook classes and transform states. Follow the exact tests and token values in the plan. Run the focused tests and production build, commit with the planned message, then stop.

Return the required eight-part task report.
```

### Worker 2 — editorial primitives

```text
Execute Task 2 only: create Reveal, PageIntro, ServiceBrief, TrustStrip, and ProcessSteps.

Consume the tokens and Button API committed by Task 1. Follow the exact prop names in the plan. Use semantic lists and thin rules. Reveal is opacity-only, plays once, honors reduced motion, and exposes content without IntersectionObserver.

Do not edit page files, navigation, portal code, or legacy components. Run the two new tests, Uncodixfy guard, and production build. Commit with the planned message, then stop and return the required eight-part report.
```

### Worker 3 — navigation and footer

```text
Execute Task 3 only: extract MarketingHeader, MobileNavigation, and MarketingFooter, simplify LanguageToggle, and integrate them into SiteLayout.

Keep locale copy, route detection, section navigation, sticky observer, focused-route suppression, and Outlet ownership in SiteLayout. Preserve portal usability. The mobile primary action must be labeled, not calendar-icon-only. Do not mark the sticky action with data-primary-action; that marker belongs to the page hero used by the observer. Preserve LanguageToggle path translation while replacing its pill shell with plain links. Neutralize Sheet sliding only in MobileNavigation; do not change the shared Sheet primitive.

Run site-layout, marketing-navigation, and conversion-link tests, build, and header visual QA at the listed routes and viewports. Commit with the planned message, then stop and return the required report.
```

### Worker 4 — parent-first homepages

```text
Execute Task 4 only: build the new homepage marketing components and recompose Accueil.jsx and AccueilEn.jsx.

Use the exact French and English hero copy in the plan. Preserve SEO, JSON-LD, pricing APIs, request URLs, and the existing verified evidence source. Render sections in the exact contract order. The primary CTA must carry data-primary-action and be fully visible at 390×844. The H1 must use four lines or fewer at 390 px.

Do not invent proof, testimonials, metrics, or imagery. Do not modify subject pages or global layout. Run focused tests, build, and the complete homepage viewport QA. Commit with the planned message, then stop and return the required report.
```

### Worker 5 — Math, Science, and Our Approach

```text
Execute Task 5 only: create SubjectHero and migrate Maths.jsx, Sciences.jsx, and NotreApproche.jsx.

Preserve every localized request URL, subject prefill, SEO object, FAQ, and existing claim-safe content. Math uses action accent and Science uses moss. Both share one structure. Our Approach uses the exact four methodSteps defined in the plan and existing features as responsibility content.

Remove fake progress graphs and Notebook art. Do not modify homepage, parent evidence, forms, or global layout. Run focused tests, conversion tests, build, and three-route visual QA. Commit with the planned message, then stop and return the required report.
```

### Worker 6 — parent evidence

```text
Execute Task 6 only: rebuild Temoignages, ParentTrust, and the evidence-related compatibility sections.

Use only operationalPromisesByLocale, verifiedReviewsByLocale, and getParentJourney data already in the repository. Do not rewrite quotes or add results. Replace fake progress UI with ParentTimeline and rule-separated evidence. Keep disclaimers visible.

Do not modify conversionContent.js. Run evidence, page-direction, conversion, build, and visual checks. Commit with the planned message, then stop and return the required report.
```

### Worker 7A — session request

```text
Execute only the FirstSessionRequest half of Task 7.

Edit:
- src/pages/FirstSessionRequest.jsx
- test/editorial-request-page.test.mjs

Do not edit FirstSessionRequestForm.jsx. Preserve requestedOffer, initialSubject, localized page name, consent, CRM submission, success navigation, schema, robots directive, phone action, and alternates. Create one centered 720 px form journey with a plain price/duration summary.

Run request-focused tests and local form QA without submitting. Commit a focused request-page commit and return the required report.
```

### Worker 7B — tutor recruitment

```text
Execute only the DevenirTuteur half of Task 7.

Edit:
- src/pages/DevenirTuteur.jsx
- test/editorial-recruitment-page.test.mjs

Preserve candidature id, field names, validation, submission, success, tracking, locale behavior, compensation content, and recruitment links. Remove Notebook art and promotional panel styling. Use PageIntro, plain facts, requirements, ProcessSteps, and the existing form.

Run recruitment tests and local form QA without submitting. Commit a focused recruitment-page commit and return the required report.
```

### Worker 8A — content hubs and articles

```text
Execute the content-hub and article portion of Task 8.

Own only:
- src/pages/BlogHub.jsx
- src/pages/BlogArticle.jsx
- src/pages/ResourcesHub.jsx
- src/pages/ResourceArticle.jsx
- src/components/BlogGridSection.jsx
- src/components/ResourceGridSection.jsx
- test/editorial-content-routes.test.mjs

Preserve route data, SEO, article rendering, filters, links, and metadata. Adopt PageIntro, canvas/ink/rule tokens, readable article measure, and restrained entries. Do not rewrite content. Run focused tests, build, sample route QA, commit, and return the required report.
```

### Worker 8B — tutor, case-study, local, offer, and pricing routes

```text
Execute the tutor/case-study/local/offer portion of Task 8.

Own only the route and component files listed for those domains in Task 8 plus test/editorial-service-routes.test.mjs. Preserve all route data, pricing data, localized request links, and SEO intent. Replace legacy presentation with PageIntro, rules, restrained plan rows, and one FinalConversionBand per route.

Do not edit blog/resource files owned by Worker 8A. Run focused tests, pricing contract, build, static route checks, sample route QA, commit, and return the required report.
```

### Worker 9 — Notebook cleanup

```text
Execute Task 9 only after every public marketing route has migrated.

Start with the exact rg inventory command. Expand the Uncodixfy guard before deleting anything. Remove Notebook files, styles, tests, and dead SimpleMarketingSections exports only after zero-caller proof. Search every CSS selector before removal and preserve portal-used selectors.

Run the complete focused marketing test command and production build. Provide the rg before/after evidence in your report. Commit with the planned message, then stop.
```

### Worker 10 — QA and completion evidence

```text
Execute Task 10 only. Begin from a clean task branch after Task 9 review.

Run site, portal, payment, and all focused marketing tests. Build and start the production preview. Create the exact visual-audit matrix and inspect every route/viewport cell. Exercise navigation, focus, reduced motion, subject prefill, and forms without submitting. Run available Lighthouse/accessibility checks and record scores.

Fix only verified defects, with focused tests and a separate reviewed commit. Commit QA evidence. Then use requesting-code-review, verification-before-completion, and finishing-a-development-branch. Do not integrate or deploy until the user chooses an option.
```

## Required worker report format

Every worker response must use this structure:

```markdown
## Task N result

Outcome: completed | blocked

### Files changed
- exact/path

### Red evidence
- Command:
- Expected failure observed:

### Green evidence
- Command:
- Exit result:

### Visual QA
- Route and viewport:
- Result:

### Uncodixfy review
- Banned patterns checked:
- Exceptions: none, or exact reviewed exception

### Commit
- Hash:
- Message:

### Risks and reviewer focus
- Concrete risk or “No additional risk identified.”
```

A worker may report `blocked` only with the exact failing command, error output, files inspected, and the smallest decision needed from the orchestrator.

## Orchestrator acceptance response

When a task passes review, reply to the worker record with:

```text
Task N accepted.
Spec coverage: pass.
Interface consistency: pass.
Test evidence: pass.
Responsive evidence: pass.
Uncodixfy review: pass.
Approved commit: copy the exact hash from the worker’s accepted task report.
```

When rejecting a task, identify the exact spec section, plan step, failing assertion, route, or viewport. Do not request a vague “polish pass.”

## Completion boundary

The implementation is ready for user review only when:

- every numbered task is accepted;
- the visual audit matrix is complete;
- site, portal, payment, and focused tests are green;
- the branch is clean;
- an independent code review is complete;
- the public site has not been changed without explicit user approval.
