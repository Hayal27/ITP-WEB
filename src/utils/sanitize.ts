import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * @param html The raw HTML string to sanitize.
 * @returns The sanitized HTML string.
 */
export const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html);
};
