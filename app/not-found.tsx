import Link from 'next/link';
import { Wordmark } from '@/components/Wordmark';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="pointer-events-none absolute inset-0 lp-grid opacity-50" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px] lp-glow" />
      <div className="relative">
        <div className="text-xl"><Wordmark /></div>
        <div className="mt-10 font-display text-7xl font-bold tracking-tight md:text-9xl">404</div>
        <h1 className="mt-4 font-display text-2xl font-semibold">Страница потерялась в ленте</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">Такой страницы нет или её ещё не опубликовали. Вернись на главную — там весь поток.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-press"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
