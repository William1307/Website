import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const NavLink = ({ href, children, onClick }: { href?: string, children: React.ReactNode, onClick?: () => void }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for the magnetic effect
    const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Gradient for the specific spotlight
    const gradient = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.4), transparent 80%)`;

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        // Magnetic pull calculation
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Move the button a fraction of the distance (magnetic feel)
        x.set(distanceX * 0.2);
        y.set(distanceY * 0.2);

        // Spotlight calculation relative to element
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        mouseX.set(-1000); // Move spotlight out
        mouseY.set(-1000);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick();
                }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative px-4 py-2 text-sm font-medium text-slate-300 transition-colors group cursor-pointer block"
        >
            {/* Background Spotlight */}
            <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: gradient }}
            />

            {/* Subtle border ring that lights up */}
            <span className="absolute inset-0 rounded-full ring-1 ring-white/5 group-hover:ring-white/20 transition-all duration-300" />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">{children}</span>
        </motion.a>
    );
};

export default NavLink;
