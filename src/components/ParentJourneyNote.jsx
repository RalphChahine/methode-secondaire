import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getParentJourney } from "@/lib/parentJourney"

export default function ParentJourneyNote({ locale = "fr", className = "" }) {
  const journey = getParentJourney(locale)

  return (
    <div className={`panel-soft rounded-[24px] px-4 py-4 text-white sm:px-5 ${className}`}>
      <div className="rule-label text-[0.62rem]">{journey.eyebrow}</div>
      <p className="mt-2 text-sm leading-7 text-white/76">{journey.text}</p>
      <div className="mt-3">
        <Button
          asChild
          variant="outline"
          className="rounded-full border-white/15 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
        >
          <Link to={journey.action.to}>
            {journey.action.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
