import { CalendarDays, CalendarPlus } from "lucide-react"

import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"
import { Button } from "@/components/ui/button"
import { useOperatorCollection } from "@/components/portal/operator/useOperatorCollection"

export default function OperatorCalendar({ copy, sessions = [], onOpen, schedulePanel, token }) {
  const collection = useOperatorCollection({ token, collection: "sessions", initialItems: sessions })
  const visibleSessions = collection.items
  return <PortalDetailPanel title={copy.calendarTitle} description={copy.calendarIntro}>
    <div className="flex justify-end"><Button type="button" onClick={() => onOpen?.({ kind: "schedule" })} className="min-h-11 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"><CalendarPlus className="h-4 w-4" />{copy.scheduleSession}</Button></div>
    {schedulePanel}
    {collection.error ? <p role="alert" className="text-sm leading-6 text-[#f7b4ab]">{collection.error}</p> : null}
    <div className="space-y-2">{collection.isLoading && !visibleSessions.length ? <p className="text-sm leading-6 text-white/60">{copy.loading || "Chargement…"}</p> : visibleSessions.length ? visibleSessions.map((session) => <button key={session.session_id} type="button" onClick={() => onOpen?.({ kind: "session", session })} className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"><span className="flex min-w-0 items-center gap-3"><CalendarDays className="h-5 w-5 shrink-0 text-[#f5c977]" /><span className="min-w-0"><span className="block truncate text-sm font-semibold">{session.parent_name || session.student_name || session.student_level_subject || session.session_id}</span><span className="mt-1 block truncate text-xs text-white/55">{session.start_at ? new Date(session.start_at).toLocaleString("fr-CA", { dateStyle: "medium", timeStyle: "short" }) : copy.empty}</span></span></span><span className="shrink-0 text-xs text-white/50">{session.session_status || ""}</span></button>) : <p className="text-sm leading-6 text-white/60">{copy.calendarNoSessions}</p>}</div>
    {collection.nextCursor ? <Button type="button" variant="outline" onClick={collection.loadMore} disabled={collection.isLoading} className="min-h-11 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">{copy.showMore || "Afficher plus"}</Button> : null}
  </PortalDetailPanel>
}
