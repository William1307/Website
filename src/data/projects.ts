// Selected projects, shown on the home page. `article` links a project to a blog
// post BY SLUG (the folder name under content/blog/) — never by numeric id.
import type { Locale } from '../i18n/locales';

export interface Project {
  title: string;
  category: string;
  tech: string[];
  description: Record<Locale, string>;
  /** slug of a related post under content/blog/, if one exists */
  article?: string;
  /** external documentation / repo link, if relevant */
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Pi-hole + Unbound DNS',
    category: 'Cybersecurity',
    tech: ['DNSSEC', 'Unbound', 'Raspberry Pi 5', 'Linux'],
    description: {
      fr: "Blocage publicitaire à l'échelle du réseau avec résolution DNS récursive locale.",
      en: 'Network-wide ad blocking with local recursive DNS resolution.',
    },
    article: 'pihole-unbound-dns',
  },
  {
    title: 'RustDesk',
    category: 'SysAdmin',
    tech: ['VPS OVH', 'Docker', 'Chiffrement E2E'],
    description: {
      fr: 'Infrastructure de bureau à distance sécurisée, auto-hébergée sur VPS.',
      en: 'Secure self-hosted remote-desktop infrastructure on a VPS.',
    },
    article: 'rustdesk-remote-desktop',
  },
  {
    title: 'Plex Server',
    category: 'Self-hosting',
    tech: ['Docker', 'Linux', 'Plex'],
    description: {
      fr: 'Serveur multimédia avec transcodage matériel.',
      en: 'Media server with hardware transcoding.',
    },
    link: 'https://github.com/plexinc/pms-docker',
  },
  {
    title: 'Mail Server',
    category: 'Network',
    tech: ['Postfix', 'Dovecot'],
    description: {
      fr: 'Serveur mail auto-hébergé complet.',
      en: 'Complete self-hosted mail server.',
    },
  },
  {
    title: 'Portfolio — kwol.cloud',
    category: 'Web',
    tech: ['Astro', 'TypeScript'],
    description: {
      fr: 'Ce site : portfolio-blog statique, pipeline markdown automatisé.',
      en: 'This site: static portfolio-blog with an automated markdown pipeline.',
    },
  },
  {
    title: 'Blackjack',
    category: 'Programming',
    tech: ['Python'],
    description: {
      fr: 'Jeu de blackjack complet en Python.',
      en: 'A complete blackjack game written in Python.',
    },
  },
];
