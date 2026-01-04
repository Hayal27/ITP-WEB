import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiClock, FiTarget } from 'react-icons/fi';

const FAQSmartCard: React.FC = () => {
    return (
        <section className="faqPageSmartCard">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="faqPageSmartCardContainer"
            >
                <div className="faqPageSmartCardLeft">
                    <div className="faqPageSmartCardProfile">
                        <div className="imageWrapper">
                            <img
                                src="/assets/images/faqs-image.png"
                                alt="Support Team Member"
                                className="faqPageSmartCardImage"
                            />
                            <div className="onlineBadge" />
                        </div>
                        <div className="faqPageSmartCardInfo">
                            <span className="premiumBadge">PLATINUM SUPPORT</span>
                            <h3>Elite Response Team</h3>
                            <p>Specialized consultants ready for your technical inquiries.</p>
                            <div className="faqPageSmartCardStats">
                                <div className="faqPageSmartCardStat">
                                    <span className="statValue">98%</span>
                                    <p className="statLabel">FCR Rate</p>
                                </div>
                                <div className="faqPageSmartCardStat">
                                    <span className="statValue">2min</span>
                                    <p className="statLabel">Avg Response</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="faqPageSmartCardRight">
                    <div className="faqPageSmartCardFeatures">
                        <h3 className="featuresTitle">Why Choose ITPC Support?</h3>
                        <div className="faqPageSmartCardFeaturesList">
                            <div className="faqPageSmartCardFeature">
                                <div className="featureIcon active">
                                    <FiCheck />
                                </div>
                                <div className="faqPageSmartCardFeatureText">
                                    <h4>Technical Mastery</h4>
                                    <p>Direct access to ecosystem engineers and legal experts.</p>
                                </div>
                            </div>
                            <div className="faqPageSmartCardFeature">
                                <div className="featureIcon active">
                                    <FiClock />
                                </div>
                                <div className="faqPageSmartCardFeatureText">
                                    <h4>Global Coverage</h4>
                                    <p>Synchronized support across all international time zones.</p>
                                </div>
                            </div>
                            <div className="faqPageSmartCardFeature">
                                <div className="featureIcon active">
                                    <FiTarget />
                                </div>
                                <div className="faqPageSmartCardFeatureText">
                                    <h4>Strategic Guidance</h4>
                                    <p>Bespoke solutions tailored to your investment roadmap.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FAQSmartCard;
