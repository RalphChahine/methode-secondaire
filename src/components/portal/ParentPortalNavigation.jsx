export default function ParentPortalNavigation({ active, items, onChange, ariaLabel }) {
  return (
    <nav aria-label={ariaLabel} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-current={active === key ? "page" : undefined}
          className={active === key
            ? "flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#f5c977] px-3 py-2 text-sm font-semibold text-[#071631] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            : "flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </nav>
  )
}
