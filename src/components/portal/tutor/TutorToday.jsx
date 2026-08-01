import { ArrowRight, CircleAlert, FileText, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

const attentionIcons = {
  note_due: FileText,
  reply_due: MessageCircle,
  request_review: CircleAlert,
}

const attentionLabels = {
  note_due: "tutorAttentionNote",
  reply_due: "tutorAttentionReply",
  request_review: "tutorAttentionRequest",
}

function formatSessionDate(session, locale) {
  if (!session?.start_at) return ""
  const date = new Date(session.start_at)
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleString(locale === "en" ? "en-CA" : "fr-CA", { dateStyle: "medium", timeStyle: "short" })
}

export default function TutorToday({ copy, locale = "fr", model, onOpenSession, onOpenAttention, nextSessionCard, sessionDetail }) {
  if (sessionDetail) return sessionDetail

  const attention = (model?.attention || []).slice(0, 2)
  const nextSession = model?.nextSession

  return (
    <div className="min-w-0 space-y-5">
      <section className="min-w-0">
        <div className="journey-eyebrow">{copy.tutorTodayTitle}</div>
        <h2 className="mt-1 font-display text-3xl font-semibold text-white sm:text-4xl">{copy.tutorTodayIntro}</h2>
        {attention.length ? (
          <div className="mt-4 flex min-w-0 flex-wrap gap-2">
            {attention.map((item, index) => {
              const Icon = attentionIcons[item.kind] || CircleAlert
              const label = copy[attentionLabels[item.kind]] || item.kind
              return (
                <button
                  key={`${item.kind}-${item.session?.session_id || item.message?.message_id || item.request?.request_id || index}`}
                  type="button"
                  onClick={() => onOpenAttention?.(item)}
                  className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-[#f5c977]/30 bg-[#f5c977]/10 px-3 text-left text-sm font-semibold text-[#f5c977] transition hover:bg-[#f5c977]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              )
            })}
          </div>
        ) : null}
      </section>

      {nextSessionCard || (nextSession ? (
        <section className="panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="journey-eyebrow">{copy.nextSession}</div>
              <h3 className="mt-1 truncate font-display text-2xl font-semibold">{formatSessionDate(nextSession, locale)}</h3>
              <p className="mt-1 truncate text-sm text-white/60">{nextSession.student_name || nextSession.student_level_subject || copy.studentName}</p>
            </div>
            <Button type="button" variant="outline" onClick={() => onOpenSession?.(nextSession)} className="min-h-11 shrink-0 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              {copy.manageSession}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      ) : null)}
    </div>
  )
}
