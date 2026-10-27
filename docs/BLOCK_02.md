# Bloco 2 — Gráficos, filtros e CSV (etapas 12–14)

Implementado em 27/10/2026. Aguardando validação e commit do aluno.

## O que mudou
- Recharts substitui o SVG manual, com eixos, grade e detalhes de data/valor por cursor ou teclado.
- A opção Valorização da moeda mostra (cotação atual / primeira cotação - 1) × 100. A referência é sempre a outra moeda do par.
- Filtros de datas e cotações são combinados com AND, incluindo os limites.
- Quatro ordenações; padrão por data crescente. Empates por cotação usam data crescente.
- Intervalos inválidos mostram erro. Resultado vazio bloqueia exportação.
- Trocar par ou período reinicia filtros e ordenação. Atualizar o mesmo histórico preserva as escolhas.
- CSV usa exatamente a lista filtrada e ordenada da tabela. O gráfico e suas estatísticas usam a série completa.

## Conceitos para lembrar
1. **Estado:** useState guarda filtros e ordem, que representam escolhas do usuário.
2. **Estado derivado:** visibleRows é calculado com sortHistory(filterHistory(rows, filters), order). Não precisamos de outro estado nem de um efeito para sincronizar essa lista.
3. **Imutabilidade:** filter produz outra lista; a ordenação copia antes de sort. Assim a tabela não altera os dados do gráfico.
4. **Identidade com key:** App identifica HistoryExplorer pelo par e período. Quando a key muda, React recria o componente com estado inicial.
5. **Composição:** LineChart recebe eixos, grade, linha e Tooltip como componentes filhos. Props configuram cada parte. O eixo temporal respeita o espaçamento entre datas.
6. **CSV:** historyCsv transforma dados em texto; downloadHistory cria um Blob e uma URL temporária para baixar o arquivo e depois libera essa URL.

O arquivo usa vírgula como separador, cabeçalhos estáveis date/base/quote/rate, datas ISO, ponto decimal, UTF-8 com BOM e quebras CRLF. A precisão recebida é preservada; os quatro decimais da tabela são apenas apresentação. Em planilhas com configuração brasileira, importe escolhendo vírgula como delimitador e ponto decimal.

## Arquivos para estudar
- src/components/HistoryChart.jsx: biblioteca e transformação percentual.
- src/components/HistoryExplorer.jsx: eventos, estado e lista derivada.
- src/utils/history.js: filtros e ordenação já construídos na etapa 08, agora conectados à interface.
- src/utils/csv.js: criação e download do arquivo.
- src/App.jsx: key para reiniciar os filtros.
- src/i18n/pt-BR.json e en-US.json: textos das duas versões.

## Verificação executada
- npm test: 25 testes passaram; inclui CSV com precisão, ordem, filtros e bloqueio de exportação vazia.
- npm run check:locales: 123 chaves compatíveis.
- npm run build: passou. Aviso de pacote JavaScript acima de 500 kB após inclusão da biblioteca; revisar divisão de carregamento na etapa final.
- Navegador: histórico de 7 e 15 dias; detalhes percentuais por teclado; tradução inglês/português; filtro mínimo 5.8 retornou dois registros da consulta testada; ordenação decrescente; intervalo inválido bloqueou CSV.
- Download real conferido: cabeçalho e duas linhas na mesma ordem da tabela.
- Troca de período limpou um filtro mínimo 999.
- Cotações são variáveis; estes números documentam apenas a execução.
- Ainda cabe ao aluno testar responsividade e demais combinações antes do commit.

## Teste do aluno
1. Abra a aplicação e passe o cursor no gráfico; use também Tab e setas.
2. Alterne Par de moedas e Valorização da moeda.
3. Combine datas e cotações, alterne as quatro ordenações e confira a contagem.
4. Inverta os limites: deve aparecer erro e o CSV ficar desabilitado.
5. Limpe filtros, filtre novamente e exporte. Confira conteúdo e ordem.
6. Troque moeda/período: os filtros devem voltar ao padrão.
7. Confira português/inglês e claro/escuro.

## Commit sugerido
Execute na pasta do projeto, depois de testar:

    git status
    git add package.json package-lock.json index.html src/App.jsx src/components/HistoryChart.jsx src/components/HistoryChart.module.css src/components/HistoryExplorer.jsx src/i18n/pt-BR.json src/i18n/en-US.json src/utils/csv.js tests/csv.test.js README.md docs/BLOCK_02.md docs/LEARNING_LOG.md docs/AI_USAGE.md docs/images/block-02-react.png
    git diff --cached --stat
    git commit -m "feat: adiciona grafico interativo, filtros e exportacao CSV"
    git push origin dev
    git status

Próximo bloco, após aprovação: revisão final, documentação e publicação no GitHub Pages. Selic e Ibovespa permanecem exemplos fictícios com integração pendente.

Referências oficiais: https://recharts.github.io/en-US/api/LineChart/ e https://recharts.github.io/en-US/api/ResponsiveContainer/
