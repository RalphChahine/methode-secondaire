const diagnosticFieldOrder = ["level", "subject", "goal", "timing", "format", "details"]

export { diagnosticFieldOrder }

export const diagnosticUiByLocale = {
  fr: {
    launchEyebrow: "Diagnostic express",
    launchTitle: "2 minutes pour savoir quoi faire ensuite",
    launchDescription:
      "L'IA lit le niveau, la matière, l'urgence et le bon format pour recommander la prochaine étape la plus utile avant d'appeler ou de réserver.",
    launchBullets: [
      "Clarifie si le besoin ressemble plutôt à un examen, un rattrapage ou un suivi.",
      "Aide à décider entre appel immédiat et réservation directe.",
      "Génère un résumé propre à réutiliser dans la demande.",
    ],
    launchButton: "Lancer le diagnostic",
    launchSecondary: "Appeler maintenant",
    modeChat: "Questions",
    modeDiagnostic: "Diagnostic",
    modeBadge: "Nouveau",
    introTitle: "Diagnostic guidé",
    introDescription:
      "Répondez en quelques clics. À la fin, l'assistant recommande la meilleure prochaine étape pour la situation.",
    stepLabel: "Étape",
    back: "Retour",
    next: "Continuer",
    submit: "Voir la recommandation",
    analyzing: "Analyse en cours...",
    restart: "Recommencer",
    edit: "Modifier mes réponses",
    resultEyebrow: "Orientation recommand\u00E9e",
    resultTitle: "La meilleure prochaine étape selon le diagnostic",
    summaryTitle: "Ce que le diagnostic voit",
    reasonsTitle: "Pourquoi cette orientation",
    nextStepsTitle: "Suite recommandée",
    messageTitle: "Résumé prêt à réutiliser",
    copySummary: "Copier le résumé",
    copied: "Résumé copié",
    limitedMode: "Version simplifiée du diagnostic pour le moment",
    actions: {
      call_now: "Appeler maintenant",
      book_session: "Réserver une séance",
    },
    fields: {
      level: {
        label: "Niveau actuel",
        description: "Le niveau aide à cadrer le chapitre, le rythme et le bon angle pédagogique.",
        type: "options",
        options: [
          { value: "sec1", label: "Secondaire 1" },
          { value: "sec2", label: "Secondaire 2" },
          { value: "sec3", label: "Secondaire 3" },
          { value: "sec4", label: "Secondaire 4" },
          { value: "sec5", label: "Secondaire 5" },
        ],
      },
      subject: {
        label: "Matière principale",
        description: "On cible la matière qui bloque le plus en ce moment.",
        type: "options",
        options: [
          { value: "math", label: "Maths" },
          { value: "science", label: "Sciences générales" },
          { value: "physics", label: "Physique" },
          { value: "chemistry", label: "Chimie" },
          { value: "unsure", label: "Je ne suis pas encore certain" },
        ],
      },
      goal: {
        label: "Besoin principal",
        description: "Le diagnostic change beaucoup selon qu'il faut sauver un examen ou remettre une base en place.",
        type: "options",
        options: [
          { value: "exam-prep", label: "Préparation d'examen" },
          { value: "weekly", label: "Suivi hebdomadaire" },
          { value: "catch-up", label: "Rattrapage ou remise à niveau" },
          { value: "unsure", label: "Le besoin est encore flou" },
        ],
      },
      timing: {
        label: "Quand faut-il agir ?",
        description: "L'urgence aide à savoir s'il faut appeler tout de suite ou si réserver suffit.",
        type: "options",
        options: [
          { value: "this-week", label: "Cette semaine" },
          { value: "two-weeks", label: "Dans 2 semaines" },
          { value: "this-month", label: "Ce mois-ci" },
          { value: "flexible", label: "Pas urgent, je veux surtout cadrer" },
        ],
      },
      format: {
        label: "Format souhaité",
        description: "Le service est en ligne partout au Québec, avec du présentiel selon le secteur et le bon profil.",
        type: "options",
        options: [
          { value: "online", label: "En ligne partout au Québec" },
          { value: "in-person", label: "Présentiel Montréal / Laval si possible" },
          { value: "either", label: "Flexible selon le bon profil" },
        ],
      },
      details: {
        label: "Qu'est-ce qui bloque le plus ?",
        description: "Deux phrases suffisent. Le plus utile est de nommer le chapitre, l'examen ou le vrai point de friction.",
        type: "textarea",
        placeholder:
          "Ex. examen dans 10 jours, fonctions encore floues, l'élève comprend en classe mais bloque seul devant les problèmes.",
      },
    },
  },
  en: {
    launchEyebrow: "Quick diagnostic",
    launchTitle: "2 minutes to know what to do next",
    launchDescription:
      "The diagnostic reads the grade, subject, urgency and best format, then recommends the most useful next step before you call or book.",
    launchBullets: [
      "Clarifies whether the need feels more like exam prep, catch-up support or weekly follow-up.",
      "Helps decide between calling now and booking directly.",
      "Generates a clean summary you can reuse in the request.",
    ],
    launchButton: "Start the diagnostic",
    launchSecondary: "Call now",
    modeChat: "Questions",
    modeDiagnostic: "Diagnostic",
    modeBadge: "New",
    introTitle: "Guided diagnostic",
    introDescription:
      "Answer in a few taps. At the end, the assistant recommends the best next step for the situation.",
    stepLabel: "Step",
    back: "Back",
    next: "Continue",
    submit: "See recommendation",
    analyzing: "Analyzing...",
    restart: "Start again",
    edit: "Edit answers",
    resultEyebrow: "Recommended direction",
    resultTitle: "The best next step based on the diagnostic",
    summaryTitle: "What the diagnostic sees",
    reasonsTitle: "Why this direction",
    nextStepsTitle: "Recommended next steps",
    messageTitle: "Summary ready to reuse",
    copySummary: "Copy summary",
    copied: "Summary copied",
    limitedMode: "Simplified diagnostic for now",
    actions: {
      call_now: "Call now",
      book_session: "Book a session",
    },
    fields: {
      level: {
        label: "Current grade",
        description: "The grade helps frame the chapter difficulty, pace and best teaching angle.",
        type: "options",
        options: [
          { value: "sec1", label: "Secondary 1" },
          { value: "sec2", label: "Secondary 2" },
          { value: "sec3", label: "Secondary 3" },
          { value: "sec4", label: "Secondary 4" },
          { value: "sec5", label: "Secondary 5" },
        ],
      },
      subject: {
        label: "Main subject",
        description: "Choose the subject that feels most blocked right now.",
        type: "options",
        options: [
          { value: "math", label: "Math" },
          { value: "science", label: "General science" },
          { value: "physics", label: "Physics" },
          { value: "chemistry", label: "Chemistry" },
          { value: "unsure", label: "I am not fully sure yet" },
        ],
      },
      goal: {
        label: "Main need",
        description: "The recommendation changes a lot depending on whether the issue is an exam, catch-up work or a longer follow-up.",
        type: "options",
        options: [
          { value: "exam-prep", label: "Exam preparation" },
          { value: "weekly", label: "Weekly follow-up" },
          { value: "catch-up", label: "Catch-up or academic reset" },
          { value: "unsure", label: "The need is still unclear" },
        ],
      },
      timing: {
        label: "When should this move?",
        description: "Urgency helps decide whether calling now matters more than booking directly.",
        type: "options",
        options: [
          { value: "this-week", label: "This week" },
          { value: "two-weeks", label: "Within 2 weeks" },
          { value: "this-month", label: "This month" },
          { value: "flexible", label: "Not urgent, I mainly want clarity" },
        ],
      },
      format: {
        label: "Preferred format",
        description: "Support is online across Quebec, with in-person depending on area and the right tutor profile.",
        type: "options",
        options: [
          { value: "online", label: "Online across Quebec" },
          { value: "in-person", label: "In person in Montreal / Laval if possible" },
          { value: "either", label: "Flexible depending on the right fit" },
        ],
      },
      details: {
        label: "What is blocking the most?",
        description: "Two sentences are enough. The most useful thing is naming the chapter, exam or real sticking point.",
        type: "textarea",
        placeholder:
          "Ex. exam in 10 days, functions still unclear, the student follows in class but freezes alone on problem solving.",
      },
    },
  },
}

export const leadDiagnosticSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    headline: { type: "string" },
    summary: { type: "string" },
    recommendedAction: {
      type: "string",
      enum: ["call_now", "book_session"],
    },
    recommendedActionLabel: { type: "string" },
    recommendedService: { type: "string" },
    actionReason: { type: "string" },
    reasons: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 4,
    },
    nextSteps: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 4,
    },
    suggestedMessage: { type: "string" },
  },
  required: [
    "headline",
    "summary",
    "recommendedAction",
    "recommendedActionLabel",
    "recommendedService",
    "actionReason",
    "reasons",
    "nextSteps",
    "suggestedMessage",
  ],
}

export function getDiagnosticUi(locale = "fr") {
  const ui = diagnosticUiByLocale[locale] || diagnosticUiByLocale.fr

  if (locale === "fr") {
    return {
      ...ui,
      launchDescription:
        "Le diagnostic lit le niveau, la mati\u00E8re, l'urgence et le bon format pour recommander la prochaine \u00E9tape la plus utile avant d'appeler ou de r\u00E9server.",
      introDescription:
        "R\u00E9pondez en quelques clics. \u00C0 la fin, l'outil recommande la meilleure prochaine \u00E9tape pour la situation.",
      resultEyebrow: "Orientation recommand\u00E9e",
    }
  }

  if (locale === "en") {
    return {
      ...ui,
      introDescription:
        "Answer in a few taps. At the end, the tool recommends the best next step for the situation.",
    }
  }

  return ui
}

export function getDiagnosticQuestions(locale = "fr") {
  const ui = getDiagnosticUi(locale)
  return diagnosticFieldOrder.map((key) => ({
    key,
    ...ui.fields[key],
  }))
}

export function createEmptyDiagnosticAnswers() {
  return {
    level: "",
    subject: "",
    goal: "",
    timing: "",
    format: "",
    details: "",
  }
}

export function normalizeLeadDiagnosticAnswers(raw = {}) {
  return {
    level: normalizeDiagnosticOption("level", raw.level),
    subject: normalizeDiagnosticOption("subject", raw.subject),
    goal: normalizeDiagnosticOption("goal", raw.goal),
    timing: normalizeDiagnosticOption("timing", raw.timing),
    format: normalizeDiagnosticOption("format", raw.format),
    details: typeof raw.details === "string" ? raw.details.trim().slice(0, 1000) : "",
  }
}

export function isLeadDiagnosticComplete(answers = {}) {
  const normalized = normalizeLeadDiagnosticAnswers(answers)
  return diagnosticFieldOrder.every((field) =>
    field === "details" ? normalized.details.length >= 10 : Boolean(normalized[field]),
  )
}

export function getDiagnosticAnswerLabel(locale, field, value) {
  const ui = getDiagnosticUi(locale)
  const config = ui.fields[field]

  if (!config || config.type === "textarea") {
    return typeof value === "string" ? value.trim() : ""
  }

  return config.options.find((option) => option.value === value)?.label || ""
}

export function buildLeadDiagnosticInstructions(locale = "fr") {
  if (locale === "en") {
    return [
      "You are writing a short, conversion-oriented intake diagnostic for a Quebec high-school tutoring website.",
      "Audience: parents of Secondary 1 to 5 students in Quebec.",
      "Subjects available: math, science, physics, chemistry, exam prep, catch-up support.",
      "Formats: online across Quebec; in person depending on area and tutor fit.",
      "Pricing context: weekly follow-up 70 CAD/hour, flexible sessions 75 CAD/hour, intensive blocks on request.",
      "Choose recommendedAction as either `call_now` or `book_session`.",
      "`call_now` should be used when the situation is urgent, still vague, high-stakes, or needs quick human triage.",
      "`book_session` should be used when the need is already clear enough to reserve directly.",
      "Do not invent exact tutor availability, guarantees, or outcomes.",
      "Keep every field concise, calm, practical, and parent-friendly.",
    ].join(" ")
  }

  return [
    "Vous rédigez un court diagnostic d'intake orienté conversion pour un site de tutorat secondaire au Québec.",
    "Public: parents d'élèves du secondaire 1 à 5 au Québec.",
    "Matières offertes: maths, sciences, physique, chimie, préparation d'examens, rattrapage.",
    "Formats: en ligne partout au Québec; en personne selon le secteur et le bon profil.",
    "Contexte tarifaire: suivi hebdomadaire 70 $ CAD / h, séance flexible 75 $ CAD / h, blocs intensifs sur demande.",
    "Choisissez `recommendedAction` parmi `call_now` ou `book_session`.",
    "Utilisez `call_now` si la situation est urgente, encore floue, sensible, ou mérite un cadrage humain rapide.",
    "Utilisez `book_session` si le besoin est déjà assez clair pour réserver directement.",
    "N'inventez pas de disponibilités précises, de garanties ni de résultats.",
    "Gardez un ton calme, concret, utile et rassurant pour un parent.",
  ].join(" ")
}

export function buildLeadDiagnosticPrompt(locale, answers) {
  const normalized = normalizeLeadDiagnosticAnswers(answers)
  const details = normalized.details || (locale === "en" ? "No extra details provided." : "Aucun détail supplémentaire fourni.")

  if (locale === "en") {
    return [
      "Create a short parent-facing diagnostic from this intake.",
      `Grade: ${getDiagnosticAnswerLabel(locale, "level", normalized.level)}`,
      `Subject: ${getDiagnosticAnswerLabel(locale, "subject", normalized.subject)}`,
      `Main need: ${getDiagnosticAnswerLabel(locale, "goal", normalized.goal)}`,
      `Timing: ${getDiagnosticAnswerLabel(locale, "timing", normalized.timing)}`,
      `Preferred format: ${getDiagnosticAnswerLabel(locale, "format", normalized.format)}`,
      `Parent details: ${details}`,
      "Be realistic, specific, and commercially useful without sounding pushy.",
    ].join("\n")
  }

  return [
    "Créez un diagnostic court à destination du parent à partir de cet intake.",
    `Niveau: ${getDiagnosticAnswerLabel(locale, "level", normalized.level)}`,
    `Matière: ${getDiagnosticAnswerLabel(locale, "subject", normalized.subject)}`,
    `Besoin principal: ${getDiagnosticAnswerLabel(locale, "goal", normalized.goal)}`,
    `Timing: ${getDiagnosticAnswerLabel(locale, "timing", normalized.timing)}`,
    `Format souhaité: ${getDiagnosticAnswerLabel(locale, "format", normalized.format)}`,
    `Détails parent: ${details}`,
    "Soyez réaliste, précis et utile commercialement sans sonner agressif.",
  ].join("\n")
}

export function buildFallbackLeadDiagnosticResult(locale = "fr", answers = {}) {
  const normalized = normalizeLeadDiagnosticAnswers(answers)
  const ui = getDiagnosticUi(locale)
  const labels = {
    level: getDiagnosticAnswerLabel(locale, "level", normalized.level),
    subject: getDiagnosticAnswerLabel(locale, "subject", normalized.subject),
    goal: getDiagnosticAnswerLabel(locale, "goal", normalized.goal),
    timing: getDiagnosticAnswerLabel(locale, "timing", normalized.timing),
    format: getDiagnosticAnswerLabel(locale, "format", normalized.format),
  }

  const isUrgent = normalized.timing === "this-week"
  const isExam = normalized.goal === "exam-prep"
  const isUnclear = normalized.goal === "unsure" || normalized.subject === "unsure" || normalized.format === "either"
  const recommendedAction = isUrgent || isExam || isUnclear ? "call_now" : "book_session"
  const recommendedActionLabel = ui.actions[recommendedAction]

  let recommendedService = ""

  if (locale === "en") {
    if (normalized.goal === "weekly") {
      recommendedService = "weekly follow-up"
    } else if (normalized.goal === "catch-up") {
      recommendedService = isUrgent ? "a quick diagnostic call followed by a catch-up session" : "a structured catch-up session"
    } else if (isExam) {
      recommendedService = isUrgent ? "a fast call plus a targeted exam-prep session" : "a targeted exam-prep session"
    } else {
      recommendedService = "a 15-minute diagnostic call"
    }
  } else {
    if (normalized.goal === "weekly") {
      recommendedService = "un suivi hebdomadaire"
    } else if (normalized.goal === "catch-up") {
      recommendedService = isUrgent ? "un appel diagnostic rapide suivi d'une séance de remise à niveau" : "une séance de remise à niveau structurée"
    } else if (isExam) {
      recommendedService = isUrgent ? "un appel rapide puis une séance ciblée examen" : "une séance ciblée de préparation d'examen"
    } else {
      recommendedService = "un appel diagnostic de 15 minutes"
    }
  }

  if (locale === "en") {
    return {
      headline: isUrgent ? "This looks time-sensitive." : "The situation already points to a clear next move.",
      summary: `${labels.level} in ${labels.subject} looks closest to ${labels.goal.toLowerCase()}. The timing is ${labels.timing.toLowerCase()}, and the preferred format is ${labels.format.toLowerCase()}.`,
      recommendedAction,
      recommendedActionLabel,
      recommendedService,
      actionReason:
        recommendedAction === "call_now"
          ? "A quick human triage is the fastest way to sort the priority, pace and best format."
          : "The need already looks clear enough to reserve a session without much extra triage.",
      reasons: [
        `${labels.level} and ${labels.subject} suggest a fairly targeted academic need rather than a vague general request.`,
        `The timing (${labels.timing.toLowerCase()}) changes how fast the support should start.`,
        `The preferred format (${labels.format.toLowerCase()}) still leaves a practical path to move quickly.`,
      ],
      nextSteps: [
        "Have the latest chapter, exam date or recent mark ready before the first exchange.",
        recommendedAction === "call_now"
          ? "Use the phone call to confirm the exact priority and decide whether the first move is a diagnostic call or a focused session."
          : "Book the first session and mention the exact chapter, exam or skill gap in the request.",
        "Keep the first goal short and concrete: one chapter, one exam window, or one recurring problem pattern.",
      ],
      suggestedMessage: `Hello, we are looking for support in ${labels.subject.toLowerCase()} for ${labels.level}. The need feels closest to ${labels.goal.toLowerCase()}, ideally ${labels.timing.toLowerCase()}, with ${labels.format.toLowerCase()}. What is blocking the most right now: ${normalized.details}`,
    }
  }

  return {
    headline: isUrgent ? "La situation semble sensible dans le temps." : "Le besoin pointe déjà vers une suite assez claire.",
    summary: `Pour ${labels.level} en ${labels.subject.toLowerCase()}, le besoin ressemble surtout à ${labels.goal.toLowerCase()}. Le timing est ${labels.timing.toLowerCase()} et le format souhaité est ${labels.format.toLowerCase()}.`,
    recommendedAction,
    recommendedActionLabel,
    recommendedService,
    actionReason:
      recommendedAction === "call_now"
        ? "Un cadrage humain rapide est le moyen le plus efficace pour trier la priorité, le rythme et le bon format."
        : "Le besoin semble déjà assez clair pour réserver directement une première séance.",
    reasons: [
      `${labels.level} et ${labels.subject.toLowerCase()} pointent vers un besoin assez précis, pas seulement une demande générale.`,
      `Le timing (${labels.timing.toLowerCase()}) change la vitesse à laquelle le soutien doit commencer.`,
      `Le format souhaité (${labels.format.toLowerCase()}) laisse une voie pratique pour avancer rapidement.`,
    ],
    nextSteps: [
      "Préparez le dernier chapitre bloquant, la date d'examen ou la note la plus récente avant le premier échange.",
      recommendedAction === "call_now"
        ? "Utilisez l'appel pour confirmer la vraie priorité et décider si la première étape est un diagnostic ou une séance ciblée."
        : "Réservez la première séance et indiquez clairement le chapitre, l'examen ou la compétence qui bloque.",
      "Gardez un premier objectif court et concret: un chapitre, une fenêtre d'examen ou un type de problème récurrent.",
    ],
    suggestedMessage: `Bonjour, nous cherchons un accompagnement en ${labels.subject.toLowerCase()} pour ${labels.level}. Le besoin ressemble surtout à ${labels.goal.toLowerCase()}, idéalement ${labels.timing.toLowerCase()}, plutôt ${labels.format.toLowerCase()}. Ce qui bloque le plus en ce moment: ${normalized.details}`,
  }
}

export function buildLeadDiagnosticClipboardText(locale, result) {
  const ui = getDiagnosticUi(locale)

  return [
    result.headline,
    "",
    result.summary,
    "",
    `${ui.actions[result.recommendedAction]}: ${result.recommendedService}`,
    result.actionReason,
    "",
    `${ui.nextStepsTitle}:`,
    ...result.nextSteps.map((step) => `- ${step}`),
    "",
    `${ui.messageTitle}:`,
    result.suggestedMessage,
  ].join("\n")
}

function getOptionValuesByField() {
  const frFields = diagnosticUiByLocale.fr.fields

  return Object.fromEntries(
    diagnosticFieldOrder
      .filter((field) => frFields[field].type === "options")
      .map((field) => [field, new Set(frFields[field].options.map((option) => option.value))]),
  )
}

const optionValuesByField = getOptionValuesByField()

function normalizeDiagnosticOption(field, value) {
  if (typeof value !== "string") {
    return ""
  }

  const normalized = value.trim()
  return optionValuesByField[field]?.has(normalized) ? normalized : ""
}
