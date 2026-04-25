import { BrainCircuit, Clock3, Phone, Sparkles } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/seo"
import { getDiagnosticUi } from "@/lib/leadDiagnostic"

const highlightsByLocale = {
  fr: [
    {
      icon: BrainCircuit,
      text: "Trie le besoin entre examen, rattrapage ou suivi sans devoir tout expliquer au téléphone.",
    },
    {
      icon: Clock3,
      text: "Prend environ 2 minutes et donne une orientation claire tout de suite.",
    },
    {
      icon: Sparkles,
      text: "Produit un résumé réutilisable pour la demande ou le premier appel.",
    },
  ],
  en: [
    {
      icon: BrainCircuit,
      text: "Sorts the need between exam prep, catch-up work or weekly follow-up before the call even starts.",
    },
    {
      icon: Clock3,
      text: "Takes about 2 minutes and gives a clear direction right away.",
    },
    {
      icon: Sparkles,
      text: "Produces a clean summary you can reuse in the request or first call.",
    },
  ],
}

export default function AiDiagnosticSection({ locale = "fr", className = "" }) {
  const ui = getDiagnosticUi(locale)
  const highlights = highlightsByLocale[locale] || highlightsByLocale.fr

  function openDiagnostic() {
    if (typeof window === "undefined") {
      return
    }

    window.dispatchEvent(new CustomEvent("methode:open-diagnostic"))
  }

  return (
    <MotionCard
      className={cn(
        "rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.05))] p-7 text-white lg:p-8",
        className,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
        <div>
          <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{ui.launchEyebrow}</div>
          <h3 className="mt-4 font-display text-4xl font-semibold leading-tight">{ui.launchTitle}</h3>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">{ui.launchDescription}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              type="button"
              className="rounded-full bg-[#f5c977] px-6 py-6 text-[#071631] hover:bg-[#f7d38f]"
              onClick={openDiagnostic}
            >
              <Sparkles className="h-4 w-4" />
              {ui.launchButton}
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-white hover:bg-white/10 hover:text-white"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4" />
                {ui.launchSecondary}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-3">
          {highlights.map((item) => (
            <div
              key={item.text}
              className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/5 px-5 py-5"
            >
              <div className="rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <item.icon className="h-4 w-4" />
              </div>
              <p className="text-sm leading-7 text-white/78">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionCard>
  )
}
