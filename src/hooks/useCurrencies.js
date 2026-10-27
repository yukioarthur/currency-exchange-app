import { getCurrencies } from '../services/frankfurter.js';
import { useRequest } from './useRequest.js';
const loadCurrencies = (signal) => getCurrencies(fetch, signal);
export function useCurrencies() {
  const request = useRequest('currencies', loadCurrencies);
  return { ...request, currencies: request.data ?? [] };
}
