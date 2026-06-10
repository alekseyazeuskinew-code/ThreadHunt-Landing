'use client';

import { useMemo } from 'react';

const COLORS = ['#6d5cf6', '#a99bff', '#8b7cff', '#ededf2'];

// Лёгкое CSS-конфетти. Рендерится один раз при появлении (на экране успеха).
export function Confetti({ count = 48 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1.8,
        color: COLORS[i % COLORS.length],
        w: 5 + Math.random() * 5,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="lp-confetti absolute top-0 block rounded-[1px]"
          style={{
            left: `${p.left}%`,
            width: `${p.w}px`,
            height: `${p.w * 0.6}px`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
