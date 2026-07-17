import { Link } from 'react-router-dom';
import { BUSINESS } from '@/consts/business';
import { PRIVACY_PATH } from '@/consts/paths';

interface FooterBottomProps {
  currentYear: number;
}

const FooterBottom = ({ currentYear }: FooterBottomProps) => (
  <div className="border-t border-white/20 pt-8 text-center md:flex md:justify-between md:text-left">
    <p className="opacity-75 text-sm">
      © {currentYear} {BUSINESS.fullName}. Tous droits réservés.{' '}
      <a href={BUSINESS.siteUrl} className="hover:underline">
        apexprestige.ca
      </a>
    </p>
    <div className="mt-4 md:mt-0">
      <Link
        to={PRIVACY_PATH}
        className="opacity-75 hover:opacity-100 transition-opacity text-sm"
      >
        Politique de confidentialité
      </Link>
    </div>
  </div>
);

export default FooterBottom;
