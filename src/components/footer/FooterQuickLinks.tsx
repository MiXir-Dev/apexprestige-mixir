import FooterLink from "@/components/Footlink";
import { FOOTER_QUICK_LINKS } from "@/consts/footer";
import { QUOTE_PATH } from "@/consts/paths";
import { Link, useLocation } from "react-router-dom";
import {
  getNewTabLinkProps,
  shouldOpenQuoteInNewTab,
} from "@/lib/navigation-behavior";

const FooterQuickLinks = () => {
  const location = useLocation();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
        Liens Rapides
      </h3>
      <ul className="space-y-2">
        {FOOTER_QUICK_LINKS.map((link) => (
          <li key={link.label}>
            {link.type === "route" ? (
              <Link
                to={link.to}
                {...getNewTabLinkProps(
                  link.to === QUOTE_PATH && shouldOpenQuoteInNewTab(location.pathname)
                )}
                className="opacity-75 hover:opacity-100 transition-opacity hover:translate-x-1 inline-block"
              >
                {link.label}
              </Link>
            ) : (
              <FooterLink id={link.id}>{link.label}</FooterLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterQuickLinks;
