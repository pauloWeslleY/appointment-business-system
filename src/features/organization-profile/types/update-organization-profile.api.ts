import type z from 'zod'

import type { UpdateOrganizationProfileFormSchema } from '../schemas/update-organization-profile.schema'

export type UpdateProfileOrganizationRequest = z.infer<
  typeof UpdateOrganizationProfileFormSchema
>
