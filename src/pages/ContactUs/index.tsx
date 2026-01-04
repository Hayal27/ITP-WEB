import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { TextInput, Textarea, Button, Group, Container, Alert } from '@mantine/core';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { submitContactForm } from '../../services/apiService';
import '../../styles/ContactUs.css';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setStatus({ type: 'success', message: response.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', message: response.message || 'Something went wrong.' });
      }
    } catch (error: any) {
      console.error('Contact submit error:', error);
      setStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={sectionRef} className="contact-us-container">
      <header className="contact-header animate-on-scroll">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-6">
          Get In <span className="brand-gradient-text">Touch</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Have questions about our programs or services? We're here to help and answer any question you might have.
        </p>
      </header>

      <Container size="xl" className="relative">
        <main className="contact-main">
          <div className="contact-info animate-on-scroll">
            <h2 className="text-2xl font-bold text-accent mb-4">Contact Information</h2>

            <div className="info-items-grid-compact">
              <div className="info-item-compact">
                <div className="info-icon-wrapper-compact">
                  <FaPhoneAlt className="info-icon" />
                </div>
                <div className="info-details-compact">
                  <h3>Phone</h3>
                  <a href="tel:+251944666633" className="info-value">+251-944-666-633</a>
                </div>
              </div>

              <div className="info-item-compact">
                <div className="info-icon-wrapper-compact">
                  <FaEnvelope className="info-icon" />
                </div>
                <div className="info-details-compact">
                  <h3>Email</h3>
                  <a href="mailto:contact@ethiopianitpark.et" className="info-value">contact@ethiopianitpark.et</a>
                </div>
              </div>

              <div className="info-item-compact">
                <div className="info-icon-wrapper-compact">
                  <FaMapMarkerAlt className="info-icon" />
                </div>
                <div className="info-details-compact">
                  <h3>Address</h3>
                  <p className="info-value">Goro Road to Tulu Dimtu<br />Addis Ababa, Ethiopia</p>
                </div>
              </div>

              <div className="info-item-compact">
                <div className="info-icon-wrapper-compact">
                  <FaClock className="info-icon" />
                </div>
                <div className="info-details-compact">
                  <h3>Hours</h3>
                  <p className="info-value">Mon-Fri: 8AM-5PM<br />Sat: 9AM-1PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form animate-on-scroll">
            <div className="form-header">
              <h2 className="text-3xl font-bold text-accent mb-2">Send us a Message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
            </div>

            <form onSubmit={handleSubmit} className="modern-form">
              <div className="form-row">
                <TextInput
                  label="Full Name"
                  placeholder="Your full name"
                  size="lg"
                  required
                  aria-required="true"
                  aria-invalid={status.type === 'error' && !formData.name}
                  aria-describedby={status.type === 'error' ? 'form-error-message' : undefined}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  classNames={{ input: 'form-input', label: 'form-label' }}
                />
                <TextInput
                  label="Email Address"
                  placeholder="you@example.com"
                  type="email"
                  size="lg"
                  required
                  aria-required="true"
                  aria-invalid={status.type === 'error' && !formData.email}
                  aria-describedby={status.type === 'error' ? 'form-error-message' : undefined}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  classNames={{ input: 'form-input', label: 'form-label' }}
                />
              </div>

              <TextInput
                label="Phone Number"
                placeholder="+251 XXX XXX XXX"
                size="lg"
                aria-invalid={status.type === 'error' && !formData.phone}
                aria-describedby={status.type === 'error' ? 'form-error-message' : undefined}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                classNames={{ input: 'form-input', label: 'form-label' }}
              />

              <Textarea
                label="Message"
                placeholder="Tell us about your inquiry..."
                size="lg"
                required
                aria-required="true"
                aria-invalid={status.type === 'error' && !formData.message}
                aria-describedby={status.type === 'error' ? 'form-error-message' : undefined}
                minRows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                classNames={{ input: 'form-input', label: 'form-label' }}
              />

              {status.type && (
                <Alert
                  id="form-error-message"
                  icon={status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                  title={status.type === 'success' ? "Success" : "Error"}
                  color={status.type === 'success' ? "green" : "red"}
                  mt="md"
                  variant="light"
                  role="alert"
                >
                  {status.message}
                </Alert>
              )}

              <Group justify="flex-end" mt="xl">
                <Button
                  type="submit"
                  size="xl"
                  loading={isSubmitting}
                  className="submit-btn-modern"
                  leftSection={<FaPaperPlane />}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Group>
            </form>
          </div>
        </main>
      </Container>

      <div id="map" className="map-container animate-on-scroll">
        <div className="map-header">
          <h2 className="text-4xl font-bold text-accent mb-4">Our <span className="brand-gradient-text">Location</span></h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Visit us at the heart of Ethiopia's innovation ecosystem</p>
        </div>
        <div className="map-wrapper">
          <div className="map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.722422242104!2d38.8379044!3d8.9660626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b9bd9d4e73acf%3A0x6ba4e655bdf6c707!2sICT%20Park!5e0!3m2!1sen!2set!4v1633456789012!5m2!1sen!2set"
              title="Ethiopian IT Park (ICT Park) Location"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
          <div className="map-overlay-card">
            <h3 className="font-bold text-lg mb-2">Ethiopian IT Park</h3>
            <p className="text-sm text-gray-600 mb-3">Goro road to Tulu Dimtu<br />Addis Ababa, Ethiopia</p>
            <a
              href="https://goo.gl/maps/example"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;