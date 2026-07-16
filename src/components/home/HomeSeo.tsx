import { Helmet } from "react-helmet";
import { ServiceAreaPageContent } from "@/consts/service-area-content";
import { getHomeSeo } from "@/components/home/getHomeSeo";
import {
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_HEIGHT,
  DEFAULT_SOCIAL_IMAGE_TYPE,
  DEFAULT_SOCIAL_IMAGE_URL,
  DEFAULT_SOCIAL_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
} from "@/consts/seo";

interface HomeSeoProps {
  serviceArea?: ServiceAreaPageContent;
}

const HomeSeo = ({ serviceArea }: HomeSeoProps) => {
  const seo = getHomeSeo(serviceArea);

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.ogUrl} />
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
      <meta name="twitter:title" content={seo.ogTitle} />
      <meta name="twitter:description" content={seo.ogDescription} />
      <meta name="twitter:url" content={seo.ogUrl} />
      <meta name="twitter:image" content={DEFAULT_SOCIAL_IMAGE_URL} />
      <meta name="twitter:image:alt" content={DEFAULT_SOCIAL_IMAGE_ALT} />
      <meta name="robots" content={seo.robots} />
      <meta name="geo.region" content={seo.geoRegion} />
      <meta name="geo.placename" content={seo.geoPlacename} />
      <link rel="canonical" href={seo.canonicalUrl} />
      <script type="application/ld+json">
        {JSON.stringify(seo.structuredData)}
      </script>
    </Helmet>
  );
};

export default HomeSeo;
