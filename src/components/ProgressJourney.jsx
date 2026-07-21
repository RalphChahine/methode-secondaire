import { CircleCheck } from "lucide-react"

function getStepState(step, index, currentIndex) {
  if (step.state) {
    return step.state
  }

  if (step.done || index < currentIndex) {
    return "complete"
  }

  return index === currentIndex ? "current" : "upcoming"
}

export default function ProgressJourney({
  title,
  eyebrow,
  intro,
  steps = [],
  currentIndex = 0,
  countLabel,
  className = "",
  columns = "grid-cols-2 md:grid-cols-4",
  compact = false,
}) {
  const resolvedSteps = steps.map((step, index) => ({
    ...step,
    state: getStepState(step, index, currentIndex),
  }))
  const completed = resolvedSteps.filter((step) => step.state === "complete").length
  const active = resolvedSteps.findIndex((step) => step.state === "current")
  const progress = resolvedSteps.length
    ? Math.min(100, ((completed + (active >= 0 ? 0.35 : 0)) / resolvedSteps.length) * 100)
    : 0

  return (
    <section className={`journey-surface min-w-0 ${compact ? "p-4 sm:p-5" : "p-5 sm:p-6"} ${className}`.trim()}>
      {(eyebrow || title || intro || countLabel) ? (
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0">
            {eyebrow ? <div className="journey-eyebrow">{eyebrow}</div> : null}
            {title ? <h2 className={`font-display font-semibold text-white ${compact ? "mt-1 text-2xl sm:text-3xl" : "mt-2 text-3xl sm:text-4xl"}`}>{title}</h2> : null}
            {intro ? <p className="mt-2 max-w-2xl text-sm leading-6 text-white/64">{intro}</p> : null}
          </div>
          {countLabel ? (
            <div className="journey-count shrink-0 text-right">
              <div className="font-display text-2xl font-semibold text-white">{completed}/{resolvedSteps.length}</div>
              <div className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/52">{countLabel}</div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        className="journey-track mt-4"
        role="progressbar"
        aria-label={title || eyebrow || "Progress"}
        aria-valuemin={0}
        aria-valuemax={resolvedSteps.length}
        aria-valuenow={completed}
      >
        <span className="journey-track-fill" style={{ width: `${progress}%` }} />
      </div>

      <ol className={`mt-4 grid min-w-0 gap-2.5 ${columns}`}>
        {resolvedSteps.map((step, index) => {
          const isComplete = step.state === "complete"
          const isCurrent = step.state === "current"

          return (
            <li
              key={step.label || index}
              className={`journey-step min-w-0 ${isComplete ? "journey-step-complete" : isCurrent ? "journey-step-current" : "journey-step-upcoming"}`}
            >
              <span className="journey-step-icon" aria-hidden="true">
                {isComplete ? <CircleCheck className="h-4 w-4" /> : index + 1}
              </span>
              <span className="min-w-0">
                <span className={`block font-semibold leading-5 text-white ${compact ? "text-sm" : "text-[0.95rem]"}`}>{step.label}</span>
                {step.description ? <span className="mt-1 block text-xs leading-5 text-white/58">{step.description}</span> : null}
                {step.status ? <span className="mt-1 block text-[0.68rem] font-semibold text-[#f5c977]">{step.status}</span> : null}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
