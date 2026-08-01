import { CreditCard } from "lucide-react"

import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

export default function OperatorPayments({ copy, payments = [], enrollments = [], ledger = [], detail }) {
  const due = payments.filter((payment) => ["payment_requested", "overdue"].includes(payment.payment_status))
  const history = payments.filter((payment) => !due.includes(payment))
  return <PortalDetailPanel title={copy.payments} description={copy.planSetupIntro || copy.paymentModeUnavailable}>
    {detail}
    <div className="space-y-2">{due.map((payment) => <div key={payment.payment_id} className="flex items-center justify-between gap-3 rounded-2xl border border-[#f5c977]/25 bg-[#f5c977]/8 px-4 py-3"><span className="flex min-w-0 items-center gap-3"><CreditCard className="h-5 w-5 shrink-0 text-[#f5c977]" /><span className="min-w-0 truncate text-sm font-semibold">{payment.display_name_fr || payment.display_name_en || payment.session_id}</span></span><span className="text-xs text-[#f5c977]">{payment.payment_status}</span></div>)}{!due.length ? <p className="text-sm text-white/60">{copy.empty}</p> : null}</div>
    {history.length ? <div className="space-y-2 border-t border-white/10 pt-4">{history.map((payment) => <div key={payment.payment_id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">{payment.display_name_fr || payment.display_name_en || payment.session_id} · {payment.payment_status}</div>)}</div> : null}
    {enrollments.length ? <div className="border-t border-white/10 pt-4"><h3 className="font-semibold">{copy.planEnrollments || copy.planSetupTitle}</h3><div className="mt-2 space-y-2">{enrollments.slice(0, 8).map((enrollment) => <div key={enrollment.enrollment_id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">{enrollment.student_name || enrollment.lead_id || enrollment.enrollment_id} · {enrollment.status}</div>)}</div></div> : null}
    {ledger.length ? <div className="border-t border-white/10 pt-4"><h3 className="font-semibold">{copy.creditLedger || copy.creditsRemaining}</h3><p className="mt-2 text-sm text-white/65">{ledger.length} {copy.activityIntro}</p></div> : null}
  </PortalDetailPanel>
}
