import { Compass, Clock3, MessageCircle, Phone, Sparkles } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/seo"
import { getDiagnosticUi } from "@/lib/leadDiagnostic"
import { pricing } from "@/lib/pricing"

function getHighlights(locale) {
  const firstSession = locale === "en"
    ? `$${pricing.firstSession.priceCad} CAD / ${pricing.firstSession.durationMinutes} min`
    : `${pricing.firstSession.priceCad} $ CAD / ${pricing.firstSession.durationMinutes} min`

  if (locale === "en") {
    return [
      {
        icon: MessageCircle,
        text: "Start with what you are seeing: an exam, heavy homework, or concepts that keep piling up.",
      },
      {
        icon: Clock3,
        text: "About two minutes, with no test for your teen and no offer to choose first.",
      },
      {
        icon: Compass,
        text: `You can call directly for a 15-minute orientation. When a session is the better first step, the Targeted session is real tutoring at ${firstSession}.`,
      },
    ]
  }

  return [
    {
      icon: MessageCircle,
      text: "Partez simplement de ce que vous observez : un examen, des devoirs lourds ou des notions qui s'accumulent.",
    },
    {
      icon: Clock3,
      text: "Environ 2 minutes, sans test pour votre jeune et sans formule à choisir.",
    },
    {
      icon: Compass,
      text: `Vous pouvez appeler directement pour un appel d’orientation de 15 min. Si une séance est le meilleur premier pas, la séance ciblée est une vraie séance de tutorat à ${firstSession}.`,
    },
  ]
}

export default function AiDiagnosticSection({ locale = "fr", className = "" }) {
  const ui = getDiagnosticUi(locale)
  const highlights = getHighlights(locale)

  function openDiagnostic() {
    if (typeof window === "undefined") {
      return
    }

    window.dispatchEvent(new CustomEvent("methode:open-diagnostic"))
  }

  return (
    <MotionCard
      className={cn(
        "action-surface rounded-[34px] p-7 text-white lg:p-8",
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
