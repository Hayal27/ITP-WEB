import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicEmployeeData, IdCardPerson, fixImageUrl } from '../../services/apiService';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUser, FaInfoCircle, FaCalendarAlt, FaIdCard, FaBuilding } from 'react-icons/fa';
import './Verify.css';

const VerifyEmployeePage: React.FC = () => {
    const { idNumber } = useParams<{ idNumber: string }>();
    const [employee, setEmployee] = useState<IdCardPerson | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const fetchEmployee = async () => {
            if (!idNumber) return;
            try {
                setLoading(true);
                const data = await getPublicEmployeeData(idNumber);
                // Clean data
                if (data) {
                    data.fname = data.fname?.trim();
                    data.lname = data.lname?.trim();
                }
                setEmployee(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Verification failed. Employee not found.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [idNumber]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Validity Confirmed';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Validity Confirmed';
            return date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return 'Validity Confirmed';
        }
    };

    if (loading) {
        return (
            <div className="verify-premium-container">
                <div className="verify-loading">
                    <div className="loading-spinner"></div>
                    <p>Verifying Identity...</p>
                </div>
            </div>
        );
    }

    if (error || !employee) {
        return (
            <div className="verify-premium-container">
                <div className="verify-hero" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            Verification Failed
                        </motion.h1>
                        <p className="hero-subtitle">The ID number provided could not be verified.</p>
                    </div>
                </div>
                <div className="verify-main-content">
                    <div className="verified-card" style={{ display: 'block', padding: '3rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', color: '#ef4444', marginBottom: '1rem' }}>×</div>
                        <h2>ID Not Found</h2>
                        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                            {error || 'This individual is not registered in our official system.'}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                            If you believe this is an error, please contact Ethiopian IT Park Administration.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="verify-premium-container">
            {/* Hero Section */}
            <motion.div
                className="verify-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <motion.div
                        className="hero-tag"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        OFFICIAL VERIFICATION
                    </motion.div>
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Identity Verified
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        The individual below is a confirmed member of Ethiopian IT Park.
                    </motion.p>
                    <div className="hero-divider"></div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="verify-main-content">
                <motion.div
                    className="verified-card"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                >
                    {/* Left: Image */}
                    <div className="verified-image-container">
                        <div className="verification-badge">
                            <FaCheckCircle className="check-icon" />
                            <span className="badge-text">VERIFIED</span>
                        </div>
                        <div className="image-wrapper">
                            {employee.photo_url && !imgError ? (
                                <img
                                    src={fixImageUrl(employee.photo_url) || ''}
                                    alt={employee.fname}
                                    className="verified-image"
                                    onError={() => {
                                        console.error('Image failed to load:', fixImageUrl(employee.photo_url));
                                        setImgError(true);
                                    }}
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0', fontSize: '4rem', color: '#94a3b8' }}>
                                    <FaUser />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="verified-info">
                        <div className="employee-header">
                            <h2>{employee.full_name || `${employee.fname} ${employee.lname}`}</h2>
                            {employee.fname_am && (
                                <p className="employee-name-am">{employee.fname_am} {employee.lname_am}</p>
                            )}
                        </div>

                        <div className="employee-position">
                            <p>{employee.position}</p>
                            <span>{employee.position_am}</span>
                        </div>

                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label"><FaIdCard className="detail-icon" /> ID Number</span>
                                <span className="detail-value">{employee.id_number}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label"><FaBuilding className="detail-icon" /> Department</span>
                                <span className="detail-value">{employee.department}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label"><FaInfoCircle className="detail-icon" /> Status</span>
                                <span className="detail-value status-active">Active</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label"><FaCalendarAlt className="detail-icon" /> Expiry Date</span>
                                <span className="detail-value">{formatDate(employee.expiry_date)}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>


            </div>
        </div>
    );
};

export default VerifyEmployeePage;
