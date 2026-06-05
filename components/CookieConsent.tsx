'use client';

import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';

// Баннер согласия на cookie. Выбор хранится в localStorage (th_cookie).
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('th_cookie')) setShow(true);
    } catch {}
  }, []);

  function decide(value: 'all' | 'necessary') {
    try { localStorage.setItem('th_cookie', value); } catch {}
    // Сообщаем аналитике, что согласие изменилось (включится сразу).
    try { window.dispatchEvent(new Event('th-consent')); } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="anim-up mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-line bg-panel/95 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-ink">
            <Cookie size={16} />
          </span>
          <p className="text-xs leading-relaxed text-muted">
            Мы используем cookie для работы сайта и аналитики. Подробнее —{' '}
            <a href="/privacy" className="text-accent-ink hover:underline">в политике конфиденциальности</a>.
          </p>
        </div>
        <div className="flex shrink-0 gap-2 sm:ml-auto">
          <button
            onClick={() => decide('necessary')}
            className="rounded-full border border-line px-4 py-2 text-xs text-muted transition-colors hover:text-text"
          >
            Только необходимые
          </button>
          <button
            onClick={() => decide('all')}
            className="rounded-full bg-accent px-4 py-2 text-xs font-medium text-on-accent transition-colors hover:bg-accent-press"
          >
            Принять все
          </button>
        </div>
      </div>
    </div>
  );
}
