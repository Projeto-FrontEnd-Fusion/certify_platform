# CI/CD do frontend

O workflow `.github/workflows/ci.yml` valida PRs e a `main`: `npm ci`, ESLint sem avisos, auditoria de vulnerabilidades altas/críticas, TypeScript/build e testes Playwright em Chromium. Os testes de navegador interceptam a API e validam contratos do perfil, upload, sessão e seleção/download de certificado PDF; não substituem a coleção HTTP do backend contra MongoDB.

A auditoria roda em um job separado e salva o JSON em `frontend-dependency-audit`, inclusive quando encontra vulnerabilidades. Assim, uma falha na auditoria não impede a execução dos testes de navegador. O check `Frontend CI passed` exige tanto a validação quanto a auditoria; a separação não libera deploy com falha de segurança. Os relatórios de navegador só são enviados quando existem.

Validação em 26/10/2026: lint sem avisos, build de produção e `npm ci --dry-run --offline --ignore-scripts` aprovados no checkout local. A configuração YAML dos dois workflows foi analisada e suas dependências entre jobs verificadas. O commit remoto `87830e0` não está disponível localmente e `git fetch` está bloqueado por falta de conexão; não considerar esta validação uma reprodução desse commit. `npm audit` também não pôde acessar o registro, portanto a auditoria atual permanece pendente.

Playwright: 25 testes Chromium aprovados em 18,5 segundos, usando o build com `VITE_API_URL=http://127.0.0.1:8000/api/v1`, dois workers e reporter de terminal. A execução com `CI=true` executou os mesmos 25 cenários sem falhas, mas ficou presa no encerramento local; foi interrompida e repetida com reaproveitamento do preview e sem reporter HTML, encerrando com código zero. A geração de artifacts HTML e o encerramento do servidor no Linux ainda precisam ser validados no GitHub.

O Rollup usa a distribuição oficial `@rollup/wasm-node`, por alias e override, para executar o mesmo build em Windows e Linux sem depender de um módulo nativo bloqueado pela política de Controle de Aplicativo deste computador. O lockfile fixa a versão instalada; Dependabot mantém as atualizações.

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
