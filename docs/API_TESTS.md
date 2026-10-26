# Etapa 07 — Investigação da API Frankfurter

## Escopo e evidência

Consultas HTTP reais executadas pela IA em 26/10/2026, entre 12:48:00 e 12:48:13 (America/Sao_Paulo), via Node fetch. Respostas brutas e metadados estão em api-evidence/. Não foram executadas na interface do Postman. A importação e execução pelo aluno ainda estão pendentes. A aplicação React continua usando dados fictícios.

A Collection está em ../postman/Frankfurter.postman_collection.json, formato v2.1, com nove requisições e 21 verificações. Os mesmos scripts passaram contra as respostas capturadas usando `node scripts/check-api-evidence.mjs`. Isso verifica scripts e evidências; não substitui o runtime do Postman.

## Contrato escolhido

Base: https://api.frankfurter.dev/v2. GET consulta dados; query parameters especificam moeda e intervalo. Sem chave. A v2 oferece cotação individual como objeto e histórico como array. A conversão será feita no aplicativo: valor × taxa. Cotações não são intradiárias. O padrão combina fontes; não identificaremos todo resultado como taxa exclusiva do BCE.

Fonte: https://frankfurter.dev/ (consultada em 26/10/2026).

## Resultados observados

| Caso | Caminho após /v2 | HTTP | Evidência |
| --- | --- | --- | --- |
| Moedas | /currencies | 200 | 170 moedas; campos iso_code, iso_numeric, name, symbol, start_date, end_date |
| Atual | /rate/EUR/BRL | 200 | date 2026-10-26; rate 5.6286 |
| Data específica | /rate/EUR/BRL?date=2024-01-05 | 200 | date 2024-01-05; rate 5.3616 |
| Domingo | /rate/EUR/BRL?date=2024-01-07 | 200 | date 2024-01-07; rate 5.358 |
| Uma semana | /rates?base=EUR&quotes=BRL&from=2024-01-01&to=2024-01-07 | 200 | 7 observações, incluindo fim de semana |
| Dez anos | /rates?base=EUR&quotes=BRL&from=2016-10-26&to=2026-10-26 | 200 | 3653 observações, ordenadas, datas únicas e dentro do intervalo |
| Moeda inválida | /rate/ABC/BRL | 422 | status e message: invalid currency: ABC |
| Intervalo invertido | /rates?base=EUR&quotes=BRL&from=2024-01-07&to=2024-01-01 | 200 | array vazio |
| Antes da cobertura | /rate/EUR/BRL?date=1900-01-01 | 404 | status e message: not found |

Taxas/contagens são fotografias desta execução e não valores fixos esperados para consultas futuras. O teste de moeda atual valida formato, par e taxa positiva; não fixa 5.6286. Todas as respostas observadas vieram como JSON e com Access-Control-Allow-Origin: *. Esse cabeçalho é evidência de permissão CORS, não um teste da integração React no navegador.

Exemplo real capturado:

```json
{"date":"2026-10-26","base":"EUR","quote":"BRL","rate":5.6286}
```

Um array do histórico contém objetos com esses mesmos quatro campos. A lista de moedas usa iso_code, portanto precisaremos mapear esse campo para code na interface. A precisão deve ser mantida para cálculos e formatada apenas na exibição.

## Decisões para a integração posterior

- Exibir date retornada, sem substituir pela data local.
- Não presumir ausência de dados aos sábados/domingos. O caso consultado retornou domingo; isso não garante cobertura universal.
- Não inventar observações ausentes. Preservar as datas efetivamente recebidas.
- Validar intervalo antes da consulta: início maior que fim retornou 200 vazio, não erro HTTP.
- Verificar response.ok: 422 e 404 são respostas HTTP que fetch recebe normalmente; não provocam rejeição por si só.
- Distinguir erro HTTP, erro de rede e série vazia.
- Solicitar somente o par necessário para limitar o volume.
- O teste de dez anos foi apenas EUR/BRL; outras moedas podem ter cobertura menor.
- O CSV do trabalho continuará sendo gerado no navegador a partir dos registros filtrados.

## Como executar no Postman

1. Abra Postman e escolha Import.
2. Selecione postman/Frankfurter.postman_collection.json.
3. Abra a Collection. A variável baseUrl já está definida; não precisa de chave ou Environment.
4. Abra 01 - Moedas disponíveis e clique Send. Inspecione Status, Body e Test Results.
5. Execute as nove requisições com o Collection Runner, uma iteração, ou envie cada uma individualmente.
6. Esperado: 21 verificações aprovadas. Os casos 07 e 09 retornam erros deliberados (422/404), e seus testes devem passar. O caso 08 espera 200 e lista vazia, conforme a observação atual.
7. Se um teste falhar, registre URL, status e resposta. Não altere a expectativa apenas para deixá-lo verde.
8. Salve uma captura do resultado do Runner em docs/images/stage-07-postman.png e, se modificar a Collection, exporte como v2.1 substituindo o JSON do projeto.

Scripts > Post-response contém as verificações. Cada pm.test define uma condição que a resposta deve satisfazer. Referência: https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/

## Reproduzir a investigação local

`node scripts/probe-api.mjs` faz nove consultas e sobrescreve as evidências. Requer acesso à internet e deve ser executado apenas quando quiser atualizar a fotografia; as datas históricas são fixas. Depois execute `node scripts/check-api-evidence.mjs`. Revise o diff antes do commit.

## Pendências

Execução no Postman pelo aluno; teste real de navegador na integração; outros pares e falhas de rede; endpoints BCB/Ibovespa fora desta etapa. Nenhum commit/push executado pela IA.

## Integração etapa 09

Serviço em src/services/frankfurter.js implementado; resposta validada antes de entrar na interface. Teste real via navegador confirmou moedas, conversão e histórico em 26/10/2026. Consulte STAGE_09.md. A execução da Collection dentro do Postman segue sem captura/relatório local; não confundir com esta verificação de integração.
