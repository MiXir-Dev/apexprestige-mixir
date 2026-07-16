import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { CONTACT } from "@/consts/contact";
import { NAV_LINKS } from "@/consts/navigation";
import { buildHomeSectionPath } from "@/consts/paths";
import { Mail, Menu, Phone } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (id: string) => void;
  onQuote: () => void;
}

const MobileMenu = ({
  isOpen,
  onOpenChange,
  onNavigate,
  onQuote,
}: MobileMenuProps) => {
  return (
    <div className="md:hidden flex items-center">
      {/* Phone */}
      <a
        href={`tel:${CONTACT.phone}`}
        className="mr-3 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
      >
        <Phone size={20} />
      </a>

      {/* Email */}
      <a
        href={`mailto:${CONTACT.email}`}
        className="mr-3 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
      >
        <Mail size={20} />
      </a>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Menu className="w-6 h-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-full p-0 transition-transform duration-300 ease-in-out"
        >
          {/* Header */}
          <SheetHeader className="p-4 border-b border-gray-100">
            <SheetTitle>
              <a href="#" className="flex items-center justify-center">
                <span className="text-brand-blue font-bold text-xl">
                  Mr. Clear
                </span>
              </a>
            </SheetTitle>
          </SheetHeader>

          {/* Navigation */}
          <nav className="flex flex-col py-6">
            {NAV_LINKS.map((link) => (
              <SheetClose key={link.id} asChild>
                <a
                  href={buildHomeSectionPath(link.id)}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(link.id);
                  }}
                  className="text-gray-700 hover:text-brand-blue font-medium px-6 py-4 text-lg"
                >
                  {link.label}
                </a>
              </SheetClose>
            ))}

            {/* CTA */}
            <div className="px-6 pt-4">
              <SheetClose asChild>
                <Button onClick={onQuote} className="cta-button w-full">
                  Obtenir un devis
                </Button>
              </SheetClose>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;