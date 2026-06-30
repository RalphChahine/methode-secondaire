import { Link } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react"

import LeadForm from "@/components/LeadForm"
import MotionCard from "@/components/MotionCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
import { siteConfig } from "@/lib/seo"

export function HeroShowcase({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  stats = [],
  panelEyebrow,
  panelTitle,
  panelItems = [],
  panelNote,
}) {
  return (
    <section className="relative pt-4 sm:pt-6">
      <div className="section-shell noise-overlay px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="grid-fade absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-[#6d9fff]/18 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#f5c977]/12 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.08fr,0.92fr] lg:items-start">
          <div className="max-w-4xl">
            {badge ? (
              <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
                {badge}
              </Badge>
            ) : null}

            <h1 className="balanced-copy mt-7 max-w-5xl font-display text-5xl font-semibold leading-[0.92] text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="balanced-copy mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {primaryAction ? <ActionButton action={primaryAction} /> : null}
              {secondaryAction ? <ActionButton action={secondaryAction} variant="outline" /> : null}
            </div>

            {stats.length ? (
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`rounded-[24px] px-4 py-4 text-left ${
                      index === 1 ? "panel-gold" : "panel-soft"
                    }`}
                  >
                    <div className="text-[0.68rem] uppercase tracking-[0.24em] text-white/50">
                      {stat.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white sm:text-base">{stat.value}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <MotionCard className="panel-ink rounded-[36px] p-7 text-white sm:p-8">
              {panelEyebrow ? (
                <div className="rule-label text-[0.68rem]">{panelEyebrow}</div>
              ) : null}

              {panelTitle ? (
                <div className="balanced-copy mt-4 font-display text-3xl font-semibold leading-tight sm:text-[2.2rem]">
                  {panelTitle}
                </div>
              ) : null}

              <div className="mt-7 space-y-4">
                {panelItems.map((item, index) => (
                  <div
                    key={item}
                    className="panel-soft rounded-[26px] px-5 py-5 transition duration-200 hover:bg-white/[0.08]"
                  >
                    <div className="grid gap-3 sm:grid-cols-[4.5rem,1fr] sm:items-start">
                      <div className="font-display text-3xl text-[#f5c977] sm:text-4xl">
                        {`0${index + 1}`}
                      </div>
                      <div className="text-sm leading-7 text-white/82 sm:text-[0.97rem]">{item}</div>
                    </div>
                  </div>
                ))}
              </div>

              {panelNote ? (
                <div className="mt-6 rounded-[28px] bg-[#091939] px-5 py-5 text-sm leading-7 text-white/74">
                  {panelNote}
                </div>
              ) : null}
            </MotionCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <div className="rule-label text-[0.68rem]">{eyebrow}</div> : null}
      <h2 className="balanced-copy mt-4 font-display text-4xl font-semibold leading-[0.95] text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}

export function ComparisonSplit({
  eyebrow,
  title,
  description,
  leftTitle,
  leftPoints = [],
  rightTitle,
  rightPoints = [],
}) {
  return (
    <section className="pt-20">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
        <MotionCard className="panel-soft rounded-[32px] p-7 text-white sm:p-8">
          <div className="text-sm uppercase tracking-[0.22em] text-white/45">Option générique</div>
          <h3 className="mt-4 font-display text-3xl font-semibold">{leftTitle}</h3>
          <div className="mt-6 space-y-3">
            {leftPoints.map((point) => (
              <div
                key={point}
                className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/68"
              >
                {point}
              </div>
            ))}
          </div>
        </MotionCard>

        <MotionCard className="panel-gold rounded-[32px] p-7 text-white sm:p-8">
          <div className="rule-label text-[0.68rem]">Méthode Secondaire</div>
          <h3 className="mt-4 font-display text-3xl font-semibold">{rightTitle}</h3>
          <div className="mt-6 space-y-3">
            {rightPoints.map((point) => (
              <div
                key={point}
                className="rounded-[22px] border border-[#f5c977]/16 bg-[#081632]/72 px-4 py-4 text-sm leading-7 text-white/84"
              >
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  <span>{point}</span>
                </div>
              </div>
            ))}
          </div>
        </MotionCard>
      </div>
    </section>
  )
}

export function StepGrid({ id, eyebrow, title, description, steps }) {
  return (
    <section id={id} className="pt-20">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className="mt-8 grid gap-4">
        {steps.map((step, index) => (
          <MotionCard
            key={step.title}
            className={`rounded-[34px] p-0 text-white ${
              index === 1 ? "panel-gold" : "panel-ink"
            }`}
          >
            <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[10rem,1fr] lg:items-start">
              <div>
                <div className="rule-label text-[0.68rem]">{step.step || `0${index + 1}`}</div>
                <div className="mt-3 font-editorial text-5xl italic text-white/88 sm:text-6xl">
                  {step.step || `0${index + 1}`}
                </div>
              </div>

              <div className="max-w-3xl">
                <h3 className="balanced-copy font-display text-2xl font-semibold sm:text-3xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/74 sm:text-base">{step.description}</p>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>
    </section>
  )
}

export function FeatureGrid({ id, eyebrow, title, description, items, columns = "lg:grid-cols-3" }) {
  return (
    <section id={id} className="pt-20">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className={`mt-8 grid gap-4 ${columns}`}>
        {items.map((item, index) => (
          <MotionCard
            key={item.title}
            className={`rounded-[30px] p-6 text-white sm:p-7 ${
              index % 3 === 1 ? "panel-gold" : "panel-soft"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {item.icon ? (
                <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                  <item.icon className="h-5 w-5" />
                </div>
              ) : (
                <div className="rule-label text-[0.68rem]">{`0${index + 1}`}</div>
              )}
              <div className="text-xs uppercase tracking-[0.24em] text-white/42">{`0${index + 1}`}</div>
            </div>

            <h3 className="balanced-copy mt-5 font-display text-2xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/74">{item.description}</p>

            {item.bullets?.length ? (
              <ul className="mt-5 space-y-3 text-sm text-white/82">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}

            {item.action ? (
              <div className="mt-6">
                <ActionButton action={item.action} variant="outline" />
              </div>
            ) : null}
          </MotionCard>
        ))}
      </div>
    </section>
  )
}

export function QuoteGrid({ id, eyebrow, title, description, quotes, columns = "lg:grid-cols-3" }) {
  return (
    <section id={id} className="pt-20">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className={`mt-8 grid gap-4 ${columns}`}>
        {quotes.map((quote, index) => (
          <MotionCard
            key={quote.text}
            className={`rounded-[32px] p-7 text-white sm:p-8 ${
              index === 1 ? "panel-gold" : "panel-ink"
            }`}
          >
            {quote.tag ? (
              <Badge className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-white/85 hover:bg-white/10">
                {quote.tag}
              </Badge>
            ) : null}

            <blockquote className="mt-6 font-editorial text-[2rem] leading-[1.02] text-white/92 sm:text-[2.4rem]">
              &ldquo;{quote.text}&rdquo;
            </blockquote>

            {quote.author ? <div className="mt-6 text-sm text-white/58">{quote.author}</div> : null}
          </MotionCard>
        ))}
      </div>
    </section>
  )
}

export function PricingGrid({ id, eyebrow, title, description, plans }) {
  return (
    <section id={id} className="pt-20">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {plans.map((plan) => (
          <MotionCard
            key={plan.title}
            className={`rounded-[34px] p-7 text-white sm:p-8 ${
              plan.highlight ? "panel-gold" : "panel-soft"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="rule-label text-[0.68rem]">{plan.highlight ? "Plan clé" : "Offre"}</div>
                <div className="mt-3 font-display text-2xl font-semibold">{plan.title}</div>
              </div>

              {plan.highlight ? (
                <Badge className="rounded-full border-0 bg-[#f5c977] px-3 py-1 text-[#071631] hover:bg-[#f5c977]">
                  {plan.highlightLabel}
                </Badge>
              ) : null}
            </div>

            <div className="mt-6 flex items-end gap-3">
              <div className="font-display text-5xl font-semibold">{plan.price}</div>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/74">{plan.description}</p>

            <ul className="mt-6 space-y-3 text-sm text-white/82">
              {plan.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ActionButton action={plan.action} fullWidth variant={plan.highlight ? "default" : "outline"} />
            </div>
          </MotionCard>
        ))}
      </div>
    </section>
  )
}

export function FaqGrid({ id, eyebrow, title, description, items, columns = "lg:grid-cols-2" }) {
  return (
    <section id={id} className="pt-20">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className={`mt-8 grid gap-4 ${columns}`}>
        {items.map((item) => (
          <details key={item.question} className="panel-soft rounded-[28px] px-6 py-5 text-white sm:px-7 sm:py-6">
            <summary className="cursor-pointer list-none font-display text-xl font-semibold leading-tight">
              {item.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-white/72">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function ContactSection({
  locale = "fr",
  eyebrow,
  title,
  description,
  bullets = [],
  pageName = "website",
}) {
  const copy =
    locale === "en"
      ? {
          cardEyebrow: "Direct contact",
          bookLabel: "Book a session",
          locationLabel: "Online across Quebec, in person depending on area",
          callNote: "Weekly follow-up is usually easier to frame by phone first.",
        }
      : {
          cardEyebrow: "Contact direct",
          bookLabel: "Réserver une séance",
          locationLabel: "En ligne partout au Québec, présentiel selon le secteur",
          callNote: "Le suivi hebdomadaire se cadre souvent mieux par téléphone d'abord.",
        }

  return (
    <section id="contact" className="pt-20">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="section-shell noise-overlay px-6 py-7 text-white sm:px-7 sm:py-8">
          <div className="rule-label relative z-10 text-[0.68rem]">{copy.cardEyebrow}</div>

          <div className="relative z-10 mt-6 space-y-3">
            <ContactLine icon={Phone} href={`tel:${siteConfig.phone}`} label={siteConfig.phoneDisplay} />
            <ContactLine icon={Mail} href={`mailto:${siteConfig.email}`} label={siteConfig.email} />
            <ContactLine icon={CalendarDays} href={BOOKING_URL} label={copy.bookLabel} external />
          </div>

          <div className="panel-ink relative z-10 mt-6 rounded-[28px] px-5 py-5 text-sm leading-7 text-white/74">
            <div>{copy.locationLabel}</div>
            <div className="mt-3 text-white/62">{copy.callNote}</div>
          </div>

          {bullets.length ? (
            <div className="relative z-10 mt-6 space-y-3">
              {bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="panel-soft rounded-[22px] px-4 py-4 text-sm leading-7 text-white/82"
                >
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                    <span>{bullet}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <MotionCard className="section-shell noise-overlay rounded-[34px] p-7 text-white sm:p-8">
          <div className="relative z-10">
            <LeadForm locale={locale} pageName={pageName} />
          </div>
        </MotionCard>
      </div>
    </section>
  )
}

export function FinalCtaSection({ badge, title, description, primaryAction, secondaryAction }) {
  return (
    <section className="pt-20">
      <div className="section-shell noise-overlay px-6 py-8 sm:px-8 sm:py-10">
        <div className="grid-fade absolute inset-0 opacity-60" />
        <div className="relative grid gap-8 lg:grid-cols-[1.08fr,0.92fr] lg:items-end">
          <div className="max-w-3xl text-white">
            {badge ? (
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {badge}
              </div>
            ) : null}

            <h2 className="balanced-copy mt-5 font-display text-4xl font-semibold leading-[0.95] sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {primaryAction ? <ActionButton action={primaryAction} /> : null}
              {secondaryAction ? <ActionButton action={secondaryAction} variant="outline" /> : null}
            </div>
          </div>

          <div className="panel-gold rounded-[30px] px-5 py-5 text-sm leading-7 text-white/86">
            <div className="font-display text-2xl font-semibold text-white">Clarté d'abord.</div>
            <p className="mt-3">
              Le bon site ne raconte pas tout. Il aide surtout un parent à comprendre vite pourquoi vous
              êtes crédible, ce qu'il doit faire maintenant, et pourquoi le prochain pas paraît simple.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ActionButton({ action, variant = "default", fullWidth = false }) {
  const baseClass =
    variant === "outline"
      ? "rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
      : "rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f] shadow-[0_18px_45px_rgba(245,201,119,0.22)]"

  const className = `${baseClass} ${fullWidth ? "w-full py-6" : "px-6 py-6 text-base"}`
  const content = (
    <>
      {action.icon ? <action.icon className="h-4 w-4" /> : null}
      {action.label}
      {action.trailing ? <ChevronRight className="h-4 w-4" /> : null}
    </>
  )

  if (action.onClick) {
    return (
      <Button
        type="button"
        className={className}
        variant={variant === "outline" ? "outline" : "default"}
        onClick={action.onClick}
      >
        {content}
      </Button>
    )
  }

  if (action.to) {
    return (
      <Button asChild className={className} variant={variant === "outline" ? "outline" : "default"}>
        <Link to={action.to}>{content}</Link>
      </Button>
    )
  }

  return (
    <Button asChild className={className} variant={variant === "outline" ? "outline" : "default"}>
      <a
        href={action.href}
        target={action.external ? "_blank" : undefined}
        rel={action.external ? "noreferrer" : undefined}
      >
        {content}
      </a>
    </Button>
  )
}

function ContactLine({ icon: Icon, href, label, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="panel-soft flex items-center gap-4 rounded-[24px] px-4 py-4 transition hover:bg-white/[0.08]"
    >
      <div className="rounded-2xl bg-white/10 p-3 text-[#f5c977]">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm text-white/82">{label}</span>
      <ArrowRight className="ml-auto h-4 w-4 text-white/35" />
    </a>
  )
}
