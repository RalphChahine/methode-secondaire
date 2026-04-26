import { BOOKING_URL } from "../config/booking.js"

export const assistantBusinessInfo = {
  phone: "+15149520709",
  bookingUrl: BOOKING_URL,
}

export const assistantServiceInfo = {
  flexibleRateCad: 75,
  weeklyRateCad: 70,
  subjects: [
    "math\u00E9matiques",
    "sciences",
    "physique",
    "chimie",
    "pr\u00E9paration aux examens",
  ],
  serviceAreas: ["Montr\u00E9al", "Laval", "en ligne partout au Qu\u00E9bec"],
}

export const assistantUiByLocale = {
  fr: {
    buttonLabel: "Assistant rapide",
    sheetTitle: "Assistant M\u00E9thode Secondaire",
    sheetDescription:
      "Rep\u00E8res rapides, questions fr\u00E9quentes et meilleure prochaine \u00E9tape pour avancer plus vite.",
    welcome:
      "Bonjour. Je peux aider avec les tarifs, les mati\u00E8res couvertes, le bon format de tutorat et la meilleure prochaine \u00E9tape.",
    starterQuestions: [
      "Combien co\u00FBte le tutorat ?",
      "Faites-vous secondaire 4 en maths ?",
      "Quelle est la diff\u00E9rence entre appeler et r\u00E9server ?",
      "Faites-vous de la pr\u00E9paration d'examens ?",
    ],
    inputPlaceholder: "\u00C9crivez votre question ici...",
    send: "Voir la r\u00E9ponse",
    sending: "R\u00E9ponse...",
    retry: "R\u00E9essayer",
    assistantLabel: "Assistant",
    youLabel: "Vous",
    error:
      "Une r\u00E9ponse rapide n'a pas pu \u00EAtre g\u00E9n\u00E9r\u00E9e. Essayez une autre formulation ou utilisez le diagnostic.",
    emptyStateTitle: "Rep\u00E8res rapides avant d'appeler ou de r\u00E9server",
    emptyStateText:
      "L'assistant r\u00E9pond aux questions les plus utiles pour passer plus vite au bon appel, au bon tuteur ou au bon format.",
    quickCall: "Appeler",
    quickBook: "R\u00E9server",
    note:
      "Les r\u00E9ponses servent de rep\u00E8re rapide. Pour un vrai accompagnement p\u00E9dagogique, le diagnostic ou l'appel restent les meilleurs raccourcis.",
  },
  en: {
    buttonLabel: "Quick help",
    sheetTitle: "M\u00E9thode Secondaire Assistant",
    sheetDescription:
      "Quick answers, common questions, and the best next step so families can move forward faster.",
    welcome:
      "Hi. I can help with pricing, covered subjects, tutoring format, and the best next step for the situation.",
    starterQuestions: [
      "How much does tutoring cost?",
      "Do you cover Secondary 4 math?",
      "Should I call first or book directly?",
      "Do you offer exam preparation?",
    ],
    inputPlaceholder: "Type your question here...",
    send: "Show answer",
    sending: "Answering...",
    retry: "Try again",
    assistantLabel: "Assistant",
    youLabel: "You",
    error:
      "A quick answer could not be generated. Try another wording or use the diagnostic.",
    emptyStateTitle: "Quick answers before you call or book",
    emptyStateText:
      "The assistant handles the most useful tutoring questions so families can move toward the right tutor or format faster.",
    quickCall: "Call",
    quickBook: "Book",
    note:
      "These answers are a fast guide. For real personalized support, the diagnostic or a phone call remains the best next step.",
  },
}

export function buildFallbackAssistantReply(message, locale = "fr") {
  const normalized = String(message || "").toLowerCase()
  const isEnglish = locale === "en"

  const mentionsPricing = matchesAny(normalized, [
    /prix/,
    /tarif/,
    /cout/,
    /co\u00FBt/,
    /price/,
    /cost/,
    /rate/,
  ])
  const mentionsBooking = matchesAny(normalized, [
    /appel/,
    /appeler/,
    /telephone/,
    /t\u00E9l\u00E9phone/,
    /contact/,
    /reserver/,
    /r\u00E9server/,
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
    /mati\u00E8re/,
    /subject/,
  ])
  const looksLikeAcademicQuestion = matchesAny(normalized, [
    /fonction/,
    /equation/,
    /\u00E9quation/,
    /fraction/,
    /algebre/,
    /alg\u00E8bre/,
    /geometry/,
    /g\u00E9om\u00E9trie/,
    /derivee/,
    /d\u00E9riv\u00E9e/,
    /force/,
    /molecule/,
    /mol\u00E9cule/,
    /[0-9]\s*[\+\-\*\/=]/,
  ])

  const asksAboutFunctions = matchesAny(normalized, [/fonction/, /\bfunction\b/, /\bfunctions\b/])
  const asksAboutExamPrep = matchesAny(normalized, [/examen/, /exam/, /ministeriel/, /minist\u00E9riel/])
  const asksAboutSec4 = matchesAny(normalized, [/secondaire 4/, /sec 4/, /secondary 4/, /\bsec4\b/])

  if (asksAboutFunctions) {
    return isEnglish
      ? `A function is a rule that takes an input and gives exactly one output.\n\nExample: if f(x) = 2x + 3, then f(4) = 11 because you replace x with 4.\n\nThe two first things students usually need are:\n- identify the input\n- apply the rule in the right order\n\nIf the real issue is functions in Secondary 4, the fastest next step is usually the diagnostic or a booking here: ${BOOKING_URL}`
      : `Une fonction est une r\u00E8gle qui prend une entr\u00E9e et donne exactement une sortie.\n\nExemple : si f(x) = 2x + 3, alors f(4) = 11 parce qu'on remplace x par 4.\n\nLes deux premi\u00E8res choses \u00E0 ma\u00EEtriser sont :\n- rep\u00E9rer l'entr\u00E9e\n- appliquer la r\u00E8gle dans le bon ordre\n\nSi le vrai blocage concerne les fonctions au secondaire 4, le plus utile est souvent le diagnostic ou une r\u00E9servation ici : ${BOOKING_URL}`
  }

  if (mentionsPricing) {
    return isEnglish
      ? `Weekly follow-up is ${assistantServiceInfo.weeklyRateCad} CAD/hour. Flexible sessions are ${assistantServiceInfo.flexibleRateCad} CAD/hour. Intensive exam-prep blocks are available on request.\n\nIf the need already feels clear, you can book here: ${BOOKING_URL}\nIf the situation is still fuzzy or urgent, call ${formatPhoneForReply(locale)} first.`
      : `Le suivi hebdomadaire est \u00E0 ${assistantServiceInfo.weeklyRateCad} $ CAD / heure. Les s\u00E9ances flexibles sont \u00E0 ${assistantServiceInfo.flexibleRateCad} $ CAD / heure. Les blocs intensifs de pr\u00E9paration aux examens sont offerts sur demande.\n\nSi le besoin est d\u00E9j\u00E0 clair, vous pouvez r\u00E9server ici : ${BOOKING_URL}\nSi la situation est encore floue ou urgente, appelez d'abord au ${formatPhoneForReply(locale)}.`
  }

  if (mentionsBooking) {
    return isEnglish
      ? `Call first when the situation is urgent, still unclear, or tied to an exam coming soon. Book directly when the chapter, subject, and goal are already clear.\n\nFastest paths:\n- Call: ${formatPhoneForReply(locale)}\n- Book: ${BOOKING_URL}`
      : `Il vaut mieux appeler d'abord quand la situation est urgente, encore floue, ou li\u00E9e \u00E0 un examen proche. Il vaut mieux r\u00E9server directement quand le chapitre, la mati\u00E8re et l'objectif sont d\u00E9j\u00E0 clairs.\n\nRaccourcis les plus utiles :\n- Appeler : ${formatPhoneForReply(locale)}\n- R\u00E9server : ${BOOKING_URL}`
  }

  if (asksAboutExamPrep) {
    return isEnglish
      ? `Yes. Exam preparation is a strong fit for the service in math, science, physics, and chemistry from Secondary 1 to 5.\n\nThe usual goal is to:\n- identify the priority chapters\n- focus on exam-style exercises\n- reduce panic before the test window\n\nIf the exam is soon, call ${formatPhoneForReply(locale)}. Otherwise, you can book here: ${BOOKING_URL}`
      : `Oui. La pr\u00E9paration d'examens fait partie des besoins les plus naturels du service en maths, sciences, physique et chimie du secondaire 1 \u00E0 5.\n\nL'objectif est g\u00E9n\u00E9ralement de :\n- cibler les chapitres prioritaires\n- travailler des exercices type examen\n- r\u00E9duire la panique avant l'\u00E9ch\u00E9ance\n\nSi l'examen approche, appelez au ${formatPhoneForReply(locale)}. Sinon, vous pouvez r\u00E9server ici : ${BOOKING_URL}`
  }

  if (asksAboutSec4) {
    return isEnglish
      ? `Yes. Secondary 4 is covered, especially in math, science, physics, and chemistry.\n\nThat level often needs either:\n- weekly follow-up to stabilize the method\n- targeted catch-up before marks slip further\n- focused exam preparation later in the year\n\nIf you already know the subject and chapter, book here: ${BOOKING_URL}`
      : `Oui. Le secondaire 4 est bien couvert, surtout en maths, sciences, physique et chimie.\n\nC'est souvent un niveau o\u00F9 il faut soit :\n- un suivi hebdomadaire pour stabiliser la m\u00E9thode\n- un rattrapage cibl\u00E9 avant que les notes glissent davantage\n- une pr\u00E9paration d'examen plus tard dans l'ann\u00E9e\n\nSi la mati\u00E8re et le chapitre sont d\u00E9j\u00E0 clairs, vous pouvez r\u00E9server ici : ${BOOKING_URL}`
  }

  if (looksLikeAcademicQuestion) {
    return isEnglish
      ? `This widget is better for fast orientation than full lesson support.\n\nWhat I can confirm is that tutoring covers math, science, physics, chemistry, catch-up support, and exam preparation for Secondary 1 to 5 in Quebec.\n\nFor detailed guided help on the actual problem, the best next step is to book here: ${BOOKING_URL} or call ${formatPhoneForReply(locale)}.`
      : `Ce widget sert surtout \u00E0 orienter rapidement, pas \u00E0 remplacer une vraie s\u00E9ance de cours.\n\nJe peux confirmer que le tutorat couvre les maths, les sciences, la physique, la chimie, la mise \u00E0 niveau et la pr\u00E9paration aux examens du secondaire 1 \u00E0 5 au Qu\u00E9bec.\n\nPour une aide vraiment guid\u00E9e sur le probl\u00E8me, le plus utile est de r\u00E9server ici : ${BOOKING_URL} ou d'appeler au ${formatPhoneForReply(locale)}.`
  }

  if (mentionsSubjects) {
    return isEnglish
      ? `Tutoring covers math, science, physics, chemistry, catch-up support, and exam preparation for Quebec secondary students. Sessions are available online across Quebec and in person depending on area and availability.\n\nIf the need is clear, book here: ${BOOKING_URL}\nIf you still need help sorting the situation, use the diagnostic in the widget.`
      : `Le tutorat couvre les maths, les sciences, la physique, la chimie, la mise \u00E0 niveau et la pr\u00E9paration aux examens pour les \u00E9l\u00E8ves du secondaire au Qu\u00E9bec. Les s\u00E9ances sont offertes en ligne partout au Qu\u00E9bec et en personne selon le secteur et les disponibilit\u00E9s.\n\nSi le besoin est clair, r\u00E9servez ici : ${BOOKING_URL}\nSi vous h\u00E9sitez encore sur la bonne direction, utilisez le diagnostic du widget.`
  }

  return isEnglish
    ? `M\u00E9thode Secondaire offers tutoring for Secondary 1 to 5 students in Quebec in math, science, physics, chemistry, catch-up support, and exam preparation. Weekly follow-up is ${assistantServiceInfo.weeklyRateCad} CAD/hour and flexible sessions are ${assistantServiceInfo.flexibleRateCad} CAD/hour.\n\nBest next steps:\n- use the diagnostic if the situation is still fuzzy\n- call ${formatPhoneForReply(locale)} if it feels urgent\n- book here if the need is already clear: ${BOOKING_URL}`
    : `M\u00E9thode Secondaire offre du tutorat pour les \u00E9l\u00E8ves du secondaire 1 \u00E0 5 au Qu\u00E9bec en maths, sciences, physique, chimie, mise \u00E0 niveau et pr\u00E9paration aux examens. Le suivi hebdomadaire est \u00E0 ${assistantServiceInfo.weeklyRateCad} $ CAD / heure et les s\u00E9ances flexibles sont \u00E0 ${assistantServiceInfo.flexibleRateCad} $ CAD / heure.\n\nMeilleurs raccourcis selon la situation :\n- utilisez le diagnostic si le besoin est encore flou\n- appelez au ${formatPhoneForReply(locale)} si c'est urgent\n- r\u00E9servez ici si le besoin est d\u00E9j\u00E0 clair : ${BOOKING_URL}`
}

export function buildAssistantInstructions(locale = "fr") {
  const isEnglish = locale === "en"

  return `
You are the website assistant for M\u00E9thode Secondaire, a tutoring business for Quebec secondary-school students.

Your role:
- Answer questions about the tutoring service, subjects, pricing, service areas, and booking flow.
- Give short, clear, supportive explanations for secondary-level math and science questions.
- Help parents or students choose the best next step.

Business facts:
- Business name: M\u00E9thode Secondaire.
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
- If asked a math or science question, explain briefly at a secondary-school level.
- If the user appears to want answers for graded homework or an exam, do not simply give the final answer with no guidance.
- Do not invent tutor availability, credentials, guarantees, or policies not listed above.
- If the question is about fit, urgency, or what to do next, recommend either calling first or booking a session when appropriate.
- If you do not know something specific, say so plainly and suggest calling or using the website contact form.
`.trim()
}

function matchesAny(message, patterns) {
  return patterns.some((pattern) => pattern.test(message))
}

function formatPhoneForReply() {
  return "+1 (514) 952-0709"
}
