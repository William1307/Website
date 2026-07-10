// All interface copy, both locales, one file. Components receive `t = UI[lang]`.
// Body copy here is carried over (or directly translated) from the previous site —
// per project rules, no invented biography and no lorem ipsum.
import type { Locale } from './locales';

export const UI = {
  fr: {
    nav: { blog: 'Blog', gallery: 'Galerie', cv: 'CV', contact: 'Contact', langLabel: 'English version' },
    hero: {
      kicker: 'Étudiant ingénieur — INSA Hauts-de-France',
      name: 'Kristofer Fauvette',
      title: 'Futur ingénieur informatique',
      lede:
        "Étudiant en 1ère année à l'INSA Hauts-de-France, passionné depuis toujours par l'informatique, les réseaux et la « bidouille » technique. Ce site centralise mon parcours : mes projets (NAS, serveurs), mon blog et mon CV.",
      cvButton: 'Consulter mon CV',
      contactButton: "M'écrire",
      sketchCaption: 'Fig. 01 — topologie générative, redessinée à chaque visite.',
    },
    sections: {
      projects: 'Travaux sélectionnés',
      infrastructure: "L'atelier — infrastructure auto-hébergée",
      infrastructureNote:
        "Inventaire réel de ce qui tourne chez moi et sur mon VPS. Les services listés sont des logiciels open-source que j'auto-héberge — je n'en suis pas l'auteur.",
      writing: 'Dernières notes',
      writingAll: 'Toutes les notes',
      contact: 'Me contacter',
      contactLede:
        "Disponible pour un stage. Intéressé par l'architecture réseau, la cybersécurité et l'auto-hébergement.",
    },
    blog: {
      pageTitle: 'Blog — notes & tutoriels',
      pageLede: 'Carnets de bord : réseaux, auto-hébergement et administration système, documentés pas à pas.',
      readArticle: "Lire l'article",
      publishedOn: 'Publié le',
      backToList: 'Retour aux notes',
      onlyInOtherLang: 'Cet article existe aussi en anglais.',
    },
    cv: {
      pageTitle: 'Curriculum vitæ',
      download: 'Télécharger le PDF',
      education: 'Formation',
      experience: 'Expérience',
      skills: 'Compétences',
      languages: 'Langues',
      qualities: 'Qualités',
      interests: "Centres d'intérêt",
      certifications: 'Annexe — certifications',
      certificationsNote: 'Badges vérifiables (Cisco, Microsoft, Google). Déplier pour le détail.',
      verify: "Vérifier l'authenticité",
      issuedBy: 'Délivré par',
    },
    gallery: {
      pageTitle: 'Galerie',
      pageLede: 'Matériel du homelab et photographies de paysage.',
      empty:
        'Les planches sont en cours de tirage — les photographies arrivent ici prochainement.',
      figure: 'Planche',
    },
    contactForm: {
      email: 'Votre e-mail',
      message: 'Message',
      send: 'Envoyer',
      sending: 'Envoi…',
      success: 'Message envoyé — merci !',
      error: "Erreur lors de l'envoi. Vous pouvez m'écrire directement par e-mail.",
    },
    footer: { colophon: 'Composé en Fraunces & IBM Plex Mono. Site statique, sans traceurs.' },
    notFound: { title: 'Page introuvable', body: "Cette page n'existe pas ou a été déplacée.", home: "Retour à l'accueil" },
  },
  en: {
    nav: { blog: 'Blog', gallery: 'Gallery', cv: 'CV', contact: 'Contact', langLabel: 'Version française' },
    hero: {
      kicker: 'Engineering student — INSA Hauts-de-France',
      name: 'Kristofer Fauvette',
      title: 'Future computer engineer',
      lede:
        'First-year student at INSA Hauts-de-France, passionate since forever about IT, networks and technical tinkering. This site gathers my work: projects (NAS, servers), my blog and my CV.',
      cvButton: 'Read my CV',
      contactButton: 'Write to me',
      sketchCaption: 'Fig. 01 — generative topology, redrawn on every visit.',
    },
    sections: {
      projects: 'Selected work',
      infrastructure: 'The workshop — self-hosted infrastructure',
      infrastructureNote:
        'A real inventory of what runs at home and on my VPS. The services listed are open-source software that I self-host — I am not their author.',
      writing: 'Latest notes',
      writingAll: 'All notes',
      contact: 'Get in touch',
      contactLede:
        'Available for an internship. Interested in network architecture, cybersecurity and self-hosting.',
    },
    blog: {
      pageTitle: 'Blog — notes & tutorials',
      pageLede: 'Field notes: networking, self-hosting and system administration, documented step by step.',
      readArticle: 'Read the article',
      publishedOn: 'Published on',
      backToList: 'Back to the notes',
      onlyInOtherLang: 'This article also exists in French.',
    },
    cv: {
      pageTitle: 'Curriculum vitæ',
      download: 'Download the PDF',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      languages: 'Languages',
      qualities: 'Qualities',
      interests: 'Interests',
      certifications: 'Appendix — certifications',
      certificationsNote: 'Verifiable badges (Cisco, Microsoft, Google). Expand for details.',
      verify: 'Verify authenticity',
      issuedBy: 'Issued by',
    },
    gallery: {
      pageTitle: 'Gallery',
      pageLede: 'Homelab equipment and landscape photography.',
      empty: 'The plates are still in the darkroom — photographs will appear here soon.',
      figure: 'Plate',
    },
    contactForm: {
      email: 'Your email',
      message: 'Message',
      send: 'Send',
      sending: 'Sending…',
      success: 'Message sent — thank you!',
      error: 'Something went wrong. You can also write to me directly by email.',
    },
    footer: { colophon: 'Set in Fraunces & IBM Plex Mono. Static site, no trackers.' },
    notFound: { title: 'Page not found', body: 'This page does not exist or has moved.', home: 'Back home' },
  },
} as const satisfies Record<Locale, unknown>;

export type UIStrings = (typeof UI)[Locale];
