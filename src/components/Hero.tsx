import { ChevronRight, Download, ExternalLink } from 'lucide-react';
import TypingEffect from './TypingEffect';
import { TRANSLATIONS } from '../data/translations';

const Hero = ({ t, setViewingResume }: { t: typeof TRANSLATIONS['fr'], setViewingResume: (v: boolean) => void }) => {
    return (
        <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        {t.hero.badge}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        {t.hero.title1}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            <TypingEffect text={t.hero.title2} delay={500} />
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed whitespace-pre-line">{t.hero.desc}</p>
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
    );
};

export default Hero;
