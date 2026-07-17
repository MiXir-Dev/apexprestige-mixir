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
        <title>Soumission gratuite | Apex Prestige Services Extérieurs</title>
        <meta
          name="description"
          content="Demandez une soumission pour des services extérieurs résidentiels ou commerciaux à Sherbrooke, Magog, Orford, Bromont et dans les municipalités environnantes."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Demandez une soumission | Apex Prestige" />
        <meta
          property="og:description"
          content="Présentez les travaux souhaités et demandez une soumission à Apex Prestige Services Extérieurs."
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
        <meta name="twitter:title" content="Demandez une soumission | Apex Prestige" />
        <meta
          name="twitter:description"
          content="Présentez les travaux souhaités et demandez une soumission à Apex Prestige Services Extérieurs."
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
