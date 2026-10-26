# Etapa 09 — fetch e async/await

## Fluxo implementado

Carregar moedas da API → escolher moedas → Converter. Para análise: escolher par/período → Consultar histórico. Nenhuma consulta automática ao abrir a tela: useEffect será estudado na etapa 10.

src/services/frankfurter.js contém getCurrencies, getRate e getHistory. O serviço valida dados externos e devolve objetos no formato da aplicação. iso_code vira code; datas, par e taxas são verificados; histórico é ordenado e rejeita duplicações/datas fora do intervalo. EUR/BRL são exigidos na lista por serem os valores iniciais desta versão.

App guarda moedas e histórico carregados. Os limites do período são calculados a partir da data local atual usando as funções da etapa 08. A conversão usa convertAmount; a data exibida vem da resposta, não do relógio local. As taxas fictícias anteriores não são mais usadas pelo fluxo de câmbio. Ibovespa/Selic continuam marcados como exemplos.

## Conceitos

fetch inicia uma requisição e retorna uma Promise: um resultado que chegará depois. Uma função async também retorna uma Promise. await permite aguardar esse resultado dentro dela, sem bloquear toda a página.

Primeiro aguardamos a resposta; depois verificamos response.ok; por último aguardamos response.json() para ler o corpo. Uma resposta 404 não faz fetch lançar automaticamente um erro: o serviço precisa verificar o status.

try executa a operação; catch trata a falha; finally encerra o carregamento mesmo se algo falhar. Um erro do serviço é representado por uma chave traduzível, sem expor mensagens internas do servidor ao usuário.

Enquanto consulta, o formulário correspondente fica desabilitado. Isso evita mudar o par de uma consulta em andamento nesta etapa manual. Ao trocar par/período, o histórico anterior é limpo; o usuário solicita novamente. O modo percentual usa os mesmos dados sem nova chamada.

Timeout de 30 segundos evita carregamento interminável. Rede, timeout, 404, 429, demais HTTP e JSON inválido têm mensagens próprias. Lista vazia é um resultado válido, separado de falha.

## Testes e evidências — 26/10/2026

- npm test: 18 aprovados (11 utilitários + 7 serviços). Os serviços usam respostas simuladas para testar erros e contratos sem depender da rede.
- npm run build: aprovado.
- npm run check:locales: 120 mensagens consistentes.
- Navegador com API real: 170 moedas, conversão de 100 EUR em R$ 578,59, taxa 5,7859 datada de 26/10/2026. Essa é uma observação, não um valor fixo para futuras verificações.
- Histórico EUR/BRL de 20/10/2026 a 26/10/2026: sete registros. Ao mudar para USD, a tabela foi limpa; nova consulta exibiu USD/BRL (primeiro registro observado 5,0376 em 20/10).
- Inglês/escuro conferidos; sem erros/avisos capturados no console. Imagem: images/stage-09-react.png.

A prévia local estava encerrada e foi reiniciada na porta 4174. Falhas HTTP/rede foram testadas com simulações no serviço, não provocadas manualmente no navegador. Outros pares/períodos e dispositivos ainda precisam da rodada final de testes.

## Roteiro do aluno

1. Abrir npm run dev ou a prévia local e clicar Carregar moedas da API.
2. Converter 100 EUR/BRL: conferir resultado = 100 × taxa exibida, arredondado para apresentação. Não esperar R$ 620,00 da demonstração anterior.
3. Inverter e converter; observar a nova taxa e data.
4. Consultar histórico de sete dias. Mudar o par/período: dados antigos desaparecem; clicar Consultar histórico novamente.
5. Experimentar inglês/escuro e valorização percentual.
6. Rodar npm test, npm run build e npm run check:locales.

Sem filtros/CSV ativos, biblioteca de gráficos, persistência, useEffect ou hooks próprios nesta etapa. Publicação GitHub Pages e execução Postman pelo aluno continuam pendentes. Nenhum commit/push executado pela IA.

Commit sugerido: feat: integra moedas e cotacoes reais com Frankfurter
