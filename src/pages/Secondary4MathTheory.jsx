import { Link, useLocation } from "react-router-dom"
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Calculator,
  PhoneCall,
  Target,
  TrendingUp,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/config/booking"
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

export default function Secondary4MathTheory() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = getSecondary4MathTheoryContent(locale)
  const path = getLocalizedPath(secondary4MathTheoryRouteKey, locale)

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

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-white hover:bg-white/10">
              {copy.badge}
            </Badge>

            <h1 className="balanced-copy mt-7 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
              {copy.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{copy.heroText}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
              >
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  {copy.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("ministerialExamSec4", locale)}>{copy.secondaryCta}</Link>
              </Button>
            </div>
          </div>

          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
            <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">{copy.tocEyebrow}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold">{copy.tocTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-white/72">{copy.tocDescription}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {copy.sequenceCards.map((card) => (
                <a
                  key={card.key}
                  href={`#${card.key}`}
                  className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/86 transition hover:bg-white/12"
                >
                  {card.label} • {card.title}
                </a>
              ))}
            </div>
          </MotionCard>
        </section>

        <section className="pt-20">
          <SectionHeader
            eyebrow={locale === "en" ? "Sequence overview" : "Vue d'ensemble des séquences"}
            title={locale === "en" ? "Secondary 4 math becomes much easier to revise when the whole sequence map is visible." : "Les maths de secondaire 4 deviennent beaucoup plus révisables quand toute la carte de la séquence devient visible."}
            description={
              locale === "en"
                ? "This page is closer to a structured revision map than a short overview. The goal is to stop mixing notions that do not belong to the same sequence or the same chapter logic."
                : "Cette page ressemble davantage à une carte de révision structurée qu'à un simple survol. Le but est d'arrêter de mélanger des notions qui ne relèvent ni de la même séquence ni de la même logique de chapitre."
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {copy.sequenceCards.map((card) => {
              const Icon = iconsByKey[card.key] || Calculator

              return (
                <MotionCard key={card.key} className="rounded-[28px] border-white/10 bg-[#091a3a]/85 p-6 text-white">
                  <div className="inline-flex rounded-2xl bg-white/10 p-3 text-[#f5c977]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">{card.label}</div>
                  <h2 className="mt-2 font-display text-2xl font-semibold">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/72">{card.description}</p>
                </MotionCard>
              )
            })}
          </div>
        </section>

        {copy.sequences.map((sequence) => {
          const Icon = iconsByKey[sequence.key] || Calculator

          return (
            <section key={sequence.key} id={sequence.key} className="scroll-mt-28 pt-20">
              <div className="grid gap-8 xl:grid-cols-[0.82fr,1.18fr] xl:items-start">
                <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-7 text-white">
                  <div className="inline-flex rounded-2xl bg-[#f5c977] p-3 text-[#071631]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">{sequence.label}</div>
                  <h2 className="mt-3 font-display text-4xl font-semibold">{sequence.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-white/72">{sequence.intro}</p>

                  <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm uppercase tracking-[0.22em] text-[#f5c977]">
                      {locale === "en" ? "Study reflexes" : "Réflexes d'étude"}
                    </div>
                    <ul className="mt-4 space-y-3">
                      {sequence.studyHabits.map((habit) => (
                        <li key={habit} className="flex items-start gap-3">
                          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                          <span className="text-sm leading-7 text-white/76">{habit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionCard>

                <div className="grid gap-4 md:grid-cols-2">
                  {sequence.modules.map((module, moduleIndex) => {
                    const conceptRouteKey = getSecondary4MathConceptRouteKey(sequence.key, moduleIndex)

                    return (
                    <MotionCard
                      key={module.title}
                      className="rounded-[28px] border-white/10 bg-[#091a3a]/88 p-6 text-white"
                    >
                      <h3 className="font-display text-2xl font-semibold">{module.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/72">{module.lead}</p>

                      <div className="mt-5">
                        <div className="text-sm uppercase tracking-[0.22em] text-[#f5c977]">
                          {locale === "en" ? "What to retain" : "À retenir"}
                        </div>
                        <ul className="mt-3 space-y-3">
                          {module.essentials.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5c977]" />
                              <span className="text-sm leading-7 text-white/78">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <div className="text-sm uppercase tracking-[0.22em] text-white/45">
                          {locale === "en" ? "Frequent traps" : "Pièges fréquents"}
                        </div>
                        <ul className="mt-3 space-y-3">
                          {module.pitfalls.map((item) => (
                            <li key={item} className="text-sm leading-7 text-white/68">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-[#f5c977] px-4 py-2 text-xs font-medium text-[#071631] transition hover:bg-[#f7d38f]"
                        >
                          {copy.moduleReserveCta}
                        </a>
                        <Link
                          to={getLocalizedPath("ministerialExamSec4", locale)}
                          className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium text-white/86 transition hover:bg-white/10"
                        >
                          {copy.moduleExamCta}
                        </Link>
                        {conceptRouteKey && (
                          <Link
                            to={getLocalizedPath(conceptRouteKey, locale)}
                            className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium text-white/86 transition hover:bg-white/10"
                          >
                            {locale === "en" ? "Theory page" : "Page théorie"}
                          </Link>
                        )}
                      </div>
                    </MotionCard>
                    )
                  })}
                </div>
              </div>

              <MotionCard className="mt-6 rounded-[30px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.12),rgba(255,255,255,0.05))] p-6 text-white">
                <div className="text-sm uppercase tracking-[0.22em] text-[#f5c977]">{copy.sequenceReserveEyebrow}</div>
                <h3 className="mt-3 font-display text-3xl font-semibold">{copy.sequenceReserveTitle}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75">{copy.sequenceReserveText}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {copy.sequenceReservePoints.map((point) => (
                    <span
                      key={`${sequence.key}-${point}`}
                      className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs text-white/86"
                    >
                      {point}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                  >
                    <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                      {copy.sequenceReserveButton}
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                  >
                    <a href={`tel:${siteConfig.phone}`}>{copy.sequenceCallButton}</a>
                  </Button>
                </div>
              </MotionCard>
            </section>
          )
        })}

        <section className="pt-20">
          <MotionCard className="glass-panel rounded-[32px] border-white/10 bg-white/[0.05] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="text-sm uppercase tracking-[0.24em] text-[#f5c977]">{copy.sectionLinksTitle}</div>
              <p className="mt-4 text-base leading-8 text-white/72">{copy.sectionLinksText}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("mathExamPrep", locale)}>
                  {locale === "en" ? "Exam prep in math" : "Préparation examen maths"}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("ministerialExamSec4", locale)}>
                  {locale === "en" ? "Ministerial exam page" : "Page examen du ministère"}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to={getLocalizedPath("weeklyFollowUp", locale)}>
                  {locale === "en" ? "Weekly follow-up" : "Suivi hebdomadaire"}
                </Link>
              </Button>
            </div>
          </MotionCard>
        </section>

        <section className="pt-20">
          <MotionCard className="rounded-[34px] border-white/10 bg-[linear-gradient(135deg,rgba(245,201,119,0.14),rgba(255,255,255,0.06))] p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                {locale === "en" ? "Theory + practice + guidance" : "Théorie + pratique + accompagnement"}
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">{copy.finalTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">{copy.finalText}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#f5c977] px-6 py-6 text-base text-[#071631] hover:bg-[#f7d38f]"
                >
                  <a href={`tel:${siteConfig.phone}`}>
                    <PhoneCall className="h-4 w-4" />
                    {locale === "en" ? "Call to discuss" : "Appeler pour en parler"}
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={getLocalizedPath("maths", locale)}>
                    {locale === "en" ? "Back to math page" : "Retour à la page maths"}
                  </Link>
                </Button>
              </div>
            </div>
          </MotionCard>
        </section>
      </main>
    </div>
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
