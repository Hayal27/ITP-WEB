import React, { useEffect, useState } from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaBuilding,
  FaLightbulb,
  FaUsers,
  FaHandshake,
  FaRocket
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './WhoWeAre.css';
import { getWhoWeAreSections, WhoWeAreSection } from '../../services/apiService';

interface FeatureItem {
  title: string;
  desc: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

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
  <motion.div
    className={`who-image-block ${reverse ? 'who-image-right' : 'who-image-left'}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={itemVariants}
  >
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
    <div className="who-text-container">
      {children}
    </div>
  </motion.div>
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] who-park">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[var(--who-secondary)] border-t-transparent rounded-full animate-spin"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            className="mt-4 text-[var(--who-primary)] font-bold tracking-widest text-xs uppercase text-center"
          >
            Loading Story
          </motion.div>
        </div>
      </div>
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="who-header-row">
            <div className="who-main-title-icon">
              <FaRocket />
            </div>
            <h2>{heroSection?.title || 'We Are Ethiopian IT Park'}</h2>
          </div>
          <motion.p
            className="who-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {heroSection?.subtitle || 'The beating heart of Ethiopia\'s digital revolution — a world-class technology hub empowering innovation, entrepreneurship, and economic growth.'}
          </motion.p>
        </motion.header>

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
                <IconComponent style={{ color: 'var(--who-secondary)' }} />
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
              <FaHandshake style={{ color: 'var(--who-accent)' }} />
              {featuresSection.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {featuresSection.content && (() => {
                try {
                  const features: FeatureItem[] = JSON.parse(featuresSection.content);
                  return features.map((f, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-[var(--who-muted-bg)] dark:bg-[var(--who-white)] rounded-2xl p-5 border border-[var(--who-border)] flex flex-col transition-shadow hover:shadow-xl"
                    >
                      <span className="font-black uppercase tracking-widest text-[var(--who-primary)] text-[10px] mb-2">{f.title}</span>
                      <span className="text-[var(--who-text-light)] text-sm font-medium leading-relaxed">{f.desc}</span>
                    </motion.div>
                  ));
                } catch {
                  return <p>Unable to load features</p>;
                }
              })()}
            </div>
          </WhoSection>
        )}

        {voiceSection && (
          <motion.div
            className="who-voice"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <blockquote dangerouslySetInnerHTML={{ __html: voiceSection.subtitle || '&ldquo;We are here to lead Ethiopia&rsquo;s future with innovation, knowledge, and collaboration.&rdquo;' }}>
            </blockquote>
          </motion.div>
        )}

        <motion.div
          className="who-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a href="#" className="who-cta-btn who-primary">Join the Movement</a>
          <a href="#" className="who-cta-btn who-secondary">Explore Innovation</a>
          <a href="#" className="who-cta-btn who-accent">Partner With Us</a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
