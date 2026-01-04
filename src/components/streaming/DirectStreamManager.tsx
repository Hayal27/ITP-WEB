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
        const adminPeerId = `event-${eventId}-admin`;


        // 1. Open Data Link
        const conn = peer.connect(adminPeerId);

        conn.on('open', () => {
            conn.send({ type: 'REQUEST_STREAM' });
        });

        conn.on('data', (data: any) => {
            if (data && data.type === 'NOT_READY') {
                startRetrying(peer);
            }
        });

        // 2. Listen for the Host to call US back
        peer.on('call', (call) => {
            call.answer(new MediaStream()); // Minimal response to establish link

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
        });

        conn.on('error', (err) => {
            console.warn('📡 Viewer: Host not reachable.');
            startRetrying(peer);
        });
    };

    const startRetrying = (peer: Peer) => {
        if (retryIntervalRef.current) return;

        retryIntervalRef.current = setInterval(() => {
            if (peer && !peer.destroyed) {
                connectToAdmin(peer);
            }
        }, 6000);
    };

    useEffect(() => {
        if (peerRef.current && !peerRef.current.destroyed) return;


        const peer = new Peer(`viewer-${Math.random().toString(36).substr(2, 9)}`, {
            host: window.location.hostname,
            port: 5001,
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
