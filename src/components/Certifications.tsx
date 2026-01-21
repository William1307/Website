import { useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '../data/certifications';
import { SOCIALS } from '../data/socials';
import { TRANSLATIONS } from '../data/translations';
import TiltCard from './TiltCard';

const CertificationModal = lazy(() => import('./CertificationModal'));

const Certifications = ({ t, lang }: { t: typeof TRANSLATIONS['fr'], lang: 'fr' | 'en' }) => {
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
                    <Suspense fallback={null}>
                        <CertificationModal cert={selectedCert} t={t} lang={lang} onClose={() => setSelectedCert(null)} />
                    </Suspense>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
