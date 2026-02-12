import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaGlobeAfrica,
  FaChartLine,
  FaMicrochip,
  FaGraduationCap,
  FaHandsHelping,
  FaArrowRight,
  FaQuoteLeft
} from "react-icons/fa";
import "./Innovation.css";


const programs = [
  {
    title: "Digital Skills Academy",
    img: "/images/innovations/henok-skil.jpeg",
    desc: "Upskill with coding, AI, and digital business courses, tailored for Ethiopia's youth and professionals.",
    link: "#",
    icon: <FaGraduationCap />,
    color: "#0C7C92"
  },
  {
    title: "Startup Accelerator",
    img: "/images/innovations/incubation.jpg",
    desc: "A 12-week intensive program for early-stage startups. Access mentorship, funding, and global exposure.",
    link: "#",
    icon: <FaRocket />,
    color: "#16284F"
  },
  {
    title: "Innovation Bootcamp",
    img: "/images/innovations/Innovation Lab.jpeg",
    desc: "A 5-day hands-on bootcamp for teams and individuals to master design thinking and prototyping.",
    link: "#",
    icon: <FaLightbulb />,
    color: "#6EC9C4"
  },
  {
    title: "Corporate Innovation Lab",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    desc: "Custom innovation sprints for enterprises. Foster intrapreneurship and launch new ventures with IT Park.",
    link: "#",
    icon: <FaMicrochip />,
    color: "#0C7C92"
  },
  {
    title: "Women in Tech",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    desc: "Empowering women entrepreneurs through mentorship, funding, and high-impact networking events.",
    link: "#",
    icon: <FaUsers />,
    color: "#16284F"
  },
  {
    title: "Green Innovation",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    desc: "Accelerate sustainable startups focused on climate, agriculture, and clean energy in Ethiopia.",
    link: "#",
    icon: <FaGlobeAfrica />,
    color: "#6EC9C4"
  },
];

const features = [
  {
    icon: <FaGlobeAfrica />,
    title: "African Tech Hub",
    desc: "Located in the heart of Addis Ababa, Ethiopian IT Park is a gateway to Africa's booming digital economy.",
  },
  {
    icon: <FaUsers />,
    title: "Collaborative Community",
    desc: "Connect with startups, corporates, investors, and mentors in a thriving, inclusive ecosystem.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Business Support",
    desc: "From legal advice to funding access, get all the support you need to scale your innovation.",
  },
  {
    icon: <FaChartLine />,
    title: "Workshops & Events",
    desc: "Regular hackathons, seminars, and networking events to keep you inspired and connected.",
  },
];

const testimonials = [
  {
    name: "Lensa Mekonnen",
    role: "Founder, AddisTech",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "The IT Park's accelerator program gave us the mentorship and exposure we needed to launch our product across Africa.",
  },
  {
    name: "Samuel Getachew",
    role: "CEO, EthioCloud",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "The innovation lab helped our team rethink our business model and connect with key partners in the region.",
  },
  {
    name: "Hanna Tadesse",
    role: "CTO, Blue Nile AI",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "The bootcamp was a game-changer. We learned design thinking and built a prototype in just one week!",
  },
];

const InnovationAcceleration: React.FC = () => {
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="innovation-page-wrapper">


      {/* Hero Section */}
      <section className="innovation-hero-premium">
        <div className="hero-content-container container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text-block"
          >
            <span className="hero-badge">Innovation & Growth</span>
            <h1 className="hero-title">
              Powering the Next Wave of <span className="highlight">African Innovation</span>
            </h1>
            <p className="hero-subtitle">
              IT Park's mission is to nurture bold ideas into scalable ventures. Our programs provide
              the infrastructure, mentorship, and network needed to transform Ethiopia's digital landscape.
            </p>
            <div className="hero-btns">
              <button onClick={() => scrollToSection('programs')} className="btn-premium primary">

                Our Programs
              </button>

            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-visual-block"
          >
            <div className="floating-card c1"><FaRocket /> Lead</div>
            <div className="floating-card c2"><FaLightbulb /> Innovate</div>
            <div className="floating-card c3"><FaChartLine /> Scale</div>
            <img src="/images/innovations/Incubation.png" alt="Innovation at IT Park" className="hero-main-img" />
          </motion.div>
        </div>
        <div className="section-divider"></div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="programs-section-premium">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="section-header text-center"
          >
            <h2 className="section-title">Incubation & Innovation Programs</h2>
            <div className="underline-center"></div>
            <p className="section-desc">
              Tailored support systems designed for every stage of the entrepreneurial journey.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="programs-grid-premium"
          >
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="program-card-premium"
                onMouseEnter={() => setHoveredProgram(idx)}
                onMouseLeave={() => setHoveredProgram(null)}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <div className="program-image-wrapper">
                      <img src={program.img} alt={program.title} />
                      <div className="program-overlay" style={{ background: program.color + "cc" }}>
                        <div className="prog-icon-large">{program.icon}</div>
                      </div>
                    </div>
                    <div className="program-info">
                      <h3>{program.title}</h3>
                      <p>{program.desc.slice(0, 80)}...</p>
                    </div>
                  </div>
                  <div className="card-back" style={{ borderColor: program.color }}>
                    <div className="prog-icon-small" style={{ background: program.color }}>{program.icon}</div>
                    <h4>{program.title}</h4>
                    <p>{program.desc}</p>
                    <button className="learn-more-btn" style={{ color: program.color }}>
                      Learn More <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="features-section-premium">
        <div className="container">
          <div className="features-wrapper">
            <div className="features-text-side">
              <h2 className="section-title-small">Why Choose IT Park?</h2>
              <p>We provide more than just workspace. We provide a launchpad for your dreams.</p>
              <div className="features-grid-mini">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="feature-item-premium"
                  >
                    <div className="feature-icon-box">{feature.icon}</div>
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="features-visual-side">
              <div className="glass-stats-card">
                <h3>Our Ecosystem</h3>
                <div className="stat-row">
                  <div className="stat-box">
                    <strong>120+</strong>
                    <span>Startups</span>
                  </div>
                  <div className="stat-box">
                    <strong>15k+</strong>
                    <span>Jobs Created</span>
                  </div>
                </div>
                <div className="stat-row">
                  <div className="stat-box">
                    <strong>$12M</strong>
                    <span>Raised</span>
                  </div>
                  <div className="stat-box">
                    <strong>45+</strong>
                    <span>Partners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default InnovationAcceleration;