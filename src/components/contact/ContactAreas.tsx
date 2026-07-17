import { MapPin } from 'lucide-react';
import { CONTACT } from '@/consts/contact';

const ContactAreas = () => (
  <div className="flex items-start">
    <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
      <MapPin className="h-5 w-5 text-brand-blue" />
    </div>
    <div>
      <p className="font-medium">Zones desservies</p>
      <p className="text-gray-600">{CONTACT.area}</p>
    </div>
  </div>
);

export default ContactAreas;
