# Requisitos — Currency Exchange App

Versão inicial: 23/10/2026. Base: enunciado e board do projeto no Notion.

## 1. Contexto, público e objetivo

O usuário precisa consultar taxas, converter valores e analisar o histórico de moedas sem alternar entre sites e planilhas. O público inicial é formado por pessoas que desejam consultar e comparar cotações; não haverá operações financeiras reais.

O objetivo é reunir conversor, gráfico, tabela e exportação em uma SPA: uma aplicação cuja interface muda sem exigir o carregamento de um novo documento HTML a cada interação.

## 2. Escopo

Inclui conversão, inversão do par, histórico, oito períodos, gráfico, tabela, filtros, ordenação, CSV e tratamento dos estados da interface.

Não inclui autenticação, cadastro, back-end próprio, banco de dados, pagamentos ou compra e venda de moedas.

## 3. Requisitos funcionais e critérios de aceite

| ID | Requisito | Como verificar quando implementado |
| --- | --- | --- |
| RF01 | Selecionar moedas de origem e destino disponíveis na API. | As opções correspondem às moedas retornadas pela API; a escolha fica visível. |
| RF02 | Converter um valor informado usando a taxa obtida. | Com dados de teste: valor 100 e taxa 2 produzem 200; em integração, a taxa corresponde ao par selecionado. |
| RF03 | Exibir taxa e data efetiva da cotação. | A interface mostra a data retornada pela API, mesmo quando diferente da data de hoje. |
| RF04 | Inverter origem e destino. | EUR/BRL passa a BRL/EUR e os dados são atualizados para o novo par. |
| RF05 | Validar entradas. | Campo vazio, valor negativo e valor não finito não produzem conversão; há mensagem orientativa. |
| RF06 | Consultar histórico de 7, 15 e 30 dias; 3 e 6 meses; 1, 5 e 10 anos. | Cada opção calcula o intervalo esperado e solicita dados do par escolhido. |
| RF07 | Exibir gráfico atualizado por par e período. | Mudar qualquer um deles atualiza a série; dados do par anterior não são apresentados como atuais. |
| RF08 | Exibir tabela com data, origem, destino e cotação. | As linhas representam os registros históricos recebidos. |
| RF09 | Filtrar por intervalo de datas e cotação mínima/máxima. | Cada filtro funciona isoladamente e em combinação; limites inclusivos são respeitados. |
| RF10 | Limpar filtros e mostrar quantidade de registros. | A limpeza restaura os registros do histórico selecionado; o contador acompanha os filtros. |
| RF11 | Ordenar por data ou cotação, crescente e decrescente. | Datas são comparadas cronologicamente e taxas numericamente; a fonte original não é alterada. |
| RF12 | Exportar CSV no navegador. | Cabeçalhos e linhas correspondem à tabela filtrada e ordenada; zero resultados impede o download; nome identifica par e período. |
| RF13 | Apresentar carregamento, erro e ausência de dados. | Cada situação pode ser distinguida; uma falha não é mostrada como resultado zero ou como consulta bem-sucedida. |

## 4. Requisitos não funcionais

| ID | Requisito | Evidência planejada |
| --- | --- | --- |
| RNF01 | Utilizar React + JSX, JavaScript e Vite. | Estrutura do projeto e build bem-sucedido. |
| RNF02 | Isolar estilos com CSS Modules. | Componentes importam seus módulos de estilo; Tailwind não substitui esta exigência. |
| RNF03 | Separar responsabilidades e aplicar props, estado, efeitos e pelo menos um Custom Hook. | Mapeamento de componentes e explicação do fluxo de dados. |
| RNF04 | Consumir a API com fetch e async/await. | Serviço de API e estados de loading/erro verificáveis. |
| RNF05 | Funcionar em desktop e celular. | Inspeção em larguras representativas, com controles utilizáveis e tabela acessível. |
| RNF06 | Permitir uso dos controles por teclado e identificar campos. | Labels, foco visível e botões semânticos. Proposta de qualidade do projeto. |
| RNF07 | Permitir instalação e execução a partir do README. | Verificação seguindo as instruções documentadas na entrega. |
| RNF08 | Demonstrar evolução incremental real. | Commits pequenos e coerentes, repositório público e documentação de IA. |

## 5. Regras de negócio

### Exigidas pelo enunciado

- RN01: a aplicação calcula o resultado por `valor informado × taxa obtida`.
- RN02: taxa e data exibidas representam a cotação efetivamente recebida.
- RN03: histórico e gráfico acompanham o par e um dos oito períodos obrigatórios.
- RN04: filtros podem ser combinados; o CSV inclui apenas os registros resultantes.
- RN05: não há exportação sem registros.

### Decisões iniciais propostas

Estas escolhas explicitam lacunas do enunciado e podem ser revistas com o aluno e os testes da API.

- RN06: aceitar zero, produzindo resultado zero; rejeitar valor vazio, negativo ou não finito. Validar o vazio antes da conversão numérica, pois `Number('')` resulta em zero.
- RN07: permitir apenas pares de moedas distintas nesta primeira versão; orientar a correção antes de consultar um par igual.
- RN08: inverter o par preserva o valor digitado. Consultar a taxa do novo par, sem reutilizar indevidamente a anterior.
- RN09: os períodos em dias são intervalos corridos inclusivos, terminando na data local atual; 7 dias começam 6 dias antes. Meses e anos usam calendário, ajustando dias inexistentes para o último dia válido do mês de destino.
- RN10: datas sem cotação publicada não recebem valores inventados. Validar no Postman como a API retorna fins de semana, feriados e intervalos antigos.
- RN11: filtros de mínimo/máximo e datas incluem os limites. Campo de filtro vazio significa ausência daquele limite; intervalos invertidos exibem orientação e bloqueiam a exportação até serem corrigidos.
- RN12: filtros são aplicados em conjunto (condição E). A tabela é ordenada depois da filtragem; o CSV mantém essa ordem.
- RN13: trocar o par ou o período limpa os filtros da tabela. A ordenação inicial será por data crescente.
- RN14: os filtros afetam tabela, contador e CSV. O gráfico continua mostrando o histórico completo do período escolhido.
- RN15: manter a precisão da taxa nos cálculos; arredondar apenas na apresentação. Definir formatação monetária por moeda na etapa de funções.
- RN16: interface padrão em português do Brasil, com opção de inglês americano conforme revisão de 24/10/2026. Formato e separador do CSV serão definidos e documentados na etapa de exportação.

## 6. Cenários de aceite para lembrar

**Conversão:** dado valor 100 e taxa fictícia 2, quando converter, então mostrar 200, a taxa 2 e a data associada. Essa taxa é um dado de teste, não uma cotação real.

**Filtros combinados:** dados registros com taxas 4, 5 e 6 dentro do intervalo de datas, quando definir mínimo 5 e máximo 6, então tabela e CSV devem conter somente os registros de taxas 5 e 6.

**Falha:** dada uma falha de rede, quando consultar, então finalizar o carregamento e mostrar erro, sem apresentar um resultado antigo como atual.

**Sem registros:** dado um filtro que elimina todas as linhas, então mostrar quantidade zero, mensagem de ausência de resultados e exportação indisponível.

## 7. Investigação pendente no Postman

Verificar endpoints v2 indicados no enunciado, formato do JSON, lista de moedas, precisão, erros, datas sem cotação, disponibilidade histórica por moeda e comportamento em intervalos de dez anos. Nenhuma dessas respostas foi testada nesta etapa.

## 8. Entregáveis

Até 27/10/2026: repositório público; aplicação executável; README; docs/REQUIREMENTS.md, COMPONENTS.md, FIGMA.md, API_TESTS.md, FUNCTION_TESTS.md e AI_USAGE.md; protótipos Figma de baixa e média fidelidade, desktop/mobile e estados; Collection Postman em JSON; imagens/evidências; histórico de commits.

## 9. Situação da validação

Este documento foi conferido contra o enunciado lido no Notion. Os critérios acima são verificações futuras, não testes já executados. A implementação e a validação funcional ainda não começaram.

## 10. Extensões solicitadas em 24/10/2026

| ID | Extensão | Critério de aceite |
| --- | --- | --- |
| EX01 | Temas claro, escuro e sistema | Persistir escolha; manter contraste e foco; não alterar os dados. |
| EX02 | Português/inglês | Traduzir interface e mensagens, localizar datas/números, preservar moeda e valores. |
| EX03 | Gráfico detalhado | Eixos/unidades, inspeção dos pontos, mínima/máxima/média e variação, com dados coerentes com a tabela. |
| EX04 | Análise individual relativa | Escolher moeda e referência distintas; alternar nominal/percentual; identificar claramente o par. |
| EX05 | Meta Selic | Valor em % a.a., data e fonte SGS 432; erros isolados. |
| EX06 | Ibovespa | Pontos, variação diária disponível, data/hora e fornecedor validado; sem substituir por ETF. |

Detalhamento, dependências e limites: [ENHANCEMENTS.md](ENHANCEMENTS.md). Os extras não substituem os requisitos do Notion. A integração do Ibovespa depende de validação do fornecedor e eventual decisão de arquitetura se exigir chave privada.

## Situação atual — 27/10/2026
As seções iniciais descrevem o planejamento de 23/10 e não substituem este balanço.
RF01–RF13 implementados. Evidências e limites de verificação em QA_FINAL.md; scripts em tests/.
RNF01–RNF04 e RNF08 presentes no código/histórico; RNF05–RNF06 inspecionados em larguras representativas e no uso do gráfico por teclado, sem auditoria universal. RNF07 documentado com lockfile e comandos de instalação/build.
A investigação da API foi realizada na etapa 07: API_TESTS.md e api-evidence/ guardam resultados. A collection existe; execução no aplicativo Postman ainda não confirmada.
EX01 parcial: claro/escuro persistidos, sem tema de sistema. EX02–EX04 implementados. EX05–EX06 pendentes: cards fictícios.
Entrega: repositório público confirmado; documentação, protótipos originais e collection presentes. Publicação e conferência do link remoto dependem dos passos em DELIVERY.md.
