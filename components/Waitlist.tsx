'use client';

import { useState } from 'react';
import { ArrowRight, Check, Sparkles, Lock } from 'lucide-react';
import { WAITLIST_ENDPOINT, PROMO, TELEGRAM_BOT_URL } from '@/lib/config';
import { track } from '@/components/Analytics';
import { trackLead } from '@/components/MetaPixel';
import { Send } from 'lucide-react';

// Чтение cookie (для fbp/fbc — улучшают матчинг в Meta).
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

// Форма листа ожидания. По умолчанию совместима с Netlify Forms (zero-backend),
// либо отправляет на WAITLIST_ENDPOINT (Formspree/Getform/Tally).
export function Waitlist() {
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const body = new URLSearchParams({ 'form-name': 'waitlist', name, email, telegram, source: 'landing' });
      if (WAITLIST_ENDPOINT) {
        await fetch(WAITLIST_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body });
      } else {
        // Netlify Forms: POST на корень с urlencoded-телом.
        await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      }
      setDone(true);
      track('Waitlist Signup', { source: 'landing' });
      // Дедуп браузер ↔ CAPI: один event_id на оба события.
      const eventId =
        typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead-${Date.now()}`;
      trackLead({ content_name: 'Waitlist', source: 'landing' }, eventId);
      // Серверное событие через Netlify-функцию (если задеплоена с функциями).
      try {
        fetch('/.netlify/functions/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name,
            telegram,
            source: 'landing',
            eventId,
            url: typeof location !== 'undefined' ? location.href : '',
            fbp: getCookie('_fbp'),
            fbc: getCookie('_fbc'),
          }),
        }).catch(() => {});
      } catch {}
      // Переводим в Telegram-бота (если задан).
      if (TELEGRAM_BOT_URL) {
        setTimeout(() => {
          try { window.location.href = TELEGRAM_BOT_URL; } catch {}
        }, 2500);
      }
    } catch {
      setErr('Не удалось отправить. Попробуй ещё раз.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="waitlist" className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[680px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px] lp-glow" />
      <div className="relative mx-auto max-w-3xl px-5 py-16 text-center md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-ink">
          <Sparkles size={13} /> Ранний доступ · фаза тестирования
        </span>

        {!done ? (
          <>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Будь первым — и забери <span className="lp-gradient-text">−50%</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Сервис на финальной доводке. Оставь почту и Telegram — {PROMO.limit} даём промокод{' '}
              <span className="text-accent-ink">{PROMO.benefit}</span> и доступ раньше всех. После заявки переведём в нашего Telegram-бота.
            </p>

            {/* Скарсити: занятые места по промокоду */}
            <div className="mx-auto mt-6 max-w-md">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted">Мест по промокоду</span>
                <span className="font-mono text-accent-ink">{PROMO.spotsTaken}/{PROMO.spotsTotal} занято</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-panel-2">
                <div className="h-full rounded-full bg-accent" style={{ width: `${Math.round((PROMO.spotsTaken / PROMO.spotsTotal) * 100)}%` }} />
              </div>
            </div>

            <form
              name="waitlist"
              method="POST"
              data-netlify="true"
              {...({ 'netlify-honeypot': 'bot-field' } as any)}
              onSubmit={submit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3"
            >
              {/* служебные поля Netlify Forms */}
              <input type="hidden" name="form-name" value="waitlist" />
              <p className="hidden">
                <label>Не заполняй: <input name="bot-field" /></label>
              </p>

              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя (по желанию)"
                className="w-full rounded-full border border-line bg-panel px-5 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
              <input
                name="telegram"
                required
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@username в Telegram"
                className="lp-field w-full rounded-full border border-line bg-panel px-5 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="lp-field w-full flex-1 rounded-full border border-line bg-panel px-5 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press disabled:opacity-50"
                >
                  {busy ? '...' : 'Занять место'} <ArrowRight size={15} />
                </button>
              </div>
              {err && <div className="text-sm text-danger">{err}</div>}
              <div className="mt-1 inline-flex items-center justify-center gap-1.5 font-mono text-[11px] text-muted">
                <Lock size={11} /> Без спама. Только запуск и промокод.
              </div>
            </form>
          </>
        ) : (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-accent/40 bg-panel p-8">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-on-accent">
              <Check size={22} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold">Ты в списке! 🎉</h2>
            <p className="mt-3 text-sm text-muted">Промокод на запуск:</p>
            <div className="mx-auto mt-2 inline-block rounded-xl border border-dashed border-accent/50 bg-accent-soft px-5 py-2 font-mono text-lg font-bold tracking-widest text-accent-ink">
              {PROMO.code}
            </div>
            <p className="mt-3 text-sm text-muted">{PROMO.benefit}. Доступ откроем в нашем Telegram-боте.</p>
            {TELEGRAM_BOT_URL && (
              <>
                <a
                  href={TELEGRAM_BOT_URL}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press"
                >
                  <Send size={15} /> Перейти в Telegram-бота
                </a>
                <p className="mt-2 font-mono text-[11px] text-muted">Переводим тебя в бота…</p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
