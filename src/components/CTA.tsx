import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AutoScroll from "embla-carousel-auto-scroll";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { QUOTE_PATH } from "@/consts/paths";
import { DEFAULT_HOME_COPY } from "@/consts/service-area-content";
import {
  openPathInNewTab,
  shouldOpenQuoteInNewTab,
} from "@/lib/navigation-behavior";

interface CTAProps {
  heading?: string;
  subheading?: string;
  cityName?: string;
}

const CTA = ({
  heading = DEFAULT_HOME_COPY.ctaHeading,
  subheading = DEFAULT_HOME_COPY.ctaSubheading,
  cityName,
}: CTAProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageAlt, setSelectedImageAlt] = useState("");

  const autoScrollPlugin = useRef(
    AutoScroll({
      speed: 1.2,
      startDelay: 800,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
      stopOnFocusIn: true,
      playOnInit: true,
    }),
  );

  const ctaButtonLabel = cityName
    ? `Obtenir une soumission à ${cityName}`
    : "Obtenir une soumission gratuite";

  const carouselImages = [
    "/carousel/sub-carousel-0.webp",
    "/carousel/sub-carousel-1.webp",
    "/carousel/sub-carousel-7.webp",
    "/carousel/sub-carousel-5.webp",
    "/carousel/sub-carousel-4.webp",
    "/carousel/sub-carousel-8.webp",
    "/carousel/sub-carousel-3.webp",
    "/carousel/sub-carousel-6.webp",
    "/carousel/sub-carousel-2.webp",
  ];

  const getImageAlt = (index: number) =>
    cityName
      ? `Réalisation d’entretien extérieur par Apex Prestige à ${cityName}, photo ${
          index + 1
        }`
      : `Réalisation d’entretien extérieur par Apex Prestige, photo ${
          index + 1
        }`;

  const handleImageOpen = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedImageAlt(getImageAlt(index));
  };

  const handleQuote = () => {
    if (shouldOpenQuoteInNewTab(location.pathname)) {
      openPathInNewTab(QUOTE_PATH);
      return;
    }

    navigate(QUOTE_PATH);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-brand-blue py-24">
        {/* Blurred overlay */}
        <div
          className="absolute inset-0 bg-brand-blue/10 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              {heading}
            </h2>

            <p className="max-w-2xl text-lg text-white/80">
              {subheading}
            </p>
          </div>

          {/* Continuous auto-scroll carousel */}
          <div className="relative mt-10">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
              plugins={[autoScrollPlugin.current]}
              className="w-full"
              aria-label="Galerie des réalisations Apex Prestige"
            >
              <CarouselContent className="-ml-4">
                {carouselImages.map((image, index) => {
                  const imageAlt = getImageAlt(index);

                  return (
                    <CarouselItem
                      key={image}
                      className="
                        basis-[82%] pl-4
                        sm:basis-[55%]
                        md:basis-[42%]
                        lg:basis-[32%]
                        xl:basis-[27%]
                      "
                    >
                      <button
                        type="button"
                        onClick={() => handleImageOpen(image, index)}
                        className="
                          group relative block w-full
                          cursor-zoom-in overflow-hidden
                          rounded-lg
                          text-left
                          shadow-xl
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-white
                          focus-visible:ring-offset-2
                          focus-visible:ring-offset-brand-blue
                        "
                        aria-label={`Agrandir : ${imageAlt}`}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={image}
                            alt={imageAlt}
                            className="
                              h-full w-full object-cover
                              transition-transform duration-500
                              group-hover:scale-105
                            "
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                          />
                        </div>

                        {/* Hover overlay */}
                        <div
                          className="
                            pointer-events-none absolute inset-0
                            flex items-center justify-center
                            bg-black/0
                            transition-colors duration-300
                            group-hover:bg-black/20
                          "
                          aria-hidden="true"
                        >
                          <span
                            className="
                              translate-y-2 rounded-full
                              bg-black/70 px-4 py-2
                              text-sm font-medium text-white
                              opacity-0
                              backdrop-blur-sm
                              transition-all duration-300
                              group-hover:translate-y-0
                              group-hover:opacity-100
                            "
                          >
                            Voir la photo
                          </span>
                        </div>
                      </button>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>

          {/* CTA button */}
          <div className="mt-12 flex justify-center">
            <Button
              type="button"
              onClick={handleQuote}
              aria-label={ctaButtonLabel}
              className="
                rounded-md bg-white px-8 py-6
                text-lg font-medium text-brand-blue
                shadow-lg
                transition-all duration-200
                hover:scale-105 hover:bg-gray-100
              "
            >
              {ctaButtonLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* Image lightbox */}
      <Dialog
        open={selectedImage !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedImage(null);
            setSelectedImageAlt("");
          }
        }}
      >
        <DialogContent
          className="
            max-h-[95vh] max-w-[95vw]
            border-white/10 bg-black/95
            p-2 text-white
            sm:max-w-5xl
            [&>button]:text-white
          "
        >
          <DialogTitle className="sr-only">
            Réalisation Apex Prestige
          </DialogTitle>

          <DialogDescription className="sr-only">
            Vue agrandie d’une réalisation d’entretien extérieur par Apex
            Prestige.
          </DialogDescription>

          {selectedImage && (
            <img
              src={selectedImage}
              alt={selectedImageAlt}
              className="
                max-h-[88vh] w-full
                rounded-md object-contain
              "
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CTA;
