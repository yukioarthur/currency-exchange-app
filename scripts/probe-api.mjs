// Consultas de investigação, sem integração com a aplicação React.
import { writeFile } from 'node:fs/promises';
const cases = [
  ['currencies', '/currencies'],
  ['latest', '/rate/EUR/BRL'],
  ['historical', '/rate/EUR/BRL?date=2024-01-05'],
  ['weekend', '/rate/EUR/BRL?date=2024-01-07'],
  ['series', '/rates?base=EUR&quotes=BRL&from=2024-01-01&to=2024-01-07'],
  ['ten-years', '/rates?base=EUR&quotes=BRL&from=2016-10-26&to=2026-10-26'],
  ['invalid-currency', '/rate/ABC/BRL'],
  ['invalid-range', '/rates?base=EUR&quotes=BRL&from=2024-01-07&to=2024-01-01'],
  ['before-coverage', '/rate/EUR/BRL?date=1900-01-01'],
];
const results = [];
for (const [name, path] of cases) {
  const url = 'https://api.frankfurter.dev/v2' + path;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(45000), headers: { Accept: 'application/json', Origin: 'http://localhost:5173' } });
    const body = await response.text();
    await writeFile('docs/api-evidence/' + name + '.json', body);
    let json; try { json = JSON.parse(body); } catch { json = null; }
    const result = { name, url, testedAt: new Date().toISOString(), status: response.status, contentType: response.headers.get('content-type'), allowOrigin: response.headers.get('access-control-allow-origin'), count: Array.isArray(json) ? json.length : undefined, first: Array.isArray(json) ? json[0] : json, last: Array.isArray(json) ? json.at(-1) : undefined };
    results.push(result); console.log(JSON.stringify(result));
  } catch (error) { const result = {name, url, error: error.message}; results.push(result); console.log(JSON.stringify(result)); }
}
await writeFile('docs/api-evidence/results.json', JSON.stringify(results, null, 2));
