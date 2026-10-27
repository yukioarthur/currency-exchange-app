# Roteiro e registro de aprendizagem

## Como vamos trabalhar

Em cada etapa: entender o objetivo, relacionar o conceito a uma aula, construir uma pequena evolução, verificar o resultado, explicar as decisões e criar um commit real. Avançar depois de discutir o que foi aprendido.

## Etapa 01 — Problema e requisitos — 23/10/2026

Entrega: README inicial, requisitos, critérios de aceite e registro de uso de IA.

### Conceitos

- **SPA:** interface atualizada dentro de uma aplicação; não significa que tudo deva ficar em um único componente.
- **Requisito funcional:** uma capacidade, como filtrar cotações.
- **Requisito não funcional:** uma qualidade ou restrição, como funcionar no celular ou usar CSS Modules.
- **Regra de negócio:** determina o comportamento, como combinar filtros usando E.
- **Critério de aceite:** torna a expectativa verificável, com entrada, ação e resultado esperado.
- **Git:** guarda versões locais do trabalho. Um commit registra um conjunto coerente de mudanças.
- **GitHub:** hospeda o repositório remoto. Um commit local ainda não publica nada no GitHub.

Lembrete: **o que faz → como se comporta → como verifico**.

### Relação com as aulas

O Weather App apresenta uma necessidade de consulta externa e tratamento de loading/erro. O simulador de investimentos diferencia entradas e resultados calculados. Aqui, primeiro descrevemos essas necessidades; a aplicação de componentes, estado e API ocorrerá nas etapas correspondentes.

### Verificação desta etapa

- Conferência do escopo com o enunciado e das 16 etapas do board.
- Oito períodos históricos registrados.
- CSS Modules, CSV filtrado, Figma, Postman e documentação de IA registrados.
- Escolhas adicionais identificadas como propostas, sem alegar testes de API ou de aplicação.

### Exercício de compreensão

Explique com suas palavras: se a tabela mostra 8 registros após os filtros, mas o CSV exporta os 30 registros originais, qual requisito foi descumprido e como você testaria a correção?

## Etapa 02 — Protótipos e componentes — 23/10/2026

Criados no Figma: wireframes desktop/mobile, média fidelidade desktop/mobile e painéis de estados nas duas larguras. Evidências em docs/images; detalhes em FIGMA.md; responsabilidades previstas em COMPONENTS.md.

Conceitos: wireframe é estrutura; fidelidade é nível de detalhe; responsividade é reorganização; componente é uma unidade com responsabilidade. Os controles reutilizados no Figma antecipam a ideia de reutilização que aplicaremos em React.

Verificação: seis imagens revisadas, contraste corrigido, layout sem sobreposição observada e fonte Inter confirmada. Os protótipos são estáticos; não foram executados testes da aplicação.

Resposta ao exercício anterior: exportar 30 registros quando a tabela filtrada apresenta 8 viola RF12. A correção será verificada comparando as linhas da tabela e do CSV. Tabela e exportador devem consumir a mesma lista derivada.

Para lembrar: **estrutura primeiro; aparência depois; comportamento em cada estado**.

Próximo passo: etapa 03, configurar Vite e escrever a primeira interface JSX com dados fictícios. Props, estado e API serão introduzidos nas etapas correspondentes.

## Sequência do board

### Revisão da etapa 02 — 24/10/2026

Adicionados à proposta: claro/escuro/sistema, português/inglês, gráfico com estatísticas e inspeção, análise de moeda em relação a uma referência e cards de Ibovespa/meta Selic.

**Internacionalização (i18n)** separa texto e lógica: `converter.convert` identifica uma mensagem, e o dicionário resolve o texto. **Localização** formata números e datas: 6,20 em português e 6.20 em inglês representam o mesmo número.

**Tokens semânticos de tema** representam papéis: superfície, texto e destaque. Alteramos o valor desses tokens para trocar o tema, mantendo a mesma estrutura.

**Variação percentual** relaciona o último valor ao primeiro: `(final / inicial - 1) × 100`. Uma moeda sempre varia em relação a outra; USD/BRL e BRL/USD não têm a mesma variação percentual.

Validação: 98 chaves com paridade e parâmetros verificados; sintaxe do script conferida; navegador validou português/claro, inglês/escuro, persistência de tema/idioma após reload, escolha USD/BRL, visão percentual, mudança de período e inspeção por teclado. A responsividade desta revisão ainda precisa de inspeção em viewport mobile; APIs não foram testadas. O Figma não pôde ser atualizado por limite da integração Starter.

Prévia de design e documentação completas em ENHANCEMENTS.md. O próximo passo continua sendo a etapa 03 (React/Vite), sem considerar a prévia uma implementação final.

2. Protótipos e planejamento de interface no Figma.
3. Vite e primeira interface estática com JSX.
4. Refatoração em componentes.
5. Props e listas com map.
6. Eventos, useState e lifting state up.
7. Investigação da API no Postman.
8. Funções de negócio, períodos, filtros, ordenação e formatação.
9. Integração com fetch e async/await.
10. Controle de efeitos com useEffect.
11. Extração de Custom Hooks.
12. Histórico e gráfico.
13. Tabela, filtros e ordenação.
14. Exportação CSV.
15. Testes, responsividade e estados.
16. Documentação e entrega final.

## 25/10/2026 — Etapa 03: React, Vite e JSX

Implementada a interface estática em App.jsx, com entrada main.jsx, estilos globais e CSS Module. Dependências instaladas: React 19.3.1, Vite 8.3.5 e plugin React 6.1.2; versões exatas no lockfile. A configuração foi adicionada ao repositório existente, preservando os protótipos e traduções.

Conceitos: componente como função que retorna JSX; expressões JavaScript entre chaves; objetos com propriedades; className e CSS Modules; raiz React; diferença entre desenvolvimento e build. Guia e exercício em STAGE_03.md.

Verificação: npm run build passou; 98 chaves de tradução consistentes; git diff --check sem erros de whitespace; aplicação compilada aberta no navegador, resultado fictício R$ 620,00 e cinco registros presentes, sem erros/avisos capturados no console. Inspeção visual no painel estreito disponível, sem uma bateria de dispositivos. Evidência: images/stage-03-react.png.

Limites: controles estáticos; API, estado, preferências interativas, filtros e CSV ainda pendentes. Próxima etapa: extrair componentes por responsabilidade, mantendo o resultado visual.

## Etapa 04 — Componentização (aguardando teste do aluno)

Extraídos seis componentes: AppHeader, CurrencyConverter, HistoryPanel, HistoryChart, MarketIndicators e HistoryExplorer, cada um com CSS Module. Shared.module.css concentra estilos comuns. App compõe as seções; HistoryPanel compõe o gráfico. Conceitos: função componente, import/export e composição. Detalhes em STAGE_04.md.

Build e conferência das 98 traduções passaram; conteúdo renderizado conferido no navegador. Ações continuam estáticas. Commit/push ficam a cargo do aluno após seus testes. A próxima etapa só começa com sua indicação.

## 26/10/2026 — Etapa 05 (aguardando teste do aluno)

Dados fictícios centralizados em src/data/demo.js. App passa props ao conversor, análise e tabela; CurrencySelect reutiliza o mesmo JSX em quatro lugares. map gera opções, registros e pontos do SVG; key identifica itens. Estatísticas e contador são derivados da série. Verificações de build, traduções e navegador passaram. Guia e exercício em STAGE_05.md. Nenhum commit/push executado pela IA.

## 26/10/2026 — Etapa 06 (aguardando teste do aluno)

Ativados campos controlados, submissão/Enter, validações, inversão, par/período da análise, escala percentual, idioma e tema. useState guarda preferências e análise em App; o conversor guarda suas entradas/resultado localmente. Gráfico e tabela recebem rows derivado das escolhas compartilhadas. Demonstração sem API, com limites de períodos fixos até 22/10/2026. Guia em STAGE_06.md.

Build e 106 mensagens consistentes; testes no navegador de conversão, erros, zero, inversão, Enter, idioma/tema e histórico de 10 anos aprovados. Tema/idioma não persistem após reload. Nenhum commit/push executado pela IA.

## 26/10/2026 — Etapa 07 (aguardando execução do aluno no Postman)

Nove consultas reais à Frankfurter v2, respostas/metadados em api-evidence, Collection v2.1 e 21 verificações aprovadas contra respostas salvas. Conceitos: GET, endpoint, parâmetros, JSON, status HTTP, contrato e testes de resposta. Detalhes em API_TESTS.md. Descobertas: currencies usa iso_code; histórico EUR/BRL inclui domingo; intervalo invertido retorna 200 vazio. React permanece na demonstração da etapa 06. Aluno deve importar e executar Collection, depois registrar commit/push.

## 26/10/2026 — Etapa 08 (aguardando teste do aluno)

Funções de conversão, datas/períodos, filtros/ordenação e formatação extraídas para src/utils. Conversor e formatação já reutilizam funções; filtros/períodos reais aguardam conexão posterior. 11 testes Node passaram, incluindo limites de calendário e listas congeladas, além de build e 106 traduções. Explicações em FUNCTION_TESTS.md. Commit da etapa 07 confirmado (641a53e); execução no Postman ainda sem captura/relatório local. Nenhum commit/push executado pela IA.

## 26/10/2026 — Etapa 09 (aguardando teste do aluno)

Commit anterior 2f98efd confirmado. Serviço Frankfurter implementado com fetch/async-await, contratos, timeout e mensagens de erro. Consultas manuais por botões: moedas, conversão e histórico. UI agora usa dados reais para câmbio; indicadores continuam exemplos. Períodos calculados com data local. 18 testes, build, 120 traduções aprovados; integração real no navegador conferida. Guia STAGE_09.md. Nenhum commit/push executado pela IA.

## 27/10/2026 — Bloco 1, etapas 10 e 11 (aguardando teste do aluno)

Aplicado o agrupamento aprovado: efeitos automáticos e extração de useRequest/useCurrencies/useHistory/usePreferences, com cancelamento e persistência. useCallback estabiliza o carregador de histórico. 23 testes, build e 121 traduções aprovados. Testes no navegador: carregamento inicial, trocas rápidas, atualização e preferências após reload. Guia em BLOCK_01.md. Nenhum commit/push executado pela IA.
