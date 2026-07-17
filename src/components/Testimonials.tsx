import { useEffect, useRef, useState } from 'react';
import AutoScroll from 'embla-carousel-auto-scroll';

import TestimonialCard from '@/components/testimonials/TestimonialCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { TESTIMONIALS } from '@/consts/testimonials';

const MINIMUM_CAROUSEL_ITEMS = 6;

const repeatCount = Math.max(
  2,
  Math.ceil(MINIMUM_CAROUSEL_ITEMS / TESTIMONIALS.length),
);

const CAROUSEL_TESTIMONIALS = Array.from(
  { length: repeatCount },
  (_, groupIndex) =>
    TESTIMONIALS.map((testimonial, testimonialIndex) => ({
      testimonial,
      isDuplicate: groupIndex > 0,
      key: `${groupIndex}-${testimonialIndex}-${testimonial.name}`,
    })),
).flat();

const Testimonials = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const autoScrollPlugin = useRef(
    AutoScroll({
      speed: 0.8,
      startDelay: 1000,
      playOnInit: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
    }),
  );

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const autoScroll = carouselApi.plugins().autoScroll;

    if (!autoScroll) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const updateMotionPreference = () => {
      if (reducedMotionQuery.matches) {
        autoScroll.stop();
      } else {
        autoScroll.play();
      }
    };

    updateMotionPreference();
    reducedMotionQuery.addEventListener('change', updateMotionPreference);

    return () => {
      reducedMotionQuery.removeEventListener('change', updateMotionPreference);
      autoScroll.stop();
    };
  }, [carouselApi]);

  return (
    <section
      className="relative overflow-hidden bg-brand-light py-20 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-white/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-white/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">
            Témoignages
          </span>
          <h2
            id="testimonials-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-brand-text md:text-4xl lg:text-[42px]"
          >
            La satisfaction de nos clients parle d’elle-même
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-600">
            Découvrez les commentaires de clients ayant fait confiance à Apex
            Prestige pour l’entretien de leur propriété.
          </p>
          <p className="mt-3 hidden text-xs text-gray-400 md:block">
            Survolez les témoignages pour mettre le défilement en pause.
          </p>
        </header>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-brand-light to-transparent lg:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-brand-light to-transparent lg:block"
            aria-hidden="true"
          />

          <Carousel
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
            }}
            plugins={[autoScrollPlugin.current]}
            setApi={setCarouselApi}
            className="w-full"
            aria-label="Témoignages de clients Apex Prestige"
          >
            <CarouselContent className="-ml-5" aria-live="off">
              {CAROUSEL_TESTIMONIALS.map(
                ({ testimonial, isDuplicate, key }) => (
                  <CarouselItem
                    key={key}
                    className="basis-[90%] pl-5 sm:basis-[70%] md:basis-1/2 lg:basis-1/3"
                    aria-hidden={isDuplicate ? 'true' : undefined}
                  >
                    <div className="h-full py-2">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </CarouselItem>
                ),
              )}
            </CarouselContent>
          </Carousel>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400 md:hidden">
          Faites glisser pour découvrir les autres témoignages.
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
