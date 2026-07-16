export const HOME_PATH = "/";
export const QUOTE_PATH = "/soumission-services-exterieurs";
export const LEGACY_QUOTE_PATH = "/soumission-lavage-de-vitres";
export const PRIVACY_PATH = "/confidentialite";
export const LOCALIZED_SLUG_ROUTE_PATH = "/:localizedSlug";
export const NOT_FOUND_ROUTE_PATH = "*";

export const SERVICE_AREA_PATH_PREFIX = "/nettoyage-exterieur-";
export const SERVICE_AREA_SLUG_PREFIX = "nettoyage-exterieur-";

export const buildServiceAreaPath = <T extends string>(
  slug: T
): `${typeof SERVICE_AREA_PATH_PREFIX}${T}` =>
  `${SERVICE_AREA_PATH_PREFIX}${slug}` as `${typeof SERVICE_AREA_PATH_PREFIX}${T}`;

export const buildHomeSectionPath = (sectionId: string) => `/#${sectionId}`;
