import React, { useEffect, useRef, useState } from 'react';

interface Burst { id: string; emoji: string; x: number; delay: number; }

const emojis = ['👍','🔥','🎉','👏','❤️','🚀'];

const ReactionsBar: React.FC = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);

  const addReaction = (emoji: string) => {
    const id = `${Date.now()}-${idRef.current++}`;
    const x = Math.random() * 80 + 10; // 10% - 90%
    const delay = Math.random() * 0.2;
    setBursts(b => [...b, { id, emoji, x, delay }]);
    setTimeout(() => setBursts(b => b.filter(r => r.id !== id)), 4000);
  };

  // Ambient random reactions to feel lively
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.35) addReaction(emojis[Math.floor(Math.random()*emojis.length)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bursts.map(b => (
        <div key={b.id} style={{ left: `${b.x}%`, animationDelay: `${b.delay}s` }} className="pointer-events-none absolute bottom-0 select-none animate-float-up text-2xl drop-shadow">
          {b.emoji}
        </div>
      ))}
      <div className="pointer-events-auto absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-sm text-white backdrop-blur">
        {emojis.map(e => (
          <button key={e} onClick={() => addReaction(e)} className="transition hover:scale-125 focus:outline-none" aria-label={`Send reaction ${e}`}>{e}</button>
        ))}
      </div>
    </div>
  );
};

export default ReactionsBar;
