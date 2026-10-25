import { z } from 'zod'

import { CreateMeContextRequest } from '@/features/members/schemas/create-me-context.schema'
import { GetMeContextSchema } from '@/features/members/schemas/get-me-context.schema'

import { subscriptionDateSchema } from './subscription-date.schema'

export const organizationSchema = GetMeContextSchema.shape.organization

export const subscriptionOrganizationsResponseSchema =
  z.array(organizationSchema)

const contextMemberProfileSchema =
  GetMeContextSchema.shape.member.shape.profile.extend({
    suspendedAt: subscriptionDateSchema.nullable(),
    revokedAt: subscriptionDateSchema.nullable(),
    createdAt: subscriptionDateSchema,
    updatedAt: subscriptionDateSchema,
  })

export const subscriptionContextSchema = GetMeContextSchema.extend({
  member: GetMeContextSchema.shape.member.extend({
    profile: contextMemberProfileSchema,
  }),
})

export const subscriptionContextQuerySchema = z.object({
  establishmentId: z.uuid().optional(),
})

export const subscriptionSelectionSchema = CreateMeContextRequest
