
import React from 'react';
import ReactPlayer from 'react-player';
import DailyViewer from '../DailyViewer';

interface LiveStreamProps {
  videoUrl: string;
  poster?: string;
  aspect?: '16:9' | '4:3' | '1:1' | '21:9';
  showLiveBadge?: boolean;
  directStream?: MediaStream | null;
  isLive?: boolean;
}

const aspectClassMap: Record<NonNullable<LiveStreamProps['aspect']>, string> = {
  '16:9': 'pt-[56.25%]',
  '4:3': 'pt-[75%]',
  '1:1': 'pt-[100%]',
  '21:9': 'pt-[42.85%]',
};

const LiveStream: React.FC<LiveStreamProps> = ({ videoUrl, poster, aspect = '16:9', showLiveBadge = true, directStream, isLive }) => {
  const padTop = aspectClassMap[aspect] || aspectClassMap['16:9'];
  const Player = ReactPlayer as unknown as React.ComponentType<Record<string, unknown>>;
  const directVideoRef = React.useRef<HTMLVideoElement>(null);

  // Use a local state to track if we've ever received a direct stream
  const [hasReceivedDirect, setHasReceivedDirect] = React.useState(false);

  React.useEffect(() => {
    if (directStream) setHasReceivedDirect(true);
  }, [directStream]);

  React.useEffect(() => {
    if (directVideoRef.current && directStream) {
      const videoEl = directVideoRef.current;
      videoEl.srcObject = directStream;
      videoEl.muted = true;

      // Attempt to play immediately
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Playback started
        }).catch(error => {
          console.error('LiveStream: ❌ Playback blocked or failed:', error);
          // Auto-muted helps with browser blocks
          videoEl.muted = true;
          videoEl.play();
        });
      }
    }
  }, [directStream]);

  return (
    <div className={`relative ${padTop} bg-black rounded-xl overflow-hidden shadow-card`}>
      {showLiveBadge && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-red-600/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
          Live
        </div>
      )}
      <div className="absolute inset-0">
        {directStream ? (
          <video
            ref={directVideoRef}
            autoPlay
            muted
            playsInline
            controls
            className="w-full h-full object-contain"
          />
        ) : (isLive && !hasReceivedDirect) ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium animate-pulse">Connecting to direct camera stream...</p>
          </div>
        ) : videoUrl && videoUrl.includes('daily.co') ? (
          <DailyViewer roomUrl={videoUrl} showControls={true} />
        ) : (
          <Player
            className="!absolute !inset-0"
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            light={poster}
            playIcon={<button className="group inline-flex items-center gap-3 rounded-full bg-white/95 px-4 py-2 text-gray-900 shadow-lg ring-1 ring-black/10 transition hover:bg-white"><span className="inline-block h-2.5 w-2.5 rounded-full bg-red-600 group-hover:bg-red-500" />Play</button>}
          />
        )}
      </div>
    </div>
  );
};

export default LiveStream;
