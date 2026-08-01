import { ArrowRight, CalendarDays, CheckCircle2, CircleAlert, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"

const actionCopy = {
  profile: ["parentActionProfile", "parentActionProfileText"],
  matching: ["parentActionMatching", "parentActionMatchingText"],
  booking: ["parentActionBooking", "parentActionBookingText"],
  payment: ["parentActionPayment", "parentActionPaymentText"],
  message: ["parentActionMessage", "parentActionMessageText"],
  prepare: ["materialsTitle", "materialsDescription"],
  all_set: ["parentActionAllSet", "parentActionAllSetText"],
}

function formatSessionDate(session, locale) {
  if (!session?.start_at) return ""
  const date = new Date(session.start_at)
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleString(locale === "en" ? "en-CA" : "fr-CA", { dateStyle: "medium", timeStyle: "short" })
}

export default function ParentHome({ copy, locale = "fr", model, onOpenAction, onOpenSession }) {
  const [titleKey, descriptionKey] = actionCopy[model?.action?.key] || actionCopy.all_set
  const isReady = model?.action?.key === "all_set"
  const ActionIcon = isReady ? CheckCircle2 : CircleAlert
  const nextSession = model?.nextSession
  const recap = model?.latestRecap
  const recapText = recap?.parent_summary || recap?.summary || recap?.message || ""

  return (
    <div className="min-w-0 space-y-5">
      <section className="action-surface min-w-0 rounded-[24px] p-4 text-white sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f5c977] text-[#071631]">
            <ActionIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="journey-eyebrow">{copy.parentActionEyebrow}</div>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{copy[titleKey]}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">{copy[descriptionKey]}</p>
          </div>
        </div>
        {!isReady ? (
          <Button type="button" onClick={() => onOpenAction(model.action)} className="mt-4 min-h-11 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
            {copy.parentActionOpen}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : null}
      </section>

      <section className="panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-[#f5c977]" />
          <div>
            <div className="journey-eyebrow">{copy.nextSession}</div>
            <h2 className="font-display text-2xl font-semibold">{nextSession ? formatSessionDate(nextSession, locale) : copy.noNextSession}</h2>
          </div>
        </div>
        {nextSession ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
            <span>{nextSession.student_name || nextSession.student || copy.studentName}</span>
            <Button type="button" variant="outline" onClick={() => onOpenSession(nextSession)} className="min-h-11 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              {copy.manageSession}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </section>

      {recap ? (
        <section className="panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#f5c977]" />
            <div>
              <div className="journey-eyebrow">{copy.sessionRecapTitle}</div>
              <h2 className="font-display text-2xl font-semibold">{recap.session?.student_name || copy.parentSummary}</h2>
            </div>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/70">{recapText || copy.empty}</p>
        </section>
      ) : null}
    </div>
  )
}
