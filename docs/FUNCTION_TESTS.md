# Etapa 08 — Funções de negócio e testes

## O que mudou

src/utils/currency.js concentra validação do valor, conversão e variação percentual. dates.js calcula os oito períodos e valida datas. history.js filtra e ordena listas. format.js apresenta números, moedas e datas por idioma.

Conversor, App e estatísticas já reutilizam conversão/formatação/variação. Os filtros não estão ligados à tela ainda. A demonstração mantém seus períodos fictícios fixos; periodRange será usado com a API na integração. O aviso visual permanece na etapa 06, a última mudança de funcionalidades da interface.

## Conceito: função pura

Uma função pura recebe dados e retorna um resultado, sem alterar os dados recebidos nem depender de estado da interface. Exemplo: convertAmount(100, 2) retorna 200. Assim podemos testar o cálculo sem abrir React ou consultar a internet.

localDate é a exceção utilitária: sem argumento consulta o relógio; com uma Date explícita seu resultado é testável. periodRange recebe a data final explicitamente para evitar testes dependentes do dia de execução.

## Regras verificadas

- Vazio, negativo, tipos indevidos e números não finitos são inválidos; zero é válido.
- Taxa deve ser um número positivo finito; overflow é rejeitado. Não arredondamos durante o cálculo.
- Variação: (última / primeira - 1) × 100; base inválida retorna null.
- Sete dias incluem início e fim: terminando em 26/10/2026, começam em 20/10/2026.
- Meses/anos respeitam calendário: 31/05 menos três meses vira 28/02 no ano de 2026; 29/02/2024 menos um ano vira 28/02/2023.
- Filtros de datas e taxas são inclusivos e combinados com E; campos vazios não restringem. Limites invertidos geram erro.
- Ordenação cria uma cópia; taxas empatadas são ordenadas por data crescente.
- Datas são YYYY-MM-DD reais. A apresentação em UTC mantém o mesmo dia em português e inglês.

Contrato de histórico: rows deve conter registros já validados com date ISO e rate numérica finita. Validação da resposta externa pertencerá ao serviço de API. As funções de filtros/ordenação não normalizam dados externos.

## Resultado dos testes — 26/10/2026

Comando: npm test (node --test, sem dependência adicional).

11 testes aprovados, zero falhas. Casos em tests/utils.test.js: conversão/precisão; entradas inválidas; taxa/overflow; valorização/desvalorização; dias inclusivos; meses/anos bissextos; datas/períodos inválidos; filtros combinados; limites inválidos; quatro ordenações e imutabilidade; localização.

Listas e registros congelados nos testes ajudam a detectar mutação acidental. Build e conferência das 106 traduções também passaram. Não houve novo teste visual nesta etapa de extração de funções. APIs, CSV e filtros interativos não foram implementados.

## Exercício do aluno

Execute npm test e leia o nome de cada caso. Compare o resultado esperado de periodRange('3m', '2026-05-31') com uma subtração ingênua de 90 dias: meses têm durações diferentes, por isso o cálculo usa calendário.

Depois execute npm run build e confira a conversão de 100 EUR em R$ 620,00 fictícios no aplicativo. Tente vazio, negativo e zero para verificar que o comportamento foi preservado.

A execução no Postman da etapa 07 continua sem evidência local; seus 21 testes sobre respostas salvas passaram novamente. Nenhum commit/push foi executado pela IA nesta etapa. Aguardando aprovação do aluno.

## Etapa 09 — Contratos do serviço

tests/services.test.js adiciona 7 testes com respostas simuladas: mapeamento de moedas, moedas inválidas, cotação/URL, histórico ordenado/vazio, dados inválidos, validações antes da rede e erros HTTP/rede/timeout/JSON. Total atual: 18 testes aprovados. As funções de conversão agora são usadas também com a cotação real recebida.
