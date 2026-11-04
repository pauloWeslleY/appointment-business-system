import type z from 'zod'

import type {
  EstablishmentAdminSchema,
  EstablishmentDetailsSchema,
} from '../schemas/get-establishment-api.response.schema'

export type EstablishmentAdminApiResponse = z.infer<
  typeof EstablishmentAdminSchema
>

export type EstablishmentDetailsApiResponse = z.infer<
  typeof EstablishmentDetailsSchema
>
