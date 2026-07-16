import type React from 'react';
import {
  QUOTE_SERVICE_OPTIONS,
  QuoteFormData,
  QuoteFormErrors,
  QuoteServiceKey,
} from '@/consts/quote';

interface QuoteServiceFieldsProps {
  formData: QuoteFormData;
  errors: QuoteFormErrors;
  onDetailsChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConsentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuoteServiceFields = ({
  formData,
  errors,
  onDetailsChange,
  onCheckboxChange,
  onConsentChange,
}: QuoteServiceFieldsProps) => (
  <>
    <fieldset
      className="md:col-span-2"
      aria-required="true"
      aria-invalid={Boolean(errors.services)}
      aria-describedby={errors.services ? 'services-error' : undefined}
    >
      <legend className="block text-gray-700 font-medium mb-2">
        Services souhaités *
      </legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUOTE_SERVICE_OPTIONS.map((option) => (
          <div key={option.id} className="flex items-start">
            <input
              id={option.id}
              name={option.id}
              type="checkbox"
              checked={formData.services[option.id as QuoteServiceKey]}
              onChange={onCheckboxChange}
              className="mt-1 w-5 h-5 text-brand-blue focus:ring-brand-blue"
            />
            <label htmlFor={option.id} className="ml-2 text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {errors.services ? (
        <p id="services-error" className="mt-2 text-sm text-red-600">
          {errors.services}
        </p>
      ) : null}
    </fieldset>

    <div className="md:col-span-2">
      <label className="block text-gray-700 font-medium mb-2" htmlFor="details">
        Précisions supplémentaires
      </label>
      <textarea
        id="details"
        name="details"
        rows={4}
        value={formData.details}
        onChange={onDetailsChange}
        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
      />
    </div>

    <div className="md:col-span-2">
      <div className="flex items-start">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
          checked={formData.consent}
          onChange={onConsentChange}
          className="mt-1 w-5 h-5 text-brand-blue focus:ring-brand-blue"
        />
        <label htmlFor="consent" className="ml-2 text-gray-700">
          J’accepte qu’Apex Prestige communique avec moi au sujet de cette demande.
        </label>
      </div>
      {errors.consent ? (
        <p id="consent-error" className="mt-2 text-sm text-red-600">
          {errors.consent}
        </p>
      ) : null}
    </div>
  </>
);

export default QuoteServiceFields;
