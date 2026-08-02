import { useMemo } from "react"

import MotionCard from "@/components/MotionCard"
import { getPortalCopy } from "@/lib/portalCopy"
import PortalPageHeader from "@/components/portal/shared/PortalPageHeader"

function PortalDestinationButton({ destination, active, onChange, compact = false }) {
  const Icon = destination.icon
  const isActive = active === destination.key

  return (
    <button
      type="button"
      onClick={() => onChange(destination.key)}
      aria-current={isActive ? "page" : undefined}
      className={isActive
        ? "flex min-h-11 items-center gap-3 rounded-2xl bg-[var(--brand-blue-600)] px-3 py-2 text-left text-sm font-semibold text-white shadow-[0_12px_30px_rgba(36,99,232,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        : "flex min-h-11 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue-500)]"}
    >
      <Icon className={compact ? "h-4 w-4 shrink-0" : "h-5 w-5 shrink-0"} />
      <span className={compact ? "sr-only" : "truncate"}>{destination.label}</span>
    </button>
  )
}

export default function PortalShell({
  role,
  locale = "fr",
  destinations = [],
  desktopDestinations,
  mobileDestinations,
  active,
  onChange,
  profileName,
  email,
  copy = getPortalCopy(locale),
  isRefreshing = false,
  onRefresh,
  onLogout,
  notice,
  error,
  children,
}) {
  const activeDestination = useMemo(
    () => active || destinations[0]?.key || "",
    [active, destinations],
  )
  const hasNavigation = destinations.length > 0
  const desktopItems = desktopDestinations || destinations
  const mobileItems = mobileDestinations || destinations

  return (
    <div className={`portal-reference min-w-0 ${hasNavigation ? "lg:grid lg:grid-cols-[15rem,minmax(0,1fr)] lg:items-start lg:gap-6" : ""}`}>
      {hasNavigation ? (
        <aside className="sticky top-24 hidden min-w-0 lg:block">
          <div className="panel-soft rounded-[24px] p-3 text-white">
            <div className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              {role === "operator" ? copy.operatorDashboard : role === "tutor" ? copy.tutorDashboard : copy.parentDashboard}
            </div>
            <nav aria-label={copy.portalNavLabel || copy.parentNavLabel || "Portal navigation"} className="space-y-1">
              {desktopItems.map((destination) => (
                <PortalDestinationButton
                  key={destination.key}
                  destination={destination}
                  active={activeDestination}
                  onChange={onChange}
                />
              ))}
            </nav>
          </div>
        </aside>
      ) : null}

      <div className="min-w-0">
        <MotionCard className="section-shell noise-overlay p-4 text-white sm:p-6">
          <PortalPageHeader
            copy={copy}
            role={role}
            profileName={profileName}
            email={email}
            isRefreshing={isRefreshing}
            onRefresh={onRefresh}
            onLogout={onLogout}
            notice={notice}
            error={error}
          />
        </MotionCard>
        <div className={hasNavigation ? "mt-6 min-w-0 pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-8" : "min-w-0"}>
          {children}
        </div>
      </div>

      {hasNavigation ? (
        <nav
          aria-label={copy.portalNavLabel || copy.parentNavLabel || "Portal navigation"}
          className="fixed inset-x-0 bottom-0 z-40 grid gap-1 border-t border-white/10 bg-[var(--brand-navy-950)]/95 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden"
          style={{ gridTemplateColumns: `repeat(${mobileItems.length}, minmax(0, 1fr))` }}
        >
          {mobileItems.map((destination) => (
            <PortalDestinationButton
              key={destination.key}
              destination={destination}
              active={activeDestination}
              onChange={onChange}
              compact
            />
          ))}
        </nav>
      ) : null}
    </div>
  )
}
