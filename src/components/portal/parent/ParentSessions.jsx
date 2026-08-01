import { useState } from "react"
import { CalendarCheck, CalendarClock, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

function formatSessionDate(session, locale) {
  if (!session?.start_at) return "Date à confirmer"
  const date = new Date(session.start_at)
  return Number.isNaN(date.getTime())
    ? "Date à confirmer"
    : date.toLocaleString(locale === "en" ? "en-CA" : "fr-CA", { dateStyle: "medium", timeStyle: "short" })
}

function SessionCompactRow({ copy, locale, session, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(session)} className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]">
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-white">{formatSessionDate(session, locale)}</span>
        <span className="mt-1 block truncate text-xs text-white/58">{session.student_name || session.student || copy.studentName}{session.tutor_name ? ` · ${session.tutor_name}` : ""}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2 text-xs font-semibold text-white/60">
        {session.session_status || copy.empty}
        <ChevronRight className="h-4 w-4" />
      </span>
    </button>
  )
}

function SessionGroup({ copy, locale, title, icon: Icon, sessions, onSelect }) {
  if (!sessions.length) return null
  return (
    <section className="min-w-0 space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-white/75"><Icon className="h-4 w-4 text-[#f5c977]" />{title}</div>
      {sessions.map((session) => <SessionCompactRow key={session.session_id} copy={copy} locale={locale} session={session} onSelect={onSelect} />)}
    </section>
  )
}

export default function ParentSessions({ copy, locale = "fr", sessionGroups, bookingPanel, detail, onSelectSession }) {
  const [segment, setSegment] = useState("upcoming")
  const upcoming = [...(sessionGroups.upcoming || []), ...(sessionGroups.followUp || [])]
  const hasPast = (sessionGroups.past || []).length > 0 || (sessionGroups.cancelled || []).length > 0

  return (
    <div className="min-w-0 space-y-5">
      {detail ? detail : (
        <>
          <div className="grid grid-cols-2 rounded-2xl border border-white/10 bg-white/5 p-1">
            {[['upcoming', copy.upcomingSessions], ['past', copy.pastSessions]].map(([key, label]) => (
              <button key={key} type="button" onClick={() => setSegment(key)} className={`min-h-11 rounded-xl px-3 text-sm font-semibold transition ${segment === key ? "bg-white/15 text-white" : "text-white/55 hover:bg-white/10 hover:text-white"}`}>
                {label}
              </button>
            ))}
          </div>
          {segment === "upcoming" ? (
            <>
              {bookingPanel}
              <SessionGroup copy={copy} locale={locale} title={copy.upcomingSessions} icon={CalendarCheck} sessions={upcoming} onSelect={onSelectSession} />
              {!upcoming.length ? <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/60">{copy.empty}</p> : null}
            </>
          ) : (
            <>
              <SessionGroup copy={copy} locale={locale} title={copy.pastSessions} icon={CalendarClock} sessions={sessionGroups.past || []} onSelect={onSelectSession} />
              <SessionGroup copy={copy} locale={locale} title={copy.cancelledSessions} icon={CalendarClock} sessions={sessionGroups.cancelled || []} onSelect={onSelectSession} />
              {!hasPast ? <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/60">{copy.empty}</p> : null}
            </>
          )}
        </>
      )}
    </div>
  )
}
