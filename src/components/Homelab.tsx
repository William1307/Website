import { useState, useEffect } from 'react';
import { Cloud, Mail, Monitor, Zap, Shield, Globe, Activity, Layers, Server, HardDrive, Wifi, ExternalLink, Info } from 'lucide-react';
import { getCPULoad, getPiHoleQueries } from '../utils/homelab';
import { TRANSLATIONS } from '../data/translations';

const Homelab = ({ t, setReadingArticle }: { t: typeof TRANSLATIONS['fr'], setReadingArticle: (id: number) => void }) => {
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

    const VPS_SERVICES = [
        { name: 'Nextcloud', status: 'online', uptime: '99.9%', cpu: cpuLoads['Nextcloud'], icon: Cloud, ip: 'Docker Internal' },
        { name: 'Mailserver', status: 'online', uptime: '99.9%', cpu: cpuLoads['Mailserver'], icon: Mail, ip: 'Docker Internal' },
        { name: 'RustDesk', status: 'online', uptime: '99.5%', cpu: cpuLoads['RustDesk'], icon: Monitor, ip: 'Docker Internal' },
        { name: 'Speedtest', status: 'online', uptime: '100%', cpu: cpuLoads['Speedtest'], icon: Zap, ip: 'speedtest.kwol.cloud', link: 'https://speedtest.kwol.cloud/' }
    ];

    const HOME_SERVICES = [
        { name: 'Pi-hole DNS', status: 'online', queries: getPiHoleQueries(), blocked: '12%', icon: Shield },
        { name: 'Unbound', status: 'online', latency: '15ms', secure: true, icon: Globe },
        { name: 'Prometheus', status: 'online', metrics: '1.2k', icon: Activity },
        { name: 'Grafana', status: 'online', dashboards: '8', icon: Layers },
    ];

    return (
        <section id="homelab" className="py-24 relative">
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

                <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3 text-yellow-200/80 text-sm max-w-3xl mx-auto md:mx-0">
                    <Info size={18} className="shrink-0 mt-0.5" />
                    <p>{t.homelab.disclaimer}</p>
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
                                <div
                                    key={srv.name}
                                    className={`bg-slate-900/80 border border-white/5 p-4 rounded-lg flex flex-col gap-3 transition-all
                                        ${srv.name.includes('Pi-hole') ? 'cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800/80 group' : 'hover:border-purple-500/30'}`}
                                    onClick={() => srv.name.includes('Pi-hole') && setReadingArticle(1)}
                                >
                                    <div className="flex justify-between items-start">
                                        <srv.icon className={`${srv.name.includes('Pi-hole') ? 'text-green-400 group-hover:scale-110 transition-transform' : 'text-purple-400'}`} size={24} />
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white flex items-center gap-2">
                                            {srv.name}
                                            {srv.name.includes('Pi-hole') && <ExternalLink size={12} className="text-slate-500" />}
                                        </h4>
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

export default Homelab;
