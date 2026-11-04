# Refatoração de clientes e profissionais

## Referências

- `AGENTS.md` do frontend e `src/features/AGENTS.md`.
- Estrutura de `src/features/google-calendar`.
- Contratos de `docs/api-1.json`, conferidos com o backend nas diferenças relevantes.

## Organização

As features separam schemas de formulário e API, tipos derivados com Zod, services HTTP, query keys, query options, mutation options, hooks e componentes de apresentação. As rotas de página apenas compõem as páginas das features.

As queries usam `skipToken` quando faltam identificadores ou contexto de sessão. Usuário e organização fazem parte das chaves de cache. A invalidação fica nas mutation options; os hooks usam essas opções sem substituir seus callbacks de cache.

## Clientes

| Operação | Contrato utilizado                                    |
| -------- | ----------------------------------------------------- |
| Cadastro | `POST /admin/customer`                                |
| Edição   | `PUT /admin/customer`                                 |
| Status   | `PATCH /admin/customer/status` com `id` e `status`    |
| Detalhes | `GET /admin/customer/:customerId`                     |
| Listagem | `GET /admin/customers/establishment/:establishmentId` |

- Entradas e respostas são validadas em runtime pelos schemas.
- Os tipos refletem campos nulos, datas serializadas e os campos da organização documentados na API.
- Os formulários convertem a lista de objetos de telefone para a lista de strings esperada pela API.
- A edição preserva o vínculo de usuário existente e valores de gênero não representados no seletor quando esse campo não foi alterado.
- A tabela formata a data apenas na apresentação: o valor original continua disponível para edição.
- Os indicadores de clientes observam a mesma query da listagem e acompanham suas atualizações.
- Modelos manuais, nomes de arquivos antigos e a referência indevida a colaborador no menu de clientes foram substituídos.

## Profissionais: substituição do módulo antigo de colaboradores

O contrato atual não oferece as antigas rotas `/collaborator`. Ele separa perfil profissional e vínculo de trabalho. A feature antiga foi substituída por `src/features/professionals`, e a navegação passou para `/dashboard/$slug/professionals`.

| Operação                     | Contrato utilizado                                         |
| ---------------------------- | ---------------------------------------------------------- |
| Cadastro de perfil e vínculo | `POST /admin/professionals`                                |
| Detalhes de perfil e vínculo | `GET /admin/professionals/:professionalId`                 |
| Listagem resumida da unidade | `GET /admin/establishments/:establishmentId/professionals` |
| Edição do perfil             | `PATCH /admin/professionals/:professionalId`               |
| Edição do vínculo            | `PATCH /admin/employments/:employmentId`                   |

- A interface usa `displayName`, `phone` e os demais campos reais do contrato.
- Especialidade, status e horários pertencem ao vínculo; nome, contatos, documento, biografia e imagem pertencem ao perfil.
- Horários são períodos estruturados com dia da semana, início e fim, em vez de texto livre.
- Status do vínculo: `active`, `inactive` e `suspended`; o antigo `pending` não é enviado.
- Listagem possui busca e paginação. Detalhes completos são consultados ao abrir a edição.
- A edição envia cada grupo somente quando houver alterações nele, preservando as unidades vinculadas.
- Sem nova foto, a imagem existente é preservada. Upload e coordenação das operações ficam nos services.
- Se o perfil for salvo e a edição do vínculo falhar, o erro informa que houve atualização parcial. As consultas são invalidadas também nessa situação.

### Diferenças que decorrem da API

A listagem resumida de profissionais não retorna status, contato nem datas. A tabela usa apenas os dados disponíveis; os detalhes e o status aparecem na edição. Não são fabricados contadores de status com base nessa listagem.

As antigas operações de convite por token e exclusão/inativação de colaborador não foram mantidas como chamadas a endpoints inexistentes. O status atual é administrado pelo vínculo de trabalho.

O backend ainda aceita a pasta de armazenamento `collaborators`. Esse valor de contrato permanece no upload; não é um import do módulo antigo. Papéis de membros e campos de contagem de outras APIs não foram renomeados por pertencerem a contratos independentes.

## Verificação

- Rotas geradas com `npm run routes:generate`.
- Verificações com respostas simuladas: entradas inválidas, retornos inválidos, status de cliente, listagem de profissionais, imagem preservada, unidades preservadas, atualização parcial e invalidação do cache.
- TypeScript, ESLint e formatação verificados no escopo alterado.
- Build de produção verificado.

Não foram executadas chamadas reais à API nem inspeção visual no navegador.

## Validação manual sugerida

1. Cadastrar um cliente, editar seus dados e mudar seu status; conferir a atualização da lista e dos indicadores.
2. Editar um cliente sem data de nascimento e conferir que nenhum valor de data inválido é preenchido.
3. Abrir Profissionais, cadastrar um perfil com especialidade e adicionar períodos de trabalho.
4. Abrir a edição, alterar apenas o perfil e depois apenas o vínculo; conferir as respectivas requisições.
5. Editar sem escolher uma nova imagem e confirmar sua preservação.
6. Trocar de organização e conferir que a lista usa o novo contexto.
