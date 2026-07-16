import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DesktopNav from "@/components/header/DesktopNav";
import Logo from "@/components/header/Logo";
import MobileMenu from "@/components/header/MobileMenu";
import { QUOTE_PATH, buildHomeSectionPath } from "@/consts/paths";
import { isHomeVariantPath } from "@/lib/localize-service-area";
import {
  openPathInNewTab,
  shouldOpenQuoteInNewTab,
} from "@/lib/navigation-behavior";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true);
      }

      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const handleNavigation = (id: string) => {
    setIsOpen(false);

    const scrollToId = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (!isHomeVariantPath(location.pathname)) {
      navigate(buildHomeSectionPath(id));
      setTimeout(scrollToId, 100);
    } else {
      scrollToId();
    }
  };

  const handleQuote = () => {
    if (shouldOpenQuoteInNewTab(location.pathname)) return openPathInNewTab(QUOTE_PATH);
    navigate(QUOTE_PATH);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg backdrop-saturate-150 sticky-header-transition
      ${
        isSticky
          ? "bg-brand-blue/60 shadow-md py-4"
          : "bg-[#66a8d3] py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Logo isSticky={isSticky} />
        <DesktopNav onNavigate={handleNavigation} onQuote={handleQuote} />
        <MobileMenu
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onNavigate={handleNavigation}
          onQuote={handleQuote}
        />
      </div>
    </header>
  );
};

export default Header;
