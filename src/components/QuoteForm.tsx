import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import QuoteFormLayout, {
  SubmissionStatus,
} from '@/components/quote/QuoteFormLayout';
import {
  DEFAULT_QUOTE_FORM_DATA,
  QuoteFormData,
  QuoteFormErrors,
  QuoteServiceKey,
} from '@/consts/quote';
import { BUSINESS } from '@/consts/business';

const REQUIRED_MESSAGE = 'Ce champ est requis.';
const SUCCESS_MESSAGE =
  'Merci! Votre demande a bien été envoyée. Apex Prestige communiquera avec vous pour la suite.';
const ERROR_MESSAGE = `La demande n’a pas pu être envoyée. Veuillez réessayer ou communiquer avec nous au ${BUSINESS.phoneDisplay}.`;
const FORM_STORAGE_KEY = 'apex-prestige-quote-draft';

type TextFieldName =
  | 'firstName'
  | 'lastName'
  | 'phone'
  | 'email'
  | 'address'
  | 'municipality'
  | 'propertyType';

const getStoredFormData = (): QuoteFormData => {
  if (typeof window === 'undefined') return DEFAULT_QUOTE_FORM_DATA;

  try {
    const storedValue = window.localStorage.getItem(FORM_STORAGE_KEY);
    if (!storedValue) return DEFAULT_QUOTE_FORM_DATA;

    const parsed: unknown = JSON.parse(storedValue);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return DEFAULT_QUOTE_FORM_DATA;
    }

    const draft = parsed as Partial<QuoteFormData>;
    const storedServices =
      draft.services && typeof draft.services === 'object'
        ? draft.services
        : {};

    return {
      firstName: typeof draft.firstName === 'string' ? draft.firstName : '',
      lastName: typeof draft.lastName === 'string' ? draft.lastName : '',
      phone: typeof draft.phone === 'string' ? draft.phone : '',
      email: typeof draft.email === 'string' ? draft.email : '',
      address: typeof draft.address === 'string' ? draft.address : '',
      municipality:
        typeof draft.municipality === 'string' ? draft.municipality : '',
      propertyType:
        typeof draft.propertyType === 'string' ? draft.propertyType : '',
      details: typeof draft.details === 'string' ? draft.details : '',
      services: Object.fromEntries(
        Object.keys(DEFAULT_QUOTE_FORM_DATA.services).map((service) => [
          service,
          storedServices[service as QuoteServiceKey] === true,
        ])
      ) as QuoteFormData['services'],
      consent: draft.consent === true,
      botField: '',
    };
  } catch {
    return DEFAULT_QUOTE_FORM_DATA;
  }
};

const validateForm = (formData: QuoteFormData): QuoteFormErrors => {
  const errors: QuoteFormErrors = {};
  const requiredFields: TextFieldName[] = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'address',
    'municipality',
    'propertyType',
  ];

  requiredFields.forEach((field) => {
    if (!formData[field].trim()) errors[field] = REQUIRED_MESSAGE;
  });

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Entrez une adresse courriel valide.';
  }

  if (!Object.values(formData.services).some(Boolean)) {
    errors.services = 'Sélectionnez au moins un service.';
  }

  if (!formData.consent) {
    errors.consent = 'Le consentement est requis.';
  }

  return errors;
};

const QuoteForm = () => {
  const [formData, setFormData] = useState<QuoteFormData>(getStoredFormData);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [resultMessage, setResultMessage] = useState('');
  const skipNextPersistenceRef = useRef(false);

  useEffect(() => {
    if (skipNextPersistenceRef.current) {
      skipNextPersistenceRef.current = false;
      return;
    }

    try {
      const { botField: _botField, ...draft } = formData;
      window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // The form remains fully usable when browser storage is unavailable.
    }
  }, [formData]);

  const clearError = (field: keyof QuoteFormErrors) => {
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const field = event.target.name as TextFieldName;
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    clearError(field);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, details: event.target.value }));
  };

  const handleAddressSelect = (address: string, municipality: string) => {
    setFormData((current) => ({ ...current, address, municipality }));
    clearError('address');
    clearError('municipality');
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const service = event.target.name as QuoteServiceKey;
    setFormData((current) => ({
      ...current,
      services: { ...current.services, [service]: event.target.checked },
    }));
    clearError('services');
  };

  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, consent: event.target.checked }));
    clearError('consent');
  };

  const handleBotFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, botField: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResultMessage('');

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = event.currentTarget.querySelector<HTMLElement>(
        '[aria-invalid="true"]'
      );
      firstInvalidField?.focus();
      return;
    }

    if (formData.botField) {
      setStatus('success');
      setResultMessage(SUCCESS_MESSAGE);
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      municipality: formData.municipality,
      propertyType: formData.propertyType,
      services: formData.services,
      details: formData.details,
      consent: formData.consent,
      botField: formData.botField,
    };

    setStatus('submitting');

    try {
      const response = await fetch('/.netlify/functions/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Quote API: ${response.status}`);

      skipNextPersistenceRef.current = true;
      window.localStorage.removeItem(FORM_STORAGE_KEY);
      setFormData(DEFAULT_QUOTE_FORM_DATA);
      setStatus('success');
      setResultMessage(SUCCESS_MESSAGE);
    } catch (error) {
      console.error('Erreur lors de l’envoi de la soumission:', error);
      setStatus('error');
      setResultMessage(ERROR_MESSAGE);
    }
  };

  return (
    <QuoteFormLayout
      formData={formData}
      errors={errors}
      status={status}
      resultMessage={resultMessage}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onDetailsChange={handleDetailsChange}
      onAddressSelect={handleAddressSelect}
      onCheckboxChange={handleCheckboxChange}
      onConsentChange={handleConsentChange}
      onBotFieldChange={handleBotFieldChange}
    />
  );
};

export default QuoteForm;
