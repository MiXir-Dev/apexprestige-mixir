import { Building2, ClipboardList, Layers3, SlidersHorizontal } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Building2 className="h-12 w-12 text-brand-blue" />,
      title: 'Résidentiel et commercial',
      description:
        'Des services adaptés aux maisons, immeubles, commerces et autres propriétés.',
    },
    {
      icon: <ClipboardList className="h-12 w-12 text-brand-blue" />,
      title: 'Soumission gratuite',
      description:
        'Une évaluation claire des travaux demandés avant de planifier le service.',
    },
    {
      icon: <Layers3 className="h-12 w-12 text-brand-blue" />,
      title: 'Plusieurs services',
      description:
        'Un seul point de contact pour le nettoyage et l’entretien de vos surfaces extérieures.',
    },
    {
      icon: <SlidersHorizontal className="h-12 w-12 text-brand-blue" />,
      title: 'Intervention adaptée',
      description:
        'Le service est déterminé selon la surface, son état et les besoins de la propriété.',
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
