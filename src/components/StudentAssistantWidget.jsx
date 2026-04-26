import { useEffect, useMemo, useRef, useState } from "react"
import { Bot, CalendarDays, Loader2, MessageSquareMore, Phone, Sparkles } from "lucide-react"

import LeadDiagnosticPanel from "@/components/LeadDiagnosticPanel"
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
import {
  assistantBusinessInfo,
  assistantUiByLocale,
  buildFallbackAssistantReply,
} from "@/lib/assistantConfig"
import { getDiagnosticUi } from "@/lib/leadDiagnostic"
import { cn } from "@/lib/utils"

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

export default function StudentAssistantWidget({ locale = "fr" }) {
  const copy = assistantUiByLocale[locale] || assistantUiByLocale.fr
  const diagnosticCopy = getDiagnosticUi(locale)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState("chat")
  const [messages, setMessages] = useState([initialMessageByLocale[locale] || initialMessageByLocale.fr])
  const [draft, setDraft] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState("")
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
    setMode("chat")
  }, [locale])

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined
    }

    function handleOpenDiagnostic() {
      setOpen(true)
      setMode("diagnostic")
    }

    function handleJumpContact() {
      setOpen(false)
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        window.requestAnimationFrame(() => {
          contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
        })
      }
    }

    window.addEventListener("methode:open-diagnostic", handleOpenDiagnostic)
    window.addEventListener("methode:jump-contact", handleJumpContact)

    return () => {
      window.removeEventListener("methode:open-diagnostic", handleOpenDiagnostic)
      window.removeEventListener("methode:jump-contact", handleJumpContact)
    }
  }, [])

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
      await new Promise((resolve) => window.setTimeout(resolve, 220))
      const reply = buildFallbackAssistantReply(message, locale)

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: reply,
        },
      ])
    } catch {
      setError(copy.error)
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
    <div className="fixed bottom-24 right-3 z-50 max-w-[calc(100vw-1rem)] lg:bottom-6 lg:right-6 lg:max-w-none">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="max-w-[calc(100vw-1rem)] rounded-full bg-[#f5c977] px-4 py-5 text-sm text-[#071631] shadow-[0_18px_45px_rgba(245,201,119,0.3)] hover:bg-[#f7d38f] sm:px-5 sm:py-6 sm:text-base">
            <MessageSquareMore className="h-4 w-4" />
            {copy.buttonLabel}
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex h-full w-full flex-col border-white/10 bg-[#071631] p-0 text-white sm:max-w-xl"
        >
          <SheetHeader className="border-b border-white/10 px-4 py-5 sm:px-6">
            <div className="flex items-start gap-3 pr-8">
              <div className="rounded-2xl bg-[#f5c977] p-2.5 text-[#071631]">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <SheetTitle className="font-display text-xl text-white sm:text-2xl">{copy.sheetTitle}</SheetTitle>
                <SheetDescription className="mt-1 text-white/65">{copy.sheetDescription}</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="border-b border-white/10 px-4 py-4 sm:px-6">
            <div className="flex max-w-full rounded-full border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                className={cn(
                  "min-w-0 rounded-full px-4 py-2 text-sm transition",
                  mode === "chat" ? "bg-[#f5c977] text-[#071631]" : "text-white/72 hover:text-white",
                )}
                onClick={() => setMode("chat")}
              >
                {diagnosticCopy.modeChat}
              </button>
              <button
                type="button"
                className={cn(
                  "inline-flex min-w-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                  mode === "diagnostic"
                    ? "bg-[#f5c977] text-[#071631]"
                    : "text-white/72 hover:text-white",
                )}
                onClick={() => setMode("diagnostic")}
              >
                {diagnosticCopy.modeDiagnostic}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.18em]",
                    mode === "diagnostic" ? "bg-[#071631]/12" : "bg-white/10 text-white/72",
                  )}
                >
                  {diagnosticCopy.modeBadge}
                </span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            {mode === "chat" ? (
              <>
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
                        "max-w-full rounded-[24px] px-4 py-3 text-sm leading-7 sm:max-w-[88%]",
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
                      <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{message.content}</div>
                    </div>
                  ))}

                  {isSending && (
                    <div className="max-w-full rounded-[24px] border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/72 sm:max-w-[88%]">
                      <div className="mb-1 text-xs uppercase tracking-[0.22em] text-white/45">
                        {copy.assistantLabel}
                      </div>
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-[#f5c977]" />
                        {copy.sending}
                      </div>
                    </div>
                  )}

                  <div ref={endRef} />
                </div>
              </>
            ) : (
              <LeadDiagnosticPanel locale={locale} />
            )}
          </div>

          {mode === "chat" && (
            <div className="border-t border-white/10 px-4 py-5 sm:px-6">
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

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-6 text-white/50 sm:max-w-[70%]">{copy.note}</p>
                  <Button
                    type="submit"
                    disabled={isSending || !draft.trim()}
                    className="w-full shrink-0 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
                  >
                    {isSending ? copy.sending : copy.send}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
