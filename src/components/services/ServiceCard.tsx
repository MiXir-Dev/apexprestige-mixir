import { ServiceItem } from "@/consts/services";
import { useCompareSlider } from "@/components/services/useCompareSlider";

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { containerRef, sliderValue, isDragging, handleMouseDown, handleTouchStart } =
    useCompareSlider();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div
        ref={containerRef}
        className="relative h-64 overflow-hidden cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 z-10"></div>

        <img
          src={service.afterImage}
          alt={`${service.title} - résultat final`}
          className="w-full h-full object-cover absolute inset-0"
          loading="lazy"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        >
          <img
            src={service.beforeImage}
            alt={`${service.title} - avant service`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-y-0 z-20 touch-none" style={{ left: `${sliderValue}%` }}>
          <div className="absolute inset-y-0 w-[2px] bg-white/80 backdrop-blur-sm"></div>
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white/40 backdrop-blur-md border border-white/60 rounded-full shadow-lg flex items-center justify-center cursor-grab transition-all duration-300 ${
              isDragging ? "scale-110 shadow-xl" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-brand-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16l-4-4m0 0l4-4m-4 4h16m-4 4l4-4m0 0l-4-4"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-between text-xs text-white absolute bottom-4 inset-x-0 px-4 z-20 font-medium">
          <span>Avant</span>
          <span>Après</span>
        </div>

        <h3 className="absolute top-4 left-4 text-white text-xl font-semibold z-20 shadow-text">
          {service.title}
        </h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
