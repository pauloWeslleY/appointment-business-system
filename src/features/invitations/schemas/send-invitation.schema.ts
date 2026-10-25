import z from 'zod'

import {
  MemberAccessScope,
  MemberAccessScopeSchema,
} from '@/features/members/types/member-access-scope.type'
import { MemberRoleSchema } from '@/features/members/types/member-role.type'

export const SendInvitationsSchema = z
  .strictObject({
    email: z.email('Informe um e-mail válido').max(254),
    role: MemberRoleSchema,
    accessScope: MemberAccessScopeSchema,
    establishmentIds: z
      .array(z.uuid('ID de estabelecimento inválido'))
      .max(1000),
    resend: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (
      data.accessScope === MemberAccessScope.RESTRICTED &&
      data.establishmentIds.length === 0
    ) {
      context.addIssue({
        code: 'custom',
        path: ['establishmentIds'],
        message:
          'Selecione pelo menos um estabelecimento para o escopo restrito',
      })
    }
  })
