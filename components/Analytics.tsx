'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { ANALYTICS } from '@/lib/config';

// Подключает Plausible только после согласия на аналитические cookie.
// Слушает событие 'th-consent' — чтобы включиться сразу после «Принять все».
export function Analytics() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const check = () => {
      try {
        setOk(localStorage.getItem('th_cookie') === 'all');
      } catch {}
    };
    check();
    window.addEventListener('th-consent', check);
    return () => window.removeEventListener('th-consent', check);
  }, []);

  if (!ok || !ANALYTICS.plausibleDomain) return null;

  return (
    <>
      <Script
        defer
        data-domain={ANALYTICS.plausibleDomain}
        src="https://plausible.io/js/script.tagged-events.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
    </>
  );
}

// Хелпер для событий (безопасен, если аналитика выключена).
export function track(event: string, props?: Record<string, string>) {
  try {
    (window as any).plausible?.(event, props ? { props } : undefined);
  } catch {}
}
