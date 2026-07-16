export interface Testimonial {
  content: string;
  name: string;
  position: string;
  rating: number;
  source: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    content:
      "Un service exceptionnel ! L'équipe de Mr. Clear a été ponctuelle, professionnelle et nos vitres sont impeccables.",
    name: "Marie Beauchamp",
    position: "Rosemère",
    rating: 5,
    source: "Google Reviews",
  },
  {
    content:
      "Nous faisons appel à Mr. Clear depuis 2 ans maintenant pour l'entretien de notre restaurant à Laval.",
    name: "Pierre Lavoie",
    position: "Restaurateur, Laval",
    rating: 5,
    source: "Google Reviews",
  },
  {
    content:
      "Service client exemplaire ! L'équipe a su répondre à nos besoins spécifiques pour notre immeuble de bureaux.",
    name: "Sophie Bélanger",
    position: "Gestionnaire immobilier, Montréal",
    rating: 5,
    source: "Google Reviews",
  },
  {
    content:
      "Michael est un pro ! Il a répondu à toutes mes questions. Je vais refaire appel à lui, mes vitres sont IMPECCABLES.",
    name: "Blessed By G",
    position: "Client résidentiel",
    rating: 5,
    source: "Google Reviews",
  },
  {
    content:
      "Super équipe ! Tout a été fait parfaitement. Michael est très accueillant et le prix est abordable.",
    name: "Diogo Vasconcelos",
    position: "Client résidentiel",
    rating: 5,
    source: "Google Reviews",
  },
  {
    content:
      "Super service ! Équipe gentille et motivée. 10/10 je recommande à nouveau.",
    name: "Natanael Mongeau-Binette",
    position: "Client résidentiel",
    rating: 5,
    source: "Google Reviews",
  },
  {
    content:
      "Expérience magnifique ! Service rapide et prix raisonnable. Je recommande cette équipe motivée et attentionnée.",
    name: "Anas Jamaleddine",
    position: "Client résidentiel",
    rating: 5,
    source: "Google Reviews",
  },
  {
    content:
      "Une équipe jeune et motivée qui aime son travail. Mes vitres sont éclatantes à très bon prix.",
    name: "Nadira Chalal",
    position: "Client résidentiel",
    rating: 5,
    source: "Google Reviews",
  },
  {
    content:
      "Excellent service ! Nettoyage rapide et courtois. De jeunes travailleurs motivés, bravo !",
    name: "Jean-François Bibeau",
    position: "Guide local",
    rating: 5,
    source: "Google Reviews",
  },
];
