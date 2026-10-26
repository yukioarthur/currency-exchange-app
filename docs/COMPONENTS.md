# Mapa inicial de componentes

Planejamento da etapa 02. Os arquivos abaixo ainda não existem. A etapa 03 começa pela interface estática; a extração dos componentes ocorrerá na etapa 04 e as props na etapa 05.

Cada componente tem uma responsabilidade. O desenho ajuda a identificar essas responsabilidades, mas uma caixa visual não exige automaticamente um componente novo.

| Componente | Responsabilidade | JSX / CSS Module previstos | Principais props futuras | Estado previsto |
| --- | --- | --- | --- | --- |
| App | Coordenar dados compartilhados e compor a tela | App.jsx / App.module.css | — | Par, valor, período; consultas por hooks futuramente |
| AppHeader | Apresentar nome e objetivo | components/AppHeader.jsx / AppHeader.module.css | — | Nenhum |
| CurrencyConverter | Agrupar entradas e ações de conversão | components/CurrencyConverter.jsx / CurrencyConverter.module.css | currencies, amount, base, quote, onAmountChange, onBaseChange, onQuoteChange, onSwap, onConvert, loading | Validação local, se necessária |
| CurrencySelect | Reutilizar seletor para origem e destino | components/CurrencySelect.jsx / CurrencySelect.module.css | id, label, value, currencies, onChange, disabled | Nenhum; controlado pelo pai |
| ConversionResult | Mostrar valor convertido, taxa e data | components/ConversionResult.jsx / ConversionResult.module.css | amount, rate, date, base, quote | Nenhum; resultado derivado |
| HistoryPanel | Agrupar período e gráfico | components/HistoryPanel.jsx / HistoryPanel.module.css | period, onPeriodChange, history, base, quote, loading, error | Nenhum adicional inicialmente |
| HistoryChart | Representar a série temporal | components/HistoryChart.jsx / HistoryChart.module.css | data, base, quote | Apenas interação da biblioteca, se necessária |
| HistoryExplorer | Coordenar filtros, tabela e exportação | components/HistoryExplorer.jsx / HistoryExplorer.module.css | history, base, quote, period | Filtros e ordenação |
| HistoryFilters | Mostrar campos de filtro | components/HistoryFilters.jsx / HistoryFilters.module.css | filters, onChange, onClear, validationError | Nenhum; controlado pelo pai |
| HistoryTable | Mostrar registros e contagem | components/HistoryTable.jsx / HistoryTable.module.css | rows, sort, onSortChange | Nenhum |
| ExportCsvButton | Iniciar exportação dos registros recebidos | components/ExportCsvButton.jsx / ExportCsvButton.module.css | rows, base, quote, period, disabled | Nenhum |
| FeedbackMessage | Comunicar loading, erro ou ausência de dados | components/FeedbackMessage.jsx / FeedbackMessage.module.css | status, message, actionLabel, onAction | Nenhum |

## Relações previstas

```text
App
├── AppHeader
├── CurrencyConverter
│   ├── CurrencySelect (origem)
│   ├── CurrencySelect (destino)
│   └── ConversionResult
├── HistoryPanel
│   └── HistoryChart
└── HistoryExplorer
    ├── HistoryFilters
    ├── HistoryTable
    └── ExportCsvButton

FeedbackMessage: usado nas regiões de consulta e resultados.
```

## Conceitos que serão aplicados progressivamente

**Props** são informações e funções recebidas pelo componente. Como no SearchBar da aula Weather App, o filho pode chamar uma função do pai quando o usuário interage.

**Estado** é a memória necessária para representar escolhas e operações. O par de moedas afeta várias regiões, então ficará em um ancestral comum. Esse compartilhamento será estudado como lifting state up, assim como os dados do simulador de investimentos.

**Dados derivados** são calculados a partir de dados existentes. A lista filtrada e ordenada será calculada a partir de histórico + filtros + ordenação. O contador será rows.length. Tabela e CSV receberão a mesma lista, evitando divergências.

**Separação de responsabilidades:** componentes desenham a interface; services consultam a API; utils fazem cálculos e transformações; hooks coordenam lógica reutilizável de estado/efeitos. Essas pastas serão criadas quando necessárias, nas etapas do board.

Nenhum destes estados, hooks ou contratos de props foi implementado ou testado nesta etapa. O mapa pode ser ajustado durante a construção.

## Revisão de 24/10/2026

Planejar `Preferences` (locale, theme, onLocaleChange, onThemeChange), `CurrencyPerformance` (moeda analisada, referência e modo nominal/percentual) e `MarketIndicators` (cards independentes para Ibovespa e meta Selic). Cada componente terá JSX e CSS Module próprios na etapa de extração.

Idioma/tema ficam no ancestral comum. O histórico passa a possuir um par de análise identificado separadamente do conversor. `HistoryChart`, estatísticas e `HistoryExplorer` recebem a mesma série desse par. Indicadores têm estados independentes, evitando que uma falha externa derrube a consulta de câmbio.

Os arquivos `src/i18n/pt-BR.json` e `en-US.json` já existem. Componentes React, providers e hooks continuam planejados; somente a prévia de design usa os dicionários neste momento.

## Estado após etapa 03 — 25/10/2026

App.jsx e App.module.css agora existem. A interface estática permanece concentrada em App; os demais componentes e contratos acima continuam planejados. Alguns textos já importam o dicionário português; a migração completa das mensagens e seleção de idioma virão com as etapas seguintes.

## Estado após etapa 04

Implementados AppHeader, CurrencyConverter, HistoryPanel, HistoryChart, MarketIndicators e HistoryExplorer em src/components, com CSS Modules próprios e Shared.module.css para regras comuns. App organiza a tela; HistoryPanel inclui HistoryChart. Componentes menores e contratos de props continuam planejados para as próximas etapas. Nenhum estado ou serviço de API adicionado.

## Estado após etapa 05

CurrencySelect implementado com label, currencies, selected. CurrencyConverter recebe currencies/conversion; HistoryPanel recebe currencies/periods/rows/base/quote; HistoryChart e HistoryExplorer recebem rows/base/quote. App importa exemplos de data/demo.js; os filhos leem as props sem alterá-las. Tabela, gráfico e estatísticas usam a mesma série; dados de conversão são um exemplo independente. Estado, hooks e serviços continuam pendentes.
