import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/css/investmentSteps.css';

const steps = [
  { title: 'Eligibility Check', desc: 'Review criteria for sector focus, investment size, and partnership requirements.' },
  { title: 'Application Submission', desc: 'Submit application forms and feasibility studies.' },
  { title: 'Business License', desc: 'Provide business license and necessary permits.' },
  { title: 'Proposal Approval', desc: 'Receive formal acceptance from IT Park.' },
  { title: 'Site Evaluation', desc: 'Site visit to assess infrastructure and suitability.' },
  { title: 'Agreement Signing', desc: 'Sign lease agreements and investment contracts.' },
  { title: 'Infrastructure Setup', desc: 'Develop office spaces and IT infrastructure.' },
  { title: 'Operations Launch', desc: 'Obtain permits, hire staff, and commence operations.' },
  { title: 'Expansion & Support', desc: 'Scale operations with incentives and networking.' },
];

const InvestmentSteps = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const totalSlides = Math.ceil(steps.length / 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % totalSlides;
        const container = document.getElementById('investment-steps-scroll');
        if (container) {
          const cardWidth = container.scrollWidth / steps.length;
          container.scrollTo({
            left: cardWidth * next * 3,
            behavior: 'smooth'
          });
        }
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const scrollToSlide = (index: number) => {
    setCurrentSlide(index);
    const container = document.getElementById('investment-steps-scroll');
    if (container) {
      const cardWidth = container.scrollWidth / steps.length;
      container.scrollTo({
        left: cardWidth * index * 3,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-[var(--bg-main)] to-[var(--bg-card)]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header Section - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 sm:mb-10 gap-4"
        >
          <div className="lg:w-3/5">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--primary)] mb-2"
            >
              Investment Journey
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text-main)] leading-tight"
            >
              Steps to Investing in Ethiopia
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:w-2/5 flex lg:justify-end"
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#16284F] to-[#0C7C92] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Horizontal Scrolling Cards Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scroll Container */}
          <div
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            id="investment-steps-scroll"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] snap-start"
                ref={(el) => { cardsRef.current[i] = el; }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className="relative h-full bg-[var(--bg-card)] backdrop-blur-sm rounded-2xl border border-[var(--border-color)] overflow-hidden group/card"
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                  {/* Step Number Badge */}
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-gradient-to-br from-[#16284F] to-[#0C7C92] flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Content */}
                  <div className="relative p-5 sm:p-6">
                    <motion.h3
                      className="text-base sm:text-lg font-black text-[var(--text-main)] mb-2 pr-12 leading-tight"
                      animate={{ color: hoveredCard === i ? 'var(--primary)' : 'var(--text-main)' }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                      {step.desc}
                    </p>

                    {/* Progress Indicator */}
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-[var(--neutral)] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${((i + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: true }}
                          ></motion.div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">Step {i + 1}/{steps.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i
                  ? 'w-8 bg-[#0C7C92]'
                  : 'w-1.5 bg-gray-300 hover:bg-[#0C7C92]/50'
                  }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows (Desktop) */}
          <motion.button
            onClick={() => {
              const container = document.getElementById('investment-steps-scroll');
              if (container) {
                container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
                setCurrentSlide((prev) => Math.max(0, prev - 1));
              }
            }}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-[var(--bg-card)] backdrop-blur-sm rounded-full shadow-xl items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 border border-[var(--border-color)]"
            whileHover={{ scale: 1.1, backgroundColor: '#eff6ff' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous investment steps"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => {
              const container = document.getElementById('investment-steps-scroll');
              if (container) {
                container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
                setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
              }
            }}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-[var(--bg-card)] backdrop-blur-sm rounded-full shadow-xl items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 border border-[var(--border-color)]"
            whileHover={{ scale: 1.1, backgroundColor: '#eff6ff' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next investment steps"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Hide scrollbar CSS */}
        <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      </div>
    </section>
  );
};

export default InvestmentSteps;