# Textos da interface

- `pt-BR.json`: português do Brasil (padrão).
- `en-US.json`: inglês americano.

Os dois arquivos possuem as mesmas chaves. Uma chave descreve o significado, não a posição do texto: `converter.convert` pode retornar `Converter` ou `Convert`.

## Integração futura com React/Vite

```jsx
import ptBR from './i18n/pt-BR.json';
import enUS from './i18n/en-US.json';

const dictionaries = { 'pt-BR': ptBR, 'en-US': enUS };
// `locale` será estado compartilhado, criado na etapa de useState.
const messages = dictionaries[locale] ?? ptBR;

<button>{messages['converter.convert']}</button>
```

Na etapa de estado, guardar a escolha em localStorage, com tratamento de indisponibilidade, e atualizar `document.documentElement.lang`. Idioma não altera a moeda de origem ou destino. Não precisamos de uma biblioteca de tradução para esta primeira versão.

Para mensagens como `{count} records found`, substituir os parâmetros por texto, sem inserir HTML. Textos vindos da API não devem ser usados como marcação.

Use `Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' })` para dinheiro e `Intl.DateTimeFormat` para datas. A troca de idioma altera separadores e formatação, mas não o valor numérico armazenado. Datas de cotação sem horário devem ser tratadas como datas de calendário, evitando deslocamento pelo fuso horário.

As siglas EUR, USD, BRL e GBP permanecem universais. O arquivo inclui nomes dessas moedas para a prévia; a aplicação completa deverá resolver os nomes das demais moedas suportadas, por exemplo com `Intl.DisplayNames`, com fallback para a sigla.

## Manutenção

Adicionar toda chave nova aos dois arquivos. Executar na raiz:

```sh
node scripts/check-locales.cjs
```

O verificador confere igualdade de chaves, textos não vazios, parâmetros e referências estáticas da prévia. Não substitui revisão humana da tradução.
