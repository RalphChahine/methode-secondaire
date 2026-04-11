import { Link } from "react-router-dom"
import { ArrowRight, BadgeCheck, CalendarDays, Clock3, MapPin, Phone, ShieldCheck, Star, Users } from "lucide-react"

import MotionCard from "@/components/MotionCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import {
  guaranteeByLocale,
  localLinkContentByLocale,
  localPageConfigs,
  operationalPromisesByLocale,
  tutorProfilesByLocale,
  verifiedReviewsByLocale,
} from "@/lib/conversionContent"
import { getLocalizedPath } from "@/lib/i18n"
import { siteConfig } from "@/lib/seo"

const localRouteKeys = ["montreal", "laval", "quebecOnline"]

export function GuaranteeSection({ locale = "fr", className = "pt-20" }) {
  const copy = guaranteeByLocale[locale]

  return (
    <section className={className}>
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <MotionCard className="mt-8 rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.16),rgba(255,255,255,0.06))] p-7 text-white sm:p-9">
        <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div>
            <Badge className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-white hover:bg-white/10">
              {locale === "en" ? "First conversation" : "Premier échange"}
            </Badge>

            <div className="mt-6 space-y-4">
              {copy.items.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-[#f5c977] p-2.5 text-[#071631]">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/75">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[30px] border-white/10 bg-white/[0.05] p-6 text-white">
            <div className="text-sm uppercase tracking-[0.24em] text-white/45">
              {locale === "en" ? "What families appreciate" : "Ce que les familles apprécient"}
            </div>
            <div className="mt-3 font-display text-3xl font-semibold">
              {locale === "en"
                ? "A clear beginning makes the rest of the journey feel lighter."
                : "Quand le début est clair, tout le reste devient plus simple."}
            </div>

            <div className="mt-4 rounded-[22px] border border-[#f5c977]/25 bg-[#f5c977]/10 px-4 py-4 text-sm text-[#f8deb0]">
              <div className="font-semibold text-white">{copy.recommended}</div>
              <p className="mt-2 leading-7 text-[#f8deb0]">{copy.recommendedText}</p>
            </div>

            <div className="mt-6 space-y-3 text-sm text-white/78">
              {[
                locale === "en"
                  ? "A short first conversation helps the family move forward with confidence."
                  : "Un premier échange court aide la famille à avancer avec confiance.",
                locale === "en"
                  ? "If a change is needed, there is a simple way to adjust."
                  : "Si le premier accompagnement ne convient pas, l'ajustement reste simple et rassurant.",
                locale === "en"
                  ? "The first session already gives the student and parent a clear direction."
                  : "Dès la première séance, l'élève et le parent repartent avec une direction claire.",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-[#081a38]/70 px-4 py-4">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {line}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4" />
                  {copy.primary}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  <CalendarDays className="h-4 w-4" />
                  {copy.secondary}
                </a>
              </Button>
            </div>

            <div className="mt-4">
              <Link to={getLocalizedPath("tuteurs", locale)} className="text-sm text-white/72 transition hover:text-white">
                {copy.tertiary}
              </Link>
            </div>
          </div>
        </div>
      </MotionCard>
    </section>
  )
}

export function OperationalPromisesSection({ locale = "fr", className = "pt-20" }) {
  const copy = operationalPromisesByLocale[locale]
  const icons = [Clock3, Users, CalendarDays, MapPin]

  return (
    <section className={className}>
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {copy.promises.map((promise, index) => {
          const Icon = icons[index % icons.length]

          return (
            <MotionCard key={promise.title} className="glass-panel rounded-[28px] border-white/10 bg-white/[0.04] p-6 text-white">
              <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{promise.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{promise.description}</p>
            </MotionCard>
          )
        })}
      </div>
    </section>
  )
}

export function VerifiedReviewsSection({
  locale = "fr",
  className = "pt-20",
  limit,
  showLink = true,
}) {
  const copy = verifiedReviewsByLocale[locale]
  const reviews = typeof limit === "number" ? copy.reviews.slice(0, limit) : copy.reviews

  return (
    <section className={className}>
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <div className="mt-5 rounded-[24px] border border-[#f5c977]/20 bg-[#f5c977]/8 px-5 py-4 text-sm text-[#f8deb0]">
        {copy.note}
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-4">
        {reviews.map((review) => (
          <MotionCard key={`${review.author}-${review.outcome}`} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-6 text-white">
            <div className="flex items-center justify-between gap-3">
              <Badge className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-white/85 hover:bg-white/10">
                {review.subject}
              </Badge>
              <div className="rounded-full border border-[#f5c977]/30 bg-[#f5c977]/12 px-3 py-1 text-xs text-[#f8deb0]">
                {review.verified}
              </div>
            </div>

            <div className="mt-5 flex gap-1 text-[#f5c977]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={`${review.author}-${index}`} className="h-4 w-4 fill-current" />
              ))}
            </div>

            <blockquote className="mt-5 text-base leading-8 text-white/90">“{review.quote}”</blockquote>

            <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/72">
              <div className="font-semibold text-white">{review.author}</div>
              <div className="mt-1">{review.context}</div>
              <div className="mt-3 inline-flex rounded-full border border-white/10 bg-[#081a38]/90 px-3 py-1 text-xs text-[#f5c977]">
                {review.outcome}
              </div>
            </div>
          </MotionCard>
        ))}
      </div>

      {showLink && (
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <Link to={getLocalizedPath("temoignages", locale)}>
              {copy.moreLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  )
}

export function TutorRosterSection({ locale = "fr", className = "pt-20", limit }) {
  const copy = tutorProfilesByLocale[locale]
  const profiles = typeof limit === "number" ? copy.profiles.slice(0, limit) : copy.profiles

  return (
    <section className={className}>
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {profiles.map((profile) => (
          <MotionCard key={profile.name} className="rounded-[30px] border-white/10 bg-[#091a3a]/85 p-7 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-display text-2xl font-semibold">{profile.name}</div>
                <div className="mt-2 text-sm text-[#f5c977]">{profile.role}</div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-[18px] border border-white/10 bg-white/10 font-display text-lg font-semibold">
                {profile.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-white/78">
              <InfoRow label={locale === "en" ? "Format" : "Format"} value={profile.format} />
              <InfoRow label={locale === "en" ? "Focus" : "Focus"} value={profile.focus} />
              <InfoRow label={locale === "en" ? "Teaching style" : "Style"} value={profile.style} />
            </div>

            <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/72">
              <div className="font-semibold text-white">{locale === "en" ? "Ideal for" : "Idéal pour"}</div>
              <p className="mt-2 leading-7">{profile.ideal}</p>
            </div>
          </MotionCard>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          asChild
          variant="outline"
          className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        >
          <Link to={getLocalizedPath("temoignages", locale)}>{copy.cta}</Link>
        </Button>
      </div>
    </section>
  )
}

export function LocalSeoSection({ locale = "fr", className = "pt-20" }) {
  const copy = localLinkContentByLocale[locale]

  return (
    <section className={className}>
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {localRouteKeys.map((routeKey) => {
          const page = localPageConfigs[routeKey][locale]

          return (
            <MotionCard key={routeKey} className="glass-panel rounded-[30px] border-white/10 bg-white/[0.04] p-7 text-white">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {page.city}
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold">{page.heroTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{page.heroText}</p>

              <ul className="mt-6 space-y-3 text-sm text-white/78">
                {page.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant="outline"
                className="mt-8 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath(routeKey, locale)}>
                  {locale === "en" ? "Discover" : "Découvrir"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </MotionCard>
          )
        })}
      </div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{eyebrow}</div>
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description}</p>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
      <div className="text-xs uppercase tracking-[0.22em] text-white/45">{label}</div>
      <div className="mt-2 leading-7">{value}</div>
    </div>
  )
}
