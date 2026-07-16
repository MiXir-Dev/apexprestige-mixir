
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { QUOTE_PATH } from "@/consts/paths";
import { DEFAULT_HOME_COPY } from "@/consts/service-area-content";
import {
  openPathInNewTab,
  shouldOpenQuoteInNewTab,
} from "@/lib/navigation-behavior";

interface AboutProps {
  introParagraph?: string;
  cityName?: string;
}

const About = ({
  introParagraph = DEFAULT_HOME_COPY.aboutParagraph,
  cityName,
}: AboutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageAlt = cityName
    ? `Équipe professionnelle de nettoyage de vitres à ${cityName}`
    : "Équipe professionnelle de nettoyage de vitres";
  const quoteButtonLabel = cityName
    ? `Obtenir une soumission à ${cityName}`
    : "Obtenir une soumission";
  const contactButtonLabel = cityName
    ? `Nous contacter à ${cityName}`
    : "Nous contacter";

  const handleQuoteClick = () => {
    if (shouldOpenQuoteInNewTab(location.pathname)) return openPathInNewTab(QUOTE_PATH);
    navigate(QUOTE_PATH);
  };

  const handleContactClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pourquoi-nous" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
            <div className="relative">
              <img 
                src="/about.png" 
                alt={imageAlt}
                className="rounded-lg shadow-lg w-full object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-blue text-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="text-3xl font-bold">10+</p>
                <p className="text-sm mt-1">années d'expérience dans le nettoyage professionnel</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 lg:pl-12">
            <span className="text-brand-blue font-medium">Pourquoi Nous Choisir</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">L'excellence en matière de nettoyage de vitres</h2>
            <p className="text-gray-700 mb-6 text-lg">
              {introParagraph}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-brand-light p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Expertises spécifiques</h3>
                  <p className="text-gray-600">Notre équipe est spécialisée dans le traitement des fenêtres difficiles d'accès et des bâtiments de grande hauteur.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-light p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Matériel professionnel</h3>
                  <p className="text-gray-600">Nous utilisons exclusivement des équipements et produits professionnels respectueux de l'environnement.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-light p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Service de confiance</h3>
                  <p className="text-gray-600">Des centaines de clients satisfaits nous font confiance année après année pour l'entretien de leurs bâtiments.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleQuoteClick}
                aria-label={quoteButtonLabel}
                className="cta-button"
                size="lg"
              >
                {quoteButtonLabel}
              </Button>
              <Button 
                onClick={handleContactClick}
                variant="outline" 
                aria-label={contactButtonLabel}
                className="border-brand-blue text-brand-blue hover:bg-brand-light"
                size="lg"
              >
                {contactButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
