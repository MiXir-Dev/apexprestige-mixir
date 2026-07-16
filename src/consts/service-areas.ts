import {
  SERVICE_AREA_PATH_PREFIX,
  buildServiceAreaPath,
} from './paths';

export type ServiceAreaSlug =
  | 'bromont'
  | 'magog'
  | 'orford'
  | 'rock-forest'
  | 'deauville'
  | 'austin'
  | 'north-hatley'
  | 'sainte-catherine-de-hatley'
  | 'canton-de-hatley'
  | 'saint-denis-de-brompton';

export interface ServiceArea {
  slug: ServiceAreaSlug;
  name: string;
  path: `${typeof SERVICE_AREA_PATH_PREFIX}${ServiceAreaSlug}`;
}

export const SERVICE_AREAS: ServiceArea[] = [
  { slug: 'bromont', name: 'Bromont', path: buildServiceAreaPath('bromont') },
  { slug: 'magog', name: 'Magog', path: buildServiceAreaPath('magog') },
  { slug: 'orford', name: 'Orford', path: buildServiceAreaPath('orford') },
  {
    slug: 'rock-forest',
    name: 'Rock Forest',
    path: buildServiceAreaPath('rock-forest'),
  },
  {
    slug: 'deauville',
    name: 'Deauville',
    path: buildServiceAreaPath('deauville'),
  },
  { slug: 'austin', name: 'Austin', path: buildServiceAreaPath('austin') },
  {
    slug: 'north-hatley',
    name: 'North Hatley',
    path: buildServiceAreaPath('north-hatley'),
  },
  {
    slug: 'sainte-catherine-de-hatley',
    name: 'Sainte-Catherine-de-Hatley',
    path: buildServiceAreaPath('sainte-catherine-de-hatley'),
  },
  {
    slug: 'canton-de-hatley',
    name: 'Canton de Hatley',
    path: buildServiceAreaPath('canton-de-hatley'),
  },
  {
    slug: 'saint-denis-de-brompton',
    name: 'Saint-Denis-de-Brompton',
    path: buildServiceAreaPath('saint-denis-de-brompton'),
  },
];

export const FULL_SERVICE_AREA_NAMES = [
  'Sherbrooke',
  'Rock Forest',
  'Deauville',
  'Fleurimont',
  'Saint-Élie-d’Orford',
  'Lennoxville',
  'Magog',
  'Orford',
  'Austin',
  'Canton de Hatley',
  'Sainte-Catherine-de-Hatley',
  'North Hatley',
  'Ayer’s Cliff',
  'Ogden',
  'Stanstead',
  'Canton de Stanstead',
  'Hatley',
  'Windsor',
  'Val-Joli',
  'Richmond',
  'Melbourne',
  'Canton de Melbourne',
  'Racine',
  'Saint-Denis-de-Brompton',
  'Stoke',
  'Valcourt',
  'Canton de Valcourt',
  'Kingsbury',
  'Maricourt',
  'Bonsecours',
  'Lawrenceville',
  'Coaticook',
  'Compton',
  'Waterville',
  'Dixville',
  'Sainte-Edwidge-de-Clifton',
  'Barnston-Ouest',
  'East Angus',
  'Ascot Corner',
  'Cookshire-Eaton',
  'Westbury',
  'Dudswell',
  'Bury',
  'Weedon',
  'Val-des-Sources',
  'Danville',
  'Wotton',
  'Bromont',
  'Shefford',
] as const;

export const PRINCIPAL_SERVICE_AREA_NAMES = SERVICE_AREAS.map(
  (area) => area.name
);

const principalAreaSet = new Set<string>(PRINCIPAL_SERVICE_AREA_NAMES);

export const OTHER_SERVICE_AREA_NAMES = FULL_SERVICE_AREA_NAMES.filter(
  (area) => !principalAreaSet.has(area)
);

export const INDEXABLE_SERVICE_AREA_SLUGS: ServiceAreaSlug[] = SERVICE_AREAS.map(
  (area) => area.slug
);

export const SERVICE_AREAS_BY_SLUG: Record<ServiceAreaSlug, ServiceArea> =
  SERVICE_AREAS.reduce((acc, area) => {
    acc[area.slug] = area;
    return acc;
  }, {} as Record<ServiceAreaSlug, ServiceArea>);

export const isServiceAreaSlug = (slug: string): slug is ServiceAreaSlug =>
  Object.prototype.hasOwnProperty.call(SERVICE_AREAS_BY_SLUG, slug);

export const getServiceAreaBySlug = (slug: string) =>
  isServiceAreaSlug(slug) ? SERVICE_AREAS_BY_SLUG[slug] : undefined;
