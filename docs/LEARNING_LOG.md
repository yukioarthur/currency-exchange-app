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
