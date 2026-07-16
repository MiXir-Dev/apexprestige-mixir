import { Facebook, Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "@/consts/contact";

const ContactSocial = () => {
  return (
    <div className="mt-8">
      <h4 className="font-medium mb-2">Suivez-nous</h4>
      <div className="mt-4 flex space-x-4">
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-brand-blue transition-colors duration-200"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6" />
        </a>
        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-brand-blue transition-colors duration-200"
          aria-label="Facebook"
        >
          <Facebook className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default ContactSocial;
