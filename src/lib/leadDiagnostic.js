import { getOffer, pricing } from "@/lib/pricing"

const diagnosticFieldOrder = ["goal", "timing", "level", "subject", "details"]

function getOrientationCallDetails(locale = "fr") {
  return locale === "en" ? "a quick call with the team" : "un appel rapide avec l’équipe"
}

function getFirstSessionDetails(locale = "fr") {
  const offer = getOffer("targeted_session")
  return locale === "en"
    ? `Targeted session · $${offer.totalPriceCad} CAD / ${offer.durationMinutes} min`
    : `Séance ciblée · ${offer.totalPriceCad} $ CAD / ${offer.durationMinutes} min`
}

function getFirstSessionAction(locale = "fr") {
  return locale === "en"
    ? "Request the right starting point"
    : "Demander le bon point de départ"
}

function getProgressionBlockDetails(locale = "fr") {
  const block = getOffer("progression_block")
  return locale === "en"
    ? `Progress block · $${block.totalPriceCad} total (${block.installmentCount} payments of $${block.installmentPriceCad})`
    : `Bloc de progression · ${block.sessionCount} séances · ${block.totalPriceCad} $ au total (${block.installmentCount} paiements de ${block.installmentPriceCad} $)`
}

const frenchPricingContext = `Offres publiques : ${getFirstSessionDetails("fr")} pour un besoin ponctuel, ou ${getProgressionBlockDetails("fr")} (60 $ par séance, 2 paiements de 300 $, cadence confirmée après le jumelage, sans renouvellement automatique). Avec un préavis d’au moins ${pricing.cancellation.noticeHours} h, le report est garanti. Plus tard, l’équipe cherche une solution selon les disponibilités; ne promettez jamais une pénalité, une perte de crédit ou un remboursement automatique.`
const englishPricingContext = `Public offers: ${getFirstSessionDetails("en")} for a one-off need, or ${getProgressionBlockDetails("en")} ($60 per session, 2 payments of $300, cadence confirmed after matching, with no automatic renewal). With at least ${pricing.cancellation.noticeHours} hours’ notice, rescheduling is guaranteed. Later requests are handled by the team based on availability; never promise an automatic penalty, lost credit, or refund.`

export { diagnosticFieldOrder }

export const diagnosticUiByLocale = {
  fr: {
    launchEyebrow: "Mini-bilan d’orientation · 2 min",
    launchTitle: "Vous ne savez pas quel premier pas choisir ?",
    launchDescription:
      "Décrivez simplement ce que vous observez. Ce mini-bilan de 2 minutes propose un premier pas, mais il n’est jamais requis avant un appel.",
    launchBullets: [
      "Ce n’est ni un test ni une évaluation pour votre jeune.",
      `Vous pouvez appeler directement pour un ${getOrientationCallDetails("fr").toLowerCase()}, sans faire le mini-bilan.`,
      `Si le besoin est déjà précis, la ${getFirstSessionDetails("fr").toLowerCase()} est la première séance de tutorat proposée.`,
    ],
    launchButton: "Faire le mini-bilan (2 min)",
    launchSecondary: "Appeler sans faire le mini-bilan",
    modeChat: "Questions",
    modeDiagnostic: "Mini-bilan",
    modeBadge: "2 min",
    introTitle: "Mini-bilan d’orientation — 2 min",
    introDescription:
      "Répondez selon ce que vous observez. Ce n’est pas un test : nous indiquons simplement le premier pas à privilégier. Vous pouvez aussi nous appeler directement, sans le remplir.",
    stepLabel: "Étape",
    back: "Retour",
    next: "Continuer",
    submit: "Voir le premier pas conseillé",
    analyzing: "Préparation de votre mini-bilan...",
    restart: "Recommencer",
    edit: "Modifier mes réponses",
    resultEyebrow: "Votre premier pas conseillé",
    resultTitle: "Ce qu'on prioriserait d'abord",
    summaryTitle: "Ce que votre situation indique",
    reasonsTitle: "Pourquoi cette orientation",
    nextStepsTitle: "Suite recommandée",
    messageTitle: "Résumé prêt à réutiliser",
    copySummary: "Copier le résumé",
    copied: "Résumé copié",
    limitedMode: "Mini-bilan d’orientation simplifié",
    primaryActionLabel: "À privilégier d’abord",
    secondaryActionLabel: "Autre option, si vous préférez",
    actions: {
      call_now: "Appeler si la situation est urgente",
      book_session: getFirstSessionAction("fr"),
    },
    fields: {
      level: {
        label: "Quel niveau fréquente votre jeune ?",
        description: "Cela nous aide à situer le chapitre et le rythme sans le faire passer par une évaluation.",
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
        label: "Quelle matière prend le plus de place en ce moment ?",
        description: "Choisissez celle qui revient le plus dans les devoirs, les notes ou les discussions à la maison.",
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
        label: "Qu'est-ce qui vous préoccupe le plus en ce moment ?",
        description: "Il n'y a pas de mauvaise réponse : choisissez ce qui ressemble le plus à votre réalité aujourd'hui.",
        type: "options",
        options: [
          { value: "exam-prep", label: "Une évaluation approche et on veut un plan calme" },
          { value: "weekly", label: "Les devoirs deviennent lourds chaque semaine" },
          { value: "catch-up", label: "Les notions ou les résultats s'accumulent" },
          { value: "independence", label: "Il ou elle comprend quand on explique, mais bloque seul" },
          { value: "unsure", label: "Je sens que ça décroche, sans savoir exactement pourquoi" },
        ],
      },
      timing: {
        label: "À quel moment faut-il bouger ?",
        description: "L'urgence nous aide à vous proposer le chemin le plus simple, pas à vous presser.",
        type: "options",
        options: [
          { value: "this-week", label: "Cette semaine — on a besoin de reprendre le contrôle" },
          { value: "two-weeks", label: "Dans les 2 prochaines semaines" },
          { value: "this-month", label: "Ce mois-ci" },
          { value: "flexible", label: "Pas urgent — je veux surtout y voir clair" },
        ],
      },
      details: {
        label: "Vous voulez ajouter un détail ?",
        description: "Facultatif. Une phrase sur le chapitre, l'examen ou ce qui se passe à la maison suffit. N'écrivez pas le nom complet de votre jeune ni de renseignements scolaires sensibles.",
        type: "textarea",
        required: false,
        placeholder:
          "Ex. examen dans 10 jours, fonctions encore floues, l'élève comprend en classe mais bloque seul devant les problèmes.",
      },
    },
  },
  en: {
    launchEyebrow: "2-minute orientation check-in",
    launchTitle: "Not sure which first step to choose?",
    launchDescription:
      "Simply describe what you are noticing. This two-minute check-in suggests a first step, but it is never required before a call.",
    launchBullets: [
      "It is not a test or an assessment for your teen.",
      `You can call directly for a ${getOrientationCallDetails("en").toLowerCase()}, without completing this check-in.`,
      `When the need is already specific, the ${getFirstSessionDetails("en")} is the first tutoring session offered.`,
    ],
    launchButton: "Do the 2-minute check-in",
    launchSecondary: "Call without the check-in",
    modeChat: "Questions",
    modeDiagnostic: "Check-in",
    modeBadge: "2 min",
    introTitle: "Orientation check-in — 2 min",
    introDescription:
      "Answer based on what you are noticing. This is not a test: it simply points to the first step to prioritize. You can always call directly instead.",
    stepLabel: "Step",
    back: "Back",
    next: "Continue",
    submit: "See the suggested first step",
    analyzing: "Preparing your orientation check-in...",
    restart: "Start again",
    edit: "Edit answers",
    resultEyebrow: "Your suggested first step",
    resultTitle: "What we would prioritize first",
    summaryTitle: "What your situation suggests",
    reasonsTitle: "Why this direction",
    nextStepsTitle: "Recommended next steps",
    messageTitle: "Summary ready to reuse",
    copySummary: "Copy summary",
    copied: "Summary copied",
    limitedMode: "Simplified orientation check-in",
    primaryActionLabel: "Start here",
    secondaryActionLabel: "Another option, if you prefer",
    actions: {
      call_now: "Call if the situation is urgent",
      book_session: getFirstSessionAction("en"),
    },
    fields: {
      level: {
        label: "What grade is your teen in?",
        description: "This helps us place the chapter and pace without putting your teen through an assessment.",
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
        label: "Which subject is taking up the most space right now?",
        description: "Choose the one that comes up most in homework, marks, or conversations at home.",
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
        label: "What is worrying you most right now?",
        description: "There is no wrong answer. Choose what feels closest to your reality today.",
        type: "options",
        options: [
          { value: "exam-prep", label: "An evaluation is coming and we want a calm plan" },
          { value: "weekly", label: "Homework feels heavy every week" },
          { value: "catch-up", label: "Concepts or marks keep piling up" },
          { value: "independence", label: "They understand when helped, but freeze on their own" },
          { value: "unsure", label: "I sense they are slipping, but cannot yet say why" },
        ],
      },
      timing: {
        label: "When does this need to move?",
        description: "Urgency helps us suggest the simplest path, not pressure you.",
        type: "options",
        options: [
          { value: "this-week", label: "This week — we need to regain control" },
          { value: "two-weeks", label: "Within the next 2 weeks" },
          { value: "this-month", label: "This month" },
          { value: "flexible", label: "Not urgent — I mainly want clarity" },
        ],
      },
      details: {
        label: "Would you like to add a detail?",
        description: "Optional. One sentence about the chapter, exam, or what is happening at home is enough. Do not include your teen's full name or sensitive school records.",
        type: "textarea",
        required: false,
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
  return diagnosticUiByLocale[locale] || diagnosticUiByLocale.fr
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
  return ["goal", "timing", "level", "subject"].every((field) => Boolean(normalized[field]))
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
  if (locale === "fr") {
    return [
      "Vous rédigez un court mini-bilan d’orientation pour un site de tutorat secondaire au Québec.",
      "Public: parents d'\u00E9l\u00E8ves du secondaire 1 \u00E0 5 au Qu\u00E9bec.",
      "Mati\u00E8res offertes: maths, sciences, physique, chimie, pr\u00E9paration d'examens, rattrapage.",
      "Formats: en ligne partout au Qu\u00E9bec; en personne selon le secteur et le bon profil.",
      frenchPricingContext,
      "Choisissez `recommendedAction` parmi `call_now` ou `book_session`.",
      "Utilisez `call_now` seulement si la situation est urgente, reste floue ou mérite un cadrage humain rapide. Le mini-bilan n’est jamais requis avant cet appel.",
      `Utilisez \`book_session\` si le besoin est clair et non urgent : recommandez ${getProgressionBlockDetails("fr")} pour un besoin récurrent; la cadence est confirmée après le jumelage. Sinon, recommandez ${getFirstSessionDetails("fr")} comme vraie première séance.`,
      "Recommandez un seul premier geste. L’autre choix doit rester une option secondaire, jamais une étape obligatoire.",
      "Ne présentez jamais le mini-bilan comme une évaluation, de l’IA ou une promesse de résultat scolaire.",
      "N'inventez pas de disponibilit\u00E9s pr\u00E9cises, de garanties ni de r\u00E9sultats.",
      "Gardez un ton calme, concret, utile et rassurant pour un parent.",
    ].join(" ")
  }

  if (locale === "en") {
    return [
      "You are writing a short parent-facing orientation check-in for a Quebec high-school tutoring website.",
      "Audience: parents of Secondary 1 to 5 students in Quebec.",
      "Subjects available: math, science, physics, chemistry, exam prep, catch-up support.",
      "Formats: online across Quebec; in person depending on area and tutor fit.",
      englishPricingContext,
      "Choose recommendedAction as either `call_now` or `book_session`.",
      "Use `call_now` only when the situation is urgent, vague, or deserves quick human framing. The check-in is never required before that call.",
      `Use \`book_session\` when the need is clear and not urgent: recommend ${getProgressionBlockDetails("en")} for a recurring need; confirm the cadence after matching. Otherwise recommend ${getFirstSessionDetails("en")} as a real first tutoring session.`,
      "Recommend one first action only. The other choice should remain an optional secondary path, never a required step.",
      "Never present the check-in as an assessment, AI, or a promise of school outcomes.",
      "Do not invent exact tutor availability, guarantees, or outcomes.",
      "Keep every field concise, calm, practical, and parent-friendly.",
    ].join(" ")
  }

  return [
    "Vous rédigez un court mini-bilan d’orientation pour un site de tutorat secondaire au Québec.",
    "Public: parents d'élèves du secondaire 1 à 5 au Québec.",
    "Matières offertes: maths, sciences, physique, chimie, préparation d'examens, rattrapage.",
    "Formats: en ligne partout au Québec; en personne selon le secteur et le bon profil.",
    frenchPricingContext,
    "Choisissez `recommendedAction` parmi `call_now` ou `book_session`.",
    "Utilisez `call_now` si la situation est urgente, encore floue, sensible, ou mérite un cadrage humain rapide. Le mini-bilan n’est jamais requis avant l’appel.",
    `Utilisez \`book_session\` si le besoin est déjà assez clair : ${getProgressionBlockDetails("fr")} pour un besoin récurrent, avec une cadence confirmée après le jumelage; sinon ${getFirstSessionDetails("fr")} comme première séance.`,
    "Recommandez un seul premier geste; l’autre choix reste secondaire et jamais obligatoire.",
    "N'inventez pas de disponibilités précises, de garanties ni de résultats.",
    "Gardez un ton calme, concret, utile et rassurant pour un parent.",
  ].join(" ")
}

export function buildLeadDiagnosticPrompt(locale, answers) {
  const normalized = normalizeLeadDiagnosticAnswers(answers)
  const details = normalized.details || (locale === "en" ? "No extra details provided." : "Aucun détail supplémentaire fourni.")

  if (locale === "en") {
    return [
      "Create a short parent-facing orientation note from this two-minute check-in.",
      `Grade: ${getDiagnosticAnswerLabel(locale, "level", normalized.level)}`,
      `Subject: ${getDiagnosticAnswerLabel(locale, "subject", normalized.subject)}`,
      `Main need: ${getDiagnosticAnswerLabel(locale, "goal", normalized.goal)}`,
      `Timing: ${getDiagnosticAnswerLabel(locale, "timing", normalized.timing)}`,
      `Parent details: ${details}`,
      "Recommend one first action, and keep the other option clearly secondary. Be realistic, specific, and useful without sounding pushy.",
    ].join("\n")
  }

  return [
    "Créez une courte orientation à destination du parent à partir de ce mini-bilan de 2 minutes.",
    `Niveau: ${getDiagnosticAnswerLabel(locale, "level", normalized.level)}`,
    `Matière: ${getDiagnosticAnswerLabel(locale, "subject", normalized.subject)}`,
    `Besoin principal: ${getDiagnosticAnswerLabel(locale, "goal", normalized.goal)}`,
    `Timing: ${getDiagnosticAnswerLabel(locale, "timing", normalized.timing)}`,
    `Détails parent: ${details}`,
    "Recommandez un seul premier geste et gardez l’autre option clairement secondaire. Soyez réaliste, précis et utile sans sonner agressif.",
  ].join("\n")
}

export function buildFallbackLeadDiagnosticResult(locale = "fr", answers = {}) {
  return buildParentFirstStepResult(locale, answers)
}

function buildParentFirstStepResult(locale = "fr", answers = {}) {
  const normalized = normalizeLeadDiagnosticAnswers(answers)
  const ui = getDiagnosticUi(locale)
  const labels = {
    level: getDiagnosticAnswerLabel(locale, "level", normalized.level),
    subject: getDiagnosticAnswerLabel(locale, "subject", normalized.subject),
    goal: getDiagnosticAnswerLabel(locale, "goal", normalized.goal),
    timing: getDiagnosticAnswerLabel(locale, "timing", normalized.timing),
  }
  const isUrgent = normalized.timing === "this-week"
  const isProgressionBlock = normalized.goal === "weekly"
  const isUnclear = normalized.goal === "unsure" || normalized.subject === "unsure"
  const needsConversation = isUrgent || isUnclear
  const recommendedAction = needsConversation ? "call_now" : "book_session"
  const recommendedActionLabel = ui.actions[recommendedAction]
  const firstSession = getFirstSessionDetails(locale)
  const progressionBlock = getProgressionBlockDetails(locale)
  const orientationCall = getOrientationCallDetails(locale)
  const recommendedService = recommendedAction === "call_now"
    ? orientationCall
    : isProgressionBlock
      ? progressionBlock
      : firstSession
  const extraDetail = normalized.details
    ? locale === "en"
      ? ` You also mentioned: ${normalized.details}`
      : ` Vous avez aussi mentionné : ${normalized.details}`
    : ""

  if (locale === "en") {
    const requestSteps = isProgressionBlock
      ? [
          `Request ${progressionBlock}.`,
          "The team confirms the tutor and cadence after matching; weekly is one possible rhythm, not a separate package.",
          "The 10-session block is paid in two $300 installments and does not renew automatically.",
        ]
      : [
          `Request ${firstSession}.`,
          "Bring one chapter, assignment, or evaluation date so the session has a concrete target.",
          "After the session, decide whether to stop or continue only once the priority and fit are clearer; no package is required.",
        ]

    return {
      headline: isUrgent
        ? "You are right to act now."
        : recommendedAction === "call_now"
          ? "A quick call will keep the next step clear."
          : "This is clear enough to start simply.",
      summary: isUrgent
        ? `You do not need to catch up on everything at once. For ${labels.level} ${labels.subject.toLowerCase()}, the first priority is a calm, focused plan for this week.${extraDetail}`
        : `For ${labels.level} ${labels.subject.toLowerCase()}, the main signal is: ${labels.goal.toLowerCase()}. Here is the first step that keeps the decision simple.${extraDetail}`,
      recommendedAction,
      recommendedActionLabel,
      recommendedService,
      requestedOffer: isProgressionBlock ? "progression_block_10" : "first_session_declic",
      actionReason: recommendedAction === "call_now"
        ? "The situation is urgent or still unclear. A quick call lets the team confirm the most useful next step without making the mini-assessment mandatory."
        : isProgressionBlock
          ? `The recurring need is clear enough to request ${progressionBlock} directly; the team still confirms the tutor and cadence before the block begins.`
          : `The need is specific enough for one real tutoring session. ${firstSession} focuses on the blocker before you decide whether any follow-up is useful.`,
      reasons: [
        `You have already identified the grade, subject, and main concern: ${labels.goal.toLowerCase()}.`,
        isUrgent
          ? "Because timing is this week, the fastest useful move is to agree on the first priority with a person."
          : isProgressionBlock
            ? "A short request is enough to start the matching conversation; you do not need to choose the tutor or time on your own."
            : "There is no need to choose a package before seeing what helps most.",
        "The other route remains available if you prefer, but this is the only first step you need to take now.",
      ],
      nextSteps: recommendedAction === "call_now"
        ? [
          "Call us and describe the chapter or date that matters most; this check-in is never required before calling.",
          "Keep the latest assignment, evaluation date, or teacher note nearby if you have it.",
          "The team will confirm the appropriate Targeted session, Momentum block, or Progress block after matching.",
        ]
        : requestSteps,
      suggestedMessage: `Hello, we are looking for support in ${labels.subject.toLowerCase()} for ${labels.level}. What worries us most is: ${labels.goal.toLowerCase()}. Timing: ${labels.timing.toLowerCase()}.${normalized.details ? ` Detail: ${normalized.details}` : ""}`,
    }
  }

  const requestSteps = isProgressionBlock
    ? [
        `Demandez ${progressionBlock.toLowerCase()}.`,
        "L'équipe confirme le tuteur et la cadence après le jumelage; l'hebdomadaire est un rythme possible, pas un forfait distinct.",
        "Le bloc de 10 séances est en deux paiements de 300 $ et ne se renouvelle pas automatiquement.",
      ]
    : [
        `Demandez la première ${firstSession.toLowerCase()}.`,
        "Apportez un chapitre, un devoir ou une date d'évaluation : la séance aura une cible concrète.",
        "Après la séance, décidez de vous arrêter ou de poursuivre seulement une fois la priorité et le fit plus clairs; aucun forfait n'est requis.",
      ]

  return {
    headline: isUrgent
      ? "Vous avez raison d'agir maintenant."
      : recommendedAction === "call_now"
        ? "Un appel rapide gardera le prochain pas clair."
        : "Le besoin est assez clair pour commencer simplement.",
    summary: isUrgent
      ? `Vous n'avez pas à rattraper tout le cours d'un coup. Pour ${labels.level} en ${labels.subject.toLowerCase()}, la première priorité est un plan calme et ciblé cette semaine.${extraDetail}`
      : `Pour ${labels.level} en ${labels.subject.toLowerCase()}, le signal principal est : ${labels.goal.toLowerCase()}. Voici le premier pas qui garde la décision simple.${extraDetail}`,
    recommendedAction,
    recommendedActionLabel,
    recommendedService,
    requestedOffer: isProgressionBlock ? "progression_block_10" : "first_session_declic",
    actionReason: recommendedAction === "call_now"
      ? "La situation est urgente ou reste floue. Un appel rapide permet à l'équipe de confirmer le prochain pas utile sans rendre le mini-bilan obligatoire."
      : isProgressionBlock
        ? `Le besoin récurrent est assez clair pour demander ${progressionBlock.toLowerCase()} directement; l'équipe confirme tout de même le tuteur et la cadence avant le bloc.`
        : `Le besoin est assez précis pour une vraie séance de tutorat. La ${firstSession.toLowerCase()} sert à travailler le blocage avant de décider si un suivi est utile.`,
    reasons: [
      `Vous avez déjà identifié le niveau, la matière et la préoccupation principale : ${labels.goal.toLowerCase()}.`,
      isUrgent
        ? "Comme c'est cette semaine, le mouvement le plus utile est de valider la première priorité avec une personne."
        : isProgressionBlock
          ? "Une courte demande suffit pour démarrer le jumelage; vous n'avez pas à choisir seul le tuteur ou le créneau."
          : "Vous n'avez pas besoin de choisir un forfait avant de voir ce qui aide vraiment.",
      "L’autre chemin reste disponible si vous le préférez, mais c’est le seul premier geste à faire maintenant.",
    ],
    nextSteps: recommendedAction === "call_now"
      ? [
        "Appelez-nous et nommez le chapitre ou la date qui presse le plus; le mini-bilan n’est jamais requis avant l’appel.",
        "Gardez près de vous le dernier devoir, la date d'évaluation ou la note de l'enseignant si vous l'avez.",
        "L'équipe confirmera la Séance ciblée, le Bloc d'élan ou le Bloc de progression approprié après le jumelage.",
      ]
      : requestSteps,
    suggestedMessage: `Bonjour, nous cherchons un accompagnement en ${labels.subject.toLowerCase()} pour ${labels.level}. Ce qui nous inquiète le plus : ${labels.goal.toLowerCase()}. Moment souhaité : ${labels.timing.toLowerCase()}.${normalized.details ? ` Détail : ${normalized.details}` : ""}`,
  }
}

function BuildLegacyFallbackLeadDiagnosticResult(locale = "fr", answers = {}) {
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
  const recommendedAction = normalized.goal === "weekly" || isUnclear ? "call_now" : "book_session"
  const recommendedActionLabel = ui.actions[recommendedAction]

  let recommendedService = ""

  if (locale === "en") {
    if (normalized.goal === "weekly") {
      recommendedService = "a phone call to discuss the 10-session progress block and the possible cadence"
    } else if (normalized.goal === "catch-up") {
      recommendedService = isUrgent ? "a quick diagnostic call followed by a catch-up session" : "a structured catch-up session"
    } else if (isExam) {
      recommendedService = isUrgent ? "a fast call plus a targeted exam-prep session" : "a targeted exam-prep session"
    } else {
      recommendedService = "a 15-minute diagnostic call"
    }
  } else {
    if (normalized.goal === "weekly") {
      recommendedService = "un appel pour discuter du bloc de progression de 10 séances et de la cadence possible"
    } else if (normalized.goal === "catch-up") {
      recommendedService = isUrgent ? "un appel diagnostic rapide suivi d'une séance de remise à niveau" : "une séance de remise à niveau structurée"
    } else if (isExam) {
      recommendedService = isUrgent ? "un appel rapide puis une séance ciblée examen" : "une séance ciblée de préparation d'examen"
    } else {
      recommendedService = "un appel diagnostic de 15 minutes"
    }
  }

  if (locale === "fr") {
    return {
      headline:
        recommendedAction === "call_now"
          ? "Le besoin m\u00E9rite d'abord un vrai \u00E9change."
          : "Le besoin semble assez clair pour une s\u00E9ance cibl\u00E9e.",
      summary: `Pour ${labels.level} en ${labels.subject.toLowerCase()}, le besoin ressemble surtout \u00E0 ${labels.goal.toLowerCase()}. Le timing est ${labels.timing.toLowerCase()} et le format souhait\u00E9 est ${labels.format.toLowerCase()}.`,
      recommendedAction,
      recommendedActionLabel,
      recommendedService,
      actionReason:
        recommendedAction === "call_now"
          ? "Un appel rapide reste le meilleur moyen de cadrer le bloc de progression et sa cadence possible, ou de confirmer le bon format avant d'aller plus loin."
          : "Le besoin semble d\u00E9j\u00E0 assez clair pour une s\u00E9ance ponctuelle et cibl\u00E9e sans longue discussion.",
      reasons: [
        `${labels.level} et ${labels.subject.toLowerCase()} pointent vers un besoin assez pr\u00E9cis, pas seulement une demande g\u00E9n\u00E9rale.`,
        normalized.goal === "weekly"
          ? "Un rythme régulier demande d'abord un cadrage humain sur la cadence, les attentes et le bon bloc."
          : `Le timing (${labels.timing.toLowerCase()}) laisse une voie plus directe si l'objectif est d\u00E9j\u00E0 bien d\u00E9fini.`,
        `Le format souhait\u00E9 (${labels.format.toLowerCase()}) aide \u00E0 choisir entre discussion pr\u00E9alable et s\u00E9ance cibl\u00E9e.`,
      ],
      nextSteps: [
        "Pr\u00E9parez le dernier chapitre bloquant, la date d'examen ou la note la plus r\u00E9cente avant le premier \u00E9change.",
        recommendedAction === "call_now"
          ? "Utilisez l'appel pour décider si le bon format est un bloc de progression, un rattrapage ou une séance ponctuelle ciblée."
          : "R\u00E9servez la s\u00E9ance cibl\u00E9e et indiquez clairement le chapitre, l'examen ou la comp\u00E9tence qui bloque.",
        "Gardez un premier objectif court et concret: un chapitre, une fen\u00EAtre d'examen ou un type de probl\u00E8me r\u00E9current.",
      ],
      suggestedMessage: `Bonjour, nous cherchons un accompagnement en ${labels.subject.toLowerCase()} pour ${labels.level}. Le besoin ressemble surtout \u00E0 ${labels.goal.toLowerCase()}, id\u00E9alement ${labels.timing.toLowerCase()}, plut\u00F4t ${labels.format.toLowerCase()}. Ce qui bloque le plus en ce moment: ${normalized.details}`,
    }
  }

  if (locale === "en") {
    return {
      headline:
        recommendedAction === "call_now"
          ? "This looks like something worth discussing first."
          : "This already looks clear enough for a focused session.",
      summary: `${labels.level} in ${labels.subject} looks closest to ${labels.goal.toLowerCase()}. The timing is ${labels.timing.toLowerCase()}, and the preferred format is ${labels.format.toLowerCase()}.`,
      recommendedAction,
      recommendedActionLabel,
      recommendedService,
      actionReason:
        recommendedAction === "call_now"
          ? "A quick call is the best way to frame the 10-session progress block and its possible cadence, or confirm the right format before moving ahead."
          : "The need already looks clear enough for a focused one-time session without a long discussion first.",
      reasons: [
        `${labels.level} and ${labels.subject} suggest a fairly targeted academic need rather than a vague general request.`,
        normalized.goal === "weekly"
          ? "A regular rhythm works better after a short human conversation about cadence, expectations and fit."
          : `The timing (${labels.timing.toLowerCase()}) still allows a more direct move when the goal is already clear.`,
        `The preferred format (${labels.format.toLowerCase()}) helps choose between a quick discussion first and a focused one-time session.`,
      ],
      nextSteps: [
        "Have the latest chapter, exam date or recent mark ready before the first exchange.",
        recommendedAction === "call_now"
          ? "Use the call to decide whether the right fit is a 10-session progress block, a catch-up plan, or a more targeted one-time session."
          : "Book the focused session and mention the exact chapter, exam or skill gap in the request.",
        "Keep the first goal short and concrete: one chapter, one exam window, or one recurring problem pattern.",
      ],
      suggestedMessage: `Hello, we are looking for support in ${labels.subject.toLowerCase()} for ${labels.level}. The need feels closest to ${labels.goal.toLowerCase()}, ideally ${labels.timing.toLowerCase()}, with ${labels.format.toLowerCase()}. What is blocking the most right now: ${normalized.details}`,
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
