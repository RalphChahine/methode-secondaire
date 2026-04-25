import { Link } from "react-router-dom"
import { ArrowRight, BookOpenText, Target, TrendingUp } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Button } from "@/components/ui/button"
import { resourceHubCopyByLocale, resourceRouteKeys, getResourcePageContent } from "@/lib/resourceContent"
import { getLocalizedPath } from "@/lib/i18n"

const icons = [BookOpenText, Target, TrendingUp, BookOpenText]

export default function ResourceGridSection({
  locale = "fr",
  className = "pt-20",
  routeKeys = resourceRouteKeys,
  heading,
  description,
  showHubLink = true,
}) {
  const copy = resourceHubCopyByLocale[locale]

  return (
    <section className={className}>
      <div className="max-w-3xl">
        <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">
          {heading?.eyebrow || copy.eyebrow}
        </div>
        <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          {heading?.title || copy.title}
        </h2>
        <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
          {description || copy.description}
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {routeKeys.map((routeKey, index) => {
          const article = getResourcePageContent(routeKey, locale)
          const Icon = icons[index % icons.length]

          if (!article) {
            return null
          }

          return (
            <MotionCard
              key={routeKey}
              className="glass-panel rounded-[30px] border-white/10 bg-white/[0.04] p-6 text-white"
            >
              <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-sm uppercase tracking-[0.22em] text-white/45">
                {article.eyebrow}
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold">{article.cardTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{article.cardDescription}</p>
              <Button
                asChild
                variant="outline"
                className="mt-8 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath(routeKey, locale)}>
                  {copy.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </MotionCard>
          )
        })}
      </div>

      {showHubLink && (
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <Link to={getLocalizedPath("resourcesHub", locale)}>
              {locale === "en" ? "See all resources" : "Voir toutes les ressources"}
            </Link>
          </Button>
        </div>
      )}
    </section>
  )
}
