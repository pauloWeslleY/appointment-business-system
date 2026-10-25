import type z from 'zod'

import type {
  EstablishmentOrganizationProfileSchema,
  EstablishmentSlugSchema,
} from '../schemas/get-establishment-model.schema'

export type EstablishmentModel = z.infer<
  typeof EstablishmentOrganizationProfileSchema
>

export type EstablishmentSlugModel = z.infer<typeof EstablishmentSlugSchema>
