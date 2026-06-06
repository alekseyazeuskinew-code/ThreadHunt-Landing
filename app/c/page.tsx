import type { Metadata } from 'next';
import { LandingC } from '@/components/LandingC';

// Вариант C для A/B/C-теста. noindex — чтобы поисковики не считали дублем основной страницы.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HomePageC() {
  return <LandingC />;
}
