import { SERVICE_AREAS } from "@/consts/service-areas";
import { splitServiceAreas } from "@/consts/footer";
import { Link, useLocation } from "react-router-dom";
import {
  getNewTabLinkProps,
  shouldOpenRouteInNewTab,
} from "@/lib/navigation-behavior";

const FooterServiceAreas = () => {
  const [leftColumn, rightColumn] = splitServiceAreas(SERVICE_AREAS);
  const location = useLocation();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
        Secteurs desservis
      </h3>
      <div className="grid grid-cols-2">
        <ul className="space-y-2">
          {leftColumn.map((area) => (
            <li key={area.name}>
              <Link
                to={area.path}
                {...getNewTabLinkProps(
                  shouldOpenRouteInNewTab(location.pathname, area.path)
                )}
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {rightColumn.map((area) => (
            <li key={area.name}>
              <Link
                to={area.path}
                {...getNewTabLinkProps(
                  shouldOpenRouteInNewTab(location.pathname, area.path)
                )}
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterServiceAreas;
