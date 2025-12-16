import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Database,
  Layers,
  Sparkles,
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
  Download
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

// --- DATA: CERTIFICATIONS ---
const CERTIFICATIONS = [
  {
    id: "net-tech",
    title: "Network Technician Career Path",
    issuer: "Cisco",
    badge: "/Images/Badges/network-technician-career-path.png",
    certImage: "/Images/Course_completion_cert/NetworkTechnicianCareerPathUpdate20251129-33-qj43gq_page-0001.jpg",
    description: "Cisco verifies the earner of this badge successfully completed the Networking Technician career path and achieved this student level credential. Earner has knowledge of networking fundamentals, how devices communicate, cabling, network addressing and services, basics of configuring Cisco devices, troubleshooting and support of endpoints, networks, and users including diagnostics and documentation as a member of a help desk team, and basic wireless. Participated in up to 50 practice activities.",
    skills: ["Application Layer Services", "Binary Systems", "Cisco Devices", "Cisco IOS", "Cisco Routers", "Cisco Switches", "Cloud Services", "Copper and Fiber Cabling", "Documentation", "Endpoint Devices", "Ethernet", "Help Desk", "Hierarchical Network Design", "IPv4 Addressing", "IPv6 Addressing", "Network Layer Protocols", "Network Media", "Network Troubleshooting", "NetWork Types", "Protocols Standards", "Support", "Transport Layer Protocols", "Troubleshooting", "User Support", "Wireless Access"],
    verificationLink: "https://www.credly.com/badges/463abac1-c0fe-467b-bc02-6dc2ce9a971c/public_url",
    color: "border-blue-500/30 bg-blue-500/10 text-blue-400"
  },
  {
    id: "net-essentials",
    title: "Networking Essentials",
    issuer: "Cisco",
    badge: "/Images/Badges/networking-essentials-badge.png",
    certImage: "/Images/Course_completion_cert/cert-networking-essentials-FULL.png",
    description: "Cisco verifies the earner of this badge successfully completed the Networking Essentials course and achieved this student level credential. Earner has knowledge of fundamentals of networking, how devices communicate, network addressing and services, how to build a home or small office network and configure basic security, basics of configuring Cisco devices, and the basics of testing and troubleshooting network problems. Participated in up to 19 labs and 24 Cisco Packet Tracer activities.",
    skills: ["Basic Network Security", "DHCP", "Ethernet Networks", "Integrated Wireless Router", "IPv4 And IPv6 Fundamentals", "Networking Concepts", "SOHO Networks", "Standards And Protocols", "Wireless PC"],
    verificationLink: "https://www.credly.com/badges/a334dfd4-8e55-4099-a8f5-1a5913029acf/linked_in_profile",
    color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
  },
  {
    id: "net-basics",
    title: "Networking Basics",
    issuer: "Cisco",
    badge: "/Images/Badges/networking-basics-badge.png",
    certImage: "/Images/Course_completion_cert/cert-networking-basics-FULL.png",
    description: "Cisco verifies the earner of this badge successfully completed the Networking Basics course and achieved this student level credential. Earner has knowledge of the types of networks, how they work, how devices send and receive data, the types of network cabling, how IP addresses find information on the Internet, how transport and applications operate, and has practiced building a home wireless network. Participated in up to 13 Cisco Packet Tracer activities.",
    skills: ["Application Layer Services", "IPv4 Addresses", "Network Media", "NetWork Types", "Protocols Standards", "Wireless Access"],
    verificationLink: "https://www.credly.com/badges/45d4f330-cc09-4ce8-9cb5-b0670eef3add/linked_in_profile",
    color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
  },
  {
    id: "cloud-infra",
    title: "Introduction to Cloud Infrastructures",
    issuer: "Microsoft",
    badge: "/Images/Badges/Microsoft_logo.png",
    certImage: "/Images/Course_completion_cert/cert-cloud-infra-FULL.png",
    description: "New to the cloud? Introduction to Cloud Infrastructure is a three-part series that teaches you basic cloud concepts, provides a streamlined overview of many Azure services, and guides you with hands-on exercises to deploy your first services for free. Complete all of the learning paths in the series if you're preparing for Exam AZ-900: Microsoft Azure Fundamentals.",
    skills: ["Cloud Concepts", "Infrastructure", "Architecture", "Cloud computing", "Technical infrastructure"],
    verificationLink: "https://learn.microsoft.com/en-us/users/kristoferfauvette-9446/achievements/pgsskld4?ref=https%3A%2F%2Fwww.linkedin.com%2F",
    color: "border-blue-600/30 bg-blue-600/10 text-blue-300"
  },
  {
    id: "gen-ai",
    title: "Introduction to Generative AI",
    issuer: "Google",
    badge: "/Images/Badges/Google__G__logo.png",
    certImage: "/Images/Course_completion_cert/cert-generative-ai-introduction.png",
    description: "Il s'agit d'un micro-cours d'introduction visant à expliquer ce qu'est l'IA générative, comment elle est utilisée et en quoi elle diffère des méthodes traditionnelles d'apprentissage automatique. Il couvre également les outils Google pour vous aider à développer vos propres applications d'IA générative.",
    skills: ["IA Générative", "LLM"],
    verificationLink: "https://www.skills.google/public_profiles/ec684137-9170-4a05-b02f-0d74407ba2ab/badges/19919725?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    color: "border-red-500/30 bg-red-500/10 text-red-400"
  }
];

// --- TRADUCTIONS ---
const TRANSLATIONS = {
  fr: {
    nav: { about: "À Propos", certs: "Certifs", projects: "Projets", blog: "Blog", contact: "Contact", cv: "Mon CV", lang: "EN" },
    hero: {
      badge: "ÉTUDIANT INSA HAUTS-DE-FRANCE",
      title1: "Ingénierie",
      title2: "Créative & Code",
      desc: "Bonjour, je suis Kristofer FAUVETTE. Étudiant en 1ère année à l’INSA Hauts-de-France, je suis depuis toujours passioné d'informatique, les réseaux et la 'bidouille' technique. Je me dirige vers une carrière d'ingénieur. Ce site centralise mon parcours : mes Projets (NAS, serveurs), mes Certifications (Cisco) et mon Blog. N’hésitez pas à m'écrire !",
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
      title1: "Engineering",
      title2: "Creative & Code",
      desc: "Hello, I am Kristofer FAUVETTE. 1st year student at INSA Hauts-de-France, I have always been passionate about IT, networks and technical tinkering. I am heading towards an engineering career. This site centralizes my background: my Projects (NAS, servers), my Certifications (Cisco) and my Blog. Feel free to write to me!",
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

// --- CONTENU DU BLOG (unchanged) ---
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
            <br/><br/>
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
            <br/><br/>
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
const ArticleReader = ({ article, lang, onClose }: { article: typeof BLOG_CONTENT[0], lang: 'fr'|'en', onClose: () => void }) => {
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

// --- COMPOSANT : VISUALISEUR CV ---
const ResumeViewer = ({ lang, t, onClose }: { lang: 'fr'|'en', t: any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/80 backdrop-blur">
        <button onClick={onClose} className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors font-mono">
          <ArrowLeft size={18} /> {lang === 'fr' ? 'Retour' : 'Back'}
        </button>
        <h2 className="text-white font-bold hidden md:block">{t.cv.title}</h2>
        <a 
          href="/Images/Kristofer_FAUVETTE_CV.pdf" 
          download 
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors text-sm font-bold"
        >
          <Download size={16} /> {t.cv.download}
        </a>
      </div>
      <div className="flex-1 w-full bg-slate-900">
        <iframe 
          src="/Images/Kristofer_FAUVETTE_CV.pdf" 
          className="w-full h-full border-none" 
          title="CV Kristofer Fauvette"
        />
      </div>
    </div>
  );
};

// --- COMPOSANT : MODALE CERTIFICATION ---
const CertificationModal = ({ cert, t, onClose }: { cert: typeof CERTIFICATIONS[0], t: any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col md:flex-row"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-20 bg-black/50 rounded-full p-2">
          <X size={20} />
        </button>

        {/* Colonne Gauche : Images */}
        <div className="md:w-1/3 bg-slate-950 p-6 flex flex-col items-center gap-6 border-b md:border-b-0 md:border-r border-white/10">
          <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center p-4 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <img src={cert.badge} alt="Badge" className="w-full h-full object-contain" />
          </div>
          <div className="w-full aspect-[4/3] bg-white/5 rounded-lg border border-white/10 overflow-hidden group relative">
             <img src={cert.certImage} alt="Certificate" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a href={cert.certImage} target="_blank" rel="noreferrer" className="text-white bg-cyan-600 px-3 py-1 rounded text-sm">Voir en grand</a>
             </div>
          </div>
        </div>

        {/* Colonne Droite : Infos */}
        <div className="md:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-white mb-2">{cert.title}</h2>
          <p className="text-cyan-400 font-mono text-sm mb-6 flex items-center gap-2">
            <CheckCircle size={14} /> {cert.issuer} Verified
          </p>

          <div className="prose prose-invert prose-sm mb-8 text-slate-300">
            <p>{cert.description}</p>
          </div>

          <div className="mb-8">
            <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">{t.certs.modal.skills}</h4>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map(skill => (
                <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-slate-300 font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
             <a 
               href={cert.verificationLink} 
               target="_blank" 
               rel="noreferrer"
               className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-all"
             >
               <Award size={18} /> {t.certs.modal.verify}
             </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- GLOBAL CHATBOT COMPONENT ---
const Assistant = ({ lang, t }: { lang: 'fr'|'en', t: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
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

// --- NOUVELLE SECTION CERTIFICATIONS ---
const CertificationsSection = ({ t }: { t: any }) => {
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATIONS[0] | null>(null);

  return (
    <section id="certifications" className="py-24 bg-slate-900/30 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Award className="text-yellow-400" /> {t.certs.title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
            <p className="text-slate-400 mt-4 max-w-xl">{t.certs.subtitle}</p>
          </div>
          <a href={SOCIALS.credlyProfile} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">
            <ExternalLink size={16} /> {t.certs.more}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <motion.div 
              key={cert.id} 
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCert(cert)}
              className="cursor-pointer group flex flex-col p-4 rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-800 hover:border-cyan-500/30 transition-all backdrop-blur-md relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${cert.color.split(' ')[0].replace('border-', 'bg-')}`}></div>
              
              <div className="flex items-center justify-center h-24 mb-4 p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                 <img src={cert.badge} alt={cert.title} className="max-h-full max-w-full object-contain drop-shadow-lg" />
              </div>
              
              <div className="flex-grow text-center">
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors leading-tight">
                  {cert.title}
                </h3>
                <p className="text-slate-500 text-xs font-mono mt-2">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificationModal cert={selectedCert} t={t} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- LOGO COMPONENT ---
const InteractiveLogo = () => {
  const LetterGroup = ({ initial, full }: { initial: string, full: string }) => (
    <div className="group flex items-center cursor-default">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{initial}</span>
      <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap text-slate-300 font-medium text-lg ml-0.5">
        {full}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-1 text-2xl tracking-tighter font-bold">
       <LetterGroup initial="K" full="ristofer" />
       <LetterGroup initial="W" full="illiam" />
       <LetterGroup initial="F" full="auvette" />
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
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
      <ParticleNetwork />
      
      {activeArticleData && (
        <ArticleReader 
          article={activeArticleData} 
          lang={lang} 
          onClose={() => setReadingArticle(null)} 
        />
      )}

      {viewingResume && (
        <ResumeViewer lang={lang} t={t} onClose={() => setViewingResume(false)} />
      )}

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <InteractiveLogo />

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors">{t.nav.about}</a>
            <a href="#certifications" className="hover:text-cyan-400 transition-colors">{t.nav.certs}</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">{t.nav.projects}</a>
            <a href="#blog" className="hover:text-cyan-400 transition-colors">{t.nav.blog}</a>
            <button onClick={() => setViewingResume(true)} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
               <FileText size={16} /> {t.nav.cv}
            </button>
            <a href="#contact" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/5">{t.nav.contact}</a>
            
            <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="flex items-center gap-2 px-3 py-1 rounded border border-white/10 hover:bg-white/5 transition-all text-xs font-mono text-cyan-400">
              <Languages size={14} /> {t.nav.lang}
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
                {t.hero.title2}
              </span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">{t.hero.desc}</p>
            <div className="flex gap-4">
              <a href="#projects" className="group px-8 py-3 bg-white text-slate-950 font-bold rounded hover:bg-cyan-50 transition-all flex items-center gap-2">
                {t.hero.btn_work} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={() => setViewingResume(true)} className="px-8 py-3 rounded border border-white/20 text-white hover:bg-white/5 transition-all font-mono">
                {t.hero.btn_cv}
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

      <section className="py-20 bg-slate-950/50">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-500 font-mono text-sm mb-8">STACK TECHNIQUE & OUTILS</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {[Code2, Terminal, Database, Layers, Cpu, Globe].map((Icon, idx) => (
              <div key={idx} className="group relative flex items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all hover:scale-110 cursor-pointer hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                 <Icon size={32} className="text-slate-300 group-hover:text-cyan-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CertificationsSection t={t} />

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