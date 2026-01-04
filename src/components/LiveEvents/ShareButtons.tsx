import React from 'react';

const networks: { id: string; label: string; build: (url: string, title: string) => string }[] = [
  { id: 'x', label: 'X', build: (u,t) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`},
  { id: 'fb', label: 'Facebook', build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { id: 'ln', label: 'LinkedIn', build: (u,t) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}` },
  { id: 'wa', label: 'WhatsApp', build: (u,t) => `https://api.whatsapp.com/send?text=${encodeURIComponent(t + ' ' + u)}` },
];

interface ShareButtonsProps { title: string; }

const ShareButtons: React.FC<ShareButtonsProps> = ({ title }) => {
  const url = typeof window !== 'undefined' ? window.location.href : 'https://itpc-web.netlify.app/live-events';
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-gray-500">Share:</span>
      {networks.map(n => (
        <a key={n.id} href={n.build(url, title)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-200">
          {n.label}
        </a>
      ))}
      <button
        onClick={() => { navigator.clipboard.writeText(url); }}
        className="inline-flex items-center rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-gray-700"
      >Copy Link</button>
    </div>
  );
};

export default ShareButtons;
