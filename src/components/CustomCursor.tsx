import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import '../assets/css/CustomCursor.css';

const CustomCursor: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration for the outer ring (slight lag, elastic)
    const ringX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const ringY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    // Fast movement for the inner dot
    const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
    const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Optimized check: Use tag names and specific classes instead of expensive getComputedStyle
            const tagName = target.tagName;
            const isClickableTag = tagName === 'A' || tagName === 'BUTTON' || tagName === 'INPUT' ||
                tagName === 'SELECT' || tagName === 'TEXTAREA' || tagName === 'LABEL';

            const isSelectable = isClickableTag ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.classList.contains('clickable') ||
                target.classList.contains('cursor-pointer');

            setIsHovering(!!isSelectable);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        // Hide default cursor
        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.style.cursor = 'auto';
        };
    }, [mouseX, mouseY]);

    if (isMobile) return null;

    return (
        <div className="custom-cursor-container">
            {/* Outer Ring with Wave Animation */}
            <motion.div
                className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {/* Wave layer 1 */}
                <motion.div
                    className="cursor-wave wave-1"
                    animate={{
                        scale: isHovering ? [1, 2.8, 1] : [1, 2, 1],
                        opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                {/* Wave layer 2 (Offset) */}
                <motion.div
                    className="cursor-wave wave-2"
                    animate={{
                        scale: isHovering ? [1, 2.8, 1] : [1, 2, 1],
                        opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.9
                    }}
                />
            </motion.div>

            {/* Inner Red Pointer */}
            <motion.div
                className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </div>
    );
};

export default CustomCursor;
