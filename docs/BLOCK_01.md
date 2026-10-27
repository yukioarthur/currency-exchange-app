# Bloco 1 — Etapas 10 e 11: efeitos e Custom Hooks

## Resultado

Moedas carregam ao abrir. O histórico carrega quando a lista está disponível e sempre que base, referência ou período mudam. Botões Atualizar permitem repetir uma consulta após erro ou atualizar os dados. A conversão continua acionada pelo formulário, evitando chamadas a cada tecla digitada.

Tema e idioma persistem no localStorage deste navegador/origem. Outro navegador, porta ou dispositivo pode ter preferências diferentes. Valores inválidos salvos são ignorados; se armazenamento estiver bloqueado, o aplicativo funciona e informa que a preferência só vale para a sessão.

## Etapa 10: useEffect

Um efeito sincroniza React com algo externo, como uma consulta ou armazenamento. O array de dependências determina quando repetir essa sincronização. O histórico depende do par e das datas; idioma, tema e escala percentual não modificam esses parâmetros e não precisam consultar novamente.

Ao mudar a seleção, React executa a limpeza do efeito anterior. Usamos AbortController para cancelar a requisição e uma variável active para impedir a resposta anterior de atualizar o estado mesmo que o cancelamento chegue tarde. Cada resultado tem uma chave com os parâmetros e a tentativa; uma resposta de outra chave não é exibida na renderização atual.

O serviço combina o sinal externo com timeout de 30 segundos. Cancelamento por troca de seleção não é tratado como falha de rede. A conversão manual conserva o comportamento anterior.

StrictMode pode iniciar, limpar e repetir efeitos no desenvolvimento para verificar se a limpeza funciona. Isso é esperado; não removemos StrictMode para esconder consultas duplicadas de desenvolvimento.

## Etapa 11: Custom Hooks

- useRequest: ciclo reutilizável de consulta, status, erro, tentativa e cancelamento.
- useCurrencies: consulta e normalização da lista.
- useHistory: parâmetros, período e estado vazio do histórico.
- usePreferences: leitura inicial e efeitos de gravação/idioma do documento.

Cada uso do hook possui seu próprio estado; hooks compartilham lógica, não uma memória global. Continuamos com a seleção da análise em App, compartilhada por gráfico e tabela.

useCallback mantém a identidade da função de consulta enquanto seus parâmetros não mudam. Sem isso, criar uma função nova em toda renderização poderia reiniciar o efeito repetidamente. Os hooks são chamados no topo das funções, sem condições ou loops.

## Verificação — 27/10/2026

23 testes aprovados: 18 anteriores, 2 de cancelamento do serviço e 3 de armazenamento (válido, inválido/bloqueado e gravação). Build e 121 traduções aprovados.

Navegador: 170 moedas e sete registros carregados automaticamente; trocas rápidas USD/1 ano → GBP/7 dias terminaram em GBP/BRL; atualização manual retornou sete registros; inglês/escuro foram restaurados após reload. A primeira rodada encontrou setHistoryState remanescente em App; foi removido e o cenário repetido com sucesso. Nenhum erro/aviso referente ao bundle final foi capturado. Evidência: images/block-01-react.png.

Limites da validação: não foi simulada uma resposta deliberadamente fora de ordem no runtime React; o cancelamento foi testado no serviço e as trocas rápidas no navegador. A rodada completa de dispositivos e erros visuais fica no bloco final.

## Seu roteiro

1. Recarregue: moedas e histórico devem aparecer sem clicar em carregar.
2. Troque moeda/período rapidamente: confira se cabeçalho, tabela e gráfico correspondem à última seleção.
3. Alterne para inglês/escuro e recarregue: preferências devem permanecer.
4. Use Atualizar histórico; confirme que pode repetir a consulta.
5. Converta um valor para conferir que o formulário manual continua funcionando.
6. Execute npm test, npm run build e npm run check:locales.

Exercício: por que mudar o idioma não deve consultar novamente o histórico? Porque o idioma muda a apresentação; base, referência e datas da consulta permanecem iguais.

Aguardando teste e commit do aluno. Nenhum commit/push executado pela IA. Próximo bloco: gráfico com biblioteca, filtros/ordenação e CSV (12–14).
