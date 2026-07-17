import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { BUSINESS } from "@/consts/business";
import { CONTACT, SOCIAL_LINKS } from "@/consts/contact";
import { HOME_PATH } from "@/consts/paths";

interface FacebookIconProps {
  className?: string;
}

const FacebookIcon = ({ className }: FacebookIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.973h-1.513c-1.49 0-1.956.931-1.956 1.887v2.26h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
  </svg>
);

const FooterBrand = () => {
  return (
    <div>
      <Link
        to={HOME_PATH}
        className="
          inline-block
          rounded-sm
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
        "
      >
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {BUSINESS.displayName}
        </h2>
      </Link>

      <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
        Services professionnels de nettoyage et d’entretien extérieur pour les
        propriétés résidentielles et commerciales.
      </p>

      <div className="mt-6 space-y-3 text-sm">
        <a
          href={`tel:${CONTACT.phone}`}
          className="
            flex w-fit items-center gap-3
            text-white/70
            transition-colors
            hover:text-white
          "
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{CONTACT.phoneDisplay}</span>
        </a>

        <a
          href={`mailto:${CONTACT.email}`}
          className="
            flex w-fit items-center gap-3
            break-all text-white/70
            transition-colors
            hover:text-white
          "
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{CONTACT.email}</span>
        </a>

        <div className="flex items-start gap-3 text-white/70">
          <MapPin
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <span className="leading-5">{CONTACT.area}</span>
        </div>
      </div>

      {SOCIAL_LINKS.facebook && (
        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-6 inline-flex items-center gap-2
            rounded-md border border-white/15
            px-3 py-2
            text-sm font-medium text-white/75
            transition-colors
            hover:border-white/30
            hover:bg-white/10
            hover:text-white
          "
          aria-label={`Visiter la page Facebook de ${BUSINESS.displayName}`}
        >
          <FacebookIcon className="h-4 w-4" />
          <span>Facebook</span>
        </a>
      )}
    </div>
  );
};

export default FooterBrand;