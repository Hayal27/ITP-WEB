import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaTiktok, FaTelegram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero';
import WhoWeAre from '../WhoWeAre/WhoWeAre';
import WorkingProcess from '../../components/WorkingProcess';
import Investment from '../../components/Investment';
import IncubationCard from '../../components/IncubationCard';
import LiveChatWidget from '../../components/LiveChatWidget';
import Service from '../../components/Service';
import NewsEventsHighlights from '../../components/NewsEventsHighlights';
import InvestmentSteps from '../../components/InvestmentSteps';
import PartnersInvestorsCarousel from '../../components/PartnersInvestorsCarousel';
import SEO from '../../components/SEO/SEO';
import { Text } from '@mantine/core';
import FAQAccordion from '../FAQs/components/FAQAccordion';
import FAQCategories from '../FAQs/components/FAQCategories';
import { FAQProvider } from '../FAQs/components/FAQContext';
import '../FAQs/FAQsPage.css';

const images = [
  //from public folder D:\itpccms\tets\ITPCWEBSITE\public\images\hero\lands.jpg 
  '/images/hero/lands.jpg',
  'https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1758800607/office_hmfkwd.jpg',
  'https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1758800663/incu_2_ozfp0o.jpg',
  'https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1766663873/hero1_jn4mpp.jpg',
  'https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1747135446/reaseach_ew642q.png',

];

const Home: React.FC = () => {
  const [isAtFooter, setIsAtFooter] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtFooter(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  return (
    <main id="main-content" className="home-root font-sans antialiased">
      <SEO
        description="IT Park is Ethiopia's flagship technology and innovation hub empowering startups, enterprises, and talent with infrastructure, incubation, and investment pathways."
        image="https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1758800607/office_hmfkwd.jpg"
      />
      <Hero
        images={images}
        title={
          <>
            <span className="sr-only">Ethiopian IT Park - Empowering Innovation</span>
            Ethiopian IT Park
            <Text component="span" inherit variant="gradient" gradient={{ from: 'var(--primary)', to: 'var(--secondary)', deg: 5 }} className="inline-block bg-clip-text text-transparent">
            </Text>
          </>
        }
        description="IT Park is where ambition meets infrastructure. We accelerate innovation with incubation, digital services, resilient workspace, and a collaborative ecosystem designed to grow Africa's technology future."
      />

      {/* About Section - Company Introduction */}
      <section id="about" aria-labelledby="about-title" className="md:py-5 bg-gradient-to-b from-[var(--neutral)] to-[var(--bg-main)]/90 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-10 xl:px-16 2xl:px-24 max-w-[150rem]">
          <h2 id="about-title" className="sr-only">About Ethiopian IT Park</h2>
          <WhoWeAre />
        </div>
      </section>

      {/* News & Events Highlights Section */}
      <section id="news-events" aria-labelledby="news-events-title" className="py-24 bg-[var(--accent)]/95 text-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(12,124,146,0.35),transparent_60%)] pointer-events-none" />
        <div className="relative container mx-auto px-4 md:px-10 xl:px-16 2xl:px-24 max-w-[150rem]">
          <div className="mb-14 text-center max-w-4xl mx-auto">
            <h2 id="news-events-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Latest <span className="text-white opacity-90 drop-shadow-sm">News & Events</span>
            </h2>
            <p className="mt-4 text-white/90 text-lg leading-relaxed">
              Stay informed with announcements, milestones, and innovation spotlights from the Ethiopian IT Park community.
            </p>
          </div>
          <NewsEventsHighlights />
          <div className="text-center mt-10">
            <NavLink
              to="/resources/digital/news"
              className="inline-block px-10 py-3.5 rounded-full bg-[var(--primary)] hover:bg-[var(--secondary)] font-bold text-indigo-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 border-2 border-[var(--primary)] dark:border-[var(--primary)]/80 dark:bg-transparent dark:hover:bg-white dark:hover:text-[var(--primary)]"
            >
              View All News & Events
            </NavLink>
          </div>
        </div>
      </section>

      <InvestmentSteps />

      {/* Services Section - What We Offer */}
      <section id="services" aria-labelledby="services-title" className="py-24 bg-[var(--bg-main)] relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(12,124,146,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-10 xl:px-16 2xl:px-24 max-w-[150rem]">
          <div className="mb-14 text-center">
            <h2 id="services-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--accent)]">
              Our <span className="text-[var(--primary)]">Services</span>
            </h2>
            <p className="mt-4 text-[var(--accent)]/75 max-w-2xl mx-auto">
              Comprehensive solutions tailored to Ethiopia's expanding digital and innovation landscape.
            </p>
          </div>
          <Service />
        </div>
      </section>

      {/* Incubation Section - Special Program Highlight */}
      <section id="incubation" aria-labelledby="incubation-title" className="py-24 relative bg-[var(--neutral)]">
        <div className="container mx-auto px-4 md:px-10 xl:px-16 2xl:px-24 max-w-[150rem]">
          <h2 id="incubation-title" className="sr-only">Incubation Programs</h2>
          <IncubationCard />
        </div>
      </section>

      {/* Process Section - How We Work */}
      <section id="process" aria-labelledby="process-title" className="py-24 bg-gradient-to-br from-[var(--bg-card)] via-[var(--neutral)] to-[var(--bg-card)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay [background:repeating-linear-gradient(45deg,rgba(12,124,146,0.08)_0_12px,transparent_12px_24px)] pointer-events-none" />
        <div className="relative container mx-auto px-4 md:px-10 xl:px-16 2xl:px-24 max-w-[150rem]">
          <div className="mb-14 text-center">
            <h2 id="process-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--accent)]">
              Our <span className="text-[var(--primary)]">Process</span>
            </h2>
            <p className="mt-4 text-[var(--accent)]/75 max-w-3xl mx-auto">
              A structured pathway converting vision into validated, scalable digital products with ecosystem support.
            </p>
          </div>
          <WorkingProcess />
        </div>
      </section>

      {/* Investment Section - Partnership Opportunities */}
      <section
        id="investment"
        aria-labelledby="investment-title"
        className="py-32 relative bg-[var(--bg-main)] border-y border-[var(--border-color)] overflow-hidden transition-colors duration-300"
      >
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 id="investment-title" className="text-5xl md:text-6xl font-black text-[var(--accent)] mb-4">
              Investment & Service <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Opportunities</span>
            </h2>
            <p className="mt-6 text-lg text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
              Explore strategic collaboration, infrastructure scaling, and innovation funding across Ethiopia's emerging technology economy.
            </p>
          </div>
          <Investment />
        </div>
      </section>

      {/* Partners & Investors Section */}
      <section id="partners-investors" className="py-24 bg-gradient-to-b from-[var(--bg-main)] to-[var(--neutral)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--accent)] mb-4">
              Our <span className="text-[var(--primary)]">Partners & Investors</span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Collaborating with local and global leaders to build a resilient and innovative digital future.
            </p>
          </div>
          <PartnersInvestorsCarousel />
        </div>
      </section>

      {/* FAQ Section - Common Questions */}
      <section id="faq" aria-labelledby="faq-title" className="py-24 bg-[var(--accent)]/97 text-white relative faqPageWrapper">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,10,10,0.8),transparent_80%)] pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="mb-14 text-center">
            <h2 id="faq-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              <span className="text-white drop-shadow-md">Frequently Asked Questions</span>
            </h2>
            <p className="mt-4 text-white/90 max-w-3xl mx-auto">
              Answers to common questions about our services, programs, and Ethiopia's digital transformation journey.
            </p>
          </div>
          <FAQProvider>
            <FAQCategories />
            <FAQAccordion limit={5} />
            <div className="text-center mt-12">
              <NavLink
                to="/resources/faqs"
                className="inline-flex items-center gap-3 px-10 py-3.5 rounded-full bg-[var(--primary)] hover:bg-[var(--secondary)] font-bold text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 border-2 border-[var(--primary)] dark:border-white/80 dark:bg-transparent dark:hover:bg-white dark:hover:text-[var(--primary)] group"
              >
                See More Questions
                <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NavLink>
            </div>
          </FAQProvider>
        </div>
      </section>

      <LiveChatWidget
        bgMode="auto"
        infoText="Need help? Chat with us!"
        avatarUrl="/images/icons8-support-64.PNG"
        chatLink="/contact"
      />

      {/* Fixed Social Media Sidebar - Premium Experience with Dynamic Layout */}
      <motion.div
        className={`fixed z-[100] transition-all duration-700 ease-in-out hidden lg:flex items-center gap-4`}
        style={{
          left: isAtFooter ? '50%' : '0.03rem',
          bottom: isAtFooter ? '2.5rem' : 'auto',
          top: isAtFooter ? 'auto' : '50%',
          flexDirection: isAtFooter ? 'row' : 'col' as any,
        }}
        initial={false}
        animate={{
          x: isAtFooter ? '-50%' : 0,
          y: isAtFooter ? 0 : '-50%',
          opacity: 1
        }}
      >
        {!isAtFooter && (
          <div className="flex flex-col items-center">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--primary)]/30 to-[var(--primary)]/50 mb-3" aria-hidden="true" />
            <div className="mb-2 flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[var(--primary)]/80 [writing-mode:vertical-lr] rotate-180">
                Social
              </span>
            </div>
          </div>
        )}

        <div className={`flex items-center gap-4 ${isAtFooter ? 'flex-row' : 'flex-col'}`}>
          {[
            {
              href: "https://web.facebook.com/profile.php?id=61554955861892",
              label: "Facebook",
              icon: <FaFacebookF />,
              color: "text-[#1877F2]",
              activeBg: "bg-[#1877F2]"
            },
            {
              href: "https://x.com/EthiopianP74117",
              label: "Twitter",
              icon: <FaTwitter />,
              color: "text-[var(--text-main)]",
              activeBg: "bg-black"
            },
            {
              href: "https://www.linkedin.com/company/ethiopianitpark/",
              label: "LinkedIn",
              icon: <FaLinkedinIn />,
              color: "text-[#0A66C2]",
              activeBg: "bg-[#0A66C2]"
            },
            {
              href: "https://www.tiktok.com/@ethiopianitpark1",
              label: "TikTok",
              icon: <FaTiktok />,
              color: "text-[var(--text-main)]",
              activeBg: "bg-black"
            },
            {
              href: "https://www.youtube.com/@EthiopianITParkOfficial",
              label: "YouTube",
              icon: <FaYoutube />,
              color: "text-[#FF0000]",
              activeBg: "bg-[#FF0000]"
            },
            {
              href: "https://t.me/EthiopianItPark/4",
              label: "Telegram",
              icon: <FaTelegram />,
              color: "text-[#229ED9]",
              activeBg: "bg-[#229ED9]"
            }
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-center w-11 h-11 rounded-full bg-[var(--bg-card)] backdrop-blur-lg border border-[var(--border-color)] shadow-xl transition-colors duration-300`}
              aria-label={`Follow us on ${social.label}`}
              whileHover={{
                scale: 1.25,
                rotate: 5,
                backgroundColor: "var(--primary)"
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + (index * 0.1), type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className={`w-5 h-5 ${social.color} group-hover:text-white transition-all duration-300 flex items-center justify-center`}>
                {social.icon}
              </div>
              <span className={`absolute ${isAtFooter ? 'bottom-full mb-4' : 'left-full ml-4'} px-3 py-1 rounded-lg bg-[var(--primary)] text-white text-[11px] font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-2xl scale-75 group-hover:scale-100 whitespace-nowrap z-[110]`}>
                {social.label}
              </span>
            </motion.a>
          ))}
        </div>

        {!isAtFooter && (
          <div className="w-px h-12 bg-gradient-to-t from-transparent via-[var(--primary)]/30 to-[var(--primary)]/50 mt-3" aria-hidden="true" />
        )}
      </motion.div>
    </main>
  );
};

export default Home;
