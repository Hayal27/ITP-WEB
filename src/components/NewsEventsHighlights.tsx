import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNews,
  getEvents,
  NewsItem,
  EventItem,
  getCommentsForPost,
  calculateCommentCounts
} from "../services/apiService";
import { sanitizeHtml } from "../utils/sanitize";

// Constants
const PLACEHOLDER_NEWS_IMAGE = '/images/placeholder-news.jpg';
const PLACEHOLDER_EVENT_IMAGE = '/images/placeholder-event.jpg';

// Types
export type HighlightType = "news" | "event";

export interface Highlight {
  id: number | string;
  title: string;
  date: string;
  image?: string | string[] | null;
  description: string;
  type: HighlightType;
  commentCountToDisplay: number;
}

interface NewsEventsHighlightsProps {
  onShowDetail?: (item: NewsItem | EventItem) => void;
}

/**
 * News & Events Highlights Component
 * Displays a grid of news and event highlights with the ability to navigate to details
 */
const NewsEventsHighlights: React.FC<NewsEventsHighlightsProps> = ({ onShowDetail }) => {
  const navigate = useNavigate();
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [allNewsItems, setAllNewsItems] = useState<NewsItem[]>([]);
  const [allEventItems, setAllEventItems] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get image URL with fallback to placeholder
  const getImageUrl = useCallback((image: string | string[] | undefined | null, type: HighlightType): string => {
    if (Array.isArray(image)) {
      return image.length > 0 ? image[0] : (type === "news" ? PLACEHOLDER_NEWS_IMAGE : PLACEHOLDER_EVENT_IMAGE);
    }
    if (typeof image === "string" && image.trim() !== "") {
      return image;
    }
    return type === "news" ? PLACEHOLDER_NEWS_IMAGE : PLACEHOLDER_EVENT_IMAGE;
  }, []);

  // Find the corresponding news or event item
  const getNewsOrEventByHighlight = useCallback((item: Highlight): NewsItem | EventItem | undefined => {
    return item.type === "news"
      ? allNewsItems.find(n => n.id === item.id)
      : allEventItems.find(e => e.id === item.id);
  }, [allNewsItems, allEventItems]);

  // Handle navigation to detail view
  const goToDetail = useCallback((item: Highlight, e?: React.MouseEvent) => {
    e?.stopPropagation();

    const dataItem = getNewsOrEventByHighlight(item);
    if (onShowDetail && dataItem) {
      onShowDetail(dataItem);
    } else {
      // Navigate directly to the content without any hash
      navigate(`/resources/digital/news/${item.type}/${item.id}`);
    }
  }, [getNewsOrEventByHighlight, navigate, onShowDetail]);

  // Handle image loading errors
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>, type: HighlightType) => {
    const target = e.target as HTMLImageElement;
    target.src = type === 'news' ? PLACEHOLDER_NEWS_IMAGE : PLACEHOLDER_EVENT_IMAGE;
  }, []);

  // Fetch highlights data
  useEffect(() => {
    const fetchHighlightsData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [fetchedNews, fetchedEvents] = await Promise.all([
          getNews(),
          getEvents()
        ]);

        setAllNewsItems(fetchedNews);
        setAllEventItems(fetchedEvents);

        const sortedNews = [...fetchedNews].sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const sortedEvents = [...fetchedEvents].sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // Process news highlights with comment counts
        const newsHighlightsPromises = sortedNews.slice(0, 2).map(async (newsItem) => {
          let approvedComments = 0;
          try {
            const allCommentsForPost = await getCommentsForPost(newsItem.id);
            const counts = calculateCommentCounts(allCommentsForPost);
            approvedComments = counts.approvedComments;
          } catch (commentError) {
            console.warn(`Failed to fetch comments for news item ${newsItem.id}:`, commentError);
            approvedComments = newsItem.comments ?? 0;
          }

          return {
            id: newsItem.id,
            title: newsItem.title,
            date: newsItem.date,
            image: newsItem.image ?? null,
            description: newsItem.description,
            type: "news" as const,
            commentCountToDisplay: approvedComments,
          };
        });

        // Process event highlights
        const eventHighlights = sortedEvents.slice(0, 1).map((eventItem) => ({
          id: eventItem.id,
          title: eventItem.title,
          date: eventItem.date,
          image: eventItem.image ?? null,
          description: eventItem.description,
          type: "event" as const,
          commentCountToDisplay: eventItem.comments ?? 0,
        }));

        const resolvedNewsHighlights = await Promise.all(newsHighlightsPromises);
        setHighlights([...resolvedNewsHighlights, ...eventHighlights]);

      } catch (err) {
        console.error("Failed to fetch highlights:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighlightsData();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p>Loading highlights...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p>Failed to load highlights: {error}</p>
      </div>
    );
  }

  // Empty state
  if (highlights.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No news or events highlights available at the moment.</p>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      2xl:grid-cols-4
      3xl:grid-cols-5
      4xl:grid-cols-6
      5xl:grid-cols-7
      gap-6
      px-4
      sm:px-8
      md:px-12
      lg:px-16
      xl:px-20
      2xl:px-24
      3xl:px-32
      4xl:px-40
      5xl:px-52
      max-w-full
      sm:max-w-screen-sm
      md:max-w-screen-md
      lg:max-w-screen-lg
      xl:max-w-screen-xl
      2xl:max-w-[1536px]
      3xl:max-w-[1920px]
      4xl:max-w-[2560px]
      5xl:max-w-[3840px]
      mx-auto">
      {highlights.map((item) => (
        <div
          key={`${item.type}-${item.id}`}
          className="bg-white rounded-xl shadow-card border border-gray-100 hover:shadow-2xl transition group overflow-hidden flex flex-col cursor-pointer touch-manipulation"
          onClick={(e) => goToDetail(item, e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              goToDetail(item);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`View details for ${item.type}: ${item.title.replace(/<[^>]*>?/gm, '')}`}
        >
          <div className="w-full h-48 overflow-hidden">
            <img
              src={getImageUrl(item.image, item.type)}
              alt={item.title.replace(/<[^>]*>?/gm, '')}
              width={400}
              height={192}
              className="w-full h-full object-cover group-hover:scale-105 transition"
              onError={(e) => handleImageError(e, item.type)}
              loading="lazy"
            />
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.type === "news"
                  ? "bg-primary-default/10 text-primary-default"
                  : "bg-primary-light/10 text-primary-light"
                  }`}
              >
                {item.type === "news" ? "News" : "Event"}
              </span>
              <span className="text-xs text-gray-400">
                {formatDate(item.date)}
              </span>
            </div>
            <h3
              className="font-semibold text-lg text-primary-dark mb-1 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
            />
            <p
              className="text-sm text-gray-600 mb-3 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
            />
            <div className="flex items-center justify-between mt-auto">
              <button
                className="text-primary-default text-sm font-medium hover:underline transition bg-transparent border-none p-0"
                aria-label={`Read more about ${item.title.replace(/<[^>]*>?/gm, '')}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToDetail(item);
                }}
              >
                Read More &raquo;
              </button>
              <span
                className="flex items-center gap-1 text-xs text-gray-400"
                title={item.type === 'news' ? "Approved Comments" : "Comments"}
              >
                <svg width="16" height="16" fill="currentColor" className="inline-block" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 18c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7 3.582 7 8 7zm0-1.5c-3.314 0-6-2.239-6-5.5s2.686-5.5 6-5.5 6 2.239 6 5.5-2.686 5.5-6 5.5zm0-7.5a2 2 0 110 4 2 2 0 010-4z" />
                </svg>
                {item.commentCountToDisplay} Comments
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsEventsHighlights;