import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGlobe, FaClock, FaMapMarkerAlt, FaUsers,
  FaShareAlt, FaPlay, FaCalendarAlt, FaComments, FaVideo
} from 'react-icons/fa';
import LiveStream from '../../components/LiveStream';
import LiveChat from '../../components/LiveChat';
import ViewerStats from '../../components/LiveEvents/ViewerStats';
import ShareButtons from '../../components/LiveEvents/ShareButtons';
import SEO from '../../components/SEO/SEO';
import DirectStreamManager from '../../components/streaming/DirectStreamManager';
import * as api from '../../services/apiService';
import { io, Socket } from 'socket.io-client';
import './LiveEvents.css';

const LiveEventsPage: React.FC = () => {
  const [config, setConfig] = useState<api.LiveEventConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());
  const [viewerCount, setViewerCount] = useState(0);

  // WebRTC State for Direct Streaming
  const [directStream, setDirectStream] = useState<MediaStream | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    fetchActiveEvent();
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (config?.id) {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const socket = io(`${protocol}//${window.location.hostname}:5001`);
      socketRef.current = socket;

      socket.emit('join-event', {
        eventId: config.id,
        username: localStorage.getItem('chat_username') || `Guest_${Math.floor(Math.random() * 1000)}`
      });

      socket.on('viewer-count', (count: number) => {
        setViewerCount(count);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [config?.id]);

  useEffect(() => {
    if (config) {
      // Config loaded successfully
    }
  }, [config]);

  const fetchActiveEvent = async () => {
    try {
      setLoading(true);
      const data = await api.getActiveLiveEvent();
      setConfig(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load live event:', err);
      setError('Live event information is currently unavailable.');
      setLoading(false);
    }
  };


  const eventStatus = useMemo(() => {
    if (!config) return null;
    if (config.status === 'live') return 'LIVE';
    if (config.status === 'ended') return 'ENDED';

    const start = new Date(`${config.date}T${config.startTime || '00:00'}`);
    const end = new Date(`${config.date}T${config.endTime || '23:59'}`);

    if (now >= start && now <= end) return 'LIVE';
    if (now < start) return 'UPCOMING';
    return 'ENDED';
  }, [config, now]);

  const countdown = useMemo(() => {
    if (!config || eventStatus !== 'UPCOMING') return null;
    const start = new Date(`${config.date}T${config.startTime || '00:00'}`);
    const diff = start.getTime() - now.getTime();

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    return { h, m, s };
  }, [config, eventStatus, now]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium">Connecting to hub...</p>
    </div>
  </div>;

  if (!config) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 max-w-md">
      <div className="bg-white p-8 rounded-[40px] shadow-xl">
        <FaVideo size={48} className="mx-auto text-gray-300 mb-6" />
        <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">STAY TUNED</h2>
        <p className="text-gray-500 font-medium">There are no live events scheduled at the moment. Please check back later.</p>
      </div>
    </div>
  </div>;

  const statusBadge = {
    'LIVE': 'bg-red-600 text-white shadow-red-500/50',
    'UPCOMING': 'bg-blue-600 text-white shadow-blue-500/50',
    'ENDED': 'bg-gray-900 text-white'
  }[eventStatus as string] || 'bg-gray-100 text-gray-500';

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title={`${config.title} - Live Hub`}
        description={config.subtitle}
      />

      <div className="w-full bg-[#16284F] bg-gradient-to-r from-[#16284F] to-[#0C7C92] pt-16 pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-8 text-white"
          >
            <div className="flex-grow text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black tracking-widest uppercase mb-6">
                <span className={`h-2 w-2 rounded-full ${eventStatus === 'LIVE' ? 'bg-red-500 animate-pulse' : 'bg-blue-400'}`}></span>
                ITPC DIGITAL HUB
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                {config.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
                {config.subtitle}
              </p>
            </div>

            <div className="flex-shrink-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 min-w-[320px] shadow-2xl">
              <h3 className="text-white/40 text-xs font-black uppercase tracking-widest mb-6">Event Details</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl"><FaCalendarAlt /></div>
                  <div>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-wider">Date</p>
                    <p className="font-bold text-lg">{config.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl"><FaClock /></div>
                  <div>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-wider">Time (GMT)</p>
                    <p className="font-bold text-lg">{config.startTime} - {config.endTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl"><FaMapMarkerAlt /></div>
                  <div>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-wider">Location</p>
                    <p className="font-bold text-lg">{config.location || 'ITPC Digital Hall'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-8 -mt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="shadow-2xl shadow-blue-900/10"
            >
              <LiveStream
                videoUrl={config.stream.url}
                poster={config.stream.poster}
                showLiveBadge={eventStatus === 'LIVE'}
                directStream={directStream}
                isLive={eventStatus === 'LIVE'}
              />
              {config.status === 'live' && (
                <DirectStreamManager
                  eventId={config.id}
                  onStream={(stream) => setDirectStream(stream)}
                  onError={(err) => {
                    // Silent on production or use proper reporting
                  }}
                />
              )}
            </motion.div>

            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <ViewerStats
                  base={config.analytics?.estimatedViewers || 0}
                  realCount={viewerCount}
                />
                <div className="h-10 w-px bg-gray-100 hidden md:block"></div>
                <div className="flex items-center gap-3 text-gray-500 font-bold text-sm tracking-tight">
                  <div className="bg-gray-50 p-2 rounded-xl"><FaGlobe className="text-blue-600" /></div>
                  GLOBAL BROADCAST
                </div>
              </div>
              <ShareButtons title={config.title} />
            </div>

            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 scale-150 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                <FaVideo size={120} />
              </div>
              <h2 className="text-2xl font-black mb-6 text-gray-900 tracking-tight uppercase tracking-widest text-sm flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                About this Event
              </h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed font-medium">
                {config.description || config.subtitle}
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase tracking-widest text-sm flex items-center gap-3">
                  <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                  Program Agenda
                </h2>
                <div className="bg-blue-50 text-blue-600 px-6 py-2 rounded-2xl text-xs font-black tracking-widest uppercase">
                  {config.agenda?.length || 0} Sessions
                </div>
              </div>

              <div className="space-y-0">
                {config.agenda?.map((item, idx) => (
                  <div key={idx} className="flex gap-8 pb-10 border-l-2 border-gray-50 pl-10 relative last:pb-0">
                    <div className="absolute -left-[9.5px] top-0 h-4 w-4 rounded-full bg-blue-600 border-4 border-white shadow-xl shadow-blue-500/30"></div>
                    <div className="min-w-[100px] font-black text-blue-600 text-sm tracking-widest uppercase">{item.time}</div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">{item.title}</h3>
                      {item.speaker && (
                        <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-wider">
                          <FaUsers className="text-blue-400" />
                          {item.speaker}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {eventStatus === 'UPCOMING' && countdown && (
              <div className="bg-gradient-to-br from-[#16284F] to-[#0C7C92] rounded-[40px] p-10 shadow-2xl text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white/60">Broadcast Starts In</h3>
                <div className="flex justify-center gap-4 relative z-10">
                  <div className="bg-black/20 backdrop-blur-md p-6 rounded-3xl min-w-[80px] border border-white/5">
                    <span className="block text-4xl font-black mb-1">{countdown.h}</span>
                    <span className="text-[8px] font-black opacity-50 uppercase tracking-widest">Hrs</span>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md p-6 rounded-3xl min-w-[80px] border border-white/5">
                    <span className="block text-4xl font-black mb-1">{countdown.m}</span>
                    <span className="text-[8px] font-black opacity-50 uppercase tracking-widest">Min</span>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md p-6 rounded-3xl min-w-[80px] border border-white/5">
                    <span className="block text-4xl font-black mb-1">{countdown.s}</span>
                    <span className="text-[8px] font-black opacity-50 uppercase tracking-widest">Sec</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[650px]">
              <div className="bg-gray-50/50 p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-gray-900 flex items-center gap-3 uppercase tracking-tighter text-sm">
                  <div className="bg-blue-600 p-2 rounded-xl"><FaComments className="text-white" /></div>
                  Live Interaction
                </h3>
                {eventStatus === 'LIVE' && (
                  <div className="flex items-center gap-2 text-[10px] font-black text-red-600 bg-red-50 px-3 py-1.5 rounded-full animate-pulse">
                    <span className="h-1.5 w-1.5 bg-red-600 rounded-full"></span>
                    ON AIR
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <LiveChat
                  eventId={config.id}
                  enabled={config.chat?.enabled && (eventStatus === 'LIVE' || eventStatus === 'UPCOMING')}
                  pinned={config.chat?.pinned ? [{ author: 'System', text: config.chat.pinned }] : []}
                />
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 shadow-xl border border-gray-100">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Session Contributors</h3>
              <div className="space-y-6">
                {config.speakers?.map((sp, idx) => (
                  <div key={idx} className="flex items-center gap-5 group cursor-default">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                      <img
                        src={sp.photo || '/images/icons8-support-64.PNG'}
                        className="h-16 w-16 relative rounded-2xl object-cover ring-4 ring-white shadow-lg"
                        alt={sp.name}
                      />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 group-hover:text-blue-600 transition tracking-tight">{sp.name}</h4>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{sp.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveEventsPage;
