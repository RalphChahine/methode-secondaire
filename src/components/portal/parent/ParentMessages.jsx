import { useMemo } from "react"
import { MessageSquareText } from "lucide-react"

function getThreadKey(message) {
  return message.session_id || "team"
}

export default function ParentMessages({ copy, messages = [], messagePanel }) {
  const threads = useMemo(() => {
    const grouped = new Map()
    messages.forEach((message) => {
      const key = getThreadKey(message)
      const current = grouped.get(key) || []
      current.push(message)
      grouped.set(key, current)
    })
    return [...grouped.entries()]
      .map(([key, items]) => ({ key, latest: items.sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")))[0], count: items.length }))
      .sort((a, b) => Number(Boolean(b.latest?.message_status === "awaiting_reply")) - Number(Boolean(a.latest?.message_status === "awaiting_reply")))
  }, [messages])

  return (
    <div className="min-w-0 space-y-5">
      <section className="panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5">
        <div className="flex items-center gap-3"><MessageSquareText className="h-5 w-5 text-[#f5c977]" /><h2 className="font-display text-2xl font-semibold">{copy.messagesTitle}</h2></div>
        <div className="mt-4 space-y-2">
          {threads.map(({ key, latest, count }) => (
            <div key={key} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <span className="min-w-0 truncate text-white/80">{key === "team" ? copy.operator : latest?.subject || copy.messageSession}</span>
              <span className="shrink-0 text-xs text-white/50">{count}</span>
            </div>
          ))}
          {!threads.length ? <p className="text-sm text-white/60">{copy.empty}</p> : null}
        </div>
      </section>
      {messagePanel}
    </div>
  )
}
