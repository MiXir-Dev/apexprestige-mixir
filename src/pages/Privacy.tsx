import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BUSINESS } from '@/consts/business';
import { HOME_PATH, PRIVACY_PATH } from '@/consts/paths';
import {
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_HEIGHT,
  DEFAULT_SOCIAL_IMAGE_TYPE,
  DEFAULT_SOCIAL_IMAGE_URL,
  DEFAULT_SOCIAL_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from '@/consts/seo';

const SEO_DESCRIPTION =
  'Consultez la politique de confidentialité d’Apex Prestige Services Extérieurs concernant les renseignements transmis sur ce site.';

const Privacy = () => {
  const pageUrl = `${SITE_URL}${PRIVACY_PATH}`;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Helmet>
        <title>Politique de confidentialité | Apex Prestige</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={pageUrl} />
        <meta
          property="og:title"
          content="Politique de confidentialité | Apex Prestige"
        />
        <meta property="og:description" content={SEO_DESCRIPTION} />
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
        <meta property="og:image:height" content={DEFAULT_SOCIAL_IMAGE_HEIGHT} />
        <meta property="og:image:alt" content={DEFAULT_SOCIAL_IMAGE_ALT} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Politique de confidentialité | Apex Prestige"
        />
        <meta name="twitter:description" content={SEO_DESCRIPTION} />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:image" content={DEFAULT_SOCIAL_IMAGE_URL} />
        <meta name="twitter:image:alt" content={DEFAULT_SOCIAL_IMAGE_ALT} />
      </Helmet>
      <Header />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-brand-blue">
            Politique de confidentialité
          </h1>

          <div className="space-y-6 text-gray-700">
            <p>Dernière mise à jour : 16 juillet 2026</p>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Introduction
              </h2>
              <p>
                Apex Prestige Services Extérieurs respecte la vie privée des
                personnes qui visitent son site ou lui transmettent une demande. La
                présente politique explique quels renseignements peuvent être
                recueillis, pourquoi ils sont utilisés et comment communiquer avec
                nous à leur sujet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Responsable de la protection des renseignements personnels
              </h2>
              <p>
                Le responsable de la protection des renseignements personnels pour
                Apex Prestige Services Extérieurs est Jérémie. Il est possible de
                communiquer avec lui à l’adresse
                {' '}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-brand-blue underline"
                >
                  {BUSINESS.email}
                </a>
                {' '}ou au{' '}
                <a href={`tel:${BUSINESS.phone}`} className="text-brand-blue underline">
                  {BUSINESS.phoneDisplay}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Renseignements recueillis
              </h2>
              <p>
                Lorsque vous remplissez le formulaire de soumission, nous pouvons
                recueillir votre prénom, votre nom, votre numéro de téléphone, votre
                adresse courriel, l’adresse des travaux, la municipalité, le type de
                propriété, les services souhaités et les précisions que vous
                choisissez de fournir.
              </p>
              <p className="mt-3">
                Notre fournisseur d’hébergement peut également traiter certaines
                données techniques nécessaires au fonctionnement et à la sécurité du
                site, notamment l’adresse IP, le type de navigateur, les journaux
                techniques et l’heure de la requête.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Utilisation des renseignements
              </h2>
              <p>
                Les renseignements recueillis servent à répondre à votre demande,
                préparer ou préciser une soumission, communiquer avec vous, planifier
                les services demandés, assurer le fonctionnement du site et prévenir
                les usages abusifs.
              </p>
              <p className="mt-3">
                Nous ne vendons ni ne louons vos renseignements personnels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Fournisseurs de services
              </h2>
              <p>
                Le site est hébergé sur Netlify et utilise une fonction Netlify pour
                transmettre les demandes de soumission à Telegram. La recherche
                facultative d’adresse utilise Photon et des données OpenStreetMap;
                le texte saisi dans le champ d’adresse peut être transmis à ce
                fournisseur afin de retourner des suggestions. Ces fournisseurs
                peuvent traiter des renseignements pour fournir leurs services
                techniques. Un lien vers Facebook est également offert; toute
                interaction effectuée sur Facebook est assujettie aux pratiques de
                confidentialité de Meta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Témoins et mesure d’audience
              </h2>
              <p>
                Aucun outil d’analyse ou de publicité non essentiel n’est activé sur
                le site au moment de la présente mise à jour. Le site peut utiliser
                des mécanismes strictement nécessaires à son fonctionnement, à sa
                sécurité et au traitement du formulaire. Si un outil de suivi est
                ajouté ultérieurement, la présente politique et les mécanismes de
                consentement devront être mis à jour avant son activation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Conservation et sécurité
              </h2>
              <p>
                Les renseignements sont conservés uniquement pendant la période
                nécessaire au traitement de la demande, à la prestation des services
                et au respect des obligations applicables. Des mesures raisonnables
                sont utilisées pour limiter l’accès non autorisé, la perte ou
                l’utilisation inappropriée des renseignements. Aucune transmission
                par Internet ne peut toutefois être garantie comme entièrement
                sécurisée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Vos droits
              </h2>
              <p>
                Vous pouvez communiquer avec Apex Prestige pour demander l’accès à
                vos renseignements personnels, leur rectification ou, lorsque la loi
                le permet, leur suppression ou leur portabilité. Vous pouvez également
                retirer un consentement applicable, sous réserve des obligations
                légales ou contractuelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Modifications
              </h2>
              <p>
                La présente politique peut être mise à jour afin de refléter un
                changement dans les pratiques du site ou dans les services utilisés.
                La date de la plus récente mise à jour est indiquée au début de la
                page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-4">
                Contact
              </h2>
              <p>
                Pour toute question ou demande concernant vos renseignements
                personnels, écrivez à{' '}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-brand-blue underline"
                >
                  {BUSINESS.email}
                </a>
                {' '}ou appelez au{' '}
                <a href={`tel:${BUSINESS.phone}`} className="text-brand-blue underline">
                  {BUSINESS.phoneDisplay}
                </a>
                .
              </p>
            </section>

            <div className="pt-8">
              <Link
                to={HOME_PATH}
                className="text-brand-blue hover:text-black transition-colors"
              >
                ← Retour à l’accueil
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
