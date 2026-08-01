import { LoaderCircle, LogOut, RefreshCw, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PortalPageHeader({
  copy,
  role,
  profileName,
  email,
  isRefreshing = false,
  onRefresh,
  onLogout,
  notice = "",
  error = "",
}) {
  const title = role === "operator"
    ? copy.operatorDashboard
    : role === "tutor"
      ? copy.tutorDashboard
      : copy.parentDashboard

  return (
    <div className="relative z-10 flex flex-col gap-4 text-white sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="inline-flex max-w-full items-center gap-2 text-sm text-white/60">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#f5c977]" />
          <span className="truncate">{profileName || email}</span>
        </div>
        <h1 className="mt-1 font-display text-2xl font-semibold sm:mt-2 sm:text-4xl">{title}</h1>
      </div>
      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
        <Button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="h-10 min-w-0 rounded-full bg-white/10 px-3 text-sm text-white hover:bg-white/15 sm:h-auto sm:w-auto sm:px-4"
        >
          {isRefreshing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          {copy.refresh}
        </Button>
        <Button
          type="button"
          onClick={onLogout}
          variant="outline"
          className="h-10 min-w-0 rounded-full border-white/15 bg-white/5 px-3 text-sm text-white hover:bg-white/10 hover:text-white sm:h-auto sm:w-auto sm:px-4"
        >
          <LogOut className="h-4 w-4" />
          {copy.logout}
        </Button>
      </div>
      {notice ? <p className="w-full rounded-2xl bg-[#f5c977]/12 px-4 py-3 text-sm leading-6 text-white/78">{notice}</p> : null}
      {error ? <p className="w-full rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">{error}</p> : null}
    </div>
  )
}
