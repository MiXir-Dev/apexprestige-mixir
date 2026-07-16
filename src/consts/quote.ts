import { SERVICE_CATALOGUE } from '@/consts/services';

export type QuoteServiceKey = (typeof SERVICE_CATALOGUE)[number]['id'];

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  municipality: string;
  propertyType: string;
  details: string;
  services: Record<QuoteServiceKey, boolean>;
  consent: boolean;
  botField: string;
}

export type QuoteFormErrors = Partial<
  Record<
    | 'firstName'
    | 'lastName'
    | 'phone'
    | 'email'
    | 'address'
    | 'municipality'
    | 'propertyType'
    | 'services'
    | 'consent',
    string
  >
>;

export const QUOTE_SERVICE_OPTIONS = SERVICE_CATALOGUE.map((service) => ({
  id: service.id,
  label: service.title,
}));

export const PROPERTY_TYPES = [
  { value: 'residential', label: 'Résidentielle' },
  { value: 'commercial', label: 'Commerciale' },
] as const;

export const DEFAULT_QUOTE_FORM_DATA: QuoteFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  municipality: '',
  propertyType: '',
  details: '',
  services: Object.fromEntries(
    SERVICE_CATALOGUE.map((service) => [service.id, false])
  ) as Record<QuoteServiceKey, boolean>,
  consent: false,
  botField: '',
};
