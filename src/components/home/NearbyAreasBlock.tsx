import { Link } from "react-router-dom";
import { SERVICE_AREAS, ServiceAreaSlug } from "@/consts/service-areas";
import { buildServiceAreaPath } from "@/consts/paths";

interface NearbyAreasBlockProps {
  title?: string;
  intro?: string;
  areas?: string[];
  currentSlug?: ServiceAreaSlug;
}

const normalizeAreaName = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();

const AREA_PATH_BY_NAME = SERVICE_AREAS.reduce<Record<string, string>>(
  (acc, area) => {
    acc[normalizeAreaName(area.name)] = area.path;
    return acc;
  },
  {}
);

const NearbyAreasBlock = ({
  title,
  intro,
  areas,
  currentSlug,
}: NearbyAreasBlockProps) => {
  if (!title || !areas?.length) {
    return null;
  }

  return (
    <section className="py-14 bg-brand-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto rounded-xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
          <p className="text-brand-blue text-sm font-semibold uppercase tracking-wide mb-2">
            Secteurs à proximité
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          {intro ? <p className="text-gray-600 mb-5">{intro}</p> : null}

          <ul
            className="flex flex-wrap justify-center gap-3"
            aria-label={title}
          >
            {areas.map((area) => {
              const path = AREA_PATH_BY_NAME[normalizeAreaName(area)];
              const isSelfArea = Boolean(
                currentSlug && path === buildServiceAreaPath(currentSlug)
              );

              return (
                <li key={area} className="flex">
                  {path && !isSelfArea ? (
                    <Link
                      to={path}
                      className="inline-flex items-center justify-center rounded-full bg-brand-light px-4 py-2 text-sm font-medium text-brand-blue text-center hover:bg-brand-blue hover:text-white transition-colors"
                    >
                      {area}
                    </Link>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 text-center">
                      {area}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NearbyAreasBlock;
