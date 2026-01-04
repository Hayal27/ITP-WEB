import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'liveEventTheme';

const DarkModeToggle: React.FC = () => {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
  }, [dark]);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setDark(v => !v)}
      className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/70 px-4 py-1.5 text-sm font-medium text-gray-700 backdrop-blur transition hover:bg-white dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-200 dark:hover:bg-gray-700"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary-default transition dark:scale-0" />
        <span className="absolute inset-0 scale-0 rounded-full bg-yellow-400 transition dark:scale-100" />
      </span>
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
