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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (id: string) => {
    setIsOpen(false);

    const scrollToId = () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    if (!isHomeVariantPath(location.pathname)) {
      navigate(buildHomeSectionPath(id));
      setTimeout(scrollToId, 100);
      return;
    }

    scrollToId();
  };

  const handleQuote = () => {
    if (shouldOpenQuoteInNewTab(location.pathname)) {
      openPathInNewTab(QUOTE_PATH);
      return;
    }

    navigate(QUOTE_PATH);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        border-b border-white/10
        text-white
        backdrop-blur-xl backdrop-saturate-150
        transition-all duration-300 ease-in-out
        ${
          isSticky
            ? "bg-brand-blue/90 py-4 shadow-lg shadow-black/20"
            : "bg-brand-blue py-5"
        }
      `}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="shrink-0 brightness-0 invert">
          <Logo isSticky={isSticky} />
        </div>

        <DesktopNav
          onNavigate={handleNavigation}
          onQuote={handleQuote}
        />

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