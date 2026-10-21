import z from 'zod'

import { MemberAccessScopeSchema } from '../types/member-access-scope.type'
import { MemberRoleSchema } from '../types/member-role.type'
import { MemberStatusSchema } from '../types/member-status.type'

export const MemberSchema = z.object({
  id: z.string(),
  userId: z.string(),
  organizationId: z.string(),
  role: MemberRoleSchema,
  profile: z.object({
    id: z.uuid(),
    memberId: z.string(),
    status: MemberStatusSchema,
    accessScope: MemberAccessScopeSchema,
    suspendedAt: z.string().nullable(),
    revokedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
})
