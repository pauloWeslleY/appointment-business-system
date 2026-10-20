import { type z } from 'zod'

import type { CreateOrganizationProfileFormSchema } from '../schemas/create-organization-profile.schema'
import type { UpdateOwnerFormSchema } from '../schemas/update-owner-form.schema'

export type CreateOrganizationProfileFormData = z.infer<
  typeof CreateOrganizationProfileFormSchema
>

export type UpdateOwnerFormData = z.infer<typeof UpdateOwnerFormSchema>
