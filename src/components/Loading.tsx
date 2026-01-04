import React, { useEffect, useState } from 'react';
import '../styles/Loading.css';

const Loading: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Progressive counter logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        // Random incremental steps for realistic feel
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // 10 vertical strips for the Konza-style exit transition
  const strips = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div
      aria-busy={!isLoaded}
      aria-live="polite"
      role="status"
      className={`loading-preloader ${isLoaded ? 'sl-pl-loaded' : ''}`}
    >
      {/* Noise Texture Layer */}
      <div className="sl-pl-noise" />

      {/* Sequential Background Wipe Strips */}
      <div className="sl-pl-background">
        {strips.map((i) => (
          <div
            key={i}
            className="sl-pl-strip"
            style={{ '--strip-idx': i } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="sl-pl-content">
        <div className="sl-pl-logo-container">
          <div className="sl-pl-logo-wrapper">
            <img
              src="/images/Asset 21@30x.png"
              alt="IT Park Logo"
              className="sl-pl-logo"
              draggable={false}
            />
          </div>

          <div className="dot-wave">
            <span className="p-dot" style={{ '--d-idx': 1 } as React.CSSProperties} />
            <span className="p-dot" style={{ '--d-idx': 2 } as React.CSSProperties} />
            <span className="p-dot" style={{ '--d-idx': 3 } as React.CSSProperties} />
            <span className="p-dot" style={{ '--d-idx': 4 } as React.CSSProperties} />
            <span className="p-dot" style={{ '--d-idx': 5 } as React.CSSProperties} />
          </div>
        </div>

        <div className="sl-pl-footer">
          <h2 className="sl-pl-motto">
            <span className="sl-pl-motto-text">Africa's Innovation Pulse</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Loading;