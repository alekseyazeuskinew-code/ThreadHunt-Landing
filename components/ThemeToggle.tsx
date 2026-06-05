'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Переключатель тёмной/светлой темы. Тема хранится в localStorage (th_theme),
// применяется до первой отрисовки скриптом в layout — без мигания.
export function ThemeToggle({ className }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.getAttribute('data-theme') === 'light');
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    const el = document.documentElement;
    if (next) {
      el.setAttribute('data-theme', 'light');
      try { localStorage.setItem('th_theme', 'light'); } catch {}
    } else {
      el.removeAttribute('data-theme');
      try { localStorage.setItem('th_theme', 'dark'); } catch {}
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={light ? 'Тёмная тема' : 'Светлая тема'}
      title={light ? 'Тёмная тема' : 'Светлая тема'}
      className={
        'inline-grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-text ' +
        (className || '')
      }
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
