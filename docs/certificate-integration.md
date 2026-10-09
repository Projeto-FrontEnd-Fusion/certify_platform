# Certificados e autenticação

Sessão: requisições autenticadas que recebem 401 renovam o acesso uma vez em `POST /auth/refresh` com `{refresh_token}`. A resposta `data.access_token` e `data.refresh_token` substitui ambos os tokens; requisições simultâneas compartilham a renovação. A requisição original é repetida uma única vez, incluindo o refresh token atualizado no logout. Renovação recusada encerra a sessão e retorna ao login. Erros 401/403 não recebem novas tentativas automáticas da consulta.

Cabeçalhos e menus usam `GET /auth/me` para nome e iniciais. Perfil e logout estão conectados nas telas existentes; logout limpa sessão e cache mesmo se a revogação falhar. Modelos em `/empresa/modelos` cria um rascunho usando os mesmos modelos da emissão, e `/modelo-certificado` redireciona para essa tela autenticada. Dashboard, alunos, relatórios e notificações aparecem como indisponíveis enquanto não há implementação. O menu da empresa também está disponível no celular.

Configure `VITE_API_URL` com a URL do backend incluindo `/api/v1`. Os fluxos de login e cadastro usam a API existente; redefinição recebe email e código do fluxo de recuperação. O backend precisa de SMTP configurado para enviar códigos e links.

A tela `/certificados/visualizar/:id` busca o registro pelo ID. Os links de validação são públicos e preservam maiúsculas/minúsculas da chave. PDF é gerado localmente a partir dos dados consultados. A listagem da empresa busca todas as páginas do emissor, aplica filtros e mantém os rascunhos locais.

A emissão informa datas reais da atividade, cria o evento e emite participantes em lote. Falhas preservam o rascunho e o ID do evento para nova tentativa. Os links dos alunos ficam adiados até clicar em enviar. O botão aparece também na listagem da empresa. `sent` indica aceite pelo servidor SMTP; falhas e pendências são mostradas com as contagens do backend.

A prévia dos modelos consulta a instituição em `GET /auth/me`. Durante a criação, usa os valores atuais do formulário e imagens carregadas, sem nomes, datas, carga horária ou código de autenticidade fictícios. O código só aparece quando há certificado emitido. Falhas na consulta do perfil são indicadas na prévia. O JSON público de certificados de exemplo foi removido.

Validação local:

```powershell
npm.cmd run build
$env:PLAYWRIGHT_CHANNEL = 'chrome' # opcional: usar o Chrome instalado
npx.cmd playwright test --reporter=line
```

Os testes de navegador substituem respostas HTTP, e os testes do backend usam MongoDB de teste e transporte SMTP substituído. Nenhum teste envia e-mail externo.
