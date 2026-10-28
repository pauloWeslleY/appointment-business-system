import z from 'zod'

import { MemberAccessScope } from '../types/member-access-scope.type'
import { MemberAccessScopeSchema } from '../types/member-access-scope.type'
import { MemberSchema } from './get-member-model.schema'

export const UpdateScopeMemberFormSchema = z.object({
  accessScope: z
    .array(
      z.enum(Object.values(MemberAccessScope), {
        error: (issue) => (issue.input !== undefined ? 'Acesso inválido' : ''),
      }),
    )
    .min(1, 'É necessário selecionar pelo menos um acesso'),
  establishmentIds: z
    .array(z.string())
    .min(1, 'É necessário selecionar pelo menos um estabelecimento'),
})

export const UpdateScopeMemberRequestApiSchema = z.object({
  memberId: z.string().min(1, 'ID do membro é obrigatório'),
  ...UpdateScopeMemberFormSchema.shape,
})

export const UpdateScopeMemberResponseApiSchema = z.object({
  member: MemberSchema,
  scope: z.object({
    accessScope: MemberAccessScopeSchema,
    establishmentIds: z.array(z.uuid()),
  }),
})
