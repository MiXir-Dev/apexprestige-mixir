import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HOME_PATH, PRIVACY_PATH } from "@/consts/paths";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
import { CONTACT } from "@/consts/contact";

const Privacy = () => {
  const pageUrl = `${SITE_URL}${PRIVACY_PATH}`;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Helmet>
        <title>Politique de confidentialité | Mr. Clear</title>
        <meta
          name="description"
          content="Consultez la politique de confidentialité de Mr. Clear: collecte, utilisation, protection et gestion de vos données personnelles."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={pageUrl} />
        <meta
          property="og:title"
          content="Politique de confidentialité | Mr. Clear"
        />
        <meta
          property="og:description"
          content="Consultez la politique de confidentialité de Mr. Clear: collecte, utilisation, protection et gestion de vos données personnelles."
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
        <meta
          name="twitter:title"
          content="Politique de confidentialité | Mr. Clear"
        />
        <meta
          name="twitter:description"
          content="Consultez la politique de confidentialité de Mr. Clear: collecte, utilisation, protection et gestion de vos données personnelles."
        />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:image" content={DEFAULT_SOCIAL_IMAGE_URL} />
        <meta name="twitter:image:alt" content={DEFAULT_SOCIAL_IMAGE_ALT} />
      </Helmet>
      <Header />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-brand-blue">Politique de confidentialité</h1>

          <div className="space-y-6 text-gray-700">
            <p>Dernière mise à jour : 20 mai 2025</p>

            <div>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">Introduction</h2>
              <p>
                Chez Mr. Clear, nous respectons votre vie privée. Cette politique décrit les types d'informations que nous
                recueillons, comment nous les utilisons, et les choix dont vous disposez.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">Informations collectées</h2>
              <p className="mb-3">Nous pouvons collecter les informations suivantes :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Coordonnées :</span> nom, adresse, numéro de téléphone et adresse e-mail fournis via notre formulaire de soumission.
                </li>
                <li>
                  <span className="font-medium">Données d'utilisation :</span> données anonymes liées à la navigation sur notre site (pages visitées, temps passé, etc.).
                </li>
                <li>
                  <span className="font-medium">Communications :</span> toute correspondance échangée avec notre équipe.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">Utilisation des données</h2>
              <p>Les données collectées peuvent être utilisées pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Répondre à votre demande de devis ou de service</li>
                <li>Améliorer notre expérience client et nos services</li>
                <li>Vous contacter à propos d’une soumission ou d’un suivi</li>
                <li>Analyser l’utilisation de notre site web</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures raisonnables pour protéger vos données. Toutefois, aucune méthode de
                transmission sur Internet n’est totalement sécurisée.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">Vos droits</h2>
              <p>
                Vous pouvez nous contacter pour accéder, corriger ou supprimer vos données personnelles, ou pour poser toute
                question liée à cette politique.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">Contact</h2>
              <p>
                Pour toute question, veuillez écrire à :{" "}
                <a href={`mailto:${CONTACT.email}`} className="text-brand-blue underline">
                  {CONTACT.email}
                </a>
              </p>
            </div>

            <div className="pt-8">
              <Link
                to={HOME_PATH}
                className="text-brand-blue hover:text-brand-darkBlue transition-colors"
              >
                &larr; Retour à l’accueil
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
