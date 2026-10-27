import { useCallback } from 'react';
import { getHistory } from '../services/frankfurter.js';
import { localDate, periodRange } from '../utils/dates.js';
import { useRequest } from './useRequest.js';
export function useHistory(base, quote, period, enabled) {
  const range = periodRange(period, localDate());
  const { from, to } = range;
  const load = useCallback((signal) => getHistory(base, quote, from, to, fetch, signal), [base, quote, from, to]);
  const request = useRequest(JSON.stringify([base, quote, from, to]), load, enabled);
  const rows = request.data ?? [];
  return { ...request, rows, range: enabled ? range : null, status: request.status === 'success' && !rows.length ? 'empty' : request.status };
}
