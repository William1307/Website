import { useState } from 'react';
import { Sparkles, BookOpen, Search, Tag, X } from 'lucide-react';
import { BLOG_CONTENT } from '../data/blogContent';
import { TRANSLATIONS } from '../data/translations';

const Blog = ({ t, lang, setReadingArticle }: { t: typeof TRANSLATIONS['fr'], lang: 'fr' | 'en', setReadingArticle: (id: number) => void }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // Extract unique tags
    const tags = Array.from(new Set(BLOG_CONTENT.map(article => article.tag)));

    const filteredArticles = BLOG_CONTENT.filter(article => {
        const matchesSearch = article.title[lang].toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = activeTag ? article.tag === activeTag : true;
        return matchesSearch && matchesTag;
    });

    return (
        <section id="blog" className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                    <Sparkles className="text-yellow-400" /> {t.blog.title}
                </h2>

                {/* Search and Filters */}
                <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder={lang === 'fr' ? "Rechercher un article..." : "Search articles..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mr-2">
                            <Tag size={16} /> {lang === 'fr' ? 'Filtres:' : 'Filters:'}
                        </div>
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                className={`px-3 py-1 rounded-full text-sm border transition-all ${activeTag === tag
                                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                    : 'bg-slate-900/50 border-white/10 text-slate-400 hover:border-white/30'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                        {(searchTerm || activeTag) && (
                            <button
                                onClick={() => { setSearchTerm(""); setActiveTag(null); }}
                                className="px-3 py-1 rounded-full text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 flex items-center gap-1"
                            >
                                <X size={14} /> {lang === 'fr' ? 'Reset' : 'Reset'}
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid gap-6">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
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
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            {lang === 'fr' ? "Aucun article trouvé." : "No articles found."}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Blog;
