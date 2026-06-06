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
        {/* Применяем тему до первой отрисовки — без мигания.
            Вариант /d: фиолетовый акцент (.theme-violet) + светлая тема по умолчанию
            (если пользователь явно не выбрал тёмную). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('th_theme');var p=location.pathname;var isD=(p==='/d'||p==='/d/'||p.indexOf('/d/')===0);if(isD)document.documentElement.classList.add('theme-violet');if(isD||t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
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
