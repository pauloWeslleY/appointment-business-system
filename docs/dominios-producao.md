# Domínios de produção

## Projetos na Vercel

| Domínio | Projeto / Root Directory | Página |
| --- | --- | --- |
| `agendros.com.br` | `appointment-business-system` | Landing page em `/` |
| `admin.agendros.com.br` | `appointment-business-system` | `/` redireciona para `/login` |
| `cliente.agendros.com.br` | `front-end` | Site de agendamento do cliente |

Em **Settings → Domains** do projeto do painel, adicione os dois primeiros
domínios à produção. Ambos precisam servir o projeto; não configure um
redirecionamento de domínio inteiro entre eles. A separação das páginas é feita
pela aplicação. Não é necessário criar outro projeto para a landing page.

No projeto Next.js `front-end`, adicione somente `cliente.agendros.com.br`.

## DNS

Use exatamente os valores exibidos pela Vercel ao adicionar cada domínio:

| Tipo | Nome | Destino |
| --- | --- | --- |
| A | `@` / `agendros.com.br` | IP informado pela Vercel para o domínio raiz |
| CNAME | `admin` | Destino informado pela Vercel no projeto do painel |
| CNAME | `cliente` | Destino informado pela Vercel no projeto do cliente |

O registro `api.agendros.com.br` continua destinado ao backend no Render.
Adicione também esse domínio nas configurações de domínio personalizado do
serviço no Render, caso ainda não esteja cadastrado.

Na captura de DNS fornecida, existe o registro de `admin`, mas falta `cliente`.
Confira se o A `216.198.79.1` e o CNAME do admin correspondem aos valores
solicitados atualmente pela Vercel. Não copie automaticamente o CNAME do admin
para o cliente: consulte o valor no projeto do cliente.

## Variáveis de produção

Configure pelos painéis de hospedagem e gere novos deploys dos frontends:

- Painel na Vercel:
  - `VITE_API_URL=https://api.agendros.com.br`
  - `VITE_WEB_URL=https://admin.agendros.com.br`
- Cliente na Vercel:
  - `API_URL=https://api.agendros.com.br`
  - `NEXT_PUBLIC_AUTH_URL=https://api.agendros.com.br`
- Backend no Render:
  - `ADMIN_URL=https://admin.agendros.com.br`
  - `CUSTOMER_URL=https://cliente.agendros.com.br`
  - `BETTER_AUTH_URL=https://api.agendros.com.br`
  - `AUTH_COOKIE_SAME_SITE=lax`

O modelo `back-end/.env.production.example` ainda aponta `CUSTOMER_URL` para
o domínio raiz; para esta distribuição, use o subdomínio `cliente` no Render.
Confira os callbacks de autenticação configurados no Google se esse login
estiver habilitado. Não altere credenciais para mudar os domínios.

## Comportamento da aplicação

- A landing fica em `https://agendros.com.br/`, incluindo suas âncoras de seção.
- Os botões Entrar e Criar conta levam ao subdomínio administrativo.
- Rotas da aplicação acessadas no domínio raiz são redirecionadas para o admin,
  preservando caminho, parâmetros e fragmento.
- A raiz do admin abre `/login`; a proteção de autenticação existente encaminha
  quem já tem sessão para o painel.
- Em localhost e previews, as rotas continuam no domínio de desenvolvimento.

Essas regras de navegação não substituem as permissões do backend.

## Verificação depois do deploy

1. Aguarde os domínios aparecerem válidos na Vercel e o certificado HTTPS ficar pronto.
2. Abra o domínio raiz: deve exibir a landing sem mudar para o admin.
3. Clique em Entrar e Criar conta, inclusive no menu mobile e nos planos: devem abrir o admin.
4. Abra `admin.agendros.com.br/`: deve abrir login ou encaminhar a sessão existente.
5. Abra uma rota do painel pelo domínio raiz e confira o redirecionamento para o admin.
6. Abra o domínio do cliente e valide agendamento, login, persistência da sessão e logout.

As alterações locais não cadastram domínios, não modificam DNS e não publicam
os projetos. Esses passos precisam ser aplicados na hospedagem.

Referências: [domínios na Vercel](https://vercel.com/docs/domains/set-up-custom-domain)
e [configuração de redirects](https://vercel.com/docs/project-configuration/vercel-json).
