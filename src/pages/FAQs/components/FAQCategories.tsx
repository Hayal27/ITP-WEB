import React from 'react';
import { motion } from 'framer-motion';
import { useFAQ } from './FAQContext';

const FAQCategories: React.FC = () => {
    const { categories, activeCategory, setActiveCategory } = useFAQ();

    return (
        <section className="faqPageCategories compact">
            <div className="faqPageCategoryList">
                {categories.map((category, index) => (
                    <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`faqPageCategoryButton compact ${activeCategory === category.id ? 'faqPageCategoryButtonActive' : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                        aria-current={activeCategory === category.id ? 'true' : 'false'}
                    >
                        <div className="categoryIconWrapper compact">
                            {category.icon}
                        </div>
                        <span className="categoryTitle compact">{category.title}</span>
                    </motion.button>
                ))}
            </div>
        </section>
    );
};

export default FAQCategories;
