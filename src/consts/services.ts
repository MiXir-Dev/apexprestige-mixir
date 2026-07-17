export interface ServiceItem {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export const SERVICES: ServiceItem[] = [
  {
    title: 'Vitres, gouttières et soffites',
    description:
      'Nettoyage intérieur et extérieur des vitres, retrait des débris dans les gouttières, nettoyage de leurs surfaces extérieures et entretien des soffites pour les propriétés résidentielles et commerciales.',
    beforeImage: '/beforeafter/before-inside.webp',
    afterImage: '/beforeafter/after-inside.webp',
  },
  {
    title: 'Revêtements, toiture et lavage à pression',
    description:
      'Nettoyage adapté aux revêtements de vinyle, d’aluminium, de bois et à d’autres surfaces extérieures, ainsi que nettoyage de toiture et lavage à pression selon le matériau et l’état de la surface.',
    beforeImage: '/beforeafter/before-gutter-cleaning.webp',
    afterImage: '/beforeafter/after-gutter-cleaning.webp',
  },
  {
    title: 'Pavé uni et entretien extérieur',
    description:
      'Nettoyage de pavé uni, installation ou remplacement de sable polymère, coupe de branches ciblée et application de pesticides selon la réglementation applicable.',
    beforeImage: '/beforeafter/before-outside.webp',
    afterImage: '/beforeafter/after-outside.webp',
  },
];

export const SERVICE_CATALOGUE = [
  {
    id: 'window-cleaning',
    title: 'Nettoyage de vitres, intérieur et extérieur',
    description:
      'Nettoyage intérieur et extérieur des vitres pour les maisons, immeubles et commerces.',
  },
  {
    id: 'gutter-cleaning',
    title: 'Nettoyage des gouttières, intérieur et extérieur',
    description:
      'Retrait des débris à l’intérieur et nettoyage des surfaces extérieures des gouttières.',
  },
  {
    id: 'soffit-cleaning',
    title: 'Nettoyage des soffites',
    description:
      'Nettoyage des soffites pour retirer les saletés et rafraîchir l’apparence des bordures de toiture.',
  },
  {
    id: 'siding-cleaning',
    title: 'Nettoyage du revêtement extérieur',
    description:
      'Nettoyage adapté aux revêtements de vinyle, d’aluminium, de bois et à d’autres surfaces extérieures.',
  },
  {
    id: 'pressure-washing',
    title: 'Lavage à pression',
    description:
      'Lavage des surfaces extérieures selon leur matériau, leur état et le travail demandé.',
  },
  {
    id: 'roof-cleaning',
    title: 'Nettoyage de toiture',
    description:
      'Nettoyage de toiture adapté à la surface et à l’accumulation présente.',
  },
  {
    id: 'paver-cleaning',
    title: 'Nettoyage de pavé uni',
    description:
      'Nettoyage du pavé uni pour retirer la saleté accumulée et rafraîchir son apparence.',
  },
  {
    id: 'pesticide-application',
    title: 'Application de pesticides',
    description:
      'Application de pesticides lorsque nécessaire, dans le respect de la réglementation applicable.',
  },
  {
    id: 'branch-cutting',
    title: 'Coupe de branches',
    description:
      'Coupe de branches ciblée pour dégager et entretenir les abords de la propriété.',
  },
  {
    id: 'polymeric-sand',
    title: 'Installation et remplacement de sable polymère',
    description:
      'Installation ou remplacement de sable polymère dans les joints de pavé uni.',
  },
] as const;

export const SERVICE_TYPES = SERVICE_CATALOGUE.map((service) => service.title);
