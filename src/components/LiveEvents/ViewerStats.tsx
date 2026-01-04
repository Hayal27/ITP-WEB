import React, { useEffect, useRef, useState } from 'react';

// Simple cross-tab sync using BroadcastChannel (falls back to local interval)
const channelName = 'itpc-live-viewers';

function useSyncedViewers(base: number) {
  const [count, setCount] = useState(base);
  const bcRef = useRef<BroadcastChannel | null>(null);
  const tabId = useRef(Math.random().toString(36).slice(2));

  useEffect(() => {
    let activeTabs: Record<string, number> = {};
    let cleanupInterval: number | undefined;
    try {
      // @ts-ignore BroadcastChannel might not exist in all browsers
      bcRef.current = new BroadcastChannel(channelName);
      const bc = bcRef.current;
      bc.onmessage = (ev: MessageEvent) => {
        if (ev.data?.type === 'presence-sync') {
          activeTabs = ev.data.tabs || activeTabs;
          // Recalculate count with a little variability to feel alive
          const baseActive = Object.keys(activeTabs).length;
          const jitter = Math.floor(Math.random() * 3);
          setCount(base + baseActive * 3 + jitter); // each tab ~3 viewers + jitter
        }
      };
      const announce = () => {
        activeTabs[tabId.current] = Date.now();
        bc.postMessage({ type: 'presence-sync', tabs: activeTabs });
      };
      announce();
      const heartbeat = setInterval(announce, 5000);
      cleanupInterval = window.setInterval(() => {
        const now = Date.now();
        let changed = false;
        for (const [k, v] of Object.entries(activeTabs)) {
          if (now - v > 15000) { delete activeTabs[k]; changed = true; }
        }
        if (changed) announce();
      }, 7000);
      return () => {
        clearInterval(heartbeat);
        if (cleanupInterval) clearInterval(cleanupInterval);
        if (bcRef.current) bcRef.current.close();
      };
    } catch {
      // Fallback: local dynamic counter
      const interval = setInterval(() => {
        setCount(c => c + (Math.random() > 0.6 ? 1 : 0));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [base]);

  return count;
}

interface ViewerStatsProps {
  base?: number;
  realCount?: number;
}

const ViewerStats: React.FC<ViewerStatsProps> = ({ base = 50, realCount }) => {
  const viewers = realCount !== undefined ? realCount : useSyncedViewers(base);
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>{viewers.toLocaleString()} watching</span>
    </div>
  );
};

export default ViewerStats;
