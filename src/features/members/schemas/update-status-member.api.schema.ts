import z from 'zod'

import { MEMBER_STATUSES } from '../types/member-status.type'
import { MemberSchema } from './get-member-model.schema'

export const UpdateStatusMemberFormSchema = z.object({
  status: z
    .array(
      z.enum(Object.values(MEMBER_STATUSES), {
        error: (issue) => (issue.input !== undefined ? 'Status inválido' : ''),
      }),
    )
    .min(1, 'É necessário selecionar pelo menos um status'),
})

export const UpdateStatusMemberRequestApiSchema = z.object({
  memberId: z.string().min(1, 'ID do membro é obrigatório'),
  ...UpdateStatusMemberFormSchema.shape,
})

export const UpdateStatusMemberResponseApiSchema = MemberSchema
