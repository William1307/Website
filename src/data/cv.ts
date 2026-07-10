// CV content, carried over verbatim from the previous site's data (facts only —
// nothing invented). Rendered at /[lang]/cv; the PDF in /public stays the
// authoritative download.
import type { Locale } from '../i18n/locales';

type Bilingual = Record<Locale, string>;
type BilingualList = Record<Locale, string[]>;

export const CV = {
  personal: {
    name: 'Kristofer FAUVETTE',
    role: { fr: 'Futur Ingénieur Informatique', en: 'Future Computer Engineer' } satisfies Bilingual,
    location: '59300 Aulnoy-lez-Valenciennes',
    extras: { fr: ['18 ans', 'Permis B'], en: ['18 years old', 'Driving licence B'] } satisfies BilingualList,
    profile: {
      fr: "Étudiant en ingénierie informatique, je cherche un stage pour approfondir mes connaissances et mettre en pratique mes compétences en informatique. Curieux et motivé, j'ai développé mon sens de l'organisation et du travail en équipe à travers des projets et mon bénévolat.",
      en: 'Engineering student in computer science, searching for an internship to deepen my knowledge and apply my skills. Curious and motivated, I have developed my organizational and teamwork skills through projects and volunteering.',
    } satisfies Bilingual,
  },
  education: [
    {
      school: 'INSA Hauts-de-France',
      degree: {
        fr: "Diplôme d'ingénieur — classe préparatoire intégrée",
        en: 'Engineering degree — integrated preparatory class',
      } satisfies Bilingual,
      location: 'Valenciennes',
      date: { fr: 'Sept. 2025 — présent', en: 'Sept. 2025 — present' } satisfies Bilingual,
    },
    {
      school: 'Lycée Polyvalent Edmard Lama',
      degree: { fr: 'Baccalauréat Sciences', en: 'Baccalauréat (Sciences)' } satisfies Bilingual,
      location: 'Guyane',
      date: { fr: 'Sept. 2022 — juin 2025', en: 'Sept. 2022 — June 2025' } satisfies Bilingual,
      award: { fr: 'Mention Bien', en: 'With honours (Mention Bien)' } satisfies Bilingual,
    },
  ],
  experience: [
    {
      company: 'LDLC — Valenciennes',
      role: { fr: 'Conseiller technique', en: 'Technical advisor' } satisfies Bilingual,
      date: { fr: 'Février 2026 — présent (temps partiel)', en: 'February 2026 — present (part-time)' } satisfies Bilingual,
      bullets: {
        fr: ['Conseil technique et accompagnement client sur du matériel informatique grand public et professionnel.'],
        en: ['Technical advice and customer support on consumer and professional IT hardware.'],
      } satisfies BilingualList,
      tags: ['Conseil', 'Hardware', 'Vente'],
    },
    {
      company: 'ISIS — Cayenne',
      role: { fr: 'Bénévole (support IT)', en: 'Volunteer (IT support)' } satisfies Bilingual,
      date: { fr: 'Jan. 2022 — sept. 2024', en: 'Jan. 2022 — Sept. 2024' } satisfies Bilingual,
      bullets: {
        fr: [
          'Mise en place et gestion de solutions de virtualisation de serveurs (Proxmox, VMware).',
          'Configuration de systèmes de stockage en réseau (NAS) basés sur TrueNAS et Synology.',
          'Déploiement de solutions de contrôle à distance auto-hébergées (RustDesk).',
          'Participation aux inventaires réguliers pour vérifier la conformité du stock physique.',
          "Installation, configuration et maintenance d'équipements informatiques (postes, serveurs).",
        ],
        en: [
          'Implementation and management of server virtualization solutions (Proxmox, VMware).',
          'Configuration of network-attached storage (NAS) systems based on TrueNAS and Synology.',
          'Deployment of self-hosted remote-control solutions (RustDesk).',
          'Participation in regular inventories to verify physical stock conformity.',
          'Installation, configuration and maintenance of IT equipment (workstations, servers).',
        ],
      } satisfies BilingualList,
      tags: ['Proxmox', 'VMware', 'TrueNAS', 'Synology', 'RustDesk'],
    },
    {
      company: 'ISIS — Cayenne',
      role: { fr: "Stage d'observation", en: 'Observation internship' } satisfies Bilingual,
      date: { fr: 'Jan. 2022 (1 mois)', en: 'Jan. 2022 (1 month)' } satisfies Bilingual,
      bullets: {
        fr: [
          "Stage d'observation de 3ème pour découvrir le monde du travail.",
          'Contribution à la mise en place de projets spécifiques en fournissant une aide opérationnelle.',
        ],
        en: [
          'Middle-school observation internship to discover the professional world.',
          'Contribution to specific projects by providing operational support.',
        ],
      } satisfies BilingualList,
      tags: ['Inventaire', 'Maintenance', 'Support'],
    },
  ],
  skills: [
    { category: { fr: 'Systèmes', en: 'Systems' }, items: 'Linux, Windows, Proxmox, TrueNAS, Synology DSM' },
    { category: { fr: 'Réseaux', en: 'Networking' }, items: 'NAS, VPN, DNS, Cisco, WireGuard' },
    { category: { fr: 'Développement', en: 'Development' }, items: 'Python, C, SQL, Git/GitHub' },
    { category: { fr: 'Support', en: 'Support' }, items: { fr: 'Installation, dépannage, veille technologique', en: 'Installation, troubleshooting, technology watch' } },
  ],
  languages: [
    { name: { fr: 'Français', en: 'French' }, level: { fr: 'Langue maternelle', en: 'Native' } },
    {
      name: { fr: 'Anglais', en: 'English' },
      level: { fr: 'Intermédiaire supérieur (B2)', en: 'Upper intermediate (B2)' },
      detail: { fr: "2 semaines d'échange aux USA · certifié Cambridge", en: '2-week exchange in the USA · Cambridge certified' },
    },
  ],
  qualities: {
    fr: ['Motivation', 'Curiosité intrinsèque', 'Autonomie', 'Rigueur'],
    en: ['Motivation', 'Intrinsic curiosity', 'Autonomy', 'Rigour'],
  } satisfies BilingualList,
  interests: {
    fr: ['Informatique & réseaux', 'Programmation', 'Nouvelles technologies'],
    en: ['IT & networking', 'Programming', 'New technologies'],
  } satisfies BilingualList,
} as const;
