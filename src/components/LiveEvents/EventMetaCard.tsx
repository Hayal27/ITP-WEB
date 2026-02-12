import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface EventMetaCardProps {
  title: string;
  subtitle?: string;
  location?: string;
  timezone?: string;
}

const EventMetaCard: React.FC<EventMetaCardProps> = ({ title, subtitle, location, timezone }) => {
  // Security: Sanitize all inputs to prevent XSS if data source is tainted
  const cleanData = useMemo(() => ({
    title: DOMPurify.sanitize(title, { ALLOWED_TAGS: [] }),
    subtitle: subtitle ? DOMPurify.sanitize(subtitle, { ALLOWED_TAGS: [] }) : undefined,
    location: location ? DOMPurify.sanitize(location, { ALLOWED_TAGS: [] }) : undefined,
    timezone: timezone ? DOMPurify.sanitize(timezone, { ALLOWED_TAGS: [] }) : undefined,
  }), [title, subtitle, location, timezone]);

  return (
    <div className="rounded-xl bg-white/80 p-4 shadow-card ring-1 ring-black/5 backdrop-blur">
      <h2 className="text-lg font-semibold text-gray-900">{cleanData.title}</h2>
      {cleanData.subtitle && <p className="mt-1 text-sm text-gray-600">{cleanData.subtitle}</p>}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
        {cleanData.location && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
            📍 {cleanData.location}
          </span>
        )}
        {cleanData.timezone && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
            🕒 {cleanData.timezone}
          </span>
        )}
      </div>
    </div>
  );
};

export default EventMetaCard;
