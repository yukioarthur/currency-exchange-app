import { parseDate } from '../utils/dates.js';
const BASE_URL = 'https://api.frankfurter.dev/v2';
export class ApiError extends Error {
  constructor(code, status = null) { super(code); this.name = 'ApiError'; this.status = status; }
}
async function request(path, fetcher) {
  let response;
  try {
    response = await fetcher(BASE_URL + path, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
  } catch (error) {
    throw new ApiError(error.name === 'TimeoutError' || error.name === 'AbortError' ? 'api.timeout' : 'api.network');
  }
  if (!response.ok) throw new ApiError(response.status === 404 ? 'api.notFound' : response.status === 429 ? 'api.rateLimit' : 'api.http', response.status);
  try { return await response.json(); } catch { throw new ApiError('api.invalid'); }
}
function assertPair(base, quote) {
  if (!/^[A-Z]{3}$/.test(base) || !/^[A-Z]{3}$/.test(quote) || base === quote) throw new ApiError('validation.currencies');
}
function validRow(row, base, quote) {
  if (!row || row.base !== base || row.quote !== quote || typeof row.rate !== 'number' || !Number.isFinite(row.rate) || row.rate <= 0) throw new ApiError('api.invalid');
  try { parseDate(row.date); } catch { throw new ApiError('api.invalid'); }
  return { date: row.date, base, quote, rate: row.rate };
}
export async function getCurrencies(fetcher = fetch) {
  const data = await request('/currencies', fetcher);
  if (!Array.isArray(data) || !data.length) throw new ApiError('api.invalid');
  const codes = new Set();
  const currencies = data.map((row) => {
    if (!row || !/^[A-Z]{3}$/.test(row.iso_code) || typeof row.name !== 'string' || !row.name.trim() || codes.has(row.iso_code)) throw new ApiError('api.invalid');
    codes.add(row.iso_code);
    return { code: row.iso_code, name: row.name };
  });
  if (!codes.has('EUR') || !codes.has('BRL')) throw new ApiError('api.invalid');
  return currencies.sort((a, b) => a.code.localeCompare(b.code));
}
export async function getRate(base, quote, fetcher = fetch) {
  assertPair(base, quote);
  return validRow(await request('/rate/' + base + '/' + quote, fetcher), base, quote);
}
export async function getHistory(base, quote, from, to, fetcher = fetch) {
  assertPair(base, quote);
  parseDate(from); parseDate(to);
  if (from > to) throw new ApiError('validation.range');
  const query = new URLSearchParams({ base, quotes: quote, from, to });
  const data = await request('/rates?' + query, fetcher);
  if (!Array.isArray(data)) throw new ApiError('api.invalid');
  const dates = new Set();
  return data.map((row) => {
    const valid = validRow(row, base, quote);
    if (valid.date < from || valid.date > to || dates.has(valid.date)) throw new ApiError('api.invalid');
    dates.add(valid.date);
    return valid;
  }).sort((a, b) => a.date.localeCompare(b.date));
}
