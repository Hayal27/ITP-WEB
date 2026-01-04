import React, { useEffect } from 'react';

type Meta = Record<string, string | undefined>;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  meta?: Meta;
  keywords?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'profile';
}

const setMetaTag = (name: string, content?: string) => {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setOGTag = (property: string, content?: string) => {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setCanonical = (href?: string) => {
  if (!href) return;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const setStructuredData = (title?: string, description?: string, image?: string, url?: string) => {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]#organization-schema');
  if (existing) existing.remove();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ethiopian IT Park",
    "alternateName": "ITPC",
    "url": url || "https://ethiopianitpark.com",
    "logo": image || "https://res.cloudinary.com/yesuf/image/upload/v1766148035/Asset_19_30x_gclilt.png",
    "description": description || "Ethiopia's flagship technology and innovation hub empowering startups, enterprises, and talent with infrastructure, incubation, and investment pathways.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bole, Goro",
      "addressLocality": "Addis Ababa",
      "addressCountry": "ET"
    },
    "telephone": "+251-11-667-3333",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+251-11-667-3333",
      "contactType": "customer service",
      "areaServed": "ET",
      "availableLanguage": ["English", "Amharic"]
    },
    "sameAs": [
      "https://web.facebook.com/profile.php?id=61554955861892",
      "https://x.com/EthiopianP74117",
      "https://www.linkedin.com/company/ethiopianitpark/",
      "https://www.tiktok.com/@ethiopianitpark",
      "https://www.youtube.com/@EthiopianITParkOfficial",
      "https://t.me/EthiopianItPark/4"
    ]
  };

  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('id', 'organization-schema');
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  meta,
  keywords,
  canonical,
  type = 'website'
}) => {
  useEffect(() => {
    // Page title
    if (title) {
      document.title = `${title} | Ethiopian IT Park`;
    } else {
      document.title = "Ethiopian IT Park | Premier Tech Hub in East Africa";
    }

    // Meta description
    setMetaTag('description', description || "Ethiopia's flagship technology and innovation hub empowering startups, enterprises, and talent with infrastructure, incubation, and investment pathways.");

    // Keywords
    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    // Viewport (if not already set)
    if (!document.querySelector('meta[name="viewport"]')) {
      setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    }

    // OpenGraph tags
    setOGTag('og:title', title || 'Ethiopian IT Park');
    setOGTag('og:description', description);
    setOGTag('og:image', image || 'https://res.cloudinary.com/yesuf/image/upload/v1758800607/office_hmfkwd.jpg');
    setOGTag('og:url', url || window.location.href);
    setOGTag('og:type', type);
    setOGTag('og:site_name', 'Ethiopian IT Park');
    setOGTag('og:locale', 'en_US');

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title || 'Ethiopian IT Park');
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image || 'https://res.cloudinary.com/yesuf/image/upload/v1758800607/office_hmfkwd.jpg');
    setMetaTag('twitter:site', '@EthiopianP74117');

    // Canonical URL
    setCanonical(canonical || url || window.location.href);

    // Structured data
    setStructuredData(title, description, image, url);

    // Additional meta tags
    if (meta) {
      Object.entries(meta).forEach(([k, v]) => setMetaTag(k, v));
    }
  }, [title, description, image, url, meta, keywords, canonical, type]);

  return null;
};

export default SEO;
