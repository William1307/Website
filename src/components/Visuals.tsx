import { motion } from 'framer-motion';
import { Play, Activity, Shield, Monitor, Lock } from 'lucide-react';

export const PlexVisual = () => {
    return (
        <div className="w-full h-full bg-slate-950 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <motion.div
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'], }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
                className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-amber-700/20 to-slate-900 z-0 bg-[length:200%_200%]"
            />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            <div className="absolute top-1/2 left-0 w-[150%] -translate-y-1/2 -rotate-6 opacity-60 flex gap-4">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-24 h-36 rounded-lg bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-xl backdrop-blur-sm flex-shrink-0"
                        animate={{ x: [-100, -500] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-full h-2/3 bg-white/5 rounded-t-lg"></div>
                        <div className="p-2 gap-1 flex flex-col">
                            <div className="h-2 w-3/4 bg-white/20 rounded"></div>
                            <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                    <motion.div
                        className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.5)] z-20 relative"
                        whileHover={{ scale: 1.1 }}
                        animate={{ boxShadow: ['0 0 30px rgba(249,115,22,0.5)', '0 0 60px rgba(249,115,22,0.8)', '0 0 30px rgba(249,115,22,0.5)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Play fill="white" className="text-white ml-1 w-8 h-8" />
                    </motion.div>
                    <motion.div
                        className="absolute inset-0 rounded-full border border-orange-500/50"
                        animate={{ scale: [1, 2], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </div>
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/30">
                <Activity className="w-3 h-3 text-orange-400 animate-pulse" />
                <span className="text-[10px] font-mono text-orange-100 font-bold uppercase tracking-wider">Transcoding (HW)</span>
            </div>
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-200 rounded-full blur-[1px]"
                    initial={{ y: 200, x: Math.random() * 300, opacity: 0 }}
                    animate={{ y: -50, opacity: [0, 1, 0] }}
                    transition={{ duration: Math.random() * 3 + 4, repeat: Infinity, delay: Math.random() * 2 }}
                />
            ))}
        </div>
    );
};

export const PiHoleVisual = () => {
    return (
        <div className="w-full h-full bg-slate-950 relative overflow-hidden group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-[400px] h-[400px] bg-gradient-to-r from-transparent via-red-500/10 to-transparent z-0 opacity-30"
                style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)', transformOrigin: 'center' }}
            />
            <div className="relative z-10">
                <motion.div
                    animate={{ boxShadow: ['0 0 20px rgba(239,68,68,0.2)', '0 0 50px rgba(239,68,68,0.6)', '0 0 20px rgba(239,68,68,0.2)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-slate-900 border-2 border-red-500 rounded-full flex items-center justify-center relative overflow-hidden shadow-lg shadow-red-900/20"
                >
                    <Shield className="text-red-500 w-8 h-8 relative z-10" />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-red-500/30 border-dashed rounded-full"
                    />
                </motion.div>
            </div>
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_red]"
                    initial={{ scale: 1, opacity: 1, x: 150 * Math.cos(i), y: 150 * Math.sin(i) }}
                    animate={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeIn" }}
                />
            ))}
        </div>
    );
};

export const RustDeskVisual = () => {
    return (
        <div className="w-full h-full bg-slate-950 relative overflow-hidden group-hover:scale-105 transition-transform duration-700 perspective-1000">
            <div className="absolute inset-0 opacity-20 flex justify-around pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent h-full"
                        initial={{ y: -200 }}
                        animate={{ y: '100%' }}
                        transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                    />
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="absolute w-40 h-40 rounded-full border border-blue-500/30 border-dashed"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute w-56 h-56 rounded-full border border-cyan-500/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="relative z-10 bg-slate-900/80 backdrop-blur-md border border-blue-500/50 p-4 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    initial={{ rotateX: 10 }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                            <Monitor className="text-blue-400 w-12 h-12" />
                            <motion.div
                                className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-slate-900"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Lock className="text-white w-3 h-3" />
                            </motion.div>
                        </div>
                        <div className="flex gap-1 mt-2">
                            <div className="w-12 h-1 bg-blue-500/30 rounded overflow-hidden">
                                <motion.div
                                    className="w-full h-full bg-blue-400"
                                    animate={{ x: [-50, 50] }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    initial={{ x: Math.random() * 400 - 200, y: Math.random() * 200 - 100, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "circIn" }}
                    style={{ top: '50%', left: '50%' }}
                >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
                </motion.div>
            ))}
        </div>
    );
};
