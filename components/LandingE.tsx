'use client';

/*
 * Вариант E лендинга (A/B-тест месседжа) — живёт на /e.
 * Структура = вариант C (чистый, 5 шагов), но hero несёт ПОЗИЦИОНИРОВАНИЕ КАТЕГОРИИ:
 * «Threads — топовый канал найма в рунете; Threadhunt первый автоматизирует
 * весь путь (пост → директ → онбординг) с аналитикой».
 * Так «C vs E» чисто тестирует сам месседж. Форма шлёт source: 'landing-e'.
 */

import {
  ArrowRight,
  ShieldCheck,
  Bot,
  Globe,
  Award,
  BarChart3,
  Workflow,
} from 'lucide-react';
import { Wordmark } from '@/components/Wordmark';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Reveal } from '@/components/landing/primitives';
import { StickyCta } from '@/components/StickyCta';
import { ReadingProgress } from '@/components/ReadingProgress';
import { Waitlist } from '@/components/Waitlist';
import { CTA_HREF, CTA_LABEL, PRELAUNCH, DmDemo, SiteFooter } from '@/components/Landing';
import { HowItWorks, Benefits, MiniFaq } from '@/components/LandingC';

/* ── HERO E: позиционирование категории ─────────────────────────────────── */
function HeroE() {
  const chips = [
    { icon: Award, t: 'Первые на рынке' },
    { icon: Workflow, t: 'Весь путь: пост → директ → онбординг' },
    { icon: BarChart3, t: 'С аналитикой' },
  ];
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 lp-grid opacity-60" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[130px] lp-glow" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 pb-16 pt-16 md:grid-cols-2 md:pb-24 md:pt-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-ink">
              <Award size={13} /> Первый сервис полной автоматизации найма в Threads
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
              Threads — новый канал найма №1.{' '}
              <span className="lp-gradient-text">Автоматизируй его целиком</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-md text-lg text-muted">
              Через Threads уже нанимают массово — но не было сервиса, который ведёт весь путь сам.
              Threadhunt первый: ИИ пишет пост-приманку, бот отвечает каждому в директе, переводит кандидата
              на онбординг и сводит всё в аналитику.
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
            <div className="mt-7 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c.t} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1.5 text-xs text-muted">
                  <c.icon size={13} className="text-accent-ink" /> {c.t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="lp-float-slow"><DmDemo /></div>
          <p className="mt-3 text-center font-mono text-[11px] text-muted">так бот отвечает в директе — сам</p>
        </Reveal>
      </div>

      {/* тонкая полоса доверия под hero */}
      <div className="relative mx-auto max-w-5xl px-5 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-1.5"><Globe size={13} className="text-accent-ink" /> Без Meta API</span>
          <span className="inline-flex items-center gap-1.5"><Bot size={13} className="text-accent-ink" /> Работает в твоём браузере</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-accent-ink" /> Анти-бан лимиты</span>
        </div>
      </div>
    </section>
  );
}

/* ── Лендинг E ──────────────────────────────────────────────────────────── */
export function LandingE() {
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

      {/* ── HERO E (позиционирование категории) ── */}
      <HeroE />

      {/* ── 5 ШАГОВ (переиспользовано из C) ── */}
      <HowItWorks />

      {/* ── ЧТО ПОЛУЧАЕШЬ (переиспользовано из C) ── */}
      <Benefits />

      {/* ── ЛИСТ ОЖИДАНИЯ (source: landing-e) ── */}
      {PRELAUNCH && <Waitlist source="landing-e" />}

      {/* ── МИНИ-FAQ (переиспользовано из C) ── */}
      <MiniFaq />

      {/* ── ФИНАЛЬНЫЙ CTA ── */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute inset-x-0 -bottom-24 mx-auto h-72 w-[820px] rounded-full bg-accent/[0.08] blur-[120px] lp-glow" />
        <div className="relative mx-auto max-w-2xl px-5 py-20 text-center md:py-28">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Зайди в найм через Threads первым</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">Пока канал не перегрет — собери поток кандидатов на автопилоте. Free навсегда, карта не нужна.</p>
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
