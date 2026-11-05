# Responsividade do painel administrativo

## Escopo e critério de entrega

Revisão de 4 de novembro de 2026. O escopo atualizado pelo usuário é implementar
os ajustes em todas as páginas e revisar estaticamente os breakpoints. A validação
visual será realizada pelo usuário. Esta entrega não declara páginas ou larguras
validadas visualmente, nem testes de autenticação, dados ou gravações externas.

As alterações existentes de agendamentos, serviços, avaliações e configurações
foram preservadas, incluindo `websiteUrl`. Não houve alteração de backend,
migrations ou contratos HTTP nesta tarefa.

## Tema e breakpoints efetivos

O pacote instalado é `@chakra-ui/react` **3.37.0**. O tema compõe `defaultConfig`
com a configuração local, sem declarar breakpoints personalizados.

| Token | Início nominal na versão instalada | Larguras para conferência manual |
| --- | --- | --- |
| `base` | 0 | 320, 360, 375, 390, 414, 430, 479 |
| `sm` | 480 | 480, 640, 767 |
| `md` | 768 | 768, 820, 1023 |
| `lg` | 1024 | 1024, 1279 |
| `xl` | 1280 | 1280, 1535 |
| `2xl` | 1536 | 1536 e desktop maior |

A [documentação oficial de responsividade do Chakra UI v3](https://chakra-ui.com/docs/styling/responsive-design)
foi consultada. Os ajustes usam objetos mobile-first e os tokens do projeto.
Há uma diferença relevante: a página consultada apresenta `lg` como 992 px,
enquanto `node_modules/@chakra-ui/react/dist/esm/theme/breakpoints.js` da versão
instalada define 1024 px. O código segue a versão instalada. As consultas
responsivas são produzidas pelo Chakra; não foram introduzidos breakpoints
personalizados em pixels para substituir o tema.

## Ajustes compartilhados

- O conteúdo pode encolher dentro do layout flex, com rolagem vertical própria;
  a sidebar tem rolagem para janelas baixas e aparece a partir de `lg`.
- O menu mobile usa os mesmos itens, permissões, resolução de parâmetros e estado
  ativo do layout desktop. Rótulos permanecem visíveis mesmo quando a sidebar
  desktop está recolhida; a seleção fecha o drawer.
- Cabeçalhos, navegação por abas, filtros e rodapés de paginação permitem quebra
  de linha. Buscas e selects respeitam a largura do contêiner.
- Cards, campos e listas de dados permitem encolhimento e quebra de textos longos.
  O tema inclui tamanhos mínimos de alvos para dispositivos com ponteiro de toque.
- Tabelas extensas têm rolagem horizontal local, foco por teclado e identificação
  da região. Não foi aplicado `overflow-x: hidden` global para esconder problemas.
- Diálogos respeitam a largura e altura dinâmica da viewport; formulários longos
  e rodapés com ações podem rolar/quebrar. Menus e selects usam superfícies limitadas
  à viewport. Os dados e callbacks de gravação foram preservados.
- Quatro consumidores de dados de clientes/profissionais foram ajustados para
  desestruturar `establishment` do retorno atual do loader, corrigindo erros de tipos
  encontrados durante a verificação técnica.

## Inventário de páginas e revisão estática

Todas as linhas abaixo receberam revisão de composição e dos componentes
compartilhados usados pela página. **Nenhuma célula representa teste visual.**
A matriz de larguras acima se aplica a todas as páginas; o resultado visual em
cada combinação página × largura fica para a conferência manual do usuário.

| Página/rota pública | Composição revisada e tratamento |
| --- | --- |
| `/` | Landing: navegação compacta até `lg`, rodapé com quebra; seções existentes usam grids responsivos. |
| `/login` | Layout de autenticação, formulário e links com quebra; banner somente em `xl`, sem coluna mínima de 800 px. |
| `/register` | Mesmo layout; links e ações com quebra. |
| `/forgot-password` | Mesmo layout; formulário existente em coluna única. |
| `/reset-password` | Mesmo layout; formulário existente em coluna única. |
| `/verify-email` | Mesmo layout; mensagens e ações existentes. |
| `/invitation` | Mesmo layout, cabeçalho do convite com quebra, informações e ações de aceite/recusa. |
| `/organization-profile` | Criação inicial: botão de tema dentro da viewport, formulário e ação de copiar nome empilháveis. |
| `/establishment` | Cabeçalho/filtros, estatísticas, cards, dados de agenda e paginação. |
| `/establishment/new` | Etapas com quebra; dados gerais, telefones, endereço, horários e resumo final. |
| `/establishment/$establishmentSlug` — editar | Formulário de dados gerais, agrupamento de fuso/e-mail/status e telefones. |
| Mesma rota — upload | Grid com colunas de mínimo zero; componentes de arquivos compartilhados. |
| Mesma rota — endereço | Campos em 1/2/4 colunas e ações com quebra. |
| Mesma rota — pagamentos e cores | Campos/fieldset, QR codes com quebra, seleção de cores em 1/2/3 colunas. |
| `/organization` | Resumo, formulário de edição, situação/rádios e seletor de organização. Corrigido span que criava coluna implícita no mobile. |
| `/organization/create` | Formulário reutilizado de criação empresarial. |
| `/team-management/members` | Abas, estatísticas, busca, cards em 1/2/3/4 colunas e drawer de edição de papel/escopo/status. |
| `/team-management/invitations` | Busca, tabela com rolagem local, envio e cancelamento em diálogos limitados à viewport. |
| `/account` — perfil | Abas com quebra, cards e formulário de perfil/imagem; informações adicionais com mínimo limitado ao contêiner. |
| Mesma rota — membro/permissões | Grids existentes com `minmax(min(..., 100%), 1fr)` e listas de dados compartilhadas. |
| `/settings` | Cadastro fiscal, filtros, tabela, diálogos fiscais, permissões e integrações Google Calendar. Removida coluna fixa de 600 px. |
| `/dashboard/$slug/overview` | Cabeçalho/período, estatísticas em 1/2/4 colunas, gráfico, tabela diária com rolagem e rankings com textos limitados ao contêiner. |
| `/dashboard/$slug/services` | Filtros, estatísticas em 1/2/3/5 colunas, cards em 1/2/3/4 colunas e paginação com quebra. |
| `/dashboard/$slug/services/new` | Formulário e upload existentes responsivos, campos compartilhados com mínimo zero. |
| `/dashboard/$slug/services/$serviceEstablishmentId/info` | Cabeçalho, imagem/dados empilháveis e histórico com rolagem local. |
| `/dashboard/$slug/services/$serviceEstablishmentId/edit` | Formulário em 1/2/4 colunas, descrição/seções em largura completa e upload com quebra. |
| `/dashboard/$slug/bookings` | Busca, período, filtros, estatísticas, cards e paginação; detalhes/reagendamento/status em diálogos. |
| `/dashboard/$slug/reviews` | Estatísticas empilháveis, busca/filtro com quebra, cards e paginação. |
| `/dashboard/$slug/professionals` | Cabeçalho/busca, tabela com rolagem local e editor em diálogo; formulário e horários compartilhados. |
| `/dashboard/$slug/customers` | Filtros, cards de dados rotulados em 1/2/8 colunas, detalhes e criação/edição em drawer. Corrigidos spans que criavam colunas implícitas no formulário. |
| `/subscription` | Organização, resumo, cobrança, avisos e cancelamento; ações longas com quebra e seletor sem mínimo fixo. |
| `/subscription/return` | Mesma composição de assinatura e estado de retorno existente. |
| `/subscription/canceled` | Mesma composição de assinatura e estado de cancelamento existente. |
| `/error`, `/access-denied` e página não encontrada | Mensagens/ações reutilizadas; acesso negado limitado ao contêiner e ações de erro com quebra. |

Layouts sem conteúdo próprio: `__root`, `_auth`, `_authenticated`,
`_subscription`, `/dashboard/$slug`, layout de detalhes de serviço e layout de
equipe. Entradas `/team-management` e `/dashboard` mantêm redirecionamento ou
carregamento já existentes; não foram inventadas novas telas.

## Conferência manual reservada ao usuário

Além das larguras da matriz, conferir 844 × 390 em paisagem, janela de baixa
altura e zoom de 200%. Usar nomes/e-mails/URLs longos e listas vazias, com erro,
carregando e preenchidas. Nas tabelas, conferir foco e rolagem local; nos drawers
e diálogos, conferir teclado, fechamento, ações finais e formulário longo.

O navegador local chegou a ser tentado antes da atualização do escopo, mas o
servidor não pôde ser acessado. Não houve inspeção visual bem-sucedida, screenshots
ou operações de gravação. Depois da atualização, não foram executados novos
testes visuais. A ausência desses testes não é tratada como bloqueio da entrega.

## Verificações técnicas

- `npx tsc -b`: aprovado, sem erros na versão final dos arquivos.
- `npx vite build --logLevel warn`: aprovado. Permanece o aviso de chunks maiores
  que 500 kB; não foi alterada a estratégia de divisão do bundle nesta tarefa.
- ESLint dos **121 arquivos de código alterados nesta tarefa**: aprovado,
  sem erros ou avisos.
- `npm run lint`: quatro erros anteriores em arquivos sem alteração nesta tarefa:
  `src/components/ui/color-mode.tsx` (duas ocorrências de
  `react-refresh/only-export-components`), `src/components/ui/toaster.tsx`
  (uma ocorrência da mesma regra) e `src/components/ui/tooltip.tsx`
  (ordenação de imports). O diff desses três arquivos permanece vazio.
- Revisão de whitespace: aprovada com `cr-at-eol`, respeitando os finais de linha
  CRLF já usados pelo repositório.
- Não foram alterados nomes/valores de tokens ou rotas; não houve necessidade de
  gerar tipos de tokens nem de editar manualmente a árvore de rotas.
