export const resourceRouteKeys = [
  "mathExamPrep",
  "scienceExamPrep",
  "sec4Math",
  "catchUp",
  "mathMinisterial",
  "physicsHelp",
  "chemistrySec5",
  "montrealSec4Math",
]

export const resourceHubCopyByLocale = {
  fr: {
    eyebrow: "Ressources utiles",
    title: "Des pages utiles pour les recherches qui arrivent juste avant une vraie prise de decision",
    description:
      "Ces guides sont pensés pour les familles qui cherchent deja une aide concrete: examen qui approche, rattrapage, secondaire 4 en maths, ou besoin de remettre une matiere sur les rails rapidement.",
    cta: "Voir le guide",
  },
  en: {
    eyebrow: "Useful resources",
    title: "Guides for the searches that happen right before a family is ready to act",
    description:
      "These pages are built for families already looking for concrete help: exam prep, catch-up tutoring, Secondary 4 math support, or a fast academic reset.",
    cta: "Read the guide",
  },
}

export const resourcePageContent = {
  mathExamPrep: {
    fr: {
      cardTitle: "Preparation examen maths secondaire",
      cardDescription:
        "Comment remettre les notions en ordre, prioriser les chapitres et arriver plus calme devant un examen de maths.",
      eyebrow: "Guide examen",
      heroTitle: "Preparation a l'examen de maths au secondaire: quoi reviser, comment pratiquer et quand demander de l'aide",
      heroText:
        "Quand un examen de maths approche, le vrai probleme n'est pas seulement le temps. C'est le manque de priorites claires, la confusion entre les chapitres et la tendance a refaire trop d'exercices sans vraie methode.",
      seoTitle: "Preparation examen maths secondaire | Methode Secondaire",
      seoDescription:
        "Guide utile pour preparer un examen de maths au secondaire au Quebec: priorites de revision, erreurs a eviter, strategie de pratique et tutorat si le temps manque.",
      keywords:
        "preparation examen maths secondaire, aide examen maths quebec, tutorat maths examen ministeriel, revision maths secondaire",
      quickSignalsTitle: "Ce que les familles voient souvent juste avant un examen",
      quickSignals: [
        "L'eleve sait qu'il a deja vu la matiere, mais ne sait plus par ou recommencer.",
        "Les exercices sont refaits au hasard sans ordre entre algebra, fonctions et geometrie.",
        "Le stress monte vite parce que chaque erreur donne l'impression que rien n'est solide.",
      ],
      planTitle: "Le plan qui aide le plus quand le temps est court",
      planSteps: [
        {
          title: "Trier les chapitres",
          description:
            "Commencer par identifier les deux ou trois blocs qui donnent le plus de points ou qui bloquent le plus l'eleve.",
        },
        {
          title: "Refaire les bases avant les exercices longs",
          description:
            "Une bonne revision commence souvent par les regles, les formats de questions et les erreurs recurrentes, pas par une feuille complete d'examen blanc.",
        },
        {
          title: "Pratiquer sous une vraie methode",
          description:
            "Lire, choisir la demarche, resoudre, verifier. Tant que cette sequence n'est pas stable, l'eleve consomme son energie sans vraiment consolider.",
        },
      ],
      mistakesTitle: "Les erreurs qui ralentissent la progression",
      mistakes: [
        "Passer trop de temps sur les chapitres deja solides juste pour se rassurer.",
        "Memoriser des procedures sans comprendre a quel type de question elles s'appliquent.",
        "Faire une revision trop large au lieu d'un plan court et cible.",
      ],
      tutoringTitle: "Quand le tutorat devient un vrai raccourci utile",
      tutoringPoints: [
        "Quand il faut remettre de l'ordre tres vite avant un examen.",
        "Quand l'eleve comprend mieux avec une logique expliquee a voix haute.",
        "Quand la famille veut un plan de priorites clair plutot qu'une revision improvisee.",
      ],
      faq: [
        {
          question: "Combien de seances faut-il avant un examen de maths ?",
          answer:
            "Cela depend du niveau de confusion actuel. Parfois une ou deux seances bien ciblees suffisent pour clarifier les priorites. Quand plusieurs chapitres sont fragiles, un court bloc intensif aide davantage.",
        },
        {
          question: "Faut-il refaire tous les chapitres ?",
          answer:
            "Pas toujours. Le plus efficace est souvent de distinguer ce qui doit etre securise maintenant de ce qui peut etre laisse de cote pour ne pas diluer l'effort.",
        },
      ],
      ctaTitle: "Besoin de remettre la revision en ordre rapidement ?",
      ctaText:
        "Un appel court ou une seance ciblee peut suffire a clarifier les priorites avant l'examen et a faire baisser le stress.",
      relatedRouteKeys: ["sec4Math", "catchUp"],
    },
    en: {
      cardTitle: "High school math exam prep",
      cardDescription:
        "How to prioritize topics, practice with structure and reduce panic before an important math exam.",
      eyebrow: "Exam guide",
      heroTitle: "High school math exam prep: what to review, how to practice and when tutoring helps",
      heroText:
        "When a math exam is close, the real problem is rarely just lack of time. It is usually unclear priorities, mixed-up chapters and too much unfocused practice without a reliable method.",
      seoTitle: "High school math exam prep | Methode Secondaire",
      seoDescription:
        "A practical guide to high school math exam prep in Quebec: review priorities, practice structure, common mistakes and when tutoring can save time.",
      keywords:
        "high school math exam prep, math exam help quebec, math tutor exam preparation, high school math review",
      quickSignalsTitle: "What families often notice right before the exam",
      quickSignals: [
        "The student knows the material looks familiar, but does not know where to restart.",
        "Practice jumps randomly between algebra, functions and geometry.",
        "Stress rises quickly because every mistake feels like proof that nothing is solid.",
      ],
      planTitle: "The plan that helps most when time is short",
      planSteps: [
        {
          title: "Sort the chapters",
          description:
            "Start by identifying the two or three blocks that matter most for marks or that are causing the most confusion.",
        },
        {
          title: "Rebuild the basics before full mock exams",
          description:
            "Strong review usually starts with rules, question types and recurring mistakes, not with a full past paper right away.",
        },
        {
          title: "Practice with a real method",
          description:
            "Read, choose the approach, solve, verify. Until that sequence is stable, the student uses energy without really consolidating.",
        },
      ],
      mistakesTitle: "Mistakes that slow improvement",
      mistakes: [
        "Spending too much time on chapters that already feel safe.",
        "Memorizing procedures without knowing which type of question they belong to.",
        "Trying to review everything instead of following a short, targeted plan.",
      ],
      tutoringTitle: "When tutoring becomes the fastest useful shortcut",
      tutoringPoints: [
        "When a clear review order is needed fast before the exam.",
        "When the student understands better through guided verbal explanation.",
        "When the family wants a concrete plan instead of improvised revision.",
      ],
      faq: [
        {
          question: "How many sessions help before a math exam?",
          answer:
            "It depends on the current level of confusion. Sometimes one or two targeted sessions are enough to clarify priorities. When several chapters are weak, a short intensive block helps more.",
        },
        {
          question: "Should students review every chapter?",
          answer:
            "Not always. The smartest approach is usually to secure the chapters that matter most now instead of spreading effort too thin.",
        },
      ],
      ctaTitle: "Need to put the review plan back in order quickly?",
      ctaText:
        "A short call or a focused session can clarify the priorities before the exam and make the week feel much more manageable.",
      relatedRouteKeys: ["sec4Math", "catchUp"],
    },
  },
  scienceExamPrep: {
    fr: {
      cardTitle: "Preparation examen sciences secondaire",
      cardDescription:
        "Une page utile pour les familles qui veulent mieux preparer un examen de sciences, de physique ou de chimie.",
      eyebrow: "Guide examen",
      heroTitle: "Preparation a l'examen de sciences au secondaire: revoir sans s'eparpiller",
      heroText:
        "Les sciences deviennent lourdes tres vite quand les concepts, les unites, les formules et les questions a developpement se melangent. Une bonne revision sert d'abord a remettre de la logique avant de rajouter des pages d'exercices.",
      seoTitle: "Preparation examen sciences secondaire | Methode Secondaire",
      seoDescription:
        "Guide de preparation a l'examen de sciences au secondaire au Quebec: physique, chimie, questions a developpement, methodes de revision et aide ciblee.",
      keywords:
        "preparation examen sciences secondaire, aide examen physique secondaire, aide examen chimie secondaire, tutorat sciences quebec",
      quickSignalsTitle: "Signes qu'une revision de sciences manque encore de structure",
      quickSignals: [
        "L'eleve connait des mots et des formules, mais ne voit pas bien comment ils se relient.",
        "Les questions longues sont plus difficiles que les definitions courtes.",
        "Les erreurs viennent autant du raisonnement que du contenu lui-meme.",
      ],
      planTitle: "Une meilleure facon de reviser les sciences",
      planSteps: [
        {
          title: "Classer la matiere par themes",
          description:
            "Physique, chimie, electricite, labos: la revision devient plus lisible quand les blocs sont separes clairement.",
        },
        {
          title: "Relier les unites, les formules et les situations",
          description:
            "Ce n'est pas assez de memoriser. L'eleve doit voir ce que la formule represente et quand elle s'applique.",
        },
        {
          title: "Pratiquer les reponses construites",
          description:
            "Une bonne note en sciences depend aussi de la qualite de l'explication, de la justification et de l'analyse.",
        },
      ],
      mistakesTitle: "Ce qui fait perdre du temps juste avant l'examen",
      mistakes: [
        "Relire les notes passivement sans verifier si le raisonnement tient vraiment.",
        "Travailler seulement les calculs et laisser de cote les questions a developpement.",
        "Confondre memorisation rapide et comprehension durable.",
      ],
      tutoringTitle: "Quand une seance de sciences devient utile tres vite",
      tutoringPoints: [
        "Quand les concepts restent flous malgre plusieurs lectures.",
        "Quand il faut mieux repondre aux questions de physique ou de chimie sous pression.",
        "Quand la famille veut un plan de revision plus calme et plus concret.",
      ],
      faq: [
        {
          question: "Faut-il privilegier la theorie ou les exercices ?",
          answer:
            "Les deux, mais dans le bon ordre. Il faut d'abord clarifier la logique du chapitre, puis appliquer sur les bons types de questions.",
        },
        {
          question: "Les sciences demandent-elles une methode differente des maths ?",
          answer:
            "Oui. Les sciences demandent souvent plus de liens entre concepts, formules, unites et redaction. La revision doit donc rester plus visuelle et plus structuree.",
        },
      ],
      ctaTitle: "Besoin de remettre les sciences en ordre avant l'evaluation ?",
      ctaText:
        "Une courte seance ciblee peut aider a reconnecter les concepts, les formules et les questions attendues avant l'examen.",
      relatedRouteKeys: ["catchUp", "mathExamPrep"],
    },
    en: {
      cardTitle: "High school science exam prep",
      cardDescription:
        "A practical guide for families preparing for a science, chemistry or physics exam.",
      eyebrow: "Exam guide",
      heroTitle: "High school science exam prep: review with more structure and less overload",
      heroText:
        "Science becomes heavy very quickly when concepts, units, formulas and long-form questions all blur together. Good review rebuilds logic first instead of simply adding more pages of practice.",
      seoTitle: "High school science exam prep | Methode Secondaire",
      seoDescription:
        "A practical guide to high school science exam prep in Quebec: physics, chemistry, long-form questions, review structure and targeted tutoring.",
      keywords:
        "high school science exam prep, physics exam help, chemistry exam help, science tutor quebec",
      quickSignalsTitle: "Signs that science review still lacks structure",
      quickSignals: [
        "The student knows terms and formulas, but does not clearly see how they connect.",
        "Long-form questions feel harder than short definitions or computations.",
        "Mistakes come from reasoning problems as much as from missing content.",
      ],
      planTitle: "A better way to review science",
      planSteps: [
        {
          title: "Separate the subject into clean themes",
          description:
            "Physics, chemistry, electricity and labs become much easier to revise when the blocks are clearly separated.",
        },
        {
          title: "Connect units, formulas and real situations",
          description:
            "Memorization alone is not enough. Students need to see what the formula represents and when it applies.",
        },
        {
          title: "Practice constructed answers",
          description:
            "Strong science results also depend on explanation quality, justification and analysis.",
        },
      ],
      mistakesTitle: "What wastes time right before the exam",
      mistakes: [
        "Re-reading notes passively without checking whether the reasoning really holds.",
        "Practicing only calculations and ignoring long-form responses.",
        "Confusing quick memorization with real understanding.",
      ],
      tutoringTitle: "When a science session quickly becomes valuable",
      tutoringPoints: [
        "When concepts stay blurry even after multiple reviews.",
        "When physics or chemistry answers need to become clearer under exam pressure.",
        "When the family wants a calmer, more concrete review plan.",
      ],
      faq: [
        {
          question: "Should students focus more on theory or exercises?",
          answer:
            "Both, but in the right order. First clarify the logic of the chapter, then apply it on the question types that are most likely to matter.",
        },
        {
          question: "Does science need a different method than math?",
          answer:
            "Yes. Science often requires stronger links between concepts, formulas, units and written explanation, so the review plan should stay more visual and more structured.",
        },
      ],
      ctaTitle: "Need to put science back in order before the test?",
      ctaText:
        "A short targeted session can reconnect the concepts, formulas and expected answers before the exam window closes.",
      relatedRouteKeys: ["catchUp", "mathExamPrep"],
    },
  },
  sec4Math: {
    fr: {
      cardTitle: "Aide maths secondaire 4",
      cardDescription:
        "Une page faite pour les familles qui cherchent une aide plus precise en maths de secondaire 4.",
      eyebrow: "Niveau cible",
      heroTitle: "Aide en maths de secondaire 4: la matiere ou beaucoup d'eleves commencent a perdre le fil",
      heroText:
        "Le secondaire 4 en maths est souvent le moment ou les fonctions, l'algebre et la lecture des problemes demandent plus de methode que de simple bonne volonte. Si les bases ne sont pas bien organisees, la confiance baisse vite.",
      seoTitle: "Aide maths secondaire 4 | Methode Secondaire",
      seoDescription:
        "Aide et tutorat en maths de secondaire 4 au Quebec: fonctions, algebra, strategie de resolution, revision et accompagnement clair.",
      keywords:
        "aide maths secondaire 4, tuteur maths secondaire 4, maths sec 4 quebec, tutorat fonctions secondaire 4",
      quickSignalsTitle: "Ce qui revient souvent en secondaire 4",
      quickSignals: [
        "Les fonctions sont vues comme plusieurs chapitres separes au lieu d'un seul langage a comprendre.",
        "Les calculs sont parfois corrects, mais le choix de la demarche reste fragile.",
        "Les problemes prennent trop de temps parce que l'eleve ne sait pas comment commencer.",
      ],
      planTitle: "Ce qui aide le plus a ce niveau",
      planSteps: [
        {
          title: "Rendre les fonctions plus visuelles",
          description:
            "Table, equation, graphe et interpretation doivent redevenir une meme idee vue sous plusieurs angles.",
        },
        {
          title: "Stabiliser la demarche",
          description:
            "En secondaire 4, la difference se fait souvent sur la facon d'aborder la question, pas seulement sur le calcul final.",
        },
        {
          title: "Travailler les erreurs qui reviennent",
          description:
            "Une bonne seance de maths secondaire 4 cible les memes fautes encore et encore jusqu'a ce qu'elles disparaissent.",
        },
      ],
      mistakesTitle: "Les mauvaises habitudes les plus couteuses",
      mistakes: [
        "Commencer le calcul trop vite sans lire le type de question.",
        "Confondre lecture de graphe et procedure algebrique.",
        "Penser qu'il faut juste plus pratiquer alors que la methode n'est pas encore claire.",
      ],
      tutoringTitle: "Quand une aide exterieure change vraiment la donne",
      tutoringPoints: [
        "Quand le secondaire 4 devient un point de bascule avant le secondaire 5.",
        "Quand l'eleve comprend mieux en voyant la logique de chaque etape.",
        "Quand un parent veut stopper l'accumulation avant qu'elle se transforme en gros retard.",
      ],
      faq: [
        {
          question: "Pourquoi le secondaire 4 est-il si difficile en maths ?",
          answer:
            "Souvent parce que plusieurs notions se croisent en meme temps. Les fonctions demandent de lire, de calculer et d'interpreter avec plus d'autonomie qu'avant.",
        },
        {
          question: "Faut-il attendre les mauvaises notes avant de chercher de l'aide ?",
          answer:
            "Non. Le meilleur moment est souvent quand la confusion commence, avant que les chapitres s'empilent et que l'eleve perde confiance.",
        },
      ],
      ctaTitle: "Le secondaire 4 commence a devenir lourd ?",
      ctaText:
        "Une seance ciblee peut clarifier les fonctions, la demarche et les priorites avant que la matiere ne se complique davantage.",
      relatedRouteKeys: ["mathExamPrep", "catchUp"],
    },
    en: {
      cardTitle: "Secondary 4 math help",
      cardDescription:
        "A guide for families looking for more precise support around Secondary 4 math.",
      eyebrow: "Target grade",
      heroTitle: "Secondary 4 math help: the year when many students start losing the thread",
      heroText:
        "Secondary 4 math is often the point where functions, algebra and word problems require more method than raw effort. When the basics are not well organized, confidence drops quickly.",
      seoTitle: "Secondary 4 math help | Methode Secondaire",
      seoDescription:
        "Secondary 4 math help and tutoring in Quebec: functions, algebra, problem-solving strategy, review priorities and clear support.",
      keywords:
        "secondary 4 math help, secondary 4 math tutor, grade 10 math tutoring quebec, functions tutoring high school",
      quickSignalsTitle: "What often shows up in Secondary 4",
      quickSignals: [
        "Functions feel like separate chapters instead of one language seen from different angles.",
        "Calculations may be correct, but the choice of method stays weak.",
        "Word problems take too long because the student does not know how to start.",
      ],
      planTitle: "What helps most at this stage",
      planSteps: [
        {
          title: "Make functions more visual",
          description:
            "Table, equation, graph and interpretation need to feel like one idea expressed in multiple ways.",
        },
        {
          title: "Stabilize the solving method",
          description:
            "At this level, the difference often comes from how the student approaches the question, not only from the final computation.",
        },
        {
          title: "Work directly on repeated errors",
          description:
            "Strong Secondary 4 support targets the same recurring mistakes until they finally disappear.",
        },
      ],
      mistakesTitle: "The habits that cost the most",
      mistakes: [
        "Starting calculations too quickly without identifying the real question type.",
        "Mixing graph reading with algebraic procedure.",
        "Assuming the answer is just more practice when the method is still unclear.",
      ],
      tutoringTitle: "When outside help changes the trajectory",
      tutoringPoints: [
        "When Secondary 4 feels like a turning point before the final years.",
        "When the student understands better once the logic of each step is spoken out clearly.",
        "When a parent wants to stop small confusion from becoming a major delay.",
      ],
      faq: [
        {
          question: "Why does Secondary 4 math feel harder so suddenly?",
          answer:
            "Because several ideas start interacting at the same time. Functions require stronger reading, calculation and interpretation skills than earlier chapters.",
        },
        {
          question: "Should families wait for bad grades before getting help?",
          answer:
            "No. The best moment is usually when confusion first appears, before the chapters pile up and confidence drops.",
        },
      ],
      ctaTitle: "Is Secondary 4 math starting to feel heavy?",
      ctaText:
        "A focused session can quickly clarify functions, method and priorities before the course becomes harder to manage.",
      relatedRouteKeys: ["mathExamPrep", "catchUp"],
    },
  },
  catchUp: {
    fr: {
      cardTitle: "Rattrapage scolaire secondaire",
      cardDescription:
        "Quand plusieurs chapitres se sont accumules et qu'il faut reprendre le controle sans ajouter plus de stress.",
      eyebrow: "Remise a niveau",
      heroTitle: "Rattrapage scolaire au secondaire: comment repartir sans se noyer dans tout ce qui s'est accumule",
      heroText:
        "Quand un eleve prend du retard, le vrai risque est de vouloir tout reparer en meme temps. Un bon rattrapage commence par une priorisation tres claire, une vision realiste de la charge et une methode qui redonne un sentiment de controle.",
      seoTitle: "Rattrapage scolaire secondaire | Methode Secondaire",
      seoDescription:
        "Aide en rattrapage scolaire au secondaire au Quebec: maths, sciences, remise a niveau, plan de priorites et tutorat structure.",
      keywords:
        "rattrapage scolaire secondaire, remise a niveau secondaire, tutorat rattrapage quebec, aide devoirs secondaire retard",
      quickSignalsTitle: "Quand le retard commence a peser",
      quickSignals: [
        "Plusieurs chapitres sont flous et l'eleve ne sait plus lequel reprendre en premier.",
        "Les devoirs prennent trop longtemps parce que chaque notion demande un effort enorme.",
        "Le stress vient autant de l'accumulation que de la matiere elle-meme.",
      ],
      planTitle: "Ce qui aide vraiment en periode de rattrapage",
      planSteps: [
        {
          title: "Choisir les vraies priorites",
          description:
            "Tout n'a pas la meme urgence. Il faut identifier ce qui bloque la suite du cours et ce qui peut attendre.",
        },
        {
          title: "Redonner des bases stables",
          description:
            "Un rattrapage reussi ne saute pas directement au chapitre actuel si les bases de lecture, de calcul ou de logique restent fragiles.",
        },
        {
          title: "Installer un rythme soutenable",
          description:
            "L'eleve a besoin d'un plan qu'il peut tenir sans se sentir toujours en retard, sinon le decouragement revient vite.",
        },
      ],
      mistakesTitle: "Les faux bons reflexes les plus frequents",
      mistakes: [
        "Essayer de tout rattraper en une semaine.",
        "Travailler seulement l'urgence du devoir du jour sans traiter la cause du retard.",
        "Confondre surcharge de travail et progression reelle.",
      ],
      tutoringTitle: "Quand un accompagnement externe devient tres rentable",
      tutoringPoints: [
        "Quand il faut trier rapidement ce qui est essentiel de ce qui peut attendre.",
        "Quand la maison a besoin d'un cadre plus calme et plus structurant.",
        "Quand l'eleve a besoin de retrouver vite un sentiment de progression.",
      ],
      faq: [
        {
          question: "Le rattrapage demande-t-il forcement beaucoup d'heures ?",
          answer:
            "Pas forcement. Ce qui compte le plus est la priorisation. Quelques seances bien ciblees peuvent relancer la progression beaucoup plus efficacement qu'un volume mal organise.",
        },
        {
          question: "Faut-il traiter plusieurs matieres en meme temps ?",
          answer:
            "Parfois oui, mais pas toujours. Le mieux est souvent de commencer par la matiere qui bloque le plus la semaine scolaire ou l'estime de soi de l'eleve.",
        },
      ],
      ctaTitle: "Besoin d'une remise a niveau plus claire et plus respirable ?",
      ctaText:
        "Un premier echange peut suffire a definir les priorites, calmer la charge et remettre la progression en mouvement.",
      relatedRouteKeys: ["mathExamPrep", "scienceExamPrep"],
    },
    en: {
      cardTitle: "High school catch-up tutoring",
      cardDescription:
        "For families dealing with accumulated chapters and trying to regain control without adding more stress.",
      eyebrow: "Catch-up support",
      heroTitle: "High school catch-up tutoring: how to restart without drowning in everything that piled up",
      heroText:
        "When a student falls behind, the real danger is trying to repair everything at once. Strong catch-up work starts with clear priorities, realistic workload and a method that gives the student a sense of control again.",
      seoTitle: "High school catch-up tutoring | Methode Secondaire",
      seoDescription:
        "High school catch-up tutoring in Quebec for math and science: academic reset, priority planning, structured support and realistic progress.",
      keywords:
        "high school catch-up tutoring, academic reset quebec, math catch-up tutor, science catch-up tutoring",
      quickSignalsTitle: "Signs the backlog is starting to weigh heavily",
      quickSignals: [
        "Several chapters are blurry and the student no longer knows which one to restart first.",
        "Homework takes far too long because every concept feels expensive to process.",
        "Stress comes as much from the pile-up as from the subject itself.",
      ],
      planTitle: "What actually helps during a catch-up phase",
      planSteps: [
        {
          title: "Pick the true priorities",
          description:
            "Not everything has the same urgency. First identify what is blocking the rest of the course and what can wait.",
        },
        {
          title: "Rebuild the missing foundations",
          description:
            "A good catch-up plan does not jump straight to the current chapter if the reading, logic or calculation basics are still unstable.",
        },
        {
          title: "Create a pace the student can sustain",
          description:
            "Students need a plan they can actually hold without always feeling late, otherwise discouragement returns fast.",
        },
      ],
      mistakesTitle: "The most common false good ideas",
      mistakes: [
        "Trying to catch up on everything in one week.",
        "Working only on tonight's homework without fixing the source of the delay.",
        "Confusing overload with real progress.",
      ],
      tutoringTitle: "When outside support becomes very high-leverage",
      tutoringPoints: [
        "When someone needs to sort essential work from secondary work quickly.",
        "When the home routine needs a calmer, more structured frame.",
        "When the student needs to feel progress again fast.",
      ],
      faq: [
        {
          question: "Does catch-up always require many hours?",
          answer:
            "Not necessarily. Prioritization matters more than volume. A few targeted sessions can restart progress far better than a large but disorganized workload.",
        },
        {
          question: "Should several subjects be handled at once?",
          answer:
            "Sometimes, but not always. The smartest first move is often to start with the subject that is blocking the week the most or hurting the student's confidence the most.",
        },
      ],
      ctaTitle: "Need a clearer and calmer academic reset?",
      ctaText:
        "A short first conversation can be enough to define priorities, reduce overload and restart real forward momentum.",
      relatedRouteKeys: ["mathExamPrep", "scienceExamPrep"],
    },
  },
  mathMinisterial: {
    fr: {
      cardTitle: "Preparation examen ministeriel maths",
      cardDescription:
        "Un guide pour preparer l'examen ministeriel de maths avec un plan de revision plus strategique.",
      eyebrow: "Examen ministeriel",
      heroTitle: "Preparation a l'examen ministeriel de maths: comment reviser sans disperser son energie",
      heroText:
        "L'examen ministeriel change la facon de reviser: il faut tenir compte du temps, des types de questions qui reviennent et de la regularite de la methode sous pression. Le bon objectif n'est pas d'en faire le plus possible, mais d'entrer avec une structure fiable.",
      seoTitle: "Preparation examen ministeriel maths | Methode Secondaire",
      seoDescription:
        "Guide de preparation a l'examen ministeriel de maths au Quebec: plan de revision, types de questions, erreurs courantes et aide ciblee.",
      keywords:
        "preparation examen ministeriel maths, examen ministeriel maths quebec, tutorat examen ministeriel, revision maths ministeriel",
      quickSignalsTitle: "Ce qui fragilise souvent la preparation ministerielle",
      quickSignals: [
        "L'eleve revise des exercices, mais sans distinguer les formats les plus rentables.",
        "Le stress du chrono prend plus de place que la logique de resolution.",
        "La revision manque d'un ordre clair entre bases, questions-types et simulation.",
      ],
      planTitle: "Un plan utile pour l'examen ministeriel",
      planSteps: [
        {
          title: "Verifier les blocs incontournables",
          description:
            "Avant de viser large, il faut s'assurer que les notions et procedures qui reviennent presque toujours sont stables.",
        },
        {
          title: "Travailler par format de question",
          description:
            "Lecture, choix de methode, calcul, verification: les questions ministerielles recompensent surtout une demarche repetable.",
        },
        {
          title: "Simuler sous un cadre realiste",
          description:
            "Quand la methode est mieux posee, les simulations servent enfin a tester le rythme et non a creer encore plus de panique.",
        },
      ],
      mistakesTitle: "Les erreurs qui coutent cher a l'approche du ministeriel",
      mistakes: [
        "Vouloir tout revoir en meme temps au lieu de securiser les points les plus probables.",
        "Faire trop peu de questions longues ou mixtes.",
        "Confondre revision intense et revision strategique.",
      ],
      tutoringTitle: "Quand une aide externe devient tres rentable",
      tutoringPoints: [
        "Quand il faut ordonner la revision en tres peu de temps.",
        "Quand l'eleve comprend la matiere mais perd ses moyens en contexte d'examen.",
        "Quand la famille veut un regard precis sur les priorites finales.",
      ],
      faq: [
        {
          question: "Faut-il faire beaucoup d'examens blancs ?",
          answer:
            "Pas au debut. Il vaut mieux d'abord consolider la methode sur les bons formats, puis utiliser les simulations pour ajuster le rythme et les derniers points faibles.",
        },
        {
          question: "Le tutorat peut-il encore aider peu de temps avant l'examen ?",
          answer:
            "Oui, surtout pour remettre les priorites en ordre, corriger des erreurs recurrentes et reduire l'impression de dispersion.",
        },
      ],
      ctaTitle: "Besoin d'un plan ministeriel plus clair ?",
      ctaText:
        "Une seance ciblee peut aider a trier les questions prioritaires, renforcer la methode et calmer la preparation finale.",
      relatedRouteKeys: ["mathExamPrep", "sec4Math", "catchUp"],
    },
    en: {
      cardTitle: "Math ministerial exam prep",
      cardDescription:
        "A practical guide to preparing for the Quebec math ministerial exam with a smarter revision structure.",
      eyebrow: "Ministerial exam",
      heroTitle: "Math ministerial exam prep: how to review without scattering your energy",
      heroText:
        "A ministerial exam changes how review should work: time management, recurring question formats and method under pressure matter just as much as content. The goal is not to do everything. It is to walk in with a structure that holds.",
      seoTitle: "Math ministerial exam prep | Methode Secondaire",
      seoDescription:
        "Guide to Quebec math ministerial exam prep: revision plan, common question patterns, frequent mistakes and when tutoring helps.",
      keywords:
        "math ministerial exam prep, quebec math ministerial exam, ministerial exam tutor, math review quebec",
      quickSignalsTitle: "What often weakens ministerial exam preparation",
      quickSignals: [
        "The student is practicing, but not separating the highest-value question types.",
        "Time pressure is taking over the solving process.",
        "The review plan has no clear order between basics, question types and simulation.",
      ],
      planTitle: "A stronger plan for the ministerial exam",
      planSteps: [
        {
          title: "Secure the non-negotiable blocks",
          description:
            "Before expanding outward, it helps to stabilize the chapters and procedures that keep showing up.",
        },
        {
          title: "Practice by question format",
          description:
            "Ministerial-style questions reward a repeatable solving method much more than random problem volume.",
        },
        {
          title: "Simulate in a realistic frame",
          description:
            "Once the method is steadier, simulations finally become useful for testing pace instead of creating extra panic.",
        },
      ],
      mistakesTitle: "Mistakes that become expensive near the exam",
      mistakes: [
        "Trying to review everything instead of protecting the most likely marks first.",
        "Doing too few mixed or longer-form questions.",
        "Confusing intense review with strategic review.",
      ],
      tutoringTitle: "When outside help becomes high-leverage",
      tutoringPoints: [
        "When the review plan needs structure quickly.",
        "When the student knows the content but loses control in exam conditions.",
        "When the family wants a sharper outside view on the final priorities.",
      ],
      faq: [
        {
          question: "Should students do many full mock exams?",
          answer:
            "Not at the beginning. It is usually smarter to stabilize the method first, then use simulations to adjust pace and final weak points.",
        },
        {
          question: "Can tutoring still help shortly before the exam?",
          answer:
            "Yes. It can still be very useful for sorting priorities, correcting repeated mistakes and reducing the feeling of chaos.",
        },
      ],
      ctaTitle: "Need a clearer ministerial exam plan?",
      ctaText:
        "A focused session can help sort the priorities, strengthen the method and calm the final review stretch.",
      relatedRouteKeys: ["mathExamPrep", "sec4Math", "catchUp"],
    },
  },
  physicsHelp: {
    fr: {
      cardTitle: "Tuteur physique secondaire",
      cardDescription:
        "Une page utile pour les familles qui cherchent une aide plus precise en physique au secondaire.",
      eyebrow: "Physique",
      heroTitle: "Tutorat en physique au secondaire: quand les formules ne suffisent plus a elles seules",
      heroText:
        "La physique devient beaucoup plus abordable quand les grandeurs, les schemas et les situations concretes se reconnectent. Le vrai blocage ne vient pas seulement des formules: il vient souvent du lien entre la situation et la bonne demarche.",
      seoTitle: "Tuteur physique secondaire | Methode Secondaire",
      seoDescription:
        "Tutorat en physique au secondaire au Quebec: formules, problemes, schemas, methode de resolution et preparation d'examens.",
      keywords:
        "tuteur physique secondaire, aide physique secondaire, tutorat physique quebec, probleme physique secondaire",
      quickSignalsTitle: "Ce qui bloque souvent en physique",
      quickSignals: [
        "Les formules sont apprises, mais l'eleve ne sait pas toujours quand les utiliser.",
        "Les schemas et les unites sont vus comme du detail alors qu'ils guident la resolution.",
        "Les problemes semblent differents les uns des autres meme quand la logique est proche.",
      ],
      planTitle: "Une meilleure facon de progresser en physique",
      planSteps: [
        {
          title: "Lire la situation avant la formule",
          description:
            "En physique, il faut d'abord comprendre ce qui se passe avant de choisir l'outil mathematique.",
        },
        {
          title: "Relier schema, donnees et variables",
          description:
            "Quand ces trois elements restent alignes, la resolution devient plus stable et plus rapide.",
        },
        {
          title: "Comparer les problemes entre eux",
          description:
            "L'eleve gagne beaucoup quand il commence a reconnaitre des familles de questions plutot que des cas isoles.",
        },
      ],
      mistakesTitle: "Les erreurs qui reviennent le plus",
      mistakes: [
        "Partir sur une formule sans clarifier ce que demande vraiment le probleme.",
        "Negliger les unites et les representations visuelles.",
        "Faire de la physique comme une simple liste de procedures a memoriser.",
      ],
      tutoringTitle: "Quand le tutorat en physique accelere vraiment",
      tutoringPoints: [
        "Quand les problemes semblent tous differents et decourageants.",
        "Quand les calculs sont corrects mais le raisonnement reste flou.",
        "Quand un examen approche et que la methode doit devenir plus fiable.",
      ],
      faq: [
        {
          question: "Pourquoi la physique semble-t-elle plus difficile que les maths ?",
          answer:
            "Parce qu'elle demande souvent de lire une situation reelle, de choisir les bonnes variables et de traduire ensuite cette situation en calcul.",
        },
        {
          question: "Est-ce qu'un eleve fort en maths peut quand meme bloquer en physique ?",
          answer:
            "Oui. Les maths aident beaucoup, mais la physique demande aussi de l'interpretation, des schemas et une lecture plus contextuelle du probleme.",
        },
      ],
      ctaTitle: "Besoin de remettre la physique en logique claire ?",
      ctaText:
        "Un accompagnement cible peut aider a reconnecter les problemes, les schemas et les formules avant que la matiere ne se referme.",
      relatedRouteKeys: ["scienceExamPrep", "chemistrySec5", "catchUp"],
    },
    en: {
      cardTitle: "High school physics tutoring",
      cardDescription:
        "A focused page for families looking for more precise help in high school physics.",
      eyebrow: "Physics",
      heroTitle: "High school physics tutoring: when formulas alone stop being enough",
      heroText:
        "Physics becomes much easier when quantities, diagrams and real situations reconnect. The real block is rarely just the formula itself. It is often the link between the situation and the right approach.",
      seoTitle: "High school physics tutoring | Methode Secondaire",
      seoDescription:
        "High school physics tutoring in Quebec: formulas, diagrams, problem-solving method and exam preparation.",
      keywords:
        "high school physics tutoring, physics help high school, physics tutor quebec, physics problem solving help",
      quickSignalsTitle: "What often blocks progress in physics",
      quickSignals: [
        "Formulas are memorized, but the student does not always know when to use them.",
        "Diagrams and units are treated like details even though they guide the solution.",
        "Problems all feel different even when the underlying logic is similar.",
      ],
      planTitle: "A better way to improve in physics",
      planSteps: [
        {
          title: "Read the situation before choosing the formula",
          description:
            "In physics, students need to understand what is happening before they choose the math tool.",
        },
        {
          title: "Align the diagram, the data and the variables",
          description:
            "When those three pieces stay connected, problem solving becomes more stable and faster.",
        },
        {
          title: "Compare problem families",
          description:
            "Students gain a lot when they start recognizing recurring structures instead of seeing isolated cases.",
        },
      ],
      mistakesTitle: "The mistakes that return most often",
      mistakes: [
        "Jumping into a formula before clarifying what the problem is actually asking.",
        "Ignoring units and visual representations.",
        "Treating physics like a list of procedures instead of a system of linked ideas.",
      ],
      tutoringTitle: "When physics tutoring speeds things up the most",
      tutoringPoints: [
        "When all problems feel different and discouraging.",
        "When calculations can be done but the reasoning still feels blurry.",
        "When an exam is coming and the method needs to become more reliable quickly.",
      ],
      faq: [
        {
          question: "Why can physics feel harder than math?",
          answer:
            "Because it often requires reading a real situation, choosing the right variables and then translating that situation into a calculation.",
        },
        {
          question: "Can a strong math student still struggle in physics?",
          answer:
            "Yes. Math helps a lot, but physics also demands interpretation, diagrams and more context-based reading of the problem.",
        },
      ],
      ctaTitle: "Need to make physics feel logical again?",
      ctaText:
        "Focused support can reconnect the problems, diagrams and formulas before the subject starts closing in on the student.",
      relatedRouteKeys: ["scienceExamPrep", "chemistrySec5", "catchUp"],
    },
  },
  chemistrySec5: {
    fr: {
      cardTitle: "Aide chimie secondaire 5",
      cardDescription:
        "Une page pour les familles qui cherchent un accompagnement plus precis en chimie de secondaire 5.",
      eyebrow: "Chimie sec 5",
      heroTitle: "Aide en chimie de secondaire 5: clarifier les reactions, les calculs et la logique derriere les questions",
      heroText:
        "En secondaire 5, la chimie peut devenir lourde tres vite quand les transformations, les equations, les proportions et la justification se melangent. Une bonne aide sert a remettre ces blocs en ordre pour rendre la matiere beaucoup moins opaque.",
      seoTitle: "Aide chimie secondaire 5 | Methode Secondaire",
      seoDescription:
        "Aide et tutorat en chimie de secondaire 5 au Quebec: reactions, equations, calculs, methode et preparation d'examens.",
      keywords:
        "aide chimie secondaire 5, tutorat chimie sec 5, tuteur chimie quebec, examen chimie secondaire",
      quickSignalsTitle: "Ce qui pèse souvent en chimie de secondaire 5",
      quickSignals: [
        "Les equations chimiques semblent memorisees plutot que comprises.",
        "Les calculs et les proportions tombent vite quand l'enonce change un peu.",
        "Les reponses manque de structure dans les questions plus explicatives.",
      ],
      planTitle: "Ce qui aide le plus en chimie sec 5",
      planSteps: [
        {
          title: "Revenir a la logique des reactions",
          description:
            "Quand les transformations redeviennent lisibles, les equations et les calculs suivent beaucoup mieux.",
        },
        {
          title: "Stabiliser les etapes de calcul",
          description:
            "Les conversions, proportions et quantites doivent suivre un ordre clair pour rester solides en evaluation.",
        },
        {
          title: "Repondre avec plus de structure",
          description:
            "Les bonnes notes viennent aussi de la capacite a expliquer et justifier proprement, pas seulement de trouver un resultat.",
        },
      ],
      mistakesTitle: "Les erreurs qui ralentissent les progres",
      mistakes: [
        "Apprendre des reactions par coeur sans comprendre ce qu'elles decrivent.",
        "Sauter des etapes de calcul quand la pression monte.",
        "Ne pratiquer que les questions courtes et eviter les questions d'analyse.",
      ],
      tutoringTitle: "Quand la chimie beneficie beaucoup d'un accompagnement",
      tutoringPoints: [
        "Quand l'eleve perd confiance devant les calculs de chimie.",
        "Quand les reactions et les equations ne tiennent pas ensemble dans sa tete.",
        "Quand un examen approche et qu'il faut remettre de l'ordre rapidement.",
      ],
      faq: [
        {
          question: "Pourquoi la chimie de secondaire 5 semble-t-elle si dense ?",
          answer:
            "Parce qu'elle demande souvent de comprendre une reaction, d'ecrire ou lire une equation, puis d'enchainer avec des calculs ou une justification.",
        },
        {
          question: "Faut-il privilegier la theorie ou les exercices ?",
          answer:
            "Les deux, mais dans cet ordre: la theorie doit redevenir claire avant que les exercices puissent vraiment consolider quelque chose.",
        },
      ],
      ctaTitle: "La chimie de secondaire 5 commence a se brouiller ?",
      ctaText:
        "Une seance ciblee peut remettre les reactions, les calculs et la structure des reponses dans un ordre beaucoup plus utilisable.",
      relatedRouteKeys: ["scienceExamPrep", "physicsHelp", "catchUp"],
    },
    en: {
      cardTitle: "Secondary 5 chemistry help",
      cardDescription:
        "A resource for families looking for more precise support in Secondary 5 chemistry.",
      eyebrow: "Secondary 5 chemistry",
      heroTitle: "Secondary 5 chemistry help: clarifying reactions, calculations and the logic behind the questions",
      heroText:
        "In Secondary 5, chemistry gets heavy quickly when transformations, equations, proportions and written explanation all blend together. Strong support helps put those blocks back in order so the subject feels much less opaque.",
      seoTitle: "Secondary 5 chemistry help | Methode Secondaire",
      seoDescription:
        "Secondary 5 chemistry help in Quebec: reactions, equations, calculations, clearer method and exam preparation.",
      keywords:
        "secondary 5 chemistry help, chemistry tutor sec 5, chemistry tutoring quebec, chemistry exam help high school",
      quickSignalsTitle: "What often weighs students down in Secondary 5 chemistry",
      quickSignals: [
        "Chemical equations feel memorized rather than understood.",
        "Calculations and proportions collapse as soon as the wording changes.",
        "Written answers lack structure on more analytical questions.",
      ],
      planTitle: "What helps most in Secondary 5 chemistry",
      planSteps: [
        {
          title: "Return to the logic of the reactions",
          description:
            "When the transformations make sense again, the equations and calculations become much easier to hold.",
        },
        {
          title: "Stabilize the calculation steps",
          description:
            "Conversions, proportions and quantities need a clear order if they are going to stay reliable during assessments.",
        },
        {
          title: "Answer with more structure",
          description:
            "Strong marks also come from the ability to explain and justify clearly, not just from landing on a number.",
        },
      ],
      mistakesTitle: "Mistakes that slow progress down",
      mistakes: [
        "Memorizing reactions without understanding what they describe.",
        "Skipping calculation steps under pressure.",
        "Practicing only short questions while avoiding analytical ones.",
      ],
      tutoringTitle: "When chemistry support becomes especially valuable",
      tutoringPoints: [
        "When the student is losing confidence in chemistry calculations.",
        "When reactions and equations no longer feel connected in the student's mind.",
        "When an exam is close and the material needs to be reorganized quickly.",
      ],
      faq: [
        {
          question: "Why does Secondary 5 chemistry feel so dense?",
          answer:
            "Because it often requires understanding a reaction, reading or writing an equation, then moving into calculations or written justification.",
        },
        {
          question: "Should students focus more on theory or exercises?",
          answer:
            "Both, but in that order: the theory needs to become clear again before the exercises can consolidate anything properly.",
        },
      ],
      ctaTitle: "Is Secondary 5 chemistry starting to blur together?",
      ctaText:
        "A focused session can put the reactions, calculations and answer structure back into a much more usable order.",
      relatedRouteKeys: ["scienceExamPrep", "physicsHelp", "catchUp"],
    },
  },
  montrealSec4Math: {
    fr: {
      cardTitle: "Tuteur maths Montreal secondaire 4",
      cardDescription:
        "Une page plus locale pour les familles de Montreal qui cherchent une aide precise en maths de secondaire 4.",
      eyebrow: "Montreal + sec 4",
      heroTitle: "Tuteur de maths a Montreal pour le secondaire 4: une recherche tres precise, et souvent tres urgente",
      heroText:
        "Quand un parent cherche un tuteur de maths a Montreal pour un eleve de secondaire 4, le besoin est rarement vague. Il y a souvent un chapitre qui glisse, un examen qui approche ou une perte de confiance qui commence a peser.",
      seoTitle: "Tuteur maths Montreal secondaire 4 | Methode Secondaire",
      seoDescription:
        "Tuteur de maths a Montreal pour le secondaire 4: fonctions, methode, rattrapage, examen et accompagnement clair.",
      keywords:
        "tuteur maths montreal secondaire 4, tutorat maths montreal sec 4, aide maths secondaire 4 montreal, tuteur fonctions montreal",
      quickSignalsTitle: "Ce que cette recherche veut souvent vraiment dire",
      quickSignals: [
        "Le secondaire 4 commence a devenir plus abstrait que prevu.",
        "La famille veut une aide rapide, mais aussi un tuteur qui explique avec calme.",
        "Le besoin est local, concret et souvent relie a une evaluation proche.",
      ],
      planTitle: "Ce qui rassure le plus dans ce contexte",
      planSteps: [
        {
          title: "Clarifier le vrai blocage",
          description:
            "Fonctions, lecture de problemes, methode ou stress: le bon point de depart doit etre identifie tres vite.",
        },
        {
          title: "Retrouver une demarche stable",
          description:
            "En secondaire 4, la progression passe souvent par une meilleure facon de commencer, structurer et verifier.",
        },
        {
          title: "Choisir un rythme coherent",
          description:
            "Certaines situations demandent une aide ponctuelle avant un examen, d'autres un suivi hebdomadaire pour stabiliser tout le reste.",
        },
      ],
      mistakesTitle: "Les faux bons reflexes les plus frequents",
      mistakes: [
        "Chercher seulement le tuteur le plus proche au lieu du profil le plus adapte.",
        "Attendre trop longtemps alors que le secondaire 4 commence deja a se fragiliser.",
        "Se concentrer uniquement sur la note a venir sans consolider la methode.",
      ],
      tutoringTitle: "Quand cette page correspond exactement au bon besoin",
      tutoringPoints: [
        "Quand vous etes a Montreal et que le secondaire 4 devient un vrai point de friction.",
        "Quand l'eleve a besoin d'explications nettes sur les fonctions et les problemes.",
        "Quand vous voulez un premier echange rapide avant de reserver.",
      ],
      faq: [
        {
          question: "Est-ce que le tutorat peut se faire en ligne meme a Montreal ?",
          answer:
            "Oui. L'en ligne reste disponible partout a Montreal, avec du presentiel selon le secteur et le bon profil retenu.",
        },
        {
          question: "Le secondaire 4 justifie-t-il deja un suivi hebdomadaire ?",
          answer:
            "Souvent oui, surtout si les fonctions ou la methode commencent a glisser. Un suivi regulier evite que le retard se fixe avant le secondaire 5.",
        },
      ],
      ctaTitle: "Vous cherchez un tuteur de maths a Montreal pour le secondaire 4 ?",
      ctaText:
        "Un premier appel peut aider a cadrer le niveau, l'urgence et le type d'accompagnement le plus utile tout de suite.",
      relatedRouteKeys: ["sec4Math", "mathExamPrep", "mathMinisterial"],
    },
    en: {
      cardTitle: "Montreal Secondary 4 math tutor",
      cardDescription:
        "A more local page for Montreal families looking for precise Secondary 4 math support.",
      eyebrow: "Montreal + Secondary 4",
      heroTitle: "A Montreal math tutor for Secondary 4: a very specific search, and often an urgent one",
      heroText:
        "When a parent searches for a Montreal math tutor for a Secondary 4 student, the need is rarely vague. There is usually a slipping chapter, an exam coming up or a confidence drop that is starting to weigh on the family.",
      seoTitle: "Montreal Secondary 4 math tutor | Methode Secondaire",
      seoDescription:
        "Montreal math tutor for Secondary 4: functions, method, catch-up work, exams and clear support.",
      keywords:
        "montreal secondary 4 math tutor, secondary 4 math tutoring montreal, math help secondary 4 montreal, functions tutor montreal",
      quickSignalsTitle: "What this search often really means",
      quickSignals: [
        "Secondary 4 is becoming more abstract than expected.",
        "The family needs help quickly, but also wants a tutor who explains calmly and clearly.",
        "The need is local, concrete and often tied to an upcoming assessment.",
      ],
      planTitle: "What reassures families most in this situation",
      planSteps: [
        {
          title: "Clarify the real block quickly",
          description:
            "Functions, word problems, method or stress: the right starting point needs to be identified fast.",
        },
        {
          title: "Rebuild a stable approach",
          description:
            "At this level, progress often comes from a better way to start, structure and verify each question.",
        },
        {
          title: "Choose the right rhythm",
          description:
            "Some cases need a short burst before an exam, while others need weekly follow-up to stabilize the whole course.",
        },
      ],
      mistakesTitle: "The most common false good ideas",
      mistakes: [
        "Looking only for the closest tutor instead of the best-fit teaching profile.",
        "Waiting too long while Secondary 4 is already starting to weaken.",
        "Focusing only on the next mark instead of rebuilding the method.",
      ],
      tutoringTitle: "When this page matches the need exactly",
      tutoringPoints: [
        "When you are in Montreal and Secondary 4 has become a real point of friction.",
        "When the student needs clearer explanations around functions and problem solving.",
        "When you want a fast first conversation before booking.",
      ],
      faq: [
        {
          question: "Can tutoring still happen online even if we are in Montreal?",
          answer:
            "Yes. Online sessions remain available across Montreal, with in-person options depending on area and the right tutor profile.",
        },
        {
          question: "Does Secondary 4 already justify weekly follow-up?",
          answer:
            "Often yes, especially if functions or method are starting to slide. Regular follow-up can keep the issue from hardening before the final years.",
        },
      ],
      ctaTitle: "Looking for a Montreal math tutor for Secondary 4?",
      ctaText:
        "A first call can quickly clarify the level, urgency and the kind of support that will help right away.",
      relatedRouteKeys: ["sec4Math", "mathExamPrep", "mathMinisterial"],
    },
  },
}

export function getResourcePageContent(routeKey, locale = "fr") {
  return resourcePageContent[routeKey]?.[locale] || null
}
