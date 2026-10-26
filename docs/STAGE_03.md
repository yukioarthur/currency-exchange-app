# Etapa 03 — Primeira interface React

## Objetivo

Transformar a estrutura do protótipo local em uma interface React estática. A referência é a revisão em `docs/prototypes/`, que já contém os extras solicitados; o Figma permanece na versão anterior.

## Como a tela aparece

1. `index.html` oferece o elemento com `id="root"` e carrega `src/main.jsx`.
2. `main.jsx` cria a raiz React e renderiza `<App />` nela.
3. `App.jsx` é uma função que retorna a descrição da interface em JSX.
4. `index.css` define estilos gerais; `App.module.css` define classes locais à tela.

React organiza e atualiza a interface. Vite inicia o ambiente de desenvolvimento e prepara os arquivos para publicação. A página tem um único ponto de entrada e não recarrega documentos para cada seção: essa é a base de nossa SPA.

## JSX: HTML dentro do JavaScript?

JSX é uma sintaxe que descreve elementos e é transformada pela ferramenta de compilação. Parece HTML, mas segue regras de JavaScript/React: usamos `className`, fechamos tags como `<input />` e inserimos expressões entre chaves.

```jsx
const example = { amount: 100, base: 'EUR', quote: 'BRL', rate: 6.2 };
<span>{example.amount} {example.base} =</span>
```

`example` é um objeto com propriedades. As chaves no JSX leem os valores dessas propriedades. Para o resultado, multiplicamos `example.amount * example.rate`. A formatação provisória é apenas para este exemplo em português; uma função com `Intl.NumberFormat` virá na etapa de utilitários.

## CSS Modules

```jsx
import styles from './App.module.css';
<section className={styles.card}>...</section>
```

O arquivo possui `.card`; o Vite gera um nome de classe próprio para evitar colisão com classes de outros módulos. Os estilos gerais, como fonte e margem do body, ficam em `index.css`.

## O que é estático nesta etapa

Os valores não vêm da API. Os campos e botões estão desativados ou somente leitura para não prometer ações ainda não implementadas. O gráfico SVG é uma ilustração acessível, com os mesmos cinco valores apresentados na tabela. Ibovespa e Selic também exibem exemplos marcados como fictícios.

Mantivemos uma função App maior intencionalmente: na etapa 04 vamos identificar responsabilidades e extrair componentes. As cinco linhas de tabela são explícitas; na etapa 05 serão criadas com arrays e `map`. Tema e idioma têm espaço reservado, mas dependem de eventos e estado da etapa 06. Os dicionários permanecem disponíveis.

`StrictMode` ativa verificações adicionais do React durante o desenvolvimento. Não é um componente visual e não duplica a tela.

## Exercício de fixação

Mude `example.amount` de 100 para 200, salve e observe o resultado: R$ 1.240,00 é o valor numérico esperado (a formatação provisória não inclui separador de milhar). Isso muda o dado no código; editar um campo pelo navegador e atualizar a tela exigirá eventos e estado. Depois restaure 100.

Pergunta: qual arquivo descreve a tela e qual conecta essa tela ao HTML? Resposta: `App.jsx` descreve; `main.jsx` conecta ao `root`.

## Referências

- [Vite: introdução e comandos](https://vite.dev/guide/)
- [Board do projeto no Notion](https://deluxe-blue-bc1.notion.site/5a6382a806744e529ced9ae04bb1f6cf)

Esta etapa não testa APIs, filtros, exportação nem preferências interativas.
