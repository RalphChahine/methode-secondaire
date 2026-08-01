import { Search, UserPlus, UsersRound } from "lucide-react"
import { useMemo, useState } from "react"

import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchOperatorFamilies } from "@/lib/operatorPortal"
import { useOperatorCollection } from "@/components/portal/operator/useOperatorCollection"

export default function OperatorFamilies({ copy, families = [], selectedFamily, onSelect, createPanel, token }) {
  const [query, setQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const collection = useOperatorCollection({ token, collection: "families", query, initialItems: families })
  const filtered = useMemo(() => searchOperatorFamilies(collection.items, query), [collection.items, query])

  if (selectedFamily) {
    return <PortalDetailPanel title={selectedFamily.parent_name || copy.parentName} description={selectedFamily.email || selectedFamily.phone || copy.familyDetails} onBack={() => onSelect?.(null)} backLabel={copy.back || "Back"}>
      <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.12em] text-white/45">{copy.childName}</div><div className="mt-2 font-semibold">{selectedFamily.student_name || selectedFamily.student_level_subject || copy.empty}</div></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs uppercase tracking-[0.12em] text-white/45">{copy.payments}</div><div className="mt-2 font-semibold">{selectedFamily.access_status || selectedFamily.lead_status || copy.empty}</div></div></div>
      {selectedFamily.relationship_history?.length ? <div className="space-y-2">{selectedFamily.relationship_history.map((entry, index) => <div key={`${entry.type || "history"}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/72">{entry.title || entry.detail || entry.type || copy.empty}</div>)}</div> : null}
      {selectedFamily.detail}
    </PortalDetailPanel>
  }

  if (isCreating) return <PortalDetailPanel title={copy.teamCreateParentTitle} description={copy.createParentIntro} onBack={() => setIsCreating(false)} backLabel={copy.back || "Back"}>{createPanel}</PortalDetailPanel>

  return <PortalDetailPanel title={copy.childrenTitle || copy.parentName} description={copy.parentDashboard}>
    <div className="flex flex-col gap-3 sm:flex-row"><label className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search || copy.email} className="h-11 rounded-2xl border-white/15 bg-white/5 pl-10 text-white" /></label><Button type="button" onClick={() => setIsCreating(true)} className="min-h-11 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"><UserPlus className="h-4 w-4" />{copy.teamCreateParentTitle}</Button></div>
    {collection.error ? <p role="alert" className="text-sm leading-6 text-[#f7b4ab]">{collection.error}</p> : null}
    <div className="space-y-2">{collection.isLoading && !filtered.length ? <p className="text-sm leading-6 text-white/60">{copy.loading || "Chargement…"}</p> : filtered.length ? filtered.map((family) => <button key={family.lead_id || family.parent_id || family.email} type="button" onClick={() => onSelect?.(family)} className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"><span className="flex min-w-0 items-center gap-3"><UsersRound className="h-5 w-5 shrink-0 text-[#f5c977]" /><span className="min-w-0"><span className="block truncate text-sm font-semibold">{family.parent_name || family.email || copy.empty}</span><span className="mt-1 block truncate text-xs text-white/55">{family.student_name || family.student_level_subject || family.phone || ""}</span></span></span><span className="shrink-0 text-xs text-white/50">{family.lead_status || family.access_status || ""}</span></button>) : <p className="text-sm leading-6 text-white/60">{copy.empty}</p>}</div>
    {collection.nextCursor ? <Button type="button" variant="outline" onClick={collection.loadMore} disabled={collection.isLoading} className="min-h-11 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">{copy.showMore || "Afficher plus"}</Button> : null}
  </PortalDetailPanel>
}
