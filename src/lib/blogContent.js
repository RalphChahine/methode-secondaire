export const blogRouteKeys = [
  "blogMathAnxiety",
  "blogTutoringEvidence",
  "blogHomeworkResearch",
  "blogSpacingMath",
  "blogScienceWriting",
  "blogParentSupport",
]

export const blogHubCopyByLocale = {
  fr: {
    eyebrow: "Blogue fonde sur la recherche",
    title: "Des articles solides pour les parents qui veulent comprendre avant d'agir",
    description:
      "Ce blogue transforme des etudes et des meta-analyses en conseils utiles pour les familles du secondaire. Le but n'est pas d'impressionner avec du jargon, mais d'aider un parent a mieux lire la situation de son enfant.",
    cta: "Lire l'article",
  },
  en: {
    eyebrow: "Research-backed blog",
    title: "Articles for families who want evidence before they act",
    description:
      "This blog turns studies and meta-analyses into useful guidance for high school families. The goal is not to overwhelm parents with jargon, but to help them understand what is happening and what to do next.",
    cta: "Read the article",
  },
}

export const blogPageContent = {
  blogMathAnxiety: {
    fr: {
      cardTitle: "Pourquoi un eleve bloque en maths meme quand il ecoute en classe",
      cardDescription:
        "Un article sur l'anxiete en maths, le gel devant les exercices et ce que la recherche dit sur les interventions qui aident vraiment.",
      eyebrow: "Maths et confiance",
      heroTitle: "Pourquoi un eleve peut geler en maths meme quand il a deja vu la matiere",
      heroText:
        "Beaucoup de parents pensent qu'un blocage en maths vient seulement d'un manque d'effort ou d'attention. La recherche raconte une histoire plus fine: quand l'anxiete prend trop de place, l'eleve peut perdre l'acces a une partie de ce qu'il sait deja.",
      seoTitle: "Pourquoi un eleve bloque en maths | Blogue Methode Secondaire",
      seoDescription:
        "Un article fonde sur la recherche sur l'anxiete en maths au secondaire: pourquoi un eleve peut geler, quoi observer a la maison et quand le tutorat aide vraiment.",
      keywords:
        "anxiete maths secondaire, blocage en mathematiques, eleve gele en maths, confiance mathematiques secondaire, tutorat anxiete maths",
      studyHighlights: [
        {
          value: "50 etudes",
          title: "Meta-analyse sur les interventions",
          description:
            "Une meta-analyse de 2023 a synthetise 50 etudes sur les interventions visant a reduire l'anxiete en maths.",
        },
        {
          value: "g = -0.467",
          title: "Baisse moderee de l'anxiete",
          description:
            "Les interventions efficaces reduisaient l'anxiete en maths de facon moderee, avec un gain parallele sur la performance.",
        },
        {
          value: "12 ans et plus",
          title: "Effet tres pertinent au secondaire",
          description:
            "Les plus fortes diminutions d'anxiete apparaissaient chez les eleves plus ages, donc tres pertinents pour le secondaire.",
        },
      ],
      sections: [
        {
          title: "Le vrai probleme n'est pas toujours le niveau scolaire",
          paragraphs: [
            "Un parent voit parfois un ado qui semblait comprendre en classe, puis qui s'ecroule seul devant un devoir. Ce decalage n'est pas imaginaire. Une meta-analyse de 2019 sur le lien entre anxiete en maths et performance a confirme une relation negative robuste chez les eleves d'age scolaire.",
            "Autrement dit, plus la tension monte, plus l'eleve risque de perdre en fluidite, en memoire de travail et en capacite a organiser sa demarche. Ce n'est pas la seule cause possible d'une baisse, mais c'est une cause reelle et frequente.",
          ],
        },
        {
          title: "Ce que les interventions utiles ont en commun",
          paragraphs: [
            "La meta-analyse de Sammallahti et ses collegues en 2023 montre que les approches qui combinent soutien cognitif et regulation des emotions peuvent a la fois reduire l'anxiete et ameliorer la performance en maths.",
            "Pour un parent, cela veut dire qu'un bon accompagnement ne devrait pas seulement corriger des reponses. Il devrait aussi rendre la demarche plus previsible, plus stable et moins chargee de panique.",
          ],
          bullets: [
            "Rendre les etapes de resolution plus lisibles.",
            "Nommer les erreurs recurrentes sans dramatiser.",
            "Redonner a l'eleve une facon de commencer au lieu de le laisser improviser.",
          ],
        },
        {
          title: "Ce qu'un parent peut observer cette semaine",
          paragraphs: [
            "Si un eleve saute trop vite a la reponse, efface beaucoup, change souvent de methode ou bloque des qu'une question parait longue, il ne s'agit pas seulement de 'mauvaise volonte'. Souvent, le systeme de travail n'est plus assez securisant.",
            "Le bon reflexe n'est pas de multiplier les feuilles. Le bon reflexe est de chercher si l'eleve sait encore lire calmement, choisir une demarche et la tenir jusqu'au bout.",
          ],
        },
      ],
      parentActionsTitle: "Ce qu'un parent peut faire sans empirer la pression",
      parentActions: [
        "Demander a l'eleve de raconter la premiere etape plutot que d'exiger la bonne reponse tout de suite.",
        "Revenir sur un seul type de question a la fois au lieu de melanger tout le chapitre.",
        "Chercher des signes de gel, d'evitement ou de panique, pas seulement des erreurs de calcul.",
      ],
      tutoringTitle: "Quand le tutorat aide le plus dans ce contexte",
      tutoringPoints: [
        "Quand l'eleve a besoin d'une methode plus calme et reproductible.",
        "Quand les explications a la maison tournent en tension ou en confusion.",
        "Quand il faut reconstruire la confiance sans attendre que l'anxiete contamine tout le chapitre.",
      ],
      sources: [
        {
          label: "Sammallahti et al. (2023) - A Meta-Analysis of Math Anxiety Interventions",
          url: "https://eric.ed.gov/?id=EJ1400784",
          note: "Meta-analyse: 50 etudes, baisse moderee de l'anxiete et gain de performance.",
        },
        {
          label: "Zhang et al. (2019) - The Relation between Mathematics Anxiety and Mathematics Performance among School-Aged Students",
          url: "https://eric.ed.gov/?id=EJ1213924",
          note: "Meta-analyse sur le lien negatif entre anxiete en maths et performance scolaire.",
        },
      ],
      ctaTitle: "Si le vrai probleme ressemble plus a un gel qu'a un simple manque de pratique",
      ctaText:
        "Le plus utile est souvent de clarifier la source du blocage, puis de remettre une methode stable a la place de la panique.",
      relatedRouteKeys: ["blogTutoringEvidence", "blogSpacingMath", "maths"],
    },
    en: {
      cardTitle: "Why a student can freeze in math even after seeing the lesson",
      cardDescription:
        "A research-based article about math anxiety, freezing on problems and the kinds of interventions that actually help.",
      eyebrow: "Math and confidence",
      heroTitle: "Why a student can freeze in math even when the material is not totally new",
      heroText:
        "Many parents assume a math block must come only from lack of effort or attention. The research tells a more precise story: when anxiety gets too strong, students can lose access to part of what they already know.",
      seoTitle: "Why students freeze in math | Methode Secondaire Blog",
      seoDescription:
        "A research-backed article about math anxiety in high school: why students freeze, what to watch for at home and when tutoring helps most.",
      keywords:
        "math anxiety high school, freezing in math, student blocks in math, confidence in mathematics, tutoring math anxiety",
      studyHighlights: [
        {
          value: "50 studies",
          title: "Meta-analysis of interventions",
          description:
            "A 2023 meta-analysis synthesized 50 studies on interventions designed to reduce math anxiety.",
        },
        {
          value: "g = -0.467",
          title: "Moderate anxiety reduction",
          description:
            "Effective interventions showed a moderate reduction in math anxiety alongside better performance.",
        },
        {
          value: "Age 12+",
          title: "Especially relevant for high school",
          description:
            "The biggest decreases in anxiety appeared among older students, which matters directly for secondary school.",
        },
      ],
      sections: [
        {
          title: "The problem is not always raw ability",
          paragraphs: [
            "Parents often see a teenager who seemed to follow in class and then falls apart alone during homework. That gap is real. A 2019 meta-analysis on math anxiety and performance confirmed a robust negative relationship among school-aged students.",
            "In practice, rising anxiety can disrupt working memory, decision-making and the ability to hold a solution path together. It is not the only cause of weak results, but it is a real and common one.",
          ],
        },
        {
          title: "What the most useful interventions share",
          paragraphs: [
            "The 2023 meta-analysis by Sammallahti and colleagues found that interventions built around cognitive support and emotional regulation could reduce anxiety while also improving math performance.",
            "For parents, that means strong support should do more than correct answers. It should make the solving process more stable, more predictable and less panic-driven.",
          ],
          bullets: [
            "Make the steps of the method easier to see.",
            "Name repeated errors without turning every mistake into a crisis.",
            "Give the student a reliable starting sequence instead of improvised guessing.",
          ],
        },
        {
          title: "What to notice this week at home",
          paragraphs: [
            "If a student jumps too fast to an answer, erases constantly, switches methods mid-problem or shuts down on longer questions, this is not just 'bad attitude'. Very often, the work system no longer feels safe enough.",
            "The right next move is usually not more worksheets. It is to ask whether the student can still read calmly, choose an approach and hold it through to the end.",
          ],
        },
      ],
      parentActionsTitle: "What parents can do without raising the pressure",
      parentActions: [
        "Ask the student to explain the first step instead of demanding the final answer immediately.",
        "Work on one type of question at a time rather than mixing the whole chapter together.",
        "Watch for freezing, avoidance and panic, not only calculation mistakes.",
      ],
      tutoringTitle: "When tutoring helps most in this situation",
      tutoringPoints: [
        "When the student needs a calmer and more repeatable method.",
        "When explanations at home keep turning into tension or confusion.",
        "When confidence has to be rebuilt before anxiety spreads across the whole course.",
      ],
      sources: [
        {
          label: "Sammallahti et al. (2023) - A Meta-Analysis of Math Anxiety Interventions",
          url: "https://eric.ed.gov/?id=EJ1400784",
          note: "Meta-analysis: 50 studies, moderate anxiety reduction and improved performance.",
        },
        {
          label: "Zhang et al. (2019) - The Relation between Mathematics Anxiety and Mathematics Performance among School-Aged Students",
          url: "https://eric.ed.gov/?id=EJ1213924",
          note: "Meta-analysis on the negative link between math anxiety and performance.",
        },
      ],
      ctaTitle: "If the real issue looks more like freezing than simple lack of practice",
      ctaText:
        "The most useful move is often to clarify the source of the block and rebuild a calmer method before the panic grows.",
      relatedRouteKeys: ["blogTutoringEvidence", "blogSpacingMath", "maths"],
    },
  },
  blogTutoringEvidence: {
    fr: {
      cardTitle: "Le tutorat prive fonctionne-t-il vraiment au secondaire ?",
      cardDescription:
        "Ce que les meta-analyses disent du tutorat 1 a 1, des petits groupes et des interventions en maths chez les adolescents.",
      eyebrow: "Tutorat et impact",
      heroTitle: "Le tutorat prive fonctionne-t-il vraiment au secondaire ? Ce que disent les etudes",
      heroText:
        "Le tutorat est souvent vendu comme une solution evidente. La recherche est plus utile que le marketing: elle aide a voir quand le tutorat fait vraiment une difference, et ce qui se cache derriere un bon resultat.",
      seoTitle: "Le tutorat prive fonctionne-t-il vraiment ? | Blogue Methode Secondaire",
      seoDescription:
        "Un article fonde sur les etudes sur l'efficacite du tutorat au secondaire: ce qui marche, ce qui compte le plus et pourquoi la structure change tout.",
      keywords:
        "efficacite tutorat secondaire, etudes tutorat prive, tutorat mathematiques secondaire recherche, impact tutorat scolaire",
      studyHighlights: [
        {
          value: "0.37 SD",
          title: "Effet global du tutorat",
          description:
            "La revue systematique de Nickow, Oreopoulos et Quan a trouve un effet global substantiel du tutorat sur l'apprentissage.",
        },
        {
          value: "g = 0.52",
          title: "Interventions maths pour ados",
          description:
            "Une meta-analyse de 2021 sur les adolescents en difficulte en maths a trouve un effet cumule moderement eleve.",
        },
        {
          value: "Contexte et structure",
          title: "Le format compte vraiment",
          description:
            "Le contenu, la duree et le cadre de l'intervention modifient fortement les gains observes.",
        },
      ],
      sections: [
        {
          title: "Le tutorat n'est pas magique, mais il peut etre puissant",
          paragraphs: [
            "La meta-analyse de Nickow, Oreopoulos et Quan en 2020 synthese des experiences experimentales sur le tutorat preK-12. Leur conclusion principale est claire: le tutorat produit des effets positifs et substantiels sur l'apprentissage, avec un effet moyen de 0.37 ecart-type.",
            "Mais la lecon la plus utile pour un parent est ailleurs: tous les tutorats ne se valent pas. Les programmes avec plus de structure, de formation et de lien avec le travail scolaire normal obtiennent de meilleurs resultats.",
          ],
        },
        {
          title: "Au secondaire, la precision vaut plus que le volume",
          paragraphs: [
            "Chez les adolescents en difficulte en maths, la meta-analyse de Myers et ses collegues en 2021 montre un effet cumule de g = 0.52. Les resultats varient selon le domaine travaille, la longueur de l'intervention et la facon de mesurer les progres.",
            "Pour une famille, cela veut dire qu'il faut cesser de juger le tutorat seulement au nombre d'heures. Le vrai critere est: est-ce que le bon besoin est cible, avec le bon niveau d'exigence et le bon rythme ?",
          ],
        },
        {
          title: "Ce qu'un parent devrait demander avant de payer",
          paragraphs: [
            "Un bon service devrait etre capable d'expliquer pourquoi il recommande un appel, une seance ciblee, un sprint ou un suivi hebdomadaire. Quand tout est vendu de la meme facon, la probabilite de payer pour un mauvais format augmente.",
          ],
          bullets: [
            "Quel est le vrai blocage observe ?",
            "Le besoin est-il ponctuel, intensif ou regulier ?",
            "Comment la seance se reliera-t-elle aux devoirs, aux tests et a la semaine suivante ?",
          ],
        },
      ],
      parentActionsTitle: "Ce qu'un parent peut retenir tout de suite",
      parentActions: [
        "Le tutorat est plus utile quand il est cible et structure.",
        "Le bon tuteur n'est pas seulement 'bon en matiere'; il doit aussi rendre la logique visible.",
        "Le bon format vaut souvent plus qu'une heure de plus.",
      ],
      tutoringTitle: "Quand un parent a raison d'investir dans du tutorat",
      tutoringPoints: [
        "Quand le probleme se repete meme apres les devoirs et les relectures.",
        "Quand l'eleve a besoin d'une methode qui se tient d'une semaine a l'autre.",
        "Quand l'urgence d'un examen ou d'un retard accumule exige plus qu'un simple coup de main ponctuel.",
      ],
      sources: [
        {
          label: "Nickow, Oreopoulos & Quan (2020) - The Impressive Effects of Tutoring on PreK-12 Learning",
          url: "https://www.nber.org/papers/w27476",
          note: "Revue systematique et meta-analyse de l'evidence experimentale sur le tutorat.",
        },
        {
          label: "Myers et al. (2021) - Mathematics Interventions for Adolescents with Mathematics Difficulties",
          url: "https://eric.ed.gov/?id=EJ1297369",
          note: "Meta-analyse sur les interventions mathematiques pour adolescents en difficulte.",
        },
      ],
      ctaTitle: "Si tu veux payer pour le bon format plutot que pour de simples heures",
      ctaText:
        "Le premier gain vient souvent d'un bon cadrage: besoin ponctuel, suivi hebdomadaire ou sprint d'examen. C'est la que la valeur du tutorat devient visible.",
      relatedRouteKeys: ["blogMathAnxiety", "blogHomeworkResearch", "weeklyFollowUp"],
    },
    en: {
      cardTitle: "Does private tutoring really work in high school?",
      cardDescription:
        "What meta-analyses say about one-to-one tutoring, small-group support and math interventions for adolescents.",
      eyebrow: "Tutoring and outcomes",
      heroTitle: "Does private tutoring really work in high school? What the evidence actually says",
      heroText:
        "Tutoring is often marketed as an obvious solution. Research is more useful than marketing because it shows when tutoring really changes outcomes and what separates a strong format from a weak one.",
      seoTitle: "Does private tutoring really work? | Methode Secondaire Blog",
      seoDescription:
        "A research-backed article on tutoring effectiveness in high school: what works, what matters most and why structure changes the outcome.",
      keywords:
        "tutoring effectiveness high school, tutoring research math, does private tutoring work, academic tutoring studies",
      studyHighlights: [
        {
          value: "0.37 SD",
          title: "Overall tutoring effect",
          description:
            "Nickow, Oreopoulos and Quan found a substantial pooled effect of tutoring on learning outcomes.",
        },
        {
          value: "g = 0.52",
          title: "Math interventions for adolescents",
          description:
            "A 2021 meta-analysis on adolescents with math difficulties found a moderately large cumulative effect.",
        },
        {
          value: "Structure matters",
          title: "Format changes results",
          description:
            "Content domain, intervention length and design all influenced how much students improved.",
        },
      ],
      sections: [
        {
          title: "Tutoring is not magic, but it can be powerful",
          paragraphs: [
            "The 2020 meta-analysis by Nickow, Oreopoulos and Quan synthesized experimental evidence on tutoring and found strong positive impacts on student learning, with an average effect of 0.37 standard deviations.",
            "The more useful parent lesson is that not all tutoring is equal. Programs with stronger structure, better training and closer links to normal schoolwork produced stronger outcomes.",
          ],
        },
        {
          title: "In high school, precision matters more than volume",
          paragraphs: [
            "For adolescents with math difficulties, Myers and colleagues found a cumulative effect of g = 0.52 in 2021. The size of the gains depended on what was taught, how long the intervention lasted and how progress was measured.",
            "For families, that means tutoring should not be judged only by the number of hours purchased. The real question is whether the right need is being targeted with the right pace and the right level of structure.",
          ],
        },
        {
          title: "What parents should ask before paying",
          paragraphs: [
            "A strong service should be able to explain why it recommends a call, a focused session, an exam sprint or weekly follow-up. When every situation is sold the same way, the risk of paying for the wrong format increases.",
          ],
          bullets: [
            "What is the actual learning block?",
            "Is the need one-time, intensive or ongoing?",
            "How will the support connect to homework, tests and the following week?",
          ],
        },
      ],
      parentActionsTitle: "What parents can keep in mind right away",
      parentActions: [
        "Tutoring works better when it is targeted and structured.",
        "The right tutor is not only strong in the subject; they must make the logic visible.",
        "The right format often matters more than one extra hour.",
      ],
      tutoringTitle: "When it makes sense to invest in tutoring",
      tutoringPoints: [
        "When the same issue keeps coming back after homework and review.",
        "When the student needs a method that carries from one week to the next.",
        "When exam pressure or accumulated gaps require more than one quick fix.",
      ],
      sources: [
        {
          label: "Nickow, Oreopoulos & Quan (2020) - The Impressive Effects of Tutoring on PreK-12 Learning",
          url: "https://www.nber.org/papers/w27476",
          note: "Systematic review and meta-analysis of experimental evidence on tutoring.",
        },
        {
          label: "Myers et al. (2021) - Mathematics Interventions for Adolescents with Mathematics Difficulties",
          url: "https://eric.ed.gov/?id=EJ1297369",
          note: "Meta-analysis of math interventions for adolescents with mathematics difficulties.",
        },
      ],
      ctaTitle: "If you want to pay for the right format rather than random hours",
      ctaText:
        "The first real gain often comes from sharper diagnosis: one-time need, weekly follow-up or exam sprint. That is where tutoring starts becoming worth the money.",
      relatedRouteKeys: ["blogMathAnxiety", "blogHomeworkResearch", "weeklyFollowUp"],
    },
  },
  blogHomeworkResearch: {
    fr: {
      cardTitle: "Aide aux devoirs : ce qui aide vraiment, et ce qui cree plus de friction",
      cardDescription:
        "Un article base sur la recherche sur les devoirs, les SMS aux parents et les outils qui donnent du feedback immediat en maths.",
      eyebrow: "Devoirs et maison",
      heroTitle: "Aide aux devoirs : ce qui aide vraiment a la maison, et ce qui ajoute juste de la friction",
      heroText:
        "L'aide aux devoirs devient contre-productive quand elle se transforme en surveillance floue, en tensions ou en repetition mecanique. Les etudes sont utiles ici parce qu'elles montrent que la qualite du soutien compte plus que l'intensite du controle.",
      seoTitle: "Aide aux devoirs : ce qui aide vraiment | Blogue Methode Secondaire",
      seoDescription:
        "Un article de blogue fonde sur la recherche sur l'aide aux devoirs au secondaire: implication parentale, feedback rapide et erreurs qui augmentent la friction.",
      keywords:
        "aide aux devoirs secondaire recherche, devoirs math aide parents, feedback immediat devoirs maths, devoirs secondaire stress",
      studyHighlights: [
        {
          value: "0.488 SD",
          title: "Nudges parentaux simples",
          description:
            "Dans une etude de 2019, de simples activites hebdomadaires envoyees par SMS aux parents ont augmente la moyenne de maths des adolescents.",
        },
        {
          value: "43 ecoles",
          title: "ASSISTments en essai randomise",
          description:
            "L'evaluation IES d'ASSISTments a montre une hausse significative des scores en maths face aux pratiques habituelles de devoirs.",
        },
        {
          value: "14 etudes",
          title: "Former les parents change la donne",
          description:
            "Une synthese de recherche a montre que former les parents a mieux soutenir les devoirs augmente la completion et reduit les problemes de devoirs.",
        },
      ],
      sections: [
        {
          title: "Tout soutien parental n'aide pas de la meme facon",
          paragraphs: [
            "La synthese de Patall, Cooper et Robinson en 2008 montre une chose importante pour les familles: l'implication parentale dans les devoirs n'est pas automatiquement positive. Certaines formes aident, d'autres peuvent devenir intrusives ou inefficaces.",
            "Ce qui semble plus utile, c'est un cadre clair, des regles simples, et des interventions parentales qui soutiennent le processus au lieu de remplacer le travail intellectuel de l'eleve.",
          ],
        },
        {
          title: "Les petits nudges bien places peuvent avoir un vrai effet",
          paragraphs: [
            "Dans l'etude de Santana et ses collegues en 2019, des parents d'adolescents recevaient des SMS hebdomadaires leur proposant de courtes activites non curriculaires a faire avec leur enfant. Le professeur reliait ensuite ces activites au cours de maths.",
            "Le resultat est fort: la moyenne de maths augmentait de 0.488 ecart-type par rapport au groupe temoin. La lecon pratique est simple: une implication legere, reguliere et bien guidee vaut souvent mieux qu'une pression improvisee.",
          ],
        },
        {
          title: "Le feedback immediat change aussi la qualite des devoirs",
          paragraphs: [
            "L'evaluation IES de la plateforme ASSISTments a utilise un essai randomise en milieu reel. Les devoirs donnaient un feedback immediat, des indices et un suivi plus fin pour les enseignants.",
            "Les scores de maths augmentaient significativement, surtout chez les eleves plus faibles. Cela rappelle qu'un bon devoir n'est pas juste une quantite de questions. C'est une boucle de pratique, feedback et ajustement.",
          ],
        },
      ],
      parentActionsTitle: "Ce qu'un parent peut faire cette semaine",
      parentActions: [
        "Remplacer la question 'as-tu fini ?' par 'qu'est-ce qui a ete le plus flou aujourd'hui ?'.",
        "Aider l'eleve a commencer, mais lui laisser la responsabilite d'executer les etapes.",
        "Chercher du feedback rapide et ciblé plutot qu'une longue correction en fin de soiree.",
      ],
      tutoringTitle: "Quand l'aide aux devoirs devrait devenir plus structuree",
      tutoringPoints: [
        "Quand chaque devoir redevient un conflit ou un brouillard.",
        "Quand l'eleve ne profite pas du travail fait a la maison parce qu'il ne corrige pas ses erreurs.",
        "Quand le parent sent qu'il accompagne beaucoup sans savoir si cela aide vraiment.",
      ],
      sources: [
        {
          label: "Patall, Cooper & Robinson (2008) - Parent Involvement in Homework: A Research Synthesis",
          url: "https://eric.ed.gov/?id=EJ896560",
          note: "Synthese de recherche sur les formes d'implication parentale dans les devoirs.",
        },
        {
          label: "Santana et al. (2019) - Having Fun Doing Math",
          url: "https://eric.ed.gov/?id=EJ1215567",
          note: "Essai randomise avec activites parent-enfant envoyees par SMS.",
        },
        {
          label: "IES - ASSISTments Formative Assessment and Tutoring Platform",
          url: "https://ies.ed.gov/use-work/awards/efficacy-study-online-mathematics-homework-support-evaluation-assistments-formative-assessment-and",
          note: "Evaluation randomisee d'un systeme de devoirs avec feedback immediat et tutorat integre.",
        },
      ],
      ctaTitle: "Si les devoirs prennent plus d'energie que de progres",
      ctaText:
        "Le vrai gain vient souvent d'un cadre plus clair, d'un meilleur feedback et d'une aide qui soutient la pensee de l'eleve au lieu de la remplacer.",
      relatedRouteKeys: ["blogParentSupport", "blogTutoringEvidence", "homeworkHelpSecondary"],
    },
    en: {
      cardTitle: "Homework help: what actually helps, and what only creates more friction",
      cardDescription:
        "A research-based article on homework, parent text nudges and math platforms that provide immediate feedback.",
      eyebrow: "Homework at home",
      heroTitle: "Homework help: what really helps at home, and what just creates more friction",
      heroText:
        "Homework support becomes counterproductive when it turns into vague supervision, tension or mechanical repetition. Research is useful here because it shows that the quality of support matters more than the intensity of control.",
      seoTitle: "Homework help: what actually works | Methode Secondaire Blog",
      seoDescription:
        "A research-backed article on homework help in high school: parent involvement, rapid feedback and common mistakes that create more friction than progress.",
      keywords:
        "homework help research high school, math homework parent support, immediate feedback homework, homework stress secondary",
      studyHighlights: [
        {
          value: "0.488 SD",
          title: "Simple parent nudges",
          description:
            "In a 2019 study, short weekly activities sent to parents by text message increased adolescents' math GPA.",
        },
        {
          value: "43 schools",
          title: "ASSISTments randomized study",
          description:
            "The IES evaluation of ASSISTments found significant gains in math scores compared with usual homework practices.",
        },
        {
          value: "14 studies",
          title: "Parent training matters",
          description:
            "A research synthesis found that training parents to support homework increased completion and reduced homework problems.",
        },
      ],
      sections: [
        {
          title: "Not every form of parent support helps the same way",
          paragraphs: [
            "The 2008 synthesis by Patall, Cooper and Robinson shows something important for families: parent involvement in homework is not automatically helpful. Some forms support learning, while others become intrusive or ineffective.",
            "What seems more useful is a clear structure, simple rules and parent actions that support the process instead of replacing the student's thinking.",
          ],
        },
        {
          title: "Small, well-designed nudges can have real impact",
          paragraphs: [
            "In Santana and colleagues' 2019 study, parents of adolescents received weekly text messages with short, non-curricular activities to do with their children. Teachers then connected those activities to math class content.",
            "The result was strong: students' math GPA increased by 0.488 standard deviations compared with the control group. The practical lesson is that light, regular, guided involvement often beats improvised pressure.",
          ],
        },
        {
          title: "Immediate feedback changes homework quality too",
          paragraphs: [
            "The IES evaluation of ASSISTments used a randomized field design. Homework came with immediate feedback, hints and more useful diagnostic information for teachers.",
            "Math scores increased significantly, especially for lower-performing students. That reminds us that strong homework is not just a pile of questions. It is a loop of practice, feedback and adjustment.",
          ],
        },
      ],
      parentActionsTitle: "What parents can do this week",
      parentActions: [
        "Replace 'did you finish?' with 'what felt least clear today?'.",
        "Help the student start, but leave the thinking work to them.",
        "Look for fast, targeted feedback instead of one long correction at the end of the evening.",
      ],
      tutoringTitle: "When homework help should become more structured",
      tutoringPoints: [
        "When every homework night turns into conflict or fog.",
        "When the student does the work but does not learn from the mistakes.",
        "When the parent is helping a lot without knowing whether it is truly working.",
      ],
      sources: [
        {
          label: "Patall, Cooper & Robinson (2008) - Parent Involvement in Homework: A Research Synthesis",
          url: "https://eric.ed.gov/?id=EJ896560",
          note: "Research synthesis on different forms of parent involvement in homework.",
        },
        {
          label: "Santana et al. (2019) - Having Fun Doing Math",
          url: "https://eric.ed.gov/?id=EJ1215567",
          note: "Randomized study using weekly parent-child math nudges by text message.",
        },
        {
          label: "IES - ASSISTments Formative Assessment and Tutoring Platform",
          url: "https://ies.ed.gov/use-work/awards/efficacy-study-online-mathematics-homework-support-evaluation-assistments-formative-assessment-and",
          note: "Randomized evaluation of a homework platform with immediate feedback and tutoring support.",
        },
      ],
      ctaTitle: "If homework is taking more energy than progress",
      ctaText:
        "The biggest gain often comes from better structure, better feedback and support that strengthens the student's thinking rather than replacing it.",
      relatedRouteKeys: ["blogParentSupport", "blogTutoringEvidence", "homeworkHelpSecondary"],
    },
  },
  blogSpacingMath: {
    fr: {
      cardTitle: "Reviser un examen de maths : pourquoi espacer vaut mieux que bachoter",
      cardDescription:
        "La recherche recente sur la pratique espacee en maths confirme qu'un bon plan de revision vaut mieux qu'une soiree marathon.",
      eyebrow: "Revision intelligente",
      heroTitle: "Reviser un examen de maths : pourquoi espacer vaut mieux que bachoter",
      heroText:
        "Bachoter donne parfois une illusion de controle, mais rarement une retention solide. Les recherches recentes sur la pratique espacee en mathematiques montrent qu'un plan plus court, reparti et logique peut faire mieux que des blocs massifs de derniere minute.",
      seoTitle: "Pourquoi espacer la revision en maths | Blogue Methode Secondaire",
      seoDescription:
        "Un article base sur la meta-analyse 2025 sur la pratique espacee en mathematiques: quoi faire avant un examen et comment mieux repartir les efforts.",
      keywords:
        "pratique espacee maths, revision examen maths secondaire, bachotage mathematiques, retrieval practice maths, revision intelligente",
      studyHighlights: [
        {
          value: "g = 0.28",
          title: "Avantage global de l'espacement",
          description:
            "La meta-analyse 2025 a trouve un effet petit a moyen en faveur de la pratique espacee contre la pratique compacte.",
        },
        {
          value: "g = 0.43",
          title: "Effet plus fort en apprentissage isole",
          description:
            "Quand le materiel etait travaille en modules plus isoles, l'effet de l'espacement etait plus grand.",
        },
        {
          value: "Pas juste plus de temps",
          title: "C'est la repartition qui aide",
          description:
            "Le gain ne vient pas seulement d'etudier davantage, mais de mieux distribuer les reprises.",
        },
      ],
      sections: [
        {
          title: "Pourquoi le bachotage rassure sans toujours consolider",
          paragraphs: [
            "La veille d'un examen, l'eleve peut avoir l'impression que deux ou trois heures massives sont la seule option serieuse. Le probleme est que cette approche favorise souvent la familiarite immediate plus que la retention durable.",
            "La meta-analyse de 2025 sur l'espacement et la pratique de recuperation en mathematiques suggere qu'espacer la pratique sur plusieurs moments aide mieux l'apprentissage que de tout concentrer dans un seul bloc.",
          ],
        },
        {
          title: "Comment un parent peut transformer la revision",
          paragraphs: [
            "Le but n'est pas de supprimer les exercices. C'est de les re-distribuer. Un parent peut aider a planifier trois petits passages sur un type de probleme plutot qu'une seule longue soiree qui finit dans la fatigue.",
            "Cette logique vaut encore plus quand l'eleve confond plusieurs chapitres. Revenir sur les notions a intervalles rapprochees aide a mieux les distinguer.",
          ],
          bullets: [
            "Revoir un type de question pendant 20 a 30 minutes.",
            "Laisser passer du temps avant d'y revenir.",
            "Demander a l'eleve de retrouver la demarche au lieu de la relire passivement.",
          ],
        },
        {
          title: "Ce qu'il faut retenir quand l'examen est proche",
          paragraphs: [
            "Quand il ne reste que quelques jours, on ne peut pas toujours creer un plan ideal sur plusieurs semaines. Mais meme a court terme, mieux vaut deux ou trois passages cibles sur des notions prioritaires qu'une seule accumulation confuse.",
          ],
        },
      ],
      parentActionsTitle: "Mini plan pratique pour cette semaine",
      parentActions: [
        "Decouper la revision par types de questions plutot que par panique generale.",
        "Faire revenir les memes notions deux ou trois fois a intervalle raisonnable.",
        "Demander la demarche de memoire avant de laisser l'eleve relire ses notes.",
      ],
      tutoringTitle: "Quand un tuteur fait gagner un temps enorme",
      tutoringPoints: [
        "Quand il faut trier tres vite les chapitres prioritaires.",
        "Quand l'eleve ne sait plus quoi revoir ni dans quel ordre.",
        "Quand le parent veut un vrai plan de revision au lieu d'un bachotage improvise.",
      ],
      sources: [
        {
          label: "Moshfeghi et al. (2025) - A Meta-Analytic Review of the Effectiveness of Spacing and Retrieval Practice for Mathematics Learning",
          url: "https://eric.ed.gov/?id=EJ1478558",
          note: "Meta-analyse recente sur l'espacement et la recuperation active en mathematiques.",
        },
      ],
      ctaTitle: "Si la revision est longue mais reste encore floue",
      ctaText:
        "Le bon levier n'est pas toujours plus de temps. C'est souvent un meilleur ordre de revision et une meilleure selection des questions a reprendre.",
      relatedRouteKeys: ["blogMathAnxiety", "blogTutoringEvidence", "examSprint"],
    },
    en: {
      cardTitle: "Math exam revision: why spacing beats cramming",
      cardDescription:
        "Recent research on spaced practice in math supports a better revision plan than one last-minute marathon session.",
      eyebrow: "Smarter revision",
      heroTitle: "Math exam revision: why spacing beats cramming",
      heroText:
        "Cramming can feel intense and productive, but it rarely creates strong retention. Recent research on spaced practice in mathematics suggests that shorter, distributed review can outperform one giant last-minute block.",
      seoTitle: "Why spaced practice beats cramming in math | Methode Secondaire Blog",
      seoDescription:
        "A research-backed article on spaced practice in mathematics: what to do before an exam and how to distribute review more effectively.",
      keywords:
        "spaced practice math, math exam revision, cramming vs spaced practice, retrieval practice mathematics, high school exam prep",
      studyHighlights: [
        {
          value: "g = 0.28",
          title: "Overall spacing advantage",
          description:
            "The 2025 meta-analysis found a small to medium overall advantage for spaced practice over massed practice.",
        },
        {
          value: "g = 0.43",
          title: "Stronger in isolated learning",
          description:
            "When material was practiced in more isolated modules, the spacing effect was larger.",
        },
        {
          value: "Not just more time",
          title: "Distribution matters",
          description:
            "The gain does not come only from studying more. It comes from studying in a better pattern.",
        },
      ],
      sections: [
        {
          title: "Why cramming feels safe but often fails",
          paragraphs: [
            "Right before an exam, students often feel that two or three massive hours are the only serious option. The problem is that this strategy tends to create familiarity more than durable retention.",
            "The 2025 meta-analysis on spacing and retrieval practice in mathematics suggests that spreading practice across several sessions supports stronger learning than concentrating it all in one block.",
          ],
        },
        {
          title: "How parents can change revision quality",
          paragraphs: [
            "The goal is not to remove practice. It is to redistribute it. Parents can help plan three short returns to a question type instead of one exhausting night that ends in fatigue.",
            "This matters even more when the student is mixing several chapters together. Returning to ideas across intervals helps separate and stabilize them.",
          ],
          bullets: [
            "Review one type of question for 20 to 30 minutes.",
            "Leave time before returning to it.",
            "Ask the student to retrieve the approach from memory before rereading notes.",
          ],
        },
        {
          title: "What to do when the exam is close",
          paragraphs: [
            "When only a few days remain, you cannot always build the ideal multi-week plan. But even then, two or three focused returns to the most important topics usually beat one giant, blurry session.",
          ],
        },
      ],
      parentActionsTitle: "A simple plan for this week",
      parentActions: [
        "Split revision by question types instead of by general panic.",
        "Bring the same priority concepts back two or three times at reasonable intervals.",
        "Ask for the method from memory before allowing passive rereading.",
      ],
      tutoringTitle: "When tutoring saves a lot of time here",
      tutoringPoints: [
        "When the family needs fast priority sorting across chapters.",
        "When the student no longer knows what to review or in what order.",
        "When the parent wants a real revision plan instead of improvised cramming.",
      ],
      sources: [
        {
          label: "Moshfeghi et al. (2025) - A Meta-Analytic Review of the Effectiveness of Spacing and Retrieval Practice for Mathematics Learning",
          url: "https://eric.ed.gov/?id=EJ1478558",
          note: "Recent meta-analysis on spacing and retrieval practice in mathematics.",
        },
      ],
      ctaTitle: "If revision is long but still unclear",
      ctaText:
        "The better lever is not always more time. It is often a better review order and a sharper selection of what to revisit.",
      relatedRouteKeys: ["blogMathAnxiety", "blogTutoringEvidence", "examSprint"],
    },
  },
  blogScienceWriting: {
    fr: {
      cardTitle: "En sciences, expliquer par ecrit aide plus qu'on pense",
      cardDescription:
        "Une meta-analyse montre que le fait d'ecrire pour apprendre aide aussi en sciences et en maths, y compris au secondaire.",
      eyebrow: "Sciences et explication",
      heroTitle: "En sciences, expliquer par ecrit aide plus qu'on pense",
      heroText:
        "Beaucoup d'eleves savent 'a peu pres' quoi faire en sciences, mais n'arrivent pas a formuler une reponse complete, un raisonnement ou une analyse de labo. La recherche montre que l'ecriture explicative n'est pas un detail: elle peut renforcer l'apprentissage lui-meme.",
      seoTitle: "Pourquoi ecrire aide en sciences | Blogue Methode Secondaire",
      seoDescription:
        "Un article fonde sur une meta-analyse sur l'ecriture pour apprendre en sciences, en maths et au secondaire: pourquoi expliquer par ecrit renforce la comprehension.",
      keywords:
        "ecrire pour apprendre sciences, reponse developpee sciences secondaire, meta analyse ecriture apprentissage, aide sciences secondaire",
      studyHighlights: [
        {
          value: "56 experiences",
          title: "Base experimentale large",
          description:
            "La meta-analyse de Graham, Kiuhara et MacKay a synthetise 56 experiences sur l'ecriture pour apprendre.",
        },
        {
          value: "0.30",
          title: "Effet positif sur l'apprentissage",
          description:
            "Ecrire sur le contenu appris ameliorait de facon fiable les apprentissages en sciences, maths et sciences sociales.",
        },
        {
          value: "Primaire a secondaire",
          title: "Effet aussi au secondaire",
          description:
            "Les gains n'etaient pas limites aux plus jeunes eleves: l'effet valait aussi pour le secondaire.",
        },
      ],
      sections: [
        {
          title: "Quand un eleve 'sait' sans savoir expliquer",
          paragraphs: [
            "En sciences, beaucoup d'erreurs ne viennent pas d'une ignorance totale, mais d'une connaissance trop fragile pour etre mise en mots. L'eleve reconnait un concept, mais il ne sait pas encore le lier a une observation, a une unite ou a une justification.",
            "La meta-analyse de 2020 sur l'ecriture pour apprendre montre que le fait d'ecrire sur un contenu soutient l'apprentissage de facon fiable, y compris en sciences et en mathematiques.",
          ],
        },
        {
          title: "Pourquoi l'ecriture aide autant",
          paragraphs: [
            "Quand un eleve doit expliquer, il est force de ralentir, de trier l'information, de donner une logique a sa reponse et de voir les trous dans son raisonnement. Ce travail rend la matiere plus visible qu'une simple relecture passive.",
          ],
          bullets: [
            "Nommer le concept en jeu.",
            "Expliquer pourquoi une formule ou une loi s'applique.",
            "Justifier une etape plutot que de seulement la poser.",
          ],
        },
        {
          title: "Ce qu'un parent peut encourager a la maison",
          paragraphs: [
            "Au lieu de demander uniquement si la reponse est bonne, un parent peut demander: 'comment le dirais-tu a voix haute ?' ou 'qu'est-ce que tu devrais ecrire pour convaincre ton prof ?'.",
            "Cela ne transforme pas le parent en enseignant. Cela pousse simplement l'eleve a donner une forme plus claire a sa pensee.",
          ],
        },
      ],
      parentActionsTitle: "Trois reflexes simples a tester",
      parentActions: [
        "Faire expliquer une reponse en une ou deux phrases completes.",
        "Demander quelle unite, quel schema ou quelle idee soutient la reponse.",
        "Revenir sur la qualite de l'explication, pas seulement sur le resultat final.",
      ],
      tutoringTitle: "Quand le tutorat devient utile en sciences",
      tutoringPoints: [
        "Quand l'eleve connait les mots mais pas encore la logique.",
        "Quand les questions a developpement ou les labos font perdre beaucoup de points.",
        "Quand il faut transformer une memoire fragile en raisonnement solide.",
      ],
      sources: [
        {
          label: "Graham, Kiuhara & MacKay (2020) - The Effects of Writing on Learning in Science, Social Studies, and Mathematics",
          url: "https://journals.sagepub.com/doi/abs/10.3102/0034654320914744",
          note: "Meta-analyse: l'ecriture pour apprendre a un effet positif fiable sur l'apprentissage.",
        },
      ],
      ctaTitle: "Si la matiere semble comprise, mais reste difficile a expliquer",
      ctaText:
        "Le prochain cap est souvent de rendre la logique racontable, pas seulement de memoriser davantage.",
      relatedRouteKeys: ["blogHomeworkResearch", "blogTutoringEvidence", "sciences"],
    },
    en: {
      cardTitle: "In science, writing explanations helps more than most families think",
      cardDescription:
        "A meta-analysis suggests that writing-to-learn supports science and math learning, including in high school.",
      eyebrow: "Science and explanation",
      heroTitle: "In science, writing explanations helps more than most families think",
      heroText:
        "Many students can roughly recognize what to do in science, but cannot yet produce a full explanation, a solid line of reasoning or a strong lab-style answer. Research suggests that explanatory writing is not a side issue. It can strengthen the learning itself.",
      seoTitle: "Why writing helps in science | Methode Secondaire Blog",
      seoDescription:
        "A research-backed article on writing-to-learn in science, math and high school: why explaining ideas in writing improves understanding.",
      keywords:
        "writing to learn science, science explanation high school, writing and learning meta-analysis, science tutoring high school",
      studyHighlights: [
        {
          value: "56 experiments",
          title: "Large experimental base",
          description:
            "The Graham, Kiuhara and MacKay meta-analysis synthesized 56 experiments on writing to learn.",
        },
        {
          value: "0.30",
          title: "Reliable positive effect",
          description:
            "Writing about content reliably improved learning in science, math and social studies.",
        },
        {
          value: "Elementary to high school",
          title: "Works in secondary school too",
          description:
            "The benefits were not limited to younger learners; the effect also held in secondary school.",
        },
      ],
      sections: [
        {
          title: "When a student 'knows' without being able to explain",
          paragraphs: [
            "In science, many mistakes come not from total ignorance but from knowledge that is too fragile to be put into words. The student recognizes the concept, but cannot yet connect it to an observation, a unit or a justification.",
            "The 2020 meta-analysis on writing-to-learn found that writing about content reliably supports learning, including in science and mathematics.",
          ],
        },
        {
          title: "Why writing helps so much",
          paragraphs: [
            "When students must explain, they slow down, sort the information, impose logic on the answer and expose the gaps in their own reasoning. That work often makes the subject more visible than passive rereading.",
          ],
          bullets: [
            "Name the concept that matters.",
            "Explain why a formula or law applies.",
            "Justify the step instead of only placing it on the page.",
          ],
        },
        {
          title: "What a parent can encourage at home",
          paragraphs: [
            "Instead of asking only whether the answer is correct, a parent can ask: 'How would you explain this out loud?' or 'What would you need to write to convince your teacher?'",
            "That does not turn the parent into the teacher. It simply pushes the student to give clearer shape to the thinking.",
          ],
        },
      ],
      parentActionsTitle: "Three simple habits to try",
      parentActions: [
        "Ask for a one- or two-sentence explanation of the answer.",
        "Ask which unit, diagram or principle supports the response.",
        "Comment on the quality of the explanation, not only the final result.",
      ],
      tutoringTitle: "When tutoring becomes especially useful in science",
      tutoringPoints: [
        "When the student knows the words but not yet the logic.",
        "When long-form responses or labs are costing too many marks.",
        "When fragile memory has to be turned into solid reasoning.",
      ],
      sources: [
        {
          label: "Graham, Kiuhara & MacKay (2020) - The Effects of Writing on Learning in Science, Social Studies, and Mathematics",
          url: "https://journals.sagepub.com/doi/abs/10.3102/0034654320914744",
          note: "Meta-analysis showing a reliable positive effect of writing-to-learn on learning.",
        },
      ],
      ctaTitle: "If the material seems familiar but still hard to explain",
      ctaText:
        "The next step is often to make the logic explainable, not only to memorize more content.",
      relatedRouteKeys: ["blogHomeworkResearch", "blogTutoringEvidence", "sciences"],
    },
  },
  blogParentSupport: {
    fr: {
      cardTitle: "Ce que les parents peuvent faire a la maison sans devenir le prof",
      cardDescription:
        "Des gestes simples, appuyes par la recherche, qui aident la progression sans transformer la maison en deuxieme salle de classe.",
      eyebrow: "Parents et progression",
      heroTitle: "Ce que les parents peuvent faire a la maison sans devenir le prof",
      heroText:
        "Un parent n'a pas besoin d'enseigner toute la matiere pour aider. La recherche suggere plutot que certaines formes de soutien leger, clair et coherent ont plus de valeur que le controle intense ou l'explication improvisee.",
      seoTitle: "Ce que les parents peuvent faire a la maison | Blogue Methode Secondaire",
      seoDescription:
        "Un article de blogue appuye sur des etudes sur l'implication parentale, les attentes scolaires et les petits gestes qui aident vraiment les adolescents.",
      keywords:
        "implication parentale secondaire recherche, parents devoirs maths, aider ado ecole sans pression, soutien parental secondaire",
      studyHighlights: [
        {
          value: "Relation moderee",
          title: "L'implication parentale compte",
          description:
            "La meta-analyse de Fan et Chen a trouve une relation moderee et pratiquement significative entre implication parentale et reussite scolaire.",
        },
        {
          value: "Attentes > surveillance",
          title: "Les attentes comptent plus",
          description:
            "Dans cette meta-analyse, les aspirations et attentes parentales avaient un lien plus fort avec la reussite que la simple supervision a la maison.",
        },
        {
          value: "0.488 SD",
          title: "Petits gestes reguliers",
          description:
            "De simples SMS d'activites parent-enfant ont aussi augmente la performance en maths dans une etude randomisee.",
        },
      ],
      sections: [
        {
          title: "La maison n'a pas besoin de devenir une salle de classe",
          paragraphs: [
            "La meta-analyse de Fan et Chen montre que l'implication parentale est liee de facon moderee a la reussite scolaire, mais elle montre aussi quelque chose de tres utile: les aspirations et attentes parentales semblent plus puissantes que la simple supervision.",
            "Autrement dit, le parent n'a pas besoin de tout expliquer. Il a surtout besoin de creer un climat ou l'effort, la clarte et les etapes suivantes comptent vraiment.",
          ],
        },
        {
          title: "Des gestes simples valent souvent plus que de longues disputes",
          paragraphs: [
            "L'etude de Santana et ses collegues en 2019 va dans le meme sens: des activites simples, courtes et regulieres entre parent et adolescent peuvent produire un vrai effet sur l'apprentissage, meme sans contenu scolaire direct dans les messages.",
            "Ce qui aide, ce n'est pas seulement le temps passe. C'est la qualite de l'echange et la regularite du signal envoye a l'eleve.",
          ],
        },
        {
          title: "Ce qu'un parent peut viser a la maison",
          paragraphs: [
            "L'objectif n'est pas de remplacer l'enseignant ou le tuteur. L'objectif est de rendre les attentes plus lisibles, les priorites plus claires et le lien avec le travail scolaire plus stable.",
          ],
          bullets: [
            "Parler de la matiere et des objectifs sans transformer chaque soir en interrogatoire.",
            "Aider l'eleve a preparer son plan de travail avant de corriger les details.",
            "Revenir sur ce qui a ete compris, pas seulement sur ce qui a ete fini.",
          ],
        },
      ],
      parentActionsTitle: "Trois actions parentales a forte valeur",
      parentActions: [
        "Nommer une attente simple et concrete pour la semaine.",
        "Demander ce qui a ete le plus clair et le plus flou, pas seulement si le devoir est fini.",
        "Aider a organiser le travail avant de vouloir corriger chaque exercice.",
      ],
      tutoringTitle: "Quand le parent a besoin d'un appui exterieur",
      tutoringPoints: [
        "Quand les explications familiales fatiguent tout le monde.",
        "Quand l'ado a besoin d'une autre voix pour remettre la logique en place.",
        "Quand le parent veut rester soutien, sans devenir professeur ou policier des devoirs.",
      ],
      sources: [
        {
          label: "Fan & Chen (1999) - Parental Involvement and Students' Academic Achievement",
          url: "https://eric.ed.gov/?id=ED430048",
          note: "Meta-analyse sur la relation entre implication parentale et reussite scolaire.",
        },
        {
          label: "Santana et al. (2019) - Having Fun Doing Math",
          url: "https://eric.ed.gov/?id=EJ1215567",
          note: "Etude randomisee sur de courtes activites parent-enfant envoyees par SMS.",
        },
        {
          label: "Patall, Cooper & Robinson (2008) - Parent Involvement in Homework: A Research Synthesis",
          url: "https://eric.ed.gov/?id=EJ896560",
          note: "Synthese utile pour distinguer supervision, cadre et soutien vraiment productif.",
        },
      ],
      ctaTitle: "Si tu veux aider plus sans alourdir l'ambiance a la maison",
      ctaText:
        "Le meilleur prochain pas n'est pas toujours d'expliquer davantage. C'est souvent de clarifier les attentes, la structure et le bon appui exterieur.",
      relatedRouteKeys: ["blogHomeworkResearch", "blogTutoringEvidence", "weeklyFollowUp"],
    },
    en: {
      cardTitle: "What parents can do at home without becoming the teacher",
      cardDescription:
        "Simple actions, backed by research, that support progress without turning home into a second classroom.",
      eyebrow: "Parents and progress",
      heroTitle: "What parents can do at home without becoming the teacher",
      heroText:
        "Parents do not need to teach the full course to help. Research points instead toward forms of support that are lighter, clearer and more consistent than intense supervision or improvised explanations.",
      seoTitle: "What parents can do at home | Methode Secondaire Blog",
      seoDescription:
        "A research-backed article on parent involvement, expectations and small actions that help adolescents learn without raising pressure.",
      keywords:
        "parent involvement high school research, help teenager homework without pressure, parent support mathematics high school, academic support at home",
      studyHighlights: [
        {
          value: "Moderate relationship",
          title: "Parent involvement matters",
          description:
            "Fan and Chen found a moderate, practically meaningful relationship between parent involvement and academic achievement.",
        },
        {
          value: "Expectations > supervision",
          title: "Expectations matter more",
          description:
            "In that meta-analysis, parent aspirations and expectations were more strongly linked to achievement than simple home supervision.",
        },
        {
          value: "0.488 SD",
          title: "Small weekly actions matter",
          description:
            "Short parent-child activities delivered by text message also raised math performance in a randomized study.",
        },
      ],
      sections: [
        {
          title: "Home does not need to become a classroom",
          paragraphs: [
            "The Fan and Chen meta-analysis found a moderate relationship between parent involvement and academic achievement, but it also offered a very useful nuance: parent aspirations and expectations seemed more powerful than simple supervision.",
            "In other words, parents do not need to explain everything. They need to create a climate where effort, clarity and next steps matter consistently.",
          ],
        },
        {
          title: "Simple moves often beat long arguments",
          paragraphs: [
            "Santana and colleagues' 2019 study points in the same direction: short, regular parent-child activities can affect learning meaningfully, even when the text messages themselves do not contain formal curriculum content.",
            "What helps is not just time spent. It is the quality of the exchange and the consistency of the signal sent to the student.",
          ],
        },
        {
          title: "What parents can aim for at home",
          paragraphs: [
            "The goal is not to replace the teacher or tutor. It is to make expectations clearer, priorities more visible and the link to schoolwork steadier.",
          ],
          bullets: [
            "Talk about the subject and the goals without turning every evening into an interrogation.",
            "Help the student plan the work before correcting details.",
            "Come back to what was understood, not only what was completed.",
          ],
        },
      ],
      parentActionsTitle: "Three high-value parent actions",
      parentActions: [
        "Set one simple and concrete expectation for the week.",
        "Ask what felt clearest and least clear, not only whether the homework is finished.",
        "Help organize the work before trying to correct each exercise.",
      ],
      tutoringTitle: "When parents need outside support",
      tutoringPoints: [
        "When family explanations are exhausting everyone.",
        "When the teenager needs another voice to rebuild the logic.",
        "When the parent wants to stay supportive without becoming the homework police.",
      ],
      sources: [
        {
          label: "Fan & Chen (1999) - Parental Involvement and Students' Academic Achievement",
          url: "https://eric.ed.gov/?id=ED430048",
          note: "Meta-analysis on the relationship between parent involvement and achievement.",
        },
        {
          label: "Santana et al. (2019) - Having Fun Doing Math",
          url: "https://eric.ed.gov/?id=EJ1215567",
          note: "Randomized study on short parent-child activities delivered by text message.",
        },
        {
          label: "Patall, Cooper & Robinson (2008) - Parent Involvement in Homework: A Research Synthesis",
          url: "https://eric.ed.gov/?id=EJ896560",
          note: "Useful synthesis for distinguishing supervision from genuinely productive support.",
        },
      ],
      ctaTitle: "If you want to help more without making home heavier",
      ctaText:
        "The strongest next step is not always more explanation. It is often clearer expectations, better structure and the right outside support.",
      relatedRouteKeys: ["blogHomeworkResearch", "blogTutoringEvidence", "weeklyFollowUp"],
    },
  },
}

export function getBlogPageContent(routeKey, locale = "fr") {
  return blogPageContent[routeKey]?.[locale] || null
}
