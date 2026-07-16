import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import { getServiceAreaBySlug } from "@/consts/service-areas";
import { getServiceAreaPageContent } from "@/consts/service-area-content";
import { SERVICE_AREA_SLUG_PREFIX } from "@/consts/paths";
import { useParams } from "react-router-dom";

const LocalizedHomePage = () => {
  const { localizedSlug } = useParams<{ localizedSlug: string }>();
  const normalizedPathSlug = localizedSlug?.toLowerCase() ?? "";

  if (!normalizedPathSlug.startsWith(SERVICE_AREA_SLUG_PREFIX)) return <NotFound />;

  const normalizedSlug = normalizedPathSlug.slice(SERVICE_AREA_SLUG_PREFIX.length);
  const serviceArea = getServiceAreaBySlug(normalizedSlug);

  if (!serviceArea) return <NotFound />;

  return <HomePage serviceArea={getServiceAreaPageContent(serviceArea.slug)} />;
};

export default LocalizedHomePage;
