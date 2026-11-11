// CV content, transcribed from the PDF in /public (facts only — nothing
// invented; French is verbatim, English is a faithful translation). Rendered at
// /[lang]/cv; the PDF stays the authoritative download. When the PDF changes,
// update this file to match.
import type { Locale } from '../i18n/locales';

type Bilingual = Record<Locale, string>;
type BilingualList = Record<Locale, string[]>;

export const CV = {
  personal: {
    name: 'Kristofer FAUVETTE',
    role: {
      fr: 'Alternance en infrastructure et réseaux',
      en: 'Work-study placement in infrastructure & networking',
    } satisfies Bilingual,
    location: 'Aulnoy-lez-Valenciennes',
    extras: { fr: ['19 ans', 'Permis B'], en: ['19 years old', 'Driving licence B'] } satisfies BilingualList,
    profile: {
      fr: "Étudiant en 2e année à l'INSA Hauts-de-France, je souhaite me spécialiser dans l'infrastructure, les réseaux et leur sécurité. Je recherche une alternance à partir de septembre 2027 pour m'investir durablement au sein d'une équipe technique et progresser sur des environnements de production.",
      en: 'Second-year student at INSA Hauts-de-France, I want to specialise in infrastructure, networks and their security. I am looking for a work-study placement starting in September 2027, to commit long-term to a technical team and grow on production environments.',
    } satisfies Bilingual,
  },
  education: [
    {
      school: 'INSA Hauts-de-France',
      degree: {
        fr: "Diplôme d'ingénieur — cycle préparatoire, 2e année",
        en: 'Engineering degree — preparatory cycle, 2nd year',
      } satisfies Bilingual,
      location: 'Valenciennes',
      date: { fr: 'Sept. 2025 — juin 2030', en: 'Sept. 2025 — June 2030' } satisfies Bilingual,
    },
    {
      school: 'Lycée Polyvalent Edmard Lama – Sergine Prévot',
      degree: { fr: 'Baccalauréat général', en: 'Baccalauréat (general)' } satisfies Bilingual,
      location: 'Rémire-Montjoly',
      date: { fr: 'Sept. 2022 — juin 2025', en: 'Sept. 2022 — June 2025' } satisfies Bilingual,
      award: { fr: 'Mention Bien', en: 'With honours (Mention Bien)' } satisfies Bilingual,
    },
  ],
  experience: [
    {
      company: 'LDLC — Valenciennes',
      role: { fr: 'Conseiller technique', en: 'Technical advisor' } satisfies Bilingual,
      date: {
        fr: "Févr. 2026 — aujourd'hui · CDD étudiant",
        en: 'Feb. 2026 — present · student fixed-term contract',
      } satisfies Bilingual,
      bullets: {
        fr: [
          'Conseil client, analyse des besoins et proposition de solutions informatiques adaptées (matériel et services).',
          'Montage de PC sur mesure, diagnostic et réparation de matériel.',
          'Mise en rayon, gestion des stocks et bonne tenue du magasin.',
        ],
        en: [
          'Customer advice: analysing needs and proposing suitable IT solutions (hardware and services).',
          'Custom PC builds, hardware diagnostics and repair.',
          'Shelf stocking, inventory management and store upkeep.',
        ],
      } satisfies BilingualList,
      tags: ['Hardware', 'Diagnostic', 'Support'],
    },
    {
      company: 'Avant-Garde Outre-Mer — Rémire-Montjoly',
      role: { fr: 'Stagiaire', en: 'Intern' } satisfies Bilingual,
      date: { fr: 'Juil. — août 2026 (1 mois)', en: 'July — Aug. 2026 (1 month)' } satisfies Bilingual,
      bullets: {
        fr: [
          "Création et déploiement d'une image Windows master sur un parc de 150 postes Lenovo ThinkCentre destinés à des collèges et lycées.",
          'Préparation et dépannage de postes, sur site et en atelier.',
          'Gestion des stocks : réception, inventaire et suivi des équipements.',
        ],
        en: [
          'Built and deployed a Windows master image across a fleet of 150 Lenovo ThinkCentre PCs for middle and high schools.',
          'Workstation preparation and troubleshooting, on site and in the workshop.',
          'Inventory management: receiving, stocktaking and equipment tracking.',
        ],
      } satisfies BilingualList,
      tags: ['Windows', 'Imaging', 'Lenovo ThinkCentre'],
    },
    {
      company: 'ISIS — Cayenne',
      role: {
        fr: 'Bénévole chez un prestataire informatique',
        en: 'Volunteer at an IT services provider',
      } satisfies Bilingual,
      date: {
        fr: 'Janv. 2022 — sept. 2024 (2 ans et 8 mois)',
        en: 'Jan. 2022 — Sept. 2024 (2 years 8 months)',
      } satisfies Bilingual,
      bullets: {
        fr: [
          "Assistance au déploiement et à l'administration de solutions de virtualisation par hyperviseur (Proxmox, VMware).",
          'Configuration et administration de systèmes de stockage en réseau (NAS) sous TrueNAS et Synology.',
          'Installation et maintenance des équipements informatiques (postes de travail, serveurs), incluant le diagnostic et la résolution des pannes.',
        ],
        en: [
          'Assisted with deploying and administering hypervisor-based virtualisation (Proxmox, VMware).',
          'Configured and administered network-attached storage (NAS) on TrueNAS and Synology.',
          'Installed and maintained IT equipment (workstations, servers), including diagnosing and fixing faults.',
        ],
      } satisfies BilingualList,
      tags: ['Proxmox', 'VMware', 'TrueNAS', 'Synology'],
    },
  ],
  projects: {
    fr: [
      "Conception, déploiement et administration d'une infrastructure homelab multi-sites : cluster de virtualisation Proxmox, routage et pare-feu OPNsense, réseau UniFi. Hébergement de services (stockage cloud, DNS avec filtrage, VPN), dans une démarche d'apprentissage par la pratique et de souveraineté des données face au cloud propriétaire.",
      "Conception de l'infrastructure d'une baie serveur (réseau UniFi, VLAN, VPN, pare-feu par zones, stockage DAS, Proxmox) — en cours.",
    ],
    en: [
      'Designed, deployed and run a multi-site homelab: a Proxmox virtualisation cluster, OPNsense routing and firewalling, a UniFi network. Self-hosted services (cloud storage, filtering DNS, VPN), as a way to learn by doing and to keep control of my data instead of relying on proprietary cloud services.',
      'Designing the infrastructure of a server rack (UniFi network, VLANs, VPN, zone-based firewall, DAS storage, Proxmox) — in progress.',
    ],
  } satisfies BilingualList,
  skills: [
    { category: { fr: 'Réseaux', en: 'Networking' }, items: 'VLAN, VPN, OPNsense, UniFi' },
    {
      category: { fr: 'Systèmes & virtualisation', en: 'Systems & virtualisation' },
      items: 'Proxmox, Linux, Windows Server, Docker',
    },
    { category: { fr: 'Stockage', en: 'Storage' }, items: 'TrueNAS, Synology, DAS' },
    {
      category: { fr: 'Support', en: 'Support' },
      items: { fr: 'Support et maintenance informatique', en: 'IT support and maintenance' },
    },
  ],
  languages: [
    { name: { fr: 'Français', en: 'French' }, level: { fr: 'Langue maternelle', en: 'Native' } },
    {
      name: { fr: 'Anglais', en: 'English' },
      level: { fr: 'Intermédiaire supérieur (B2)', en: 'Upper intermediate (B2)' },
      detail: { fr: 'Certifié B2 Cambridge · échange aux États-Unis', en: 'Cambridge B2 certified · exchange in the USA' },
    },
  ],
  qualities: {
    fr: ['Motivation', "Envie d'apprendre et de découvrir", 'Autonomie', 'Rigueur'],
    en: ['Motivation', 'Eagerness to learn and discover', 'Autonomy', 'Rigour'],
  } satisfies BilingualList,
  interests: {
    fr: ['Randonnées en forêt', 'Pêche sportive', 'Vulgarisation informatique en ligne'],
    en: ['Forest hiking', 'Sport fishing', 'Explaining tech online'],
  } satisfies BilingualList,
} as const;
