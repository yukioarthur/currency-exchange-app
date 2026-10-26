# Etapa 04 — Componentização

App.jsx agora reúne AppHeader, CurrencyConverter, HistoryPanel, MarketIndicators e HistoryExplorer. HistoryPanel usa HistoryChart para apresentar o SVG ilustrativo.

Um componente é uma função que retorna JSX. Seu nome começa com maiúscula para o React distinguir componentes de elementos HTML. `export default` disponibiliza a função; `import` permite usá-la em outro arquivo. Composição significa montar uma interface combinando componentes: `<CurrencyConverter />` inclui o conversor na tela.

Cada componente tem um CSS Module para seus estilos específicos. Shared.module.css reúne estilos visuais comuns (cards, campos, ações e textos auxiliares), evitando cópias. O arquivo App.module.css agora cuida somente da página e do aviso da etapa.

Os dados do exemplo de conversão ficam em CurrencyConverter. Ainda não adicionamos props, arrays com map, estado ou chamadas de API: esses assuntos pertencem às próximas etapas. A divisão facilita encontrá-los e modificá-los depois.

## Como verificar

1. Executar `npm run build` e `npm run check:locales`.
2. Abrir a aplicação e conferir o aviso da etapa 04, resultado R$ 620,00, gráfico, indicadores e cinco registros na tabela.
3. Conferir a página em janela larga e estreita. Os controles continuam intencionalmente desativados.
4. Somente depois de aprovar, registrar o commit e enviar ao GitHub conforme roteiro fornecido no chat.

Verificações automáticas passaram. A página compilada foi aberta no navegador e os conteúdos conferidos. A revisão e aprovação do aluno ainda estão pendentes. Nenhum commit ou push foi executado pela IA nesta etapa.

Mensagem proposta: `refactor: separa a interface em componentes`.

## Para fixar

Para mudar somente o cabeçalho, procure AppHeader.jsx. Para mudar o desenho do gráfico, procure HistoryChart.jsx. App.jsx mostra a organização geral da tela. Isso é separação de responsabilidades.
