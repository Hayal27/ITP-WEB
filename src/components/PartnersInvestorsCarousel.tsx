import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPartners, getInvestors, Partner, Investor, fixImageUrl } from '../services/apiService';
import { FaExternalLinkAlt, FaHandshake, FaBriefcase } from 'react-icons/fa';

interface CarouselItem {
    id: string | number;
    name: string;
    type: string;
    industry: string;
    logo: string;
    link?: string;
    isPartner: boolean;
}

const PartnersInvestorsCarousel: React.FC = () => {
    const [items, setItems] = useState<CarouselItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [partners, investors] = await Promise.all([getPartners(), getInvestors()]);

                const normalizedPartners: CarouselItem[] = partners.map(p => ({
                    id: `p-${p.id}`,
                    name: p.company_name,
                    type: p.partnership_type || 'Strategic Partner',
                    industry: p.industry_type || 'Technology',
                    logo: p.logo || '',
                    link: p.website,
                    isPartner: true
                }));

                const normalizedInvestors: CarouselItem[] = investors.map(i => ({
                    id: `i-${i.id}`,
                    name: i.company_name,
                    type: i.investment_type || 'Investor',
                    industry: i.industry_type || 'Industry',
                    logo: i.image || '',
                    link: i.website,
                    isPartner: false
                }));

                const combined = [...normalizedPartners, ...normalizedInvestors];
                // Shuffle for variety
                const shuffled = combined.sort(() => Math.random() - 0.5);
                setItems(shuffled);
            } catch (err) {
                console.error("Failed to load carousel data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Automatic scrolling logic
    useEffect(() => {
        if (items.length <= 3) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % (items.length));
        }, 4000);
        return () => clearInterval(interval);
    }, [items.length]);

    if (loading || items.length === 0) return null;

    // Get exactly 3 items based on currentIndex with wrapping
    const getDisplayItems = () => {
        const result = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % items.length;
            result.push(items[index]);
        }
        return result;
    };

    const displayItems = getDisplayItems();

    return (
        <div className="w-full relative py-8 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {displayItems.map((item, idx) => (
                            <motion.div
                                key={`${item.id}-${currentIndex}`} // Key changes to trigger animation
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                transition={{
                                    duration: 0.6,
                                    delay: idx * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                className="relative group h-full"
                            >
                                <div className="h-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-blue-500/50 transition-all duration-500 flex flex-col items-center text-center">

                                    {/* Category Badge */}
                                    <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.isPartner ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                        }`}>
                                        {item.isPartner ? <FaHandshake className="inline mr-1" /> : <FaBriefcase className="inline mr-1" />}
                                        {item.isPartner ? 'Partner' : 'Investor'}
                                    </div>

                                    {/* Logo Container */}
                                    <div className="w-24 h-24 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-500 border border-slate-100 dark:border-slate-700">
                                        {item.logo ? (
                                            <img
                                                src={item.logo}
                                                alt={item.name}
                                                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/images/icons8-support-64.PNG'; // Fallback icon
                                                    (e.target as HTMLImageElement).classList.add('opacity-20');
                                                }}
                                            />
                                        ) : (
                                            <div className="text-slate-300 dark:text-slate-600">
                                                <FaHandshake size={32} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                                            {item.type}
                                        </p>
                                        <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
                                            {item.industry}
                                        </span>
                                    </div>

                                    {/* CTA */}
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-8 flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors group/link"
                                        >
                                            Official Website
                                            <FaExternalLinkAlt className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                        </a>
                                    )}
                                </div>

                                {/* Decorative glow effect */}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-3xl" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: Math.ceil(items.length / 1) }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i % items.length)}
                            className={`h-1.5 transition-all duration-500 rounded-full ${currentIndex === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 dark:bg-slate-800'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnersInvestorsCarousel;
