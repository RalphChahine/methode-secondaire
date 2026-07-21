import { useLocation, useNavigate } from "react-router-dom"
import { ArrowRight, BadgeCheck, CalendarCheck, Phone, ShieldCheck } from "lucide-react"

import FirstSessionRequestForm from "@/components/FirstSessionRequestForm"
import MotionCard from "@/components/MotionCard"
import Seo from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { buildAlternates, getAlternateOgLocale, getHtmlLang, getLocaleFromPath, getLocalizedPath, getOgLocale } from "@/lib/i18n"
import { formatCadAmount, getOffer, resolveRequestedOffer } from "@/lib/pricing"
import { getRobotsDirective } from "@/lib/searchIndexStrategy"
import { absoluteUrl, siteConfig } from "@/lib/seo"

const copyByLocale = {
  fr: {
    stepsTitle: "Ce qui suit", callPrefix: "Besoin urgent ou plus simple à expliquer ?", call: "Appelez-nous",
    offers: {
      targeted_session: {
        seoTitle: "Demander une séance ciblée | Méthode Secondaire", seoDescription: "Demandez une séance ciblée de tutorat au secondaire.", badge: "Séance ciblée · sans compte", title: "Demandez une séance ciblée, simplement.", description: "Dites-nous le niveau, la matière, le besoin et vos disponibilités. Nous proposons le bon tuteur et un créneau.", formEyebrow: "Votre demande", formTitle: "On commence par le besoin, pas par un compte.", formDescription: "Il faut environ une minute. Vos coordonnées servent uniquement à traiter cette demande.", steps: ["Nous lisons la situation et l'urgence.", "Nous confirmons le bon tuteur et un créneau réaliste.", "Après le jumelage, on vous invite au portail pour confirmer la séance et le paiement."],
      },
      momentum_block: {
        seoTitle: "Demander un bloc d'élan | Méthode Secondaire", seoDescription: "Demandez un bloc d'élan de quatre séances de tutorat au secondaire.", badge: "Bloc d'élan · 4 séances", title: "Demandez un bloc d'élan, sans vous engager à l'aveugle.", description: "Nous confirmons le tuteur et le créneau avant que vous décidiez si ce bloc de quatre séances convient.", formEyebrow: "Votre demande de bloc", formTitle: "On confirme le fit avant le bloc de quatre séances.", formDescription: "Il faut environ une minute. Aucun compte ni paiement avant la confirmation du tuteur et du créneau.", steps: ["Nous lisons la situation et l'urgence.", "Nous confirmons le bon tuteur et un créneau réaliste.", "Après le jumelage, on vous invite au portail pour confirmer le bloc de quatre séances."],
      },
      progression_block: {
        seoTitle: "Demander un bloc de progression | Méthode Secondaire", seoDescription: "Demandez un bloc de progression de 10 séances pour le secondaire. Le tuteur et la cadence sont confirmés avant le paiement.", badge: "Bloc de progression · 10 séances", title: "Demandez un bloc de progression, sans vous engager à l'aveugle.", description: "Dites-nous le niveau, la matière et les disponibilités. Nous confirmons d'abord le tuteur et la cadence qui convient; vous déciderez ensuite si le bloc de 10 séances est le bon fit.", formEyebrow: "Votre demande de bloc", formTitle: "On confirme le fit et la cadence avant le bloc de 10 séances.", formDescription: "Il faut environ une minute. Aucun compte ni paiement avant que le tuteur et le créneau soient confirmés.", steps: ["Nous lisons la situation, le rythme souhaité et l'urgence.", "Nous confirmons le bon tuteur et la cadence utile — hebdo si elle convient vraiment.", "Après le jumelage, on vous invite au portail pour confirmer le bloc de 10 séances et ses deux paiements."],
      },
    },
  },
  en: {
    stepsTitle: "What happens next", callPrefix: "Is it urgent or easier to explain aloud?", call: "Call us",
    offers: {
      targeted_session: {
        seoTitle: "Request a targeted session | Méthode Secondaire", seoDescription: "Request a targeted high-school tutoring session.", badge: "Targeted session · no account", title: "Request a targeted session, simply.", description: "Tell us the grade, subject, need and availability. We suggest the right tutor and a time that works.", formEyebrow: "Your request", formTitle: "We start with the need, not an account.", formDescription: "It takes about a minute. Your details are used only to handle this request.", steps: ["We review the situation and urgency.", "We confirm the right tutor and a realistic time.", "After matching, we invite you to the portal to confirm the session and payment."],
      },
      momentum_block: {
        seoTitle: "Request a momentum block | Méthode Secondaire", seoDescription: "Request a four-session high-school tutoring momentum block.", badge: "Momentum block · 4 sessions", title: "Request a momentum block without committing blindly.", description: "We confirm the tutor and time first, then you decide whether this four-session block is the right fit.", formEyebrow: "Your block request", formTitle: "We confirm the fit before the four-session block.", formDescription: "It takes about a minute. No account or payment until the tutor and time are confirmed.", steps: ["We review the situation and urgency.", "We confirm the right tutor and a realistic time.", "After matching, we invite you to the portal to confirm the four-session block."],
      },
      progression_block: {
        seoTitle: "Request a 10-session progress block | Méthode Secondaire", seoDescription: "Request a 10-session high-school progress block. The tutor and cadence are confirmed before payment.", badge: "10-session progress block", title: "Request a progress block without committing blindly.", description: "Tell us the grade, subject and availability. We first confirm the tutor and the right rhythm, then you decide whether the 10-session block is the right fit.", formEyebrow: "Your block request", formTitle: "We confirm the fit and rhythm before the 10-session block.", formDescription: "It takes about a minute. No account or payment until the tutor and time are confirmed.", steps: ["We review the situation, the desired rhythm and urgency.", "We confirm the right tutor and useful rhythm — weekly if it is the right fit.", "After matching, we invite you to the portal to confirm the 10-session block and its two payments."],
      },
    },
  },
}

export default function FirstSessionRequest() {
  const location = useLocation()
  const navigate = useNavigate()
  const locale = getLocaleFromPath(location.pathname)
  const copy = copyByLocale[locale] || copyByLocale.fr
  const requestedOffer = resolveRequestedOffer(new URLSearchParams(location.search).get("offer"))
  const offer = getOffer(requestedOffer)
  const paymentDescription = offer.installmentCount === 1
    ? (locale === "en" ? `one ${formatCadAmount(offer.installmentPriceCad, locale)} payment` : `un paiement de ${formatCadAmount(offer.installmentPriceCad, locale)}`)
    : (locale === "en" ? `${offer.installmentCount} ${formatCadAmount(offer.installmentPriceCad, locale)} payments` : `${offer.installmentCount} paiements de ${formatCadAmount(offer.installmentPriceCad, locale)}`)
  const price = offer.sessionCount === 1
    ? `${formatCadAmount(offer.totalPriceCad, locale)} · ${offer.durationMinutes} min`
    : `${formatCadAmount(offer.perSessionPriceCad, locale)} ${locale === "en" ? "per session" : "par séance"} · ${formatCadAmount(offer.totalPriceCad, locale)} ${locale === "en" ? "total" : "au total"} · ${paymentDescription}`
  const requestCopy = { ...copy, ...copy.offers[requestedOffer], price }
  const path = getLocalizedPath("request", locale)
  const schema = { "@context": "https://schema.org", "@type": "ContactPage", name: requestCopy.seoTitle, description: requestCopy.seoDescription, url: absoluteUrl(path) }

  return <div className="relative overflow-hidden">
    <Seo title={requestCopy.seoTitle} description={requestCopy.seoDescription} path={path} jsonLd={schema} lang={getHtmlLang(locale)} locale={getOgLocale(locale)} alternateLocale={getAlternateOgLocale(locale)} alternates={buildAlternates("request")} robots={getRobotsDirective("request")} />
    <div className="pointer-events-none absolute inset-0"><div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-[#6d9fff]/18 blur-3xl" /><div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-[#f5c977]/12 blur-3xl" /></div>
    <main className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14"><div className="grid gap-8 lg:grid-cols-[0.78fr,1.1fr] lg:items-start">
      <section className="pt-2 lg:sticky lg:top-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85"><BadgeCheck className="h-4 w-4 text-[#f5c977]" />{requestCopy.badge}</div>
        <h1 className="balanced-copy mt-6 font-display text-4xl font-semibold leading-[0.98] text-white sm:text-5xl">{requestCopy.title}</h1><p className="mt-5 max-w-xl text-base leading-8 text-white/72 sm:text-lg">{requestCopy.description}</p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#f5c977]/25 bg-[#f5c977]/10 px-4 py-2 text-sm font-semibold text-[#f8deb0]"><CalendarCheck className="h-4 w-4" />{requestCopy.price}</div>
        <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.045] p-5"><div className="flex items-center gap-2 text-sm font-semibold text-white"><ShieldCheck className="h-4 w-4 text-[#f5c977]" />{requestCopy.stepsTitle}</div><ol className="mt-4 space-y-3">{requestCopy.steps.map((step, index) => <li key={step} className="flex items-start gap-3 text-sm leading-6 text-white/76"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f5c977] text-xs font-bold text-[#071631]">{index + 1}</span>{step}</li>)}</ol></div>
        <p className="mt-6 text-sm leading-6 text-white/65">{requestCopy.callPrefix}</p><Button asChild variant="outline" className="mt-3 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"><a href={`tel:${siteConfig.phone}`}><Phone className="h-4 w-4" />{requestCopy.call}</a></Button>
      </section>
      <MotionCard className="action-surface rounded-[32px] p-5 text-white sm:p-7"><div className="flex items-center gap-2 text-sm font-semibold text-[#f5c977]"><ArrowRight className="h-4 w-4" />{requestCopy.formEyebrow}</div><h2 className="balanced-copy mt-3 font-display text-3xl font-semibold leading-tight">{requestCopy.formTitle}</h2><p className="mt-3 text-sm leading-7 text-white/72">{requestCopy.formDescription}</p><FirstSessionRequestForm className="mt-6" locale={locale} pageName={locale === "en" ? "first-session-request-en" : "first-session-request"} offer={requestedOffer} onSuccess={() => navigate(getLocalizedPath("thankYou", locale))} /></MotionCard>
    </div></main>
  </div>
}
