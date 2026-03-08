import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Sparkles, BookOpen, Search, Tag, X, ArrowRight } from 'lucide-react';
import { BLOG_CONTENT } from '../data/blogContent';
import { TRANSLATIONS } from '../data/translations';

// Magnetic Blog Card Component
const BlogCard = ({ article, onClick, lang }: { article: any, onClick: () => void, lang: 'fr' | 'en' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top } = ref.current!.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const handleMouseLeave = () => {
        mouseX.set(-1000);
        mouseY.set(-1000);
    };

    const gradient = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.15), transparent 80%)`;

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col p-6 rounded-2xl border border-white/5 bg-slate-900/50 hover:bg-slate-900/80 transition-all cursor-pointer overflow-hidden h-full"
        >
            <motion.div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: gradient }}
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-cyan-500/30 transition-all duration-300 z-0" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                        {article.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-hover:border-cyan-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                        <BookOpen size={14} />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {article.title[lang]}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between text-slate-500 font-mono text-xs border-t border-white/5">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                        {article.readTime} <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const Blog = ({ t, lang, setReadingArticle }: { t: typeof TRANSLATIONS['fr'], lang: 'fr' | 'en', setReadingArticle: (id: number) => void }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const tags = Array.from(new Set(BLOG_CONTENT.map(article => article.tag)));

    const filteredArticles = BLOG_CONTENT.filter(article => {
        const matchesSearch = article.title[lang].toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = activeTag ? article.tag === activeTag : true;
        return matchesSearch && matchesTag;
    });

    const isFiltering = searchTerm !== "" || activeTag !== null;

    // Pi-hole article has ID 1
    const piHoleArticle = filteredArticles.find(a => a.id === 1);

    const featuredArticle = !isFiltering && piHoleArticle ? piHoleArticle : (!isFiltering && filteredArticles.length > 0 ? filteredArticles[0] : null);
    const gridArticles = featuredArticle ? filteredArticles.filter(a => a.id !== featuredArticle.id) : filteredArticles;

    return (
        <section id="blog" className="py-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                    <Sparkles className="text-yellow-400" size={36} /> {t.blog.title}
                </h2>

                {/* Search and Filters */}
                <div className="mb-12 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center bg-slate-900/30 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={lang === 'fr' ? "Rechercher un article..." : "Search articles..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-950/50 border border-white/10 rounded-full pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mr-2">
                            <Tag size={16} /> {lang === 'fr' ? 'Filtres :' : 'Filters:'}
                        </div>
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all border ${activeTag === tag
                                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                                    : 'bg-slate-950/50 border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                        {isFiltering && (
                            <button
                                onClick={() => { setSearchTerm(""); setActiveTag(null); }}
                                className="px-4 py-1.5 rounded-full text-xs font-bold font-mono border border-red-500/30 text-red-400 hover:bg-red-500/10 flex items-center gap-1 transition-colors"
                            >
                                <X size={14} /> {lang === 'fr' ? 'Réinitialiser' : 'Reset'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Featured Article */}
                {featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setReadingArticle(featuredArticle.id)}
                        className="mb-12 group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-slate-900"
                    >
                        {/* Abstract Gradient Background directly inline */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-purple-900/40 opacity-50 group-hover:scale-105 transition-transform duration-700 z-0"></div>
                        <div className="absolute inset-0 bg-slate-950/60 z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20"></div>

                        <div className="relative z-30 p-8 md:p-12 lg:p-16 flex flex-col justify-end min-h-[400px]">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider">
                                    {lang === 'fr' ? 'À la une' : 'Featured'}
                                </span>
                                <span className="text-cyan-400 font-mono text-sm font-bold border border-cyan-500/30 px-3 py-1 rounded-full">
                                    {featuredArticle.tag}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-cyan-300 transition-colors drop-shadow-lg">
                                {featuredArticle.title[lang]}
                            </h3>

                            <div className="flex flex-wrap items-center gap-6 text-slate-300 font-mono text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 p-0.5"><img src="/Images/image.png" alt="Author" className="w-full h-full rounded-full object-cover" /></div>
                                    <span>Kristofer</span>
                                </div>
                                <span>•</span>
                                <span>{featuredArticle.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-2 text-cyan-400">
                                    <BookOpen size={16} /> {featuredArticle.readTime}
                                </span>
                            </div>
                        </div>

                        {/* Large Hover Arrow */}
                        <div className="absolute bottom-12 right-12 z-30 w-16 h-16 rounded-full bg-white text-slate-950 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl">
                            <ArrowRight size={24} />
                        </div>
                    </motion.div>
                )}

                {/* Grid Articles */}
                {gridArticles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gridArticles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <BlogCard article={article} onClick={() => setReadingArticle(article.id)} lang={lang} />
                            </motion.div>
                        ))}
                    </div>
                ) : !featuredArticle ? (
                    <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-white/5 border-dashed">
                        <Search className="mx-auto text-slate-600 mb-4" size={48} />
                        <p className="text-xl text-slate-400 font-bold mb-2">{lang === 'fr' ? "Aucun article trouvé" : "No articles found"}</p>
                        <p className="text-slate-500 text-sm">
                            {lang === 'fr' ? "Essayez de modifier vos filtres de recherche." : "Try adjusting your search filters."}
                        </p>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default Blog;

