
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Form, InputGroup, Pagination } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaChalkboardTeacher, FaLink, FaArrowRight, FaGraduationCap, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrainings, TrainingWorkshop, BACKEND_URL } from '../../services/apiService';
import './TrainingWorkshops.css';

const TrainingWorkshops: React.FC = () => {
  const [trainings, setTrainings] = useState<TrainingWorkshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const data = await getTrainings();
        setTrainings(data);
      } catch (error) {
        console.error('Error fetching trainings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedLocation]);

  const uniqueTypes = ['All', ...new Set(trainings.map(t => t.type))];
  const uniqueLocations = ['All', ...new Set(trainings.map(t => t.location))];

  const filteredTrainings = trainings.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'All' || t.type === selectedType;
    const matchesLocation = selectedLocation === 'All' || t.location === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTrainings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTrainings.length / itemsPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="itpc-training-wrapper">
      {/* Hero Section */}
      <div className="training-hero-premium">
        <div className="hero-overlay-gradient"></div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center position-relative z-10"
          >
            <span className="section-tag-premium">Empowering Innovation</span>
            <h1 className="hero-title-premium">Training & <span className="highlight">Workshops</span></h1>
            <p className="hero-subtitle-premium">
              Level up your skills with expert-led courses designed for the future economy.
              Bridging the gap between knowledge and industry needs.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Stats Summary - Floating */}
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="stats-row-premium"
        >
          <div className="stat-card-premium">
            <div className="stat-icon-wrapper"><FaGraduationCap /></div>
            <h3>{trainings.length}+</h3>
            <span>Curated Courses</span>
          </div>
          <div className="stat-card-premium">
            <div className="stat-icon-wrapper"><FaChalkboardTeacher /></div>
            <h3>{uniqueTypes.length - 1}</h3>
            <span>Major Domains</span>
          </div>
          <div className="stat-card-premium">
            <div className="stat-icon-wrapper"><FaUsers /></div>
            <h3>100%</h3>
            <span>Practical Focus</span>
          </div>
        </motion.div>
      </Container>

      {/* Filter Section */}
      <Container className="filter-container-premium">
        <div className="filters-glass-box">
          <Row className="g-3 align-items-center">
            <Col lg={5}>
              <InputGroup className="search-group-premium">
                <InputGroup.Text><FaSearch className="search-icon" /></InputGroup.Text>
                <Form.Control
                  placeholder="Search by keyword, technology, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col lg={3}>
              <Form.Select
                className="select-premium"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Formats' : type}</option>
                ))}
              </Form.Select>
            </Col>
            <Col lg={2}>
              <Form.Select
                className="select-premium"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc === 'All' ? 'All Venues' : loc}</option>
                ))}
              </Form.Select>
            </Col>
            <Col lg={2}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="host-btn-premium"
              >
                <FaChalkboardTeacher /> <span>Host Event</span>
              </motion.button>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Trainings Grid */}
      <Container className="pb-5">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-premium"></div>
            <p>Loading curated opportunities...</p>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="row g-4"
            >
              <AnimatePresence mode="wait">
                {currentItems.length > 0 ? (
                  currentItems.map((training) => (
                    <Col key={training.id} lg={4} md={6}>
                      <motion.div
                        variants={itemVariants}
                        layout
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileHover={{ y: -12, transition: { duration: 0.3 } }}
                        className="training-card-premium"
                      >
                        <div className="card-image-wrapper">
                          <img
                            src={training.image_url?.startsWith('http') ? training.image_url : `${BACKEND_URL}${training.image_url}`}
                            alt={training.title}
                            className="card-img-main"
                          />
                          <div className="image-overlay-premium"></div>
                          <div className="card-badge-premium">
                            {training.status}
                          </div>
                          {/* <div className="hover-action-hint">
                            <span>View Syllabus</span>
                            <FaArrowRight />
                          </div> */}
                        </div>

                        <div className="card-content-premium">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <Badge className="type-pill">{training.type}</Badge>
                            <span className="duration-pill"><FaChevronRight className="me-1 small" /> {training.duration}</span>
                          </div>

                          <h3 className="card-title-premium">{training.title}</h3>
                          <p className="card-summary-premium">{training.summary}</p>

                          <div className="card-meta-premium">
                            <div className="meta-item">
                              <div className="meta-icon-circle"><FaCalendarAlt /></div>
                              <div className="meta-text-group">
                                <span className="meta-label">Date</span>
                                <span className="meta-value">{new Date(training.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                            </div>
                            <div className="meta-item">
                              <div className="meta-icon-circle"><FaMapMarkerAlt /></div>
                              <div className="meta-text-group">
                                <span className="meta-label">Location</span>
                                <span className="meta-value">{training.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="instructor-box-premium">
                            <div className="instructor-info">
                              <div className="instructor-avatar-placeholder">
                                <FaGraduationCap />
                              </div>
                              <div className="instructor-details">
                                <span className="instructor-label">Instructor</span>
                                <span className="instructor-name">{training.instructor}</span>
                              </div>
                            </div>
                          </div>

                          <div className="tags-container-premium">
                            {training.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="tag-pill-premium">#{tag}</span>
                            ))}
                            {training.tags.length > 3 && (
                              <span className="tag-pill-premium">+{training.tags.length - 3}</span>
                            )}
                          </div>
                        </div>

                        <div className="card-accent-line"></div>
                      </motion.div>
                    </Col>
                  ))
                ) : (
                  <Col xs={12}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="no-results-premium"
                    >
                      <FaSearch className="no-res-icon" />
                      <h3>No Matches Found</h3>
                      <p>Try refining your search or filters to see more results.</p>
                      <button onClick={() => { setSearchTerm(''); setSelectedType('All'); setSelectedLocation('All'); }} className="reset-btn-premium">Clear All Filters</button>
                    </motion.div>
                  </Col>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Premium Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pagination-wrapper-premium mt-5"
              >
                <div className="pagination-container">
                  <button
                    className={`pag-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft />
                  </button>

                  <div className="pag-numbers">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        className={`pag-num ${currentPage === i + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className={`pag-btn next ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <div className="pagination-info">
                  Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredTrainings.length)} of {filteredTrainings.length} workshops
                </div>
              </motion.div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default TrainingWorkshops;