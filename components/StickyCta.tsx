'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

// Прилипающая кнопка снизу на мобильных — появляется после прокрутки за hero.
export function StickyCta({ href, label }: { href: string; label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 760);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className={cn(
        // тёмная подложка снизу (from-bg) — чтобы строка Safari на iOS не тонировалась в лайм
        'fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-bg via-bg/90 to-transparent px-3 pb-4 pt-8 transition-transform duration-300 md:hidden',
        show ? 'translate-y-0' : 'translate-y-[120%]',
      )}
    >
      <a
        href={href}
        className="flex items-center justify-center gap-2 rounded-full bg-accent lp-btn-grad px-6 py-3.5 text-sm font-semibold text-on-accent shadow-2xl"
      >
        {label} <ArrowRight size={16} />
      </a>
    </div>
  );
}
