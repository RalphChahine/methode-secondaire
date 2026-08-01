# Website simplification acceptance record

**Record date:** 2026-08-01  
**Release scope:** Tasks 6–11 of the website UX simplification plan  
**Evidence policy:** Automated checks below are reproducible in the repository. Manual production-like checks are explicitly marked pending when no non-production account or browser session was available. No production student work, credentials, or personal screenshots belong in this record.

## Acceptance summary

| Area | Automated evidence | Manual result | Owner follow-up |
| --- | --- | --- | --- |
| Task-centered parent, tutor, and team destinations | Portal suite: 77/77 tests passed | Pending browser walkthrough | Run the role matrix with non-production records |
| Public conversion and density | Site suite and static-route checks passed (166 routes) | Pending viewport measurement | Capture page heights at 390 × 844 |
| Motion and reduced motion | Motion contract: 3/3 tests passed; CSS reduced-motion rules present | Pending keyboard/zoom check | Verify in a real browser with OS reduced motion enabled |
| Privacy-safe task analytics | Task tracking contract: 3/3 tests passed | Pending analytics preview check | Confirm only allowlisted events arrive in the configured analytics property |
| Performance and payload budgets | Production build passed; final asset sizes recorded below | Operator response bytes pending | Capture before/after API fixture sizes in a non-production environment |

## Automated verification

Run on 2026-08-01 from the repository root:

| Command | Result | Evidence |
| --- | --- | --- |
| `node --test test/task-tracking.test.mjs` | Pass | 3 tests; exact event allowlist, payload sanitization, and boundary instrumentation |
| `node --test test/motion-system.test.mjs` | Pass | 3 tests; tokens, CSS-only card motion, sticky-action observer |
| `npm.cmd run test:portal` | Pass | 77 tests; focused parent, tutor, and operator destinations and contracts |
| `npm.cmd run test:site` | Pass | Conversion/density/layout tests, pricing check, build, and 166 static routes |
| `git diff --check` | Pass | No whitespace errors in the implementation changes |

The portal suite may print harmless SSR `useLayoutEffect` notices and a Vite WebSocket port notice while tests run; neither caused a test failure.

## Responsive and accessibility matrix

The matrix is intentionally separated from automated source contracts. “Pending” means a human still needs to open the running site with the stated setup; it is not a claim of failure.

| Journey / state | 390 × 844 | 768 × 1024 | 1280 × 800 | 1440 × 900 | French | English | Keyboard-only | 200% zoom | Reduced motion |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Public home: one primary action, proof, process | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Automated CSS check; manual pending |
| Public request: form starts early; no sticky duplicate | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Automated route/density checks; manual pending |
| Public thank-you | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Math and science subject pages | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Tutor directory and recruitment | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Parent sign-in and code verification | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Parent next action, prepare, confirm, and pay | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Parent recap, message, family, and billing details | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Tutor sign-in, next session, material, and note | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Tutor availability, student, and message destinations | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Team sign-in and priority queue | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Team family/tutor search and scheduling | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| Team payments, inbox, settings, and empty/error states | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

### State coverage to record during the manual pass

For each role, open at least one populated, empty, loading, and error state. Check that focus remains visible, active navigation is not communicated by colour alone, dialogs return focus to their opener, and no fixed action obscures a form at 200% zoom. Use only synthetic records and redact any screenshots before sharing them.

## Task event privacy contract

The only task event names are the eleven values exported as `TASK_EVENTS` in `src/lib/tracking.js`. Every task payload is reduced to these bounded fields:

`role`, `locale`, `action_kind`, `route_key`, `status`, `timing_bucket`.

Identifiers and free text—including email, phone, name, message, notes, token, student values, session IDs, payment URLs, and CRM responses—are discarded before dispatch. The request lifecycle emits start on first interaction, submit immediately before transport, and success only after the CRM confirms delivery. Portal code and sign-in events emit only after their API calls succeed.

## Final bundle and interaction budget snapshot

Captured from the successful production build on 2026-08-01:

| Budget | Final observation | Target / interpretation |
| --- | --- | --- |
| Initial JavaScript asset | `index-97zZUfYu.js`: 459.16 kB (144.16 kB gzip) | Keep route splitting; compare against the audit baseline of approximately 457 kB |
| Portal JavaScript asset | `Portal-DU1BcK63.js`: 288.94 kB (68.56 kB gzip) | Lower than the audit baseline of approximately 247 kB only if the chunk composition changed; investigate before setting a new target |
| Motion component asset | `MotionCard-DorLWa19.js`: 1.15 kB (0.44 kB gzip) | CSS-only motion removed the prior large motion dependency |
| Home/request/math/science/tutors/recruitment mobile heights | Not measured in this environment | Capture at 390 × 844; target is roughly six screens or fewer for Home and Recruitment |
| Operator response bytes before/after pagination | Not measured; pagination contract is covered by portal tests | Capture the same non-production collection fixture before and after pagination |
| Visible actions above the fold by role | Not measured | Record one dominant action for parent, tutor, and operator at 390 × 844 and desktop sizes |

The portal payload-size and page-height rows remain open until a browser/API capture is available; they are not inferred from JavaScript bundle size.

## Release decision

Automated release gates are green and the implementation is ready for a controlled non-production walkthrough. Production rollout should wait for the pending manual rows, especially keyboard navigation, 200% zoom, reduced motion, secure portal actions, and operator response-size comparison.
