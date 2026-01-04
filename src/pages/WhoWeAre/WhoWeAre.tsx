import React, { useEffect, useState } from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGlobe,
  FaBuilding,
  FaChartBar,
  FaHandshake,
  FaLightbulb,
  FaUsers,
  FaRocket
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import './WhoWeAre.css';
import { getWhoWeAreSections, WhoWeAreSection } from '../../services/apiService';

interface FeatureItem {
  title: string;
  desc: string;
}

// Reusable section component for alternating layout
const WhoSection = ({
  image,
  alt,
  children,
  reverse = false,
}: {
  image: string;
  alt: string;
  children: React.ReactNode;
  reverse?: boolean;
}) => (
  <div className={`who-image-block ${reverse ? 'who-image-right' : 'who-image-left'}`}>
    <div className="who-image-container">
      <img src={image} alt={alt} />
      <div className="who-image-overlay">
        <div className="who-social-links">
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebook /></a>
        </div>
      </div>
    </div>
    <motion.div
      className="who-text-container"
      initial={{ opacity: 0, x: reverse ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  </div>
);

const WhoWeAre: React.FC = () => {
  const [sections, setSections] = useState<WhoWeAreSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getWhoWeAreSections();
        setSections(data);
      } catch (error) {
        console.error('Error fetching who we are sections:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('who-visible');
            entry.target.classList.remove('who-hidden');
          } else {
            entry.target.classList.remove('who-visible');
            entry.target.classList.add('who-hidden');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.who-image-block, .who-voice, .who-cta');
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [sections]);

  if (loading) {
    return (
      <section className="who-park">
        <div className="who-wrapper">
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }

  const heroSection = sections.find(s => s.section_type === 'hero');
  const regularSections = sections.filter(s => s.section_type === 'section');
  const featuresSection = sections.find(s => s.section_type === 'features');
  const voiceSection = sections.find(s => s.section_type === 'voice');

  return (
    <section className="who-park">
      <div className="who-wrapper">
        <motion.header
          className="who-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="who-header-row">
            <FaRocket className="who-main-title-icon" />
            <h2>{heroSection?.title || 'We Are Ethiopian IT Park'}</h2>
          </div>
          <motion.p className="who-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
            <strong>We Are</strong> {heroSection?.subtitle || 'the beating heart of Ethiopia\'s digital revolution — a world-class technology hub empowering innovation, entrepreneurship, and economic growth.'}
          </motion.p>

          {regularSections.map((section, index) => {
            const isReverse = index % 2 !== 0;
            const IconComponent = index === 0 ? FaUsers : index === 1 ? FaLightbulb : index === 2 ? FaHandshake : FaRocket;

            return (
              <WhoSection
                key={section.id}
                image={section.image_url || '/images/default.jpg'}
                alt={section.title || 'Section Image'}
                reverse={isReverse}
              >
                <h3>
                  <IconComponent style={{ color: 'var(--who-secondary)', marginRight: 8 }} />
                  {section.title}
                </h3>
                {section.content && (
                  <div
                    className="who-general"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </WhoSection>
            );
          })}

          {featuresSection && (
            <WhoSection
              image={featuresSection.image_url || '/images/default.jpg'}
              alt="What Makes Us Unique"
              reverse={false}
            >
              <h3>
                <FaHandshake style={{ color: 'var(--who-accent)', marginRight: 8 }} />
                {featuresSection.title}
              </h3>
              <div className="who-features-table grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {featuresSection.content && (() => {
                  try {
                    const features: FeatureItem[] = JSON.parse(featuresSection.content);
                    return features.map((f, i) => (
                      <div
                        key={i}
                        className="who-feature-row bg-white rounded-md shadow-sm p-2 border border-gray-100 flex flex-col hover:shadow-md transition-shadow"
                      >
                        <span className="who-feature-title font-semibold text-[color:var(--who-primary)] text-base mb-1">{f.title}</span>
                        <span className="who-feature-desc text-gray-600">{f.desc}</span>
                      </div>
                    ));
                  } catch {
                    return <p>Unable to load features</p>;
                  }
                })()}
              </div>
            </WhoSection>
          )}

          {voiceSection && (
            <div className="who-voice">
              <motion.blockquote initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
                {voiceSection.subtitle || '"We are here to lead Ethiopia\'s future with innovation, knowledge, and collaboration."'}
              </motion.blockquote>
            </div>
          )}

          <div className="who-cta">
            <motion.a href="#" className="who-cta-btn who-primary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}>Join the Movement</motion.a>
            <motion.a href="#" className="who-cta-btn who-secondary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.6 }}>Explore Innovation</motion.a>
            <motion.a href="#" className="who-cta-btn who-accent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}>Partner With Us</motion.a>
          </div>
        </motion.header>
      </div>
    </section>
  );
};

export default WhoWeAre;