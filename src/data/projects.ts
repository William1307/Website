
export const PROJECTS_DATA = [
    {
        id: 1,
        title: "Plex Server",
        cat: "Self-Hosting",
        tech: ["Docker", "Linux", "Plex"],
        desc: "Media server with HW transcoding.",
        action: { type: 'link', url: 'https://github.com/plexinc/pms-docker' }
    },
    {
        id: 2,
        title: "Pi-hole DNS",
        cat: "Cybersecurity",
        tech: ["DNSSEC", "Unbound", "Networking", "Raspberry Pi 5", "Linux"],
        desc: "Network-wide ad blocking.",
        action: { type: 'internal', articleId: 1 }
    },
    {
        id: 3,
        title: "RustDesk",
        cat: "SysAdmin",
        tech: ["VPS", "Encrypted", "OVH VPS", "Docker"],
        desc: "Secure remote desktop infrastructure.",
        action: { type: 'link', url: 'https://rustdesk.com/docs/en/self-host/' }
    },
    {
        id: 4,
        title: "Mail Server",
        cat: "Network",
        tech: ["Postfix", "Dovecot"],
        desc: "Serveur mail auto-hébergé complet."
    },
    {
        id: 5,
        title: "Portfolio",
        cat: "Web Dev",
        tech: ["React", "Vite", "Tailwind"],
        desc: "Site web portfolio-blog (kwol.cloud)."
    },
    {
        id: 6,
        title: "Blackjack",
        cat: "Game Dev",
        tech: ["Python"],
        desc: "Jeu de blackjack complet en Python."
    }
];
