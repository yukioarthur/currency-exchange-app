import { parseDate } from './dates.js';
export const formatNumber = (value, locale, digits = 4) => new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
export const formatMoney = (value, currency, locale) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
export const formatDate = (value, locale) => new Intl.DateTimeFormat(locale, { timeZone: 'UTC' }).format(parseDate(value));
