// Projects, shown on the home page. Every project links to its write-up:
// `article` is a blog post's SLUG (its folder name under content/blog/) — never a numeric id.
import type { Locale } from '../i18n/locales';

export interface Project {
  title: string;
  category: string;
  tech: string[];
  description: Record<Locale, string>;
  /** slug of the project's write-up under content/blog/ (required: every project links to one) */
  article: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Kris asks Claude',
    category: 'Video',
    tech: ['Claude Code', 'Playwright', 'FFmpeg', 'WebAudio'],
    description: {
      fr: 'Un pipeline de vidéos courtes quotidiennes : motion design en code, voix mesurées, un critique qui note chaque rendu. 35k vues en 3 jours.',
      en: 'A daily short-video pipeline: motion graphics as code, measured voices, a critic that grades every render. 35k views in 3 days.',
    },
    article: 'ai-video-pipeline',
  },
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
    tech: ['VPS OVH', 'Docker', 'E2EE'],
    description: {
      fr: 'Infrastructure de bureau à distance sécurisée, auto-hébergée sur VPS.',
      en: 'Secure self-hosted remote-desktop infrastructure on a VPS.',
    },
    article: 'rustdesk-remote-desktop',
  },
  {
    title: 'LM Studio + RTX 3070 Ti',
    category: 'AI',
    tech: ['LM Studio', 'RTX 3070 Ti', 'GGUF'],
    description: {
      fr: 'Faire tourner des modèles de langage en local sur mon PC : quantification, déchargement GPU, API compatible OpenAI.',
      en: 'Running language models locally on my PC: quantization, GPU offload, an OpenAI-compatible API.',
    },
    article: 'local-ai-lm-studio',
  },
];
