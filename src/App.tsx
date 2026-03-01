import { useState, useLayoutEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import ParticleNetwork from './components/ParticleNetwork';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Blog from './components/Blog';
import TechStack from './components/TechStack';
import Homelab from './components/Homelab';
import Certifications from './components/Certifications';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Assistant from './components/Assistant';
import { TRANSLATIONS } from './data/translations';
import { BLOG_CONTENT } from './data/blogContent';
import './index.css';

const ArticleReader = lazy(() => import('./components/ArticleReader'));
const InteractiveCV = lazy(() => import('./components/InteractiveCV'));

export default function App() {
  // Fix Scroll Restoration on Reload (Use LayoutEffect for earlier execution)
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    // Double check slightly later for layout shifts
    const timer = setTimeout(() => window.scrollTo(0, 0), 10);
    return () => clearTimeout(timer);
  }, []);

  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [readingArticle, setReadingArticle] = useState<number | null>(null);
  const [viewingResume, setViewingResume] = useState(false);

  // New State for Cross-Component Interaction
  const [filterTech, setFilterTech] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];
  const activeArticleData = BLOG_CONTENT.find(a => a.id === readingArticle);

  return (
    <HelmetProvider>
      <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
        <ScrollProgress />
        <ParticleNetwork />

        {activeArticleData && (
          <Suspense fallback={<div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <ArticleReader
              article={activeArticleData}
              lang={lang}
              onClose={() => setReadingArticle(null)}
            />
          </Suspense>
        )}

        {viewingResume && (
          <Suspense fallback={<div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <InteractiveCV lang={lang} t={t} onClose={() => setViewingResume(false)} />
          </Suspense>
        )}

        <Navbar
          t={t}
          lang={lang}
          setLang={setLang}
          setViewingResume={setViewingResume}
        />

        <Hero t={t} setViewingResume={setViewingResume} />

        <Projects
          t={t}
          filterTech={filterTech}
          setReadingArticle={setReadingArticle}
        />

        <TechStack t={t} onSelectTech={setFilterTech} />

        <Homelab t={t} setReadingArticle={setReadingArticle} />

        <Certifications t={t} lang={lang} />

        <Blog t={t} lang={lang} setReadingArticle={setReadingArticle} />

        <Gallery t={t} />

        <Contact t={t} />

        <Assistant lang={lang} t={t} />
      </div>
    </HelmetProvider>
  );
}