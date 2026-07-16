import { useEffect, useRef, useState } from "react";
import type React from "react";
import { BUILDING_TYPES, QuoteFormData } from "@/consts/quote";

interface AddressSuggestion {
  place_id: number;
  display_name: string;
  lat?: string;
  lon?: string;
  address?: {
    house_number?: string;
    road?: string;
    pedestrian?: string;
    footway?: string;
    suburb?: string;
    neighbourhood?: string;
    quarter?: string;
    city_district?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    hamlet?: string;
    county?: string;
    state?: string;
    postcode?: string;
  };
}

interface QuoteLocationFieldsProps {
  formData: QuoteFormData;
  isAddressValidated: boolean;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onAddressSelect: (value: { address: string; city: string }) => void;
  onAddressValidatedChange: (isValid: boolean) => void;
}

const QuoteLocationFields = ({
  formData,
  isAddressValidated,
  onChange,
  onAddressSelect,
  onAddressValidatedChange,
}: QuoteLocationFieldsProps) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [hasAddressBlurred, setHasAddressBlurred] = useState(false);
  const suppressFetchRef = useRef(false);

  useEffect(() => {
    if (suppressFetchRef.current) {
      suppressFetchRef.current = false;
      return;
    }

    const query = formData.address.trim();
    if (query.length < 3) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      setFetchError("");
      return;
    }

    const abortController = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      setFetchError("");

      try {
        const params = new URLSearchParams({
          q: query,
          format: "jsonv2",
          addressdetails: "1",
          limit: "5",
          countrycodes: "ca",
        });

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`,
          {
            signal: abortController.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Autocomplete failed: ${response.status}`);
        }

        const data: unknown = await response.json();
        const parsedSuggestions = Array.isArray(data)
          ? data.filter(
              (item): item is AddressSuggestion =>
                typeof item === "object" &&
                item !== null &&
                "display_name" in item &&
                "place_id" in item
            )
          : [];

        setSuggestions(parsedSuggestions);
        setIsDropdownOpen(true);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }
        console.error("Erreur autocomplete adresse:", error);
        setSuggestions([]);
        setFetchError("Impossible de charger les adresses pour le moment.");
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 350);

    return () => {
      abortController.abort();
      window.clearTimeout(timeoutId);
    };
  }, [formData.address]);

  const resolveCity = (suggestion: AddressSuggestion) => {
    const address = suggestion.address;
    return (
      address?.city ??
      address?.town ??
      address?.village ??
      address?.municipality ??
      address?.hamlet ??
      address?.county ??
      ""
    );
  };

  const buildFormattedAddress = (suggestion: AddressSuggestion) => {
    const address = suggestion.address;
    const streetName =
      address?.road ?? address?.pedestrian ?? address?.footway ?? "";
    const street = [address?.house_number, streetName]
      .filter(Boolean)
      .join(" ")
      .trim();
    const district =
      address?.suburb ??
      address?.neighbourhood ??
      address?.quarter ??
      address?.city_district ??
      "";
    const city = resolveCity(suggestion);
    const region = address?.state ?? "";
    const postalCode = address?.postcode ?? "";

    const compact = [street || district, city, region, postalCode]
      .filter(Boolean)
      .join(", ");

    if (compact) {
      return compact;
    }

    return suggestion.display_name
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .slice(0, 4)
      .join(", ");
  };

  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasAddressBlurred(false);
    onAddressValidatedChange(false);
    onChange(event);
  };

  const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
    const formattedAddress = buildFormattedAddress(suggestion);

    suppressFetchRef.current = true;
    onAddressSelect({
      address: formattedAddress,
      city: resolveCity(suggestion),
    });
    onAddressValidatedChange(true);
    setHasAddressBlurred(false);
    setSuggestions([]);
    setIsDropdownOpen(false);
    setFetchError("");
  };

  const trimmedAddress = formData.address.trim();
  const shouldShowAddressValidationError =
    Boolean(trimmedAddress) &&
    !isAddressValidated &&
    hasAddressBlurred &&
    !isLoading &&
    suggestions.length === 0;

  return (
    <>
      <div>
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="buildingType"
        >
          Type de bâtiment *
        </label>
        <select
          id="buildingType"
          name="buildingType"
          required
          value={formData.buildingType}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          {BUILDING_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="relative md:col-span-2">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
          Adresse *
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleAddressInputChange}
          onFocus={() => {
            setHasAddressBlurred(false);
            if (suggestions.length > 0) {
              setIsDropdownOpen(true);
            }
          }}
          onBlur={() => {
            setHasAddressBlurred(true);
            window.setTimeout(() => setIsDropdownOpen(false), 100);
          }}
          required
          autoComplete="off"
          className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-blue ${
            formData.address && !isAddressValidated
              ? "border-red-400"
              : "border-gray-300"
          }`}
          placeholder="123 rue Principale"
        />
        {shouldShowAddressValidationError ? (
          <p className="mt-2 text-sm text-red-600">
            Sélectionnez une adresse proposée pour valider la soumission.
          </p>
        ) : null}
        {fetchError ? (
          <p className="mt-1 text-sm text-red-600">{fetchError}</p>
        ) : null}

        {isDropdownOpen && (isLoading || suggestions.length > 0) ? (
          <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {isLoading ? (
              <p className="px-4 py-3 text-sm text-gray-500">Recherche en cours...</p>
            ) : (
              <ul className="max-h-64 overflow-y-auto py-1">
                {suggestions.map((suggestion) => (
                  <li key={suggestion.place_id}>
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left hover:bg-gray-50"
                      onMouseDown={() => handleSuggestionSelect(suggestion)}
                    >
                      <span className="block text-sm font-medium text-gray-800">
                        {buildFormattedAddress(suggestion)}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {resolveCity(suggestion) || "Adresse suggérée"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default QuoteLocationFields;
