import { useMemo } from "react"
import { ChevronRight, MessageSquareText } from "lucide-react"

import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

function getThreadKey(message) {
  return message?.session_id || "team"
}

export default function TutorMessages({ copy, messages = [], messagePanel }) {
  const threads = useMemo(() => {
    const grouped = new Map()
    messages.forEach((message) => {
      const key = getThreadKey(message)
      grouped.set(key, [...(grouped.get(key) || []), message])
    })
    return [...grouped.entries()]
      .map(([key, entries]) => ({
        key,
        latest: [...entries].sort((left, right) => String(right.created_at || "").localeCompare(String(left.created_at || "")))[0],
        count: entries.length,
      }))
      .sort((left, right) => {
        const leftNeedsReply = ["awaiting_reply", "needs_reply", "reply_needed"].includes(left.latest?.message_status)
        const rightNeedsReply = ["awaiting_reply", "needs_reply", "reply_needed"].includes(right.latest?.message_status)
        if (leftNeedsReply !== rightNeedsReply) return rightNeedsReply ? 1 : -1
        return String(right.latest?.created_at || "").localeCompare(String(left.latest?.created_at || ""))
      })
  }, [messages])

  return (
    <div className="min-w-0 space-y-5">
      <PortalDetailPanel title={copy.messagesTitle} description={copy.tutorMessagesIntro}>
        {threads.length ? (
          <div className="space-y-2">
            {threads.map(({ key, latest, count }) => (
              <div key={key} className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="flex min-w-0 items-center gap-3">
                  <MessageSquareText className="h-5 w-5 shrink-0 text-[#f5c977]" />
                  <span className="min-w-0 truncate text-sm font-semibold text-white">{key === "team" ? copy.operator : latest?.subject || copy.messageSession}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-xs text-white/50">{count}<ChevronRight className="h-4 w-4" /></span>
              </div>
            ))}
          </div>
        ) : <p className="text-sm leading-6 text-white/60">{copy.tutorNoMessages}</p>}
      </PortalDetailPanel>
      {messagePanel}
    </div>
  )
}
