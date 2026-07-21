import { useEffect, useMemo, useRef, useState } from "react"
import {
  CalendarDays,
  Check,
  Clipboard,
  Loader2,
  MessageSquareMore,
  Phone,
  RotateCcw,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DECLIC_REQUEST_URL, DECLIC_REQUEST_URL_EN } from "@/config/booking"
import { assistantBusinessInfo } from "@/lib/assistantConfig"
import {
  buildFallbackLeadDiagnosticResult,
  buildLeadDiagnosticClipboardText,
  createEmptyDiagnosticAnswers,
  getDiagnosticQuestions,
  getDiagnosticUi,
  normalizeLeadDiagnosticAnswers,
} from "@/lib/leadDiagnostic"
import { getRememberedParentIntent } from "@/lib/parentIntent"
import { cn } from "@/lib/utils"

function createAnswersFromParentIntent() {
  const answers = createEmptyDiagnosticAnswers()
  const intent = getRememberedParentIntent()
  const goalByIntent = {
    exam: "exam-prep",
    homework: "independence",
    ongoing: "weekly",
  }

  return {
    ...answers,
    goal: goalByIntent[intent] || "",
  }
}

function emitDiagnosticEvent(name, detail = {}) {
  if (typeof window === "undefined") {
    return
  }

  window.dispatchEvent(new CustomEvent(name, { detail }))
}

export default function LeadDiagnosticPanel({ locale = "fr" }) {
  const ui = getDiagnosticUi(locale)
  const requestUrl = locale === "en" ? DECLIC_REQUEST_URL_EN : DECLIC_REQUEST_URL
  const questions = useMemo(() => getDiagnosticQuestions(locale), [locale])
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState(createAnswersFromParentIntent)
  const [result, setResult] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const hasTrackedStart = useRef(false)

  const currentQuestion = questions[stepIndex]
  const progress = questions.length ? ((stepIndex + 1) / questions.length) * 100 : 0
  const currentValue = currentQuestion ? answers[currentQuestion.key] || "" : ""

  useEffect(() => {
    setStepIndex(0)
    setAnswers(createAnswersFromParentIntent())
    setResult(null)
    setIsSubmitting(false)
    setError("")
    setCopied(false)
  }, [locale])

  useEffect(() => {
    if (hasTrackedStart.current) {
      return
    }

    hasTrackedStart.current = true
    emitDiagnosticEvent("methode:diagnostic-start", { locale })
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
    setStepIndex((current) => {
      const nextStep = Math.min(questions.length - 1, current + 1)
      emitDiagnosticEvent("methode:diagnostic-progress", {
        locale,
        step: current + 1,
        next_step: nextStep + 1,
        field: questions[current]?.key || "",
      })
      return nextStep
    })
  }

  function restart() {
    setStepIndex(0)
    setAnswers(createAnswersFromParentIntent())
    setResult(null)
    setError("")
    setCopied(false)
  }

  function canAdvance() {
    if (!currentQuestion) {
      return false
    }

    if (currentQuestion.required === false) {
      return true
    }

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
      await new Promise((resolve) => window.setTimeout(resolve, 320))
      const localResult = buildFallbackLeadDiagnosticResult(locale, normalizedAnswers)

      setResult(localResult)

      if (typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem(
            "methode:first-session-prefill",
            JSON.stringify({
              locale,
              answers: normalizedAnswers,
              result: localResult,
              diagnosticSummary: localResult.suggestedMessage,
            }),
          )
        } catch {
          // The result remains usable even when browser storage is unavailable.
        }

        window.dispatchEvent(
          new CustomEvent("methode:diagnostic-complete", {
            detail: {
              locale,
              ...normalizedAnswers,
              recommended_action: localResult.recommendedAction,
              recommended_service: localResult.recommendedService,
              limited_mode: true,
            },
          }),
        )

        window.dispatchEvent(
          new CustomEvent("methode:diagnostic-prefill", {
            detail: {
              locale,
              answers: normalizedAnswers,
              result: localResult,
            },
          }),
        )
      }
    } catch {
      setError(
        locale === "en"
          ? "The orientation check-in could not be prepared."
          : "Le mini-bilan n'a pas pu être préparé.",
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

  function jumpToContact() {
    if (typeof window === "undefined") {
      return
    }

    window.dispatchEvent(
      new CustomEvent("methode:jump-contact", {
        detail: {
          locale,
          requestedOffer: result?.requestedOffer || "first_session_declic",
        },
      }),
    )
  }

  if (!currentQuestion && !result) {
    return null
  }

  if (result) {
    const primaryAction = result.recommendedAction
    const isProgressionBlock = ["progression_block_10", "weekly_follow_up_10"].includes(result.requestedOffer)
    const requestHref = isProgressionBlock ? `${requestUrl}?offer=progression` : requestUrl
    const orderedActions = [
      primaryAction,
      primaryAction === "call_now" ? "book_session" : "call_now",
    ].map((action) => ({
      action,
      href: action === "call_now" ? `tel:${assistantBusinessInfo.phone}` : requestHref,
      label: ui.actions[action],
      Icon: action === "call_now" ? Phone : CalendarDays,
    }))

    return (
      <div className="space-y-4">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/60">
              <Sparkles className="h-3.5 w-3.5 text-[#f5c977]" />
              {ui.resultEyebrow}
            </div>
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
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/78"
                >
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
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/78"
                >
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
          {orderedActions.map(({ action, href, label, Icon }, index) => {
            const isPrimary = index === 0
            return (
              <div key={action} className="space-y-2">
                <div className="px-1 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
                  {isPrimary ? ui.primaryActionLabel : ui.secondaryActionLabel}
                </div>
                <Button
                  asChild
                  className={cn(
                    "w-full rounded-full py-6",
                    isPrimary
                      ? "bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                      : "border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white",
                  )}
                  variant={isPrimary ? "default" : "outline"}
                >
                  <a
                    href={href}
                    aria-label={`${isPrimary ? ui.primaryActionLabel : ui.secondaryActionLabel}: ${label}`}
                    onClick={() => emitDiagnosticEvent("methode:diagnostic-result-cta", { locale, action })}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </Button>
              </div>
            )
          })}
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
            onClick={jumpToContact}
          >
            <MessageSquareMore className="h-4 w-4" />
            {locale === "en" ? "Use in contact form" : "Utiliser dans le formulaire"}
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
