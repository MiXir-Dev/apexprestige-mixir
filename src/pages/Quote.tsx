// src/pages/Quote.tsx
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import StickyCTA from "@/components/StickyCTA";
import { QUOTE_PATH } from "@/consts/paths";
import {
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_HEIGHT,
  DEFAULT_SOCIAL_IMAGE_TYPE,
  DEFAULT_SOCIAL_IMAGE_URL,
  DEFAULT_SOCIAL_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/consts/seo";

const QuotePage = () => {
  const pageUrl = `${SITE_URL}${QUOTE_PATH}`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>Obtenir un devis | Mr. Clear - Lavage de vitres résidentiel et commercial</title>
        <meta
          name="description"
          content="Remplissez notre formulaire de soumission pour obtenir un devis personnalisé en 24h. Service rapide et professionnel pour vitres et gouttières."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Soumission - Mr. Clear" />
        <meta
          property="og:description"
          content="Formulaire pour obtenir un devis personnalisé pour le nettoyage de vitres ou de gouttières. Réponse rapide et professionnelle."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content={SITE_LOCALE} />
        <meta property="og:image" content={DEFAULT_SOCIAL_IMAGE_URL} />
        <meta
          property="og:image:secure_url"
          content={DEFAULT_SOCIAL_IMAGE_URL}
        />
        <meta property="og:image:type" content={DEFAULT_SOCIAL_IMAGE_TYPE} />
        <meta property="og:image:width" content={DEFAULT_SOCIAL_IMAGE_WIDTH} />
        <meta
          property="og:image:height"
          content={DEFAULT_SOCIAL_IMAGE_HEIGHT}
        />
        <meta property="og:image:alt" content={DEFAULT_SOCIAL_IMAGE_ALT} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Soumission Lavage de Vitres - Mr. Clear" />
        <meta
          name="twitter:description"
          content="Formulaire pour obtenir un devis personnalisé pour le nettoyage de vitres ou de gouttières. Réponse rapide et professionnelle."
        />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:image" content={DEFAULT_SOCIAL_IMAGE_URL} />
        <meta name="twitter:image:alt" content={DEFAULT_SOCIAL_IMAGE_ALT} />
      </Helmet>
      <Header />
      <main>
        <QuoteForm />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default QuotePage;
