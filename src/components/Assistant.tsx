import { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, Bot, Send, Loader2, Sparkles, User } from 'lucide-react';
import { callGemini } from '../utils/gemini';
import { TRANSLATIONS } from '../data/translations';
import { getGlobalContext } from '../utils/context';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const Assistant = ({ lang, t }: { lang: 'fr' | 'en', t: typeof TRANSLATIONS['fr'] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([{ role: 'ai', text: t.assistant.welcome }]);
    }, [lang, t]);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input;

        const newMessages = [...messages, { role: 'user' as const, text: userMsg }];

        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        const systemPrompt = getGlobalContext() + `\nRespond in ${lang === 'fr' ? 'French' : 'English'}. Use Markdown formatting for bolding key terms, creating lists, and snippets. Keep it concise.`;
        const response = await callGemini(newMessages, systemPrompt);

        setMessages(prev => [...prev, { role: 'ai', text: response }]);
        setIsTyping(false);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -180 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:scale-110 transition-transform text-white group"
                    >
                        <MessageSquare size={24} className="group-hover:hidden" />
                        <Sparkles size={24} className="hidden group-hover:block animate-pulse" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                                    <Bot className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Portfolio Assistant</h3>
                                    <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-mono uppercase">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        Online
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-cyan-600' : 'bg-slate-800 border border-white/10'}`}>
                                        {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-cyan-400" />}
                                    </div>

                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-tr-none'
                                        : 'bg-slate-800/80 border border-white/5 text-slate-200 rounded-tl-none'
                                        }`}>
                                        {msg.role === 'ai' ? (
                                            <div className="markdown-content">
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                        strong: ({ node, ...props }) => <strong className="text-cyan-300 font-bold" {...props} />,
                                                        a: ({ node, ...props }) => <a className="text-cyan-400 underline hover:text-cyan-300" target="_blank" rel="noreferrer" {...props} />,
                                                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 mb-2" {...props} />,
                                                        li: ({ node, ...props }) => <li className="marker:text-cyan-500" {...props} />,
                                                        code: ({ node, ...props }) => <code className="bg-black/30 px-1 py-0.5 rounded text-xs font-mono text-cyan-200" {...props} />
                                                    }}
                                                >
                                                    {msg.text}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                                        <Bot size={14} className="text-cyan-400" />
                                    </div>
                                    <div className="bg-slate-800/80 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-900 border-t border-white/10">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={t.assistant.placeholder}
                                    className="w-full bg-slate-950 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-1.5 top-1.5 p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 transition-colors"
                                >
                                    {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-slate-600">Powered by Gemini AI • Context Aware</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Assistant;
