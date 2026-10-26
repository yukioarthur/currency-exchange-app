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
