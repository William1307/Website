
export const CV_DATA = {
    personal: {
        name: "Kristofer FAUVETTE",
        role: { fr: "Futur Ingénieur Informatique", en: "Future Computer Engineer" },
        location: "59300 AULNOY-LEZ-VALENCIENNES",
        age: 18,
        permis: "Permis B",
        profile: {
            fr: "Étudiant en ingénierie informatique, je cherche un stage pour approfondir mes connaissances et mettre en pratique mes compétences en informatique. Curieux et motivé, j'ai développé mon sens de l'organisation et du travail en équipe à travers des projets et mon bénévolat.",
            en: "Engineering student in computer science, searching for an internship to deepen my knowledge and apply my skills. Curious and motivated, I have developed my organizational and teamwork skills through projects and volunteering."
        }
    },
    education: [
        {
            school: "INSA Hauts-de-France",
            degree: "Diplôme d'ingénieur Classe préparatoire",
            location: "Valenciennes",
            date: "Sept 2025 - Present"
        },
        {
            school: "Lycée Polyvalent Edmard LAMA",
            degree: "Baccalauréat Sciences",
            date: "Sept 2022 - Juin 2025",
            award: "Mention Bien"
        }
    ],
    experience: [
        {
            title: "ISIS - Cayenne",
            role: "Bénévole (IT Support)",
            date: "Jan 2022 - Sept 2024",
            desc: {
                fr: [
                    "Mise en place et gestion de solutions de virtualisation de serveurs (Proxmox, VMware).",
                    "Configuration de systèmes de stockage en réseau (NAS) basés sur TrueNAS et Synology.",
                    "Déploiement de solutions de contrôle à distance auto-hébergées (Rustdesk).",
                    "Participation aux inventaires réguliers pour vérifier la conformité du stock physique.",
                    "Installation, configuration et maintenance d'équipements informatiques (postes, serveurs)."
                ],
                en: [
                    "Implementation and management of server virtualization solutions (Proxmox, VMware).",
                    "Configuration of network attached storage (NAS) systems based on TrueNAS and Synology.",
                    "Deployment of self-hosted remote control solutions (Rustdesk).",
                    "Participation in regular inventories to verify physical stock conformity.",
                    "Installation, configuration, and maintenance of IT equipment (workstations, servers)."
                ]
            },
            tags: ["Proxmox", "VMware", "TrueNAS", "Synology", "RustDesk"]
        },
        {
            title: "ISIS - Cayenne (Stage)",
            role: "Stagiaire Observation",
            date: "Jan 2022 (1 mois)",
            desc: {
                fr: ["Stage d'observation de 3ème pour découvrir le monde du travail.", "Contribution à la mise en place de projets spécifiques en fournissant une aide opérationnelle."],
                en: ["Observation internship to discover the professional world.", "Contribution to the implementation of specific projects by providing operational support."]
            },
            tags: ["Inventaire", "Maintenance", "Support"]
        }
    ],
    skills: [
        { cat: "Systèmes", items: "Linux, Windows, Proxmox, TrueNAS, Synology DSM" },
        { cat: "Réseaux", items: "NAS, VPN, DNS, Cisco, WireGuard" },
        { cat: "Dev", items: "Python, C, SQL, Git/GitHub" },
        { cat: "Support", items: "Installation, Dépannage, Veille Technologique" }
    ],
    languages: [
        { name: { fr: "Français", en: "French" }, level: { fr: "Langue maternelle", en: "Native" }, score: 5 },
        { name: { fr: "Anglais", en: "English" }, level: { fr: "Intermédiaire supérieur (B2)", en: "Upper Intermediate (B2)" }, score: 4, detail: "2 semaines échange USA + Certifié Cambridge" }
    ],
    qualities: ['Motivation', 'Curiosité intrinsèque', 'Autonomie', 'Rigueur'],
    interests: [
        { label: "Informatique & Réseaux" },
        { label: "Programmation" },
        { label: "Nouvelles Technologies" }
    ]
};
