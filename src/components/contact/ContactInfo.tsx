import ContactAreas from "@/components/contact/ContactAreas";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactSocial from "@/components/contact/ContactSocial";

const ContactInfo = () => {
  return (
    <div className="lg:col-span-1 bg-brand-light rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-6">Informations de contact</h3>
      <div className="space-y-6">
        <ContactDetails />
        <ContactAreas />
      </div>
      <ContactSocial />
    </div>
  );
};

export default ContactInfo;
