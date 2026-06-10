import type { Viewport } from 'next';
import { Landing } from '@/components/Landing';

// Главная (вариант A) теперь в фиолетовом акценте (.theme-violet) и светлой теме
// по умолчанию — как вариант /d. Открывается светлой → строка браузера на мобиле светлая.
export const viewport: Viewport = {
  themeColor: '#FAFAF7',
};

export default function HomePage() {
  return (
    <div className="theme-violet">
      <Landing />
    </div>
  );
}
