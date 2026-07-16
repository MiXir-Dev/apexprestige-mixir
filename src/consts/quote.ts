export type QuoteServiceKey = "exteriorWindows" | "interiorWindows" | "gutterCleaning";

export interface QuoteFormData {
  name: string;
  address: string;
  city: string;
  buildingType: string;
  floors: string;
  email: string;
  phone: string;
  message: string;
  services: Record<QuoteServiceKey, boolean>;
}

export const QUOTE_SERVICE_OPTIONS: { id: QuoteServiceKey; label: string }[] = [
  { id: "exteriorWindows", label: "Nettoyage de vitres extérieur" },
  { id: "interiorWindows", label: "Nettoyage de vitres intérieur" },
  { id: "gutterCleaning", label: "Vidage de gouttières" },
];

export const BUILDING_TYPES = [
  { value: "residential", label: "Résidentiel" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industriel" },
] as const;

export const DEFAULT_QUOTE_FORM_DATA: QuoteFormData = {
  name: "",
  address: "",
  city: "",
  buildingType: "residential",
  floors: "",
  email: "",
  phone: "",
  message: "",
  services: {
    exteriorWindows: false,
    interiorWindows: false,
    gutterCleaning: false,
  },
};
