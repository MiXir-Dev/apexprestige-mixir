
import { Shield, Clock, ThumbsUp, Check } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-12 w-12 text-brand-blue" />,
      title: "Fiable et Assuré",
      description: "Assurance responsabilité complète pour votre tranquillité d'esprit."
    },
    {
      icon: <Clock className="h-12 w-12 text-brand-blue" />,
      title: "Service Rapide",
      description: "Intervention efficace pour respecter votre emploi du temps."
    },
    {
      icon: <ThumbsUp className="h-12 w-12 text-brand-blue" />,
      title: "Satisfaction Garantie",
      description: "Nous ne sommes satisfaits que lorsque vous l'êtes totalement."
    },
    {
      icon: <Check className="h-12 w-12 text-brand-blue" />,
      title: "Équipe Professionnelle",
      description: "Techniciens formés et équipés des meilleurs outils."
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
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
