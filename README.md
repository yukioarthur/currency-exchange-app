# Currency Exchange App

Projeto individual de aprendizagem: uma Single Page Application em React para conversão e análise histórica de moedas com a API Frankfurter.

## Estado atual

Etapas 01 e 02 — requisitos, protótipos visuais no Figma e planejamento dos componentes. Ainda não existe aplicação executável nem configuração do Vite. Os comandos de instalação e execução serão documentados quando a implementação começar.

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
- [Registro do uso de IA](docs/AI_USAGE.md)
- [Protótipos e evidências do Figma](docs/FIGMA.md)
- [Mapa inicial de componentes](docs/COMPONENTS.md)
- [Revisão: tema, inglês, análise e indicadores](docs/ENHANCEMENTS.md)
- [Integração das traduções](src/i18n/README.md)

Prévia de design revisada: executar `node scripts/preview.cjs` e abrir `http://127.0.0.1:4173`. Usa dados fictícios; não é a SPA final. O Figma ainda não contém esta revisão devido ao limite da integração.

Os documentos de testes de API e funções serão adicionados nas respectivas etapas. O repositório público no GitHub ainda não foi criado.

## Processo

Entender → implementar uma etapa → verificar → explicar → registrar um commit.

O histórico deve representar trabalho real. Não serão criados commits retroativos para simular etapas anteriores. A branch `main` manterá entregas verificadas; `dev` será usada na implementação incremental.

## Referências

- [Enunciado no Notion](https://deluxe-blue-bc1.notion.site/3e4dfca74d8d819ebfeedbdbe661d76e)
- [Board de desenvolvimento](https://deluxe-blue-bc1.notion.site/5a6382a806744e529ced9ae04bb1f6cf)
- [Documentação Frankfurter — a investigar na etapa de API](https://frankfurter.dev/)
