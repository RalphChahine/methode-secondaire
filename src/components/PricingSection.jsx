import { useEffect } from "react"
import { ArrowRight, BadgeCheck, CalendarCheck, LineChart, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DECLIC_REQUEST_URL, DECLIC_REQUEST_URL_EN } from "@/config/booking"
import { getOffer, getPricingCopy } from "@/lib/pricing"

function formatCad(amount, locale) {
  return locale === "en" ? "$" + amount : amount + " $"
}

export default function PricingSection({ locale = "fr", id }) {
  const copy = getPricingCopy(locale)
  const requestUrl = locale === "en" ? DECLIC_REQUEST_URL_EN : DECLIC_REQUEST_URL
  const offers = [
    { code: "targeted_session", icon: CalendarCheck },
    { code: "momentum_block", icon: LineChart },
    { code: "progression_block", icon: ShieldCheck },
  ].map(({ code, icon }) => ({
    ...getOffer(code),
    copy: copy.offers[code],
    href: `${requestUrl}?offer=${code}`,
    icon,
  }))

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("methode:pricing-offers-view", {
      detail: { locale, offers: ["targeted_session", "momentum_block", "progression_block"] },
    }))
  }, [locale])

  return (
    <section id={id} className="pt-16 sm:pt-20">
      <div className="max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f5c977]">{copy.eyebrow}</div>
        <h2 className="balanced-copy mt-3 font-display text-4xl font-semibold leading-[0.96] text-white sm:text-5xl">{copy.title}</h2>
        <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{copy.description}</p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3 sm:mt-8">
        {offers.map((offer) => {
          const Icon = offer.icon
          const isHighlighted = Boolean(offer.copy.highlight)
          const cardClass = isHighlighted
            ? "border-[#f5c977]/38 bg-[linear-gradient(145deg,rgba(245,201,119,0.16),rgba(9,26,58,0.92))]"
            : "border-white/10 bg-[#091a3a]/78"

          return (
            <article key={offer.code} className={"rounded-[28px] border p-5 text-white sm:p-6 " + cardClass}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f5c977]">
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {offer.copy.eyebrow}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">{offer.copy.title}</h3>
                </div>
                {isHighlighted ? <span className="shrink-0 rounded-full border border-[#f5c977]/30 bg-[#f5c977]/12 px-3 py-1 text-xs font-semibold text-[#f8deb0]">{offer.copy.highlight}</span> : null}
              </div>

              <div className="mt-5">
                <div className="font-display text-4xl font-semibold">
                  {formatCad(offer.perSessionPriceCad, locale)}{offer.code === "targeted_session" ? ` · ${copy.perHour}` : ""}
                </div>
                <div className="mb-1 text-sm text-white/58">{copy.perSession}</div>
                <p className="mt-1 text-sm text-white/68">
                  {offer.sessionCount} × {copy.perHour} · {formatCad(offer.totalPriceCad, locale)} {copy.total}
                </p>
                {offer.sessionCount > 1 ? (
                  <p className="mt-1 text-sm text-white/68">
                    {locale === "en"
                      ? `${offer.installmentCount === 1 ? "One" : offer.installmentCount} ${formatCad(offer.installmentPriceCad, locale)} payment${offer.installmentCount === 1 ? "" : "s"}`
                      : `${offer.installmentCount === 1 ? "Un" : offer.installmentCount} paiement${offer.installmentCount === 1 ? "" : "s"} de ${formatCad(offer.installmentPriceCad, locale)}`}
                  </p>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-7 text-white/72">{offer.copy.description}</p>
              <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                {offer.copy.bullets.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/78"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" aria-hidden="true" />{item}</li>)}
              </ul>

              <Button asChild variant={isHighlighted ? "default" : "outline"} className={isHighlighted ? "mt-6 min-h-12 w-full rounded-full bg-[#f5c977] px-5 py-3 text-sm text-[#071631] hover:bg-[#f7d38f]" : "mt-6 min-h-12 w-full rounded-full border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10 hover:text-white"}>
                <a href={offer.href} onClick={() => window.dispatchEvent(new CustomEvent("methode:pricing-offer-selected", { detail: { locale, offer: offer.code } }))}>
                  {offer.copy.action}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </article>
          )
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" aria-hidden="true" /><div><div className="text-sm font-semibold">{copy.policyTitle}</div><p className="mt-1 text-sm leading-6 text-white/64">{copy.policyDescription}</p></div></div>
        <p className="max-w-md text-sm leading-6 text-white/58 sm:text-right">{copy.policyNote}</p>
      </div>
    </section>
  )
}
