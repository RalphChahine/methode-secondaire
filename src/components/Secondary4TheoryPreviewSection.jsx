import { Link } from "react-router-dom"
import { ArrowRight, Calculator, Target, TrendingUp } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { getLocalizedPath } from "@/lib/i18n"
import { getSecondary4MathTheoryContent } from "@/lib/secondary4MathTheoryContent"

const iconsByKey = {
  cst: Calculator,
  ts: TrendingUp,
  sn: Target,
}

export default function Secondary4TheoryPreviewSection({ locale, className = "" }) {
  const copy = getSecondary4MathTheoryContent(locale)

  return (
    <section className={className}>
      <div className="max-w-3xl">
        <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.previewEyebrow}</div>
        <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          {copy.previewTitle}
        </h2>
        <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{copy.previewDescription}</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {copy.sequenceCards.map((card) => {
          const Icon = iconsByKey[card.key] || Calculator

          return (
            <MotionCard
              key={card.key}
              className="rounded-[28px] border-white/10 bg-[#091a3a]/85 p-6 text-white"
            >
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">{card.label}</div>
              <h3 className="mt-2 font-display text-2xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{card.description}</p>
            </MotionCard>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          asChild
          className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
        >
          <Link to={getLocalizedPath("secondary4MathTheory", locale)}>
            {copy.previewCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
        >
          <Link to={getLocalizedPath("ministerialExamSec4", locale)}>
            {locale === "en" ? "See ministerial exam prep" : "Voir la préparation au ministère"}
          </Link>
        </Button>
      </div>
    </section>
  )
}
