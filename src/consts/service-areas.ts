import {
  SERVICE_AREA_PATH_PREFIX,
  buildServiceAreaPath,
} from "./paths";

export type ServiceAreaSlug =
  | "laval"
  | "montreal"
  | "repentigny"
  | "terrebonne"
  | "mascouche"
  | "assomption"
  | "boisbriand"
  | "lorraine"
  | "rosemere"
  | "bois-des-filion";

export interface ServiceArea {
  slug: ServiceAreaSlug;
  name: string;
  path: `${typeof SERVICE_AREA_PATH_PREFIX}${ServiceAreaSlug}`;
}

export const SERVICE_AREAS: ServiceArea[] = [
  { slug: "laval", name: "Laval", path: buildServiceAreaPath("laval") },
  { slug: "montreal", name: "Montréal", path: buildServiceAreaPath("montreal") },
  { slug: "repentigny", name: "Repentigny", path: buildServiceAreaPath("repentigny") },
  { slug: "terrebonne", name: "Terrebonne", path: buildServiceAreaPath("terrebonne") },
  { slug: "mascouche", name: "Mascouche", path: buildServiceAreaPath("mascouche") },
  { slug: "assomption", name: "L'Assomption", path: buildServiceAreaPath("assomption") },
  { slug: "boisbriand", name: "Boisbriand", path: buildServiceAreaPath("boisbriand") },
  { slug: "lorraine", name: "Lorraine", path: buildServiceAreaPath("lorraine") },
  { slug: "rosemere", name: "Rosemère", path: buildServiceAreaPath("rosemere") },
  { slug: "bois-des-filion", name: "Bois-des-Filion", path: buildServiceAreaPath("bois-des-filion"), },
];

// Roll out local SEO gradually: phase 1 towns go indexable first.
export const STRATEGY_B_PHASE1_SERVICE_AREA_SLUGS: ServiceAreaSlug[] = [
  "montreal",
  "laval",
  "terrebonne",
  "repentigny",
  "mascouche",
];

export const INDEXABLE_SERVICE_AREA_SLUGS = STRATEGY_B_PHASE1_SERVICE_AREA_SLUGS;

export const SERVICE_AREAS_BY_SLUG: Record<ServiceAreaSlug, ServiceArea> =
  SERVICE_AREAS.reduce((acc, area) => {
    acc[area.slug] = area;
    return acc;
  }, {} as Record<ServiceAreaSlug, ServiceArea>);

export const isServiceAreaSlug = (slug: string): slug is ServiceAreaSlug =>
  Object.prototype.hasOwnProperty.call(SERVICE_AREAS_BY_SLUG, slug);

export const getServiceAreaBySlug = (slug: string) =>
  isServiceAreaSlug(slug) ? SERVICE_AREAS_BY_SLUG[slug] : undefined;
