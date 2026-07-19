import { HOME_PATH } from "@/consts/paths";

type LogoProps = {
  isSticky: boolean;
};

const Logo = ({ isSticky }: LogoProps) => {
  return (
    <div className="flex items-center">
      <a href={HOME_PATH} className="group flex items-center">
        <div
          className={`overflow-hidden transition-all duration-300 flex items-center justify-center
          ${
            isSticky
              ? "h-12 w-12 md:h-20 md:w-20"
              : "h-14 w-14 md:h-20 md:w-20"
          }`}
        >
          <img
            src="/logo-header.webp"
            alt="Logo d’Apex Prestige Services Extérieurs"
            className="object-contain h-full w-full"
            width="80"
            height="80"
            decoding="async"
          />
        </div>
      </a>
    </div>
  );
};

export default Logo;
