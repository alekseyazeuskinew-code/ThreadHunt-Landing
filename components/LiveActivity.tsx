'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

/* ────────────────────────────────────────────────────────────────────────────
   Живой соц-пруф: всплывающие уведомления «кто-то записался в ранний доступ».
   ВАЖНО: это СИМУЛЯЦИЯ (правдоподобная, в рамках пред-запуска — записи в лист
   ожидания, без «покупок»). Чтобы выключить — поставь ENABLED = false.
   После старта стоит заменить на реальные заявки из API.
   Десктоп-онли (на мобайле снизу уже StickyCta), уважает reduced-motion.
   ──────────────────────────────────────────────────────────────────────────── */
const ENABLED = true;

type Person = { n: string; f?: boolean };
const PEOPLE: Person[] = [
  { n: 'Артём' }, { n: 'Мария', f: true }, { n: 'Дмитрий' }, { n: 'Олег' }, { n: 'Ника', f: true },
  { n: 'Павел' }, { n: 'Алина', f: true }, { n: 'Сергей' }, { n: 'Юлия', f: true }, { n: 'Глеб' },
  { n: 'Вера', f: true }, { n: 'Игорь' }, { n: 'Лена', f: true }, { n: 'Антон' }, { n: 'Дарья', f: true },
  { n: 'Кирилл' }, { n: 'Соня', f: true }, { n: 'Рустам' },
];
const CITIES = ['Москва', 'Питер', 'Алматы', 'Тбилиси', 'Минск', 'Ереван', 'Казань', 'Дубай', 'Краснодар', 'Ташкент', 'Бишкек', 'Варшава'];
const TIMES = ['только что', '1 мин назад', '2 мин назад', '4 мин назад', '7 мин назад'];
const GRADS = ['from-violet-400 to-fuchsia-500', 'from-indigo-400 to-violet-500', 'from-purple-400 to-violet-600', 'from-sky-400 to-indigo-500', 'from-rose-400 to-fuchsia-500'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeMessage(p: Person) {
  const verbs = p.f
    ? ['заняла место в раннем доступе', 'оставила заявку в лист ожидания', 'забрала промокод −50%']
    : ['занял место в раннем доступе', 'оставил заявку в лист ожидания', 'забрал промокод −50%'];
  return pick(verbs);
}

type Toast = { id: number; name: string; city: string; grad: string; action: string; time: string };

export function LiveActivity() {
  const [toast, setToast] = useState<Toast | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ENABLED) return;
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem('th_social_off') === '1') return;
    } catch {}

    let idc = 0;
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const cycle = () => {
      if (cancelled) return;
      const p = pick(PEOPLE);
      setToast({
        id: ++idc,
        name: p.n,
        city: pick(CITIES),
        grad: pick(GRADS),
        action: makeMessage(p),
        time: pick(TIMES),
      });
      setShow(true);
      // показываем ~6 с, потом прячем и через 11–19 с показываем следующее
      hideTimer = setTimeout(() => {
        setShow(false);
        nextTimer = setTimeout(cycle, 11000 + Math.random() * 8000);
      }, 6000);
    };

    // первый показ — через 9 с после загрузки
    const startTimer = setTimeout(cycle, 9000);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  function dismiss() {
    setShow(false);
    try { sessionStorage.setItem('th_social_off', '1'); } catch {}
  }

  if (!toast) return null;

  return (
    <div
      aria-live="polite"
      className={cn(
        'pointer-events-none fixed bottom-20 left-6 z-40 hidden max-w-[320px] md:block',
        'transition-all duration-500',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-line bg-panel/95 p-3 pr-9 shadow-xl backdrop-blur">
        <div className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-semibold text-white', toast.grad)}>
          {toast.name.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <div className="text-[13px] leading-snug text-text">
            <span className="font-semibold">{toast.name}</span> {toast.action}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success lp-ring" /> {toast.city} · {toast.time}
          </div>
        </div>
        <button
          onClick={dismiss}
          aria-label="Скрыть уведомления"
          className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-muted transition-colors hover:bg-panel-2 hover:text-text"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
