# Etapa 05 — Props e listas

## Dados em um lugar

src/data/demo.js contém moedas, conversão, períodos e histórico fictícios. App importa esses valores e entrega aos componentes. O histórico está ordenado por data crescente e possui uma observação por data; essa é a premissa do SVG ilustrativo e das chaves da tabela nesta etapa.

## Props

`<HistoryExplorer rows={history} base={conversion.base} quote={conversion.quote} />` passa três informações ao filho. A função recebe `({ rows, base, quote })`: isso é desestruturação do objeto de props. Props são somente leitura; o filho não deve alterar a lista recebida. Ainda não temos estado ou eventos.

CurrencySelect recebe label, currencies e selected. O mesmo componente atende origem, destino e os dois seletores de análise. O CSS global de label/select já atende seu visual, sem necessidade de um módulo vazio.

## map e key

`rows.map((row) => <tr key={row.date}>...</tr>)` transforma cada objeto em uma linha de JSX. Não é preciso copiar uma tag tr para cada registro. `rows.length` fornece o contador.

`key` identifica cada item entre seus irmãos. As moedas usam code, os períodos usam id e as observações usam date. Essas identidades são estáveis e únicas dentro das listas atuais. A key é usada pelo React e não chega ao componente como uma prop comum. Os três rótulos fixos do eixo usam índice porque suas posições são fixas; listas de registros usam suas identidades.

Gráfico, tabela e estatísticas recebem a mesma série. map extrai taxas; reduce soma para obter a média; mínimo, máximo e variação são derivados. A lógica está local por enquanto e será organizada/testada como utilitários na etapa 08. O SVG continua ilustrativo, sem biblioteca ou interação, previstas para a etapa 12.

## Teste do aluno

1. Executar npm run dev e abrir o endereço informado.
2. Conferir etapa 05, resultado R$ 620,00, cinco registros e estatísticas: +1,64%, mínima 6,1000, máxima 6,2000, média 6,1620.
3. Para perceber o map, adicionar temporariamente ao final de history em src/data/demo.js: `{ date: '2026-10-23', rate: 6.25 }`. A tabela deve mostrar seis linhas; o gráfico ganha um ponto; a máxima passa a 6,2500 e a média a 6,1767. O conversor continua com seu exemplo próprio de 22/10.
4. Remover esse registro de exercício antes do commit. Os seletores continuam desativados: interação entra na etapa 06.
5. Executar npm run build e npm run check:locales.

Verificação pela IA: build e 98 traduções aprovados; navegador mostrou cinco registros (seis linhas incluindo cabeçalho), resultado e estatísticas esperados, sem avisos/erros capturados. Evidência: images/stage-05-react.png. O exercício de alteração é proposto ao aluno e não foi executado pela IA.

Commit proposto: `feat: compartilha dados por props e gera listas com map`.

Aguardando teste, commit e autorização do aluno antes da próxima etapa. GitHub Pages segue pendente, em passo separado.
