'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Search,
  KanbanSquare,
  Wand2,
  Lock,
  Sparkles,
  Link2,
  Copy,
  Star,
  TrendingUp,
  Send,
  Megaphone,
  Image as ImageIcon,
  Target,
  Clock,
  FileText,
  CheckCircle2,
  MessageSquare,
  Eye,
  MousePointerClick,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Counter, AnimatedBars } from './primitives';

type TabKey = 'home' | 'search' | 'meta' | 'leads' | 'onb';
const TABS: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: 'home', label: 'Обзор', icon: LayoutDashboard },
  { key: 'search', label: 'Поиски', icon: Search },
  { key: 'meta', label: 'Кампании', icon: Megaphone },
  { key: 'leads', label: 'Кандидаты', icon: KanbanSquare },
  { key: 'onb', label: 'Онбординг', icon: Wand2 },
];

/* Заблокированный в демо контрол. */
function LockBtn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      title="Доступно в кабинете"
      className={cn(
        'inline-flex cursor-not-allowed select-none items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-muted opacity-90',
        className,
      )}
    >
      <Lock size={12} /> {children}
    </span>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <span
      title="Доступно в кабинете"
      className={cn('relative inline-flex h-5 w-9 cursor-not-allowed items-center rounded-full', on ? 'bg-accent' : 'border border-line bg-panel-2')}
    >
      <span className={cn('absolute h-3.5 w-3.5 rounded-full transition-all', on ? 'left-[18px] bg-on-accent' : 'left-0.5 bg-muted')} />
    </span>
  );
}

function Bar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div className={cn('h-1.5 overflow-hidden rounded-full bg-panel-2', className)}>
      <div className="h-full rounded-full bg-accent-ink/70" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Avatar({ s }: { s: string }) {
  return <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent-ink">{s}</div>;
}

export function DemoConsole() {
  const [tab, setTab] = useState<TabKey>('leads');
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
      {/* браузерная шапка */}
      <div className="flex items-center gap-2 border-b border-line bg-panel-2/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-danger/70" />
        <span className="h-3 w-3 rounded-full bg-warning/70" />
        <span className="h-3 w-3 rounded-full bg-success/70" />
        <span className="ml-2 hidden truncate rounded-md bg-bg px-3 py-1 font-mono text-[11px] text-muted sm:block">app.threadhunt.app</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-accent lp-ring" /> ДЕМО · только просмотр
        </span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* мобильные табы */}
        <div className="flex gap-1 overflow-x-auto border-b border-line p-2 md:hidden">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs transition-colors', tab === t.key ? 'bg-accent-soft text-accent-ink' : 'text-muted')}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>
        {/* десктоп-сайдбар */}
        <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-line p-3 md:flex">
          <div className="px-2 pb-2 font-display text-sm font-semibold"><span className="text-accent-ink">⟋⟋</span> threadhunt</div>
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={cn('flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors', tab === t.key ? 'bg-accent-soft text-accent-ink' : 'text-muted hover:bg-panel-2 hover:text-text')}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
          <div className="mt-auto rounded-lg border border-line bg-bg p-2 text-[10px] text-muted">
            <Lock size={11} className="mb-1 text-accent-ink" /> В демо кнопки отключены — включишь в кабинете.
          </div>
        </aside>

        {/* контент */}
        <div className="min-h-[440px] flex-1 p-4 sm:p-5">
          <div key={tab} className="lp-rise">
            {tab === 'home' && <HomePanel />}
            {tab === 'search' && <SearchPanel />}
            {tab === 'meta' && <MetaPanel />}
            {tab === 'leads' && <LeadsPanel />}
            {tab === 'onb' && <OnbPanel />}
          </div>
        </div>
      </div>

      {/* Заблюренный намёк: показываем лишь часть кабинета */}
      <div className="relative border-t border-line p-4">
        <div className="pointer-events-none flex select-none flex-wrap items-center justify-center gap-2 opacity-50 blur-[3px]">
          {['Аналитика', 'Команда', 'Интеграции', 'Вебхуки', 'Биллинг', 'Настройки', 'API', 'Резерв'].map((t) => (
            <span key={t} className="rounded-full border border-line bg-panel-2 px-3 py-1.5 text-xs text-muted">{t}</span>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel/90 px-3.5 py-1.5 text-center text-xs text-muted backdrop-blur">
            <Lock size={12} className="shrink-0 text-accent-ink" /> Это лишь часть — в кабинете больше, но проще
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Обзор ─────────────────────────────────────────────────────────────── */
function HomePanel() {
  const stats = [
    { v: 1248, s: '', l: 'лидов всего' },
    { v: 37, s: '', l: 'сегодня' },
    { v: 92, s: '%', l: 'ответили' },
    { v: 320, s: '', l: 'постов вышло' },
  ];
  const sources = [
    { l: 'Запросы', pct: 62 },
    { l: 'Скрытые', pct: 24 },
    { l: 'Основной', pct: 14 },
  ];
  const funnel = [
    { l: 'NEW', v: 18 },
    { l: 'CONTACTED', v: 9 },
    { l: 'SCREENING', v: 5 },
    { l: 'HIRED', v: 3 },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((m) => (
          <div key={m.l} className="rounded-xl border border-line bg-bg p-3">
            <div className="font-display text-2xl font-bold text-accent-ink"><Counter to={m.v} suffix={m.s} /></div>
            <div className="mt-0.5 text-[11px] text-muted">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-bg p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium"><TrendingUp size={15} className="text-accent-ink" /> Лиды за 14 дней</div>
          <AnimatedBars />
          <div className="mt-4 space-y-2">
            <div className="text-[11px] font-medium text-muted">Откуда приходят</div>
            {sources.map((s) => (
              <div key={s.l} className="flex items-center gap-2 text-[11px] text-muted">
                <span className="w-16 shrink-0">{s.l}</span>
                <Bar pct={s.pct} className="flex-1" />
                <span className="w-8 shrink-0 text-right text-text">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-line bg-bg p-4">
          <div className="mb-3 text-sm font-medium">Активность</div>
          <ul className="space-y-2 text-xs text-muted">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Новый лид · Видеомонтажёр</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent-ink" /> Пост опубликован · Threads</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Тест сдан · Дмитрий</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent-ink" /> Кампания Meta · 214 лидов</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-warning" /> Кандидат в резерве · Таргетолог</li>
          </ul>
          <div className="mt-4 border-t border-line pt-3">
            <div className="mb-2 text-[11px] font-medium text-muted">Воронка найма</div>
            <div className="flex items-end gap-1.5">
              {funnel.map((f) => (
                <div key={f.l} className="flex-1 text-center">
                  <div className="mb-1 rounded-md bg-accent-soft" style={{ height: `${f.v * 3}px` }} />
                  <div className="font-mono text-[9px] text-muted">{f.l}</div>
                  <div className="text-[11px] font-medium text-accent-ink">{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Поиски (уникальные ссылки) ────────────────────────────────────────── */
function SearchPanel() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-line bg-bg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">Видеомонтажёр <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] text-accent-ink">активен</span></div>
          <Toggle on />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 text-[11px] font-medium text-muted">Кодовые слова</div>
            <div className="flex flex-wrap gap-1.5">
              {['монтаж', 'Reels', 'после', 'montage'].map((k) => (
                <span key={k} className="rounded-full border border-line bg-panel px-2.5 py-1 font-mono text-[11px] text-muted">{k}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[11px] font-medium text-muted">Шаблон отбивки</div>
            <div className="rounded-lg border border-line bg-panel px-3 py-2 text-[11px] text-muted">«Класс! Лови бриф и тест 👇 …»</div>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-accent/30 bg-accent-soft/40 p-3">
          <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-accent-ink"><Link2 size={13} /> Уникальная ссылка-приглашение поиска</div>
          <div className="flex items-center justify-between gap-2">
            <code className="truncate font-mono text-xs text-text">threadhunt.app/j/vmont-9f3a2k</code>
            <LockBtn><Copy size={12} /> Копировать</LockBtn>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5"><Send size={13} className="text-accent-ink" /> Автопостинг: каждые 4 ч · ИИ-генерация</span>
          <Toggle on />
        </div>
      </div>

      {[
        { n: 'Таргетолог', leads: 12, on: false },
        { n: 'Python-разработчик', leads: 7, on: true },
      ].map((s) => (
        <div key={s.n} className="flex items-center justify-between rounded-xl border border-line bg-bg p-4 text-sm">
          <div>
            <div className="font-medium">{s.n}</div>
            <code className="font-mono text-[11px] text-muted">threadhunt.app/j/{s.n.slice(0, 4).toLowerCase()}-{s.leads}k2x</code>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted"><span>{s.leads} лидов</span><Toggle on={s.on} /></div>
        </div>
      ))}
      <LockBtn className="border-accent/40 text-accent-ink"><Plus size={12} /> Новый поиск</LockBtn>
    </div>
  );
}

/* ── Кампании Meta ─────────────────────────────────────────────────────── */
function MetaPanel() {
  const metrics = [
    { icon: Eye, l: 'Показы', v: '48k' },
    { icon: MousePointerClick, l: 'Клики', v: '1.2k' },
    { icon: MessageSquare, l: 'Лиды', v: '214' },
    { icon: CheckCircle2, l: 'Ответили', v: '92%' },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Рекламные кампании · Meta Ads</div>
        <LockBtn className="border-accent/40 text-accent-ink"><Plus size={12} /> Новая кампания</LockBtn>
      </div>

      <div className="rounded-xl border border-line bg-bg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">Видеомонтажёры — оффер «удалёнка» <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] text-success">active</span></div>
          <span className="font-mono text-[11px] text-muted">act_4983…</span>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {/* креатив */}
          <div className="rounded-lg border border-line bg-panel p-3">
            <div className="mb-2 text-[11px] font-medium text-muted">Креатив (ИИ)</div>
            <div className="flex items-center gap-2">
              <Avatar s="TH" />
              <div className="text-xs"><div className="font-medium">Threadhunt</div><div className="text-[10px] text-muted">Реклама · Facebook/Instagram</div></div>
            </div>
            <div className="mt-2 grid h-20 place-items-center rounded-md bg-[radial-gradient(ellipse_at_center,var(--panel-2),var(--bg))] text-muted">
              <ImageIcon size={20} />
            </div>
            <p className="mt-2 text-[11px] text-muted">Ищем монтажёров Reels. Удалёнка, быстрые выплаты — пиши «монтаж».</p>
            <LockBtn className="mt-2"><Sparkles size={12} /> Сгенерировать вариант</LockBtn>
          </div>

          {/* настройки */}
          <div className="space-y-2 rounded-lg border border-line bg-panel p-3 text-[11px]">
            <div className="mb-1 font-medium text-muted">Настройки кампании</div>
            <Row icon={FileText} l="Шаблон" v="Найм · креатив A" />
            <Row icon={Target} l="Аудитория" v="Россия · 18–35 · видео/монтаж" />
            <Row icon={Megaphone} l="Бюджет" v="1 500 ₽ / день" />
            <Row icon={MessageSquare} l="Цель" v="Сообщения (директ)" />
            <Row icon={Sparkles} l="Кодовое слово" v="монтаж" />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.l} className="rounded-lg border border-line bg-panel p-2.5 text-center">
              <m.icon size={14} className="mx-auto text-accent-ink" />
              <div className="mt-1 font-display text-base font-bold">{m.v}</div>
              <div className="text-[10px] text-muted">{m.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-accent/30 bg-accent-soft/30 p-2.5 text-[11px] text-accent-ink">
          <span className="inline-flex items-center gap-1">Лиды из рекламы</span>
          <ChevronRightMini /> <span className="inline-flex items-center gap-1"><MessageSquare size={12} /> Автоотбивка</span>
          <ChevronRightMini /> <span className="inline-flex items-center gap-1"><Wand2 size={12} /> Онбординг</span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-line bg-bg p-4 text-sm">
        <div className="font-medium">Таргетологи — оффер «проект»</div>
        <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] text-warning">на проверке</span>
      </div>
    </div>
  );
}
function Row({ icon: Icon, l, v }: { icon: LucideIcon; l: string; v: string }) {
  return (
    <div className="flex items-center gap-2 text-muted">
      <Icon size={13} className="shrink-0 text-accent-ink" />
      <span className="w-20 shrink-0">{l}</span>
      <span className="truncate text-text">{v}</span>
    </div>
  );
}
function ChevronRightMini() {
  return <span className="text-accent-ink/50">→</span>;
}

/* ── Кандидаты (CRM) ───────────────────────────────────────────────────── */
const COLS: { t: string; cards: { n: string; r: string; s: number; fresh?: boolean; tag?: string }[] }[] = [
  { t: 'NEW', cards: [{ n: 'Мария', r: 'Монтаж', s: 4, fresh: true }, { n: 'Игорь', r: 'Монтаж', s: 3 }, { n: 'Лена', r: 'SMM', s: 5 }] },
  { t: 'CONTACTED', cards: [{ n: 'Дмитрий', r: 'Таргет', s: 4, tag: 'тест' }, { n: 'Олег', r: 'Таргет', s: 3 }] },
  { t: 'SCREENING', cards: [{ n: 'Алексей', r: 'Python', s: 5, tag: 'сдал' }] },
  { t: 'HIRED', cards: [{ n: 'Нина', r: 'Дизайн', s: 5 }] },
  { t: 'РЕЗЕРВ', cards: [{ n: 'Павел', r: 'Монтаж', s: 4 }] },
];
function LeadsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Воронка кандидатов</div>
        <LockBtn>Перетаскивание — в кабинете</LockBtn>
      </div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {COLS.map((c) => (
          <div key={c.t} className="w-36 shrink-0 rounded-xl border border-line bg-bg p-2">
            <div className="mb-2 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-wider text-muted"><span>{c.t}</span><span className="text-accent-ink">{c.cards.length}</span></div>
            <div className="space-y-2">
              {c.cards.map((card, i) => (
                <div key={i} className={cn('rounded-lg border bg-panel p-2.5', card.fresh ? 'border-accent/50 shadow-[0_0_0_1px_var(--accent-soft)]' : 'border-line')}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{card.n}</span>
                    <span className="flex">{Array.from({ length: card.s }).map((_, k) => <Star key={k} size={9} className="fill-accent-ink text-accent-ink" />)}</span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="text-[10px] text-muted">{card.r}</span>
                    {card.tag && <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[9px] text-accent-ink">{card.tag}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* карточка кандидата */}
      <div className="rounded-xl border border-line bg-bg p-4">
        <div className="flex items-center gap-3">
          <Avatar s="ДМ" />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm font-medium">Дмитрий <span className="flex">{Array.from({ length: 4 }).map((_, k) => <Star key={k} size={10} className="fill-accent-ink text-accent-ink" />)}</span></div>
            <div className="text-[11px] text-muted">Таргетолог · этап: CONTACTED</div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] text-accent-ink">тест выдан</span>
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] text-success">NDA ✓</span>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-panel p-2.5 text-[11px] text-muted"><span className="text-text">Комментарий:</span> сильное портфолио, отвечает быстро</div>
          <div className="rounded-lg border border-line bg-panel p-2.5 text-[11px] text-muted"><span className="text-text">Дедлайн теста:</span> 2 дня · МСК</div>
        </div>
      </div>
    </div>
  );
}

/* ── Онбординг (вся история) ───────────────────────────────────────────── */
const LIFECYCLE = ['Тест сгенерирован', 'Ссылка отправлена', 'Кандидат открыл', 'Сдал работу', 'Проверка', 'Принят'];
const CAND = [
  { n: 'Мария', code: '8f3a-2k9d', st: 'открыла', pct: 35, tone: 'text-accent-ink' },
  { n: 'Дмитрий', code: 'k29d-7p1x', st: 'сдал работу', pct: 70, tone: 'text-success' },
  { n: 'Алексей', code: 'p7x1-q4m8', st: 'на проверке', pct: 85, tone: 'text-warning' },
  { n: 'Нина', code: 'r3v8-l0aa', st: 'принята', pct: 100, tone: 'text-success' },
];
function OnbPanel() {
  return (
    <div className="space-y-4">
      {/* жизненный цикл */}
      <div className="rounded-xl border border-line bg-bg p-4">
        <div className="mb-3 text-sm font-medium">Жизненный цикл онбординга</div>
        <div className="-mx-1 flex items-center gap-1 overflow-x-auto px-1">
          {LIFECYCLE.map((s, i) => (
            <div key={s} className="flex shrink-0 items-center gap-1">
              <div className={cn('flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px]', i <= 3 ? 'border-accent/40 bg-accent-soft text-accent-ink' : 'border-line text-muted')}>
                <span className={cn('grid h-4 w-4 place-items-center rounded-full text-[9px]', i <= 3 ? 'bg-accent text-on-accent' : 'bg-panel-2 text-muted')}>{i + 1}</span>
                {s}
              </div>
              {i < LIFECYCLE.length - 1 && <span className="text-accent-ink/40">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* генератор */}
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-bg p-4">
          <div className="flex items-center gap-2 text-sm font-medium"><Wand2 size={15} className="text-accent-ink" /> Генератор онбординга</div>
          <p className="mt-1 text-xs text-muted">Тест, условия и NDA под роль — ИИ пишет за секунды.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <LockBtn className="border-accent/40 text-accent-ink"><Sparkles size={12} /> Тест</LockBtn>
            <LockBtn><Sparkles size={12} /> Условия</LockBtn>
            <LockBtn><Sparkles size={12} /> NDA</LockBtn>
          </div>
          <div className="mt-3 rounded-lg border border-line bg-panel p-3">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-muted"><FileText size={12} className="text-accent-ink" /> Тестовое задание (превью)</div>
            <p className="text-[11px] leading-relaxed text-muted">Смонтируй Reels 30 сек из присланного материала: динамичная нарезка, субтитры, трендовый звук. Дедлайн — 2 дня. Критерии: ритм, читаемость, чистота склейки.</p>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-muted"><Clock size={11} className="text-accent-ink" /> дедлайн 2 дня · часовой пояс МСК</div>
          </div>
        </div>

        {/* уникальные ссылки */}
        <div className="rounded-xl border border-line bg-bg p-4">
          <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-medium text-accent-ink"><Link2 size={13} /> Уникальные ссылки кандидатов</div>
          <ul className="space-y-2">
            {CAND.map((c) => (
              <li key={c.code} className="rounded-lg border border-line bg-panel px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-medium">{c.n}</div>
                    <code className="truncate font-mono text-[11px] text-muted">threadhunt.app/c/{c.code}</code>
                  </div>
                  <span className={cn('shrink-0 text-[11px]', c.tone)}>{c.st}</span>
                </div>
                <Bar pct={c.pct} className="mt-1.5" />
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-4 gap-2 border-t border-line pt-3 text-center font-mono text-[11px]">
            <div><div className="text-text">12</div><div className="text-[9px] text-muted">выдано</div></div>
            <div><div className="text-text">9</div><div className="text-[9px] text-muted">открыли</div></div>
            <div><div className="text-text">6</div><div className="text-[9px] text-muted">сдали</div></div>
            <div><div className="text-accent-ink">3</div><div className="text-[9px] text-muted">приняли</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
