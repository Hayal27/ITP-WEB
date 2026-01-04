import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/workingProcess.css';

const iconClasses = [
  "fa-solid fa-lightbulb",         // Ideation
  "fa-solid fa-circle-check",      // Validation
  "fa-solid fa-list-check",        // Planning
  "fa-solid fa-laptop-code",       // Development
  "fa-solid fa-flask",             // Testing & Improvement
  "fa-solid fa-rocket",            // Launch & Acceleration
  "fa-solid fa-chart-line",        // Growth & Impact
];

interface ProcessStep {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

const steps: ProcessStep[] = [
  {
    title: 'Ideation',
    desc: 'We nurture bold ideas through collaboration, market research, and ecosystem insights to identify real-world tech challenges and opportunities.',
    icon: iconClasses[0],
    color: '#0C7C92',
  },
  {
    title: 'Validation',
    desc: 'Concepts are tested through stakeholder feedback, feasibility studies, and early prototyping to ensure relevance and sustainability.',
    icon: iconClasses[1],
    color: '#6EC9C4',
  },
  {
    title: 'Planning',
    desc: 'We define clear objectives, align resources, and create agile roadmaps that guide project execution from start to scale.',
    icon: iconClasses[2],
    color: '#0C7C92',
  },
  {
    title: 'Development',
    desc: 'Our resident experts, startups, and partners collaborate to build solutions using modern technologies and continuous innovation practices.',
    icon: iconClasses[3],
    color: '#16284F',
  },
  {
    title: 'Testing & Improvement',
    desc: 'We rigorously test, refine, and improve through iterations, user feedback, and quality assurance to ensure excellence.',
    icon: iconClasses[4],
    color: '#6EC9C4',
  },
  {
    title: 'Launch & Acceleration',
    desc: 'Solutions are launched with strategic support — from investment readiness to marketing and global scaling — powered by IT Park infrastructure.',
    icon: iconClasses[5],
    color: '#0C7C92',
  },
  {
    title: 'Growth & Impact',
    desc: 'We support ongoing growth, monitor impact, and facilitate expansion across Ethiopia and beyond, strengthening the national digital economy.',
    icon: iconClasses[6],
    color: '#0C7C92',
  },
];

const WorkingProcess: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = Math.ceil(steps.length / 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('process-visible');
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            if (index > activeStep) {
              setActiveStep(index);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [activeStep]);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % totalSlides;
        const container = document.getElementById('process-scroll');
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
    const container = document.getElementById('process-scroll');
    if (container) {
      const cardWidth = container.scrollWidth / steps.length;
      container.scrollTo({
        left: cardWidth * index * 3,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="working-process">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          <div className="lg:w-2/3 mb-6 lg:mb-0">
            <div className="section-title">
              <span className="process-subtitle block mb-2 wow fadeInUp text-primary font-bold uppercase tracking-wider text-sm">
                From Idea to Impact at Ethiopian IT Park
              </span>
              <h2 className="process-main-title wow fadeInUp" data-wow-delay="0.25s">
                Collaborative Journey Towards Africa's Innovation Pulse
              </h2>
            </div>
          </div>
          <div className="lg:w-1/3 flex lg:justify-end">
            <div className="section-btn wow fadeInUp" data-wow-delay="0.5s">
              <a
                href="/contact"
                className="btn-default inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="process-progress-container">
          <div className="process-progress-bar">
            <div
              className="process-progress-fill"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="process-progress-text">
            Step {activeStep + 1} of {steps.length}
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            id="process-scroll"
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] snap-start wow fadeInUp process-card-container ${i <= activeStep ? 'active' : ''}`}
                data-wow-delay={`${i * 0.1}s`}
                data-index={i}
                ref={(el) => { cardsRef.current[i] = el; }}
              >
                <div className="working-process-step h-full">
                  {/* Progress Line */}
                  <div className="step-progress-line" />

                  <div className="working-process-header">
                    <div className="working-process-title">
                      <i className={`${step.icon} icon-style`} style={{ color: step.color }} aria-hidden="true"></i>
                      <h3>{step.title}</h3>
                    </div>
                    <div className="working-process-no" style={{ background: step.color }}>
                      <p>{i + 1}</p>
                    </div>
                  </div>

                  <div className="working-process-content">
                    <p>{step.desc}</p>
                  </div>

                  {/* Step Status Badge */}
                  <div className="step-status-badge">
                    {i <= activeStep ? (
                      <span className="status-active">
                        <i className="fa-solid fa-check"></i> In Progress
                      </span>
                    ) : (
                      <span className="status-upcoming">Upcoming</span>
                    )}
                  </div>
                </div>

                {/* Connection Dot */}
                <div className="step-connection-dot" style={{ background: step.color }} />
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-blue-400'
                  }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={currentSlide === i ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Navigation Arrows (Desktop) */}
          <button
            onClick={() => {
              const container = document.getElementById('process-scroll');
              if (container) {
                container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
                setCurrentSlide((prev) => Math.max(0, prev - 1));
              }
            }}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 z-10"
            aria-label="Previous step"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => {
              const container = document.getElementById('process-scroll');
              if (container) {
                container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
                setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
              }
            }}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 z-10"
            aria-label="Next step"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Hide scrollbar CSS */}
          <style>{`
            #process-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="process-bg-decoration" aria-hidden="true">
        <div className="process-bg-shape process-bg-shape-1"></div>
        <div className="process-bg-shape process-bg-shape-2"></div>
      </div>
    </section>
  );
};

export default WorkingProcess;