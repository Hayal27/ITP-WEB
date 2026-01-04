import React, { useEffect, useState } from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGlobeAfrica,
  FaBuilding,
  FaChartLine,
  FaHandshake,
  FaLightbulb,
  FaUsers,
  FaRocket
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../assets/css/AboutUs.css';
import '../assets/css/Mission-Vision.css';

const features = [
  {
    icon: <FaGlobeAfrica className="feature-icon" />,
    title: 'National-Level Initiative',
    desc: `Backed by Ethiopia's digital transformation agenda`
  },
  {
    icon: <FaBuilding className="feature-icon" />,
    title: 'Full-Scale Infrastructure',
    desc: `Cloud, co-working, incubation, and enterprise zones`
  },
  {
    icon: <FaChartLine className="feature-icon" />,
    title: 'Startup & SME Support',
    desc: `Incubation, mentoring, and market access for local innovators`
  },
  {
    icon: <FaGlobeAfrica className="feature-icon" />,
    title: 'Gateway to Africa',
    desc: `Strategic hub for East Africa's growing tech market`
  },
  {
    icon: <FaHandshake className="feature-icon" />,
    title: 'Investment Linkages',
    desc: `Connecting global investors with high-potential African tech ventures`
  }
];

// Reusable section component for alternating layout
const AboutSection = ({
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
  <div className={`image-text-block ${reverse ? 'image-right' : 'image-left'}`}>
    <div className="image-container">
      <img src={image} alt={alt} width={600} height={400} loading="lazy" />
      <div className="image-overlay">
        <div className="social-links">
          <a href="#" aria-label="LinkedIn"><FaLinkedin aria-hidden="true" /></a>
          <a href="#" aria-label="Twitter"><FaTwitter aria-hidden="true" /></a>
          <a href="#" aria-label="Facebook"><FaFacebook aria-hidden="true" /></a>
        </div>
      </div>
    </div>
    <motion.div
      className="text-container"
      initial={{ opacity: 0, x: reverse ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  </div>
);

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
          } else {
            entry.target.classList.remove('visible');
            entry.target.classList.add('hidden');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements that need animation
    const elements = document.querySelectorAll('.image-text-block, .about-voice, .about-cta');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about-park">
      <div className="about-wrapper
        container
        mx-auto
        px-4
        sm:px-8
        md:px-12
        lg:px-16
        xl:px-20
        2xl:px-24
        3xl:px-32
        4xl:px-40
        5xl:px-52
        max-w-full
        sm:max-w-screen-sm
        md:max-w-screen-md
        lg:max-w-screen-lg
        xl:max-w-screen-xl
        2xl:max-w-[1536px]
        3xl:max-w-[1920px]
        4xl:max-w-[2560px]
        5xl:max-w-[3840px]">
        <motion.header
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-header-row">
            <FaRocket className="main-title-icon" aria-hidden="true" />
            <h2>We Are Ethiopian IT Park</h2>
          </div>
          <motion.p className="intro inspiring-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
            <strong>We Are</strong> the beating heart of Ethiopia's digital revolution — a world-class technology hub empowering innovation, entrepreneurship, and economic growth.
          </motion.p>

          {/* Who We Are (image left, text right) */}
          <AboutSection image="https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1747135433/Incubation_euahej.png" alt="Incubation and Innovation Lab at Ethiopian IT Park">
            <h3><FaUsers style={{ color: 'var(--color-secondary)', marginRight: 8 }} aria-hidden="true" /> Who We Are</h3>
            <p className="about-general">
              We are a <strong>government-supported, future-driven ICT hub</strong> located in Addis Ababa, designed to be the <strong>digital backbone</strong> of Ethiopia's transformation. At Ethiopian IT Park, we nurture the next generation of <strong>tech leaders, startups, and investors</strong> who are shaping Africa's digital future.
            </p>
          </AboutSection>

          {/* What We Stand For (image right, text left) */}
          <AboutSection image="/images/home/stand-for.jpg" alt="Community Event" reverse={true}>
            <h3><FaLightbulb style={{ color: 'var(--color-primary)', marginRight: 8 }} aria-hidden="true" /> What We Stand For</h3>
            <ul className="about-values">
              <li><strong>Innovation</strong> – We foster creative solutions that solve real-world problems.</li>
              <li><strong>Inclusion</strong> – We believe technology should empower all Ethiopians, everywhere.</li>
              <li><strong>Collaboration</strong> – We bridge government, academia, industry, and investors.</li>
              <li><strong>Impact</strong> – We aim to create jobs, attract investment, and scale digital capabilities.</li>
            </ul>
          </AboutSection>

          {/* What Makes Us Unique (image left, text right) */}
          <AboutSection image="/images/home/makes-unique.jpg" alt="Training Session" reverse={false}>
            <h3><FaHandshake style={{ color: 'var(--color-accent)', marginRight: 8 }} aria-hidden="true" /> What Makes Us Unique?</h3>
            <div className="features-table">
              {features.map((f, i) => (
                <div className="feature-row" key={i}>
                  <span className="feature-title">{f.title}</span>
                  <span className="feature-desc">{f.desc}</span>
                </div>
              ))}
            </div>
          </AboutSection>

          {/* Our Role (image right, text left) */}
          <AboutSection image="/images/home/our-role.jpg" alt="Our Role" reverse={true}>
            <h3><FaRocket style={{ color: 'var(--color-primary)', marginRight: 8 }} aria-hidden="true" /> Our Role in Digital Ecosystem</h3>
            <ul className="about-role-list">
              <li>Startups are born</li>
              <li>Innovations thrive</li>
              <li>Global partnerships begin</li>
              <li>Jobs are created</li>
              <li>Ideas become products</li>
            </ul>
          </AboutSection>

          {/* Voice of the Nation's Innovators */}
          <div className="about-voice">
            <motion.blockquote initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
              "We are here to lead Ethiopia's future with innovation, knowledge, and collaboration."
            </motion.blockquote>
          </div>
        </motion.header>
      </div>
    </section>
  );
};

export default AboutUs;