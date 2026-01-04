
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { FaUsers, FaComments } from 'react-icons/fa';

export interface Message {
  id?: string;
  author: string;
  text: string;
}

interface LiveChatProps {
  enabled?: boolean;
  pinned?: Message[];
  eventId: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ enabled = true, pinned = [], eventId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [viewerCount, setViewerCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Connect to backend socket
    const socket = io(`http://${window.location.hostname}:5001`);
    socketRef.current = socket;

    socket.emit('join-event', { eventId, username: localStorage.getItem('chat_username') || `Guest_${Math.floor(Math.random() * 1000)}` });

    socket.on('new-message', (data: Message) => {
      setMessages(prev => [...prev.slice(-50), data]); // Keep last 50
    });

    socket.on('viewer-count', (count: number) => {
      setViewerCount(count);
    });

    return () => {
      socket.disconnect();
    };
  }, [enabled, eventId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enabled || !newMessage.trim()) return;

    socketRef.current?.emit('send-message', {
      eventId,
      text: newMessage
    });
    setNewMessage('');
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, pinned]);

  const allMessages = [...pinned, ...messages];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <p className="text-sm font-medium text-gray-700">Live Chat</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
          <FaUsers size={10} />
          {viewerCount} ONLINE
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3 pr-2 custom-scrollbar">
        {allMessages.map((msg: Message, idx: number) => (
          <div key={idx} className="text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="mr-2 font-black text-gray-900">{msg.author}:</span>
            <span className="text-gray-700 font-medium">{msg.text}</span>
          </div>
        ))}
        {allMessages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="bg-gray-50 p-4 rounded-full mb-3 text-gray-300">
              <FaComments size={24} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No messages yet</p>
            <p className="text-[10px] text-gray-300 font-medium mt-1">Be the first to say hi 👋</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-gray-200 p-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={enabled ? 'Type your message…' : 'Chat disabled for this event'}
          disabled={!enabled}
          className="block w-full rounded-lg border-gray-300 focus:border-primary-default focus:ring-primary-default disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={!enabled || newMessage.trim().length === 0}
          className="inline-flex items-center rounded-lg bg-primary-default px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
