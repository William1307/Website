// Site-wide identity & external links. Single source of truth — nothing below
// is repeated in components.
export const SITE = {
  title: 'Kristofer Fauvette',
  domain: 'kwol.cloud',
  description: {
    fr: "Portfolio et blog de Kristofer Fauvette — étudiant ingénieur à l'INSA Hauts-de-France. Réseaux, auto-hébergement, homelab.",
    en: 'Portfolio and blog of Kristofer Fauvette — engineering student at INSA Hauts-de-France. Networking, self-hosting, homelab.',
  },
  email: 'kristofer.fauvette@gmail.com',
  github: 'https://github.com/William1307',
  linkedin: 'https://www.linkedin.com/in/kristofer-fauvette-040142311/',
  credly: 'https://www.credly.com/users/kristofer-fauvette',
  youtube: 'KrisRetroLab',
  cvPdf: '/Images/Kristofer_FAUVETTE_CV.pdf',
  // Contact form posts directly to Formspree — no backend required.
  formspreeEndpoint: 'https://formspree.io/f/mqakevob',
} as const;
