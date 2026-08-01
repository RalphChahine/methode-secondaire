import { Inbox, MessageSquareText } from "lucide-react"

import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

export default function OperatorInbox({ copy, messages = [], requests = [], messagePanel, requestPanel }) {
  const orderedMessages = [...messages].sort((left, right) => Number(["awaiting_reply", "overdue_alerted"].includes(right.message_status)) - Number(["awaiting_reply", "overdue_alerted"].includes(left.message_status)) || String(right.created_at || "").localeCompare(String(left.created_at || "")))
  const orderedRequests = [...requests].sort((left, right) => Number(right.status === "in_review") - Number(left.status === "in_review"))
  return <PortalDetailPanel title={copy.queueMessages} description={copy.priorityIntro}>
    <div className="flex items-center gap-3"><Inbox className="h-5 w-5 text-[#f5c977]" /><h3 className="font-display text-2xl font-semibold">{copy.messagesTitle}</h3></div>
    <div className="space-y-2">{orderedMessages.length ? orderedMessages.map((message) => <div key={message.message_id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" /><div className="min-w-0"><div className="truncate text-sm font-semibold">{message.sender_name || message.parent_name || message.session_id}</div><div className="mt-1 line-clamp-2 text-xs text-white/55">{message.message || message.subject || message.message_status}</div></div></div>) : <p className="text-sm text-white/60">{copy.empty}</p>}</div>
    {messagePanel}{requestPanel}
    {orderedRequests.length ? <div className="border-t border-white/10 pt-4"><h3 className="font-semibold">{copy.requestQueue}</h3><div className="mt-2 space-y-2">{orderedRequests.map((request) => <div key={request.request_id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">{request.subject || request.request_type} · {request.status}</div>)}</div></div> : null}
  </PortalDetailPanel>
}
