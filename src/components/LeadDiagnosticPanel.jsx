import { useEffect, useMemo, useState } from "react"
import { CalendarDays, Check, Clipboard, Loader2, Phone, RotateCcw, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { assistantBusinessInfo } from "@/lib/assistantConfig"
import {
  buildLeadDiagnosticClipboardText,
  createEmptyDiagnosticAnswers,
  getDiagnosticQuestions,
  getDiagnosticUi,
  normalizeLeadDiagnosticAnswers,
} from "@/lib/leadDiagnostic"
import { cn } from "@/lib/utils"

export default function LeadDiagnosticPanel({ locale = "fr" }) {
  const ui = getDiagnosticUi(locale)
  const questions = useMemo(() => getDiagnosticQuestions(locale), [locale])
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState(createEmptyDiagnosticAnswers())
  const [result, setResult] = useState(null)
  const [limitedMode, setLimitedMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const currentQuestion = questions[stepIndex]
  const progress = ((stepIndex + 1) / questions.length) * 100
  const currentValue = answers[currentQuestion.key] || ""

  useEffect(() => {
    setStepIndex(0)
    setAnswers(createEmptyDiagnosticAnswers())
    setResult(null)
    setLimitedMode(false)
    setIsSubmitting(false)
    setError("")
    setCopied(false)
  }, [locale])

  useEffect(() => {
    if (!copied) {
      return undefined
    }

    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  function updateAnswer(key, value) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function goBack() {
    if (result) {
      setResult(null)
      setStepIndex(0)
      setError("")
      return
    }

    setStepIndex((current) => Math.max(0, current - 1))
  }

  function goNext() {
    setStepIndex((current) => Math.min(questions.length - 1, current + 1))
  }

  function restart() {
    setStepIndex(0)
    setAnswers(createEmptyDiagnosticAnswers())
    setResult(null)
    setLimitedMode(false)
    setError("")
    setCopied(false)
  }

  function canAdvance() {
    if (currentQuestion.type === "textarea") {
      return String(currentValue || "").trim().length >= 10
    }

    return Boolean(currentValue)
  }

  async function submitDiagnostic() {
    if (isSubmitting) {
      return
    }

    const normalizedAnswers = normalizeLeadDiagnosticAnswers(answers)

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/student-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          mode: "diagnostic",
          qualification: normalizedAnswers,
        }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok || !payload?.diagnostic) {
        throw new Error(locale === "en" ? "The diagnostic could not be generated." : "Le diagnostic n'a pas pu être généré.")
      }

      setResult(payload.diagnostic)
      setLimitedMode(Boolean(payload.limitedMode))

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("methode:diagnostic-complete", {
            detail: {
              locale,
              ...normalizedAnswers,
              recommended_action: payload.diagnostic.recommendedAction,
              recommended_service: payload.diagnostic.recommendedService,
              limited_mode: Boolean(payload.limitedMode),
            },
          }),
        )
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error && requestError.message
          ? requestError.message
          : locale === "en"
            ? "The diagnostic could not be generated."
            : "Le diagnostic n'a pas pu être généré.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function copySummary() {
    if (!result || typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }

    try {
      await navigator.clipboard.writeText(buildLeadDiagnosticClipboardText(locale, result))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (result) {
    const callIsPrimary = result.recommendedAction === "call_now"

    return (
      <div className="space-y-4">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/60">
              <Sparkles className="h-3.5 w-3.5 text-[#f5c977]" />
              {ui.resultEyebrow}
            </div>
            {limitedMode && (
              <div className="rounded-full border border-[#f5c977]/30 bg-[#f5c977]/10 px-3 py-1 text-xs text-[#f5c977]">
                {ui.limitedMode}
              </div>
            )}
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold text-white">{result.headline}</h3>
          <p className="mt-3 text-sm leading-7 text-white/72">{result.summary}</p>

          <div className="mt-5 rounded-[22px] border border-white/10 bg-[#0b214d]/80 px-4 py-4">
            <div className="text-xs uppercase tracking-[0.22em] text-white/45">{ui.resultTitle}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="rounded-full bg-[#f5c977] px-3 py-1 text-sm font-medium text-[#071631]">
                {result.recommendedActionLabel}
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
                {result.recommendedService}
              </div>
            </div>
            <p className="mt-3 text-sm leading-7 text-white/72">{result.actionReason}</p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm font-semibold text-white">{ui.reasonsTitle}</div>
            <div className="mt-4 space-y-3">
              {result.reasons.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/78">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm font-semibold text-white">{ui.nextStepsTitle}</div>
            <div className="mt-4 space-y-3">
              {result.nextSteps.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/78">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#06132f]/85 p-5">
          <div className="text-sm font-semibold text-white">{ui.messageTitle}</div>
          <p className="mt-3 whitespace-pre-wrap rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/78">
            {result.suggestedMessage}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            asChild
            className={cn(
              "rounded-full py-6",
              callIsPrimary
                ? "bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                : "border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white",
            )}
            variant={callIsPrimary ? "default" : "outline"}
          >
            <a href={`tel:${assistantBusinessInfo.phone}`}>
              <Phone className="h-4 w-4" />
              {ui.actions.call_now}
            </a>
          </Button>

          <Button
            asChild
            className={cn(
              "rounded-full py-6",
              !callIsPrimary
                ? "bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                : "border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white",
            )}
            variant={!callIsPrimary ? "default" : "outline"}
          >
            <a href={assistantBusinessInfo.bookingUrl} target="_blank" rel="noreferrer">
              <CalendarDays className="h-4 w-4" />
              {ui.actions.book_session}
            </a>
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            onClick={() => void copySummary()}
          >
            <Clipboard className="h-4 w-4" />
            {copied ? ui.copied : ui.copySummary}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            onClick={goBack}
          >
            {ui.edit}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            onClick={restart}
          >
            <RotateCcw className="h-4 w-4" />
            {ui.restart}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/60">
          <Sparkles className="h-3.5 w-3.5 text-[#f5c977]" />
          {ui.introTitle}
        </div>
        <p className="mt-3 text-sm leading-7 text-white/72">{ui.introDescription}</p>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/45">
            <span>
              {ui.stepLabel} {stepIndex + 1} / {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <div className="h-full rounded-full bg-[#f5c977]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="rounded-[26px] border border-white/10 bg-[#06132f]/90 p-5">
        <div className="text-lg font-semibold text-white">{currentQuestion.label}</div>
        <p className="mt-2 text-sm leading-7 text-white/70">{currentQuestion.description}</p>

        {currentQuestion.type === "options" ? (
          <div className="mt-4 grid gap-3">
            {currentQuestion.options.map((option) => {
              const isActive = currentValue === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "rounded-[22px] border px-4 py-4 text-left text-sm transition",
                    isActive
                      ? "border-[#f5c977]/45 bg-[#f5c977]/12 text-white"
                      : "border-white/10 bg-white/5 text-white/78 hover:bg-white/10",
                  )}
                  onClick={() => updateAnswer(currentQuestion.key, option.value)}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="mt-4">
            <Textarea
              value={currentValue}
              onChange={(event) => updateAnswer(currentQuestion.key, event.target.value)}
              placeholder={currentQuestion.placeholder}
              className="min-h-[132px] rounded-[22px] border-white/10 bg-white/5 text-white placeholder:text-white/35"
            />
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-[20px] border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          className="rounded-full text-white/70 hover:bg-white/10 hover:text-white"
          onClick={restart}
        >
          <RotateCcw className="h-4 w-4" />
          {ui.restart}
        </Button>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            disabled={stepIndex === 0 || isSubmitting}
            onClick={goBack}
          >
            {ui.back}
          </Button>

          {stepIndex < questions.length - 1 ? (
            <Button
              type="button"
              className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
              disabled={!canAdvance() || isSubmitting}
              onClick={goNext}
            >
              {ui.next}
            </Button>
          ) : (
            <Button
              type="button"
              className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
              disabled={!canAdvance() || isSubmitting}
              onClick={() => void submitDiagnostic()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {ui.analyzing}
                </>
              ) : (
                ui.submit
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
