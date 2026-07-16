import { Mail, Phone, Clock } from "lucide-react";
import { CONTACT } from "@/consts/contact";

const ContactDetails = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
          <Phone className="h-5 w-5 text-brand-blue group-hover:animate-ping" />
        </div>
        <div>
          <p className="font-medium">Téléphone</p>
          <a
            href={`tel:${CONTACT.phone}`}
            aria-label={`Appeler le ${CONTACT.phoneDisplay}`}
            className="text-gray-600 hover:text-brand-blue"
          >
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="flex items-start">
        <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
          <Mail className="h-5 w-5 text-brand-blue" />
        </div>
        <div>
          <p className="font-medium">Courriel</p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-gray-600 hover:text-brand-blue break-all"
          >
            {CONTACT.email}
          </a>
        </div>
      </div>

      <div className="flex items-start">
        <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
          <Clock className="h-5 w-5 text-brand-blue" />
        </div>
        <div>
          <p className="font-medium">Heures d'ouverture</p>
          <p className="text-gray-600">{CONTACT.hours}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
