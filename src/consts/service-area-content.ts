import {
  SERVICE_AREAS,
  ServiceArea,
  ServiceAreaSlug,
} from '@/consts/service-areas';

export interface HomeFaqItem {
  question: string;
  answer: string;
}

export interface HomePageCopy {
  heroTitle: string;
  heroSubtitle: string;
  aboutParagraph: string;
  serviceIntro: string;
  faqIntro: string;
  ctaHeading: string;
  ctaSubheading: string;
  contactSupportingCopy: string;
  faqItems: HomeFaqItem[];
  nearbyAreasTitle?: string;
  nearbyAreasIntro?: string;
  nearbyAreas?: string[];
}

interface ServiceAreaCopyConfig {
  fullTitleVariant: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutParagraph: string;
  serviceIntro: string;
  ctaHeading: string;
  ctaSubheading: string;
  contactSupportingCopy: string;
  nearbyAreas: string[];
}

export interface ServiceAreaPageContent extends ServiceArea, HomePageCopy {
  displayName: string;
  fullTitleVariant: string;
  metaDescription: string;
}

export const DEFAULT_HOME_COPY: HomePageCopy = {
  heroTitle: 'Redonnez du prestige à votre propriété',
  heroSubtitle:
    'Services extérieurs résidentiels et commerciaux à Sherbrooke, dans les Cantons-de-l’Est et les environs.',
  aboutParagraph:
    'Apex Prestige prend en charge le nettoyage et l’entretien des principales surfaces extérieures de votre propriété. Nos services s’adressent aux propriétaires résidentiels ainsi qu’aux entreprises qui souhaitent entretenir leur bâtiment avec une approche adaptée à chaque surface.',
  serviceIntro:
    'Nettoyage de vitres, de gouttières, de soffites, de revêtements, de toiture et de pavé uni, lavage à pression, coupe de branches, application de pesticides et installation de sable polymère.',
  faqIntro:
    'Voici les réponses aux questions les plus fréquentes concernant les services, les secteurs desservis et les demandes de soumission.',
  ctaHeading: 'Prêt à redonner du prestige à votre propriété?',
  ctaSubheading:
    'Décrivez les travaux souhaités et obtenez une soumission adaptée à votre propriété résidentielle ou commerciale.',
  contactSupportingCopy:
    'Une question ou un projet à discuter? Communiquez avec Apex Prestige par téléphone, par courriel ou au moyen du formulaire de soumission.',
  faqItems: [
    {
      question: 'Quels secteurs Apex Prestige dessert-elle?',
      answer:
        'Apex Prestige dessert Sherbrooke, plusieurs municipalités des Cantons-de-l’Est et les secteurs environnants. La liste complète se trouve dans la section « Zones desservies » du site.',
    },
    {
      question:
        'Offrez-vous vos services aux propriétés résidentielles et commerciales?',
      answer:
        'Oui. Les services d’Apex Prestige sont offerts aux propriétaires résidentiels ainsi qu’aux entreprises, selon les besoins de la propriété et les travaux demandés.',
    },
    {
      question: 'Comment puis-je demander une soumission?',
      answer:
        'Remplissez le formulaire de soumission en indiquant vos coordonnées, l’adresse des travaux, le type de propriété et les services souhaités. Apex Prestige communiquera avec vous pour préciser la demande.',
    },
    {
      question: 'Comment préparer la propriété avant les travaux?',
      answer:
        'Assurez-vous que les surfaces concernées sont accessibles et déplacez, lorsque possible, les objets fragiles ou encombrants à proximité. Des consignes supplémentaires pourront être précisées selon le service demandé.',
    },
    {
      question:
        'Que se passe-t-il si la météo ne permet pas d’effectuer les travaux?',
      answer:
        'La faisabilité des travaux dépend du service et des conditions météorologiques. Si les conditions empêchent l’intervention, Apex Prestige communiquera avec vous pour convenir de la suite.',
    },
    {
      question: 'Utilisez-vous la même méthode pour toutes les surfaces?',
      answer:
        'Non. La méthode est choisie selon le matériau, l’état de la surface et le résultat recherché afin d’adapter l’intervention à la propriété.',
    },
    {
      question: 'Comment l’application de pesticides est-elle encadrée?',
      answer:
        'L’application de pesticides est offerte lorsque nécessaire et doit être réalisée selon la réglementation applicable au lieu et au type d’intervention.',
    },
    {
      question: 'Puis-je demander plusieurs services dans une même soumission?',
      answer:
        'Oui. Indiquez tous les services souhaités dans le formulaire afin que l’ensemble de la demande puisse être évalué.',
    },
  ],
};

const SERVICE_AREA_COPY: Record<ServiceAreaSlug, ServiceAreaCopyConfig> = {
  bromont: {
    fullTitleVariant: 'Nettoyage extérieur à Bromont | Apex Prestige',
    metaDescription:
      'Services de nettoyage extérieur résidentiel et commercial à Bromont : vitres, gouttières, revêtement, toiture, pavé uni et lavage à pression.',
    heroTitle: 'Services de nettoyage extérieur à Bromont',
    heroSubtitle:
      'Apex Prestige prend en charge plusieurs travaux de nettoyage et d’entretien pour les propriétés résidentielles et commerciales de Bromont.',
    aboutParagraph:
      'À Bromont, Apex Prestige offre un point de contact unique pour le nettoyage et l’entretien des principales surfaces extérieures de votre propriété.',
    serviceIntro:
      'Les services offerts à Bromont comprennent notamment le nettoyage de vitres, de gouttières, de soffites, de revêtements, de toiture et de pavé uni.',
    ctaHeading: 'Un projet d’entretien extérieur à Bromont?',
    ctaSubheading:
      'Présentez les travaux souhaités et demandez une soumission adaptée à votre propriété.',
    contactSupportingCopy:
      'Communiquez avec Apex Prestige pour discuter de votre propriété et des services souhaités à Bromont.',
    nearbyAreas: ['Shefford', 'Magog', 'Orford', 'Valcourt', 'Canton de Valcourt'],
  },
  magog: {
    fullTitleVariant: 'Nettoyage extérieur à Magog | Apex Prestige',
    metaDescription:
      'Nettoyage extérieur à Magog pour maisons et commerces : vitres, gouttières, soffites, revêtement, toiture, pavé uni et lavage à pression.',
    heroTitle: 'Nettoyage et entretien extérieur à Magog',
    heroSubtitle:
      'Des services regroupés pour entretenir les vitres, les gouttières et les différentes surfaces extérieures de votre propriété à Magog.',
    aboutParagraph:
      'Apex Prestige dessert les propriétés résidentielles et commerciales de Magog avec des services choisis selon les surfaces et les travaux demandés.',
    serviceIntro:
      'À Magog, vous pouvez regrouper plusieurs besoins dans une même demande, du nettoyage de vitres jusqu’à l’entretien du pavé uni.',
    ctaHeading: 'Votre propriété à Magog a besoin d’entretien?',
    ctaSubheading:
      'Indiquez les services recherchés et demandez une soumission à Apex Prestige.',
    contactSupportingCopy:
      'Pour une demande à Magog, communiquez avec Apex Prestige par téléphone, par courriel ou au moyen du formulaire.',
    nearbyAreas: [
      'Orford',
      'Austin',
      'North Hatley',
      'Sainte-Catherine-de-Hatley',
      'Canton de Hatley',
    ],
  },
  orford: {
    fullTitleVariant:
      'Services de nettoyage extérieur à Orford | Apex Prestige',
    metaDescription:
      'Services extérieurs résidentiels et commerciaux à Orford : nettoyage de vitres, gouttières, soffites, revêtement, toiture et pavé uni.',
    heroTitle: 'Des services extérieurs adaptés à votre propriété à Orford',
    heroSubtitle:
      'Apex Prestige propose plusieurs services de nettoyage et d’entretien extérieur aux propriétaires et aux entreprises d’Orford.',
    aboutParagraph:
      'À Orford, chaque demande est évaluée selon les surfaces concernées, leur état et les services nécessaires à la propriété.',
    serviceIntro:
      'Les services disponibles à Orford couvrent les vitres, les gouttières, les soffites, les revêtements, la toiture, le pavé uni et d’autres travaux extérieurs.',
    ctaHeading: 'Planifiez vos travaux extérieurs à Orford',
    ctaSubheading:
      'Décrivez votre projet et obtenez une soumission correspondant aux services demandés.',
    contactSupportingCopy:
      'Apex Prestige est disponible pour préciser les besoins de votre propriété à Orford.',
    nearbyAreas: [
      'Magog',
      'Austin',
      'Saint-Denis-de-Brompton',
      'Rock Forest',
      'Deauville',
    ],
  },
  'rock-forest': {
    fullTitleVariant: 'Nettoyage extérieur à Rock Forest | Apex Prestige',
    metaDescription:
      'Nettoyage extérieur résidentiel et commercial à Rock Forest : vitres, gouttières, soffites, revêtement, toiture, pavé uni et pression.',
    heroTitle: 'Nettoyage extérieur résidentiel et commercial à Rock Forest',
    heroSubtitle:
      'Un seul point de contact pour plusieurs travaux de nettoyage et d’entretien autour de votre propriété à Rock Forest.',
    aboutParagraph:
      'Apex Prestige dessert Rock Forest pour les demandes résidentielles et commerciales touchant plusieurs types de surfaces extérieures.',
    serviceIntro:
      'À Rock Forest, les services peuvent être regroupés dans une même soumission afin de couvrir les différents besoins de la propriété.',
    ctaHeading: 'Besoin de services extérieurs à Rock Forest?',
    ctaSubheading:
      'Présentez les surfaces à entretenir et demandez une soumission gratuite.',
    contactSupportingCopy:
      'Communiquez avec Apex Prestige pour discuter d’une intervention résidentielle ou commerciale à Rock Forest.',
    nearbyAreas: [
      'Sherbrooke',
      'Deauville',
      'Saint-Élie-d’Orford',
      'Saint-Denis-de-Brompton',
      'Magog',
    ],
  },
  deauville: {
    fullTitleVariant: 'Services extérieurs à Deauville | Apex Prestige',
    metaDescription:
      'Services de nettoyage extérieur à Deauville pour résidences et commerces : vitres, gouttières, revêtement, toiture, pavé uni et pression.',
    heroTitle: 'Entretenez l’extérieur de votre propriété à Deauville',
    heroSubtitle:
      'Apex Prestige offre à Deauville plusieurs services pour les vitres, les gouttières, les surfaces extérieures et le pavé uni.',
    aboutParagraph:
      'À Deauville, Apex Prestige adapte la demande de soumission aux surfaces concernées et aux travaux souhaités par le propriétaire ou l’entreprise.',
    serviceIntro:
      'Le nettoyage de vitres, de gouttières, de soffites, de revêtements, de toiture et de pavé uni fait partie des services offerts à Deauville.',
    ctaHeading: 'Un projet extérieur à Deauville?',
    ctaSubheading:
      'Regroupez les services souhaités et demandez une soumission pour votre propriété.',
    contactSupportingCopy:
      'Apex Prestige répond aux demandes de services résidentiels et commerciaux à Deauville.',
    nearbyAreas: [
      'Rock Forest',
      'Sherbrooke',
      'Magog',
      'Saint-Denis-de-Brompton',
      'Orford',
    ],
  },
  austin: {
    fullTitleVariant:
      'Nettoyage et entretien extérieur à Austin | Apex Prestige',
    metaDescription:
      'Nettoyage et entretien extérieur à Austin : vitres, gouttières, soffites, revêtements, toiture, pavé uni et lavage à pression.',
    heroTitle: 'Des services extérieurs pour votre propriété à Austin',
    heroSubtitle:
      'Apex Prestige dessert Austin pour plusieurs besoins de nettoyage et d’entretien extérieur résidentiel ou commercial.',
    aboutParagraph:
      'À Austin, les travaux sont déterminés selon le type de propriété, les surfaces à traiter et les services indiqués dans la demande.',
    serviceIntro:
      'Les services offerts à Austin comprennent le nettoyage de vitres, de gouttières, de soffites, de revêtements, de toiture et de pavé uni.',
    ctaHeading: 'Préparez votre projet extérieur à Austin',
    ctaSubheading:
      'Décrivez les travaux souhaités afin d’obtenir une soumission adaptée à la propriété.',
    contactSupportingCopy:
      'Communiquez avec Apex Prestige pour présenter vos besoins de nettoyage extérieur à Austin.',
    nearbyAreas: [
      'Magog',
      'Orford',
      'North Hatley',
      'Sainte-Catherine-de-Hatley',
      'Canton de Hatley',
    ],
  },
  'north-hatley': {
    fullTitleVariant: 'Nettoyage extérieur à North Hatley | Apex Prestige',
    metaDescription:
      'Services extérieurs résidentiels et commerciaux à North Hatley : vitres, gouttières, soffites, revêtement, toiture et pavé uni.',
    heroTitle: 'Nettoyage extérieur résidentiel et commercial à North Hatley',
    heroSubtitle:
      'Apex Prestige propose des services regroupés pour entretenir les principales surfaces extérieures de votre propriété à North Hatley.',
    aboutParagraph:
      'À North Hatley, Apex Prestige prend en charge les demandes touchant les vitres, les gouttières et plusieurs autres surfaces extérieures.',
    serviceIntro:
      'Les services disponibles à North Hatley peuvent être sélectionnés séparément ou regroupés dans une même demande de soumission.',
    ctaHeading: 'Des travaux extérieurs à North Hatley?',
    ctaSubheading:
      'Indiquez les services requis et demandez une soumission gratuite à Apex Prestige.',
    contactSupportingCopy:
      'Apex Prestige peut préciser avec vous les services souhaités pour votre propriété à North Hatley.',
    nearbyAreas: [
      'Canton de Hatley',
      'Sainte-Catherine-de-Hatley',
      'Hatley',
      'Waterville',
      'Austin',
    ],
  },
  'sainte-catherine-de-hatley': {
    fullTitleVariant:
      'Services extérieurs à Sainte-Catherine-de-Hatley | Apex Prestige',
    metaDescription:
      'Nettoyage extérieur à Sainte-Catherine-de-Hatley : vitres, gouttières, soffites, revêtement, toiture, pavé uni et lavage à pression.',
    heroTitle:
      'Services de nettoyage extérieur à Sainte-Catherine-de-Hatley',
    heroSubtitle:
      'Apex Prestige accompagne les propriétaires résidentiels et commerciaux pour plusieurs besoins d’entretien extérieur.',
    aboutParagraph:
      'À Sainte-Catherine-de-Hatley, chaque demande peut couvrir une ou plusieurs surfaces selon les travaux nécessaires à la propriété.',
    serviceIntro:
      'Les services comprennent notamment le nettoyage de vitres, de gouttières, de soffites, de revêtements, de toiture et de pavé uni.',
    ctaHeading: 'Un projet à Sainte-Catherine-de-Hatley?',
    ctaSubheading:
      'Transmettez les renseignements sur la propriété et les services que vous souhaitez faire évaluer.',
    contactSupportingCopy:
      'Communiquez avec Apex Prestige pour discuter d’une demande à Sainte-Catherine-de-Hatley.',
    nearbyAreas: [
      'North Hatley',
      'Canton de Hatley',
      'Magog',
      'Austin',
      'Hatley',
    ],
  },
  'canton-de-hatley': {
    fullTitleVariant:
      'Nettoyage extérieur au Canton de Hatley | Apex Prestige',
    metaDescription:
      'Services de nettoyage extérieur au Canton de Hatley pour propriétés résidentielles et commerciales : vitres, gouttières, toiture et pavé uni.',
    heroTitle: 'Nettoyage et entretien extérieur au Canton de Hatley',
    heroSubtitle:
      'Apex Prestige dessert les propriétés résidentielles et commerciales du Canton de Hatley pour plusieurs travaux extérieurs.',
    aboutParagraph:
      'Au Canton de Hatley, les services sont sélectionnés selon les surfaces concernées et les besoins indiqués dans la demande de soumission.',
    serviceIntro:
      'Vitres, gouttières, soffites, revêtements, toiture, pavé uni et autres travaux d’entretien peuvent être regroupés dans une même demande.',
    ctaHeading: 'Entretenez votre propriété au Canton de Hatley',
    ctaSubheading:
      'Présentez les services souhaités et demandez une soumission à Apex Prestige.',
    contactSupportingCopy:
      'Apex Prestige est disponible pour discuter des travaux extérieurs souhaités au Canton de Hatley.',
    nearbyAreas: [
      'North Hatley',
      'Sainte-Catherine-de-Hatley',
      'Hatley',
      'Waterville',
      'Compton',
    ],
  },
  'saint-denis-de-brompton': {
    fullTitleVariant:
      'Services extérieurs à Saint-Denis-de-Brompton | Apex Prestige',
    metaDescription:
      'Nettoyage extérieur à Saint-Denis-de-Brompton : vitres, gouttières, soffites, revêtement, toiture, pavé uni et lavage à pression.',
    heroTitle: 'Services extérieurs à Saint-Denis-de-Brompton',
    heroSubtitle:
      'Apex Prestige propose plusieurs services de nettoyage et d’entretien pour les propriétés résidentielles et commerciales.',
    aboutParagraph:
      'À Saint-Denis-de-Brompton, Apex Prestige évalue les travaux demandés selon le type de surface et les besoins de la propriété.',
    serviceIntro:
      'Les services offerts couvrent les vitres, les gouttières, les soffites, les revêtements, la toiture, le pavé uni et d’autres travaux extérieurs.',
    ctaHeading: 'Un projet extérieur à Saint-Denis-de-Brompton?',
    ctaSubheading:
      'Décrivez les travaux et demandez une soumission adaptée aux services recherchés.',
    contactSupportingCopy:
      'Communiquez avec Apex Prestige pour présenter votre demande à Saint-Denis-de-Brompton.',
    nearbyAreas: ['Rock Forest', 'Deauville', 'Orford', 'Stoke', 'Sherbrooke'],
  },
};

const buildLocalizedFaqItems = (city: string): HomeFaqItem[] => [
  {
    question: `Apex Prestige dessert-elle ${city}?`,
    answer: `Oui. ${city} fait partie des principaux secteurs desservis par Apex Prestige pour les propriétés résidentielles et commerciales.`,
  },
  {
    question: `Quels services sont offerts à ${city}?`,
    answer:
      'Les services comprennent le nettoyage de vitres, de gouttières, de soffites, de revêtements, de toiture et de pavé uni, le lavage à pression, la coupe de branches, l’application de pesticides et le sable polymère.',
  },
  {
    question: `Comment demander une soumission à ${city}?`,
    answer:
      'Utilisez le formulaire de soumission et indiquez l’adresse des travaux, le type de propriété et les services souhaités.',
  },
  {
    question: `Puis-je regrouper plusieurs services à ${city}?`,
    answer:
      'Oui. Vous pouvez sélectionner plusieurs services dans une même demande afin de présenter l’ensemble des travaux souhaités.',
  },
  {
    question: 'Les travaux sont-ils adaptés au type de surface?',
    answer:
      'Oui. La demande est évaluée selon le matériau, l’état de la surface et le service recherché.',
  },
];

export const SERVICE_AREA_PAGE_CONTENT: Record<
  ServiceAreaSlug,
  ServiceAreaPageContent
> = SERVICE_AREAS.reduce((acc, area) => {
  const copy = SERVICE_AREA_COPY[area.slug];

  acc[area.slug] = {
    ...area,
    displayName: area.name,
    fullTitleVariant: copy.fullTitleVariant,
    metaDescription: copy.metaDescription,
    heroTitle: copy.heroTitle,
    heroSubtitle: copy.heroSubtitle,
    aboutParagraph: copy.aboutParagraph,
    serviceIntro: copy.serviceIntro,
    faqIntro: DEFAULT_HOME_COPY.faqIntro,
    ctaHeading: copy.ctaHeading,
    ctaSubheading: copy.ctaSubheading,
    contactSupportingCopy: copy.contactSupportingCopy,
    faqItems: buildLocalizedFaqItems(area.name),
    nearbyAreasTitle: 'Secteurs à proximité',
    nearbyAreas: copy.nearbyAreas,
  };

  return acc;
}, {} as Record<ServiceAreaSlug, ServiceAreaPageContent>);

export const getServiceAreaPageContent = (slug: ServiceAreaSlug) =>
  SERVICE_AREA_PAGE_CONTENT[slug];
