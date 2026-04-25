import { localPageConfigs } from "./conversionContent.js"
import { getResourcePageContent, resourceHubCopyByLocale, resourceRouteKeys } from "./resourceContent.js"
import { routeCatalog } from "./routes.js"

const basePageSeo = {
  home: {
    fr: {
      title: "Methode Secondaire | Tutorat en maths et sciences au secondaire",
      description:
        "Tutorat prive en mathematiques et en sciences pour le secondaire 1 a 5 au Quebec. Revision claire, methode structuree et reservation simple.",
      keywords:
        "tutorat maths secondaire, tutorat sciences secondaire, cours prives mathematiques Quebec, soutien scolaire secondaire Montreal, preparation examens ministeriels",
      name: "Tutorat secondaire en maths et sciences",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Methode Secondaire | High school math and science tutoring",
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
      title: "Tutorat de maths au secondaire | Methode Secondaire",
      description:
        "Tutorat de mathematiques au secondaire 1 a 5 au Quebec. Algebre, fonctions, geometrie, trigonometrie et examens avec une methode claire.",
      keywords:
        "tutorat maths secondaire, cours prives maths Quebec, aide devoirs maths secondaire, preparation examen maths secondaire",
      name: "Tutorat de mathematiques au secondaire",
      schemaType: "Service",
      ogType: "website",
    },
    en: {
      title: "High school math tutoring | Methode Secondaire",
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
      title: "Tutorat de sciences au secondaire | Methode Secondaire",
      description:
        "Tutorat de sciences au secondaire 1 a 5 au Quebec. Physique, chimie, electricite, labos et preparation d'examens avec une methode claire.",
      keywords:
        "tutorat sciences secondaire, cours prives sciences Quebec, aide physique secondaire, aide chimie secondaire, preparation examen sciences",
      name: "Tutorat de sciences au secondaire",
      schemaType: "Service",
      ogType: "website",
    },
    en: {
      title: "High school science tutoring | Methode Secondaire",
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
      title: "Temoignages | Methode Secondaire",
      description:
        "Decouvrez des temoignages anonymises de parents et d'eleves en maths et sciences au secondaire: progression, confiance et resultats.",
      keywords:
        "avis verifies tutorat secondaire, avis tutorat maths, avis tutorat sciences, progression scolaire Quebec",
      name: "Temoignages",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "Testimonials | Methode Secondaire",
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
      title: "Tuteurs et specialites | Methode Secondaire",
      description:
        "Decouvrez les profils, specialites et standards pedagogiques de Methode Secondaire pour le tutorat au secondaire.",
      keywords:
        "tuteurs maths secondaire, tuteurs sciences secondaire, tutorat quebec, profils tuteurs secondaire, soutien scolaire montreal",
      name: "Tuteurs et specialites",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "Tutors and specialties | Methode Secondaire",
      description:
        "Explore the tutor profiles, specialties and teaching standards behind Methode Secondaire.",
      keywords:
        "math tutors high school, science tutors high school, tutoring quebec, tutor profiles, montreal academic support",
      name: "Tutors and specialties",
      schemaType: "CollectionPage",
      ogType: "website",
    },
  },
  devenirTuteur: {
    fr: {
      title: "Recrutement de tuteurs en maths et sciences | Methode Secondaire",
      description:
        "Methode Secondaire recrute des tuteurs en mathematiques et en sciences pour le secondaire au Quebec, en ligne et selon le secteur en presentiel.",
      keywords:
        "recrutement tuteur maths, recrutement tuteur sciences, emploi tuteur secondaire Quebec, devenir tuteur prive, tutorat en ligne Quebec",
      name: "Recrutement de tuteurs",
      schemaType: "WebPage",
      ogType: "website",
    },
    en: {
      title: "Math and science tutor jobs | Methode Secondaire",
      description:
        "Apply for high school math and science tutor jobs with Methode Secondaire across Quebec. Explore the profile, standards and application process.",
      keywords:
        "math tutor jobs Quebec, science tutor jobs Quebec, online tutor jobs Quebec, high school tutor Montreal, become a private tutor",
      name: "Math and science tutor jobs",
      schemaType: "WebPage",
      ogType: "website",
    },
  },
  resourcesHub: {
    fr: {
      title: "Ressources tutorat secondaire | Methode Secondaire",
      description: resourceHubCopyByLocale.fr.description,
      keywords:
        "ressources tutorat secondaire, blog tutorat maths, blog tutorat sciences, rattrapage scolaire secondaire, preparation examens secondaire",
      name: "Ressources tutorat secondaire",
      schemaType: "CollectionPage",
      ogType: "website",
    },
    en: {
      title: "High school tutoring resources | Methode Secondaire",
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
