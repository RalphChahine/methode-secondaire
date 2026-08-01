import { ChevronRight, CreditCard, Settings2, UsersRound } from "lucide-react"

import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

const items = [
  ["tutors", "tutorManagement", UsersRound],
  ["payments", "payments", CreditCard],
  ["settings", "settings", Settings2],
]

export default function OperatorMore({ copy, onSelect }) {
  return <PortalDetailPanel title={copy.more || "More"} description={copy.operatorDashboard}><div className="space-y-2">{items.map(([key, labelKey, Icon]) => <button key={key} type="button" onClick={() => onSelect?.(key)} className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"><span className="flex min-w-0 items-center gap-3"><Icon className="h-5 w-5 shrink-0 text-[#f5c977]" /><span className="truncate text-sm font-semibold">{copy[labelKey] || labelKey}</span></span><ChevronRight className="h-4 w-4 text-white/50" /></button>)}</div></PortalDetailPanel>
}
