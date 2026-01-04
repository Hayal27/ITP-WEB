import React, { useEffect, useLayoutEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';

interface DailyViewerProps {
    roomUrl: string;
    showControls?: boolean;
}

const DailyViewer: React.FC<DailyViewerProps> = ({ roomUrl, showControls = false }) => {
    const [error, setError] = React.useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const callFrameRef = useRef<any>(null);
    const initializingRef = useRef(false);

    useEffect(() => {
        if (!containerRef.current || !roomUrl || initializingRef.current) return;

        let frame: any = null;
        let isCleaningUp = false;

        if (initializingRef.current) return;
        initializingRef.current = true;
        setError(null);

        const init = async () => {
            // First, destroy any existing instance that might be hanging around
            const existingInstance = DailyIframe.getCallInstance();
            if (existingInstance) {
                try {
                    await existingInstance.destroy();
                } catch (e) {
                    console.warn('👁️ Daily Viewer: Error destroying existing instance:', e);
                }
            }

            if (isCleaningUp) return;


            try {
                // Try to find any stray frames in the same container just in case
                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                }

                frame = DailyIframe.createFrame(containerRef.current!, {
                    iframeStyle: {
                        width: '100%',
                        height: '100%',
                        border: '0',
                        borderRadius: '12px',
                    },
                    showLeaveButton: showControls,
                    showFullscreenButton: showControls,
                });

                callFrameRef.current = frame;

                await frame.join({
                    url: roomUrl,
                    userName: 'Viewer',
                    subscribeToTracksAutomatically: true
                });


                if (frame) {
                    frame.setLocalVideo(false);
                    frame.setLocalAudio(false);
                }

            } catch (error: any) {
                console.error('❌ Daily Viewer Error:', error);
                setError(error.message || 'Failed to join meeting. The meeting link might be invalid or expired.');
            } finally {
                initializingRef.current = false;
            }
        };

        init();

        return () => {
            isCleaningUp = true;
            if (frame) {
                try {
                    frame.destroy();
                } catch (e) { }
                frame = null;
            }
        };
    }, [roomUrl, showControls]);

    return (
        <div className="relative w-full h-full min-h-[400px] bg-black rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <div
                ref={containerRef}
                className="w-full h-full"
            />
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-6 text-center">
                    <div className="text-4xl mb-4">🚫</div>
                    <h3 className="text-xl font-bold mb-2">Viewing Error</h3>
                    <p className="text-gray-300 max-w-md">{error}</p>
                    <p className="mt-4 text-sm text-gray-500">
                        Please try refreshing or contact the event host.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DailyViewer;
