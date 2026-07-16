import { useState } from 'react';
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

type TextFieldName =
  | 'firstName'
  | 'lastName'
  | 'phone'
  | 'email'
  | 'address'
  | 'municipality'
  | 'propertyType';

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
  const [formData, setFormData] = useState<QuoteFormData>(
    DEFAULT_QUOTE_FORM_DATA
  );
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [resultMessage, setResultMessage] = useState('');

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
      onCheckboxChange={handleCheckboxChange}
      onConsentChange={handleConsentChange}
      onBotFieldChange={handleBotFieldChange}
    />
  );
};

export default QuoteForm;
