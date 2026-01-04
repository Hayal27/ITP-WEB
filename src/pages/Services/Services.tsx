import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaLightbulb, FaRocket, FaHandshake, FaGraduationCap, FaTools, FaHeadset, FaArrowRight, FaDownload, FaChartBar, FaCloud, FaLaptopCode, FaLock, FaNetworkWired, FaRobot, FaUserTie } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';
import './Services.css';
import { Link } from 'react-router-dom';

// Service categories data
const serviceCategories = [
  {
    id: 1,
    title: 'Custom Software Development',
    icon: FaLaptopCode,
    description: 'Web, mobile, and desktop app development. Full-cycle: idea, design, build, deploy. Modern, scalable, and secure solutions.',
    services: [
      'Web, mobile, and desktop app development',
      'Full-cycle: idea, design, build, deploy',
      'Modern, scalable, and secure solutions',
    ],
  },
  {
    id: 2,
    title: 'Cloud Solutions',
    icon: FaCloud,
    description: 'Cloud migration & infrastructure setup. Azure, AWS, Google Cloud expertise. Managed, scalable, and cost-effective services.',
    services: [
      'Cloud migration & infrastructure setup',
      'Azure, AWS, Google Cloud expertise',
      'Managed, scalable, and cost-effective services',
    ],
  },
  {
    id: 3,
    title: 'Cybersecurity Services',
    icon: FaLock,
    description: 'Security audits & risk assessments. Endpoint protection & firewalls. Data protection & compliance.',
    services: [
      'Security audits & risk assessments',
      'Endpoint protection & firewalls',
      'Data protection & compliance',
    ],
  },
  {
    id: 4,
    title: 'IT Support & Maintenance',
    icon: FaTools,
    description: '24/7 technical support. System updates & troubleshooting. Performance monitoring & managed IT.',
    services: [
      '24/7 technical support',
      'System updates & troubleshooting',
      'Performance monitoring & managed IT',
    ],
  },
  {
    id: 5,
    title: 'Network Infrastructure',
    icon: FaNetworkWired,
    description: 'Network design & implementation. Wireless, cabling, VPN, firewall setup. Reliable & secure connectivity.',
    services: [
      'Network design & implementation',
      'Wireless, cabling, VPN, firewall setup',
      'Reliable & secure connectivity',
    ],
  },
  {
    id: 6,
    title: 'IT Consulting',
    icon: FaUserTie,
    description: 'Digital transformation strategy. IT infrastructure assessment & planning. Technology selection & guidance.',
    services: [
      'Digital transformation strategy',
      'IT infrastructure assessment & planning',
      'Technology selection & guidance',
    ],
  },
];

// Zonal services data
const zonalServices = [
  {
    id: 1,
    title: 'BPO Zone',
    description: 'Shared infrastructure and support for business process outsourcing',
    features: ['Call center facilities', 'Shared workspaces', 'Training rooms', 'Support services']
  },
  {
    id: 2,
    title: 'Software Zone',
    description: 'Development labs and tools for software companies',
    features: ['DevOps tools', 'Testing grounds', 'Collaboration spaces', 'Tech support']
  },
  {
    id: 3,
    title: 'Innovation Zone',
    description: 'Research and innovation facilities',
    features: ['Research grants', 'University partnerships', 'Prototyping labs', 'Mentorship']
  },
  {
    id: 4,
    title: 'Emerging Tech Zone',
    description: 'Facilities for cutting-edge technologies',
    features: ['Blockchain labs', 'Fintech support', 'AI/ML facilities', 'IoT labs']
  }
];

// Target audience data
const targetAudience = [
  {
    id: 1,
    title: 'Startups',
    description: 'Incubation, co-working, and funding support',
    icon: FaRocket
  },
  {
    id: 2,
    title: 'Corporates',
    description: 'Office leasing, talent access, and innovation labs',
    icon: FaBuilding
  },
  {
    id: 3,
    title: 'Investors',
    description: 'Licensing, consultation, and tax benefits',
    icon: FaHandshake
  },
  {
    id: 4,
    title: 'Academia',
    description: 'Lab access, collaboration, and publishing support',
    icon: FaGraduationCap
  }
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({
    zones: 0,
    companies: 0,
    services: 0,
    partners: 0,
    youth: 0
  });

  useEffect(() => {
    // Animate stats
    const interval = setInterval(() => {
      setStats(prev => ({
        zones: Math.min(prev.zones + 1, 5),
        companies: Math.min(prev.companies + 5, 60),
        services: Math.min(prev.services + 1, 15),
        partners: Math.min(prev.partners + 1, 12),
        youth: Math.min(prev.youth + 50, 1000)
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="itpc-services-page">
      {/* Hero Section with Fixed Header Spacing */}
      <section className="itpc-services-hero">
        <div className="itpc-services-hero-content">
          <motion.div 
            className="itpc-services-hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="itpc-services-hero-title">IT Services</h1>
            <p className="itpc-services-hero-subtitle">
              At <span className="font-bold" style={{ color: '#16284F' }}>Ethiopian IT Park</span>, we provide innovative and reliable IT solutions to help organizations stay ahead in the digital era. From system development to cloud computing, our expert team delivers tailored services designed to meet your unique business needs.
            </p>
          </motion.div>
          <motion.div 
            className="itpc-services-hero-image"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="itpc-services-hero-stats">
              <div className="itpc-services-stat-item">
                <span className="itpc-services-stat-number">{stats.zones}</span>
                <span className="itpc-services-stat-label">Service Zones</span>
              </div>
              <div className="itpc-services-stat-item">
                <span className="itpc-services-stat-number">{stats.companies}+</span>
                <span className="itpc-services-stat-label">Companies</span>
              </div>
              <div className="itpc-services-stat-item">
                <span className="itpc-services-stat-number">{stats.services}+</span>
                <span className="itpc-services-stat-label">Services</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Categories with Modern Grid */}
      <section className="itpc-services-categories">
        <div className="itpc-services-container">
          <div className="itpc-services-section-header">
            <h2 className="itpc-services-section-title">Our Service Categories</h2>
            <p className="itpc-services-section-text">Comprehensive solutions for every stage of your tech journey</p>
          </div>
          <div className="itpc-services-categories-grid">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  className="itpc-services-category-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="itpc-services-category-icon">
                    <Icon />
                  </div>
                  <h3 className="itpc-services-category-title">{category.title}</h3>
                  <p className="itpc-services-category-text">{category.description}</p>
                  <ul className="itpc-services-category-list">
                    {category.services.map((service, i) => (
                      <li key={i} className="itpc-services-category-item">
                        <span className="itpc-services-checkmark">✓</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Zonal Services with Modern Tabs */}
      <section className="itpc-services-zones">
        <div className="itpc-services-container">
          <div className="itpc-services-section-header">
            <h2 className="itpc-services-section-title">Our Service Zones</h2>
            <p className="itpc-services-section-text">Specialized areas designed for different tech sectors</p>
          </div>
          <div className="itpc-services-zones-tabs">
            {zonalServices.map((zone, index) => (
              <motion.button
                key={zone.id}
                className={`itpc-services-tab-btn ${activeTab === index ? 'itpc-services-tab-active' : ''}`}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {zone.title}
              </motion.button>
            ))}
          </div>
          <motion.div 
            className="itpc-services-zone-content"
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="itpc-services-zone-title">{zonalServices[activeTab].title}</h3>
            <p className="itpc-services-zone-text">{zonalServices[activeTab].description}</p>
            <ul className="itpc-services-zone-list">
              {zonalServices[activeTab].features.map((feature, index) => (
                <li key={index} className="itpc-services-zone-item">
                  <span className="itpc-services-checkmark">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Target Audience with Modern Cards */}
      <section className="itpc-services-audience">
        <div className="itpc-services-container">
          <div className="itpc-services-section-header">
            <h2 className="itpc-services-section-title">Who We Serve</h2>
            <p className="itpc-services-section-text">Tailored solutions for different sectors</p>
          </div>
          <div className="itpc-services-audience-grid">
            {targetAudience.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <motion.div
                  key={audience.id}
                  className="itpc-services-audience-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="itpc-services-audience-icon">
                    <Icon />
                  </div>
                  <h3 className="itpc-services-audience-title">{audience.title}</h3>
                  <p className="itpc-services-audience-text">{audience.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support CTA with Modern Design */}
      <section className="itpc-services-support">
        <div className="itpc-services-container">
          <div className="itpc-services-cta-content">
            <h2 className="itpc-services-cta-title">Need Help Choosing the Right Service?</h2>
            <p className="itpc-services-cta-text">Our service advisors are here to help you make the best choice for your needs.</p>
            <div className="itpc-services-cta-buttons">
              <motion.button 
                className="itpc-services-cta-btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Now <Link to="/contact" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 