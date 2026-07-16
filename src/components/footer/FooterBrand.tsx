import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT, SOCIAL_LINKS } from "@/consts/contact";
import { HOME_PATH } from "@/consts/paths";

const FooterBrand = () => {
  return (
    <div className="md:col-span-1 flex flex-col items-center md:items-start">
      <div className="mb-6 text-center md:text-left">
        <Link to={HOME_PATH} className="inline-block">
          <h3 className="text-2xl font-bold mb-2">Mr. Clear</h3>
          <div className="w-16 h-1 bg-white rounded mx-auto md:mx-0"></div>
        </Link>
      </div>
      <p className="mb-4 text-center md:text-left">
        Services professionnels de lavage de vitres et entretien extérieur pour
        particuliers et entreprises.
      </p>
      <div className="flex items-center mb-2">
        <Phone size={18} className="mr-2" />
        <a href={`tel:${CONTACT.phone}`} className="hover:underline transition-colors">
          {CONTACT.phoneDisplay}
        </a>
      </div>
      <div className="flex items-center mb-2">
        <Mail size={18} className="mr-2" />
        <a
          href={`mailto:${CONTACT.email}`}
          className="hover:underline transition-colors"
        >
          {CONTACT.email}
        </a>
      </div>
      <div className="flex items-center">
        <MapPin size={18} className="mr-2" />
        <span>{CONTACT.area}</span>
      </div>
      <div className="mt-4 flex space-x-4">
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-brand-blue p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-brand-blue p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Facebook"
        >
          <Facebook size={20} />
        </a>
      </div>
    </div>
  );
};

export default FooterBrand;
