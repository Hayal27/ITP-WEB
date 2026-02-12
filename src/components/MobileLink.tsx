import { Link, LinkProps } from 'react-router-dom';
import React from 'react';

/**
 * Mobile-safe Link component that works exactly like header NavLinks
 * This ensures touch events are properly handled on mobile devices
 */
export const MobileLink = React.forwardRef<HTMLAnchorElement, LinkProps & { children: React.ReactNode }>(
    (props, ref) => {
        return (
            <Link
                {...props}
                ref={ref}
                style={{
                    ...props.style,
                    pointerEvents: 'auto',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'rgba(0,0,0,0.1)',
                    position: 'relative',
                    zIndex: 1,
                }}
            />
        );
    }
);

MobileLink.displayName = 'MobileLink';

export default MobileLink;
