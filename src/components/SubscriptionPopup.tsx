import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiBell, FiZap } from 'react-icons/fi';
import { notifications } from '@mantine/notifications';
import { subscribeToNewsletter } from '../services/apiService';
import './SubscriptionPopup.css';

const SubscriptionPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Check if user has already subscribed or dismissed the popup in this session
        const isDismissed = sessionStorage.getItem('newsletter_dismissed');
        const isSubscribed = localStorage.getItem('newsletter_subscribed');

        if (!isDismissed && !isSubscribed) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 60000); // 1 minute interval

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('newsletter_dismissed', 'true');
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
            const response = await subscribeToNewsletter(email);

            if (response.success) {
                notifications.show({
                    title: 'Success',
                    message: response.message || 'Thank you for subscribing!',
                    color: 'green',
                });
                localStorage.setItem('newsletter_subscribed', 'true');
                setIsVisible(false);
            } else {
                notifications.show({
                    title: 'Subscription Failed',
                    message: response.message || 'Subscription failed.',
                    color: 'orange',
                });
            }
        } catch (error: any) {
            notifications.show({
                title: 'Error',
                message: error.message || 'Connection error. Please try again.',
                color: 'red',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="subscription-popup-overlay">
                    <motion.div
                        className="subscription-popup-card"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <button className="popup-close-btn" onClick={handleClose}>
                            <FiX />
                        </button>

                        <div className="popup-content">
                            <div className="popup-icon-wrapper">
                                <div className="pulse-circle"></div>
                                <FiBell className="popup-main-icon" />
                            </div>

                            <h2 className="popup-title">Stay Ahead of the Curve</h2>
                            <p className="popup-text">
                                Be the first to know about new <span className="highlight">job opportunities</span>,
                                tech innovation, and exclusive updates from the Ethiopia IT Park.
                            </p>

                            <form onSubmit={handleSubmit} className="popup-form">
                                <div className="input-group-premium">
                                    <FiMail className="input-icon" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <button type="submit" className="popup-submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        'Subscribing...'
                                    ) : (
                                        <>
                                            Join the Community <FiZap className="btn-icon" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="popup-footer-text">
                                Zero spam. Only the most impactful updates.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SubscriptionPopup;
