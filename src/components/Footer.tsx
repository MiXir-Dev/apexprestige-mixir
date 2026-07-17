import FooterBottom from "@/components/footer/FooterBottom";
import FooterBrand from "@/components/footer/FooterBrand";
import FooterQuickLinks from "@/components/footer/FooterQuickLinks";
import FooterServiceAreas from "@/components/footer/FooterServiceAreas";
import FooterServices from "@/components/footer/FooterServices";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div
          className="
            grid gap-10
            pb-10
            lg:grid-cols-[1.2fr_0.9fr_1.1fr]
            lg:gap-14
          "
        >
          <FooterBrand />

          <div className="grid grid-cols-2 gap-8">
            <FooterServices />
            <FooterQuickLinks />
          </div>

          <FooterServiceAreas />
        </div>

        <div className="pt-6">
          <FooterBottom currentYear={currentYear} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;