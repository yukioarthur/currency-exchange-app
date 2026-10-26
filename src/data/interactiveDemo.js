// Taxas e série inventadas exclusivamente para praticar eventos/estado.
export const demoDate = '2026-10-22';
export const brlRates = { EUR: 6.2, BRL: 1, USD: 5.58, GBP: 7.13 };
export const demoHistory = [
  ['2016-10-22', .76], ['2021-10-22', .87], ['2025-10-22', .92],
  ['2026-04-22', .94], ['2026-07-22', .96], ['2026-09-23', .975],
  ['2026-10-08', .98], ['2026-10-16', 6.10 / 6.2],
  ['2026-10-19', 6.14 / 6.2], ['2026-10-20', 6.18 / 6.2],
  ['2026-10-21', 6.19 / 6.2], ['2026-10-22', 1],
];
// Limites fixos desta demonstração. Períodos relativos à data real virão nos utilitários.
export const periodStarts = {
  '7d': '2026-10-16', '15d': '2026-10-08', '30d': '2026-09-23',
  '3m': '2026-07-22', '6m': '2026-04-22', '1y': '2025-10-22',
  '5y': '2021-10-22', '10y': '2016-10-22',
};
export function demoRate(code, factor = 1) {
  const sensitivity = { EUR: 1, USD: .7, GBP: 1.2, BRL: 0 };
  return brlRates[code] * (1 + (factor - 1) * sensitivity[code]);
}
