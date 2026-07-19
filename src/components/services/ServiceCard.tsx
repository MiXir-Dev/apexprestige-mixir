import { ServiceItem } from "@/consts/services";
import { useCompareSlider } from "@/components/services/useCompareSlider";

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { containerRef, sliderValue, isDragging, handleMouseDown, handleTouchStart } =
    useCompareSlider();

  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-brand-blue shadow-[0_12px_35px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)]">
      <div
        ref={containerRef}
        className={`relative h-64 cursor-grab select-none overflow-hidden ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/5 to-black/40"></div>

        <img
          src={service.afterImage}
          alt={`Après : ${service.title}`}
          className="w-full h-full object-cover absolute inset-0"
          loading="lazy"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        >
          <img
            src={service.beforeImage}
            alt={`Avant : ${service.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div
          className="absolute inset-y-0 z-20 touch-none"
          style={{ left: `${sliderValue}%` }}
        >
          <div className="absolute inset-y-0 w-px bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.45)]"></div>
          <div
            className={`absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border border-white/25 bg-brand-blue/95 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 group-hover:border-white/50 ${
              isDragging ? 'scale-110 cursor-grabbing border-white/70 shadow-xl' : ''
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
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

        <div className="absolute inset-x-0 bottom-4 z-20 flex justify-between px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
          <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1.5 backdrop-blur-sm">
            Avant
          </span>
          <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1.5 backdrop-blur-sm">
            Après
          </span>
        </div>

        <h3 className="shadow-text absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/55 px-3.5 py-2 text-base font-semibold text-white backdrop-blur-sm">
          {service.title}
        </h3>
      </div>
      <div className="border-t border-white/10 p-6">
        <p className="leading-relaxed text-white/70">{service.description}</p>
      </div>
    </article>
  );
};

export default ServiceCard;
