'use client';

import { useEffect, useState } from 'react';
import { Wordmark } from '@/components/Wordmark';
import { cn } from '@/lib/cn';

/* Эстетичный лоадер всей страницы (~3 c) в стилистике сайта: off-white фон,
   логотип, фиолетовый прогресс-бар + счётчик %. Показывается один раз за сессию;
   при prefers-reduced-motion пропускается мгновенно. Цвет акцента наследуется от
   темы маршрута (theme-violet на <html> ставится скриптом в layout). */
export function PageLoader() {
  const [pct, setPct] = useState(0);
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem('th_loaded') === '1';
    } catch {}
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (skip || reduce) {
      setGone(true);
      return;
    }

    const start = performance.now();
    const DUR = 2600;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DUR);
      // плавное замедление к концу
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const t1 = setTimeout(() => {
      setHide(true);
      try { sessionStorage.setItem('th_loaded', '1'); } catch {}
    }, DUR + 150);
    const t2 = setTimeout(() => setGone(true), DUR + 700);

    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={cn(
        'fixed inset-0 z-[100] grid place-items-center bg-bg transition-opacity duration-500',
        hide && 'pointer-events-none opacity-0',
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft blur-[120px]" />
      <div className="relative flex flex-col items-center gap-7">
        <div className="lp-rise text-2xl"><Wordmark /></div>
        <div className="h-1 w-52 overflow-hidden rounded-full bg-panel-2">
          <div className="h-full rounded-full bg-accent lp-btn-grad transition-[width] duration-150 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <div className="font-mono text-[11px] tracking-[0.3em] text-muted">{String(pct).padStart(3, ' ')}%</div>
      </div>
    </div>
  );
}
