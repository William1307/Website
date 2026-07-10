// The homelab, described honestly: an INVENTORY of real hardware and the
// open-source services deployed on it. The previous site simulated "live"
// CPU/uptime metrics in the browser — that fabrication was deliberately removed
// (see AGENT_HANDOFF.md). Do not reintroduce fake telemetry.
import type { Locale } from '../i18n/locales';

export interface Machine {
  name: string;
  hardware: string;
  os: string;
  role: Record<Locale, string>;
  services: string[];
}

export const INFRASTRUCTURE: Machine[] = [
  {
    name: 'Raspberry Pi 5',
    hardware: '8 GB RAM · ARM64',
    os: 'Raspberry Pi OS (Debian)',
    role: {
      fr: 'Serveur du homelab — filtrage DNS et supervision du réseau domestique.',
      en: 'Homelab server — DNS filtering and home-network monitoring.',
    },
    services: ['Pi-hole', 'Unbound', 'Prometheus', 'Grafana'],
  },
  {
    name: 'HP ProLiant ML350e Gen8 v2',
    hardware: 'Xeon E5-2407 v2 · 8 GB DDR3',
    os: 'Proxmox VE',
    role: {
      fr: 'Hyperviseur maison — virtualisation, stockage réseau et médiathèque.',
      en: 'Home hypervisor — virtualization, network storage and media library.',
    },
    services: ['TrueNAS Scale (VM)', 'Ubuntu Server (VM)', 'NAS', 'Plex'],
  },
  {
    name: 'VPS OVH',
    hardware: '4 vCores · 8 GB RAM · 75 GB SSD',
    os: 'Ubuntu Server',
    role: {
      fr: 'Services exposés sur Internet, conteneurisés avec Docker.',
      en: 'Internet-facing services, containerized with Docker.',
    },
    services: ['Nextcloud', 'Mail server', 'RustDesk relay', 'Speedtest'],
  },
];
