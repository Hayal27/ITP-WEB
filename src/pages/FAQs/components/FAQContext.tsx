import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FiHelpCircle, FiHome, FiBookOpen, FiDollarSign, FiUsers } from 'react-icons/fi';
import { getFAQs, FAQItem } from '../../../services/apiService';

interface FAQCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
}

interface FAQContextType {
    faqs: FAQItem[];
    filteredFAQs: FAQItem[];
    categories: FAQCategory[];
    activeCategory: string;
    setActiveCategory: (id: string) => void;
    loading: boolean;
    expandedItems: { [key: string]: boolean };
    toggleFAQ: (id: number | string) => void;
    helpfulFeedback: { [key: string]: boolean };
    handleFeedback: (id: number | string, isHelpful: boolean) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const FAQContext = createContext<FAQContextType | undefined>(undefined);

export const FAQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
    const [helpfulFeedback, setHelpfulFeedback] = useState<{ [key: string]: boolean }>({});

    const categories: FAQCategory[] = [
        { id: 'all', title: 'Global', icon: <FiHelpCircle /> },
        { id: 'about', title: 'Ecosystem', icon: <FiHome /> },
        { id: 'services', title: 'Services', icon: <FiBookOpen /> },
        { id: 'investment', title: 'Capital', icon: <FiDollarSign /> },
        { id: 'community', title: 'Network', icon: <FiUsers /> }
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

    const toggleFAQ = useCallback((faqId: number | string) => {
        const id = String(faqId);
        setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
    }, []);

    const handleFeedback = useCallback((faqId: number | string, isHelpful: boolean) => {
        const id = String(faqId);
        setHelpfulFeedback(prev => ({ ...prev, [id]: isHelpful }));
    }, []);

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <FAQContext.Provider value={{
            faqs, filteredFAQs, categories, activeCategory, setActiveCategory,
            loading, expandedItems, toggleFAQ, helpfulFeedback, handleFeedback,
            searchQuery, setSearchQuery
        }}>
            {children}
        </FAQContext.Provider>
    );
};

export const useFAQ = () => {
    const context = useContext(FAQContext);
    if (!context) throw new Error('useFAQ must be used within an FAQProvider');
    return context;
};
