import { BUSINESS } from '@/consts/business';
import { FULL_SERVICE_AREA_NAMES } from '@/consts/service-areas';
import { SERVICE_TYPES } from '@/consts/services';

export const SITE_URL = BUSINESS.siteUrl;
export const SITE_NAME = BUSINESS.displayName;
export const SITE_LOCALE = 'fr_CA';
export const DEFAULT_SOCIAL_IMAGE_URL = `${SITE_URL}/hero.webp`;
export const DEFAULT_SOCIAL_IMAGE_TYPE = 'image/webp';
export const DEFAULT_SOCIAL_IMAGE_WIDTH = '1536';
export const DEFAULT_SOCIAL_IMAGE_HEIGHT = '1024';
export const DEFAULT_SOCIAL_IMAGE_ALT =
  'Service d’entretien extérieur réalisé par Apex Prestige';

export const HOME_SEO_DEFAULT = {
  title: 'Apex Prestige | Nettoyage extérieur dans les Cantons-de-l’Est',
  description:
    'Services extérieurs résidentiels et commerciaux : vitres, gouttières, soffites, revêtement, toiture, pavé uni et lavage à pression.',
  keywords:
    'nettoyage extérieur, services extérieurs, nettoyage de vitres, nettoyage de gouttières, nettoyage de soffites, lavage à pression, nettoyage de toiture, nettoyage de pavé uni, sable polymère, Sherbrooke, Magog, Bromont, Orford, Cantons-de-l’Est, Apex Prestige',
  ogTitle: 'Apex Prestige | Services extérieurs résidentiels et commerciaux',
  ogDescription:
    'Nettoyage et entretien extérieur à Sherbrooke, dans les Cantons-de-l’Est et les environs.',
  ogUrl: SITE_URL,
  geoRegion: 'CA-QC',
  geoPlacename: 'Sherbrooke, Magog, Orford, Bromont, Cantons-de-l’Est',
  canonicalUrl: SITE_URL,
} as const;

export const BASE_LOCAL_BUSINESS_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS.fullName,
  alternateName: BUSINESS.displayName,
  description:
    'Services de nettoyage et d’entretien extérieur pour les propriétés résidentielles et commerciales à Sherbrooke, dans les Cantons-de-l’Est et les environs.',
  url: SITE_URL,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  logo: `${SITE_URL}/logo.webp`,
  image: DEFAULT_SOCIAL_IMAGE_URL,
  areaServed: [...FULL_SERVICE_AREA_NAMES],
  serviceType: SERVICE_TYPES,
  sameAs: [BUSINESS.facebook],
} as const;
