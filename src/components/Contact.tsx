import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";
import { DEFAULT_HOME_COPY } from "@/consts/service-area-content";

interface ContactProps {
  supportingCopy?: string;
  cityName?: string;
}

const Contact = ({
  supportingCopy = DEFAULT_HOME_COPY.contactSupportingCopy,
  cityName,
}: ContactProps) => {
  const heading = cityName
    ? `Contactez notre équipe à ${cityName}`
    : "Contactez notre équipe";

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-medium">Nous Joindre</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {supportingCopy}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ContactInfo />
          <ContactMap />
        </div>
      </div>
    </section>
  );
};

export default Contact;
