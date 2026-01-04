import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Board.css';
import { getBoardMembers, BoardMember } from '../../services/apiService';

const Board: React.FC = () => {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchBoardMembers = async () => {
      try {
        const data = await getBoardMembers();
        setBoardMembers(data);
        if (data.length > 0) {
          setSelectedMember(data[0]);
        }
      } catch (error) {
        console.error('Error fetching board members:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoardMembers();
  }, []);

  const categories = ['All', 'Executive', 'Management', 'Strategic'];

  const filteredMembers = boardMembers.filter(member => {
    const position = member.position || '';
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.english_name?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      position.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === 'All') return matchesSearch;
    return matchesSearch && position.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const handleMemberClick = (member: BoardMember, index: number) => {
    setSelectedMember(member);
    setCurrentIndex(index);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + boardMembers.length) % boardMembers.length;
    setCurrentIndex(newIndex);
    setSelectedMember(boardMembers[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % boardMembers.length;
    setCurrentIndex(newIndex);
    setSelectedMember(boardMembers[newIndex]);
  };

  if (loading) {
    return (
      <div className="board-loading">
        <div className="loading-spinner"></div>
        <p>Loading Our Leadership Team...</p>
      </div>
    );
  }

  return (
    <div className="board-premium-container">
      {/* Hero Section */}
      <motion.div
        className="board-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hero-tag"
          >
            Leadership & Governance
          </motion.div>
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Board of Directors
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Our leadership team brings together decades of expertise to steer the innovation ecosystem of Ethiopia toward a digital future.
          </motion.p>
          <motion.div
            className="hero-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          ></motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="board-main-content">
        <div className="content-wrapper">
          {/* Featured Member Display */}
          <AnimatePresence mode="wait">
            {selectedMember && (
              <motion.div
                key={selectedMember.id}
                className="featured-member"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="featured-card">
                  <div className="featured-image-container">
                    <div className="image-wrapper">
                      <img
                        src={selectedMember.image_url || '/images/default-avatar.png'}
                        alt={selectedMember.name}
                        className="featured-image"
                      />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="member-badge">
                      <span className="badge-text">Board Member</span>
                    </div>
                  </div>

                  <div className="featured-info">
                    <div className="member-header">
                      <div>
                        <h2 className="member-name">{selectedMember.name}</h2>
                        {selectedMember.english_name && (
                          <p className="member-name-en">{selectedMember.english_name}</p>
                        )}
                      </div>
                      <div className="social-links-featured">
                        {selectedMember.linkedin && selectedMember.linkedin !== '#' && (
                          <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaLinkedin />
                          </a>
                        )}
                        {selectedMember.twitter && selectedMember.twitter !== '#' && (
                          <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaTwitter />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="member-position">
                      <FaQuoteLeft className="quote-icon" />
                      <p>{selectedMember.position}</p>
                    </div>

                    {selectedMember.bio && (
                      <div className="member-bio custom-scrollbar">
                        <p>{selectedMember.bio}</p>
                      </div>
                    )}

                    {/* Navigation Controls */}
                    <div className="featured-navigation">
                      <button
                        className="nav-btn prev-btn"
                        onClick={handlePrevious}
                        aria-label="Previous member"
                      >
                        <FaChevronLeft />
                      </button>
                      <div className="member-counter">
                        <span className="current">{currentIndex + 1}</span>
                        <span className="separator">/</span>
                        <span className="total">{boardMembers.length}</span>
                      </div>
                      <button
                        className="nav-btn next-btn"
                        onClick={handleNext}
                        aria-label="Next member"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search and Filters */}
          <div className="board-controls-section">
            <div className="search-bar-wrapper">
              <input
                type="text"
                placeholder="Search by name or position..."
                className="board-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

          </div>

          {/* Members Grid */}
          <div className="members-grid-section">
            <h3 className="grid-title">Explore Our Leadership</h3>
            <motion.div
              className="members-grid"
              layout
            >
              <AnimatePresence>
                {filteredMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    layout
                    className={`member-card ${selectedMember?.id === member.id ? 'active' : ''}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleMemberClick(member, index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="card-image-container">
                      <img
                        src={member.image_url || '/images/default-avatar.png'}
                        alt={member.name}
                        className="card-image"
                      />
                      <div className={`card-overlay ${hoveredIndex === index ? 'visible' : ''}`}>
                        <span className="view-profile">View Profile</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <h4 className="card-name">{member.name}</h4>
                      {member.english_name && (
                        <p className="card-name-en">{member.english_name}</p>
                      )}
                      <p className="card-position">{member.position}</p>
                    </div>
                    {selectedMember?.id === member.id && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredMembers.length === 0 && (
              <div className="no-results">
                <p>No members found matching your search.</p>
                <button className="reset-btn" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>Reset Search</button>
              </div>
            )}
          </div>
        </div>

        {/* Strategic Governance Section */}
        <motion.div
          className="governance-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="gov-card">
            <div className="gov-content">
              <h2>Strategic Governance</h2>
              <div className="gov-grid">
                <div className="gov-item">
                  <div className="gov-icon-box">01</div>
                  <h3>Innovation Stewardship</h3>
                  <p>Guiding the park's strategy to foster a high-growth technological ecosystem.</p>
                </div>
                <div className="gov-item">
                  <div className="gov-icon-box">02</div>
                  <h3>Global Partnerships</h3>
                  <p>Opening doors to international investment and knowledge transfer.</p>
                </div>
                <div className="gov-item">
                  <div className="gov-icon-box">03</div>
                  <h3>Ethical Leadership</h3>
                  <p>Ensuring transparency and excellence in all park operations.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
};

export default Board;