import type { Metadata, Viewport } from 'next';
import { LandingC } from '@/components/LandingC';

// Вариант D — тот же лендинг, что C (5 шагов), но ФИОЛЕТОВЫЙ акцент (A/B-тест цвета).
// .theme-violet переопределяет переменные акцента для всего поддерева. source=landing-d.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// /d открывается в светлой теме → строка браузера на мобиле тоже светлая (фон --bg light).
export const viewport: Viewport = {
  themeColor: '#FAFAF7',
};

export default function HomePageD() {
  return (
    <div className="theme-violet">
      <LandingC source="landing-d" />
    </div>
  );
}
