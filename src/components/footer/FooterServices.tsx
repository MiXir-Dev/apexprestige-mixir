import FooterLink from "@/components/Footlink";
import { FOOTER_SERVICES } from "@/consts/footer";

const FooterServices = () => {
  return (
    <div>
      <h3
        className="
          mb-4 text-sm font-semibold
          uppercase tracking-[0.12em]
          text-white
        "
      >
        Services
      </h3>

      <ul className="space-y-3 text-sm">
        {FOOTER_SERVICES.map((service) => (
          <li key={service}>
            <FooterLink
              id="services"
              className="
                inline-block text-white/60
                transition-all duration-200
                hover:translate-x-0.5
                hover:text-white
              "
            >
              {service}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterServices;