import { useState, useEffect } from 'react';

const TypingEffect = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, 50 + Math.random() * 50); // Random typing speed
            return () => clearTimeout(timeout);
        }
    }, [displayedText, started, text]);

    return <span>{displayedText}</span>;
};

export default TypingEffect;
