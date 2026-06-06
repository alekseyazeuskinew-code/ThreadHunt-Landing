// Экспорт durable-заявок из Netlify Blobs для синхронизации в нашу БД.
// Вызывает наш сервер (админ-кнопка «Синхронизировать») с секретом в ?token=.
// Env (Netlify): LEADS_SYNC_SECRET — общий секрет с сервером (Railway).
import { getStore } from '@netlify/blobs';

export default async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const SECRET = process.env.LEADS_SYNC_SECRET;
  if (!SECRET || token !== SECRET) return new Response('forbidden', { status: 403 });

  const store = getStore('waitlist-leads');
  const leads = [];
  try {
    const { blobs } = await store.list();
    for (const b of blobs) {
      const v = await store.get(b.key, { type: 'json' });
      if (v && v.email) leads.push({ key: b.key, ...v });
    }
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }

  // Заявки идемпотентны на стороне сервера (upsert по email), поэтому Blobs не
  // чистим — повторная синхронизация безопасна и ничего не теряет.
  return Response.json({ leads });
};
