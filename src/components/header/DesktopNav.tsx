import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/consts/navigation";
import { buildHomeSectionPath } from "@/consts/paths";

interface DesktopNavProps {
  onNavigate: (id: string) => void;
  onQuote: () => void;
}

const DesktopNav = ({ onNavigate, onQuote }: DesktopNavProps) => {
  return (
    <nav
      className="hidden items-center space-x-8 md:flex"
      aria-label="Navigation principale"
    >
      {NAV_LINKS.map((link) => (
        <a
          key={link.id}
          href={buildHomeSectionPath(link.id)}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(link.id);
          }}
          className="
            font-medium text-white/80
            transition-colors duration-200
            hover:text-white
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
            focus-visible:ring-offset-2
            focus-visible:ring-offset-brand-blue
          "
        >
          {link.label}
        </a>
      ))}

      <Button
        type="button"
        onClick={onQuote}
        className="
          bg-white text-brand-blue
          shadow-none
          transition-colors duration-200
          hover:bg-brand-light hover:text-brand-dark
          focus-visible:ring-white
          focus-visible:ring-offset-brand-blue
        "
      >
        Obtenir une soumission gratuite
      </Button>
    </nav>
  );
};

export default DesktopNav;