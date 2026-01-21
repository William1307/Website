import {
    Cpu,
    Server,
    Code2,
    Globe,
    Youtube
} from 'lucide-react';

export const TECH_STACK = [
    {
        id: 'raspberry-pi',
        name: 'Raspberry Pi 5',
        icon: Cpu,
        type: 'Hardware',
        level: '100%',
        status: 'Active',
        desc: '8GB RAM, ARM64 Architecture. Home Lab Server running Pi-hole, Unbound, Prometheus, and Grafana on Raspberry Pi OS (Debian-based).'
    },
    {
        id: 'ovh-vps',
        name: 'OVH VPS',
        icon: Server,
        type: 'Cloud Infrastructure',
        level: '95%',
        status: 'Running',
        desc: 'VPS-1: 4 vCores, 8GB RAM, 75GB SSD. Automated backup (1 day), unlimited traffic, 400 Mbit/s public bandwidth. Learn more at ovhcloud.com'
    },
    { id: 'python', name: 'Python', icon: Code2, type: 'Language', level: '85%', status: 'Compiled', desc: 'Automation, APIs, Backend Dev' },
    { id: 'network', name: 'Networking', icon: Globe, type: 'Infrastructure', level: '80%', status: 'Online', desc: 'OSI Model, TCP/IP, DNS, Routing' },
    {
        id: 'youtube',
        name: 'YouTube Channel',
        icon: Youtube,
        type: 'Content',
        level: 'Active',
        status: 'Publishing',
        desc: 'KrisRetroLab - Tech tutorials and projects covering homelab setups, networking, and self-hosting solutions.'
    },
];
