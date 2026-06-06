// Режим сайта и настройки листа ожидания.

// false = пред-запуск (лист ожидания вместо регистрации), true = боевой режим.
export const LAUNCHED = false;

// Куда отправлять заявки листа ожидания:
//  — URL API дашборда → заявки появятся в АДМИНКЕ сервиса, напр. 'https://api.threadhunt.app/api/waitlist'
//    (на сервере добавь домен лендинга в EXTRA_ORIGINS для CORS);
//  — пусто '' → Netlify Forms (если хостишь на Netlify, заявки придут на почту);
//  — либо URL Formspree/Getform/Tally.
export const WAITLIST_ENDPOINT = 'https://threadhuntserver-production.up.railway.app/api/waitlist';

// Аналитика. Plausible — приватная (без личных данных), грузится только после
// согласия на cookie. Пусто → выключена.
export const ANALYTICS = {
  plausibleDomain: '', // напр. 'threadhunt.app'
};

// Пиксель Meta (Facebook). Вставь ID из Events Manager. Пусто → выключен.
export const META_PIXEL_ID = '1540456520862287';
// true  = грузить пиксель только после согласия на cookie (GDPR — строже);
// false = грузить сразу для всех (максимум данных для рекламы; баннер остаётся уведомлением).
export const META_PIXEL_REQUIRE_CONSENT = false;

// Куда вести после заявки (Telegram-бот). Пусто → без редиректа, просто экран успеха.
export const TELEGRAM_BOT_URL = ''; // напр. 'https://t.me/threadhunt_bot'

// Промо для самых первых.
export const PROMO = {
  code: 'EARLY50',
  benefit: '−50% на первые 2 месяца',
  limit: 'первым 100 участникам',
  spotsTaken: 47, // занято мест по промокоду (для скарсити-прогресса)
  spotsTotal: 100,
};
