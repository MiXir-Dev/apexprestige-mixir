import type React from "react";
import {
  QuoteFormData,
  QuoteServiceKey,
  QUOTE_SERVICE_OPTIONS,
} from "@/consts/quote";

interface QuoteServiceFieldsProps {
  formData: QuoteFormData;
  onMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuoteServiceFields = ({
  formData,
  onMessageChange,
  onCheckboxChange,
}: QuoteServiceFieldsProps) => {
  return (
    <>
      <div className="md:col-span-2">
        <label className="block text-gray-700 font-medium mb-2">
          Services requis *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUOTE_SERVICE_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                id={option.id}
                name={option.id}
                type="checkbox"
                checked={formData.services[option.id as QuoteServiceKey]}
                onChange={onCheckboxChange}
                className="w-5 h-5 text-brand-blue focus:ring-brand-blue"
              />
              <label htmlFor={option.id} className="ml-2 text-gray-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
          Message ou détails supplémentaires
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={onMessageChange}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          placeholder="Précisez vos besoins spécifiques..."
        ></textarea>
      </div>
    </>
  );
};

export default QuoteServiceFields;
