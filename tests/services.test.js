import test from 'node:test';
import assert from 'node:assert/strict';
import { getCurrencies, getRate, getHistory } from '../src/services/frankfurter.js';
const response = (body, status = 200) => async () => new Response(JSON.stringify(body), { status });
const row = { date: '2026-10-26', base: 'EUR', quote: 'BRL', rate: 5.5 };

test('Serviço mapeia moedas e ordena códigos', async () => {
  assert.deepEqual(await getCurrencies(response([{iso_code:'EUR',name:'Euro'},{iso_code:'BRL',name:'Real'}])), [{code:'BRL',name:'Real'},{code:'EUR',name:'Euro'}]);
});
test('Moedas inválidas ou duplicadas são rejeitadas', async () => {
  await assert.rejects(getCurrencies(response([{iso_code:'EUR',name:'Euro'},{iso_code:'EUR',name:'Euro'}])), /api.invalid/);
});
test('Cotação preserva taxa e data retornadas e usa endpoint esperado', async () => {
  const actual = await getRate('EUR','BRL', async (url, options) => {
    assert.equal(url, 'https://api.frankfurter.dev/v2/rate/EUR/BRL');
    assert.equal(options.headers.Accept,'application/json');
    assert.ok(options.signal);
    return new Response(JSON.stringify(row));
  });
  assert.deepEqual(actual,row);
});
test('Histórico ordena, permite vazio e não modifica resposta', async () => {
  const data=[row,{...row,date:'2026-10-25'}];
  assert.equal((await getHistory('EUR','BRL','2026-10-25','2026-10-26',response(data)))[0].date,'2026-10-25');
  assert.equal(data[0].date,'2026-10-26');
  assert.deepEqual(await getHistory('EUR','BRL','2026-10-25','2026-10-26',response([])),[]);
});
test('Rejeita dados externos inválidos, duplicados e fora do intervalo', async () => {
  for(const body of [[row,row],[{...row,date:'2026-10-24'}],[{...row,rate:'5.5'}],[{...row,quote:'USD'}],[{...row,date:'2026-02-30'}]]) {
    await assert.rejects(getHistory('EUR','BRL','2026-10-25','2026-10-26',response(body)),/api.invalid/);
  }
});
test('Intervalo invertido e par igual não fazem requisição', async () => {
  const fail=()=>assert.fail('Não deveria consultar a rede');
  await assert.rejects(getHistory('EUR','BRL','2026-10-26','2026-10-25',fail),/validation.range/);
  await assert.rejects(getRate('EUR','EUR',fail),/validation.currencies/);
});
test('Erros HTTP, rede, timeout e JSON malformado são distinguíveis', async () => {
  for(const [status,code] of [[404,'api.notFound'],[429,'api.rateLimit'],[500,'api.http']]) await assert.rejects(getRate('EUR','BRL',response({},status)), new RegExp(code));
  await assert.rejects(getRate('EUR','BRL',async()=>{throw new TypeError('Failed to fetch');}),/api.network/);
  await assert.rejects(getRate('EUR','BRL',async()=>{throw new DOMException('Timeout','TimeoutError');}),/api.timeout/);
  await assert.rejects(getRate('EUR','BRL',async()=>new Response('<html>')),/api.invalid/);
});

test('Cancelamento externo chega ao fetch e preserva AbortError', async () => {
  const controller = new AbortController();
  const pending = getRate('EUR','BRL', (_url, {signal}) => new Promise((_resolve,reject) => {
    signal.addEventListener('abort', () => reject(signal.reason), {once:true});
  }), controller.signal);
  controller.abort();
  await assert.rejects(pending, {name:'AbortError'});
});
test('Cancelamento durante leitura do corpo não vira erro de JSON', async () => {
  const controller = new AbortController();
  const pending = getRate('EUR','BRL', async () => ({ok:true,json:async()=>{
    controller.abort(); throw controller.signal.reason;
  }}), controller.signal);
  await assert.rejects(pending, {name:'AbortError'});
});
