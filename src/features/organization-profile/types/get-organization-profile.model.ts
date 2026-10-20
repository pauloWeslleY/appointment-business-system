import type z from 'zod'

import type { GetOrganizationProfileModel } from '../schemas/get-organization-profile.schema'

export type GetOrganizationProfileResponse = z.infer<
  typeof GetOrganizationProfileModel
>
