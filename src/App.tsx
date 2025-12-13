import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  Award
} from 'lucide-react';

// --- CONFIGURATION ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblqywqp"; 

const SOCIALS = {
  github: "https://github.com/William1307",
  linkedin: "https://www.linkedin.com/in/kristofer-fauvette-040142311/",
  email: "kristofer.fauvette@kwol.cloud"
};

// --- DATA: CONTEXTE PERSONNE (POUR L'IA) ---
const KRISTOFER_CONTEXT = `
CONTEXTE PRIORITAIRE SUR L'AUTEUR :
Nom : Kristofer FAUVETTE
Rôle : Étudiant Ingénieur (1ère année à l'INSA Hauts-de-France) & Développeur Fullstack.
Passion : Informatique, Réseaux, Bidouille technique, Cyber-sécurité, Auto-hébergement.
Stack Technique : React, Vite, Tailwind CSS, TypeScript, Node.js, Python.
Compétences Réseau : Cisco (Certification en cours), Packet Tracer, DNS (Pi-hole, Unbound), Serveurs (VPS, NAS).
Projets notables :
- Plex Server (Media server avec transcodage HW)
- Pi-hole + Unbound (DNS privé et bloqueur de pub)
- RustDesk (Infrastructure bureau à distance sécurisée)
Style de communication : Professionnel mais passionné, précis, pédagogique.
`;

// --- DATA: CERTIFICATIONS ---
const CERTIFICATIONS = [
  {
    id: 1,
    title: "Network Technician Career Path",
    issuer: "Cisco",
    date: "Nov 26, 2025",
    type: "EXAM",
    icon: <Award className="text-yellow-400" />,
    color: "border-yellow-500/50 bg-yellow-500/10 text-yellow-400"
  },
  {
    id: 2,
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco",
    date: "Oct 13, 2025",
    type: "MODULE",
    icon: <Terminal className="text-cyan-400" />,
    color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
  },
  {
    id: 3,
    title: "Operating Systems Basics",
    issuer: "Cisco",
    date: "Oct 13, 2025",
    type: "COURSE",
    icon: <Cpu className="text-blue-400" />,
    color: "border-blue-500/30 bg-blue-500/10 text-blue-400"
  },
  {
    id: 4,
    title: "Computer Hardware Basics",
    issuer: "Cisco",
    date: "Oct 12, 2025",
    type: "COURSE",
    icon: <Cpu className="text-blue-400" />,
    color: "border-blue-500/30 bg-blue-500/10 text-blue-400"
  },
  {
    id: 5,
    title: "Python Essentials 1",
    issuer: "Cisco",
    date: "Oct 12, 2025",
    type: "COURSE",
    icon: <Code2 className="text-green-400" />,
    color: "border-green-500/30 bg-green-500/10 text-green-400"
  },
  {
    id: 6,
    title: "Networking Essentials",
    issuer: "Cisco",
    date: "Oct 11, 2025",
    type: "COURSE",
    icon: <Globe className="text-purple-400" />,
    color: "border-purple-500/30 bg-purple-500/10 text-purple-400"
  },
  {
    id: 7,
    title: "Networking Basics",
    issuer: "Cisco",
    date: "Oct 11, 2025",
    type: "COURSE",
    icon: <Globe className="text-purple-400" />,
    color: "border-purple-500/30 bg-purple-500/10 text-purple-400"
  }
];

// --- TRADUCTIONS ---
const TRANSLATIONS = {
  fr: {
    nav: { about: "À Propos", certs: "Certifs", projects: "Projets", blog: "Blog", contact: "Contact", lang: "EN" },
    hero: {
      badge: "ÉTUDIANT INSA HAUTS-DE-FRANCE",
      title1: "Ingénierie",
      title2: "Créative & Code",
      desc: "Bonjour, je suis Kristofer FAUVETTE. Étudiant en 1ère année à l’INSA Hauts-de-France, je suis passionné depuis toujours par l'informatique, les réseaux et la 'bidouille' technique. Je me dirige vers une carrière d'ingénieur. Ce site centralise mon parcours : mes Projets (NAS, serveurs), mes Certifications (Cisco) et mon Blog. N’hésitez pas à m'écrire !",
      btn_work: "Voir mes travaux",
      btn_contact: "Contact"
    },
    certs: {
      title: "Certifications & Parcours",
      subtitle: "Compétences validées par l'industrie."
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
    }
  },
  en: {
    nav: { about: "About", certs: "Certs", projects: "Projects", blog: "Blog", contact: "Contact", lang: "FR" },
    hero: {
      badge: "INSA HAUTS-DE-FRANCE STUDENT",
      title1: "Engineering",
      title2: "Creative & Code",
      desc: "Hello, I am Kristofer FAUVETTE. 1st year student at INSA Hauts-de-France, I have always been passionate about IT, networks and technical tinkering. I am heading towards an engineering career. This site centralizes my background: my Projects (NAS, servers), my Certifications (Cisco) and my Blog. Feel free to write to me!",
      btn_work: "View my work",
      btn_contact: "Contact"
    },
    certs: {
      title: "Certifications & Path",
      subtitle: "Industry validated skills."
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
    }
  }
};

// --- CONTENU DU BLOG ---
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

          <div className="my-8 p-4 bg-slate-800 rounded-lg border border-slate-700 text-center italic text-slate-500">
            [Schéma : Différence entre une requête standard et récursive]
          </div>

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
          <p className="text-slate-400 mb-4">
            Suivez les étapes à l'écran. <strong>Astuce :</strong> Mettez une adresse IP statique à votre Raspberry Pi pour éviter qu'il change d'adresse au prochain redémarrage.
          </p>

          <h3 className="text-2xl font-bold text-white mb-4">Étape 3 : Installer Unbound</h3>
          <p className="text-slate-400 mb-4">C'est là que la magie opère. On installe Unbound pour ne plus dépendre des DNS de Google.</p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>sudo apt install unbound</code>
          </pre>
          
          <p className="text-slate-400 mb-4">Configuration spécifique pour Pi-hole :</p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf</code>
          </pre>
          
          <pre className="bg-slate-900 p-4 rounded-lg border border-white/10 text-slate-300 font-mono text-xs mb-6 overflow-x-auto">
{`server:
    verbosity: 0
    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes
    do-ip6: no
    root-hints: "/usr/share/dns/root.hints"
    harden-glue: yes
    harden-dnssec-stripped: yes
    use-caps-for-id: no
    edns-buffer-size: 1232
    prefetch: yes
    num-threads: 1
    so-rcvbuf: 1m
    private-address: 192.168.0.0/16`}
          </pre>

          <p className="text-slate-400 mb-4">Redémarrage du service :</p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
            <code>sudo service unbound restart</code>
          </pre>

          <h3 className="text-2xl font-bold text-white mb-4">Étape 4 : Relier les deux</h3>
          <p className="text-slate-400 mb-4">
            Allez sur l'interface web de votre Pi-hole (<code>http://192.168.x.x/admin</code>). Direction <strong>Settings &gt; DNS</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-8">
            <li>Décochez tous les DNS publics (Google, OpenDNS, etc).</li>
            <li>Dans "Custom 1 (IPv4)", mettez : <code>127.0.0.1#5335</code></li>
            <li>Cochez "Use DNSSEC".</li>
          </ul>
          
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
          <p className="text-slate-400 italic">
            [Content available in French above. English translation coming soon.]
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

// --- UTILITAIRE FORMATAGE TEXTE IA ---
const formatAIResponse = (text: string) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    
    // Découpage pour détecter **gras**
    const parts = line.split(/(\*\*.*?\*\*)/g);
    
    return (
      <p key={i} className="mb-2 text-slate-300 leading-relaxed">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-cyan-400 font-bold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
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
    // On ajoute le contexte perso aussi ici pour que l'IA sache qui a écrit l'article
    const systemPrompt = `Tu es un assistant expert. Langue de réponse : ${lang === 'fr' ? 'Français' : 'Anglais'}. Contexte Article: ${context}. ${KRISTOFER_CONTEXT}. Utilise le gras (**texte**) pour les points importants.`;
    
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
              <div className="bg-slate-950 rounded-lg p-4 text-slate-300 border border-white/5 animate-in fade-in max-h-80 overflow-y-auto">
                <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2 block">Assistant IA</span>
                {formatAIResponse(answer)}
              </div>
            )}
          </div>
        </div>
      </div>
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

    // Injection du contexte KRISTOFER_CONTEXT pour que l'IA sache qui est le propriétaire
    const systemPrompt = `Tu es l'assistant de Kristofer. Réponds en ${lang === 'fr' ? 'Français' : 'Anglais'}. ${KRISTOFER_CONTEXT}. Sois concis et utilise le formatage markdown (gras) si nécessaire.`;
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
        <div className="fixed bottom-24 right-6 z-50 w-80 h-[450px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-slate-950 border-b border-white/10 flex items-center gap-3 flex-none">
            <Bot className="text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Assistant</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                  {msg.role === 'ai' ? formatAIResponse(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-slate-500 text-xs ml-4">...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2 flex-none bg-slate-950">
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
  return (
    <section id="certifications" className="py-24 bg-slate-900/30 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Award className="text-yellow-400" /> {t.certs.title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
            <p className="text-slate-400 mt-4 max-w-xl">{t.certs.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.id} className="group flex flex-col p-6 rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-900 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${cert.color}`}>
                  {cert.type}
                </span>
                <span className="text-slate-500 text-xs font-mono">{cert.date}</span>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  {cert.issuer}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="p-2 rounded-full bg-white/5 text-slate-300">
                  {cert.icon}
                </div>
                <div className="h-1 flex-grow mx-4 bg-white/5 rounded overflow-hidden">
                  <div className="h-full bg-cyan-500/50 w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // -- CORRECTION SCROLL AU CHARGEMENT --
  useLayoutEffect(() => {
    // Force le scroll en haut au chargement/rafraîchissement
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);
  
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

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <InteractiveLogo />

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors">{t.nav.about}</a>
            <a href="#certifications" className="hover:text-cyan-400 transition-colors">{t.nav.certs}</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">{t.nav.projects}</a>
            <a href="#blog" className="hover:text-cyan-400 transition-colors">{t.nav.blog}</a>
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
              <a href="#contact" className="px-8 py-3 rounded border border-white/20 text-white hover:bg-white/5 transition-all font-mono">
                {t.hero.btn_contact}
              </a>
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
            {[
              { id: 1, title: "Plex Server", cat: "Self-Hosting", tech: ["Docker", "Linux"], desc: "Media server with HW transcoding.", color: "from-orange-500 to-amber-500" },
              { id: 2, title: "Pi-hole DNS", cat: "Cybersecurity", tech: ["DNSSEC", "Unbound"], desc: "Network-wide ad blocking.", color: "from-red-500 to-rose-600" },
              { id: 3, title: "RustDesk", cat: "SysAdmin", tech: ["VPS", "Encrypted"], desc: "Secure remote desktop infrastructure.", color: "from-blue-500 to-indigo-600" }
            ].map((project) => (
              <div key={project.id} className="group relative bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-2 flex flex-col">
                <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative`}>
                  <div className="absolute inset-0 bg-slate-950/20"></div>
                  <div className="absolute bottom-4 left-4"><span className="px-3 py-1 bg-black/50 backdrop-blur rounded text-xs font-bold text-white uppercase">{project.cat}</span></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
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