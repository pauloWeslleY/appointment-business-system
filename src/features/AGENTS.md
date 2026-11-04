# Organização das features do painel

Use `google-calendar` como referência de organização. Estas instruções se aplicam somente às features deste frontend e complementam o AGENTS.md do painel.

Sempre aplique Clean Code: use nomes que expressem intenção, funções pequenas e coesas, uma responsabilidade por unidade, tipos precisos e ausência de duplicação desnecessária. Separe etapas e responsabilidades sem criar abstrações sem necessidade. Mantenha imports organizados e remova código sem uso no escopo da alteração.

- `schemas`: schemas Zod dos contratos de entrada, resposta e formulário. Identifique explicitamente API request, API response e form nos nomes. Reutilize schemas quando os formatos forem equivalentes; preserve diferenças reais entre formulário e API.
- `types`: tipos derivados dos schemas com `z.infer`. Para contratos da API e formulários, mantenha a validação em schemas. Como em members, módulos de tipos de papel, status ou escopo podem reunir os valores, o schema do enum e helpers coesos de apresentação (labels em português, cores de badges e opções de select). Não separe esses elementos apenas por serem executáveis.
- `services`: chamadas HTTP, validação de entradas e respostas, tratamento de erros e coordenação de operações externas. Declare os tipos de retorno explicitamente. Não coloque feedback ou navegação nesta camada.
- `queries`: separe `<feature>.query-key.ts`, `<feature>.query-options.ts` e `<feature>.mutation-options.ts`. Centralize chaves hierárquicas, use `queryOptions` e `mutationOptions` e faça as funções de consulta/mutação chamarem services. Use `skipToken` quando faltar uma entrada necessária. Centralize invalidações após mutations nesta camada e preserve esses callbacks ao compor hooks.
- `hooks`: formulários e coordenação da interface, mensagens, diálogos e navegação. Importe os tipos de formulário de `types`.
- `components` e `pages`: apresentação e composição. Mantenha validação, HTTP e gerenciamento de cache nas respectivas camadas.
- `constants` e `utils`: constantes e funções de transformação ou apresentação quando necessárias. Use essas pastas quando houver responsabilidade independente; não fragmente módulos coesos de enum e apresentação.

Use kebab-case nos arquivos e nomes que identifiquem operação e responsabilidade. Preserve contratos reais do backend, escopo do cache, permissões e estados assíncronos. Não copie falhas ou peculiaridades do Google Calendar: uma URL de autorização, por exemplo, não confirma que a conexão foi concluída. Não crie diretórios sem responsabilidade real.
