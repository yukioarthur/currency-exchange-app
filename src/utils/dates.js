// ISO YYYY-MM-DD é tratado como data de calendário, sem deslocamento de fuso.
export function parseDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('validation.range');
  const date = new Date(value + 'T00:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error('validation.range');
  return date;
}

export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function periodRange(period, end) {
  const date = parseDate(end);
  const days = { '7d': 7, '15d': 15, '30d': 30 };
  const months = { '3m': 3, '6m': 6, '1y': 12, '5y': 60, '10y': 120 };
  if (Object.hasOwn(days, period)) {
    date.setUTCDate(date.getUTCDate() - (days[period] - 1));
  } else if (Object.hasOwn(months, period)) {
    const day = date.getUTCDate();
    date.setUTCDate(1);
    date.setUTCMonth(date.getUTCMonth() - months[period]);
    const lastDay = new Date(date.getTime());
    lastDay.setUTCMonth(lastDay.getUTCMonth() + 1, 0);
    date.setUTCDate(Math.min(day, lastDay.getUTCDate()));
  } else throw new Error('validation.range');
  return { from: date.toISOString().slice(0, 10), to: end };
}
