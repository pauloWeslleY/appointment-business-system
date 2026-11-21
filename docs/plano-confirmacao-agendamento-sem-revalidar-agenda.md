# Plano: confirmar agendamento sem revalidar a agenda

> Status: **implementado no backend** (`../back-end`), ainda sem commit. A migration `0035_confirm_without_schedule_admission.sql` precisa ser aplicada no banco local, com autorização, antes de testar pelo painel. O painel não precisou de alteração.

## Contexto

Ao confirmar um agendamento pendente, o backend podia recusar a confirmação com `APPOINTMENT_CONFLICT`, por exemplo por causa do intervalo obrigatório de 30 min depois de outro agendamento.

Um agendamento **pendente já reserva o horário**: os status que bloqueiam a agenda são pendente, confirmado e concluído, e a criação já valida funcionamento, contexto, jornada do profissional e disponibilidade. Confirmar não ocupa um horário novo, só muda o status. A confirmação só falhava quando algo tinha mudado depois do agendamento (horário de funcionamento, fuso ou jornada do profissional), e aí o agendamento ficava preso em pendente, ainda ocupando o horário.

Sistemas de agendamento seguem a mesma linha: uma reserva pendente já bloqueia o horário, e desativar um tipo de serviço impede novos agendamentos sem invalidar os existentes.

## Decisões

| Validação na confirmação | Decisão | Motivo |
|---|---|---|
| Acesso, assinatura e equipe | Mantida | Segurança e escopo. |
| Status pendente (transição) | Mantida | Regra da máquina de estados. |
| Versão do agendamento | Mantida | Impede alterações simultâneas. |
| Unidade, serviço e cliente ativos (e serviço da unidade) | **Mantida** | Não faz sentido confirmar um atendimento com unidade, serviço ou cliente inativos. |
| Profissional ativo na unidade | **Mantida** e trazida para a aplicação | Mesmo motivo dos itens ativos; antes só o banco checava. |
| Horário de funcionamento | Removida | O horário já foi admitido na criação. |
| Jornada de trabalho do profissional | Removida | Checagem de horário, como o funcionamento; a remarcação continua checando. |
| Agenda e intervalo de 30 min | Removida | O horário já estava reservado. |
| Sobreposição direta no banco | Mantida | Trava de segurança contra dois agendamentos no mesmo horário de fato. |

Conclusão e cancelamento não mudaram: já não checavam a agenda.

## O que foi implementado

### Aplicação

- `AppointmentAvailabilityPolicy.assertOperationalContext(appointment)`: carrega o contexto (`findCreationContext`), aplica `assertContext` (consistência, unidade, serviço e cliente ativos) e confere se o profissional, quando houver, tem vínculo ativo com a unidade. Não consulta horário de funcionamento, jornada nem agenda.
- O carregamento do contexto foi extraído para `loadAppointmentContext`, usado também por `assertAvailable` (criação e remarcação continuam iguais).
- `ConfirmAppointmentUseCase` troca `assertAvailable` por `assertOperationalContext` e `update` por `updateStatus`.
- Nova consulta `IAppointmentQueriesPort.isProfessionalActiveInEstablishment`, com `FindAppointmentProfessionalScopeInput`.
- Nova mensagem, código `APPOINTMENT_INVALID_PROFESSIONAL`: "O profissional deste agendamento não está mais ativo nesta unidade. Reative o vínculo do profissional com a unidade ou remarque o agendamento com outro profissional."

### Repositório

- `IAppointmentRepositoryPort.updateStatus(appointment, expectedVersion)`: grava a troca de status com controle de versão e a mesma tradução de erros, sem `assertResourceAvailable`.
- A gravação versionada foi extraída para `writeVersionedRow`, compartilhada com `update`.
- `DrizzleAppointmentQueries.isProfessionalActiveInEstablishment` usa `EMPLOYMENT_STATUS.ACTIVE`.

### Banco (`0035_confirm_without_schedule_admission.sql`)

- `guard_appointment_consistency`: pendente → confirmado deixa de ser admissão (`v_admission`). O banco não reconfere contexto, fiscal nem horário de funcionamento na confirmação. A sobreposição direta continua.
- `guard_professional_appointment`: quando a gravação é só pendente → confirmado, sem mudar o período, pula a checagem de jornada (`appointment_professional_schedule_check`). Escopo (`appointment_professional_scope_check`) e sobreposição (`appointment_professional_overlap_check`) continuam.
- As duas funções partem da versão da migration `0018`, alterando só esses trechos. Entrada `idx 35` adicionada ao `_journal.json`; sem snapshot, como as outras migrations que só redefinem funções.

### Testes

- `confirm-appointment.use-case.test.ts`: confirma sem consultar funcionamento, jornada nem agenda; confirma mesmo com conflito de agenda; rejeita unidade, serviço e cliente inativos sem gravar; usa `updateStatus`.
- `appointment-availability.policy.test.ts`: testes de `assertOperationalContext` (sem contexto, serviço inativo antes do profissional, consulta do vínculo do profissional, agendamento sem profissional, profissional inativo).

## Verificação

- `npx tsc --project tsconfig.check.json --noEmit`: ok.
- ESLint em `src/features/appointments`: só o erro que já existia em `appointment-date.vo.ts` (`object-shorthand`).
- Vitest em appointments, shared/domain e professionals: 206 de 207 passaram. A falha foi em `appointment-page.policy.test.ts` ("rejeita tamanho fracionário"), um teste instável que já existia: o faker pode gerar um número inteiro. Passou em 3 execuções seguidas.
- Migration **não aplicada**. Aplicar somente no banco local e com autorização explícita; não alterar banco compartilhado.

## O que não muda

- Criar e remarcar continuam checando tudo: contexto, funcionamento, jornada, agenda e intervalo de 30 min.
- O contrato HTTP continua igual: mesmas rotas, corpo de requisição e códigos de erro.
