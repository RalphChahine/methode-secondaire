# Méthode Secondaire Website

Marketing website for Méthode Secondaire, built with React, Vite, and deployed on Vercel.

## Local development

Frontend only:

```powershell
npm.cmd install
npm.cmd run dev
```

Full local app with Vercel Functions, including the AI assistant:

```powershell
npm.cmd install
npm.cmd run dev:full
```

## Build

```powershell
npm.cmd run build
```

## Production activation: Meet and Stripe Checkout

The repository can verify the code paths with `npm.cmd run test:payments` and `npm.cmd run test:site`; this is not production configuration or a live payment test. The owner must complete this order before enabling public payments:

1. Enable the **Google Calendar Advanced Service** in the Apps Script project and the linked Google Cloud project.
2. Authorize Apps Script and share every assigned tutor calendar with the Apps Script account so it can create the tutor-owned event and Google Meet conference.
3. Add Vercel variables: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `PAYMENT_WEBHOOK_SECRET`, and `PAYMENT_SESSION_SECRET`. Add the two `PAYMENT_*` values to Apps Script project properties too.
4. Create the Stripe webhook endpoint `https://methode-secondaire.vercel.app/api/stripe-webhook` and subscribe it to `checkout.session.completed`, `checkout.session.async_payment_succeeded`, and `checkout.session.expired`.
5. Make a Stripe **test-mode** booking: verify the Meet invitation arrives only after the link is ready, payment completes once, and an expired test Checkout releases its linked session.
6. Deploy the verified production branch. The owner then performs one restricted, authorized live verification before sharing public payment links.

Do not put Stripe or Apps Script secrets in the frontend, a `VITE_*` variable, the repository, screenshots, or support messages.

## AI assistant setup

The site includes a floating AI assistant powered by the OpenAI Responses API and a Vercel serverless function.

Create a local `.env.local` from `.env.example` and set:

- `OPENAI_API_KEY`
- `OPENAI_ASSISTANT_MODEL` (optional, defaults to `gpt-5.4-mini`)
- `VITE_SITE_URL`

For production on Vercel, add the same environment variables in the Vercel project settings and redeploy.

## Optional analytics and ad tracking

The site now supports optional Google tag and Google Ads conversion tracking.

Supported environment variables:

- `VITE_GOOGLE_TAG_ID`
- `VITE_GA_MEASUREMENT_ID`
- `VITE_GOOGLE_ADS_ID`
- `VITE_GOOGLE_ADS_LEAD_LABEL`
- `VITE_GOOGLE_ADS_BOOKING_LABEL`
- `VITE_GOOGLE_ADS_CALL_LABEL`

If configured, the site can track:

- page views
- lead form submissions
- booking link clicks
- phone click events

## Assistant troubleshooting

- If you test locally, use `npm.cmd run dev:full`. The plain `npm.cmd run dev` command does not start the `/api/student-assistant` function.
- If the assistant falls back to limited answers, check `OPENAI_API_KEY` first.
- After changing local env vars, restart the dev server.

## Notes

- The AI assistant server endpoint lives in `api/student-assistant.js`.
- The floating widget lives in `src/components/StudentAssistantWidget.jsx`.
- The shared assistant prompt and UI copy live in `src/lib/assistantConfig.js`.
