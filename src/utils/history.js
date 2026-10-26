import { parseDate } from './dates.js';

function optionalRate(value) {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) return null;
  if (!['number', 'string'].includes(typeof value)) throw new Error('validation.range');
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) throw new Error('validation.range');
  return number;
}

export function filterHistory(rows, filters = {}) {
  const { from = '', to = '' } = filters;
  if (from) parseDate(from);
  if (to) parseDate(to);
  const min = optionalRate(filters.min);
  const max = optionalRate(filters.max);
  if ((from && to && from > to) || (min !== null && max !== null && min > max)) throw new Error('validation.range');
  return rows.filter((row) => (!from || row.date >= from) && (!to || row.date <= to)
    && (min === null || row.rate >= min) && (max === null || row.rate <= max));
}

export function sortHistory(rows, order = 'dateAsc') {
  const compare = {
    dateAsc: (a, b) => a.date.localeCompare(b.date),
    dateDesc: (a, b) => b.date.localeCompare(a.date),
    rateAsc: (a, b) => a.rate - b.rate || a.date.localeCompare(b.date),
    rateDesc: (a, b) => b.rate - a.rate || a.date.localeCompare(b.date),
  };
  if (!Object.hasOwn(compare, order)) throw new Error('Invalid sort order');
  return [...rows].sort(compare[order]);
}
