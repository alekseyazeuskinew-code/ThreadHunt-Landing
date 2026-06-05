'use client';

import { useEffect, useState } from 'react';

// Тонкая лаймовая полоса прогресса чтения вверху страницы.
export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min((h.scrollTop / max) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div className="h-full bg-accent" style={{ width: `${p}%` }} />
    </div>
  );
}
