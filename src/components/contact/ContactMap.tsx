const ContactMap = () => {
  return (
    <div className="lg:col-span-2">
      <div className="h-96 rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1XW_y7kItYwQmapsyKUXhjsFURdpS5l8&ehbc=2E312F&noprof=1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte Google Maps montrant les zones desservies par Apex Prestige"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactMap;
