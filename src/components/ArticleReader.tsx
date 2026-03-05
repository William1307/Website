import { useState, useEffect } from 'react';
import { ArrowLeft, BrainCircuit, Loader2, Send } from 'lucide-react';
import { BLOG_CONTENT } from '../data/blogContent';
import { TRANSLATIONS } from '../data/translations';
import { callGemini } from '../utils/gemini';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { getGlobalContext, getArticleContext } from '../utils/context';

const ArticleReader = ({ article, lang, onClose }: { article: typeof BLOG_CONTENT[0], lang: 'fr' | 'en', onClose: () => void }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const t = TRANSLATIONS[lang];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto'; // Restore on close
        };
    }, []);

    const handleAsk = async () => {
        if (!question.trim()) return;
        setLoading(true);

        const globalCtx = getGlobalContext();
        const articleCtx = getArticleContext(article.id, lang);

        const systemPrompt = `${globalCtx}\n\n${articleCtx}\n\nImportant: The user is asking specifically about the article, but you can reference his general skills or background if relevant to explain better. Respond in ${lang === 'fr' ? 'French' : 'English'}.`;

        const response = await callGemini(question, systemPrompt);
        setAnswer(response);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-950 overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
            <Helmet>
                <title>{article.title[lang]} | Kristofer Fauvette</title>
            </Helmet>
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

                    {/* Markdown Renderer */}
                    <div className="text-slate-300 leading-relaxed markdown-content">
                        <ReactMarkdown
                            components={{
                                code({ node, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return match ? (
                                        <pre className="bg-black/50 p-4 rounded-lg border border-white/10 text-green-400 font-mono text-sm mb-6 overflow-x-auto">
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        </pre>
                                    ) : (
                                        <code className="bg-white/10 px-1 py-0.5 rounded text-cyan-300 font-mono text-sm" {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
                                h4: ({ node, ...props }) => <h4 className="text-xl font-semibold text-cyan-400 mt-6 mb-2" {...props} />,
                                p: ({ node, ...props }) => <p className="text-slate-300 mb-4" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-8" {...props} />,
                                li: ({ node, ...props }) => <li className="marker:text-cyan-500" {...props} />,
                                a: ({ node, ...props }) => <a className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4" {...props} />,
                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 italic text-slate-400 bg-slate-900/50 rounded-r my-6" {...props} />
                                ),
                                hr: ({ node, ...props }) => <hr className="border-white/10 my-8" {...props} />,
                                img: ({ node, ...props }) => <img className="mx-auto block w-full max-w-3xl rounded-xl border border-white/10 my-10 shadow-lg shadow-black/20" {...props} />
                            }}
                        >
                            {article.content[lang]}
                        </ReactMarkdown>
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
                            <div className="bg-slate-950 rounded-lg p-4 text-slate-300 border border-white/5 animate-in fade-in">
                                <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2 block">Assistant IA</span>
                                {answer}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleReader;
