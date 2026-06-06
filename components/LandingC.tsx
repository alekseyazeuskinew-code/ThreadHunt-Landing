'use client';

/*
 * Вариант C лендинга (A/B/C-тест) — живёт на /c.
 * Гипотеза: A и B перегружены. C — радикально проще:
 * на первом экране сразу ясно, что это и зачем, центр страницы — 5 шагов 1→5.
 * Та же механика, что у A (форма, пиксель, CAPI). Форма шлёт source: 'landing-c'.
 */

import { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Send,
  MessageSquare,
  Wand2,
  KanbanSquare,
  ShieldCheck,
  Clock,
  Target,
  LayoutDashboard,
  ChevronDown,
  Bot,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import { Wordmark } from '@/components/Wordmark';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Reveal } from '@/components/landing/primitives';
import { StickyCta } from '@/components/StickyCta';
import { ReadingProgress } from '@/components/ReadingProgress';
import { Waitlist } from '@/components/Waitlist';
import { cn } from '@/lib/cn';
import { CTA_HREF, CTA_LABEL, PRELAUNCH, DmDemo, SiteFooter } from '@/components/Landing';

/* ── 5 шагов: суть продукта простым языком ──────────────────────────────── */
const STEPS: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Sparkles, t: 'Создаёшь приманку', d: 'ИИ пишет пост: «ищу монтажёра — пиши слово монтаж в директ». Или пишешь сам.' },
  { icon: Send, t: 'Постишь в Threads', d: 'Кандидаты видят пост и пишут тебе в личку кодовое слово.' },
  { icon: MessageSquare, t: 'Бот отвечает сам', d: 'Ловит кодовое слово и за секунды отвечает каждому — круглосуточно, пока ты занят.' },
  { icon: Wand2, t: 'Высылает тест и условия', d: 'Кандидат проходит онбординг по персональной ссылке — без твоего участия.' },
  { icon: KanbanSquare, t: 'Выбираешь лучших', d: 'Все кандидаты уже собраны в твоей воронке. Заходишь в кабинет и нанимаешь.' },
];

function HowItWorks() {
  return (
    <section id="how" className="border-t border-line bg-panel/30">
      <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
        <Reveal className="text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">как это работает</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">5 шагов — и кандидаты идут сами</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">От поста до готового кандидата в воронке. Всё, кроме выбора лучших, делает автоматика.</p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <div className="flex items-start gap-5 rounded-2xl border border-line bg-panel p-5 md:p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent lp-btn-grad font-display text-xl font-bold text-on-accent">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <s.icon size={18} className="text-accent-ink" />
                    <div className="font-display text-lg font-semibold">{s.t}</div>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted md:text-base">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10 text-center">
          <a href={CTA_HREF} className="inline-flex items-center gap-2 rounded-full bg-accent lp-btn-grad px-7 py-3.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press">
            {CTA_LABEL} <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Что получаешь: 3 простых выгоды ────────────────────────────────────── */
const BENEFITS: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Clock, t: 'Экономишь часы', d: 'Никаких ручных ответов в директе — бот пишет за тебя.' },
  { icon: Target, t: 'Не теряешь кандидатов', d: 'Ответ за секунды, 24/7 — даже ночью и в выходные.' },
  { icon: LayoutDashboard, t: 'Всё в одном кабинете', d: 'Кандидаты, тесты и воронка — в одном месте, без таблиц.' },
];

function Benefits() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t} delay={i * 80} className="rounded-2xl border border-line bg-panel p-6 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent-ink"><b.icon size={22} /></span>
              <div className="mt-4 font-display text-base font-semibold">{b.t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Мини-FAQ: только самое важное (без перегруза) ──────────────────────── */
const MINI_FAQ: { q: string; a: string }[] = [
  { q: 'Заблокируют ли мой аккаунт?', a: 'Бот работает «по-человечески»: случайные задержки, дневные лимиты и рабочее окно. Это заметно снижает риск, но полностью исключить его при автоматизации соцсети нельзя — стартуй с консервативных лимитов.' },
  { q: 'Это легально?', a: 'Расширение не взламывает Threads — оно автоматизирует те же действия, что ты делаешь руками, в твоём браузере под твоей сессией. Любая автоматизация соцсети — твоя зона ответственности.' },
  { q: 'Сколько это стоит?', a: 'Free — навсегда и без карты. Платные тарифы подключишь, когда пойдёт поток кандидатов. Сейчас идёт ранний доступ — оставь почту и забери промокод на старте.' },
];

function MiniFaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-line bg-panel">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <span className="font-medium">{q}</span>
        <ChevronDown size={18} className={cn('shrink-0 text-muted transition-transform', open && 'rotate-180 text-accent-ink')} />
      </button>
      <div className={cn('lp-acc px-5', open && 'open')}>
        <div><p className="pb-5 text-sm leading-relaxed text-muted">{a}</p></div>
      </div>
    </div>
  );
}

function MiniFaq() {
  return (
    <section id="faq" className="border-t border-line bg-panel/30">
      <div className="mx-auto max-w-2xl px-5 py-20 md:py-24">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Коротко о главном</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {MINI_FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}><MiniFaqItem q={f.q} a={f.a} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Лендинг C (упрощённый) ─────────────────────────────────────────────── */
// source — метка варианта для A/B (C → 'landing-c', D → 'landing-d' с другим цветом).
export function LandingC({ source = 'landing-c' }: { source?: string } = {}) {
  return (
    <div className="min-h-screen">
      <ReadingProgress />

      {/* ── NAV (минимальный) ── */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-5">
          <a href="#top" className="text-lg"><Wordmark /></a>
          <a href="#how" className="ml-2 hidden text-sm text-muted transition-colors hover:text-text sm:block">Как работает</a>
          <div className="ml-auto flex items-center gap-2">
            {PRELAUNCH && <span className="hidden rounded-full border border-accent/40 bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent-ink sm:inline">ранний доступ</span>}
            <ThemeToggle />
            <a href={CTA_HREF} className="lp-cta-pulse inline-flex items-center gap-1.5 rounded-full bg-accent lp-btn-grad px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press">
              <span className="hidden sm:inline">{CTA_LABEL}</span><span className="sm:hidden">Лист</span> <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO: сразу понятно, что это ── */}
      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 lp-grid opacity-60" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[130px] lp-glow" />

        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 pb-16 pt-16 md:grid-cols-2 md:pb-24 md:pt-24">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5 text-xs text-muted">
                <span className="text-accent-ink">⟋⟋</span> Наём подрядчиков через Threads
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
                Нанимай через Threads —{' '}
                <span className="lp-gradient-text">на автопилоте</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-md text-lg text-muted">
                Ставишь пост-приманку — бот сам отвечает каждому, кто написал в директ, и приводит готовых кандидатов.
                Без бирж, без резюме, без ручных ответов.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href={CTA_HREF} className="lp-cta-pulse inline-flex items-center gap-2 rounded-full bg-accent lp-btn-grad px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press">
                  {CTA_LABEL} <ArrowRight size={16} />
                </a>
                <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-text transition-colors hover:bg-panel-2">
                  Как это работает
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
                <span className="inline-flex items-center gap-1.5"><Globe size={13} className="text-accent-ink" /> Без Meta API</span>
                <span className="inline-flex items-center gap-1.5"><Bot size={13} className="text-accent-ink" /> Работает в твоём браузере</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-accent-ink" /> Анти-бан лимиты</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="lp-float-slow"><DmDemo /></div>
            <p className="mt-3 text-center font-mono text-[11px] text-muted">так бот отвечает в директе — сам</p>
          </Reveal>
        </div>
      </section>

      {/* ── 5 ШАГОВ ── */}
      <HowItWorks />

      {/* ── ЧТО ПОЛУЧАЕШЬ ── */}
      <Benefits />

      {/* ── ЛИСТ ОЖИДАНИЯ (source — метка варианта) ── */}
      {PRELAUNCH && <Waitlist source={source} />}

      {/* ── МИНИ-FAQ ── */}
      <MiniFaq />

      {/* ── ФИНАЛЬНЫЙ CTA ── */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute inset-x-0 -bottom-24 mx-auto h-72 w-[820px] rounded-full bg-accent/[0.08] blur-[120px] lp-glow" />
        <div className="relative mx-auto max-w-2xl px-5 py-20 text-center md:py-28">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Попробуй — это бесплатно</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">Оставь почту, забери промокод на старте и лови первых кандидатов на автопилоте.</p>
            <div className="mt-8 flex justify-center">
              <a href={CTA_HREF} className="inline-flex items-center gap-2 rounded-full bg-accent lp-btn-grad px-7 py-3.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press">
                {CTA_LABEL} <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ФУТЕР ── */}
      <SiteFooter />

      {/* ── ПРИЛИПАЮЩИЙ CTA (мобайл) ── */}
      <StickyCta href={CTA_HREF} label={CTA_LABEL} />
    </div>
  );
}
