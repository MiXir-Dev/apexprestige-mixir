import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import {
  PROPERTY_TYPES,
  QuoteFormData,
  QuoteFormErrors,
} from '@/consts/quote';

interface AddressSuggestion {
  id: string;
  address: string;
  municipality: string;
  label: string;
}

interface PhotonFeature {
  properties?: {
    osm_id?: number;
    osm_type?: string;
    countrycode?: string;
    housenumber?: string;
    street?: string;
    name?: string;
    city?: string;
    locality?: string;
    district?: string;
    county?: string;
    state?: string;
    postcode?: string;
  };
}

const getText = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

const formatPhotonSuggestion = (
  feature: PhotonFeature
): AddressSuggestion | null => {
  const properties = feature.properties;
  if (!properties) return null;

  const countryCode = getText(properties.countrycode).toUpperCase();
  const street = getText(properties.street) || getText(properties.name);
  const municipality =
    getText(properties.city) ||
    getText(properties.locality) ||
    getText(properties.district) ||
    getText(properties.county);

  if ((countryCode && countryCode !== 'CA') || !street || !municipality) {
    return null;
  }

  const streetAddress = [getText(properties.housenumber), street]
    .filter(Boolean)
    .join(' ');
  const postcode = getText(properties.postcode);
  const state = getText(properties.state);
  const address = [streetAddress, postcode].filter(Boolean).join(', ');
  const label = [streetAddress, municipality, state, postcode]
    .filter(Boolean)
    .join(', ');

  return {
    id: `${properties.osm_type ?? ''}-${properties.osm_id ?? ''}-${label}`,
    address,
    municipality,
    label,
  };
};

interface QuoteLocationFieldsProps {
  formData: QuoteFormData;
  errors: QuoteFormErrors;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onAddressSelect: (address: string, municipality: string) => void;
}

const QuoteLocationFields = ({
  formData,
  errors,
  onChange,
  onAddressSelect,
}: QuoteLocationFieldsProps) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suppressSearchRef = useRef(false);
  const listboxId = 'address-suggestions';

  useEffect(() => {
    if (suppressSearchRef.current) {
      suppressSearchRef.current = false;
      return;
    }

    const query = formData.address.trim();
    if (query.length < 4) {
      setSuggestions([]);
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    const abortController = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);

      try {
        const parameters = new URLSearchParams({
          q: query,
          limit: '5',
          lang: 'fr',
          countrycode: 'CA',
        });
        const response = await fetch(
          `/.netlify/functions/address-search?${parameters}`,
          { signal: abortController.signal }
        );

        if (!response.ok) throw new Error(`Address API: ${response.status}`);

        const result: unknown = await response.json();
        const features =
          typeof result === 'object' &&
          result !== null &&
          'features' in result &&
          Array.isArray(result.features)
            ? (result.features as PhotonFeature[])
            : [];
        const nextSuggestions = features
          .map(formatPhotonSuggestion)
          .filter((suggestion): suggestion is AddressSuggestion =>
            Boolean(suggestion)
          );

        setSuggestions(nextSuggestions);
        setIsOpen(nextSuggestions.length > 0);
        setActiveIndex(-1);
      } catch {
        if (abortController.signal.aborted) return;
        setSuggestions([]);
        setIsOpen(false);
      } finally {
        if (!abortController.signal.aborted) setIsLoading(false);
      }
    }, 450);

    return () => {
      abortController.abort();
      window.clearTimeout(timeoutId);
    };
  }, [formData.address]);

  const selectSuggestion = (suggestion: AddressSuggestion) => {
    suppressSearchRef.current = true;
    onAddressSelect(suggestion.address, suggestion.municipality);
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleAddressKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!isOpen || suggestions.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1
      );
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <>
      <div className="relative md:col-span-2">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
          Adresse des travaux *
        </label>
        <input
          id="address"
          name="address"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-busy={isLoading}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `address-suggestion-${activeIndex}` : undefined
          }
          required
          aria-required="true"
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? 'address-error' : undefined}
          autoComplete="street-address"
          value={formData.address}
          onChange={onChange}
          onKeyDown={handleAddressKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          onBlur={() => {
            window.setTimeout(() => {
              setIsOpen(false);
              setActiveIndex(-1);
            }, 100);
          }}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        {errors.address ? (
          <p id="address-error" className="mt-2 text-sm text-red-600">
            {errors.address}
          </p>
        ) : null}

        {isOpen ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="Suggestions d’adresse"
            className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
          >
            {suggestions.map((suggestion, index) => (
              <li
                id={`address-suggestion-${index}`}
                key={suggestion.id}
                role="option"
                aria-selected={index === activeIndex}
                className={`cursor-pointer px-4 py-3 text-sm text-gray-700 transition-colors ${
                  index === activeIndex
                    ? 'bg-brand-light text-brand-blue'
                    : 'hover:bg-gray-50'
                }`}
                onMouseDown={(event) => {
                  event.preventDefault();
                  selectSuggestion(suggestion);
                }}
              >
                {suggestion.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div>
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="municipality"
        >
          Municipalité *
        </label>
        <input
          id="municipality"
          name="municipality"
          type="text"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.municipality)}
          aria-describedby={errors.municipality ? 'municipality-error' : undefined}
          autoComplete="address-level2"
          value={formData.municipality}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        {errors.municipality ? (
          <p id="municipality-error" className="mt-2 text-sm text-red-600">
            {errors.municipality}
          </p>
        ) : null}
      </div>

      <div>
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="propertyType"
        >
          Type de propriété *
        </label>
        <select
          id="propertyType"
          name="propertyType"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.propertyType)}
          aria-describedby={errors.propertyType ? 'propertyType-error' : undefined}
          value={formData.propertyType}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          <option value="">Sélectionnez une option</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.propertyType ? (
          <p id="propertyType-error" className="mt-2 text-sm text-red-600">
            {errors.propertyType}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default QuoteLocationFields;
