import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaTiktok, FaTelegram } from 'react-icons/fa';
import Hero from '../../components/Hero';
import AboutUs from '../../components/AboutUs';
import WorkingProcess from '../../components/WorkingProcess';
import Investment from '../../components/Investment';
import IncubationCard from '../../components/IncubationCard';
import LiveChatWidget from '../../components/LiveChatWidget';
import Service from '../../components/Service';
import NewsEventsHighlights from '../../components/NewsEventsHighlights';
import InvestmentSteps from '../../components/InvestmentSteps';
import SEO from '../../components/SEO/SEO';
import { Text } from '@mantine/core';
import FAQAccordion from '../FAQs/components/FAQAccordion';
import FAQCategories from '../FAQs/components/FAQCategories';
import { FAQProvider } from '../FAQs/components/FAQContext';
import '../FAQs/FAQsPage.css';

const images = [
  'https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1758800607/office_hmfkwd.jpg',
  'https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1758800663/incu_2_ozfp0o.jpg',
  'https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1766663873/hero1_jn4mpp.jpg',
  'https://res.cloudinary.com/yesuf/image/upload/f_auto,q_auto/v1747135446/reaseach_ew642q.png',
];

const Home: React.FC = () => {
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
      <section id="about" aria-labelledby="about-title" className="md:py-5 bg-gradient-to-b from-[var(--neutral)] to-white/90 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-10 xl:px-16 2xl:px-24 max-w-[150rem]">
          <h2 id="about-title" className="sr-only">About Ethiopian IT Park</h2>
          <AboutUs />
        </div>
      </section>

      {/* News & Events Highlights Section */}
      <section id="news-events" aria-labelledby="news-events-title" className="py-24 bg-[var(--accent)]/95 text-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(12,124,146,0.35),transparent_60%)]" />
        <div className="relative container mx-auto px-4 md:px-10 xl:px-16 2xl:px-24 max-w-[150rem]">
          <div className="mb-14 text-center max-w-4xl mx-auto">
            <h2 id="news-events-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Latest <span className="text-[var(--secondary)]">News & Events</span>
            </h2>
            <p className="mt-4 text-white/80 text-lg leading-relaxed">
              Stay informed with announcements, milestones, and innovation spotlights from the Ethiopian IT Park community.
            </p>
          </div>
          <NewsEventsHighlights />
          <div className="text-center mt-10">
            <a
              href="/resources/digital/news"
              className="inline-block px-8 py-3 rounded-md bg-[var(--primary)] hover:bg-[var(--secondary)] font-medium text-white shadow-md shadow-black/20 transition-colors"
            >
              View All News & Events
            </a>
          </div>
        </div>
      </section>

      <InvestmentSteps />

      {/* Services Section - What We Offer */}
      <section id="services" aria-labelledby="services-title" className="py-24 bg-white relative">
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
      <section id="process" aria-labelledby="process-title" className="py-24 bg-gradient-to-br from-white via-[var(--neutral)] to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay [background:repeating-linear-gradient(45deg,rgba(12,124,146,0.08)_0_12px,transparent_12px_24px)]" />
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
      <section id="investment" aria-labelledby="investment-title" className="py-32 relative bg-gradient-to-br from-white via-[var(--neutral)] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 id="investment-title" className="text-5xl md:text-6xl font-black text-slate-800 mb-4">
              Investment & Service <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Opportunities</span>
            </h2>
            <p className="mt-6 text-lg text-[var(--accent)]/75 max-w-3xl mx-auto leading-relaxed">
              Explore strategic collaboration, infrastructure scaling, and innovation funding across Ethiopia's emerging technology economy.
            </p>
          </div>
          <Investment />
        </div>
      </section>

      {/* FAQ Section - Common Questions */}
      <section id="faq" aria-labelledby="faq-title" className="py-24 bg-[var(--accent)]/97 text-white relative faqPageWrapper">
        <div className="container mx-auto">
          <div className="mb-14 text-center">
            <h2 id="faq-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              <span className="text-[var(--secondary)]">Frequently Asked Questions</span>
            </h2>
            <p className="mt-4 text-[var(--secondary)] max-w-3xl mx-auto">
              Answers to common questions about our services, programs, and Ethiopia's digital transformation journey.
            </p>
          </div>
          <FAQProvider>
            <FAQCategories />
            <FAQAccordion limit={5} />
            <div className="text-center mt-12">
              <a
                href="/resources/faqs"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-bold text-sm transition-all shadow-lg hover:shadow-[0_0_20px_rgba(20,184,166,0.6)] group"
              >
                See More Questions
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
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

      {/* Fixed Social Media Sidebar - Premium Experience */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--primary)]/30 to-[var(--primary)]/50 mb-3" aria-hidden="true" />
        <div className="mb-2 flex items-center justify-center">
          <span className="text-[9px] uppercase tracking-[0.4em] font-black text-[var(--primary)]/60 [writing-mode:vertical-lr] rotate-180">
            Social
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          {[
            {
              href: "https://web.facebook.com/profile.php?id=61554955861892",
              label: "Facebook",
              icon: <FaFacebookF />,
              color: "text-[#1877F2]",
              lineColor: "from-[#1877F2] to-[#1DA1F2]"
            },
            {
              href: "https://x.com/EthiopianP74117",
              label: "Twitter",
              icon: <FaTwitter />,
              color: "text-black",
              lineColor: "from-black to-[#0A66C2]"
            },
            {
              href: "https://www.linkedin.com/company/ethiopianitpark/",
              label: "LinkedIn",
              icon: <FaLinkedinIn />,
              color: "text-[#0A66C2]",
              lineColor: "from-[#0A66C2] to-[#E4405F]"
            },
            {
              href: "https://www.tiktok.com/@ethiopianitpark",
              label: "TikTok",
              icon: <FaTiktok />,
              color: "text-black",
              lineColor: "from-black to-[#EE1D52]"
            },
            {
              href: "https://www.youtube.com/@EthiopianITParkOfficial",
              label: "YouTube",
              icon: <FaYoutube />,
              color: "text-[#FF0000]",
              lineColor: "from-[#FF0000] to-[var(--primary)]"
            },
            {
              href: "https://t.me/EthiopianItPark/4",
              label: "Telegram",
              icon: <FaTelegram />,
              color: "text-[#229ED9]",
              lineColor: "from-[#229ED9] to-[#0088cc]"
            }
          ].map((social, index, arr) => (
            <React.Fragment key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                aria-label={`Follow us on ${social.label}`}
              >
                <div className={`w-4 h-4 ${social.color} opacity-90 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center`}>
                  {social.icon}
                </div>
                <span className="absolute left-full ml-3 px-2 py-0.5 rounded bg-[var(--accent)] text-white text-[9px] font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-0 whitespace-nowrap">
                  {social.label}
                </span>
              </a>
              {index < arr.length - 1 && (
                <div className={`w-[1.5px] h-2 bg-gradient-to-b ${social.lineColor} opacity-70`} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="w-px h-12 bg-gradient-to-t from-transparent via-[var(--primary)]/30 to-[var(--primary)]/50 mt-3" aria-hidden="true" />
      </div>
    </main>
  );
};

export default Home;
