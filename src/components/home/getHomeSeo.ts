import { ServiceAreaPageContent } from "@/consts/service-area-content";
import {
  BASE_LOCAL_BUSINESS_STRUCTURED_DATA,
  HOME_SEO_DEFAULT,
  SITE_URL,
} from "@/consts/seo";
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

export const getHomeSeo = (
  serviceArea?: ServiceAreaPageContent
): HomeSeoPayload => {
  const canonicalUrl = serviceArea
    ? `${SITE_URL}${serviceArea.path}`
    : HOME_SEO_DEFAULT.canonicalUrl;

  const description = localizeMetaDescription(
    HOME_SEO_DEFAULT.description,
    serviceArea
  );

  const title = localizeMetaTitle(HOME_SEO_DEFAULT.title, serviceArea);
  const ogTitle = serviceArea ? title : HOME_SEO_DEFAULT.ogTitle;

  return {
    title,
    description,
    keywords: HOME_SEO_DEFAULT.keywords,
    ogTitle,
    ogDescription: serviceArea ? description : HOME_SEO_DEFAULT.ogDescription,
    ogUrl: canonicalUrl,
    canonicalUrl,
    robots: "index,follow",
    geoRegion: HOME_SEO_DEFAULT.geoRegion,
    geoPlacename: serviceArea
      ? `${serviceArea.displayName}, Québec, Canada`
      : HOME_SEO_DEFAULT.geoPlacename,
    structuredData: {
      ...BASE_LOCAL_BUSINESS_STRUCTURED_DATA,
      url: canonicalUrl,
      description,
    },
  };
};
