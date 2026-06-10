'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, X, Sparkles, Lock } from 'lucide-react';
import { PROMO } from '@/lib/config';
import { submitWaitlist } from '@/lib/waitlist';
import { track } from '@/components/Analytics';
import { trackLead } from '@/components/MetaPixel';

/* ────────────────────────────────────────────────────────────────────────────
   Exit-intent поп-ап: ловим уход (десктоп — курсор за верх окна, мобайл — таймер),
   один раз за сессию предлагаем занять место в раннем доступе. Заявка уходит тем
   же путём, что и основная форма (общий submitWaitlist), source='exit-intent'.
   Не показываем, если человек уже оставил заявку.
   ──────────────────────────────────────────────────────────────────────────── */
const ENABLED = true;

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!ENABLED || typeof window === 'undefined') return;
    let seen = false;
    try {
      seen = localStorage.getItem('th_exit_seen') === '1' || localStorage.getItem('th_waitlist_done') === '1';
    } catch {}
    if (seen) return;

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      setOpen(true);
      try { localStorage.setItem('th_exit_seen', '1'); } catch {}
      cleanup();
    };

    const onMouseOut = (e: MouseEvent) => {
      // курсор ушёл за верхнюю кромку окна — типичный сигнал «закрываю вкладку»
      if (e.clientY <= 0 && !e.relatedTarget) fire();
    };
    // мобайл / без точного указателя — мягкий таймер
    const fine = window.matchMedia('(pointer: fine)').matches;
    const timer = fine ? undefined : setTimeout(fire, 45000);
    if (fine) document.addEventListener('mouseout', onMouseOut);

    function cleanup() {
      document.removeEventListener('mouseout', onMouseOut);
      if (timer) clearTimeout(timer);
    }
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => { document.removeEventListener('keydown', onKey); clearTimeout(t); };
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const eventId = await submitWaitlist({ email, source: 'exit-intent' });
      track('Waitlist Signup', { source: 'exit-intent' });
      trackLead({ content_name: 'Waitlist', source: 'exit-intent' }, eventId);
      try { localStorage.setItem('th_waitlist_done', '1'); } catch {}
      setDone(true);
      setTimeout(() => setOpen(false), 2600);
    } catch {
      setErr('Не удалось отправить. Попробуй ещё раз.');
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ранний доступ Threadhunt"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      {/* затемнение */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setOpen(false)} />

      <div className="anim-pop relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-panel p-7 shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-panel-2 hover:text-text"
        >
          <X size={16} />
        </button>

        {!done ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-ink">
              <Sparkles size={13} /> Ранний доступ · {PROMO.spotsTotal - PROMO.spotsTaken} мест осталось
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight">
              Уходишь? Забери <span className="lp-gradient-text">−50%</span> на старте
            </h2>
            <p className="mt-2 text-sm text-muted">
              Оставь почту — закрепим за тобой промокод <span className="text-accent-ink">{PROMO.code}</span> ({PROMO.benefit})
              и откроем доступ раньше всех. Напомним один раз, без спама.
            </p>

            <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
              <input
                ref={inputRef}
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="lp-field w-full rounded-full border border-line bg-bg px-5 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent lp-btn-grad px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-press disabled:opacity-50"
              >
                {busy ? '...' : 'Занять место со скидкой'} <ArrowRight size={15} />
              </button>
              {err && <div className="text-sm text-danger">{err}</div>}
              <div className="inline-flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted">
                <Lock size={11} /> Без спама. Только запуск и промокод.
              </div>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent lp-btn-grad text-on-accent lp-ring">
              <Check size={26} />
            </span>
            <h2 className="mt-4 font-display text-xl font-bold">Готово, место за тобой 🙌</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
              Промокод <span className="text-accent-ink">{PROMO.code}</span> закреплён. Напишем, как откроем доступ.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
