import { Link, useLocation } from "react-router-dom";

import FooterLink from "@/components/Footlink";
import { FOOTER_QUICK_LINKS } from "@/consts/footer";
import { QUOTE_PATH } from "@/consts/paths";
import {
  getNewTabLinkProps,
  shouldOpenQuoteInNewTab,
} from "@/lib/navigation-behavior";

const linkClassName = `
  inline-block text-white/60
  transition-all duration-200
  hover:translate-x-0.5
  hover:text-white
`;

const FooterQuickLinks = () => {
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
        Navigation
      </h3>

      <ul className="space-y-3 text-sm">
        {FOOTER_QUICK_LINKS.map((link) => (
          <li key={link.label}>
            {link.type === "route" ? (
              <Link
                to={link.to}
                {...getNewTabLinkProps(
                  link.to === QUOTE_PATH &&
                    shouldOpenQuoteInNewTab(location.pathname),
                )}
                className={linkClassName}
              >
                {link.label}
              </Link>
            ) : (
              <FooterLink
                id={link.id}
                className={linkClassName}
              >
                {link.label}
              </FooterLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterQuickLinks;