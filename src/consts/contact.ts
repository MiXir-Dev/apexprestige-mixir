import { BUSINESS } from '@/consts/business';

export const CONTACT = {
  phone: BUSINESS.phone,
  phoneDisplay: BUSINESS.phoneDisplay,
  email: BUSINESS.email,
  area: BUSINESS.areaSummary,
  hours: BUSINESS.availability,
} as const;

export const SOCIAL_LINKS = {
  facebook: BUSINESS.facebook,
} as const;
