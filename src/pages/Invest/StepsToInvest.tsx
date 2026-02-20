
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGlobeAfrica, FaChartLine, FaShieldAlt, FaHandsHelping,
  FaMoneyBillWave, FaUserTie, FaFileAlt, FaFileSignature,
  FaGavel, FaMapMarkedAlt, FaRegLightbulb, FaDownload, FaChevronRight,
  FaFile // Added FaFile
} from "react-icons/fa";
import { FiMap } from "react-icons/fi"; // Added FiMap as it is used in DB
import { Container, Row, Col } from "react-bootstrap";
import { getInvestmentSteps, getInvestmentResources, InvestmentStep, InvestmentResource, BACKEND_URL } from "../../services/apiService";
import "./StepsToInvest.css";

// Helper for dynamic icons
const IconMap: { [key: string]: React.ReactNode } = {
  FaFileAlt: <FaFileAlt />,
  FaFileSignature: <FaFileSignature />,
  FaGavel: <FaGavel />,
  FaMapMarkedAlt: <FaMapMarkedAlt />,
  FaRegLightbulb: <FaRegLightbulb />,
  FaFile: <FaFile />,
  FiMap: <FiMap />,
  default: <FaFileAlt />
};

const StepsToInvest: React.FC = () => {
  const [steps, setSteps] = useState<InvestmentStep[]>([]);
  const [resources, setResources] = useState<InvestmentResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stepsData, resourcesData] = await Promise.all([
          getInvestmentSteps(),
          getInvestmentResources()
        ]);
        setSteps(stepsData);
        setResources(resourcesData);
      } catch (error) {
        console.error("Failed to load investment data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="sti-page-bg">
      {/* Hero Section */}
      <section className="sti-hero-premium">
        <div className="hero-overlay-gradient" /> {/* Reusing from global or add new if specific */}
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="sti-hero-tag">Strategic Roadmap</span>
            <h1 className="sti-hero-title">
              Invest in <span className="sti-hero-accent">Tomorrow</span>, Today
            </h1>
            <p className="sti-hero-subtitle">
              Your gateway to Africa's premier technology hub. Simple steps, strategic support, sustainable success.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="d-flex justify-content-center gap-3"
            >
              <a href="#sti-stepper" className="sti-btn sti-btn-primary">
                Start Your Journey
              </a>
              <a href="#sti-support" className="sti-btn sti-btn-outline-white">
                Consult Expert
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Why Invest (Static for Speed/Performance) */}
      <Container className="mb-5">
        <Row className="g-4">
          {[
            { icon: <FaGlobeAfrica />, title: "Strategic Hub", desc: "Heart of Africa, connecting global markets." },
            { icon: <FaChartLine />, title: "High Growth", desc: "Capitalize on double-digit tech economic growth." },
            { icon: <FaShieldAlt />, title: "Secure Policy", desc: "Government-backed investor protection." }
          ].map((item, idx) => (
            <Col md={4} key={idx}>
              <motion.div
                whileHover={{ y: -5 }}
                className="sti-feature-card text-center p-4 h-100"
              >
                <div className="sti-feature-icon">{item.icon}</div>
                <h4 className="sti-feature-title">{item.title}</h4>
                <p className="sti-feature-desc">{item.desc}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Dynamic Stepper */}
      <section id="sti-stepper" className="sti-stepper">
        <Container>
          <h2 className="sti-section-title">Investment Implementation Plan</h2>
          <div className="sti-timeline-premium">
            {loading ? (
              <div className="text-center py-5">Loading roadmap...</div>
            ) : steps.length > 0 ? (
              steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  className="sti-step-premium"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="sti-step-marker">{step.step_number}</div>
                  <div className="sti-step-content">
                    <h3 className="sti-step-title">{step.title}</h3>
                    <p className="sti-step-desc">{step.description}</p>
                    {step.doc_url && (
                      <a href={step.doc_url} className="sti-doc-link" target="_blank" rel="noopener noreferrer">
                        <FaDownload /> Resources
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-5 text-muted">No investment steps available at this moment.</div>
            )}
          </div>
        </Container>
      </section>

      {/* Dynamic Resources */}
      <section className="sti-resources">
        <Container>
          <h2 className="sti-section-title">Investor Toolkit</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="row g-4"
          >
            {resources.length > 0 ? (
              resources.map((res) => (
                <Col md={3} sm={6} key={res.id}>
                  <motion.div variants={itemVariants} className="sti-resource-card-premium">
                    <div className="sti-resource-icon">
                      {IconMap[res.icon] || IconMap.default}
                    </div>
                    <h5 className="sti-resource-label">{res.label}</h5>
                    <a href={res.file_url} className="sti-download-btn" target="_blank" rel="noopener noreferrer">
                      Download <FaChevronRight />
                    </a>
                  </motion.div>
                </Col>
              ))
            ) : (
              <Col xs={12}>
                <div className="text-center py-5 text-muted">No resources available in the toolkit yet.</div>
              </Col>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Static Support Section */}
      <section id="sti-support" className="sti-support-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="sti-section-title" style={{ marginBottom: '20px' }}>Dedicated Investment Support</h2>
            <p className="text-muted">Our specialized team is here to guide you through every regulatory and operational hurdle.</p>
          </div>
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="sti-support-card p-5">
                <div className="d-flex align-items-center justify-content-center flex-column text-center">
                  <FaUserTie className="sti-support-icon" />
                  <h3>Investment Bureau</h3>
                  <p>Direct line to site allocation and licensing officers.</p>
                  <div className="d-flex gap-3 mt-3">
                    <a href="mailto:invest@ethiopianitpark.et" className="sti-btn sti-btn-primary-dark">Email Support</a>
                    <a href="tel:+251111000000" className="sti-btn sti-btn-outline">Call Direct</a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default StepsToInvest;