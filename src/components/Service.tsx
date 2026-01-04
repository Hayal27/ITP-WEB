import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCloud, FaBuilding, FaUsers, FaGraduationCap, FaLightbulb, FaChartLine } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import '../styles/Service.css';

interface Service {
  id: number;
  title: string;
  description: string;
  details: string[];
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  gradient: string;
  category: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Cloud Services',
    description: 'Secure, scalable, and locally hosted cloud infrastructure for digital transformation.',
    details: [
      'Scalable cloud hosting & storage solutions',
      'Platform as a Service (PaaS) environments',
      'Infrastructure as a Service (IaaS) options',
      'Cloud security & compliance services',
    ],
    Icon: FaCloud,
    color: '#0C7C92',
    gradient: 'linear-gradient(135deg, #0C7C92 0%, #6EC9C4 100%)',
    category: 'Infrastructure',
  },
  {
    id: 2,
    title: 'Smart Infrastructure',
    description: 'Modern office spaces and facilities designed for innovation and collaboration.',
    details: [
      'Flexible smart office rentals',
      'High-speed internet & power backup',
      'Meeting rooms & event spaces',
      'Co-working zones & innovation hubs',
    ],
    Icon: FaBuilding,
    color: '#6EC9C4',
    gradient: 'linear-gradient(135deg, #6EC9C4 0%, #0C7C92 100%)',
    category: 'Infrastructure',
  },
  {
    id: 3,
    title: 'Incubation & Acceleration',
    description: 'Comprehensive support for startups and innovative businesses.',
    details: [
      'Startup incubation programs',
      'Mentorship & expert coaching',
      'Business model development',
      'Access to co-working spaces',
    ],
    Icon: FaUsers,
    color: '#16284F',
    gradient: 'linear-gradient(135deg, #16284F 0%, #0C7C92 100%)',
    category: 'Development',
  },
  {
    id: 4,
    title: 'Capacity Building',
    description: 'Advanced training and skill development programs.',
    details: [
      'Digital skills training programs',
      'Software development bootcamps',
      'Entrepreneurship workshops',
      'Specialized ICT certifications',
    ],
    Icon: FaGraduationCap,
    color: '#0C7C92',
    gradient: 'linear-gradient(135deg, #0C7C92 0%, #6EC9C4 100%)',
    category: 'Development',
  },
  {
    id: 5,
    title: 'Innovation Services',
    description: 'Cutting-edge technology and innovation support.',
    details: [
      'Access to innovation labs',
      'AI & IoT sandbox environments',
      'Product testing & prototyping',
      'R&D partnership programs',
    ],
    Icon: FaLightbulb,
    color: '#6EC9C4',
    gradient: 'linear-gradient(135deg, #6EC9C4 0%, #0C7C92 100%)',
    category: 'Innovation',
  },
  {
    id: 6,
    title: 'Business Development',
    description: 'Comprehensive support for business growth and success.',
    details: [
      'Market research and advisory',
      'Networking & B2B events',
      'Investment facilitation',
      'Policy & regulatory guidance',
    ],
    Icon: FaChartLine,
    color: '#16284F',
    gradient: 'linear-gradient(135deg, #16284F 0%, #0C7C92 100%)',
    category: 'Growth',
  },
];

const Service: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = Math.ceil(services.length / 3);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % totalSlides;
        const container = document.getElementById('services-scroll');
        if (container) {
          const cardWidth = container.scrollWidth / services.length;
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
    const container = document.getElementById('services-scroll');
    if (container) {
      const cardWidth = container.scrollWidth / services.length;
      container.scrollTo({
        left: cardWidth * index * 3,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="service-preview">
      {/* Horizontal Scrolling Container */}
      <div
        className="relative group px-4 sm:px-6 md:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          id="services-scroll"
        >
          {services.map((service, index) => {
            const Icon = service.Icon;
            return (
              <motion.div
                key={service.id}
                className="service-preview-card flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] snap-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Number Badge */}
                <div className="service-badge" style={{ background: service.gradient }}>
                  {String(service.id).padStart(2, '0')}
                </div>

                {/* Category Tag */}
                <div className="service-category-tag">
                  {service.category}
                </div>

                {/* Icon Container with Enhanced Effects */}
                <div className="service-preview-icon-container" style={{ background: service.gradient }} aria-hidden="true">
                  <div className="service-icon-glow" style={{ background: service.gradient }}></div>
                  <Icon className="service-preview-icon" />
                </div>

                <div className="service-preview-content">
                  <h3 className="service-preview-card-title">
                    <Link to="/services">{service.title}</Link>
                  </h3>
                  <p className="service-preview-description">{service.description}</p>

                  <ul className="service-preview-features">
                    {service.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        className="service-preview-feature"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className="feature-check" style={{ background: service.color }} aria-hidden="true">✓</span>
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>


                </div>

                {/* Premium Shine Effect */}
                <div className="service-card-shine"></div>
              </motion.div>
            );
          })}
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
            const container = document.getElementById('services-scroll');
            if (container) {
              container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
              setCurrentSlide((prev) => Math.max(0, prev - 1));
            }
          }}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 z-10"
          aria-label="Previous service slide"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => {
            const container = document.getElementById('services-scroll');
            if (container) {
              container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
              setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
            }
          }}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 z-10"
          aria-label="Next service slide"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Hide scrollbar CSS */}
        <style>{`
          #services-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      <motion.div
        className="service-preview-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link to="/services" className="service-preview-cta-button">
          <span>Explore All Services</span>
          <MdArrowForward className="arrow-icon" />
        </Link>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="service-bg-decoration" aria-hidden="true">
        <div className="service-bg-circle service-bg-circle-1"></div>
        <div className="service-bg-circle service-bg-circle-2"></div>
      </div>
    </section>
  );
};

export default Service;