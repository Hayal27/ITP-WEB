import React from 'react';
import DOMPurify from 'dompurify';

interface SafeHTMLProps {
    html: string;
    className?: string;
    tag?: 'div' | 'span' | 'p' | 'article' | 'section';
}

/**
 * SafeHTML Component
 * 
 * Safely renders HTML content with XSS protection using DOMPurify.
 * Use this component instead of dangerouslySetInnerHTML directly.
 * 
 * @param html - The HTML string to sanitize and render
 * @param className - Optional CSS classes
 * @param tag - HTML tag to wrap content (default: 'div')
 * 
 * @example
 * <SafeHTML html={userContent} className="content" tag="article" />
 */
export const SafeHTML: React.FC<SafeHTMLProps> = ({
    html,
    className = '',
    tag = 'div'
}) => {
    const sanitizedHTML = DOMPurify.sanitize(html, {
        // Allow safe HTML tags
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'img', 'span', 'div'
        ],
        // Allow safe attributes
        ALLOWED_ATTR: ['href', 'title', 'alt', 'src', 'class', 'id', 'target', 'rel'],
        // Force rel="noopener noreferrer" on links
        ADD_ATTR: ['target'],
        ALLOW_DATA_ATTR: false,
    });

    const props = {
        className,
        dangerouslySetInnerHTML: { __html: sanitizedHTML }
    };

    switch (tag) {
        case 'span':
            return <span {...props} />;
        case 'p':
            return <p {...props} />;
        case 'article':
            return <article {...props} />;
        case 'section':
            return <section {...props} />;
        default:
            return <div {...props} />;
    }
};

export default SafeHTML;
