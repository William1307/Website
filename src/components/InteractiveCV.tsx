import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Download, MapPin, Mail, Cake, Car, Quote, User, Briefcase, Calendar, GraduationCap, Award, Cpu, Heart, Sparkles, Gamepad2, Youtube, PenTool, Languages } from 'lucide-react';
import { SOCIALS } from '../data/socials';
import { TRANSLATIONS } from '../data/translations';
import { CV_DATA } from '../data/cv';
import { Helmet } from 'react-helmet-async';

const InteractiveCV = ({ lang, t, onClose }: { lang: 'fr' | 'en', t: typeof TRANSLATIONS['fr'], onClose: () => void }) => {
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
            <Helmet>
                <title>CV | Kristofer Fauvette</title>
            </Helmet>
            {/* Top Bar */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/80 backdrop-blur z-50 absolute top-0 w-full">
                <button onClick={onClose} className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors font-mono group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> {lang === 'fr' ? 'Retour' : 'Back'}
                </button>
                <h2 className="text-white font-bold hidden md:block tracking-wider uppercase text-sm opacity-50">{t.cv.title}</h2>
                <a
                    href="/Images/Kristofer_FAUVETTE_CV.pdf"
                    download
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all text-base font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] active:scale-95 border border-white/20"
                >
                    <Download size={20} /> {t.cv.download}
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
                                {CV_DATA.personal.role[lang]}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400 font-mono">
                                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5 hover:border-cyan-500/50 transition-colors">
                                    <MapPin size={16} className="text-red-400" /> {CV_DATA.personal.location}
                                </div>
                                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5 hover:border-cyan-500/50 transition-colors">
                                    <Mail size={16} className="text-yellow-400" /> {SOCIALS.email}
                                </div>
                                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5 hover:border-cyan-500/50 transition-colors">
                                    <Cake size={16} className="text-pink-400" /> {CV_DATA.personal.age} ans
                                </div>
                                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5 hover:border-cyan-500/50 transition-colors">
                                    <Car size={16} className="text-green-400" /> {CV_DATA.personal.permis}
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
                            {CV_DATA.personal.profile[lang]}
                        </p>

                        <div className="relative z-10 mt-8 flex justify-end">
                            <a
                                href="/Images/Kristofer_FAUVETTE_CV.pdf"
                                download
                                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all font-bold tracking-wide active:scale-95"
                            >
                                <Download size={22} className="group-hover:translate-y-1 transition-transform" /> {t.cv.download}
                            </a>
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section>
                        <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                            <Briefcase className="text-purple-400" size={32} /> {lang === 'fr' ? 'Expérience Professionnelle' : 'Work Experience'}
                        </h3>

                        <div className="relative border-l-2 border-white/10 ml-4 space-y-12 pl-8 pb-4">
                            {CV_DATA.experience.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className="relative group"
                                >
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[45px] top-8 w-6 h-6 rounded-full ${i === 0 ? 'bg-purple-500' : 'bg-slate-600'} border-4 border-slate-950 z-10 group-hover:scale-110 transition-transform`}></div>

                                    {/* Detailed Tile */}
                                    <div className="bg-slate-900 border border-white/5 p-8 rounded-2xl hover:bg-slate-800 transition-colors relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-colors"></div>

                                        <div className="flex flex-col md:flex-row justify-between items-start mb-6 relative z-10">
                                            <div>
                                                <h4 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{item.title}</h4>
                                                <p className="text-purple-400 font-semibold text-lg">{item.role}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 mt-2 md:mt-0 font-mono text-sm bg-white/5 px-3 py-1 rounded-full">
                                                <Calendar size={14} /> {item.date}
                                            </div>
                                        </div>

                                        <ul className="space-y-2 mb-6 relative z-10">
                                            {item.desc[lang].map((bullet, k) => (
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

                    {/* Education Timeline */}
                    <section>
                        <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                            <GraduationCap className="text-cyan-400" size={32} /> {lang === 'fr' ? 'Formation' : 'Education'}
                        </h3>
                        <div className="relative border-l-2 border-white/10 ml-4 space-y-12 pl-8 pb-4">
                            {CV_DATA.education.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className="relative"
                                >
                                    <div className={`absolute -left-[45px] w-6 h-6 rounded-full ${i === 0 ? 'bg-cyan-600 shadow-[0_0_15px_rgba(8,145,178,0.5)]' : 'bg-slate-700'} border-4 border-slate-950`}></div>
                                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-colors">
                                        <span className={`${i === 0 ? 'text-cyan-400' : 'text-slate-500'} font-mono text-sm block mb-1`}>{item.date}</span>
                                        <h4 className="text-xl font-bold text-white">{item.school}</h4>
                                        <p className="text-slate-400 mb-2">{item.degree}</p>
                                        <p className="text-slate-500 text-sm italic">{item.location}</p>
                                        {item.award && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold mt-2">
                                                <Award size={12} /> {item.award}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* SKILLS */}
                    <section>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                            <Cpu className="text-blue-400" /> {lang === 'fr' ? 'Compétences' : 'Competencies'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {CV_DATA.skills.map((skill, i) => (
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

                    {/* Qualities & Interests */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        <section>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Heart className="text-pink-400" /> {lang === 'fr' ? 'Qualités' : 'Qualities'}
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {CV_DATA.qualities.map((q, i) => (
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

                        <section>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Sparkles className="text-yellow-400" /> {lang === 'fr' ? "Centres d'intérêt" : 'Interests'}
                            </h3>
                            <div className="flex flex-col gap-4">
                                {CV_DATA.interests.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                        className="bg-slate-900/50 p-4 rounded-xl border border-white/10 flex items-center gap-3"
                                    >
                                        <span className={`w-3 h-3 rounded-full ${['bg-cyan-500', 'bg-green-500', 'bg-purple-500'][i % 3]}`}></span>
                                        <span className="text-slate-200 font-medium">{item.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Hobbies (Hardcoded layout based on visual preference, but could be dynamic) */}
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

                    {/* Languages Section */}
                    <section>
                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <Languages className="text-pink-400" size={32} /> {lang === 'fr' ? 'Langues' : 'Languages'}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {CV_DATA.languages.map((l, i) => (
                                <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                                    <div>
                                        <span className="block font-bold text-white text-lg">{l.name[lang]}</span>
                                        <span className="text-sm text-slate-500">{l.level[lang]}</span>
                                        {l.detail && <span className="text-xs text-cyan-400 block mt-1">{l.detail}</span>}
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(n => <div key={n} className={`w-2 h-8 rounded-sm ${n <= l.score ? 'bg-cyan-500' : 'bg-slate-700'}`}></div>)}
                                    </div>
                                </div>
                            ))}
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

export default InteractiveCV;
