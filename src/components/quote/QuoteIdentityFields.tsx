import type React from 'react';
import { QuoteFormData, QuoteFormErrors } from '@/consts/quote';

interface QuoteIdentityFieldsProps {
  formData: QuoteFormData;
  errors: QuoteFormErrors;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const fields = [
  { id: 'firstName', label: 'Prénom', type: 'text', autoComplete: 'given-name' },
  { id: 'lastName', label: 'Nom', type: 'text', autoComplete: 'family-name' },
  { id: 'phone', label: 'Téléphone', type: 'tel', autoComplete: 'tel' },
  { id: 'email', label: 'Courriel', type: 'email', autoComplete: 'email' },
] as const;

const QuoteIdentityFields = ({
  formData,
  errors,
  onChange,
}: QuoteIdentityFieldsProps) => (
  <>
    {fields.map((field) => {
      const error = errors[field.id];
      const errorId = `${field.id}-error`;

      return (
        <div key={field.id}>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor={field.id}
          >
            {field.label} *
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            required
            aria-required="true"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            autoComplete={field.autoComplete}
            value={formData[field.id]}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          {error ? (
            <p id={errorId} className="mt-2 text-sm text-red-600">
              {error}
            </p>
          ) : null}
        </div>
      );
    })}
  </>
);

export default QuoteIdentityFields;
