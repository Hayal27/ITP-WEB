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
        const mediaQuery = window.matchMedia('(pointer: coarse) or (max-width: 1024px)');
        const handleDeviceType = (e: MediaQueryListEvent | MediaQueryList) => {
            const mobile = e.matches;
            setIsMobile(mobile);

            if (mobile) {
                document.body.style.cursor = 'auto';
            } else {
                document.body.style.cursor = 'none';
            }
        };

        // Initial check
        handleDeviceType(mediaQuery);

        // Listen for changes (e.g., resizing or switching to/from touch emulation)
        mediaQuery.addEventListener('change', handleDeviceType);

        const handleMouseMove = (e: MouseEvent) => {
            if (window.matchMedia('(pointer: coarse) or (max-width: 1024px)').matches) return;
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if (window.matchMedia('(pointer: coarse) or (max-width: 1024px)').matches) return;
            const target = e.target as HTMLElement;

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

        return () => {
            mediaQuery.removeEventListener('change', handleDeviceType);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.style.cursor = 'auto';
        };
    }, [mouseX, mouseY]);

    if (isMobile) {
        return null;
    }

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
