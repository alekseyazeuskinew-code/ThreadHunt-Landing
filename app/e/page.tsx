import type { Metadata } from 'next';
import { LandingE } from '@/components/LandingE';

// Вариант E — лендинг с hero-позиционированием категории (Threads = канал найма №1,
// первые кто автоматизирует весь путь + аналитика). noindex. source=landing-e.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HomePageE() {
  return <LandingE />;
}
