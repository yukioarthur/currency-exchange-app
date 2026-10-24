const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = locale => JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n', locale + '.json'), 'utf8'));
const pt = read('pt-BR'), en = read('en-US');
assert.deepEqual(Object.keys(pt).sort(), Object.keys(en).sort(), 'The locale keys must match.');
const placeholders = value => [...value.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
for (const key of Object.keys(pt)) {
  assert.equal(typeof pt[key], 'string', key);
  assert.equal(typeof en[key], 'string', key);
  assert.ok(pt[key].trim() && en[key].trim(), `Empty translation: ${key}`);
  assert.deepEqual(placeholders(pt[key]), placeholders(en[key]), `Placeholder mismatch: ${key}`);
}
const html = fs.readFileSync(path.join(__dirname, '../docs/prototypes/index.html'), 'utf8');
for (const match of html.matchAll(/data-(?:i18n|placeholder)="([^"]+)"/g)) assert.ok(pt[match[1]], `Unknown preview key: ${match[1]}`);
console.log(`${Object.keys(pt).length} keys verified in pt-BR/en-US, including placeholders and static preview references.`);
