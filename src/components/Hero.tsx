
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { QUOTE_PATH } from "@/consts/paths";
import { DEFAULT_HOME_COPY } from "@/consts/service-area-content";
import {
  openPathInNewTab,
  shouldOpenQuoteInNewTab,
} from "@/lib/navigation-behavior";

interface HeroProps {
  title?: string;
  subtitle?: string;
  cityName?: string;
}

const Hero = ({ title, subtitle, cityName }: HeroProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const heroTitle = title ?? DEFAULT_HOME_COPY.heroTitle;
  const heroSubtitle = subtitle ?? DEFAULT_HOME_COPY.heroSubtitle;
  const quoteButtonLabel = cityName
    ? `Devis gratuit à ${cityName}`
    : "Obtenir un devis gratuit →";
  const servicesButtonLabel = cityName
    ? `Découvrir nos services à ${cityName}`
    : "Découvrir nos services";

  return (
    <section className="relative min-h-[80vh] bg-brand-blue text-white md:min-h-[95vh]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 md:hidden"
        style={{ backgroundImage: "url('/hero-phone.jpeg')" }}
      ></div>
      <div
        className="absolute inset-0 hidden bg-cover bg-center opacity-90 md:block"
        style={{ backgroundImage: "url('/hero.jpeg')" }}
      ></div>
      <div className="container relative mx-auto flex min-h-[80vh] items-center px-4 py-20 md:min-h-[95vh] md:py-32">
        <div className="max-w-3xl">
          <h1 className="
            text-4xl md:text-5xl
            font-bold mb-6 leading-tight
            break-words hyphens-auto text-balance
            max-w-[20ch] sm:max-w-none
          ">
            {heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            {subtitle ? (
              heroSubtitle
            ) : (
              <>
                Service complet pour résidences et commerces.{" "}
                <br className="hidden md:block" />
                Des vitres impeccables, garanties.
              </>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => {
                if (shouldOpenQuoteInNewTab(location.pathname)) return openPathInNewTab(QUOTE_PATH);
                navigate(QUOTE_PATH);
              }}
              aria-label={quoteButtonLabel}
              className="bg-white text-brand-blue hover:bg-gray-100 font-semibold text-lg py-6 px-8"
              size="lg"
            >
              {quoteButtonLabel}
            </Button>
            <Button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              aria-label={servicesButtonLabel}
              className="bg-transparent border-white text-white hover:bg-white/10 font-semibold text-lg py-6 px-8"
              size="lg"
            >
              {servicesButtonLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
