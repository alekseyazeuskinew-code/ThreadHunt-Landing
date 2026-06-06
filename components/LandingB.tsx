'use client';

/*
 * Вариант B лендинга (A/B-тест) — живёт на /b.
 * Та же механика, что у A (форма, пиксель, CAPI), но другой копирайт,
 * усиленный чат-визуал в первом блоке и новый блок «онбординг глазами кандидата».
 * Форма шлёт source: 'landing-b' — лиды отличимы в админке/CAPI.
 * Большинство секций переиспользованы из Landing.tsx (один источник правды).
 */

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  Sparkles,
  Bot,
  ShieldCheck,
  Globe,
  Zap,
  MessageSquare,
  Wand2,
  Link2,
  ChevronRight,
  KanbanSquare,
  Clock,
  MousePointerClick,
  FileText,
} from 'lucide-react';
import { Wordmark } from '@/components/Wordmark';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Reveal, Counter } from '@/components/landing/primitives';
import { DemoConsole } from '@/components/landing/DemoConsole';
import { StickyCta } from '@/components/StickyCta';
import { ReadingProgress } from '@/components/ReadingProgress';
import { Waitlist } from '@/components/Waitlist';
import { cn } from '@/lib/cn';
import {
  CTA_HREF,
  CTA_LABEL,
  PRELAUNCH,
  LOGIN,
  DmDemo,
  KeywordMarquee,
  TrustStrip,
  VideoShowcase,
  Sandbox,
  LaunchModes,
  Bento,
  Audience,
  Comparison,
  ValueCalculator,
  Pricing,
  Referral,
  Faq,
  FounderNote,
  SiteFooter,
} from '@/components/Landing';

/* Навигация (те же якоря секций, что в A). */
const NAV = [
  { id: 'demo', label: 'Демо' },
  { id: 'sandbox', label: 'Попробовать' },
  { id: 'how', label: 'Как работает' },
  { id: 'features', label: 'Возможности' },
  { id: 'pricing', label: 'Тарифы' },
  { id: 'faq', label: 'Вопросы' },
];

/* ── HERO B: чат-визуал в роли героя, текст по центру сверху ────────────── */
function HeroB() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 lp-grid opacity-60" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[440px] w-[860px] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[130px] lp-glow" />
      <div className="pointer-events-none absolute -left-24 top-52 h-72 w-72 rounded-full bg-accent/[0.06] blur-[100px] lp-float" />
      <div className="pointer-events-none absolute -right-24 top-72 h-72 w-72 rounded-full bg-accent/[0.06] blur-[100px] lp-float-slow" />

      <div className="relative mx-auto max-w-3xl px-5 pb-10 pt-16 text-center md:pt-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5 text-xs text-muted">
            <span className="text-accent-ink">⟋⟋</span> Авто-ответ в директе Threads — пока ты занят делом
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Перестань терять кандидатов{' '}
            <span className="lp-gradient-text">в директе</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Ставишь приманку в ленте Threads — а дальше бот сам отвечает каждому, кто написал кодовое слово, и квалифицирует
            его за секунды. Ни один отклик не остынет, пока ты спишь или на встрече.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href={CTA_HREF} className="lp-cta-pulse inline-flex items-center gap-2 rounded-full bg-accent lp-btn-grad px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press">
              {CTA_LABEL} <ArrowRight size={16} />
            </a>
            <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-text transition-colors hover:bg-panel-2">
              Как это работает
            </a>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
            <span className="inline-flex items-center gap-1.5"><Globe size={13} className="text-accent-ink" /> Без Meta API</span>
            <span className="inline-flex items-center gap-1.5"><Bot size={13} className="text-accent-ink" /> Работает в твоём браузере</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-accent-ink" /> Анти-бан лимиты</span>
          </div>
        </Reveal>
      </div>

      {/* Чат-визуал — крупный центральный герой */}
      <div className="relative mx-auto max-w-2xl px-5">
        <Reveal delay={200} className="relative">
          <div className="pointer-events-none absolute -inset-3 rounded-[32px] bg-accent/[0.05] blur-2xl" />
          <div className="lp-float-slow relative"><DmDemo /></div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { v: 1248, s: '', label: 'лидов поймано' },
              { v: 92, s: '%', label: 'с ответом' },
              { v: 8, s: ' сек', label: 'средний ответ' },
            ].map((mm) => (
              <div key={mm.label} className="rounded-xl border border-line bg-panel/70 p-3 text-center">
                <div className="font-display text-2xl font-bold text-accent-ink"><Counter to={mm.v} suffix={mm.s} /></div>
                <div className="mt-0.5 text-[11px] text-muted">{mm.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-10">
        <div className="mb-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted">ловит по кодовым словам</div>
        <KeywordMarquee />
      </div>
    </section>
  );
}

/* ── Оффер B: переписанный «первые на рынке» ────────────────────────────── */
function OfferB() {
  const points = [
    { icon: Zap, t: 'Реакция за секунды', d: 'Бот пишет ответ в директ, пока конкуренты ещё листают отклики.' },
    { icon: MessageSquare, t: 'В личке Threads, не Instagram', d: 'Единственный сервис, который отвечает именно в директе Threads.' },
    { icon: Wand2, t: 'Сам квалифицирует', d: 'Высылает тестовое и условия по персональной ссылке — без тебя.' },
  ];
  return (
    <section className="relative overflow-hidden border-t border-line bg-panel/30">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[680px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px] lp-glow" />
      <div className="relative mx-auto max-w-5xl px-5 py-16 md:py-24">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Каждый отклик — <span className="lp-gradient-text">тёплый и обработанный</span>, без твоего участия
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Кандидаты пишут круглосуточно. Threadhunt ловит кодовое слово, отвечает в голосе твоего бренда и сразу заводит
            человека в воронку. Любые профессии: монтажёры, таргетологи, дизайнеры, разработчики, ассистенты.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.t} delay={i * 90} className="rounded-2xl border border-line bg-panel p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-ink"><p.icon size={20} /></span>
              <div className="mt-4 font-display text-base font-semibold">{p.t}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Онбординг глазами кандидата (новый блок) ───────────────────────────── */
function OnboardingShowcase() {
  const flow = [
    { icon: Link2, t: 'Переходит по ссылке', d: 'персональная ссылка прямо из директа' },
    { icon: FileText, t: 'Видит оффер и тест', d: 'условия и тестовое — уже готовы' },
    { icon: MousePointerClick, t: 'Откликается', d: 'заполняет анкету в один экран' },
    { icon: KanbanSquare, t: 'Падает в CRM', d: 'карточка в твоей воронке: NEW' },
  ];
  return (
    <section id="onboarding" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">онбординг глазами кандидата</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Что видит человек по ту сторону</h2>
            <p className="mt-3 text-muted">Бот не просто отвечает — он ведёт кандидата по готовой странице онбординга и доводит до отклика. Всё автоматизировано: тебе остаётся выбрать лучших.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          {/* мок страницы онбординга */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-2 rounded-[28px] bg-accent/[0.05] blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-line bg-panel shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-line bg-panel-2/60 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                  <span className="ml-auto rounded-full bg-bg/70 px-2.5 py-1 font-mono text-[11px] text-muted">thread-hunt.com/go/4f2a</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent-ink">YS</span>
                    <div>
                      <div className="text-sm font-medium">@your.studio ищет</div>
                      <div className="font-mono text-[11px] text-muted">Видеомонтажёр · удалённо</div>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] text-accent-ink"><Sparkles size={11} /> ИИ-оффер</span>
                  </div>
                  <div className="mt-5 rounded-xl border border-line bg-bg p-4">
                    <div className="flex items-center gap-2 text-sm font-medium"><FileText size={15} className="text-accent-ink" /> Тестовое задание</div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">Смонтируй 1 Reel до 30 сек из исходников по ссылке. Динамичная склейка, субтитры, музыка по вкусу.</p>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    {[{ k: 'Оплата', v: 'вовремя' }, { k: 'Формат', v: 'удалёнка' }, { k: 'Объём', v: '15–20/нед' }].map((x) => (
                      <div key={x.k} className="rounded-lg border border-line bg-bg p-2">
                        <div className="font-mono text-[10px] text-muted">{x.k}</div>
                        <div className="mt-0.5 text-xs font-medium">{x.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-accent lp-btn-grad px-5 py-3 text-sm font-medium text-on-accent">
                    Откликнуться <ArrowRight size={15} />
                  </div>
                  <div className="mt-3 text-center font-mono text-[10px] text-muted">генерируется автоматически под каждого кандидата</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* шаги потока */}
          <Reveal delay={120} className="space-y-3">
            {flow.map((s, i) => (
              <div key={s.t} className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink"><s.icon size={20} /></span>
                <div className="flex-1">
                  <div className="font-display text-base font-semibold">{i + 1}. {s.t}</div>
                  <div className="mt-1 text-sm text-muted">{s.d}</div>
                </div>
                {i < flow.length - 1 && <ChevronRight size={18} className="mt-2 hidden text-accent-ink/40 sm:block" />}
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent-soft/20 p-4 text-sm">
              <Clock size={16} className="shrink-0 text-accent-ink" />
              <span className="text-muted">Весь путь — от «написал в директ» до карточки в CRM — проходит <span className="text-text">без единого твоего сообщения</span>.</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Лендинг B ──────────────────────────────────────────────────────────── */
export function LandingB() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as Element[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive((e.target as Element).id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <ReadingProgress />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5">
          <a href="#top" className="text-lg"><Wordmark /></a>
          <nav className="ml-2 hidden items-center gap-6 text-sm lg:flex">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={cn('transition-colors hover:text-text', active === n.id ? 'text-accent-ink' : 'text-muted')}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {PRELAUNCH && <span className="hidden rounded-full border border-accent/40 bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent-ink sm:inline">ранний доступ</span>}
            <ThemeToggle />
            {!PRELAUNCH && <a href={LOGIN} className="hidden rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-text sm:block">Войти</a>}
            <a href={CTA_HREF} className="lp-cta-pulse inline-flex items-center gap-1.5 rounded-full bg-accent lp-btn-grad px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press">
              <span className="hidden sm:inline">{CTA_LABEL}</span><span className="sm:hidden">{PRELAUNCH ? 'Лист' : 'Старт'}</span> <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO B ── */}
      <HeroB />

      {/* ── ПОЛОСА ДОВЕРИЯ ── */}
      <TrustStrip />

      {/* ── ОФФЕР B ── */}
      <OfferB />

      {/* ── ЛИСТ ОЖИДАНИЯ (source: landing-b) ── */}
      {PRELAUNCH && <Waitlist source="landing-b" />}

      {/* ── ВИДЕО ── */}
      <VideoShowcase />

      {/* ── ДЕМО КАБИНЕТА ── */}
      <section id="demo" className="border-t border-line bg-panel/30">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <Reveal>
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">загляни внутрь</div>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Твой кабинет — всё в одном месте</h2>
              <p className="mt-3 text-muted">Переключай вкладки и смотри, как устроены поиски с уникальными ссылками, CRM-воронка и генератор онбординга. Кнопки в демо отключены — включишь всё в своём кабинете.</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10"><DemoConsole /></Reveal>
        </div>
      </section>

      {/* ── ОНБОРДИНГ ГЛАЗАМИ КАНДИДАТА (новый блок B) ── */}
      <OnboardingShowcase />

      {/* ── ЖИВАЯ ПЕСОЧНИЦА ── */}
      <Sandbox />

      {/* ── ДВА РЕЖИМА ЗАПУСКА ── */}
      <LaunchModes />

      {/* ── ВОЗМОЖНОСТИ ── */}
      <Bento />

      {/* ── КОМУ ПОДХОДИТ ── */}
      <Audience />

      {/* ── СРАВНЕНИЕ ── */}
      <Comparison />

      {/* ── КАЛЬКУЛЯТОР ЦЕННОСТИ ── */}
      <ValueCalculator />

      {/* ── ТАРИФЫ ── */}
      <Pricing />

      {/* ── РЕФЕРАЛЬНАЯ ПРОГРАММА ── */}
      <Referral />

      {/* ── FAQ ── */}
      <Faq />

      {/* ── ОТ ОСНОВАТЕЛЯ ── */}
      <FounderNote />

      {/* ── ФИНАЛЬНЫЙ CTA B ── */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute inset-x-0 -bottom-24 mx-auto h-72 w-[820px] rounded-full bg-accent/[0.08] blur-[120px] lp-glow" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Ни один кандидат больше не остынет</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">Поставь приманку, подключи расширение — и бот начнёт отвечать за тебя уже сегодня. Free — навсегда, карта не нужна.</p>
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
