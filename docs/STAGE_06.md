# Etapa 06 — Eventos, useState e lifting state up

## Estado é a memória da interface

`const [amount, setAmount] = useState('100')` cria o valor atual e a função que pede sua atualização. Ao usar setAmount, React renderiza novamente o componente com o novo valor. Uma variável comum alterada diretamente não comunica essa mudança ao React.

O campo mantém uma string para representar também o estado vazio. A conversão para Number só ocorre ao validar/calcular. Zero é válido; vazio, negativo e valores não finitos não são.

## Eventos e campos controlados

`value={amount}` diz qual valor aparece. `onChange={(event) => editAmount(event.target.value)}` lê o que o usuário digitou e atualiza o estado. Juntos, value e onChange fazem um campo controlado.

O formulário usa onSubmit e event.preventDefault(): clicar no botão ou pressionar Enter calcula sem recarregar a página. Inverter usa type="button" para não enviar o formulário. Editar campos limpa o resultado antigo, evitando mostrar uma conversão que não corresponde mais à entrada.

O conversor guarda amount, pair, result e error localmente porque esses dados só afetam sua seção. O valor digitado não muda ao inverter moedas. O resultado representa uma fotografia da conversão submetida.

## Lifting state up

O gráfico e a tabela precisam do mesmo par e período. O objeto analysis fica em App, ancestral comum. HistoryPanel recebe analysis e onChange; chama a função quando o usuário escolhe algo. App atualiza o estado e deriva rows, que é enviado ao gráfico e à tabela.

`setAnalysis((previous) => ({ ...previous, [field]: value }))` usa o estado anterior e cria um novo objeto. Não alteramos props nem o objeto antigo. Se a moeda escolhida já estiver no outro lado do par, a análise inverte os lados para manter moedas diferentes. O conversor permite escolher moedas iguais, mas avisa ao tentar converter.

A análise é independente do conversor: suas moedas não mudam quando o usuário edita uma conversão.

## Tema e idioma

App guarda locale/theme e os compartilha por props. O dicionário fornece todos os textos da interface React; Intl formata moeda, números e datas. ui reúne essas operações de apresentação; não é um hook. A mudança de idioma atualiza também o idioma do documento no evento. Datas ISO de cotação são formatadas em UTC para manter o dia do exemplo.

O atributo data-theme seleciona variáveis CSS de cor. Idioma e tema voltam ao padrão quando a página recarrega. Persistência e integração de efeitos ficam para etapas seguintes.

## Demonstração e limites

interactiveDemo.js define taxas e históricos inventados, até 22/10/2026. Os oito períodos têm limites fixos para praticar eventos. Períodos relativos à data atual e funções de negócio completas serão trabalhados na etapa 08. Cada moeda tem uma curva fictícia própria relativa ao BRL; não são cotações reais.

O botão de valorização ativa a escala percentual `(taxa / primeiraTaxa - 1) * 100`. A tabela permanece em cotações nominais e seu cabeçalho identifica isso. O gráfico ainda é SVG demonstrativo, sem a biblioteca e os detalhes de interação da etapa 12. Estatísticas mostram variação percentual e taxas nominais.

Filtros, ordenação e CSV continuam desativados. Ibovespa/Selic são exemplos sem consulta. Nenhuma API, useEffect ou custom hook foi adicionado.

## Roteiro de teste

1. Converter 100 EUR para BRL: R$ 620,00 fictícios. Alterar para 200 e converter: R$ 1.240,00.
2. Inverter: preserva 200, muda para BRL/EUR; converter retorna aproximadamente € 32,26.
3. Testar vazio e -1: mensagem de validação. Testar 0: resultado zero. Escolher moedas iguais: erro ao converter.
4. Confirmar que Enter também converte e que editar uma entrada limpa o resultado anterior.
5. Na análise, selecionar USD/BRL e 10 anos: tabela passa a 12 registros. Selecionar 7 dias: cinco registros.
6. Clicar Valorização da moeda e conferir escala percentual; retornar a Par de moedas para cotação nominal. Selecione uma moeda já usada no outro lado: o par é invertido.
7. Selecionar inglês e escuro: textos, números, datas e cores mudam. Recarregar: português e claro retornam, como informado na tela.
8. Executar npm run build e npm run check:locales.

Validação pela IA: build, 106 chaves nos dicionários, renderização e passos de conversão/validação/inversão por Enter, idioma/tema e histórico de 10 anos verificados no navegador. Não houve avisos/erros de console capturados. Revisão em múltiplos dispositivos ainda pendente. Screenshot: images/stage-06-react.png.

Aguardando teste e commit do aluno. Mensagem sugerida: `feat: ativa conversao simulada, preferencias e controles de analise`.
