import { useLocation, useNavigate } from "react-router-dom";
import { buildHomeSectionPath } from "@/consts/paths";
import { isHomeVariantPath } from "@/lib/localize-service-area";

interface FooterLinkProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const FooterLink = ({ id, children, className = "" }: FooterLinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (isHomeVariantPath(location.pathname)) return scrollToTarget();
    navigate(buildHomeSectionPath(id));
    setTimeout(scrollToTarget, 100); 
  };

  return (
    <a href={buildHomeSectionPath(id)} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default FooterLink;
