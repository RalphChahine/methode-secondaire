import { ChevronRight, CircleHelp, CreditCard, Home, UsersRound } from "lucide-react"

import { getParentMoreItems } from "@/lib/parentPortal"

const itemIcons = {
  student_tutor: UsersRound,
  plan: CreditCard,
  billing: CreditCard,
  family: Home,
  help: CircleHelp,
}

export default function ParentMore({ copy, locale = "fr", selectedKey, onSelect, detail }) {
  const items = getParentMoreItems(locale)
  return (
    <div className="min-w-0 space-y-5">
      {detail ? detail : (
        <section className="panel-soft min-w-0 rounded-[24px] p-3 text-white sm:p-4">
          <div className="px-2 pb-3"><h2 className="font-display text-2xl font-semibold">{copy.parentNavAccount}</h2><p className="mt-1 text-sm leading-6 text-white/60">{copy.profileIntro}</p></div>
          <div className="space-y-2">
            {items.map((item) => {
              const Icon = itemIcons[item.key] || ChevronRight
              return <button key={item.key} type="button" onClick={() => onSelect(item.key)} aria-current={selectedKey === item.key ? "page" : undefined} className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"><span className="flex min-w-0 items-center gap-3"><Icon className="h-5 w-5 shrink-0 text-[#f5c977]" /><span className="truncate text-sm font-semibold">{item.label}</span></span><ChevronRight className="h-4 w-4 shrink-0 text-white/45" /></button>
            })}
          </div>
        </section>
      )}
    </div>
  )
}
