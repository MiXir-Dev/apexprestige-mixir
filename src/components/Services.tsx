import ServiceCard from "@/components/services/ServiceCard";
import { SERVICES } from "@/consts/services";
import { DEFAULT_HOME_COPY } from "@/consts/service-area-content";

interface ServicesProps {
  introParagraph?: string;
}

const Services = ({
  introParagraph = DEFAULT_HOME_COPY.serviceIntro,
}: ServicesProps) => {
  return (
    <section id="services" className="bg-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="font-medium text-white/65">Nos services</span>
          <h2 className="mt-2 mb-4 text-3xl font-bold text-white md:text-4xl">
            Des services extérieurs regroupés au même endroit
          </h2>
          <p className="mx-auto max-w-2xl text-white/65">
            {introParagraph}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
