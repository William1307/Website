import { useState } from 'react';
import { FileText, X, Menu, Languages } from 'lucide-react';
import ExpansiveLogo from './ExpansiveLogo';
import NavLink from './NavLink';
import { TRANSLATIONS } from '../data/translations';

const Navbar = ({ t, lang, setLang, setViewingResume }: {
    t: typeof TRANSLATIONS['fr'],
    lang: 'fr' | 'en',
    setLang: (l: 'fr' | 'en') => void,
    setViewingResume: (v: boolean) => void
}) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setIsNavOpen(false);
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <ExpansiveLogo />

                <div className="hidden md:flex flex-1 justify-center items-center gap-2">
                    <NavLink href="#about">{t.nav.about}</NavLink>
                    <NavLink href="#blog">{t.nav.blog}</NavLink>
                    <NavLink href="#projects">{t.nav.projects}</NavLink>
                    <NavLink href="#homelab">Homelab</NavLink>
                    <NavLink href="#certifications">{t.nav.certs}</NavLink>
                    <NavLink onClick={() => setViewingResume(true)}>
                        <span className="flex items-center gap-2"><FileText size={14} /> {t.nav.cv}</span>
                    </NavLink>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="#contact"
                        onClick={(e) => handleSmoothScroll(e, '#contact')}
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
                <div className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-xl">
                    <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="text-slate-300 block py-2">{t.nav.about}</a>
                    <a href="#blog" onClick={(e) => handleSmoothScroll(e, '#blog')} className="text-slate-300 block py-2">{t.nav.blog}</a>
                    <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')} className="text-slate-300 block py-2">{t.nav.projects}</a>
                    <a href="#homelab" onClick={(e) => handleSmoothScroll(e, '#homelab')} className="text-slate-300 block py-2">Homelab</a>
                    <a href="#certifications" onClick={(e) => handleSmoothScroll(e, '#certifications')} className="text-slate-300 block py-2">{t.nav.certs}</a>
                    <button onClick={() => { setViewingResume(true); setIsNavOpen(false); }} className="text-slate-300 block py-2 text-left">{t.nav.cv}</button>
                    <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="text-red-400 block py-2 font-bold">{t.nav.contact}</a>
                    <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="text-cyan-400 py-2 flex items-center gap-2">
                        <Languages size={14} /> {t.nav.lang}
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
