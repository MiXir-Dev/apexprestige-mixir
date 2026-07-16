import { ServiceArea } from "@/consts/service-areas";
import { QUOTE_PATH } from "@/consts/paths";

export const FOOTER_SERVICES = [
  "Nettoyage de vitres intérieur & extérieur",
  "Vidage de gouttières",
  "Services commerciaux",
] as const;

export const FOOTER_QUICK_LINKS = [
  { type: "section", id: "pourquoi-nous", label: "Pourquoi nous choisir" },
  { type: "route", to: QUOTE_PATH, label: "Demande de devis" },
  { type: "section", id: "faq", label: "FAQ" },
  { type: "section", id: "contact", label: "Contact" },
] as const;

export const splitServiceAreas = (areas: ServiceArea[]) => {
  const midpoint = Math.ceil(areas.length / 2);
  return [areas.slice(0, midpoint), areas.slice(midpoint)];
};
