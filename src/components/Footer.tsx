
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import '../styles/Footer.css';
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandTiktok,
  IconBrandTelegram,
  IconMail,
  IconPhone,
  IconMapPin,
  IconSend,
  IconChevronUp,
  IconInfoCircle,
  IconBriefcase,
  IconSchool,
  IconBuildingCommunity,
  IconNews,
  IconBuildingSkyscraper,
  IconUsers,
  IconQuestionMark,
  IconShieldCheck,
  IconFileText
} from '@tabler/icons-react';
import { subscribeToNewsletter } from '../services/apiService';
import { notifications } from '@mantine/notifications';
import { NavLink } from 'react-router-dom';
// Cloudinary logo URLs
const LOGO_URL = "https://res.cloudinary.com/yesuf/image/upload/v1766148184/Asset_22_30x_vrzigh.png";



const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Link Data
  const quickLinks = [
    { label: 'About Us', href: '/about', icon: <IconInfoCircle size={18} /> },
    { label: 'Our Services', href: '/services', icon: <IconBriefcase size={18} /> },
    { label: 'Innovation Hub', href: '/incubation/innovation-programs', icon: <IconSchool size={18} /> },
    { label: 'Incubation', href: '/incubation', icon: <IconBuildingCommunity size={18} /> },
    { label: 'News & Events', href: '/resources/digital/news', icon: <IconNews size={18} /> },
  ];

  const serviceLinks = [
    { label: 'Office Rent', href: '/services/spaces/office-Rent', icon: <IconBuildingCommunity size={18} /> },
    { label: 'Leased Land', href: '/services/spaces/leased-Land', icon: <IconBuildingSkyscraper size={18} /> },
    { label: 'Investment', href: '/investment', icon: <IconBuildingSkyscraper size={18} /> },
    { label: 'Partners', href: '/about/partners', icon: <IconUsers size={18} /> },
    { label: 'FAQs', href: '/resources/faqs', icon: <IconQuestionMark size={18} /> },
  ];

  const bottomLinks = [
    { label: 'Privacy Policy', href: '/resources/policy', icon: <IconShieldCheck size={16} /> },
    { label: 'Terms of Service', href: '/resources/policy', icon: <IconFileText size={16} /> },
    { label: 'Contact', href: '/contact', icon: <IconPhone size={16} /> },
  ];

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notifications.show({ title: 'Invalid Email', message: 'Please enter a valid email address', color: 'red' });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await subscribeToNewsletter(email);
      if (response.success) {
        notifications.show({ title: 'Subscribed', message: response.message || 'Successfully subscribed!', color: 'green' });
        setEmail('');
      } else {
        notifications.show({ title: 'Subscription Failed', message: response.message || 'Subscription failed.', color: 'orange' });
      }
    } catch (error: any) {
      notifications.show({ title: 'Error', message: 'Failed to subscribe. Please try again.', color: 'red' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="dk-footer">

      <div className="footer-top-wave"></div>

      <div className="footer-container">
        <div className="footer-main-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <NavLink to="/" className="footer-logo">
              <img src={LOGO_URL} alt="Ethiopian IT Park Logo" width={180} height={45} />

            </NavLink>
            <p className="footer-description">
              Ethiopia's premier innovation and technology hub—fostering digital transformation,
              entrepreneurship, and sustainable growth in East Africa.
            </p>
            <div className="social-links">
              {[
                { href: "https://web.facebook.com/profile.php?id=61554955861892", icon: <IconBrandFacebook size={20} />, label: "Facebook" },
                { href: "https://x.com/EthiopianP74117", icon: <IconBrandTwitter size={20} />, label: "Twitter" },
                { href: "https://www.linkedin.com/company/ethiopianitpark/", icon: <IconBrandLinkedin size={20} />, label: "LinkedIn" },
                { href: "https://www.youtube.com/@EthiopianITParkOfficial", icon: <IconBrandYoutube size={20} />, label: "YouTube" },
                { href: "https://www.tiktok.com/@ethiopianitpark1", icon: <IconBrandTiktok size={20} />, label: "TikTok" },
                { href: "https://t.me/EthiopianItPark/4", icon: <IconBrandTelegram size={20} />, label: "Telegram" }
              ].map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-section">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => `footer-link ${isActive ? 'active' : ''}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.icon} <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links-section">
            <h5 className="footer-title">Services</h5>
            <ul className="footer-list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => `footer-link ${isActive ? 'active' : ''}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.icon} <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact-section">
            <h5 className="footer-title">Get In Touch</h5>
            <ul className="footer-contact-list">
              <li>
                <div className="contact-item">
                  <IconMapPin className="contact-icon" size={20} />
                  <span>Goro Road to Tulu Dimtu<br />Addis Ababa, Ethiopia</span>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <IconPhone className="contact-icon" size={20} />
                  <a href="tel:+251944666633" className="contact-link">+251-944-666-633</a>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <IconMail className="contact-icon" size={20} />
                  <a href="mailto:contact@ethiopianitpark.et" className="contact-link">contact@ethiopianitpark.et</a>
                </div>
              </li>
            </ul>

            <form className="footer-subscribe-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
              <button type="submit" className="subscribe-btn" disabled={isSubmitting}>
                {isSubmitting ? '...' : <IconSend size={20} />}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">© {new Date().getFullYear()} Ethiopian IT Park. All rights reserved.</p>
            <div className="footer-bottom-links">
              {bottomLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => `footer-bottom-link ${isActive ? 'active' : ''}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.icon} <span>{link.label}</span>
                  </NavLink>
                  {index < bottomLinks.length - 1 && <span className="separator">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button id="back-to-top" className={`back-to-top ${showTop ? 'show' : ''}`} onClick={scrollToTop}>
        <IconChevronUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
