export const offerRouteKeys = ["examSprint", "weeklyFollowUp"]

export const offerPageConfigs = {
  examSprint: {
    fr: {
      eyebrow: "Sprint examen",
      heroTitle: "Sprint examen : remettre la révision en ordre avant que le temps manque",
      heroText:
        "Quand l'examen approche, le vrai besoin n'est pas seulement de faire plus d'exercices. Il faut surtout choisir les bons chapitres, calmer la confusion et redonner une direction nette à la révision.",
      seoTitle: "Sprint examen secondaire | Méthode Secondaire",
      seoDescription:
        "Sprint examen en maths et sciences au secondaire au Québec : priorités claires, séances ciblées, plan de révision utile et accompagnement rapide avant l'évaluation.",
      keywords:
        "sprint examen secondaire, préparation examen maths, préparation examen sciences, tutorat avant examen, révision secondaire québec",
      highlights: [
        "Pensé pour les examens proches en maths, sciences, physique ou chimie.",
        "Utile quand il faut prioriser vite au lieu de réviser au hasard.",
        "Peut commencer par un appel court ou une séance ciblée selon l'urgence.",
      ],
      fitEyebrow: "Quand ce format aide le plus",
      fitTitle: "Le Sprint examen n'est pas un simple bloc d'heures. C'est un format d'urgence utile.",
      fitDescription:
        "Ce format sert surtout quand une famille a besoin de clarté très vite, sans perdre du temps dans une révision trop large.",
      fitCards: [
        {
          title: "Examen proche",
          description:
            "Le sprint est fort quand l'évaluation arrive dans les prochains jours ou les deux prochaines semaines.",
        },
        {
          title: "Chapitre flou ou mélange",
          description:
            "Il aide quand l'élève ne sait plus par où recommencer entre plusieurs notions ou plusieurs types de questions.",
        },
        {
          title: "Stress qui monte vite",
          description:
            "Il fonctionne bien quand la famille veut un plan de priorités concret avant que la panique prenne toute la place.",
        },
      ],
      processEyebrow: "Comment ça marche",
      processTitle: "Un Sprint examen utile en 3 étapes",
      processSteps: [
        {
          step: "01",
          title: "Trier ce qui compte vraiment",
          description:
            "On repère les chapitres prioritaires, les erreurs qui reviennent et les points qui peuvent rapporter le plus vite.",
        },
        {
          step: "02",
          title: "Réexpliquer avec une logique claire",
          description:
            "On remet la matière dans le bon ordre avec une démarche simple, pour que l'élève sache enfin quoi faire devant les questions.",
        },
        {
          step: "03",
          title: "Pratiquer comme l'examen l'exige",
          description:
            "On choisit des formats de questions vraiment utiles, avec vérification, priorités de révision et suite recommandée.",
        },
      ],
      includedEyebrow: "Ce que la famille gagne",
      includedTitle: "Plus de structure, moins de panique",
      includedItems: [
        "Une meilleure vision de ce qu'il faut réviser maintenant.",
        "Une méthode plus nette pour attaquer les questions d'examen.",
        "Un plan plus calme pour la semaine ou les jours qui restent.",
        "Une meilleure décision entre appeler, réserver ou continuer en suivi.",
      ],
      faq: [
        {
          question: "Combien de séances faut-il pour un Sprint examen ?",
          answer:
            "Cela dépend du niveau de confusion et du temps restant. Parfois une seule séance très ciblée aide déjà à remettre les priorités en ordre. Quand plusieurs chapitres sont fragiles, un petit bloc intensif est plus utile.",
        },
        {
          question: "Le Sprint examen est-il seulement pour les maths ?",
          answer:
            "Non. Le format fonctionne aussi en sciences, physique et chimie, tant que le besoin principal est de clarifier vite, pratiquer utilement et arriver plus prêt à l'évaluation.",
        },
        {
          question: "Faut-il appeler ou réserver directement ?",
          answer:
            "Si la situation est encore floue ou très urgente, l'appel est souvent le meilleur premier pas. Si la matière et le chapitre sont déjà clairs, la réservation directe fonctionne très bien.",
        },
      ],
      relatedLinks: [
        { routeKey: "weeklyFollowUp", label: "Suivi hebdomadaire" },
        { routeKey: "mathExamPrep", label: "Guide examen maths" },
        { routeKey: "scienceExamPrep", label: "Guide examen sciences" },
        { routeKey: "maths", label: "Page maths" },
        { routeKey: "sciences", label: "Page sciences" },
      ],
      ctaTitle: "L'examen approche et la révision manque encore d'ordre ?",
      ctaText:
        "Le plus utile est souvent de clarifier la situation rapidement, puis de choisir entre un appel, une séance ciblée ou un mini bloc intensif.",
      formTitle: "Préférer expliquer la situation d'abord ?",
      formText:
        "Le formulaire peut partir plus vite si vous utilisez d'abord le diagnostic. Sinon, expliquez simplement la matière, l'examen et l'urgence.",
    },
    en: {
      eyebrow: "Exam sprint",
      heroTitle: "Exam sprint: put the review plan back in order before time runs out",
      heroText:
        "When the exam is close, the real need is rarely just more exercises. Families usually need sharper priorities, clearer explanations and a calmer plan for the days that remain.",
      seoTitle: "Exam sprint for high school students | Methode Secondaire",
      seoDescription:
        "Exam sprint support for high school math and science in Quebec: clear priorities, focused sessions, useful review structure and fast support before the test.",
      keywords:
        "exam sprint tutoring, math exam prep quebec, science exam help quebec, urgent tutoring before exam, high school review support",
      highlights: [
        "Built for nearby exams in math, science, physics or chemistry.",
        "Best when the student needs priorities instead of random revision.",
        "Can start with a short call or a focused session depending on urgency.",
      ],
      fitEyebrow: "When this format helps most",
      fitTitle: "The Exam sprint is not just extra hours. It is a useful urgent format.",
      fitDescription:
        "This format is strongest when a family needs clarity quickly and cannot afford broad, unfocused revision anymore.",
      fitCards: [
        {
          title: "A nearby exam",
          description:
            "The sprint works best when the test is coming up in the next few days or the next two weeks.",
        },
        {
          title: "Blurred or mixed chapters",
          description:
            "It helps when the student no longer knows where to restart across multiple chapters or question types.",
        },
        {
          title: "Stress rising fast",
          description:
            "It is a strong fit when the family wants a concrete plan before panic starts driving the week.",
        },
      ],
      processEyebrow: "How it works",
      processTitle: "A useful exam sprint in 3 steps",
      processSteps: [
        {
          step: "01",
          title: "Sort what matters most",
          description:
            "We identify the highest-priority chapters, repeated mistakes and the points that can move fastest.",
        },
        {
          step: "02",
          title: "Rebuild the logic clearly",
          description:
            "We put the subject back in the right order so the student finally knows what to do when the question appears.",
        },
        {
          step: "03",
          title: "Practice the way the exam demands",
          description:
            "We choose question formats that actually matter, then close with verification, review priorities and recommended next steps.",
        },
      ],
      includedEyebrow: "What the family gains",
      includedTitle: "More structure, less panic",
      includedItems: [
        "A sharper view of what needs to be reviewed now.",
        "A clearer method for handling exam questions.",
        "A calmer plan for the remaining days or week.",
        "A better decision between calling, booking or continuing with follow-up support.",
      ],
      faq: [
        {
          question: "How many sessions does an Exam sprint usually need?",
          answer:
            "It depends on the current confusion level and the time left. Sometimes one focused session is already enough to reorganize the review. When several chapters are weak, a short intensive block helps more.",
        },
        {
          question: "Is the Exam sprint only for math?",
          answer:
            "No. It also works well for science, physics and chemistry whenever the main need is to clarify quickly, practice usefully and arrive more prepared.",
        },
        {
          question: "Should families call first or book directly?",
          answer:
            "If the situation is still fuzzy or highly urgent, calling first is often the best move. If the subject and chapter are already clear, direct booking works very well.",
        },
      ],
      relatedLinks: [
        { routeKey: "weeklyFollowUp", label: "Weekly follow-up" },
        { routeKey: "mathExamPrep", label: "Math exam prep guide" },
        { routeKey: "scienceExamPrep", label: "Science exam prep guide" },
        { routeKey: "maths", label: "Math tutoring page" },
        { routeKey: "sciences", label: "Science tutoring page" },
      ],
      ctaTitle: "Is the exam close and the review plan still messy?",
      ctaText:
        "The most useful next step is often to clarify the situation quickly, then decide between a call, a focused session or a short intensive block.",
      formTitle: "Prefer to explain the situation first?",
      formText:
        "The form becomes even faster after the diagnostic. Otherwise, simply describe the subject, the exam and the urgency level.",
    },
  },
  weeklyFollowUp: {
    fr: {
      eyebrow: "Suivi hebdomadaire",
      heroTitle: "Suivi hebdomadaire : installer une progression stable avant que tout recommence à zéro",
      heroText:
        "Quand le besoin n'est pas seulement un examen proche, le vrai levier est souvent un rythme clair, une méthode suivie et un espace régulier pour corriger les blocages avant qu'ils s'installent.",
      seoTitle: "Suivi hebdomadaire secondaire | Méthode Secondaire",
      seoDescription:
        "Suivi hebdomadaire en maths et sciences au secondaire au Québec : appel d'abord, rythme clair, méthode durable et progression visible semaine après semaine.",
      keywords:
        "suivi hebdomadaire tutorat secondaire, tutorat régulier maths, tutorat régulier sciences, soutien scolaire semaine après semaine, tutorat secondaire québec",
      serviceType: "Tutorat hebdomadaire au secondaire",
      showBookingButton: false,
      callLabel: "Appeler pour discuter",
      heroNote:
        "Cette page est pensée pour les familles qui veulent un vrai suivi régulier. Ici, l'appel vient avant toute réservation.",
      highlights: [
        "Pensé pour les élèves qui ont besoin d'un cadre régulier, pas seulement d'un coup de pouce ponctuel.",
        "Très utile quand les notions s'accumulent ou que la méthode manque encore de stabilité.",
        "L'appel de départ sert à choisir le bon rythme, la bonne matière prioritaire et le bon format.",
      ],
      fitEyebrow: "Quand ce format aide le plus",
      fitTitle: "Le Suivi hebdomadaire aide surtout quand il faut installer une vraie continuité.",
      fitDescription:
        "Le point fort ici n'est pas d'ajouter des heures au hasard. C'est de créer une logique de progression qui tient entre les séances, les devoirs et les évaluations.",
      fitCards: [
        {
          title: "Les notions s'empilent",
          description:
            "Le format est fort quand les chapitres s'accumulent et qu'un seul rendez-vous ponctuel ne suffit plus à remettre l'élève d'aplomb.",
        },
        {
          title: "Le stress revient chaque semaine",
          description:
            "Il aide quand le parent sent que la même confusion revient d'un devoir à l'autre ou d'une évaluation à l'autre.",
        },
        {
          title: "Il faut une méthode plus stable",
          description:
            "Il fonctionne bien quand la famille veut une base durable, pas seulement une réparation rapide avant la prochaine échéance.",
        },
      ],
      processEyebrow: "Comment ça marche",
      processTitle: "Un suivi hebdomadaire utile en 3 étapes",
      processSteps: [
        {
          step: "01",
          title: "Appel de cadrage",
          description:
            "On clarifie la matière prioritaire, le niveau actuel, le vrai point de blocage et le rythme réaliste avant de fixer la suite.",
        },
        {
          step: "02",
          title: "Premières semaines structurées",
          description:
            "On installe une continuité simple : quoi revoir, quoi pratiquer et comment éviter que les mêmes erreurs reviennent.",
        },
        {
          step: "03",
          title: "Ajuster sans repartir à zéro",
          description:
            "Le suivi permet d'ajuster les priorités selon les chapitres, les devoirs et les examens sans perdre le fil du travail déjà fait.",
        },
      ],
      includedEyebrow: "Ce que la famille gagne",
      includedTitle: "Plus de continuité, moins de rechutes",
      includedItems: [
        "Un rythme clair au lieu de décisions prises à la dernière minute.",
        "Des priorités stables entre devoirs, chapitres et examens.",
        "Une meilleure lecture des progrès et des blocages.",
        "Moins de rechutes parce que la méthode se construit semaine après semaine.",
      ],
      faq: [
        {
          question: "Pourquoi appeler avant de réserver ?",
          answer:
            "Parce qu'un vrai suivi régulier doit être cadré dès le départ : matière prioritaire, fréquence réaliste, urgence actuelle et format le plus utile. L'appel évite de réserver à l'aveugle.",
        },
        {
          question: "À partir de quand le suivi hebdomadaire devient-il utile ?",
          answer:
            "Dès que le parent voit que les mêmes difficultés reviennent, que les chapitres commencent à s'empiler ou qu'un élève a besoin d'une méthode plus stable d'une semaine à l'autre.",
        },
        {
          question: "Peut-on commencer en maths puis élargir aux sciences ?",
          answer:
            "Oui. L'appel sert justement à décider s'il faut commencer par une seule matière ou répartir l'énergie entre maths, sciences, physique ou chimie selon la période.",
        },
      ],
      relatedLinks: [
        { routeKey: "examSprint", label: "Sprint examen" },
        { routeKey: "maths", label: "Page maths" },
        { routeKey: "sciences", label: "Page sciences" },
        { routeKey: "temoignages", label: "Témoignages" },
        { routeKey: "tuteurs", label: "Profils tuteurs" },
      ],
      ctaTitle: "Vous sentez que le vrai besoin est de ne plus repartir à zéro chaque semaine ?",
      ctaText:
        "Le plus utile est souvent de parler d'abord du rythme, de la matière prioritaire et du niveau d'urgence, puis de décider ensemble si le Suivi hebdomadaire est le bon format.",
      formTitle: "Préférer expliquer la situation d'abord ?",
      formText:
        "Expliquez simplement la matière, le niveau, ce qui se répète d'une semaine à l'autre et ce que vous voulez stabiliser.",
    },
    en: {
      eyebrow: "Weekly follow-up",
      heroTitle: "Weekly follow-up: build stable progress before every week starts from zero again",
      heroText:
        "When the need is not just one nearby exam, the real lever is often a clear rhythm, a repeatable method and regular space to fix the academic blocks before they settle in.",
      seoTitle: "Weekly follow-up tutoring | Methode Secondaire",
      seoDescription:
        "Weekly high school tutoring in math and science across Quebec: call first, set the right rhythm, build a durable method and make progress easier to read week after week.",
      keywords:
        "weekly tutoring high school, recurring math tutoring quebec, recurring science tutoring quebec, weekly academic support, long term tutoring quebec",
      serviceType: "Weekly high school tutoring",
      showBookingButton: false,
      callLabel: "Call to discuss",
      heroNote:
        "This page is built for families who want real recurring support. Here, the phone call comes before any booking.",
      highlights: [
        "Built for students who need a steady framework, not just one more isolated tutoring hour.",
        "Especially useful when chapters are piling up or the student's method still feels unstable.",
        "The first call is there to choose the right rhythm, the right priority subject and the right format.",
      ],
      fitEyebrow: "When this format helps most",
      fitTitle: "Weekly follow-up helps most when the real need is continuity.",
      fitDescription:
        "The strength here is not adding random hours. It is creating a progression logic that holds between sessions, homework and evaluations.",
      fitCards: [
        {
          title: "The material keeps piling up",
          description:
            "This format is strongest when chapters keep stacking and one isolated session is no longer enough to reset the student properly.",
        },
        {
          title: "Stress keeps coming back",
          description:
            "It helps when the family sees the same confusion returning from one homework cycle or test to the next.",
        },
        {
          title: "A steadier method is needed",
          description:
            "It works well when the goal is a durable academic base, not just a quick repair before the next deadline.",
        },
      ],
      processEyebrow: "How it works",
      processTitle: "Useful weekly follow-up in 3 steps",
      processSteps: [
        {
          step: "01",
          title: "A framing call first",
          description:
            "We clarify the priority subject, the student's current level, the real academic block and the most realistic rhythm before anything is scheduled.",
        },
        {
          step: "02",
          title: "Structured first weeks",
          description:
            "We create simple continuity: what to review, what to practice and how to stop the same mistakes from returning.",
        },
        {
          step: "03",
          title: "Adjust without starting over",
          description:
            "The follow-up lets us adjust priorities across chapters, homework and exams without losing the thread of what has already been built.",
        },
      ],
      includedEyebrow: "What the family gains",
      includedTitle: "More continuity, fewer setbacks",
      includedItems: [
        "A clear rhythm instead of last-minute decisions.",
        "Stable priorities across homework, chapters and exams.",
        "Progress and academic blocks that are easier to read at home.",
        "Fewer relapses because the method is built week after week.",
      ],
      faq: [
        {
          question: "Why should families call before booking?",
          answer:
            "Because recurring support needs to be framed properly from the start: priority subject, realistic frequency, current urgency and the format most likely to help. The call avoids blind booking.",
        },
        {
          question: "When does weekly follow-up become worth it?",
          answer:
            "As soon as the same difficulties keep coming back, chapters start piling up or the student clearly needs a steadier method from one week to the next.",
        },
        {
          question: "Can we start with math and later expand into science?",
          answer:
            "Yes. The call is there to decide whether one subject should lead first or whether effort should be shared across math, science, physics or chemistry for the current period.",
        },
      ],
      relatedLinks: [
        { routeKey: "examSprint", label: "Exam sprint" },
        { routeKey: "maths", label: "Math tutoring page" },
        { routeKey: "sciences", label: "Science tutoring page" },
        { routeKey: "temoignages", label: "Testimonials" },
        { routeKey: "tuteurs", label: "Tutor profiles" },
      ],
      ctaTitle: "Do you feel the real need is to stop starting from zero every week?",
      ctaText:
        "The most useful next step is often to talk first about the rhythm, the priority subject and the urgency level, then decide together whether Weekly follow-up is the right format.",
      formTitle: "Prefer to explain the situation first?",
      formText:
        "Simply describe the subject, the level, what keeps repeating from week to week and what you want to stabilize.",
    },
  },
}

export function getOfferPageConfig(routeKey, locale = "fr") {
  return offerPageConfigs[routeKey]?.[locale] || null
}
