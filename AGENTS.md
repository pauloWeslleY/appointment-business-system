# Instruções do frontend

Estas instruções se aplicam a `appointment-business-system` e seus subdiretórios. Este é o painel administrativo em React, TypeScript e Vite. O backend fica em `../back-end`; o projeto `../front-end` é outro frontend e não deve ser alterado automaticamente junto deste painel.

## Escopo e preservação do trabalho

- Execute o pedido atual do usuário. Não transforme uma análise ou atualização documental em implementação.
- Antes de editar, confira `git status` e leia os arquivos envolvidos. Preserve alterações concorrentes, inclusive no mesmo arquivo. Não reverta, sobrescreva, faça commit ou descarte trabalho alheio sem solicitação.
- Limite alterações aos arquivos necessários. Não refatore outras features, atualize dependências ou altere configurações por conveniência.
- Não altere `.env`, banco compartilhado, configurações Stripe, publicação ou deploy como efeito colateral de uma mudança de interface.
- Não deixe logs temporários na raiz do projeto. Não acrescente infraestrutura de testes, fixtures ou servidores de demonstração quando não forem necessários ao pedido. Não recrie arquivos auxiliares que o usuário mandou remover.
- Quando trabalhar com checklist, preserve títulos, ordem e texto dos itens. Marque um item composto somente quando todas as suas partes estiverem implementadas e validadas; mantenha evidências detalhadas em documento separado.

## Stack e referências

- Interface: React e Chakra UI, com os componentes e tokens existentes em `src/components` e `src/theme`.
- Rotas: TanStack Router, com arquivos em `src/pages`.
- Dados remotos: TanStack Query; estado local da interface: hooks React. Reutilize Zustand somente onde fizer sentido no padrão existente.
- Formulários: React Hook Form e Zod.
- HTTP: Axios e a infraestrutura existente em `src/shared` e `src/lib/axios-client`.
- Autenticação: Better Auth, pelo client de `src/lib/auth`.
- Leia a camada equivalente de uma feature existente antes de criar outra. Use `src/features/establishment` como referência de organização, conferindo os contratos atuais do backend antes de copiar chamadas antigas.

## Organização das features

Mantenha rotas finas em `src/pages` e o comportamento da funcionalidade em `src/features/<feature>`. Use nomes de arquivos e diretórios em kebab-case.

- `components`: componentes visuais da feature.
- `pages`: composição das telas da feature.
- `hooks`: coordenação do comportamento da interface.
- `queries`: query keys, query options, mutations e invalidação de cache.
- `services`: comunicação com a API e adaptação de respostas.
- `schemas`: validação de formulários e contratos externos.
- `types`: contratos TypeScript explícitos.
- `constants`, `utils`, `validations` e `layout`: somente quando houver responsabilidade real correspondente.

Não crie diretórios vazios nem uma arquitetura paralela para uma funcionalidade pequena. Componentes não devem concentrar requisições HTTP, validação, transformação e regras de negócio no mesmo arquivo.

## Código e React

- Escreva funções e componentes coesos, com nomes que expressem intenção. Extraia etapas independentes e evite duplicação.
- Todos os `if` devem ter blocos `{}`. Para condições complexas, calcule uma constante com nome descritivo antes do bloco.
- Use tipos precisos. Prefira `unknown` com validação nas fronteiras; não use `any`, casts encadeados ou desativação de regras para esconder incompatibilidades.
- Use imports de tipos conforme o ESLint, mantenha imports ordenados e remova imports sem uso.
- Respeite as regras dos hooks. Não faça efeitos colaterais durante a renderização nem use effects para duplicar estado que pode ser derivado dos dados existentes.
- Não duplique em estado global os dados já gerenciados pelo TanStack Query. Invalide as queries afetadas após mutations e trate respostas atrasadas ao trocar contexto.
- Reutilize componentes e tokens do tema. Preserve responsividade, modo claro/escuro, labels, navegação por teclado e feedback acessível.
- Toda operação assíncrona deve apresentar estados de carregamento, erro, vazio e sucesso quando aplicáveis. Evite cliques duplicados durante mutations.

## Rotas, sessão e contratos

- Não edite `src/routeTree.gen.ts` manualmente. Após alterar rotas, execute `npm run routes:generate`.
- Preserve os fluxos de autenticação e navegação existentes. Não substitua guards globais para atender uma única tela sem analisar os demais consumidores.
- Use os métodos, caminhos, payloads e códigos de erro reais do backend. Não invente endpoints nem apresente uma funcionalidade ausente como disponível.
- Preserve o envio de cookies nas chamadas autenticadas. Não exponha tokens, dados de pagamento ou segredos em logs, URLs ou arquivos versionados.
- Trate usuário e organização como parte do escopo do cache. A troca de organização deve invalidar dados incompatíveis e impedir ações com contexto antigo.
- Permissões exibidas no frontend não substituem autorização no backend. Não conceda poderes de operador da plataforma a um papel administrativo da organização por inferência.
- Valide dados externos antes de usá-los. Trate erros de autorização e indisponibilidade sem substituir falhas por sucesso aparente.
- Em assinaturas, o backend é a autoridade para pagamento, acesso, tolerância e período vigente. Retorno do Checkout ou parâmetros da URL não confirmam pagamento.
- Exiba datas com fuso explícito quando isso afetar prazos comerciais. Não altere direitos de acesso com base apenas no relógio do navegador.

## Verificação e entrega

- Siga `.prettierrc` e `eslint.config.js`; não formate o repositório inteiro para uma alteração localizada.
- Execute verificações proporcionais à mudança. Para documentação isolada, revise o conteúdo e o diff; não execute testes financeiros ou builds desnecessários.
- Comandos disponíveis: `npm run routes:generate`, `npm run lint`, `npm run theme:build` e `npm run build`.
- O script atual de `build` executa instalação do Chakra CLI. Para verificar tipos e bundle sem essa instalação, use `npx tsc -b` e `npx vite build`. Gere tipos do tema quando uma alteração no tema exigir isso.
- Use a infraestrutura de testes existente quando disponível. Não instale ferramentas ou adicione dependências sem necessidade concreta para a tarefa.
- Testes de pagamentos devem usar fakes ou ambientes de teste explicitamente autorizados; nunca gerar cobranças ou reembolsos reais para validar a interface.
- Inspeção visual não pode ser declarada concluída com base apenas em compilação ou renderização estática. Respeite recusas de acesso ao navegador e reporte a limitação sem contorná-la.
- Antes de concluir, revise o diff e informe o que mudou, o que foi efetivamente validado e quais pendências continuam abertas. Não declare uma seção inteira concluída por entregar apenas parte dela.
