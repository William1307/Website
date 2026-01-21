import { motion } from 'framer-motion';

const ExpansiveLogo = () => {
    const LetterGroup = ({ initial, full }: { initial: string, full: string }) => {
        return (
            <motion.div
                className="flex items-center cursor-default bg-slate-900/50 hover:bg-slate-800/80 px-1 rounded-lg transition-colors border border-transparent hover:border-white/5"
                initial="rest"
                whileHover="hover"
                animate="rest"
            >
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-sm filter">
                    {initial}
                </span>
                <motion.div
                    variants={{
                        rest: { width: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
                        hover: { width: "auto", opacity: 1, transition: { type: 'spring', bounce: 0.3, duration: 0.5 } }
                    }}
                    className="overflow-hidden whitespace-nowrap"
                >
                    <span className="text-xl font-bold text-slate-300 ml-0.5 tracking-tight pr-2">
                        {full}
                    </span>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="flex items-center gap-1">
            <LetterGroup initial="K" full="ristofer" />
            <LetterGroup initial="W" full="illiam" />
            <LetterGroup initial="F" full="auvette" />
        </div>
    );
};

export default ExpansiveLogo;
