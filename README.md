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

## AI assistant setup

The site includes a floating AI assistant powered by the OpenAI Responses API and a Vercel serverless function.

Create a local `.env.local` from `.env.example` and set:

- `OPENAI_API_KEY`
- `OPENAI_ASSISTANT_MODEL` (optional, defaults to `gpt-5.4-mini`)
- `VITE_SITE_URL`

For production on Vercel, add the same environment variables in the Vercel project settings and redeploy.

## Assistant troubleshooting

- If you test locally, use `npm.cmd run dev:full`. The plain `npm.cmd run dev` command does not start the `/api/student-assistant` function.
- If the assistant falls back to limited answers, check `OPENAI_API_KEY` first.
- After changing local env vars, restart the dev server.

## Notes

- The AI assistant server endpoint lives in `api/student-assistant.js`.
- The floating widget lives in `src/components/StudentAssistantWidget.jsx`.
- The shared assistant prompt and UI copy live in `src/lib/assistantConfig.js`.
