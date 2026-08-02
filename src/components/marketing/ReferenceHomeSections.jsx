import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarCheck2,
  Check,
  ChevronDown,
  CircleUserRound,
  Clock3,
  GraduationCap,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react"

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
}

export default function ReferenceHomeSections({
  locale = "fr",
  requestUrl,
  targetedSessionOffer,
  targetedSessionPrice,
  momentumBlockOffer,
  momentumBlockPrice,
  progressionBlockOffer,
  progressionBlockPrice,
  openMiniAssessment,
  phone,
  portalPath,
  faqItems,
}) {
  const isEnglish = locale === "en"
  const shouldReduceMotion = useReducedMotion()
  const copy = isEnglish ? englishCopy : frenchCopy
  const motionProps = shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" }, variants: reveal }

  const offers = [
    {
      name: isEnglish ? "Targeted session" : "Séance ciblée",
      note: isEnglish ? "A focused first step" : "Un premier pas ciblé",
      price: targetedSessionPrice,
      detail: `${targetedSessionOffer.durationMinutes} min · ${isEnglish ? "one session" : "une séance"}`,
      action: isEnglish ? "Request a session" : "Demander une séance",
      offerId: "targeted_session",
    },
    {
      name: isEnglish ? "Momentum block" : "Bloc d’élan",
      note: isEnglish ? "Four sessions, no auto-renewal" : "Quatre séances, sans renouvellement",
      price: momentumBlockPrice,
      detail: `${momentumBlockOffer.sessionCount} × ${momentumBlockOffer.durationMinutes} min`,
      action: isEnglish ? "Ask about this format" : "Parler de ce format",
      offerId: "momentum_block",
    },
    {
      name: isEnglish ? "Progression block" : "Bloc de progression",
      note: isEnglish ? "For a longer continuity" : "Pour une continuité plus longue",
      price: progressionBlockPrice,
      detail: `${progressionBlockOffer.sessionCount} × ${progressionBlockOffer.durationMinutes} min`,
      action: isEnglish ? "Ask about this format" : "Parler de ce format",
      recommended: true,
      offerId: "progression_block",
    },
  ]

  return (
    <div className="brand-body bg-[var(--surface-white)] text-[var(--text-dark)]">
      <section className="relative isolate overflow-hidden bg-[var(--brand-navy-950)] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_16%,rgba(36,99,232,0.36),transparent_36%),radial-gradient(circle_at_8%_80%,rgba(10,42,85,0.8),transparent_40%)]" />
        <div className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(110deg,black,transparent_82%)]" />

        <div className="mx-auto grid min-h-[680px] max-w-[1440px] items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[0.94fr,1.06fr] lg:gap-8 lg:px-12 lg:pb-20 lg:pt-16">
          <motion.div {...motionProps} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/78">
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand-gold-500)]" />
              {copy.heroBadge}
            </div>

            <h1 className="brand-display mt-7 max-w-[12ch] text-[clamp(2.8rem,6vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.065em] text-white">
              {copy.heroTitleBefore} <span className="text-[var(--brand-blue-500)]">{copy.heroTitleAccent}</span> {copy.heroTitleAfter}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">{copy.heroDescription(targetedSessionOffer.durationMinutes, targetedSessionPrice)}</p>

            <div className="mt-7 grid gap-3 text-sm text-white/82 sm:grid-cols-3">
              {copy.heroProofs.map((proof) => (
                <div key={proof} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--brand-green-500)]/15 text-[var(--brand-green-500)]"><Check className="h-3.5 w-3.5" /></span>
                  {proof}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={requestUrl} data-primary-action className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-blue-600)] px-5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(36,99,232,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-blue-500)]">
                {isEnglish ? "Request a first session" : "Demander une première séance"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button type="button" onClick={openMiniAssessment} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[0.04] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                {isEnglish ? "Not sure yet? 2-min mini-assessment" : "Pas certain? Mini-bilan de 2 min"}
              </button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-white/52">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--brand-green-500)]" />{copy.heroFootnote}</span>
              <a className="transition hover:text-white" href={`tel:${phone}`}>{isEnglish ? "Urgent? Call the team." : "Urgent? Appeler l’équipe."}</a>
            </div>
          </motion.div>

          <StudyVisual isEnglish={isEnglish} durationMinutes={targetedSessionOffer.durationMinutes} shouldReduceMotion={shouldReduceMotion} />
        </div>
      </section>

      <section className="border-b border-[var(--border-soft)] bg-[var(--surface-white)]">
        <div className="mx-auto grid max-w-[1440px] gap-px px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          {copy.benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-3 border-[var(--border-soft)] py-6 sm:px-4 lg:border-r lg:px-6 lg:py-8 first:lg:pl-0 last:lg:border-r-0 last:lg:pr-0">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--brand-blue-100)] text-[var(--brand-blue-700)]"><Icon className="h-4.5 w-4.5" /></span>
              <div><div className="text-sm font-bold text-[var(--text-dark)]">{title}</div><p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="approche" className="bg-[var(--surface-soft)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <motion.div {...motionProps} className="mx-auto max-w-2xl text-center">
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue-700)]">{copy.methodEyebrow}</div>
            <h2 className="brand-display mt-4 text-4xl font-extrabold tracking-[-0.055em] text-[var(--text-dark)] sm:text-5xl">{copy.methodTitle}</h2>
            <p className="mt-4 text-base leading-8 text-[var(--text-body)]">{copy.methodDescription}</p>
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {copy.methodSteps.map(({ number, icon: Icon, title, description }) => (
              <motion.article key={title} {...motionProps} className="group rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-white p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-[var(--brand-blue-500)] hover:shadow-[var(--shadow-floating)]">
                <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.16em] text-[var(--brand-blue-700)]">{number}</span><span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--brand-blue-100)] text-[var(--brand-blue-700)]"><Icon className="h-4.5 w-4.5" /></span></div>
                <h3 className="brand-display mt-7 text-2xl font-extrabold tracking-[-0.04em]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-body)]">{description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id={isEnglish ? "offers" : "offres"} className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[var(--radius-panel)] bg-[var(--brand-navy-950)] shadow-[var(--shadow-portal)] lg:grid-cols-[0.82fr,1.18fr]">
          <div className="flex flex-col justify-between p-7 text-white sm:p-10 lg:p-12">
            <div>
              <div className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue-500)]">{copy.pricingEyebrow}</div>
              <h2 className="brand-display mt-4 max-w-sm text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-5xl">{copy.pricingTitle}</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/65">{copy.pricingDescription}</p>
              <ul className="mt-8 space-y-4 text-sm text-white/82">
                {copy.pricingProofs.map((item) => <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-green-500)]" />{item}</li>)}
              </ul>
            </div>
            <a href={requestUrl} className="mt-10 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[var(--brand-blue-600)] px-5 text-sm font-bold text-white transition hover:bg-[var(--brand-blue-500)]">{copy.pricingCta}<ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="bg-[var(--surface-soft)] p-5 sm:p-8 lg:p-10">
            <div className="grid gap-4 md:grid-cols-3">
              {offers.map((offer) => <OfferCard key={offer.name} offer={offer} requestUrl={requestUrl} isEnglish={isEnglish} />)}
            </div>
            <p className="mt-5 text-center text-xs leading-5 text-[var(--text-muted)]">{copy.pricingFootnote}</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-navy-950)] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1220px]">
          <motion.div {...motionProps} className="max-w-xl"><div className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue-500)]">{copy.trustEyebrow}</div><h2 className="brand-display mt-4 text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">{copy.trustTitle}</h2><p className="mt-4 text-base leading-8 text-white/68">{copy.trustDescription}</p></motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.trustCards.map(({ title, description, icon: Icon }) => <motion.article key={title} {...motionProps} className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.06] p-6"><span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--brand-blue-600)]/25 text-[var(--brand-blue-500)]"><Icon className="h-4.5 w-4.5" /></span><h3 className="brand-display mt-5 text-2xl font-extrabold tracking-[-0.04em]">{title}</h3><p className="mt-3 text-sm leading-7 text-white/66">{description}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-blue)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1220px] items-center gap-12 lg:grid-cols-[0.85fr,1.15fr]">
          <motion.div {...motionProps}><div className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue-700)]">{copy.portalEyebrow}</div><h2 className="brand-display mt-4 max-w-lg text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">{copy.portalTitle}</h2><p className="mt-4 max-w-lg text-base leading-8 text-[var(--text-body)]">{copy.portalDescription}</p><ul className="mt-7 space-y-3 text-sm text-[var(--text-body)]">{copy.portalBenefits.map((item) => <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-green-500)]" />{item}</li>)}</ul><a href={portalPath} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-blue-600)] px-5 text-sm font-bold text-white transition hover:bg-[var(--brand-blue-500)]">{copy.portalCta}<ArrowRight className="h-4 w-4" /></a></motion.div>
          <PortalPreview isEnglish={isEnglish} />
        </div>
      </section>

      <section id="faq" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[900px]"><div className="text-center"><div className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-blue-700)]">FAQ</div><h2 className="brand-display mt-4 text-4xl font-extrabold tracking-[-0.055em]">{copy.faqTitle}</h2></div><div className="mt-10 divide-y divide-[var(--border-soft)] rounded-[var(--radius-large)] border border-[var(--border-soft)] bg-white px-5 shadow-[var(--shadow-card)] sm:px-8">{faqItems.map((item) => <details key={item.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left font-semibold text-[var(--text-dark)] [&::-webkit-details-marker]:hidden"><span>{item.question}</span><ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition group-open:rotate-180" /></summary><p className="max-w-3xl pt-3 text-sm leading-7 text-[var(--text-body)]">{item.answer}</p></details>)}</div></div>
      </section>
    </div>
  )
}

function StudyVisual({ isEnglish, durationMinutes, shouldReduceMotion }) {
  const floatProps = shouldReduceMotion ? {} : { animate: { y: [0, -5, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
  return (
    <div className="relative mx-auto w-full max-w-[640px]" aria-label={isEnglish ? "Development visual placeholder" : "Visuel de développement temporaire"}>
      <div className="relative aspect-[0.94] overflow-hidden rounded-[var(--radius-panel)] border border-white/15 bg-[linear-gradient(145deg,#0a2a55,#03152c_64%)] shadow-[var(--shadow-portal)]">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[var(--brand-blue-600)]/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[var(--brand-navy-950)] via-transparent to-transparent" />
        <div className="absolute left-[11%] top-[12%] max-w-[74%] sm:left-[13%] sm:top-[14%]"><div className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/50">{isEnglish ? "A focused next step" : "Un prochain geste clair"}</div><div className="brand-display mt-3 max-w-[12ch] text-3xl font-extrabold leading-[1.02] tracking-[-0.055em] text-white sm:text-4xl">{isEnglish ? "Less noise. More direction." : "Moins de bruit. Plus de direction."}</div></div>
        <div className="absolute bottom-[12%] left-[11%] right-[11%] h-[34%] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-md sm:bottom-[14%] sm:left-[13%] sm:right-[13%] sm:p-5">
          <div className="flex items-center justify-between text-xs text-white/56"><span>{isEnglish ? "Session plan" : "Plan de séance"}</span><span className="rounded-full bg-[var(--brand-blue-600)]/25 px-2 py-1 text-[var(--brand-blue-100)]">{durationMinutes} min</span></div>
          <svg className="mt-3 h-[calc(100%-1.5rem)] w-full" viewBox="0 0 420 130" role="img" aria-label={isEnglish ? "Abstract progress line" : "Ligne de progression abstraite"}>
            <path d="M10 108 C62 102, 72 82, 110 88 S165 72, 196 74 S232 54, 266 63 S316 38, 348 43 S384 22, 410 24" fill="none" stroke="rgba(61,120,242,0.95)" strokeWidth="4" strokeLinecap="round" />
            <path d="M10 110H410" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="4 7" />
            <circle cx="410" cy="24" r="6" fill="#f3a712" />
          </svg>
        </div>
        <motion.div {...floatProps} className="absolute right-[7%] top-[33%] hidden w-44 rounded-[18px] border border-white/15 bg-white/[0.1] p-4 shadow-[var(--shadow-floating)] backdrop-blur-xl sm:block"><div className="flex items-center gap-2 text-xs font-semibold text-white"><span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--brand-blue-600)]"><CalendarCheck2 className="h-3.5 w-3.5" /></span>{isEnglish ? "Next step" : "Prochaine étape"}</div><div className="mt-3 text-sm leading-5 text-white/68">{isEnglish ? "Review the priority concept" : "Revoir la notion prioritaire"}</div></motion.div>
        <motion.div {...floatProps} transition={shouldReduceMotion ? undefined : { duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="absolute bottom-[5%] right-[8%] hidden w-40 rounded-[18px] border border-white/15 bg-[var(--brand-navy-900)]/90 p-4 shadow-[var(--shadow-floating)] sm:block"><div className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[var(--brand-blue-500)]">{isEnglish ? "Private portal" : "Portail privé"}</div><div className="mt-2 text-sm font-bold text-white">{isEnglish ? "Clear follow-up" : "Suivi lisible"}</div><div className="mt-2 text-xs leading-5 text-white/55">{isEnglish ? "Preview without personal data" : "Aperçu sans données personnelles"}</div></motion.div>
        <div className="absolute bottom-5 left-5 text-[0.58rem] uppercase tracking-[0.16em] text-white/34 sm:bottom-7 sm:left-7">{isEnglish ? "Development illustration · approved photo pending" : "Illustration de développement · photo approuvée à venir"}</div>
      </div>
    </div>
  )
}

function OfferCard({ offer, requestUrl, isEnglish }) {
  const offerUrl = `${requestUrl}${requestUrl.includes("?") ? "&" : "?"}offer=${offer.offerId}`
  return <article className={`relative flex h-full flex-col rounded-[var(--radius-card)] border p-5 ${offer.recommended ? "border-[var(--brand-blue-600)] bg-white shadow-[0_12px_35px_rgba(36,99,232,0.15)]" : "border-[var(--border-soft)] bg-white"}`}>
    {offer.recommended ? <span className="absolute -top-3 left-4 rounded-full bg-[var(--brand-blue-600)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white">{isEnglish ? "Recommended" : "Recommandé"}</span> : null}
    <div className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{offer.name}</div>
    <div className="mt-2 text-xs text-[var(--text-body)]">{offer.note}</div>
    <div className="brand-display mt-6 text-3xl font-extrabold tracking-[-0.05em] text-[var(--text-dark)]">{offer.price}</div>
    <div className="mt-1 text-xs text-[var(--text-muted)]">{offer.detail}</div>
    <a href={offerUrl} className="mt-6 inline-flex min-h-10 items-center justify-center rounded-full bg-[var(--brand-blue-600)] px-3 text-xs font-bold text-white transition hover:bg-[var(--brand-blue-500)]">{offer.action}</a>
  </article>
}

function PortalPreview({ isEnglish }) {
  return <div className="relative mx-auto w-full max-w-[650px] -rotate-1 rounded-[var(--radius-panel)] border border-white/70 bg-white p-3 shadow-[var(--shadow-portal)] sm:p-4"><div className="overflow-hidden rounded-[20px] border border-[var(--border-soft)] bg-[var(--surface-soft)]"><div className="flex items-center justify-between border-b border-[var(--border-soft)] bg-white px-4 py-3"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--brand-navy-950)] text-white"><CircleUserRound className="h-4 w-4" /></span><span className="text-xs font-bold text-[var(--text-dark)]">{isEnglish ? "Client portal" : "Portail client"}</span></div><span className="h-2 w-14 rounded-full bg-[var(--border-soft)]" /></div><div className="grid gap-3 p-4 sm:grid-cols-[0.7fr,1.3fr]"><div className="hidden rounded-xl bg-[var(--brand-navy-950)] p-3 sm:block"><div className="h-2 w-16 rounded-full bg-white/20" /><div className="mt-5 space-y-3">{[1, 2, 3, 4].map((item) => <div key={item} className={`h-2 rounded-full ${item === 1 ? "w-20 bg-[var(--brand-blue-500)]" : "w-14 bg-white/15"}`} />)}</div></div><div><div className="grid grid-cols-3 gap-2">{[isEnglish ? "Sessions" : "Séances", isEnglish ? "Messages" : "Messages", isEnglish ? "Resources" : "Ressources"].map((label) => <div key={label} className="rounded-xl border border-[var(--border-soft)] bg-white p-3"><div className="h-2 w-12 rounded-full bg-[var(--border-soft)]" /><div className="mt-3 h-5 w-8 rounded bg-[var(--brand-blue-100)]" /><div className="mt-2 text-[0.54rem] text-[var(--text-muted)]">{label}</div></div>)}</div><div className="mt-3 rounded-xl border border-[var(--border-soft)] bg-white p-4"><div className="flex items-center justify-between"><div><div className="h-2 w-28 rounded-full bg-[var(--border-soft)]" /><div className="mt-2 h-2 w-40 rounded-full bg-[var(--border-soft)]" /></div><div className="h-8 w-8 rounded-full bg-[var(--brand-blue-100)]" /></div><div className="mt-5 h-2 w-full rounded-full bg-[var(--brand-blue-100)]"><div className="h-2 w-2/3 rounded-full bg-[var(--brand-blue-500)]" /></div></div></div></div></div><div className="pointer-events-none absolute -bottom-4 -right-4 rounded-full border border-[var(--brand-blue-100)] bg-white px-3 py-1.5 text-[0.62rem] font-bold text-[var(--brand-blue-700)] shadow-[var(--shadow-card)]">{isEnglish ? "Preview without personal data" : "Aperçu sans données personnelles"}</div></div>
}

const frenchCopy = {
  heroBadge: "Mathématiques et sciences · secondaire 1 à 5",
  heroTitleBefore: "De meilleures bases.",
  heroTitleAccent: "Plus de confiance.",
  heroTitleAfter: "Un prochain pas clair.",
  heroDescription: (duration, price) => `Quand un examen approche ou qu’une notion bloque, demandez une première séance de ${duration} min à ${price}. L’équipe confirme le bon tuteur et le créneau avant le portail.`,
  heroProofs: ["Tuteur choisi selon le besoin", "Méthode structurée", "Suivi lisible"],
  heroFootnote: "Demande courte · aucun compte requis pour commencer",
  benefits: [
    { icon: Target, title: "Séances 1 à 1", description: "Un format centré sur la situation réelle." },
    { icon: GraduationCap, title: "Tuteurs experts", description: "Un jumelage confirmé par l’équipe." },
    { icon: Clock3, title: "Horaire flexible", description: "Un rythme qui respecte la réalité familiale." },
    { icon: BarChart3, title: "Suivi concret", description: "Un prochain geste visible après la séance." },
  ],
  methodEyebrow: "Notre approche",
  methodTitle: "Une méthode qui rend la suite plus simple.",
  methodDescription: "On part du besoin réel, on clarifie la priorité, puis on garde le fil sans surcharger la famille.",
  methodSteps: [
    { number: "01", icon: Target, title: "Comprendre", description: "On écoute le niveau, la matière et ce qui bloque maintenant." },
    { number: "02", icon: BookOpen, title: "Planifier", description: "On choisit un premier objectif concret et un format adapté." },
    { number: "03", icon: BarChart3, title: "Progresser", description: "On suit les notions travaillées et le prochain geste utile." },
  ],
  pricingEyebrow: "Des formats lisibles",
  pricingTitle: "Le bon niveau d’engagement, sans surprise.",
  pricingDescription: "Les tarifs réels du projet sont affichés tels quels. Aucun renouvellement automatique.",
  pricingProofs: ["Paiement et format confirmés avant la séance", "Blocs sans renouvellement automatique", "Annulation ou déplacement avec un préavis de 72 h"],
  pricingCta: "Parler à l’équipe",
  pricingFootnote: "Les prix peuvent être confirmés selon la matière, le niveau et le format choisi.",
  trustEyebrow: "Ce qui est confirmé",
  trustTitle: "Une expérience sérieuse, sans promesse gonflée.",
  trustDescription: "La référence montre des témoignages et des notes. Le projet ne contient pas encore de témoignages publics validés : nous gardons donc la preuve centrée sur le processus réel.",
  trustCards: [
    { icon: MessageCircle, title: "Le besoin", description: "La demande commence par quelques informations utiles, pas par un catalogue de profils à comparer seul." },
    { icon: ShieldCheck, title: "Le jumelage", description: "Le tuteur, la matière et le format sont confirmés avant de passer au portail et au paiement." },
    { icon: CalendarCheck2, title: "La suite", description: "Après la séance, la famille sait quoi revoir et quelle prochaine étape envisager." },
  ],
  portalEyebrow: "Pour les clients actifs",
  portalTitle: "Un portail qui garde le suivi à portée de main.",
  portalDescription: "Séances, messages, résumés et ressources sont regroupés dans un espace privé, sans données personnelles dans les aperçus marketing.",
  portalBenefits: ["Voir les prochaines séances", "Retrouver les messages et résumés libérés", "Partager des ressources dans un espace privé"],
  portalCta: "Découvrir le portail",
  faqTitle: "Les questions qui reviennent le plus",
}

const englishCopy = {
  heroBadge: "Math and science · Secondary 1 to 5",
  heroTitleBefore: "Stronger foundations.",
  heroTitleAccent: "More confidence.",
  heroTitleAfter: "A clear next step.",
  heroDescription: (duration, price) => `When an exam is coming or a concept is getting in the way, request a ${duration}-minute first session for ${price}. The team confirms the right tutor and time before the portal.`,
  heroProofs: ["Tutor matched to the need", "Structured method", "Readable follow-up"],
  heroFootnote: "Short request · no account required to start",
  benefits: [
    { icon: Target, title: "1-to-1 sessions", description: "A format centered on the real situation." },
    { icon: GraduationCap, title: "Qualified tutors", description: "A match confirmed by the team." },
    { icon: Clock3, title: "Flexible schedule", description: "A rhythm that respects family life." },
    { icon: BarChart3, title: "Concrete follow-up", description: "A visible next step after the session." },
  ],
  methodEyebrow: "Our approach",
  methodTitle: "A method that makes the next step simpler.",
  methodDescription: "We start with the real need, clarify the priority, then keep the thread without adding noise for the family.",
  methodSteps: [
    { number: "01", icon: Target, title: "Understand", description: "We listen to the grade, subject, and what is getting stuck now." },
    { number: "02", icon: BookOpen, title: "Plan", description: "We choose one concrete first goal and a format that fits." },
    { number: "03", icon: BarChart3, title: "Progress", description: "We track the concepts worked on and the next useful action." },
  ],
  pricingEyebrow: "Readable formats",
  pricingTitle: "The right level of commitment, without surprises.",
  pricingDescription: "The project’s real prices are shown as they are. Nothing renews automatically.",
  pricingProofs: ["Payment and format confirmed before the session", "Blocks never renew automatically", "72-hour notice for cancellation or rescheduling"],
  pricingCta: "Talk to the team",
  pricingFootnote: "Prices can be confirmed according to subject, level, and chosen format.",
  trustEyebrow: "What is confirmed",
  trustTitle: "A serious experience, without inflated promises.",
  trustDescription: "The reference shows testimonials and ratings. The project does not yet contain approved public testimonials, so proof stays centered on the real process.",
  trustCards: [
    { icon: MessageCircle, title: "The need", description: "The request starts with useful context, not a catalogue of profiles to compare alone." },
    { icon: ShieldCheck, title: "The match", description: "Tutor, subject, and format are confirmed before the portal and payment step." },
    { icon: CalendarCheck2, title: "The follow-through", description: "After the session, the family knows what to revisit and which next step to consider." },
  ],
  portalEyebrow: "For active clients",
  portalTitle: "A portal that keeps follow-up within reach.",
  portalDescription: "Sessions, messages, released summaries, and resources live in one private space, with no personal data in marketing previews.",
  portalBenefits: ["See upcoming sessions", "Find released messages and summaries", "Share resources in a private space"],
  portalCta: "Explore the portal",
  faqTitle: "The questions families ask most",
}
