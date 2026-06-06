'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Check, Sparkles, Lock, CalendarPlus } from 'lucide-react';
import { WAITLIST_ENDPOINT, PROMO } from '@/lib/config';
import { track } from '@/components/Analytics';
import { trackLead } from '@/components/MetaPixel';
import { Confetti } from '@/components/Confetti';

// Чтение cookie (для fbp/fbc — улучшают матчинг в Meta).
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

// Напоминание через 3 недели: .ics (Apple/Outlook/любой календарь) + ссылка Google Календарь.
function buildReminder() {
  const start = new Date(Date.now() + 21 * 86_400_000);
  start.setHours(12, 0, 0, 0);
  const end = new Date(start.getTime() + 30 * 60_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const dtStart = fmt(start);
  const dtEnd = fmt(end);
  const esc = (s: string) => s.replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');
  const title = 'Threadhunt — мой ранний доступ 🚀';
  const details = `Я в листе ожидания Threadhunt. Промокод ${PROMO.code} — ${PROMO.benefit}. Загляни на thread-hunt.com — возможно, ранний доступ уже открыт.`;
  const loc = 'https://thread-hunt.com';
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Threadhunt//Waitlist//RU', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${dtStart}-threadhunt@thread-hunt.com`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(details)}`,
    `LOCATION:${esc(loc)}`,
    'BEGIN:VALARM', 'TRIGGER:-PT30M', 'ACTION:DISPLAY', 'DESCRIPTION:Threadhunt', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dtStart}/${dtEnd}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(loc)}`;
  const human = start.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  return { ics, gcalUrl, human };
}

// Форма листа ожидания. По умолчанию совместима с Netlify Forms (zero-backend),
// либо отправляет на WAITLIST_ENDPOINT (Formspree/Getform/Tally).
export function Waitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);
  const reminder = useMemo(buildReminder, [done]);

  function copyCode() {
    try {
      navigator.clipboard?.writeText(PROMO.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  function downloadIcs() {
    try {
      const blob = new Blob([reminder.ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'threadhunt-reminder.ics';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch {}
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const body = new URLSearchParams({ 'form-name': 'waitlist', name, email, source: 'landing' });
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
            source: 'landing',
            eventId,
            url: typeof location !== 'undefined' ? location.href : '',
            fbp: getCookie('_fbp'),
            fbc: getCookie('_fbc'),
          }),
        }).catch(() => {});
      } catch {}
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

        {done && <Confetti />}

        {!done ? (
          <>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Будь первым — и забери <span className="lp-gradient-text">−50%</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Сервис на финальной доводке. Оставь почту — {PROMO.limit} даём промокод{' '}
              <span className="text-accent-ink">{PROMO.benefit}</span> и доступ раньше всех. Напомним один раз по почте, без спама.
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent lp-btn-grad px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press disabled:opacity-50"
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
          <div className="anim-pop relative z-10 mx-auto mt-8 max-w-md rounded-2xl border border-accent/40 bg-panel p-8 text-center shadow-[0_0_55px_-16px_var(--accent-soft)]">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent lp-btn-grad text-on-accent lp-ring">
              <Check size={26} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold">Спасибо, что поверил в нас 🙌</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Ты в списке первых. Для нас это правда много значит — мы небольшая команда и строим Threadhunt для таких, как ты.
            </p>

            <div className="mx-auto mt-6 max-w-xs rounded-xl border border-dashed border-accent/50 bg-accent-soft p-3">
              <div className="text-[11px] text-muted">твой промокод на запуск</div>
              <div className="mt-1 flex items-center justify-center gap-2">
                <span className="font-mono text-lg font-bold tracking-widest text-accent-ink">{PROMO.code}</span>
                <button onClick={copyCode} className="rounded-full border border-line bg-panel px-2.5 py-0.5 text-[11px] text-muted transition-colors hover:text-text">
                  {copied ? 'скопировано ✓' : 'копировать'}
                </button>
              </div>
              <div className="mt-1 text-[11px] text-accent-ink">{PROMO.benefit}</div>
            </div>

            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Будем рады, если будешь следить за обновлениями. Напомним о себе <span className="text-text">один раз по почте</span> — без спама.
            </p>

            <div className="mt-6 flex flex-col items-center gap-2">
              <button
                onClick={downloadIcs}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent lp-btn-grad px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press"
              >
                <CalendarPlus size={15} /> Напомнить через 3 недели
              </button>
              <a
                href={reminder.gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-muted underline transition-colors hover:text-text"
              >
                или добавить в Google Календарь
              </a>
              <div className="text-[11px] text-muted">поставим напоминание на {reminder.human}</div>
            </div>
            <p className="mt-5 text-xs text-muted">Обнимаем и до связи 🫶</p>
          </div>
        )}
      </div>
    </section>
  );
}
