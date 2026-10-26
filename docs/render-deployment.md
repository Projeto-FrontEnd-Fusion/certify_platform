# CI/CD do frontend

O workflow `.github/workflows/ci.yml` valida PRs e a `main`: `npm ci`, ESLint sem avisos, auditoria de vulnerabilidades altas/críticas, TypeScript/build e testes Playwright em Chromium. Os testes de navegador interceptam a API e validam contratos do perfil, upload, sessão e seleção/download de certificado PDF; não substituem a coleção HTTP do backend contra MongoDB.

Com `eslint-plugin-react-hooks 7.x`, o preset usado é `reactHooks.configs.flat['recommended-latest']`. O caminho sem `flat` expõe uma configuração legada com `plugins` em lista, rejeitada pelo ESLint 10. A troca preserva o preset de regras escolhido. O ambiente local ainda possui o plugin 5.2.0; a validação da configuração com o plugin 7.x e ESLint 10 deve ocorrer após instalar o lockfile atualizado.

Os 11 erros de lint reportados pelo PR #60 foram tratados nos componentes: posições fixas dos inputs sem leitura de refs durante render, estado do modal reiniciado por montagem, contagem de tentativas no callback de falha da requisição, efeito de carregamento de perfil após as declarações de estado e paginação sem atribuição inicial inútil. A configuração e as regras do CI foram preservadas. Build e 27 testes Chromium passaram localmente; os dois testes novos cobrem reabertura do modal e limite de dez tentativas. A checagem local de lint usou ESLint 9.38.0 e um arquivo temporário ignorado com o preset compatível com o plugin 5.2.0 instalado; não representa execução das novas regras do React Compiler no ESLint 10. O PR precisa confirmar essa etapa com as dependências do lockfile.

A auditoria roda em um job separado e salva o JSON em `frontend-dependency-audit`, inclusive quando encontra vulnerabilidades. Assim, uma falha na auditoria não impede a execução dos testes de navegador. O check `Frontend CI passed` exige tanto a validação quanto a auditoria; a separação não libera deploy com falha de segurança. Os relatórios de navegador só são enviados quando existem.

Após integrar a `main` da organização no commit `62d583b`, TypeScript foi fixado em `5.9.3`: `typescript-eslint 8.72.0` exige TypeScript `<6.1.0`, enquanto a atualização anterior trouxe `7.0.2` e bloqueou `npm ci` com `ERESOLVE`. Os lockfiles npm e pnpm usam a mesma versão, preservando as demais dependências. Os arquivos nativos opcionais exclusivos do TypeScript 7 foram removidos dos locks. O npm regenerou seu lockfile e passou em `npm ci --dry-run --offline --ignore-scripts`; nove restrições de peer dependencies de TypeScript foram verificadas.

Também foram restaurados o JSX e os callbacks de navegação da etapa de participantes, os campos obrigatórios de datas e seu envio ao backend. O teste de logout usa o nome acessível atual, `Sair da conta`. As verificações de sucesso da emissão e envio dos links, que haviam sido comentadas, foram reativadas, incluindo assertions das datas exigidas pelo contrato HTTP.

Lint sem avisos e build de produção aprovados no checkout integrado. As ferramentas locais ainda são ESLint 9.38.0 e Vite 7.3.7: uma instalação isolada das versões novas parou com `ENOTCACHED`, pois este ambiente não acessa o registro. Portanto, esses resultados não substituem o CI Linux com instalação completa do lockfile atualizado. `npm audit` também não pôde acessar o registro; a auditoria atual permanece pendente.

Playwright no checkout integrado: 25 testes Chromium aprovados em 21,6 segundos, usando o build com `VITE_API_URL=http://127.0.0.1:8000/api/v1`, dois workers, reporter de terminal e preview iniciado separadamente. As verificações de emissão e envio de links estão ativas. A geração de artifacts HTML e o encerramento do servidor no Linux ainda precisam ser validados no GitHub.

O Vite 8 usa Rolldown/Oxc. A configuração nativa fica em `build.rolldownOptions.output`: `minify.compress.dropConsole/dropDebugger` substitui `esbuild.drop`, e `codeSplitting.groups` substitui o antigo objeto `manualChunks`. O visualizador mantém a adaptação de tipo `PluginOption` recomendada por seu projeto. Referências: [migração do Vite 8](https://vite.dev/guide/migration.html), [codeSplitting](https://rolldown.rs/reference/OutputOptions.codeSplitting), [visualizador com Vite/TypeScript](https://github.com/btd/rollup-plugin-visualizer#vite--typescript-viteconfigts).

O alias/override `rollup` para `@rollup/wasm-node` permanece para dependências que ainda usam Rollup; ele não substitui o Rolldown do Vite 8. O ambiente local ainda tem Vite 7.3.7, por isso o build nativo do Vite 8 precisa ser validado no CI ou depois de `npm ci` com acesso ao registro. Uma aprovação com Vite 7 não valida essa configuração nova.

Relatórios de testes, traces de falhas e o build validado ficam nos artifacts do GitHub Actions. Dependabot propõe atualizações semanais de npm e Actions. Configure proteção de `main` exigindo o check `Frontend CI passed`.

No Render, criar um **Static Site**, conectado pelo GitHub a este repositório. O Blueprint define build `npm ci && npm run build`, saída `dist`, rewrite da SPA e deploy após os checks do CI (`checksPass`). O Render recompila o commit validado; não consome o artifact do GitHub.

Antes de publicar, definir `VITE_API_URL=https://<backend>.onrender.com/api/v1`. A variável é pública e embutida no bundle: mudança exige novo build. No backend, autorizar a origem real deste site em `FRONTEND_URLS`, e configurar `FRONTEND_URL` para os links de e-mail.

Localmente:

```sh
npm ci
npm run lint -- --max-warnings 0
npm run build
npx playwright install chromium
npm run test:e2e
```

Habilitar GitHub Actions se o fork estiver com workflows desativados. A criação inicial no Render deve usar um commit já validado. A implantação real depende de uma conexão autorizada com a conta Render; o Blueprint sozinho não publica o projeto.

Validação local em 08/10/2026: ESLint sem avisos, build de produção aprovado, cinco testes Chromium aprovados (incluindo conteúdo `%PDF-` no arquivo baixado), auditoria npm sem vulnerabilidades conhecidas e `npm ci --dry-run` aprovado. Os workflows ainda precisam executar no GitHub para validar o ambiente Linux e habilitar a publicação automática.
