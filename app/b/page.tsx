import type { Metadata } from 'next';
import { LandingB } from '@/components/LandingB';

// Вариант B для A/B-теста. noindex — чтобы поисковики не считали дублем основной страницы.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HomePageB() {
  return <LandingB />;
}
