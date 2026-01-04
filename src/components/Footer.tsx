
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPaperPlane,
  FaAngleUp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaYoutube,
  FaTiktok,
  FaTelegram
} from 'react-icons/fa';
import logo from '/images/logo.png';
import { notifications } from '@mantine/notifications';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notifications.show({
        title: 'Invalid Email',
        message: 'Please enter a valid email address',
        color: 'red',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5005/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        notifications.show({
          title: 'Subscribed',
          message: data.message || 'Successfully subscribed to our newsletter!',
          color: 'green',
        });
        setEmail('');
      } else {
        notifications.show({
          title: 'Subscription Failed',
          message: data.message || 'Subscription failed. Please try again.',
          color: 'orange',
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to subscribe. Please check your connection and try again.',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="dk-footer">
      <div className="footer-top-wave"></div>

      <div className="footer-container">
        <div className="footer-main-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Ethiopian IT Park Logo" width={180} height={45} />
            </Link>
            <p className="footer-description">
              Ethiopia's premier innovation and technology hub—fostering digital transformation,
              entrepreneurship, and sustainable growth in East Africa.
            </p>
            <div className="social-links">
              <a
                href="https://web.facebook.com/profile.php?id=61554955861892"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Facebook"
              >
                <FaFacebookF aria-hidden="true" />
              </a>
              <a
                href="https://x.com/EthiopianP74117"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Twitter X"
              >
                <FaTwitter aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/ethiopianitpark/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on LinkedIn"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@EthiopianITParkOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on YouTube"
              >
                <FaYoutube aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@ethiopianitpark"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on TikTok"
              >
                <FaTiktok aria-hidden="true" />
              </a>
              <a
                href="https://t.me/EthiopianItPark/4"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Telegram"
              >
                <FaTelegram aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-section">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/innovation">Innovation Hub</Link></li>
              <li><Link to="/incubation">Incubation</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links-section">
            <h5 className="footer-title">Services</h5>
            <ul className="footer-list">
              <li><Link to="/office">Office Spaces</Link></li>
              <li><Link to="/coworking">Co-Working</Link></li>
              <li><Link to="/investment">Investment</Link></li>
              <li><Link to="/partners">Partners</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact-section">
            <h5 className="footer-title">Get In Touch</h5>
            <ul className="footer-contact-list">
              <li>
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" aria-hidden="true" />
                  <span>Goro Road to Tulu Dimtu<br />Addis Ababa, Ethiopia</span>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <FaPhoneAlt className="contact-icon" aria-hidden="true" />
                  <a href="tel:+251944666633">+251-944-666-633</a>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" aria-hidden="true" />
                  <a href="mailto:contact@ethiopianitpark.et">contact@ethiopianitpark.et</a>
                </div>
              </li>
            </ul>

            {/* Newsletter - Simplified */}
            <form className="footer-subscribe-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="your email to subscribe for newsletter"
                aria-label="Email address for newsletter"
                value={email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
              <button type="submit" aria-label="Subscribe to newsletter" disabled={isSubmitting}>
                {isSubmitting ? '...' : <FaPaperPlane aria-hidden="true" />}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} <span className="brand-name">Ethiopian IT Park</span>. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="separator">•</span>
              <Link to="/terms">Terms of Service</Link>
              <span className="separator">•</span>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <button
        id="back-to-top"
        className={`back-to-top ${showTop ? 'show' : ''}`}
        title="Back to Top"
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <FaAngleUp aria-hidden="true" />
      </button>
    </footer>
  );
};

export default Footer;
