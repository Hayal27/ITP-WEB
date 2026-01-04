import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiHelpCircle, FiHome, FiBookOpen, FiDollarSign, FiUsers } from 'react-icons/fi';
import { getFAQs, FAQItem } from '../../../services/apiService';
import FAQCategories from './FAQCategories';
import FAQAccordion from './FAQAccordion';

interface FAQCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
}

interface FAQSectionProps {
    searchQuery?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ searchQuery = "" }) => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
    const [helpfulFeedback, setHelpfulFeedback] = useState<{ [key: string]: boolean }>({});

    const categories: FAQCategory[] = [
        {
            id: 'all',
            title: 'Global FAQ',
            icon: <FiHelpCircle />,
            description: 'The master collection of all knowledge base articles.'
        },
        {
            id: 'about',
            title: 'Ecosystem',
            icon: <FiHome />,
            description: 'Foundational insights into Ethiopian IT Park infrastructure.'
        },
        {
            id: 'services',
            title: 'Strategic Services',
            icon: <FiBookOpen />,
            description: 'Exclusive amenities and specialized enterprise facilities.'
        },
        {
            id: 'investment',
            title: 'Capital & Growth',
            icon: <FiDollarSign />,
            description: 'Strategic roadmaps for visionary global investors.'
        },
        {
            id: 'community',
            title: 'Innovation Network',
            icon: <FiUsers />,
            description: 'Our elite cluster of tech pioneers and collaborators.'
        }
    ];

    useEffect(() => {
        const loadFAQs = async () => {
            try {
                const data = await getFAQs();
                setFaqs(data);
            } catch (error) {
                console.error("Failed to fetch FAQs", error);
            } finally {
                setLoading(false);
            }
        };
        loadFAQs();
    }, []);

    const toggleFAQ = (faqId: number | string) => {
        const id = String(faqId);
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleFeedback = (faqId: number | string, isHelpful: boolean) => {
        const id = String(faqId);
        setHelpfulFeedback(prev => ({
            ...prev,
            [id]: isHelpful
        }));
    };

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const renderFeedbackButtons = (faqId: number | string) => {
        const id = String(faqId);
        return (
            <div className="faqPageFeedback">
                <span className="faqPageFeedbackText">Helpful?</span>
                <div className="faqPageFeedbackButtons">
                    <button
                        className={`faqPageFeedbackButton ${helpfulFeedback[id] === true ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleFeedback(faqId, true); }}
                    >
                        <FiCheck className="faqPageBrandIcon" /> Yes
                    </button>
                    <button
                        className={`faqPageFeedbackButton ${helpfulFeedback[id] === false ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleFeedback(faqId, false); }}
                    >
                        <FiX className="faqPageBrandIcon" /> No
                    </button>
                </div>
                <AnimatePresence>
                    {helpfulFeedback[id] !== undefined && (
                        <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="faqPageFeedbackMessage"
                        >
                            {helpfulFeedback[id] ? "Acknowledged!" : "Noted."}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <>
            <FAQCategories
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <FAQAccordion
                faqs={filteredFAQs}
                loading={loading}
                expandedItems={expandedItems}
                toggleFAQ={toggleFAQ}
                renderFeedbackButtons={renderFeedbackButtons}
            />
        </>
    );
};

export default FAQSection;
