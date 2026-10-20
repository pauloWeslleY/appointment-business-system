import { type z } from 'zod'

import { type ActiveOrganizationSchema } from '@/features/organization-profile/schemas/active-organization.schema'

export type FormActiveOrganizationType = z.infer<
  typeof ActiveOrganizationSchema
>
