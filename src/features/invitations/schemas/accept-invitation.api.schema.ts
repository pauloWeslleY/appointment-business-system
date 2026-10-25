import z from 'zod'

import { MemberSchema } from '@/features/members/schemas/get-member-model.schema'

import { InvitationApiSchema } from './invitation-api.schema'

export const AcceptInvitationApiResponseSchema = z.object({
  invitation: InvitationApiSchema,
  member: MemberSchema.extend({
    profile: MemberSchema.shape.profile.extend({
      suspendedAt: z.iso.datetime({ offset: true }).nullable(),
      revokedAt: z.iso.datetime({ offset: true }).nullable(),
      createdAt: z.iso.datetime({ offset: true }),
      updatedAt: z.iso.datetime({ offset: true }),
    }),
  }),
})
