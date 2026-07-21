const publicOffers = Object.freeze({
  targeted_session: Object.freeze({
    planId: "PLAN-FIRST-60",
    sessionCount: 1,
    totalPriceCad: 65,
    perSessionPriceCad: 65,
    durationMinutes: 60,
    installmentCount: 1,
    installmentPriceCad: 65,
    autoRenewal: false,
  }),
  momentum_block: Object.freeze({
    planId: "PLAN-PACK4-250",
    sessionCount: 4,
    totalPriceCad: 250,
    perSessionPriceCad: 62.5,
    durationMinutes: 60,
    installmentCount: 1,
    installmentPriceCad: 250,
    autoRenewal: false,
  }),
  progression_block: Object.freeze({
    planId: "PLAN-PACK10-600",
    sessionCount: 10,
    totalPriceCad: 600,
    perSessionPriceCad: 60,
    durationMinutes: 60,
    installmentCount: 2,
    installmentPriceCad: 300,
    autoRenewal: false,
  }),
})

export const pricing = Object.freeze({
  currency: "CAD",
  offers: publicOffers,
  cancellation: Object.freeze({ noticeHours: 72 }),
  firstSession: publicOffers.targeted_session,
  targetedSession: publicOffers.targeted_session,
  aLaCarteSession: publicOffers.targeted_session,
  momentumBlock: publicOffers.momentum_block,
  weeklyFollowUp: publicOffers.progression_block,
  progressionProgram: publicOffers.progression_block,
})

export function getOffer(code) {
  const offer = publicOffers[resolveRequestedOffer(code)]
  return { ...offer, code: resolveRequestedOffer(code) }
}

export function getOfferByPlanId(planId) {
  const matchedCode = Object.entries(publicOffers)
    .find(([, offer]) => offer.planId === planId)?.[0]
  return matchedCode ? getOffer(matchedCode) : null
}

export const paymentLinkOfferCodes = Object.freeze([
  "first_session",
  "weekly_follow_up",
  "exam_sprint",
  "catch_up",
  "one_time",
  "momentum_block_payment_1",
  "progression_block_payment_1",
  "progression_block_payment_2",
])

const legacyPaymentLinkOfferCodes = Object.freeze({
  progression_block_10_installment_1: "progression_block_payment_1",
  weekly_follow_up_installment_1: "progression_block_payment_1",
  progression_block_10_installment_2: "progression_block_payment_2",
  weekly_follow_up_installment_2: "progression_block_payment_2",
})

export function normalizePaymentLinkOfferCode(value) {
  const normalized = typeof value === "string" ? value.trim() : ""
  return legacyPaymentLinkOfferCodes[normalized] || normalized
}

export function getPaymentLinkDefaultAmountCad(offerCode) {
  const normalizedOfferCode = normalizePaymentLinkOfferCode(offerCode)
  const packagePlanId = {
    momentum_block_payment_1: "PLAN-PACK4-250",
    progression_block_payment_1: "PLAN-PACK10-600",
    progression_block_payment_2: "PLAN-PACK10-600",
  }[normalizedOfferCode]
  const offer = packagePlanId
    ? getOfferByPlanId(packagePlanId)
    : getOfferByPlanId("PLAN-FIRST-60")
  return offer?.installmentPriceCad || 65
}

export function formatCadAmount(value, locale = "fr") {
  const amount = new Intl.NumberFormat(locale === "en" ? "en-CA" : "fr-CA", {
    maximumFractionDigits: 2,
  }).format(Number(value || 0))
  return locale === "en" ? `$${amount}` : `${amount} $`
}

export function resolveRequestedOffer(value) {
  // Legacy/internal request values are normalized before any public copy is selected.
  const aliases = Object.freeze({
    targeted: "targeted_session",
    first_session_declic: "targeted_session",
    momentum: "momentum_block",
    weekly: "progression_block",
    progression: "progression_block",
    progression_block_10: "progression_block",
    weekly_follow_up_10: "progression_block",
    "PLAN-PACK10-600": "progression_block",
  })
  const normalized = typeof value === "string" ? value.trim() : ""
  return publicOffers[normalized] ? normalized : (aliases[normalized] || "targeted_session")
}

const pricingCopyByLocale = {
  fr: {
    eyebrow: "Prix clairs, décision simple",
    title: "Trois formats simples pour avancer.",
    description: "Plus le bloc est long, moins chaque séance coûte cher.",
    offers: {
      targeted_session: {
        eyebrow: "Un besoin ponctuel",
        title: "Séance ciblée",
        description: "Une séance de 60 minutes pour débloquer une priorité concrète.",
        bullets: [
          "65 $ pour une séance de 60 minutes",
          "Aucun forfait ni renouvellement automatique",
        ],
        situationalLabel: "Une priorité claire",
        action: "Demander ce format",
      },
      momentum_block: {
        eyebrow: "Pour reprendre le fil",
        title: "Bloc d'élan",
        description: "Quatre séances pour reprendre confiance et retrouver un bon rythme.",
        bullets: [
          "4 séances de 60 minutes · 250 $ au total",
          "62,50 $ par séance",
          "Aucun renouvellement automatique",
        ],
        situationalLabel: "Pour reprendre le fil pendant environ un mois",
        action: "Demander ce format",
      },
      progression_block: {
        eyebrow: "Pour consolider une difficulté",
        title: "Bloc de progression",
        description: "Dix séances pour travailler durablement une difficulté qui revient.",
        bullets: [
          "10 séances de 60 minutes · 600 $ au total",
          "60 $ par séance",
          "Deux paiements de 300 $",
          "Aucun renouvellement automatique",
        ],
        situationalLabel: "Pour une difficulté qui revient",
        action: "Demander ce format",
        highlight: "600 $ / 10 séances",
      },
    },
    policyTitle: "Modifier ou reporter une séance",
    policyDescription: "Prévenez-nous au moins 72 h à l'avance : le report de votre séance est garanti.",
    policyNote: "Aucun renouvellement automatique. En cas d'imprévu sous 72 h, écrivez-nous : nous cherchons une solution selon les disponibilités.",
    perSession: "par séance",
    perHour: "60 min",
    total: "au total",
  },
  en: {
    eyebrow: "Clear pricing, simple decision",
    title: "Three simple ways to move forward.",
    description: "The longer the block, the lower the session price.",
    offers: {
      targeted_session: {
        eyebrow: "One specific need",
        title: "Targeted session",
        description: "A 60-minute session to unblock one concrete priority.",
        bullets: [
          "$65 for one 60-minute session",
          "No package and no automatic renewal",
        ],
        situationalLabel: "One clear priority",
        action: "Request this format",
      },
      momentum_block: {
        eyebrow: "To regain momentum",
        title: "Momentum block",
        description: "Four sessions to rebuild confidence and regain momentum.",
        bullets: [
          "4 sessions of 60 minutes · $250 total",
          "$62.50 per session",
          "No automatic renewal",
        ],
        situationalLabel: "To regain momentum over about a month",
        action: "Request this format",
      },
      progression_block: {
        eyebrow: "For lasting progress",
        title: "Progress block",
        description: "Ten sessions to work steadily on a difficulty that keeps returning.",
        bullets: [
          "10 sessions of 60 minutes · $600 total",
          "$60 per session",
          "Two $300 payments",
          "No automatic renewal",
        ],
        situationalLabel: "For a difficulty that keeps returning",
        action: "Request this format",
        highlight: "$600 / 10 sessions",
      },
    },
    policyTitle: "Change or reschedule a session",
    policyDescription: "Let us know at least 72 hours ahead: rescheduling your session is guaranteed.",
    policyNote: "No automatic renewal. If something unexpected comes up within 72 hours, write to us and we will look for a solution based on availability.",
    perSession: "per session",
    perHour: "60 min",
    total: "total",
  },
}

export function getPricingCopy(locale = "fr") {
  const copy = pricingCopyByLocale[locale] || pricingCopyByLocale.fr
  const offers = { ...copy.offers }

  Object.defineProperties(offers, {
    aLaCarte: {
      value: offers.targeted_session,
      enumerable: false,
    },
    weekly: {
      value: offers.progression_block,
      enumerable: false,
    },
  })

  return { ...copy, offers }
}

export function getPaymentLinkOfferLabel(offerCode, locale = "fr") {
  const normalizedOfferCode = normalizePaymentLinkOfferCode(offerCode)
  const targetedTitle = getPricingCopy(locale).offers.targeted_session.title
  const sessionLabels = locale === "en"
    ? {
        first_session: targetedTitle,
        weekly_follow_up: "Follow-up session",
        exam_sprint: `${targetedTitle} — exam preparation`,
        catch_up: `${targetedTitle} — catch-up`,
        one_time: targetedTitle,
      }
    : {
        first_session: targetedTitle,
        weekly_follow_up: "Séance de suivi",
        exam_sprint: `${targetedTitle} — préparation d'examen`,
        catch_up: `${targetedTitle} — rattrapage`,
        one_time: targetedTitle,
      }
  if (sessionLabels[normalizedOfferCode]) {
    return sessionLabels[normalizedOfferCode]
  }

  const isMomentum = normalizedOfferCode === "momentum_block_payment_1"
  const isProgression = ["progression_block_payment_1", "progression_block_payment_2"].includes(normalizedOfferCode)
  if (!isMomentum && !isProgression) {
    return locale === "en" ? "Session payment" : "Paiement de séance"
  }

  const offerCodeForLabel = isMomentum ? "momentum_block" : "progression_block"
  const title = getPricingCopy(locale).offers[offerCodeForLabel].title
  if (isMomentum) {
    return locale === "en" ? `${title} — single payment` : `${title} — paiement unique`
  }
  return normalizedOfferCode === "progression_block_payment_2"
    ? (locale === "en" ? `${title} — second payment` : `${title} — deuxième paiement`)
    : (locale === "en" ? `${title} — first payment` : `${title} — premier paiement`)
}

export function getParentPaymentPresentation(offerCode, locale = "fr") {
  const normalizedOfferCode = normalizePaymentLinkOfferCode(offerCode)
  const label = getPaymentLinkOfferLabel(normalizedOfferCode, locale)
  if (normalizedOfferCode === "momentum_block_payment_1") {
    return { label, creditText: locale === "en" ? "Unlocks all 4 credits" : "Débloque les 4 crédits" }
  }
  if (normalizedOfferCode === "progression_block_payment_1") {
    return { label, creditText: locale === "en" ? "Unlocks the first 5 credits" : "Débloque les 5 premiers crédits" }
  }
  if (normalizedOfferCode === "progression_block_payment_2") {
    return { label, creditText: locale === "en" ? "Unlocks the final 5 credits" : "Débloque les 5 derniers crédits" }
  }
  return { label, creditText: "" }
}
