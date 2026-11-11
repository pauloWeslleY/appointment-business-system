# CLEAN CODE OBRIGATÓRIO — PROFESSIONALS

**Sempre aplique CLEAN CODE em toda criação, alteração e revisão desta feature.**
Estas regras complementam os AGENTS.md do painel e de `src/features`.

- Use nomes que expressem intenção e o conceito correto: perfil (`professional`), vínculo (`employment`) e jornada (`workSchedule`). Mantenha nomes consistentes entre hooks, componentes e services.
- Nomeie estados assíncronos pelo recurso ou ação, como `isLoadingProfessionals`, `professionalDetailsError` e `isUpdatingProfessional`. Dê contexto aos estados genéricos ao desestruturar consultas e mutations.
- Em objetos retornados por hooks, use apenas referências nomeadas com a sintaxe abreviada (`{ isLoadingProfessionals, retryProfessionals }`). Defina valores derivados, aliases e callbacks antes do `return`.
- Escreva funções pequenas e coesas, com uma responsabilidade. Separe upload, mapeamento de dados, comunicação HTTP e coordenação do salvamento. Não fragmente código sem responsabilidade própria.
- Evite duplicação de mapeamentos, contratos e regras. Reutilize funções e tipos quando representarem o mesmo conceito.
- Use retornos antecipados, blocos em todos os `if` e constantes descritivas para condições complexas. Evite flags mutáveis que possam ser substituídas pelo fluxo de execução.
- Preserve contratos HTTP, validação Zod, permissões, escopo de cache, comportamento do formulário e tratamento explícito de falhas. Não apresente um salvamento parcial como sucesso completo nem suponha transação entre chamadas HTTP.
- Declare retornos dos services e derive contratos externos dos schemas. Em `httpDependencies<T>()`, informe sempre o tipo concreto de resposta; `unknown`, `any` e omissão do genérico são proibidos.
- Mantenha upload e chamadas HTTP nos services, invalidação nas mutations, coordenação nos hooks e apresentação nos componentes. Não coloque mensagens ou navegação nos services.
- Centralize as chaves de consultas em `professionals.query-key.ts`, incluindo o contexto de usuário e organização. Não replique dados remotos em estado local.
- Preserve acessibilidade, estados de carregamento/erro/vazio e bloqueio de envios duplicados. Extraia componentes somente quando houver responsabilidade visual clara.
- Antes de concluir, revise clareza, coesão, duplicação, tipagem, erros e preservação do comportamento. Execute lint, TypeScript e verificações proporcionais à alteração; compilação sozinha não substitui revisão de Clean Code.
