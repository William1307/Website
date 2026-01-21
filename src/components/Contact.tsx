import React, { useState } from 'react';
import { Mail, Linkedin, Github, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { SOCIALS } from '../data/socials';
import { TRANSLATIONS } from '../data/translations';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqakevob";

const Contact = ({ t }: { t: typeof TRANSLATIONS['fr'] }) => {
    const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setContactStatus('submitting');
        const form = e.currentTarget;
        const formData = new FormData(form);
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
            if (response.ok) { setContactStatus('success'); form.reset(); }
            else { setContactStatus('error'); }
        } catch (error) { setContactStatus('error'); }
    };

    return (
        <section id="contact" className="py-24 relative">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">{t.contact.title}</h2>
                    <p className="text-slate-400 mb-8">{t.contact.desc}</p>
                    <div className="flex flex-col gap-4">
                        <a href={`mailto:${SOCIALS.email}`} className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors"><Mail size={20} /> {SOCIALS.email}</a>
                        <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors"><Linkedin size={20} /> LinkedIn</a>
                        <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"><Github size={20} /> GitHub</a>
                    </div>
                </div>

                <div className="bg-slate-950 border border-white/5 p-8 rounded-2xl">
                    {contactStatus === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <CheckCircle size={48} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-bold text-white">{t.contact.success}</h3>
                        </div>
                    ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">{t.contact.form_email}</label>
                                <input type="email" name="email" required className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">{t.contact.form_msg}</label>
                                <textarea name="message" required rows={4} className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 resize-none"></textarea>
                            </div>

                            {contactStatus === 'error' && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded">
                                    <AlertCircle size={16} /> {t.contact.error}
                                </div>
                            )}

                            <button type="submit" disabled={contactStatus === 'submitting'} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg flex justify-center gap-2">
                                {contactStatus === 'submitting' ? <Loader2 className="animate-spin" /> : <><Send size={18} /> {t.contact.form_btn}</>}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
