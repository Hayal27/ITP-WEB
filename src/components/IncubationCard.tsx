import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRocket, FaLightbulb, FaGraduationCap, FaLaptopCode, FaChartLine, FaCheckCircle, FaStar } from 'react-icons/fa';
import '../styles/IncubationCard.css';
import { getIncubationPrograms, getIncubationSuccessStories, IncubationProgram, IncubationSuccessStory, BACKEND_URL } from '../services/apiService';

const iconMap: { [key: string]: React.ReactNode } = {
  FaRocket: <FaRocket />,
  FaGraduationCap: <FaGraduationCap />,
  FaLaptopCode: <FaLaptopCode />,
  FaLightbulb: <FaLightbulb />,
  FaChartLine: <FaChartLine />
};

const IncubationCard: React.FC = () => {
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  const [programs, setPrograms] = useState<IncubationProgram[]>([]);
  const [stories, setStories] = useState<IncubationSuccessStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsData, storiesData] = await Promise.all([
          getIncubationPrograms(),
          getIncubationSuccessStories()
        ]);
        setPrograms(programsData);
        setStories(storiesData);
      } catch (err) {
        console.error('Error fetching incubation data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0C7C92]"></div>
      </div>
    );
  }

  return (
    <section className="itpc-incubation-wrapper">
      {/* Dynamic Background */}
      <div className="bg-blob blob-1 pointer-events-none"></div>
      <div className="bg-blob blob-2 pointer-events-none"></div>
      <div className="bg-blob blob-3 pointer-events-none"></div>

      <Container>
        {/* Section 1: Programs with Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-32"
        >
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <motion.div variants={itemVariants} className="premium-content-block">
                <span className="section-tag">
                  <FaRocket className="animate-bounce" aria-hidden="true" /> Innovation Hub
                </span>
                <h2 className="itpc-section-title">
                  Strategic <span>Incubation</span> Programs
                </h2>
                <p className="itpc-section-description">
                  Our comprehensive programs provide the perfect platform for startups to transform
                  innovative ideas into impactful solutions through expert mentorship and
                  state-of-the-art facilities.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="feature-pill"><FaCheckCircle className="text-[#6EC9C4]" aria-hidden="true" /> Mentorship</div>
                  <div className="feature-pill"><FaCheckCircle className="text-[#6EC9C4]" aria-hidden="true" /> Funding</div>
                  <div className="feature-pill"><FaCheckCircle className="text-[#6EC9C4]" aria-hidden="true" /> Networking</div>
                </div>

                {/* Added Stat Summary Box */}
                <div className="stat-summary-box mt-10">
                  <div className="stat-item-premium">
                    <span className="stat-val">50+</span>
                    <span className="stat-lab">Startups</span>
                  </div>
                  <div className="divider-v"></div>
                  <div className="stat-item-premium">
                    <span className="stat-val">12</span>
                    <span className="stat-lab">Programs</span>
                  </div>
                  <div className="divider-v"></div>
                  <div className="stat-item-premium">
                    <span className="stat-val">100%</span>
                    <span className="stat-lab">Support</span>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                variants={imageVariants}
                className="premium-image-container group"
              >
                <div className="image-backdrop"></div>
                <img
                  src="/images/program.png"
                  alt="Programs Overview - Strategic Incubation"
                  className="premium-header-img"
                  width="600"
                  height="400"
                  loading="lazy"
                />
                <div className="floating-badge top-10 right-10" aria-hidden="true">
                  <FaStar className="text-yellow-400" />
                  <span>Top Rated</span>
                </div>
              </motion.div>
            </Col>
          </Row>

          <Row className="g-4 mt-12">
            {programs.map((program, idx) => (
              <Col lg={4} md={6} key={program.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="program-card-premium"
                >
                  <div className="program-icon-wrapper" aria-hidden="true">
                    {iconMap[program.icon] || <FaRocket />}
                  </div>
                  <div className="program-content">
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    {program.link.startsWith('http') ? (
                      <a href={program.link} className="learn-more-btn" aria-label={`Explore details for ${program.title}`} target="_blank" rel="noopener noreferrer">
                        Explore Details <FaArrowRight aria-hidden="true" />
                      </a>
                    ) : (
                      <Link to={program.link} className="learn-more-btn" aria-label={`Explore details for ${program.title}`}>
                        Explore Details <FaArrowRight aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Section 2: Success Stories with Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <span className="section-tag tag-alt">
              <FaCheckCircle className="text-[#16284F]" aria-hidden="true" /> Success Stories
            </span>
            <h2 className="itpc-section-title">
              Our <span>Impact</span> in Numbers
            </h2>
            <p className="itpc-section-description mx-auto">
              Real stories from real Partners and investors who have scaled their visions with IT Park's ecosystem.
            </p>
          </div>

          <div className="story-grid-premium">
            {stories.map((story, idx) => (
              <motion.div
                key={story.id}
                variants={itemVariants}
                className="story-card-premium group"
                onMouseEnter={() => setHoveredStory(idx)}
                onMouseLeave={() => setHoveredStory(null)}
              >
                <img src={story.image_url} alt={story.title} className="story-image-premium" />
                <div className="story-overlay-premium">
                  <h3 className="story-title-premium">{story.title}</h3>
                </div>
                <div className="hover-details-premium">
                  <h3 className="text-white text-2xl font-bold mb-4">{story.title}</h3>
                  <div className="space-y-2 mb-6">
                    {(story.description || []).map((line, i) => (
                      <p key={i} className="text-white/90 text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {(story.stats || []).map((stat, i) => (
                      <div key={i} className="text-white">
                        <div className="text-xl font-black">{stat.number}</div>
                        <div className="text-[10px] uppercase tracking-wider opacity-80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  {story.link && (
                    <Link to={story.link} className="story-action-btn">
                      Read Full Story
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default IncubationCard;