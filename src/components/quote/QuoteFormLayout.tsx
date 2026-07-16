import type React from 'react';
import { Button } from '@/components/ui/button';
import QuoteIdentityFields from '@/components/quote/QuoteIdentityFields';
import QuoteLocationFields from '@/components/quote/QuoteLocationFields';
import QuoteServiceFields from '@/components/quote/QuoteServiceFields';
import { QuoteFormData, QuoteFormErrors } from '@/consts/quote';

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

interface QuoteFormLayoutProps {
  formData: QuoteFormData;
  errors: QuoteFormErrors;
  status: SubmissionStatus;
  resultMessage: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onDetailsChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddressSelect: (address: string, municipality: string) => void;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConsentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBotFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuoteFormLayout = ({
  formData,
  errors,
  status,
  resultMessage,
  onSubmit,
  onChange,
  onDetailsChange,
  onAddressSelect,
  onCheckboxChange,
  onConsentChange,
  onBotFieldChange,
}: QuoteFormLayoutProps) => {
  const isSubmitting = status === 'submitting';

  return (
    <section id="soumission" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-brand-blue">
                Demandez votre soumission gratuite
              </h1>
              <p className="text-gray-600 mt-2">
                Décrivez les travaux souhaités. Apex Prestige communiquera avec
                vous pour préciser les besoins de votre propriété.
              </p>
            </div>

            <form
              name="soumission-apex-prestige"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="hidden" aria-hidden="true">
                <label htmlFor="bot-field">Ne pas remplir ce champ</label>
                <input
                  id="bot-field"
                  name="bot-field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.botField}
                  onChange={onBotFieldChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuoteIdentityFields
                  formData={formData}
                  errors={errors}
                  onChange={onChange}
                />
                <QuoteLocationFields
                  formData={formData}
                  errors={errors}
                  onChange={onChange}
                  onAddressSelect={onAddressSelect}
                />
                <QuoteServiceFields
                  formData={formData}
                  errors={errors}
                  onDetailsChange={onDetailsChange}
                  onCheckboxChange={onCheckboxChange}
                  onConsentChange={onConsentChange}
                />
              </div>

              <div className="mt-8 text-center">
                <Button
                  type="submit"
                  className="cta-button w-full md:w-auto px-8 py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </Button>
              </div>

              <div
                className={`mt-5 text-center text-sm ${
                  status === 'error' ? 'text-red-600' : 'text-gray-700'
                }`}
                role={status === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {resultMessage}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteFormLayout;
