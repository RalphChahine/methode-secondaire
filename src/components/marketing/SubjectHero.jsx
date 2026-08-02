import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Check, FlaskConical, FunctionSquare } from "lucide-react"

const ease = [0.22, 1, 0.36, 1]

export default function SubjectHero({
  variant,
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  panelEyebrow,
  panelTitle,
  panelItems = [],
  journey,
}) {
  const shouldReduceMotion = useReducedMotion()
  const isMath = variant === "math"
  const MotionPrimaryIcon = primaryAction?.icon
  const MotionSecondaryIcon = secondaryAction?.icon
  const reveal = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease } }

  return (
    <section className="relative isolate overflow-hidden rounded-[var(--radius-panel)] bg-[var(--brand-navy-950)] text-white shadow-[var(--shadow-portal)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_15%,rgba(36,99,232,0.32),transparent_38%),radial-gradient(circle_at_10%_85%,rgba(10,42,85,0.84),transparent_42%)]" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(110deg,black,transparent_86%)]" />

      <div className="grid gap-12 px-6 py-9 sm:px-9 sm:py-12 lg:grid-cols-[0.92fr,1.08fr] lg:items-center lg:gap-10 lg:px-12 lg:py-16">
        <motion.div {...reveal} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">
            {isMath ? <FunctionSquare className="h-3.5 w-3.5 text-[var(--brand-blue-500)]" /> : <FlaskConical className="h-3.5 w-3.5 text-[var(--brand-gold-500)]" />}
            {badge}
          </div>
          <h1 className="brand-display mt-7 max-w-[15ch] text-[clamp(2.6rem,5vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.065em] text-white">{title}</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">{description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {primaryAction ? (
              <a href={primaryAction.href} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-blue-600)] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--brand-blue-500)]">
                {MotionPrimaryIcon ? <MotionPrimaryIcon className="h-4 w-4" /> : null}
                {primaryAction.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ) : null}
            {secondaryAction ? (
              <a href={secondaryAction.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[0.04] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                {MotionSecondaryIcon ? <MotionSecondaryIcon className="h-4 w-4" /> : null}
                {secondaryAction.label}
              </a>
            ) : null}
          </div>

          {journey ? (
            <div className="mt-7 flex items-start gap-3 border-t border-white/12 pt-4 text-sm leading-6 text-white/68">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-green-500)]" />
              <div>
                <div className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white/48">{journey.eyebrow}</div>
                <p className="mt-1">{journey.text}</p>
              </div>
            </div>
          ) : null}
        </motion.div>

        <motion.div {...(shouldReduceMotion ? {} : { initial: { opacity: 0, scale: 0.98, y: 18 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { duration: 0.7, ease } })}>
          <div className="relative rounded-[var(--radius-large)] border border-white/12 bg-white/[0.06] p-4 shadow-[var(--shadow-floating)] backdrop-blur-sm sm:p-6">
            <div className="flex items-center justify-between text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white/50">
              <span>{panelEyebrow}</span>
              <span className="rounded-full bg-white/[0.08] px-2 py-1 text-white/70">{isMath ? "Graphique" : "Schéma"}</span>
            </div>
            <div className="mt-5 overflow-hidden rounded-[20px] border border-white/10 bg-[var(--brand-navy-900)]/80 p-3 sm:p-5">
              {isMath ? <AnimatedMathGraph shouldReduceMotion={shouldReduceMotion} /> : <ScientificDiagram shouldReduceMotion={shouldReduceMotion} />}
            </div>
            <h2 className="brand-display mt-5 max-w-lg text-2xl font-extrabold leading-tight tracking-[-0.045em] sm:text-3xl">{panelTitle}</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {panelItems.slice(0, 3).map((item, index) => (
                <div key={item} className="border-t border-white/12 pt-3 text-xs leading-5 text-white/68">
                  <span className="font-bold text-[var(--brand-blue-500)]">0{index + 1}</span>
                  <span className="ml-2">{item}</span>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -bottom-3 right-6 hidden rounded-full border border-white/15 bg-[var(--brand-navy-800)] px-3 py-1.5 text-[0.62rem] font-bold text-white/70 shadow-[var(--shadow-floating)] sm:block">
              {isMath ? "Trace en cours" : "Relations visibles"}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function AnimatedMathGraph({ shouldReduceMotion = false }) {
  return (
    <svg className="h-auto w-full" viewBox="0 0 560 360" role="img" aria-label="Graphique mathématique avec axes et courbe">
      <defs>
        <linearGradient id="math-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3d78f2" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3d78f2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g opacity="0.18" stroke="#ffffff" strokeWidth="1">
        {Array.from({ length: 9 }, (_, index) => <line key={`h-${index}`} x1="38" x2="530" y1={34 + index * 36} y2={34 + index * 36} />)}
        {Array.from({ length: 13 }, (_, index) => <line key={`v-${index}`} x1={38 + index * 41} x2={38 + index * 41} y1="34" y2="322" />)}
      </g>
      <path d="M38 322H530M86 34V322" stroke="#ffffff" strokeOpacity="0.68" strokeWidth="2" />
      <path d="M86 284 C140 260 151 228 188 236 S241 193 276 207 S336 130 374 156 S431 79 475 108 S510 60 530 52 L530 322 L86 322 Z" fill="url(#math-area)" />
      <motion.path d="M86 284 C140 260 151 228 188 236 S241 193 276 207 S336 130 374 156 S431 79 475 108 S510 60 530 52" fill="none" stroke="#3d78f2" strokeLinecap="round" strokeWidth="6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.95, ease }} />
      <circle cx="530" cy="52" r="8" fill="#f3a712" />
      <text x="92" y="52" fill="#ffffff" fillOpacity="0.55" fontSize="13">y</text>
      <text x="512" y="342" fill="#ffffff" fillOpacity="0.55" fontSize="13">x</text>
    </svg>
  )
}

export function ScientificDiagram({ shouldReduceMotion = false }) {
  const lineProps = shouldReduceMotion ? {} : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.9, ease } }
  return (
    <svg className="h-auto w-full" viewBox="0 0 560 360" role="img" aria-label="Schéma scientifique avec circuit et vecteurs">
      <g opacity="0.18" stroke="#ffffff" strokeWidth="1">
        <path d="M0 72H560M0 144H560M0 216H560M0 288H560" />
        <path d="M70 0V360M140 0V360M210 0V360M280 0V360M350 0V360M420 0V360M490 0V360" />
      </g>
      <motion.path {...lineProps} d="M70 238V112H210V238H70ZM210 238H430V112H350" fill="none" stroke="#3d78f2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
      <motion.path {...lineProps} d="M70 112H42M70 238H42M430 112H462" fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="3" />
      <motion.path {...lineProps} d="M292 238V120M292 120L274 142M292 120L310 142" fill="none" stroke="#f3a712" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
      <rect x="204" y="93" width="14" height="38" rx="4" fill="#ffffff" fillOpacity="0.82" />
      <rect x="226" y="87" width="6" height="50" rx="3" fill="#f3a712" />
      <circle cx="430" cy="112" r="13" fill="#22a06b" fillOpacity="0.85" />
      <text x="52" y="92" fill="#ffffff" fillOpacity="0.62" fontSize="13">A</text>
      <text x="298" y="108" fill="#ffffff" fillOpacity="0.62" fontSize="13">v</text>
      <text x="445" y="99" fill="#ffffff" fillOpacity="0.62" fontSize="13">R</text>
    </svg>
  )
}
