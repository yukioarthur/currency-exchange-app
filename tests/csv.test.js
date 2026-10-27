import test from 'node:test';
import assert from 'node:assert/strict';
import { historyCsv } from '../src/utils/csv.js';
import { filterHistory, sortHistory } from '../src/utils/history.js';

test('CSV preserva a precisão, os cabeçalhos e a ordem dos registros filtrados', () => {
  const rows = [
    { date: '2026-10-20', rate: 5.123456789 },
    { date: '2026-10-21', rate: 6 },
    { date: '2026-10-22', rate: 7 },
  ];
  const visible = sortHistory(filterHistory(rows, { from: '2026-10-20', to: '2026-10-21', min: '5', max: '6' }), 'dateDesc');
  assert.equal(historyCsv(visible, 'EUR', 'BRL'), '\uFEFF"date","base","quote","rate"\r\n"2026-10-21","EUR","BRL","6"\r\n"2026-10-20","EUR","BRL","5.123456789"\r\n');
  assert.equal(rows[0].date, '2026-10-20');
});
test('CSV recusa exportação vazia e moedas inválidas', () => {
  assert.throws(() => historyCsv([], 'EUR', 'BRL'), /status.empty/);
  assert.throws(() => historyCsv([{ date: '2026-10-20', rate: 1 }], '=CMD', 'BRL'), /validation.currencies/);
});
