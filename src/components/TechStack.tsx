import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ExternalLink } from 'lucide-react';
import { TECH_STACK } from '../data/techStack';
import { TRANSLATIONS } from '../data/translations';

const TechStack = ({ t, onSelectTech }: { t: typeof TRANSLATIONS['fr'], onSelectTech: (techName: string | null) => void }) => {
    const [activeTech, setActiveTech] = useState<typeof TECH_STACK[0] | null>(null);

    const handleTechClick = (tech: typeof TECH_STACK[0]) => {
        if (tech.id === 'youtube') {
            window.open('https://www.youtube.com/@KrisRetroLab', '_blank');
            return;
        }
        if (activeTech?.id === tech.id) {
            setActiveTech(null);
            onSelectTech(null);
        } else {
            setActiveTech(tech);
            onSelectTech(tech.name); // Pass the name for easier filtering in Projects
        }
    };

    return (
        <section className="py-24 bg-slate-900/30 border-y border-white/5">
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
                                    </div>
                                    <div className="space-y-4 font-mono text-xs">
                                        {activeTech.id === 'ovh-vps' ? (
                                            <div className="space-y-2">
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">vCores</span><span className="text-white">4</span></div>
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">RAM</span><span className="text-white">8 Go</span></div>
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">SSD</span><span className="text-white">75 Go</span></div>
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">Trafic</span><span className="text-white">400 mb/s</span></div>
                                                <div className="pt-2 text-slate-400">Services:</div>
                                                <ul className="list-disc pl-4 text-slate-300">
                                                    <li>Rustdesk server</li>
                                                    <li>Apache web server</li>
                                                    <li>Tailscale exit node (VPN)</li>
                                                </ul>
                                            </div>
                                        ) : activeTech.id === 'raspberry-pi' ? (
                                            <div className="space-y-2">
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">Cores</span><span className="text-white">4</span></div>
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">RAM</span><span className="text-white">8 Go</span></div>
                                                <div className="pt-2 text-slate-400">Services:</div>
                                                <ul className="list-disc pl-4 text-slate-300">
                                                    <li>Pi-hole (Ad-block)</li>
                                                    <li>Unbound (DNS)</li>
                                                    <li>Grafana</li>
                                                    <li>Prometheus</li>
                                                </ul>
                                            </div>
                                        ) : activeTech.id === 'home-server' ? (
                                            <div className="space-y-2">
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">CPU</span><span className="text-white">E5 2407 v2</span></div>
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">RAM</span><span className="text-white">8 Go DDR3 4x2</span></div>
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">OS</span><span className="text-white">Proxmox</span></div>
                                                <div className="flex justify-between border-b border-white/10 pb-1"><span className="text-slate-500">VMs</span><span className="text-white">TrueNAS Scale, Ubuntu</span></div>
                                                <div className="pt-2 text-slate-400">Services:</div>
                                                <ul className="list-disc pl-4 text-slate-300">
                                                    <li>NAS</li>
                                                    <li>Plex server</li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <>
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
                                            </>
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

export default TechStack;
