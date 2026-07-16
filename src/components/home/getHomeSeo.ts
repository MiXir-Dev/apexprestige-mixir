import { ServiceAreaPageContent } from "@/consts/service-area-content";
import {
  BASE_LOCAL_BUSINESS_STRUCTURED_DATA,
  HOME_SEO_DEFAULT,
  SITE_URL,
} from "@/consts/seo";
import { INDEXABLE_SERVICE_AREA_SLUGS } from "@/consts/service-areas";
import {
  localizeMetaDescription,
  localizeMetaTitle,
} from "@/lib/localize-service-area";

export interface HomeSeoPayload {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  canonicalUrl: string;
  robots: string;
  geoRegion: string;
  geoPlacename: string;
  structuredData: Record<string, unknown>;
}

const LOCAL_KEYWORDS = [
  "lavage de vitres",
  "nettoyage de vitres",
  "lavage de fenêtres",
  "nettoyage de fenêtres",
  "lavage de vitres résidentiel",
  "lavage de vitres commercial",
  "devis lavage de vitres",
] as const;

const withCityKeywords = (city: string) => {
  const localizedTerms = LOCAL_KEYWORDS.map((keyword) => `${keyword} ${city}`);
  return [...LOCAL_KEYWORDS, ...localizedTerms, city, "Rive-Nord"].join(", ");
};

const INDEXABLE_SERVICE_AREA_SET = new Set(INDEXABLE_SERVICE_AREA_SLUGS);

export const getHomeSeo = (
  serviceArea?: ServiceAreaPageContent
): HomeSeoPayload => {
  const isIndexableServiceArea = Boolean(
    serviceArea && INDEXABLE_SERVICE_AREA_SET.has(serviceArea.slug)
  );
  const canonicalUrl = serviceArea && isIndexableServiceArea
    ? `${SITE_URL}${serviceArea.path}`
    : HOME_SEO_DEFAULT.canonicalUrl;
  const robots = serviceArea
    ? isIndexableServiceArea
      ? "index,follow"
      : "noindex,follow"
    : "index,follow";

  const description = localizeMetaDescription(
    HOME_SEO_DEFAULT.description,
    serviceArea
  );

  const title = localizeMetaTitle(HOME_SEO_DEFAULT.title, serviceArea);
  const ogTitle = serviceArea
    ? `Lavage de vitres à ${serviceArea.displayName} | Mr. Clear`
    : HOME_SEO_DEFAULT.ogTitle;

  const areaServed = serviceArea
    ? Array.from(
        new Set([
          serviceArea.displayName,
          ...(serviceArea.nearbyAreas ?? []),
          ...(serviceArea.nearbyRegions ?? []),
          "Rive-Nord",
        ])
      )
    : [...BASE_LOCAL_BUSINESS_STRUCTURED_DATA.areaServed];

  return {
    title,
    description,
    keywords: serviceArea
      ? withCityKeywords(serviceArea.displayName)
      : HOME_SEO_DEFAULT.keywords,
    ogTitle,
    ogDescription: serviceArea ? description : HOME_SEO_DEFAULT.ogDescription,
    ogUrl: canonicalUrl,
    canonicalUrl,
    robots,
    geoRegion: HOME_SEO_DEFAULT.geoRegion,
    geoPlacename: serviceArea
      ? `${serviceArea.displayName}, Québec, Canada`
      : HOME_SEO_DEFAULT.geoPlacename,
    structuredData: {
      ...BASE_LOCAL_BUSINESS_STRUCTURED_DATA,
      url: canonicalUrl,
      description,
      areaServed,
    },
  };
};
