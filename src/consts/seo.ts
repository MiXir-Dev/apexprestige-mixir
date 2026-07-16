import { CONTACT, SOCIAL_LINKS } from "@/consts/contact";
import { SERVICE_AREAS } from "@/consts/service-areas";
import { SERVICE_TYPES } from "@/consts/services";

export const SITE_URL = "https://mrclear.ca";
export const SITE_NAME = "Mr.Clear";
export const SITE_LOCALE = "fr_CA";
export const DEFAULT_SOCIAL_IMAGE_URL = `${SITE_URL}/hero.jpeg`;
export const DEFAULT_SOCIAL_IMAGE_TYPE = "image/jpeg";
export const DEFAULT_SOCIAL_IMAGE_WIDTH = "1536";
export const DEFAULT_SOCIAL_IMAGE_HEIGHT = "1024";
export const DEFAULT_SOCIAL_IMAGE_ALT =
  "Service de lavage de vitres professionnel Mr.Clear";

export const HOME_SEO_DEFAULT = {
  title:
    "Mr. Clear | Service professionnel de lavage de vitres à Laval, Montréal et Rive-Nord",
  description:
    "Entreprise spécialisée en nettoyage de vitres résidentiel et commercial à Laval, Montréal et Rive-Nord. Devis gratuit, service fiable et résultats impeccables!",
  keywords:
    "lavage de vitres, nettoyage de vitres, lavage de fenêtres, prix lavage de vitres, Laval, Montréal, Terrebonne, Repentigny, service nettoyage vitres, entreprise lavage vitre, vidage de gouttières",
  ogTitle: "Mr. Clear - Service professionnel de lavage de vitres",
  ogDescription:
    "Service professionnel de nettoyage de vitres résidentiel et commercial à Terrebonne, Repentigny, sur toute la Rive-Nord, Laval et Montréal",
  ogUrl: SITE_URL,
  geoRegion: "CA-QC",
  geoPlacename:
    "Terrebonne, Repentigny, Rive-Nord, Laval, L'Assomption, Boisbriand, Lorraine, Rosemère, Bois-des-Fillion, Mascouche, Montréal",
  canonicalUrl: SITE_URL,
} as const;

export const BASE_LOCAL_BUSINESS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Mr. Clear",
  description:
    "Service professionnel de nettoyage de vitres résidentiel et commercial à Laval, Montréal, Terrebonne, Repentigny et toute la Rive-Nord.",
  url: SITE_URL,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Quebec",
    addressLocality: "Rive-Nord de Montréal",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "45.606649",
    longitude: "-73.712409",
  },
  areaServed: SERVICE_AREAS.map((area) => area.name),
  serviceType: SERVICE_TYPES,
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
} as const;
