import { z } from 'zod'

import { GetMeContextSchema } from '@/features/members/schemas/get-me-context.schema'
import { StatusOrganizationProfile } from '@/features/organization-profile/types/status-organization-profile.type'

export const AuthenticatedContextApiRequestSchema = z.object({
  userId: z.string(),
  organizationId: z.string().nullable(),
})

export const AuthenticatedContextApiResponseSchema = GetMeContextSchema.extend({
  canAccessAdmin: z.boolean(),
  canStartBusinessOnboarding: z.boolean(),

  organizations: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      role: z.string(),
      organizationStatus: z.enum(StatusOrganizationProfile),
    }),
  ),

  organization: GetMeContextSchema.shape.organization.nullable(),
  member: GetMeContextSchema.shape.member.nullable(),
  role: GetMeContextSchema.shape.role.nullable(),
  scope: GetMeContextSchema.shape.scope.nullable(),
})
