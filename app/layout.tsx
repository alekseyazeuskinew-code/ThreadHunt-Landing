import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { CopyGuard } from '@/components/CopyGuard';
import { CookieConsent } from '@/components/CookieConsent';
import { Analytics } from '@/components/Analytics';
import { MetaPixel } from '@/components/MetaPixel';
import { LAUNCHED } from '@/lib/config';

const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });
const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  // Боевой домен лендинга (для абсолютных URL OG-картинки).
  metadataBase: new URL('https://thread-hunt.com'),
  title: 'Threadhunt — наём через Threads на автопилоте',
  description:
    'Ставь приманки в ленте Threads — Threadhunt сам отвечает на кодовые слова в директе, ловит отклики и ведёт кандидатов в CRM. Без Meta API, прямо в твоём браузере.',
  openGraph: {
    title: 'Threadhunt — наём через Threads на автопилоте',
    description: 'Лента Threads → поток кандидатов. Авто-постинг приманок, авто-отбивка в директе и CRM-воронка найма.',
    type: 'website',
  },
  // На период пред-запуска прячем сайт от поисковиков (защита идеи).
  robots: LAUNCHED ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${space.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        {/* Тема строго по маршруту, до первой отрисовки (без мигания):
            / (главная, вариант A) и /d — фиолетовый акцент + светлая тема по умолчанию.
            На главной сохранённый выбор уважаем (есть переключатель), на /d — форсим светлую.
            Варианты /b /c /e остаются тёмными с лаймом, чтобы /d-светлая не «протекала». */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname;var el=document.documentElement;var t=null;try{t=localStorage.getItem('th_theme');}catch(e){}var isD=(p==='/d'||p==='/d/'||p.indexOf('/d/')===0);var isHome=(p==='/'||p==='');if(isD){el.classList.add('theme-violet');el.setAttribute('data-theme','light');}else if(isHome){el.classList.add('theme-violet');if(t==='dark'){el.removeAttribute('data-theme');}else{el.setAttribute('data-theme','light');}}else{el.removeAttribute('data-theme');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <CopyGuard />
        {children}
        <CookieConsent />
        <Analytics />
        <MetaPixel />
      </body>
    </html>
  );
}
