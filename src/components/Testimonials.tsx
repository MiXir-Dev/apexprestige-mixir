import { useEffect, useRef, useState } from 'react';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import { TESTIMONIALS } from '@/consts/testimonials';

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const itemWidth = window.innerWidth < 768 ? container.clientWidth : 0;
      setActiveIndex(itemWidth ? Math.round(container.scrollLeft / itemWidth) : 0);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-medium">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Ce que des clients disent d’Apex Prestige
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des commentaires publiés par des clients d’Apex Prestige.
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
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              aria-label={`Voir le témoignage ${index + 1}`}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? 'bg-brand-blue' : 'bg-gray-400'
              }`}
              onClick={() => {
                if (!scrollRef.current) return;
                scrollRef.current.scrollTo({
                  left: index * scrollRef.current.clientWidth,
                  behavior: 'smooth',
                });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
