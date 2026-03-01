import { Camera } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

const Gallery = ({ t }: { t: typeof TRANSLATIONS['fr'] }) => {
    return (
        <section id="gallery" className="py-24 relative bg-slate-900/30 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4 flex justify-center items-center gap-3">
                        <Camera className="text-pink-500" size={32} /> {t.gallery.title}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t.gallery.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder items for the gallery */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="aspect-video bg-slate-800 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 z-10 p-4 flex flex-col justify-end">
                                <span className="text-white font-bold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">Image Placeholder {item}</span>
                            </div>
                            <Camera className="text-slate-600 opacity-50 group-hover:scale-110 transition-transform duration-500" size={48} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
