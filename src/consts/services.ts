export interface ServiceItem {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export const SERVICES: ServiceItem[] = [
  {
    title: "Nettoyage de vitres intérieur & extérieur",
    description:
      "Service complet de nettoyage de vitres pour l'intérieur et l'extérieur. Nous utilisons des produits écologiques pour un entretien délicat, sans dégâts, et un équipement spécialisé pour les vitrines, bureaux et commerces.",
    beforeImage: "/before-inside.png",
    afterImage: "/after-inside.png",
  },
  {
    title: "Vidage et entretien des gouttières",
    description:
      "Élimination efficace des débris pour assurer un bon écoulement de l’eau, prévenir les infiltrations et prolonger la durée de vie de votre toiture.",
    beforeImage: "/before-gutter-cleaning.png",
    afterImage: "/after-gutter-cleaning.png",
  },
  {
    title: "Nettoyage de revêtement extérieur",
    description:
      "Remise à neuf de vos surfaces extérieures grâce à un lavage à pression professionnel. Parfait pour maisons, condos et commerces, sans abîmer les matériaux.",
    beforeImage: "/before-outside.png",
    afterImage: "/after-outside.png",
  },
];

export const SERVICE_TYPES = [
  "Lavage de vitres",
  "Nettoyage de vitres",
  "Vidage de gouttières",
] as const;
