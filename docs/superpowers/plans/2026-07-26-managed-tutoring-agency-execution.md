# Méthode Secondaire Managed Tutoring Agency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build the repeatable staffing, tutoring, parent-follow-up, and capacity system required to serve 20 initial students without making Chahine the operational bottleneck.

**Architecture:** Google Sheets CRM remains the only source of client, student, candidate, session, and payment records. Small Markdown documents in ops/agency define the operating system. A tutor receives a student only after verified availability, a mock lesson, onboarding, and a reviewed first-client note.

**Tech Stack:** Existing Google Sheets CRM and Apps Script workflow; repository Markdown operating documents; existing website and parent portal. No new application, database, automation, or AI product.

## Global Constraints

- Keep parent and student personal information exclusively in the existing CRM; repository documents contain only aggregate counts, process, and anonymized examples.
- Méthode Secondaire owns matching, payments, scheduling policy, parent updates, renewals, complaints, and tutor replacement. Tutors own teaching and required session notes.
- Never promise recurring availability until Tutor Roster and Tutor Availability show confirmed capacity.
- Keep the public core focused on Québec Secondary 1–5 math, science, French, and English. Treat CEGEP biology and philosophy as qualified pilots.
- Do not publicly add a subject without an approved tutor, five recurring weekly slots, a diagnostic, a passing mock lesson, and a backup or transparent wait-list path.
- Do not change pricing, build custom software, or create a new AI product during this 90-day plan. Record operational evidence first.
- Use green, watch, and high for operational risks. Every watch or high item has an owner and due date.

---

## File Structure

| Path | Responsibility |
| --- | --- |
| ops/agency/README.md | Explains the operating system and decision authority. |
| ops/agency/weekly-operating-tracker.md | Weekly capacity, hiring, quality, subject, risk, and decision tracker. |
| ops/agency/recruiting/candidate-scorecard.md | Candidate scoring and approval rule. |
| ops/agency/recruiting/secondary-tutor-job-post-fr.md | French job post for the two core recruiting roles. |
| ops/agency/recruiting/interview-and-mock-lesson.md | Exact interview and mock-lesson process. |
| ops/agency/playbook/teaching-playbook.md | Standard journey, session structure, and escalation workflow. |
| ops/agency/playbook/first-session-diagnostic.md | Evidence gathered in every first session. |
| ops/agency/playbook/subject-launch-gate.md | Decision gate for French, English, and CEGEP pilots. |
| ops/agency/templates/four-week-parent-update.md | Parent update template sent at least every 28 days. |
| Existing ops/crm files | Daily operational data and tutor/parent message templates. |

## Dates and targets

| Checkpoint | Required result |
| --- | --- |
| 2026-08-02 | Actual capacity gap recorded; two core roles selected; candidate pipeline created. |
| 2026-08-23 | Two new approved active tutors and one approved backup candidate; recurring slots recorded. |
| 2026-08-30 | Active and backup tutors completed mock lesson, onboarding, sample note, and parent update. |
| 2026-08-31 | 24 or more confirmed weekly slots; 16 or more evening/weekend slots; launch risks have owners. |
| 2026-09-28 | Four weeks of real operations reviewed: notes, parent updates, capacity, continuity, and subject gates. |
| 2026-10-24 | First-cohort review selects one next 30-day investment. |

### Task 1: Create the agency control documents

**Files:**
- Create: ops/agency/README.md
- Create: ops/agency/weekly-operating-tracker.md
- Consumes: docs/superpowers/specs/2026-07-26-managed-tutoring-agency-design.md
- Produces: A privacy-safe weekly source of management decisions linked to the CRM.

- [ ] **Step 1: Create the agency index**

Create ops/agency/README.md with:

~~~markdown
# Méthode Secondaire — Agency Operating System

This folder contains the repeatable management system for Méthode Secondaire. The Google Sheets CRM remains the source of truth for client, student, session, and payment information.

## Weekly routine

1. Review weekly-operating-tracker.md every Monday during summer.
2. Review it every Monday and Thursday from the first school-year matching week.
3. Update capacity from Tutor Roster and Tutor Availability.
4. Update hiring from the Candidate Pipeline CRM tab.
5. Review overdue session notes, four-week parent updates, and watch or high risks.
6. Record one decision, owner, and due date.

## Authority

Méthode Secondaire owns matching, payments, scheduling policy, parent communication, quality review, and replacement. Tutors own teaching and the required post-session note.
~~~

- [ ] **Step 2: Create the initial weekly tracker**

Create ops/agency/weekly-operating-tracker.md with:

~~~markdown
# Weekly Operating Tracker — Méthode Secondaire

## This week's review

| Field | Value |
| --- | --- |
| Week of | 2026-07-27 |
| Review owner | Chahine |
| Next review | 2026-08-03 |
| Current phase | Establish the operating truth |
| One decision this week | Complete the fall capacity map before promising ongoing matches |

## Capacity

| Metric | Current | Standard | Status | Owner | Due date |
| --- | ---: | ---: | --- | --- | --- |
| Expected active students at school-year start | 20 | 20 | watch | Chahine | 2026-08-02 |
| Confirmed recurring weekly session slots | not-measured | 24 | watch | Chahine | 2026-08-02 |
| Evening/weekend slots | not-measured | 16 | watch | Chahine | 2026-08-02 |
| Active non-owner tutors | 1 | 3 | high | Chahine | 2026-08-23 |
| Trained backup tutors | 0 | 1 | high | Chahine | 2026-08-30 |

## Hiring pipeline

| Role | Sourced | Mock lessons booked | Approved | Confirmed weekly slots | Status | Next action |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| Secondary math/science | 0 | 0 | 0 | 0 | high | Contact five suitable prospects |
| Secondary French/English | 0 | 0 | 0 | 0 | high | Contact five suitable prospects |
| Backup or CEGEP-capable | 0 | 0 | 0 | 0 | watch | Build list after core-role sourcing |

## Service quality

| Metric | Current | Standard | Status | Owner | Due date |
| --- | ---: | ---: | --- | --- | --- |
| Tutors with reviewed mock lesson | not-measured | 100% | watch | Chahine | 2026-08-30 |
| Completed sessions with note within 12 hours | not-measured | 95% | watch | Chahine | 2026-09-14 |
| Active students with parent update in last 28 days | not-measured | 100% | watch | Chahine | 2026-09-28 |
| Active students with replacement or wait-list response | not-measured | 100% | watch | Chahine | 2026-09-14 |

## Subject launch gates

| Subject | Approved tutor | Five slots | Diagnostic | Mock lesson | Backup/wait-list | Public status |
| --- | --- | --- | --- | --- | --- | --- |
| Secondary French | no | no | no | no | no | held |
| Secondary English | no | no | no | no | no | held |
| CEGEP biology | no | no | no | no | no | pilot preparation only |
| CEGEP philosophy | no | no | no | no | no | pilot preparation only |

## Risks and decisions

| Risk or decision | Level | Owner | Due date | Resolution |
| --- | --- | --- | --- | --- |
| Fall demand exceeds trained capacity | high | Chahine | 2026-08-23 | Recruit two active tutors and one backup |
| Subject expansion becomes too broad | watch | Chahine | 2026-08-30 | Apply launch gate before public promotion |
~~~

- [ ] **Step 3: Verify privacy and tracker sections**

Run:

~~~powershell
rg -n -i 'parent_name|student_name|email|phone|adresse|address' ops\agency
~~~

Expected: no matches. Confirm that the tracker includes Capacity, Hiring pipeline, Service quality, Subject launch gates, and Risks and decisions.

- [ ] **Step 4: Commit task output**

~~~powershell
git add ops/agency/README.md ops/agency/weekly-operating-tracker.md
git commit -m "docs: add agency operating tracker"
~~~

Expected: one commit containing only the two agency documents.

### Task 2: Audit real capacity and create the candidate pipeline

**Files:**
- Modify: ops/agency/weekly-operating-tracker.md
- Modify externally: CRM tabs Tutor Roster and Tutor Availability
- Create externally: CRM tab Candidate Pipeline
- Consumes: ops/crm/tutor-roster-template.csv and ops/crm/tutor-availability-template.csv
- Produces: A real capacity map by subject, level, and peak time plus an auditable hiring pipeline.

- [ ] **Step 1: Update existing tutor records**

For Chahine and the current non-owner tutor, verify status, subjects, levels, formats, weekly_capacity, active_students, calendar_email, hourly_rate_cad, and last_updated_at. Use active only for a tutor who may receive a student. Use backup for a trained tutor with irregular availability.

- [ ] **Step 2: Record realistic recurring availability**

Add one Tutor Availability row for each recurring block using the existing template fields. Count only confirmed slots. Count weekday times after 16:00 and weekends separately; do not count tentative availability.

- [ ] **Step 3: Calculate the staffing gap**

Update the tracker using:

~~~text
required recurring slots = 20 expected students × 1 session per week × 1.2 buffer = 24 slots
staffing gap = 24 − confirmed recurring weekly slots
~~~

Record the confirmed total, evening/weekend total, and gap. If the expected frequency is not one session weekly, record the revised frequency and reason before recalculating.

- [ ] **Step 4: Create the Candidate Pipeline tab**

Create a CRM tab named Candidate Pipeline with this row-1 header:

~~~csv
candidate_id,full_name,source,role_target,subjects,levels,languages,formats,evening_weekend_slots,resume_received,screen_result,interview_date,mock_lesson_date,mock_lesson_score,reference_check_status,identity_safeguarding_check_status,onboarding_status,approval_status,confirmed_weekly_slots,next_action,next_action_due,notes,last_updated_at
~~~

Use controlled values:

- screen_result: pending, advance, decline
- reference_check_status: not-started, passed, concern, not-applicable
- identity_safeguarding_check_status: not-started, passed, concern, not-applicable
- onboarding_status: not-started, in-progress, complete
- approval_status: sourced, screening, interview, mock-lesson, checks, approved, declined, backup

- [ ] **Step 5: Verify source-of-truth consistency**

Filter Tutor Roster to active and compare available slots to the tracker’s confirmed-slot total. Filter Candidate Pipeline to non-declined candidates; every visible candidate has a next_action and next_action_due.

- [ ] **Step 6: Set the week-one hiring decision**

Update the tracker with the two largest subject/time gaps and next seven-day source target. Required starting target: five suitable math/science prospects and five suitable French/English prospects.

### Task 3: Create and launch the hiring kit

**Files:**
- Create: ops/agency/recruiting/candidate-scorecard.md
- Create: ops/agency/recruiting/secondary-tutor-job-post-fr.md
- Create: ops/agency/recruiting/interview-and-mock-lesson.md
- Modify: ops/agency/weekly-operating-tracker.md
- Modify externally: CRM Candidate Pipeline
- Consumes: Task 2 capacity gap and ops/crm/templates/tutor-onboarding-checklist.md
- Produces: A repeatable selection process that protects quality while filling capacity.

- [ ] **Step 1: Create the candidate scorecard**

Create ops/agency/recruiting/candidate-scorecard.md:

~~~markdown
# Candidate Scorecard — Méthode Secondaire

Score each category from 1 to 5. A candidate advances with at least 24/35, no score below 3 in subject mastery or explanation skill, and enough matching peak-time availability.

| Criterion | 1 | 3 | 5 |
| --- | --- | --- | --- |
| Québec curriculum fit | Cannot identify relevant level/program | Familiar with claimed subject | Maps common gaps and explanations to the relevant Québec course |
| Subject mastery | Cannot solve or explain sample | Solves correctly with some hesitation | Solves accurately and anticipates misconceptions |
| Explanation skill | Gives answer or lectures without checking | Explains steps and asks a check question | Uses student thinking, checks, correction, and independent attempt |
| Reliability | Vague availability or slow response | Adequate communication | Precise recurring availability and professional communication |
| Parent-facing judgment | Treats parent as outside process | Gives factual update | Gives concise, reassuring update without promising a grade |
| Availability | No useful peak-time slots | Some useful slots | Five or more realistic recurring high-demand slots |
| Team-process fit | Resists notes or review | Accepts process | Values notes, escalation, and quality review |

## Decision

- advance: meets every threshold.
- backup: quality threshold met; fewer than five recurring high-demand slots.
- decline: subject mastery or explanation below 3, total below 24, unreliable communication, or refusal to follow the process.
~~~

- [ ] **Step 2: Create the French recruiting post**

Create ops/agency/recruiting/secondary-tutor-job-post-fr.md:

~~~markdown
# Offre — Tuteur ou tutrice au secondaire | Méthode Secondaire

Méthode Secondaire cherche un ou une tuteur·trice fiable pour accompagner des élèves du secondaire au Québec. Nous offrons un suivi structuré, une communication claire avec les parents et un cadre commun qui laisse au tuteur sa personnalité et son expertise.

## Mandat

- Donner des séances individuelles en ligne ou en présentiel.
- Enseigner principalement les maths/sciences ou le français/anglais au secondaire.
- Confirmer des disponibilités récurrentes, surtout en soirée ou la fin de semaine.
- Envoyer une note structurée après chaque séance dans les 12 heures.
- Signaler rapidement un problème de compréhension, de présence, de motivation ou de jumelage.
- Utiliser le cadre Méthode Secondaire pour la première séance, la progression et les communications parents.

## Profil recherché

- Très bonne maîtrise de la matière et capacité de l'expliquer simplement.
- Connaissance du parcours scolaire québécois; expérience de tutorat ou d'enseignement appréciée.
- Français solide; anglais demandé lorsque le rôle le requiert.
- Fiabilité, communication professionnelle et respect des procédures.
- Au moins cinq plages récurrentes réalistes par semaine, idéalement en soirée ou la fin de semaine.

## Processus

1. CV et matières/niveaux couverts.
2. Court échange de sélection.
3. Mini séance simulée de 20 à 30 minutes.
4. Vérifications appropriées au travail auprès de mineurs.
5. Onboarding avant le premier élève.

Pour postuler, envoyer le CV, les matières/niveaux, le format possible, les disponibilités récurrentes et une brève note sur l'approche de tutorat à Méthode Secondaire.
~~~

- [ ] **Step 3: Create the interview and mock-lesson guide**

Create ops/agency/recruiting/interview-and-mock-lesson.md:

~~~markdown
# Interview and Mock-Lesson Guide — Méthode Secondaire

## Interview questions

1. Quels cours secondaires ou collégiaux du Québec peux-tu enseigner avec confiance, et lesquels refuserais-tu?
2. Montre tes disponibilités fixes. Quelles plages du soir et de fin de semaine peux-tu tenir pendant l'année scolaire?
3. Un élève dit: « Je comprends quand tu le fais, mais pas seul. » Que fais-tu pendant les dix prochaines minutes?
4. Après une séance, un parent demande si l'élève réussira le prochain examen. Comment réponds-tu?
5. Quand dois-tu signaler à Méthode Secondaire que le jumelage n'est pas bon?
6. Comment rédigerais-tu un court message parent concret sans promettre une note?

## Mock lesson

The reviewer acts as a struggling student, makes one common error, and asks one why-question.

- Secondary IV math: factor 2x² − 7x + 3, then verify by expansion.
- Secondary French or English: revise a vague thesis and choose one unsupported claim to develop without rewriting the paragraph.
- CEGEP biology: explain how enzyme concentration affects reaction rate, then predict what happens when substrate becomes limiting.
- CEGEP philosophy: distinguish a claim, reason, and objection in an argument about whether technology makes people more independent.

Score immediately with candidate-scorecard.md. Record score, decision, next action, and due date in Candidate Pipeline the same day.
~~~

- [ ] **Step 4: Source and screen candidates**

Publish or directly share the post only for the roles identified in Task 2. Add a candidate row the day a prospect is found. Book mock lessons only for candidates meeting the curriculum, availability, and communication threshold.

- [ ] **Step 5: Verify recruitment quality**

At weekly review, count sourced, mock-lesson, approved, and backup candidates. By 2026-08-23, target two approved new active tutors and one approved backup, each with recorded recurring slots.

- [ ] **Step 6: Commit the hiring kit**

~~~powershell
git add ops/agency/recruiting ops/agency/weekly-operating-tracker.md
git commit -m "docs: add tutor recruitment system"
~~~

Expected: one commit containing the hiring kit and aggregate tracker updates.

### Task 4: Write and rehearse the shared teaching system

**Files:**
- Create: ops/agency/playbook/teaching-playbook.md
- Create: ops/agency/playbook/first-session-diagnostic.md
- Modify: ops/crm/templates/tutor-onboarding-checklist.md
- Modify: ops/crm/templates/tutor-session-note.md
- Consumes: Existing session-note workflow and approved tutors from Task 3
- Produces: A practical standard new tutors can use without daily supervision.

- [ ] **Step 1: Create the teaching playbook**

Create ops/agency/playbook/teaching-playbook.md:

~~~markdown
# Teaching Playbook — Méthode Secondaire

## Before accepting a student

Confirm subject, level, priority, format, tutor, and real time in the CRM. Do not promise a recurring schedule, rate, refund, tutor change, or policy exception without Méthode Secondaire approval.

## First session

Use the first-session diagnostic. End by naming one learning priority, one practice action, one next milestone, one recommendation, and a risk level.

## Standard 60-minute session

1. 0–5 minutes: reconnect to the previous goal and inspect assigned work or current assessment demand.
2. 5–15 minutes: identify the exact misunderstanding with one or two short tasks.
3. 15–30 minutes: model the method in small steps and ask the student to explain a step back.
4. 30–50 minutes: guide practice, then require at least one independent attempt.
5. 50–57 minutes: correct the independent attempt and name the recurring error or success.
6. 57–60 minutes: agree on one action before the next session and name what will be revisited.

## After every session

Submit the session note within 12 hours. Write factual observations; never promise an exam mark or diagnose a learning condition. For watch or high, record a follow-up owner and due date.

## Escalate the same day

Escalate poor fit, safeguarding concern, repeated absence, parent complaint, unrealistic imminent-exam expectation, major prerequisite gap, or schedule problem. Méthode Secondaire decides the parent communication and replacement path.
~~~

- [ ] **Step 2: Create the first-session diagnostic**

Create ops/agency/playbook/first-session-diagnostic.md:

~~~markdown
# First-Session Diagnostic — Méthode Secondaire

Record these items in the first session note and CRM:

1. Course, level, language of instruction, current chapter, and next evaluation date when known.
2. Student goal in the student’s own words.
3. One prerequisite skill tested through a short task.
4. One current-course skill tested through a short task.
5. Main block: concept, method, vocabulary, reading, writing, organization, anxiety, attendance, or practice habit.
6. Student strength that can support progress.
7. Priority for the next two to four sessions.
8. Specific practice action before the next session.
9. Recommendation: no_change, add_practice, exam_sprint, parent_call, change_tutor, or pause.
10. Risk: green, watch, or high; every watch or high has an owner and due date.

The tutor must be able to explain the priority to a parent in four to six plain-language sentences.
~~~

- [ ] **Step 3: Update current tutor templates**

Under Avant le premier élève in ops/crm/templates/tutor-onboarding-checklist.md, add:

~~~markdown
- Mini séance simulée observée et évaluée avec ops/agency/recruiting/candidate-scorecard.md.
- Lecture confirmée de ops/agency/playbook/teaching-playbook.md et ops/agency/playbook/first-session-diagnostic.md.
- Note tuteur et résumé parent d'exemple approuvés.
~~~

Immediately before the parent summary section in ops/crm/templates/tutor-session-note.md, add:

~~~markdown
Pour une première séance, nommer aussi la priorité des 2 à 4 prochaines séances et le jalon ou l'évaluation visé lorsque connu.
~~~

- [ ] **Step 4: Rehearse every tutor**

Run one mock lesson per active or backup tutor using the relevant exercise in the interview guide. Require a sample note and parent summary. Record the score in Candidate Pipeline or the tutor record. A tutor who does not pass remains paused or backup.

- [ ] **Step 5: Verify readiness**

A tutor is ready only when all are true: score at least 24/35; subject mastery and explanation skill at least 3; availability recorded; onboarding complete; sample note specific and respectful; and a watch case includes owner and due date.

- [ ] **Step 6: Commit the teaching system**

~~~powershell
git add ops/agency/playbook ops/crm/templates/tutor-onboarding-checklist.md ops/crm/templates/tutor-session-note.md
git commit -m "docs: standardize tutor teaching workflow"
~~~

Expected: one commit containing the playbook and template updates.

### Task 5: Implement four-week parent updates and escalation

**Files:**
- Create: ops/agency/templates/four-week-parent-update.md
- Modify: ops/crm/README.md
- Modify: ops/agency/weekly-operating-tracker.md
- Consumes: Existing session-note and parent-session-update templates plus Task 4
- Produces: A sustainable 28-day parent communication rhythm.

- [ ] **Step 1: Create the parent update template**

Create ops/agency/templates/four-week-parent-update.md:

~~~markdown
# Four-Week Parent Update — Méthode Secondaire

Bonjour [PRENOM_PARENT],

Voici le point de progression de [PRENOM_ELEVE] pour les quatre dernières semaines.

## Priorité travaillée

[NOTION OU COMPÉTENCE PRINCIPALE]

## Ce qui avance

[UN OU DEUX PROGRÈS OBSERVABLES]

## Ce qui demande encore de la pratique

[UNE DIFFICULTÉ PRÉCISE, SANS DRAMATISER]

## Prochaine étape

[OBJECTIF DES PROCHAINES SÉANCES OU PRÉPARATION D'ÉVALUATION]

## Recommandation

[CONSERVER LE RYTHME / AJOUTER UNE PRATIQUE / PRÉPARER UN EXAMEN / APPEL PARENT / AJUSTER LE JUMELAGE]

Nous continuerons à ajuster le plan selon les exercices, les évaluations et ce que [PRENOM_ELEVE] montre en séance.

Chahine
Méthode Secondaire
~~~

- [ ] **Step 2: Add the cadence to the CRM guide**

Append this section to ops/crm/README.md:

~~~markdown
## Mise à jour parent aux quatre semaines

Pour chaque élève actif, envoyer une mise à jour structurée au moins une fois par 28 jours. Le tuteur fournit les faits dans ses notes; Méthode Secondaire vérifie le ton et envoie le message parent avec ops/agency/templates/four-week-parent-update.md.

Si les notes indiquent watch ou high, ne pas attendre la mise à jour mensuelle : inscrire follow_up_owner et follow_up_due, puis faire le suivi selon l'urgence.
~~~

- [ ] **Step 3: Add the weekly due-date review**

At every weekly review, inspect active students’ last parent-update date in Session Notes. Add the aggregate count due within seven days to Service quality; create a CRM next action with owner and due date for each family due.

- [ ] **Step 4: Test the content standard**

Use the anonymized example in ops/crm/session-notes-template.csv to draft one update. Verify it includes priority, observable progress, one remaining difficulty, next step, and recommendation; it must not promise a grade or make unsupported diagnosis.

- [ ] **Step 5: Verify escalation coverage**

Filter Session Notes for risk_level equal to watch and high. Every visible row has follow_up_owner and follow_up_due before the review finishes.

- [ ] **Step 6: Commit the parent reporting system**

~~~powershell
git add ops/agency/templates/four-week-parent-update.md ops/crm/README.md ops/agency/weekly-operating-tracker.md
git commit -m "docs: add structured parent progress updates"
~~~

Expected: one commit containing the template, cadence rule, and tracker routine.

### Task 6: Approve tutors and protect the fall launch

**Files:**
- Modify: ops/agency/weekly-operating-tracker.md
- Modify externally: Tutor Roster, Tutor Availability, Candidate Pipeline, Parent Leads, Sessions, and Session Notes
- Consumes: Tasks 2–5
- Produces: Students matched only to qualified tutors and actual availability.

- [ ] **Step 1: Set tutor status before matching**

Set candidate approval_status to approved or backup, then create/update the tutor record. Use active only after mock lesson, onboarding, and availability are complete.

- [ ] **Step 2: Follow the matching order**

For every family: confirm subject, level, priority, urgency, format, and availability in Parent Leads; confirm subject/level fit and capacity in Tutor Roster; confirm actual time in Tutor Availability; assign tutor and propose time; confirm session and payment only after tutor/time is real; record first-session follow-up and note expectation.

- [ ] **Step 3: Review every new tutor’s first client note**

Within 24 hours, verify the note identifies priority, evidence, practice action, recommendation, and risk. Resolve incomplete note or uncertain fit before assigning a second ongoing student.

- [ ] **Step 4: Maintain the capacity rule**

Calculate twice weekly:

~~~text
capacity ratio = confirmed recurring weekly session slots / expected active weekly sessions
~~~

Use green at 1.2 or higher, watch from 1.0 to 1.19, and high below 1.0. At watch or high, pause public expansion for the affected subject and source capacity or offer an honest wait-list.

- [ ] **Step 5: Verify launch readiness**

On 2026-08-31, confirm 24 or more weekly slots, 16 or more evening/weekend slots, three active non-owner tutors or documented equivalent capacity, one trained backup, reviewed mock lessons, and no active record without next action or continuity response.

### Task 7: Gate French, English, and CEGEP expansion

**Files:**
- Create: ops/agency/playbook/subject-launch-gate.md
- Modify: ops/agency/weekly-operating-tracker.md
- Consumes: Tasks 2–6
- Produces: A defensible offer/hold decision for every added subject.

- [ ] **Step 1: Create the subject launch gate**

Create ops/agency/playbook/subject-launch-gate.md:

~~~markdown
# Subject Launch Gate — Méthode Secondaire

Evaluate Secondary French, Secondary English, CEGEP biology, and CEGEP philosophy separately.

| Gate | Evidence required |
| --- | --- |
| Qualified tutor | Passing scorecard, relevant course knowledge, and Tutor Roster record |
| Capacity | At least five confirmed recurring weekly slots in expected format and peak times |
| Diagnostic | First-session prompt testing prerequisite, current-course skill, and student goal |
| Demonstration | Mock-lesson score at least 24/35; subject mastery and explanation at least 3 |
| Continuity | Backup tutor or parent-ready wait-list/replacement response |
| Parent follow-up | Acceptable sample session note and four-week update |

- Offer publicly: every gate passes.
- Accept by request: quality gates pass but capacity is below five slots; state availability honestly.
- Hold: one or more gates fails.

CEGEP remains a selected pilot. Review inquiries, matches, delivery, capacity used, note timeliness, feedback, and operational problems after four active weeks before broader promotion.
~~~

- [ ] **Step 2: Prepare each diagnostic**

For French/English, require a short reading/writing correction task where the student explains one choice and revises a sentence or claim. For biology, require prerequisite concept and course-application questions. For philosophy, require claim/reason/objection identification and one defended distinction. Record final prompts in tutor training records before offering the subject.

- [ ] **Step 3: Set subject status**

Set each subject to offered, request-only, pilot preparation only, or held at weekly review. A promising applicant or verbal availability is never a passing gate.

- [ ] **Step 4: Review any CEGEP pilot**

After four active weeks, record aggregate inquiries, matches, delivered sessions, tutor capacity used, note-on-time rate, feedback, and problems. Continue only when tutor quality and continuity are green; otherwise switch to request-only or held.

- [ ] **Step 5: Commit the expansion gate**

~~~powershell
git add ops/agency/playbook/subject-launch-gate.md ops/agency/weekly-operating-tracker.md
git commit -m "docs: gate new tutoring subject launches"
~~~

Expected: one commit containing the decision standard and aggregate statuses.

### Task 8: Review evidence and choose the next investment

**Files:**
- Create: ops/agency/reviews/2026-10-24-first-cohort-review.md
- Modify: ops/agency/weekly-operating-tracker.md
- Consumes: Aggregate CRM data from four weeks of school-year operation
- Produces: One evidence-based 30-day priority.

- [ ] **Step 1: Create the review document**

Create ops/agency/reviews/2026-10-24-first-cohort-review.md:

~~~markdown
# First-Cohort Operating Review — 24 October 2026

## Capacity

Record expected students, active students, recurring weekly slots, peak-time slots, active tutors, backup tutors, and capacity ratio.

## Matching and service quality

Record median first-response time, notes within 12 hours, active students updated in the last 28 days, watch/high cases, replacements, and unresolved complaints.

## Commercial health

Record inquiries, matched first sessions, active students by offer, collected revenue, tutor pay, processing cost, estimated administrative time, and continuation count.

## Subject decisions

For Secondary French, Secondary English, CEGEP biology, and CEGEP philosophy, state offered, request-only, pilot preparation only, or held and cite the applicable gate.

## Next 30-day decision

Choose one: recruit capacity, improve tutor quality, improve parent communication, update website proof/positioning, improve CRM workflow, or evaluate a narrowly defined AI assistance tool. Explain the choice using evidence, name an owner, and provide a due date.
~~~

- [ ] **Step 2: Replace preliminary tracker values**

Replace every not-measured value with a number, not-applicable, or dated explanation. The review cannot rely on impressions without a metric or concrete observation.

- [ ] **Step 3: Apply the investment rule**

Choose capacity if ratio is below 1.2 or coverage is weak. Choose quality if notes or parent updates are below standard. Choose website proof/positioning only when capacity and service standards are green. Evaluate AI only when it saves documented tutor/admin time without reducing human review or privacy.

- [ ] **Step 4: Verify and commit**

Confirm all review sections are complete, one 30-day priority is selected, and no personal information appears. Then run:

~~~powershell
git add ops/agency/reviews/2026-10-24-first-cohort-review.md ops/agency/weekly-operating-tracker.md
git commit -m "docs: review first managed tutoring cohort"
~~~

Expected: one commit containing the aggregate review and next decision.

## Plan self-review

| Approved design requirement | Plan task |
| --- | --- |
| 20-student capacity with buffer | 1, 2, and 6 |
| Two new active tutors and one backup | 2, 3, 4, and 6 |
| Standard first and normal sessions | 4 |
| Parent progress and escalation | 5 |
| Tutor quality review | 3, 4, and 6 |
| Secondary French and English expansion | 3 and 7 |
| Selective CEGEP biology and philosophy pilot | 7 |
| No new platform before operational evidence | Global Constraints and 8 |
| Evidence before pricing, website, AI, or automation change | 2 and 8 |

Every repository change has a path, content, verification, and commit boundary. Every external CRM action identifies its tab and completion check.

