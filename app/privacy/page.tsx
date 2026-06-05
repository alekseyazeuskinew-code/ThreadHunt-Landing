import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';
import { LEGAL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности и cookie — Threadhunt',
  description: 'Как Threadhunt обрабатывает персональные данные и использует cookie.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg"><Wordmark /></Link>
        <Link href="/" className="text-sm text-muted transition-colors hover:text-text">← На главную</Link>
      </div>

      <h1 className="mt-10 font-display text-3xl font-bold tracking-tight md:text-4xl">Конфиденциальность и cookie</h1>
      <p className="mt-3 text-sm text-muted">Действует с 2026 года. Документ описывает обработку персональных данных и использование cookie на сайте и в сервисе Threadhunt.</p>

      <Section title="1. Оператор данных">
        <p>
          Оператором персональных данных является {LEGAL.company} ({LEGAL.form}), {LEGAL.address}.
          VAT / P.IVA: {LEGAL.vat}, Codice Fiscale: {LEGAL.fiscalCode}, {LEGAL.rea}.
          Контакт по вопросам данных: <a href={`mailto:${LEGAL.email}`} className="text-accent-ink hover:underline">{LEGAL.email}</a>.
        </p>
        <p>Обработка данных ведётся в соответствии с Регламентом ЕС 2016/679 (GDPR) и применимым законодательством.</p>
      </Section>

      <Section title="2. Какие данные мы обрабатываем">
        <p>— Учётные данные кабинета: e-mail и пароль (в зашифрованном виде).</p>
        <p>— Рабочие данные сервиса: поиски, шаблоны, кандидаты и переписка, которые ты сам создаёшь в кабинете.</p>
        <p>— Технические данные: IP-адрес, тип устройства и браузера, события использования — для безопасности и улучшения сервиса.</p>
        <p>Мы не запрашиваем и не храним пароль от твоего аккаунта Threads: расширение работает поверх уже открытой тобой сессии.</p>
      </Section>

      <Section title="3. Цели и основания обработки">
        <p>Предоставление сервиса (исполнение договора), безопасность и предотвращение злоупотреблений (законный интерес), исполнение требований закона, а также аналитика на основании твоего согласия.</p>
      </Section>

      <Section title="4. Cookie и аналогичные технологии">
        <p>Сайт использует cookie и аналогичные технологии (localStorage):</p>
        <p>— <span className="text-text">Необходимые</span> — обеспечивают работу сайта, авторизацию и сохранение настроек (например, выбранную тему оформления). Используются всегда и не требуют согласия.</p>
        <p>— <span className="text-text">Аналитические</span> — помогают понять, как используется сайт, и улучшать его. Устанавливаются только с твоего согласия (баннер cookie).</p>
        <p>— <span className="text-text">Функциональные</span> — запоминают твой выбор согласия по cookie.</p>
        <p>Управлять выбором можно через баннер cookie на сайте или в настройках браузера. Отказ от необязательных cookie не влияет на доступ к основным функциям.</p>
      </Section>

      <Section title="5. Передача и хранение">
        <p>Данные хранятся на защищённых серверах; токены подключений шифруются. Мы не продаём персональные данные третьим лицам. Передача возможна только подрядчикам-обработчикам (хостинг, платежи, e-mail) в объёме, необходимом для работы сервиса.</p>
      </Section>

      <Section title="6. Твои права">
        <p>Ты вправе запросить доступ, исправление, удаление или перенос своих данных, ограничить обработку и отозвать согласие. Для этого напиши на <a href={`mailto:${LEGAL.email}`} className="text-accent-ink hover:underline">{LEGAL.email}</a>. Также ты можешь подать жалобу в надзорный орган по защите данных.</p>
      </Section>

      <Section title="7. Отказ от ответственности">
        <p>Threadhunt — инструмент автоматизации действий пользователя в интерфейсе Threads (эмуляция ручных операций в твоём браузере под твоей сессией). Сервис не аффилирован с Meta Platforms, Inc. и Threads и не несёт ответственности за возможные ограничения или блокировки аккаунтов со стороны платформы. Использование автоматизации — на твою ответственность, с соблюдением правил Threads/Meta.</p>
      </Section>

      <div className="mt-12 border-t border-line pt-6 font-mono text-xs text-muted">
        © 2026 {LEGAL.company} · {LEGAL.address}
      </div>
    </div>
  );
}
