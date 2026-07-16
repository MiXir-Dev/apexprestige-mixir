import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { QuoteFormData } from "@/consts/quote";

interface QuoteIdentityFieldsProps {
  formData: QuoteFormData;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const EMAIL_PROVIDER_DOMAINS = [
  "yahoo.com",
  "hotmail.com",
  "gmail.com",
  "icloud.com",
  "outlook.com",
];

const splitEmailValue = (value: string) => {
  const atIndex = value.indexOf("@");
  if (atIndex === -1) {
    return { localPart: value, domainPart: "", hasAt: false };
  }

  return {
    localPart: value.slice(0, atIndex),
    domainPart: value.slice(atIndex + 1),
    hasAt: true,
  };
};

const QuoteIdentityFields = ({
  formData,
  onChange,
}: QuoteIdentityFieldsProps) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [activeEmailIndex, setActiveEmailIndex] = useState(0);

  const { localPart, domainPart, hasAt } = useMemo(
    () => splitEmailValue(formData.email),
    [formData.email]
  );
  const normalizedDomainQuery = domainPart.trim().toLowerCase();
  const filteredEmailDomains = useMemo(() => {
    if (!localPart.trim()) {
      return [];
    }

    if (!hasAt || !normalizedDomainQuery) {
      return EMAIL_PROVIDER_DOMAINS;
    }

    return EMAIL_PROVIDER_DOMAINS.filter((domain) =>
      domain.startsWith(normalizedDomainQuery)
    );
  }, [hasAt, localPart, normalizedDomainQuery]);
  const showEmailSuggestions =
    isEmailFocused && localPart.trim().length > 0 && filteredEmailDomains.length > 0;

  useEffect(() => {
    setActiveEmailIndex((previous) => {
      if (filteredEmailDomains.length === 0) {
        return 0;
      }

      return Math.min(previous, filteredEmailDomains.length - 1);
    });
  }, [filteredEmailDomains.length]);

  const emitEmailChange = (value: string) => {
    onChange({
      target: { name: "email", value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveEmailIndex(0);
    onChange(event);
  };

  const handleEmailDomainSelect = (domain: string) => {
    emitEmailChange(`${localPart}@${domain}`);
    setIsEmailFocused(false);
  };

  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showEmailSuggestions) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveEmailIndex((previous) =>
        previous >= filteredEmailDomains.length - 1 ? 0 : previous + 1
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveEmailIndex((previous) =>
        previous <= 0 ? filteredEmailDomains.length - 1 : previous - 1
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selectedDomain =
        filteredEmailDomains[activeEmailIndex] ?? filteredEmailDomains[0];
      if (selectedDomain) {
        handleEmailDomainSelect(selectedDomain);
      }
      return;
    }

    if (event.key === "Escape") {
      setIsEmailFocused(false);
    }
  };

  const renderEmailDomain = (domain: string) => {
    if (
      !hasAt ||
      !normalizedDomainQuery ||
      !domain.startsWith(normalizedDomainQuery)
    ) {
      return `@${domain}`;
    }

    const matchedPrefix = domain.slice(0, normalizedDomainQuery.length);
    const remaining = domain.slice(normalizedDomainQuery.length);

    return (
      <>
        <strong className="font-semibold text-brand-blue">@{matchedPrefix}</strong>
        {remaining}
      </>
    );
  };

  return (
    <>
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Nom complet *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          placeholder="Votre nom"
        />
      </div>

      <div className="relative">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
          Courriel *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleEmailChange}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          onKeyDown={handleEmailKeyDown}
          autoComplete="email"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          placeholder="votre@email.com"
        />
        {showEmailSuggestions ? (
          <ul className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            {filteredEmailDomains.map((domain, index) => (
              <li key={domain}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleEmailDomainSelect(domain)}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors ${
                    index === activeEmailIndex
                      ? "bg-brand-blue/10 text-brand-blue"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {renderEmailDomain(domain)}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
          Téléphone *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          placeholder="(514) 266-6151"
        />
      </div>
    </>
  );
};

export default QuoteIdentityFields;
