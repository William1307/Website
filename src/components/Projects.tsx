import { ExternalLink } from 'lucide-react';
import { SOCIALS } from '../data/socials';
import { PlexVisual, PiHoleVisual, RustDeskVisual } from './Visuals';
import { TRANSLATIONS } from '../data/translations';

// Move to data file if possible, but Visuals make it tricky.
// We can keep specific project list here or in data.
// Since it uses components, let's define it here.
const PROJECTS = [
    {
        id: 1,
        title: "Plex Server",
        cat: "Self-Hosting",
        tech: ["Docker", "Linux", "Plex"],
        desc: "Media server with HW transcoding.",
        Visual: PlexVisual,
        action: { type: 'link', url: 'https://github.com/plexinc/pms-docker' }
    },
    {
        id: 2,
        title: "Pi-hole DNS",
        cat: "Cybersecurity",
        tech: ["DNSSEC", "Unbound", "Networking", "Raspberry Pi 5", "Linux"],
        desc: "Network-wide ad blocking.",
        Visual: PiHoleVisual,
        action: { type: 'internal', articleId: 1 }
    },
    {
        id: 3,
        title: "RustDesk",
        cat: "SysAdmin",
        tech: ["VPS", "Encrypted", "OVH VPS", "Docker"],
        desc: "Secure remote desktop infrastructure.",
        Visual: RustDeskVisual,
        action: { type: 'link', url: 'https://rustdesk.com/docs/en/self-host/' }
    }
];

const Projects = ({ t, filterTech, setReadingArticle }: { t: typeof TRANSLATIONS['fr'], filterTech: string | null, setReadingArticle: (id: number) => void }) => {
    const handleProjectClick = (project: typeof PROJECTS[0]) => {
        if (project.action.type === 'link') {
            window.open(project.action.url, '_blank');
        } else if (project.action.type === 'internal') {
            setReadingArticle(project.action.articleId!);
        }
    };

    const filteredProjects = filterTech
        ? PROJECTS.filter(p => p.tech.some(t => t.toLowerCase().includes(filterTech.toLowerCase()) || filterTech.toLowerCase().includes(t.toLowerCase())))
        : PROJECTS;

    return (
        <section id="projects" className="py-24 relative bg-slate-900/30 border-y border-white/5">
            <div className="container mx-auto px-6 z-10 relative">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">{t.projects.title}</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded"></div>
                        {filterTech && (
                            <p className="text-cyan-400 mt-2 text-sm font-mono">
                                Filtering by: {filterTech}
                            </p>
                        )}
                    </div>
                    <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm">
                        {t.projects.link} <ExternalLink size={14} />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => handleProjectClick(project)}
                            className="group relative bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-2 flex flex-col cursor-pointer"
                        >
                            <div className="h-48 w-full relative">
                                <project.Visual />
                                <div className="absolute bottom-4 left-4 z-10"><span className="px-3 py-1 bg-black/50 backdrop-blur rounded text-xs font-bold text-white uppercase">{project.cat}</span></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    {project.title}
                                    {project.action.type === 'link' && <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-400" />}
                                </h3>
                                <p className="text-slate-400 text-sm mb-4">{project.desc}</p>
                                <div className="flex gap-2 flex-wrap">{project.tech.map(te => (
                                    <span key={te} className={`text-xs font-mono px-2 py-1 bg-slate-950 rounded border transition-colors ${filterTech && te.toLowerCase().includes(filterTech.toLowerCase()) ? 'border-cyan-500 text-cyan-400' : 'border-white/5 text-slate-500'}`}>
                                        {te}
                                    </span>
                                ))}</div>
                            </div>
                        </div>
                    ))}
                    {filteredProjects.length === 0 && (
                        <div className="col-span-full text-center text-slate-500 py-12">
                            No projects found matching the selected tech.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
