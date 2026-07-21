import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Calculator,
  ChevronDown,
  CircleCheck,
  PhoneCall,
  Target,
  TrendingUp,
} from "lucide-react"

import ParentJourneyNote from "@/components/ParentJourneyNote"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL, BOOKING_URL_EN } from "@/config/booking"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import {
  getSecondary4MathTheoryContent,
  getSecondary4MathConceptRouteKey,
  secondary4MathTheoryRouteKey,
} from "@/lib/secondary4MathTheoryContent"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const iconsByKey = {
  cst: Calculator,
  ts: TrendingUp,
  sn: Target,
}

function getReadingGuide(locale) {
  const english = locale === "en"

  return {
    nextEyebrow: english ? "Your next marker" : "Votre prochain rep\u00e8re",
    nextTitle: english
      ? "Choose your sequence, then one notion."
      : "Choisis ta s\u00e9quence, puis une notion.",
    nextText: english
      ? "You do not need to revise everything at once. Start with the course you are taking, open one chapter and use its key ideas before moving on."
      : "Tu n'as pas \u00e0 tout r\u00e9viser d'un coup. Commence par ton parcours, ouvre un chapitre et utilise ses rep\u00e8res avant de passer au suivant.",
    nextNote: english
      ? "A clear next step is more useful than a long revision list."
      : "Un prochain pas clair aide plus qu'une longue liste de r\u00e9vision.",
    sequenceLabel: english ? "Sequence" : "S\u00e9quence",
    moduleCount: (count) =>
      english ? `${count} study markers` : `${count} rep\u00e8res d'\u00e9tude`,
    studyToday: english ? "A good reflex for today" : "Un bon r\u00e9flexe aujourd'hui",
    startHere: english ? "Start here" : "Commencer ici",
    moduleEyebrow: english ? "Study marker" : "Rep\u00e8re d'\u00e9tude",
    retain: english ? "What to retain" : "\u00c0 retenir",
    check: english ? "Before moving on" : "\u00c0 v\u00e9rifier avant de passer \u00e0 la suite",
    linksEyebrow: english ? "Keep the next step simple" : "Garde la suite simple",
    finalBadge: english ? "Theory + practice + guidance" : "Th\u00e9orie + pratique + accompagnement",
  }
}

export default function Secondary4MathTheory() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = getSecondary4MathTheoryContent(locale)
  const guide = getReadingGuide(locale)
  const path = getLocalizedPath(secondary4MathTheoryRouteKey, locale)
  const requestUrl = locale === "en" ? BOOKING_URL_EN : BOOKING_URL

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.schemaName,
    description: copy.seoDescription,
    url: absoluteUrl(path),
    inLanguage: getHtmlLang(locale),
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      telephone: siteConfig.phone,
    },
  }

  return (
    <div className="relative overflow-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        keywords={copy.seoKeywords}
        jsonLd={schema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates(secondary4MathTheoryRouteKey)}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-8 top-12 h-72 w-72 rounded-full bg-[#7ab4ff]/18 blur-3xl" />
        <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[#f5c977]/14 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:gap-10">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.badge}
            </Badge>

            <h1 className="balanced-copy mt-6 font-display text-4xl font-semibold leading-[0.98] text-white sm:mt-7 sm:text-6xl">
              {copy.heroTitle}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:mt-6 sm:text-lg sm:leading-8">
              {copy.heroText}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                className="w-full rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
              >
                <a href={requestUrl}>
                  {copy.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link to={getLocalizedPath("ministerialExamSec4", locale)}>{copy.secondaryCta}</Link>
              </Button>
            </div>

            <ParentJourneyNote locale={locale} className="mt-5 max-w-2xl sm:mt-6" />
          </div>

          <aside className="rounded-[28px] border border-white/12 bg-[#091a3a]/82 p-5 text-white shadow-[0_22px_60px_rgba(0,0,0,0.16)] sm:rounded-[32px] sm:p-7">
            <div className="flex items-start gap-4">
              <div className="inline-flex shrink-0 rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                <BookOpenText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-[0.22em] text-[#f5c977]">{guide.nextEyebrow}</div>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">{guide.nextTitle}</h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/72">{guide.nextText}</p>

            <nav className="mt-6 space-y-2" aria-label={copy.tocTitle}>
              {copy.sequenceCards.map((card, index) => {
                const Icon = iconsByKey[card.key] || Calculator

                return (
                  <a
                    key={card.key}
                    href={`#${card.key}`}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 transition hover:border-[#f5c977]/50 hover:bg-white/[0.09]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f5c977]/35 text-xs font-semibold text-[#f5c977]">
                      0{index + 1}
                    </span>
                    <Icon className="h-4 w-4 shrink-0 text-white/58" />
                    <span className="min-w-0 flex-1 text-sm font-medium text-white">{card.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/42 transition-transform group-hover:translate-x-0.5" />
                  </a>
                )
              })}
            </nav>

            <div className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 text-sm leading-6 text-white/62">
              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
              <p>{guide.nextNote}</p>
            </div>
          </aside>
        </section>

        <section className="pt-16 sm:pt-20" aria-labelledby="sequence-overview-title">
          <SectionHeader
            eyebrow={copy.tocEyebrow}
            title={copy.tocTitle}
            description={copy.tocDescription}
          />

          <nav
            className="mt-7 overflow-hidden rounded-[28px] border border-white/10 bg-[#091a3a]/64 sm:mt-8"
            aria-label={copy.tocTitle}
          >
            {copy.sequenceCards.map((card, index) => {
              const Icon = iconsByKey[card.key] || Calculator

              return (
                <a
                  key={card.key}
                  href={`#${card.key}`}
                  className="group grid gap-3 border-b border-white/10 px-5 py-5 transition last:border-b-0 hover:bg-white/[0.055] sm:grid-cols-[auto,auto,minmax(0,1fr),auto] sm:items-center sm:gap-4 sm:px-6"
                >
                  <span className="text-xs font-semibold tracking-[0.18em] text-[#f5c977]">0{index + 1}</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-[#f5c977]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.2em] text-white/42">{card.label}</span>
                    <span className="mt-1 block font-display text-xl font-semibold text-white sm:text-2xl">{card.title}</span>
                    <span className="mt-2 block max-w-3xl text-sm leading-6 text-white/66">{card.description}</span>
                  </span>
                  <ArrowRight className="hidden h-5 w-5 text-white/42 transition-transform group-hover:translate-x-1 sm:block" />
                </a>
              )
            })}
          </nav>
        </section>

        {copy.sequences.map((sequence) => {
          const Icon = iconsByKey[sequence.key] || Calculator

          return (
            <section key={sequence.key} id={sequence.key} className="scroll-mt-28 pt-16 sm:pt-20">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr),minmax(0,1.28fr)] xl:gap-8">
                <aside className="h-fit rounded-[28px] border border-white/10 bg-white/[0.045] p-5 text-white sm:p-7 xl:sticky xl:top-28">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex shrink-0 rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">{sequence.label}</div>
                      <h2 className="mt-2 font-display text-3xl font-semibold leading-tight">{sequence.title}</h2>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/72">{sequence.intro}</p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-[#f5c977]">{guide.studyToday}</div>
                    <ul className="mt-4 space-y-3">
                      {sequence.studyHabits.map((habit) => (
                        <li key={habit} className="flex items-start gap-3">
                          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                          <span className="text-sm leading-6 text-white/76">{habit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>

                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/46">{guide.sequenceLabel}</div>
                    <div className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-white/62">
                      {guide.moduleCount(sequence.modules.length)}
                    </div>
                  </div>

                  <ol className="overflow-hidden rounded-[28px] border border-white/10 bg-[#091a3a]/64">
                    {sequence.modules.map((module, moduleIndex) => {
                      const conceptRouteKey = getSecondary4MathConceptRouteKey(sequence.key, moduleIndex)
                      const moduleNumber = String(moduleIndex + 1).padStart(2, "0")

                      return (
                        <li key={module.title} className="border-b border-white/10 last:border-b-0">
                          <details className="group" open={moduleIndex === 0}>
                            <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-5 transition hover:bg-white/[0.045] [&::-webkit-details-marker]:hidden sm:gap-4 sm:px-6">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f5c977]/30 text-xs font-semibold text-[#f5c977]">
                                {moduleNumber}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="text-xs uppercase tracking-[0.18em] text-white/42">
                                  {moduleIndex === 0 ? guide.startHere : guide.moduleEyebrow}
                                </span>
                                <span className="mt-1 block font-display text-xl font-semibold leading-tight text-white sm:text-2xl">
                                  {module.title}
                                </span>
                                <span className="mt-2 block text-sm leading-6 text-white/66">{module.lead}</span>
                              </span>
                              <ChevronDown className="mt-2 h-5 w-5 shrink-0 text-white/48 transition-transform group-open:rotate-180" />
                            </summary>

                            <div className="border-t border-white/10 bg-black/[0.08] px-4 py-5 sm:px-6 sm:py-6">
                              <div className="grid gap-6 lg:grid-cols-2">
                                <div>
                                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5c977]">
                                    <CircleCheck className="h-4 w-4" />
                                    {guide.retain}
                                  </div>
                                  <ul className="mt-4 space-y-3">
                                    {module.essentials.map((item) => (
                                      <li key={item} className="flex items-start gap-3">
                                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                                        <span className="text-sm leading-7 text-white/78">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/48">{guide.check}</div>
                                  <ul className="mt-4 space-y-3">
                                    {module.pitfalls.map((item) => (
                                      <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/68">
                                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c977]/75" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap sm:gap-3">
                                <a
                                  href={requestUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#f5c977] px-4 py-2 text-center text-xs font-medium leading-tight text-[#071631] transition hover:bg-[#f7d38f]"
                                >
                                  {copy.moduleReserveCta}
                                </a>
                                <Link
                                  to={getLocalizedPath("ministerialExamSec4", locale)}
                                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-center text-xs font-medium leading-tight text-white/86 transition hover:bg-white/10"
                                >
                                  {copy.moduleExamCta}
                                </Link>
                                {conceptRouteKey && (
                                  <Link
                                    to={getLocalizedPath(conceptRouteKey, locale)}
                                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-center text-xs font-medium leading-tight text-white/86 transition hover:bg-white/10"
                                  >
                                    {locale === "en" ? "Theory page" : "Page th\u00e9orie"}
                                  </Link>
                                )}
                              </div>
                            </div>
                          </details>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </div>

              <section className="mt-5 border-l-2 border-[#f5c977]/70 bg-white/[0.045] px-5 py-5 text-white sm:mt-6 sm:px-7 sm:py-6">
                <div className="text-xs uppercase tracking-[0.2em] text-[#f5c977]">{copy.sequenceReserveEyebrow}</div>
                <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,1fr),auto] lg:items-end lg:gap-8">
                  <div>
                    <h3 className="font-display text-2xl font-semibold sm:text-3xl">{copy.sequenceReserveTitle}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-white/72">{copy.sequenceReserveText}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {copy.sequenceReservePoints.map((point) => (
                        <span
                          key={`${sequence.key}-${point}`}
                          className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs text-white/82"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    <Button
                      asChild
                      className="rounded-full bg-[#f5c977] px-5 py-5 text-sm text-[#071631] hover:bg-[#f7d38f]"
                    >
                      <a href={requestUrl}>{copy.sequenceReserveButton}</a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-white/15 bg-white/5 px-5 py-5 text-sm text-white hover:bg-white/10 hover:text-white"
                    >
                      <a href={`tel:${siteConfig.phone}`}>{copy.sequenceCallButton}</a>
                    </Button>
                  </div>
                </div>
              </section>
            </section>
          )
        })}

        <section className="pt-16 sm:pt-20">
          <div className="border-y border-white/10 py-8 text-white sm:py-10">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f5c977]">{guide.linksEyebrow}</div>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{copy.sectionLinksTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/72">{copy.sectionLinksText}</p>
            </div>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-white/15 bg-white/5 px-5 py-5 text-sm text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link to={getLocalizedPath("mathExamPrep", locale)}>
                  {locale === "en" ? "Exam prep in math" : "Pr\u00e9paration examen maths"}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-white/15 bg-white/5 px-5 py-5 text-sm text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link to={getLocalizedPath("ministerialExamSec4", locale)}>
                  {locale === "en" ? "Ministerial exam page" : "Page examen du minist\u00e8re"}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-white/15 bg-white/5 px-5 py-5 text-sm text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link to={getLocalizedPath("weeklyFollowUp", locale)}>
                  {locale === "en" ? "10-session progress block" : "Bloc de progression — 10 séances"}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="pt-16 sm:pt-20">
          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-6 text-white sm:rounded-[34px] sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {guide.finalBadge}
              </div>
              <h2 className="mt-5 font-display text-3xl font-semibold sm:text-5xl">{copy.finalTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.finalText}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  className="w-full rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    <PhoneCall className="h-4 w-4" />
                    {locale === "en" ? "Call to discuss" : "Appeler pour en parler"}
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to={getLocalizedPath("maths", locale)}>
                    {locale === "en" ? "Back to math page" : "Retour \u00e0 la page maths"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <div className="text-xs uppercase tracking-[0.22em] text-[#f5c977]">{eyebrow}</div>
      <h2 id="sequence-overview-title" className="balanced-copy mt-3 font-display text-3xl font-semibold text-white sm:mt-4 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">{description}</p>
    </div>
  )
}
