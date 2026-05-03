import { localPageConfigs } from "./conversionContent.js"
import { blogHubCopyByLocale, blogRouteKeys, getBlogPageContent } from "./blogContent.js"
import { getOfferPageConfig, offerRouteKeys } from "./offerContent.js"
import { getResourcePageContent, resourceHubCopyByLocale, resourceRouteKeys } from "./resourceContent.js"
import { routeCatalog } from "./routes.js"
import { getRobotsDirective, shouldIncludeInSitemap } from "./searchIndexStrategy.js"

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
        "Tutorat privé en mathématiques et en sciences pour le secondaire 1 à 5 au Québec. Révision claire, méthode structurée et réservation simple.",
      keywords:
        "tutorat en mathématiques secondaire, tuteur sciences secondaire, aide aux devoirs secondaire, soutien scolaire secondaire, tutorat privé québec",
      name: "Tutorat secondaire en maths et sciences",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Méthode Secondaire | High school math and science tutoring",
      description:
        "Private high school math and science tutoring across Quebec. Clear teaching, structured follow-up and simple booking.",
      keywords:
        "high school math tutoring, high school science tutor, high school homework help, high school academic support, private tutor quebec",
      name: "High school math and science tutoring",
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
      title: "Témoignages | Méthode Secondaire",
      description:
        "Découvrez des témoignages anonymisés de parents et d'élèves en maths et sciences au secondaire : progression, confiance et résultats.",
      keywords:
        "avis vérifiés tutorat secondaire, avis tutorat maths, avis tutorat sciences, progression scolaire québec",
      name: "Témoignages",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "Testimonials | Méthode Secondaire",
      description:
        "Read anonymized parent and student testimonials about high school math and science tutoring: progress, confidence and results.",
      keywords:
        "verified tutoring reviews, math tutor reviews, science tutor reviews, quebec academic progress",
      name: "Testimonials",
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
  reussites: {
    fr: {
      title: "Réussites et cas types | Méthode Secondaire",
      description:
        "Découvrez des cas types inspirés de situations fréquentes en tutorat secondaire : maths, sciences, Sprint examen, suivi hebdomadaire et remise à niveau ciblée.",
      keywords:
        "cas type tutorat secondaire, réussite maths secondaire, réussite sciences secondaire, sprint examen, suivi hebdomadaire, tutorat québec",
      name: "Réussites et cas types",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "Success stories and case studies | Méthode Secondaire",
      description:
        "Explore representative case studies inspired by common high school tutoring situations in math, science, exam sprint support, weekly follow-up and catch-up tutoring.",
      keywords:
        "high school tutoring case studies, math tutoring success story, science tutoring success story, exam sprint tutoring, weekly follow-up tutoring",
      name: "Success stories and case studies",
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
  tuteurs: {
    fr: {
      title: "Tuteurs en maths et sciences au secondaire | Méthode Secondaire",
      description:
        "Découvrez nos tuteurs en mathématiques et en sciences pour le secondaire au Québec, ainsi que notre approche en aide aux devoirs, rattrapage et préparation d'examens.",
      keywords:
        "tuteur maths secondaire, tuteur sciences secondaire, tutorat en mathématiques québec, aide aux devoirs secondaire, soutien scolaire secondaire, tuteur montréal",
      name: "Tuteurs en maths et sciences au secondaire",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "High school math and science tutors in Quebec | Méthode Secondaire",
      description:
        "Explore our high school math and science tutors in Quebec, along with our approach to homework help, catch-up support and exam preparation.",
      keywords:
        "high school math tutor quebec, high school science tutor quebec, homework help high school, academic support quebec, montreal tutor",
      name: "High school math and science tutors in Quebec",
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

  return entries.sort((left, right) => left.path.localeCompare(right.path))
}
