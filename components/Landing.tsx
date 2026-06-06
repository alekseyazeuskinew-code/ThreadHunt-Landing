'use client';

import { useState, useEffect, Fragment } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  KanbanSquare,
  ClipboardCheck,
  ShieldCheck,
  Users2,
  BarChart3,
  ArrowRight,
  Check,
  X,
  Zap,
  Bot,
  Globe,
  Play,
  LayoutTemplate,
  SlidersHorizontal,
  Rocket,
  ChevronRight,
  ChevronDown,
  Link2,
  Wand2,
  TrendingUp,
  Megaphone,
  Wallet,
  Award,
  AtSign,
  Building2,
  Clapperboard,
  GraduationCap,
  Briefcase,
  UserSearch,
  Quote,
  Minus,
  Clock,
  Users,
  Facebook,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';
import { Wordmark } from '@/components/Wordmark';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DemoConsole } from '@/components/landing/DemoConsole';
import { StickyCta } from '@/components/StickyCta';
import { ReadingProgress } from '@/components/ReadingProgress';
import { Reveal, Counter, TypingText, AnimatedBars, TypeOnce } from '@/components/landing/primitives';
import { cn } from '@/lib/cn';
import { PLANS, CURRENCIES, monthlyOf, formatPrice, savingsPctOf, type Currency } from '@/lib/plans';
import { LEGAL } from '@/lib/legal';
import { LAUNCHED } from '@/lib/config';
import { Waitlist } from '@/components/Waitlist';

/* Адрес кабинета (дашборда). Поменяй на боевой домен приложения. */
const APP_URL = 'https://app.threadhunt.app';
const SIGNUP = `${APP_URL}/signup`;
export const LOGIN = `${APP_URL}/login`;
const TERMS = `${APP_URL}/terms`;
const PRIVACY = '/privacy'; // собственная страница лендинга (с cookie-политикой)

/* Пред-запуск: все основные CTA ведут в лист ожидания вместо регистрации. */
export const PRELAUNCH = !LAUNCHED;
export const CTA_HREF = PRELAUNCH ? '#waitlist' : SIGNUP;
export const CTA_LABEL = PRELAUNCH ? 'В лист ожидания' : 'Начать бесплатно';

/* Пункты навигации (id секции → подсветка активной при скролле). */
const NAV = [
  { id: 'demo', label: 'Демо' },
  { id: 'sandbox', label: 'Попробовать' },
  { id: 'how', label: 'Как работает' },
  { id: 'features', label: 'Возможности' },
  { id: 'pricing', label: 'Тарифы' },
  { id: 'faq', label: 'Вопросы' },
];

/* Видео: положи /demo.mp4 + /demo-poster.jpg в public/ и переключи в true. */
const HAS_VIDEO = false;

/* ── Живая демо-сцена hero: входящий директ → совпадение → ответ → лид ──── */
type Scene = { kw: string; incoming: string; reply: string; role: string; from: string };
const SCENES: Scene[] = [
  { from: '@maria.cuts', kw: 'монтаж', incoming: 'Привет! Делаю монтаж Reels и Shorts, скинь подробности 🎬', reply: 'Класс! Лови бриф и короткое тестовое — 2 ролика. Ссылка внутри 👇', role: 'Видеомонтажёр' },
  { from: '@dmitry.ads', kw: 'таргет', incoming: 'Здравствуйте! Веду таргет в Meta и TikTok, есть кейсы', reply: 'Супер! Покажи кейсы — вот мини-тест по аудиториям и условия.', role: 'Таргетолог' },
  { from: '@alex.dev', kw: 'python', incoming: 'Hi! Backend на Python / FastAPI, открыт к проектам', reply: 'Огонь! Держи тех-тест на 2 часа и NDA. Ждём решение 🚀', role: 'Python-разработчик' },
];
const STEP_DELAYS = [1500, 1100, 1300, 1800, 1700];

function highlight(text: string, kw: string) {
  const i = text.toLowerCase().indexOf(kw.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-accent-soft px-1 text-accent-ink">{text.slice(i, i + kw.length)}</mark>
      {text.slice(i + kw.length)}
    </>
  );
}

export function DmDemo() {
  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      if (step >= STEP_DELAYS.length - 1) {
        setStep(0);
        setScene((s) => (s + 1) % SCENES.length);
      } else {
        setStep((s) => s + 1);
      }
    }, STEP_DELAYS[step]);
    return () => clearTimeout(t);
  }, [step, scene]);

  const s = SCENES[scene];
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
      <div className="flex items-center gap-3 border-b border-line bg-panel-2/60 px-4 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent-ink">
          {s.from.slice(1, 3).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{s.from}</div>
          <div className="font-mono text-[11px] text-muted">директ · Threads</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] text-accent-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-success lp-ring" /> отвечает сам
        </span>
      </div>
      <div className="flex h-[300px] flex-col gap-2.5 overflow-hidden p-4">
        <div key={`in-${scene}`} className="lp-rise max-w-[82%] self-start rounded-2xl rounded-tl-md bg-panel-2 px-3.5 py-2.5 text-sm">
          {highlight(s.incoming, s.kw)}
        </div>
        {step >= 1 && (
          <div key={`kw-${scene}`} className="lp-rise self-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-muted">
              <Zap size={12} className="text-accent-ink" /> совпало кодовое слово · <span className="text-accent-ink">{s.kw}</span>
            </span>
          </div>
        )}
        {step === 2 && (
          <div className="lp-rise flex max-w-[60%] items-center gap-1.5 self-end rounded-2xl rounded-tr-md bg-accent lp-btn-grad px-3.5 py-3">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-on-accent [animation-delay:-0.2s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-on-accent [animation-delay:-0.1s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-on-accent" />
          </div>
        )}
        {step >= 3 && (
          <div key={`re-${scene}`} className="lp-rise max-w-[82%] self-end rounded-2xl rounded-tr-md bg-accent lp-btn-grad px-3.5 py-2.5 text-sm text-on-accent">
            {s.reply}
          </div>
        )}
        {step >= 4 && (
          <div key={`ld-${scene}`} className="lp-rise mt-auto flex items-center gap-3 rounded-xl border border-line bg-bg p-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent-ink">
              <KanbanSquare size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">Новый лид · {s.role}</div>
              <div className="font-mono text-[11px] text-muted">воронка: NEW</div>
            </div>
            <Check size={16} className="text-success" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Бегущая строка кодовых слов ───────────────────────────────────────── */
const KEYWORDS = ['монтаж', 'таргетолог', 'копирайтер', 'Python', 'SMM', 'дизайнер', 'моушн', 'продажи', 'Reels', 'ассистент', 'React', 'трафик'];
export function KeywordMarquee() {
  const row = [...KEYWORDS, ...KEYWORDS];
  return (
    <div className="lp-fade-x overflow-hidden py-2">
      <div className="lp-marquee flex w-max gap-3">
        {row.map((k, i) => (
          <span key={i} className="whitespace-nowrap rounded-full border border-line bg-panel px-4 py-1.5 font-mono text-sm text-muted">{k}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Видео в красивой рамке (2-й экран) ────────────────────────────────── */
export function VideoShowcase() {
  return (
    <section id="video" className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[120px] lp-glow" />
      <div className="relative mx-auto max-w-4xl px-5 py-16 md:py-24">
        <Reveal className="mb-8 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">за 90 секунд</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Посмотри, как это работает вживую</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">От поста-приманки до карточки кандидата в CRM — весь путь на одном экране.</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative mx-auto aspect-video w-full max-w-3xl">
            {/* вращающийся градиентный ореол-рамка */}
            <div
              className="pointer-events-none absolute -inset-[1.5px] rounded-[26px] opacity-50 blur-[1px] lp-spin"
              style={{ background: 'conic-gradient(from 0deg, var(--accent), transparent 25%, transparent 65%, var(--accent))' }}
            />
            <div className="lp-sheen relative h-full w-full overflow-hidden rounded-3xl border border-line bg-panel">
              <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-1.5 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                <span className="ml-auto rounded-full bg-bg/70 px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur">demo · threadhunt</span>
              </div>
              {HAS_VIDEO ? (
                <video className="h-full w-full object-cover" src="/demo.mp4" poster="/demo-poster.jpg" controls playsInline preload="metadata" />
              ) : (
                <div className="grid h-full w-full place-items-center bg-[radial-gradient(ellipse_at_center,var(--panel-2),var(--bg))]">
                  <div className="text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-on-accent shadow-xl lp-ring md:h-20 md:w-20">
                      <Play size={26} className="ml-1 fill-on-accent" />
                    </span>
                    <div className="mt-4 font-mono text-xs text-muted">демо-видео скоро</div>
                  </div>
                </div>
              )}
            </div>
            {/* плавающий акцент-чип */}
            <div className="lp-float-slow absolute -right-3 -top-3 hidden rounded-full border border-line bg-panel px-3 py-1.5 text-xs shadow-lg sm:block">
              <span className="text-accent-ink">⟋⟋</span> живой поток
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Два режима запуска (графический флоу) ─────────────────────────────── */
type FlowStep = { icon: LucideIcon; t: string; d: string; manual?: boolean };
const MODES: { key: string; label: string; icon: LucideIcon; badge: string; tagline: string; desc: string; steps: FlowStep[] }[] = [
  {
    key: 'funnel',
    label: 'Воронка в Threads',
    icon: Zap,
    badge: 'бесплатно',
    tagline: 'Бесплатно — органикой в ленте Threads',
    desc: 'ИИ пишет посты-приманки, бот публикует их в Threads по расписанию, расширение само отвечает на кодовые слова в директе, а кандидат проходит онбординг по персональной ссылке. Без рекламного бюджета.',
    steps: [
      { icon: Sparkles, t: 'ИИ-посты', d: 'генерация приманок' },
      { icon: Send, t: 'Автопостинг', d: 'Threads по расписанию' },
      { icon: MessageSquare, t: 'Автоотбивка', d: 'ответы в директе' },
      { icon: Wand2, t: 'Онбординг', d: 'тест по ссылке' },
    ],
  },
  {
    key: 'campaign',
    label: 'Реклама в Meta',
    icon: Facebook,
    badge: 'платно',
    tagline: 'Платно — реклама Meta / Facebook для большего охвата',
    desc: 'Берёшь готовый шаблон рекламной кампании Meta, ИИ генерирует креатив и оффер, настраиваешь аудиторию и бюджет, запускаешь. Лиды из рекламы сразу попадают в автоотбивку и дальше — в онбординг.',
    steps: [
      { icon: LayoutTemplate, t: 'Шаблон Meta', d: 'проверенный сценарий' },
      { icon: Sparkles, t: 'ИИ-креатив', d: 'текст и картинка' },
      { icon: SlidersHorizontal, t: 'Настройка', d: 'аудитория, бюджет' },
      { icon: Rocket, t: 'Запуск', d: 'Meta Ads', manual: true },
      { icon: MessageSquare, t: 'Автоотбивка', d: 'ответы лидам' },
      { icon: Wand2, t: 'Онбординг', d: 'тест по ссылке' },
    ],
  },
];

export function LaunchModes() {
  const [m, setM] = useState(0);
  const mode = MODES[m];
  return (
    <section id="how" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">механика запуска</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Два пути к потоку кандидатов</h2>
            <p className="mt-3 text-muted">Стартуй <span className="text-text">бесплатно</span> органикой в Threads — или ускорься <span className="text-text">платной рекламой Meta</span>. Оба сценария ведёт автоматика, ты только смотришь на результат.</p>
          </div>
        </Reveal>

        {/* переключатель режимов: на мобиле — аккуратная стопка, на десктопе — пилюля */}
        <Reveal delay={80} className="mt-8 flex w-full flex-col gap-1 rounded-2xl border border-line bg-panel p-1 sm:inline-flex sm:w-auto sm:flex-row sm:rounded-full">
          {MODES.map((x, i) => (
            <button
              key={x.key}
              onClick={() => setM(i)}
              className={cn(
                'inline-flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-sm transition-colors sm:w-auto sm:justify-center sm:rounded-full sm:py-2',
                m === i ? 'bg-accent lp-btn-grad text-on-accent' : 'text-muted hover:text-text',
              )}
            >
              <span className="inline-flex items-center gap-2"><x.icon size={15} /> {x.label}</span>
              <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-medium', m === i ? 'bg-on-accent/15 text-on-accent' : 'bg-accent-soft text-accent-ink')}>{x.badge}</span>
            </button>
          ))}
        </Reveal>

        <div key={mode.key} className="lp-rise mt-6">
          <p className="max-w-2xl text-sm text-muted">{mode.tagline} — {mode.desc}</p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-nowrap md:items-stretch md:gap-2 md:overflow-x-auto md:pb-2">
            {mode.steps.map((s, i) => (
              <Fragment key={s.t}>
                <div
                  className="lp-rise relative flex-1 overflow-hidden rounded-2xl border border-line bg-panel p-5 md:min-w-[150px]"
                  style={{ animationDelay: `${i * 110}ms` }}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                    <s.icon size={20} />
                  </div>
                  <div className="mt-4 font-display text-base font-semibold">{s.t}</div>
                  <div className="mt-1 text-xs text-muted">{s.d}</div>
                  <span className={cn(
                    'mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                    s.manual ? 'bg-panel-2 text-muted' : 'bg-accent-soft text-accent-ink',
                  )}>
                    {s.manual ? 'ты запускаешь' : 'авто'}
                  </span>
                </div>
                {i < mode.steps.length - 1 && (
                  <>
                    <div className="hidden items-center md:flex"><ChevronRight size={20} className="text-accent-ink/40" /></div>
                    <div className="flex justify-center md:hidden"><ChevronDown size={18} className="text-accent-ink/40" /></div>
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Bento возможностей ────────────────────────────────────────────────── */
function BentoTile({
  icon: Icon,
  title,
  text,
  wide,
  children,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  wide?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('group rounded-2xl border border-line bg-panel p-6 transition-all hover:-translate-y-1 hover:border-accent/40', wide && 'sm:col-span-2')}>
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-ink">
        <Icon size={20} />
      </div>
      <div className="mt-4 font-display text-base font-semibold">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function Bento() {
  return (
    <section id="features" className="border-t border-line bg-panel/30">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">возможности</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Один кабинет вместо десяти вкладок</h2>
            <p className="mt-3 text-muted">От первой приманки до подписанного NDA. Без таблиц, без ручных ответов, без переключений между сервисами.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* живая плитка: отбивка */}
          <BentoTile wide icon={MessageSquare} title="Авто-отбивка в директе" text="Отвечает на кодовые слова под твоей сессией Threads — пока конкуренты вручную листают отклики, у тебя уже назначены тесты.">
            <div className="rounded-xl border border-line bg-bg p-3">
              <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-panel-2 px-3 py-2 text-xs">Привет, делаю <mark className="rounded bg-accent-soft px-1 text-accent-ink">монтаж</mark> 🎬</div>
              <div className="mt-2 ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-accent lp-btn-grad px-3 py-2 text-xs text-on-accent">Класс! Лови бриф и тест 👇</div>
            </div>
          </BentoTile>

          {/* живая плитка: ИИ */}
          <BentoTile wide icon={Sparkles} title="ИИ-генерация (Claude)" text="Посты, шаблоны ответов, тестовые задания и NDA — в голосе твоего бренда, а не шаблонно.">
            <div className="h-20 overflow-hidden rounded-xl border border-line bg-bg p-3 font-mono text-xs text-muted">
              <span className="text-accent-ink">ИИ пишет: </span>
              <TypingText
                phrases={[
                  'Тредс, найди мне монтажёра Reels 🙏 пиши «монтаж» в директ…',
                  'Таргетологи, вы тут?? 🔥 беру в команду — слово «таргет»…',
                  'Расширяем трафик-команду 💪 нужен ассистент, кодовое «+»…',
                ]}
              />
            </div>
          </BentoTile>

          {/* аналитика */}
          <BentoTile icon={BarChart3} title="Аналитика найма" text="Лиды, % ответов, источники и тренды.">
            <AnimatedBars heights={[40, 65, 50, 80, 95, 72]} />
          </BentoTile>

          {/* CRM */}
          <BentoTile icon={KanbanSquare} title="Внутренняя CRM" text="Каждый отклик — карточка в воронке.">
            <div className="flex gap-1.5">
              {['NEW', 'CONT', 'SCR', 'HIRE'].map((s, i) => (
                <span key={s} className={cn('flex-1 rounded-md px-1.5 py-1 text-center font-mono text-[9px]', i === 0 ? 'bg-accent-soft text-accent-ink' : 'bg-panel-2 text-muted')}>{s}</span>
              ))}
            </div>
          </BentoTile>

          <BentoTile icon={Send} title="Автопостинг приманок" text="Официальный Threads API, расписание и ротация постов с текстом, фото и видео." />
          <BentoTile icon={Wand2} title="Генератор онбординга" text="Тест, условия и NDA для подрядчиков — и персональная ссылка каждому кандидату." />
          <BentoTile icon={ShieldCheck} title="Безопасность аккаунта" text="Лимиты DM в день, задержки между ответами и рабочее окно — анти-бан по умолчанию." />
          <BentoTile icon={Users2} title="Командный доступ" text="Приглашай менеджеров и наблюдателей. Общая база кандидатов и ролей." />
        </div>
      </div>
    </section>
  );
}

/* ── Сравнение способов найма ──────────────────────────────────────────── */
// Тон ячейки матрицы: good (✓ лайм) · warn (~ жёлтый) · bad (✕ красный).
type Tone = 'good' | 'warn' | 'bad';
const CMP_COLS = ['Threadhunt', 'Telegram-каналы', 'HeadHunter / биржи труда', 'Фриланс-биржи', 'Рекрутёр / агентство'];
const CMP_ROWS: { c: string; v: string[]; t: Tone[] }[] = [
  { c: 'Поток кандидатов', v: ['постоянный, на автопилоте', 'разовый — от поста', 'отклики есть, но формальные', 'много, но шум', 'ограничен базой'], t: ['good', 'warn', 'warn', 'warn', 'warn'] },
  { c: 'Ответ на отклик', v: ['мгновенно, 24/7', 'пишешь всем вручную', 'вручную, в рабочие часы', 'пишешь сам', 'через посредника'], t: ['good', 'bad', 'bad', 'bad', 'warn'] },
  { c: 'Барьер входа / запуск', v: ['3 шага, минуты', 'ищешь каналы, пишешь админам', 'верификация юрлица, долгая модерация', 'регистрация, рейтинг с нуля', 'брифинг и договор'], t: ['good', 'warn', 'bad', 'warn', 'warn'] },
  { c: 'Стоимость', v: ['от 0 ₽ · фикс-тариф', 'платная реклама в каналах', 'платные публикации / доступ к базе', 'комиссия + платный буст', '10–20% оклада'], t: ['good', 'warn', 'warn', 'warn', 'bad'] },
  { c: 'Своя CRM-воронка', v: ['есть', 'таблички', 'их интерфейс', 'нет', 'у них, не у тебя'], t: ['good', 'bad', 'warn', 'bad', 'warn'] },
  { c: 'Онбординг и тесты', v: ['генератор + ссылки', 'вручную', 'вручную', 'нет', 'по-разному'], t: ['good', 'warn', 'warn', 'bad', 'warn'] },
  { c: 'Масштаб (много ролей)', v: ['десятки ролей разом', 'каждую — отдельный пост и реклама', 'дорого за каждую вакансию', 'дорого', 'дорого масштабировать'], t: ['good', 'bad', 'warn', 'warn', 'bad'] },
  { c: 'Контроль качества', v: ['полностью у тебя', 'на тебе', 'формальные резюме', 'на тебе', 'у агентства'], t: ['good', 'warn', 'warn', 'warn', 'bad'] },
];
function ToneIcon({ t }: { t: Tone }) {
  if (t === 'good') return <Check size={15} className="mt-0.5 shrink-0 text-accent-ink" />;
  if (t === 'bad') return <X size={15} className="mt-0.5 shrink-0 text-danger/70" />;
  return <Minus size={15} className="mt-0.5 shrink-0 text-warning" />;
}
export function Comparison() {
  return (
    <section id="compare" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <Reveal className="text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">сравнение</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Threadhunt против привычных способов</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">Telegram-каналы, HeadHunter, фриланс-биржи, рекрутёр — у каждого свои минусы. Вот честная таблица.</p>
        </Reveal>

        <Reveal delay={120} className="mt-12 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[960px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="w-40 p-3 text-left align-top font-medium text-muted"></th>
                {CMP_COLS.map((c, i) => (
                  <th key={c} className={cn('p-3 text-left align-top', i === 0 && 'bg-accent-soft/40')}>
                    <div className="flex flex-col gap-1.5">
                      <span className={cn('font-display text-[15px] font-semibold leading-tight', i === 0 ? 'text-accent-ink' : 'text-text')}>{c}</span>
                      {i === 0 && (
                        <span className="w-fit whitespace-nowrap rounded-full bg-accent lp-btn-grad px-2 py-0.5 text-[10px] font-medium text-on-accent">лучший выбор</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CMP_ROWS.map((r) => (
                <tr key={r.c} className="border-b border-line last:border-0">
                  <td className="p-3 align-top font-medium text-muted">{r.c}</td>
                  {r.v.map((val, i) => (
                    <td key={i} className={cn('p-3 align-top', i === 0 && 'bg-accent-soft/20')}>
                      <div className="flex items-start gap-2">
                        <ToneIcon t={r.t[i]} />
                        <span className={i === 0 ? 'font-medium text-text' : 'text-muted'}>{val}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Reveal className="mt-3 text-center text-xs text-muted">Прокрути таблицу вбок на телефоне →</Reveal>
      </div>
    </section>
  );
}

/* ── Калькулятор ценности ──────────────────────────────────────────────── */
export function ValueCalculator() {
  const [replies, setReplies] = useState(80); // откликов в директе в неделю
  const hoursWeek = Math.round((replies * 3) / 60); // ~3 мин на ручной ответ
  const candMonth = Math.round(replies * 4 * 0.4); // ~40% теряется вручную
  const hoursYear = hoursWeek * 52;
  const out = [
    { icon: Clock, v: `${hoursWeek}`, l: 'часов в неделю освобождается' },
    { icon: Users, v: `+${candMonth}`, l: 'кандидатов в месяц не теряешь' },
    { icon: TrendingUp, v: `${hoursYear}`, l: 'часов рутины в год' },
  ];
  return (
    <section className="border-t border-line bg-panel/30">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal className="text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">сколько ты вернёшь</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Посчитай свою выгоду за минуту</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">Подвигай ползунок под свой объём откликов — увидишь, сколько времени и людей вернёт автоматика.</p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-panel p-6 md:p-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {out.map((o) => (
              <div key={o.l} className="text-center">
                <o.icon size={18} className="mx-auto text-accent-ink" />
                <div className="mt-2 font-display text-3xl font-bold text-accent-ink md:text-4xl">{o.v}</div>
                <div className="mt-1 text-[11px] leading-tight text-muted">{o.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted">Откликов в директе в неделю</span>
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-accent-ink">{replies}</span>
            </div>
            <input type="range" min={10} max={500} step={10} value={replies} onChange={(e) => setReplies(Number(e.target.value))} className="w-full accent-accent" />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-muted"><span>10</span><span>500</span></div>
          </div>
          <p className="mt-5 text-[11px] leading-relaxed text-muted">Оценка: ~3 минуты на ручной ответ и ~40% откликов, которые теряются без мгновенной отбивки. Реальная выгода зависит от ниши и оффера.</p>
          <a href={CTA_HREF} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent lp-btn-grad px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press">
            {CTA_LABEL} <ArrowRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Тарифы ────────────────────────────────────────────────────────────── */
export function Pricing() {
  const [cur, setCur] = useState<Currency>('USD');
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="border-t border-line bg-panel/30">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">тарифы</div>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Начни бесплатно. Расти, когда поток пойдёт</h2>
              <p className="mt-3 text-muted">Free — навсегда и без карты. На годовой оплате — два месяца в подарок.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="inline-flex self-start rounded-full border border-line bg-panel p-1">
                <button onClick={() => setAnnual(false)} className={cn('rounded-full px-4 py-1.5 text-sm transition-colors', !annual ? 'bg-accent text-on-accent' : 'text-muted hover:text-text')}>Месяц</button>
                <button onClick={() => setAnnual(true)} className={cn('inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors', annual ? 'bg-accent text-on-accent' : 'text-muted hover:text-text')}>
                  Год <span className={cn('rounded-full px-1.5 py-0.5 text-[10px]', annual ? 'bg-on-accent/15 text-on-accent' : 'bg-accent-soft text-accent-ink')}>−17%</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1 self-start rounded-2xl border border-line bg-panel p-1">
                {CURRENCIES.map((c) => (
                  <button key={c.code} onClick={() => setCur(c.code)} className={cn('rounded-full px-3 py-1 text-sm transition-colors', cur === c.code ? 'bg-panel-2 text-text' : 'text-muted hover:text-text')}>{c.code}</button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((p, i) => {
            const price = monthlyOf(p, cur, annual);
            const pct = savingsPctOf(p, cur);
            return (
              <Reveal key={p.key} delay={i * 90} className={cn('relative flex flex-col rounded-2xl border bg-panel p-7', p.highlight ? 'border-accent/60 shadow-[0_0_40px_-12px_var(--accent-soft)]' : 'border-line')}>
                {p.highlight && <span className="absolute -top-3 left-7 rounded-full bg-accent lp-btn-grad px-3 py-1 text-[11px] font-medium text-on-accent">Популярный</span>}
                <div className="font-display text-xl font-bold">{p.name}</div>
                <div className="mt-1 text-sm text-muted">{p.tagline}</div>
                <div className="mt-5 flex items-end gap-1.5">
                  <span className="font-display text-4xl font-bold tracking-tight">{p.key === 'FREE' ? '0' : formatPrice(price, cur)}</span>
                  {p.key !== 'FREE' && <span className="mb-1 text-sm text-muted">/мес</span>}
                </div>
                <div className="mt-1 h-4 text-xs text-accent-ink">
                  {p.key !== 'FREE' && annual ? `при оплате за год · экономия ${pct}%` : ''}
                </div>
                <a href={CTA_HREF} className={cn('mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors', p.highlight ? 'bg-accent lp-btn-grad text-on-accent hover:bg-accent-press' : 'border border-line text-text hover:bg-panel-2')}>
                  {p.key === 'FREE' ? 'Попробовать' : 'Выбрать ' + p.name} <ArrowRight size={15} />
                </a>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={17} className="mt-0.5 shrink-0 text-accent-ink" />
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────────────────────────── */
const FAQ: { q: string; a: string }[] = [
  {
    q: 'Заблокируют ли мой аккаунт в Threads?',
    a: 'Полностью исключить риск нельзя — это автоматизация в чужой соцсети. Но Threadhunt с самого начала работает «по-человечески»: случайные задержки между ответами, дневные лимиты, рабочее окно по часам и постепенный разогрев. Это заметно снижает вероятность ограничений по сравнению с массовой рассылкой. Рекомендуем стартовать с консервативных лимитов.',
  },
  {
    q: 'Вы несёте ответственность за блокировки и санкции?',
    a: 'Нет. Threadhunt — инструмент: ты сам управляешь лимитами, текстами и темпом, и сам отвечаешь за соблюдение правил платформы. Мы даём анти-бан механики и рекомендации, но гарантировать поведение Threads/Meta не можем и ответственности за ограничения аккаунтов не несём.',
  },
  {
    q: 'Это «серая схема»? Насколько это легально?',
    a: 'Расширение не взламывает Threads и не использует закрытые API: оно автоматизирует те же действия, что ты делаешь руками, — в твоём браузере и под твоей сессией. Автопостинг идёт через официальный Threads API. При этом любая автоматизация соцсети — твоя зона ответственности: используй сервис, соблюдая правила платформы и местное законодательство.',
  },
  {
    q: 'Как технически устроена отбивка в директе?',
    a: 'Это эмуляция ручных действий: браузерное расширение открывает диалоги и печатает ответы так же, как это делал бы человек, — под твоей уже открытой сессией Threads. Никаких паролей мы не запрашиваем и доступов Meta для отбивки не требуется.',
  },
  {
    q: 'Нужен ли доступ Meta или бизнес-верификация?',
    a: 'Для отбивки в директе — нет, всё работает через расширение в браузере. Threads API нужен только если хочешь, чтобы бот ещё и сам публиковал посты-приманки по расписанию — это опционально.',
  },
  {
    q: 'Безопасны ли мои данные и пароль от Threads?',
    a: 'Мы не просим и не храним твой пароль от Threads — расширение работает поверх уже открытой сессии. Токены подключений шифруются, а кандидаты и переписка хранятся в твоём защищённом кабинете.',
  },
  {
    q: 'Можно отменить подписку и вернуть деньги?',
    a: 'Да. Оплата идёт через Stripe, отменить можно в любой момент. Годовой тариф можно поставить на паузу — данные, лиды и резерв кандидатов сохранятся.',
  },
];
function FaqItem({ q, a }: { q: string; a: string }) {
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
export function Faq() {
  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">вопросы и ответы</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Отвечаем на неудобное заранее</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">Блокировки, ответственность, легальность — без воды и мелкого шрифта.</p>
          </div>
        </Reveal>
        <div className="mt-10 space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}><FaqItem q={f.q} a={f.a} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Стек: из чего собран продукт (роль каждой технологии) ──────────────── */
export function TrustStrip() {
  const items = [
    { name: 'Threads', role: 'где ловим' },
    { name: 'Meta Ads', role: 'реклама и лидген' },
    { name: 'Claude', role: 'ИИ-тексты' },
    { name: 'Stripe', role: 'оплата' },
  ];
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent-ink">под капотом</span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {items.map((t) => (
              <span key={t.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1.5 transition-colors hover:border-accent/40">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-ink" />
                <span className="font-display text-sm font-semibold text-text">{t.name}</span>
                <span className="text-xs text-muted">· {t.role}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Кому подходит (ICP) ───────────────────────────────────────────────── */
const ICP: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Building2, t: 'Агентствам', d: 'Закрывайте вакансии клиентов потоком — без штата рекрутёров.' },
  { icon: Clapperboard, t: 'Продакшн-студиям', d: 'Монтажёры, операторы, motion-дизайнеры под каждый проект.' },
  { icon: UserSearch, t: 'Рекрутёрам и HR', d: 'Десятки диалогов параллельно, все кандидаты в одной CRM.' },
  { icon: GraduationCap, t: 'Онлайн-школам', d: 'Кураторы, эксперты и ассистенты под запуск — на потоке.' },
  { icon: Megaphone, t: 'Маркетинг-командам', d: 'Таргетологи, копирайтеры и дизайнеры — быстро и без бирж.' },
  { icon: Briefcase, t: 'Инфобизнесу', d: 'Подрядчики под любую задачу — быстрее и дешевле фриланс-бирж.' },
];
export function Audience() {
  return (
    <section id="audience" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">кому подходит</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Если нанимаешь подрядчиков — это для тебя</h2>
            <p className="mt-3 text-muted">Threadhunt одинаково хорош там, где люди нужны постоянно и по разным профессиям.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ICP.map((a, i) => (
            <Reveal key={a.t} delay={(i % 3) * 80} className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-6 transition-all hover:-translate-y-1 hover:border-accent/40">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink"><a.icon size={20} /></span>
              <div>
                <div className="font-display text-base font-semibold">{a.t}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── От основателя (build-in-public) ───────────────────────────────────── */
const FOUNDER_TEXT =
  'Я сам годами собирал команды подрядчиков вручную — и видел, как лучшие кандидаты теряются в директе, пока отвечаешь по одному. Threadhunt — это инструмент, которого мне не хватало: он ловит и квалифицирует людей сам. Мы строим его в открытую и хотим, чтобы первые пользователи получили максимум — поэтому ранний доступ со скидкой.';
export function FounderNote() {
  return (
    <section className="border-t border-line bg-panel/30">
      <div className="mx-auto max-w-3xl px-5 py-20 md:py-24">
        <Reveal>
          <div className="relative rounded-2xl border border-line bg-panel p-8 md:p-10">
            <Quote size={40} className="absolute -top-4 left-8 text-accent-ink opacity-40" />
            {/* невидимая копия резервирует высоту, печатающийся текст — поверх (без скачка вёрстки) */}
            <div className="relative text-lg leading-relaxed md:text-xl">
              <p className="invisible" aria-hidden>{FOUNDER_TEXT}</p>
              <p className="absolute inset-0"><TypeOnce text={FOUNDER_TEXT} /></p>
            </div>
            <div className="mt-7 flex items-center gap-3">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-accent-soft text-sm font-semibold text-accent-ink">
                A
                <img
                  src="/founder.jpg"
                  alt="Alex — основатель Threadhunt"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </span>
              <div>
                <div className="font-medium">Alex</div>
                <div className="text-sm text-muted">основатель Threadhunt</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Акцент: первый сервис автоответов именно в директе Threads ────────── */
function FirstMover() {
  const chips = ['директ Threads, не Instagram', 'первые на рынке', 'поток 24/7', 'любые профессии'];
  return (
    <section className="relative overflow-hidden border-t border-line bg-panel/30">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[680px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px] lp-glow" />
      <div className="relative mx-auto max-w-4xl px-5 py-16 text-center md:py-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-ink">
            <Award size={14} /> #1 · первые на рынке
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Первый сервис, который сам отвечает{' '}
            <span className="lp-gradient-text">в директе Threads</span> на кодовые слова
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            Именно в личке <span className="font-medium text-text">Threads</span> — не Instagram. Бот ловит кодовое слово и
            отвечает за тебя круглосуточно. На потоке постоянно идут кандидаты и подрядчики по любым профессиям:
            монтажёры, таргетологи, дизайнеры, разработчики, ассистенты.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {chips.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-3.5 py-1.5 text-sm text-muted">
                <AtSign size={13} className="text-accent-ink" /> {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Реферальная программа ─────────────────────────────────────────────── */
export function Referral() {
  const [n, setN] = useState(8);
  const AVG = 1490; // средний чек Pro, ₽
  const RATE = 0.25; // 25% пожизненно
  const monthly = Math.round(n * AVG * RATE);
  const yearly = monthly * 12;
  const steps = [
    { icon: Link2, t: 'Делишься ссылкой', d: 'персональная реф-ссылка в кабинете' },
    { icon: Users2, t: 'Друг подключается', d: 'и оформляет любой платный тариф' },
    { icon: Wallet, t: 'Получаешь 25%', d: 'пожизненно, пока он с нами' },
  ];
  return (
    <section id="referral" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">партнёрская программа</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Приводи друзей — получай 25% пожизненно</h2>
            <p className="mt-3 text-muted">За каждого, кто подключится по твоей ссылке, ты получаешь 25% с его платежей — пока он платит. Другу — бонус на старте. Выплаты идут только с реальных платежей, так что это всегда в плюс.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="space-y-3">
            {steps.map((s, i) => (
              <div key={s.t} className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink"><s.icon size={20} /></span>
                <div>
                  <div className="font-display text-base font-semibold">{i + 1}. {s.t}</div>
                  <div className="mt-1 text-sm text-muted">{s.d}</div>
                </div>
              </div>
            ))}
            {/* контент-движок */}
            <div className="rounded-2xl border border-accent/30 bg-accent-soft/20 p-5">
              <div className="flex items-center gap-2 font-display text-base font-semibold">
                <Megaphone size={18} className="text-accent-ink" /> Партнёрский контент-движок
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Подключи свой Threads — и Threadhunt сам публикует у тебя готовые мемы и промо-посты про сервис. Реклама
                работает на тебя на автопилоте: больше охвата — больше рефералов.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent-ink">
                <Bot size={12} /> авто-постинг через твой аккаунт
              </span>
            </div>
          </Reveal>

          {/* калькулятор */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-panel p-6 md:p-7">
              <div className="text-sm font-medium text-muted">Сколько ты заработаешь</div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <div className="font-display text-4xl font-bold text-accent-ink md:text-5xl">{monthly.toLocaleString('ru-RU')} ₽</div>
                  <div className="mt-1 text-xs text-muted">в месяц</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-semibold">{yearly.toLocaleString('ru-RU')} ₽</div>
                  <div className="mt-1 text-xs text-muted">в год</div>
                </div>
              </div>
              <div className="mt-7">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-muted">Активных рефералов</span>
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-accent-ink">{n}</span>
                </div>
                <input type="range" min={1} max={50} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-accent" />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-muted"><span>1</span><span>50</span></div>
              </div>
              <p className="mt-5 text-[11px] leading-relaxed text-muted">Оценка при среднем чеке Pro (1 490 ₽) и ставке 25% пожизненно. Выплаты — с фактических платежей рефералов.</p>
              <a href={CTA_HREF} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent lp-btn-grad px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press">
                Получить реф-ссылку <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Живая ИИ-песочница: кодовое слово → приманка + авто-ответ ──────────── */
type Role = { emoji: string; baits: (w: string) => string[] };
const ROLE_MAP: Record<string, Role> = {
  'монтаж': { emoji: '🎬', baits: (w) => [
    `Тредссс, найди мне монтажёра 🎬 Режу Reels пачками — нужен человек с насмотренностью, чтобы отличать топ-склейку от «и так сойдёт». Удалёнка, плачу вовремя.\nКодовое «${w}» в директ 🤝`,
    `Монтажёры, вы тут?????? Отзовитесь!!! Беру 1-2 на постоянку, 15-20 роликов в неделю. Деньги вовремя, без душнилова.\nКидай портфолио и слово «${w}» в директ 🎬`,
  ] },
  'таргет': { emoji: '🎯', baits: (w) => [
    `Коллеги-таргетологи, найдитесь 🙏 Расширяю трафик-команду — нужен ассистент с горящими глазами. У нас сильная база и отделы дизайна+видео.\nСтавь «${w}» в директ — пришлю бриф 💪`,
    `Тредс, ну где мои таргетологи 😤 Ищу того, кто живёт аукционом и не боится тестов. Вертикали, бюджеты, рост.\nПиши «${w}» — отправлю условия 🎯`,
  ] },
  'python': { emoji: '🐍', baits: (w) => [
    `Питонисты, ауу 🐍 Нужен backend на FastAPI в проект на 3 мес (можно дольше). Чистый код, без легаси-боли.\nКидай гитхаб и слово «${w}» в директ.`,
    `Тредс, найди мне разраба на Python, который не боится дедлайнов. Удалёнка, адекватный тимлид, задачи интересные.\nКодовое «${w}» в директ — расскажу детали 👨‍💻`,
  ] },
  'дизайн': { emoji: '🎨', baits: (w) => [
    `Дизайнеры карточек и инфографики, вы Тут?????? Отзовитесь!!! Беру 2 на постоянку, 15-20 креативов в неделю, 500₽ за слайд.\nРаботы + слово «${w}» в директ 🎨`,
    `Тредс, нужен дизайнер с насмотренностью — отличать «вау» от «фу» 😅 Команда, потоковые задачи, рост по деньгам.\nПиши «${w}» в директ, покажу примеры.`,
  ] },
  'smm': { emoji: '📱', baits: (w) => [
    `SMM-щики, залетайте 📱 Нужен человек вести соцсети без воды и душных рубрик. Контент-план, Reels, чуть магии.\nКодовое «${w}» в директ — обсудим.`,
    `Тредс, найди SMM, который умеет в смыслы, а не «доброе утро, друзья» ☀️ Постоянка, нормальные деньги.\nПиши «${w}» в директ.`,
  ] },
  'копирайт': { emoji: '✍️', baits: (w) => [
    `Копирайтеры с цепляющими текстами — сюда ✍️ Нужен на потоковые офферы и креативы. Без штампов и «динамично развивающейся компании».\nСлово «${w}» в директ.`,
    `Тредс, ищу копирайтера, у которого крючки в крови 🪝 Реклама, лиды, продающие связки.\nПиши «${w}» — пришлю тестовое.`,
  ] },
  'motion': { emoji: '🎞️', baits: (w) => [
    `Моушн-дизайнеры, вы где 🎞️ Нужен на динамичные креативы и интро — анимация, которая продаёт.\nКодовое «${w}» в директ, покажу референсы.`,
    `Тредс, найди моушнера, который оживит статику 🔥 Потоковые задачи, команда, деньги вовремя.\nПиши «${w}» в директ.`,
  ] },
  'куратор': { emoji: '🎓', baits: (w) => [
    `Кураторы онлайн-школ, ау 🎓 Ищу того, кто доводит учеников до результата, а не просто «отметился». Постоянка, тёплая команда.\nСлово «${w}» в директ.`,
    `Тредс, нужен куратор с эмпатией и системностью — поддержка учеников, чаты, дисциплина.\nПиши «${w}» в директ, расскажу.`,
  ] },
  'ассистент': { emoji: '🤝', baits: (w) => [
    `Тредсс, найди ассистента с шилом в попе 🤝 Нужен с насмотренностью: нейронки, эксель, отличить г-дизайн от не г, собрать хаос в порядок.\nПиши «${w}» в директ.`,
    `Бизнес-ассистент, ты тут? Занятость 5/2 (для начала 3 часа в день). Ответственность, быть на связи, любовь к делу.\nКодовое «${w}» в директ 🤝`,
  ] },
};
const GENERIC_ROLE: Role = { emoji: '✨', baits: (w) => [
  `Тредс, найди мне толкового спеца 🙏 Беру в команду на постоянку — с насмотренностью и горящими глазами. Скинь другу, если в поисках 👀\nПиши «${w}» в директ.`,
  `Эй, кто шарит — вы тут?????? Отзовитесь!!! 🔥 Потоковые задачи, плачу вовремя, без бюрократии.\nКодовое «${w}» в директ — пришлю детали.`,
] };
function roleFor(kw: string): Role {
  const k = kw.trim().toLowerCase();
  for (const key of Object.keys(ROLE_MAP)) if (k.includes(key)) return ROLE_MAP[key];
  return GENERIC_ROLE;
}
export function Sandbox() {
  const presets = ['монтаж', 'таргет', 'python', 'дизайн', 'SMM', 'копирайт'];
  const [kw, setKw] = useState('монтаж');
  const [v, setV] = useState(0);
  const role = roleFor(kw);
  const word = kw.trim() || 'кодовое слово';
  const baits = role.baits(word);
  const replies = [
    'Огонь, что откликнулся! 🙌 Лови короткий бриф и тестовое — глянь и скажи, берёшься?',
    'Кайф! Держи детали и мини-тест 👇 если ок — двигаемся дальше 🚀',
    'Спасибо за отклик! Вот условия и тестовое на пару часов. Жду решение 🔥',
  ];
  const bait = baits[v % baits.length];
  const reply = replies[v % replies.length];
  return (
    <section id="sandbox" className="border-t border-line bg-panel/30">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <Reveal className="text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">попробуй сам</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Введи кодовое слово — увидишь, что напишет ИИ</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">Так Threadhunt сам генерит пост-приманку и ответ в директе под любую роль.</p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-10 max-w-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={kw}
              onChange={(e) => { setKw(e.target.value); setV(0); }}
              placeholder="напр. монтаж, таргет, python…"
              className="w-full flex-1 rounded-full border border-line bg-panel px-5 py-3 text-sm outline-none transition-colors focus:border-accent"
            />
            <button
              onClick={() => setV((x) => x + 1)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent lp-btn-grad px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press"
            >
              Сгенерировать ещё <RefreshCw size={15} />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => { setKw(p); setV(0); }}
                className={cn('rounded-full border px-3 py-1 font-mono text-xs transition-colors', kw === p ? 'border-accent/50 bg-accent-soft text-accent-ink' : 'border-line bg-panel text-muted hover:text-text')}
              >
                {p}
              </button>
            ))}
          </div>

          <div key={`${kw}-${v}`} className="lp-rise mt-7 space-y-3">
            {/* пост-приманка */}
            <div className="overflow-hidden rounded-2xl border border-line bg-panel p-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent-ink">TH</span>
                <div className="text-sm font-medium">@your.studio</div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] text-accent-ink"><Sparkles size={11} /> приманка · ИИ</span>
              </div>
              <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed">{highlight(bait, word)}</p>
            </div>
            {/* директ */}
            <div className="overflow-hidden rounded-2xl border border-line bg-panel p-4">
              <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-panel-2 px-3.5 py-2.5 text-sm">
                {highlight(`Привет! ${word} — это про меня, беру 🙌`, word)}
              </div>
              <div className="mt-1.5 flex justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-muted">
                  <Zap size={12} className="text-accent-ink" /> совпало кодовое слово · <span className="text-accent-ink">{word}</span>
                </span>
              </div>
              <div className="mt-2.5 ml-auto max-w-[82%] rounded-2xl rounded-tr-md bg-accent lp-btn-grad px-3.5 py-2.5 text-sm text-on-accent">{reply}</div>
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] text-muted">Это демо-генерация на лету. В кабинете тексты пишет Claude в голосе твоего бренда.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Футер + юридическое (общий для всех вариантов) ─────────────────────── */
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <div className="text-lg"><Wordmark /></div>
          <p className="mt-3 text-sm text-muted">Лента Threads → поток кандидатов. VIP-хедхантинг на автопилоте.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <div className="space-y-2">
            <div className="font-medium">Продукт</div>
            <a href="#demo" className="block text-muted transition-colors hover:text-text">Демо</a>
            <a href="#features" className="block text-muted transition-colors hover:text-text">Возможности</a>
            <a href="#pricing" className="block text-muted transition-colors hover:text-text">Тарифы</a>
            <a href="#referral" className="block text-muted transition-colors hover:text-text">Партнёрам</a>
            <a href="#faq" className="block text-muted transition-colors hover:text-text">Вопросы</a>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Аккаунт</div>
            <a href={LOGIN} className="block text-muted transition-colors hover:text-text">Войти</a>
            <a href={CTA_HREF} className="block text-muted transition-colors hover:text-text">Регистрация</a>
            <a href={TERMS} className="block text-muted transition-colors hover:text-text">Условия</a>
            <a href={PRIVACY} className="block text-muted transition-colors hover:text-text">Конфиденциальность</a>
          </div>
        </div>
      </div>

      {/* юридическая сводка (кратко) */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-6 text-xs leading-relaxed text-muted">
          <span className="text-text">{LEGAL.company}</span> · {LEGAL.form} · VAT {LEGAL.vat} · {LEGAL.address} ·{' '}
          <a href={`mailto:${LEGAL.email}`} className="text-accent-ink hover:underline">{LEGAL.email}</a>
        </div>
      </div>

      {/* дисклеймер */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-6">
          <p className="text-[11px] leading-relaxed text-muted/80">
            Threadhunt — инструмент автоматизации действий пользователя в интерфейсе Threads: отбивка в директе работает
            как эмуляция ручных операций в твоём браузере под твоей собственной сессией. Сервис не аффилирован с Meta
            Platforms, Inc. и Threads, не гарантирует результат и не несёт ответственности за возможные ограничения,
            временные или постоянные блокировки аккаунтов со стороны платформы. Использование автоматизации
            осуществляется тобой самостоятельно и под твою ответственность, с соблюдением правил Threads/Meta и
            применимого законодательства. Встроенные анти-бан механики (задержки, дневные лимиты, рабочее окно) снижают
            риски, но не исключают их.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-5 font-mono text-xs text-muted">© 2026 {LEGAL.company || 'Threadhunt'}</div>
      </div>
    </footer>
  );
}

/* ── Лендинг ───────────────────────────────────────────────────────────── */
export function Landing() {
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

      {/* ── HERO (без изменений) ── */}
      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 lp-grid opacity-60" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[130px] lp-glow" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-accent/[0.06] blur-[100px] lp-float" />
        <div className="pointer-events-none absolute -right-24 top-64 h-72 w-72 rounded-full bg-accent/[0.06] blur-[100px] lp-float-slow" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-16 md:grid-cols-2 md:pb-24 md:pt-24">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5 text-xs text-muted">
                <span className="text-accent-ink">⟋⟋</span> Хедхантинг через Threads на автопилоте
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[1.04] tracking-tight md:text-6xl">
                Лента Threads —<br />
                <span className="lp-gradient-text">поток кандидатов</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-md text-lg text-muted">
                Ставь приманки в ленте. Threadhunt сам отвечает на кодовые слова в директе, ловит отклики и квалифицирует
                кандидатов — пока ты занят делом.
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
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { v: 1248, s: '', label: 'лидов поймано' },
                { v: 92, s: '%', label: 'с ответом' },
                { v: 320, s: '', label: 'постов вышло' },
              ].map((mm) => (
                <div key={mm.label} className="rounded-xl border border-line bg-panel/70 p-3 text-center">
                  <div className="font-display text-2xl font-bold text-accent-ink"><Counter to={mm.v} suffix={mm.s} /></div>
                  <div className="mt-0.5 text-[11px] text-muted">{mm.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-12">
          <div className="mb-3 text-center font-mono text-[11px] uppercase tracking-widest text-muted">ловит по кодовым словам</div>
          <KeywordMarquee />
        </div>
      </section>

      {/* ── ПОЛОСА ДОВЕРИЯ ── */}
      <TrustStrip />

      {/* ── АКЦЕНТ: первый в директе Threads ── */}
      <FirstMover />

      {/* ── ЛИСТ ОЖИДАНИЯ (только пред-запуск) ── */}
      {PRELAUNCH && <Waitlist />}

      {/* ── ВИДЕО ── */}
      <VideoShowcase />

      {/* ── ДЕМО КАБИНЕТА ── */}
      <section id="demo" className="border-t border-line bg-panel/30">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <Reveal>
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-widest text-accent-ink">загляни внутрь</div>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Демо кабинета — пройдись и посмотри</h2>
              <p className="mt-3 text-muted">Переключай вкладки и смотри, как устроены поиски с уникальными ссылками, CRM-воронка и генератор онбординга. Кнопки в демо отключены — включишь всё в своём кабинете.</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10"><DemoConsole /></Reveal>
        </div>
      </section>

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

      {/* ── ФИНАЛЬНЫЙ CTA ── */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="pointer-events-none absolute inset-x-0 -bottom-24 mx-auto h-72 w-[820px] rounded-full bg-accent/[0.08] blur-[120px] lp-glow" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Запусти найм за пару минут</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">Создай первый поиск, поставь расширение и лови первых кандидатов уже сегодня. Free — навсегда, карта не нужна.</p>
            <div className="mt-8 flex justify-center">
              <a href={CTA_HREF} className="inline-flex items-center gap-2 rounded-full bg-accent lp-btn-grad px-7 py-3.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press">
                Начать бесплатно <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ФУТЕР + ЮРИДИЧЕСКОЕ ── */}
      <SiteFooter />

      {/* ── ПРИЛИПАЮЩИЙ CTA (мобайл) ── */}
      <StickyCta href={CTA_HREF} label={CTA_LABEL} />
    </div>
  );
}
