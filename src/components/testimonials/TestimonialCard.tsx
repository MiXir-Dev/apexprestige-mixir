import { Quote, Star } from 'lucide-react';

import type { Testimonial } from '@/consts/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const rating = Math.min(5, Math.max(0, testimonial.rating ?? 0));

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-black/10 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)] md:p-7">
      <Quote
        className="absolute right-5 top-6 h-10 w-10 text-brand-blue/[0.06] transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      />

      {rating > 0 && (
        <div
          className="mb-6 flex items-center gap-1"
          aria-label={`${rating} étoiles sur 5`}
        >
          {Array.from({ length: 5 }).map((_, index) => {
            const isFilled = index < rating;

            return (
              <Star
                key={index}
                className={`h-[18px] w-[18px] ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-transparent text-gray-200'
                }`}
                aria-hidden="true"
              />
            );
          })}

          <span className="ml-2 text-xs font-medium text-gray-400">
            {rating}/5
          </span>
        </div>
      )}

      <blockquote className="relative z-10 flex-1">
        <p className="text-base leading-7 text-gray-700">
          «&nbsp;{testimonial.content}&nbsp;»
        </p>
      </blockquote>

      <footer className="mt-7">
        <p className="font-semibold text-brand-text">{testimonial.name}</p>
      </footer>
    </article>
  );
};

export default TestimonialCard;
