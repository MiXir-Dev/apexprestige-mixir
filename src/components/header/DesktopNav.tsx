import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/consts/navigation";
import { buildHomeSectionPath } from "@/consts/paths";

interface DesktopNavProps {
  onNavigate: (id: string) => void;
  onQuote: () => void;
}

const DesktopNav = ({ onNavigate, onQuote }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {NAV_LINKS.map((link) => ( 
        <a
          key={link.id}
          href={buildHomeSectionPath(link.id)}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(link.id);
          }}
          className="text-white hover:text-brand-blue font-medium"
        >
          {link.label}
        </a>
      ))}
      <Button onClick={onQuote} className="cta-button">
        Obtenir un devis
      </Button>
    </nav>
  );
};

export default DesktopNav;
