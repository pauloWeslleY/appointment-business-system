import type z from 'zod'

import type {
  EstablishmentAdminSchema,
  EstablishmentDetailsSchema,
} from '../schemas/get-establishment-model.schema'

export type EstablishmentAdminModel = z.infer<typeof EstablishmentAdminSchema>

export type EstablishmentDetailsModel = z.infer<
  typeof EstablishmentDetailsSchema
>
