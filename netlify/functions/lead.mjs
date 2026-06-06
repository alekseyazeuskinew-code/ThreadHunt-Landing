// Conversions API (серверное событие Lead) для Meta + DURABLE-капча заявки в
// Netlify Blobs. Blobs не зависят от нашего бэкенда (Railway) — поэтому заявка НЕ
// теряется, даже если сервер/БД лежат. Потом админка тянет их кнопкой «Синхронизировать».
// Env (Netlify): META_PIXEL_ID, META_CAPI_TOKEN (для Meta). Blobs доступны автоматически.
import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
const norm = (s) => (s || '').trim().toLowerCase();

export default async (req, context) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let body = {};
  try { body = await req.json(); } catch {}
  const email = norm(body.email);
  if (!email) return Response.json({ error: 'no email' }, { status: 400 });

  // 1) DURABLE: сохраняем заявку в Blobs СРАЗУ (не зависит от Meta/Railway).
  try {
    const store = getStore('waitlist-leads');
    const key = `${Date.now()}-${email}`;
    await store.setJSON(key, {
      email,
      name: body.name || null,
      source: body.source || 'landing',
      url: body.url || null,
      ts: new Date().toISOString(),
    });
  } catch (e) {
    // не критично для пользователя — основной путь всё равно идёт в наш API
    console.error('blobs save failed', String(e));
  }

  // 2) Meta CAPI — только если настроено (иначе тихо пропускаем, заявка уже в Blobs).
  const PIXEL = process.env.META_PIXEL_ID;
  const TOKEN = process.env.META_CAPI_TOKEN;
  if (!PIXEL || !TOKEN) return Response.json({ ok: true, captured: true, meta: 'skipped' });

  const ip =
    context?.ip ||
    req.headers.get('x-nf-client-connection-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    undefined;
  const ua = req.headers.get('user-agent') || undefined;

  const event = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.eventId || undefined, // дедуп с браузерным пикселем
    action_source: 'website',
    event_source_url: body.url || undefined,
    user_data: {
      em: [sha256(email)],
      ...(body.name ? { fn: [sha256(norm(body.name))] } : {}),
      ...(ip ? { client_ip_address: ip } : {}),
      ...(ua ? { client_user_agent: ua } : {}),
      ...(body.fbp ? { fbp: body.fbp } : {}),
      ...(body.fbc ? { fbc: body.fbc } : {}),
    },
    custom_data: { content_name: 'Waitlist', source: body.source || 'landing' },
  };

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${PIXEL}/events?access_token=${TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [event] }),
    });
    const json = await res.json();
    return Response.json(json, { status: res.ok ? 200 : 502 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 502 });
  }
};
