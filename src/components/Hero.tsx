import { Container } from '@mantine/core';
import classes from './HeroImage.module.css';
import { useCallback, useEffect, useState } from 'react';

interface HeroProps {
  images: string[];
  title: React.ReactNode;
  description: string;
}

export default function Hero({ images, title, description }: HeroProps) {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Track the previous active index to ensure gapless transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevActive(active);
    }, 600); // Clear prevActive after transition completes
    return () => clearTimeout(timer);
  }, [active]);
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

  // Auto-advance logic with faster transitions
  useEffect(() => {
    if (!isPlaying || hovering || images.length <= 1) return;

    const id = setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, 3500); // 3.5 seconds per image (faster)

    return () => clearInterval(id);
  }, [isPlaying, hovering, images.length]);

  const goTo = useCallback((index: number) => {
    if (index === active) return;
    setActive(index);
  }, [active]);

  return (
    <section
      aria-label="Hero – primary brand introduction"
      className="relative flex flex-col justify-end text-white overflow-hidden min-h-screen pt-16 sm:pt-20 lg:pt-24"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >

      {/* Background Images with Gapless Cross-Fade Transition */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={idx === 0 ? "Ethiopian IT Park - Premier Technology Hub" : `Hero Background ${idx + 1}`}
          width={1920}
          height={1080}
          fetchPriority={idx === 0 ? "high" : "low"}
          loading={idx === 0 ? "eager" : "lazy"}
          decoding="async"
          aria-hidden={idx !== active}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms] ease-in-out ${idx === active ? 'opacity-100 z-[2]' : idx === prevActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
            }`}
        />
      ))}

      {/* Enhanced Gradient Overlay - Better text readability */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]" />



      {/* Content Container - Enhanced spacing */}
      <Container size="xl" className="relative z-[3] pb-20 sm:pb-28 lg:pb-36">
        <div className="relative flex flex-col items-start justify-end w-full px-6 sm:px-10 lg:px-16">

          {/* Text Content with professional spacing */}
          <div className="max-w-5xl space-y-5 sm:space-y-7 lg:space-y-8">

            {/* Title with Writing Animation and Start Cursor */}
            <div className="relative flex items-start">
              {/* Brand Cursor that appears at the start ONLY after writing is complete */}
              {(!isTitleTyping && !isDescTyping && displayedText === description) && (
                <span className="inline-block w-0.5 sm:w-1 h-8 sm:h-10 md:h-12 lg:h-16 xl:h-20 bg-[#0C7C92] mr-2 sm:mr-3 animate-blink shadow-lg shadow-[#0C7C92]/40 shrink-0" />
              )}

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black tracking-tight leading-[1.2] sm:leading-[1.1]">
                {/* Static full title for screen readers and SEO */}
                <span className="sr-only">{extractText(title, false)}</span>

                {/* Animated typing title for visual users, hidden from screen readers */}
                <span aria-hidden="true" className="bg-gradient-to-r from-white via-blue-50 to-cyan-100 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] filter brightness-110">
                  {displayedTitle}
                  {isTitleTyping && (
                    <span className="inline-block w-0.5 sm:w-1 h-8 sm:h-10 md:h-12 lg:h-16 xl:h-20 bg-[#0C7C92] ml-1.5 sm:ml-2 animate-blink shadow-lg shadow-[#0C7C92]/40" />
                  )}
                </span>
              </h1>
            </div>

            {/* Description with Typing Animation and Professional Styling */}
            <div className="relative">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed sm:leading-relaxed lg:leading-loose text-white/98 font-normal max-w-4xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] backdrop-blur-[0.5px]">
                {displayedText}
                {isDescTyping && (
                  <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 bg-[#0C7C92] ml-1 animate-blink shadow-lg shadow-[#0C7C92]/40" />
                )}
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Slider indicators - Sleek Design */}
      {images.length > 1 && (
        <div
          className="absolute left-1/2 bottom-6 sm:bottom-8 lg:bottom-10 -translate-x-1/2 flex gap-2 sm:gap-2.5 lg:gap-3 z-10 bg-black/40 backdrop-blur-lg px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full border border-white/25 shadow-lg shadow-black/30"
          role="tablist"
          aria-label="Hero background selector"
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={active === idx}
              aria-current={active === idx ? 'true' : 'false'}
              aria-label={`Show slide ${idx + 1}`}
              tabIndex={active === idx ? 0 : -1}
              onClick={() => goTo(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${active === idx
                ? 'w-10 sm:w-12 lg:w-14 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/50'
                : 'w-1.5 sm:w-2 bg-white/60 hover:bg-white/80 hover:w-2.5 sm:hover:w-3'
                }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
