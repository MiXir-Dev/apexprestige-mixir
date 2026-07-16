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
              ? "h-[4rem] w-[4rem] md:h-20 md:w-20"
              : "h-[5rem] w-[5rem] md:h-20 md:w-20"
          }`}
        >
          <img
            src="/logo.png"
            alt="Logo Mr. Clear"
            className="object-contain h-full w-full"
          />
        </div>
      </a>
    </div>
  );
};

export default Logo;
