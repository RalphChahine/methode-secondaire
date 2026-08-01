import { Search, UserPlus, UsersRound } from "lucide-react"
import { useMemo, useState } from "react"

import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchOperatorTutors } from "@/lib/operatorPortal"
import { useOperatorCollection } from "@/components/portal/operator/useOperatorCollection"

export default function OperatorTutors({ copy, tutors = [], selectedTutor, onSelect, createPanel, detail, token }) {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [isCreating, setIsCreating] = useState(false)
  const collection = useOperatorCollection({ token, collection: "tutors", query, initialItems: tutors })
  const filtered = useMemo(() => searchOperatorTutors(collection.items, query).filter((tutor) => status === "all" || tutor.status === status), [collection.items, query, status])

  if (selectedTutor) return <PortalDetailPanel title={selectedTutor.tutor_name || copy.tutorManagement} description={selectedTutor.email || selectedTutor.zones || copy.tutorManagementIntro} onBack={() => onSelect?.(null)} backLabel={copy.back || "Back"}>{detail || <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.12em] text-white/45">{copy.subjects || copy.studentLevelSubject}</div><div className="mt-2 font-semibold">{selectedTutor.subjects || copy.empty}</div></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.12em] text-white/45">{copy.availabilityTitle}</div><div className="mt-2 font-semibold">{selectedTutor.available_slots || selectedTutor.status || copy.empty}</div></div></div>}</PortalDetailPanel>
  if (isCreating) return <PortalDetailPanel title={copy.tutorManagement} description={copy.tutorManagementIntro} onBack={() => setIsCreating(false)} backLabel={copy.back || "Back"}>{createPanel}</PortalDetailPanel>

  return <PortalDetailPanel title={copy.tutorManagement} description={copy.tutorManagementIntro}>
    <div className="flex flex-col gap-3 sm:flex-row"><label className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search || copy.tutorManagement} className="h-11 rounded-2xl border-white/15 bg-white/5 pl-10 text-white" /></label><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"><option value="all">{copy.all || "All"}</option><option value="active">{copy.active || "Active"}</option><option value="inactive">{copy.inactive || "Inactive"}</option></select><Button type="button" onClick={() => setIsCreating(true)} className="min-h-11 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"><UserPlus className="h-4 w-4" />{copy.inviteTutor}</Button></div>
    {collection.error ? <p role="alert" className="text-sm leading-6 text-[#f7b4ab]">{collection.error}</p> : null}
    <div className="space-y-2">{collection.isLoading && !filtered.length ? <p className="text-sm leading-6 text-white/60">{copy.loading || "Chargement…"}</p> : filtered.length ? filtered.map((tutor) => <button key={tutor.tutor_id || tutor.email} type="button" onClick={() => onSelect?.(tutor)} className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"><span className="flex min-w-0 items-center gap-3"><UsersRound className="h-5 w-5 shrink-0 text-[#f5c977]" /><span className="min-w-0"><span className="block truncate text-sm font-semibold">{tutor.tutor_name || tutor.name || copy.empty}</span><span className="mt-1 block truncate text-xs text-white/55">{tutor.subjects || tutor.levels || tutor.zones || ""}</span></span></span><span className="shrink-0 text-xs text-white/50">{tutor.status || tutor.access_status || ""}</span></button>) : <p className="text-sm leading-6 text-white/60">{copy.empty}</p>}</div>
    {collection.nextCursor ? <Button type="button" variant="outline" onClick={collection.loadMore} disabled={collection.isLoading} className="min-h-11 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">{copy.showMore || "Afficher plus"}</Button> : null}
  </PortalDetailPanel>
}
