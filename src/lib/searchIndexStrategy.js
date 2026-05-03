export const INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"

export const NOINDEX_ROBOTS =
  "noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"

const noindexRouteKeys = new Set([
  "reussites",
  "employmentTutorSecondary",
  "mathTutoringSecondary",
  "scienceTutorSecondary",
  "academicSupportSecondary",
  "mathTutorMontreal",
  "homeworkHelpMontreal",
  "scienceTutorLaval",
  "academicSupportMontreal",
  "physicsTutorMontreal",
  "chemistryHelpLaval",
  "sec4Math",
  "physicsHelp",
  "chemistrySec5",
  "montrealSec4Math",
])

export function isRouteIndexable(routeKey) {
  return !noindexRouteKeys.has(routeKey)
}

export function getRobotsDirective(routeKey) {
  return isRouteIndexable(routeKey) ? INDEX_ROBOTS : NOINDEX_ROBOTS
}

export function shouldIncludeInSitemap(routeKey) {
  return isRouteIndexable(routeKey)
}
