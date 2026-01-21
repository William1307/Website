import { motion } from 'framer-motion';
import { Award, X, CheckCircle, Zap, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '../data/certifications';
import { TRANSLATIONS } from '../data/translations';

const CertificationModal = ({ cert, t, lang, onClose }: { cert: typeof CERTIFICATIONS[0], t: typeof TRANSLATIONS['fr'], lang: 'fr' | 'en', onClose: () => void }) => {
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

export default CertificationModal;
