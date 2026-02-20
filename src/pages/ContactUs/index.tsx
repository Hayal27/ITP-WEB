import React, { useState, useRef } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane, FaChevronRight } from 'react-icons/fa';
import { TextInput, Textarea, Alert, Container } from '@mantine/core';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { submitContactForm } from '../../services/apiService';
import SEO from '../../components/SEO/SEO';
import ReCAPTCHA from "react-google-recaptcha";
import '../../styles/ContactUs.css';

import DOMPurify from 'dompurify';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const recaptchaRef = useRef<ReCAPTCHA>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setStatus({ type: 'error', message: 'Please complete the reCAPTCHA security check.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please provide a valid email address.' });
      return;
    }

    const phoneRegex = /^(\+251|0)[1-9]\d{8}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setStatus({ type: 'error', message: 'Invalid phone number format. Use +251 9... or 09...' });
      return;
    }
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      // Sanitize inputs
      const cleanFormData = {
        name: DOMPurify.sanitize(formData.name),
        email: DOMPurify.sanitize(formData.email),
        phone: DOMPurify.sanitize(formData.phone),
        subject: DOMPurify.sanitize(formData.subject),
        message: DOMPurify.sanitize(formData.message),
        website: formData.website, // Honeypot, keep as is
        captchaToken: token
      };

      const response = await submitContactForm(cleanFormData);
      if (response.success) {
        setStatus({ type: 'success', message: response.message });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
        recaptchaRef.current?.reset();
      } else {
        setStatus({ type: 'error', message: response.message || 'Something went wrong.' });
        recaptchaRef.current?.reset();
      }
    } catch (error: any) {
      console.error('Contact submit error:', error);
      setStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again.' });
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="contact-us-container">
      <SEO
        title="Contact Us"
        description="Get in touch with the Ethiopian IT Park. Reach out for inquiries about infrastructure, incubation, and investment opportunities in Ethiopia's leading tech hub."
        keywords="contact Ethiopian IT Park, ICT Park phone number, IT park address Addis Ababa, tech hub support"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Ethiopian IT Park",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+251-944-666-633",
              "contactType": "customer service",
              "email": "contact@ethiopianitpark.et"
            }
          }
        }}
      />
      {/* Premium Hero Section */}
      <section className="contact-hero">
        <div className="hero-background-overlay"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="contact-badge"
        >
          Contact Center
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Get In <span className="brand-gradient-text">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Have questions about our programs or services? We're here to help and answer any question you might have.
        </motion.p>
      </section>

      <div className="contact-main-wrapper">
        <div className="contact-grid">
          {/* Info Side */}
          <motion.aside
            className="contact-info-premium"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2>Contact Information</h2>
            <div className="info-items-premium">
              <div className="info-item-premium">
                <div className="icon-box-premium">
                  <FaPhoneAlt />
                </div>
                <div className="info-details-premium">
                  <h3>Phone</h3>
                  <a href="tel:+251944666633" className="info-value">+251-944-666-633</a>
                </div>
              </div>

              <div className="info-item-premium">
                <div className="icon-box-premium">
                  <FaEnvelope />
                </div>
                <div className="info-details-premium">
                  <h3>Email</h3>
                  <a href="mailto:contact@ethiopianitpark.et" className="info-value">contact@ethiopianitpark.et</a>
                </div>
              </div>

              <div className="info-item-premium">
                <div className="icon-box-premium">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-details-premium">
                  <h3>Address</h3>
                  <p className="info-value">Goro Road to Tulu Dimtu<br />Addis Ababa, Ethiopia</p>
                </div>
              </div>

              <div className="info-item-premium">
                <div className="icon-box-premium">
                  <FaClock />
                </div>
                <div className="info-details-premium">
                  <h3>Hours</h3>
                  <p className="info-value">Mon-Fri: 8AM-5PM<br />Sat: 9AM-1PM</p>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Form Side */}
          <motion.main
            className="contact-form-premium"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="form-premium-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you soon</p>
            </div>

            <form onSubmit={handleSubmit} className="modern-form">
              {/* Honeypot field - hidden from users */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="form-row">
                <TextInput
                  label="Full Name"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  classNames={{ input: 'premium-input-class', label: 'premium-label-class' }}
                />
                <TextInput
                  label="Email Address"
                  placeholder="you@example.com"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  classNames={{ input: 'premium-input-class', label: 'premium-label-class' }}
                />
              </div>

              <TextInput
                label="Phone Number"
                placeholder="+251 XXX XXX XXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={formData.phone && !/^(\+251|0)[1-9]\d{8}$/.test(formData.phone) ? "Invalid phone format" : null}
                classNames={{ input: 'premium-input-class', label: 'premium-label-class' }}
              />

              <TextInput
                label="Subject"
                placeholder="How can we help?"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                classNames={{ input: 'premium-input-class', label: 'premium-label-class' }}
              />

              <Textarea
                label="Message"
                placeholder="Tell us about your inquiry..."
                required
                minRows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                classNames={{ input: 'premium-input-class', label: 'premium-label-class' }}
              />

              <div className="mb-6 flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Google test key
                />
              </div>

              {status.type && (
                <Alert
                  icon={status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                  title={status.type === 'success' ? "Success" : "Error"}
                  color={status.type === 'success' ? "green" : "red"}
                  mt="md"
                  variant="light"
                >
                  {status.message}
                </Alert>
              )}

              <div className="form-submit-wrapper">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-premium"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.main>
        </div>
      </div>

      {/* Map Section */}
      <section className="map-section-premium">
        <motion.div
          className="map-card-premium"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.722422242104!2d38.8379044!3d8.9660626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b9bd9d4e73acf%3A0x6ba4e655bdf6c707!2sICT%20Park!5e0!3m2!1sen!2set!4v1633456789012!5m2!1sen!2set"
            title="Ethiopian IT Park (ICT Park) Location"
            loading="lazy"
            allowFullScreen
          ></iframe>

          <div className="map-floating-card">
            <h3>Our Location</h3>
            <p>Ethiopian IT Park (ICT Park)<br />Goro road to Tulu Dimtu<br />Addis Ababa, Ethiopia</p>
            <a
              href="https://goo.gl/maps/embed?pb=!1m18!1m12!1m3!1d3940.722422242104!2d38.8379044!3d8.9660626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b9bd9d4e73acf%3A0x6ba4e655bdf6c707!2sICT%20Park!5e0!3m2!1sen!2set!4v1633456789012!5m2!1sen!2set"
              target="_blank"
              rel="noopener noreferrer"
              className="direction-btn"
            >
              Get Directions <FaChevronRight />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactUs;