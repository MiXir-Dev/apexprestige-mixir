import {
  SERVICE_AREAS,
  ServiceArea,
  ServiceAreaSlug,
} from "@/consts/service-areas";
import { localizeFaqQuestion, withCity } from "@/lib/localize-service-area";

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
  faqQuestionVariants: [string, string, string, string];
  nearbyRegions?: string[];
}

export interface ServiceAreaPageContent extends ServiceArea, HomePageCopy {
  displayName: string;
  fullTitleVariant: string;
  metaDescription: string;
  nearbyRegions?: string[];
}

export const DEFAULT_HOME_COPY: HomePageCopy = {
  heroTitle:
    "Nettoyage de vitres professionnel sur la Rive-Nord, Laval et Montréal",
  heroSubtitle:
    "Service complet pour résidences et commerces. Des vitres impeccables, garanties.",
  aboutParagraph:
    "Depuis plus de 10 ans, nous offrons un service exceptionnel à nos clients résidentiels et commerciaux dans toute la région du Québec.",
  serviceIntro:
    "Nous offrons des services professionnels à Laval, Montréal et toute la Rive-Nord (Terrebonne, Repentigny, Mascouche, L'Assomption, Boisbriand, Lorraine, Rosemère, Bois-des-Filion).",
  faqIntro:
    "Trouvez rapidement des réponses à vos questions concernant nos services de lavage de vitres.",
  ctaHeading: "Prêt à transformer l'apparence de votre propriété ?",
  ctaSubheading:
    "Un service professionnel qui fait la différence visible. Contactez-nous dès aujourd'hui et voyez par vous-même !",
  contactSupportingCopy:
    "Besoin d'informations supplémentaires ou prêt à programmer un service ? Contactez-nous par téléphone, courriel ou via notre formulaire en ligne.",
  faqItems: [
    {
      question:
        "À quelle fréquence devrais-je faire nettoyer mes vitres à la maison ou au bureau ?",
      answer:
        "Pour les résidences situées sur la Rive-Nord ou à Montréal, un lavage de vitres deux fois par an (au printemps et à l'automne) est recommandé. Pour les commerces, surtout ceux exposés à la rue ou aux intempéries, un entretien mensuel ou trimestriel est conseillé afin de préserver une image professionnelle et propre.",
    },
    {
      question: "Offrez-vous vos services de nettoyage de vitres dans ma ville ?",
      answer:
        "Nous desservons plusieurs villes de la Rive-Nord, dont Terrebonne, Mascouche, Repentigny, Boisbriand, Lorraine, Rosemère, Bois-des-Filion, ainsi que Laval et Montréal. Consultez notre section 'Zones desservies' pour plus de détails ou contactez-nous directement.",
    },
    {
      question: "Comment préparer ma maison avant le nettoyage des vitres ?",
      answer:
        "Veuillez retirer les moustiquaires si possible et dégager l’accès aux fenêtres en déplaçant les meubles ou objets à proximité. Pour l’extérieur, libérez l’espace autour des fenêtres, en particulier près des haies, clôtures ou balcons.",
    },
    {
      question:
        "Que se passe-t-il en cas de pluie le jour de mon rendez-vous ?",
      answer:
        "En cas de pluie forte ou de conditions météorologiques extrêmes, nous vous contacterons pour reporter l’intervention à une date ultérieure sans aucun frais. Les nettoyages peuvent être effectués sous une pluie légère, car nos produits professionnels garantissent des résultats sans traces.",
    },
    {
      question:
        "Est-ce que Mr. Clear utilise des produits de nettoyage écologiques ?",
      answer:
        "Oui. Nous utilisons des solutions de nettoyage biodégradables, sécuritaires pour les humains, les animaux et l’environnement. C’est une priorité pour nous d’assurer un service propre et responsable.",
    },
    {
      question:
        "Vos techniciens sont-ils assurés et formés pour le travail en hauteur ?",
      answer:
        "Absolument. Toute notre équipe est formée aux normes de sécurité du Québec et détient les certifications nécessaires pour travailler en hauteur. Nous sommes également couverts par une assurance responsabilité civile complète.",
    },
    {
      question: "Proposez-vous des forfaits pour les nettoyages réguliers ?",
      answer:
        "Oui. Pour les clients commerciaux ou les résidences ayant besoin d’un entretien régulier, nous offrons des forfaits mensuels, bimestriels ou saisonniers à tarif préférentiel. Contactez-nous pour une soumission personnalisée.",
    },
  ],
};

const buildFaqQuestions = (city: string): [string, string, string, string] => [
  `${localizeFaqQuestion("À quelle fréquence faire nettoyer ses vitres", city)} ?`,
  `Offrez-vous le lavage de vitres résidentiel et commercial à ${city} ?`,
  `Combien de temps prend un nettoyage de fenêtres à ${city} ?`,
  `Intervenez-vous rapidement pour un service de lavage de vitres à ${city} ?`,
];

const SERVICE_AREA_COPY: Record<ServiceAreaSlug, ServiceAreaCopyConfig> = {
  laval: {
    fullTitleVariant:
      "Lavage de vitres à Laval | Mr. Clear - Résidentiel et commercial",
    metaDescription:
      "Service professionnel de lavage de vitres à Laval pour résidences et commerces. Intervention rapide, travail soigné et soumission gratuite.",
    heroTitle:
      "Service professionnel de lavage de vitres à Laval pour résidences et commerces",
    heroSubtitle:
      "Intervention rapide à Laval, travail minutieux et vitres sans traces pour maisons, condos et entreprises.",
    aboutParagraph:
      "À Laval, notre équipe intervient avec méthode pour offrir un nettoyage de vitres fiable, ponctuel et adapté aux besoins résidentiels comme commerciaux.",
    serviceIntro:
      "Nos services de lavage de vitres à Laval couvrent l'intérieur, l'extérieur, les vitrines commerciales et l'entretien des gouttières.",
    ctaHeading: "Besoin d'un service de vitres impeccable à Laval ?",
    ctaSubheading:
      "Obtenez une soumission claire et rapide pour votre propriété résidentielle ou commerciale.",
    contactSupportingCopy:
      "Vous cherchez un service fiable à Laval ? Notre équipe est disponible pour répondre à vos questions et planifier une intervention rapide.",
    faqQuestionVariants: buildFaqQuestions("Laval"),
    nearbyRegions: ["Rive-Nord", "Montréal"],
  },
  montreal: {
    fullTitleVariant:
      "Nettoyage de vitres à Montréal | Mr. Clear - Service local de confiance",
    metaDescription:
      "Nettoyage de vitres à Montréal pour maisons, condos, plex et commerces. Service soigné, flexible et adapté à vos horaires.",
    heroTitle:
      "Nettoyage de vitres à Montréal pour résidences, condos et commerces",
    heroSubtitle:
      "Une équipe fiable pour l'entretien de vos fenêtres à Montréal et sur la Rive-Nord, avec des résultats constants et sans traces.",
    aboutParagraph:
      "À Montréal, nous adaptons chaque intervention à la réalité du bâtiment pour livrer un lavage de vitres précis, sécuritaire et efficace.",
    serviceIntro:
      "Notre service à Montréal inclut le lavage de fenêtres résidentiel, l'entretien de vitrines commerciales et le nettoyage en hauteur selon les besoins.",
    ctaHeading: "Prêt à planifier votre nettoyage de vitres à Montréal ?",
    ctaSubheading:
      "Profitez d'un service professionnel, rapide et respectueux de votre espace.",
    contactSupportingCopy:
      "Pour un nettoyage de vitres à Montréal, appelez-nous ou envoyez-nous votre demande en ligne. Nous vous répondons rapidement.",
    faqQuestionVariants: buildFaqQuestions("Montréal"),
    nearbyRegions: ["Rive-Nord", "Laval"],
  },
  repentigny: {
    fullTitleVariant:
      "Lavage de fenêtres à Repentigny | Mr. Clear - Service professionnel",
    metaDescription:
      "Lavage de vitres à Repentigny pour propriétés résidentielles et commerciales. Équipe professionnelle, service minutieux et devis gratuit.",
    heroTitle:
      "Lavage de vitres à Repentigny avec une équipe fiable et expérimentée",
    heroSubtitle:
      "Des interventions efficaces à Repentigny pour maintenir des fenêtres propres, lumineuses et impeccables toute l'année.",
    aboutParagraph:
      "Nos clients de Repentigny apprécient notre ponctualité, notre attention aux détails et la constance de nos résultats sur chaque intervention.",
    serviceIntro:
      "À Repentigny, nous proposons un service complet: vitres intérieures et extérieures, cadres, moustiquaires et entretien de gouttières.",
    ctaHeading: "Vous voulez des vitres nettes à Repentigny ?",
    ctaSubheading:
      "Recevez une soumission rapide et choisissez un service simple, professionnel et sans surprise.",
    contactSupportingCopy:
      "Notre équipe dessert Repentigny avec des plages horaires flexibles pour les maisons, condos et commerces.",
    faqQuestionVariants: buildFaqQuestions("Repentigny"),
    nearbyRegions: ["Terrebonne", "Mascouche"],
  },
  terrebonne: {
    fullTitleVariant:
      "Lavage de vitres à Terrebonne | Mr. Clear - Résultats sans traces",
    metaDescription:
      "Service de lavage de vitres à Terrebonne pour résidences et commerces. Travail soigné, équipe courtoise et intervention rapide.",
    heroTitle:
      "Service professionnel de lavage de vitres à Terrebonne pour maisons et commerces",
    heroSubtitle:
      "Des vitres impeccables à Terrebonne, garanties, avec un service attentif et une exécution rigoureuse.",
    aboutParagraph:
      "Depuis plusieurs années, nous aidons les propriétaires de Terrebonne à garder leurs vitres propres grâce à un service stable et bien exécuté.",
    serviceIntro:
      "Nos interventions à Terrebonne couvrent le lavage de fenêtres résidentiel, commercial et l'entretien périodique selon vos besoins.",
    ctaHeading: "Planifiez votre nettoyage de vitres à Terrebonne",
    ctaSubheading:
      "Une équipe locale, un service rapide et des résultats visibles dès la première visite.",
    contactSupportingCopy:
      "Nous desservons Terrebonne avec un accompagnement simple, de la soumission à la réalisation du service.",
    faqQuestionVariants: buildFaqQuestions("Terrebonne"),
    nearbyRegions: ["Mascouche", "Repentigny"],
  },
  mascouche: {
    fullTitleVariant:
      "Nettoyage de fenêtres à Mascouche | Mr. Clear - Service local",
    metaDescription:
      "Nettoyage de vitres à Mascouche pour résidences et entreprises. Service professionnel, ponctuel et adapté à votre bâtiment.",
    heroTitle: "Nettoyage de vitres à Mascouche pour un résultat net et durable",
    heroSubtitle:
      "À Mascouche, nous offrons un service de lavage de fenêtres soigné pour garder votre propriété lumineuse et bien entretenue.",
    aboutParagraph:
      "Notre équipe intervient à Mascouche avec une approche structurée pour garantir des vitres propres et une expérience client fluide.",
    serviceIntro:
      "À Mascouche, nous réalisons des nettoyages de vitres pour maisons, immeubles résidentiels et commerces avec des méthodes professionnelles.",
    ctaHeading: "Besoin d'un lavage de vitres à Mascouche ?",
    ctaSubheading:
      "Demandez votre devis gratuit et obtenez un service fiable, courtois et efficace.",
    contactSupportingCopy:
      "Pour Mascouche, nous proposons des rendez-vous rapides et un suivi simple pour tous vos besoins d'entretien de vitres.",
    faqQuestionVariants: buildFaqQuestions("Mascouche"),
    nearbyRegions: ["Terrebonne", "L'Assomption"],
  },
  assomption: {
    fullTitleVariant:
      "Lavage de vitres à L'Assomption | Mr. Clear - Service résidentiel et commercial",
    metaDescription:
      "Lavage de vitres à L'Assomption pour maisons et commerces. Travail minutieux, équipe expérimentée et soumission rapide.",
    heroTitle: "Service de lavage de vitres à L'Assomption, simple et efficace",
    heroSubtitle:
      "Des fenêtres propres et sans traces à L'Assomption grâce à un service professionnel et constant.",
    aboutParagraph:
      "À L'Assomption, nous mettons l'accent sur la qualité d'exécution et la fiabilité du service pour chaque type de propriété.",
    serviceIntro:
      "Nos services à L'Assomption incluent le lavage de fenêtres résidentiel, l'entretien commercial et les forfaits de nettoyage régulier.",
    ctaHeading: "Demandez votre soumission à L'Assomption",
    ctaSubheading:
      "Obtenez un service professionnel de lavage de vitres avec une équipe attentive à vos attentes.",
    contactSupportingCopy:
      "Notre équipe dessert L'Assomption et vous accompagne rapidement pour planifier un entretien ponctuel ou récurrent.",
    faqQuestionVariants: buildFaqQuestions("L'Assomption"),
    nearbyRegions: ["Repentigny", "Mascouche"],
  },
  boisbriand: {
    fullTitleVariant:
      "Nettoyage de vitres à Boisbriand | Mr. Clear - Intervention rapide",
    metaDescription:
      "Nettoyage de vitres à Boisbriand pour propriétés résidentielles et commerciales. Service rapide, fiable et sans traces.",
    heroTitle: "Lavage de vitres à Boisbriand pour maisons, condos et commerces",
    heroSubtitle:
      "Intervention rapide à Boisbriand avec un service soigné pour des vitres éclatantes toute l'année.",
    aboutParagraph:
      "Les clients de Boisbriand font appel à notre équipe pour un service professionnel, flexible et orienté sur des résultats durables.",
    serviceIntro:
      "À Boisbriand, nous prenons en charge le nettoyage de vitres résidentiel et commercial avec des méthodes adaptées à chaque bâtiment.",
    ctaHeading: "Passez à des vitres impeccables à Boisbriand",
    ctaSubheading:
      "Soumission gratuite, équipe expérimentée et planification simple selon votre horaire.",
    contactSupportingCopy:
      "Vous êtes à Boisbriand ? Contactez-nous pour un service de lavage de vitres efficace et une réponse rapide.",
    faqQuestionVariants: buildFaqQuestions("Boisbriand"),
    nearbyRegions: ["Rosemère", "Lorraine"],
  },
  lorraine: {
    fullTitleVariant:
      "Lavage de fenêtres à Lorraine | Mr. Clear - Qualité professionnelle",
    metaDescription:
      "Service de lavage de vitres à Lorraine pour résidences et commerces. Résultats soignés, service fiable et devis gratuit.",
    heroTitle: "Lavage de vitres à Lorraine pour des fenêtres toujours impeccables",
    heroSubtitle:
      "Un service local à Lorraine, fiable et méticuleux, pour conserver une vue claire et des vitres sans traces.",
    aboutParagraph:
      "À Lorraine, nous offrons un nettoyage de fenêtres professionnel qui combine précision, sécurité et constance sur chaque visite.",
    serviceIntro:
      "Notre service à Lorraine comprend le lavage intérieur et extérieur des vitres, l'entretien des moustiquaires et des forfaits saisonniers.",
    ctaHeading: "Besoin d'un nettoyage de vitres à Lorraine ?",
    ctaSubheading:
      "Confiez vos fenêtres à une équipe expérimentée et obtenez une soumission rapide.",
    contactSupportingCopy:
      "Pour Lorraine, nous proposons un accompagnement personnalisé et des interventions adaptées à votre type de propriété.",
    faqQuestionVariants: buildFaqQuestions("Lorraine"),
    nearbyRegions: ["Rosemère", "Boisbriand"],
  },
  rosemere: {
    fullTitleVariant:
      "Nettoyage de vitres à Rosemère | Mr. Clear - Service de confiance",
    metaDescription:
      "Lavage de vitres à Rosemère pour résidences et commerces. Service professionnel, soigné et adapté à vos besoins locaux.",
    heroTitle: "Service de lavage de vitres à Rosemère, précis et professionnel",
    heroSubtitle:
      "À Rosemère, nous aidons les propriétaires à garder des fenêtres propres et lumineuses grâce à un entretien efficace.",
    aboutParagraph:
      "Notre équipe dessert Rosemère avec une approche rigoureuse pour assurer des résultats constants, propres et sans compromis.",
    serviceIntro:
      "À Rosemère, nous réalisons le lavage de vitres résidentiel et commercial ainsi que l'entretien régulier selon la saison.",
    ctaHeading: "Obtenez une soumission pour Rosemère",
    ctaSubheading:
      "Choisissez un service local, fiable et orienté sur la qualité du résultat final.",
    contactSupportingCopy:
      "Nous sommes disponibles pour vos besoins de nettoyage de fenêtres à Rosemère, avec des délais rapides et un service courtois.",
    faqQuestionVariants: buildFaqQuestions("Rosemère"),
    nearbyRegions: ["Lorraine", "Boisbriand"],
  },
  "bois-des-filion": {
    fullTitleVariant:
      "Lavage de vitres à Bois-des-Filion | Mr. Clear - Résidentiel et commercial",
    metaDescription:
      "Service de lavage de vitres à Bois-des-Filion pour maisons et commerces. Résultats impeccables, équipe fiable et soumission gratuite.",
    heroTitle:
      "Lavage de vitres à Bois-des-Filion avec une équipe locale expérimentée",
    heroSubtitle:
      "Des interventions soignées à Bois-des-Filion pour maintenir vos fenêtres propres, claires et sans traces.",
    aboutParagraph:
      "À Bois-des-Filion, nous misons sur la qualité du détail et la fiabilité du service pour chaque propriété résidentielle ou commerciale.",
    serviceIntro:
      "Nos services à Bois-des-Filion couvrent le lavage de fenêtres, l'entretien de vitres commerciales et les plans réguliers d'entretien.",
    ctaHeading: "Planifiez votre nettoyage de vitres à Bois-des-Filion",
    ctaSubheading:
      "Recevez une estimation rapide et profitez d'un service professionnel adapté à votre bâtiment.",
    contactSupportingCopy:
      "Pour Bois-des-Filion, nous répondons rapidement à vos demandes et proposons des rendez-vous flexibles.",
    faqQuestionVariants: buildFaqQuestions("Bois-des-Filion"),
    nearbyRegions: ["Terrebonne", "Laval"],
  },
};

const buildLocalizedFaqItems = (
  city: string,
  nearbyRegions: string[] | undefined,
  questions: [string, string, string, string]
): HomeFaqItem[] => {
  const cityPreposition = `à ${city}`;
  const nearbyText = nearbyRegions?.length ? ` et ${nearbyRegions.join(", ")}` : "";

  return [
    {
      question: questions[0],
      answer: `${withCity(
        "Nous recommandons généralement un nettoyage au printemps et à l'automne pour les résidences",
        city
      )}. Pour les commerces, un entretien mensuel ou trimestriel aide à garder une vitrine impeccable en continu.`,
    },
    {
      question: questions[1],
      answer: `Oui. Nous desservons les maisons, condos, immeubles locatifs et entreprises ${cityPreposition}${nearbyText}. Chaque intervention est adaptée au type de bâtiment et au niveau d'accès.`,
    },
    {
      question: questions[2],
      answer: `La durée dépend du nombre de fenêtres, de l'accès et de l'état des surfaces. Pour une résidence standard ${cityPreposition}, l'intervention prend souvent entre 1 h 30 et 3 h.`,
    },
    {
      question: questions[3],
      answer: `Oui. Nous proposons des plages horaires rapides ${cityPreposition} selon la saison et votre secteur. Vous obtenez une soumission claire et un rendez-vous confirmé rapidement.`,
    },
  ];
};

const formatNearbyAreaList = (areas: string[]) => {
  if (areas.length === 0) {
    return "";
  }

  if (areas.length === 1) {
    return areas[0];
  }

  return `${areas.slice(0, -1).join(", ")} et ${areas[areas.length - 1]}`;
};

export const EXACT_NEARBY_AREAS: Record<ServiceAreaSlug, string[]> = {
  montreal: [
    "Anjou",
    "Saint-Léonard",
    "Ahuntsic-Cartierville",
    "Rosemont–La Petite-Patrie",
    "Villeray–Saint-Michel–Parc-Extension",
  ],
  laval: [
    "Chomedey",
    "Sainte-Dorothée",
    "Duvernay",
    "Vimont",
    "Laval-des-Rapides",
  ],
  terrebonne: [
    "Lachenaie",
    "La Plaine",
    "Terrebonne-Ouest",
    "Mascouche",
    "Repentigny",
  ],
  repentigny: [
    "Le Gardeur",
    "Centre-ville",
    "Du Boisé",
    "Le Bourg-Neuf",
    "Vieux-Saint-Paul",
  ],
  mascouche: [
    "Vieux-Mascouche",
    "La Plaine",
    "Terrebonne",
    "Repentigny",
    "L'Assomption",
  ],
  assomption: [
    "Centre-ville de L'Assomption",
    "Le Gardeur",
    "Charlemagne",
    "Repentigny",
    "Mascouche",
  ],
  boisbriand: [
    "Sainte-Thérèse",
    "Rosemère",
    "Lorraine",
    "Bois-des-Filion",
    "Laval",
  ],
  lorraine: [
    "Rosemère",
    "Boisbriand",
    "Bois-des-Filion",
    "Sainte-Thérèse",
    "Laval",
  ],
  rosemere: [
    "Secteur 1",
    "Secteur 2",
    "Secteur 3",
    "Secteur 4",
    "Secteur 5",
  ],
  "bois-des-filion": [
    "Lorraine",
    "Rosemère",
    "Terrebonne",
    "Sainte-Thérèse",
    "Laval",
  ],
};

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
    faqIntro: `Questions fréquentes sur le lavage de vitres à ${area.name}.`,
    ctaHeading: copy.ctaHeading,
    ctaSubheading: copy.ctaSubheading,
    contactSupportingCopy: copy.contactSupportingCopy,
    faqItems: buildLocalizedFaqItems(
      area.name,
      copy.nearbyRegions,
      copy.faqQuestionVariants
    ),
    nearbyRegions: copy.nearbyRegions,
    nearbyAreasTitle: `Secteurs desservis à proximité de ${area.name}`,
    nearbyAreasIntro: `À ${area.name}, nous desservons aussi ${formatNearbyAreaList(
      EXACT_NEARBY_AREAS[area.slug]
    )}.`,
    nearbyAreas: EXACT_NEARBY_AREAS[area.slug],
  };

  return acc;
}, {} as Record<ServiceAreaSlug, ServiceAreaPageContent>);

export const getServiceAreaPageContent = (slug: ServiceAreaSlug) =>
  SERVICE_AREA_PAGE_CONTENT[slug];
