import { ArrowRight, CalendarClock, CircleAlert, Clock3 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function OperatorToday({ copy, queue = [], today = {}, onOpen }) {
  const schedule = [...(today.sessions_today || [])].sort((left, right) => String(left.start_at || "").localeCompare(String(right.start_at || ""))).slice(0, 6)

  return (
    <div className="min-w-0 space-y-5">
      <section className="min-w-0">
        <div className="journey-eyebrow">{copy.todayTitle}</div>
        <h2 className="mt-1 font-display text-3xl font-semibold text-white sm:text-4xl">{copy.priorityTitle}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">{copy.priorityIntro}</p>
      </section>

      <section className="panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5">
        <div className="flex items-center gap-3"><CircleAlert className="h-5 w-5 text-[#f5c977]" /><h3 className="font-display text-2xl font-semibold">{copy.todayTitle}</h3></div>
        <div className="mt-4 space-y-2">
          {queue.length ? queue.map((item) => (
            <button key={item.entityKey} type="button" onClick={() => onOpen?.(item)} className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]">
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#f5c977]"><span>{item.priorityLabel}</span>{item.deadline ? <span className="text-white/45">{new Date(item.deadline).toLocaleTimeString(copy.locale === "en" ? "en-CA" : "fr-CA", { hour: "numeric", minute: "2-digit" })}</span> : null}</span>
                <span className="mt-1 block truncate text-sm font-semibold text-white">{item.parent_name || item.student_name || item.tutor_name || item.title || item.email || copy.empty}</span>
                <span className="mt-1 block truncate text-xs text-white/55">{item.reason}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-xs font-semibold text-white/60"><span>{item.status || ""}</span><ArrowRight className="h-4 w-4" /></span>
            </button>
          )) : <p className="text-sm leading-6 text-white/60">{copy.queueEmpty}</p>}
        </div>
      </section>

      <section className="panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5">
        <div className="flex items-center gap-3"><CalendarClock className="h-5 w-5 text-[#f5c977]" /><h3 className="font-display text-2xl font-semibold">{copy.calendarTitle}</h3></div>
        <div className="mt-4 space-y-2">
          {schedule.length ? schedule.map((session) => <button key={session.session_id} type="button" onClick={() => onOpen?.({ entityKey: `session:${session.session_id}`, ...session })} className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"><span className="flex min-w-0 items-center gap-3"><Clock3 className="h-4 w-4 shrink-0 text-[#f5c977]" /><span className="min-w-0 truncate text-sm font-semibold">{session.parent_name || session.student_name || session.student_level_subject || session.session_id}</span></span><span className="shrink-0 text-xs text-white/55">{session.start_at ? new Date(session.start_at).toLocaleTimeString(copy.locale === "en" ? "en-CA" : "fr-CA", { hour: "numeric", minute: "2-digit" }) : ""}</span></button>) : <p className="text-sm leading-6 text-white/60">{copy.calendarNoSessions}</p>}
        </div>
      </section>
    </div>
  )
}
