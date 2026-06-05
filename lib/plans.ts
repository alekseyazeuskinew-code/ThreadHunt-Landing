// Тарифы и валюты лендинга (зеркало логики кабинета). Реальную оплату подключит Stripe.

export type Currency = 'RUB' | 'USD' | 'EUR' | 'KZT' | 'AED' | 'UAH';

export const CURRENCIES: { code: Currency; symbol: string; label: string }[] = [
  { code: 'RUB', symbol: '₽', label: '₽ RUB' },
  { code: 'USD', symbol: '$', label: '$ USD' },
  { code: 'EUR', symbol: '€', label: '€ EUR' },
  { code: 'KZT', symbol: '₸', label: '₸ KZT' },
  { code: 'AED', symbol: 'AED', label: 'AED' },
  { code: 'UAH', symbol: '₴', label: '₴ UAH' },
];

export interface Plan {
  key: 'FREE' | 'PRO' | 'VIP';
  name: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
  prices: Record<Currency, { monthly: number; annual: number }>;
}

export const PLANS: Plan[] = [
  {
    key: 'FREE',
    name: 'Free',
    tagline: 'Попробовать',
    features: ['1 поиск', 'Отбивка вручную', 'Без ИИ-генерации', '1 Threads-аккаунт'],
    prices: {
      RUB: { monthly: 0, annual: 0 }, USD: { monthly: 0, annual: 0 }, EUR: { monthly: 0, annual: 0 },
      KZT: { monthly: 0, annual: 0 }, AED: { monthly: 0, annual: 0 }, UAH: { monthly: 0, annual: 0 },
    },
  },
  {
    key: 'PRO',
    name: 'Pro',
    tagline: 'Для соло и небольших команд',
    features: ['10 поисков', 'Автопостинг по расписанию', 'ИИ-генерация постов и отбивки', 'Отбивка в директе', 'до 5 постов/день'],
    prices: {
      RUB: { monthly: 1490, annual: 14900 }, USD: { monthly: 19, annual: 190 }, EUR: { monthly: 18, annual: 180 },
      KZT: { monthly: 8990, annual: 89900 }, AED: { monthly: 69, annual: 690 }, UAH: { monthly: 790, annual: 7900 },
    },
  },
  {
    key: 'VIP',
    name: 'VIP',
    tagline: 'Для агентств и активного найма',
    features: ['Безлимит поисков', 'Несколько Threads-аккаунтов', 'Приоритетная отбивка', 'Отбивка в комментариях', 'до 15 постов/день', 'Поддержка 24/7'],
    highlight: true,
    prices: {
      RUB: { monthly: 4900, annual: 49000 }, USD: { monthly: 59, annual: 590 }, EUR: { monthly: 55, annual: 550 },
      KZT: { monthly: 28900, annual: 289000 }, AED: { monthly: 219, annual: 2190 }, UAH: { monthly: 2490, annual: 24900 },
    },
  },
];

export const CUR_SYMBOL: Record<Currency, string> = { RUB: '₽', USD: '$', EUR: '€', KZT: '₸', AED: 'AED', UAH: '₴' };

export function formatPrice(amount: number, c: Currency): string {
  if (c === 'RUB') return `${amount.toLocaleString('ru-RU')} ₽`;
  if (c === 'KZT') return `${amount.toLocaleString('ru-RU')} ₸`;
  if (c === 'UAH') return `${amount.toLocaleString('ru-RU')} ₴`;
  if (c === 'AED') return `${amount.toLocaleString('en-US')} AED`;
  return `${CUR_SYMBOL[c]}${amount.toLocaleString('en-US')}`;
}

export const monthlyOf = (p: Plan, c: Currency, annual: boolean) => (annual ? Math.round(p.prices[c].annual / 12) : p.prices[c].monthly);
export const annualOf = (p: Plan, c: Currency) => p.prices[c].annual;
export const savingsPctOf = (p: Plan, c: Currency) =>
  p.prices[c].monthly ? Math.round(((p.prices[c].monthly * 12 - p.prices[c].annual) / (p.prices[c].monthly * 12)) * 100) : 0;
