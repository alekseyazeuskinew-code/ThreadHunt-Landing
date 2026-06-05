'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/* ── Reveal: плавное появление блока при попадании во вьюпорт ───────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'header' | 'footer';
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as any} className={cn('lp-reveal', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ── Counter: счётчик, оживающий в момент появления ────────────────────── */
export function Counter({ to, suffix = '', duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const step = (t: number) => {
          if (!start) start = t;
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val.toLocaleString('ru-RU')}
      {suffix}
    </span>
  );
}

/* ── TypingText: печатающийся и стирающийся текст по кругу ──────────────── */
export function TypingText({ phrases, className }: { phrases: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = phrases[i % phrases.length];
    let to: ReturnType<typeof setTimeout> | undefined;
    if (!del && txt === full) {
      to = setTimeout(() => setDel(true), 1500);
    } else if (del && txt === '') {
      setDel(false);
      setI((v) => v + 1);
    } else {
      to = setTimeout(
        () => setTxt(del ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1)),
        del ? 28 : 52,
      );
    }
    return () => { if (to) clearTimeout(to); };
  }, [txt, del, i, phrases]);
  return (
    <span className={className}>
      {txt}
      <span className="lp-caret text-accent-ink">▍</span>
    </span>
  );
}

/* ── AnimatedBars: живая мини-диаграмма ────────────────────────────────── */
export function AnimatedBars({ heights = [40, 62, 48, 80, 58, 94, 70, 84] }: { heights?: number[] }) {
  return (
    <div className="flex h-16 items-end gap-1.5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="lp-bar w-full rounded-sm bg-accent-ink/70"
          style={{ height: `${h}%`, animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
}

/* ── TypeOnce: печатает текст один раз при попадании во вьюпорт ──────────── */
export function TypeOnce({ text, speed = 16, className }: { text: string; speed?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(text.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text]);
  useEffect(() => {
    if (!started || shown >= text.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), speed);
    return () => clearTimeout(t);
  }, [started, shown, text, speed]);
  const done = shown >= text.length;
  return (
    <span ref={ref} className={className}>
      {text.slice(0, shown)}
      {!done && <span className="lp-caret text-accent-ink">▍</span>}
    </span>
  );
}
