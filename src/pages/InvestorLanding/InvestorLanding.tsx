import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCalendarCheck,
    FaEnvelope,
    FaPhoneAlt,
    FaChartLine,
    FaGlobeAfrica,
    FaBuilding,
    FaHandshake,
    FaArrowRight,
    FaLightbulb,
    FaMicrochip,
    FaGraduationCap,
    FaLinkedin,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaSpinner
} from 'react-icons/fa';
import './InvestorLanding.css';

import { submitInvestorInquiry } from '../../services/apiService';
import Captcha, { CaptchaHandle } from '../../components/Captcha/Captcha';

const InvestorLanding: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        organization: '',
        areaOfInterest: '',
        website: '' // Honeypot field
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const captchaRef = useRef<CaptchaHandle>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isCaptchaVerified) {
            setStatus('error');
            setMessage('Please verify the security captcha.');
            return;
        }
        setStatus('loading');
        try {
            const response = await submitInvestorInquiry(formData);
            if (response.success) {
                setStatus('success');
                setMessage(response.message);
                setFormData({ fullName: '', email: '', organization: '', areaOfInterest: '', website: '' });
                setIsCaptchaVerified(false);
                captchaRef.current?.reset();
            } else {
                setStatus('error');
                setMessage(response.message || 'Something went wrong.');
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Connection failed.');
        }
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const zones = [
        { name: "ICT Business Zone", icon: <FaBuilding />, desc: "High-speed fiber & secure data centers for BPOs and tech firms." },
        { name: "Manufacturing Zone", icon: <FaMicrochip />, desc: "Electronics assembly and hardware production facilities." },
        { name: "Knowledge Zone", icon: <FaGraduationCap />, desc: "Academic-industry partnerships and R&D innovation hubs." },
        { name: "Commercial Zone", icon: <FaHandshake />, desc: "Retail, banking, and business support services." }
    ];

    const leaders = [
        {
            name: "Belete Esubalew",
            title: "Chief Executive Officer",
            desc: "Driving the strategic vision and growth of Ethiopian IT Park.",
            pic: "/images/bele.png",
            email: "belete.esubalew@ethiopianitpark.et",
            linkedin: "https://linkedin.com/in/beleteesubalew"
        },
        {
            name: "Olana Abebe",
            title: "Deputy CEO",
            desc: "Overseeing operational excellence and strategic execution.",
            pic: "/images/olana.png",
            email: "olana.abebe@ethiopianitpark.et",
            linkedin: "https://linkedin.com/in/olanaabebe"
        }
    ];

    return (
        <div className="investor-landing-container">
            {/* Hero Section */}
            <section className="investor-hero">

                <div className="hero-background"></div>
                <div className="container">
                    <motion.div
                        className="hero-header"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="ceo-badge">Executive Investor Portal</div>
                    </motion.div>

                    <div className="hero-content">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Discover Ethiopia's <br />
                            <span>Investment-Ready Future</span>
                        </motion.h1>
                        <motion.p
                            className="tagline"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Ethiopia is a competitive ICT destination. EITPC is a government-backed,
                            strategic hub offering incentives and global market access.
                        </motion.p>

                        <motion.div
                            className="cta-group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <a href="#contact" className="btn-primary-premium">
                                <FaCalendarCheck /> Schedule Investment Briefing
                            </a>
                            <a href="#why-now" className="btn-secondary-premium">
                                Why Invest Now?
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="value-proposition">
                <div className="container">
                    <motion.div
                        className="section-title text-center"
                        {...fadeIn}
                    >
                        <span className="subtitle">Strong Value Proposition</span>
                        <h2>Competitive Innovation Destination</h2>
                    </motion.div>

                    <motion.div
                        className="proposition-grid"
                        variants={stagger}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <motion.div className="prop-card" variants={fadeIn}>
                            <div className="prop-icon"><FaGlobeAfrica /></div>
                            <h3>Strategic Market Access</h3>
                            <p>Plug into the African Continental Free Trade Area (AfCFTA) and Middle Eastern markets from Addis Ababa.</p>
                        </motion.div>
                        <motion.div className="prop-card" variants={fadeIn}>
                            <div className="prop-icon"><FaBuilding /></div>
                            <h3>Government-Backed</h3>
                            <p>Direct institutional support and policy alignment with the 'Digital Ethiopia 2025' national strategy.</p>
                        </motion.div>
                        <motion.div className="prop-card" variants={fadeIn}>
                            <div className="prop-icon"><FaHandshake /></div>
                            <h3>Investor Incentives</h3>
                            <p>Exclusive SEZ proclamation benefits including duty-free imports and long-term tax holidays.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Why Invest Now */}
            <section className="why-invest-now" id="why-now">
                <div className="container">
                    <div className="why-now-grid">
                        <motion.div
                            className="why-now-content"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="subtitle">The Momentum</span>
                            <h2>Why Invest Now?</h2>
                            <div className="why-item">
                                <div className="why-num">01</div>
                                <div className="why-text">
                                    <h4>Market Timing</h4>
                                    <p>Catch the wave of Ethiopia's rapid liberalisation and digital transformation.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-num">02</div>
                                <div className="why-text">
                                    <h4>Reform Momentum</h4>
                                    <p>Policy reforms making it easier than ever to register, build, and scale operations.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-num">03</div>
                                <div className="why-text">
                                    <h4>Pipeline Growth</h4>
                                    <p>Expanding zones and upcoming infrastructure projects offer first-mover advantages.</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="why-now-box"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="high-impact-tool">
                                <FaChartLine className="tool-icon" />
                                <h3>High-Impact Tool</h3>
                                <p>EITPC serves as the mobile-friendly gateway for FDI attraction and investor-ready engagement.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Investment Highlights */}
            <section className="investment-highlights">
                <div className="container">
                    <div className="highlights-content">
                        <motion.div
                            className="highlights-text"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="subtitle">The Advantage</span>
                            <h2>Key Investment Highlights</h2>
                            <ul className="highlights-list">
                                <li><FaArrowRight /> Competitive operational costs (Energy & Labor)</li>
                                <li><FaArrowRight /> Young, competent, and scalable talent pool</li>
                                <li><FaArrowRight /> Reliable infrastructure & plug-and-play facilities</li>
                                <li><FaArrowRight /> Secure data centers (e.g., Raxio Data Center)</li>
                                <li><FaArrowRight /> 24/7 Power backup and fiber connectivity</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="highlights-image"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="service-snapshot">
                                <h3>Our Service Ecosystem</h3>
                                <div className="service-tags">
                                    <span>Cloud Services</span>
                                    <span>Smart Infra</span>
                                    <span>Incubation</span>
                                    <span>Capacity Building</span>
                                    <span>R&D Labs</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Park Profile: Zoning */}
            <section className="park-profile-summary">
                <div className="container">
                    <motion.div className="section-title text-center" {...fadeIn}>
                        <span className="subtitle">Park Profile</span>
                        <h2>Data-Driven Infrastructure</h2>
                        <p>Addis Ababa | 200+ Hectares of Innovation-First Property</p>
                    </motion.div>

                    <div className="profile-grid">
                        {zones.map((zone, i) => (
                            <motion.div key={i} className="zone-card-mini" {...fadeIn} transition={{ delay: i * 0.1 }}>
                                <div className="zone-icon">{zone.icon}</div>
                                <h4>{zone.name}</h4>
                                <p>{zone.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Business Card Identity Preview */}
            <section className="card-preview-section">
                <div className="container">
                    <motion.div className="section-title text-center" {...fadeIn}>
                        <span className="subtitle">Executive Tools</span>
                        <h2>The Hybrid Investor Identity</h2>
                        <p className="section-desc">A professional bridge between physical engagement and high-impact digital storytelling.</p>
                    </motion.div>

                    <div className="business-card-display">
                        <motion.div
                            className="the-card front"
                            whileHover={{ rotateY: 10, rotateX: 5 }}
                        >
                            <div className="card-glass"></div>
                            <div className="card-content-inner">
                                <img src="/images/logo.png" alt="IT Park" className="card-logo-mini" />
                                <div className="card-names">
                                    <h3>Belete Esubalew</h3>
                                    <p>Chief Executive Officer</p>
                                </div>
                            </div>
                            <div className="card-footer-strip"></div>
                        </motion.div>

                        <motion.div
                            className="the-card back"
                            whileHover={{ rotateY: -10, rotateX: 5 }}
                        >
                            <div className="card-glass"></div>
                            <div className="card-content-inner">
                                <div className="qr-section">
                                    <div className="qr-placeholder">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ethiopianitpark.et/ceo-card" alt="QR Code" />
                                    </div>
                                    <p className="qr-cta">Discover Africa's Premier <br />Technology Investment Hub</p>
                                </div>
                                <div className="card-contact-strip">
                                    <span>+251 944 666 633</span>
                                    <span>ceo@itpark.et</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="executive-leadership">
                <div className="container">
                    <motion.div className="section-title text-center" {...fadeIn}>
                        <span className="subtitle">Our Leadership</span>
                        <h2>Direct Executive Engagement</h2>
                    </motion.div>

                    <div className="leaders-grid">
                        {leaders.map((leader, i) => (
                            <motion.div key={i} className="leader-landing-card" {...fadeIn} transition={{ delay: i * 0.2 }}>
                                <div className="leader-img-box">
                                    <img src={leader.pic} alt={leader.name} onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300')} />
                                </div>
                                <div className="leader-details">
                                    <h4>{leader.name}</h4>
                                    <span className="leader-role">{leader.title}</span>
                                    <p>{leader.desc}</p>
                                    <div className="leader-btns">
                                        <a href={leader.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>
                                        <a href={`mailto:${leader.email}`}><FaEnvelope /></a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / CTA Section */}
            <section className="investor-contact" id="contact">
                <div className="container">
                    <motion.div
                        className="contact-card-premium"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="contact-grid">
                            <div className="contact-info">
                                <h2>Request Investment Pack</h2>
                                <p>Get immediate access to clear, structured investment information and follow-up engagement.</p>

                                <div className="contact-links">
                                    <div className="contact-link">
                                        <FaMapMarkerAlt /> <span>Goro Road, Addis Ababa, Ethiopia</span>
                                    </div>
                                    <a href="mailto:contact@ethiopianitpark.et" className="contact-link">
                                        <FaEnvelope /> <span>contact@ethiopianitpark.et</span>
                                    </a>
                                    <a href="tel:+251944666633" className="contact-link">
                                        <FaPhoneAlt /> <span>+251 944 666 633</span>
                                    </a>
                                </div>
                            </div>
                            <div className="contact-form-minimal">
                                <h3>Investor Inquiry</h3>
                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div
                                            className="success-message"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <FaCheckCircle className="success-icon" />
                                            <h4>Thank You!</h4>
                                            <p>{message}</p>
                                            <button
                                                className="btn-secondary-premium mt-4"
                                                onClick={() => setStatus('idle')}
                                            >
                                                Send Another
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            {/* Honeypot field - hidden from users */}
                                            <div style={{ display: 'none' }} aria-hidden="true">
                                                <input
                                                    type="text"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    placeholder="Full Name"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={status === 'loading'}
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Business Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={status === 'loading'}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                name="organization"
                                                placeholder="Organization / Fund Name"
                                                value={formData.organization}
                                                onChange={handleChange}
                                                disabled={status === 'loading'}
                                            />
                                            <textarea
                                                name="areaOfInterest"
                                                placeholder="Investment Area of Interest (e.g., BPO, Cloud, Manufacturing)"
                                                rows={3}
                                                value={formData.areaOfInterest}
                                                onChange={handleChange}
                                                disabled={status === 'loading'}
                                            ></textarea>

                                            <div className="mb-4">
                                                <label className="text-sm font-medium text-gray-300 block mb-2">Security Verification</label>
                                                <Captcha ref={captchaRef} onVerify={setIsCaptchaVerified} />
                                            </div>

                                            {status === 'error' && <p className="error-text" style={{ color: '#ef4444', marginBottom: '1rem' }}>{message}</p>}

                                            <button
                                                type="submit"
                                                className="btn-primary-premium full-width"
                                                disabled={status === 'loading'}
                                            >
                                                {status === 'loading' ? (
                                                    <><FaSpinner className="spin" /> Submitting...</>
                                                ) : (
                                                    'Submit Inquiry'
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default InvestorLanding;
