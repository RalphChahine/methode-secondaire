import { localPageConfigs } from "./conversionContent.js"
import { blogHubCopyByLocale, blogRouteKeys, getBlogPageContent } from "./blogContent.js"
import { getOfferPageConfig, offerRouteKeys } from "./offerContent.js"
import { getResourcePageContent, resourceHubCopyByLocale, resourceRouteKeys } from "./resourceContent.js"
import { routeCatalog } from "./routes.js"
import { getRobotsDirective, shouldIncludeInSitemap } from "./searchIndexStrategy.js"
import {
  getSecondary4MathConceptPage,
  getSecondary4MathTheoryContent,
  secondary4MathConceptRouteKeys,
} from "./secondary4MathTheoryContent.js"

function createPageEntry(routeKey, locale, payload) {
  return {
    routeKey,
    locale,
    path: routeCatalog[routeKey][locale],
    robots: getRobotsDirective(routeKey),
    includeInSitemap: shouldIncludeInSitemap(routeKey),
    ...payload,
  }
}

const basePageSeo = {
  home: {
    fr: {
      title: "Méthode Secondaire | Tutorat en maths et sciences au secondaire",
      description:
        "Tutorat privé en mathématiques et en sciences pour le secondaire 1 à 5 au Québec. Une courte demande pour confirmer le bon tuteur et le bon créneau, puis un suivi parent simple.",
      keywords:
        "tutorat en mathématiques secondaire, tuteur sciences secondaire, aide aux devoirs secondaire, soutien scolaire secondaire, tutorat privé québec",
      name: "Tutorat secondaire en maths et sciences",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Méthode Secondaire | High school math and science tutoring",
      description:
        "Private high school math and science tutoring across Quebec. A short request to confirm the right tutor and time, then simple parent follow-up.",
      keywords:
        "high school math tutoring, high school science tutor, high school homework help, high school academic support, private tutor quebec",
      name: "High school math and science tutoring",
      schemaType: "WebPage",
      ogType: "website",
    },
  },
  request: {
    fr: {
      title: "Demander une première séance | Méthode Secondaire",
      description:
        "Courte demande de tutorat en maths ou sciences au secondaire. Aucun compte ni paiement avant la confirmation du tuteur et du créneau.",
      keywords: "demande tutorat secondaire, première séance tutorat, tuteur maths sciences québec",
      name: "Demander une première séance",
      schemaType: "ContactPage",
      ogType: "website",
    },
    en: {
      title: "Request a first session | Methode Secondaire",
      description:
        "Short request for high-school math or science tutoring. No account or payment before the tutor and time are confirmed.",
      keywords: "tutoring request, first tutoring session, math science tutor quebec",
      name: "Request a first session",
      schemaType: "ContactPage",
      ogType: "website",
    },
  },
  thankYou: {
    fr: {
      title: "Demande reçue | Méthode Secondaire",
      description:
        "Votre demande a été reçue. Méthode Secondaire vous rappelle avec une suite claire pour le tutorat en maths ou sciences.",
      keywords:
        "demande tutorat reçue, rappel parent tutorat, tutorat maths sciences secondaire",
      name: "Demande reçue",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Request received | Méthode Secondaire",
      description:
        "Your request was received. Méthode Secondaire will call back with a clear next step for math or science tutoring.",
      keywords:
        "tutoring request received, parent tutoring callback, high school math science tutoring",
      name: "Request received",
      schemaType: "WebPage",
      ogType: "website",
    },
  },
  portal: {
    fr: {
      title: "Portail parent et tuteur | Méthode Secondaire",
      description:
        "Connexion au portail Méthode Secondaire pour suivre les séances, paiements, résumés et notes de tutorat.",
      keywords:
        "portail parent tutorat, suivi tutorat, paiement tutorat, notes de séance tutorat",
      name: "Portail parent et tuteur",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Parent and tutor portal | Méthode Secondaire",
      description:
        "Sign in to the Méthode Secondaire portal for tutoring sessions, payments, summaries and tutor notes.",
      keywords:
        "parent tutoring portal, tutoring follow-up, tutoring payment, session notes",
      name: "Parent and tutor portal",
      schemaType: "WebPage",
      ogType: "website",
    },
  },
  approche: {
    fr: {
      title: "Notre approche parent | M\u00e9thode Secondaire",
      description:
        "D\u00e9couvrez comment M\u00e9thode Secondaire cadre le besoin, propose le bon tuteur et rend le suivi clair pour les parents.",
      keywords:
        "matching tuteur parent, suivi tutorat parent, portail parent tutorat, tutorat secondaire qu\u00e9bec",
      name: "Notre approche parent",
      schemaType: "AboutPage",
      ogType: "website",
    },
    en: {
      title: "Our parent approach | Methode Secondaire",
      description:
        "See how Methode Secondaire frames the need, proposes the right tutor and makes tutoring follow-up clear for parents.",
      keywords:
        "parent tutor matching, tutoring follow-up for parents, parent tutoring portal, quebec high school tutoring",
      name: "Our parent approach",
      schemaType: "AboutPage",
      ogType: "website",
    },
  },
  trust: {
    fr: {
      title: "Confiance, confidentialité et annulation | Méthode Secondaire",
      description: "Comprenez le jumelage, le suivi, les rappels, la confidentialité et la politique d'annulation de Méthode Secondaire.",
      keywords: "confidentialité tutorat, annulation séance tutorat, portail parent, jumelage tuteur québec",
      name: "Confiance parents",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Parent trust, privacy and cancellations | Methode Secondaire",
      description: "Understand matching, follow-up, reminders, privacy and cancellation terms at Methode Secondaire.",
      keywords: "tutoring privacy, tutoring cancellation, parent portal, tutor matching quebec",
      name: "Parent trust",
      schemaType: "WebPage",
      ogType: "website",
    },
  },
  maths: {
    fr: {
      title: "Tutorat en mathématiques au secondaire | Méthode Secondaire",
      description:
        "Tutorat en mathématiques au secondaire 1 à 5 au Québec. Tuteur de maths, aide aux devoirs, algèbre, fonctions, géométrie, trigonométrie et examens avec une méthode claire.",
      keywords:
        "tutorat en mathématiques secondaire, tuteur maths secondaire, aide aux devoirs maths secondaire, soutien scolaire maths, préparation examen maths secondaire",
      name: "Tutorat de mathématiques au secondaire",
      schemaType: "Service",
      ogType: "website",
    },
    en: {
      title: "High school math tutoring in Quebec | Méthode Secondaire",
      description:
        "High school math tutoring across Quebec. Math tutor support, homework help, algebra, functions, geometry, trigonometry and exam prep with a clear method.",
      keywords:
        "high school math tutoring quebec, high school math tutor, math homework help, secondary math support, math exam preparation",
      name: "High school math tutoring",
      schemaType: "Service",
      ogType: "website",
    },
  },
  sciences: {
    fr: {
      title: "Tuteur de sciences au secondaire | Méthode Secondaire",
      description:
        "Tuteur de sciences au secondaire 1 à 5 au Québec. Tutorat en sciences, physique, chimie, aide aux devoirs, labos et préparation d'examens avec une méthode claire.",
      keywords:
        "tuteur sciences secondaire, tutorat sciences secondaire, aide aux devoirs sciences, aide physique secondaire, aide chimie secondaire",
      name: "Tutorat de sciences au secondaire",
      schemaType: "Service",
      ogType: "website",
    },
    en: {
      title: "High school science tutor in Quebec | Méthode Secondaire",
      description:
        "High school science tutoring across Quebec. Science tutor support, physics, chemistry, homework help, labs and exam preparation with a clear method.",
      keywords:
        "high school science tutor quebec, high school science tutoring, science homework help, physics help high school, chemistry help high school",
      name: "High school science tutoring",
      schemaType: "Service",
      ogType: "website",
    },
  },
  temoignages: {
    fr: {
      title: "Parcours parent clair | Méthode Secondaire",
      description:
        "Découvrez les repères concrets du parcours parent : jumelage, séance, résumé, paiement et suivi de tutorat au secondaire.",
      keywords:
        "parcours parent tutorat secondaire, suivi parent tutorat maths sciences, soutien scolaire québec",
      name: "Parcours parent",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "Clear parent path | Methode Secondaire",
      description:
        "See the practical parent path: matching, session, summary, payment and high-school tutoring follow-up.",
      keywords:
        "parent tutoring path, math science tutoring follow-up, quebec academic support",
      name: "Parent path",
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
  reussites: {
    fr: {
      title: "Réussites et cas types | Méthode Secondaire",
      description:
        "Découvrez des cas types inspirés de situations fréquentes en tutorat secondaire : maths, sciences, Sprint examen, bloc de progression de 10 séances et remise à niveau ciblée.",
      keywords:
        "cas type tutorat secondaire, réussite maths secondaire, réussite sciences secondaire, sprint examen, bloc de progression, tutorat québec",
      name: "Réussites et cas types",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "Success stories and case studies | Méthode Secondaire",
      description:
        "Explore representative case studies inspired by common high school tutoring situations in math, science, exam sprint support, a 10-session progress block and catch-up tutoring.",
      keywords:
        "high school tutoring case studies, math tutoring success story, science tutoring success story, exam sprint tutoring, 10-session progress block",
      name: "Success stories and case studies",
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
  devenirTuteur: {
    fr: {
      title: "Devenir tuteur | Emploi tuteur maths et sciences au Québec | Méthode Secondaire",
      description:
        "Postulez pour un emploi de tuteur en mathématiques et en sciences au secondaire avec Méthode Secondaire. Tutorat en ligne au Québec, présentiel selon le secteur, profil recherché et candidature.",
      keywords:
        "devenir tuteur, devenir tuteur en ligne québec, emploi tuteur secondaire, emploi tuteur maths, emploi tuteur sciences, recrutement tuteur montréal, recrutement tuteur laval",
      name: "Devenir tuteur",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Become a tutor | Math and science tutor jobs in Quebec | Méthode Secondaire",
      description:
        "Apply for high school math and science tutor jobs with Méthode Secondaire across Quebec. Explore online tutor opportunities, hiring standards and the application process.",
      keywords:
        "become a tutor quebec, math tutor jobs quebec, science tutor jobs quebec, online tutor jobs quebec, high school tutor montreal, private tutor jobs",
      name: "Become a tutor",
      schemaType: "WebPage",
      ogType: "website",
    },
  },
  employmentTutorSecondary: {
    fr: {
      title: "Emploi tuteur secondaire | Maths et sciences au Québec | Méthode Secondaire",
      description:
        "Emploi de tuteur au secondaire au Québec en maths et sciences. Postulez chez Méthode Secondaire pour du tutorat en ligne ou selon le secteur à Montréal et Laval.",
      keywords:
        "emploi tuteur secondaire, emploi tuteur maths, emploi tuteur sciences, devenir tuteur en ligne québec, recrutement tuteur secondaire montréal, recrutement tuteur secondaire laval",
      name: "Emploi tuteur secondaire",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "High school tutor jobs in Quebec | Math and science | Méthode Secondaire",
      description:
        "Apply for high school tutor jobs in Quebec in math and science. Join Méthode Secondaire for online tutoring and, depending on the area, local opportunities around Montreal and Laval.",
      keywords:
        "high school tutor jobs quebec, math tutor jobs quebec, science tutor jobs quebec, online tutor jobs quebec, montreal tutor jobs, laval tutor jobs",
      name: "High school tutor jobs in Quebec",
      schemaType: "WebPage",
      ogType: "website",
    },
  },
  resourcesHub: {
    fr: {
      title: "Ressources tutorat secondaire | Méthode Secondaire",
      description: resourceHubCopyByLocale.fr.description,
      keywords:
        "ressources tutorat secondaire, aide aux devoirs secondaire, soutien scolaire secondaire, blog tutorat maths, blog tutorat sciences",
      name: "Ressources tutorat secondaire",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "High school tutoring resources | Méthode Secondaire",
      description: resourceHubCopyByLocale.en.description,
      keywords:
        "high school tutoring resources, high school homework help, high school academic support, math tutoring blog, science tutoring guide",
      name: "High school tutoring resources",
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
  blogHub: {
    fr: {
      title: "Blogue tutorat secondaire fonde sur la recherche | Methode Secondaire",
      description:
        "Des articles fondes sur des etudes scientifiques pour aider les parents du secondaire a mieux comprendre l'anxiete en maths, les devoirs, le tutorat et la revision.",
      keywords:
        "blogue tutorat secondaire, recherches education secondaire, anxiete maths secondaire, aide aux devoirs recherche, tutorat scientifique",
      name: blogHubCopyByLocale.fr.title,
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "Research-backed high school tutoring blog | Methode Secondaire",
      description:
        "Evidence-based articles for high school families about math anxiety, homework, tutoring, science learning and exam revision.",
      keywords:
        "high school tutoring blog, education research for parents, math anxiety blog, homework help research, tutoring evidence",
      name: blogHubCopyByLocale.en.title,
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
  secondary4MathTheory: {
    fr: {
      title: getSecondary4MathTheoryContent("fr").seoTitle,
      description: getSecondary4MathTheoryContent("fr").seoDescription,
      keywords: getSecondary4MathTheoryContent("fr").seoKeywords,
      name: getSecondary4MathTheoryContent("fr").schemaName,
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: getSecondary4MathTheoryContent("en").seoTitle,
      description: getSecondary4MathTheoryContent("en").seoDescription,
      keywords: getSecondary4MathTheoryContent("en").seoKeywords,
      name: getSecondary4MathTheoryContent("en").schemaName,
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
}

export function getPrerenderPageEntries() {
  const entries = []

  for (const [routeKey, localizedMeta] of Object.entries(basePageSeo)) {
    for (const locale of ["fr", "en"]) {
      entries.push(createPageEntry(routeKey, locale, localizedMeta[locale]))
    }
  }

  for (const routeKey of ["montreal", "laval", "quebecOnline"]) {
    for (const locale of ["fr", "en"]) {
      const page = localPageConfigs[routeKey][locale]

      entries.push(
        createPageEntry(routeKey, locale, {
          title: page.seoTitle,
          description: page.seoDescription,
          keywords: page.keywords,
          name: page.heroTitle,
          schemaType: "Service",
          ogType: "website",
        }),
      )
    }
  }

  for (const routeKey of offerRouteKeys) {
    for (const locale of ["fr", "en"]) {
      const page = getOfferPageConfig(routeKey, locale)

      entries.push(
        createPageEntry(routeKey, locale, {
          title: page.seoTitle,
          description: page.seoDescription,
          keywords: page.keywords,
          name: page.heroTitle,
          schemaType: "Service",
          ogType: "website",
        }),
      )
    }
  }

  for (const routeKey of resourceRouteKeys) {
    for (const locale of ["fr", "en"]) {
      const page = getResourcePageContent(routeKey, locale)

      entries.push(
        createPageEntry(routeKey, locale, {
          title: page.seoTitle,
          description: page.seoDescription,
          keywords: page.keywords,
          name: page.heroTitle,
          schemaType: "Article",
          ogType: "article",
        }),
      )
    }
  }

  for (const routeKey of blogRouteKeys) {
    for (const locale of ["fr", "en"]) {
      const page = getBlogPageContent(routeKey, locale)

      entries.push(
        createPageEntry(routeKey, locale, {
          title: page.seoTitle,
          description: page.seoDescription,
          keywords: page.keywords,
          name: page.heroTitle,
          schemaType: "Article",
          ogType: "article",
        }),
      )
    }
  }

  for (const routeKey of secondary4MathConceptRouteKeys) {
    for (const locale of ["fr", "en"]) {
      const page = getSecondary4MathConceptPage(routeKey, locale)

      entries.push(
        createPageEntry(routeKey, locale, {
          title: page.seoTitle,
          description: page.seoDescription,
          keywords: page.seoKeywords,
          name: page.title,
          schemaType: "Article",
          ogType: "article",
        }),
      )
    }
  }

  return entries.sort((left, right) => left.path.localeCompare(right.path))
}
