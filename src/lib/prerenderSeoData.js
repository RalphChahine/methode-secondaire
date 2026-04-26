import { localPageConfigs } from "./conversionContent.js"
import { getOfferPageConfig, offerRouteKeys } from "./offerContent.js"
import { getResourcePageContent, resourceHubCopyByLocale, resourceRouteKeys } from "./resourceContent.js"
import { routeCatalog } from "./routes.js"

const basePageSeo = {
  home: {
    fr: {
      title: "Méthode Secondaire | Tutorat en maths et sciences au secondaire",
      description:
        "Tutorat privé en mathématiques et en sciences pour le secondaire 1 à 5 au Québec. Révision claire, méthode structurée et réservation simple.",
      keywords:
        "tutorat maths secondaire, tutorat sciences secondaire, cours privés mathématiques Québec, soutien scolaire secondaire Montréal, préparation examens ministériels",
      name: "Tutorat secondaire en maths et sciences",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Méthode Secondaire | High school math and science tutoring",
      description:
        "Private high school math and science tutoring across Quebec. Clear teaching, structured follow-up and simple booking.",
      keywords:
        "high school math tutoring, high school science tutoring, private tutor quebec, exam preparation",
      name: "High school math and science tutoring",
      schemaType: "WebPage",
      ogType: "website",
    },
  },
  maths: {
    fr: {
      title: "Tutorat de maths au secondaire | Méthode Secondaire",
      description:
        "Tutorat de mathématiques au secondaire 1 à 5 au Québec. Algèbre, fonctions, géométrie, trigonométrie et examens avec une méthode claire.",
      keywords:
        "tutorat maths secondaire, cours privés maths Québec, aide devoirs maths secondaire, préparation examen maths secondaire",
      name: "Tutorat de mathématiques au secondaire",
      schemaType: "Service",
      ogType: "website",
    },
    en: {
      title: "High school math tutoring | Méthode Secondaire",
      description:
        "High school math tutoring across Quebec. Algebra, functions, geometry, trigonometry and exam prep with a clear method.",
      keywords:
        "high school math tutoring, private math tutor quebec, algebra help high school, math exam preparation",
      name: "High school math tutoring",
      schemaType: "Service",
      ogType: "website",
    },
  },
  sciences: {
    fr: {
      title: "Tutorat de sciences au secondaire | Méthode Secondaire",
      description:
        "Tutorat de sciences au secondaire 1 à 5 au Québec. Physique, chimie, électricité, labos et préparation d'examens avec une méthode claire.",
      keywords:
        "tutorat sciences secondaire, cours privés sciences Québec, aide physique secondaire, aide chimie secondaire, préparation examen sciences",
      name: "Tutorat de sciences au secondaire",
      schemaType: "Service",
      ogType: "website",
    },
    en: {
      title: "High school science tutoring | Méthode Secondaire",
      description:
        "High school science tutoring across Quebec. Physics, chemistry, electricity, labs and exam preparation with a clear method.",
      keywords:
        "high school science tutoring, private science tutor quebec, physics help high school, chemistry help high school",
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
        "avis vérifiés tutorat secondaire, avis tutorat maths, avis tutorat sciences, progression scolaire Québec",
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
  tuteurs: {
    fr: {
      title: "Tuteurs et spécialités | Méthode Secondaire",
      description:
        "Découvrez les profils, spécialités et standards pédagogiques de Méthode Secondaire pour le tutorat au secondaire.",
      keywords:
        "tuteurs maths secondaire, tuteurs sciences secondaire, tutorat Québec, profils tuteurs secondaire, soutien scolaire Montréal",
      name: "Tuteurs et spécialités",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "Tutors and specialties | Méthode Secondaire",
      description:
        "Explore the tutor profiles, specialties and teaching standards behind Méthode Secondaire.",
      keywords:
        "math tutors high school, science tutors high school, tutoring quebec, tutor profiles, montreal academic support",
      name: "Tutors and specialties",
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
  devenirTuteur: {
    fr: {
      title: "Recrutement de tuteurs en maths et sciences | Méthode Secondaire",
      description:
        "Méthode Secondaire recrute des tuteurs en mathématiques et en sciences pour le secondaire au Québec, en ligne et selon le secteur en présentiel.",
      keywords:
        "recrutement tuteur maths, recrutement tuteur sciences, emploi tuteur secondaire Québec, devenir tuteur privé, tutorat en ligne Québec",
      name: "Recrutement de tuteurs",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Math and science tutor jobs | Méthode Secondaire",
      description:
        "Apply for high school math and science tutor jobs with Méthode Secondaire across Quebec. Explore the profile, standards and application process.",
      keywords:
        "math tutor jobs Quebec, science tutor jobs Quebec, online tutor jobs Quebec, high school tutor Montreal, become a private tutor",
      name: "Math and science tutor jobs",
      schemaType: "WebPage",
      ogType: "website",
    },
  },
  resourcesHub: {
    fr: {
      title: "Ressources tutorat secondaire | Méthode Secondaire",
      description: resourceHubCopyByLocale.fr.description,
      keywords:
        "ressources tutorat secondaire, blog tutorat maths, blog tutorat sciences, rattrapage scolaire secondaire, préparation examens secondaire",
      name: "Ressources tutorat secondaire",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "High school tutoring resources | Méthode Secondaire",
      description: resourceHubCopyByLocale.en.description,
      keywords:
        "high school tutoring resources, math tutoring blog, science tutoring guide, catch-up tutoring, exam prep guide",
      name: "High school tutoring resources",
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
}

export function getPrerenderPageEntries() {
  const entries = []

  for (const [routeKey, localizedMeta] of Object.entries(basePageSeo)) {
    for (const locale of ["fr", "en"]) {
      entries.push({
        routeKey,
        locale,
        path: routeCatalog[routeKey][locale],
        ...localizedMeta[locale],
      })
    }
  }

  for (const routeKey of ["montreal", "laval", "quebecOnline"]) {
    for (const locale of ["fr", "en"]) {
      const page = localPageConfigs[routeKey][locale]

      entries.push({
        routeKey,
        locale,
        path: routeCatalog[routeKey][locale],
        title: page.seoTitle,
        description: page.seoDescription,
        keywords: page.keywords,
        name: page.heroTitle,
        schemaType: "Service",
        ogType: "website",
      })
    }
  }

  for (const routeKey of offerRouteKeys) {
    for (const locale of ["fr", "en"]) {
      const page = getOfferPageConfig(routeKey, locale)

      entries.push({
        routeKey,
        locale,
        path: routeCatalog[routeKey][locale],
        title: page.seoTitle,
        description: page.seoDescription,
        keywords: page.keywords,
        name: page.heroTitle,
        schemaType: "Service",
        ogType: "website",
      })
    }
  }

  for (const routeKey of resourceRouteKeys) {
    for (const locale of ["fr", "en"]) {
      const page = getResourcePageContent(routeKey, locale)

      entries.push({
        routeKey,
        locale,
        path: routeCatalog[routeKey][locale],
        title: page.seoTitle,
        description: page.seoDescription,
        keywords: page.keywords,
        name: page.heroTitle,
        schemaType: "Article",
        ogType: "article",
      })
    }
  }

  return entries.sort((left, right) => left.path.localeCompare(right.path))
}
