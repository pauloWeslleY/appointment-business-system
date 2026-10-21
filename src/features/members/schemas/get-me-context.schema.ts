import z from 'zod'

import { MemberAccessScopeSchema } from '../types/member-access-scope.type'
import { MemberRoleSchema } from '../types/member-role.type'
import { MemberSchema } from './get-member-model.schema'

export const GetMeContextSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
  organization: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
  member: MemberSchema,
  role: MemberRoleSchema,
  permissions: z.array(
    z.object({
      resource: z.string(),
      action: z.string(),
    }),
  ),
  scope: z.object({
    accessScope: MemberAccessScopeSchema,
    establishmentIds: z.array(z.uuid()),
  }),
  establishments: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      status: z.string(),
    }),
  ),
  establishmentId: z.uuid().nullable(),
})
