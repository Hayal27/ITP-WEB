import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiLoader, FiCheck, FiX } from 'react-icons/fi';
import { useFAQ } from './FAQContext';

interface FAQAccordionProps {
    limit?: number;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ limit }) => {
    const {
        filteredFAQs,
        loading,
        expandedItems,
        toggleFAQ,
        handleFeedback,
        helpfulFeedback
    } = useFAQ();

    if (loading) {
        return (
            <div className="faqLoading compact">
                <FiLoader className="spin" />
                <p>Loading...</p>
            </div>
        );
    }

    const displayedFAQs = limit ? filteredFAQs.slice(0, limit) : filteredFAQs;

    const renderFeedbackButtons = (faqId: number | string) => {
        const id = String(faqId);
        return (
            <div className="faqPageFeedback compact">
                <span className="faqPageFeedbackText">Helpful?</span>
                <div className="faqPageFeedbackButtons">
                    <button
                        className={`faqPageFeedbackButton compact ${helpfulFeedback[id] === true ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleFeedback(faqId, true); }}
                    >
                        <FiCheck size={14} /> Yes
                    </button>
                    <button
                        className={`faqPageFeedbackButton compact ${helpfulFeedback[id] === false ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleFeedback(faqId, false); }}
                    >
                        <FiX size={14} /> No
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section className="faqPageAccordion compact">
            <div className="faqPageAccordionContainer">
                <AnimatePresence>
                    {displayedFAQs.length > 0 ? (
                        displayedFAQs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ delay: index * 0.03 }}
                                className={`faqPageAccordionItem compact ${expandedItems[String(faq.id)] ? 'active' : ''}`}
                            >
                                <button
                                    id={`faq-header-${faq.id}`}
                                    className={`faqPageAccordionHeader compact ${expandedItems[String(faq.id)] ? 'faqPageAccordionHeaderActive' : ''}`}
                                    onClick={() => toggleFAQ(faq.id)}
                                    aria-expanded={!!expandedItems[String(faq.id)]}
                                    aria-controls={`faq-content-${faq.id}`}
                                >
                                    <span className="faqId compact" aria-hidden="true">{index + 1}</span>
                                    <span className="faqPageAccordionQuestion compact">{faq.question}</span>
                                    <div className="iconContainer compact">
                                        <FiChevronDown
                                            className={`faqPageAccordionIcon ${expandedItems[String(faq.id)] ? 'faqPageAccordionIconRotate' : ''}`}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {expandedItems[String(faq.id)] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            id={`faq-content-${faq.id}`}
                                            className="faqPageAccordionContentWrapper"
                                            role="region"
                                            aria-labelledby={`faq-header-${faq.id}`}
                                        >
                                            <div className="faqPageAccordionContent compact">
                                                <p className="faqPageAccordionAnswer compact">{faq.answer}</p>
                                                {renderFeedbackButtons(faq.id)}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="noResults compact"
                        >
                            <p>No results found.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FAQAccordion;
