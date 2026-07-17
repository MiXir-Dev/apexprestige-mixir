import type {
  MouseEvent,
  ReactNode,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { buildHomeSectionPath } from "@/consts/paths";
import { isHomeVariantPath } from "@/lib/localize-service-area";

interface FooterLinkProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const FooterLink = ({
  id,
  children,
  className = "",
}: FooterLinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTarget = () => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    if (isHomeVariantPath(location.pathname)) {
      scrollToTarget();
      return;
    }

    navigate(buildHomeSectionPath(id));
    window.setTimeout(scrollToTarget, 100);
  };

  return (
    <a
      href={buildHomeSectionPath(id)}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};

export default FooterLink;