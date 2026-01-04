import React from 'react';

interface EventMetaCardProps {
  title: string;
  subtitle?: string;
  location?: string;
  timezone?: string;
}

const EventMetaCard: React.FC<EventMetaCardProps> = ({ title, subtitle, location, timezone }) => {
  return (
    <div className="rounded-xl bg-white/80 p-4 shadow-card ring-1 ring-black/5 backdrop-blur">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
        {location && <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">📍 {location}</span>}
        {timezone && <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">🕒 {timezone}</span>}
      </div>
    </div>
  );
};

export default EventMetaCard;
