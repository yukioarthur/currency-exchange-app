# Currency Exchange App

Projeto individual de aprendizagem: uma Single Page Application em React para conversão e análise histórica de moedas com a API Frankfurter.

## Estado atual

Etapa 06 — conversão simulada, validações, escolhas da análise, tema e idioma ativados com eventos e useState. Dados inteiramente fictícios, com períodos fixos até 22/10/2026; sem API. Preferências voltam ao padrão ao recarregar. Filtros e CSV continuam pendentes. Etapa 08: funções de negócio extraídas e 11 testes automatizados aprovados, aguardando revisão do aluno. Execução no Postman ainda sem evidência local.

## Executar a aplicação

Requer Node.js 22.12+ (validado com Node 24.19.0). Na pasta do projeto:

```sh
npm ci
npm run dev
```

Abrir o endereço exibido pelo Vite, normalmente http://127.0.0.1:5173.

```sh
npm run build
npm run preview
npm run check:locales
```

O preview da compilação usa a porta 4174. A porta 4173 continua reservada à prévia de design anterior. O build gera `dist/`; esta pasta e `node_modules/` não entram no Git. `package-lock.json` registra as versões instaladas.

Entrega prevista: **27/10/2026**.

## Funcionalidades planejadas

- Conversão com taxa e data efetiva da cotação, validação e inversão das moedas.
- Histórico em gráfico e tabela para oito períodos.
- Filtros combinados, ordenação e contagem de registros.
- Exportação dos registros filtrados em CSV.

## Tecnologias exigidas pelo enunciado

React, JavaScript, JSX, Vite, CSS Modules, fetch, async/await, useState, useEffect, Custom Hooks, biblioteca de gráficos, Postman e Git/GitHub. A biblioteca de gráficos será escolhida na etapa correspondente.

## Documentação

- [Requisitos e critérios de aceite](docs/REQUIREMENTS.md)
- [Roteiro e registro de aprendizagem](docs/LEARNING_LOG.md)
- [Guia da etapa 03: React, Vite e JSX](docs/STAGE_03.md)
- [Guia da etapa 04: Componentização](docs/STAGE_04.md)
- [Guia da etapa 05: Props e listas](docs/STAGE_05.md)
- [Guia da etapa 06: Eventos e estado](docs/STAGE_06.md)
- [Registro do uso de IA](docs/AI_USAGE.md)
- [Investigação da API e roteiro Postman](docs/API_TESTS.md)
- [Etapa 08: funções e testes](docs/FUNCTION_TESTS.md)
- [Collection Postman](postman/Frankfurter.postman_collection.json)
- [Protótipos e evidências do Figma](docs/FIGMA.md)
- [Mapa inicial de componentes](docs/COMPONENTS.md)
- [Revisão: tema, inglês, análise e indicadores](docs/ENHANCEMENTS.md)
- [Integração das traduções](src/i18n/README.md)

Prévia de design revisada: executar `node scripts/preview.cjs` e abrir `http://127.0.0.1:4173`. Usa dados fictícios; não é a SPA final. O Figma ainda não contém esta revisão devido ao limite da integração.

A investigação da API está em API_TESTS.md; testes de funções estão em FUNCTION_TESTS.md e podem ser executados com `npm test`. O remoto está configurado em https://github.com/yukioarthur/currency-exchange-app. A publicação da aplicação no GitHub Pages ainda está pendente.

## Processo

Entender → implementar uma etapa → verificar → explicar → registrar um commit.

O histórico deve representar trabalho real. Não serão criados commits retroativos para simular etapas anteriores. A branch `main` manterá entregas verificadas; `dev` será usada na implementação incremental.

## Referências

- [Enunciado no Notion](https://deluxe-blue-bc1.notion.site/3e4dfca74d8d819ebfeedbdbe661d76e)
- [Board de desenvolvimento](https://deluxe-blue-bc1.notion.site/5a6382a806744e529ced9ae04bb1f6cf)
- [Documentação Frankfurter — a investigar na etapa de API](https://frankfurter.dev/)
