// Executa os mesmos scripts da Collection sobre as respostas salvas.
// Não substitui a execução no Postman nem faz novas consultas de rede.
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const collection = JSON.parse(await readFile('postman/Frankfurter.postman_collection.json', 'utf8'));
const results = JSON.parse(await readFile('docs/api-evidence/results.json', 'utf8'));
let passed = 0;
for (const [index, item] of collection.item.entries()) {
  const record = results[index];
  const body = JSON.parse(await readFile('docs/api-evidence/' + record.name + '.json', 'utf8'));
  const pm = {
    response: { code: record.status, json: () => body },
    test: (name, run) => { run(); passed++; console.log(item.name + ': ' + name + ' OK'); },
  };
  vm.runInNewContext(item.event[0].script.exec.join('\n'), { pm }, { timeout: 3000 });
}
console.log(passed + ' verificações aprovadas sobre as respostas capturadas.');
