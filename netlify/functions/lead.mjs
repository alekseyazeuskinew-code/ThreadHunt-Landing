// Conversions API (серверное событие Lead) для Meta.
// Токен и Pixel ID берутся ТОЛЬКО из переменных окружения Netlify:
//   META_PIXEL_ID, META_CAPI_TOKEN  (НЕ хардкодить в коде).
import crypto from 'node:crypto';

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
const norm = (s) => (s || '').trim().toLowerCase();

export default async (req, context) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const PIXEL = process.env.META_PIXEL_ID;
  const TOKEN = process.env.META_CAPI_TOKEN;
  if (!PIXEL || !TOKEN) return Response.json({ error: 'not configured' }, { status: 500 });

  let body = {};
  try { body = await req.json(); } catch {}
  const email = norm(body.email);
  if (!email) return Response.json({ error: 'no email' }, { status: 400 });

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
