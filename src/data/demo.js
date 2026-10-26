// Dados fictives de aprendizagem; nenhuma consulta à API nesta etapa.
export const currencies = [
  { code: 'EUR', name: 'Euro' },
  { code: 'BRL', name: 'Real brasileiro' },
  { code: 'USD', name: 'Dólar americano' },
  { code: 'GBP', name: 'Libra esterlina' },
];

export const conversion = { amount: 100, base: 'EUR', quote: 'BRL', rate: 6.2, date: '2026-10-22' };
export const periods = [
  { id: '7d', label: '7 dias' }, { id: '15d', label: '15 dias' },
  { id: '30d', label: '30 dias' }, { id: '3m', label: '3 meses' },
  { id: '6m', label: '6 meses' }, { id: '1y', label: '1 ano' },
  { id: '5y', label: '5 anos' }, { id: '10y', label: '10 anos' },
];
export const history = [
  { date: '2026-10-16', rate: 6.10 },
  { date: '2026-10-19', rate: 6.14 },
  { date: '2026-10-20', rate: 6.18 },
  { date: '2026-10-21', rate: 6.19 },
  { date: '2026-10-22', rate: 6.20 },
];
