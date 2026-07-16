import { useEffect, useRef, useState } from "react";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { TESTIMONIALS } from "@/consts/testimonials";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?client=safari&sca_esv=bb271186de9540cb&hl=en&sxsrf=AHTn8zrPypPRASjrXhmr5kSMUc4ZJmsKyg:1747872316858&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzbJP-FZL21QXwipZVl9o6Y2jGXOtJoULQeK2eRflV8P6ftJZhVo_MaXN1Vfp2Z6C7kP-4VqKTdp6wruAE3rOzFdZFrPz&q=Mr.Clear+Reviews&sa=X&ved=2ahUKEwijn7zk47WNAxVUlYkEHX8IDCoQ0bkNegQIKhAE&biw=1472&bih=739&dpr=1.3";

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const itemWidth = window.innerWidth < 768 ? container.clientWidth : 0;
      const index = itemWidth ? Math.round(container.scrollLeft / itemWidth) : 0;
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-medium">Témoignages Clients</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Ce que nos clients disent de nous
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La satisfaction de nos clients est notre priorité absolue.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible pb-4 scroll-smooth snap-x snap-mandatory"
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>

        <div className="md:hidden flex justify-center mt-6 gap-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Voir le témoignage ${index + 1}`}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? "bg-brand-blue" : "bg-gray-400"
              }`}
              onClick={() => {
                if (!scrollRef.current) return;
                scrollRef.current.scrollTo({
                  left: index * scrollRef.current.clientWidth,
                  behavior: "smooth",
                });
              }}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline inline-flex items-center"
          >
            Voir tous nos avis Google
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
