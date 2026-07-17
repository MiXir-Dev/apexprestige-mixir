import { Link, useLocation } from "react-router-dom";

import { SERVICE_AREAS } from "@/consts/service-areas";
import {
  getNewTabLinkProps,
  shouldOpenRouteInNewTab,
} from "@/lib/navigation-behavior";

const FooterServiceAreas = () => {
  const location = useLocation();

  return (
    <div>
      <h3
        className="
          mb-4 text-sm font-semibold
          uppercase tracking-[0.12em]
          text-white
        "
      >
        Secteurs desservis
      </h3>

      <ul
        className="
          grid grid-cols-2
          gap-x-6 gap-y-3
          text-sm
          sm:grid-cols-3
          lg:grid-cols-2
        "
      >
        {SERVICE_AREAS.map((area) => (
          <li key={area.name}>
            <Link
              to={area.path}
              {...getNewTabLinkProps(
                shouldOpenRouteInNewTab(
                  location.pathname,
                  area.path,
                ),
              )}
              className="
                inline-block text-white/60
                transition-colors duration-200
                hover:text-white
              "
            >
              {area.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterServiceAreas;