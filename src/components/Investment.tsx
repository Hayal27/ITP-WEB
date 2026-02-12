import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  BuildingOffice2Icon,
  GlobeAltIcon,
  SignalIcon,
  LightBulbIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import '../assets/css/Investment.css';

// Import generated images
import buildingImage from '../assets/images/building_space_modern.png';
import landImage from '../assets/images/serviced_land_aerial.png';
import vsatImage from '../assets/images/vsat_technology_hub.png';
import consultingImage from '../assets/images/consulting_collaboration.png';
import bpoImage from '../assets/images/bpo_operations_center.png';

interface InvestmentOpportunity {
  id: number;
  badge: string;
  title: string;
  description: string;
  features: string[];
  link: string;
  image: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  gradient: string;
}

const opportunities: InvestmentOpportunity[] = [
  {
    id: 1,
    badge: '01',
    title: 'Building Space Rental',
    description: 'Premium office spaces with cutting-edge infrastructure and 24/7 security in Ethiopia\'s flagship technology hub.',
    features: [
      'Flexible lease terms',
      '99.9% uptime guaranteed',
      'Smart building automation',
      'Biometric access control'
    ],
    link: '/services/building-space',
    image: buildingImage,
    Icon: BuildingOffice2Icon,
    gradient: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)'
  },
  {
    id: 2,
    badge: '02',
    title: 'Serviced Land',
    description: 'Build-ready plots with complete infrastructure inside a regulated special economic zone for technology enterprises.',
    features: [
      'Plots from 500m² to 10,000m²',
      'Pre-installed fiber backbone',
      'Expedited permits',
      'Digital infrastructure access'
    ],
    link: '/services/serviced-land',
    image: landImage,
    Icon: GlobeAltIcon,
    gradient: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)'
  },
  {
    id: 3,
    badge: '03',
    title: 'VSAT Internet Services',
    description: 'Enterprise-grade satellite connectivity delivering reliable internet to remote locations across Ethiopia.',
    features: [
      'Bandwidth 5-100+ Mbps',
      'Low-latency connectivity',
      '24/7 NOC support',
      'Hybrid VSAT solutions'
    ],
    link: '/services/vsat-internet',
    image: vsatImage,
    Icon: SignalIcon,
    gradient: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)'
  },
  {
    id: 4,
    badge: '04',
    title: 'IT Consulting & Advisory',
    description: 'Strategic technology consulting — digital transformation, systems architecture, and cybersecurity audits.',
    features: [
      'Cloud migration planning',
      'Cybersecurity assessments',
      'Digital transformation',
      'Vendor evaluation advisory'
    ],
    link: '/services/consulting',
    image: consultingImage,
    Icon: LightBulbIcon,
    gradient: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)'
  },
  {
    id: 5,
    badge: '05',
    title: 'BPO & Outsourcing Services',
    description: 'Leverage Ethiopia\'s skilled workforce for scalable business process outsourcing and back-office functions.',
    features: [
      'Multilingual support',
      'Data processing & QA',
      'Content moderation',
      'Scalable engagement models'
    ],
    link: '/services/bpo',
    image: bpoImage,
    Icon: UserGroupIcon,
    gradient: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)'
  }
];

// Premium animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

const imageVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 0.8
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.2
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: i * 0.08
    }
  })
};

const InvestmentCard: React.FC<{ opportunity: InvestmentOpportunity; index: number }> = ({ opportunity, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = opportunity.Icon;
  const isImageLeft = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ scale: 1.01 }}
      className={`investment-item ${isImageLeft ? 'image-left' : 'image-right'}`}
      data-index={index}
    >
      {/* Image Panel */}
      <motion.div
        className="investment-image-panel"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="investment-image"
          style={{ backgroundImage: `url(${opportunity.image})` }}
          variants={imageVariants}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <motion.div
            className="investment-image-overlay"
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="investment-image-icon"
            whileHover={{
              y: -8,
              rotate: 5,
              scale: 1.1
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
          >
            <Icon />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Content Panel */}
      <div className="investment-content-panel">
        <motion.div
          className="investment-content"
          variants={contentVariants}
        >
          <motion.span
            className="investment-badge"
            style={{ background: opportunity.gradient }}
            whileHover={{
              scale: 1.05,
              x: isImageLeft ? 8 : -8
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {opportunity.badge}
          </motion.span>

          <h3 className="investment-title">
            <Link to={opportunity.link} className="investment-title-link">
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {opportunity.title}
              </motion.span>
              <motion.div
                whileHover={{ x: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRightIcon className="investment-title-arrow" />
              </motion.div>
            </Link>
          </h3>

          <motion.p
            className="investment-description"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {opportunity.description}
          </motion.p>

          <ul className="investment-features" role="list">
            {opportunity.features.map((feature, idx) => (
              <motion.li
                key={idx}
                className="investment-feature-item"
                custom={idx}
                variants={featureVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  x: isImageLeft ? 6 : -6,
                  backgroundColor: "var(--neutral)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CheckCircleIcon className="investment-feature-icon" aria-hidden="true" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          <Link to={opportunity.link} className="investment-cta-wrapper">
            <motion.div
              className="investment-cta"
              whileHover={{
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
            >
              <span>Learn More</span>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRightIcon className="investment-cta-arrow" />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
};

const Investment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className="investment-showcase" ref={containerRef}>
      <motion.div
        className="investment-showcase-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {opportunities.map((opportunity, index) => (
          <InvestmentCard
            key={opportunity.id}
            opportunity={opportunity}
            index={index}
          />
        ))}
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="investment-bg-decoration" aria-hidden="true">
        <motion.div
          className="investment-bg-circle investment-bg-circle-1"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="investment-bg-circle investment-bg-circle-2"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.06, 0.1, 0.06]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="investment-bg-circle investment-bg-circle-3"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.09, 0.05]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
    </section>
  );
};

export default Investment;
