import { Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { BUSINESS } from "@/consts/business";
import { CONTACT, SOCIAL_LINKS } from "@/consts/contact";
import { NAV_LINKS } from "@/consts/navigation";
import { buildHomeSectionPath } from "@/consts/paths";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (id: string) => void;
  onQuote: () => void;
}

interface FacebookIconProps {
  className?: string;
}

const FacebookIcon = ({ className }: FacebookIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.973h-1.513c-1.49 0-1.956.931-1.956 1.887v2.26h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
};

const MobileMenu = ({
  isOpen,
  onOpenChange,
  onNavigate,
  onQuote,
}: MobileMenuProps) => {
  return (
    <div className="flex items-center md:hidden">
      {/* Phone */}
      <a
        href={`tel:${CONTACT.phone}`}
        className="
          mr-1 rounded-full p-2
          text-white/80
          transition-colors duration-200
          hover:bg-white/10 hover:text-white
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
        "
        aria-label={`Appeler le ${CONTACT.phoneDisplay}`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>

      {/* Facebook */}
      {SOCIAL_LINKS.facebook && (
        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mr-1 rounded-full p-2
            text-white/80
            transition-colors duration-200
            hover:bg-white/10 hover:text-white
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
          "
          aria-label={`Visiter la page Facebook de ${BUSINESS.displayName}`}
        >
          <FacebookIcon className="h-5 w-5" />
        </a>
      )}

      {/* Mobile menu */}
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="
              text-white
              hover:bg-white/10 hover:text-white
              focus-visible:ring-white
              focus-visible:ring-offset-brand-blue
            "
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Ouvrir le menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="
            w-full border-r border-white/10
            bg-brand-blue p-0 text-white
            transition-transform duration-300 ease-in-out
            [&>button]:text-white/70
            [&>button]:transition-colors
            [&>button:hover]:bg-white/10
            [&>button:hover]:text-white
            sm:max-w-sm
          "
        >
          {/* Header */}
          <SheetHeader className="border-b border-white/10 px-6 py-5">
            <SheetTitle className="text-left">
              <span className="text-xl font-bold text-white">
                {BUSINESS.displayName}
              </span>
            </SheetTitle>
          </SheetHeader>

          {/* Navigation */}
          <nav
            className="flex flex-col py-6"
            aria-label="Navigation mobile"
          >
            {NAV_LINKS.map((link) => (
              <SheetClose key={link.id} asChild>
                <a
                  href={buildHomeSectionPath(link.id)}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(link.id);
                  }}
                  className="
                    border-l-2 border-transparent
                    px-6 py-4
                    text-lg font-medium text-white/80
                    transition-colors duration-200
                    hover:border-white hover:bg-white/5 hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-white
                  "
                >
                  {link.label}
                </a>
              </SheetClose>
            ))}

            {/* CTA */}
            <div className="px-6 pt-5">
              <SheetClose asChild>
                <Button
                  type="button"
                  onClick={onQuote}
                  className="
                    w-full bg-white text-brand-blue
                    shadow-none
                    transition-colors duration-200
                    hover:bg-brand-light hover:text-brand-dark
                    focus-visible:ring-white
                    focus-visible:ring-offset-brand-blue
                  "
                >
                  Obtenir une soumission gratuite
                </Button>
              </SheetClose>
            </div>

            {/* Contact details */}
            <div className="mt-8 border-t border-white/10 px-6 pt-6">
              <a
                href={`tel:${CONTACT.phone}`}
                className="
                  flex items-center gap-3 py-2
                  text-sm text-white/70
                  transition-colors
                  hover:text-white
                "
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>

              {SOCIAL_LINKS.facebook && (
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-3 py-2
                    text-sm text-white/70
                    transition-colors
                    hover:text-white
                  "
                >
                  <FacebookIcon className="h-4 w-4" />
                  <span>Apex Prestige</span>
                </a>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
