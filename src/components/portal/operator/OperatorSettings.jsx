import { Settings2, ShieldCheck } from "lucide-react"

import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

export default function OperatorSettings({ copy, profile, automation = {}, accessPanel, cleanupPanel }) {
  return <PortalDetailPanel title={copy.settings || "Settings"} description={copy.automationTitle}>
    <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-[#f5c977]" />{copy.operatorDashboard}</div><p className="mt-2 text-sm text-white/60">{profile?.email || copy.empty}</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-center gap-2 text-sm font-semibold"><Settings2 className="h-4 w-4 text-[#f5c977]" />{copy.automationTitle}</div><p className="mt-2 text-sm text-white/60">{automation.reminder_cadence_minutes || 15} min · {automation.daily_digest_hour || "07:30"}</p></div></div>
    {accessPanel}{cleanupPanel}
  </PortalDetailPanel>
}
