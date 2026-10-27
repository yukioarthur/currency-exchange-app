# Currency Exchange App

SPA individual de aprendizagem em React para converter valores e analisar moedas com a API Frankfurter v2.

**Autor:** Arthur ([yukioarthur](https://github.com/yukioarthur)). Entrega prevista: 27/10/2026.

## Acessos
- [Repositório público](https://github.com/yukioarthur/currency-exchange-app)
- [Endereço previsto da aplicação](https://yukioarthur.github.io/currency-exchange-app/) — publicação pendente; só considerar disponível após o workflow concluir.
- [Protótipos editáveis no Figma](https://www.figma.com/design/rgsHk6WPseuvUMbXtuAd2z)
- [Collection Postman](postman/Frankfurter.postman_collection.json)
- [Roteiro para concluir a publicação](docs/DELIVERY.md)

## Funcionalidades implementadas
- Conversão por taxa real, com data efetiva, validação e inversão do par.
- Histórico de 7, 15 e 30 dias, 3 e 6 meses, 1, 5 e 10 anos.
- Gráfico interativo com cotação nominal ou variação percentual relativa à primeira observação.
- Estatísticas de mínima, máxima, média e variação.
- Filtros combinados de datas/cotações, quatro ordenações e contagem.
- CSV dos registros filtrados, na ordem exibida, sem arredondar a taxa recebida.
- Português/inglês e tema claro/escuro persistidos no navegador.
- Consultas automáticas, cancelamento de respostas antigas e mensagens de carregamento/erro.

Selic e Ibovespa são **exemplos fictícios**, claramente identificados; a integração real desses extras está pendente. O tema automático do sistema também não foi implementado.

## Instalar e executar
Requer Node.js 22.12+; o fluxo de publicação usa Node 24.

    git clone https://github.com/yukioarthur/currency-exchange-app.git
    cd currency-exchange-app
    npm ci
    npm run dev

Abra o endereço informado pelo Vite, normalmente http://127.0.0.1:5173/currency-exchange-app/.

Enquanto esta entrega não estiver em main, use a branch dev após clonar:

    git switch dev

Para testar a compilação de produção:

    npm run build
    npm run preview

O preview usa http://127.0.0.1:4174/currency-exchange-app/. Se a porta estiver ocupada, encerre o servidor antigo ou use npm run preview -- --port 4175. Alterar vite.config.js exige reiniciar o preview.

No PowerShell, se npm.ps1 estiver bloqueado, use npm.cmd no lugar de npm.

## Verificações

    npm test
    npm run check:locales
    node scripts/check-api-evidence.mjs
    npm run build

25 testes automatizados, 123 chaves de tradução e 21 verificações sobre respostas salvas passaram na revisão de 27/10/2026. O script de evidências não faz consultas novas e não substitui uma execução no Postman. Resultados de interface e limites da validação estão em [QA_FINAL.md](docs/QA_FINAL.md).

## Uso
1. Informe valor e moedas e clique em Converter. Zero é válido; vazio/negativo não.
2. Escolha o par e período da análise; o histórico é consultado automaticamente.
3. Inspecione pontos do gráfico com cursor ou teclado. Valorização é sempre relativa à outra moeda.
4. Filtre e ordene a tabela. Os filtros não alteram o gráfico.
5. Exporte o CSV. Datas ISO, separador vírgula, decimal ponto e cabeçalhos date/base/quote/rate são estáveis entre idiomas. Em planilhas brasileiras, importe especificando esses separadores.

## Estrutura e tecnologias
React, JSX e JavaScript; Vite; CSS Modules; Recharts; fetch e async/await; useState, useEffect e hooks próprios.

- src/components: interface, eventos e composição.
- src/hooks: consultas e persistência de preferências.
- src/services: comunicação/validação da API.
- src/utils: cálculos, períodos, filtros, ordenação, formatação e CSV.
- src/i18n: dicionários português/inglês.
- tests: testes de funções, serviço e preferências.
- docs e postman: documentação, evidências e collection.
- .github/workflows/pages.yml: verificação automática e publicação.

O gráfico é carregado com React.lazy/Suspense. A divisão reduziu o JavaScript inicial de cerca de 603 kB para 252 kB; o restante do gráfico é carregado separadamente.

## Publicação
O workflow verifica pushes em dev/main e pull requests para main. Somente main publica no Pages, após testes e build. Configure Settings → Pages → Source: GitHub Actions. O caminho /currency-exchange-app/ no Vite corresponde ao nome do repositório. [Instruções completas](docs/DELIVERY.md).

## Documentação e aprendizagem
- [Requisitos e critérios de aceite](docs/REQUIREMENTS.md)
- [Arquitetura e componentes](docs/COMPONENTS.md)
- [Registro de aprendizagem](docs/LEARNING_LOG.md)
- [Uso de IA](docs/AI_USAGE.md)
- [Investigação da API e Postman](docs/API_TESTS.md)
- [Funções e testes](docs/FUNCTION_TESTS.md)
- [Figma e limites da revisão visual](docs/FIGMA.md)
- [Extras planejados](docs/ENHANCEMENTS.md)
- [JSX](docs/STAGE_03.md), [componentização](docs/STAGE_04.md), [props](docs/STAGE_05.md), [eventos e estado](docs/STAGE_06.md), [API](docs/STAGE_09.md)
- [Bloco 1: efeitos/hooks](docs/BLOCK_01.md), [bloco 2: gráfico/filtros/CSV](docs/BLOCK_02.md), [bloco final: entrega](docs/DELIVERY.md)

## Limites conhecidos
A API fornece taxas de referência, não cotações intradiárias. A cobertura varia por moeda e período. Não há backend, autenticação nem operações financeiras. O uso exige conexão. Dados não são preenchidos artificialmente quando a API não fornece observações.

Os protótipos Figma originais existem; a revisão posterior de tema/idioma/indicadores permanece na prévia local por limite anterior da integração. Execução da collection no aplicativo Postman e verificação do endereço público precisam ser confirmadas pelo aluno.

## Referências
- [Enunciado Notion](https://deluxe-blue-bc1.notion.site/3e4dfca74d8d819ebfeedbdbe661d76e)
- [Board Notion](https://deluxe-blue-bc1.notion.site/5a6382a806744e529ced9ae04bb1f6cf)
- [Frankfurter](https://frankfurter.dev/)
- [Recharts](https://recharts.github.io/en-US/)
- [Publicação Vite no Pages](https://vite.dev/guide/static-deploy.html#github-pages)
