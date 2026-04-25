import { useEffect, useMemo, useRef, useState } from "react"
import { Bot, CalendarDays, Loader2, MessageSquareMore, Phone, Sparkles } from "lucide-react"

import { assistantBusinessInfo, assistantUiByLocale } from "@/lib/assistantConfig"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

const initialMessageByLocale = {
  fr: {
    id: "welcome-fr",
    role: "assistant",
    content: assistantUiByLocale.fr.welcome,
  },
  en: {
    id: "welcome-en",
    role: "assistant",
    content: assistantUiByLocale.en.welcome,
  },
}

function isLocalAssistantHost() {
  if (typeof window === "undefined") {
    return false
  }

  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
}

function getAssistantErrorMessage({ payload, status, locale, fallback }) {
  const isEnglish = locale === "en"
  const isLocal = isLocalAssistantHost()

  if (status === 404) {
    return isEnglish
      ? isLocal
        ? "The local assistant route is missing. Run `npm.cmd run dev:full` instead of `npm.cmd run dev` so the `/api/student-assistant` function is available."
        : "The `/api/student-assistant` route was not found on this deployment."
      : isLocal
        ? "La route locale de l'assistant est introuvable. Lancez `npm.cmd run dev:full` au lieu de `npm.cmd run dev` pour activer la fonction `/api/student-assistant`."
        : "La route `/api/student-assistant` est introuvable sur ce deploiement."
  }

  if (payload?.code === "MISSING_OPENAI_API_KEY") {
    return isEnglish
      ? isLocal
        ? "The assistant is missing `OPENAI_API_KEY` locally. Create `.env.local` from `.env.example`, add the key, then run `npm.cmd run dev:full`."
        : "The assistant is missing `OPENAI_API_KEY` on Vercel. Add it in the project environment variables, redeploy, and try again."
      : isLocal
        ? "L'assistant n'a pas de `OPENAI_API_KEY` en local. Créez `.env.local` à partir de `.env.example`, ajoutez la clé, puis lancez `npm.cmd run dev:full`."
        : "L'assistant n'a pas de `OPENAI_API_KEY` sur Vercel. Ajoutez-la dans les variables d'environnement du projet, redéployez, puis réessayez."
  }

  if (payload?.code === "OPENAI_AUTH_FAILED") {
    return isEnglish
      ? isLocal
        ? "The local `OPENAI_API_KEY` looks invalid. Update `.env.local`, restart `npm.cmd run dev:full`, and try again."
        : "The `OPENAI_API_KEY` configured on Vercel looks invalid. Update it in the project settings and redeploy."
      : isLocal
        ? "La `OPENAI_API_KEY` locale semble invalide. Mettez à jour `.env.local`, redémarrez `npm.cmd run dev:full`, puis réessayez."
        : "La `OPENAI_API_KEY` configurée sur Vercel semble invalide. Mettez-la à jour dans les réglages du projet puis redéployez."
  }

  if (payload?.code === "ASSISTANT_RATE_LIMITED" || payload?.code === "OPENAI_UPSTREAM_RATE_LIMITED") {
    return isEnglish
      ? "The assistant is busy right now. Please wait a minute and try again."
      : "L'assistant est surcharge pour le moment. Attendez une minute puis reessayez."
  }

  if (typeof payload?.error === "string" && payload.error.trim()) {
    return payload.error.trim()
  }

  return fallback
}

function getTransportErrorMessage({ error, locale, fallback }) {
  const isEnglish = locale === "en"
  const isLocal = isLocalAssistantHost()

  if (error instanceof TypeError) {
    return isEnglish
      ? isLocal
        ? "The local assistant is unreachable. Run `npm.cmd run dev:full` and make sure `.env.local` contains `OPENAI_API_KEY`."
        : "The assistant service could not be reached from this deployment."
      : isLocal
        ? "L'assistant local est inaccessible. Lancez `npm.cmd run dev:full` et verifiez que `.env.local` contient `OPENAI_API_KEY`."
        : "Le service assistant est inaccessible depuis ce deploiement."
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

export default function StudentAssistantWidget({ locale = "fr" }) {
  const copy = assistantUiByLocale[locale] || assistantUiByLocale.fr
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([initialMessageByLocale[locale] || initialMessageByLocale.fr])
  const [draft, setDraft] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState("")
  const [previousResponseId, setPreviousResponseId] = useState("")
  const endRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const id = window.requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    })

    return () => window.cancelAnimationFrame(id)
  }, [messages, open])

  useEffect(() => {
    setMessages([initialMessageByLocale[locale] || initialMessageByLocale.fr])
    setDraft("")
    setError("")
    setPreviousResponseId("")
  }, [locale])

  const starters = useMemo(() => copy.starterQuestions.slice(0, 4), [copy.starterQuestions])

  async function sendQuestion(rawMessage) {
    const message = rawMessage.trim()

    if (!message || isSending) {
      return
    }

    setError("")
    setIsSending(true)

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    }

    setMessages((current) => [...current, userMessage])
    setDraft("")

    try {
      const response = await fetch("/api/student-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          message,
          previousResponseId,
        }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          getAssistantErrorMessage({
            payload,
            status: response.status,
            locale,
            fallback: copy.error,
          }),
        )
      }

      setMessages((current) => [
        ...current,
        {
          id: payload.responseId || `assistant-${Date.now()}`,
          role: "assistant",
          content: payload.text,
        },
      ])
      setPreviousResponseId(payload.limitedMode ? "" : payload.responseId || "")
    } catch (requestError) {
      const messageText = getTransportErrorMessage({
        error: requestError,
        locale,
        fallback: copy.error,
      })

      setError(messageText)
      setMessages((current) => current.filter((entry) => entry.id !== userMessage.id || entry.role !== "user").concat(userMessage))
    } finally {
      setIsSending(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    void sendQuestion(draft)
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      void sendQuestion(draft)
    }
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 lg:bottom-6 lg:right-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="rounded-full bg-[#f5c977] px-5 py-6 text-[#071631] shadow-[0_18px_45px_rgba(245,201,119,0.3)] hover:bg-[#f7d38f]">
            <MessageSquareMore className="h-4 w-4" />
            {copy.buttonLabel}
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex h-full w-full flex-col border-white/10 bg-[#071631] p-0 text-white sm:max-w-xl"
        >
          <SheetHeader className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#f5c977] p-2.5 text-[#071631]">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <SheetTitle className="font-display text-2xl text-white">{copy.sheetTitle}</SheetTitle>
                <SheetDescription className="mt-1 text-white/65">{copy.sheetDescription}</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Sparkles className="h-4 w-4 text-[#f5c977]" />
                {copy.emptyStateTitle}
              </div>
              <p className="mt-2 text-sm leading-7 text-white/70">{copy.emptyStateText}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`tel:${assistantBusinessInfo.phone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f5c977] px-4 py-2 text-sm font-medium text-[#071631] transition hover:bg-[#f7d38f]"
                >
                  <Phone className="h-4 w-4" />
                  {copy.quickCall}
                </a>
                <a
                  href={assistantBusinessInfo.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" />
                  {copy.quickBook}
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {starters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/78 transition hover:bg-white/10"
                  onClick={() => void sendQuestion(starter)}
                >
                  {starter}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[88%] rounded-[24px] px-4 py-3 text-sm leading-7",
                    message.role === "assistant"
                      ? "border border-white/10 bg-white/6 text-white"
                      : "ml-auto bg-[#f5c977] text-[#071631]",
                  )}
                >
                  <div
                    className={cn(
                      "mb-1 text-xs uppercase tracking-[0.22em]",
                      message.role === "assistant" ? "text-white/45" : "text-[#071631]/65",
                    )}
                  >
                    {message.role === "assistant" ? copy.assistantLabel : copy.youLabel}
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              ))}

              {isSending && (
                <div className="max-w-[88%] rounded-[24px] border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/72">
                  <div className="mb-1 text-xs uppercase tracking-[0.22em] text-white/45">{copy.assistantLabel}</div>
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-[#f5c977]" />
                    {copy.sending}
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={copy.inputPlaceholder}
                className="min-h-[104px] rounded-[24px] border-white/10 bg-[#06132f]/90 text-white placeholder:text-white/35"
              />

              {error && (
                <div className="rounded-[20px] border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs leading-6 text-white/50">{copy.note}</p>
                <Button
                  type="submit"
                  disabled={isSending || !draft.trim()}
                  className="shrink-0 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f]"
                >
                  {isSending ? copy.sending : copy.send}
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
