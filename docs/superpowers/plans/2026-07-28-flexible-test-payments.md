# Flexible Test Payments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Support team-controlled session prices, free sessions, and diagnosable Stripe Test Checkout.

**Architecture:** Apps Script remains the payment ledger owner. It classifies zero-value sessions as waived and calls the existing Vercel Checkout endpoint only for valid positive amounts. Safe error codes are retained in the payment notes for the team without exposing secrets or raw responses.

**Tech Stack:** Google Apps Script, Vercel serverless API, Stripe Checkout, Node test runner.

## Global Constraints

- Never expose Stripe or shared secrets to browser code, logs, docs, or commits.
- Stripe Checkout amounts must be at least $1 CAD.
- A $0 session never calls Stripe.
- Keep the parent payment URL restricted to hosted Stripe Checkout URLs.

### Task 1: Add CRM payment classification

**Files:**
- Modify: `ops/crm/google-apps-script/Code.gs`
- Test: `test/parent-portal.test.mjs`

- [ ] Write failing tests for zero-price waived payment and safe Checkout failure diagnostics.
- [ ] Run `node --test test/parent-portal.test.mjs` and observe failure.
- [ ] Implement the smallest CRM changes.
- [ ] Re-run the focused test.

### Task 2: Verify parent presentation and publish

**Files:**
- Modify: `src/pages/Portal.jsx` only if existing payment copy does not distinguish waived payments.
- Test: `test/parent-portal.test.mjs`, `test/stripe-checkout.test.mjs`

- [ ] Write a failing presentation test if copy changes are required.
- [ ] Run payment and portal tests.
- [ ] Deploy Apps Script and Vercel production.
- [ ] Complete one Stripe Test Checkout and verify the CRM payment state.
