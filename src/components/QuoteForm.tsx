import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const FORM_ID = 'hu8eft6q';
const FORM_IFRAME_ID = `crm-form-${FORM_ID}`;
const FORM_IFRAME_SRC = `https://app.flyra.io/f/${FORM_ID}`;
const DEFAULT_FORM_HEIGHT_PX = 700;

const QuoteForm = () => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(DEFAULT_FORM_HEIGHT_PX);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        !event.data ||
        event.data.type !== 'crm-form-resize' ||
        event.data.id !== FORM_ID ||
        typeof event.data.height !== 'number'
      ) {
        return;
      }

      setIframeHeight(event.data.height);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <section id="soumission" className="bg-white">
      <Helmet>
        <link rel="preconnect" href="https://app.flyra.io" />
        <link rel="dns-prefetch" href="//app.flyra.io" />
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative w-full" style={{ minHeight: `${DEFAULT_FORM_HEIGHT_PX}px` }}>
            {!isIframeLoaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded bg-gray-100 text-sm text-gray-700">
                Soumission lavage de vitre en cours...
              </div>
            )}
            <iframe
              src={FORM_IFRAME_SRC}
              style={{
                width: '100%',
                height: `${iframeHeight}px`,
                border: '0',
                borderRadius: '12px',
                transition: 'height 0.3s ease, opacity 200ms ease',
                opacity: isIframeLoaded ? 1 : 0,
              }}
              id={FORM_IFRAME_ID}
              title="Devis Gratuit"
              loading="lazy"
              onLoad={() => setIsIframeLoaded(true)}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
