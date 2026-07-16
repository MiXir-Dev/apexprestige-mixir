import FooterLink from "@/components/Footlink";
import { FOOTER_SERVICES } from "@/consts/footer";

const FooterServices = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
        Nos Services
      </h3>
      <ul className="space-y-2">
        {FOOTER_SERVICES.map((service) => (
          <li key={service}>
            <FooterLink id="services">{service}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterServices;
