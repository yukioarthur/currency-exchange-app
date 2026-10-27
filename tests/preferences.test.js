import test from 'node:test';
import assert from 'node:assert/strict';
import { readPreference, savePreference } from '../src/utils/preferences.js';
test('Preferência válida é restaurada; ausente/inválida usa padrão', () => {
  assert.equal(readPreference('theme',['light','dark'],'light',{getItem:()=> 'dark'}),'dark');
  for (const value of [null,'other','']) assert.equal(readPreference('theme',['light','dark'],'light',{getItem:()=>value}),'light');
});
test('Armazenamento bloqueado ou ausente não quebra preferências', () => {
  assert.equal(readPreference('theme',['light','dark'],'light',null),'light');
  const blocked={getItem(){throw new Error('blocked');},setItem(){throw new Error('blocked');}};
  assert.equal(readPreference('theme',['light','dark'],'light',blocked),'light');
  assert.equal(savePreference('theme','dark',blocked),false);
});
test('Gravação informa sucesso e usa chave e valor corretos', () => {
  const writes=[];
  assert.equal(savePreference('theme','dark',{setItem:(...args)=>writes.push(args)}),true);
  assert.deepEqual(writes,[['theme','dark']]);
});
