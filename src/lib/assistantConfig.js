import { BOOKING_URL } from "../config/booking.js"

export const assistantBusinessInfo = {
  phone: "+15149520709",
  bookingUrl: BOOKING_URL,
}

export const assistantServiceInfo = {
  flexibleRateCad: 75,
  weeklyRateCad: 70,
  subjects: ["mathématiques", "sciences", "physique", "chimie", "préparation aux examens"],
  serviceAreas: ["Montréal", "Laval", "en ligne partout au Québec"],
}

export const assistantUiByLocale = {
  fr: {
    buttonLabel: "Assistant IA",
    sheetTitle: "Assistant Méthode Secondaire",
    sheetDescription:
      "Posez une question sur le tutorat, les maths, les sciences ou la meilleure prochaine étape.",
    welcome:
      "Bonjour. Je peux aider avec les questions sur le tutorat, les tarifs, les matières couvertes, ou expliquer brièvement un concept de maths ou de sciences au secondaire.",
    starterQuestions: [
      "Combien coûte le tutorat ?",
      "Faites-vous secondaire 4 en maths ?",
      "Peux-tu m'expliquer une fonction ?",
      "Est-ce mieux d'appeler ou de réserver ?",
    ],
    inputPlaceholder: "Écrivez votre question ici…",
    send: "Envoyer",
    sending: "Envoi…",
    retry: "Réessayer",
    assistantLabel: "Assistant",
    youLabel: "Vous",
    error:
      "Le service IA n'est pas disponible pour le moment. Vérifiez la clé API OpenAI sur le déploiement Vercel, puis réessayez.",
    emptyStateTitle: "Des réponses rapides, puis une vraie réservation si nécessaire",
    emptyStateText:
      "L'assistant peut répondre aux questions fréquentes et aider à clarifier la situation avant un appel ou une séance.",
    quickCall: "Appeler",
    quickBook: "Réserver",
    note: "Les réponses IA donnent une orientation générale et ne remplacent pas un suivi pédagogique personnalisé.",
  },
  en: {
    buttonLabel: "AI Assistant",
    sheetTitle: "Méthode Secondaire Assistant",
    sheetDescription:
      "Ask about tutoring, math, science, pricing, or the best next step for your situation.",
    welcome:
      "Hi. I can help with tutoring questions, pricing, covered subjects, or briefly explain a high school math or science concept.",
    starterQuestions: [
      "How much does tutoring cost?",
      "Do you cover Secondary 4 math?",
      "Can you explain functions?",
      "Should I call first or book directly?",
    ],
    inputPlaceholder: "Type your question here…",
    send: "Send",
    sending: "Sending…",
    retry: "Try again",
    assistantLabel: "Assistant",
    youLabel: "You",
    error:
      "The AI service is not available right now. Check the OpenAI API key in the Vercel deployment and try again.",
    emptyStateTitle: "Quick answers first, real booking when needed",
    emptyStateText:
      "The assistant can answer common questions and help clarify the situation before a call or a session.",
    quickCall: "Call",
    quickBook: "Book",
    note: "AI replies offer general guidance and do not replace personalized tutoring support.",
  },
}

export function buildFallbackAssistantReply(message, locale = "fr") {
  const normalized = String(message || "").toLowerCase()
  const isEnglish = locale === "en"

  const mentionsPricing = matchesAny(normalized, [
    /prix/,
    /tarif/,
    /cout/,
    /coût/,
    /price/,
    /cost/,
    /rate/,
  ])
  const mentionsBooking = matchesAny(normalized, [
    /appel/,
    /appeler/,
    /telephone/,
    /téléphone/,
    /contact/,
    /reserver/,
    /réserver/,
    /booking/,
    /book/,
    /call/,
  ])
  const mentionsSubjects = matchesAny(normalized, [
    /math/,
    /science/,
    /physique/,
    /physics/,
    /chimie/,
    /chemistry/,
    /examen/,
    /exam/,
    /matiere/,
    /matière/,
    /subject/,
  ])
  const looksLikeAcademicQuestion = matchesAny(normalized, [
    /fonction/,
    /equation/,
    /équation/,
    /fraction/,
    /algebre/,
    /algèbre/,
    /geometry/,
    /géométrie/,
    /derivee/,
    /dérivée/,
    /force/,
    /molecule/,
    /molécule/,
    /[0-9]\s*[\+\-\*\/=]/,
  ])

  if (mentionsPricing) {
    return isEnglish
      ? `The assistant is in limited mode right now, but here is the key pricing info.\n\nWeekly follow-up is ${assistantServiceInfo.weeklyRateCad} CAD/hour. Flexible sessions are ${assistantServiceInfo.flexibleRateCad} CAD/hour. Intensive exam-prep blocks are available on request.\n\nIf you want the fastest next step, call ${formatPhoneForReply(locale)} or book here: ${BOOKING_URL}`
      : `L'assistant est en mode limite pour le moment, mais voici l'essentiel pour les tarifs.\n\nLe suivi hebdomadaire est à ${assistantServiceInfo.weeklyRateCad} $ CAD / heure. Les séances flexibles sont à ${assistantServiceInfo.flexibleRateCad} $ CAD / heure. Les blocs intensifs de préparation aux examens sont offerts sur demande.\n\nPour aller vite, appelez au ${formatPhoneForReply(locale)} ou réservez ici : ${BOOKING_URL}`
  }

  if (mentionsBooking) {
    return isEnglish
      ? `The assistant is in limited mode right now, but I can still point you to the right next step.\n\nFor urgent situations, the fastest option is to call ${formatPhoneForReply(locale)}. To reserve a session or a 15-minute diagnostic call, use: ${BOOKING_URL}\n\nOnline tutoring is available across Quebec, with in-person support depending on area and availability.`
      : `L'assistant est en mode limite pour le moment, mais je peux quand même vous diriger vers la bonne prochaine étape.\n\nPour une situation urgente, le plus rapide est d'appeler au ${formatPhoneForReply(locale)}. Pour réserver une séance ou un appel diagnostique de 15 minutes, utilisez : ${BOOKING_URL}\n\nLe tutorat en ligne est offert partout au Québec, avec des disponibilités en personne selon le secteur et l'horaire.`
  }

  if (looksLikeAcademicQuestion) {
    return isEnglish
      ? `The detailed AI tutoring mode is temporarily unavailable, so I should not pretend to solve the exercise step by step right now.\n\nWhat I can confirm is that tutoring covers math, science, physics, chemistry, catch-up support, and exam preparation for Secondary 1 to 5 in Quebec.\n\nIf you want real guided help on this question, book here: ${BOOKING_URL} or call ${formatPhoneForReply(locale)}.`
      : `Le mode d'aide IA détaillé est temporairement indisponible, donc je ne vais pas prétendre résoudre l'exercice pas à pas pour le moment.\n\nJe peux quand même confirmer que le tutorat couvre les maths, les sciences, la physique, la chimie, la mise à niveau et la préparation aux examens du secondaire 1 à 5 au Québec.\n\nPour une vraie aide guidée sur cette question, réservez ici : ${BOOKING_URL} ou appelez au ${formatPhoneForReply(locale)}.`
  }

  if (mentionsSubjects) {
    return isEnglish
      ? `The assistant is in limited mode right now, but here is the core service info.\n\nTutoring covers math, science, physics, chemistry, catch-up support, and exam preparation for Quebec secondary students. Sessions are available online across Quebec and in person depending on area and availability.\n\nThe best next step is usually a quick call or a booking request: ${BOOKING_URL}`
      : `L'assistant est en mode limite pour le moment, mais voici l'information essentielle sur le service.\n\nLe tutorat couvre les maths, les sciences, la physique, la chimie, la mise à niveau et la préparation aux examens pour les élèves du secondaire au Québec. Les séances sont offertes en ligne partout au Québec et en personne selon le secteur et les disponibilités.\n\nLa meilleure prochaine étape est souvent un court appel ou une demande de réservation : ${BOOKING_URL}`
  }

  return isEnglish
    ? `The assistant is in limited mode right now, but I can still share the essentials.\n\nMéthode Secondaire offers tutoring for Secondary 1 to 5 students in Quebec in math, science, physics, chemistry, catch-up support, and exam preparation. Weekly follow-up is ${assistantServiceInfo.weeklyRateCad} CAD/hour and flexible sessions are ${assistantServiceInfo.flexibleRateCad} CAD/hour.\n\nFor the fastest next step, call ${formatPhoneForReply(locale)} or book here: ${BOOKING_URL}`
    : `L'assistant est en mode limite pour le moment, mais je peux quand même partager l'essentiel.\n\nMéthode Secondaire offre du tutorat pour les élèves du secondaire 1 à 5 au Québec en maths, sciences, physique, chimie, mise à niveau et préparation aux examens. Le suivi hebdomadaire est à ${assistantServiceInfo.weeklyRateCad} $ CAD / heure et les séances flexibles sont à ${assistantServiceInfo.flexibleRateCad} $ CAD / heure.\n\nPour avancer rapidement, appelez au ${formatPhoneForReply(locale)} ou réservez ici : ${BOOKING_URL}`
}

export function buildAssistantInstructions(locale = "fr") {
  const isEnglish = locale === "en"

  return `
You are the website assistant for Méthode Secondaire, a tutoring business for Quebec secondary-school students.

Your role:
- Answer questions about the tutoring service, subjects, pricing, service areas, and booking flow.
- Give short, clear, supportive explanations for secondary-level math and science questions.
- Help parents or students choose the best next step.

Business facts:
- Business name: Méthode Secondaire.
- Audience: parents and secondary 1 to 5 students in Quebec.
- Subjects: mathematics, science, physics, chemistry, exam preparation, catch-up support.
- Formats: online across Quebec; in-person depending on area and availability.
- Local pages emphasize Montreal, Laval, and online across Quebec.
- Pricing currently shown on the website: flexible session 75 CAD/hour, weekly follow-up 70 CAD/hour, intensive block on request.
- Best first step for many families: a 15-minute diagnostic call.
- Booking link: ${BOOKING_URL}
- Phone: +1 (514) 952-0709

Behavior rules:
- Reply in ${isEnglish ? "English" : "French"} unless the user clearly uses the other language.
- Be concise, warm, and practical.
- If asked a math or science question, explain step by step at a secondary-school level.
- If the user appears to want answers for graded homework or an exam, do not simply give the final answer with no guidance. Prefer hints, reasoning, and teaching.
- Do not invent tutor availability, credentials, guarantees, or policies not listed above.
- If the question is about fit, urgency, or what to do next, recommend either calling first or booking a session when appropriate.
- If you do not know something specific, say so plainly and suggest calling or using the website contact form.

Style:
- Short paragraphs or short flat bullets only when helpful.
- Avoid sounding robotic.
- Keep most answers under 180 words.
`.trim()
}

function matchesAny(message, patterns) {
  return patterns.some((pattern) => pattern.test(message))
}

function formatPhoneForReply(locale) {
  return locale === "en" ? "+1 (514) 952-0709" : "+1 (514) 952-0709"
}
