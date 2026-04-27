export const offerRouteKeys = [
  "examSprint",
  "weeklyFollowUp",
  "mathTutoringSecondary",
  "scienceTutorSecondary",
  "homeworkHelpSecondary",
  "academicSupportSecondary",
  "mathTutorMontreal",
  "homeworkHelpMontreal",
  "scienceTutorLaval",
]

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
  mathTutoringSecondary: {
    fr: {
      eyebrow: "Tutorat en mathématiques",
      heroTitle: "Tutorat en mathématiques au secondaire : un tuteur de maths pour remettre la logique en place",
      heroText:
        "Quand un parent cherche du tutorat en mathématiques au secondaire, le vrai besoin n'est pas juste une heure de plus. Il faut souvent un tuteur de maths capable de clarifier la démarche, corriger les erreurs qui reviennent et redonner une méthode qui tient.",
      seoTitle: "Tutorat en mathématiques au secondaire | Méthode Secondaire",
      seoDescription:
        "Tutorat en mathématiques au secondaire 1 à 5 au Québec : tuteur de maths, aide aux devoirs, algèbre, fonctions, géométrie, trigonométrie et préparation d'examens.",
      keywords:
        "tutorat en mathématiques secondaire, tuteur maths secondaire, tutorat maths Québec, aide aux devoirs maths secondaire, soutien scolaire maths",
      serviceType: "Tutorat en mathématiques au secondaire",
      highlights: [
        "Pensé pour les parents qui cherchent un vrai tuteur de maths au secondaire, pas seulement une aide ponctuelle floue.",
        "Utile en algèbre, fonctions, géométrie, trigonométrie, problèmes écrits et préparation d'examens.",
        "Peut commencer par une réservation directe si le besoin est ciblé, ou par un appel si la situation est plus large.",
      ],
      fitEyebrow: "Quand cette page aide le plus",
      fitTitle: "Ce format aide quand il faut remettre de l'ordre dans la matière, la méthode et la confiance.",
      fitDescription:
        "Les recherches autour du tutorat en mathématiques cachent souvent trois besoins: comprendre enfin la logique, ne plus paniquer devant les devoirs et mieux cibler les révisions avant les évaluations.",
      fitCards: [
        {
          title: "Devoirs qui bloquent",
          description:
            "Quand l'élève se retrouve vite coincé, même après le cours, et que les devoirs rallongent sans produire de vraie compréhension.",
        },
        {
          title: "Notions qui se mélangent",
          description:
            "Quand l'algèbre, les fonctions ou la géométrie commencent à se brouiller et que les erreurs reviennent d'une semaine à l'autre.",
        },
        {
          title: "Examens qui approchent",
          description:
            "Quand il faut à la fois revoir la matière, choisir les bons exercices et redonner une démarche utile avant l'évaluation.",
        },
      ],
      processEyebrow: "Comment ça marche",
      processTitle: "Un tutorat en mathématiques utile en 3 étapes",
      processSteps: [
        {
          step: "01",
          title: "Repérer le vrai blocage",
          description:
            "On vérifie si le problème vient de la matière elle-même, de la méthode de travail ou du stress devant certains types de questions.",
        },
        {
          step: "02",
          title: "Réexpliquer avec une démarche claire",
          description:
            "On reconstruit les étapes, les réflexes de vérification et la logique de résolution pour que l'élève puisse refaire seul.",
        },
        {
          step: "03",
          title: "Pratiquer avec les bons formats",
          description:
            "On choisit des exercices et des questions proches du besoin réel: devoirs, chapitre en cours, révision ciblée ou préparation d'examen.",
        },
      ],
      includedEyebrow: "Ce que la famille gagne",
      includedTitle: "Un tuteur de maths qui remet de la lisibilité",
      includedItems: [
        "Une meilleure compréhension des chapitres qui coincent le plus.",
        "Une aide aux devoirs plus utile parce qu'elle s'appuie sur une vraie méthode.",
        "Des priorités plus claires pour les révisions et les évaluations.",
        "Un meilleur choix entre séance ponctuelle, Sprint examen et suivi plus régulier.",
      ],
      faq: [
        {
          question: "Est-ce seulement pour les élèves en difficulté ?",
          answer:
            "Non. Le tutorat en mathématiques aide aussi les élèves qui veulent mieux structurer leur méthode, consolider avant un examen ou éviter qu'une baisse de confiance s'installe.",
        },
        {
          question: "Est-ce que cela ressemble à de l'aide aux devoirs ?",
          answer:
            "Parfois oui, mais l'objectif n'est pas juste de finir les devoirs. Le but est de comprendre la logique, mieux pratiquer et rendre les prochaines questions plus lisibles.",
        },
        {
          question: "Faut-il appeler ou réserver directement ?",
          answer:
            "Si le besoin est ponctuel et déjà bien identifié, la réservation directe peut très bien convenir. Si plusieurs chapitres se mélangent ou que le besoin semble plus large, un appel d'abord est souvent plus utile.",
        },
      ],
      relatedLinks: [
        { routeKey: "maths", label: "Page maths" },
        { routeKey: "homeworkHelpSecondary", label: "Aide aux devoirs secondaire" },
        { routeKey: "academicSupportSecondary", label: "Soutien scolaire secondaire" },
        { routeKey: "examSprint", label: "Sprint examen" },
        { routeKey: "mathExamPrep", label: "Guide examen maths" },
      ],
      ctaTitle: "Vous cherchez un tuteur de maths au secondaire, mais le besoin n'est pas encore parfaitement clair ?",
      ctaText:
        "Le diagnostic ou un court appel permet souvent de voir plus vite s'il faut une séance ciblée, une aide aux devoirs mieux structurée ou un vrai suivi.",
      formTitle: "Décrire rapidement la situation en maths",
      formText:
        "Indiquez le niveau, les chapitres qui coincent, la proximité des examens et si le besoin ressemble plus à une séance ciblée ou à un soutien plus large.",
    },
    en: {
      eyebrow: "Math tutoring",
      heroTitle: "High school math tutoring: a math tutor who can put the logic back in place",
      heroText:
        "When a family searches for high school math tutoring, the real need is rarely just one more hour. They usually need a math tutor who can clarify the process, correct the repeated mistakes and rebuild a method that actually holds.",
      seoTitle: "High school math tutoring in Quebec | Methode Secondaire",
      seoDescription:
        "High school math tutoring across Quebec: math tutor support, homework help, algebra, functions, geometry, trigonometry and exam preparation.",
      keywords:
        "high school math tutoring quebec, high school math tutor, math homework help, private math tutor quebec, secondary math support",
      serviceType: "High school math tutoring",
      highlights: [
        "Built for families looking for a real high school math tutor, not vague extra help.",
        "Useful for algebra, functions, geometry, trigonometry, word problems and exam preparation.",
        "Can start with direct booking when the need is focused, or with a phone call when the situation is broader.",
      ],
      fitEyebrow: "When this page helps most",
      fitTitle: "This format helps when the material, the method and the confidence all need clearer structure.",
      fitDescription:
        "Searches around high school math tutoring often hide three real needs: understanding the logic, reducing panic around homework and choosing sharper priorities before tests.",
      fitCards: [
        {
          title: "Homework keeps stalling",
          description:
            "When the student gets stuck quickly after class and homework stretches longer without producing solid understanding.",
        },
        {
          title: "Concepts start blending together",
          description:
            "When algebra, functions or geometry start blurring together and the same mistakes keep repeating from week to week.",
        },
        {
          title: "Exams are getting close",
          description:
            "When the family needs both content review and a better way to choose the right exercises before the test.",
        },
      ],
      processEyebrow: "How it works",
      processTitle: "Useful high school math tutoring in 3 steps",
      processSteps: [
        {
          step: "01",
          title: "Identify the real block",
          description:
            "We check whether the problem comes from the content itself, the work method or the stress triggered by certain question types.",
        },
        {
          step: "02",
          title: "Rebuild the process clearly",
          description:
            "We reconstruct the steps, verification reflexes and solving logic so the student can reproduce the work alone.",
        },
        {
          step: "03",
          title: "Practice with the right formats",
          description:
            "We choose exercises and question types that actually match the need: homework, the current chapter, focused review or exam prep.",
        },
      ],
      includedEyebrow: "What the family gains",
      includedTitle: "A math tutor who restores readability",
      includedItems: [
        "Clearer understanding of the chapters that keep blocking progress.",
        "Homework help that becomes more useful because it rests on a real method.",
        "Sharper priorities for review and evaluations.",
        "A better decision between a one-time session, an Exam sprint and steadier follow-up.",
      ],
      faq: [
        {
          question: "Is this only for struggling students?",
          answer:
            "No. High school math tutoring also helps students who want stronger structure, better exam preparation or a safer way to prevent confidence from slipping.",
        },
        {
          question: "Does this feel like homework help?",
          answer:
            "Sometimes, but the goal is not just to finish the homework. The goal is to understand the logic, practice better and make the next questions easier to read.",
        },
        {
          question: "Should families call first or book directly?",
          answer:
            "If the need is one-time and already clear, direct booking can work well. If several chapters are mixing together or the situation feels broader, a call first is usually more useful.",
        },
      ],
      relatedLinks: [
        { routeKey: "maths", label: "Math tutoring page" },
        { routeKey: "homeworkHelpSecondary", label: "Homework help" },
        { routeKey: "academicSupportSecondary", label: "Academic support" },
        { routeKey: "examSprint", label: "Exam sprint" },
        { routeKey: "mathExamPrep", label: "Math exam prep guide" },
      ],
      ctaTitle: "Looking for a high school math tutor, but the situation still feels fuzzy?",
      ctaText:
        "The diagnostic or a short phone call often makes it easier to decide whether the next step should be a focused session, stronger homework help or broader follow-up.",
      formTitle: "Describe the math situation quickly",
      formText:
        "Share the grade level, the chapters involved, how close the exams are and whether the need feels more one-time or more structural.",
    },
  },
  scienceTutorSecondary: {
    fr: {
      eyebrow: "Tuteur sciences",
      heroTitle: "Tuteur de sciences au secondaire : comprendre la matière avant de subir les chapitres",
      heroText:
        "Quand une famille cherche un tuteur de sciences au secondaire, le besoin est souvent plus précis qu'il n'en a l'air: physique, chimie, laboratoires, questions à développement, formules, unités ou lecture du problème.",
      seoTitle: "Tuteur de sciences au secondaire | Méthode Secondaire",
      seoDescription:
        "Tuteur de sciences au secondaire 1 à 5 au Québec : tutorat en sciences, physique, chimie, aide aux devoirs, laboratoires et préparation d'examens.",
      keywords:
        "tuteur sciences secondaire, tutorat sciences secondaire, tuteur physique secondaire, aide chimie secondaire, aide aux devoirs sciences",
      serviceType: "Tutorat de sciences au secondaire",
      highlights: [
        "Pensé pour les familles qui cherchent un tuteur de sciences, de physique ou de chimie au secondaire.",
        "Utile pour les chapitres théoriques, les formules, les laboratoires et la façon d'écrire des réponses plus solides.",
        "Peut déboucher sur une séance ciblée, un Sprint examen ou un suivi plus durable selon la période.",
      ],
      fitEyebrow: "Quand cette page aide le plus",
      fitTitle: "Cette page sert quand la science devient une matière floue, lourde ou trop fragmentée.",
      fitDescription:
        "Les recherches autour d'un tuteur de sciences cachent souvent un besoin de clarté conceptuelle, de structure dans les formules et de meilleures réponses devant les évaluations.",
      fitCards: [
        {
          title: "Concepts mal reliés",
          description:
            "Quand l'élève apprend des fragments, mais n'arrive pas à relier phénomènes, unités, formules et explications écrites.",
        },
        {
          title: "Physique ou chimie qui coincent",
          description:
            "Quand une matière plus précise comme la physique ou la chimie commence à tirer la moyenne vers le bas.",
        },
        {
          title: "Questions longues ou labos",
          description:
            "Quand le problème n'est pas juste la formule, mais aussi la lecture, l'organisation de la réponse et la logique scientifique.",
        },
      ],
      processEyebrow: "Comment ça marche",
      processTitle: "Un tutorat de sciences utile en 3 étapes",
      processSteps: [
        {
          step: "01",
          title: "Identifier la matière qui pèse le plus",
          description:
            "On clarifie si le besoin principal vient des sciences générales, de la physique, de la chimie, des laboratoires ou d'un mélange.",
        },
        {
          step: "02",
          title: "Redonner une logique claire aux notions",
          description:
            "On remet en ordre les concepts, les unités, les formules et la façon de lire la question avant d'écrire la réponse.",
        },
        {
          step: "03",
          title: "Pratiquer selon le vrai format évalué",
          description:
            "On travaille avec des exercices proches des devoirs, des évaluations et des attentes réelles du secondaire.",
        },
      ],
      includedEyebrow: "Ce que la famille gagne",
      includedTitle: "Moins de brouillard dans la matière",
      includedItems: [
        "Une meilleure lecture des chapitres qui coincent le plus en sciences.",
        "Une aide plus utile pour les devoirs, les laboratoires et les questions à développement.",
        "Des priorités plus nettes entre sciences générales, physique et chimie.",
        "Un meilleur choix entre séance ciblée, Sprint examen et suivi plus stable.",
      ],
      faq: [
        {
          question: "Est-ce que cette page couvre aussi la physique et la chimie ?",
          answer:
            "Oui. Le tutorat en sciences au secondaire peut viser les sciences générales, la physique, la chimie ou un mélange des trois selon le moment de l'année.",
        },
        {
          question: "Est-ce seulement pour les examens ?",
          answer:
            "Non. Cette page sert aussi quand les devoirs prennent trop de temps, que les notions se fragmentent ou qu'un élève a besoin d'une logique plus claire en cours de chapitre.",
        },
        {
          question: "Faut-il appeler ou réserver directement ?",
          answer:
            "Si le besoin est très ciblé, une réservation directe peut suffire. Si la situation touche plusieurs chapitres ou plusieurs matières, un appel d'abord permet souvent de mieux cadrer la suite.",
        },
      ],
      relatedLinks: [
        { routeKey: "sciences", label: "Page sciences" },
        { routeKey: "physicsHelp", label: "Tuteur physique secondaire" },
        { routeKey: "chemistrySec5", label: "Aide chimie secondaire 5" },
        { routeKey: "homeworkHelpSecondary", label: "Aide aux devoirs secondaire" },
        { routeKey: "examSprint", label: "Sprint examen" },
      ],
      ctaTitle: "Vous cherchez un tuteur de sciences, mais la matière à prioriser n'est pas encore claire ?",
      ctaText:
        "Le diagnostic ou un court appel permet souvent de décider plus vite s'il faut viser les sciences générales, la physique, la chimie ou un mélange.",
      formTitle: "Décrire rapidement le besoin en sciences",
      formText:
        "Indiquez le niveau, la matière exacte si elle est connue, les chapitres qui coincent et si le besoin ressemble plus à des devoirs, à un examen ou à un suivi plus large.",
    },
    en: {
      eyebrow: "Science tutor",
      heroTitle: "High school science tutor: understand the material before the chapters start taking over",
      heroText:
        "When a family searches for a high school science tutor, the need is often more precise than it first sounds: physics, chemistry, labs, long-form answers, formulas, units or how to read the problem well.",
      seoTitle: "High school science tutor in Quebec | Methode Secondaire",
      seoDescription:
        "High school science tutor across Quebec: science tutoring, physics, chemistry, homework help, labs and exam preparation.",
      keywords:
        "high school science tutor quebec, high school science tutoring, physics tutor high school, chemistry help high school, science homework help",
      serviceType: "High school science tutoring",
      highlights: [
        "Built for families looking for a high school science, physics or chemistry tutor.",
        "Useful for theory-heavy chapters, formulas, labs and stronger written scientific answers.",
        "Can lead into a focused session, an Exam sprint or steadier follow-up depending on timing.",
      ],
      fitEyebrow: "When this page helps most",
      fitTitle: "This page helps when science starts feeling blurry, heavy or too fragmented.",
      fitDescription:
        "Searches around a high school science tutor often hide a need for clearer concepts, stronger formula structure and better performance on real evaluation formats.",
      fitCards: [
        {
          title: "Concepts are not connecting",
          description:
            "When the student learns fragments but struggles to connect phenomena, units, formulas and written explanations.",
        },
        {
          title: "Physics or chemistry is slipping",
          description:
            "When a more specific subject such as physics or chemistry starts pulling the average down.",
        },
        {
          title: "Long answers or labs feel weak",
          description:
            "When the problem is not just the formula, but also reading the problem, structuring the answer and using stronger scientific logic.",
        },
      ],
      processEyebrow: "How it works",
      processTitle: "Useful science tutoring in 3 steps",
      processSteps: [
        {
          step: "01",
          title: "Identify the subject that weighs most",
          description:
            "We clarify whether the main need sits in general science, physics, chemistry, labs or a blend of those areas.",
        },
        {
          step: "02",
          title: "Restore clearer logic to the content",
          description:
            "We reorganize the concepts, units, formulas and the way the question is read before the answer is written.",
        },
        {
          step: "03",
          title: "Practice in the real evaluated format",
          description:
            "We work with exercises that actually resemble the student's homework, tests and high school expectations.",
        },
      ],
      includedEyebrow: "What the family gains",
      includedTitle: "Less fog around the subject",
      includedItems: [
        "A clearer read on the science chapters that keep blocking progress.",
        "More useful help for homework, labs and longer response formats.",
        "Sharper priorities across general science, physics and chemistry.",
        "A better choice between a focused session, an Exam sprint and steadier follow-up.",
      ],
      faq: [
        {
          question: "Does this page also cover physics and chemistry?",
          answer:
            "Yes. High school science tutoring can focus on general science, physics, chemistry or a mix of those subjects depending on the time of year and the student's load.",
        },
        {
          question: "Is this only for exams?",
          answer:
            "No. This page also helps when homework is taking too long, the material is fragmenting or the student needs clearer logic in the middle of a chapter.",
        },
        {
          question: "Should families call first or book directly?",
          answer:
            "If the need is highly targeted, direct booking can be enough. If the situation involves several chapters or several science subjects, a phone call first usually frames things better.",
        },
      ],
      relatedLinks: [
        { routeKey: "sciences", label: "Science tutoring page" },
        { routeKey: "physicsHelp", label: "High school physics tutoring" },
        { routeKey: "chemistrySec5", label: "Secondary 5 chemistry help" },
        { routeKey: "homeworkHelpSecondary", label: "Homework help" },
        { routeKey: "examSprint", label: "Exam sprint" },
      ],
      ctaTitle: "Looking for a high school science tutor, but the priority subject still feels unclear?",
      ctaText:
        "The diagnostic or a short phone call often helps families decide faster whether the main need is general science, physics, chemistry or a combination.",
      formTitle: "Describe the science situation quickly",
      formText:
        "Share the grade, the exact subject if known, the chapters involved and whether the situation feels more like homework support, exam help or broader follow-up.",
    },
  },
  homeworkHelpSecondary: {
    fr: {
      eyebrow: "Aide aux devoirs",
      heroTitle: "Aide aux devoirs au secondaire : quand il faut plus qu'un simple coup de main",
      heroText:
        "L'aide aux devoirs au secondaire ne consiste pas seulement à finir ce qui est à remettre. Le vrai besoin est souvent de comprendre plus vite, de mieux s'organiser d'une semaine à l'autre et d'éviter que les devoirs deviennent chaque soir une source de stress.",
      seoTitle: "Aide aux devoirs au secondaire | Méthode Secondaire",
      seoDescription:
        "Aide aux devoirs au secondaire au Québec : maths, sciences, organisation, méthode de travail, compréhension et soutien ciblé selon le niveau.",
      keywords:
        "aide aux devoirs secondaire, aide aux devoirs mathématiques, aide aux devoirs sciences, soutien devoirs secondaire québec, méthode de travail secondaire",
      serviceType: "Aide aux devoirs au secondaire",
      showBookingButton: false,
      callLabel: "Appeler pour cadrer l'aide aux devoirs",
      heroNote:
        "L'aide aux devoirs ressemble souvent à un besoin récurrent. C'est pourquoi un appel d'abord est généralement le meilleur premier pas.",
      highlights: [
        "Pensé pour les élèves qui ont besoin d'un cadre plus clair autour des devoirs, pas seulement d'une réponse rapide.",
        "Très utile quand les soirées deviennent lourdes, que les devoirs s'étirent ou que la méthode manque encore de structure.",
        "L'appel d'abord permet de voir si le besoin relève surtout des maths, des sciences ou d'un soutien plus large.",
      ],
      fitEyebrow: "Quand cette page aide le plus",
      fitTitle: "L'aide aux devoirs devient utile quand le problème revient plusieurs fois par semaine.",
      fitDescription:
        "Cette recherche cache rarement un besoin unique. Elle pointe souvent vers une organisation fragile, des bases mal tenues ou une difficulté à transformer les explications du cours en travail autonome.",
      fitCards: [
        {
          title: "Soirées trop longues",
          description:
            "Quand les devoirs prennent une place disproportionnée dans la soirée et que la fatigue finit par bloquer l'élève autant que la matière.",
        },
        {
          title: "Autonomie fragile",
          description:
            "Quand l'élève comprend un peu en classe, mais n'arrive pas à relancer seul le travail une fois à la maison.",
        },
        {
          title: "Méthode de travail à stabiliser",
          description:
            "Quand il faut plus qu'un tuteur ponctuel: il faut une façon plus stable de lire, planifier, pratiquer et vérifier.",
        },
      ],
      processEyebrow: "Comment ça marche",
      processTitle: "Une aide aux devoirs utile en 3 étapes",
      processSteps: [
        {
          step: "01",
          title: "Voir où les devoirs cassent",
          description:
            "On identifie si le blocage vient surtout de la matière, de l'organisation, de la compréhension des consignes ou d'une accumulation plus large.",
        },
        {
          step: "02",
          title: "Installer une démarche simple",
          description:
            "On remet un peu d'ordre dans la façon d'aborder les devoirs: par quoi commencer, quoi vérifier et comment éviter les pertes de temps.",
        },
        {
          step: "03",
          title: "Relier les devoirs à la progression réelle",
          description:
            "On utilise les devoirs pour consolider la matière et pour mieux préparer la suite, au lieu de survivre d'un soir à l'autre.",
        },
      ],
      includedEyebrow: "Ce que la famille gagne",
      includedTitle: "Des devoirs plus lisibles et moins épuisants",
      includedItems: [
        "Une meilleure organisation des soirées et des priorités.",
        "Une aide utile en maths, sciences ou méthode de travail selon le vrai besoin.",
        "Moins de confusion répétée autour des consignes et des étapes.",
        "Un meilleur pont entre aide aux devoirs, soutien scolaire et suivi hebdomadaire.",
      ],
      faq: [
        {
          question: "Est-ce que cette aide aux devoirs est seulement pour les maths ?",
          answer:
            "Non. Elle peut servir en maths, en sciences ou dans un besoin plus large de méthode de travail, tant que l'objectif est de rendre les devoirs plus clairs et plus productifs.",
        },
        {
          question: "Pourquoi appeler d'abord ?",
          answer:
            "Parce que l'aide aux devoirs ressemble souvent à un besoin récurrent. L'appel permet de décider s'il faut viser une matière précise, un soutien scolaire plus large ou un vrai suivi hebdomadaire.",
        },
        {
          question: "Peut-on quand même réserver une séance ponctuelle ?",
          answer:
            "Oui, si la situation est très ciblée. Mais quand les devoirs posent problème plusieurs fois par semaine, parler d'abord permet souvent de mieux orienter le bon format.",
        },
      ],
      relatedLinks: [
        { routeKey: "academicSupportSecondary", label: "Soutien scolaire secondaire" },
        { routeKey: "weeklyFollowUp", label: "Suivi hebdomadaire" },
        { routeKey: "mathTutoringSecondary", label: "Tutorat en mathématiques" },
        { routeKey: "scienceTutorSecondary", label: "Tuteur de sciences" },
        { routeKey: "catchUp", label: "Rattrapage scolaire secondaire" },
      ],
      ctaTitle: "Les devoirs prennent trop de place et ne donnent pas assez de clarté ?",
      ctaText:
        "Le plus utile est souvent d'expliquer d'abord ce qui coince le soir: matière, consignes, organisation ou accumulation. On peut ensuite décider du bon format.",
      formTitle: "Décrire rapidement le besoin autour des devoirs",
      formText:
        "Indiquez le niveau, les matières concernées, ce qui bloque le plus souvent et si la difficulté se répète d'une semaine à l'autre.",
    },
    en: {
      eyebrow: "Homework help",
      heroTitle: "High school homework help: when the need goes beyond a quick fix",
      heroText:
        "High school homework help is not just about getting an assignment done. The real need is often to understand faster, organize the week better and stop homework from becoming a constant source of evening stress.",
      seoTitle: "High school homework help in Quebec | Methode Secondaire",
      seoDescription:
        "High school homework help across Quebec: math, science, organization, work method, clearer understanding and focused support.",
      keywords:
        "high school homework help quebec, math homework help high school, science homework help, academic homework support, study method high school",
      serviceType: "High school homework help",
      showBookingButton: false,
      callLabel: "Call to frame the homework help",
      heroNote:
        "Homework help often points to a recurring need. That is why a call first is usually the strongest first move.",
      highlights: [
        "Built for students who need clearer structure around homework, not just a quick answer.",
        "Especially useful when evenings feel heavy, homework drags on or the student's method still lacks stability.",
        "A first call helps determine whether the main need sits in math, science or broader academic support.",
      ],
      fitEyebrow: "When this page helps most",
      fitTitle: "Homework help becomes most useful when the problem keeps returning several times a week.",
      fitDescription:
        "This search rarely hides a one-time issue. It often points to fragile organization, shaky foundations or difficulty turning classroom explanations into independent work.",
      fitCards: [
        {
          title: "Evenings are becoming too long",
          description:
            "When homework takes up too much of the evening and fatigue starts blocking progress as much as the subject itself.",
        },
        {
          title: "Independent work is fragile",
          description:
            "When the student partly understands the lesson in class, but cannot restart the work alone once back home.",
        },
        {
          title: "A steadier work method is needed",
          description:
            "When the need is bigger than one isolated tutor session and calls for a clearer way to read, plan, practice and verify.",
        },
      ],
      processEyebrow: "How it works",
      processTitle: "Useful homework help in 3 steps",
      processSteps: [
        {
          step: "01",
          title: "See where homework keeps breaking down",
          description:
            "We identify whether the block sits mostly in the subject, organization, reading the instructions or a wider accumulation problem.",
        },
        {
          step: "02",
          title: "Install a simpler approach",
          description:
            "We restore order to the way homework is handled: what to start with, what to verify and how to avoid losing time.",
        },
        {
          step: "03",
          title: "Reconnect homework with real progress",
          description:
            "We use homework to strengthen the subject and prepare what comes next instead of simply surviving one evening at a time.",
        },
      ],
      includedEyebrow: "What the family gains",
      includedTitle: "Homework that feels clearer and less exhausting",
      includedItems: [
        "Better evening organization and better academic priorities.",
        "More useful help in math, science or work method depending on the real need.",
        "Less repeated confusion around instructions and steps.",
        "A better bridge between homework help, academic support and weekly follow-up.",
      ],
      faq: [
        {
          question: "Is this homework help only for math?",
          answer:
            "No. It can help in math, science or a broader work-method need as long as the goal is to make homework clearer and more productive.",
        },
        {
          question: "Why should families call first?",
          answer:
            "Because homework help often points to a recurring need. The call helps decide whether the right next step is a precise subject focus, broader academic support or true weekly follow-up.",
        },
        {
          question: "Can a family still book a one-time session?",
          answer:
            "Yes, if the situation is highly focused. But when homework keeps causing trouble several times a week, talking first usually leads to a better format choice.",
        },
      ],
      relatedLinks: [
        { routeKey: "academicSupportSecondary", label: "Academic support" },
        { routeKey: "weeklyFollowUp", label: "Weekly follow-up" },
        { routeKey: "mathTutoringSecondary", label: "Math tutoring" },
        { routeKey: "scienceTutorSecondary", label: "Science tutor" },
        { routeKey: "catchUp", label: "Catch-up tutoring" },
      ],
      ctaTitle: "Is homework taking too much space without bringing enough clarity?",
      ctaText:
        "The best next step is often to explain what breaks down in the evening first: the subject, the instructions, the organization or the wider accumulation. From there, the format becomes much easier to choose.",
      formTitle: "Describe the homework situation quickly",
      formText:
        "Share the grade, the subjects involved, what keeps blocking progress and whether the difficulty repeats from one week to the next.",
    },
  },
  academicSupportSecondary: {
    fr: {
      eyebrow: "Soutien scolaire",
      heroTitle: "Soutien scolaire au secondaire : quand il faut une vue plus large que le chapitre du moment",
      heroText:
        "Le soutien scolaire au secondaire devient utile quand la situation dépasse un simple devoir ou un seul examen. Il faut alors voir l'ensemble: les matières qui tirent vers le bas, le rythme réel, les lacunes accumulées et la méthode de travail qui tient ou non.",
      seoTitle: "Soutien scolaire au secondaire | Méthode Secondaire",
      seoDescription:
        "Soutien scolaire au secondaire au Québec : maths, sciences, rattrapage, aide aux devoirs, méthode de travail et suivi plus structuré.",
      keywords:
        "soutien scolaire secondaire, tutorat secondaire québec, rattrapage scolaire secondaire, aide aux devoirs secondaire, suivi scolaire secondaire",
      serviceType: "Soutien scolaire au secondaire",
      showBookingButton: false,
      callLabel: "Appeler pour discuter du soutien scolaire",
      heroNote:
        "Le soutien scolaire ressemble rarement à un besoin ponctuel. Ici, l'appel d'abord reste le meilleur premier pas.",
      highlights: [
        "Pensé pour les familles qui cherchent une vue plus large que du tutorat chapitre par chapitre.",
        "Très utile quand plusieurs matières ou plusieurs semaines de stress commencent à se répondre entre elles.",
        "L'appel de départ sert à choisir le bon point d'entrée: maths, sciences, devoirs, rattrapage ou suivi hebdomadaire.",
      ],
      fitEyebrow: "Quand cette page aide le plus",
      fitTitle: "Le soutien scolaire aide surtout quand il faut remettre de la cohérence dans l'ensemble.",
      fitDescription:
        "Ce type de recherche correspond souvent à une famille qui ne veut plus juste éteindre le feu, mais reprendre la situation avec plus de recul et une meilleure lecture des priorités.",
      fitCards: [
        {
          title: "Plusieurs signaux s'additionnent",
          description:
            "Quand les notes, les devoirs, le stress, les retards ou la perte de confiance commencent à se renforcer les uns les autres.",
        },
        {
          title: "Le besoin touche plus d'une matière",
          description:
            "Quand il faut choisir où mettre l'énergie d'abord entre maths, sciences, physique, chimie ou méthode de travail.",
        },
        {
          title: "Il faut une stratégie plus durable",
          description:
            "Quand la famille cherche moins un dépannage que des décisions plus solides sur le rythme, les priorités et le bon accompagnement.",
        },
      ],
      processEyebrow: "Comment ça marche",
      processTitle: "Un soutien scolaire utile en 3 étapes",
      processSteps: [
        {
          step: "01",
          title: "Cadrer la situation dans son ensemble",
          description:
            "On clarifie les matières concernées, le niveau actuel, le degré d'urgence et ce qui pèse le plus à court terme et à moyen terme.",
        },
        {
          step: "02",
          title: "Choisir le bon point d'entrée",
          description:
            "On décide s'il faut commencer par une matière précise, une aide aux devoirs mieux structurée, un rattrapage ou un vrai suivi hebdomadaire.",
        },
        {
          step: "03",
          title: "Installer une progression lisible",
          description:
            "Le but est que le parent et l'élève puissent mieux lire les priorités, les progrès et les ajustements nécessaires au fil des semaines.",
        },
      ],
      includedEyebrow: "Ce que la famille gagne",
      includedTitle: "Plus de cohérence et de visibilité",
      includedItems: [
        "Une vue plus claire des matières et des priorités qui demandent le plus d'énergie.",
        "Un meilleur pont entre aide aux devoirs, rattrapage, suivi hebdomadaire et séances ciblées.",
        "Des décisions plus solides sur le rythme à installer.",
        "Une progression plus lisible pour le parent comme pour l'élève.",
      ],
      faq: [
        {
          question: "Quelle différence entre soutien scolaire et aide aux devoirs ?",
          answer:
            "L'aide aux devoirs vise surtout le travail du moment et l'organisation de la semaine. Le soutien scolaire prend plus de recul: matières, lacunes, rythme, stratégie et continuité.",
        },
        {
          question: "Pourquoi appeler d'abord ?",
          answer:
            "Parce qu'un besoin de soutien scolaire doit être cadré avant d'être réservé. L'appel aide à choisir la bonne priorité, le bon format et le bon rythme.",
        },
        {
          question: "Peut-on commencer par une matière puis élargir ?",
          answer:
            "Oui. L'appel sert justement à décider si on commence par les maths, les sciences, les devoirs ou un autre point d'appui plus stratégique avant d'élargir.",
        },
      ],
      relatedLinks: [
        { routeKey: "homeworkHelpSecondary", label: "Aide aux devoirs secondaire" },
        { routeKey: "weeklyFollowUp", label: "Suivi hebdomadaire" },
        { routeKey: "catchUp", label: "Rattrapage scolaire secondaire" },
        { routeKey: "mathTutoringSecondary", label: "Tutorat en mathématiques" },
        { routeKey: "scienceTutorSecondary", label: "Tuteur de sciences" },
      ],
      ctaTitle: "Vous sentez que le besoin n'est plus juste un devoir ou un examen isolé ?",
      ctaText:
        "Le plus utile est souvent d'expliquer d'abord l'ensemble de la situation, puis de décider quel point d'entrée offrira le plus de clarté et de soulagement.",
      formTitle: "Décrire rapidement le besoin de soutien scolaire",
      formText:
        "Indiquez le niveau, les matières concernées, ce qui s'accumule le plus et si vous cherchez surtout de la clarté, du rattrapage ou un vrai rythme plus stable.",
    },
    en: {
      eyebrow: "Academic support",
      heroTitle: "High school academic support: when the need is wider than the chapter of the week",
      heroText:
        "High school academic support becomes useful when the situation goes beyond one homework block or one upcoming exam. At that point, the family needs a wider view: which subjects are pulling things down, what the real rhythm looks like, what has accumulated and whether the student's work method is holding.",
      seoTitle: "High school academic support in Quebec | Methode Secondaire",
      seoDescription:
        "High school academic support across Quebec: math, science, catch-up work, homework help, work method and steadier tutoring follow-up.",
      keywords:
        "high school academic support quebec, high school tutoring quebec, catch-up tutoring high school, homework help high school, weekly academic support",
      serviceType: "High school academic support",
      showBookingButton: false,
      callLabel: "Call to discuss academic support",
      heroNote:
        "Academic support rarely points to a one-time need. Here, a phone call first remains the strongest first step.",
      highlights: [
        "Built for families who need a wider view than chapter-by-chapter tutoring.",
        "Especially useful when several subjects or several weeks of stress are starting to reinforce each other.",
        "The first call helps choose the best entry point: math, science, homework help, catch-up work or weekly follow-up.",
      ],
      fitEyebrow: "When this page helps most",
      fitTitle: "Academic support helps most when the family needs coherence across the whole situation.",
      fitDescription:
        "This kind of search often comes from a family that no longer wants to simply put out fires, but wants stronger decisions around priorities, rhythm and support structure.",
      fitCards: [
        {
          title: "Several warning signs are adding up",
          description:
            "When grades, homework, stress, delays or confidence loss start reinforcing each other at the same time.",
        },
        {
          title: "The need touches more than one subject",
          description:
            "When the family needs to choose where to place energy first across math, science, physics, chemistry or work method.",
        },
        {
          title: "A more durable strategy is needed",
          description:
            "When the goal is less emergency repair and more solid decisions around rhythm, priorities and the right support format.",
        },
      ],
      processEyebrow: "How it works",
      processTitle: "Useful academic support in 3 steps",
      processSteps: [
        {
          step: "01",
          title: "Frame the whole situation",
          description:
            "We clarify the subjects involved, the current level, the urgency and what weighs most in the short term and the medium term.",
        },
        {
          step: "02",
          title: "Choose the right entry point",
          description:
            "We decide whether to begin with one subject, stronger homework help, catch-up work or true weekly follow-up.",
        },
        {
          step: "03",
          title: "Install readable progress",
          description:
            "The goal is to help both parent and student read priorities, progress and needed adjustments more clearly over time.",
        },
      ],
      includedEyebrow: "What the family gains",
      includedTitle: "More coherence and more visibility",
      includedItems: [
        "A clearer view of the subjects and priorities demanding the most energy.",
        "A better bridge between homework help, catch-up work, weekly follow-up and focused sessions.",
        "Stronger decisions around the rhythm that should be installed.",
        "Progress that becomes easier to read for both the parent and the student.",
      ],
      faq: [
        {
          question: "What is the difference between academic support and homework help?",
          answer:
            "Homework help mainly serves the work of the moment and the week's organization. Academic support steps back further: subjects, gaps, rhythm, strategy and continuity.",
        },
        {
          question: "Why should families call first?",
          answer:
            "Because an academic support need should be framed before it is booked. The call helps choose the right priority, the right format and the right rhythm.",
        },
        {
          question: "Can we start with one subject and widen later?",
          answer:
            "Yes. The call is there to decide whether math, science, homework help or another support point should lead first before widening the plan.",
        },
      ],
      relatedLinks: [
        { routeKey: "homeworkHelpSecondary", label: "Homework help" },
        { routeKey: "weeklyFollowUp", label: "Weekly follow-up" },
        { routeKey: "catchUp", label: "Catch-up tutoring" },
        { routeKey: "mathTutoringSecondary", label: "Math tutoring" },
        { routeKey: "scienceTutorSecondary", label: "Science tutor" },
      ],
      ctaTitle: "Does it feel like the need is no longer just one homework block or one isolated exam?",
      ctaText:
        "The most useful next step is often to explain the whole picture first, then decide which entry point will create the most clarity and relief.",
      formTitle: "Describe the academic support need quickly",
      formText:
        "Share the grade, the subjects involved, what is piling up most and whether the main goal is clarity, catch-up work or a steadier rhythm.",
    },
  },
  mathTutorMontreal: {
    fr: {
      eyebrow: "Tuteur maths Montréal",
      heroTitle: "Tuteur de maths à Montréal : une porte d'entrée claire pour le secondaire quand il faut avancer vite",
      heroText:
        "Quand un parent cherche un tuteur de maths à Montréal, le vrai besoin est souvent plus précis qu'un simple cours privé. Il faut une explication claire, une logique plus nette et la bonne décision entre réserver directement ou installer un suivi plus stable.",
      seoTitle: "Tuteur maths Montréal au secondaire | Méthode Secondaire",
      seoDescription:
        "Tuteur de maths à Montréal pour le secondaire 1 à 5 : algèbre, fonctions, trigonométrie, aide ciblée, préparation d'examens et réservation directe quand le besoin est clair.",
      keywords:
        "tuteur maths montréal, tutorat maths montréal secondaire, tutorat en mathématiques montréal, aide maths secondaire montréal, préparation examen maths montréal",
      serviceType: "Tutorat en mathématiques à Montréal",
      bookingLabel: "Réserver un tuteur de maths",
      highlights: [
        "Pensé pour les familles de Montréal qui cherchent un tuteur de maths au secondaire avec une approche claire.",
        "Très utile quand le chapitre, le type de question ou l'échéance sont déjà assez bien identifiés.",
        "Compatible avec une réservation directe quand le besoin est ponctuel ou urgent.",
      ],
      fitEyebrow: "Quand cette page aide le plus",
      fitTitle: "Cette page aide surtout quand la famille sait déjà que les maths sont la priorité.",
      fitDescription:
        "Le mot-clé est local, mais le vrai critère reste l'intention. Ici, on vise les parents qui cherchent un tuteur de maths à Montréal avec un besoin déjà assez lisible.",
      fitCards: [
        {
          title: "Chapitre ou matière déjà repéré",
          description:
            "La page est forte quand le parent sait déjà qu'il s'agit surtout d'algèbre, de fonctions, de trigonométrie ou d'un devoir qui tourne en rond.",
        },
        {
          title: "Besoin ponctuel ou urgent",
          description:
            "Elle convient bien quand il faut une aide ciblée rapidement, avant un test, un devoir important ou une période de révision plus serrée.",
        },
        {
          title: "Montréal ou en ligne selon le cas",
          description:
            "Le besoin peut être local autour de Montréal, mais le bon format peut aussi rester en ligne si c'est le plus simple et le plus rapide.",
        },
      ],
      processEyebrow: "Comment ça marche",
      processTitle: "Un tuteur de maths à Montréal, utile en 3 étapes",
      processSteps: [
        {
          step: "01",
          title: "Clarifier le blocage en maths",
          description:
            "On cible ce qui bloque vraiment : type de notion, type de question, manque de méthode ou stress avant l'évaluation.",
        },
        {
          step: "02",
          title: "Réexpliquer avec une logique plus nette",
          description:
            "On remet la matière dans un ordre plus clair pour éviter les explications qui ajoutent encore plus de confusion.",
        },
        {
          step: "03",
          title: "Décider de la suite la plus utile",
          description:
            "Si le besoin est ponctuel, on peut réserver directement. Si les difficultés reviennent, on oriente plutôt vers un suivi plus régulier.",
        },
      ],
      includedEyebrow: "Ce que la famille gagne",
      includedTitle: "Plus de clarté, moins de flottement autour des maths",
      includedItems: [
        "Une aide plus directe sur les maths du secondaire à Montréal.",
        "Une meilleure lecture de ce qui bloque vraiment.",
        "Un bon pont entre séance ciblée, Sprint examen et suivi hebdomadaire.",
        "Une décision plus simple entre appeler d'abord et réserver tout de suite.",
      ],
      faq: [
        {
          question: "Peut-on réserver directement un tuteur de maths à Montréal ?",
          answer:
            "Oui, surtout si la matière et le besoin sont déjà assez clairs. Si la situation reste floue ou se répète souvent, l'appel peut quand même être plus utile au départ.",
        },
        {
          question: "Cette page sert-elle seulement au présentiel à Montréal ?",
          answer:
            "Non. Elle répond à une intention locale, mais le tutorat peut aussi très bien se faire en ligne si cela simplifie la logistique ou accélère le démarrage.",
        },
        {
          question: "Que faire si le besoin touche aussi les sciences ?",
          answer:
            "Si les maths restent la priorité immédiate, cette page est un bon point d'entrée. Sinon, on peut aussi réorienter vers sciences ou un soutien plus large.",
        },
      ],
      relatedLinks: [
        { routeKey: "mathTutoringSecondary", label: "Tutorat en mathématiques secondaire" },
        { routeKey: "montreal", label: "Tutorat Montréal" },
        { routeKey: "examSprint", label: "Sprint examen" },
        { routeKey: "weeklyFollowUp", label: "Suivi hebdomadaire" },
        { routeKey: "sec4Math", label: "Aide maths secondaire 4" },
      ],
      ctaTitle: "Vous cherchez un tuteur de maths à Montréal avec un besoin déjà assez clair ?",
      ctaText:
        "Si la situation est ponctuelle, ciblée ou urgente, la réservation directe peut suffire. Si le parent sent que les difficultés reviennent, l'appel devient souvent le meilleur premier pas.",
      formTitle: "Décrire rapidement le besoin en maths",
      formText:
        "Indiquez le niveau, le chapitre ou le type de difficulté, ainsi que l'urgence ou la date de l'évaluation si elle est connue.",
    },
    en: {
      eyebrow: "Montreal math tutor",
      heroTitle: "Montreal math tutor: a clearer high school entry point when the need is already real",
      heroText:
        "When a parent searches for a Montreal math tutor, the need is often more precise than just private lessons. They usually need clearer explanation, better logic and the right decision between direct booking and steadier follow-up.",
      seoTitle: "Montreal math tutor for high school students | Méthode Secondaire",
      seoDescription:
        "Montreal math tutor for high school students: algebra, functions, trigonometry, focused support, exam prep and direct booking when the need is already clear.",
      keywords:
        "montreal math tutor, high school math tutor montreal, math tutoring montreal quebec, secondary math help montreal, montreal exam prep math",
      serviceType: "High school math tutoring in Montreal",
      bookingLabel: "Book a math tutor",
      highlights: [
        "Built for Montreal-area families looking for a high school math tutor with a clear teaching style.",
        "Most useful when the chapter, question type or deadline is already fairly easy to identify.",
        "Works well with direct booking when the need is one-time or urgent.",
      ],
      fitEyebrow: "When this page helps most",
      fitTitle: "This page helps most when the family already knows math is the priority.",
      fitDescription:
        "The keyword is local, but the real filter is still intent. This page is for families looking for a Montreal math tutor with a need that already feels fairly readable.",
      fitCards: [
        {
          title: "The math problem is already identified",
          description:
            "This page is strongest when the family already knows the issue sits in algebra, functions, trigonometry or a homework/test pattern that keeps repeating.",
        },
        {
          title: "The need feels one-time or urgent",
          description:
            "It fits well when the student needs focused help quickly before a test, a major assignment or a tighter review period.",
        },
        {
          title: "Montreal-based or online, depending on fit",
          description:
            "The search intent is local to Montreal, but the best format may still be online when it is faster or simpler to start.",
        },
      ],
      processEyebrow: "How it works",
      processTitle: "A useful Montreal math tutor page in 3 steps",
      processSteps: [
        {
          step: "01",
          title: "Clarify the real math block",
          description:
            "We identify whether the main issue is the concept itself, the question type, the method or the stress around evaluation.",
        },
        {
          step: "02",
          title: "Rebuild the logic more clearly",
          description:
            "We put the material back in a clearer order so the explanation removes confusion instead of adding more.",
        },
        {
          step: "03",
          title: "Choose the right next move",
          description:
            "If the need is focused, direct booking may be enough. If the difficulty keeps returning, a steadier follow-up usually makes more sense.",
        },
      ],
      includedEyebrow: "What the family gains",
      includedTitle: "More clarity and less drift around math support",
      includedItems: [
        "A more direct Montreal entry point for high school math help.",
        "A better reading of what is actually blocking progress.",
        "A stronger bridge between focused sessions, exam sprint support and weekly follow-up.",
        "A simpler decision between calling first and booking right away.",
      ],
      faq: [
        {
          question: "Can families book a Montreal math tutor directly?",
          answer:
            "Yes, especially when the subject and need are already clear. If the situation is still fuzzy or repeats often, calling first can still be more useful.",
        },
        {
          question: "Is this page only for in-person tutoring in Montreal?",
          answer:
            "No. It answers a local search intent, but the tutoring can still happen online when that is the simplest and fastest fit.",
        },
        {
          question: "What if the student also needs science help?",
          answer:
            "If math is still the immediate priority, this page remains a strong entry point. Otherwise, we can redirect toward science or wider academic support.",
        },
      ],
      relatedLinks: [
        { routeKey: "mathTutoringSecondary", label: "High school math tutoring" },
        { routeKey: "montreal", label: "Montreal tutoring" },
        { routeKey: "examSprint", label: "Exam sprint" },
        { routeKey: "weeklyFollowUp", label: "Weekly follow-up" },
        { routeKey: "sec4Math", label: "Secondary 4 math help" },
      ],
      ctaTitle: "Looking for a Montreal math tutor and the need is already fairly clear?",
      ctaText:
        "If the situation is focused, one-time or urgent, direct booking may already be enough. If the family senses the same difficulty keeps returning, a phone call often becomes the better first move.",
      formTitle: "Describe the math need quickly",
      formText:
        "Share the grade, chapter or difficulty type, plus the urgency or test date if you already know it.",
    },
  },
  homeworkHelpMontreal: {
    fr: {
      eyebrow: "Aide aux devoirs Montréal",
      heroTitle: "Aide aux devoirs à Montréal au secondaire : quand les soirs deviennent trop lourds et trop flous",
      heroText:
        "Quand un parent cherche de l'aide aux devoirs à Montréal pour le secondaire, le besoin cache souvent plus qu'une seule feuille à terminer. Il faut souvent remettre de l'ordre dans la compréhension, l'organisation de la semaine et la façon d'attaquer les devoirs sans se noyer.",
      seoTitle: "Aide aux devoirs Montréal au secondaire | Méthode Secondaire",
      seoDescription:
        "Aide aux devoirs à Montréal pour le secondaire : maths, sciences, organisation, méthode de travail et accompagnement plus clair quand les devoirs s'accumulent.",
      keywords:
        "aide aux devoirs montréal secondaire, aide aux devoirs secondaire montréal, tutorat devoirs montréal, soutien devoirs maths montréal, soutien scolaire montréal secondaire",
      serviceType: "Aide aux devoirs au secondaire à Montréal",
      showBookingButton: false,
      callLabel: "Appeler pour cadrer l'aide aux devoirs",
      heroNote:
        "Quand la recherche tourne autour de l'aide aux devoirs, l'appel d'abord reste souvent le meilleur choix pour voir si le besoin est ponctuel, récurrent ou plus large.",
      highlights: [
        "Pensé pour les familles de Montréal qui cherchent une aide aux devoirs plus structurée au secondaire.",
        "Très utile quand les soirs sont lourds, que les consignes restent floues ou que l'autonomie n'est pas encore stable.",
        "L'appel de départ aide à choisir entre aide aux devoirs, soutien scolaire plus large et suivi hebdomadaire.",
      ],
      fitEyebrow: "Quand cette page aide le plus",
      fitTitle: "Cette page aide surtout quand les devoirs révèlent un problème qui se répète.",
      fitDescription:
        "Ici, l'intention est souvent locale et très concrète. Le parent ne cherche pas juste un nom de service, mais une façon plus respirable de traverser les devoirs au secondaire.",
      fitCards: [
        {
          title: "Les devoirs prennent toute la soirée",
          description:
            "La page est forte quand la charge du soir s'étire trop, fatigue tout le monde et n'apporte pas assez de vraie compréhension.",
        },
        {
          title: "L'élève ne repart pas seul",
          description:
            "Elle aide bien quand l'élève comprend un peu en classe, mais ne sait plus comment redémarrer seul devant les devoirs à la maison.",
        },
        {
          title: "Il faut mieux orienter le bon format",
          description:
            "Le besoin peut rester local à Montréal, mais la vraie décision porte surtout sur le bon format: aide aux devoirs, soutien plus large ou suivi semaine après semaine.",
        },
      ],
      processEyebrow: "Comment ça marche",
      processTitle: "Une aide aux devoirs à Montréal utile en 3 étapes",
      processSteps: [
        {
          step: "01",
          title: "Voir où les devoirs cassent",
          description:
            "On repère si le blocage vient surtout de la matière, de l'organisation, des consignes ou d'une accumulation plus large.",
        },
        {
          step: "02",
          title: "Remettre une méthode plus simple",
          description:
            "On clarifie quoi commencer, quoi vérifier et comment retrouver un rythme plus respirable le soir.",
        },
        {
          step: "03",
          title: "Choisir la suite la plus cohérente",
          description:
            "Selon la situation, on reste sur une aide aux devoirs, on élargit vers un soutien scolaire ou on installe un suivi régulier.",
        },
      ],
      includedEyebrow: "Ce que la famille gagne",
      includedTitle: "Des devoirs plus clairs et moins épuisants",
      includedItems: [
        "Une porte d'entrée locale plus directe pour l'aide aux devoirs à Montréal.",
        "Une meilleure compréhension de ce qui bloque vraiment le soir.",
        "Un meilleur pont entre devoirs, méthode de travail et soutien scolaire.",
        "Une décision plus nette sur le bon format à installer ensuite.",
      ],
      faq: [
        {
          question: "Pourquoi ne pas réserver directement ?",
          answer:
            "Parce que l'aide aux devoirs ressemble souvent à un besoin récurrent. L'appel permet de voir s'il faut rester sur les devoirs du moment ou cadrer quelque chose de plus stable.",
        },
        {
          question: "Cette page sert-elle seulement à Montréal ?",
          answer:
            "Elle répond à une recherche locale Montréal, mais le service peut aussi être donné en ligne si cela sert mieux le rythme de la famille.",
        },
        {
          question: "L'aide aux devoirs peut-elle couvrir maths et sciences ?",
          answer:
            "Oui, tant que le besoin principal reste lié aux devoirs, à la compréhension ou à l'organisation. Si une matière devient clairement prioritaire, on peut resserrer ensuite.",
        },
      ],
      relatedLinks: [
        { routeKey: "homeworkHelpSecondary", label: "Aide aux devoirs secondaire" },
        { routeKey: "academicSupportSecondary", label: "Soutien scolaire secondaire" },
        { routeKey: "weeklyFollowUp", label: "Suivi hebdomadaire" },
        { routeKey: "montreal", label: "Tutorat Montréal" },
        { routeKey: "mathTutorMontreal", label: "Tuteur maths Montréal" },
      ],
      ctaTitle: "Les devoirs du secondaire prennent trop de place le soir à Montréal ?",
      ctaText:
        "Le meilleur premier pas est souvent d'expliquer d'abord ce qui bloque le plus souvent: la matière, l'organisation, les consignes ou la répétition des mêmes difficultés.",
      formTitle: "Décrire rapidement le besoin autour des devoirs à Montréal",
      formText:
        "Indiquez le niveau, les matières concernées, ce qui ralentit le plus les soirées et si la difficulté revient presque chaque semaine.",
    },
    en: {
      eyebrow: "Montreal homework help",
      heroTitle: "Montreal homework help for high school students: when evenings feel too heavy and too unclear",
      heroText:
        "When a parent searches for Montreal homework help at the high school level, the need usually hides more than one worksheet. The real job is often to restore understanding, weekly organization and a clearer way to handle homework without everyone drowning in it.",
      seoTitle: "Montreal homework help for high school students | Méthode Secondaire",
      seoDescription:
        "Montreal homework help for high school students: math, science, organization, study method and clearer support when homework keeps piling up.",
      keywords:
        "montreal homework help high school, homework help montreal secondary, montreal tutoring homework help, study support montreal, academic support montreal high school",
      serviceType: "High school homework help in Montreal",
      showBookingButton: false,
      callLabel: "Call to frame the homework help",
      heroNote:
        "When the search revolves around homework help, calling first is usually the strongest move to see whether the need is one-time, recurring or wider.",
      highlights: [
        "Built for Montreal-area families looking for more structured homework help at the high school level.",
        "Especially useful when evenings feel heavy, instructions remain blurry or independent work is still fragile.",
        "The first call helps decide between homework help, broader academic support and weekly follow-up.",
      ],
      fitEyebrow: "When this page helps most",
      fitTitle: "This page helps most when homework is revealing a problem that keeps repeating.",
      fitDescription:
        "The intent here is often local and very concrete. The parent is not just searching for a service label, but for a more breathable way to get through high school homework.",
      fitCards: [
        {
          title: "Homework is taking the whole evening",
          description:
            "This page is strongest when the evening load stretches too long, drains everyone and still does not create enough real understanding.",
        },
        {
          title: "The student cannot restart alone",
          description:
            "It helps when the student partly understands class, but no longer knows how to restart alone once facing homework at home.",
        },
        {
          title: "The next format choice matters",
          description:
            "The search is local to Montreal, but the real decision is still about format: homework help, wider academic support or week-to-week follow-up.",
        },
      ],
      processEyebrow: "How it works",
      processTitle: "Useful Montreal homework help in 3 steps",
      processSteps: [
        {
          step: "01",
          title: "See where homework keeps breaking down",
          description:
            "We identify whether the block sits mostly in the subject, the organization, the instructions or a wider accumulation issue.",
        },
        {
          step: "02",
          title: "Rebuild a simpler method",
          description:
            "We clarify what to start with, what to verify and how to recover a more breathable evening rhythm.",
        },
        {
          step: "03",
          title: "Choose the most coherent next step",
          description:
            "Depending on the situation, the right fit may stay as homework help, widen into academic support or turn into recurring follow-up.",
        },
      ],
      includedEyebrow: "What the family gains",
      includedTitle: "Homework that feels clearer and less exhausting",
      includedItems: [
        "A more direct local entry point for Montreal homework help.",
        "A better reading of what is actually slowing down the evenings.",
        "A stronger bridge between homework, study method and academic support.",
        "A clearer decision about the format that should follow.",
      ],
      faq: [
        {
          question: "Why not book directly?",
          answer:
            "Because homework help often points to a recurring need. The phone call helps decide whether the family should stay focused on current homework or frame something more stable.",
        },
        {
          question: "Is this page only for Montreal families?",
          answer:
            "It answers a Montreal-local search, but the service can still be delivered online if that fits the family rhythm better.",
        },
        {
          question: "Can homework help cover both math and science?",
          answer:
            "Yes, as long as the main need still sits in homework, understanding or organization. If one subject becomes clearly dominant, the support can tighten around it afterward.",
        },
      ],
      relatedLinks: [
        { routeKey: "homeworkHelpSecondary", label: "Homework help" },
        { routeKey: "academicSupportSecondary", label: "Academic support" },
        { routeKey: "weeklyFollowUp", label: "Weekly follow-up" },
        { routeKey: "montreal", label: "Montreal tutoring" },
        { routeKey: "mathTutorMontreal", label: "Montreal math tutor" },
      ],
      ctaTitle: "Is high school homework taking too much space in the evening in Montreal?",
      ctaText:
        "The best first move is often to explain what keeps breaking down most: the subject, the organization, the instructions or the repetition of the same difficulty.",
      formTitle: "Describe the homework situation in Montreal quickly",
      formText:
        "Share the grade, the subjects involved, what slows the evening down most and whether the same difficulty comes back almost every week.",
    },
  },
  scienceTutorLaval: {
    fr: {
      eyebrow: "Tuteur sciences Laval",
      heroTitle: "Tuteur de sciences à Laval : une page plus directe pour les familles qui veulent comprendre avant l'examen",
      heroText:
        "Quand la recherche porte sur un tuteur de sciences à Laval, le besoin est souvent déjà ciblé: sciences, physique ou chimie au secondaire, avec des notions qui restent trop abstraites ou des questions qui ne se structurent pas bien.",
      seoTitle: "Tuteur sciences Laval au secondaire | Méthode Secondaire",
      seoDescription:
        "Tuteur de sciences à Laval pour le secondaire : sciences, physique, chimie, laboratoires, questions à développement et préparation d'examens avec une méthode claire.",
      keywords:
        "tuteur sciences laval, tutorat sciences laval secondaire, tuteur physique laval, aide chimie laval secondaire, préparation examen sciences laval",
      serviceType: "Tutorat en sciences à Laval",
      bookingLabel: "Réserver un tuteur de sciences",
      highlights: [
        "Pensé pour les familles de Laval qui cherchent un tuteur de sciences au secondaire avec une approche claire.",
        "Très utile quand la priorité est déjà identifiée entre sciences, physique, chimie ou préparation d'examen.",
        "Compatible avec une réservation directe si le besoin est ponctuel et bien cadré.",
      ],
      fitEyebrow: "Quand cette page aide le plus",
      fitTitle: "Cette page aide surtout quand la famille sait déjà que les sciences sont le vrai point de friction.",
      fitDescription:
        "Le besoin est local à Laval, mais la vraie valeur de la page est ailleurs: rendre plus simple la décision d'entrer par une aide en sciences plutôt que par une page trop générale.",
      fitCards: [
        {
          title: "Notions abstraites ou labo flou",
          description:
            "La page est forte quand les notions, les formules, les unités ou les explications de labo restent trop abstraites pour l'élève.",
        },
        {
          title: "Besoin ponctuel ou examen proche",
          description:
            "Elle convient bien quand la famille veut une aide ciblée avant une évaluation, un chapitre difficile ou une période de révision plus dense.",
        },
        {
          title: "Laval ou en ligne selon le meilleur format",
          description:
            "La recherche est locale à Laval, mais le bon format peut rester en ligne si cela donne plus de rapidité et de souplesse.",
        },
      ],
      processEyebrow: "Comment ça marche",
      processTitle: "Un tuteur de sciences à Laval utile en 3 étapes",
      processSteps: [
        {
          step: "01",
          title: "Clarifier la matière prioritaire",
          description:
            "On cible si la priorité porte sur sciences générales, physique, chimie, laboratoires ou questions à développement.",
        },
        {
          step: "02",
          title: "Remettre la logique scientifique en place",
          description:
            "On reconnecte notions, formules, unités et explications pour rendre les réponses plus nettes et plus sûres.",
        },
        {
          step: "03",
          title: "Décider si le besoin reste ciblé ou doit s'élargir",
          description:
            "Si la matière est bien cernée, la séance ciblée peut suffire. Sinon, on oriente vers un format plus large ou plus régulier.",
        },
      ],
      includedEyebrow: "Ce que la famille gagne",
      includedTitle: "Des sciences plus lisibles et moins intimidantes",
      includedItems: [
        "Une porte d'entrée locale plus claire pour un tuteur de sciences à Laval.",
        "Une meilleure lecture de la matière réellement prioritaire.",
        "Un bon pont entre séance ciblée, Sprint examen et soutien plus large.",
        "Une décision plus simple entre réserver directement et appeler d'abord.",
      ],
      faq: [
        {
          question: "Peut-on réserver directement un tuteur de sciences à Laval ?",
          answer:
            "Oui, surtout si la matière et le chapitre sont déjà clairs. Si le parent hésite encore entre sciences, physique, chimie ou un besoin plus large, l'appel peut mieux orienter la suite.",
        },
        {
          question: "Cette page couvre-t-elle physique et chimie ?",
          answer:
            "Oui. La recherche peut commencer par sciences, mais la page est aussi pensée pour physique, chimie, laboratoires et préparation d'examen.",
        },
        {
          question: "Le service doit-il être donné à Laval en présentiel ?",
          answer:
            "Pas forcément. La page vise une recherche locale Laval, mais le tutorat peut aussi très bien se faire en ligne si c'est le format le plus simple et le plus cohérent.",
        },
      ],
      relatedLinks: [
        { routeKey: "scienceTutorSecondary", label: "Tuteur de sciences secondaire" },
        { routeKey: "laval", label: "Tutorat Laval" },
        { routeKey: "examSprint", label: "Sprint examen" },
        { routeKey: "weeklyFollowUp", label: "Suivi hebdomadaire" },
        { routeKey: "chemistrySec5", label: "Aide chimie secondaire 5" },
      ],
      ctaTitle: "Vous cherchez un tuteur de sciences à Laval avec une matière déjà assez claire ?",
      ctaText:
        "Si le besoin est ponctuel ou urgent, la réservation directe peut aller très vite. Si la famille hésite encore sur la matière ou le bon rythme, l'appel reste plus stratégique.",
      formTitle: "Décrire rapidement le besoin en sciences",
      formText:
        "Indiquez le niveau, la matière prioritaire, le type de difficulté et la date d'évaluation si elle est déjà connue.",
    },
    en: {
      eyebrow: "Laval science tutor",
      heroTitle: "Laval science tutor: a more direct page for families who want understanding before the exam",
      heroText:
        "When the search is for a Laval science tutor, the need is often already focused: high school science, physics or chemistry, with concepts that still feel too abstract or answers that are not structuring well.",
      seoTitle: "Laval science tutor for high school students | Méthode Secondaire",
      seoDescription:
        "Laval science tutor for high school students: science, physics, chemistry, labs, long-form answers and exam preparation with a clear method.",
      keywords:
        "laval science tutor, high school science tutor laval, physics tutor laval, chemistry help laval high school, science exam prep laval",
      serviceType: "High school science tutoring in Laval",
      bookingLabel: "Book a science tutor",
      highlights: [
        "Built for Laval-area families looking for a high school science tutor with clearer explanations.",
        "Most useful when the priority is already visible across science, physics, chemistry or exam prep.",
        "Fits direct booking well when the need is focused and readable.",
      ],
      fitEyebrow: "When this page helps most",
      fitTitle: "This page helps most when the family already knows science is the real friction point.",
      fitDescription:
        "The need is local to Laval, but the real value of the page is simpler orientation: a sharper science entry point instead of a page that stays too general.",
      fitCards: [
        {
          title: "Abstract concepts or unclear lab logic",
          description:
            "This page is strongest when concepts, formulas, units or lab explanations still feel too abstract for the student.",
        },
        {
          title: "A focused need or a nearby exam",
          description:
            "It fits well when the family wants targeted help before an evaluation, a difficult chapter or a denser review period.",
        },
        {
          title: "Laval-local search, online if that works better",
          description:
            "The intent is local to Laval, but the best format can still be online when that creates more speed and flexibility.",
        },
      ],
      processEyebrow: "How it works",
      processTitle: "A useful Laval science tutor page in 3 steps",
      processSteps: [
        {
          step: "01",
          title: "Clarify the priority science need",
          description:
            "We identify whether the immediate focus sits in general science, physics, chemistry, labs or long-form questions.",
        },
        {
          step: "02",
          title: "Rebuild the scientific logic clearly",
          description:
            "We reconnect concepts, formulas, units and explanations so answers become clearer and more reliable.",
        },
        {
          step: "03",
          title: "Decide whether the need stays focused or should widen",
          description:
            "If the material is well identified, a focused session may be enough. If not, the support can widen into a larger or steadier format.",
        },
      ],
      includedEyebrow: "What the family gains",
      includedTitle: "Science support that feels clearer and less intimidating",
      includedItems: [
        "A clearer local entry point for a Laval science tutor.",
        "A better reading of which subject is actually the priority.",
        "A strong bridge between focused sessions, exam sprint support and wider tutoring.",
        "A simpler decision between direct booking and calling first.",
      ],
      faq: [
        {
          question: "Can families book a Laval science tutor directly?",
          answer:
            "Yes, especially when the subject and chapter are already clear. If the family is still hesitating between science, physics, chemistry or a wider need, a call can orient things better.",
        },
        {
          question: "Does this page also cover physics and chemistry?",
          answer:
            "Yes. The search may start with science, but the page is also designed for physics, chemistry, lab logic and exam preparation.",
        },
        {
          question: "Does the tutoring need to happen in Laval in person?",
          answer:
            "Not necessarily. The page targets a Laval-local search intent, but the tutoring can still happen online if that is the most coherent format.",
        },
      ],
      relatedLinks: [
        { routeKey: "scienceTutorSecondary", label: "High school science tutor" },
        { routeKey: "laval", label: "Laval tutoring" },
        { routeKey: "examSprint", label: "Exam sprint" },
        { routeKey: "weeklyFollowUp", label: "Weekly follow-up" },
        { routeKey: "chemistrySec5", label: "Secondary 5 chemistry help" },
      ],
      ctaTitle: "Looking for a Laval science tutor and the subject is already fairly clear?",
      ctaText:
        "If the need is one-time or urgent, direct booking can move fast. If the family still hesitates about the subject or the right rhythm, calling first stays more strategic.",
      formTitle: "Describe the science need quickly",
      formText:
        "Share the grade, the priority subject, the kind of difficulty and the evaluation date if you already know it.",
    },
  },
}

export function getOfferPageConfig(routeKey, locale = "fr") {
  return offerPageConfigs[routeKey]?.[locale] || null
}
