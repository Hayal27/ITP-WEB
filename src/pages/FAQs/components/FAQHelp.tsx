import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiMail, FiPhone, FiArrowRight } from 'react-icons/fi';

const FAQHelp: React.FC = () => {
    const options = [
        {
            icon: <FiMessageCircle />,
            title: 'Concierge Chat',
            desc: 'Instant connection with our specialized support desk.',
            link: '/contact',
            color: '#0D9488'
        },
        {
            icon: <FiMail />,
            title: 'Priority Email',
            desc: 'Typical response within 60 minutes for complex queries.',
            link: '/contact',
            color: '#2563EB'
        },
        {
            icon: <FiPhone />,
            title: 'Direct Line',
            desc: 'Available for immediate enterprise-level escalations.',
            link: '/contact',
            color: '#4F46E5'
        }
    ];

    return (
        <section className="faqPageHelp">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="helpContainer"
            >
                <div className="helpHeader">
                    <h2 className="faqPageHelpTitle">Beyond the common query?</h2>
                    <p className="faqPageHelpDesc">
                        Our specialized support architecture is designed to handle sophisticated inquiries that require human expertise.
                    </p>
                </div>

                <div className="faqPageHelpOptions">
                    {options.map((option, index) => (
                        <Link
                            key={index}
                            to={option.link}
                            className="faqPageHelpOption block no-underline"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
                                style={{ height: '100%', width: '100%' }} // Ensure it fills the Link
                            >
                                <div className="helpIconWrapper" style={{ backgroundColor: `${option.color}20`, color: option.color }}>
                                    {option.icon}
                                </div>
                                <h3>{option.title}</h3>
                                <p>{option.desc}</p>
                                <div className="learnMore">
                                    <span>Connect Now</span>
                                    <FiArrowRight />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default FAQHelp;
