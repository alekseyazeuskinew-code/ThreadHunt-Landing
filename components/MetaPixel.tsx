'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { META_PIXEL_ID, META_PIXEL_REQUIRE_CONSENT } from '@/lib/config';

// Пиксель Meta. По умолчанию грузится после согласия на cookie (слушает 'th-consent').
// Базовое событие — PageView. Конверсию формы шлём через trackLead() из формы.
export function MetaPixel() {
  const [ok, setOk] = useState(!META_PIXEL_REQUIRE_CONSENT);
  useEffect(() => {
    if (!META_PIXEL_REQUIRE_CONSENT) return;
    const check = () => {
      try {
        setOk(localStorage.getItem('th_cookie') === 'all');
      } catch {}
    };
    check();
    window.addEventListener('th-consent', check);
    return () => window.removeEventListener('th-consent', check);
  }, []);

  if (!ok || !META_PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Событие конверсии «Lead» — вызывать при успешной отправке формы.
// eventID — общий с серверным CAPI-событием, чтобы Meta не задвоила.
export function trackLead(data?: Record<string, unknown>, eventID?: string) {
  try {
    (window as any).fbq?.('track', 'Lead', data, eventID ? { eventID } : undefined);
  } catch {}
}
