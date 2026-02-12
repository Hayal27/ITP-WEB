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
  schema?: object; // Custom schema for specific pages
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

const setPropertyTag = (property: string, content?: string) => {
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

const injectJsonLd = (id: string, data: object) => {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  meta,
  keywords,
  canonical,
  type = 'website',
  schema
}) => {
  useEffect(() => {
    const siteTitle = "Ethiopian IT Park";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDesc = "Ethiopian IT Park is East Africa's flagship technology and innovation hub empowering startups and enterprises with premium infrastructure and investment pathways.";
    const pageDescription = description || defaultDesc;
    const pageImage = image || "https://res.cloudinary.com/yesuf/image/upload/v1758800607/office_hmfkwd.jpg";
    const pageUrl = url || window.location.href;

    document.title = fullTitle;

    setMetaTag('description', pageDescription);
    setMetaTag('keywords', keywords || "Ethiopian IT Park, technology hub, innovation center, ICT park Addis Ababa, startup incubation Ethiopia");

    // OG Tags
    setPropertyTag('og:title', fullTitle);
    setPropertyTag('og:description', pageDescription);
    setPropertyTag('og:image', pageImage);
    setPropertyTag('og:url', pageUrl);
    setPropertyTag('og:type', type);
    setPropertyTag('og:site_name', siteTitle);

    // Twitter Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', pageDescription);
    setMetaTag('twitter:image', pageImage);
    setMetaTag('twitter:site', '@EthiopianP74117');

    setCanonical(canonical || pageUrl);

    // Default Organization Schema
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Ethiopian IT Park",
      "url": "https://ethiopianitpark.com",
      "logo": "https://res.cloudinary.com/yesuf/image/upload/v1766148035/Asset_19_30x_gclilt.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+251-11-667-3333",
        "contactType": "customer service"
      }
    };
    injectJsonLd('org-schema', orgSchema);

    // Page Specific Schema
    if (schema) {
      injectJsonLd('page-schema', schema);
    }

    // Custom breadcrumb schema
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": pathParts.map((part, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
          "item": `https://ethiopianitpark.com/${pathParts.slice(0, index + 1).join('/')}`
        }))
      };
      injectJsonLd('breadcrumb-schema', breadcrumbSchema);
    }

    if (meta) {
      Object.entries(meta).forEach(([k, v]) => setMetaTag(k, v));
    }
  }, [title, description, image, url, meta, keywords, canonical, type, schema]);

  return null;
};

export default SEO;
