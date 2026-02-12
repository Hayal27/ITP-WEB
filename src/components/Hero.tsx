import { Container } from '@mantine/core';
import classes from './HeroImage.module.css';
import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  images: string[];
  title: React.ReactNode;
  description: string;
}

export default function Hero({ images, title, description }: HeroProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [hovering, setHovering] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTitleTyping, setIsTitleTyping] = useState(true);
  const [isDescTyping, setIsDescTyping] = useState(false);

  // Helper function to extract text from React elements
  const extractText = (node: React.ReactNode, skipSrOnly = false): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (!node) return '';
    if (Array.isArray(node)) return node.map(n => extractText(n, skipSrOnly)).join('');
    if (typeof node === 'object' && node !== null && 'props' in node) {
      const element = node as { props: { children?: React.ReactNode; className?: string } };
      if (skipSrOnly && element.props.className?.includes('sr-only')) return '';
      return extractText(element.props.children, skipSrOnly);
    }
    return '';
  };

  // Title typing animation effect
  useEffect(() => {
    const titleText = extractText(title, true);
    if (!titleText) return;

    let currentIndex = 0;
    setDisplayedTitle('');
    setIsTitleTyping(true);

    const typingInterval = setInterval(() => {
      if (currentIndex < titleText.length) {
        setDisplayedTitle(titleText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTitleTyping(false);
        clearInterval(typingInterval);
        // Start description typing after title completes
        setTimeout(() => setIsDescTyping(true), 300);
      }
    }, 50); // Title typing speed: 50ms per character

    return () => clearInterval(typingInterval);
  }, [title]);

  // Description typing animation effect
  useEffect(() => {
    if (!isDescTyping || !description) return;

    let currentIndex = 0;
    setDisplayedText('');

    const typingInterval = setInterval(() => {
      if (currentIndex < description.length) {
        setDisplayedText(description.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsDescTyping(false);
        clearInterval(typingInterval);
      }
    }, 25); // Description typing speed: 25ms per character

    return () => clearInterval(typingInterval);
  }, [description, isDescTyping]);

  // Auto-advance logic for sliding
  useEffect(() => {
    if (hovering || images.length <= 1) return;

    const id = setInterval(() => {
      setDirection(1);
      setActive((p) => (p + 1) % images.length);
    }, 5000); // 5 seconds per image for premium feel

    return () => clearInterval(id);
  }, [hovering, images.length]);

  const goTo = useCallback((index: number) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1
    })
  };

  return (
    <section
      aria-label="Hero – primary brand introduction"
      className="hero relative flex flex-col pt-16 sm:pt-20 lg:pt-24 bg-[var(--bg-main)]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* 1. Immersive Header Slider Section */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[88vh] overflow-hidden bg-[var(--bg-main)]">
        {/* Background Images with Sliding Transition */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={active}
            src={images[active]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            alt={`Hero Background ${active + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Refined Right-Aligned Text Overlay (No Background) */}
        <div className="absolute inset-y-0 right-0 z-[5] flex flex-col items-end justify-center text-right p-6 sm:p-10 md:p-16 lg:p-24 w-full md:w-[50%] lg:w-[40%]">
          <Container size="xl" className="w-full mr-0 pr-0">
            <div className="space-y-8 relative">
              {/* Refined Indigo Vertical Branding Bar */}
              <div
                className="absolute -right-4 md:-right-8 top-0 bottom-0 w-2 rounded-l-full shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                style={{ background: '#4F46E5' }}
              />

              {/* Dynamic Typing Title - Stark White & Modern Size */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white drop-shadow-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {displayedTitle}
                  <span className="inline-block w-2 h-8 sm:h-12 lg:h-16 bg-[#4F46E5] ml-4 animate-blink align-middle" />
                </motion.h1>
              </div>

              {/* Dynamic Typing Description - Clean & Readable */}
              <motion.p
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white font-bold max-w-xl ml-auto tracking-wide drop-shadow-md"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {displayedText}
              </motion.p>
            </div>
          </Container>
        </div>

        {/* Slider indicators - Enhanced Modern Style */}
        {images.length > 1 && (
          <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex gap-3 z-10 p-2 bg-[var(--bg-main)]/20 backdrop-blur-md rounded-full border border-[var(--border-color)]">
            {images.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={active === idx}
                aria-current={active === idx ? 'true' : 'false'}
                aria-label={`Show slide ${idx + 1}`}
                onClick={() => goTo(idx)}
                style={active === idx ? { background: 'var(--brand-gradient-horizontal)' } : {}}
                className={`h-1.5 rounded-full transition-all duration-500 ${active === idx ? 'w-12 shadow-lg shadow-[var(--primary)]/50' : 'w-2 bg-[var(--text-main)]/20 hover:bg-[var(--text-main)]/40'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
