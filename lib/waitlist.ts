// Общая отправка заявки в лист ожидания — чтобы разные точки входа (основная
// форма, exit-intent поп-ап) слали заявки одинаково: тот же endpoint, те же
// UTM-метки и то же серверное событие Meta CAPI. Возвращает eventId для дедупа
// браузерного и серверного событий Lead.
import { WAITLIST_ENDPOINT } from '@/lib/config';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export async function submitWaitlist({
  name = '',
  email,
  source,
}: {
  name?: string;
  email: string;
  source: string;
}): Promise<string> {
  const body = new URLSearchParams({ 'form-name': 'waitlist', name, email, source });
  // UTM-метки рекламы из ссылки → в заявку.
  try {
    const q = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']) {
      const v = q.get(k);
      if (v) body.set(k, v);
    }
  } catch {}

  if (WAITLIST_ENDPOINT) {
    await fetch(WAITLIST_ENDPOINT, { method: 'POST', mode: 'no-cors', body });
  } else {
    await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  }

  const eventId =
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead-${Date.now()}`;

  // Серверное событие через Netlify-функцию (если задеплоена с функциями).
  try {
    fetch('/.netlify/functions/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        source,
        eventId,
        url: typeof location !== 'undefined' ? location.href : '',
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
      }),
    }).catch(() => {});
  } catch {}

  return eventId;
}
