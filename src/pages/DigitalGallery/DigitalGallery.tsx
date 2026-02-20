import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiImage, FiVideo, FiMaximize2, FiActivity } from 'react-icons/fi';
import './DigitalGallery.css';
import LiveChatWidget from '../../components/LiveChatWidget';
import { getMediaItems, MediaItem } from '../../services/apiService';
import { sanitizeHtml } from '../../utils/sanitize';

const DigitalGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const categories: string[] = ['all', 'architecture', 'innovation', 'events', 'technology', 'general'];

  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getMediaItems();
      setMediaItems(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const filteredItems = mediaItems.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'video': return <FiVideo />;
      case '3d': return <FiMaximize2 />;
      case 'interactive': return <FiActivity />;
      default: return <FiImage />;
    }
  };

  return (
    <div className="itpc-digital-gallery">
      {/* Hero Header */}
      <motion.div
        className="itpc-digital-gallery__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="itpc-digital-gallery__title">Digital Showcase</h1>
        <p className="itpc-digital-gallery__description">
          A curated collection of innovation, technology, and visionary projects at the heart of Ethiopia's digital transformation.
        </p>
      </motion.div>

      <Container>
        {/* Controls Bar */}
        <motion.div
          className="itpc-digital-gallery__controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="itpc-digital-gallery__search">
            <FiSearch className="itpc-digital-gallery__search-icon" />
            <input
              type="text"
              placeholder="Search innovation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="itpc-digital-gallery__search-input"
            />
          </div>

          <div className="itpc-digital-gallery__filters">
            {categories.map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`itpc-digital-gallery__filter-btn ${activeFilter === category ? 'itpc-digital-gallery__filter-btn--active' : ''
                  }`}
                onClick={() => setActiveFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="itpc-digital-gallery__loading">
            <div className="itpc-digital-gallery__spinner"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Row className="itpc-digital-gallery__grid">
              <AnimatePresence mode="popLayout">
                {filteredItems.map(item => (
                  <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="itpc-digital-gallery__item">
                    <motion.div
                      variants={itemVariants}
                      layout
                      className="itpc-digital-gallery__card"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="itpc-digital-gallery__media">
                        <div className="itpc-digital-gallery__media-type-icon">
                          {renderIcon(item.type)}
                        </div>
                        {item.type === 'image' && (
                          <img
                            src={item.src}
                            alt={item.title}
                            className="itpc-digital-gallery__media-content"
                            loading="lazy"
                          />
                        )}
                        {(item.type === 'video' || item.type === '3d' || item.type === 'interactive') && (
                          <img
                            src={item.poster || '/images/placeholder-video.jpg'}
                            alt={item.title}
                            className="itpc-digital-gallery__media-content"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="itpc-digital-gallery__card-content">
                        <h3 className="itpc-digital-gallery__card-title">{item.title}</h3>
                        <div
                          className="itpc-digital-gallery__card-description"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description || '') }}
                        />
                        <div className="itpc-digital-gallery__tags">
                          {item.tags?.map((tag: string) => (
                            <span key={tag} className="itpc-digital-gallery__tag">#{tag}</span>
                          ))}
                        </div>
                        <div className="itpc-digital-gallery__date">
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </AnimatePresence>
            </Row>
          </motion.div>
        )}
      </Container>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="itpc-digital-gallery__modal"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="itpc-digital-gallery__modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="itpc-digital-gallery__modal-close"
                onClick={() => setSelectedItem(null)}
              >
                <FiX />
              </button>

              <div className="itpc-digital-gallery__modal-media">
                {selectedItem.type === 'image' && (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="itpc-digital-gallery__modal-media-content"
                  />
                )}
                {selectedItem.type === 'video' && (
                  <video
                    src={selectedItem.src}
                    controls
                    autoPlay
                    className="itpc-digital-gallery__modal-media-content"
                  />
                )}
                {selectedItem.type === '3d' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white bg-slate-900">
                    <FiMaximize2 size={64} className="mb-4 opacity-20" />
                    <p className="text-xl font-bold">3D Augmented Reality View</p>
                    <p className="text-slate-400">Model integration coming soon</p>
                  </div>
                )}
                {selectedItem.type === 'interactive' && (
                  <iframe
                    src={selectedItem.interactiveUrl}
                    title={selectedItem.title}
                    className="itpc-digital-gallery__modal-media-content w-full h-full"
                    frameBorder="0"
                  />
                )}
              </div>

              <div className="itpc-digital-gallery__modal-info">
                <span className="text-primary-default font-bold uppercase tracking-widest text-xs mb-2 block">
                  {selectedItem.category}
                </span>
                <h3 className="itpc-digital-gallery__modal-title">{selectedItem.title}</h3>
                <div
                  className="itpc-digital-gallery__modal-description"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedItem.description || '') }}
                />
                <div className="itpc-digital-gallery__modal-tags mb-6">
                  {selectedItem.tags?.map((tag: string) => (
                    <span key={tag} className="itpc-digital-gallery__tag mr-2 bg-slate-100 p-2">#{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-6 border-t">
                  <div className="text-slate-400 text-sm">
                    Release Date: <span className="text-slate-900 font-semibold">{new Date(selectedItem.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LiveChatWidget
        bgMode="auto"
        infoText="Explore our digital innovation"
        avatarUrl="/images/icons8-support-64.png"
        chatLink="/contact"
      />
    </div>
  );
};

export default DigitalGallery;