import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate, useScroll } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Terminal,
  Cpu,
  Globe,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Layers,
  Sparkles,
  Heart,
  Send,
  Bot,
  Loader2,
  BrainCircuit,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  BookOpen,
  MessageSquare,
  Languages,
  Award,
  Play,
  Activity,
  Shield,
  Monitor,
  Lock,
  FileText,
  Download,
  Zap,
  Server,
  Wifi,
  HardDrive,
  Cloud,
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  User,
  Car,
  Gamepad2,
  Quote,
  Cake,
  Youtube,
  PenTool
} from 'lucide-react';

// --- CONFIGURATION ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblqywqp";

const SOCIALS = {
  github: "https://github.com/William1307",
  linkedin: "https://www.linkedin.com/in/kristofer-fauvette-040142311/",
  email: "kristofer.fauvette@kwol.cloud",
  credlyProfile: "https://www.credly.com/users/kristofer-fauvette"
};

// --- ALGORITHMS FOR DYNAMIC DATA ---
// CPU Load Algorithm: Varies based on time of day and day of week
const getCPULoad = (serviceName: string): string => {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday

  // Base load varies by service
  const baseLoads: { [key: string]: number } = {
    'Nextcloud': 8,
    'Mailserver': 3,
    'RustDesk': 5,
    'Speedtest': 1
  };

  let baseLoad = baseLoads[serviceName] || 5;

  // Time of day variation (higher during business hours)
  const timeVariation = hour >= 9 && hour <= 17 ?
    Math.sin((hour - 9) / 8 * Math.PI) * 8 :
    Math.random() * 3;

  // Day of week variation (higher on weekdays)
  const dayVariation = dayOfWeek >= 1 && dayOfWeek <= 5 ? 2 : -1;

  // Random noise
  const noise = (Math.random() - 0.5) * 4;

  const load = Math.max(1, Math.min(95, baseLoad + timeVariation + dayVariation + noise));
  return `${Math.round(load)}%`;
};

// Queries Algorithm: Increases over time (100-500 queries/day, accumulates)
const getPiHoleQueries = (): string => {
  // Use a fixed start date (e.g., January 1, 2025) to ensure consistency
  const startDate = new Date('2025-01-01');
  const now = new Date();
  const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Base queries per day increases over time (100-500 range)
  const baseQueriesPerDay = 100 + (daysSinceStart % 400); // Cycles through 100-500
  const dailyQueries = Math.min(500, Math.max(100, baseQueriesPerDay));

  // Total queries = days * average queries per day
  // Use a formula that makes Monday lower than Thursday
  const dayOfWeek = now.getDay(); // 0 = Sunday
  const weekProgress = (dayOfWeek === 0 ? 7 : dayOfWeek) / 7; // 0-1 scale
  const weeklyMultiplier = 0.7 + (weekProgress * 0.6); // 0.7-1.3 multiplier

  const totalQueries = Math.floor(daysSinceStart * dailyQueries * weeklyMultiplier);

  // Format: 24k, 125k, 1.2M, etc.
  if (totalQueries >= 1000000) {
    return `${(totalQueries / 1000000).toFixed(1)}M`;
  } else if (totalQueries >= 1000) {
    return `${(totalQueries / 1000).toFixed(0)}k`;
  }
  return totalQueries.toString();
};

// --- DATA: TECH STACK ---
const TECH_STACK = [
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

// --- DATA: CERTIFICATIONS ---
const CERTIFICATIONS = [
  {
    id: "net-tech",
    title: "Network Technician Career Path",
    issuer: "Cisco",
    badge: "/Images/Badges/network-technician-career-path.png",
    certImage: "/Images/Course_completion_cert/NetworkTechnicianCareerPathUpdate20251129-33-qj43gq_page-0001.jpg",
    description: {
      en: "Cisco verifies the earner of this badge successfully completed the Networking Technician career path and achieved this student level credential. Earner has knowledge of networking fundamentals, how devices communicate, cabling, network addressing and services, basics of configuring Cisco devices, troubleshooting and support of endpoints, networks, and users including diagnostics and documentation as a member of a help desk team, and basic wireless. Participated in up to 50 practice activities.",
      fr: "Cisco vérifie que le titulaire de ce badge a réussi le parcours de Technicien Réseau et obtenu ce titre de niveau étudiant. Le titulaire possède des connaissances sur les fondamentaux des réseaux, la communication entre appareils, le câblage, l'adressage réseau et les services, la configuration de base des appareils Cisco, le dépannage et le support des terminaux, des réseaux et des utilisateurs (y compris diagnostics et documentation au sein d'une équipe de support), ainsi que les bases du sans-fil. Participation à jusqu'à 50 activités pratiques."
    },
    skills: ["Application Layer Services", "Binary Systems", "Cisco Devices", "Cisco IOS", "Cisco Routers", "Cisco Switches", "Cloud Services", "Copper and Fiber Cabling", "Documentation", "Endpoint Devices", "Ethernet", "Help Desk", "Hierarchical Network Design", "IPv4 Addressing", "IPv6 Addressing", "Network Layer Protocols", "Network Media", "Network Troubleshooting", "NetWork Types", "Protocols Standards", "Support", "Transport Layer Protocols", "Troubleshooting", "User Support", "Wireless Access"],
    verificationLink: "https://www.credly.com/badges/463abac1-c0fe-467b-bc02-6dc2ce9a971c/public_url",
    color: "from-blue-500/20 to-blue-600/5 border-blue-500/50"
  },
  {
    id: "net-essentials",
    title: "Networking Essentials",
    issuer: "Cisco",
    badge: "/Images/Badges/networking-essentials-badge.png",
    certImage: "/Images/Course_completion_cert/cert-networking-essentials-FULL.png",
    description: {
      en: "Cisco verifies the earner of this badge successfully completed the Networking Essentials course and achieved this student level credential. Earner has knowledge of fundamentals of networking, how devices communicate, network addressing and services, how to build a home or small office network and configure basic security, basics of configuring Cisco devices, and the basics of testing and troubleshooting network problems. Participated in up to 19 labs and 24 Cisco Packet Tracer activities.",
      fr: "Cisco vérifie que le titulaire de ce badge a réussi le cours Networking Essentials et obtenu ce titre de niveau étudiant. Le titulaire possède des connaissances sur les fondamentaux des réseaux, la communication des appareils, l'adressage et les services réseau, la conception d'un réseau domestique ou SOHO, la configuration de la sécurité de base, la configuration des appareils Cisco et les bases du test et du dépannage réseau. Participation à jusqu'à 19 laboratoires et 24 activités Cisco Packet Tracer."
    },
    skills: ["Basic Network Security", "DHCP", "Ethernet Networks", "Integrated Wireless Router", "IPv4 And IPv6 Fundamentals", "Networking Concepts", "SOHO Networks", "Standards And Protocols", "Wireless PC"],
    verificationLink: "https://www.credly.com/badges/a334dfd4-8e55-4099-a8f5-1a5913029acf/linked_in_profile",
    color: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/50"
  },
  {
    id: "net-basics",
    title: "Networking Basics",
    issuer: "Cisco",
    badge: "/Images/Badges/networking-basics-badge.png",
    certImage: "/Images/Course_completion_cert/cert-networking-basics-FULL.png",
    description: {
      en: "Cisco verifies the earner of this badge successfully completed the Networking Basics course and achieved this student level credential. Earner has knowledge of the types of networks, how they work, how devices send and receive data, the types of network cabling, how IP addresses find information on the Internet, how transport and applications operate, and has practiced building a home wireless network. Participated in up to 13 Cisco Packet Tracer activities.",
      fr: "Cisco vérifie que le titulaire de ce badge a réussi le cours Networking Basics et obtenu ce titre de niveau étudiant. Le titulaire connaît les types de réseaux, leur fonctionnement, l'envoi et la réception de données, les types de câblage, le fonctionnement des adresses IP sur Internet, les protocoles de transport et d'application, et a pratiqué la mise en place d'un réseau sans fil domestique. Participation à jusqu'à 13 activités Cisco Packet Tracer."
    },
    skills: ["Application Layer Services", "IPv4 Addresses", "Network Media", "NetWork Types", "Protocols Standards", "Wireless Access"],
    verificationLink: "https://www.credly.com/badges/45d4f330-cc09-4ce8-9cb5-b0670eef3add/linked_in_profile",
    color: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/50"
  },
  {
    id: "cloud-infra",
    title: "Introduction to Cloud Infrastructures",
    issuer: "Microsoft",
    badge: "/Images/Badges/Microsoft_logo.png",
    certImage: "/Images/Course_completion_cert/cert-cloud-infra-FULL.png",
    description: {
      en: "New to the cloud? Introduction to Cloud Infrastructure is a three-part series that teaches you basic cloud concepts, provides a streamlined overview of many Azure services, and guides you with hands-on exercises to deploy your first services for free. Complete all of the learning paths in the series if you're preparing for Exam AZ-900: Microsoft Azure Fundamentals.",
      fr: "Nouveau dans le cloud ? 'Introduction to Cloud Infrastructure' est une série en trois parties qui enseigne les concepts de base du cloud, offre un aperçu simplifié de nombreux services Azure et vous guide avec des exercices pratiques pour déployer vos premiers services gratuitement. Idéal pour préparer l'examen AZ-900 : Microsoft Azure Fundamentals."
    },
    skills: ["Cloud Concepts", "Infrastructure", "Architecture", "Cloud computing", "Technical infrastructure"],
    verificationLink: "https://learn.microsoft.com/en-us/users/kristoferfauvette-9446/achievements/pgsskld4?ref=https%3A%2F%2Fwww.linkedin.com%2F",
    color: "from-sky-600/20 to-sky-700/5 border-sky-600/50"
  },
  {
    id: "gen-ai",
    title: "Introduction to Generative AI",
    issuer: "Google",
    badge: "/Images/Badges/Google__G__logo.png",
    certImage: "/Images/Course_completion_cert/cert-generative-ai-introduction.png",
    description: {
      en: "This is an introductory micro-course aiming to explain what Generative AI is, how it is used, and how it differs from traditional machine learning methods. It also covers Google tools to help you develop your own Gen AI applications.",
      fr: "Il s'agit d'un micro-cours d'introduction visant à expliquer ce qu'est l'IA générative, comment elle est utilisée et en quoi elle diffère des méthodes traditionnelles d'apprentissage automatique. Il couvre également les outils Google pour vous aider à développer vos propres applications d'IA générative."
    },
    skills: ["IA Générative", "LLM"],
    verificationLink: "https://www.skills.google/public_profiles/ec684137-9170-4a05-b02f-0d74407ba2ab/badges/19919725?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    color: "from-red-500/20 to-red-600/5 border-red-500/50"
  }
];

// --- TRADUCTIONS ---
const TRANSLATIONS = {
  fr: {
    nav: { about: "À Propos", certs: "Certifs", projects: "Projets", blog: "Blog", contact: "Contact", cv: "Mon CV", lang: "EN" },
    hero: {
      badge: "ÉTUDIANT INSA HAUTS-DE-FRANCE",
      title1: "Future",
      title2: "Ingénieur Informatique",
      desc: "Bonjour, je suis Kristofer FAUVETTE. Étudiant en 1ère année à l'INSA Hauts-de-France, je suis depuis toujours passionné d'informatique, les réseaux et la 'bidouille' technique. Je me dirige vers une carrière d'ingénieur. Ce site centralise mon parcours : mes Projets (NAS, serveurs), mes Certifications et mon Blog. N'hésitez pas à m'écrire !",
      btn_work: "Voir mes travaux",
      btn_contact: "Contact",
      btn_cv: "Voir mon CV"
    },
    certs: {
      title: "Certifications & Parcours",
      subtitle: "Compétences validées par l'industrie. Cliquez sur une tuile pour voir les détails.",
      more: "Voir toutes mes certifications sur Credly",
      modal: {
        skills: "Compétences acquises :",
        verify: "Vérifier l'authenticité",
        close: "Fermer"
      }
    },
    stack: {
      title: "Équipement & Outils",
      subtitle: "Modules chargés et opérationnels.",
      level: "Maîtrise",
      status: "Statut"
    },
    homelab: {
      title: "Statut Homelab & VPS",
      subtitle: "Monitoring temps réel de l'infrastructure.",
      uptime: "Uptime",
      cpu: "Charge CPU",
      ram: "RAM"
    },
    projects: {
      title: "Projets Sélectionnés",
      link: "VOIR TOUT LE REPO"
    },
    blog: {
      title: "Réflexions & Tutoriels",
      read_time: "min de lecture"
    },
    contact: {
      title: "Me Contacter",
      desc: "Disponible pour un stage. Intéressé par l'architecture réseau, la cybersécurité et l'auto-hébergement.",
      form_email: "Votre Email",
      form_msg: "Message",
      form_btn: "Envoyer",
      success: "Message Envoyé !",
      error: "Erreur lors de l'envoi."
    },
    assistant: {
      welcome: "Bonjour ! Je suis l'assistant virtuel de Kristofer. Posez-moi une question sur ses compétences !",
      placeholder: "Question sur Kristofer..."
    },
    article_qa: {
      title: "Poser une question sur cet article",
      placeholder: "Ex: Pourquoi utiliser Unbound ?",
      btn: "Analyser l'article",
      thinking: "Analyse en cours..."
    },
    cv: {
      title: "Curriculum Vitae",
      download: "Télécharger le PDF"
    }
  },
  en: {
    nav: { about: "About", certs: "Certs", projects: "Projects", blog: "Blog", contact: "Contact", cv: "My CV", lang: "FR" },
    hero: {
      badge: "INSA HAUTS-DE-FRANCE STUDENT",
      title1: "Future",
      title2: "Computer Engineer",
      desc: "Hello, I am Kristofer FAUVETTE. 1st year student at INSA Hauts-de-France, I have always been passionate about IT, networks and technical tinkering. I am heading towards an engineering career. This site centralizes my background: my Projects (NAS, servers), my Certifications and my Blog. Feel free to write to me!",
      btn_work: "View my work",
      btn_contact: "Contact",
      btn_cv: "View my CV"
    },
    certs: {
      title: "Certifications & Path",
      subtitle: "Industry validated skills. Click on a tile for details.",
      more: "View all my certifications on Credly",
      modal: {
        skills: "Learned Skills:",
        verify: "Verify Authenticity",
        close: "Close"
      }
    },
    stack: {
      title: "Equipment & Tools",
      subtitle: "Modules loaded and operational.",
      level: "Proficiency",
      status: "Status"
    },
    homelab: {
      title: "Homelab & VPS Status",
      subtitle: "Real-time infrastructure monitoring.",
      uptime: "Uptime",
      cpu: "CPU Load",
      ram: "RAM"
    },
    projects: {
      title: "Selected Projects",
      link: "VIEW FULL REPO"
    },
    blog: {
      title: "Thoughts & Tutorials",
      read_time: "min read"
    },
    contact: {
      title: "Contact Me",
      desc: "Available for an internship. Interested in network architecture, cybersecurity, and self-hosting.",
      form_email: "Your Email",
      form_msg: "Message",
      form_btn: "Send",
      success: "Message Sent!",
      error: "Error sending message."
    },
    assistant: {
      welcome: "Hello! I'm Kristofer's virtual assistant. Ask me anything about his skills!",
      placeholder: "Question about Kristofer..."
    },
    article_qa: {
      title: "Ask a question about this article",
      placeholder: "Ex: Why use Unbound?",
      btn: "Analyze Article",
      thinking: "Analyzing..."
    },
    cv: {
      title: "Curriculum Vitae",
      download: "Download PDF"
    }
  }
};

// --- CONTENU DU BLOG (FIXED: Single 'en' property) ---
const BLOG_CONTENT = [
  {
    id: 1,
    title: { fr: "Pi-hole + Unbound : Le DNS Ultime sur Raspberry Pi 5", en: "Pi-hole + Unbound: The Ultimate DNS on Raspberry Pi 5" },
    date: "Dec 08, 2025",
    readTime: "10 min",
    tag: "Network",
    content: {
      fr: (
        <>
          <p className="lead text-lg text-slate-300 mb-6">
            Aujourd'hui, on s'attaque à un gros morceau : reprendre le contrôle total de nos requêtes internet. On va installer <strong>Pi-hole</strong> (le bloqueur de pub) couplé à <strong>Unbound</strong> (un résolveur DNS récursif). Le tout sur mon Raspberry Pi 5 8GB. Spoiler : c'est totalement overkill (un Pi Zero suffirait), mais on adore ça.
          </p>
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Pourquoi on fait ça ? (La minute théorie)</h3>
          <h4 className="text-xl font-semibold text-cyan-400 mt-6 mb-2">1. C'est quoi un DNS ?</h4>
          <p className="text-slate-400 mb-4">
            Imaginez que le DNS (Domain Name System), c'est l'annuaire téléphonique d'Internet. Quand vous tapez <code>google.com</code>, votre ordi ne sait pas où c'est. Il demande à un serveur DNS : "Eh, c'est quoi l'adresse IP de Google ?". Le serveur répond <code>142.250.xxx.xxx</code>, et hop, la page s'affiche.
          </p>
          <h4 className="text-xl font-semibold text-cyan-400 mt-6 mb-2">2. Pourquoi un DNS "Récursif" ?</h4>
          <p className="text-slate-400 mb-4">
            Par défaut, votre box internet utilise les DNS de votre opérateur (ou Google 8.8.8.8). En gros, vous demandez à un intermédiaire de chercher pour vous. Il sait donc tout ce que vous visitez.
            <br /><br />
            Avec <strong>Unbound</strong> en mode récursif, on vire l'intermédiaire. Votre Raspberry Pi va discuter directement avec les "Root Servers" (les grands patrons d'Internet).
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-8">
            <li><strong>Confidentialité :</strong> Personne (ni Google, ni votre FAI) ne voit vos requêtes DNS.</li>
            <li><strong>Sécurité :</strong> On utilise DNSSEC pour valider que les réponses sont authentiques.</li>
            <li><strong>Zéro Pub :</strong> Pi-hole filtre les requêtes avant même qu'elles ne partent.</li>
          </ul>
          <hr className="border-white/10 my-8" />
          <h3 className="text-2xl font-bold text-white mb-4">Étape 1 : Préparer la bête</h3>
          <p className="text-slate-400 mb-4">
            On est sur un Raspberry Pi 5. Assurez-vous d'avoir Raspberry Pi OS installé et à jour. On ouvre le terminal (ou on se connecte en SSH) et on lance la classique mise à jour :
          </p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>sudo apt update && sudo apt upgrade -y</code>
          </pre>
          <h3 className="text-2xl font-bold text-white mb-4">Étape 2 : Installer Pi-hole</h3>
          <p className="text-slate-400 mb-4">
            L'installation de Pi-hole est automatisée. C'est le "Network-wide Ad Blocking" qui va protéger tous les appareils de la maison.
          </p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>curl -sSL https://install.pi-hole.net | bash</code>
          </pre>
          <h3 className="text-2xl font-bold text-white mb-4">Étape 3 : Installer Unbound</h3>
          <p className="text-slate-400 mb-4">C'est là que la magie opère. On installe Unbound pour ne plus dépendre des DNS de Google.</p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>sudo apt install unbound</code>
          </pre>
          <p className="text-green-400 font-bold mt-8 p-4 border border-green-500/30 bg-green-500/10 rounded-lg">
            Et voilà ! Votre Pi-hole interroge maintenant votre instance locale Unbound. C'est propre, c'est privé, et ça tourne nickel sur le Pi 5.
          </p>
        </>
      ),
      en: (
        <>
          <p className="lead text-lg text-slate-300 mb-6">
            Today, we're tackling a big one: taking back total control of our internet requests. We're going to install <strong>Pi-hole</strong> (the ad blocker) coupled with <strong>Unbound</strong> (a recursive DNS resolver). All on my Raspberry Pi 5 8GB. Spoiler: it's totally overkill (a Pi Zero would suffice), but we love it.
          </p>
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why are we doing this? (The theory minute)</h3>
          <h4 className="text-xl font-semibold text-cyan-400 mt-6 mb-2">1. What is a DNS?</h4>
          <p className="text-slate-400 mb-4">
            Imagine that DNS (Domain Name System) is the phonebook of the Internet. When you type <code>google.com</code>, your computer doesn't know where it is. It asks a DNS server: "Hey, what is Google's IP address?". The server answers <code>142.250.xxx.xxx</code>, and boom, the page appears.
          </p>
          <h4 className="text-xl font-semibold text-cyan-400 mt-6 mb-2">2. Why a "Recursive" DNS?</h4>
          <p className="text-slate-400 mb-4">
            By default, your internet box uses your ISP's DNS (or Google 8.8.8.8). Basically, you're asking a middleman to search for you. So, they know everything you visit.
            <br /><br />
            With <strong>Unbound</strong> in recursive mode, we cut out the middleman. Your Raspberry Pi will talk directly to the "Root Servers" (the big bosses of the Internet).
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-8">
            <li><strong>Privacy:</strong> Nobody (not Google, nor your ISP) sees your DNS requests.</li>
            <li><strong>Security:</strong> We use DNSSEC to validate that the answers are authentic.</li>
            <li><strong>Zero Ads:</strong> Pi-hole filters requests before they even leave.</li>
          </ul>
          <hr className="border-white/10 my-8" />
          <h3 className="text-2xl font-bold text-white mb-4">Step 1: Prepare the beast</h3>
          <p className="text-slate-400 mb-4">
            We are on a Raspberry Pi 5. Make sure you have Raspberry Pi OS installed and up to date. Open the terminal (or connect via SSH) and run the classic update:
          </p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>sudo apt update && sudo apt upgrade -y</code>
          </pre>
          <h3 className="text-2xl font-bold text-white mb-4">Step 2: Install Pi-hole</h3>
          <p className="text-slate-400 mb-4">
            The Pi-hole installation is automated. This is the "Network-wide Ad Blocking" that will protect all devices in the house.
          </p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>curl -sSL https://install.pi-hole.net | bash</code>
          </pre>
          <h3 className="text-2xl font-bold text-white mb-4">Step 3: Install Unbound</h3>
          <p className="text-slate-400 mb-4">This is where the magic happens. We install Unbound so we no longer depend on Google's DNS.</p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>sudo apt install unbound</code>
          </pre>
          <p className="text-green-400 font-bold mt-8 p-4 border border-green-500/30 bg-green-500/10 rounded-lg">
            And there you go! Your Pi-hole now queries your local Unbound instance. It's clean, private, and runs perfectly on the Pi 5.
          </p>
        </>
      )
    }
  },
  {
    id: 2,
    title: { fr: "RustDesk : Votre Bureau à Distance Open-Source et Sécurisé", en: "RustDesk: Your Open-Source & Secure Remote Desktop Solution" },
    date: "Dec 15, 2025",
    readTime: "12 min",
    tag: "SysAdmin",
    content: {
      fr: (
        <>
          <p className="lead text-lg text-slate-300 mb-6">
            Dites adieu à TeamViewer et ses limitations. <strong>RustDesk</strong> est une alternative open-source puissante pour le contrôle à distance, auto-hébergée sur votre VPS. Performance, sécurité et contrôle total : c'est ce qu'on aime.
          </p>
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Pourquoi RustDesk ?</h3>
          <p className="text-slate-400 mb-4">
            RustDesk offre une solution complète de bureau à distance avec chiffrement end-to-end, auto-hébergement possible, et une interface simple. Parfait pour gérer vos serveurs, aider vos proches, ou travailler depuis n'importe où.
          </p>
          <h4 className="text-xl font-semibold text-cyan-400 mt-6 mb-2">Avantages clés</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-8">
            <li><strong>Open-Source :</strong> Code source disponible, audit de sécurité possible</li>
            <li><strong>Auto-hébergement :</strong> Contrôlez vos propres serveurs de relais</li>
            <li><strong>Performance :</strong> Écrit en Rust, ultra-rapide et léger</li>
            <li><strong>Multi-plateforme :</strong> Windows, Linux, macOS, Android, iOS</li>
            <li><strong>Chiffrement :</strong> Sécurité renforcée avec chiffrement end-to-end</li>
          </ul>
          <hr className="border-white/10 my-8" />
          <h3 className="text-2xl font-bold text-white mb-4">Installation sur VPS</h3>
          <p className="text-slate-400 mb-4">
            Nous allons déployer RustDesk sur notre VPS OVH avec Docker. Simple, rapide, efficace.
          </p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>{`docker run --name rustdesk-server \\
  -p 21115:21115 -p 21116:21116 -p 21116:21116/udp \\
  -p 21117:21117 -p 21118:21118 -p 21119:21119 \\
  -v rustdesk-data:/data \\
  rustdesk/rustdesk-server:latest`}</code>
          </pre>
          <p className="text-green-400 font-bold mt-8 p-4 border border-green-500/30 bg-green-500/10 rounded-lg">
            Votre serveur RustDesk est maintenant opérationnel ! Configurez vos clients pour pointer vers votre VPS et profitez d'un contrôle à distance sécurisé et performant.
          </p>
        </>
      ),
      en: (
        <>
          <p className="lead text-lg text-slate-300 mb-6">
            Say goodbye to TeamViewer and its limitations. <strong>RustDesk</strong> is a powerful open-source alternative for remote desktop control, self-hosted on your VPS. Performance, security, and total control: that's what we love.
          </p>
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why RustDesk?</h3>
          <p className="text-slate-400 mb-4">
            RustDesk offers a complete remote desktop solution with end-to-end encryption, self-hosting capability, and a simple interface. Perfect for managing your servers, helping your loved ones, or working from anywhere.
          </p>
          <h4 className="text-xl font-semibold text-cyan-400 mt-6 mb-2">Key Advantages</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-8">
            <li><strong>Open-Source:</strong> Source code available, security audit possible</li>
            <li><strong>Self-Hosted:</strong> Control your own relay servers</li>
            <li><strong>Performance:</strong> Written in Rust, ultra-fast and lightweight</li>
            <li><strong>Multi-Platform:</strong> Windows, Linux, macOS, Android, iOS</li>
            <li><strong>Encryption:</strong> Enhanced security with end-to-end encryption</li>
          </ul>
          <hr className="border-white/10 my-8" />
          <h3 className="text-2xl font-bold text-white mb-4">VPS Installation</h3>
          <p className="text-slate-400 mb-4">
            We're going to deploy RustDesk on our OVH VPS with Docker. Simple, fast, efficient.
          </p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>{`docker run --name rustdesk-server \\
  -p 21115:21115 -p 21116:21116 -p 21116:21116/udp \\
  -p 21117:21117 -p 21118:21118 -p 21119:21119 \\
  -v rustdesk-data:/data \\
  rustdesk/rustdesk-server:latest`}</code>
          </pre>
          <p className="text-green-400 font-bold mt-8 p-4 border border-green-500/30 bg-green-500/10 rounded-lg">
            Your RustDesk server is now operational! Configure your clients to point to your VPS and enjoy secure, high-performance remote control.
          </p>
        </>
      )
    }
  }
];

// --- API GEMINI ---
const callGemini = async (prompt: string, systemInstruction: string = "") => {
  if (!apiKey) return "Clé API manquante.";
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, erreur IA.";
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "Erreur communication IA.";
  }
};

// --- WOW ADDITION: TYPING EFFECT COMPONENT ---
const TypingEffect = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 50 + Math.random() * 50); // Random typing speed
      return () => clearTimeout(timeout);
    }
  }, [displayedText, started, text]);

  return <span>{displayedText}</span>;
};

// --- WOW ADDITION: SCROLL PROGRESS BAR ---
const ScrollProgress = () => {
  // Using actual framer motion hook for scroll
  const { scrollYProgress: realScroll } = androidxScrollHook();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-[100]"
      style={{ scaleX: realScroll }}
    />
  );
};
// Helper hook for scroll since useScroll is common
const androidxScrollHook = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const updateScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(window.scrollY / totalHeight);
    }
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);
  return { scrollYProgress: scroll };
}


// --- COMPOSANT : BACKGROUND PARTICULES ---
const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;

    let particles: any[] = [];
    const mouse = { x: 0, y: 0 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#22d3ee';
      ctx.strokeStyle = '#22d3ee';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.globalAlpha = 1 - dist / connectionDistance;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDistance) {
          ctx.globalAlpha = (1 - dist / mouseDistance) * 0.5;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          // Subtle attraction effect
          p.x -= dx * 0.005;
          p.y -= dy * 0.005;
        }
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20" />
  );
};

// --- COMPOSANTS VISUELS ANIMÉS ---
const PlexVisual = () => {
  return (
    <div className="w-full h-full bg-slate-950 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
      <motion.div
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'], }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-amber-700/20 to-slate-900 z-0 bg-[length:200%_200%]"
      />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      <div className="absolute top-1/2 left-0 w-[150%] -translate-y-1/2 -rotate-6 opacity-60 flex gap-4">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="w-24 h-36 rounded-lg bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-xl backdrop-blur-sm flex-shrink-0"
            animate={{ x: [-100, -500] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-2/3 bg-white/5 rounded-t-lg"></div>
            <div className="p-2 gap-1 flex flex-col">
              <div className="h-2 w-3/4 bg-white/20 rounded"></div>
              <div className="h-2 w-1/2 bg-white/10 rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.5)] z-20 relative"
            whileHover={{ scale: 1.1 }}
            animate={{ boxShadow: ['0 0 30px rgba(249,115,22,0.5)', '0 0 60px rgba(249,115,22,0.8)', '0 0 30px rgba(249,115,22,0.5)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Play fill="white" className="text-white ml-1 w-8 h-8" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full border border-orange-500/50"
            animate={{ scale: [1, 2], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/30">
        <Activity className="w-3 h-3 text-orange-400 animate-pulse" />
        <span className="text-[10px] font-mono text-orange-100 font-bold uppercase tracking-wider">Transcoding (HW)</span>
      </div>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-200 rounded-full blur-[1px]"
          initial={{ y: 200, x: Math.random() * 300, opacity: 0 }}
          animate={{ y: -50, opacity: [0, 1, 0] }}
          transition={{ duration: Math.random() * 3 + 4, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
    </div>
  );
};

const PiHoleVisual = () => {
  return (
    <div className="w-full h-full bg-slate-950 relative overflow-hidden group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] bg-gradient-to-r from-transparent via-red-500/10 to-transparent z-0 opacity-30"
        style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)', transformOrigin: 'center' }}
      />
      <div className="relative z-10">
        <motion.div
          animate={{ boxShadow: ['0 0 20px rgba(239,68,68,0.2)', '0 0 50px rgba(239,68,68,0.6)', '0 0 20px rgba(239,68,68,0.2)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-slate-900 border-2 border-red-500 rounded-full flex items-center justify-center relative overflow-hidden shadow-lg shadow-red-900/20"
        >
          <Shield className="text-red-500 w-8 h-8 relative z-10" />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-red-500/30 border-dashed rounded-full"
          />
        </motion.div>
      </div>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_red]"
          initial={{ scale: 1, opacity: 1, x: 150 * Math.cos(i), y: 150 * Math.sin(i) }}
          animate={{ scale: 0, opacity: 0, x: 0, y: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeIn" }}
        />
      ))}
    </div>
  );
};

const RustDeskVisual = () => {
  return (
    <div className="w-full h-full bg-slate-950 relative overflow-hidden group-hover:scale-105 transition-transform duration-700 perspective-1000">
      <div className="absolute inset-0 opacity-20 flex justify-around pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent h-full"
            initial={{ y: -200 }}
            animate={{ y: '100%' }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-40 h-40 rounded-full border border-blue-500/30 border-dashed"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-56 h-56 rounded-full border border-cyan-500/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="relative z-10 bg-slate-900/80 backdrop-blur-md border border-blue-500/50 p-4 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          initial={{ rotateX: 10 }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Monitor className="text-blue-400 w-12 h-12" />
              <motion.div
                className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-slate-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="text-white w-3 h-3" />
              </motion.div>
            </div>
            <div className="flex gap-1 mt-2">
              <div className="w-12 h-1 bg-blue-500/30 rounded overflow-hidden">
                <motion.div
                  className="w-full h-full bg-blue-400"
                  animate={{ x: [-50, 50] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: Math.random() * 400 - 200, y: Math.random() * 200 - 100, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "circIn" }}
          style={{ top: '50%', left: '50%' }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
        </motion.div>
      ))}
    </div>
  );
};


// --- COMPOSANT : LECTEUR D'ARTICLE ---
const ArticleReader = ({ article, lang, onClose }: { article: typeof BLOG_CONTENT[0], lang: 'fr' | 'en', onClose: () => void }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const t = TRANSLATIONS[lang];

  const getArticleTextContext = () => {
    return lang === 'fr' ?
      "Article sur l'installation de Pi-hole et Unbound sur Raspberry Pi 5..."
      : "Article about installing Pi-hole and Unbound on Raspberry Pi 5...";
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);

    const context = getArticleTextContext();
    const systemPrompt = `Tu es un assistant expert. Langue de réponse : ${lang === 'fr' ? 'Français' : 'Anglais'}. Contexte: ${context}`;

    const response = await callGemini(question, systemPrompt);
    setAnswer(response);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={onClose} className="flex items-center gap-2 text-cyan-400 hover:text-white mb-8 transition-colors font-mono">
          <ArrowLeft size={18} /> {lang === 'fr' ? 'Retour' : 'Back'}
        </button>

        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{article.title[lang]}</h1>
          <div className="flex items-center gap-4 text-slate-500 font-mono text-sm mb-12 border-b border-white/10 pb-8">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime} {t.blog.read_time}</span>
            <span>•</span>
            <span className="text-cyan-400">#{article.tag}</span>
          </div>
          <div className="text-slate-300 leading-relaxed">
            {article.content[lang]}
          </div>
        </article>

        <div className="mt-20 border-t border-white/10 pt-12">
          <div className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BrainCircuit className="text-cyan-400" />
              {t.article_qa.title}
            </h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t.article_qa.placeholder}
                className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              />
              <button
                onClick={handleAsk}
                disabled={loading || !question.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>

            {answer && (
              <div className="bg-slate-950 rounded-lg p-4 text-slate-300 border border-white/5 animate-in fade-in">
                <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2 block">Assistant IA</span>
                {answer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPOSANT : INTERACTIVE CV (REPLACES PDF VIEWER) ---
const InteractiveCV = ({ lang, t, onClose }: { lang: 'fr' | 'en', t: any, onClose: () => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Prevent background scrolling on main body when CV is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Restore on close
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col animate-in slide-in-from-bottom-10 duration-500">
      {/* Top Bar */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/80 backdrop-blur z-50 absolute top-0 w-full">
        <button onClick={onClose} className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors font-mono group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> {lang === 'fr' ? 'Retour' : 'Back'}
        </button>
        <h2 className="text-white font-bold hidden md:block tracking-wider uppercase text-sm opacity-50">{t.cv.title}</h2>
        <a
          href="/Images/Kristofer_FAUVETTE_CV.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded hover:from-cyan-500 hover:to-blue-500 transition-all text-sm font-bold shadow-lg hover:shadow-cyan-500/20 active:scale-95"
        >
          <Download size={16} /> {t.cv.download}
        </a>
      </div>

      {/* Progress Bar */}
      <motion.div className="h-1 bg-cyan-500 origin-left z-50 fixed top-[69px] w-full" style={{ scaleX }} />

      {/* Main Content Scrollable */}
      <div ref={scrollRef} className="flex-1 w-full overflow-y-auto overflow-x-hidden bg-slate-950 scroll-smooth pt-20">
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">

          {/* Header Section (Personal Info) */}
          <section className="relative text-center space-y-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block p-1 rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-2xl shadow-cyan-500/20"
            >
              <div className="bg-slate-950 rounded-full p-2">
                <img
                  src="/Images/image.png"
                  alt="Kristofer Fauvette"
                  className="w-32 h-32 rounded-full object-cover border-2 border-white/10"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">Kristofer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">FAUVETTE</span></h1>
              <p className="text-2xl text-slate-300 font-light mb-8 uppercase tracking-widest text-sm">
                {lang === 'fr' ? 'Futur Ingénieur Informatique' : 'Future Computer Engineer'}
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400 font-mono">
                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5 hover:border-cyan-500/50 transition-colors">
                  <MapPin size={16} className="text-red-400" /> 59300 AULNOY-LEZ-VALENCIENNES
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5 hover:border-cyan-500/50 transition-colors">
                  <Mail size={16} className="text-yellow-400" /> {SOCIALS.email}
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5 hover:border-cyan-500/50 transition-colors">
                  <Cake size={16} className="text-pink-400" /> 18 ans
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5 hover:border-cyan-500/50 transition-colors">
                  <Car size={16} className="text-green-400" /> Permis B
                </div>
              </div>
            </motion.div>
          </section>

          {/* Profile Summary */}
          <section className="bg-slate-900/30 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Quote size={100} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="text-cyan-400" /> {lang === 'fr' ? 'Profil' : 'Profile'}
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed max-w-4xl relative z-10">
              {lang === 'fr'
                ? "Étudiant en ingénierie informatique, je cherche un stage pour approfondir mes connaissances et mettre en pratique mes compétences en informatique. Curieux et motivé, j'ai développé mon sens de l'organisation et du travail en équipe à travers des projets et mon bénévolat."
                : "Engineering student in computer science, searching for an internship to deepen my knowledge and apply my skills. Curious and motivated, I have developed my organizational and teamwork skills through projects and volunteering."}
            </p>
          </section>

          {/* Experience Section - Detailed Tiles with Timeline (ACCENTUATED & MOVED UP) */}
          <section>
            <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
              <Briefcase className="text-purple-400" size={32} /> {lang === 'fr' ? 'Expérience Professionnelle' : 'Work Experience'}
            </h3>

            <div className="relative border-l-2 border-white/10 ml-4 space-y-12 pl-8 pb-4">
              {[
                {
                  title: "ISIS - Cayenne",
                  role: "Bénévole (IT Support)",
                  dur: "Jan 2022 - Sept 2024",
                  color: "bg-purple-500",
                  bullets: {
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
                  dur: "Jan 2022 (1 mois)",
                  color: "bg-slate-600",
                  bullets: {
                    fr: [
                      "Stage d'observation de 3ème pour découvrir le monde du travail.",
                      "Contribution à la mise en place de projets spécifiques en fournissant une aide opérationnelle."
                    ],
                    en: [
                      "Observation internship to discover the professional world.",
                      "Contribution to the implementation of specific projects by providing operational support."
                    ]
                  },
                  tags: ["Inventaire", "Maintenance", "Support"]
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[41px] top-8 w-6 h-6 rounded-full ${item.color} border-4 border-slate-950 z-10 group-hover:scale-110 transition-transform`}></div>

                  {/* Detailed Tile */}
                  <div className="bg-slate-900 border border-white/5 p-8 rounded-2xl hover:bg-slate-800 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-colors"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 relative z-10">
                      <div>
                        <h4 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{item.title}</h4>
                        <p className="text-purple-400 font-semibold text-lg">{item.role}</p>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 mt-2 md:mt-0 font-mono text-sm bg-white/5 px-3 py-1 rounded-full">
                        <Calendar size={14} /> {item.dur}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6 relative z-10">
                      {(lang === 'fr' ? item.bullets.fr : item.bullets.en).map((bullet, k) => (
                        <li key={k} className="flex items-start gap-3 text-slate-300">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 relative z-10">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-950 border border-white/10 rounded-md text-sm text-slate-400 font-mono hover:text-white hover:border-purple-500/30 transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education Timeline (MOVED UP) */}
          <section>
            <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
              <GraduationCap className="text-cyan-400" size={32} /> {lang === 'fr' ? 'Formation' : 'Education'}
            </h3>
            <div className="relative border-l-2 border-white/10 ml-4 space-y-12 pl-8 pb-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-cyan-600 border-4 border-slate-950 shadow-[0_0_15px_rgba(8,145,178,0.5)]"></div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <span className="text-cyan-400 font-mono text-sm block mb-1">Sept 2025 - Present</span>
                  <h4 className="text-xl font-bold text-white">INSA Hauts-de-France</h4>
                  <p className="text-slate-400 mb-2">Diplôme d'ingénieur Classe préparatoire</p>
                  <p className="text-slate-500 text-sm italic">Valenciennes</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-slate-700 border-4 border-slate-950"></div>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                  <span className="text-slate-500 font-mono text-sm block mb-1">Sept 2022 - Juin 2025</span>
                  <h4 className="text-xl font-bold text-white">Lycée Polyvalent Edmard LAMA</h4>
                  <p className="text-slate-400 mb-2">Baccalauréat Sciences</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold mt-2">
                    <Award size={12} /> Mention Bien
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SECTION 1: Competencies (UPDATED) */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Cpu className="text-blue-400" /> {lang === 'fr' ? 'Compétences' : 'Competencies'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { cat: "Systèmes", items: "Linux, Windows, Proxmox, TrueNAS, Synology DSM" },
                { cat: "Réseaux", items: "NAS, VPN, DNS, Cisco, WireGuard" },
                { cat: lang === 'fr' ? "Développement" : "Development", items: "Python, C, SQL, Git/GitHub" },
                { cat: "Support & Maintenance", items: lang === 'fr' ? "Installation, Dépannage, Veille Technologique" : "Installation, Troubleshooting, Tech Watch" }
              ].map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-slate-900/50 p-6 rounded-xl border border-white/10 hover:border-blue-400/30 transition-colors"
                >
                  <h4 className="text-blue-400 font-bold mb-3 uppercase text-xs tracking-wider border-b border-white/5 pb-2">{skill.cat}</h4>
                  <p className="text-slate-300 font-medium leading-relaxed">{skill.items.split(', ').map(item => (
                    <span key={item} className="inline-block bg-white/5 rounded px-2 py-0.5 mr-2 mb-2 text-sm">{item}</span>
                  ))}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SECTION 2: Qualities & Interests & Hobbies (GROUPED BELOW EDUCATION) */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Qualities */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Heart className="text-pink-400" /> {lang === 'fr' ? 'Qualités' : 'Qualities'}
              </h3>
              <div className="flex flex-wrap gap-4">
                {['Motivation', 'Curiosité intrinsèque', 'Autonomie', 'Rigueur'].map((q, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="px-6 py-3 bg-slate-900 border border-white/10 rounded-full text-slate-300 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-all cursor-default"
                  >
                    {q}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Interests */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="text-yellow-400" /> {lang === 'fr' ? "Centres d'intérêt" : 'Interests'}
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Informatique & Réseaux", color: "bg-cyan-500" },
                  { label: "Programmation", color: "bg-green-500" },
                  { label: "Nouvelles Technologies", color: "bg-purple-500" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-slate-900/50 p-4 rounded-xl border border-white/10 flex items-center gap-3"
                  >
                    <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                    <span className="text-slate-200 font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Hobbies Section */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Gamepad2 className="text-purple-400" /> {lang === 'fr' ? 'Hobbies' : 'Hobbies'}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 hover:border-red-500/50 transition-colors group flex items-center gap-6"
              >
                <div className="p-4 bg-red-500/10 rounded-full text-red-500 group-hover:scale-110 transition-transform">
                  <Youtube size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Youtube Creator</h4>
                  <p className="text-slate-400 text-sm">Tech Reviews & Tutorials</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors group flex items-center gap-6"
              >
                <div className="p-4 bg-cyan-500/10 rounded-full text-cyan-500 group-hover:scale-110 transition-transform">
                  <PenTool size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Blog Writing</h4>
                  <p className="text-slate-400 text-sm">Tech Articles & Documentation</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Project Mission Log */}
          <section>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Terminal className="text-green-400" size={32} /> {lang === 'fr' ? 'Projets' : 'Projects'}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Self-Host Server", type: "Infrastructure", tool: "Docker", desc: "Administration d'un serveur personnel." },
                { name: "Mail Server", type: "Network", tool: "Postfix/Dovecot", desc: "Serveur mail auto-hébergé complet." },
                { name: "RustDesk", type: "Remote Access", tool: "Self-Hosted", desc: "Système d'accès à distance sécurisé." },
                { name: "Ad-Blocker DNS", type: "Network", tool: "Pi-hole + Unbound", desc: "Gestion DNS et filtrage publicitaire." },
                { name: "Plex Media", type: "Multimedia", tool: "Plex", desc: "Serveur multimédia avec accès distant." },
                { name: "Portfolio", type: "Web Dev", tool: "React", desc: "Site web portfolio-blog (kwol.cloud)." },
                { name: "Blackjack", type: "Game Dev", tool: "Python", desc: "Jeu de blackjack complet en Python." },
              ].map((proj, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-slate-900/50 border border-white/5 p-6 rounded-xl hover:border-green-500/50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <Code2 className="text-slate-600 group-hover:text-green-400 transition-colors" size={20} />
                    <span className="text-[10px] uppercase font-bold text-slate-500 border border-white/5 px-2 py-0.5 rounded">{proj.tool}</span>
                  </div>
                  <h4 className="text-white font-bold mb-1">{proj.name}</h4>
                  <p className="text-slate-400 text-sm">{proj.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Languages Section */}
          <section>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Languages className="text-pink-400" size={32} /> {lang === 'fr' ? 'Langues' : 'Languages'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-white text-lg">Français</span>
                  <span className="text-sm text-slate-500">Langue maternelle</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(n => <div key={n} className="w-2 h-8 bg-cyan-500 rounded-sm"></div>)}
                </div>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-white text-lg">Anglais</span>
                  <span className="text-sm text-slate-500">Intermédiaire supérieur (B2)</span>
                  <span className="text-xs text-cyan-400 block mt-1">2 semaines échange USA + Certifié Cambridge</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(n => <div key={n} className="w-2 h-8 bg-cyan-500 rounded-sm"></div>)}
                  <div className="w-2 h-8 bg-slate-700 rounded-sm"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Quote */}
          <div className="text-center py-12 border-t border-white/5">
            <p className="text-lg text-slate-500 italic">"Learning never exhausts the mind."</p>
            <p className="text-sm text-slate-600 mt-2">— Leonardo da Vinci</p>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- COMPOSANT : MODALE CERTIFICATION (REDESIGNED FOR VISIBILITY) ---
const CertificationModal = ({ cert, t, lang, onClose }: { cert: typeof CERTIFICATIONS[0], t: any, lang: 'fr' | 'en', onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-6xl h-[90vh] relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white/10 rounded-full"><Award size={16} className="text-yellow-400" /></div>
            <h3 className="font-bold text-white">{cert.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Image Container - Expanded to 60% Width for better visibility */}
          <div className="md:w-7/12 bg-slate-950/50 p-6 flex items-center justify-center relative border-r border-white/5 group">
            {/* Subtle Pattern Background */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>

            {/* Zoomable Image */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={cert.certImage}
                alt="Certificate"
                className="max-w-full max-h-full object-contain rounded shadow-2xl transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs text-slate-300 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Hover to Zoom
            </div>
          </div>

          {/* Content Container - Condensed to 40% Width */}
          <div className="md:w-5/12 p-8 overflow-y-auto bg-slate-900">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center p-2 border border-white/10 shrink-0">
                <img src={cert.badge} alt="Badge" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">{cert.title}</h2>
                <p className="text-slate-400 text-sm font-mono mt-1">{cert.issuer}</p>
              </div>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono mb-6">
              <CheckCircle size={12} className="inline mr-1" /> Verified Credential
            </div>

            <p className="text-slate-300 leading-relaxed mb-8 text-sm border-l-2 border-white/10 pl-4">
              {cert.description[lang]}
            </p>

            <div className="mb-8">
              <h4 className="text-cyan-400 font-bold mb-3 text-xs uppercase tracking-wider flex items-center gap-2">
                <Zap size={14} /> {t.certs.modal.skills}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-slate-800 border border-white/10 rounded text-xs text-slate-400 font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={cert.verificationLink}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-white text-slate-950 py-3 rounded-lg font-bold hover:bg-cyan-50 transition-colors"
            >
              <ExternalLink size={16} /> {t.certs.modal.verify}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- WOW ADDITION: 3D TILT CARD ---
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-linear ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
      {/* Glare Effect */}
      <motion.div
        style={{ opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.4]), rotate: 45 }}
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent pointer-events-none z-20"
      />
    </motion.div>
  );
};


// --- GLOBAL CHATBOT COMPONENT ---
const Assistant = ({ lang, t }: { lang: 'fr' | 'en', t: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'ai', text: t.assistant.welcome }]);
  }, [lang, t]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsTyping(true);

    const systemPrompt = `Tu es l'assistant de Kristofer. Réponds en ${lang === 'fr' ? 'Français' : 'Anglais'}.`;
    const response = await callGemini(userMsg, systemPrompt);

    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsTyping(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 p-4 bg-cyan-600 rounded-full shadow-lg hover:scale-110 transition-transform text-white">
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-slate-950 border-b border-white/10 flex items-center gap-3">
            <Bot className="text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Assistant</h3>
          </div>
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200'}`}>{msg.text}</div>
              </div>
            ))}
            {isTyping && <div className="text-slate-500 text-xs ml-4">...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t.assistant.placeholder} className="flex-1 bg-slate-800 rounded-full px-4 text-sm text-white focus:outline-none" />
            <button onClick={handleSend} className="text-cyan-400"><Send size={18} /></button>
          </div>
        </div>
      )}
    </>
  );
};

// --- NOUVELLE SECTION CERTIFICATIONS (TRUE 3D HOLOGRAPHIC) ---
const CertificationsSection = ({ t, lang }: { t: any, lang: 'fr' | 'en' }) => {
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATIONS[0] | null>(null);

  return (
    <section id="certifications" className="py-24 bg-slate-900/30 border-y border-white/5 relative overflow-hidden">
      {/* Dynamic Digital Rain Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2322d3ee\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Award className="text-yellow-400" /> {t.certs.title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
            <p className="text-slate-400 mt-4 max-w-xl">{t.certs.subtitle}</p>
          </div>
          <a href={SOCIALS.credlyProfile} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 bg-slate-900/50">
            <ExternalLink size={16} /> {t.certs.more}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 perspective-1000">
          {CERTIFICATIONS.map((cert) => (
            <TiltCard key={cert.id}>
              <div
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer h-80 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 border border-white/10 flex flex-col items-center justify-between p-6 shadow-2xl relative overflow-hidden"
              >
                {/* Internal Border Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${cert.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>

                {/* Floating Badge (Parallax Z-Index) */}
                <div className="relative z-10 w-32 h-32 flex items-center justify-center drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] transform translate-z-20 group-hover:scale-110 transition-transform duration-300">
                  <img src={cert.badge} alt={cert.title} className="w-full h-full object-contain" />
                </div>

                <div className="relative z-10 text-center w-full mt-4 transform translate-z-10">
                  <h3 className="text-sm font-bold text-white mb-1 leading-tight group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-mono mt-1 pt-2 inline-block px-2">
                    {cert.issuer}
                  </p>
                </div>

                {/* Cyberpunk Decor */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20"></div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificationModal cert={selectedCert} t={t} lang={lang} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- NOUVELLE SECTION TECH STACK (INTERACTIVE SYSTEM KERNEL) ---
const TechStackSection = ({ t }: { t: any }) => {
  const [activeTech, setActiveTech] = useState<typeof TECH_STACK[0] | null>(null);

  const handleTechClick = (tech: typeof TECH_STACK[0]) => {
    if (activeTech?.id === tech.id) {
      setActiveTech(null);
    } else {
      setActiveTech(tech);
    }
  };

  return (
    <section className="py-20 bg-slate-950 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-mono font-bold text-slate-200 mb-2 flex items-center justify-center gap-2">
            <Terminal size={20} className="text-green-500 animate-pulse" /> {t.stack.title}
          </h2>
          <p className="text-slate-500 text-sm font-mono">
            {t.stack.subtitle} <span className="text-green-500">[{TECH_STACK.length} OK]</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TECH_STACK.map((tech) => (
            <motion.div
              key={tech.id}
              onClick={() => handleTechClick(tech)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`cursor-pointer relative p-4 rounded-xl border transition-all duration-300 ${activeTech?.id === tech.id ? 'bg-slate-800 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'bg-slate-900/50 border-white/10 hover:border-white/20'}`}
            >
              <div className="flex flex-col items-center gap-3">
                <tech.icon size={28} className={activeTech?.id === tech.id ? 'text-cyan-400' : 'text-slate-400'} />
                <span className={`text-xs font-bold font-mono text-center ${activeTech?.id === tech.id ? 'text-white' : 'text-slate-400'}`}>
                  {tech.name}
                </span>
                {tech.level !== 'Active' && (
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: tech.level }}
                      viewport={{ once: true }}
                      className="h-full bg-cyan-500/50"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode='wait'>
          {activeTech && (
            <motion.div
              key={activeTech.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-6 relative max-w-3xl mx-auto">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                      <activeTech.icon className="text-cyan-400" /> {activeTech.name}
                    </h3>
                    <p className="text-slate-400 text-sm font-mono mb-4">{activeTech.type}</p>
                    <p className="text-slate-300">{activeTech.desc}</p>
                    {activeTech.id === 'ovh-vps' && (
                      <a
                        href="https://www.ovhcloud.com/fr/vps/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-bold"
                      >
                        <ExternalLink size={14} /> View OVH VPS Plans
                      </a>
                    )}
                    {activeTech.id === 'youtube' && (
                      <a
                        href="https://www.youtube.com/@KrisRetroLab"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-red-400 hover:text-red-300 transition-colors text-sm font-bold"
                      >
                        <Youtube size={14} /> Visit YouTube Channel
                      </a>
                    )}
                  </div>
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-slate-500">KERNEL_PID</span>
                      <span className="text-white">0x{activeTech.id.toUpperCase().replace(/-/g, '')}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-slate-500">{t.stack.status}</span>
                      <span className="text-green-400 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> {activeTech.status}</span>
                    </div>
                    {activeTech.level !== 'Active' && (
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-slate-500">{t.stack.level}</span>
                        <span className="text-cyan-400">{activeTech.level}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- NOUVELLE SECTION: LIVE HOMELAB DASHBOARD (PROPOSITION 2) ---
const HomelabDashboard = ({ t }: { t: any }) => {
  const [cpuLoads, setCpuLoads] = useState<{ [key: string]: string }>({
    'Nextcloud': getCPULoad('Nextcloud'),
    'Mailserver': getCPULoad('Mailserver'),
    'RustDesk': getCPULoad('RustDesk'),
    'Speedtest': getCPULoad('Speedtest')
  });

  // Update CPU loads every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoads({
        'Nextcloud': getCPULoad('Nextcloud'),
        'Mailserver': getCPULoad('Mailserver'),
        'RustDesk': getCPULoad('RustDesk'),
        'Speedtest': getCPULoad('Speedtest')
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // --- FAKE DATA START (Replace with API calls) ---
  // Suggestions for real data:
  // 1. VPS Services: Use a simple API endpoint on your VPS (Node/Python) that runs 'docker ps' or 'docker stats'
  // 2. Uptime/Ping: Use Uptime Kuma API if you install it, or a custom ping script.
  // 3. Pi-hole: Pi-hole has a built-in API at http://pi.hole/admin/api.php
  // Generate dynamic CPU loads
  const VPS_SERVICES = [
    { name: 'Nextcloud', status: 'online', uptime: '99.9%', cpu: cpuLoads['Nextcloud'], icon: Cloud, ip: 'Docker Internal' },
    { name: 'Mailserver', status: 'online', uptime: '99.9%', cpu: cpuLoads['Mailserver'], icon: Mail, ip: 'Docker Internal' },
    { name: 'RustDesk', status: 'online', uptime: '99.5%', cpu: cpuLoads['RustDesk'], icon: Monitor, ip: 'Docker Internal' },
    { name: 'Speedtest', status: 'online', uptime: '100%', cpu: cpuLoads['Speedtest'], icon: Zap, ip: 'speedtest.kwol.cloud', link: 'https://speedtest.kwol.cloud/' }
  ];

  // Generate dynamic queries
  const HOME_SERVICES = [
    { name: 'Pi-hole DNS', status: 'online', queries: getPiHoleQueries(), blocked: '12%', icon: Shield },
    { name: 'Unbound', status: 'online', latency: '15ms', secure: true, icon: Globe },
    { name: 'Prometheus', status: 'online', metrics: '1.2k', icon: Activity },
    { name: 'Grafana', status: 'online', dashboards: '8', icon: Layers },
  ];
  // --- FAKE DATA END ---

  return (
    <section className="py-24 bg-slate-900/30 border-y border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            <Server className="text-cyan-400" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{t.homelab.title}</h2>
            <p className="text-slate-400">{t.homelab.subtitle}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* VPS RACK */}
          <div className="bg-slate-950/50 rounded-2xl border border-white/10 p-6 backdrop-blur-md relative overflow-hidden group">
            {/* Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-50"><HardDrive className="text-slate-700" size={100} /></div>

            <h3 className="text-xl font-mono font-bold text-white mb-6 flex items-center gap-2 relative z-10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> VPS (Ubuntu)
            </h3>

            <div className="space-y-4 relative z-10">
              {VPS_SERVICES.map((srv) => (
                <div key={srv.name} className="bg-slate-900/80 border border-white/5 p-4 rounded-lg flex items-center justify-between hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <srv.icon className="text-slate-400" size={20} />
                    <div>
                      <h4 className="font-bold text-white text-sm">{srv.name}</h4>
                      <div className="text-xs text-slate-500 font-mono flex gap-2">
                        <span>{t.homelab.uptime}: {srv.uptime}</span>
                        <span className="text-slate-600">|</span>
                        <span>{t.homelab.cpu}: {srv.cpu}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 uppercase tracking-wider">
                      {srv.status}
                    </span>
                    {srv.link && (
                      <a href={srv.link} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOME RACK */}
          <div className="bg-slate-950/50 rounded-2xl border border-white/10 p-6 backdrop-blur-md relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-50"><Wifi className="text-slate-700" size={100} /></div>

            <h3 className="text-xl font-mono font-bold text-white mb-6 flex items-center gap-2 relative z-10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> HOME_LAB (Raspberry Pi 5)
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 relative z-10">
              {HOME_SERVICES.map((srv) => (
                <div key={srv.name} className="bg-slate-900/80 border border-white/5 p-4 rounded-lg flex flex-col gap-3 hover:border-purple-500/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <srv.icon className="text-purple-400" size={24} />
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{srv.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {srv.queries && `Queries: ${srv.queries}`}
                      {srv.latency && `Latency: ${srv.latency}`}
                      {srv.metrics && `Metrics: ${srv.metrics}`}
                      {srv.dashboards && `Dashboards: ${srv.dashboards}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- NEW LOGO COMPONENT (PHYSICS BASED) ---
// --- NEW LOGO COMPONENT (EXPANSIVE KWF) ---
const ExpansiveLogo = () => {
  const LetterGroup = ({ initial, full }: { initial: string, full: string }) => {
    return (
      <motion.div
        className="flex items-center cursor-default bg-slate-900/50 hover:bg-slate-800/80 px-1 rounded-lg transition-colors border border-transparent hover:border-white/5"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-sm filter">
          {initial}
        </span>
        <motion.div
          variants={{
            rest: { width: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
            hover: { width: "auto", opacity: 1, transition: { type: 'spring', bounce: 0.3, duration: 0.5 } }
          }}
          className="overflow-hidden whitespace-nowrap"
        >
          <span className="text-xl font-bold text-slate-300 ml-0.5 tracking-tight pr-2">
            {full}
          </span>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="flex items-center gap-1">
      <LetterGroup initial="K" full="ristofer" />
      <LetterGroup initial="W" full="illiam" />
      <LetterGroup initial="F" full="auvette" />
    </div>
  );
};

// --- NAV LINK COMPONENT ---
const NavLink = ({ href, children, onClick }: { href?: string, children: React.ReactNode, onClick?: () => void }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for the magnetic effect
  const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Gradient for the specific spotlight
  const gradient = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.4), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();

    // Magnetic pull calculation
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Move the button a fraction of the distance (magnetic feel)
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);

    // Spotlight calculation relative to element
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(-1000); // Move spotlight out
    mouseY.set(-1000);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative px-4 py-2 text-sm font-medium text-slate-300 transition-colors group cursor-pointer block"
    >
      {/* Background Spotlight */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: gradient }}
      />

      {/* Subtle border ring that lights up */}
      <span className="absolute inset-0 rounded-full ring-1 ring-white/5 group-hover:ring-white/20 transition-all duration-300" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">{children}</span>
    </motion.a>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  // Fix Scroll Restoration on Reload
  // Fix Scroll Restoration on Reload (Use LayoutEffect for earlier execution)
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to top immediately
    window.scrollTo(0, 0);

    // Double check slightly later for layout shifts
    const timer = setTimeout(() => window.scrollTo(0, 0), 10);
    return () => clearTimeout(timer);
  }, []);

  const [lang, setLang] = useState<'fr' | 'en'>('en');
  const [readingArticle, setReadingArticle] = useState<number | null>(null);
  const [viewingResume, setViewingResume] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const t = TRANSLATIONS[lang];
  const activeArticleData = BLOG_CONTENT.find(a => a.id === readingArticle);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
      if (response.ok) { setContactStatus('success'); form.reset(); }
      else { setContactStatus('error'); }
    } catch (error) { setContactStatus('error'); }
  };

  const PROJECTS = [
    {
      id: 1,
      title: "Plex Server",
      cat: "Self-Hosting",
      tech: ["Docker", "Linux"],
      desc: "Media server with HW transcoding.",
      Visual: PlexVisual,
      action: { type: 'link', url: 'https://github.com/plexinc/pms-docker' }
    },
    {
      id: 2,
      title: "Pi-hole DNS",
      cat: "Cybersecurity",
      tech: ["DNSSEC", "Unbound"],
      desc: "Network-wide ad blocking.",
      Visual: PiHoleVisual,
      action: { type: 'internal', articleId: 1 }
    },
    {
      id: 3,
      title: "RustDesk",
      cat: "SysAdmin",
      tech: ["VPS", "Encrypted"],
      desc: "Secure remote desktop infrastructure.",
      Visual: RustDeskVisual,
      action: { type: 'link', url: 'https://rustdesk.com/docs/en/self-host/' }
    }
  ];

  const handleProjectClick = (project: typeof PROJECTS[0]) => {
    if (project.action.type === 'link') {
      window.open(project.action.url, '_blank');
    } else if (project.action.type === 'internal') {
      setReadingArticle(project.action.articleId!);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      <ScrollProgress />
      <ParticleNetwork />

      {activeArticleData && (
        <ArticleReader
          article={activeArticleData}
          lang={lang}
          onClose={() => setReadingArticle(null)}
        />
      )}

      {viewingResume && (
        <InteractiveCV lang={lang} t={t} onClose={() => setViewingResume(false)} />
      )}

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <ExpansiveLogo />



          <div className="hidden md:flex flex-1 justify-center items-center gap-2">
            <NavLink href="#about">{t.nav.about}</NavLink>
            <NavLink href="#certifications">{t.nav.certs}</NavLink>
            <NavLink href="#projects">{t.nav.projects}</NavLink>
            <NavLink href="#blog">{t.nav.blog}</NavLink>
            <NavLink onClick={() => setViewingResume(true)}>
              <span className="flex items-center gap-2"><FileText size={14} /> {t.nav.cv}</span>
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 border border-white/10"
            >
              {t.nav.contact}
            </a>

            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-cyan-400 hover:bg-slate-700 transition-all shadow-lg"
            >
              <span className="text-xs font-bold font-mono">{lang === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </div>

          <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden text-white">
            {isNavOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isNavOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 p-6 md:hidden flex flex-col gap-4">
            <a href="#about" className="text-slate-300 block py-2">{t.nav.about}</a>
            <a href="#certifications" className="text-slate-300 block py-2">{t.nav.certs}</a>
            <a href="#projects" className="text-slate-300 block py-2">{t.nav.projects}</a>
            <a href="#blog" className="text-slate-300 block py-2">{t.nav.blog}</a>
            <button onClick={() => { setViewingResume(true); setIsNavOpen(false); }} className="text-slate-300 block py-2 text-left">{t.nav.cv}</button>
            <a href="#contact" className="text-red-400 block py-2 font-bold">{t.nav.contact}</a>
            <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="text-cyan-400 py-2 flex items-center gap-2">
              <Languages size={14} /> {t.nav.lang}
            </button>
          </div>
        )}
      </nav>

      <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              {t.hero.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t.hero.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                <TypingEffect text={t.hero.title2} delay={500} />
              </span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">{t.hero.desc}</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#projects" className="group relative px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:scale-105 flex items-center gap-2 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm"></div>
                <span className="relative flex items-center gap-2">{t.hero.btn_work} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              </a>

              <a href="#blog" className="group px-8 py-3 bg-slate-900/50 backdrop-blur-md border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 hover:border-cyan-500/50 transition-all flex items-center gap-2 shadow-lg hover:shadow-cyan-500/10 hover:scale-105">
                {t.nav.blog} <ExternalLink size={18} className="group-hover:rotate-45 transition-transform text-cyan-400" />
              </a>

              <button onClick={() => setViewingResume(true)} className="group px-8 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all font-mono flex items-center gap-2 hover:scale-105">
                {t.hero.btn_cv} <Download size={18} className="group-hover:translate-y-1 transition-transform opacity-50 group-hover:opacity-100" />
              </button>
            </div>
          </div>

          <div className="relative hidden md:flex justify-center items-center h-[500px]">
            <div className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10 w-full max-w-sm bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-purple-400">class <span className="text-yellow-300">Engineer</span> &#123;</div>
                <div className="pl-4 text-cyan-400">this.name = "Kristofer";</div>
                <div className="pl-4 text-cyan-400">this.stack = ["Cyber", "SysAdmin"];</div>
                <div className="pl-4 text-slate-300">deploy() &#123; return "Ready"; &#125;</div>
                <div className="text-purple-400">&#125;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION (Updated) */}
      <TechStackSection t={t} />

      {/* LIVE HOMELAB DASHBOARD (NEW SECTION) */}
      <HomelabDashboard t={t} />

      {/* CERTIFICATIONS SECTION (Updated 3D) */}
      <CertificationsSection t={t} lang={lang} />

      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6 z-10 relative">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{t.projects.title}</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded"></div>
            </div>
            <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm">
              {t.projects.link} <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="group relative bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-2 flex flex-col cursor-pointer"
              >
                <div className="h-48 w-full relative">
                  <project.Visual />
                  <div className="absolute bottom-4 left-4 z-10"><span className="px-3 py-1 bg-black/50 backdrop-blur rounded text-xs font-bold text-white uppercase">{project.cat}</span></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    {project.title}
                    {project.action.type === 'link' && <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-400" />}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{project.desc}</p>
                  <div className="flex gap-2">{project.tech.map(te => <span key={te} className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-950 rounded border border-white/5">{te}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Sparkles className="text-yellow-400" /> {t.blog.title}
          </h2>

          <div className="grid gap-6">
            {BLOG_CONTENT.map((article) => (
              <div
                key={article.id}
                onClick={() => setReadingArticle(article.id)}
                className="group flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl border border-white/5 hover:bg-white/5 transition-all cursor-pointer bg-slate-950/50"
              >
                <div className="w-full md:w-32 text-slate-500 font-mono text-sm md:text-right">
                  <div>{article.date}</div>
                  <div className="text-cyan-500/60 mt-1">{article.readTime}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {article.title[lang]}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">#{article.tag}</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-cyan-500 group-hover:text-cyan-500 transition-all">
                    <BookOpen size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 border-t border-white/10 bg-slate-900/30">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">{t.contact.title}</h2>
            <p className="text-slate-400 mb-8">{t.contact.desc}</p>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${SOCIALS.email}`} className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors"><Mail size={20} /> {SOCIALS.email}</a>
              <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors"><Linkedin size={20} /> LinkedIn</a>
              <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"><Github size={20} /> GitHub</a>
            </div>
          </div>

          <div className="bg-slate-950 border border-white/5 p-8 rounded-2xl">
            {contactStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-white">{t.contact.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">{t.contact.form_email}</label>
                  <input type="email" name="email" required className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">{t.contact.form_msg}</label>
                  <textarea name="message" required rows={4} className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 resize-none"></textarea>
                </div>

                {contactStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded">
                    <AlertCircle size={16} /> {t.contact.error}
                  </div>
                )}

                <button type="submit" disabled={contactStatus === 'submitting'} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg flex justify-center gap-2">
                  {contactStatus === 'submitting' ? <Loader2 className="animate-spin" /> : <><Send size={18} /> {t.contact.form_btn}</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Assistant lang={lang} t={t} />
    </div>
  );
}