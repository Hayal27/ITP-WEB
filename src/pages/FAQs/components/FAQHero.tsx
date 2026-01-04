import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { useFAQ } from './FAQContext';

interface FAQHeroProps {
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
}

const FAQHero: React.FC<FAQHeroProps> = ({ searchQuery: propSearch, setSearchQuery: propSetSearch }) => {
    const context = useFAQ();

    // Use props if provided, otherwise fallback to context
    const query = propSearch !== undefined ? propSearch : context.searchQuery;
    const setQuery = propSetSearch !== undefined ? propSetSearch : context.setSearchQuery;

    return (
        <section className="faqPageHero">
            <div className="faqPageHeroOverlay" />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="faqPageHeroContent"
            >
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="faqHeroBadge"
                >
                    KNOWLEDGE BASE
                </motion.span>
                <h1 className="faqPageHeroTitle">How can we assist you <span className="text-gradient">today?</span></h1>
                <p className="faqPageHeroSubtitle">
                    Access our comprehensive support library and find detailed answers about the Ethiopian IT Park ecosystem.
                </p>

                <div className="faqPageSearchWrapper">
                    <div className="faqPageSearchBar">
                        <FiSearch className="faqPageSearchIcon" />
                        <input
                            type="text"
                            className="faqPageSearchInput"
                            placeholder="Describe your issue or ask a question..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className="searchSuggestions">
                        <span>Popular:</span>
                        <button onClick={() => setQuery('Investment')}>Investment</button>
                        <button onClick={() => setQuery('Services')}>Services</button>
                        <button onClick={() => setQuery('IT Park')}>IT Park</button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FAQHero;
