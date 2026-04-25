export const resourceRouteKeys = [
  "mathExamPrep",
  "scienceExamPrep",
  "sec4Math",
  "catchUp",
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
}

export function getResourcePageContent(routeKey, locale = "fr") {
  return resourcePageContent[routeKey]?.[locale] || null
}
