import React, { useState, useEffect, JSX, useCallback, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Pagination
} from 'react-bootstrap';
import { notifications } from '@mantine/notifications';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FiSearch, FiXCircle, FiCalendar, FiUsers, FiClock, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './NewsEvents.css'; // Ensure this CSS file is linked and updated as per suggestions
import {
  getNews,
  getEvents,
  NewsItem as ApiNewsItem,
  EventItem,
  postNewsComment,
  CommentPayload,
  Comment as ApiComment,
  getCommentsForPost,
  calculateCommentCounts,
  CommentCounts
} from '../../services/apiService';
import { sanitizeHtml } from '../../utils/sanitize';
import SkeletonLoader from '../../components/SkeletonLoader';
import ReCAPTCHA from "react-google-recaptcha";

interface Comment extends ApiComment { }

interface NewsItem extends ApiNewsItem {
  commentsData?: Comment[];
  commentsCount?: number;
  approvedCommentsCount?: number;
  pendingCommentsCount?: number;
}

interface HeroSlide {
  image: string;
  title: string;
  description: string;
}

type FilterType =
  | 'All Categories'
  | 'Infrastructure'
  | 'Innovation'
  | 'Startup Ecosystem'
  | 'Strategic Partnerships'
  | 'Events & Summits'
  | 'Awards & Recognition'
  | 'Government Initiatives'
  | 'Community Engagement';

type YearType = 'all' | '2024' | '2023' | '2022';
type TabType = 'news' | 'events';

const heroSlides: HeroSlide[] = [
  { image: 'https://res.cloudinary.com/yesuf/image/upload/v1758529700/1758004298340_akccou.jpg', title: 'Global Tech Partnerships', description: 'Connect with industry leaders and explore collaboration opportunities in our world-class facilities.' },
  { image: '/images/hero/news-events-hero3.jpeg', title: 'Global Tech Partnerships', description: 'Connect with industry leaders and explore collaboration opportunities in our world-class facilities.' },
  { image: '/images/hero/news-events-hero.png', title: 'Latest Updates & Announcements', description: 'Stay informed about the latest developments, innovations, and opportunities at Ethiopian IT Park.' },
  { image: '/images/hero/news-events-hero2.jpeg', title: 'Innovation & Technology Hub', description: "Experience the pulse of Ethiopia's growing tech ecosystem and be part of our success stories." },
  { image: '/images/hero/news-events-hero1.png', title: 'Upcoming Events & Programs', description: 'Discover our upcoming tech events, workshops, and networking opportunities designed to foster innovation.' },
];

const categories: FilterType[] = [
  'All Categories', 'Infrastructure', 'Innovation', 'Startup Ecosystem', 'Strategic Partnerships',
  'Events & Summits', 'Awards & Recognition', 'Government Initiatives', 'Community Engagement',
];
const years: YearType[] = ['all', '2024', '2023', '2022'];

const NEWS_ITEMS_PER_PAGE = 6; // Items per page for news

const getEventStatus = (eventDateString: string): 'upcoming_or_today' | 'past' => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const eventDate = new Date(eventDateString);
    if (isNaN(eventDate.getTime())) {
      console.warn(`Invalid date string for event: ${eventDateString}`);
      return 'past';
    }
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today ? 'upcoming_or_today' : 'past';
  } catch (e) {
    console.error(`Error parsing event date string: ${eventDateString}`, e);
    return 'past';
  }
};

const filterApprovedComments = (comments?: Comment[]): Comment[] => {
  if (!Array.isArray(comments)) return [];
  return comments
    .filter(comment => comment.approved)
    .map(comment => ({
      ...comment,
      replies: comment.replies ? filterApprovedComments(comment.replies) : [],
    }));
};

interface CommentFormProps {
  onSubmit: (commentData: { name: string; email: string; text: string; website?: string; captchaToken: string }, parentId?: string | null) => Promise<void>;
  newsItemId: string | number;
  parentId?: string | null;
  onCancelReply?: () => void;
  isReplyForm?: boolean;
  isSubmitting?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit, newsItemId, parentId = null, onCancelReply, isReplyForm = false,
  isSubmitting = false
}) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot field

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !text.trim()) {
      notifications.show({
        title: 'Missing Information',
        message: 'All fields are required.',
        color: 'red'
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      notifications.show({
        title: 'Invalid Email',
        message: 'Please enter a valid email address.',
        color: 'red'
      });
      return;
    }

    const token = recaptchaRef.current?.getValue();
    if (!token) {
      notifications.show({
        title: 'Security Check',
        message: 'Please complete the reCAPTCHA.',
        color: 'red'
      });
      return;
    }

    try {
      await onSubmit({ name, email, text, website, captchaToken: token }, parentId);
      setName('');
      setEmail('');
      setText('');
      setWebsite('');
      recaptchaRef.current?.reset();
      if (onCancelReply) onCancelReply();
    } catch (error) {
      console.error("Comment submission failed in form:", error);
    }
  };

  const formIdSuffix = `${newsItemId}${parentId ? `-replyto-${parentId}` : ''}${isReplyForm ? '-isreplyform' : '-iscommentform'}`;

  return (
    <Form onSubmit={handleSubmit} className={`news-events-comment-form ${isReplyForm ? 'reply-form-compact' : ''}`}>
      {/* Honeypot field - hidden from users */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {!isReplyForm && <h5 className="mb-3">Leave a Comment</h5>}

      <Row className={isReplyForm ? 'g-2' : 'mb-3'}>
        <Col md={isReplyForm ? 6 : 12}>
          <Form.Group className={isReplyForm ? 'mb-2' : 'mb-3'} controlId={`commentFormName-${formIdSuffix}`}>
            {!isReplyForm && <Form.Label className="small font-bold">Name</Form.Label>}
            <Form.Control
              size={isReplyForm ? "sm" : undefined}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-required="true"
              aria-invalid={!name.trim() && isSubmitting}
              disabled={isSubmitting}
            />
          </Form.Group>
        </Col>
        <Col md={isReplyForm ? 6 : 12}>
          <Form.Group className={isReplyForm ? 'mb-2' : 'mb-3'} controlId={`commentFormEmail-${formIdSuffix}`}>
            {!isReplyForm && <Form.Label className="small font-bold">Email</Form.Label>}
            <Form.Control
              size={isReplyForm ? "sm" : undefined}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              aria-invalid={(!email.trim() || !/\S+@\S+\.\S+/.test(email)) && isSubmitting}
              disabled={isSubmitting}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId={`commentFormText-${formIdSuffix}`}>
        {!isReplyForm && <Form.Label className="small font-bold">Your Comment</Form.Label>}
        <Form.Control
          as="textarea"
          rows={isReplyForm ? 1 : 3}
          placeholder={isReplyForm ? 'Write a reply...' : 'Your Comment'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          aria-required="true"
          aria-invalid={!text.trim() && isSubmitting}
          disabled={isSubmitting}
          className={isReplyForm ? 'form-control-sm' : ''}
        />
      </Form.Group>

      <div className="mb-3 d-flex justify-content-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Google test key
          size={isReplyForm ? "compact" : "normal"}
        />
      </div>

      <div className="d-flex gap-2">
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          size={isReplyForm ? "sm" : undefined}
          className={isReplyForm ? 'py-1 px-3' : ''}
        >
          {isSubmitting ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            <span className={!isReplyForm ? "gradient-text" : ""}>{isReplyForm ? 'Reply' : 'Post Comment'}</span>
          )}
        </Button>

        {isReplyForm && onCancelReply && (
          <Button variant="outline-secondary" size="sm" onClick={onCancelReply} className="py-1 px-3" disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};

const NewsEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('news');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<FilterType>('All Categories');
  const [filterDate, setFilterDate] = useState<string>('');

  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [filteredData, setFilteredData] = useState<(NewsItem | EventItem)[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImageLoaded, setHeroImageLoaded] = useState<boolean>(false);
  const [detailItem, setDetailItem] = useState<(NewsItem | EventItem) | null>(null);

  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [latestEvents, setLatestEvents] = useState<EventItem[]>([]);

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);

  // Pagination state for News
  const [currentPageNews, setCurrentPageNews] = useState<number>(1);
  const [totalFilteredNewsCount, setTotalFilteredNewsCount] = useState<number>(0);

  // Expanded replies state
  const [expandedReplies, setExpandedReplies] = useState<{ [key: string]: boolean }>({});

  // Lightbox state
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);


  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ type?: string; id?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const baseNewsItems = await getNews();
        const enrichedNewsItemsPromises = baseNewsItems.map(async (item) => {
          try {
            const allCommentsForPost = await getCommentsForPost(item.id) as Comment[];
            const counts: CommentCounts = calculateCommentCounts(allCommentsForPost);
            return {
              ...item,
              commentsData: allCommentsForPost,
              commentsCount: counts.totalComments,
              approvedCommentsCount: counts.approvedComments,
              pendingCommentsCount: counts.pendingComments,
            } as NewsItem;
          } catch (commentError) {
            console.warn(`Failed to fetch/process comments for news item ${item.id}:`, commentError);
            const apiItem = item as any;
            return {
              ...item,
              commentsData: apiItem.commentsData || [],
              commentsCount: apiItem.commentsCount !== undefined ? apiItem.commentsCount : (apiItem.comments || 0),
              approvedCommentsCount: apiItem.approvedCommentsCount !== undefined ? apiItem.approvedCommentsCount : 0,
              pendingCommentsCount: apiItem.pendingCommentsCount !== undefined ? apiItem.pendingCommentsCount : 0,
            } as NewsItem;
          }
        });
        const newsItemsWithFullComments = await Promise.all(enrichedNewsItemsPromises);
        setAllNews(newsItemsWithFullComments);
        setLatestNews([...newsItemsWithFullComments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4));

        const eventItems = await getEvents();
        setAllEvents(eventItems);
        setLatestEvents([...eventItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4));

      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch data.';
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sourceData = activeTab === 'news' ? allNews : allEvents;
    let filtered = [...sourceData];

    if (searchQuery) {
      const lowerSearchQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerSearchQuery) ||
          item.description.toLowerCase().includes(lowerSearchQuery) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerSearchQuery)))
      );
    }
    if (selectedCategory !== 'All Categories' && activeTab === 'news') {
      filtered = filtered.filter(
        (item) => (item as NewsItem).category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (filterDate) {
      const filterYear = new Date(filterDate).getFullYear().toString();
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        return !isNaN(itemDate.getTime()) && itemDate.getFullYear().toString() === filterYear;
      });
    }

    if (activeTab === 'news') {
      setTotalFilteredNewsCount(filtered.length);
      const startIndex = (currentPageNews - 1) * NEWS_ITEMS_PER_PAGE;
      const endIndex = startIndex + NEWS_ITEMS_PER_PAGE;
      setFilteredData(filtered.slice(startIndex, endIndex));
    } else {
      setFilteredData(filtered);
      setTotalFilteredNewsCount(0);
    }
  }, [searchQuery, selectedCategory, filterDate, allNews, allEvents, activeTab, currentPageNews]);

  useEffect(() => {
    if (activeTab === 'news') setCurrentPageNews(1);
  }, [searchQuery, selectedCategory, filterDate, activeTab]);


  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) nextSlide();
    else if (swipe > swipeConfidenceThreshold) prevSlide();
  };

  const nextSlide = useCallback(() => setCurrentImageIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1)), []);
  const prevSlide = useCallback(() => setCurrentImageIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1)), []);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Reset image loaded state when slide index changes to trigger fade-in
  useEffect(() => {
    setHeroImageLoaded(false);
  }, [currentImageIndex]);

  useEffect(() => {
    const { type, id } = params;
    if (type && id) {
      if (type !== activeTab) setActiveTab(type as TabType);
      let itemToSet: NewsItem | EventItem | null = null;
      const sourceDataForDetail = type === 'news' ? allNews : allEvents;
      if (sourceDataForDetail.length > 0) {
        itemToSet = sourceDataForDetail.find(item => item.id.toString() === id) || null;
        setDetailItem(itemToSet);
        if (itemToSet) {
          setTimeout(() => {
            const el = document.getElementById("news-events-detail");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 200);
        }
      } else if (!isLoading) {
        setDetailItem(null);
      }
    } else {
      setDetailItem(null);
    }
  }, [params, location.pathname, allNews, allEvents, isLoading, activeTab]);


  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      let date = new Date(dateString);
      if (dateString.length === 10) {
        date = new Date(dateString + 'T00:00:00Z');
      }
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString('en-US', options);
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return "Invalid Date";
    }
  };

  const formatCommentDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (e) { return "Invalid Date"; }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => setSearchQuery(e.target.value);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedCategory(e.target.value as FilterType);
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => setFilterDate(e.target.value);

  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
    setDetailItem(null);
    setReplyingTo(null);
    navigate(`/resources/digital/news/${tab}`);
  };

  const handleShowDetail = (item: NewsItem | EventItem) => {
    setReplyingTo(null);
    setDetailItem(item);
    if ('category' in item) {
      navigate(`/resources/digital/news/news/${item.id}`);
    } else {
      navigate(`/resources/digital/news/events/${item.id}`);
    }
  };

  const handleCloseDetail = () => {
    setDetailItem(null);
    setReplyingTo(null);
    navigate(`/resources/digital/news/${activeTab}`);
  };

  const handleCommentSubmit = async (
    commentInput: { name: string; email: string; text: string; website?: string; captchaToken: string },
    parentId: string | null = null
  ) => {
    if (detailItem && 'category' in detailItem) {
      setIsSubmittingComment(true);
      const payload: CommentPayload = { ...commentInput, parentId };
      try {
        await postNewsComment(detailItem.id, payload);
        notifications.show({
          title: 'Comment Submitted',
          message: 'Your comment has been submitted and is awaiting moderation.',
          color: 'green'
        });
        setReplyingTo(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to post comment.";
        notifications.show({
          title: 'Error',
          message: errorMessage,
          color: 'red'
        });
        throw error;
      } finally {
        setIsSubmittingComment(false);
      }
    }
  };

  const renderTags = (tags?: string[]) =>
    tags && tags.length > 0 ? (
      <div className="mb-1">
        {tags.map((tag) => (
          <span key={tag} className={`news-events-tag ${tag.toLowerCase().replace(/\s+/g, '-')}`}>
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </span>
        ))}
      </div>
    ) : null;

  // --- Tailwind-based Card Layouts ---
  const renderNewsCard = (item: NewsItem) => (
    <div
      className="news-events-card bg-[var(--bg-card)] rounded-2xl shadow-card flex flex-col h-full transition hover:shadow-lg cursor-pointer"
      onClick={() => handleShowDetail(item)}
    >
      <img
        src={Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : '/images/placeholder-news.jpg'}
        alt={item.title.replace(/<[^>]*>?/gm, '')}
        width={600}
        height={400}
        className="news-events-card-image w-full h-56 object-cover rounded-t-2xl"
        onError={(e) => (e.currentTarget.src = '/images/placeholder-news.jpg')}
      />
      <div className="news-events-card-body flex flex-col flex-1 p-6">
        <div className="news-events-card-meta flex items-center gap-3 mb-2 text-[var(--text-muted)]">
          <span className="news-events-badge">{item.category}</span>
          <span className="news-events-card-date-highlight flex items-center">
            <FiCalendar className="mr-1" /> {formatDate(item.date)}
          </span>
        </div>
        {renderTags(item.tags)}
        <div className="news-events-card-title font-bold text-lg mb-2 text-[var(--text-main)]" dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }} />
        <div className="news-events-card-text text-[var(--text-muted)] mb-4" dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description.substring(0, 120) + (item.description.length > 120 ? '...' : '')) }} />
        <div className="flex justify-between items-center mt-auto">
          <button
            className="news-events-read-more-btn border border-primary-default text-primary-default bg-[var(--bg-main)] font-semibold rounded-md px-4 py-2 hover:bg-primary hover:text-white transition"
            onClick={e => { e.stopPropagation(); handleShowDetail(item); }}
          >
            View Details
          </button>
          <span className="news-events-card-comments-highlight" title="Approved Comments">
            <FiMessageSquare className="mr-1" /> {item.approvedCommentsCount ?? 0} Comments
          </span>
        </div>
      </div>
    </div>
  );

  const renderEventCard = (item: EventItem) => {
    const eventStatus = getEventStatus(item.date);
    const cardClasses = ["news-events-card", "bg-[var(--bg-card)]", "rounded-2xl", "shadow-card", "flex", "flex-col", "h-full", "transition", "hover:shadow-lg", "cursor-pointer"];
    if (eventStatus === 'upcoming_or_today') cardClasses.push("event-is-upcoming");
    return (
      <div className={cardClasses.join(" ")} onClick={() => handleShowDetail(item)}>
        <img
          src={Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : '/images/placeholder-event.jpg'}
          alt={item.title.replace(/<[^>]*>?/gm, '')}
          width={600}
          height={400}
          className="news-events-card-image w-full h-56 object-cover rounded-t-2xl"
          onError={(e) => (e.currentTarget.src = '/images/placeholder-event.jpg')}
        />
        <div className="news-events-card-body flex flex-col flex-1 p-6">
          <div className="news-events-card-meta flex items-center gap-3 mb-2 text-[var(--text-muted)]">
            <span className={`news-events-badge ${eventStatus === 'upcoming_or_today' ? 'badge-upcoming' : 'badge-past'}`}>{eventStatus === 'upcoming_or_today' ? 'Upcoming' : 'Past'}</span>
            <span className="news-events-card-date-highlight flex items-center">
              <FiCalendar className="mr-1" /> {formatDate(item.date)}
            </span>
            <span className="news-events-card-readtime flex items-center"><FiUsers className="mr-1" /> {item.capacity}</span>
          </div>
          {renderTags(item.tags)}
          <div className="news-events-card-title font-bold text-lg mb-2 text-[var(--text-main)]" dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }} />
          <div className="news-events-card-text text-[var(--text-muted)] mb-4">
            <span className="flex items-center gap-1"><FiClock /> {item.time}</span>
            <span className="flex items-center gap-1"><FiMapPin /> {item.venue}</span>
          </div>
          <div className="flex justify-between items-center mt-auto">
            {(item.registrationLink && item.registrationLink !== '#') && (
              <a
                className="news-events-register-btn bg-primary-default text-white font-semibold rounded-md px-4 py-2 hover:bg-accent transition"
                href={item.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                Register
              </a>
            )}
            <span className="text-muted flex items-center gap-1" title="Comments"><FiMessageSquare /> {item.comments ?? 0}</span>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar card
  const renderSidebarCard = (
    item: NewsItem | EventItem,
    type: 'news' | 'event'
  ) => {
    const badgeText =
      type === 'news'
        ? (item as NewsItem).category
        : getEventStatus((item as EventItem).date) === 'upcoming_or_today'
          ? 'Upcoming'
          : 'Past';
    const commentCount =
      type === 'news'
        ? (item as NewsItem).approvedCommentsCount ?? 0
        : (item as EventItem).comments || 0;
    const imageSrc =
      type === 'news'
        ? Array.isArray((item as NewsItem).image) && (item as NewsItem).image.length > 0
          ? (item as NewsItem).image[0]
          : '/images/placeholder-news-thumb.jpg'
        : Array.isArray((item as EventItem).image) && (item as EventItem).image.length > 0
          ? (item as EventItem).image[0]
          : '/images/placeholder-event-thumb.jpg';

    return (
      <div
        key={item.id.toString()}
        className="news-events-sidebar-card flex items-center gap-1 bg-[var(--bg-card)] rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-3 mb-2 cursor-pointer border border-[var(--border-color)] group"
        onClick={() => handleShowDetail(item)}
        title={item.title.replace(/<[^>]*>?/gm, '')}
        style={{ minHeight: 100 }}
      >
        <div className="news-events-sidebar-img-wrap w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--neutral)] border border-[var(--border-color)]">
          <img
            src={imageSrc}
            alt={item.title.replace(/<[^>]*>?/gm, '')}
            className="news-events-sidebar-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={e => {
              (e.currentTarget as HTMLImageElement).src =
                type === 'news'
                  ? '/images/placeholder-news-thumb.jpg'
                  : '/images/placeholder-event-thumb.jpg';
            }}
          />
        </div>
        <div className="news-events-sidebar-body flex-1 min-w-0 flex flex-col justify-between h-full">
          <div>
            <div
              className="news-events-sidebar-title font-semibold text-[1rem] text-[var(--text-main)] leading-tight line-clamp-2 group-hover:text-primary-default transition-colors cursor-pointer"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  item.title.length > 80
                    ? item.title.substring(0, 80) + '...'
                    : item.title
                ),
              }}
            />
          </div>
          <div className="news-events-sidebar-meta flex items-center gap-2 mt-2 text-xs text-[var(--text-muted)]">
            <span className="news-events-sidebar-badge">{badgeText}</span>
            <span className="news-events-sidebar-date">{formatDate(item.date)}</span>
            <span className="news-events-card-comments-highlight flex items-center ml-auto">
              <i className="bi bi-chat-dots mr-1"></i>
              {commentCount}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Pagination
  const renderNewsPaginationControls = () => {
    if (activeTab !== 'news' || totalFilteredNewsCount <= NEWS_ITEMS_PER_PAGE) return null;
    const totalPages = Math.ceil(totalFilteredNewsCount / NEWS_ITEMS_PER_PAGE);
    let items = [];
    const MAX_VISIBLE_PAGES = 5;
    if (totalPages <= MAX_VISIBLE_PAGES + 2) {
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <button
            key={number}
            className={`px-3 py-1 rounded ${number === currentPageNews ? 'bg-primary-default text-white' : 'bg-white border text-primary-default'} mx-1`}
            onClick={() => handleNewsPageChange(number)}
          >
            {number}
          </button>
        );
      }
    } else {
      items.push(
        <button key={1} className={`px-3 py-1 rounded ${1 === currentPageNews ? 'bg-primary-default text-white' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-primary-default'} mx-1`} onClick={() => handleNewsPageChange(1)}>1</button>
      );
      let startPage = Math.max(2, currentPageNews - Math.floor((MAX_VISIBLE_PAGES - 2) / 2));
      let endPage = Math.min(totalPages - 1, currentPageNews + Math.ceil((MAX_VISIBLE_PAGES - 2) / 2) - 1);
      if (currentPageNews <= Math.floor(MAX_VISIBLE_PAGES / 2)) {
        endPage = MAX_VISIBLE_PAGES - 1;
        startPage = 2;
      } else if (currentPageNews > totalPages - Math.floor(MAX_VISIBLE_PAGES / 2)) {
        startPage = totalPages - MAX_VISIBLE_PAGES + 2;
        endPage = totalPages - 1;
      }
      if (startPage > 2) items.push(<span key="start-ellipsis" className="mx-1">...</span>);
      for (let number = startPage; number <= endPage; number++) {
        items.push(
          <button
            key={number}
            className={`px-3 py-1 rounded ${number === currentPageNews ? 'bg-primary-default text-white' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-primary-default'} mx-1`}
            onClick={() => handleNewsPageChange(number)}
          >
            {number}
          </button>
        );
      }
      if (endPage < totalPages - 1) items.push(<span key="end-ellipsis" className="mx-1">...</span>);
      items.push(
        <button key={totalPages} className={`px-3 py-1 rounded ${totalPages === currentPageNews ? 'bg-primary-default text-white' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-primary-default'} mx-1`} onClick={() => handleNewsPageChange(totalPages)}>{totalPages}</button>
      );
    }
    return (
      <div className="flex justify-center mt-6 news-events-pagination">
        <button className="px-3 py-1 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-primary-default mx-1" onClick={() => handleNewsPageChange(currentPageNews - 1)} disabled={currentPageNews === 1}>Prev</button>
        {items}
        <button className="px-3 py-1 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-primary-default mx-1" onClick={() => handleNewsPageChange(currentPageNews + 1)} disabled={currentPageNews === totalPages}>Next</button>
      </div>
    );
  };

  const handleNewsPageChange = (pageNumber: number) => {
    setCurrentPageNews(pageNumber);
    const contentSection = document.querySelector('.news-events-content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const renderCommentWithReplies = (comment: Comment, newsItemId: string | number, level = 0): JSX.Element => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = !!expandedReplies[comment.id];

    return (
      <Card key={comment.id} className={`news-events-comment-card level-${level} ${replyingTo === comment.id ? 'replying-active-parent' : ''} ${level > 0 ? 'reply-card' : ''}`}>
        <Card.Body className={level > 0 ? 'p-3' : ''}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold small text-primary-default">
              <i className="bi bi-person-circle mr-1"></i> {comment.name}
            </span>
            <span className="text-muted smaller">
              {formatCommentDate(comment.date)}
            </span>
          </div>
          <Card.Text className={level > 0 ? 'small mb-2' : 'mb-3'}>{comment.text}</Card.Text>

          <div className="comment-actions d-flex align-items-center gap-3">
            <button
              className="btn btn-link btn-sm p-0 text-decoration-none action-link"
              onClick={() => {
                setReplyingTo(comment.id === replyingTo ? null : String(comment.id));
              }}
            >
              <i className="bi bi-reply mr-1"></i> {replyingTo === comment.id ? 'Cancel' : 'Reply'}
            </button>

            {hasReplies && (
              <button
                className="btn btn-link btn-sm p-0 text-decoration-none action-link text-muted"
                onClick={() => toggleReplies(String(comment.id))}
              >
                {isExpanded ? (
                  <><i className="bi bi-chevron-up mr-1"></i> Hide Replies</>
                ) : (
                  <><i className="bi bi-chevron-down mr-1"></i> View {comment.replies!.length} Replies</>
                )}
              </button>
            )}
          </div>

          {replyingTo === comment.id && (
            <div className="mt-2 mb-2">
              <CommentForm
                onSubmit={handleCommentSubmit}
                newsItemId={newsItemId}
                parentId={String(comment.id)}
                onCancelReply={() => setReplyingTo(null)}
                isReplyForm={true}
                isSubmitting={isSubmittingComment}
              />
            </div>
          )}

          {hasReplies && isExpanded && (
            <div className="news-events-comment-replies mt-2 ps-3 border-start ml-2 border-primary-default/20">
              {comment.replies!.map(reply => renderCommentWithReplies(reply, newsItemId, level + 1))}
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };


  // Main content layout (Feed view)
  const renderMainContent = () => {
    return (
      <section className="news-events-content-section">
        <div className="container mx-auto px-4">
          {isLoading && filteredData.length === 0 ? (
            <SkeletonLoader type="news" />
          ) : !isLoading && filteredData.length === 0 && !error ? (
            <div className="text-center py-5"><h3 className="news-events-no-results">No {activeTab} found matching your criteria.</h3><p className="text-muted">Try adjusting your search or filters, or check back later for new content.</p></div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                  activeTab === 'news'
                    ? <React.Fragment key={(item as NewsItem).id}>{renderNewsCard(item as NewsItem)}</React.Fragment>
                    : <React.Fragment key={(item as EventItem).id}>{renderEventCard(item as EventItem)}</React.Fragment>
                ))}
              </div>
              {renderNewsPaginationControls()}
            </>
          )}
        </div>
      </section>
    );
  };

  // Detail content layout
  const renderDetailContent = () => {
    if (!detailItem) return null;
    const isNewsItem = 'category' in detailItem;
    const allCommentsOfDetailItem = isNewsItem ? (detailItem as NewsItem).commentsData || [] : [];
    const approvedCommentsForDisplay = filterApprovedComments(allCommentsOfDetailItem);
    const displayableCommentCount = isNewsItem
      ? ((detailItem as NewsItem).approvedCommentsCount ?? approvedCommentsForDisplay.length)
      : ((detailItem as EventItem).comments || 0);

    const mainImageUrl = Array.isArray(detailItem.image) && detailItem.image.length > 0
      ? detailItem.image[0]
      : (isNewsItem ? '/images/placeholder-news-large.jpg' : '/images/placeholder-event-large.jpg');

    return (
      <section className="news-events-detail-section" id="news-events-detail">
        <div
          className="news-events-detail-image-bg cursor-pointer group"
          onClick={() => setSelectedImageUrl(mainImageUrl)}
          title="Click to view full image"
        >
          <img
            src={mainImageUrl}
            alt={detailItem.title.replace(/<[^>]*>?/gm, '')}
            className="news-events-detail-img"
            onError={(e) => (e.currentTarget.src = (isNewsItem ? '/images/placeholder-news-large.jpg' : '/images/placeholder-event-large.jpg'))}
          />
          <div className="news-events-detail-image-overlay absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/30">
              <i className="bi bi-arrows-fullscreen mr-2"></i> View Full Image
            </span>
          </div>
        </div>
        <div className="news-events-detail-card">
          <div className="news-events-detail-meta">
            <span className="news-events-badge">{isNewsItem ? (detailItem as NewsItem).category : (getEventStatus(detailItem.date) === 'upcoming_or_today' ? 'Upcoming Event' : 'Past Event')}</span>
            <span className="news-events-card-date-highlight"><i className="bi bi-calendar3"></i> {formatDate(detailItem.date)}</span>
            {!isNewsItem && <span><i className="bi bi-alarm"></i> {(detailItem as EventItem).time}</span>}
            {!isNewsItem && <span><i className="bi bi-geo-alt-fill"></i> {(detailItem as EventItem).venue}</span>}
            {!isNewsItem && <span><i className="bi bi-people"></i> {(detailItem as EventItem).capacity}</span>}
            <span className="news-events-detail-comments news-events-card-comments-highlight"><i className="bi bi-chat-dots"></i> {displayableCommentCount} Comments</span>
          </div>
          {renderTags(detailItem.tags)}
          <h2 className="news-events-detail-title" dangerouslySetInnerHTML={{ __html: sanitizeHtml(detailItem.title) }}></h2>
          <div className="news-events-detail-desc" dangerouslySetInnerHTML={{ __html: sanitizeHtml(detailItem.description.replace(/\n/g, '<br />')) }}></div>

          {Array.isArray(detailItem.image) && detailItem.image.length > 1 && (
            <div className="news-events-detail-gallery mt-8 mb-8 overflow-hidden">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="font-bold text-xl text-[var(--text-main)] m-0">Gallery</h4>
                <div className="gallery-hint text-[var(--text-muted)] small"><i className="bi bi-arrows-expand mr-1"></i> Click to enlarge</div>
              </div>

              <div className="gallery-scroll-container">
                <div className="gallery-track">
                  {detailItem.image.slice(1).map((imgUrl, idx) => (
                    <div key={idx} className="gallery-item-wrapper" onClick={() => setSelectedImageUrl(imgUrl)}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="gallery-item-container"
                      >
                        <img
                          src={imgUrl}
                          alt={`${detailItem.title} - Image ${idx + 2}`}
                          className="gallery-image shadow-sm"
                        />
                        <div className="gallery-item-overlay">
                          <i className="bi bi-plus-lg text-white text-3xl"></i>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {!isNewsItem && (detailItem as EventItem).registrationLink && (detailItem as EventItem).registrationLink !== '#' && getEventStatus(detailItem.date) === 'upcoming_or_today' && (
            <a className="btn btn-success mt-3 mb-3" href={(detailItem as EventItem).registrationLink} target="_blank" rel="noopener noreferrer">Register for Event</a>
          )}
          <button className="news-events-detail-back-btn" onClick={handleCloseDetail}><i className="bi bi-arrow-left"></i> Back to {activeTab === 'news' ? 'News' : 'Events'}</button>
          {isNewsItem && (
            <div className="news-events-comments-section mt-4 pt-4 border-t">
              <h4 className="mb-3">Comments ({displayableCommentCount})</h4>
              {approvedCommentsForDisplay.length > 0 ? (
                approvedCommentsForDisplay.filter(c => !c.parentId).map(comment =>
                  renderCommentWithReplies(comment, detailItem.id)
                )
              ) : (
                <p>No approved comments yet. Be the first to comment!</p>
              )}
              <div className="mt-4">
                <CommentForm onSubmit={handleCommentSubmit} newsItemId={detailItem.id} isSubmitting={isSubmittingComment} />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="news-events-page">
      {/* Hero Section */}
      <section className="news-events-hero-section">
        <div className="news-events-hero-slider">
          <div className="news-events-hero-fixed-container">
            <AnimatePresence>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="news-events-hero-slide"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
              >
                <img
                  src={heroSlides[currentImageIndex].image}
                  alt={heroSlides[currentImageIndex].title}
                  className={`news-events-hero-img ${heroImageLoaded ? 'is-loaded' : ''}`}
                  onLoad={() => setHeroImageLoaded(true)}
                  onError={(e) => { e.currentTarget.classList.add('load-error'); setHeroImageLoaded(true); }}
                  loading="eager"
                  draggable={false}
                />
                <div className="news-events-hero-overlay pointer-events-none"></div>
              </motion.div>
            </AnimatePresence>
            <div className="news-events-hero-content container mx-auto">
              <div className="flex items-center min-h-[120px]">
                <div className="lg:w-2/3">
                  <motion.div
                    key={`text-${currentImageIndex}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="news-events-hero-text"
                  >
                    <h1 className="news-events-hero-title">{heroSlides[currentImageIndex].title}</h1>
                    <p className="news-events-hero-description">{heroSlides[currentImageIndex].description}</p>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="news-events-hero-controls">
              <span className="news-events-hero-counter">{currentImageIndex + 1}/{heroSlides.length}</span>
              <span className="news-events-hero-arrows">
                <BsChevronLeft className="news-events-hero-arrow" onClick={prevSlide} aria-label="Previous slide" tabIndex={0} role="button" />
                <BsChevronRight className="news-events-hero-arrow" onClick={nextSlide} aria-label="Next slide" tabIndex={0} role="button" />
              </span>
            </div>
            <div className="news-events-hero-indicators">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`news-events-hero-indicator ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="news-events-main-layout">
        <div className="container-fluid px-0">
          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="news-events-main-content bg-[var(--news-neutral)] px-4 py-8 flex-1">
              {/* Intro */}
              <section className="news-events-intro-section">
                <div className="container mx-auto">
                  <div className="flex justify-center">
                    <div className="lg:w-11/12 text-center">

                    </div>
                  </div>
                </div>
              </section>

              {/* Filters */}
              <section
                className="news-events-filters-section sticky z-[100]"
                style={{ top: 'var(--app-header-offset, 78px)' }}
              >
                <div className="container mx-auto px-2 sm:px-4">
                  <div className="news-events-filters-container bg-[var(--bg-card)] shadow-xl rounded-2xl p-3 md:p-6 mb-6 -mt-6 md:-mt-12 relative z-10 border border-[var(--border-color)]">
                    <div className="grid grid-cols-1 lg:flex lg:flex-row gap-3 lg:gap-4 items-center justify-between">
                      {/* Search & Category Group */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1">
                        <div className="news-events-search-wrapper">
                          <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                            <input
                              type="text"
                              placeholder="Search..."
                              value={searchQuery}
                              onChange={handleSearchChange}
                              className="news-events-search-input w-full pl-10 pr-4 py-2 bg-[var(--bg-main)] border-none rounded-xl focus:ring-2 focus:ring-primary-default transition-all text-[var(--text-main)] text-sm"
                              aria-label="Search news and events"
                            />
                          </div>
                        </div>

                        <div className="news-events-category-wrapper">
                          <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="news-events-category-select w-full py-2 px-3 bg-[var(--bg-main)] border-none rounded-xl focus:ring-2 focus:ring-primary-default appearance-none transition-all cursor-pointer text-[var(--text-main)] text-sm"
                            aria-label="Select category"
                            disabled={activeTab !== 'news'}
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Year & Tabs Group */}
                      <div className="grid grid-cols-1 md:flex md:flex-row gap-2 items-center">
                        <div className="news-events-year-wrapper flex items-center gap-2 bg-[var(--bg-main)] px-3 py-2 rounded-xl w-full md:w-auto">
                          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase whitespace-nowrap">Date:</span>
                          <input
                            type="date"
                            value={filterDate}
                            onChange={handleDateChange}
                            className="news-events-year-select bg-transparent border-none text-xs font-medium focus:ring-0 p-0 text-[var(--text-main)]"
                            aria-label="Filter by date"
                          />
                          {filterDate && (
                            <button
                              onClick={() => setFilterDate('')}
                              className="text-[var(--text-muted)] hover:text-red-500 transition-colors"
                              title="Clear date"
                            >
                              <FiXCircle size={14} />
                            </button>
                          )}
                        </div>

                        <div className="news-events-tab-group flex p-1 bg-[var(--bg-main)] rounded-xl w-full md:w-auto border border-[var(--border-color)]">
                          <button
                            className={`news-events-tab-button flex-1 md:flex-none md:px-6 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${activeTab === 'news' ? 'news-tab-active' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                            onClick={() => handleTabChange('news')}
                          >
                            News
                          </button>
                          <button
                            className={`news-events-tab-button flex-1 md:flex-none md:px-6 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${activeTab === 'events' ? 'news-tab-active' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                            onClick={() => handleTabChange('events')}
                          >
                            Events
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Main Content Area */}
              {detailItem ? renderDetailContent() : renderMainContent()}
            </div>
            {/* Sidebar */}
            <div className="news-events-sidebar-col w-full lg:w-[370px] px-3 py-8 border-l border-[var(--border-color)]">
              <aside className="news-events-sidebar">
                {/* Latest News */}
                <div className="news-events-sidebar-header">
                  <span className="news-events-sidebar-title-main">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ marginRight: 6, verticalAlign: 'middle' }}>
                      <rect width="18" height="18" rx="4" fill="var(--primary)" />
                      <path d="M7 12.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Latest News
                  </span>
                </div>
                <div className="news-events-sidebar-list">
                  {isLoading && latestNews.length === 0 && !error ? (
                    <div className="text-center p-3">
                      <span className="news-events-spinner" />
                    </div>
                  ) : latestNews.length > 0 ? (
                    latestNews.map(item => renderSidebarCard(item, 'news'))
                  ) : !error && !isLoading ? (
                    <p className="text-muted p-2">No recent news.</p>
                  ) : null}
                </div>
                {/* Upcoming Events */}
                <div className="news-events-sidebar-header mt-4">
                  <span className="news-events-sidebar-title-main">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ marginRight: 6, verticalAlign: 'middle' }}>
                      <rect width="18" height="18" rx="4" fill="var(--accent)" />
                      <path d="M12 7v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Upcoming Events
                  </span>
                </div>
                <div className="news-events-sidebar-list">
                  {isLoading && latestEvents.length === 0 && !error ? (
                    <div className="text-center p-3">
                      <span className="news-events-spinner" />
                    </div>
                  ) : latestEvents.length > 0 ? (
                    latestEvents
                      .filter(event => getEventStatus(event.date) === 'upcoming_or_today')
                      .map(item => renderSidebarCard(item, 'event'))
                  ) : !error && !isLoading ? (
                    <p className="text-muted p-2">No upcoming events.</p>
                  ) : null}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Global Image Lightbox - Always rendered so it's accessible from any view */}
      <AnimatePresence>
        {selectedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setSelectedImageUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="lightbox-content"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImageUrl} alt="Full Resolution" className="lightbox-image" />
              <button className="lightbox-close" onClick={() => setSelectedImageUrl(null)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsEvents;