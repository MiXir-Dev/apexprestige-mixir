const ContactMap = () => {
  return (
    <div className="lg:col-span-2">
      <div className="h-96 rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1keB2LM1SVq9fHTwvC12os0xJ5si6Epo&ehbc=2E312F&noprof=1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte Google Maps montrant les zones desservies par Mr. Clear"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactMap;
