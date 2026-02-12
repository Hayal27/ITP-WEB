import React, { useEffect, useRef } from 'react';
import Peer from 'peerjs';

interface DirectStreamManagerProps {
    eventId: string;
    onStream: (stream: MediaStream | null) => void;
    onError?: (error: string) => void;
}

const DirectStreamManager: React.FC<DirectStreamManagerProps> = ({ eventId, onStream, onError }) => {
    const peerRef = useRef<Peer | null>(null);
    const callRef = useRef<any>(null);
    const retryIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const connectToAdmin = (peer: Peer) => {
        // Security: Sanitize eventId to prevent injection in peer identifiers
        const safeEventId = eventId.replace(/[^a-zA-Z0-9-]/g, '');
        const adminPeerId = `event-${safeEventId}-admin`;

        // 1. Open Data Link
        const conn = peer.connect(adminPeerId);

        conn.on('open', () => {
            // Send a structured request
            conn.send({ type: 'REQUEST_STREAM', timestamp: Date.now() });
        });

        conn.on('data', (data: any) => {
            // Security: Validate incoming data structure
            if (typeof data !== 'object' || data === null) return;

            if (data.type === 'NOT_READY') {
                startRetrying(peer);
            }
        });

        // 2. Listen for the Host to call US back
        peer.on('call', (call) => {
            // Security: In a production P2P setup, we would verify a token here
            call.answer(new MediaStream());

            call.on('stream', (remoteStream) => {
                const videoTracks = remoteStream.getVideoTracks();
                if (videoTracks.length > 0) {
                    if (retryIntervalRef.current) {
                        clearInterval(retryIntervalRef.current);
                        retryIntervalRef.current = null;
                    }
                    onStream(remoteStream);
                }
            });

            call.on('error', (err) => {
                console.error('📡 Viewer: Call error:', err);
                onStream(null);
            });
        });

        conn.on('error', (err) => {
            // Use generic warnings to avoid leaking host structure
            console.warn('📡 Viewer: Connection sync interrupted.');
            startRetrying(peer);
        });
    };

    const startRetrying = (peer: Peer) => {
        if (retryIntervalRef.current) return;

        retryIntervalRef.current = setInterval(() => {
            if (peer && !peer.destroyed && !peer.disconnected) {
                connectToAdmin(peer);
            }
        }, 8000); // Slightly increased backoff for network stability
    };

    useEffect(() => {
        if (peerRef.current && !peerRef.current.destroyed) return;

        // Generate a cryptographically stronger random ID part
        const randomPart = Array.from(window.crypto.getRandomValues(new Uint32Array(1)))[0].toString(36);
        const viewerId = `viewer-${randomPart}`;

        const peer = new Peer(viewerId, {
            host: window.location.hostname,
            port: 5005,
            path: '/peerjs',
            secure: window.location.protocol === 'https:',
            debug: 0,
            config: {
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
            }
        });

        peer.on('open', (id) => {
            connectToAdmin(peer);
        });

        peer.on('error', (err) => {
            if (err.type === 'peer-unavailable') {
                startRetrying(peer);
            } else if (err.type !== 'disconnected') {
                console.error('📡 Viewer: Peer error:', err.type);
                onError?.(`Connection issue: ${err.type}`);
            }
        });

        peerRef.current = peer;

        return () => {
            // Note: We don't automatically destroy here in dev to avoid Strict Mode race conditions
            // but we do ensure retries are cleared
            if (retryIntervalRef.current) {
                clearInterval(retryIntervalRef.current);
                retryIntervalRef.current = null;
            }
        };
    }, [eventId]);

    return null; // This is a logic-only component
};

export default DirectStreamManager;
