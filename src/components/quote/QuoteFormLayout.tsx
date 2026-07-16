import type React from "react";
import { Button } from "@/components/ui/button";
import QuoteIdentityFields from "@/components/quote/QuoteIdentityFields";
import QuoteLocationFields from "@/components/quote/QuoteLocationFields";
import QuoteServiceFields from "@/components/quote/QuoteServiceFields";
import { QuoteFormData } from "@/consts/quote";

interface QuoteFormLayoutProps {
  formData: QuoteFormData;
  isSubmitting: boolean;
  isAddressValidated: boolean;
  onSubmit: (event: React.FormEvent) => void;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onAddressSelect: (value: { address: string; city: string }) => void;
  onAddressValidatedChange: (isValid: boolean) => void;
  onMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuoteFormLayout = ({
  formData,
  isSubmitting,
  isAddressValidated,
  onSubmit,
  onChange,
  onAddressSelect,
  onAddressValidatedChange,
  onMessageChange,
  onCheckboxChange,
}: QuoteFormLayoutProps) => {
  return (
    <section id="soumission" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-blue">
                Obtenir un devis gratuit
              </h2>
              <p className="text-gray-600 mt-2">
                Remplissez le formulaire ci-dessous et recevez un devis personnalisé
                sous 24h.
              </p>
            </div>

            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuoteIdentityFields formData={formData} onChange={onChange} />
                <QuoteLocationFields
                  formData={formData}
                  isAddressValidated={isAddressValidated}
                  onChange={onChange}
                  onAddressSelect={onAddressSelect}
                  onAddressValidatedChange={onAddressValidatedChange}
                />
                <QuoteServiceFields
                  formData={formData}
                  onMessageChange={onMessageChange}
                  onCheckboxChange={onCheckboxChange}
                />
              </div>

              <div className="mt-8 text-center">
                <Button
                  type="submit"
                  className="cta-button w-full md:w-auto px-8 py-4"
                  disabled={isSubmitting || !isAddressValidated}
                >
                  {isSubmitting ? "Envoi en cours..." : "Obtenir mon devis gratuit"}
                </Button>
                <p className="text-gray-500 text-sm mt-3">
                  Nous répondons généralement en moins de 24 heures ouvrables.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteFormLayout;
