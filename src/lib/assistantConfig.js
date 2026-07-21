import { BOOKING_URL, BOOKING_URL_EN } from "../config/booking.js"
import { getOffer, pricing } from "./pricing.js"

const targeted = getOffer("targeted_session")
const momentum = getOffer("momentum_block")
const progression = getOffer("progression_block")

export const assistantBusinessInfo = { phone: "+15149520709", bookingUrl: BOOKING_URL }

export const assistantServiceInfo = {
  firstSessionRateCad: targeted.totalPriceCad,
  weeklyRateCad: progression.perSessionPriceCad,
  weeklyFollowUpTotalCad: progression.totalPriceCad,
  weeklyFollowUpSessions: progression.sessionCount,
  weeklyInstallmentCad: progression.installmentPriceCad,
  cancellationNoticeHours: pricing.cancellation.noticeHours,
  subjects: ["math\u00e9matiques", "sciences", "physique", "chimie", "pr\u00e9paration aux examens"],
  serviceAreas: ["Montr\u00e9al", "Laval", "en ligne partout au Qu\u00e9bec"],
}

export const assistantUiByLocale = {
  fr: {
    buttonLabel: "Assistant rapide", sheetTitle: "Assistant M\u00e9thode Secondaire",
    sheetDescription: "Rep\u00e8res rapides et meilleur prochain pas pour avancer plus simplement.",
    welcome: "Bonjour. Je peux aider avec les tarifs, les mati\u00e8res couvertes et la bonne premi\u00e8re \u00e9tape.",
    starterQuestions: ["Combien co\u00fbte le tutorat ?", "Faites-vous secondaire 4 en maths ?", "Comment fonctionne une demande de premi\u00e8re s\u00e9ance ?", "Faites-vous de la pr\u00e9paration d'examens ?"],
    inputPlaceholder: "\u00c9crivez votre question ici...", send: "Voir la r\u00e9ponse", sending: "R\u00e9ponse...", retry: "R\u00e9essayer", assistantLabel: "Assistant", youLabel: "Vous",
    error: "Une r\u00e9ponse rapide n'a pas pu \u00eatre g\u00e9n\u00e9r\u00e9e. Essayez une autre formulation ou utilisez le mini-bilan.",
    emptyStateTitle: "Rep\u00e8res rapides avant de demander une s\u00e9ance", emptyStateText: "L'assistant aide \u00e0 comprendre le bon format avant une courte demande, sans compte portail \u00e0 cr\u00e9er.",
    quickCall: "Appeler maintenant", quickBook: "Demander une s\u00e9ance", note: "Le mini-bilan est utile si le besoin reste flou. Si le besoin est clair, demandez directement une premi\u00e8re s\u00e9ance.",
  },
  en: {
    buttonLabel: "Quick help", sheetTitle: "M\u00e9thode Secondaire Assistant", sheetDescription: "Quick answers and the best next step so families can move forward more simply.",
    welcome: "Hi. I can help with pricing, covered subjects, and the right first step.",
    starterQuestions: ["How much does tutoring cost?", "Do you cover Secondary 4 math?", "How does a first-session request work?", "Do you offer exam preparation?"],
    inputPlaceholder: "Type your question here...", send: "Show answer", sending: "Answering...", retry: "Try again", assistantLabel: "Assistant", youLabel: "You",
    error: "A quick answer could not be generated. Try another wording or use the mini-assessment.",
    emptyStateTitle: "Quick answers before requesting a session", emptyStateText: "The assistant helps you understand the right format before a short request, without creating a portal account.",
    quickCall: "Call now", quickBook: "Request a session", note: "Use the mini-assessment when the need is still unclear. When it is clear, request a first session directly.",
  },
}

export function buildFallbackAssistantReply(message, locale = "fr") {
  const normalized = String(message || "").toLowerCase()
  const isEnglish = locale === "en"
  const mentionsPricing = matchesAny(normalized, [/prix/, /tarif/, /cout/, /co\u00fbt/, /price/, /cost/, /rate/])
  const mentionsBooking = matchesAny(normalized, [/appel/, /appeler/, /telephone/, /t\u00e9l\u00e9phone/, /contact/, /reserver/, /r\u00e9server/, /booking/, /book/, /call/])
  const mentionsSubjects = matchesAny(normalized, [/math/, /science/, /physique/, /physics/, /chimie/, /chemistry/, /examen/, /exam/, /matiere/, /mati\u00e8re/, /subject/])
  const looksLikeAcademicQuestion = matchesAny(normalized, [/fonction/, /equation/, /\u00e9quation/, /fraction/, /algebre/, /alg\u00e8bre/, /geometry/, /g\u00e9om\u00e9trie/, /derivee/, /d\u00e9riv\u00e9e/, /force/, /molecule/, /mol\u00e9cule/, /[0-9]\s*[\+\-\*\/=]/])
  const asksAboutFunctions = matchesAny(normalized, [/fonction/, /\bfunction\b/, /\bfunctions\b/])
  const asksAboutExamPrep = matchesAny(normalized, [/examen/, /exam/, /ministeriel/, /minist\u00e9riel/])
  const asksAboutSec4 = matchesAny(normalized, [/secondaire 4/, /sec 4/, /secondary 4/, /\bsec4\b/])

  if (asksAboutFunctions) return isEnglish
    ? `A function is a rule that takes an input and gives exactly one output. For example, f(x) = 2x + 3 gives f(4) = 11.\n\nIf functions in Secondary 4 are the real blocker, use the mini-assessment when the need is unclear, or request a Targeted session here: ${getBookingUrl(locale)}`
    : `Une fonction est une r\u00e8gle qui prend une entr\u00e9e et donne exactement une sortie. Par exemple, f(x) = 2x + 3 donne f(4) = 11.\n\nSi le vrai blocage concerne les fonctions au secondaire 4, utilisez le mini-bilan si le besoin est flou, ou demandez une S\u00e9ance cibl\u00e9e ici : ${getBookingUrl(locale)}`
  if (mentionsPricing) return buildPricingReply(locale)
  if (mentionsBooking) return isEnglish
    ? `You never need to create a portal account before asking for help. Request the right format when the need is clear; the team confirms the tutor, time and cadence after matching.\n\nNot sure which format is right? Use the 2-minute mini-assessment.\nUrgent? Call now: ${formatPhoneForReply()}\nRequest a session: ${getBookingUrl(locale)}`
    : `Vous n'avez jamais \u00e0 cr\u00e9er un compte portail avant de demander de l'aide. Demandez le bon format si le besoin est clair; l'\u00e9quipe confirme d'abord le tuteur, le cr\u00e9neau et la cadence apr\u00e8s le jumelage.\n\nVous h\u00e9sitez sur le bon format ? Utilisez le mini-bilan de 2 minutes.\nSituation urgente ? Appelez maintenant : ${formatPhoneForReply()}\nDemander une s\u00e9ance : ${getBookingUrl(locale)}`
  if (asksAboutExamPrep) return isEnglish
    ? `Yes. Exam preparation is a strong fit for math, science, physics, and chemistry from Secondary 1 to 5. If the exam is urgent, call ${formatPhoneForReply()}. Otherwise, request a session here: ${getBookingUrl(locale)}`
    : `Oui. La pr\u00e9paration d'examens fait partie des besoins les plus naturels du service en maths, sciences, physique et chimie du secondaire 1 \u00e0 5. Si l'examen approche, appelez au ${formatPhoneForReply()}. Sinon, demandez une s\u00e9ance ici : ${getBookingUrl(locale)}`
  if (asksAboutSec4) return isEnglish
    ? `Yes. Secondary 4 is covered, especially in math, science, physics, and chemistry. A Progress block can stabilize a recurring difficulty; the team chooses its cadence after matching and it never renews automatically.\n\nUse the short request and the team will confirm the right starting point: ${getBookingUrl(locale)}`
    : `Oui. Le secondaire 4 est bien couvert, surtout en maths, sciences, physique et chimie. Un Bloc de progression peut stabiliser une difficult\u00e9 r\u00e9currente; l'\u00e9quipe choisit sa cadence apr\u00e8s le jumelage et il ne se renouvelle jamais automatiquement.\n\nUtilisez la courte demande ici; l'\u00e9quipe confirmera le bon point de d\u00e9part : ${getBookingUrl(locale)}`
  if (looksLikeAcademicQuestion || mentionsSubjects) return isEnglish
    ? `Tutoring covers math, science, physics, chemistry, catch-up support, and exam preparation for Quebec secondary students. Use the mini-assessment if the need is unclear. If it is clear, request a Targeted session here: ${getBookingUrl(locale)}\nUrgent? Call ${formatPhoneForReply()}.`
    : `Le tutorat couvre les maths, les sciences, la physique, la chimie, la mise \u00e0 niveau et la pr\u00e9paration aux examens pour les \u00e9l\u00e8ves du secondaire au Qu\u00e9bec. Utilisez le mini-bilan si le besoin est flou. S'il est clair, demandez une S\u00e9ance cibl\u00e9e ici : ${getBookingUrl(locale)}\nSituation urgente ? Appelez au ${formatPhoneForReply()}.`
  return buildGeneralAssistantReply(locale)
}

export function buildAssistantInstructions(locale = "fr") {
  const isEnglish = locale === "en"
  return `You are the website assistant for M\u00e9thode Secondaire, a tutoring business for Quebec secondary-school students.\n\nBusiness facts:\n- Audience: parents of Secondary 1 to 5 students in Quebec.\n- Subjects: mathematics, science, physics, chemistry, exam preparation, and catch-up support.\n- Public offers: Targeted session (${targeted.sessionCount} session, $${targeted.totalPriceCad}), Momentum block (${momentum.sessionCount} sessions, $${momentum.totalPriceCad}), and Progress block (${progression.sessionCount} sessions, $${progression.totalPriceCad}).\n- Choose cadence only after matching. No format renews automatically.\n- A ${pricing.cancellation.noticeHours}-hour notice guarantees rescheduling; within that window, the team looks for a solution based on availability.\n- A parent requests a first session through the short public request form; the mini-assessment is optional when the need is unclear.\n\nBehavior rules:\n- Reply in ${isEnglish ? "English" : "French"} unless the user clearly uses the other language.\n- Be concise, warm, and practical.\n- Do not invent tutor availability, credentials, guarantees, legal terms, or policies.`
}

function buildGeneralAssistantReply(locale) {
  return locale === "en"
    ? `Methode Secondaire offers Targeted session for one concrete priority, a Momentum block to regain momentum over roughly one month, and a Progress block for a recurring difficulty or lasting academic structure. The team chooses cadence after matching, and no format renews automatically.\n\nIf the need is clear, request a first session: ${getBookingUrl(locale)}\nIf it is unclear, use the 2-minute mini-assessment.\nUrgent? Call ${formatPhoneForReply()}.`
    : `M\u00e9thode Secondaire propose une S\u00e9ance cibl\u00e9e pour une priorit\u00e9 concr\u00e8te, un Bloc d'\u00e9lan pour reprendre l'\u00e9lan pendant environ un mois et un Bloc de progression pour une difficult\u00e9 r\u00e9currente ou une structure scolaire durable. L'\u00e9quipe choisit la cadence apr\u00e8s le jumelage et aucun format ne se renouvelle automatiquement.\n\nSi le besoin est clair, demandez une premi\u00e8re s\u00e9ance : ${getBookingUrl(locale)}\nS'il reste flou, utilisez le mini-bilan de 2 minutes.\nSituation urgente ? Appelez au ${formatPhoneForReply()}.`
}

function buildPricingReply(locale) {
  const notice = pricing.cancellation.noticeHours
  return locale === "en"
    ? `Targeted session: $${targeted.totalPriceCad} for one concrete priority.\nMomentum block: $${momentum.totalPriceCad} for ${momentum.sessionCount} sessions to regain momentum over roughly one month.\nProgress block: $${progression.totalPriceCad} for ${progression.sessionCount} sessions for a recurring difficulty or lasting academic structure.\n\nThe team chooses cadence after matching and no format renews automatically. Let us know ${notice} hours ahead for a guaranteed reschedule.\n\nRequest the right starting point here: ${getBookingUrl(locale)}`
    : `S\u00e9ance cibl\u00e9e : ${targeted.totalPriceCad} $ pour une priorit\u00e9 concr\u00e8te.\nBloc d'\u00e9lan : ${momentum.totalPriceCad} $ pour ${momentum.sessionCount} s\u00e9ances afin de reprendre l'\u00e9lan pendant environ un mois.\nBloc de progression : ${progression.totalPriceCad} $ pour ${progression.sessionCount} s\u00e9ances, pour une difficult\u00e9 r\u00e9currente ou une structure scolaire durable.\n\nL'\u00e9quipe choisit la cadence apr\u00e8s le jumelage et aucun format ne se renouvelle automatiquement. Pr\u00e9venez-nous ${notice} h \u00e0 l'avance pour un report garanti.\n\nDemandez le bon point de d\u00e9part ici : ${getBookingUrl(locale)}`
}

function matchesAny(message, patterns) { return patterns.some((pattern) => pattern.test(message)) }
function formatPhoneForReply() { return "+1 (514) 952-0709" }
function getBookingUrl(locale) { return locale === "en" ? BOOKING_URL_EN : BOOKING_URL }
