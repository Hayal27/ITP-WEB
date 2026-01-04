import React, { useState, useEffect, useCallback, ChangeEvent, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { getMediaItems, MediaItem, BACKEND_URL } from '../../services/apiService';
import { sanitizeHtml } from '../../utils/sanitize';
import SkeletonLoader from '../../components/SkeletonLoader';
import './MediaGallery.css';

// Helper function to get YouTube embed URL
const getYoutubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  let videoId = null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v');
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (e) {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/;
    const match = url.match(regex);
    videoId = match ? match[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }
};

// Helper function to construct full image URLs
export const getFullImageUrl = (baseUrl: string, imagePath?: string): string | undefined => {
  if (!imagePath) {
    return undefined;
  }
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanImagePath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${cleanBaseUrl}${cleanImagePath}`;
};


const MediaGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number | null>(null);

  const [allMediaItems, setAllMediaItems] = useState<MediaItem[]>([]);
  const [filteredMediaItems, setFilteredMediaItems] = useState<MediaItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const items = await getMediaItems();
        setAllMediaItems(items);

        if (items.length > 0) {
          const uniqueCategories = Array.from(new Set(items.map(item => item.category).filter(Boolean)));
          setCategories(['all', ...uniqueCategories.sort()]);
        } else {
          setCategories(['all']);
        }

      } catch (err) {
        console.error("Failed to fetch media data:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching media.');
        setAllMediaItems([]);
        setCategories(['all']);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    let currentItems = [...allMediaItems];

    if (activeCategory !== 'all') {
      currentItems = currentItems.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      currentItems = currentItems.filter(
        item =>
          item.title.toLowerCase().includes(lowerSearchTerm) ||
          (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
      );
    }
    setFilteredMediaItems(currentItems);
  }, [activeCategory, searchTerm, allMediaItems]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setActiveCategory(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleMediaItemClick = useCallback((item: MediaItem): void => {
    const itemIndex = filteredMediaItems.findIndex(fi => fi.id === item.id);
    if (itemIndex !== -1) {
      setCurrentMediaIndex(itemIndex);
    } else {
      setCurrentMediaIndex(null); // Should not happen if item is from filtered list
    }
    setSelectedMedia(item);
  }, [filteredMediaItems]);

  const handleCloseModal = useCallback((): void => {
    setSelectedMedia(null);
    setCurrentMediaIndex(null);
  }, []);

  const handleModalContentClick = useCallback((e: React.MouseEvent): void => {
    e.stopPropagation();
  }, []);

  const navigateToMedia = useCallback((direction: 'next' | 'prev') => {
    if (currentMediaIndex === null || filteredMediaItems.length <= 1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = currentMediaIndex + 1;
      if (newIndex >= filteredMediaItems.length) return; // At the end
    } else { // prev
      newIndex = currentMediaIndex - 1;
      if (newIndex < 0) return; // At the beginning
    }
    setCurrentMediaIndex(newIndex);
    setSelectedMedia(filteredMediaItems[newIndex]);
  }, [currentMediaIndex, filteredMediaItems, setSelectedMedia, setCurrentMediaIndex]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedMedia) return; // Modal not open

      if (event.key === 'ArrowRight') {
        navigateToMedia('next');
      } else if (event.key === 'ArrowLeft') {
        navigateToMedia('prev');
      } else if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMedia, navigateToMedia, handleCloseModal]);


  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Date not available';
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return "Invalid Date";
    }
  };

  const renderMediaContent = () => {
    if (isLoading && allMediaItems.length === 0) {
      return <SkeletonLoader type="media" />;
    }

    if (error) {
      return (
        <div className="media-gallery-status text-center py-5">
          <Alert variant="danger">
            <Alert.Heading>Error Loading Media</Alert.Heading>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline-danger">Try Again</Button>
          </Alert>
        </div>
      );
    }

    if (filteredMediaItems.length === 0 && !isLoading) {
      return (
        <div className="media-gallery-status text-center py-5">
          <h3>No Media Found</h3>
          <p>
            {searchTerm && activeCategory !== 'all'
              ? `There are no media items matching "${searchTerm}" in the category "${activeCategory}".`
              : searchTerm
                ? `There are no media items matching your search for "${searchTerm}".`
                : activeCategory !== 'all'
                  ? `There are no media items in the category "${activeCategory}".`
                  : "No media items available at the moment."}
          </p>
          <p>Try adjusting your search or filters, or check back later.</p>
        </div>
      );
    }

    return (
      <Row className="media-gallery-grid g-4">
        {filteredMediaItems.map(item => {
          const youtubeEmbedUrl = item.youtubeUrl ? getYoutubeEmbedUrl(item.youtubeUrl) : null;
          const itemPosterUrl = item.poster ? getFullImageUrl(BACKEND_URL, item.poster) : '/images/gallery/video-placeholder.jpg';
          const itemSrcUrl = item.src ? getFullImageUrl(BACKEND_URL, item.src) : '/images/gallery/image-placeholder.jpg';

          return (
            <Col key={item.id.toString()} xs={12} sm={6} md={4} lg={3} className="media-gallery-item">
              <Card
                className="media-gallery-card h-100"
                onClick={() => handleMediaItemClick(item)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleMediaItemClick(item)}
              >
                {item.type === 'video' && youtubeEmbedUrl ? (
                  <div className="media-gallery-video-responsive-wrapper">
                    <iframe
                      src={youtubeEmbedUrl}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                ) : item.type === 'video' ? (
                  <div className="media-gallery-video-wrapper">
                    <video
                      src={itemSrcUrl}
                      poster={itemPosterUrl}
                      className="media-gallery-card-video"
                      preload="metadata"
                      controls={false}
                    />
                    <div className="media-gallery-play-icon">▶</div>
                  </div>
                ) : (
                  <Card.Img
                    variant="top"
                    src={itemSrcUrl}
                    alt={item.title || 'Media image'}
                    className="media-gallery-card-img"
                    onError={(e) => (e.currentTarget.src = '/images/gallery/image-placeholder.jpg')}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="media-gallery-card-title h5">{item.title}</Card.Title>
                  <Card.Text className="media-gallery-card-date text-muted small mb-0 mt-auto">
                    {formatDate(item.date)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  const isPrevDisabled = currentMediaIndex === null || currentMediaIndex === 0;
  const isNextDisabled = currentMediaIndex === null || currentMediaIndex >= filteredMediaItems.length - 1;

  return (
    <div className="media-gallery-page">
      <div className="media-gallery-header-wrapper">
        <Container>
          <div className="media-gallery-header text-center">
            <h1>Media Gallery</h1>
            <p>Explore the vibrant ecosystem of Ethiopian IT Park through our visual journey</p>
          </div>
        </Container>
      </div>

      <Container className="media-gallery-main-content py-4">
        <Row className="mb-4 g-3 align-items-center">
          <Col md={7} lg={8}>
            <Form.Group controlId="mediaSearch">
              <Form.Control
                type="search"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search media items"
              />
            </Form.Group>
          </Col>
          <Col md={5} lg={4}>
            <Form.Group controlId="mediaCategoryFilter">
              <Form.Select
                aria-label="Filter by category"
                value={activeCategory}
                onChange={handleCategoryChange}
                disabled={isLoading && categories.length <= 1}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {renderMediaContent()}
      </Container>

      {selectedMedia && (
        <div className="media-modal" onClick={handleCloseModal} role="dialog" aria-modal="true" aria-labelledby="mediaModalTitle">
          <div
            className={`media-modal-content ${selectedMedia.type === 'video' ? 'has-video' : 'has-image'}`}
            onClick={handleModalContentClick}
            role="document"
          >
            <Button variant="light" className="media-modal-close" onClick={handleCloseModal} aria-label="Close modal">×</Button>

            {filteredMediaItems.length > 1 && (
              <>
                <Button
                  variant="light"
                  className="media-modal-nav-button media-modal-prev-button"
                  onClick={() => navigateToMedia('prev')}
                  disabled={isPrevDisabled}
                  aria-label="Previous media item"
                >
                  &lt;
                </Button>
                <Button
                  variant="light"
                  className="media-modal-nav-button media-modal-next-button"
                  onClick={() => navigateToMedia('next')}
                  disabled={isNextDisabled}
                  aria-label="Next media item"
                >
                  &gt;
                </Button>
              </>
            )}

            {selectedMedia.type === 'video' && selectedMedia.youtubeUrl ? (
              <div className="media-modal-video-responsive-wrapper">
                <iframe
                  src={getYoutubeEmbedUrl(selectedMedia.youtubeUrl) || ''}
                  title={selectedMedia.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : selectedMedia.type === 'video' ? (
              <video
                src={getFullImageUrl(BACKEND_URL, selectedMedia.src) || ''}
                controls
                autoPlay
                className="media-modal-media"
                poster={getFullImageUrl(BACKEND_URL, selectedMedia.poster)}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={getFullImageUrl(BACKEND_URL, selectedMedia.src) || ''}
                alt={selectedMedia.title || 'Selected media'}
                className="media-modal-media"
              />
            )}

            <div className="media-modal-info p-3">
              <h3 id="mediaModalTitle" className="media-modal-title h5">{selectedMedia.title}</h3>
              {selectedMedia.description && <p className="media-modal-description small" dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedMedia.description) }}></p>}
              <p className="media-modal-date text-muted small mb-0">{formatDate(selectedMedia.date)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;