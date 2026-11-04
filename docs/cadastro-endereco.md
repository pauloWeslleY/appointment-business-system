# Cadastro de endereço

## Contrato atual

A feature registra `POST /admin/addresses`, antes de eventual prefixo global da aplicação.

| Campo | Significado | Obrigatório na API | Preenchimento no formulário |
| --- | --- | --- | --- |
| `countryCode` | Código do país | Sim | Enviar `BR` automaticamente se o produto atender somente ao Brasil; caso contrário, mostrar seletor de país. |
| `postalCode` | CEP ou código postal | Sim | Usuário digita. No Brasil, usar máscara `00000-000`. |
| `state` | Estado ou UF | Sim | Visível e editável; preencher por consulta de CEP quando disponível. |
| `city` | Cidade | Sim | Visível e editável; preencher por consulta de CEP quando disponível. |
| `neighborhood` | Bairro | Sim | Visível e editável; usuário completa se a consulta não retornar. |
| `street` | Logradouro, como rua ou avenida | Sim | Visível e editável; usuário completa se a consulta não retornar. |
| `number` | Número do imóvel | Sim | Usuário digita como texto, permitindo `S/N`. |
| `complement` | Sala, bloco, andar ou apartamento | Não | Campo opcional para digitação. |
| `latitude` | Coordenada norte/sul | Não | Sem campo de digitação; obter por geocodificação, se houver integração. |
| `longitude` | Coordenada leste/oeste | Não | Sem campo de digitação; obter junto com a latitude. |
| `establishmentId` | Identificador do estabelecimento | Sim | Obter do contexto e enviar automaticamente. |

## O que o usuário precisa digitar

Com consulta de CEP: normalmente **CEP e número**, além de **complemento opcional**. O usuário confere os demais campos e completa os que não forem retornados.

Sem consulta de CEP: **CEP, UF, cidade, bairro, logradouro e número**, além de complemento opcional.

## Requisitos de interface propostos

- Consultar o CEP ao completar oito dígitos e indicar carregamento.
- Preencher UF, cidade, bairro e logradouro, permitindo correção manual.
- Se a consulta falhar ou não encontrar o CEP, informar e permitir preenchimento manual.
- Ao mudar o CEP, descartar respostas de consultas anteriores para evitar dados incorretos.
- Ao alterar o endereço, invalidar coordenadas antigas e recalcular quando houver integração.
- Mostrar erros junto aos campos.
- Durante o envio, desabilitar o botão e impedir novos submits, inclusive pelo teclado.
- Preservar os dados preenchidos se o cadastro falhar.

## Dados enviados automaticamente

- País: `BR`, somente no fluxo exclusivo para o Brasil.
- Estabelecimento: identificador obtido do cadastro ou seleção atual.
- Coordenadas: enviar o par válido quando disponível; caso contrário, omitir ambas ou enviar ambas como `null`.

Latitude deve estar entre -90 e 90, e longitude entre -180 e 180. O domínio exige um par válido quando informado. Não usar `-90` e `-180` como ausência: são coordenadas reais.

A rota atual recebe os dados, mas não executa consulta de CEP nem geocodificação. Esses comportamentos dependem de integrações próprias e são recomendações para a interface, não funcionalidades confirmadas dessa rota.

## Validações atuais da API

- País: texto com duas posições; o domínio exige duas letras e normaliza para maiúsculas. Não está limitado a `BR`.
- Código postal: obrigatório, até 32 caracteres; para o Brasil, o domínio valida o formato do CEP.
- Estado: obrigatório, até 100 caracteres.
- Cidade e bairro: obrigatórios, até 200 caracteres cada.
- Logradouro: obrigatório, até 300 caracteres.
- Número: texto obrigatório, até 50 caracteres.
- Complemento: opcional ou nulo, até 300 caracteres.
- Coordenadas: opcionais ou nulas; quando presentes, devem formar um par válido.
- Estabelecimento: UUID obrigatório, sujeito às verificações de autorização e acesso do backend.

## Proteção contra duplicidade

O caso de uso verifica se o estabelecimento já tem endereço. O schema e as migrations definem unicidade por estabelecimento, e o repositório trata a violação como conflito, inclusive em cadastros concorrentes.

A rota de endereço não possui idempotência por chave: uma repetição é rejeitada por endereço existente, em vez de retornar o resultado da primeira requisição. Bloquear o envio repetido na interface continua sendo responsabilidade do frontend.

Análise baseada no código e nas migrations; não houve consulta ao banco em execução.

## Fontes no backend

- `back-end/src/features/address/infrastructure/http/router/admin/address-admin.routes.ts`
- `back-end/src/features/address/infrastructure/http/router/admin/create-address-admin.route.ts`
- `back-end/src/features/address/infrastructure/http/validation/create-address.schema.ts`
- `back-end/src/validation/schemas/address-summary.schema.ts`
- `back-end/src/features/address/domain/entities/address.entity.ts`
- `back-end/src/features/address/application/use-cases/create-address.use-case.ts`
- `back-end/src/features/address/infrastructure/repositories/drizzle-address.repository.ts`
- `back-end/src/infra/database/schemas/address.table.ts`
