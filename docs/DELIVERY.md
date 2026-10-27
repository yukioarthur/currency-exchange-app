# Bloco final — revisão e entrega (etapas 15 e 16)

Data: 27/10/2026. Código preparado e verificado localmente. Publicação e aceite do aluno pendentes.

## O que foi preparado
- Correção da rolagem horizontal na largura de 320 px.
- Tabela distingue consulta em andamento, erro, espera inicial e ausência de registros.
- React.lazy e Suspense separam o gráfico do pacote inicial.
- Base /currency-exchange-app/ configurada para arquivos estáticos no GitHub Pages.
- Workflow executa instalação, testes, traduções, evidências salvas e build antes de publicar.
- README atualizado, situação dos requisitos reconciliada e evidências finais registradas.

## Conceitos
**Build:** transforma o projeto em arquivos HTML/CSS/JavaScript na pasta dist.
**Hospedagem:** disponibiliza esses arquivos pela internet. Ter código no GitHub não publica a aplicação automaticamente.
**CI:** verifica cada alteração enviada. **Deploy:** publica a compilação aprovada.
**Branch:** dev concentra a evolução; main recebe a versão revisada.
**Fast-forward:** --ff-only avança main mantendo os commits existentes e para se houver divergência.
**Lazy/Suspense:** o gráfico ganha um arquivo separado, solicitado quando necessário, com mensagem enquanto carrega.
**Base:** prefixo usado para localizar os arquivos no subdiretório do repositório.

## 1. Teste antes de registrar
Abra a prévia local e confira conversão, histórico, filtros e CSV. Resultados da revisão estão em QA_FINAL.md.
Não declare a entrega publicada apenas porque o build local passou.

## 2. Registrar o bloco em dev
Execute na pasta currency-exchange-app, um comando por vez:

    git status
    git add .github/workflows/pages.yml vite.config.js index.html src/App.jsx src/index.css src/components/HistoryPanel.jsx src/components/HistoryChart.jsx src/components/HistoryExplorer.jsx src/i18n/pt-BR.json src/i18n/en-US.json README.md docs
    git diff --cached --stat
    git commit -m "chore: revisa a entrega e configura publicacao no GitHub Pages"
    git push origin dev

## 3. Ativar Pages
No repositório: Settings → Pages → Build and deployment → Source → GitHub Actions.
Configuração: https://github.com/yukioarthur/currency-exchange-app/settings/pages
Não selecione deploy de uma pasta da branch: Vite precisa compilar primeiro.
Se a opção não aparecer, confira que está autenticado como proprietário.

## 4. Levar a entrega para main

    git switch main
    git pull --ff-only origin main
    git merge --ff-only dev
    git push origin main
    git status

Se algum comando falhar, pare e compartilhe a mensagem. Não force o push.
O merge preserva o histórico incremental. O push em main dispara publicação.

## 5. Conferir online
Abra https://github.com/yukioarthur/currency-exchange-app/actions e aguarde build e deploy concluírem.
Depois abra https://yukioarthur.github.io/currency-exchange-app/ e teste:
- atualizar a página diretamente;
- converter e trocar o período;
- filtrar e baixar CSV;
- abrir pelo celular.

A URL é prevista: não havia Pages ativo na consulta pública de 27/10/2026. Este documento não comprova publicação.

## 6. Entregar
- Repositório público e link da aplicação, após confirmar que abre.
- Link Figma e permissões de visualização para o avaliador.
- Collection postman/Frankfurter.postman_collection.json. Importar no Postman e executar; guardar relatório se solicitado.
- README, docs e histórico de commits.

## Pendências transparentes
- Publicação remota só poderá ser validada após o aluno enviar este commit e configurar Pages.
- Os protótipos originais existem; a revisão extra de tema/idioma/indicadores não foi sincronizada ao Figma.
- A collection existe e seus scripts passaram sobre evidências salvas; execução no aplicativo Postman não foi confirmada.
- Selic e Ibovespa reais permanecem fora da versão funcional; os cards são demonstrações identificadas.
- Tema claro/escuro implementado; tema automático do sistema permanece apenas planejado.

Fonte da configuração: https://vite.dev/guide/static-deploy.html#github-pages
