# Registro de uso de IA

## 23/10/2026 — Etapa 01: planejamento

- **Ferramenta:** Codex, assistente de IA.
- **Solicitação:** apoio como mentor, desenvolvimento por etapas, explicação dos conceitos e commits a cada evolução.
- **Referências:** enunciado e board Currency Exchange App no Notion; materiais das aulas Weather App, Simulador de Investimentos, Tailwind e Image Slider consultados na conversa.
- **Contribuição da IA:** organização de requisitos e critérios de aceite; propostas explícitas para decisões não definidas pelo enunciado; README inicial e roteiro didático; preparação do repositório local e commit documental.
- **Arquivos produzidos:** README.md, docs/REQUIREMENTS.md, docs/LEARNING_LOG.md e este registro.
- **Verificação:** conferência documental do escopo. Ainda não existem código da aplicação, testes funcionais, protótipos ou testes de API.
- **Participação do aluno:** forneceu o enunciado e as referências, decidiu iniciar do zero e solicitou acompanhamento incremental. A revisão das decisões propostas e o exercício de compreensão estão pendentes.

Atualizar este registro a cada etapa assistida. Não atribuir ao aluno uma revisão, implementação ou teste que ele ainda não realizou.

## 23/10/2026 — Etapa 02: protótipos e arquitetura prevista

- **Solicitação:** continuar para a próxima etapa do board.
- **Contribuição da IA:** criação de arquivo Figma com seis composições editáveis; uso de controles da biblioteca Simple Design System; proposta de cores e fonte; revisão visual e correções; exportação de seis imagens; FIGMA.md e COMPONENTS.md; atualização do README e do registro de aprendizagem.
- **Verificação realizada pela IA:** inspeção visual das seis composições, fonte Inter, presença de textos, instâncias e vetores editáveis. Não houve testes de aplicação ou API.
- **Limitações:** protótipos estáticos, sem interações configuradas; dados fictícios. O aluno ainda não confirmou a aparência ou o mapa de componentes.
- **Versionamento:** commit documental desta etapa; o arquivo editável permanece no Figma e suas evidências PNG ficam no Git.

## 24/10/2026 — Revisão solicitada pelo aluno

- **Solicitação:** tema escuro, inglês e arquivo de traduções, gráfico detalhado, análise individual, Ibovespa e Selic.
- **Contribuição da IA:** dois dicionários de 98 chaves, documentação de integração, prévia HTML/CSS/JS com dados fictícios, verificador de traduções, servidor local de prévia e atualização dos requisitos/arquitetura.
- **Pesquisa:** documentação Frankfurter, BCB SGS 432, B3 e brapi. A leitura de documentação não constitui teste dos endpoints.
- **Verificação:** sintaxe e paridade de traduções; troca de idiomas/temas, persistência e controles do gráfico no navegador. Evidências em images/preview-dark-english.png e images/preview-analysis-dark.png.
- **Limitações:** Figma bloqueado pelo limite de chamadas Starter; integração Ibovespa não confirmada; APIs, conversão, filtros e CSV não implementados; mobile ainda não inspecionado nesta revisão.
- **Participação do aluno:** definiu as extensões; revisão visual da nova proposta ainda pendente.

## 25/10/2026 — Etapa 03

- Solicitação do aluno: retomar as próximas etapas aqui no Codex.
- Contribuição da IA: configuração React/Vite, interface JSX estática baseada no protótipo local revisado, CSS Modules, documentação de execução e guia didático.
- Validação: build de produção, verificador de 98 traduções, conferência de whitespace e inspeção da aplicação no navegador; sem erros/avisos capturados no console.
- Limites: não houve integração de APIs nem implementação dos controles; a inspeção visual foi no painel disponível, sem validação completa em múltiplos dispositivos. Revisão pelo aluno ainda pendente.
- Histórico: implementação real na branch dev, preservando main na etapa anterior.

## Etapa 04 — Organização do código

A IA extraiu componentes e seus estilos a partir da interface existente, mantendo os dados fictícios. Verificou build, traduções e conteúdo no navegador. O aluno solicitou executar pessoalmente commit/push após testar: nenhuma dessas ações foi executada pela IA. Revisão visual do aluno pendente.

## 26/10/2026 — Etapa 05

A IA implementou props, CurrencySelect reutilizável, dados fictícios centralizados e listas com map. Adaptou o SVG ilustrativo e estatísticas para refletirem a mesma série da tabela. Verificou build, 98 traduções e renderização, sem erros/avisos capturados. O exercício didático fica para o aluno; não há APIs, estado nem controles ativos nesta etapa. Commit/push e aprovação pertencem ao aluno.

## 26/10/2026 — Etapa 06

IA implementou eventos/useState e compartilhamento de escolhas via App, tradução completa da tela React e cores de tema. Taxas/curvas inventadas e limites de período fixos servem apenas ao exercício. Verificações: build, paridade de 106 mensagens e navegador (conversão, vazio/negativo/zero, moedas iguais, troca, Enter, inglês/escuro, par/período/percentual). Sem erros/avisos de console capturados. Sem API ou persistência. Aluno fará sua revisão e executará commit/push.

## 26/10/2026 — Etapa 07

IA consultou documentação Frankfurter/Postman, executou nove requisições públicas via Node fetch, salvou respostas e preparou Collection com 21 verificações. Executou os scripts da Collection sobre evidências salvas em Node, sem runtime/interface do Postman. Execução no Postman pelo aluno permanece pendente. Não integrou API na tela nem executou commit/push.

## 26/10/2026 — Etapa 08

IA extraiu utilitários, conectou conversão/formatação/variação existentes e criou 11 testes de casos de borda usando node:test. Todos passaram; build e traduções também. Filtros e calendário real não ligados à demonstração. Não realizou novo teste visual nem executou commit/push. Aluno deve testar antes de avançar.

## 26/10/2026 — Etapa 09

IA implementou serviço e conectou consultas manuais à UI. Testou 7 cenários de serviços com respostas simuladas mais 11 utilitários; verificou build, 120 traduções e consultas reais no navegador. Observou 170 moedas, EUR/BRL, histórico de sete dias e limpeza ao trocar o par. API de indicadores, efeitos, filtros e CSV permanecem pendentes. Não realizou commit/push. Evidência em images/stage-09-react.png.
