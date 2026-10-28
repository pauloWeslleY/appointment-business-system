import z from 'zod'

import { MemberRoles } from '../types/member-role.type'
import { MemberSchema } from './get-member-model.schema'

export const UpdateRoleMemberFormSchema = z.object({
  role: z
    .array(
      z.enum(Object.values(MemberRoles), {
        error: (issue) => (issue.input !== undefined ? 'Papel inválido' : ''),
      }),
    )
    .min(1, 'É necessário selecionar pelo menos um papel'),
})

export const UpdateRoleMemberRequestApiSchema = z.object({
  memberId: z.string().min(1, 'ID do membro é obrigatório'),
  ...UpdateRoleMemberFormSchema.shape,
})

export const UpdateRoleMemberResponseApiSchema = MemberSchema
