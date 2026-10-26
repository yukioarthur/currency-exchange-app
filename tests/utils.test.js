import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAmount, convertAmount, percentageChange } from '../src/utils/currency.js';
import { periodRange, parseDate, localDate } from '../src/utils/dates.js';
import { filterHistory, sortHistory } from '../src/utils/history.js';
import { formatDate, formatMoney, formatNumber } from '../src/utils/format.js';

test('Conversão aceita zero e preserva precisão antes de formatar', () => {
  assert.equal(convertAmount('100', 2), 200);
  assert.equal(convertAmount(0, 2), 0);
  assert.equal(convertAmount(1, 1.234567), 1.234567);
});
test('Entradas vazias, negativas e não numéricas são rejeitadas', () => {
  for (const value of ['', ' ', -1, 'abc', Infinity, NaN, null, false, []]) assert.throws(() => parseAmount(value), /validation.amount/);
});
test('Taxas inválidas e overflow são rejeitados', () => {
  for (const rate of [0, -1, Infinity, NaN, '2']) assert.throws(() => convertAmount(1, rate));
  assert.throws(() => convertAmount(Number.MAX_VALUE, 2), /validation.result/);
});
test('Valorização e desvalorização usam a primeira taxa como referência', () => {
  assert.equal(percentageChange(2, 3), 50);
  assert.equal(percentageChange(4, 3), -25);
  assert.equal(percentageChange(0, 3), null);
});
test('Períodos em dias contam ambos os limites e cruzam o ano', () => {
  assert.deepEqual(periodRange('7d', '2026-01-03'), { from: '2025-12-28', to: '2026-01-03' });
  assert.equal(periodRange('15d', '2026-10-26').from, '2026-10-12');
  assert.equal(periodRange('30d', '2026-10-26').from, '2026-09-27');
});
test('Meses e anos ajustam datas inexistentes e ano bissexto', () => {
  assert.equal(periodRange('3m', '2026-05-31').from, '2026-02-28');
  assert.equal(periodRange('6m', '2024-08-31').from, '2024-02-29');
  assert.equal(periodRange('1y', '2024-02-29').from, '2023-02-28');
  assert.equal(periodRange('5y', '2026-10-26').from, '2021-10-26');
  assert.equal(periodRange('10y', '2026-10-26').from, '2016-10-26');
});
test('Datas inválidas e períodos desconhecidos falham explicitamente', () => {
  for (const date of ['2026-02-30', '26/10/2026', '2026-13-01', '']) assert.throws(() => parseDate(date));
  assert.throws(() => periodRange('week', '2026-10-26'));
  assert.equal(localDate(new Date(2026, 9, 26, 23)), '2026-10-26');
});
const rows = Object.freeze([
  Object.freeze({date:'2026-10-20',rate:2}), Object.freeze({date:'2026-10-21',rate:3}), Object.freeze({date:'2026-10-22',rate:2}),
]);
test('Filtros combinados são inclusivos e não alteram a lista original', () => {
  assert.deepEqual(filterHistory(rows, {from:'2026-10-21',to:'2026-10-22',min:2,max:2}), [rows[2]]);
  assert.deepEqual(filterHistory(rows, {min:' ',max:''}), rows);
  assert.deepEqual(filterHistory(rows, {min:4}), []);
});
test('Limites invertidos e não finitos são rejeitados', () => {
  for (const filters of [{min:3,max:2},{from:'2026-10-22',to:'2026-10-20'},{min:'abc'},{max:Infinity},{from:'2026-02-30'}]) assert.throws(() => filterHistory(rows, filters));
});
test('Ordenações preservam original e desempate por data', () => {
  assert.deepEqual(sortHistory(rows,'dateDesc'), [rows[2],rows[1],rows[0]]);
  assert.deepEqual(sortHistory(rows,'rateAsc'), [rows[0],rows[2],rows[1]]);
  assert.deepEqual(sortHistory(rows,'rateDesc'), [rows[1],rows[0],rows[2]]);
  assert.deepEqual(sortHistory(rows,'dateAsc'), rows);
  assert.deepEqual(sortHistory([], 'dateAsc'), []);
  assert.throws(() => sortHistory(rows,'unknown'));
});
test('Localização altera apresentação sem mudar a data nem o número', () => {
  assert.equal(formatDate('2026-10-26','pt-BR'), '26/10/2026');
  assert.equal(formatDate('2026-10-26','en-US'), '10/26/2026');
  assert.equal(formatNumber(6.2,'pt-BR'), '6,2000');
  assert.equal(formatNumber(6.2,'en-US'), '6.2000');
  assert.match(formatMoney(620,'BRL','pt-BR'), /620,00/);
});
