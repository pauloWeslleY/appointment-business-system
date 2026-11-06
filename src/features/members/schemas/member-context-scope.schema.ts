import { z } from 'zod'

export const MemberContextScopeSchema = z.object({
  userId: z.string().min(1),
  organizationId: z.string().min(1),
  establishmentId: z.uuid().optional(),
})
