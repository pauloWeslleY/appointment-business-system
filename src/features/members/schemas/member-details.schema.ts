import z from 'zod'

import { MemberSchema } from './get-member-model.schema'

export const MemberDetailsSchema = z.object({
  member: MemberSchema,
  permissions: z.array(
    z.object({
      action: z.string(),
      resource: z.string(),
    }),
  ),
})
