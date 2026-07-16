export interface Testimonial {
  content: string;
  name: string;
  position: string;
  rating?: number;
  source: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    content:
      'Équipe professionnelle, énergique et efficace. Le travail est réalisé avec attention et le service à la clientèle est excellent du début à la fin.',
    name: 'Mario C.',
    position: 'Client Apex Prestige',
    source: 'Témoignage client',
  },
  {
    content:
      'À mon arrivée, l’extérieur de la maison était complètement transformé : propre, éclatant et impeccable. Très impressionné du résultat.',
    name: 'Robert B.',
    position: 'Client Apex Prestige',
    source: 'Témoignage client',
  },
  {
    content:
      'Mes soffites et mes gouttières avaient vraiment besoin d’amour, et le résultat a dépassé mes attentes. La maison a retrouvé un aspect propre et lumineux. Service rapide, soigné et très professionnel.',
    name: 'Francine M.',
    position: 'Cliente Apex Prestige',
    source: 'Témoignage client',
  },
];
