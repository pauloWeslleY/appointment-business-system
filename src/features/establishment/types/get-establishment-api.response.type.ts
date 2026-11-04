import type z from 'zod'

import type {
  EstablishmentListApiResponseSchema,
  EstablishmentOrganizationProfileSchema,
  EstablishmentSlugSchema,
} from '../schemas/get-establishment-api.response.schema'

export type EstablishmentOrganizationProfileApiResponse = z.infer<
  typeof EstablishmentOrganizationProfileSchema
>

export type EstablishmentSlugApiResponse = z.infer<
  typeof EstablishmentSlugSchema
>

export type EstablishmentListApiResponse = z.infer<
  typeof EstablishmentListApiResponseSchema
>
