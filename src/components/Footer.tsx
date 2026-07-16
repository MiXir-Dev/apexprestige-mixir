import FooterBottom from "@/components/footer/FooterBottom";
import FooterBrand from "@/components/footer/FooterBrand";
import FooterQuickLinks from "@/components/footer/FooterQuickLinks";
import FooterServiceAreas from "@/components/footer/FooterServiceAreas";
import FooterServices from "@/components/footer/FooterServices";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterBrand />
          <FooterServices />
          <FooterQuickLinks />
          <FooterServiceAreas />
        </div>
        <FooterBottom currentYear={currentYear} />
      </div>
    </footer>
  );
};

export default Footer;
