import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Helper hook for scroll since useScroll is common
const androidxScrollHook = () => {
    const [scroll, setScroll] = useState(0);
    useEffect(() => {
        const updateScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScroll(window.scrollY / totalHeight);
        }
        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);
    return { scrollYProgress: scroll };
}

const ScrollProgress = () => {
    // Using actual framer motion hook for scroll
    const { scrollYProgress: realScroll } = androidxScrollHook();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-[100]"
            style={{ scaleX: realScroll }}
        />
    );
};

export default ScrollProgress;
