// Funções puras: recebem valores, retornam resultados e não alteram a interface.
export function parseAmount(value) {
  if ((typeof value !== 'string' && typeof value !== 'number') || String(value).trim() === '') throw new Error('validation.amount');
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount < 0) throw new Error('validation.amount');
  return amount;
}

export function convertAmount(value, rate) {
  const amount = parseAmount(value);
  if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) throw new Error('validation.result');
  const result = amount * rate;
  if (!Number.isFinite(result)) throw new Error('validation.result');
  return result; // Arredondamento somente na apresentação.
}

export function percentageChange(first, last) {
  if (!Number.isFinite(first) || first <= 0 || !Number.isFinite(last) || last <= 0) return null;
  const result = (last / first - 1) * 100;
  return Number.isFinite(result) ? result : null;
}
