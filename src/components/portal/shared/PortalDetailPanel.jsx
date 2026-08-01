import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PortalDetailPanel({ title, description = "", onBack, children }) {
  return (
    <section className="min-w-0 rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-white sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold">{title}</h2>
          {description ? <p className="mt-1 text-sm leading-6 text-white/60">{description}</p> : null}
        </div>
        {onBack ? (
          <Button type="button" variant="ghost" onClick={onBack} className="min-h-11 rounded-full text-white/75 hover:bg-white/10 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        ) : null}
      </div>
      <div className="mt-5 min-w-0 space-y-5">{children}</div>
    </section>
  )
}
